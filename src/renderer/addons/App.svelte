<script lang="ts">
	import { isFilterPinActive, isUndergroundMapActive, isChestPinLoaded } from "@/renderer/addons/stores";
    import "@/renderer/addons/assets/select-box.css";
    import "@/renderer/addons/assets/addons.css";
    import { VanillaSelectBox } from "@/renderer/addons/assets/select-box";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
    import FilterChest from "@/renderer/addons/filter-chest/index.svelte";
    import FilterPin from "@/renderer/addons/filter-pin/index.svelte";
    import UndergroundMap from "@/renderer/addons/underground-map/index.svelte";
    import { makeObservable } from "@/renderer/addons/observable";

    let chestFilter: VanillaSelectBox;
    let filterPin: FilterPin;
    let undergroundMap: UndergroundMap;
    function init() {
        // 게임닷 맵스 메소드 오버라이드
        globalThis.drawMapsLayer = (function (originDrawMapsLayer) {
            "use strict";
            return (boolPanelHide: boolean) => {
                originDrawMapsLayer(boolPanelHide);
                adjustPin();
                undergroundMap.redraw();
                filterPin.removeUnnecessary();
            };
        })(globalThis.drawMapsLayer);

        globalThis.removePin = (function (originRemovePin) {
            "use strict";

            const _proxyLoadedPin = () => {
                isChestPinLoaded.set(globalThis.MAPS_PinLoad.filter((value: any) => value.name?.includes("보물상자")).length > 0);
                globalThis.MAPS_PinLoad = makeObservable(globalThis.MAPS_PinLoad);
                globalThis.MAPS_PinLoad.observe((_: number, value: any) => {
                    if (Object.prototype.toString.call(value) == "[object Object]" && value.name?.includes("보물상자")) {
                        isChestPinLoaded.set(true);
                    }
                });
            };

            _proxyLoadedPin();
            return (boolGroup: boolean, pinIndex: number, boolTabUpdate: boolean) => {
                originRemovePin(boolGroup, pinIndex, boolTabUpdate);
                _proxyLoadedPin();
            };
        })(globalThis.removePin);
    }

    function adjustPin() {
        if (Object.prototype.toString.call(globalThis.MAPS_ViewPin) != "[object Set]" || globalThis.MAPS_ViewPin.size <= 0) return;

        const selectedValues = chestFilter.getResult();
        const OBJECT_PIN_LAYER = document.getElementById("mapsLayerPoint");
        globalThis.MAPS_ViewPin.forEach((v: any) => {
            const arrDrawPin = globalThis.MAPS_PinDraw.get(v);
            if (Object.prototype.toString.call(arrDrawPin) != "[object Array]" || arrDrawPin.length <= 0) return true;

            let mapPinGroup = new Map();
            arrDrawPin.forEach((point: any) => {
                const arrPinData = globalThis.MAPS_PinLoad[point.pin];
                if (point.category && arrPinData.category[point.category]) {
                    const arrCategory = arrPinData.category[point.category];
                    if (arrPinData.name?.includes("보물상자")) {
                        if (selectedValues.includes(arrCategory.name) == false) {
                            document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`)?.remove();
                            return true;
                        }
                    }
                }
                if (globalThis.MAPS_State.pinGroup == true) {
                    // 핀 그룹화를 위해 평균 구하기.
                    let arrPinGroup = mapPinGroup.get(point.pin);
                    arrPinGroup = arrPinGroup ? arrPinGroup : { x: 0, y: 0, state: 0, length: 0, points: [], point: point };
                    arrPinGroup.x += point.x;
                    arrPinGroup.y += point.y;
                    arrPinGroup.points.push(point);
                    arrPinGroup.length++;
                    arrPinGroup.state = point.state ? arrPinGroup.state + 1 : arrPinGroup.state;

                    mapPinGroup.set(point.pin, arrPinGroup);
                    return false;
                }
                return true;
            });

            if (globalThis.MAPS_State.pinGroup) {
                let constants = {
                    isFilterPinActive: get(isFilterPinActive),
                    isUndergroundMapActive: get(isUndergroundMapActive)
                };
                mapPinGroup.forEach((value) => {
                    const arrData = v.split("/", 2);
                    let state = 0;
                    let length = 0;
                    let x = 0;
                    let y = 0;
                    for (const point of value.points) {
                        const pin = document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`);
                        if (pin) {
                            pin.remove();
                        }
                        const isUnderground = point.tag?.includes("지하");
                        if (constants.isFilterPinActive && constants.isUndergroundMapActive !== isUnderground) {
                            continue;
                        }
                        if (point.state) {
                            state++;
                        }
                        x += point.x;
                        y += point.y;
                        length++;
                    }

                    let objectPoint: any;
                    if (length > 1) {
                        console.log("redraw");
                        objectPoint = globalThis.drawPinObject(true, value.point, arrData);
                        objectPoint.className = "maps-point group";

                        let objectCount = document.createElement("p");
                        objectCount.innerText = state + "/" + length;
                        objectPoint.querySelector("div").appendChild(objectCount);
                        let groupX = x / length;
                        let groupY = y / length;

                        objectPoint.setAttribute("style", "transform: translate(" + (groupX + globalThis.MAPS_RelativeX) + "px, " + (groupY + globalThis.MAPS_RelativeY) + "px);");
                        objectPoint.setAttribute("data-state", state == length ? "true" : "false");
                        objectPoint.removeAttribute("data-tip");
                        if (constants.isUndergroundMapActive) {
                            objectPoint.setAttribute("data-is-underground", "true");
                        } else {
                            objectPoint.removeAttribute("data-is-underground");
                        }

                        // 사이즈 설정
                        objectPoint.style.marginLeft = objectPoint.style.marginTop = "-64px";
                        OBJECT_PIN_LAYER.appendChild(objectPoint);
                    } else {
                        for (const point of value.points) {
                            objectPoint = globalThis.drawPinObject(false, point, arrData);
                            OBJECT_PIN_LAYER.appendChild(objectPoint);
                        }
                    }
                });
            }
            return true;
        });
    }

    onMount(() => {
        init();
    });
</script>

<style>
</style>

<template>
    <div class="maps-addons">
        <FilterChest bind:chestFilter />
        <FilterPin bind:this={filterPin} />
        <UndergroundMap bind:this={undergroundMap} />
    </div>
</template>
