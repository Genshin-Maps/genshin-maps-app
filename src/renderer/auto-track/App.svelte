<script lang="ts">
    import "@/renderer/auto-track/assets/style.scss";
    import { onMount } from "svelte";
    import { unsafeWindow } from "@monkey";
    import UserMarker from "@/renderer/auto-track/marker/index.svelte";

    let userMarker: UserMarker;
    function init() {
        unsafeWindow.drawMapsScale = (function (originDrawMapsScale) {
            "use strict";
            return (...args: unknown[]) => {
                const ret = originDrawMapsScale.apply(this, args);
                userMarker.onScaleChange();
                return ret;
            };
        })(unsafeWindow.drawMapsScale);

        unsafeWindow.changeMapsType = (function (originChangeMapsType) {
            "use strict";
            return (...args: unknown[]) => {
                const ret = originChangeMapsType.apply(this, args);
                // site.onChangeMap.apply(site, [args]);
                return ret;
            };
        })(unsafeWindow.changeMapsType);
    }

    onMount(() => {
        init();
    });
</script>

<template>
    <UserMarker bind:this={userMarker} />
</template>
