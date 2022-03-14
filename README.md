# inflearn-pwa-tutorial

PWA 시작하기 - 웹 기술로 앱을 만들자

`학습 기간 : 03/02 ~`

### PWA 등장 배경

-   모바일 시장의 폭발적인 성장
-   모바일 웹 보다는 모바일 애플리케이션을..
-   모바일 앱 영역을 커버하기 위한 시도들 - Hybrid App, React Native
-   Offline Web의 필요성

### PWA 특징

-   Responsive : 반응형 웹 디자인
-   App-like : 앱과 비슷함
-   Discoverable : 원하는 사이트가서 설치가 바로 가능
-   Engageable : push 알람이 가능
-   Connectivity : 온라인과 오프라인에 둘사이에 같은 화면을 보여줌
-   Safe : https만 PWA 구현이 가능

### PWA 적용 사례

인스타그램, 우버, 트위터, 스타벅스, ALiExpress 등등

### PWA 제작 기술

1. manifest.json
2. Service Workers: client0side JavaScript proxy

### 웹 앱 매니페스트 앱아이콘, 런치 이미지

```jsx
"icons" : [
        {
            "src" : "images/icons/192x.png",
            "type" : "image/png",
            "sizes" : "192x192"
        },
        {
            "src" : "images/icons/512x.png",
            "type" : "image/png",
            "sizes" : "512x512"
        }
    ],
```

src : 로딩할 이미지 파일 경로

type : 로딩할 이미지 타입

sizes : 로딩할 이미지 크기

<aside>
💡 주의사항

app icon 미지정시 html 파일의 <link rel =”icon”> 태그를 검색한다.

Safari의 경우 아래의 meta 태그를 head에 별도로 추가해주어야 한다.

```jsx
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png">

```

</aside>

**2) Launch Image - Splash Screen**

-   웹앱이 시작될 때 거치는 시작 화면을 설정 가능
-   모바일 앱의 시작과 동일한 느낌을 가져감
-   화면의 조합 : 아이콘 + 배경색 + 아이콘 이름
-   배경색 설정은 background_color 속성 이용

```jsx
"background_color" : "#2196F3",
```

-   아이콘은 icon 에 지정한 이미지 중 128dp = 192px 에 가장 가까운 크기로 지정
-   따라서, 192px 크기의 이미지는 꼭 지정
    -   dp : 다양한 모바일 화면 크기에서 동일한 비율로 출력되게 하는 픽셀 단위

**3) Start URL**

-   앱이 시작될 때 로딩될 페이지 위치 지정

```jsx
"start_url" : "./"
```

-   GA 분석이나 기타 목적으로 query string을 뒤에 붙일 수 있다.

```jsx
"start_url" : "index.html?launcher=homscreen"
```

**4) Display Type**

-   웹앱 화면의 전체적인 모양을 정할 수 있다.
-   **웹앱이 모바일 앱의 느낌을 가져갈 수 있도록 결정짓는 속성**

```jsx
"display" : "standalone"
```

-   display 속성의 옵션 값은 아래와 같다.
    -   `standalone` : 상단 URL 바 제거하여 네이티브 앱 느낌 제공
    -   `browser` : 해당 OS 브라우저에서 웹앱 실행
    -   `fullscreen` : 크롬이 아닌 기타 브라우저에서 네이티브 앱 느낌 제공
    -   `minimul-ui` : fullscreen 과 비슷하나 네비게이션 관련 최소 UI 를 제공

<aside>
💡 주의 사항 : IOS에서 standalone 사용시

-   `<a>` 를 이용한 네비게이션 이동 시 새 브라우저 열기로 인해 context를 잃게 됨.
-   따라서, location.href 또는 SPA를 이용한 네비게이팅으로 전체 UX를 가져갈 필요가 있음

```jsx
<meta name="apple-mobile-web-app-capable" content="yes">
```

</aside>
**Theme Color**

-   `theme-color` 를 이용하여 앱 테마 색상을 정의할 수 있다.
-   홈 화면에서 시작해야 설정한 도메인의 모든 페이지에 적용됨

