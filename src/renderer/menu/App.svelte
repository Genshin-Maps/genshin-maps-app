<script lang="ts">
    import "@/renderer/menu/assets/style.scss";
    import { isFilterPinActive, isUndergroundMapActive } from "@/renderer/addons/stores";
    import { isPinned, isGpsActive } from "@/renderer/auto-track/stores";
    import { isAlwaysOnTop } from "@/renderer/menu/stores";
    import { onMount, onDestroy } from "svelte";
    import { unsafeWindow } from "@monkey";
    import type { MenuItem } from "@t/renderer";
    import LogoConfig from "@/renderer/menu/assets/logo-config.svelte";
    import LogoConnect from "@/renderer/menu/assets/logo-connect.svelte";
    import LogoNavigation from "@/renderer/menu/assets/logo-navigation.svelte";
    import LogoShare from "@/renderer/menu/assets/logo-share.svelte";

    let topMenu: HTMLDivElement;
    let sideMenu: HTMLDivElement;

    let pinned = false;
    let gpsActive = false;
    let alwaysOnTop = false;
    let alwaysOnTopMenu: MenuItem | null = null;

    const unsubscribeAll = [];
    unsubscribeAll.push(
        isPinned.subscribe((value) => {
            pinned = value;
        }),
        isGpsActive.subscribe((value) => {
            gpsActive = value;
        }),
        isAlwaysOnTop.subscribe((value) => {
            alwaysOnTop = value;
            if (alwaysOnTopMenu) alwaysOnTopMenu.enabled = !value;
            if (import.meta.env?.VITE_USERSCRIPT !== true) {
                alwaysOnTop ? document.body.classList.remove("electron") : document.body.classList.add("electron");
            }
        }),
    );
    let menus: MenuItem[] = [
        {
            label: "GPS",
            logo: LogoNavigation,
            submenu: [
                {
                    label: "따라가기",
                    click: () => {
                        isPinned.update((v) => !v);
                    },
                    class: () => {
                        // if (!pinned) {
                        //     return "hide";
                        // }
                        return "";
                    },
                },
                {
                    label: "실시간 연결",
                    logo: LogoConnect,
                    click: () => {
                        isGpsActive.update((v) => !v);
                    },
                    class: () => {
                        if (!gpsActive) {
                            return "hide";
                        }
                        return "";
                    },
                },
                {
                    label: "설정",
                    logo: LogoConfig,
                    click: () => {},
                    class: () => {
                        if (!gpsActive) {
                            return "hide";
                        }
                        return "";
                    },
                },
                {
                    label: "멀티스크린 공유",
                    logo: LogoShare,
                    click: () => {},
                    class: () => {
                        return "hide";
                    },
                },
            ],
        },
        {
            label: "보기",
            logo: LogoConfig,
            submenu: [
                {
                    label: "지하맵 켜기/끄기",
                    accelerator: "Alt+G",
                    click: () => {
                        isUndergroundMapActive.update((v) => !v);
                    },
                },
                {
                    label: "활성맵 핀 켜기/끄기",
                    accelerator: "Alt+A",
                    click: () => {
                        isFilterPinActive.update((v) => !v);
                    },
                },
            ],
        },
    ];
    let topMenus: MenuItem[] = menus.slice();

    if (import.meta.env?.VITE_USERSCRIPT !== true) {
        const { ipcRenderer } = unsafeWindow.electron;
        alwaysOnTopMenu = {
            label: "항상 위에 표시",
            enabled: true,
            accelerator: "Alt+T",
            click: () => {
                ipcRenderer.send("toggle-always-on-top");
            },
        };
        topMenus[1].submenu?.unshift(alwaysOnTopMenu);
        topMenus.unshift({
            label: "파일",
            submenu: [
                {
                    label: "창 닫기",
                    accelerator: "Alt+W",
                    click() {
                        ipcRenderer.send("app-quit");
                    },
                },
            ],
        });
        topMenus.push(
            {
                label: "도움말",
                submenu: [
                    {
                        label: "업데이트 확인",
                        click: (menuItem: MenuItem) => {
                            ipcRenderer.send("check-for-updates", JSON.stringify(menuItem));
                        },
                    },
                    {
                        label: "개발자 도구 열기",
                        click: () => {
                            ipcRenderer.send("open-devtools");
                        },
                    },
                    {
                        label: "About",
                        click() {
                            // ipcRenderer.send("app-about");
                        },
                    },
                ],
            },
            {
                type: "window-control-button",
                label: "최소화",
                icon: "fas fa-window-minimize",
                click: () => {
                    ipcRenderer.send("minimize");
                },
            },
            {
                type: "window-control-button",
                label: "최대화",
                icon: "fas fa-window-maximize",
                click: () => {
                    ipcRenderer.send("toggle-maximize");
                },
            },
            {
                type: "window-control-button",
                label: "창 닫기",
                icon: "fas fa-window-close",
                click: () => {
                    ipcRenderer.send("app-quit");
                },
            },
        );
    }

    onMount(() => {
        const mapsMenu = document.getElementById("mapsMenu");
        mapsMenu.appendChild(sideMenu);
        if (import.meta.env?.VITE_USERSCRIPT) {
            topMenu.remove();
        } else {
            document.body.classList.add("electron");
        }
    });

    onDestroy(() => {
        unsubscribeAll.forEach((unsubscribe) => unsubscribe());
    });
</script>

<template>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- Top Menu -->
    <div bind:this={topMenu} class="maps-top-menu {alwaysOnTop ? 'hide' : ''}">
        <ul class="menu">
            {#each topMenus as menu}
                <li
                    class="menu-item {menu?.type == 'window-control-button' ? 'window-control-button' : ''}"
                    on:click={() => {
                        if (menu?.click) menu.click(menu);
                    }}
                >
                    {#if menu.icon}
                        <i class={menu.icon} />
                    {:else}
                        <span>{menu.label}</span>
                        {#if menu.accelerator}
                            <span class="accelerator">{menu.accelerator}</span>
                        {/if}
                    {/if}
                    {#if menu.submenu}
                        <ul class="submenu">
                            {#each menu.submenu as submenu}
                                <li
                                    class="submenu-item {submenu?.enabled && !submenu.enabled ? 'disabled' : ''}"
                                    on:click={() => {
                                        if (submenu?.click) submenu.click(submenu);
                                    }}
                                >
                                    <span class="submenu-item-text">{submenu.label}</span>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- Side Menu -->
    <div bind:this={sideMenu} class="maps-side-menu">
        <ul class="maps-side-menu-item">
            {#each menus as menu}
                <li class="maps-menu submenu-item">
                    {#if menu.logo}
                        <div class="maps-side-menu-icon">
                            <svelte:component this={menu.logo} />
                        </div>
                    {/if}
                    <p>{menu.label}</p>
                    {#if menu.submenu}
                        <ul class="submenu">
                            {#each menu.submenu as submenu}
                                <li class="maps-menu submenu-item {submenu?.class ? submenu.class() : ''}" on:click={() => submenu?.click(submenu)}>
                                    {#if submenu.logo}
                                        <div class="maps-side-menu-icon">
                                            <svelte:component this={submenu.logo} />
                                        </div>
                                    {/if}
                                    <p>{submenu.label}</p>
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
</template>

<style>
</style>
