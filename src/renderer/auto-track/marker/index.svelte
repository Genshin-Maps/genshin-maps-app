<script lang="ts">
    import { isPinned, currnetMap } from "@/renderer/auto-track/stores";
    // import { type CvatTrackData } from "@t/backend";
    // import { type IpcRendererEvent } from "electron";
    import { onDestroy, onMount } from "svelte";
    import { setFocusScroll, setFocusPoint } from "@/renderer/auto-track/marker";

    let markerX = window.MAPS_RelativeX;
    let markerY = window.MAPS_RelativeY;
    let markerScale = window.MAPS_PointScale;

    let userMarker: HTMLDivElement;
    let userMarkerIcon: HTMLDivElement;

    let pinned = false;
    let currentMapValue = 0;
    const unsubscribeAll = [];
    unsubscribeAll.push(
        isPinned.subscribe((value) => {
            pinned = value;
            if (value) {
                setFocusScroll(markerX, markerY);
                if (this.mapInfo.get(currentMapValue) !== window.MAPS_Type) {
                    window.changeMapsType(this.mapInfo.get(currentMapValue));
                }
            }
        }),
        currnetMap.subscribe((value) => {
            currentMapValue = value;
            // TODO: 맵 변경 시 처리
        }),
    );

    function onTrack(_event: any, data: any) {
        // TODO: 작업 필요
        let { m, x, y, r: rot, a: dir, err } = data;
        if (err) {
            console.log("위치를 얻는 도중 오류가 발생했습니다.");
            // this.dialog.alertDialog('GPS', '위치를 얻는 도중 오류가 발생했습니다.', 0, true);
            return;
        }
        if (this.dialog.isShowing) {
            console.log("위치를 얻는 도중 오류가 발생했습니다.");
            // this.dialog.closeDialog(null, "위치를 얻는 도중 오류가 발생했습니다.");
        }
        if (currentMapValue !== m) {
            // TODO: 수정 필요
            if (this.mcEnsure < 10) {
                this.mcEnsure = this.mcEnsure + 1;
            } else {
                this.mcEnsure = 0;
                currentMapValue = m;
                if (this.mapInfo.has(currentMapValue)) {
                    const mapName = this.mapInfo.get(currentMapValue);
                    if (mapName) this.onPlayerMovedMap(mapName);
                } else {
                    // this.dialog.alertDialog("GPS", "알 수 없는 지도입니다.", 0, true);
                    console.log("알 수 없는 지도입니다.");
                }
            }
        } else {
            const pos = [y, x];
            switch (currentMapValue) {
                case 0:
                    pos[0] = (pos[0] + 5890) / 2;
                    pos[1] = (pos[1] - 2285) / 2;
                    break;
                case 1:
                    pos[0] = pos[0] * 1.275 - 670;
                    pos[1] = pos[1] * 1.275 - 2247;
                    break;
                case 2:
                    pos[0] = pos[0] * 1.275 - 225;
                    pos[1] = pos[1] * 1.275 - 2060;
                    break;
                default:
                    pos[0] = (pos[0] + 5890) / 2;
                    pos[1] = (pos[1] - 2285) / 2;
            }
            let rpos = [pos[0], pos[1]];
            rpos[0] = pos[0] + window.MAPS_RelativeY - 13;
            rpos[1] = pos[1] + window.MAPS_RelativeX - 8;
            if (pinned) {
                let distance = Math.pow(this.focusPos[0] - pos[0], 2) + Math.pow(this.focusPos[1] - pos[1], 2);
                distance = Math.sqrt(distance);
                if (distance > 15) {
                    this.focusPos[0] = pos[0];
                    this.focusPos[1] = pos[1];
                    setFocusPoint(pos[1], pos[0]);
                }
            }

            markerX = Math.round(rpos[1]);
            markerY = Math.round(rpos[0]);

            userMarkerIcon.style.setProperty("--dir", 0 - dir + "deg");
            userMarkerIcon.style.setProperty("--rot", 0 - rot + "deg");
        }
    }

    export let isHover = false;

    export function onScaleChange() {
        markerScale = window.MAPS_PointScale;
    }

    onMount(() => {
        window.objectLayerPin.appendChild(userMarker);
        window.bridge.onTrack(onTrack);
    });

    onDestroy(() => {
        unsubscribeAll.forEach((item) => item());
    });
</script>

<tmplate>
    <div
        bind:this={userMarker}
        class="gps-user-marker {pinned ? 'gps-pinned' : ''} {isHover ? 'hover' : ''}"
        style="transform-origin: center; translate({markerX}px, {markerY}px) scale({markerScale});"
    >
        <div bind:this={userMarkerIcon} class="gps-user-position" />
    </div>
</tmplate>
