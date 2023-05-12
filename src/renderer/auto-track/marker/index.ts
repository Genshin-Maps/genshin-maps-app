import { unsafeWindow } from "@monkey";

function setFocusScroll(x: number, y: number) {
    if (unsafeWindow.objectLayerBase instanceof HTMLDivElement && unsafeWindow.objectViewer instanceof HTMLDivElement) {
        const baseView: DOMRect = unsafeWindow.objectLayerBase.getClientRects()[0];
        const nowView: DOMRect = unsafeWindow.objectViewer.getClientRects()[0];
        // 현재 화면에서 보고 있는 비율 확인
        const viewWidth = (unsafeWindow.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        const viewHeight = (unsafeWindow.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        const scrollX = ((x - viewWidth / 2) / 100) * unsafeWindow.MAPS_Scale;
        const scrollY = ((y - viewHeight / 2) / 100) * unsafeWindow.MAPS_Scale;

        unsafeWindow.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

function setFocusPoint(x: number, y: number) {
    if (unsafeWindow.objectLayerBase instanceof HTMLDivElement && unsafeWindow.objectViewer instanceof HTMLDivElement) {
        x = x + unsafeWindow.MAPS_RelativeX;
        y = y + unsafeWindow.MAPS_RelativeY;

        const baseView = unsafeWindow.objectLayerBase.getClientRects()[0];
        const nowView = unsafeWindow.objectViewer.getClientRects()[0];

        // 현재 화면에서 보고 있는 비율 확인
        const viewWidth = (unsafeWindow.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        const viewHeight = (unsafeWindow.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        const scrollX = ((x - viewWidth / 2) / 100) * unsafeWindow.MAPS_Scale;
        const scrollY = ((y - viewHeight / 2) / 100) * unsafeWindow.MAPS_Scale;

        unsafeWindow.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

export { setFocusScroll, setFocusPoint };
