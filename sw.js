self.addEventListener('fetch', (event) => {
	const { request } = event;
	
	// Ignore non-http(s) and extension requests to avoid cache errors
	if (!request.url.startsWith('http://') && !request.url.startsWith('https://')) {
		return;
	}

	event.respondWith(
		caches.open('ielts-v1').then((cache) => {
			return fetch(request)
				.then((response) => {
					// Only cache successful responses
					if (response && response.status === 200) {
						cache.put(request, response.clone());
					}
					return response;
				})
				.catch(() => cache.match(request));
		}),
	);
});
