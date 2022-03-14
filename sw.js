// 캐싱 스토리지에 저장될 파일 이름
var CACHE_NAME = "pwa-offline-v1";
// 캐싱할 웹 자원(이미지, css 등)의 목록
var filesToCache = ["/", "/css/app.css", "/images/gauntlet.jpg", "/images/hammer.png", "/images/refresh/svg", "/images/shield.png"];

// 서비스 워커 설치 (웹 자원 캐싱)
self.addEventListener("install", function (event) {
    console.log("[Service Worker] Install");
    event.waitUntil(
        caches
            .open(CACHE_NAME) // pwa 파일
            .then(function (cache) {
                // pwa 파일에 다 집어 넣어라
                return cache.addAll(filesToCache);
                // 생성한 캐쉬에 웹 자원들 추가
            })
            .catch(function (error) {
                return console.log(error);
            })
    );
});

self.addEventListener("fetch", function (event) {
    console.log("[Service Worker] Fetch");
    event.respondWith(
        caches
            .match(event.request)
            .then(function (response) {
                // request 가 없으면 request fetch
                return response || fetch(event.request);
            })
            .catch(function (error) {
                return console.log(error);
            })
    );
});
