# genshin-maps-app

[cvAutoTrack](https://github.com/GengGode/cvAutoTrack)을 이용해 원신 게임 화면을 읽어 현재 위치에 표시하기 위한 프로젝트로

현재 개발이 진행중입니다.

## Tree

```bash
root
│   .eslintignore
│   .eslintrc.js
│   .gitignore
│   .prettierignore
│   .prettierrc
│   dev-app-update.yml # TODO: 용도 파악 후 수정 필요
│   electron-builder.yml # TODO: 필요한 사양만 남기고 제거
│   electron.vite.config.js # electron을 위한 vite config
│   package.json
│   pnpm-lock.yaml
│   README.md
│   svelte.config.mjs # svelte 설정
│   tsconfig.json
│   tsconfig.node.json # electron backend 를 위한 tsconfig
│
│
├───@types
│       index.d.ts # 프로젝트의 전역 타입 정의 스크립트
│
└───src
    ├───backend # electron의 backend context에서 실행되는 스크립트
    │   │   config.ts
    │   │   handlers.ts # renderer ipc와 통신할 때 사용되는 핸들러
    │   │   load-extension.ts
    │   │   index.ts # main electron 스크립트
    │   │
    │   └───lib # electron에서 자체 app 로직 이외의 스크립트
    │       ├───cvat # cvAutoTrack의 bindings, implementations
    │       │   │   cvat-ffi.ts # Cvat bindings를 담는 library load 호출 스크립트
    │       │   │   cvatWorkerManager.ts # Cvat worker를 관리하는 singleton class
    │       │   │   index.ts # Cvat singleton class
    │       │   │   utils.ts
    │       │   │
    │       │   └───worker # Cvat의 워커 스크립트
    │       │           trackWorker.ts
    │       │
    │       └───utils # 기타 util 코드
    │               index.ts
    │
    ├───preload # electron main과 격리된 preload 스크립트
    │       index.ts
    │
    └───renderer # gamedot maps에 로드되어 실행될 스크립트
        │   index.ts
        │
        ├───auto-track # cvAutoTrack 기능을 위한 로직
        │
        └───unnamed # 지하맵과 맵스 확장 기능을 위한 로직
```

## 참고 사항

### 오류

#### No native build was found

> lwahonen/ffi-napi는 환경에 따라 빌드하여 사용하는 라이브러리여서, Electron의 Node.js 버전에 맞춰 빌드할 필요가 있다.

pnpm rebuild로 빌드를 다시 시도할 수 있다.

빌드 명령어와 실행 성공 결과 예시

```cmd
pnpm rb
```

```text
node_modules/.pnpm/es5-ext@0.10.62/node_modules/es5-ext: Running postinstall script, done in 90ms
. postinstall$ electron-builder install-app-deps
│ • electron-builder version=23.6.0
│ • loaded configuration file=D:\Environment\workspace\genshin-maps-app\electron-builder.yml
│ • rebuilding native dependencies dependencies=@lwahonen/ffi-napi@4.0.12, @lwahonen/ref-napi@4.0.8 platform=win32 arch=x64
└─ Done in 12.9s
```
