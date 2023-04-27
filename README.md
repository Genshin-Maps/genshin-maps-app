# genshin-maps-app

[cvAutoTrack](https://github.com/GengGode/cvAutoTrack)을 이용해 원신 게임 화면을 읽어 현재 위치에 표시하기 위한 프로젝트로

현재 개발이 진행중입니다.

## Tree

```bash
root
│   .gitignore
│   forge.config.js
│   package.json
│   pnpm-lock.yaml
│   README.md
│   tsconfig.json
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
    │   │   main.ts # main electron 스크립트
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
    └───renderer # electron main과 격리된 renderer 스크립트 (preload)
            preload.ts
```
