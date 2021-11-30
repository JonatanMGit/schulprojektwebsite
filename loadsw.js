if (!navigator.serviceWorker.controller) {
	console.log('[ServiceWorkerLoader] Der ServiceWorker wird gerade installiert.');
	navigator.serviceWorker.register("./sw.js").then(function (reg) {
	});
}
