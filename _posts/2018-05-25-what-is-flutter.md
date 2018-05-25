---
title: Flutter 소개 및 설치
date: 2018-05-25
tags: flutter
category: development

---

Flutter는 구글에서 만든 모바일 앱 SDK입니다. Flutter를 이용하면 한번의 코드 작성으로 아이폰과 안드로이드 앱을 만들 수 있습니다. 2017년에 처음 공개 되었고 2018년 현재는 Beta3 버전이 공개 되어 있습니다.

2018년 5월 7일에 구글 개발자 블로그에 올라온 내용에 따르면 내년에 1.0버전을 릴리즈 할 예정이라고 합니다.

> We are targeting a 1.0 release within the next year, but we will continue to adjust the schedule as necessary.

참고 : [Ready for Production Apps: Flutter Beta 3](https://developers.googleblog.com/2018/05/ready-for-production-apps-flutter-beta-3.html?utm_source=google&utm_medium=banner&utm_campaign=beta_3)

Flutter는 Dart라는 언어를 사용하며, 이 언어도 구글에서 만들었습니다.

~~*무서운 구글..*~~

## 장점

Flutter공식 홈페이지에서 소개하는 장점은 다음과 같습니다.

- 빠른 개발

  - 핫 리로드

- 유연한 UI

  - Material, Cupertino (iOS) 디자인 지원
  - 풍부한 모션 API
  - 부드럽고 자연스러운 스크롤링

- Reactive Framework

  - Reactive Framework와 풍부한 플랫폼, 레이아웃, 기본 위젯을 이용하여 손쉽게 UI 구성

- 네이티브 기능 접근

  - Java, Swift, ObjC로 짜여있는 코드를 재사용 가능

  - Android, iOS에서 재공하는 네이티브 기능 및 SDK에 접근 가능

    

각 항목에 대한 더욱 자세한 내용은 [Flutter 홈페이지](https://flutter.io) 에서 확인할 수 있습니다.

## 설치

Flutter는 현재 Windows, macOS, Linux환경을 지원하며, 아래의 링크에서 현재 사용하는 OS버전에 맞게 설치하면 됩니다.

해당 글을 보고 설치하면 큰 어려움 없이 간단하게 설치 할 수 있습니다.

[Flutter 설치](https://flutter.io/get-started/install/)

## IDE 설정

Flutter는 아무 텍스트 에디터 + Flutter command-line tools과 함께하면 앱을 만들 수 있지만, 더 나은 사용성을 위해 IDE에 Flutter 플러그인을 설치해서 사용하는 것을 추천합니다.

Flutter 플러그인을 이용하면 하이라이팅, 자동 완성, 시작, 디버그 등 다양한 기능을 사용할 수 있습니다.

플러그인은 Android Studio, IntelliJ, VS Code에서 사용하실 수 있습니다.

[Flutter IDE 설정](https://flutter.io/get-started/editor/#androidstudio)

## 마치며

Flutter의 간단한 소개와, 설치 방법을 적어 보았습니다.

이 글을 적고 있는 지금 Flutter를 이용하여 간단한 앱을 만들어 보며 적고 있습니다.

Flutter를 사용하기 위해서 새로운 언어를 사용해야 한다는 생각이 부담될 수 있지만 생각보다 큰 어려움 없이 사용하고 있습니다.

원래 개발을 하던 사람이라면 간단히 Dart의 기본적인 문법 먼저 보고 오셔도 좋을 것 같습니다.

과거에 아이오닉을 이용하여  앱을 제작해본 경험이 있는데, 아이오닉과 비교해서 개발 속도나, 퍼포먼스 등 정말 비교할 수 없을정도로 Flutter가 우세한 것 같다는 생각이 듭니다.

또한 디자인 적인 면에서도 Flutter가 공식으로 Material 컴포넌트들을 재공하기 때문에 간단하고 빠르게 아름다운..🤩🤭 앱을 만들 수 있습니다.

다음에는 예제 앱을 만들고 실행시켜 보는 내용을 포스팅 해보도록 하겠습니다.
