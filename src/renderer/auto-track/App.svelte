<script lang="ts">
    import "@/renderer/auto-track/assets/style.scss";
    import { onMount } from "svelte";
    import { unsafeWindow } from "@monkey";
    import Menu from "@/renderer/auto-track/menu/index.svelte";
    import UserMarker from "@/renderer/auto-track/marker/index.svelte";

    let userMarker: UserMarker;
    function init() {
        unsafeWindow.drawMapsScale = (function (originDrawMapsScale) {
            "use strict";
            return (args: any) => {
                const ret = originDrawMapsScale.apply(this, [args]);
                userMarker.onScaleChange();
                return ret;
            };
        })(unsafeWindow.drawMapsScale);

        unsafeWindow.changeMapsType = (function (originChangeMapsType) {
            "use strict";
            return (args: any) => {
                const ret = originChangeMapsType.apply(this, [args]);
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
    <Menu />
    <UserMarker bind:this={userMarker} />
</template>