```jsx
"theme_color" : "#2196F3"
```

**5) Display Orientation**

-   화면 방향은 `orientation` 속성을 이용하고 옵션 값은 아래와 같다.
    -   `portrait` : 세로 방향
    -   `landscape` : 가로 방향
    ```jsx
    "orientation" : "landscape"
    ```

### Web App Install Banner

-   PWA가 모바일적인 특징을 가지는 큰 부분의 하나
-   기존 모바일 앱 개발주기 : 구현 → SDK 빌드 → 스토어 배포 → 검색 → 앱 다운로드 → 설치 → 사용
-   PWA 앱 개발주기 : 구현 → 사이트 배포 → 검색 → 사용 (자동 설치)

### Install Banner 동작 조건

App Manifest 파일을 설정 후 아래 조건 만족시 동일 웹사이트에 대해 설치 배너 표시

-   웹 사이트가 설치되어 있지 않음
-   사용자가 최소 30초 이상 웹 사이트를 탐색
-   `start_url`, `short_name`, `name` 설정
-   최소 192px 크기의 앱 아이콘 이미지
-   Service Worker의 fetch 이벤트 구현
-   HTTPS

`beforeinstallprompt` 로 설치 배너의 표시 시기를 지연하거나 disable 가능

```jsx
let deferredPrompt;
// 설치 가능한지 확인

window.addEventListener("beforeinstallprompt", function (e) {
    console.log("beforeinstallprompt Event fired");
    e.preventDefault();
    deferredPrompt = e;
});

// 특정 버튼 클릭 시에 앱 설치
btn.addEventListener("click", function (e) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (result) {
        if (result === "accepted") {
            console.log("The app has been installed");
        }
        deferredPrompt = null;
    });
});
```

### Install Banner 디버깅

-   주소창에 `chrome://flags` 입력
-   설정 옵션 중 **사용자 참여 검사 우회** 체크하여 조건 충족

### Web App Manifest 디버깅

-   크롬 개발자 도구의 `Application tab` 을 이용하여 설정 정보 확인 가능
-   **앱 아이콘 설치** 등을 테스트 해볼 수 있다.

### 서비스 워커 정의, 자바스크립트와 워커의 차이점

Caching, Offline, Native Features

### Service Worker 소개

-   **브라우저와 서버 사이의 미들웨어 역할을 하는 스크립트 파일**
-   PWA에서 가장 중요한 역할을 하고, Offline Experinece 와 Moblie & Web Push의 기반 기술

### Service Worker 특징

1. **브라우저의 백그라운드에서 실행**되며 웹 페이지와 별개의 라이프 싸이클을 가짐
    - Javascript UI 쓰레드랑 별도로 동작하는 또 다른 쓰레드
2. **네트워크 요청을 가로챌 수 있어** 해당 자원에 대한 캐쉬 제공 또는 서버에 자원 요청
    - 프로그래밍 가능한 네트워크 프록시(중계 서버)
3. 브라우저 종속적인 **생명주기로 백그라운드 동기화 기능 제공**
    - Push 알람의 진입접을 제공
4. Web & Moblie Push 수신이 가능하도록 Notification 제공
5. navigaotr.serviceworker로 접근
6. 기존 Javascript 와의 **별개의 자체 스코프**를 가짐
    - 크롬 개발자 도구의 Console 과의 별개의 서비스워커 전용 Console 존재
7. DOM 에 직접적으로 접근이 불가능 - postMessage() 이용
8. 사용하지 않을 때 **자체적으로 종료, 필요시에 다시 동작** (event-driven 존재)

### Service Worker 배경

기존에 이미 존재하던 기술들을 **보완 → 그리고 진화**

AppCache

-   오프라인 경험을 제공하기 위한 캐시 제공, HTML 표준
-   복수 페이지 앱에서 오동작, 파일 변화에 대하 둔감한 캐싱등의 문제

