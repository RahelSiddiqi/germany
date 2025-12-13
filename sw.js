self.addEventListener('fetch', (event) => {
	const { request } = event;
	// Ignore extension and non-http(s) requests to avoid cache errors
	if (!request.url.startsWith('http')) {
		return;
	}

	event.respondWith(
		caches.open('ielts-v1').then((cache) => {
			return fetch(request)
				.then((response) => {
					cache.put(request, response.clone());
					return response;
				})
				.catch(() => cache.match(request));
		}),
	);
});
