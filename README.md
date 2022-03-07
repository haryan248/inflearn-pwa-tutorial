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
