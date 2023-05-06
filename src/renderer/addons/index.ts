import { isFilterPinActive, isUndergroundMapActive, isChestPinLoaded } from "@/renderer/addons/stores";
import { get } from "svelte/store";
import { unsafeWindow } from "@monkey";
import App from "@/renderer/addons/App.svelte";

const addons = new App({
    target: document.body,
    props: {},
});
unsafeWindow.$store = (function () {
    function _isFilterPinActive() {
        return get(isFilterPinActive);
    }
    function _isUndergroundMapActive() {
        return get(isUndergroundMapActive);
    }
    function _isChestPinLoaded() {
        return get(isChestPinLoaded);
    }

    function _updateIsFilterPinActive(value: boolean) {
        return isFilterPinActive.update((_) => value);
    }
    function _updateIsUndergroundMapActive(value: boolean) {
        return isUndergroundMapActive.update((_) => value);
    }
    function _updateIsChestPinLoaded(value: boolean) {
        return isChestPinLoaded.update((_) => value);
    }

    function _toggleIsFilterPinActive() {
        return isFilterPinActive.update((value) => !value);
    }
    function _toggleIsUndergroundMapActive() {
        return isUndergroundMapActive.update((value) => !value);
    }
    function _toggleIsChestPinLoaded() {
        return isChestPinLoaded.update((value) => !value);
    }

    return {
        isFilterPinActive: {
            get() {
                return _isFilterPinActive();
            },
            set(value: boolean) {
                _updateIsFilterPinActive(value);
            },
            toggle() {
                _toggleIsFilterPinActive();
            },
        },
        isUndergroundMapActive: {
            get() {
                return _isUndergroundMapActive();
            },
            set(value: boolean) {
                _updateIsUndergroundMapActive(value);
            },
            toggle() {
                _toggleIsUndergroundMapActive();
            },
        },
        isChestPinLoaded: {
            get() {
                return _isChestPinLoaded();
            },
            set(value: boolean) {
                _updateIsChestPinLoaded(value);
            },
            toggle() {
                _toggleIsChestPinLoaded();
            },
        },
    };
})();

export default addons;
