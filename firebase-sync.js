// Firebase Cloud Sync for Study Abroad Dashboard
// Enables cross-device synchronization of all progress data

// Debug mode - set to true to enable console logging
const FIREBASE_DEBUG = false;

// Silent logger - only logs when debug mode is enabled
const syncLog = (...args) => {
	if (FIREBASE_DEBUG) syncLog('[Sync]', ...args);
};

// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAVUTTnPGO7jxUWqwUOZP4Zd98wog0ZMgE',
	authDomain: 'ielts-481218.firebaseapp.com',
	projectId: 'ielts-481218',
	storageBucket: 'ielts-481218.firebasestorage.app',
	messagingSenderId: '887641467094',
	appId: '1:887641467094:web:aba5dd83d30e4cdbe68177',
};

// Sync Manager Class
class CloudSyncManager {
	constructor() {
		this.db = null;
		this.auth = null;
		this.user = null;
		this.isInitialized = false;
		this.syncEnabled = false;
		this.lastSyncTime = null;
		this.syncInProgress = false;

		this.STORAGE_KEYS = {
			germany: 'germany-applications',
			schengen: 'schengen-applications',
			ielts: 'ielts-tasks',
			ieltsScores: 'ielts-scores',
			scholarships: 'scholarship-applications',
			documents: 'document-checklist',
			vocab: 'ielts-vocab-learned',
			germanyNotes: 'germany-notes',
			schengenNotes: 'schengen-notes',
			studyReminders: 'study-reminders',
			ieltsNext: 'ielts-next',
			ieltsStreak: 'ielts-streak',
			ieltsWeights: 'ielts-weights',
			band8Progress: 'band8_progress',
			ieltsEssays: 'ielts-essays',
			ieltsCurrentEssay: 'ielts-current-essay',
			studyStreak: 'study-streak',
		};

		// Check if Firebase config is set
		this.isConfigured = firebaseConfig.apiKey !== 'YOUR_API_KEY';
	}

	// Initialize Firebase
	async init() {
		if (!this.isConfigured) {
			syncLog('Firebase not configured. Cloud sync disabled.');
			return false;
		}

		try {
			// Initialize Firebase app
			if (!firebase.apps.length) {
				firebase.initializeApp(firebaseConfig);
			}

			this.auth = firebase.auth();
			this.db = firebase.firestore();

			// Enable offline persistence
			try {
				await this.db.enablePersistence({ synchronizeTabs: true });
			} catch (err) {
				if (err.code === 'failed-precondition') {
					syncLog('Persistence failed: multiple tabs open');
				} else if (err.code === 'unimplemented') {
					syncLog('Persistence not available in this browser');
				}
			}

			// Listen for auth state changes
			this.auth.onAuthStateChanged((user) => {
				this.user = user;
				if (user) {
					this.onUserSignedIn(user);
				} else {
					this.onUserSignedOut();
				}
				this.updateSyncUI();
			});

			this.isInitialized = true;
			return true;
		} catch (error) {
			console.error('Firebase initialization failed:', error);
			return false;
		}
	}

	// Sign in anonymously (no account needed)
	async signInAnonymously() {
		if (!this.isInitialized) await this.init();
		if (!this.isConfigured) {
			this.showNotification(
				'Cloud sync not configured. Please set up Firebase.',
				'error',
			);
			return false;
		}

		try {
			const result = await this.auth.signInAnonymously();
			this.showNotification('Cloud sync enabled!', 'success');
			return result.user;
		} catch (error) {
			console.error('Anonymous sign-in failed:', error);
			this.showNotification('Failed to enable cloud sync', 'error');
			return null;
		}
	}

	// Sign in with Google (for persistent account)
	async signInWithGoogle() {
		if (!this.isInitialized) await this.init();
		if (!this.isConfigured) {
			this.showNotification(
				'Cloud sync not configured. Please set up Firebase.',
				'error',
			);
			return false;
		}

		try {
			const provider = new firebase.auth.GoogleAuthProvider();
			const result = await this.auth.signInWithPopup(provider);
			this.showNotification(
				`Signed in as ${result.user.displayName}`,
				'success',
			);
			return result.user;
		} catch (error) {
			console.error('Google sign-in failed:', error);
			this.showNotification('Sign in failed: ' + error.message, 'error');
			return null;
		}
	}

	// Sign out
	async signOut() {
		if (!this.auth) return;

		try {
			await this.auth.signOut();
			this.syncEnabled = false;
			this.showNotification('Signed out from cloud sync', 'info');
		} catch (error) {
			console.error('Sign out failed:', error);
		}
	}

