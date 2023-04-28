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
