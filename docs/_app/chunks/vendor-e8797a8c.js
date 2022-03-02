function noop() {
}
function assign(tar, src) {
  for (const k in src)
    tar[k] = src[k];
  return tar;
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
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
let is_hydrating = false;
function start_hydrating() {
  is_hydrating = true;
}
function end_hydrating() {
  is_hydrating = false;
}
function upper_bound(low, high, key, value) {
  while (low < high) {
    const mid = low + (high - low >> 1);
    if (key(mid) <= value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
function init_hydrate(target) {
  if (target.hydrate_init)
    return;
  target.hydrate_init = true;
  let children2 = target.childNodes;
  if (target.nodeName === "HEAD") {
    const myChildren = [];
    for (let i = 0; i < children2.length; i++) {
      const node = children2[i];
      if (node.claim_order !== void 0) {
        myChildren.push(node);
      }
    }
    children2 = myChildren;
  }
  const m = new Int32Array(children2.length + 1);
  const p = new Int32Array(children2.length);
  m[0] = -1;
  let longest = 0;
  for (let i = 0; i < children2.length; i++) {
    const current = children2[i].claim_order;
    const seqLen = (longest > 0 && children2[m[longest]].claim_order <= current ? longest + 1 : upper_bound(1, longest, (idx) => children2[m[idx]].claim_order, current)) - 1;
    p[i] = m[seqLen] + 1;
    const newLen = seqLen + 1;
    m[newLen] = i;
    longest = Math.max(newLen, longest);
  }
  const lis = [];
  const toMove = [];
  let last = children2.length - 1;
  for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
    lis.push(children2[cur - 1]);
    for (; last >= cur; last--) {
      toMove.push(children2[last]);
    }
    last--;
  }
  for (; last >= 0; last--) {
    toMove.push(children2[last]);
  }
  lis.reverse();
  toMove.sort((a, b) => a.claim_order - b.claim_order);
  for (let i = 0, j = 0; i < toMove.length; i++) {
    while (j < lis.length && toMove[i].claim_order >= lis[j].claim_order) {
      j++;
    }
    const anchor = j < lis.length ? lis[j] : null;
    target.insertBefore(toMove[i], anchor);
  }
}
function append(target, node) {
  target.appendChild(node);
}
function append_hydration(target, node) {
  if (is_hydrating) {
    init_hydrate(target);
    if (target.actual_end_child === void 0 || target.actual_end_child !== null && target.actual_end_child.parentElement !== target) {
      target.actual_end_child = target.firstChild;
    }
    while (target.actual_end_child !== null && target.actual_end_child.claim_order === void 0) {
      target.actual_end_child = target.actual_end_child.nextSibling;
    }
    if (node !== target.actual_end_child) {
      if (node.claim_order !== void 0 || node.parentNode !== target) {
        target.insertBefore(node, target.actual_end_child);
      }
    } else {
      target.actual_end_child = node.nextSibling;
    }
  } else if (node.parentNode !== target || node.nextSibling !== null) {
    target.appendChild(node);
  }
}
function insert_hydration(target, node, anchor) {
  if (is_hydrating && !anchor) {
    append_hydration(target, node);
  } else if (node.parentNode !== target || node.nextSibling != anchor) {
    target.insertBefore(node, anchor || null);
  }
}
function detach(node) {
  node.parentNode.removeChild(node);
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
function init_claim_info(nodes) {
  if (nodes.claim_info === void 0) {
    nodes.claim_info = { last_index: 0, total_claimed: 0 };
  }
}
function claim_node(nodes, predicate, processNode, createNode, dontUpdateLastIndex = false) {
  init_claim_info(nodes);
  const resultNode = (() => {
    for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        }
        return node;
      }
    }
    for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
      const node = nodes[i];
      if (predicate(node)) {
        const replacement = processNode(node);
        if (replacement === void 0) {
          nodes.splice(i, 1);
        } else {
          nodes[i] = replacement;
        }
        if (!dontUpdateLastIndex) {
          nodes.claim_info.last_index = i;
        } else if (replacement === void 0) {
          nodes.claim_info.last_index--;
        }
        return node;
      }
    }
    return createNode();
  })();
  resultNode.claim_order = nodes.claim_info.total_claimed;
  nodes.claim_info.total_claimed += 1;
  return resultNode;
}
function claim_element_base(nodes, name, attributes, create_element) {
  return claim_node(nodes, (node) => node.nodeName === name, (node) => {
    const remove2 = [];
    for (let j = 0; j < node.attributes.length; j++) {
      const attribute = node.attributes[j];
      if (!attributes[attribute.name]) {
        remove2.push(attribute.name);
      }
    }
    remove2.forEach((v) => node.removeAttribute(v));
    return void 0;
  }, () => create_element(name));
}
function claim_element(nodes, name, attributes) {
  return claim_element_base(nodes, name, attributes, element);
}
function claim_text(nodes, data) {
  return claim_node(nodes, (node) => node.nodeType === 3, (node) => {
    const dataStr = "" + data;
    if (node.data.startsWith(dataStr)) {
      if (node.data.length !== dataStr.length) {
        return node.splitText(dataStr.length);
      }
    } else {
      node.data = dataStr;
    }
  }, () => text(data), true);
}
function claim_space(nodes) {
  return claim_text(nodes, " ");
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;");
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(window, "message", (event) => {
      if (event.source === iframe.contentWindow)
        fn();
    });
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
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
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
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
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
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
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
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
  }
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n))
          to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2))
      update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
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
function claim_component(block, parent_nodes) {
  block && block.l(parent_nodes);
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, on_mount, on_destroy, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);
      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
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
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
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
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      start_hydrating();
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    end_hydrating();
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
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe };
}
function filterList(list, value, missingIsFalse) {
  if (list === "*") {
    return true;
  }
  return list.length > 0 ? list.indexOf(value) !== -1 : !missingIsFalse;
}
function extend(o1, o2, keys) {
  var i;
  o1 = o1 || {};
  o2 = o2 || {};
  var _o1 = o1, _o2 = o2;
  if (keys) {
    for (i = 0; i < keys.length; i++) {
      _o1[keys[i]] = _o2[keys[i]];
    }
  } else {
    for (i in _o2) {
      _o1[i] = _o2[i];
    }
  }
  return o1;
}
function isNumber(n) {
  return Object.prototype.toString.call(n) === "[object Number]";
}
function isString(s) {
  return typeof s === "string";
}
function isBoolean(s) {
  return typeof s === "boolean";
}
function isObject(o) {
  return o == null ? false : Object.prototype.toString.call(o) === "[object Object]";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}
