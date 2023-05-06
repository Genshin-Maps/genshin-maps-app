// ==UserScript==
// @name            Genshin Maps Addons
// @name:ko         원신 맵스 부가기능
// @namespace       genshin-maps-app/addons
// @version         1.0
// @author          Genshin-Maps
// @description     Gamedot genshin maps app using electron.
// @description:en  Adds several add-ons to Genshin Maps.
// @description:ko  원신 맵스에 여러 부가기능을 추가합니다.
// @license         MIT
// @icon            https://genshin.gamedot.org/asset/xapp-icon128.png.pagespeed.ic.zyAE0ntk9a.webp
// @source          https://github.com/Genshin-Maps/genshin-maps-app
// @downloadURL     https://github.com/Genshin-Maps/genshin-maps-app/raw/gh-pages/userscript/addons.user.js
// @updateURL       https://github.com/Genshin-Maps/genshin-maps-app/raw/gh-pages/userscript/addons.user.js
// @match           https://genshin.gamedot.org/?mid=genshinmaps
// @grant           unsafeWindow
// ==/UserScript==

(function () {
  'use strict';

  (function() {
    try {
      if (typeof document != "undefined") {
        var elementStyle = document.createElement("style");
        elementStyle.appendChild(document.createTextNode(`.hidden-search {
    display: none !important;
}

li[data-parent].closed {
    display: none !important;
}

li[data-parent].open:not(.hidden-search) {
    display: block !important;
}

.vsb-menu {
    cursor: pointer;
    z-index: 1000;
    display: block;
    visibility: hidden;
    position: absolute; /*Don't change*/
    border: 1px solid #b2b2b2;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    border-radius: 4px;
    font-size: 11px;
}

.vsb-js-search-zone {
    position: absolute; /*Don't change*/
    z-index: 1001;
    width: 80%;
    min-height: 1.8em;
    padding: 2px;
    background-color: #fff;
}

.vsb-js-search-zone input {
    border: 1px solid grey;
    margin-left: 2px;
    width: 96%;
    border-radius: 4px;
    height: 25px !important;
}

.vsb-main {
    position: relative; /*Don't change*/
    display: inline-block;
    vertical-align: middle;
    text-align: left;
}

.vsb-menu li:hover {
    background: linear-gradient(#f5f5f5, #e8e8e8);
}

.vsb-menu ul {
    user-select: none;
    list-style: none;
    white-space: nowrap;
    margin: 0px;
    margin-top: 4px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 3px;
    color: #333;
    cursor: pointer;
    overflow-y: auto;
}

li.disabled {
    cursor: not-allowed;
    opacity: 0.3;
    background-color: #999;
}

li.overflow {
    cursor: not-allowed;
    opacity: 0.3;
    background-color: #999;
}

li.short {
    overflow: hidden;
    text-overflow: ellipsis;
}

.vsb-main button {
    min-width: 120px;
    border-radius: 0;
    width: 100%;
    text-align: left;
    z-index: 1;
    color: #333;
    background: white !important;
    border: 1px solid #999 !important;
    line-height: 20px;
    font-size: 14px;
    padding: 6px 12px;
}

.vsb-main button.disabled {
    cursor: not-allowed;
    opacity: 0.65;
}

.vsb-main .title {
    margin-right: 6px;
    user-select: none;
}

.vsb-main li:hover {
    background: linear-gradient(#f5f5f5, #e8e8e8);
}

.vsb-main ul {
    white-space: nowrap;
}

.vsb-menu li {
    font-size: 14px;
    background-color: #fff;
    min-height: 1.4em;
    padding: 0.2em 2em 0.2em 1em;
}

.vsb-menu li.grouped-option b {
    display: inline-block;
    font-size: 15px;
    margin-left: 10px;
    transform: translate(-18px);
}

.vsb-menu li.grouped-option.open span {
    display: inline-block;
    font-size: inherit;
    margin-top: -2px;
    height: 8px;
    width: 8px;
    transform: translate(-38px) rotate(45deg);
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-radius: 2px;
}

.vsb-menu li.grouped-option.closed span {
    display: inline-block;
    font-size: inherit;
    height: 8px;
    width: 8px;
    transform: translate(-38px) rotate(-45deg);
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-radius: 2px;
}

.vsb-menu li.grouped-option i {
    display: inline-block;
    font-size: inherit;
    float: left;
    font-weight: bold;
    margin-left: 22px;
    margin-right: 2px;
    height: 11px;
    width: 8px;
    border: 1px solid;
    border-radius: 3px;
    padding: 1px 3px 2px 3px;
    margin-top: 0px;
    color: black;
}

.vsb-menu li.grouped-option.checked i::after {
    content: "";
    display: inline-block;
    font-size: inherit;
    color: #333;
    float: left;
    margin-left: 0px;
    display: inline-block;
    transform: rotate(45deg);
    height: 8px;
    width: 5px;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
}

.vsb-menu :not(.multi) li.active {
    margin-left: 7px;
}

.vsb-menu :not(.multi) li.active::before {
    content: "";
    display: inline-block;
    font-size: inherit;
    margin-left: -18px;
    transform: rotate(45deg);
    height: 10px;
    width: 5px;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
    border-radius: 2px;
}

.vsb-menu .multi li {
    font-size: 14px;
    background-color: #fff;
    min-height: 1.4em;
    padding: 0.2em 2em 0.2em 26px;
}

.vsb-menu .multi li.grouped-option {
    font-size: 15px;
    padding-left: 5px;
}

.vsb-menu .multi li.grouped-option:hover {
    font-weight: bold;
    text-decoration: underline;
    color: rgb(52, 31, 112);
}

.vsb-menu .multi li:not(.grouped-option)::before {
    content: "";
    display: inline-block;
    font-size: inherit;
    float: left;
    font-weight: bold;
    margin-left: -22px;
    margin-right: 2px;
    border: 1px solid;
    border-radius: 3px;
    padding: 7px;
    margin-top: 0px;
    color: black;
}

.vsb-menu .multi li:not(.grouped-option).active::after {
    content: "";
    display: inline-block;
    font-size: inherit;
    color: #333;
    float: left;
    margin-left: -18px;
    display: inline-block;
    transform: rotate(45deg);
    margin-top: 1px;
    height: 8px;
    width: 5px;
    border-bottom: 3px solid black;
    border-right: 3px solid black;
}

.caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
}

li[data-parent] {
    padding-left: 50px !important;
}
.maps-addons {
    user-select: none;
    display: block;
    position: fixed;
    right: 20px;
    bottom: 65px;
}
.maps-addons > .hide {
    display: none;
}
@media screen and (max-width: 1280px) and (min-width: 768px) and (min-height: 500px) {
    #mapsAddonsMenu.close ~ .maps-addons {
        bottom: 45px !important;
    }
    #mapsAddonsMenu:not(.close) ~ .maps-addons {
        bottom: 120px !important;
    }
}
@media screen and (max-width: 768px) and (orientation: portrait), only screen and (max-height: 500px) and (orientation: landscape) {
    .maps-addons {
        right: 5px !important;
        bottom: 11.5vh !important;
    }
}
@media screen and (max-height: 500px) and (min-width: 400px) {
    .maps-addons {
        right: 16vh !important;
        bottom: 10px !important;
    }
    .maps-addons-switch {
        width: 15vh !important;
        height: 7.5vh !important;
    }
    .vsb-main button {
        width: 15vh !important;
        height: 7.5vh !important;
    }
    .maps-addons-switch-label {
        width: 15vh !important;
        font-size: 12px !important;
        padding-top: 3px !important;
        padding-bottom: 1px !important;
    }
}
.maps-addons-switch {
    width: 72px;
    height: 36px;
    background-image: url(data:image/png;base64,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);
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.maps-addons-switch.on {
    background-image: url(data:image/png;base64,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);
}
.maps-addons-switch-label {
    width: 77px;
    color: #ece5d8;
    text-shadow: -1px 0 #3b4354, 0 1px #3b4354, 1px 0 #3b4354, 0 -1px #3b4354;
    font-size: 18px;
    padding-top: 6px;
    padding-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.underground-layer {
    position: absolute;
    left: 0;
    top: 0;
    transform-origin: 0 0;
    contain: strict;
}
.underground-images {
    display: contents;
}
.underground-image {
    position: absolute;
    background-size: 100%;
    z-index: 2;
    opacity: 1;
}
.underground-image > div {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.vsb-main button {
    border: 1.5px solid #ece5d8 !important;
    border-radius: 20px;
    min-width: unset;
    width: 72px;
    height: 36px;
    background: rgb(211, 188, 142) !important;
    padding: 2px 6px;

    color: #ece5d8;
    text-shadow: -1px 0 #3b4354, 0 1px #3b4354, 1px 0 #3b4354, 0 -1px #3b4354;
    font-size: 11px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.vsb-menu ul {
    user-select: none;
    list-style: none;
    white-space: nowrap;
    margin: 0px;
    margin-top: 4px;
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 3px;
    color: #333;
    cursor: pointer;
    overflow-y: auto;
}
.vsb-menu .multi li {
    font-size: 14px;
    min-height: 1.4em;
    padding: 0.2em 2em 0.2em 26px;
    background-color: transparent;
}`));
        document.head.appendChild(elementStyle);
      }
    } catch (e) {
      console.error("vite-plugin-css-injected-by-js", e);
    }
  })();
  function noop() {
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function get_store_value(store) {
    let value;
    subscribe(store, (_) => value = _)();
    return value;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function text(data) {
    return document.createTextNode(data);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_style(node, key, value, important) {
    if (value === null) {
      node.style.removeProperty(key);
    } else {
      node.style.setProperty(key, value, important ? "important" : "");
    }
  }
  let current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }
  const dirty_components = [];
  const binding_callbacks = [];
  let render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = /* @__PURE__ */ Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  const seen_callbacks = /* @__PURE__ */ new Set();
  let flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }
  const outroing = /* @__PURE__ */ new Set();
  let outros;
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
      add_render_callback(() => {
        const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
        if (component.$$.on_destroy) {
          component.$$.on_destroy.push(...new_on_destroy);
        } else {
          run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
      });
    }
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor, options.customElement);
      flush();
    }
    set_current_component(parent_component);
  }
  class SvelteComponent {
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    $set($$props) {
      if (this.$$set && !is_empty($$props)) {
        this.$$.skip_bound = true;
        this.$$set($$props);
        this.$$.skip_bound = false;
      }
    }
  }
  const subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }
  const isChestPinLoaded = writable(false);
  const isFilterPinActive = writable(true);
  const isUndergroundMapActive = writable(false);
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  let VSBoxCounter = function() {
    let count = 0;
    let instances = [];
    return {
      set: function(instancePtr) {
        instances.push({ offset: ++count, ptr: instancePtr });
        return instances[instances.length - 1].offset;
      },
      remove: function(instanceNr) {
        let temp = instances.filter(function(x) {
          return x.offset != instanceNr;
        });
        instances = temp.splice(0);
      },
      closeAllButMe: function(instanceNr) {
        instances.forEach(function(x) {
          if (x.offset != instanceNr) {
            x.ptr.closeOrder();
          }
        });
      }
    };
  }();
  class VanillaSelectBox {
    instanceOffset;
    domSelector;
    root;
    rootToken;
    main;
    button;
    title;
    isMultiple;
    multipleSize;
    isOptgroups;
    currentOptgroup;
    drop;
    top;
    left;
    options;
    listElements;
    isDisabled;
    inputBox;
    disabledItems;
    ul;
    ulmaxWidth;
    maxOptionWidth;
    maxSelect;
    onInit;
    onInitSize;
    forbidenAttributes;
    forbidenClasses;
    userOptions;
    keepInlineStyles;
    keepInlineCaretStyles;
    closeOrder;
    getCssArray;
    init;
    getResult;
    createTree;
    constructor(domSelector, options) {
      let self = this;
      this.instanceOffset = VSBoxCounter.set(self);
      this.domSelector = domSelector;
      this.root = document.querySelector(domSelector);
      this.rootToken = null;
      this.main;
      this.button;
      this.title;
      this.isMultiple = this.root.hasAttribute("multiple");
      this.multipleSize = this.isMultiple && this.root.hasAttribute("size") ? parseInt(this.root.getAttribute("size")) : -1;
      this.isOptgroups = false;
      this.currentOptgroup = 0;
      this.drop;
      this.top;
      this.left;
      this.options;
      this.listElements;
      this.isDisabled = false;
      this.inputBox = null;
      this.disabledItems = [];
      this.ul = void 0;
      this.ulmaxWidth = 280;
      this.maxOptionWidth = Infinity;
      this.maxSelect = Infinity;
      this.onInit = () => {
      };
      this.onInitSize = -1;
      this.forbidenAttributes = ["class", "selected", "disabled", "data-text", "data-value"];
      this.forbidenClasses = ["active", "disabled"];
      this.userOptions = {
        maxWidth: 500,
        minWidth: -1,
        maxHeight: 400,
        translations: { all: "All", item: "item", items: "items", selectAll: "Select All", clearAll: "Clear All" },
        placeHolder: "",
        stayOpen: false,
        disableSelectAll: false,
        buttonItemsSeparator: ","
      };
      this.keepInlineStyles = true;
      this.keepInlineCaretStyles = true;
      if (options) {
        if (options.itemsSeparator != void 0) {
          this.userOptions.buttonItemsSeparator = options.itemsSeparator;
        }
        if (options.maxWidth != void 0) {
          this.userOptions.maxWidth = options.maxWidth;
        }
        if (options.minWidth != void 0) {
          this.userOptions.minWidth = options.minWidth;
        }
        if (options.maxHeight != void 0) {
          this.userOptions.maxHeight = options.maxHeight;
        }
        if (options.translations != void 0) {
          for (var property in options.translations) {
            if (options.translations.hasOwnProperty(property)) {
              if (this.userOptions.translations[property]) {
                this.userOptions.translations[property] = options.translations[property];
              }
            }
          }
        }
        if (options.placeHolder != void 0) {
          this.userOptions.placeHolder = options.placeHolder;
        }
        if (options.stayOpen != void 0) {
          this.userOptions.stayOpen = options.stayOpen;
        }
        if (options.disableSelectAll != void 0) {
          this.userOptions.disableSelectAll = options.disableSelectAll;
        }
        if (options.maxSelect != void 0 && !isNaN(options.maxSelect) && options.maxSelect >= 1) {
          this.maxSelect = options.maxSelect;
          this.userOptions.disableSelectAll = true;
        }
        if (options.maxOptionWidth != void 0 && !isNaN(options.maxOptionWidth) && options.maxOptionWidth >= 20) {
          this.maxOptionWidth = options.maxOptionWidth;
          this.ulmaxWidth = options.maxOptionWidth + 60;
        }
        if (options.keepInlineStyles != void 0) {
          this.keepInlineStyles = options.keepInlineStyles;
        }
        if (options.keepInlineCaretStyles != void 0) {
          this.keepInlineCaretStyles = options.keepInlineCaretStyles;
        }
      }
      this.closeOrder = function() {
        let self2 = this;
        if (!self2.userOptions.stayOpen) {
          self2.drop.style.visibility = "hidden";
        }
      };
      this.getCssArray = function(selector) {
        let cssArray = [];
        if (selector === ".vsb-main button") {
          cssArray = [
            { key: "min-width", value: "120px" },
            { key: "border-radius", value: "0" },
            { key: "width", value: "100%" },
            { key: "text-align", value: "left" },
            { key: "z-index", value: "1" },
            { key: "color", value: "#333" },
            { key: "background", value: "white !important" },
            { key: "border", value: "1px solid #999 !important" },
            { key: "line-height", value: "20px" },
            { key: "font-size", value: "14px" },
            { key: "padding", value: "6px 12px" }
          ];
        }
        return cssArrayToString(cssArray);
        function cssArrayToString(cssList) {
          let list = "";
          cssList.forEach(function(x) {
            list += x.key + ":" + x.value + ";";
          });
          return list;
        }
      };
      this.init = function() {
        let self2 = this;
        self2.createTree();
      };
      this.getResult = function() {
        let self2 = this;
        let result = [];
        let collection = self2.root.querySelectorAll("option");
        collection.forEach(function(x) {
          if (x.selected) {
            result.push(x.value);
          }
        });
        return result;
      };
      this.createTree = function() {
        this.rootToken = self.domSelector.replace(/[^A-Za-z0-9]+/, "");
        this.root.style.display = "none";
        let already = document.getElementById("btn-group-" + this.rootToken);
        if (already) {
          already.remove();
        }
        this.main = document.createElement("div");
        this.root.parentNode.insertBefore(this.main, this.root.nextSibling);
        this.main.classList.add("vsb-main");
        this.main.setAttribute("id", "btn-group-" + this.rootToken);
        this.main.style.marginLeft = this.main.style.marginLeft;
        if (self.userOptions.stayOpen) {
          this.main.style.minHeight = this.userOptions.maxHeight + 10 + "px";
        }
        if (self.userOptions.stayOpen) {
          this.button = document.createElement("div");
        } else {
          this.button = document.createElement("button");
          if (this.keepInlineStyles) {
            var cssList = self.getCssArray(".vsb-main button");
            this.button.setAttribute("style", cssList);
          }
        }
        this.button.style.maxWidth = this.userOptions.maxWidth + "px";
        if (this.userOptions.minWidth !== -1) {
          this.button.style.minWidth = this.userOptions.minWidth + "px";
        }
        this.main.appendChild(this.button);
        this.title = document.createElement("span");
        this.button.appendChild(this.title);
        this.title.classList.add("title");
        let caret = document.createElement("span");
        this.button.appendChild(caret);
        caret.classList.add("caret");
        if (this.keepInlineCaretStyles) {
          caret.style.position = "absolute";
          caret.style.right = "8px";
          caret.style.marginTop = "8px";
        }
        if (self.userOptions.stayOpen) {
          caret.style.display = "none";
          this.title.style.paddingLeft = "20px";
          this.title.style.fontStyle = "italic";
          this.title.style.verticalAlign = "20%";
        }
        this.drop = document.createElement("div");
        this.main.appendChild(this.drop);
        this.drop.classList.add("vsb-menu");
        this.drop.style.zIndex = 2e3 - this.instanceOffset;
        this.ul = document.createElement("ul");
        this.drop.appendChild(this.ul);
        this.ul.style.maxHeight = this.userOptions.maxHeight + "px";
        this.ul.style.maxWidth = this.ulmaxWidth + "px";
        if (this.isMultiple) {
          this.ul.classList.add("multi");
          if (!self.userOptions.disableSelectAll) {
            let selectAll = document.createElement("option");
            selectAll.setAttribute("value", "all");
            selectAll.innerText = self.userOptions.translations.selectAll;
            this.root.insertBefore(selectAll, this.root.hasChildNodes() ? this.root.childNodes[0] : null);
          }
        }
        let selectedTexts = "";
        let sep = "";
        let nrActives = 0;
        this.options = document.querySelectorAll(this.domSelector + " > option");
        Array.prototype.slice.call(this.options).forEach(function(x) {
          let text2 = x.textContent;
          let value = x.value;
          let originalAttrs;
          if (x.hasAttributes()) {
            originalAttrs = Array.prototype.slice.call(x.attributes).filter(function(a) {
              return self.forbidenAttributes.indexOf(a.name) === -1;
            });
          }
          let classes = x.getAttribute("class");
          if (classes) {
            classes = classes.split(" ").filter(function(c) {
              return self.forbidenClasses.indexOf(c) === -1;
            });
          } else {
            classes = [];
          }
          let li = document.createElement("li");
          let isSelected = x.hasAttribute("selected");
          let isDisabled = x.hasAttribute("disabled");
          self.ul.appendChild(li);
          li.setAttribute("data-value", value);
          li.setAttribute("data-text", text2);
          if (originalAttrs !== void 0) {
            originalAttrs.forEach(function(a) {
              li.setAttribute(a.name, a.value);
            });
          }
          classes.forEach(function(x2) {
            li.classList.add(x2);
          });
          if (self.maxOptionWidth < Infinity) {
            li.classList.add("short");
            li.style.maxWidth = self.maxOptionWidth + "px";
          }
          if (isSelected) {
            nrActives++;
            selectedTexts += sep + text2;
            sep = self.userOptions.buttonItemsSeparator;
            li.classList.add("active");
            if (!self.isMultiple) {
              self.title.textContent = text2;
              if (classes.length != 0) {
                classes.forEach(function(x2) {
                  self.title.classList.add(x2);
                });
              }
            }
          }
          if (isDisabled) {
            li.classList.add("disabled");
          }
          li.appendChild(document.createTextNode(" " + text2));
        });
        if (document.querySelector(self.domSelector + " optgroup") !== null) {
          self.isOptgroups = true;
          self.options = document.querySelectorAll(self.domSelector + " option");
          let groups = document.querySelectorAll(self.domSelector + " optgroup");
          Array.prototype.slice.call(groups).forEach(function(group) {
            let groupOptions = group.querySelectorAll("option");
            let li = document.createElement("li");
            let span = document.createElement("span");
            let iCheck = document.createElement("i");
            let labelElement = document.createElement("b");
            let dataWay = group.getAttribute("data-way");
            if (!dataWay)
              dataWay = "closed";
            if (!dataWay || dataWay !== "closed" && dataWay !== "open")
              dataWay = "closed";
            li.appendChild(span);
            li.appendChild(iCheck);
            self.ul.appendChild(li);
            li.classList.add("grouped-option");
            li.classList.add(dataWay);
            self.currentOptgroup++;
            let optId = self.rootToken + "-opt-" + self.currentOptgroup;
            li.id = optId;
            li.appendChild(labelElement);
            labelElement.appendChild(document.createTextNode(group.label));
            li.setAttribute("data-text", group.label);
            self.ul.appendChild(li);
            Array.prototype.slice.call(groupOptions).forEach(function(x) {
              let text2 = x.textContent;
              let value = x.value;
              let classes = x.getAttribute("class");
              if (classes) {
                classes = classes.split(" ");
              } else {
                classes = [];
              }
              classes.push(dataWay);
              let li2 = document.createElement("li");
              let isSelected = x.hasAttribute("selected");
              self.ul.appendChild(li2);
              li2.setAttribute("data-value", value);
              li2.setAttribute("data-text", text2);
              li2.setAttribute("data-parent", optId);
              if (classes.length != 0) {
                classes.forEach(function(x2) {
                  li2.classList.add(x2);
                });
              }
              if (isSelected) {
                nrActives++;
                selectedTexts += sep + text2;
                sep = self.userOptions.buttonItemsSeparator;
                li2.classList.add("active");
                if (!self.isMultiple) {
                  self.title.textContent = text2;
                  if (classes.length != 0) {
                    classes.forEach(function(x2) {
                      self.title.classList.add(x2);
                    });
                  }
                }
              }
              li2.appendChild(document.createTextNode(text2));
            });
          });
        }
        let optionsLength = self.options.length - Number(!self.userOptions.disableSelectAll);
        if (optionsLength == nrActives) {
          let wordForAll = self.userOptions.translations.all;
          selectedTexts = wordForAll;
        } else if (self.multipleSize != -1) {
          if (nrActives > self.multipleSize) {
            let wordForItems = nrActives === 1 ? self.userOptions.translations.item : self.userOptions.translations.items;
            selectedTexts = nrActives + " " + wordForItems;
          }
        }
        if (self.isMultiple) {
          self.title.innerHTML = selectedTexts;
        }
        if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
          self.title.textContent = self.userOptions.placeHolder;
        }
        self.listElements = self.drop.querySelectorAll("li:not(.grouped-option)");
        if (self.userOptions.stayOpen) {
          self.drop.style.visibility = "visible";
          self.drop.style.boxShadow = "none";
          self.drop.style.minHeight = this.userOptions.maxHeight + 10 + "px";
          self.drop.style.position = "relative";
          self.drop.style.left = "0px";
          self.drop.style.top = "0px";
          self.button.style.border = "none";
        } else {
          this.main.addEventListener("click", function(e) {
            if (self.isDisabled)
              return;
            self.drop.style.visibility = "visible";
            document.addEventListener("click", docListener);
            e.preventDefault();
            e.stopPropagation();
            if (!self.userOptions.stayOpen) {
              VSBoxCounter.closeAllButMe(self.instanceOffset);
            }
          });
        }
        this.drop.addEventListener("click", function(e) {
          if (self.isDisabled)
            return;
          if (e.target.tagName === "INPUT")
            return;
          let isShowHideCommand = e.target.tagName === "SPAN";
          let isCheckCommand = e.target.tagName === "I";
          let liClicked = e.target.parentElement;
          if (!liClicked.hasAttribute("data-value")) {
            if (liClicked.classList.contains("grouped-option")) {
              if (!isShowHideCommand && !isCheckCommand)
                return;
              let oldClass, newClass;
              if (isCheckCommand) {
                self.checkUncheckFromParent(liClicked);
              } else {
                if (liClicked.classList.contains("open")) {
                  oldClass = "open";
                  newClass = "closed";
                } else {
                  oldClass = "closed";
                  newClass = "open";
                }
                liClicked.classList.remove(oldClass);
                liClicked.classList.add(newClass);
                let theChildren = self.drop.querySelectorAll("[data-parent='" + liClicked.id + "']");
                theChildren.forEach(function(x) {
                  x.classList.remove(oldClass);
                  x.classList.add(newClass);
                });
              }
              return;
            }
          }
          let choiceValue = e.target.getAttribute("data-value");
          let choiceText = e.target.getAttribute("data-text");
          let className = e.target.getAttribute("class");
          if (className && className.indexOf("disabled") != -1) {
            return;
          }
          if (className && className.indexOf("overflow") != -1) {
            return;
          }
          if (choiceValue === "all") {
            if (e.target.hasAttribute("data-selected") && e.target.getAttribute("data-selected") === "true") {
              self.setValue("none");
            } else {
              self.setValue("all");
            }
            return;
          }
          if (!self.isMultiple) {
            self.root.value = choiceValue;
            self.title.textContent = choiceText;
            if (className) {
              self.title.setAttribute("class", className + " title");
            } else {
              self.title.setAttribute("class", "title");
            }
            Array.prototype.slice.call(self.listElements).forEach(function(x) {
              x.classList.remove("active");
            });
            if (choiceText != "") {
              e.target.classList.add("active");
            }
            self.privateSendChange();
            if (!self.userOptions.stayOpen) {
              docListener();
            }
          } else {
            let wasActive = false;
            if (className) {
              wasActive = className.indexOf("active") != -1;
            }
            if (wasActive) {
              e.target.classList.remove("active");
            } else {
              e.target.classList.add("active");
            }
            if (e.target.hasAttribute("data-parent")) {
              self.checkUncheckFromChild(e.target);
            }
            let selectedTexts2 = "";
            let sep2 = "";
            let nrActives2 = 0;
            let nrAll = 0;
            for (let i = 0; i < self.options.length; i++) {
              nrAll++;
              if (self.options[i].value == choiceValue) {
                self.options[i].selected = !wasActive;
              }
              if (self.options[i].selected) {
                nrActives2++;
                selectedTexts2 += sep2 + self.options[i].textContent;
                sep2 = self.userOptions.buttonItemsSeparator;
              }
            }
            if (nrAll == nrActives2 - Number(!self.userOptions.disableSelectAll)) {
              let wordForAll = self.userOptions.translations.all;
              selectedTexts2 = wordForAll;
            } else if (self.multipleSize != -1) {
              if (nrActives2 > self.multipleSize) {
                let wordForItems = nrActives2 === 1 ? self.userOptions.translations.item : self.userOptions.translations.items;
                selectedTexts2 = nrActives2 + " " + wordForItems;
              }
            }
            self.title.textContent = selectedTexts2;
            self.checkSelectMax(nrActives2);
            self.checkUncheckAll();
            self.privateSendChange();
          }
          e.preventDefault();
          e.stopPropagation();
          if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
            self.title.textContent = self.userOptions.placeHolder;
          }
        });
        function docListener() {
          document.removeEventListener("click", docListener);
          self.drop.style.visibility = "hidden";
        }
      };
      this.init();
      this.checkUncheckAll();
    }
    buildSelect(data) {
      let self = this;
      if (data == null || data.length < 1)
        return;
      if (!self.isOptgroups) {
        self.isOptgroups = data[0].parent != void 0 && data[0].parent != "";
      }
      if (self.isOptgroups) {
        let groups = {};
        data = data.filter(function(x) {
          return x.parent != void 0 && x.parent != "";
        });
        data.forEach(function(x) {
          if (!groups[x.parent]) {
            groups[x.parent] = true;
          }
        });
        for (let group in groups) {
          let anOptgroup = document.createElement("optgroup");
          anOptgroup.setAttribute("label", group);
          let options = data.filter(function(x) {
            return x.parent == group;
          });
          options.forEach(function(x) {
            let anOption = document.createElement("option");
            anOption.value = x.value;
            anOption.text = x.text;
            if (x.selected) {
              anOption.setAttribute("selected", "true");
            }
            anOptgroup.appendChild(anOption);
          });
          self.root.appendChild(anOptgroup);
        }
      } else {
        data.forEach(function(x) {
          let anOption = document.createElement("option");
          anOption.value = x.value;
          anOption.text = x.text;
          if (x.selected) {
            anOption.setAttribute("selected", "true");
          }
          self.root.appendChild(anOption);
        });
      }
    }
    remoteSearchIntegrate(data) {
      let self = this;
      if (data == null || data.length == 0) {
        let dataChecked = self.optionsCheckedToData();
        if (dataChecked)
          data = dataChecked.slice(0);
        self.remoteSearchIntegrateIt(data);
      } else {
        let dataChecked = self.optionsCheckedToData();
        if (dataChecked.length > 0) {
          for (var i = data.length - 1; i >= 0; i--) {
            if (dataChecked.indexOf(data[i].id) != -1) {
              data.slice(i, 1);
            }
          }
        }
        data = data.concat(dataChecked);
        self.remoteSearchIntegrateIt(data);
      }
    }
    optionsCheckedToData() {
      let self = this;
      let dataChecked = [];
      let treeOptions = self.ul.querySelectorAll("li.active:not(.grouped-option)");
      let keepParents = {};
      if (treeOptions) {
        Array.prototype.slice.call(treeOptions).forEach(function(x) {
          let oneData = { value: x.getAttribute("data-value"), text: x.getAttribute("data-text"), selected: true, parent: null };
          if (oneData.value !== "all") {
            if (self.isOptgroups) {
              let parentId = x.getAttribute("data-parent");
              if (keepParents[parentId] != void 0) {
                oneData.parent = keepParents[parentId];
              } else {
                let parentPtr = self.ul.querySelector("#" + parentId);
                let parentName = parentPtr.getAttribute("data-text");
                keepParents[parentId] = parentName;
                oneData.parent = parentName;
              }
            }
            dataChecked.push(oneData);
          }
        });
      }
      return dataChecked;
    }
    removeOptionsNotChecked(data) {
      let self = this;
      let minimumSize = self.onInitSize;
      let newSearchSize = data == null ? 0 : data.length;
      let presentSize = self.root.length;
      if (presentSize + newSearchSize > minimumSize) {
        let maxToRemove = presentSize + newSearchSize - minimumSize - 1;
        let removed = 0;
        for (var i = self.root.length - 1; i >= 0; i--) {
          if (self.root.options[i].selected == false) {
            if (removed <= maxToRemove) {
              removed++;
              self.root.remove(i);
            }
          }
        }
      }
    }
    changeTree(data, _) {
      let self = this;
      self.empty();
      self.remoteSearchIntegrateIt(data);
      self.listElements = this.drop.querySelectorAll("li:not(.grouped-option)");
    }
    remoteSearchIntegrateIt(data) {
      let self = this;
      if (data == null || data.length == 0)
        return;
      while (self.root.firstChild)
        self.root.removeChild(self.root.firstChild);
      self.buildSelect(data);
      self.reloadTree();
    }
    reloadTree() {
      let self = this;
      let lis = self.ul.querySelectorAll("li");
      if (lis != null) {
        for (var i = lis.length - 1; i >= 0; i--) {
          if (lis[i].getAttribute("data-value") !== "all") {
            self.ul.removeChild(lis[i]);
          }
        }
      }
      if (self.isOptgroups) {
        if (document.querySelector(self.domSelector + " optgroup") !== null) {
          self.options = document.querySelectorAll(this.domSelector + " option");
          let groups = document.querySelectorAll(this.domSelector + " optgroup");
          Array.prototype.slice.call(groups).forEach(function(group) {
            let groupOptions = group.querySelectorAll("option");
            let li = document.createElement("li");
            let span = document.createElement("span");
            let iCheck = document.createElement("i");
            let labelElement = document.createElement("b");
            let dataWay = group.getAttribute("data-way");
            if (!dataWay)
              dataWay = "closed";
            if (!dataWay || dataWay !== "closed" && dataWay !== "open")
              dataWay = "closed";
            li.appendChild(span);
            li.appendChild(iCheck);
            self.ul.appendChild(li);
            li.classList.add("grouped-option");
            li.classList.add(dataWay);
            self.currentOptgroup++;
            let optId = self.rootToken + "-opt-" + self.currentOptgroup;
            li.id = optId;
            li.appendChild(labelElement);
            labelElement.appendChild(document.createTextNode(group.label));
            li.setAttribute("data-text", group.label);
            self.ul.appendChild(li);
            Array.prototype.slice.call(groupOptions).forEach(function(x) {
              let text2 = x.textContent;
              let value = x.value;
              let classes = x.getAttribute("class");
              if (classes) {
                classes = classes.split(" ");
              } else {
                classes = [];
              }
              classes.push(dataWay);
              let li2 = document.createElement("li");
              let isSelected = x.hasAttribute("selected");
              self.ul.appendChild(li2);
              li2.setAttribute("data-value", value);
              li2.setAttribute("data-text", text2);
              li2.setAttribute("data-parent", optId);
              if (classes.length != 0) {
                classes.forEach(function(x2) {
                  li2.classList.add(x2);
                });
              }
              if (isSelected) {
                li2.classList.add("active");
                if (!self.isMultiple) {
                  self.title.textContent = text2;
                  if (classes.length != 0) {
                    classes.forEach(function(x2) {
                      self.title.classList.add(x2);
                    });
                  }
                }
              }
              li2.appendChild(document.createTextNode(text2));
            });
          });
        }
        self.listElements = this.drop.querySelectorAll("li:not(.grouped-option)");
      } else {
        self.options = self.root.querySelectorAll("option");
        Array.prototype.slice.call(self.options).forEach(function(x) {
          let text2 = x.textContent;
          let value = x.value;
          if (value != "all") {
            let originalAttrs;
            if (x.hasAttributes()) {
              originalAttrs = Array.prototype.slice.call(x.attributes).filter(function(a) {
                return self.forbidenAttributes.indexOf(a.name) === -1;
              });
            }
            let classes = x.getAttribute("class");
            if (classes) {
              classes = classes.split(" ").filter(function(c) {
                return self.forbidenClasses.indexOf(c) === -1;
              });
            } else {
              classes = [];
            }
            let li = document.createElement("li");
            let isSelected = x.hasAttribute("selected");
            let isDisabled = x.disabled;
            self.ul.appendChild(li);
            li.setAttribute("data-value", value);
            li.setAttribute("data-text", text2);
            if (originalAttrs !== void 0) {
              originalAttrs.forEach(function(a) {
                li.setAttribute(a.name, a.value);
              });
            }
            classes.forEach(function(x2) {
              li.classList.add(x2);
            });
            if (self.maxOptionWidth < Infinity) {
              li.classList.add("short");
              li.style.maxWidth = self.maxOptionWidth + "px";
            }
            if (isSelected) {
              li.classList.add("active");
              if (!self.isMultiple) {
                self.title.textContent = text2;
                if (classes.length != 0) {
                  classes.forEach(function(x2) {
                    self.title.classList.add(x2);
                  });
                }
              }
            }
            if (isDisabled) {
              li.classList.add("disabled");
            }
            li.appendChild(document.createTextNode(" " + text2));
          }
        });
      }
    }
    disableItems(values) {
      let self = this;
      let foundValues = [];
      if (vanillaSelectBox_type(values) == "string") {
        values = values.split(",");
      }
      if (vanillaSelectBox_type(values) == "array") {
        Array.prototype.slice.call(self.options).forEach(function(x) {
          if (values.indexOf(x.value) != -1) {
            foundValues.push(x.value);
            x.setAttribute("disabled", "");
          }
        });
      }
      Array.prototype.slice.call(self.listElements).forEach(function(x) {
        let val = x.getAttribute("data-value");
        if (foundValues.indexOf(val) != -1) {
          x.classList.add("disabled");
        }
      });
    }
    enableItems(values) {
      let self = this;
      let foundValues = [];
      if (vanillaSelectBox_type(values) == "string") {
        values = values.split(",");
      }
      if (vanillaSelectBox_type(values) == "array") {
        Array.prototype.slice.call(self.options).forEach(function(x) {
          if (values.indexOf(x.value) != -1) {
            foundValues.push(x.value);
            x.removeAttribute("disabled");
          }
        });
      }
      Array.prototype.slice.call(self.listElements).forEach(function(x) {
        if (foundValues.indexOf(x.getAttribute("data-value")) != -1) {
          x.classList.remove("disabled");
        }
      });
    }
    checkSelectMax(nrActives) {
      let self = this;
      if (self.maxSelect == Infinity || !self.isMultiple)
        return;
      if (self.maxSelect <= nrActives) {
        Array.prototype.slice.call(self.listElements).forEach(function(x) {
          if (x.hasAttribute("data-value")) {
            if (!x.classList.contains("disabled") && !x.classList.contains("active")) {
              x.classList.add("overflow");
            }
          }
        });
      } else {
        Array.prototype.slice.call(self.listElements).forEach(function(x) {
          if (x.classList.contains("overflow")) {
            x.classList.remove("overflow");
          }
        });
      }
    }
    checkUncheckFromChild(liClicked) {
      let self = this;
      let parentId = liClicked.getAttribute("data-parent");
      let parentLi = document.getElementById(parentId);
      if (!self.isMultiple)
        return;
      let listElements = self.drop.querySelectorAll("li");
      let childrenElements = Array.prototype.slice.call(listElements).filter(function(el) {
        return el.hasAttribute("data-parent") && el.getAttribute("data-parent") == parentId && !el.classList.contains("hidden-search");
      });
      let nrChecked = 0;
      let nrCheckable = childrenElements.length;
      if (nrCheckable == 0)
        return;
      childrenElements.forEach(function(el) {
        if (el.classList.contains("active"))
          nrChecked++;
      });
      if (nrChecked === nrCheckable || nrChecked === 0) {
        if (nrChecked === 0) {
          parentLi.classList.remove("checked");
        } else {
          parentLi.classList.add("checked");
        }
      } else {
        parentLi.classList.remove("checked");
      }
    }
    checkUncheckFromParent(liClicked) {
      let self = this;
      let parentId = liClicked.id;
      if (!self.isMultiple)
        return;
      let listElements = self.drop.querySelectorAll("li");
      let childrenElements = Array.prototype.slice.call(listElements).filter(function(el) {
        return el.hasAttribute("data-parent") && el.getAttribute("data-parent") == parentId && !el.classList.contains("hidden-search");
      });
      let nrChecked = 0;
      let nrCheckable = childrenElements.length;
      if (nrCheckable == 0)
        return;
      childrenElements.forEach(function(el) {
        if (el.classList.contains("active"))
          nrChecked++;
      });
      if (nrChecked === nrCheckable || nrChecked === 0) {
        childrenElements.forEach(function(el) {
          var event = document.createEvent("HTMLEvents");
          event.initEvent("click", true, false);
          el.dispatchEvent(event);
        });
        if (nrChecked === 0) {
          liClicked.classList.add("checked");
        } else {
          liClicked.classList.remove("checked");
        }
      } else {
        liClicked.classList.remove("checked");
        childrenElements.forEach(function(el) {
          if (!el.classList.contains("active")) {
            var event = document.createEvent("HTMLEvents");
            event.initEvent("click", true, false);
            el.dispatchEvent(event);
          }
        });
      }
    }
    checkUncheckAll() {
      let self = this;
      if (!self.isMultiple)
        return;
      let nrChecked = 0;
      let nrCheckable = 0;
      let totalAvailableElements = 0;
      let checkAllElement = null;
      if (self.listElements == null)
        return;
      Array.prototype.slice.call(self.listElements).forEach(function(x) {
        if (x.hasAttribute("data-value")) {
          if (x.getAttribute("data-value") === "all") {
            checkAllElement = x;
          }
          if (x.getAttribute("data-value") !== "all" && !x.classList.contains("hidden-search") && !x.classList.contains("disabled")) {
            nrCheckable++;
            nrChecked += x.classList.contains("active");
          }
          if (x.getAttribute("data-value") !== "all" && !x.classList.contains("disabled")) {
            totalAvailableElements++;
          }
        }
      });
      if (checkAllElement) {
        if (nrChecked === nrCheckable) {
          if (nrChecked === totalAvailableElements) {
            self.title.textContent = self.userOptions.translations.all;
          }
          checkAllElement.classList.add("active");
          checkAllElement.innerText = self.userOptions.translations.clearAll;
          checkAllElement.setAttribute("data-selected", "true");
        } else if (nrChecked === 0) {
          self.title.textContent = self.userOptions.placeHolder;
          checkAllElement.classList.remove("active");
          checkAllElement.innerText = self.userOptions.translations.selectAll;
          checkAllElement.setAttribute("data-selected", "false");
        }
      }
    }
    setValue(values) {
      let self = this;
      let listElements = self.drop.querySelectorAll("li");
      if (values == null || values == void 0 || values == "") {
        self.empty();
      } else {
        if (self.isMultiple) {
          if (vanillaSelectBox_type(values) == "string") {
            if (values === "all") {
              values = [];
              Array.prototype.slice.call(listElements).forEach(function(x) {
                if (x.hasAttribute("data-value")) {
                  let value = x.getAttribute("data-value");
                  if (value !== "all") {
                    if (!x.classList.contains("hidden-search") && !x.classList.contains("disabled")) {
                      values.push(x.getAttribute("data-value"));
                    }
                    if (x.classList.contains("active")) {
                      if (x.classList.contains("hidden-search") || x.classList.contains("disabled")) {
                        values.push(value);
                      }
                    }
                  } else {
                    x.classList.add("active");
                  }
                } else if (x.classList.contains("grouped-option")) {
                  x.classList.add("checked");
                }
              });
            } else if (values === "none") {
              values = [];
              Array.prototype.slice.call(listElements).forEach(function(x) {
                if (x.hasAttribute("data-value")) {
                  let value = x.getAttribute("data-value");
                  if (value !== "all") {
                    if (x.classList.contains("active")) {
                      if (x.classList.contains("hidden-search") || x.classList.contains("disabled")) {
                        values.push(value);
                      }
                    }
                  }
                } else if (x.classList.contains("grouped-option")) {
                  x.classList.remove("checked");
                }
              });
            } else {
              values = values.split(",");
            }
          }
          let foundValues = [];
          if (vanillaSelectBox_type(values) == "array") {
            Array.prototype.slice.call(self.options).forEach(function(x) {
              if (values.indexOf(x.value) !== -1) {
                x.selected = true;
                foundValues.push(x.value);
              } else {
                x.selected = false;
              }
            });
            let selectedTexts = "";
            let sep = "";
            let nrActives = 0;
            let nrAll = 0;
            Array.prototype.slice.call(listElements).forEach(function(x) {
              if (x.value !== "all") {
                nrAll++;
              }
              if (foundValues.indexOf(x.getAttribute("data-value")) != -1) {
                x.classList.add("active");
                nrActives++;
                selectedTexts += sep + x.getAttribute("data-text");
                sep = self.userOptions.buttonItemsSeparator;
              } else {
                x.classList.remove("active");
              }
            });
            if (nrAll == nrActives - Number(!self.userOptions.disableSelectAll)) {
              let wordForAll = self.userOptions.translations.all;
              selectedTexts = wordForAll;
            } else if (self.multipleSize != -1) {
              if (nrActives > self.multipleSize) {
                let wordForItems = nrActives === 1 ? self.userOptions.translations.item : self.userOptions.translations.items;
                selectedTexts = nrActives + " " + wordForItems;
              }
            }
            self.title.textContent = selectedTexts;
            self.privateSendChange();
          }
          self.checkUncheckAll();
        } else {
          let found = false;
          let text2 = "";
          let className = "";
          Array.prototype.slice.call(listElements).forEach(function(x) {
            let liVal = x.getAttribute("data-value");
            if (liVal == values) {
              x.classList.add("active");
              found = true;
              text2 = x.getAttribute("data-text");
            } else {
              x.classList.remove("active");
            }
          });
          Array.prototype.slice.call(self.options).forEach(function(x) {
            if (x.value == values) {
              x.selected = true;
              className = x.getAttribute("class");
              if (!className)
                className = "";
            } else {
              x.selected = false;
            }
          });
          if (found) {
            self.title.textContent = text2;
            if (self.userOptions.placeHolder != "" && self.title.textContent == "") {
              self.title.textContent = self.userOptions.placeHolder;
            }
            if (className != "") {
              self.title.setAttribute("class", className + " title");
            } else {
              self.title.setAttribute("class", "title");
            }
          }
        }
      }
    }
    privateSendChange() {
      let event = document.createEvent("HTMLEvents");
      event.initEvent("change", true, false);
      this.root.dispatchEvent(event);
    }
    empty() {
      Array.prototype.slice.call(this.listElements).forEach(function(x) {
        x.classList.remove("active");
      });
      let parentElements = this.drop.querySelectorAll("li.grouped-option");
      if (parentElements) {
        Array.prototype.slice.call(parentElements).forEach(function(x) {
          x.classList.remove("checked");
        });
      }
      Array.prototype.slice.call(this.options).forEach(function(x) {
        x.selected = false;
      });
      this.title.textContent = "";
      if (this.userOptions.placeHolder != "" && this.title.textContent == "") {
        this.title.textContent = this.userOptions.placeHolder;
      }
      this.checkUncheckAll();
      this.privateSendChange();
    }
    destroy() {
      let already = document.getElementById("btn-group-" + this.rootToken);
      if (already) {
        VSBoxCounter.remove(this.instanceOffset);
        already.remove();
        this.root.style.display = "inline-block";
      }
    }
    disable() {
      this.main.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
      let already = document.getElementById("btn-group-" + this.rootToken);
      if (already) {
        const button = already.querySelector("button");
        if (button)
          button.classList.add("disabled");
        this.isDisabled = true;
      }
    }
    enable() {
      let already = document.getElementById("btn-group-" + this.rootToken);
      if (already) {
        const button = already.querySelector("button");
        if (button)
          button.classList.remove("disabled");
        this.isDisabled = false;
      }
    }
    showOptions() {
      console.log(this.userOptions);
    }
  }
  function vanillaSelectBox_type(target) {
    const computedType = Object.prototype.toString.call(target);
    const stripped = computedType.replace("[object ", "").replace("]", "");
    const lowercased = stripped.toLowerCase();
    return lowercased;
  }
  function create_fragment$4(ctx) {
    let div1;
    let div0;
    let t1;
    let select;
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    let div1_class_value;
    let mounted;
    let dispose;
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "상자 필터";
        t1 = space();
        select = element("select");
        option0 = element("option");
        option0.textContent = "평범한";
        option1 = element("option");
        option1.textContent = "정교한";
        option2 = element("option");
        option2.textContent = "진귀한";
        option3 = element("option");
        option3.textContent = "화려한";
        option4 = element("option");
        option4.textContent = "신묘한";
        attr(div0, "class", "maps-addons-switch-label");
        option0.__value = "평범한";
        option0.value = option0.__value;
        set_style(option0, "color", "gray");
        option1.__value = "정교한";
        option1.value = option1.__value;
        set_style(option1, "color", "#9ee0d4");
        option2.__value = "진귀한";
        option2.value = option2.__value;
        set_style(option2, "color", "#e6ba7b");
        option3.__value = "화려한";
        option3.value = option3.__value;
        set_style(option3, "color", "#ff6c38");
        option4.__value = "신묘한";
        option4.value = option4.__value;
        set_style(option4, "color", "#accb29");
        attr(select, "id", "chest-filter");
        select.multiple = true;
        attr(div1, "class", div1_class_value = "chest-pin " + /*isPinLoaded*/
        (ctx[0] ? "" : "hide"));
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div1, t1);
        append(div1, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        append(select, option3);
        append(select, option4);
        if (!mounted) {
          dispose = listen(
            select,
            "change",
            /*redraw*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*isPinLoaded*/
        1 && div1_class_value !== (div1_class_value = "chest-pin " + /*isPinLoaded*/
        (ctx2[0] ? "" : "hide"))) {
          attr(div1, "class", div1_class_value);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div1);
        mounted = false;
        dispose();
      }
    };
  }
  function instance$4($$self, $$props, $$invalidate) {
    let { chestFilter } = $$props;
    let isPinLoaded = false;
    isChestPinLoaded.subscribe((loaded) => {
      $$invalidate(0, isPinLoaded = loaded);
      chestFilter === null || chestFilter === void 0 ? void 0 : chestFilter.setValue("all");
    });
    function redraw() {
      _unsafeWindow.setPinObjectRefresh();
    }
    onMount(() => {
      var _a;
      $$invalidate(2, chestFilter = new VanillaSelectBox(
        "#chest-filter",
        {
          placeHolder: "상자 선택",
          translations: {
            all: "전체",
            item: "item",
            items: "items",
            selectAll: "전체",
            clearAll: "전체"
          },
          disableSelectAll: false,
          keepInlineStyles: false,
          keepInlineCaretStyles: false
        }
      ));
      chestFilter.setValue("all");
      for (const li of (_a = chestFilter.ul) === null || _a === void 0 ? void 0 : _a.childNodes) {
        if (li.dataset.value !== "all") {
          li.textContent += " ■";
        }
      }
    });
    $$self.$$set = ($$props2) => {
      if ("chestFilter" in $$props2)
        $$invalidate(2, chestFilter = $$props2.chestFilter);
    };
    return [isPinLoaded, redraw, chestFilter];
  }
  class Filter_chest extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance$4, create_fragment$4, safe_not_equal, { chestFilter: 2 });
    }
  }
  function create_fragment$3(ctx) {
    let div;
    let t1;
    let button;
    let button_class_value;
    let mounted;
    let dispose;
    return {
      c() {
        div = element("div");
        div.textContent = "활성맵 핀";
        t1 = space();
        button = element("button");
        attr(div, "class", "maps-addons-switch-label");
        attr(button, "class", button_class_value = "maps-addons-switch " + /*active*/
        (ctx[0] ? "on" : ""));
      },
      m(target, anchor) {
        insert(target, div, anchor);
        insert(target, t1, anchor);
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleClick*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*active*/
        1 && button_class_value !== (button_class_value = "maps-addons-switch " + /*active*/
        (ctx2[0] ? "on" : ""))) {
          attr(button, "class", button_class_value);
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching)
          detach(div);
        if (detaching)
          detach(t1);
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function instance$3($$self, $$props, $$invalidate) {
    let active;
    const unsubscribe = isFilterPinActive.subscribe((value) => {
      $$invalidate(0, active = value);
      _unsafeWindow.setPinObjectRefresh();
    });
    function handleClick() {
      isFilterPinActive.update((active2) => !active2);
    }
    const removeUnnecessary = () => {
      if (!active)
        return;
      const dataSelector = get_store_value(isUndergroundMapActive) ? ':not([data-is-underground]):not([data-tip*="지하 및 실내 구역 입구"])' : "[data-is-underground]";
      document.querySelectorAll(`#mapsLayerPoint > .maps-point${dataSelector}`).forEach((element2) => element2.remove());
    };
    onDestroy(unsubscribe);
    return [active, handleClick, removeUnnecessary];
  }
  class Filter_pin extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance$3, create_fragment$3, safe_not_equal, { removeUnnecessary: 2 });
    }
    get removeUnnecessary() {
      return this.$$.ctx[2];
    }
  }
  const images = [
    // 숲
    {
      name: "간다르바_성곽_북_0",
      url: "/img/숲/간다르바_성곽_북_0.png",
      size: [700, 778, 38],
      offset: [-3423, 2566]
    },
    {
      name: "간다언덕_동_0",
      url: "/img/숲/간다언덕_동_0.png",
      size: [700, 1080, 32],
      offset: [-3393, 2135]
    },
    {
      name: "과거의_바나라나",
      url: "/img/숲/과거의_바나라나.png",
      size: [700, 552, 74],
      offset: [-5022, 2740]
    },
    {
      name: "과거의_바나라나_북_0",
      url: "/img/숲/과거의_바나라나_북_0.png",
      size: [800, 1149, 32],
      offset: [-5062, 1934]
    },
    {
      name: "과거의_바나라나_북_1",
      url: "/img/숲/과거의_바나라나_북_1.png",
      size: [700, 871, 26],
      offset: [-5020, 2267]
    },
    {
      name: "다흐리의_폐허_0",
      url: "/img/숲/다흐리의_폐허_0.png",
      size: [800, 396, 47],
      offset: [-4691, 3885]
    },
    {
      name: "데반타카산_남동_0",
      url: "/img/숲/데반타카산_남동_0.png",
      size: [700, 640, 52],
      offset: [-3302, 3625]
    },
    {
      name: "데반타카산_남서_0",
      url: "/img/숲/데반타카산_남서_0.png",
      size: [800, 665, 46],
      offset: [-3787, 3572]
    },
    {
      name: "데반타카산_동_0",
      url: "/img/숲/데반타카산_동_0.png",
      size: [700, 503, 25],
      offset: [-3027, 3395]
    },
    {
      name: "데반타카산_북동_0",
      url: "/img/숲/데반타카산_북동_0.png",
      size: [600, 692, 49],
      offset: [-3228, 3170]
    },
    {
      name: "마우티이마_숲_남동_0",
      url: "/img/숲/마우티이마_숲_남동_0.png",
      size: [700, 739, 38],
      offset: [-3260, 1821]
    },
    {
      name: "마우티이마_숲_남동_1",
      url: "/img/숲/마우티이마_숲_남동_1.png",
      size: [296, 200, 42],
      offset: [-3016, 2315]
    },
    {
      name: "마우티이마_숲_북동_0",
      url: "/img/숲/마우티이마_숲_북동_0.png",
      size: [700, 576, 52],
      offset: [-3590, 1518]
    },
    {
      name: "마우티이마_숲_서_0",
      url: "/img/숲/마우티이마_숲_서_0.png",
      size: [700, 964, 30],
      offset: [-3575, 1631]
    },
    {
      name: "비마라_마을_남서_0",
      url: "/img/숲/비마라_마을_남서_0.png",
      size: [700, 627, 45],
      offset: [-3945, 3315]
    },
    {
      name: "비마라_마을_동_0",
      url: "/img/숲/비마라_마을_동_0.png",
      size: [700, 337, 40],
      offset: [-3591, 3320]
    },
    {
      name: "선나원_북_0",
      url: "/img/숲/선나원_북_0.png",
      size: [802, 658, 41],
      offset: [-4371, 2866]
    },
    {
      name: "선나원_북_1",
      url: "/img/숲/선나원_북_1.png",
      size: [700, 558, 62],
      offset: [-4400, 2805]
    },
    {
      name: "수천삼림_남_0",
      url: "/img/숲/수천삼림_남_0.png",
      size: [700, 647, 40],
      offset: [-4382, 3830]
    },
    {
      name: "아란나라_동_0",
      url: "/img/숲/아란나라_동_0.png",
      size: [800, 687, 39],
      offset: [-4477, 2264]
    },
    {
      name: "야스나_유경_남_0",
      url: "/img/숲/야스나_유경_남_0.png",
      size: [700, 507, 55],
      offset: [-4831, 3253]
    },
    {
      name: "차트라캄_동굴_0",
      url: "/img/숲/차트라캄_동굴_0.png",
      size: [700, 1081, 43],
      offset: [-4026, 1723]
    },
    // 사막
    {
      name: "다르알시파_0",
      url: "/img/사막/다르알시파_0.png",
      size: [700, 828, 34],
      offset: [-5125, 4298]
    },
    {
      name: "다마반드산_0",
      url: "/img/사막/다마반드산_0.png",
      size: [800, 761, 52],
      offset: [-6139, 2841]
    },
    {
      name: "다섯_오아시스의_생존자_0",
      url: "/img/사막/다섯_오아시스의_생존자_0.png",
      size: [700, 400, 71],
      offset: [-5871, 2343]
    },
    {
      name: "다흐리_계곡_서_0",
      url: "/img/사막/다흐리_계곡_서_0.png",
      size: [700, 856, 42],
      offset: [-5906, 4988]
    },
    {
      name: "다흐리_계곡_서_1",
      url: "/img/사막/다흐리_계곡_서_1.png",
      size: [700, 974, 42],
      offset: [-5667, 4916]
    },
    {
      name: "도피의_언덕_남서_0",
      url: "/img/사막/도피의_언덕_남서_0.png",
      size: [2290, 840, 14],
      offset: [-7343, 4867]
    },
    {
      name: "부러진_정강이_협곡_0",
      url: "/img/사막/부러진_정강이_협곡_0.png",
      size: [700, 626, 74],
      offset: [-6975, 2837]
    },
    {
      name: "세_운하의_땅_북_0",
      url: "/img/사막/세_운하의_땅_북_0.png",
      size: [600, 621, 61],
      offset: [-6676, 2240]
    },
    {
      name: "세_운하의_땅_0",
      url: "/img/사막/세_운하의_땅_0.png",
      size: [800, 637, 60],
      offset: [-6579, 2403]
    },
    {
      name: "적왕의_무덤_0",
      url: "/img/사막/적왕의_무덤_0.png",
      size: [1514, 1579, 57],
      offset: [-7106, 3894]
    },
    {
      name: "적왕의_무덤_1",
      url: "/img/사막/적왕의_무덤_1.png",
      size: [700, 1162, 41],
      offset: [-6664, 4226]
    },
    {
      name: "적왕의_무덤_서_0",
      url: "/img/사막/적왕의_무덤_서_0.png",
      size: [600, 1398, 42],
      offset: [-7008, 3797]
    },
    {
      name: "신이_버린_신전_0",
      url: "/img/사막/신이_버린_신전_0.png",
      size: [700, 727, 70],
      offset: [-6789, 3701]
    },
    {
      name: "신이_버린_신전_북_0",
      url: "/img/사막/신이_버린_신전_북_0.png",
      size: [700, 550, 70],
      offset: [-6640, 3251]
    },
    {
      name: "신이_버린_신전_북_1",
      url: "/img/사막/신이_버린_신전_북_1.png",
      size: [500, 377, 32],
      offset: [-6384, 3546]
    },
    {
      name: "알_아지프의_모래_0",
      url: "/img/사막/알_아지프의_모래_0.png",
      size: [700, 760, 76],
      offset: [-5700, 2820]
    },
    {
      name: "영원의_오아시스_0",
      url: "/img/사막/영원의_오아시스_0.png",
      size: [700, 942, 48],
      offset: [-6379, 2620]
    },
    {
      name: "자갈의_언덕_0",
      url: "/img/사막/자갈의_언덕_0.png",
      size: [700, 718, 66],
      offset: [-6851, 4594]
    },
    {
      name: "자갈의_언덕_1",
      url: "/img/사막/자갈의_언덕_1.png",
      size: [700, 1075, 29],
      offset: [-7058, 4556]
    },
    {
      name: "희생_함정_0",
      url: "/img/사막/희생_함정_0.png",
      size: [800, 732, 73],
      offset: [-5589, 4242]
    },
    // 3.6
    {
      name: "감로_꽃바다_북_0",
      url: "/img/사막/3.6/감로_꽃바다_북_0.png",
      size: [4e3, 2600, 19],
      offset: [-8436, 160]
    },
    {
      name: "바르솜_정상_0",
      url: "/img/사막/3.6/바르솜_정상_0.png",
      size: [4e3, 2600, 9],
      offset: [-8681, 19]
    },
    {
      name: "아시파트라바나_늪_북_0",
      url: "/img/사막/3.6/아시파트라바나_늪_북_0.png",
      size: [4e3, 2600, 15],
      offset: [-8933, 90]
    },
    {
      name: "아시파트라바나_늪_서_0",
      url: "/img/사막/3.6/아시파트라바나_늪_서_0.png",
      size: [2630, 2767, 21],
      offset: [-8493, -82]
    },
    {
      name: "테미르산_동_1",
      url: "/img/사막/3.6/테미르산_동_1.png",
      size: [4e3, 2600, 19],
      offset: [-8820, 741]
    },
    {
      name: "테미르산_동_0",
      url: "/img/사막/3.6/테미르산_동_0.png",
      size: [4e3, 2600, 18],
      offset: [-8856, 646]
    },
    {
      name: "투니기_흑연_0",
      url: "/img/사막/3.6/투니기_흑연_0.png",
      size: [5005, 2699, 20],
      offset: [-9731, 430]
    }
  ];
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[6] = list[i];
    child_ctx[8] = i;
    return child_ctx;
  }
  function create_if_block(ctx) {
    let div0;
    let t;
    let div1;
    let each_value = images;
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        div0 = element("div");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t = space();
        div1 = element("div");
        attr(div0, "id", "mapsLayerUnderground");
        attr(div0, "class", "underground-layer");
        set_style(div0, "width", _unsafeWindow.MAPS_Size + "px");
        set_style(div0, "height", _unsafeWindow.MAPS_Size + "px");
        set_style(div0, "transform", "scale(" + /*layerScale*/
        ctx[1] + ")");
        set_style(div1, "background-color", "black");
        set_style(div1, "opacity", "0.5");
        set_style(div1, "width", "100%");
        set_style(div1, "height", "100%");
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(div0, null);
          }
        }
        insert(target, t, anchor);
        insert(target, div1, anchor);
      },
      p(ctx2, dirty) {
        if (dirty & /*images, getImageX, getImageY, getImageUrl*/
        12) {
          each_value = images;
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(div0, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
        if (dirty & /*layerScale*/
        2) {
          set_style(div0, "transform", "scale(" + /*layerScale*/
          ctx2[1] + ")");
        }
      },
      d(detaching) {
        if (detaching)
          detach(div0);
        destroy_each(each_blocks, detaching);
        if (detaching)
          detach(t);
        if (detaching)
          detach(div1);
      }
    };
  }
  function create_each_block(ctx) {
    let div1;
    let div0;
    let t;
    return {
      c() {
        div1 = element("div");
        div0 = element("div");
        t = space();
        set_style(div0, "background-image", "url(" + getImageUrl(
          /*image*/
          ctx[6]
        ) + ")");
        set_style(
          div0,
          "background-size",
          /*image*/
          ctx[6].size[2] + "%"
        );
        attr(div1, "class", "underground-image");
        attr(
          div1,
          "data-index",
          /*index*/
          ctx[8]
        );
        attr(
          div1,
          "data-name",
          /*image*/
          ctx[6].name
        );
        set_style(
          div1,
          "width",
          /*image*/
          ctx[6].size[0] + "px"
        );
        set_style(
          div1,
          "height",
          /*image*/
          ctx[6].size[1] + "px"
        );
        set_style(div1, "transform", "translate(" + /*getImageX*/
        ctx[2](
          /*image*/
          ctx[6]
        ) + "px, " + /*getImageY*/
        ctx[3](
          /*image*/
          ctx[6]
        ) + "px) scale(1)");
      },
      m(target, anchor) {
        insert(target, div1, anchor);
        append(div1, div0);
        append(div1, t);
      },
      p: noop,
      d(detaching) {
        if (detaching)
          detach(div1);
      }
    };
  }
  function create_fragment$2(ctx) {
    let if_block_anchor;
    let if_block = (
      /*active*/
      ctx[0] == true && create_if_block(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (
          /*active*/
          ctx2[0] == true
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block(ctx2);
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (if_block)
          if_block.d(detaching);
        if (detaching)
          detach(if_block_anchor);
      }
    };
  }
  function getImageUrl(image) {
    return `https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/${image.url}`;
  }
  function instance$2($$self, $$props, $$invalidate) {
    let active = false;
    let layerScale = _unsafeWindow.MAPS_ViewSize / _unsafeWindow.MAPS_Size;
    function getImageX(image) {
      return image.offset[0] + _unsafeWindow.MAPS_RelativeX;
    }
    function getImageY(image) {
      return image.offset[1] + _unsafeWindow.MAPS_RelativeY;
    }
    const unsubscribe = isUndergroundMapActive.subscribe((value) => {
      $$invalidate(0, active = value);
    });
    const redraw = () => {
      if (!active)
        return;
      $$invalidate(1, layerScale = _unsafeWindow.MAPS_ViewSize / _unsafeWindow.MAPS_Size);
    };
    onDestroy(unsubscribe);
    return [active, layerScale, getImageX, getImageY, redraw];
  }
  class Images extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance$2, create_fragment$2, safe_not_equal, { redraw: 4 });
    }
    get redraw() {
      return this.$$.ctx[4];
    }
  }
  function create_fragment$1(ctx) {
    let div0;
    let images_1;
    let t0;
    let div1;
    let t2;
    let button;
    let button_class_value;
    let current;
    let mounted;
    let dispose;
    let images_1_props = {};
    images_1 = new Images({ props: images_1_props });
    ctx[6](images_1);
    return {
      c() {
        div0 = element("div");
        create_component(images_1.$$.fragment);
        t0 = space();
        div1 = element("div");
        div1.textContent = "지하 맵";
        t2 = space();
        button = element("button");
        attr(div0, "class", "underground-images");
        attr(div1, "class", "maps-addons-switch-label");
        attr(button, "class", button_class_value = "maps-addons-switch " + /*active*/
        (ctx[0] ? "on" : ""));
      },
      m(target, anchor) {
        insert(target, div0, anchor);
        mount_component(images_1, div0, null);
        ctx[7](div0);
        insert(target, t0, anchor);
        insert(target, div1, anchor);
        insert(target, t2, anchor);
        insert(target, button, anchor);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleClick*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        const images_1_changes = {};
        images_1.$set(images_1_changes);
        if (!current || dirty & /*active*/
        1 && button_class_value !== (button_class_value = "maps-addons-switch " + /*active*/
        (ctx2[0] ? "on" : ""))) {
          attr(button, "class", button_class_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(images_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(images_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div0);
        ctx[6](null);
        destroy_component(images_1);
        ctx[7](null);
        if (detaching)
          detach(t0);
        if (detaching)
          detach(div1);
        if (detaching)
          detach(t2);
        if (detaching)
          detach(button);
        mounted = false;
        dispose();
      }
    };
  }
  function instance$1($$self, $$props, $$invalidate) {
    let active;
    let images2;
    let imagesWrapper;
    const unsubscribe = isUndergroundMapActive.subscribe((value) => {
      $$invalidate(0, active = value);
      _unsafeWindow.setPinObjectRefresh();
    });
    function handleClick() {
      isUndergroundMapActive.update((active2) => !active2);
    }
    function redraw() {
      images2.redraw();
    }
    function removeUnnecessary() {
      images2.removeUnnecessary();
    }
    onMount(() => {
      const layer = document.getElementById("mapsLayerBackground");
      layer.after(imagesWrapper);
    });
    onDestroy(unsubscribe);
    function images_1_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        images2 = $$value;
        $$invalidate(1, images2);
      });
    }
    function div0_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        imagesWrapper = $$value;
        $$invalidate(2, imagesWrapper);
      });
    }
    return [
      active,
      images2,
      imagesWrapper,
      handleClick,
      redraw,
      removeUnnecessary,
      images_1_binding,
      div0_binding
    ];
  }
  class Underground_map extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance$1, create_fragment$1, safe_not_equal, { redraw: 4, removeUnnecessary: 5 });
    }
    get redraw() {
      return this.$$.ctx[4];
    }
    get removeUnnecessary() {
      return this.$$.ctx[5];
    }
  }
  const handlers = Symbol("handlers");
  const makeObservable = (target) => {
    target[handlers] = [];
    target["observe"] = function(handler) {
      this[handlers].push(handler);
    };
    return new Proxy(target, {
      set(target2, property, value, _) {
        let success = Reflect.set(...[target2, property, value, _]);
        if (success) {
          target2[handlers].forEach((handler) => handler(property, value));
        }
        return success;
      }
    });
  };
  function create_fragment(ctx) {
    let div;
    let filterchest;
    let updating_chestFilter;
    let t0;
    let filterpin;
    let t1;
    let undergroundmap;
    let current;
    function filterchest_chestFilter_binding(value) {
      ctx[3](value);
    }
    let filterchest_props = {};
    if (
      /*chestFilter*/
      ctx[0] !== void 0
    ) {
      filterchest_props.chestFilter = /*chestFilter*/
      ctx[0];
    }
    filterchest = new Filter_chest({ props: filterchest_props });
    binding_callbacks.push(() => bind(filterchest, "chestFilter", filterchest_chestFilter_binding));
    let filterpin_props = {};
    filterpin = new Filter_pin({ props: filterpin_props });
    ctx[4](filterpin);
    let undergroundmap_props = {};
    undergroundmap = new Underground_map({ props: undergroundmap_props });
    ctx[5](undergroundmap);
    return {
      c() {
        div = element("div");
        create_component(filterchest.$$.fragment);
        t0 = space();
        create_component(filterpin.$$.fragment);
        t1 = space();
        create_component(undergroundmap.$$.fragment);
        attr(div, "class", "maps-addons");
      },
      m(target, anchor) {
        insert(target, div, anchor);
        mount_component(filterchest, div, null);
        append(div, t0);
        mount_component(filterpin, div, null);
        append(div, t1);
        mount_component(undergroundmap, div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        const filterchest_changes = {};
        if (!updating_chestFilter && dirty & /*chestFilter*/
        1) {
          updating_chestFilter = true;
          filterchest_changes.chestFilter = /*chestFilter*/
          ctx2[0];
          add_flush_callback(() => updating_chestFilter = false);
        }
        filterchest.$set(filterchest_changes);
        const filterpin_changes = {};
        filterpin.$set(filterpin_changes);
        const undergroundmap_changes = {};
        undergroundmap.$set(undergroundmap_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(filterchest.$$.fragment, local);
        transition_in(filterpin.$$.fragment, local);
        transition_in(undergroundmap.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(filterchest.$$.fragment, local);
        transition_out(filterpin.$$.fragment, local);
        transition_out(undergroundmap.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching)
          detach(div);
        destroy_component(filterchest);
        ctx[4](null);
        destroy_component(filterpin);
        ctx[5](null);
        destroy_component(undergroundmap);
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let chestFilter;
    let filterPin;
    let undergroundMap;
    function init2() {
      _unsafeWindow.drawMapsLayer = function(originDrawMapsLayer) {
        return (boolPanelHide) => {
          originDrawMapsLayer(boolPanelHide);
          adjustPin();
          undergroundMap.redraw();
          filterPin.removeUnnecessary();
        };
      }(_unsafeWindow.drawMapsLayer);
      _unsafeWindow.removePin = function(originRemovePin) {
        const _proxyLoadedPin = () => {
          isChestPinLoaded.set(_unsafeWindow.MAPS_PinLoad.filter((value) => {
            var _a;
            return (_a = value.name) === null || _a === void 0 ? void 0 : _a.includes("보물상자");
          }).length > 0);
          _unsafeWindow.MAPS_PinLoad = makeObservable(_unsafeWindow.MAPS_PinLoad);
          _unsafeWindow.MAPS_PinLoad.observe((_, value) => {
            var _a;
            if (Object.prototype.toString.call(value) == "[object Object]" && ((_a = value.name) === null || _a === void 0 ? void 0 : _a.includes("보물상자"))) {
              isChestPinLoaded.set(true);
            }
          });
        };
        _proxyLoadedPin();
        return (boolGroup, pinIndex, boolTabUpdate) => {
          originRemovePin(boolGroup, pinIndex, boolTabUpdate);
          _proxyLoadedPin();
        };
      }(_unsafeWindow.removePin);
    }
    function adjustPin() {
      if (Object.prototype.toString.call(_unsafeWindow.MAPS_ViewPin) != "[object Set]" || _unsafeWindow.MAPS_ViewPin.size <= 0)
        return;
      const selectedValues = chestFilter.getResult();
      const OBJECT_PIN_LAYER = document.getElementById("mapsLayerPoint");
      _unsafeWindow.MAPS_ViewPin.forEach((v) => {
        const arrDrawPin = _unsafeWindow.MAPS_PinDraw.get(v);
        if (Object.prototype.toString.call(arrDrawPin) != "[object Array]" || arrDrawPin.length <= 0)
          return true;
        let mapPinGroup = /* @__PURE__ */ new Map();
        arrDrawPin.forEach((point) => {
          var _a, _b;
          const arrPinData = _unsafeWindow.MAPS_PinLoad[point.pin];
          if (point.category && arrPinData.category[point.category]) {
            const arrCategory = arrPinData.category[point.category];
            if ((_a = arrPinData.name) === null || _a === void 0 ? void 0 : _a.includes("보물상자")) {
              if (selectedValues.includes(arrCategory.name) == false) {
                (_b = document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`)) === null || _b === void 0 ? void 0 : _b.remove();
                return true;
              }
            }
          }
          if (_unsafeWindow.MAPS_State.pinGroup == true) {
            let arrPinGroup = mapPinGroup.get(point.pin);
            arrPinGroup = arrPinGroup ? arrPinGroup : {
              x: 0,
              y: 0,
              state: 0,
              length: 0,
              points: [],
              point
            };
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
        if (_unsafeWindow.MAPS_State.pinGroup) {
          let constants = {
            isFilterPinActive: get_store_value(isFilterPinActive),
            isUndergroundMapActive: get_store_value(isUndergroundMapActive)
          };
          mapPinGroup.forEach((value) => {
            var _a;
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
              const isUnderground = (_a = point.tag) === null || _a === void 0 ? void 0 : _a.includes("지하");
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
            let objectPoint;
            if (length > 1) {
              console.log("redraw");
              objectPoint = _unsafeWindow.drawPinObject(true, value.point, arrData);
              objectPoint.className = "maps-point group";
              let objectCount = document.createElement("p");
              objectCount.innerText = state + "/" + length;
              objectPoint.querySelector("div").appendChild(objectCount);
              let groupX = x / length;
              let groupY = y / length;
              objectPoint.setAttribute("style", "transform: translate(" + (groupX + _unsafeWindow.MAPS_RelativeX) + "px, " + (groupY + _unsafeWindow.MAPS_RelativeY) + "px);");
              objectPoint.setAttribute("data-state", state == length ? "true" : "false");
              objectPoint.removeAttribute("data-tip");
              if (constants.isUndergroundMapActive) {
                objectPoint.setAttribute("data-is-underground", "true");
              } else {
                objectPoint.removeAttribute("data-is-underground");
              }
              objectPoint.style.marginLeft = objectPoint.style.marginTop = "-64px";
              OBJECT_PIN_LAYER.appendChild(objectPoint);
            } else {
              for (const point of value.points) {
                objectPoint = _unsafeWindow.drawPinObject(false, point, arrData);
                OBJECT_PIN_LAYER.appendChild(objectPoint);
              }
            }
          });
        }
        return true;
      });
    }
    onMount(() => {
      init2();
    });
    function filterchest_chestFilter_binding(value) {
      chestFilter = value;
      $$invalidate(0, chestFilter);
    }
    function filterpin_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        filterPin = $$value;
        $$invalidate(1, filterPin);
      });
    }
    function undergroundmap_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        undergroundMap = $$value;
        $$invalidate(2, undergroundMap);
      });
    }
    return [
      chestFilter,
      filterPin,
      undergroundMap,
      filterchest_chestFilter_binding,
      filterpin_binding,
      undergroundmap_binding
    ];
  }
  class App extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment, safe_not_equal, {});
    }
  }
  new App({
    target: document.body,
    props: {}
  });
  _unsafeWindow.$store = function() {
    function _isFilterPinActive() {
      return get_store_value(isFilterPinActive);
    }
    function _isUndergroundMapActive() {
      return get_store_value(isUndergroundMapActive);
    }
    function _isChestPinLoaded() {
      return get_store_value(isChestPinLoaded);
    }
    function _updateIsFilterPinActive(value) {
      return isFilterPinActive.update((_) => value);
    }
    function _updateIsUndergroundMapActive(value) {
      return isUndergroundMapActive.update((_) => value);
    }
    function _updateIsChestPinLoaded(value) {
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
        set(value) {
          _updateIsFilterPinActive(value);
        },
        toggle() {
          _toggleIsFilterPinActive();
        }
      },
      isUndergroundMapActive: {
        get() {
          return _isUndergroundMapActive();
        },
        set(value) {
          _updateIsUndergroundMapActive(value);
        },
        toggle() {
          _toggleIsUndergroundMapActive();
        }
      },
      isChestPinLoaded: {
        get() {
          return _isChestPinLoaded();
        },
        set(value) {
          _updateIsChestPinLoaded(value);
        },
        toggle() {
          _toggleIsChestPinLoaded();
        }
      }
    };
  }();

})();
