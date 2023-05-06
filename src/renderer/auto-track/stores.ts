import { writable } from "svelte/store";

export const isPinned = writable(false);
export const currnetMap = writable(0);
export const isGpsActive = writable(false);