function isFunction(o) {
  return Object.prototype.toString.call(o) === "[object Function]";
}
function isNamedFunction(o) {
  return isFunction(o) && o.name != null && o.name.length > 0;
}
function isEmpty(o) {
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}
function clone(a) {
  if (isString(a)) {
    return "" + a;
  } else if (isBoolean(a)) {
    return !!a;
  } else if (isDate(a)) {
    return new Date(a.getTime());
  } else if (isFunction(a)) {
    return a;
  } else if (Array.isArray(a)) {
    var _b = [];
    for (var i = 0; i < a.length; i++) {
      _b.push(clone(a[i]));
    }
    return _b;
  } else if (isObject(a)) {
    var c = {};
    for (var j in a) {
      c[j] = clone(a[j]);
    }
    return c;
  } else {
    return a;
  }
}
function filterNull(obj) {
  var o = {};
  for (var k in obj) {
    if (obj[k] != null) {
      o[k] = obj[k];
    }
  }
  return o;
}
function merge(a, b, collations, overwrites) {
  var cMap = {}, ar, i, oMap = {};
  collations = collations || [];
  overwrites = overwrites || [];
  for (i = 0; i < collations.length; i++) {
    cMap[collations[i]] = true;
  }
  for (i = 0; i < overwrites.length; i++) {
    oMap[overwrites[i]] = true;
  }
  var c = clone(a);
  for (i in b) {
    if (c[i] == null || oMap[i]) {
      c[i] = b[i];
    } else if (cMap[i]) {
      ar = [];
      ar.push.apply(ar, Array.isArray(c[i]) ? c[i] : [c[i]]);
      ar.push(b[i]);
      c[i] = ar;
    } else if (isString(b[i]) || isBoolean(b[i]) || isFunction(b[i]) || isNumber(b[i])) {
      c[i] = b[i];
    } else {
      if (Array.isArray(b[i])) {
        ar = [];
        if (Array.isArray(c[i])) {
          ar.push.apply(ar, c[i]);
        }
        ar.push.apply(ar, b[i]);
        c[i] = ar;
      } else if (isObject(b[i])) {
        if (!isObject(c[i])) {
          c[i] = {};
        }
        for (var j in b[i]) {
          c[i][j] = b[i][j];
        }
      }
    }
  }
  return c;
}
function _areEqual(a, b) {
  if (a != null && b == null) {
    return false;
  } else {
    if ((a == null || isString(a) || isBoolean(a) || isNumber(a)) && a !== b) {
      return false;
    } else {
      if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
          return false;
        } else {
          if (!arraysEqual(a, b)) {
            return false;
          }
        }
      } else if (isObject(a)) {
        if (!isObject(a)) {
          return false;
        } else {
          if (!objectsEqual(a, b)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
function arraysEqual(a, b) {
  if (a == null && b == null) {
    return true;
  } else if (a == null && b != null) {
    return false;
  } else if (a != null && b == null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  } else {
    for (var i = 0; i < a.length; i++) {
      if (!_areEqual(a[i], b[i])) {
        return false;
      }
    }
  }
  return true;
}
function objectsEqual(a, b) {
  if (a == null && b == null) {
    return true;
  } else if (a == null && b != null) {
    return false;
  } else if (a != null && b == null) {
    return false;
  }
  for (var key in a) {
    var va = a[key], vb = b[key];
    if (!_areEqual(va, vb)) {
      return false;
    }
  }
  return true;
}
function replace(inObj, path, value) {
  if (inObj == null) {
    return;
  }
  var q = inObj, t = q;
  path.replace(/([^\.])+/g, function(term, lc, pos, str) {
    var array = term.match(/([^\[0-9]+){1}(\[)([0-9+])/), last = pos + term.length >= str.length, _getArray = function _getArray2() {
      return t[array[1]] || function() {
        t[array[1]] = [];
        return t[array[1]];
      }();
    };
    if (last) {
      if (array) {
        _getArray()[array[3]] = value;
      } else {
        t[term] = value;
      }
    } else {
      if (array) {
        var _a2 = _getArray();
        t = _a2[array[3]] || function() {
          _a2[array[3]] = {};
          return _a2[array[3]];
        }();
      } else {
        t = t[term] || function() {
          t[term] = {};
          return t[term];
        }();
      }
    }
    return "";
  });
  return inObj;
}
function functionChain(successValue, failValue, fns) {
  for (var i = 0; i < fns.length; i++) {
    var o = fns[i][0][fns[i][1]].apply(fns[i][0], fns[i][2]);
    if (o === failValue) {
      return o;
    }
  }
  return successValue;
}
function populate(model, values, functionPrefix, doNotExpandFunctions) {
  var getValue = function getValue2(fromString) {
    var matches = fromString.match(/(\${.*?})/g);
    if (matches != null) {
      for (var i = 0; i < matches.length; i++) {
        var val = values[matches[i].substring(2, matches[i].length - 1)] || "";
        if (val != null) {
          fromString = fromString.replace(matches[i], val);
        }
      }
    }
    return fromString;
  };
  var _one = function _one2(d) {
    if (d != null) {
      if (isString(d)) {
        return getValue(d);
      } else if (isFunction(d) && !doNotExpandFunctions && (functionPrefix == null || (d.name || "").indexOf(functionPrefix) === 0)) {
        return d(values);
      } else if (Array.isArray(d)) {
        var r = [];
        for (var i = 0; i < d.length; i++) {
          r.push(_one2(d[i]));
        }
        return r;
      } else if (isObject(d)) {
        var s = {};
        for (var j in d) {
          s[j] = _one2(d[j]);
        }
        return s;
      } else {
        return d;
      }
    }
  };
  return _one(model);
}
function forEach(a, f) {
  if (a) {
    for (var i = 0; i < a.length; i++) {
      f(a[i]);
    }
  } else {
    return null;
  }
}
function findWithFunction(a, f) {
  if (a) {
    for (var i = 0; i < a.length; i++) {
      if (f(a[i])) {
        return i;
      }
    }
  }
  return -1;
}
function findAllWithFunction(a, predicate) {
  var o = [];
  if (a) {
    for (var i = 0; i < a.length; i++) {
      if (predicate(a[i])) {
        o.push(i);
      }
    }
  }
  return o;
}
function getWithFunction(a, f) {
  var idx = findWithFunction(a, f);
  return idx === -1 ? null : a[idx];
}
function getAllWithFunction(a, f) {
  var indexes = findAllWithFunction(a, f);
  return indexes.map(function(i) {
    return a[i];
  });
}
function getFromSetWithFunction(s, f) {
  var out = null;
  s.forEach(function(t) {
    if (f(t)) {
      out = t;
    }
  });
  return out;
}
function setToArray(s) {
  var a = [];
  s.forEach(function(t) {
    a.push(t);
  });
  return a;
}
function removeWithFunction(a, f) {
  var idx = findWithFunction(a, f);
  if (idx > -1) {
    a.splice(idx, 1);
  }
  return idx !== -1;
}
function fromArray(a) {
  if (Array.fromArray != null) {
    return Array.from(a);
  } else {
    var arr = [];
    Array.prototype.push.apply(arr, a);
    return arr;
  }
}
function remove(l, v) {
  var idx = l.indexOf(v);
  if (idx > -1) {
    l.splice(idx, 1);
  }
  return idx !== -1;
}
function addWithFunction(list, item, hashFunction) {
  if (findWithFunction(list, hashFunction) === -1) {
    list.push(item);
  }
}
function addToDictionary(map2, key, value, insertAtStart) {
  var l = map2[key];
  if (l == null) {
    l = [];
    map2[key] = l;
  }
  l[insertAtStart ? "unshift" : "push"](value);
  return l;
}
function addToList(map2, key, value, insertAtStart) {
  var l = map2.get(key);
  if (l == null) {
    l = [];
    map2.set(key, l);
  }
  l[insertAtStart ? "unshift" : "push"](value);
  return l;
}
function suggest(list, item, insertAtHead) {
  if (list.indexOf(item) === -1) {
    if (insertAtHead) {
      list.unshift(item);
    } else {
      list.push(item);
    }
    return true;
  }
  return false;
}
var lut = [];
for (var i = 0; i < 256; i++) {
  lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
function uuid() {
  var d0 = Math.random() * 4294967295 | 0;
  var d1 = Math.random() * 4294967295 | 0;
  var d2 = Math.random() * 4294967295 | 0;
  var d3 = Math.random() * 4294967295 | 0;
  return lut[d0 & 255] + lut[d0 >> 8 & 255] + lut[d0 >> 16 & 255] + lut[d0 >> 24 & 255] + "-" + lut[d1 & 255] + lut[d1 >> 8 & 255] + "-" + lut[d1 >> 16 & 15 | 64] + lut[d1 >> 24 & 255] + "-" + lut[d2 & 63 | 128] + lut[d2 >> 8 & 255] + "-" + lut[d2 >> 16 & 255] + lut[d2 >> 24 & 255] + lut[d3 & 255] + lut[d3 >> 8 & 255] + lut[d3 >> 16 & 255] + lut[d3 >> 24 & 255];
}
function rotatePoint(point, center, rotation) {
  var radial = {
    x: point.x - center.x,
    y: point.y - center.y
  }, cr = Math.cos(rotation / 360 * Math.PI * 2), sr = Math.sin(rotation / 360 * Math.PI * 2);
  return {
    x: radial.x * cr - radial.y * sr + center.x,
    y: radial.y * cr + radial.x * sr + center.y,
    cr,
    sr
  };
}
function rotateAnchorOrientation(orientation, rotation) {
  var r = rotatePoint({
    x: orientation[0],
    y: orientation[1]
  }, {
    x: 0,
    y: 0
  }, rotation);
  return [Math.round(r.x), Math.round(r.y)];
}
function fastTrim(s) {
  if (s == null) {
    return null;
  }
  var str = s.replace(/^\s\s*/, ""), ws = /\s/, i = str.length;
  while (ws.test(str.charAt(--i))) {
  }
  return str.slice(0, i + 1);
}
function each(obj, fn) {
  obj = obj.length == null || typeof obj === "string" ? [obj] : obj;
  for (var _i = 0; _i < obj.length; _i++) {
    fn(obj[_i]);
  }
}
function map(obj, fn) {
  var o = [];
  for (var _i2 = 0; _i2 < obj.length; _i2++) {
    o.push(fn(obj[_i2]));
  }
  return o;
}
var logEnabled = true;
function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof console !== "undefined") {
    try {
      var msg = arguments[arguments.length - 1];
      console.log(msg);
    } catch (e) {
    }
  }
}
function wrap(wrappedFunction, newFunction, returnOnThisValue) {
  return function() {
    var r = null;
    try {
      if (newFunction != null) {
        r = newFunction.apply(this, arguments);
      }
    } catch (e) {
      log("jsPlumb function failed : " + e);
    }
    if (wrappedFunction != null && (returnOnThisValue == null || r !== returnOnThisValue)) {
      try {
        r = wrappedFunction.apply(this, arguments);
      } catch (e) {
        log("wrapped function failed : " + e);
      }
    }
    return r;
  };
}
function getsert(map2, key, valueGenerator) {
  if (!map2.has(key)) {
    map2.set(key, valueGenerator());
  }
  return map2.get(key);
}
function isAssignableFrom(object, cls) {
  var proto = object.__proto__;
  while (proto != null) {
    if (proto instanceof cls) {
      return true;
    } else {
      proto = proto.__proto__;
    }
  }
  return false;
}
function insertSorted(value, array, comparator, sortDescending) {
  if (array.length === 0) {
    array.push(value);
  } else {
    var flip = sortDescending ? -1 : 1;
    var min = 0;
    var max = array.length;
    var index = Math.floor((min + max) / 2);
    while (max > min) {
      var c = comparator(value, array[index]) * flip;
      if (c < 0) {
        max = index;
      } else {
        min = index + 1;
      }
      index = Math.floor((min + max) / 2);
    }
    array.splice(index, 0, value);
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
var EventGenerator = function() {
  function EventGenerator2() {
    _classCallCheck(this, EventGenerator2);
    _defineProperty(this, "_listeners", {});
    _defineProperty(this, "eventsSuspended", false);
    _defineProperty(this, "tick", false);
    _defineProperty(this, "eventsToDieOn", {
      "ready": true
    });
    _defineProperty(this, "queue", []);
  }
  _createClass(EventGenerator2, [{
    key: "fire",
    value: function fire(event, value, originalEvent) {
      var ret = null;
      if (!this.tick) {
        this.tick = true;
        if (!this.eventsSuspended && this._listeners[event]) {
          var l = this._listeners[event].length, i = 0, _gone = false;
          if (!this.shouldFireEvent || this.shouldFireEvent(event, value, originalEvent)) {
            while (!_gone && i < l && ret !== false) {
              if (this.eventsToDieOn[event]) {
                this._listeners[event][i].apply(this, [value, originalEvent]);
              } else {
                try {
                  ret = this._listeners[event][i].apply(this, [value, originalEvent]);
                } catch (e) {
                  log("jsPlumb: fire failed for event " + event + " : " + (e.message || e));
                }
              }
              i++;
              if (this._listeners == null || this._listeners[event] == null) {
                _gone = true;
              }
            }
          }
        }
        this.tick = false;
        this._drain();
      } else {
        this.queue.unshift(arguments);
      }
      return ret;
    }
  }, {
    key: "_drain",
    value: function _drain() {
      var n = this.queue.pop();
      if (n) {
        this.fire.apply(this, n);
      }
    }
  }, {
    key: "unbind",
    value: function unbind(eventOrListener, listener) {
      if (arguments.length === 0) {
        this._listeners = {};
      } else if (arguments.length === 1) {
        if (typeof eventOrListener === "string") {
          delete this._listeners[eventOrListener];
        } else if (eventOrListener.__jsPlumb) {
          var evt;
          for (var i in eventOrListener.__jsPlumb) {
            evt = eventOrListener.__jsPlumb[i];
            remove(this._listeners[evt] || [], eventOrListener);
          }
        }
      } else if (arguments.length === 2) {
        remove(this._listeners[eventOrListener] || [], listener);
      }
      return this;
    }
  }, {
    key: "getListener",
    value: function getListener(forEvent) {
      return this._listeners[forEvent] || [];
    }
  }, {
    key: "isSuspendEvents",
    value: function isSuspendEvents() {
      return this.eventsSuspended;
    }
  }, {
    key: "setSuspendEvents",
    value: function setSuspendEvents(val) {
      this.eventsSuspended = val;
    }
  }, {
    key: "bind",
    value: function bind2(event, listener, insertAtStart) {
      var _this = this;
      var _one = function _one2(evt) {
        addToDictionary(_this._listeners, evt, listener, insertAtStart);
        listener.__jsPlumb = listener.__jsPlumb || {};
        listener.__jsPlumb[uuid()] = evt;
      };
      if (typeof event === "string") {
        _one(event);
      } else if (event.length != null) {
        for (var i = 0; i < event.length; i++) {
          _one(event[i]);
        }
      }
      return this;
    }
  }, {
    key: "silently",
    value: function silently(fn) {
      this.setSuspendEvents(true);
      try {
        fn();
      } catch (e) {
        log("Cannot execute silent function " + e);
      }
      this.setSuspendEvents(false);
    }
  }]);
  return EventGenerator2;
}();
var OptimisticEventGenerator = function(_EventGenerator) {
  _inherits(OptimisticEventGenerator2, _EventGenerator);
  var _super = _createSuper(OptimisticEventGenerator2);
  function OptimisticEventGenerator2() {
    _classCallCheck(this, OptimisticEventGenerator2);
    return _super.apply(this, arguments);
  }
  _createClass(OptimisticEventGenerator2, [{
    key: "shouldFireEvent",
    value: function shouldFireEvent(event, value, originalEvent) {
      return true;
    }
  }]);
  return OptimisticEventGenerator2;
}(EventGenerator);
var segmentMultipliers = [null, [1, -1], [1, 1], [-1, 1], [-1, -1]];
var inverseSegmentMultipliers = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
var TWO_PI = 2 * Math.PI;
function add(p1, p2) {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
}
function subtract(p1, p2) {
  return {
    x: p1.x - p2.x,
    y: p1.y - p2.y
  };
}
function gradient(p1, p2) {
  if (p2.x === p1.x)
    return p2.y > p1.y ? Infinity : -Infinity;
  else if (p2.y === p1.y)
    return p2.x > p1.x ? 0 : -0;
  else
    return (p2.y - p1.y) / (p2.x - p1.x);
}
function normal(p1, p2) {
  return -1 / gradient(p1, p2);
}
function lineLength(p1, p2) {
  return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
}
function quadrant(p1, p2) {
  if (p2.x > p1.x) {
    return p2.y > p1.y ? 2 : 1;
  } else if (p2.x == p1.x) {
    return p2.y > p1.y ? 2 : 1;
  } else {
    return p2.y > p1.y ? 3 : 4;
  }
}
function theta(p1, p2) {
  var m = gradient(p1, p2), t = Math.atan(m), s = quadrant(p1, p2);
  if (s == 4 || s == 3)
    t += Math.PI;
  if (t < 0)
    t += 2 * Math.PI;
  return t;
}
function intersects(r1, r2) {
  var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h, a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h;
  return x1 <= a1 && a1 <= x2 && y1 <= b1 && b1 <= y2 || x1 <= a2 && a2 <= x2 && y1 <= b1 && b1 <= y2 || x1 <= a1 && a1 <= x2 && y1 <= b2 && b2 <= y2 || x1 <= a2 && a1 <= x2 && y1 <= b2 && b2 <= y2 || a1 <= x1 && x1 <= a2 && b1 <= y1 && y1 <= b2 || a1 <= x2 && x2 <= a2 && b1 <= y1 && y1 <= b2 || a1 <= x1 && x1 <= a2 && b1 <= y2 && y2 <= b2 || a1 <= x2 && x1 <= a2 && b1 <= y2 && y2 <= b2;
}
function toABC(line) {
  var A = line[1].y - line[0].y;
  var B = line[0].x - line[1].x;
  return {
    A,
    B,
    C: A * line[0].x + B * line[0].y
  };
}
function lineIntersection(l1, l2) {
  var abc1 = toABC(l1), abc2 = toABC(l2), det = abc1.A * abc2.B - abc2.A * abc1.B;
  if (det == 0) {
    return null;
  } else {
    var candidate = {
      x: (abc2.B * abc1.C - abc1.B * abc2.C) / det,
      y: (abc1.A * abc2.C - abc2.A * abc1.C) / det
    }, l1xmin = Math.min(l1[0].x, l1[1].x), l1xmax = Math.max(l1[0].x, l1[1].x), l1ymin = Math.min(l1[0].y, l1[1].y), l1ymax = Math.max(l1[0].y, l1[1].y), l2xmin = Math.min(l2[0].x, l2[1].x), l2xmax = Math.max(l2[0].x, l2[1].x), l2ymin = Math.min(l2[0].y, l2[1].y), l2ymax = Math.max(l2[0].y, l2[1].y);
    if (candidate.x >= l1xmin && candidate.x <= l1xmax && candidate.y >= l1ymin && candidate.y <= l1ymax && candidate.x >= l2xmin && candidate.x <= l2xmax && candidate.y >= l2ymin && candidate.y <= l2ymax) {
      return candidate;
    } else {
      return null;
    }
  }
}
function lineRectangleIntersection(line, r) {
  var out = [], rectangleLines = [[{
    x: r.x,
    y: r.y
  }, {
    x: r.x + r.w,
    y: r.y
  }], [{
    x: r.x + r.w,
    y: r.y
  }, {
    x: r.x + r.w,
    y: r.y + r.h
  }], [{
    x: r.x,
    y: r.y
  }, {
    x: r.x,
    y: r.y + r.h
  }], [{
    x: r.x,
    y: r.y + r.h
  }, {
    x: r.x + r.w,
    y: r.y + r.h
  }]];
  forEach(rectangleLines, function(rLine) {
    var intersection = lineIntersection(line, rLine);
    if (intersection != null) {
      out.push(intersection);
    }
  });
  return out;
}
function encloses(r1, r2, allowSharedEdges) {
  var x1 = r1.x, x2 = r1.x + r1.w, y1 = r1.y, y2 = r1.y + r1.h, a1 = r2.x, a2 = r2.x + r2.w, b1 = r2.y, b2 = r2.y + r2.h, c = function c2(v1, v2, v3, v4) {
    return allowSharedEdges ? v1 <= v2 && v3 >= v4 : v1 < v2 && v3 > v4;
  };
  return c(x1, a1, x2, a2) && c(y1, b1, y2, b2);
}
function pointOnLine(fromPoint, toPoint, distance) {
  var m = gradient(fromPoint, toPoint), s = quadrant(fromPoint, toPoint), segmentMultiplier = distance > 0 ? segmentMultipliers[s] : inverseSegmentMultipliers[s], theta2 = Math.atan(m), y = Math.abs(distance * Math.sin(theta2)) * segmentMultiplier[1], x = Math.abs(distance * Math.cos(theta2)) * segmentMultiplier[0];
  return {
    x: fromPoint.x + x,
    y: fromPoint.y + y
  };
}
function perpendicularLineTo(fromPoint, toPoint, length) {
  var m = gradient(fromPoint, toPoint), theta2 = Math.atan(-1 / m), y = length / 2 * Math.sin(theta2), x = length / 2 * Math.cos(theta2);
  return [{
    x: toPoint.x + x,
    y: toPoint.y + y
  }, {
    x: toPoint.x - x,
    y: toPoint.y - y
  }];
}
function snapToGrid(pos, grid, thresholdX, thresholdY) {
  thresholdX = thresholdX == null ? grid.thresholdX == null ? grid.w / 2 : grid.thresholdX : thresholdX;
  thresholdY = thresholdY == null ? grid.thresholdY == null ? grid.h / 2 : grid.thresholdY : thresholdY;
  var _dx = Math.floor(pos.x / grid.w), _dxl = grid.w * _dx, _dxt = _dxl + grid.w, x = Math.abs(pos.x - _dxl) <= thresholdX ? _dxl : Math.abs(_dxt - pos.x) <= thresholdX ? _dxt : pos.x;
  var _dy = Math.floor(pos.y / grid.h), _dyl = grid.h * _dy, _dyt = _dyl + grid.h, y = Math.abs(pos.y - _dyl) <= thresholdY ? _dyl : Math.abs(_dyt - pos.y) <= thresholdY ? _dyt : pos.y;
  return {
    x,
    y
  };
}
var jsplumb_util_es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventGenerator,
  OptimisticEventGenerator,
  TWO_PI,
  add,
  addToDictionary,
  addToList,
  addWithFunction,
  arraysEqual,
  clone,
  each,
  encloses,
  extend,
  fastTrim,
  filterList,
  filterNull,
  findAllWithFunction,
  findWithFunction,
  forEach,
  fromArray,
  functionChain,
  getAllWithFunction,
  getFromSetWithFunction,
  getWithFunction,
  getsert,
  gradient,
  insertSorted,
  intersects,
  isAssignableFrom,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNamedFunction,
  isNumber,
  isObject,
  isString,
  lineIntersection,
  lineLength,
  lineRectangleIntersection,
  log,
  logEnabled,
  map,
  merge,
  normal,
  objectsEqual,
  perpendicularLineTo,
  pointOnLine,
  populate,
  quadrant,
  remove,
  removeWithFunction,
  replace,
  rotateAnchorOrientation,
  rotatePoint,
  setToArray,
  snapToGrid,
  subtract,
  suggest,
  theta,
  uuid,
  wrap
}, Symbol.toStringTag, { value: "Module" }));
export { EventGenerator, SvelteComponent, TWO_PI, addToDictionary, add_flush_callback, add_render_callback, add_resize_listener, afterUpdate, append_hydration, assign, attr, bind, binding_callbacks, check_outros, children, claim_component, claim_element, claim_space, claim_text, clone, create_component, create_slot, destroy_component, destroy_each, detach, each, element, empty, extend, fastTrim, filterList, findWithFunction, forEach, fromArray, functionChain, getAllWithFunction, getContext, getFromSetWithFunction, getWithFunction, get_all_dirty_from_scope, get_slot_changes, get_spread_object, get_spread_update, getsert, gradient, group_outros, init, insertSorted, insert_hydration, intersects, isAssignableFrom, isFunction, isNumber, isObject, isString, jsplumb_util_es, lineLength, listen, log, map, merge, mount_component, noop, normal, onMount, perpendicularLineTo, pointOnLine, populate, quadrant, removeWithFunction, rotatePoint, safe_not_equal, setContext, setToArray, set_data, set_style, snapToGrid, space, suggest, text, theta, tick, transition_in, transition_out, update_slot_base, uuid, wrap, writable };
//# sourceMappingURL=vendor-e8797a8c.js.map
