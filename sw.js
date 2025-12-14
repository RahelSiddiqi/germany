const CACHE_VERSION = 'study-abroad-v2.7';
const CACHE_ASSETS = [
	'/germany/',
	'/germany/dashboard.html',
	'/germany/dashboard.js',
	'/germany/data-manager.js',
	'/germany/notification-manager.js',
	'/germany/analytics-manager.js',
	'/germany/settings-ui.js',
	'/germany/manifest.json',
	'/germany/germany-universities.json',
	'/germany/schengen-universities.json',
	'/germany/additional-schengen-cybersecurity-universities.json',
	'/germany/master-plan.js',
	'/germany/dashboard-band8-integration.js',
	'/germany/ielts-viewer.js',
	'/germany/ielts-interactive.js',
	'/germany/app.js',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_VERSION).then((cache) => {
			return cache.addAll(CACHE_ASSETS).catch((error) => {
				console.error('Cache addAll failed:', error);
			});
		}),
	);
	self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames
					.filter((name) => name !== CACHE_VERSION)
					.map((name) => caches.delete(name)),
			);
		}),
	);
	self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
	const { request } = event;

	// Ignore non-http(s) and extension requests to avoid cache errors
	if (
		!request.url.startsWith('http://') &&
		!request.url.startsWith('https://')
	) {
		return;
	}

	event.respondWith(
		caches.open(CACHE_VERSION).then((cache) => {
			return cache.match(request).then((cachedResponse) => {
				// Return cached response if available
				if (cachedResponse) {
					// Update cache in background
					fetch(request)
						.then((response) => {
							if (response && response.status === 200) {
								cache.put(request, response.clone());
							}
						})
						.catch(() => {
							// Offline, use cached version
						});
					return cachedResponse;
				}

				// Fetch from network
				return fetch(request)
					.then((response) => {
						// Only cache successful responses
						if (response && response.status === 200) {
							cache.put(request, response.clone());
						}
						return response;
					})
					.catch(() => {
						// Return offline page or error
						return new Response(
							'Offline - please check your connection',
							{
								status: 503,
								statusText: 'Service Unavailable',
							},
						);
					});
			});
		}),
	);
});

// Push notification event
self.addEventListener('push', (event) => {
	let data = {
		title: 'Study Abroad Reminder',
		body: 'Check your deadlines!',
	};

	if (event.data) {
		try {
			data = event.data.json();
		} catch (e) {
			data.body = event.data.text();
		}
	}

	const options = {
		body: data.body,
		icon: '/germany/favicon.svg',
		badge: '/germany/favicon.svg',
		vibrate: [200, 100, 200],
		tag: data.tag || 'study-abroad-notification',
		requireInteraction: true,
		actions: [
			{ action: 'open', title: '📖 Open App' },
			{ action: 'dismiss', title: '✕ Dismiss' },
		],
		data: {
			url: data.url || '/germany/dashboard.html',
		},
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	if (event.action === 'dismiss') {
		return;
	}

	const urlToOpen = event.notification.data?.url || '/germany/dashboard.html';

	event.waitUntil(
		clients
			.matchAll({ type: 'window', includeUncontrolled: true })
			.then((windowClients) => {
				// Check if app is already open
				for (const client of windowClients) {
					if (client.url.includes('/germany/') && 'focus' in client) {
						return client.focus();
					}
				}
				// Open new window
				if (clients.openWindow) {
					return clients.openWindow(urlToOpen);
				}
			}),
	);
});

// Background sync for checking deadlines
self.addEventListener('sync', (event) => {
	if (event.tag === 'check-deadlines') {
		event.waitUntil(checkDeadlinesInBackground());
	}
});

async function checkDeadlinesInBackground() {
	// This runs in background to check deadlines
	const scheduled = JSON.parse(
		localStorage.getItem('scheduled-notifications') || '[]',
	);
	const now = Date.now();

	for (const notif of scheduled) {
		if (!notif.shown && notif.scheduledTime <= now) {
			await self.registration.showNotification(notif.title, {
				body: notif.body,
				icon: '/germany/favicon.svg',
				tag: notif.tag,
				requireInteraction: true,
			});
		}
	}
}
