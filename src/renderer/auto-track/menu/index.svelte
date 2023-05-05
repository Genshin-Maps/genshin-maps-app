<script lang="ts">
    import { isPinned } from "@/renderer/auto-track/stores";
    import { onDestroy } from "svelte";
    // import logoConnect from "@/renderer/auto-track/assets/pin-connect.svg?assets";
    // import logoSettigns from "@/renderer/auto-track/assets/config.svg";
    // import logoShare from "@/renderer/auto-track/assets/pin-share.svg";

    let actionPin: HTMLDivElement;
    let actionConnect: HTMLDivElement;
    let actionConfig: HTMLDivElement;
    let actionShare: HTMLDivElement;

    let pinned = false;
    const unsubscribe = isPinned.subscribe(value => {
        pinned = value;
    });
    function togglePin() {
        isPinned.update(value => !value);
    }

    onDestroy(unsubscribe);

    export { togglePin, actionPin, actionConnect, actionConfig, actionShare };
</script>
<template>
    <div class="gps-action">
        <div bind:this={actionPin} class="maps-menu gps-pin {pinned ? 'gps-pinned' : ''}" title="내 위치로 이동"><!-- on:click={togglePin} -->
            <svg viewBox="0 0 1024 1024">
                <path d="M176 478.208l275.328 91.733333c1.28 0.426667 2.261333 1.408 2.688 2.688l91.733333 275.328a4.266667 4.266667 0 0 0 7.978667 0.341334l279.381333-651.861334a4.266667 4.266667 0 0 0-5.589333-5.589333L175.658667 470.186667a4.266667 4.266667 0 0 0 0.341333 7.978666z"></path>
            </svg>
            <p>따라가기</p>
        </div>
        <div bind:this={actionConnect} class="maps-menu gps-connect" title="플러그인 연결">
            <img alt="Load" class="gps-action-icon" /><!-- src={logoConnect} -->
            <p>실시간 연결</p>
        </div>
        <div bind:this={actionConfig} class="maps-menu gps-config hide" title="설정">
            <img alt="Load" class="gps-action-icon" /><!-- src={logoSettigns} -->
            <p>설정</p>
        </div>
        <div bind:this={actionShare} class="maps-menu gps-share" style="display: none;" title="멀티스크린 공유">
            <img alt="QR Code" class="gps-action-icon" /><!-- src={logoShare} -->
            <p>멀티스크린</p>
        </div>
        <div class="gps-share-dot">0</div>
    </div>
</template>