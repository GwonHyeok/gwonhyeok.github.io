---
title: 맥OS Flutter 개발환경 구축
date: 2018-05-27
tags: flutter
category: development

---

# macOS에 Flutter 개발환경 구축

> Flutter를 macOS에 설치하는 법 입니다.



### 시스템 요구 사항

Flutter 를 설치하기 위해서는 아래와 같은 최소 사항을 필요로 합니다.

- 운영 체제 : macOS (64-bit)
- 디스크 공간 : 700 MB (IDE용량이나 / Tools 용량 제외)
- Tools : (bash, mkdir, rm, git, curl, unzip, which)

### Flutter SDK 다운로드

1. [Flutter 설치 페이지 ](https://flutter.io/setup-macos/)에서 가장 최신 버전의 SDK를 다운로드 받습니다.
2. 받은 압축 파일을 희망하는 위치에 압축을 풉니다.
3. flutter tool을 PATH에 추가합니다.

```bash
# Flutter 파일 다운로드 (flutter_macos_v0.4.4-beta.zip)
# 이 글을 적을때는 flutter 버전이 0.4.4 가 제일 최신 버전입니다.
# 위의 링크에 들어가서 파일을 직접 받으면 되지만 설치 방법을 설명 드리기 위해 다운로드 과정부터 bash로 작성하도록 하겠습니다.

# Development 폴더 생성, 이동
mkdir ~/development
cd ~/development

# flutter SDK 0.4.4 다운로드
wget https://storage.googleapis.com/flutter_infra/releases/beta/macos/flutter_macos_v0.4.4-beta.zip

# 압축 해제
unzip ./flutter_macos_v0.4.4-beta.zip

# PATH 추가
# 단 이 방법으로 PATH에 추가하면 터미널을 껐다 킬때마다 다시 flutter sdk 경로를 PATH에 다시 등록 해줘야 합니다.
# PATH를 영구적으로 등록하기 위해서는 $HOME/.bash_profile 파일을 수정해야 합니다.
# 밑에 자세히 적어놓도록 하겠습니다.
export PATH=`pwd`/flutter/bin:$PATH

```

### PATH 영구 설정

터미널 어느 세션이든 flutter 명령어를 사용하기 위해서는 bash_profile에 PATH를 업데이트 하도록 설정 해줘야합니다.

설명은 위의 Flutter SDK 다운로드 글을 그대로 따라 했을 경우로 적겠습니다.

- flutter sdk 위치 : ~/development/

```bash
# vim을 이용해서 $HOME/.bash_profile 수정혹은 추가
vim $HOME/.bash_profile

# 가장 하단에 export PATH="$HOME/development/flutter/bin:$PATH" 를 추가 후 저장합니다.

```

### Flutter Doctor 실행

flutter doctor 명령어 실행시 flutter 설치를 완료하기 위해 필요한 의존성들을 볼 수 있으며 어떤 항목에 문제가 있는지 쉽게 알 수 있습니다.

- Android Stuido & flutter plugins
- VS Code & flutter plugins
- IntelliJ & flutter plugins
- Android SDK 
- Xcode

```bash
flutter doctor
```

### Platform 설치

macOS의 경우 iOS Android앱 모두 개발이 가능합니다.

iOS, Android 중 하나만 설정해도 앱을 개발할 수 있지만, Flutter를 두가지 플랫폼에서 에서 개발하기 위해서 두 플랫폼다 개발 가능한 환경으로 만듭니다.

### iOS 설정

#### Xcode 설치

Flutter를 이용하여 iOS 앱을 개발하기 위해서는 Xcode 9.0 이상의 버전을 필요로 합니다.

Xcode는 AppStore에서 설치하면 됩니다.

Xcode를 처음 설치한 유저의 경우 

```bash
sudo xcode-select --switch
```

명령어를 이용하여 Xcode command-line tools를 설치 해야합니다.

#### iOS 기기에 배포

Flutter 앱을 실제 기기에 배포하기 위해서는 몇가지 도구와, 애플 계정이 필요합니다.

1. homebrew 설치

2. iOS 기기에 Flutter 앱을 설치 하기 위해 필요로 하는 배포툴 설치

   ```bash
   brew update
   brew install --HEAD libimobiledevice
   brew install ideviceinstaller ios-deploy cocoapods
   pod setup
   ```

### Android 설정

#### Android Studio 설치

1. [Android Studio](https://developer.android.com/studio/index.html) 홈페이지에서 다운로드후 설치 합니다.
2. Android Studio 실행 후 Setup WIzard에서 최신 버전의 Android SDK, Android SDK Platform-Tools, Android SDK Build-Tools를 설치 합니다.

### 마무리

위의 과정대로 flutter를 설치 할 수 있으며 설치시 지금 설치 한게 제대로 설치 되었는지 알고싶다면

마법 같은 ```flutter doctor```를 이용해서 결과를 보고 고쳐 나갈 수 있습니다.

만약 맥에서 Android, iOS 개발을 꾸준히 해오던 사람이라면 Android 의 경우 설정할게 없고, iOS 의 경우에는 brew 에서 libimobiledevice, ideviceinstaller,ios-deploy 정도만 설치하면 되기 때문에 큰 어려움 없이 Flutter를 설치 할 수 있습니다.



