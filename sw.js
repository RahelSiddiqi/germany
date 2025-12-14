const CACHE_VERSION = 'study-abroad-v2.3';
const CACHE_ASSETS = [
	'/germany/',
	'/germany/dashboard.html',
	'/germany/dashboard.css',
	'/germany/dashboard.js',
	'/germany/enhancements.css',
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
	'/germany/dashboard-band8-styles.css',
	'/germany/ielts-viewer.js',
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
