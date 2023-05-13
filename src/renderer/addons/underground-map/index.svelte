<script lang="ts">
    import { isUndergroundMapActive } from "@/renderer/addons/stores";
    import { onMount, onDestroy } from "svelte";
    import { unsafeWindow } from "@monkey";
    import Images from "@/renderer/addons/underground-map/images.svelte";

    let active: boolean;
    let images: Images;
    let imagesWrapper: HTMLDivElement;

    const unsubscribe = isUndergroundMapActive.subscribe((value) => {
        active = value;
        unsafeWindow.setPinObjectRefresh();
    });

    function handleClick() {
        isUndergroundMapActive.update((active) => !active);
    }

    function redraw() {
        images.redraw();
    }

    function removeUnnecessary() {
        images.removeUnnecessary();
    }

    onMount(() => {
        const layer = document.getElementById("mapsLayerBackground");
        layer.after(imagesWrapper);
    });
    onDestroy(unsubscribe);
    export { redraw, removeUnnecessary };
</script>

<template>
    <div class="underground-images" bind:this={imagesWrapper}>
        <Images bind:this={images} />
    </div>
    <div class="maps-addons-switch-label">지하 맵</div>
    <button class="maps-addons-switch {active ? 'on' : ''}" on:click={handleClick} />
</template>

<style>
</style>
