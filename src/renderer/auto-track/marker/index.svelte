<script lang="ts">
    import { isPinned } from "@/renderer/auto-track/stores";
    // import { type CvatTrackData } from "@t/backend";
    import { type IpcRendererEvent } from "electron";
    import { onDestroy, onMount } from "svelte";

    let x = window.MAPS_RelativeX;
    let y = window.MAPS_RelativeY;
    let scale = window.MAPS_PointScale;
    
    let userMarker: HTMLDivElement;
    let pinned = false;
    const unsubscribe = isPinned.subscribe(value => {
        pinned = value;
        if (value) {
            redraw();
        }
    });

    function onTrack(_event: IpcRendererEvent, data: any) {
        // TODO: 작업 중
        let { m, x, y, r: rot, a: dir } = data; // err
        if (this.currentMap !== m) {
            if (this.mcEnsure < 10) {
                this.mcEnsure = this.mcEnsure + 1;
            } else {
                this.mcEnsure = 0;
                this.currentMap = m;
                if (this.mapInfo.has(this.currentMap)) {
                    const mapName = this.mapInfo.get(this.currentMap);
                    if (mapName) this.onPlayerMovedMap(mapName);
                } else {
                    this.dialog.alertDialog("GPS", "알 수 없는 지도입니다.", 0, true);
                }
            }
        } else {
            const pos = [y, x];
            switch (this.currentMap) {
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
            rpos[0] = pos[0] + globalThis.MAPS_RelativeY - 13;
            rpos[1] = pos[1] + globalThis.MAPS_RelativeX - 8;
            if (pinned) {
                let distance = Math.pow(this.focusPos[0] - pos[0], 2) + Math.pow(this.focusPos[1] - pos[1], 2);
                distance = Math.sqrt(distance);
                if (distance > 15) {
                    this.focusPos[0] = pos[0];
                    this.focusPos[1] = pos[1];
                    this.setFocusPoint(pos[1], pos[0]);
                }
            }
            let o = this.userMarker.userMarker.style["transform"];
            let t, s, l, c;
            t = "translate";
            s = this.userMarker.userMarker.style["transform"].indexOf(t) + t.length + 1;
            l = this.userMarker.userMarker.style["transform"].indexOf(")", s);
            c = this.userMarker.userMarker.style["transform"].substring(s, l);

            let setValues = [Math.round(rpos[1]) + "px", Math.round(rpos[0]) + "px"];

            this.userMarker.userMarker.style["transform"] = o.substring(0, s) + setValues.join(", ") + o.substring(s + c.length);

            this.userMarker.userMarkerIcon.style.setProperty("--dir", 0 - dir + "deg");
            this.userMarker.userMarkerIcon.style.setProperty("--rot", 0 - rot + "deg");
        }
    }

    export function redraw() {
        // TODO: 작업 중
        // let x: any, y: any;
        // let t: string, s, l, c;
        // t = "translate";
        // s = userMarker.style["transform"].indexOf(t) + t.length + 1;
        // l = userMarker.style["transform"].indexOf(")", s);
        // c = userMarker.style["transform"].substring(s, l);
        // scale = window.MAPS_PointScale;

        // if (c) {
        //     [x, y] = c.split(", ");
        //     x = parseInt(x);
        //     y = parseInt(y);
        //     setFocusScroll(x, y);
        // }
    };

    // function setFocusScroll(x: number, y: number) {
    //     if (window.objectLayerBase instanceof HTMLDivElement && window.objectViewer instanceof HTMLDivElement) {
    //         let baseView: DOMRect = window.objectLayerBase.getClientRects()[0];
    //         let nowView: DOMRect = window.objectViewer.getClientRects()[0];
    //         // 현재 화면에서 보고 있는 비율 확인
    //         var viewWidth = (window.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
    //         var viewHeight = (window.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

    //         var scrollX = ((x - viewWidth / 2) / 100) * window.MAPS_Scale;
    //         var scrollY = ((y - viewHeight / 2) / 100) * window.MAPS_Scale;

    //         window.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    //     }
    // }

    onMount(() => {
        window.objectLayerPin.appendChild(userMarker);
        window.bridge.onTrack(onTrack);
    });

    onDestroy(unsubscribe);
</script>

<tmplate>
    <div bind:this={userMarker} class="gps-user-marker {pinned ? 'gps-pinned' : ''}" style="transform-origin: center; translate({x}px, {y}px) scale({scale});">
        <div class="gps-user-position"></div>
    </div>
</tmplate>
