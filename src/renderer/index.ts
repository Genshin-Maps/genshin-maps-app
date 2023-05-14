import { isFilterPinActive, isUndergroundMapActive, isChestPinLoaded } from "@/renderer/addons/stores";
import { isAlwaysOnTop } from "@/renderer/menu/stores";
import { get } from "svelte/store";
import { unsafeWindow } from "@monkey";
import addons from "@/renderer/addons";
import autoTrack from "@/renderer/auto-track";
import menu from "@/renderer/menu";

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
    function _isAlwaysOnTop() {
        return get(isAlwaysOnTop);
    }

    function _updateIsFilterPinActive(value: boolean) {
        return isFilterPinActive.set(value);
    }
    function _updateIsUndergroundMapActive(value: boolean) {
        return isUndergroundMapActive.set(value);
    }
    function _updateIsChestPinLoaded(value: boolean) {
        return isChestPinLoaded.set(value);
    }
    function _updateIsAlwaysOnTop(value: boolean) {
        return isAlwaysOnTop.set(value);
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
    function _toggleIsAlwaysOnTop() {
        return isAlwaysOnTop.update((value) => !value);
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
        isAlwaysOnTop: {
            get() {
                return _isAlwaysOnTop();
            },
            set(value: boolean) {
                _updateIsAlwaysOnTop(value);
            },
            toggle() {
                _toggleIsAlwaysOnTop();
            },
        },
    };
})();

export { addons, autoTrack, menu };