	// Called when user signs in
	async onUserSignedIn(user) {
		this.syncEnabled = true;
		syncLog('User signed in:', user.uid);

		// Start real-time sync listener
		this.startRealtimeSync();

		// Perform initial sync
		await this.syncFromCloud();
	}

	// Called when user signs out
	onUserSignedOut() {
		this.syncEnabled = false;
		this.user = null;
		syncLog('User signed out');
	}

	// Get user's document reference
	getUserDocRef() {
		if (!this.user || !this.db) return null;
		return this.db.collection('users').doc(this.user.uid);
	}

	// Upload local data to cloud
	async syncToCloud() {
		if (!this.syncEnabled || !this.user || this.syncInProgress)
			return false;

		this.syncInProgress = true;
		this.updateSyncStatus('syncing');

		try {
			const docRef = this.getUserDocRef();
			if (!docRef) throw new Error('No user document reference');

			const data = {
				germany: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.germany) || '[]',
				),
				schengen: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.schengen) || '[]',
				),
				ielts: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ielts) || '{}',
				),
				ieltsScores: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ieltsScores) || '[]',
				),
				scholarships: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.scholarships) ||
						'[]',
				),
				documents: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.documents) || '[]',
				),
				vocab: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.vocab) || '[]',
				),
				germanyNotes: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.germanyNotes) ||
						'{}',
				),
				schengenNotes: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.schengenNotes) ||
						'{}',
				),
				studyReminders: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.studyReminders) ||
						'{}',
				),
				ieltsNext: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ieltsNext) || '{}',
				),
				ieltsStreak: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ieltsStreak) || '{}',
				),
				ieltsWeights: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ieltsWeights) ||
						'{}',
				),
				band8Progress: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.band8Progress) ||
						'{}',
				),
				ieltsEssays: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.ieltsEssays) || '[]',
				),
				ieltsCurrentEssay:
					localStorage.getItem(this.STORAGE_KEYS.ieltsCurrentEssay) ||
					'',
				studyStreak: JSON.parse(
					localStorage.getItem(this.STORAGE_KEYS.studyStreak) || '{}',
				),
				lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
				deviceInfo: navigator.userAgent,
			};

			await docRef.set(data, { merge: true });
			this.lastSyncTime = new Date();
			this.updateSyncStatus('synced');
			syncLog('Data synced to cloud');
			return true;
		} catch (error) {
			console.error('Sync to cloud failed:', error);
			this.updateSyncStatus('error');
			return false;
		} finally {
			this.syncInProgress = false;
		}
	}

	// Download cloud data to local
	async syncFromCloud() {
		if (!this.syncEnabled || !this.user) return false;

		this.updateSyncStatus('syncing');

		try {
			const docRef = this.getUserDocRef();
			if (!docRef) throw new Error('No user document reference');

			const doc = await docRef.get();

			if (doc.exists) {
				const data = doc.data();

				// Merge strategy: Cloud data wins for newer data
				// But preserve local data if cloud is empty
				if (data.germany && data.germany.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.germany,
						JSON.stringify(data.germany),
					);
				}
				if (data.schengen && data.schengen.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.schengen,
						JSON.stringify(data.schengen),
					);
				}
				if (data.ielts && Object.keys(data.ielts).length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.ielts,
						JSON.stringify(data.ielts),
					);
				}
				if (data.ieltsScores && data.ieltsScores.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsScores,
						JSON.stringify(data.ieltsScores),
					);
				}
				if (data.scholarships && data.scholarships.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.scholarships,
						JSON.stringify(data.scholarships),
					);
				}
				if (data.documents && data.documents.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.documents,
						JSON.stringify(data.documents),
					);
				}
				if (data.vocab && data.vocab.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.vocab,
						JSON.stringify(data.vocab),
					);
				}
				if (
					data.germanyNotes &&
					Object.keys(data.germanyNotes).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.germanyNotes,
						JSON.stringify(data.germanyNotes),
					);
				}
				if (
					data.schengenNotes &&
					Object.keys(data.schengenNotes).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.schengenNotes,
						JSON.stringify(data.schengenNotes),
					);
				}
				if (
					data.studyReminders &&
					Object.keys(data.studyReminders).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.studyReminders,
						JSON.stringify(data.studyReminders),
					);
				}
				if (data.ieltsNext && Object.keys(data.ieltsNext).length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsNext,
						JSON.stringify(data.ieltsNext),
					);
				}
				if (
					data.ieltsStreak &&
					Object.keys(data.ieltsStreak).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsStreak,
						JSON.stringify(data.ieltsStreak),
					);
				}
				if (
					data.ieltsWeights &&
					Object.keys(data.ieltsWeights).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsWeights,
						JSON.stringify(data.ieltsWeights),
					);
				}
				if (
					data.band8Progress &&
					Object.keys(data.band8Progress).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.band8Progress,
						JSON.stringify(data.band8Progress),
					);
				}
				if (data.ieltsEssays && data.ieltsEssays.length > 0) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsEssays,
						JSON.stringify(data.ieltsEssays),
					);
				}
				if (data.ieltsCurrentEssay) {
					localStorage.setItem(
						this.STORAGE_KEYS.ieltsCurrentEssay,
						data.ieltsCurrentEssay,
					);
				}
				if (
					data.studyStreak &&
					Object.keys(data.studyStreak).length > 0
				) {
					localStorage.setItem(
						this.STORAGE_KEYS.studyStreak,
						JSON.stringify(data.studyStreak),
					);
				}

				this.lastSyncTime = new Date();
				syncLog('Data synced from cloud');

				// Reload university data from localStorage to in-memory arrays
				if (typeof reloadUniversityData === 'function') {
					await reloadUniversityData();
				}

				// Refresh UI
				if (typeof updateDashboardStats === 'function') {
					updateDashboardStats();
				}
				if (typeof displayIELTSPlan === 'function') {
					displayIELTSPlan();
				}
				if (typeof displayGermanyUniversities === 'function') {
					displayGermanyUniversities();
				}
				if (typeof displaySchengenUniversities === 'function') {
					displaySchengenUniversities();
				}
				// Refresh analytics page
				if (typeof updateAnalyticsPage === 'function') {
					updateAnalyticsPage();
				}
				// Refresh vocabulary flashcard state
				if (typeof refreshFlashcardState === 'function') {
					refreshFlashcardState();
				}
			} else {
				// No cloud data exists, upload local data
				syncLog('No cloud data found, uploading local data');
				await this.syncToCloud();
			}

			this.updateSyncStatus('synced');
			return true;
		} catch (error) {
			console.error('Sync from cloud failed:', error);
			this.updateSyncStatus('error');
			return false;
		}
	}

	// Start real-time sync listener
	startRealtimeSync() {
		if (!this.syncEnabled || !this.user) return;

		const docRef = this.getUserDocRef();
		if (!docRef) return;

		// Listen for changes from other devices
		docRef.onSnapshot(
			(doc) => {
				if (doc.exists && doc.metadata.hasPendingWrites === false) {
					// Data changed from another device
					const data = doc.data();
					syncLog('Real-time update received from another device');

					// Update local storage
					if (data.germany) {
						localStorage.setItem(
							this.STORAGE_KEYS.germany,
							JSON.stringify(data.germany),
						);
					}
					if (data.schengen) {
						localStorage.setItem(
							this.STORAGE_KEYS.schengen,
							JSON.stringify(data.schengen),
						);
					}
					if (data.ielts) {
						localStorage.setItem(
							this.STORAGE_KEYS.ielts,
							JSON.stringify(data.ielts),
						);
					}
					if (data.ieltsScores) {
						localStorage.setItem(
							this.STORAGE_KEYS.ieltsScores,
							JSON.stringify(data.ieltsScores),
						);
					}
					if (data.studyStreak) {
						localStorage.setItem(
							this.STORAGE_KEYS.studyStreak,
							JSON.stringify(data.studyStreak),
						);
					}
					if (data.band8Progress) {
						localStorage.setItem(
							this.STORAGE_KEYS.band8Progress,
							JSON.stringify(data.band8Progress),
						);
					}

					// Refresh UI - important for cross-device sync
					if (typeof displayIELTSPlan === 'function') {
						displayIELTSPlan();
					}
					if (typeof updateDashboardStats === 'function') {
						updateDashboardStats();
					}
					if (typeof updateStudyStreak === 'function') {
						updateStudyStreak();
					}
					if (typeof updateAnalyticsPage === 'function') {
						updateAnalyticsPage();
					}
					if (typeof displayGermanyUniversities === 'function') {
						displayGermanyUniversities();
						// Restore expanded card states after re-render
						const germanyList =
							document.getElementById('germany-list');
						if (
							germanyList &&
							typeof restoreExpandedState === 'function'
						) {
							restoreExpandedState(germanyList);
						}
					}
					if (typeof displaySchengenUniversities === 'function') {
						displaySchengenUniversities();
						// Restore expanded card states after re-render
						const schengenList =
							document.getElementById('schengen-list');
						if (
							schengenList &&
							typeof restoreExpandedState === 'function'
						) {
							restoreExpandedState(schengenList);
						}
					}

					this.updateSyncStatus('synced');
				}
			},
			(error) => {
				console.error('Real-time sync error:', error);
				this.updateSyncStatus('error');
			},
		);
	}

	// Auto-sync on data changes
	setupAutoSync() {
		// Debounce sync to avoid too many writes
		let syncTimeout = null;

		const triggerSync = () => {
			if (syncTimeout) clearTimeout(syncTimeout);
			syncTimeout = setTimeout(() => {
				this.syncToCloud();
			}, 2000); // Wait 2 seconds after last change
		};

		// Override localStorage.setItem to trigger sync
		const originalSetItem = localStorage.setItem.bind(localStorage);
		localStorage.setItem = (key, value) => {
			originalSetItem(key, value);
			if (Object.values(this.STORAGE_KEYS).includes(key)) {
				triggerSync();
			}
		};
	}

	// Update sync status indicator
	updateSyncStatus(status) {
		const indicator = document.getElementById('sync-status');
		if (!indicator) return;

		const statusMap = {
			syncing: { icon: '🔄', text: 'Syncing...', class: 'syncing' },
			synced: { icon: '☁️', text: 'Synced', class: 'synced' },
			error: { icon: '⚠️', text: 'Sync error', class: 'error' },
			offline: { icon: '📴', text: 'Offline', class: 'offline' },
		};

		const s = statusMap[status] || statusMap.offline;
		indicator.innerHTML = `<span class="sync-icon">${s.icon}</span><span class="sync-text">${s.text}</span>`;
		indicator.className = `sync-status ${s.class}`;
	}

	// Update sync UI based on auth state
	updateSyncUI() {
		const syncBtn = document.getElementById('sync-button');
		const syncStatus = document.getElementById('sync-status');
		const userInfo = document.getElementById('sync-user-info');

		if (!syncBtn) return;

		if (this.user) {
			syncBtn.innerHTML = this.user.isAnonymous
				? '☁️ Cloud Sync Active'
				: `☁️ ${this.user.displayName || this.user.email || 'Synced'}`;
			syncBtn.classList.add('active');

			if (userInfo) {
				userInfo.textContent = this.user.isAnonymous
					? 'Anonymous sync'
					: this.user.email;
			}
		} else {
			syncBtn.innerHTML = '☁️ Enable Cloud Sync';
			syncBtn.classList.remove('active');
		}
	}

	// Show notification
	showNotification(message, type = 'info') {
		// Use existing notification system if available
		if (typeof showNotification === 'function') {
			showNotification(message, type);
			return;
		}

		// Fallback notification
		const notification = document.createElement('div');
		notification.className = `sync-notification ${type}`;
		notification.textContent = message;
		notification.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			padding: 12px 24px;
			border-radius: 8px;
			color: white;
			font-weight: 500;
			z-index: 10000;
			animation: slideIn 0.3s ease;
			background: ${
				type === 'success'
					? '#10b981'
					: type === 'error'
					? '#ef4444'
					: '#3b82f6'
			};
		`;

		document.body.appendChild(notification);
		setTimeout(() => {
			notification.style.animation = 'slideOut 0.3s ease';
			setTimeout(() => notification.remove(), 300);
		}, 3000);
	}

	// Check if cloud sync is available
	isAvailable() {
		return this.isConfigured && this.isInitialized;
	}

	// Get sync status info
	getStatus() {
		return {
			configured: this.isConfigured,
			initialized: this.isInitialized,
			enabled: this.syncEnabled,
			user: this.user
				? {
						uid: this.user.uid,
						email: this.user.email,
						displayName: this.user.displayName,
						isAnonymous: this.user.isAnonymous,
				  }
				: null,
			lastSync: this.lastSyncTime,
		};
	}
}

// Create singleton instance
const cloudSync = new CloudSyncManager();

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
	await cloudSync.init();

	// Setup auto-sync if user is already signed in
	if (cloudSync.user) {
		cloudSync.setupAutoSync();
	}
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
	module.exports = { cloudSync, CloudSyncManager };
}
