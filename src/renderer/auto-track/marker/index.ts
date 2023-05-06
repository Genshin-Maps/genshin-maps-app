import { unsafeWindow } from "@monkey";

function setFocusScroll(x: number, y: number) {
    if (unsafeWindow.objectLayerBase instanceof HTMLDivElement && unsafeWindow.objectViewer instanceof HTMLDivElement) {
        let baseView: DOMRect = unsafeWindow.objectLayerBase.getClientRects()[0];
        let nowView: DOMRect = unsafeWindow.objectViewer.getClientRects()[0];
        // 현재 화면에서 보고 있는 비율 확인
        var viewWidth = (unsafeWindow.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        var viewHeight = (unsafeWindow.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        var scrollX = ((x - viewWidth / 2) / 100) * unsafeWindow.MAPS_Scale;
        var scrollY = ((y - viewHeight / 2) / 100) * unsafeWindow.MAPS_Scale;

        unsafeWindow.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

function setFocusPoint(x: number, y: number) {
    if (unsafeWindow.objectLayerBase instanceof HTMLDivElement && unsafeWindow.objectViewer instanceof HTMLDivElement) {
        x = x + unsafeWindow.MAPS_RelativeX;
        y = y + unsafeWindow.MAPS_RelativeY;

        var baseView = unsafeWindow.objectLayerBase.getClientRects()[0];
        var nowView = unsafeWindow.objectViewer.getClientRects()[0];

        // 현재 화면에서 보고 있는 비율 확인
        var viewWidth = (unsafeWindow.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        var viewHeight = (unsafeWindow.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        var scrollX = ((x - viewWidth / 2) / 100) * unsafeWindow.MAPS_Scale;
        var scrollY = ((y - viewHeight / 2) / 100) * unsafeWindow.MAPS_Scale;

        unsafeWindow.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

export { setFocusScroll, setFocusPoint };
