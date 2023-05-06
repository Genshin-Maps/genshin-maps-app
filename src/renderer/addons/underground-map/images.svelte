<script lang="ts">
    import { isUndergroundMapActive } from "@/renderer/addons/stores";
    import type { BackgroundImage } from "@t/renderer";
    import { onDestroy } from "svelte";
    import { unsafeWindow } from "@monkey";
    import { images } from "@/renderer/addons/assets/img/images";

    let active: boolean = false;
    let layerScale = unsafeWindow.MAPS_ViewSize / unsafeWindow.MAPS_Size;

    function getImageX(image: BackgroundImage) {
        return image.offset[0] + unsafeWindow.MAPS_RelativeX;
    }

    function getImageY(image: BackgroundImage) {
        return image.offset[1] + unsafeWindow.MAPS_RelativeY;
    }

    function getImageUrl(image: BackgroundImage) {
        return `https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/${image.url}`;
    }

    const unsubscribe = isUndergroundMapActive.subscribe((value) => {
        active = value;
    });

    export const redraw = () => {
        if (!active) return;

        layerScale = unsafeWindow.MAPS_ViewSize / unsafeWindow.MAPS_Size;
    };

    onDestroy(unsubscribe);
</script>

<template>
    {#if active == true}
        <div id="mapsLayerUnderground" class="underground-layer" style="width: {unsafeWindow.MAPS_Size}px; height: {unsafeWindow.MAPS_Size}px; transform: scale({layerScale});">
            {#each images as image, index}
                <div
                    class="underground-image"
                    data-index={index}
                    data-name={image.name}
                    style="width: {image.size[0]}px; height: {image.size[1]}px; transform: translate({getImageX(image)}px, {getImageY(image)}px) scale(1);"
                >
                    <div style="background-image: url({getImageUrl(image)}); background-size: {image.size[2]}%" />
                </div>
            {/each}
        </div>
        <div style="background-color: black; opacity: 0.5; width: 100%; height: 100%;" />
    {/if}
</template>
