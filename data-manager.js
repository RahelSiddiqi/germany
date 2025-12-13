// Data Manager - Export/Import/Backup functionality

class DataManager {
	constructor() {
		this.STORAGE_KEYS = {
			germany: 'germany-applications',
			schengen: 'schengen-applications',
			ielts: 'ielts-tasks',
			ieltsScores: 'ielts-scores',
		};
	}

	// Export all data to JSON file
	exportAllData() {
		const data = {
			exportDate: new Date().toISOString(),
			version: '1.0',
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
		};

		const blob = new Blob([JSON.stringify(data, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `study-abroad-backup-${
			new Date().toISOString().split('T')[0]
		}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		return true;
	}

	// Import data from JSON file
	importData(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (e) => {
				try {
					const data = JSON.parse(e.target.result);

					// Validate data structure
					if (!data.version || !data.exportDate) {
						throw new Error('Invalid backup file format');
					}

					// Restore data
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

					resolve({
						success: true,
						message: `Data imported successfully from ${new Date(
							data.exportDate,
						).toLocaleDateString()}`,
					});
				} catch (error) {
					reject({
						success: false,
						message: 'Failed to import data: ' + error.message,
					});
				}
			};

			reader.onerror = () => {
				reject({
					success: false,
					message: 'Failed to read file',
				});
			};

			reader.readAsText(file);
		});
	}

	// Clear all data
	clearAllData() {
		if (
			confirm(
				'⚠️ WARNING: This will delete ALL your progress data. This cannot be undone!\n\nAre you sure?',
			)
		) {
			Object.values(this.STORAGE_KEYS).forEach((key) => {
				localStorage.removeItem(key);
			});
			return true;
		}
		return false;
	}

	// Get storage usage statistics
	getStorageStats() {
		const stats = {};
		let totalSize = 0;

		Object.entries(this.STORAGE_KEYS).forEach(([name, key]) => {
			const data = localStorage.getItem(key);
			const size = data ? new Blob([data]).size : 0;
			stats[name] = {
				size: size,
				sizeKB: (size / 1024).toFixed(2),
				items: data
					? JSON.parse(data).length ||
					  Object.keys(JSON.parse(data)).length
					: 0,
			};
			totalSize += size;
		});

		stats.total = {
			size: totalSize,
			sizeKB: (totalSize / 1024).toFixed(2),
			sizeMB: (totalSize / 1024 / 1024).toFixed(2),
		};

		return stats;
	}

	// Auto-backup to localStorage with timestamp
	createAutoBackup() {
		const backupKey = `auto-backup-${Date.now()}`;
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
			timestamp: new Date().toISOString(),
		};

		localStorage.setItem(backupKey, JSON.stringify(data));

		// Keep only last 5 auto-backups
		this.cleanOldBackups();
	}

	// Clean old auto-backups (keep last 5)
	cleanOldBackups() {
		const backupKeys = Object.keys(localStorage).filter((key) =>
			key.startsWith('auto-backup-'),
		);

		if (backupKeys.length > 5) {
			backupKeys
				.sort()
				.slice(0, backupKeys.length - 5)
				.forEach((key) => localStorage.removeItem(key));
		}
	}

	// List all auto-backups
	listAutoBackups() {
		return Object.keys(localStorage)
			.filter((key) => key.startsWith('auto-backup-'))
			.map((key) => {
				const data = JSON.parse(localStorage.getItem(key));
				return {
					key: key,
					timestamp: data.timestamp,
					date: new Date(data.timestamp).toLocaleString(),
				};
			})
			.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
	}

	// Restore from auto-backup
	restoreAutoBackup(backupKey) {
		const backup = localStorage.getItem(backupKey);
		if (!backup) {
			return { success: false, message: 'Backup not found' };
		}

		try {
			const data = JSON.parse(backup);

			localStorage.setItem(
				this.STORAGE_KEYS.germany,
				JSON.stringify(data.germany),
			);
			localStorage.setItem(
				this.STORAGE_KEYS.schengen,
				JSON.stringify(data.schengen),
			);
			localStorage.setItem(
				this.STORAGE_KEYS.ielts,
				JSON.stringify(data.ielts),
			);
			localStorage.setItem(
				this.STORAGE_KEYS.ieltsScores,
				JSON.stringify(data.ieltsScores),
			);

			return {
				success: true,
				message: `Restored backup from ${new Date(
					data.timestamp,
				).toLocaleString()}`,
			};
		} catch (error) {
			return { success: false, message: 'Failed to restore backup' };
		}
	}
}

// Export singleton instance
const dataManager = new DataManager();

// Auto-backup every 30 minutes
setInterval(() => {
	dataManager.createAutoBackup();
}, 30 * 60 * 1000);

// Create initial backup on load
setTimeout(() => {
	dataManager.createAutoBackup();
}, 5000);
