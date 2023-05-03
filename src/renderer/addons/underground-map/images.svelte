<script lang="ts">
    import { isUndergroundMapActive } from "@/renderer/addons/stores";
    // import { type BackgroundImage } from "@t/renderer";
    import { onDestroy } from "svelte";
    import { images } from "@/renderer/addons/assets/img/images";

    let active: boolean = false;
    let layerScale = globalThis.MAPS_ViewSize / globalThis.MAPS_Size;

    function getImageX(image: any) {
        return image.offset[0] + globalThis.MAPS_RelativeX;
    }

    function getImageY(image: any) {
        return image.offset[1] + globalThis.MAPS_RelativeY;
    }

    function getImageUrl(image: any) {
        return `https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/${image.url}`;
    }

    const unsubscribe = isUndergroundMapActive.subscribe(value => {
        active = value;
    });

    export const redraw = () => {
        if (!active) return;

        layerScale = globalThis.MAPS_ViewSize / globalThis.MAPS_Size;
    }

    onDestroy(unsubscribe);
</script>

<template>
    {#if active == true}
        <div id="mapsLayerUnderground" class="underground-layer" style="width: {globalThis.MAPS_Size}px; height: {globalThis.MAPS_Size}px; transform: scale({layerScale});">
            {#each images as image, index}
                <div class="underground-image" data-index="{index}" data-name="{image.name}" style="width: {image.size[0]}px; height: {image.size[1]}px; transform: translate({getImageX(image)}px, {getImageY(image)}px) scale(1);">
                    <div style="background-image: url({getImageUrl(image)}); background-size: {image.size[2]}%"></div>
                </div>
            {/each}
        </div>
        <div style="background-color: black; opacity: 0.5; width: 100%; height: 100%;"></div>
    {/if}
</template>