```jsx
<html manifest="example.appcahce">
</html>

// 서버에 추가 설정 필요 mime-type = text/cache-manifest
CACHE MANIFEST
# 2010-06-18:v3

# Explicitly cached entries
index.html
css/style.css

# Additional resources to cache
CACHE:
images/logo1.png
```

**Workers**

-   특정 작업을 병력 스크립트로 백그라운드에서 실행 및 처리하기 위한 수단, HTML 표준
-   종류 :
    -   Dedicated Workers, 라이프사이클 - 페이지 종속적
    -   **Shared Workers**, 브라우징 (브라우저) 컨텍스트 → 서비스 워커와 관련됌

**Shared Worker**

-   Javascript UI 쓰레드와 별개의 쓰레드, Global script scope
-   페이지에 비종속적 (페이지 라이프 사이클과 별개)
-   직접적인 DOM 접근 불가

그리하여 Service Worker 가 등장합니다.

> A service worker is a type of web worker. - W3C spec

> Service workers are a new browser feature that provice event-driven scripts that run independently of web pages - W3C Spec repo -

### Service Worker 등록

-   브라우저에 존재 유무를 확인 후 `register()` 사용

```jsx
if ("serviceWorker" in navigator) {
    navigator.serviceWOrker.register("/service-worker.js");
    // Promise 이용
    navigator.serviceWorker
        .register("/service-woker.js")
        .then(function (reg) {
            // 성공하면
            console.log("Okay it worked!", reg);
        })
        .catch(function (err) {
            console.log("Oops, an error occured", err);
        });
}
```

### Service Worker 설치

-   `register()` 에서 등록한 스크립트 파일에서 `install()` 호출

```jsx
self.addEventListener("install", function (event) {
    // 캐쉬 등록 또는 기타 로직 수행
});
```

```jsx
var CACHE_NAME = "cache-v1";
var filesToCache = ["/", "/js/app.js", "/css/base.css"];
```

-   `CACHE_NAME` : 캐쉬를 담을 파일명 정의
-   `filesToCache` : 캐쉬할 웹 자원들 정의

```jsx
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
		// 위에 지정한 캐쉬 목록을 'cache-v1' 캐쉬에 추가
		return cache.addAll(filesTocCache);
	}
}
```

-   `waitUntil()` : 안의 로직이 수행될 때 까지 대기

**주의 : 캐쉬할 파일 중 한개라도 실패하면 전체 실패. 이를 해결하기 위해 sw-toolbox 사용 가능**

**참고 링크**

-   [self 예약어](https://developer.mozilla.org/en-US/docs/Web/API/Window/self#Browser_compatibility)

<aside>
💡 **디버깅 시 주의 사항**

Application > unregister후에 다시 새로고침해야 적용
또는 update on reload 클릭

**파일 캐싱 에러 처리 요령**
반드시 catch()로 잡아줘야 해당 위치로 에러가 이동합니다.

-   [event.waitUntil()](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil)
-   [Cache Storage](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
-   [caches.open()](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open)
</aside>

실습 브랜치 안내

1. master -> 리포지토리의 맨 처음 (웹 페이지와 관련된 코드만 HTML, CSS, JS)
2. feature/manifest -> 완성된 웹 앱 매니페스트 파일이 존재
3. feature/sw-install -> install 이벤트까지 구현한 서비스워커 파일 존재
4. feature/sw-fetch ->
5. feature/sw-activate ->

### 서비스 워커 네트워크 요청 - fetch 이벤트 구현 및 동작 확인

Service Worker 네트워크 요청 응답

-   서비스워커 설치 후 캐쉬된 자원에 대한 네트워크 요청이 있을 때는 캐쉬로 돌려준다.

```jsx
self.addEvenListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
	}
}
```

-   `respondWith()` : Fetch 이벤트 응답(Response)를 반환
-   `match()` : 해당 request에 상응하는 캐쉬가 있으면 찾아서 돌려주고 아니면 `fetch()`로 자원 획득

**참고 링크**

-   [event.respondWith()](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)
-   [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
