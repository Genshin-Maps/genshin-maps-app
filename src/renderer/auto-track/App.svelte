<script lang="ts">
    import "@/renderer/auto-track/assets/style.scss";
	import { onMount } from "svelte";
    import UserMarker from "@/renderer/auto-track/marker/index.svelte";

    function init() {
        window.drawMapsScale = (function (originDrawMapsScale) {
            "use strict";
            return (args: any) => {
                const ret = originDrawMapsScale.apply(this, [args]);
                // redraw();
                return ret;
            };
        })(window.drawMapsScale);
        // const Hooked_drawMapsScale = window.drawMapsScale;
        // globalThis.drawMapsScale = function (args: any) {
        //     var ret = Hooked_drawMapsScale.apply(this, [args]);
        //     let o = site.userMarker.userMarker.style["transform"];
        //     let t, s, l, c;
        //     t = "scale";
        //     s = o.indexOf(t) + "scale".length + 1;
        //     l = o.indexOf(")", s);
        //     c = o.substring(s, l - s);

        //     let setValues = [globalThis.MAPS_PointScale];

        //     site.userMarker.userMarker.style["transform"] = o.substring(0, s) + setValues.join(", ") + o.substring(s + c.length);
        //     return ret;
        // };

        // const Hooked_changeMapsType = globalThis.changeMapsType;
        // globalThis.changeMapsType = function (args) {
        //     var ret = Hooked_changeMapsType.apply(this, [args]);
        //     site.onChangeMap.apply(site, [args]);

        //     return ret;
        // };
    }

    onMount(() => {
        init();
    });
</script>

<style>
</style>

<template>
    <UserMarker></UserMarker>
</template>
