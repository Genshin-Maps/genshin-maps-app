function setFocusScroll(x: number, y: number) {
    if (window.objectLayerBase instanceof HTMLDivElement && window.objectViewer instanceof HTMLDivElement) {
        let baseView: DOMRect = window.objectLayerBase.getClientRects()[0];
        let nowView: DOMRect = window.objectViewer.getClientRects()[0];
        // 현재 화면에서 보고 있는 비율 확인
        var viewWidth = (window.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        var viewHeight = (window.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        var scrollX = ((x - viewWidth / 2) / 100) * window.MAPS_Scale;
        var scrollY = ((y - viewHeight / 2) / 100) * window.MAPS_Scale;

        window.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

function setFocusPoint(x: number, y: number) {
    if (window.objectLayerBase instanceof HTMLDivElement && window.objectViewer instanceof HTMLDivElement) {
        x = x + window.MAPS_RelativeX;
        y = y + window.MAPS_RelativeY;

        var baseView = window.objectLayerBase.getClientRects()[0];
        var nowView = window.objectViewer.getClientRects()[0];

        // 현재 화면에서 보고 있는 비율 확인
        var viewWidth = (window.MAPS_Size / 100) * (nowView.width / (baseView.width / 100));
        var viewHeight = (window.MAPS_Size / 100) * (nowView.height / (baseView.height / 100));

        var scrollX = ((x - viewWidth / 2) / 100) * window.MAPS_Scale;
        var scrollY = ((y - viewHeight / 2) / 100) * window.MAPS_Scale;

        window.objectViewer.scrollTo({ top: scrollY, left: scrollX, behavior: "smooth" });
    }
}

export { setFocusScroll, setFocusPoint };
