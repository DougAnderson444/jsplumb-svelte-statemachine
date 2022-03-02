var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { SvelteComponent, init, safe_not_equal, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, element, space, claim_element, children, claim_space, detach, attr, set_style, insert_hydration, append_hydration, listen, group_outros, check_outros, uuid, getContext, onMount, create_slot, text, claim_text, binding_callbacks, empty, bind, create_component, claim_component, mount_component, add_flush_callback, destroy_component, set_data, destroy_each, add_render_callback, add_resize_listener, setContext, noop } from "../chunks/vendor-e8797a8c.js";
import { __vitePreload } from "../chunks/preload-helper-dafa6aee.js";
var app = "";
const key = Symbol();
var Group_svelte_svelte_type_style_lang = "";
const get_default_slot_changes = (dirty) => ({ addToGroup: dirty & 128 });
const get_default_slot_context = (ctx) => ({ addToGroup: ctx[7] });
function create_if_block$2(ctx) {
  let current;
  const default_slot_template = ctx[10].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[9], get_default_slot_context);
  const default_slot_or_fallback = default_slot || fallback_block$1();
  return {
    c() {
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
    },
    l(nodes) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(nodes);
    },
    m(target, anchor) {
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 640)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[9], !current ? get_all_dirty_from_scope(ctx2[9]) : get_slot_changes(default_slot_template, ctx2[9], dirty, get_default_slot_changes), get_default_slot_context);
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
    }
  };
}
function fallback_block$1(ctx) {
  let t;
  return {
    c() {
      t = text("No Group Name");
    },
    l(nodes) {
      t = claim_text(nodes, "No Group Name");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$4(ctx) {
  let div1;
  let t;
  let div0;
  let current;
  let mounted;
  let dispose;
  let if_block = ctx[7] && create_if_block$2(ctx);
  return {
    c() {
      div1 = element("div");
      if (if_block)
        if_block.c();
      t = space();
      div0 = element("div");
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      if (if_block)
        if_block.l(div1_nodes);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "svlt-grid-resizer svelte-1w7yfw0");
      attr(div1, "class", "w svelte-1w7yfw0");
      set_style(div1, "left", ctx[3] + "px");
      set_style(div1, "top", ctx[4] + "px");
      set_style(div1, "width", (ctx[6] ? ctx[5].width : ctx[1]) + "px");
      set_style(div1, "height", (ctx[6] ? ctx[5].height : ctx[2]) + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      if (if_block)
        if_block.m(div1, null);
      append_hydration(div1, t);
      append_hydration(div1, div0);
      ctx[11](div1);
      current = true;
      if (!mounted) {
        dispose = listen(div0, "pointerdown", ctx[8]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[7]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 128) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & 8) {
        set_style(div1, "left", ctx2[3] + "px");
      }
      if (!current || dirty & 16) {
        set_style(div1, "top", ctx2[4] + "px");
      }
      if (!current || dirty & 98) {
        set_style(div1, "width", (ctx2[6] ? ctx2[5].width : ctx2[1]) + "px");
      }
      if (!current || dirty & 100) {
        set_style(div1, "height", (ctx2[6] ? ctx2[5].height : ctx2[2]) + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block)
        if_block.d();
      ctx[11](null);
      mounted = false;
      dispose();
    }
  };
}
function instance_1$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { left = 0 } = $$props;
  let { top = 0 } = $$props;
  let { box = null } = $$props;
  let { width = 400 } = $$props;
  let { height = 400 } = $$props;
  let newSize = { width, height };
  let initSize = { width: 0, height: 0 };
  let resizeInitPos = { x: 0, y: 0 };
  let active = false;
  let instance2;
  let addToGroup;
  let groupID = uuid();
  const context = getContext(key);
  onMount(() => {
    instance2 = context.getInstance();
    instance2.manage(box);
    instance2.addGroup({
      el: box,
      id: groupID,
      orphan: true,
      dragOptions: { filter: ".svlt-grid-resizer" },
      filter: ".svlt-grid-resizer"
    });
    $$invalidate(7, addToGroup = (nodeElement) => {
      instance2.addToGroup(groupID, nodeElement);
    });
  });
  const resizePointerDown = (e) => {
    e.stopPropagation();
    const { pageX, pageY } = e;
    resizeInitPos = { x: pageX, y: pageY };
    initSize = { width, height };
    $$invalidate(5, newSize = { width, height });
    $$invalidate(6, active = true);
    window.addEventListener("pointermove", resizePointerMove);
    window.addEventListener("pointerup", resizePointerUp);
  };
  const resizePointerMove = ({ pageX, pageY }) => {
    $$invalidate(5, newSize.width = initSize.width + pageX - resizeInitPos.x, newSize);
    $$invalidate(5, newSize.height = initSize.height + pageY - resizeInitPos.y, newSize);
    console.log({ pageX, pageY });
  };
  const resizePointerUp = (e) => {
    e.stopPropagation();
    $$invalidate(1, width = newSize.width);
    $$invalidate(2, height = newSize.height);
    $$invalidate(6, active = false);
    window.removeEventListener("pointermove", resizePointerMove);
    window.removeEventListener("pointerup", resizePointerUp);
  };
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      box = $$value;
      $$invalidate(0, box);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("left" in $$props2)
      $$invalidate(3, left = $$props2.left);
    if ("top" in $$props2)
      $$invalidate(4, top = $$props2.top);
    if ("box" in $$props2)
      $$invalidate(0, box = $$props2.box);
    if ("width" in $$props2)
      $$invalidate(1, width = $$props2.width);
    if ("height" in $$props2)
      $$invalidate(2, height = $$props2.height);
    if ("$$scope" in $$props2)
      $$invalidate(9, $$scope = $$props2.$$scope);
  };
  return [
    box,
    width,
    height,
    left,
    top,
    newSize,
    active,
    addToGroup,
    resizePointerDown,
    $$scope,
    slots,
    div1_binding
  ];
}
class Group extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$1, create_fragment$4, safe_not_equal, {
      left: 3,
      top: 4,
      box: 0,
      width: 1,
      height: 2
    });
  }
}
var Box_svelte_svelte_type_style_lang = "";
function fallback_block(ctx) {
  let t;
  return {
    c() {
      t = text("No Name");
    },
    l(nodes) {
      t = claim_text(nodes, "No Name");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$3(ctx) {
  let div1;
  let t;
  let div0;
  let current;
  const default_slot_template = ctx[6].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[5], null);
  const default_slot_or_fallback = default_slot || fallback_block();
  return {
    c() {
      div1 = element("div");
      if (default_slot_or_fallback)
        default_slot_or_fallback.c();
      t = space();
      div0 = element("div");
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true, style: true });
      var div1_nodes = children(div1);
      if (default_slot_or_fallback)
        default_slot_or_fallback.l(div1_nodes);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true, action: true });
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "endpoint svelte-7spogs");
      attr(div0, "action", ctx[1]);
      attr(div1, "class", "w svelte-7spogs");
      set_style(div1, "left", ctx[2] + "px");
      set_style(div1, "top", ctx[3] + "px");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      if (default_slot_or_fallback) {
        default_slot_or_fallback.m(div1, null);
      }
      append_hydration(div1, t);
      append_hydration(div1, div0);
      ctx[7](div0);
      ctx[8](div1);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 32)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[5], !current ? get_all_dirty_from_scope(ctx2[5]) : get_slot_changes(default_slot_template, ctx2[5], dirty, null), null);
        }
      }
      if (!current || dirty & 2) {
        attr(div0, "action", ctx2[1]);
      }
      if (!current || dirty & 4) {
        set_style(div1, "left", ctx2[2] + "px");
      }
      if (!current || dirty & 8) {
        set_style(div1, "top", ctx2[3] + "px");
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot_or_fallback, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot_or_fallback, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (default_slot_or_fallback)
        default_slot_or_fallback.d(detaching);
      ctx[7](null);
      ctx[8](null);
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { action = null } = $$props;
  let { left } = $$props;
  let { top } = $$props;
  let { box = null } = $$props;
  let endpoint;
  let instance2;
  const context = getContext(key);
  onMount(() => {
    instance2 = context.getInstance();
    instance2.manage(box);
    instance2.addSourceSelector(".endpoint", {
      edgeType: "basic",
      extract: { action: "the-action" },
      allowLoopback: false,
      maxConnections: 2,
      onMaxConnections(info, e) {
        alert("Maximum connections (" + info.maxConnections + ") reached");
      }
    });
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      endpoint = $$value;
      $$invalidate(4, endpoint);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      box = $$value;
      $$invalidate(0, box);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("action" in $$props2)
      $$invalidate(1, action = $$props2.action);
    if ("left" in $$props2)
      $$invalidate(2, left = $$props2.left);
    if ("top" in $$props2)
      $$invalidate(3, top = $$props2.top);
    if ("box" in $$props2)
      $$invalidate(0, box = $$props2.box);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [box, action, left, top, endpoint, $$scope, slots, div0_binding, div1_binding];
}
class Box extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1, create_fragment$3, safe_not_equal, { action: 1, left: 2, top: 3, box: 0 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i];
  child_ctx[11] = i;
  return child_ctx;
}
function create_if_block$1(ctx) {
  let t;
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const default_slot_template = ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx, ctx[6], null);
  const if_block_creators = [create_if_block_1, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    var _a, _b;
    if ((_b = (_a = ctx2[1]) == null ? void 0 : _a.children) == null ? void 0 : _b.length)
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if (default_slot)
        default_slot.c();
      t = space();
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (default_slot)
        default_slot.l(nodes);
      t = claim_space(nodes);
      if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      insert_hydration(target, t, anchor);
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & 64)) {
          update_slot_base(default_slot, default_slot_template, ctx2, ctx2[6], !current ? get_all_dirty_from_scope(ctx2[6]) : get_slot_changes(default_slot_template, ctx2[6], dirty, null), null);
        }
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t);
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let updating_box;
  let switch_instance_anchor;
  let current;
  function switch_instance_box_binding(value) {
    ctx[5](value);
  }
  var switch_value = Box;
  function switch_props(ctx2) {
    let switch_instance_props = {
      left: ctx2[1].left,
      top: ctx2[1].top,
      action: ctx2[1].action,
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx: ctx2 }
    };
    if (ctx2[0] !== void 0) {
      switch_instance_props.box = ctx2[0];
    }
    return { props: switch_instance_props };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
    binding_callbacks.push(() => bind(switch_instance, "box", switch_instance_box_binding));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 2)
        switch_instance_changes.left = ctx2[1].left;
      if (dirty & 2)
        switch_instance_changes.top = ctx2[1].top;
      if (dirty & 2)
        switch_instance_changes.action = ctx2[1].action;
      if (dirty & 66) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_box && dirty & 1) {
        updating_box = true;
        switch_instance_changes.box = ctx2[0];
        add_flush_callback(() => updating_box = false);
      }
      if (switch_value !== (switch_value = Box)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          binding_callbacks.push(() => bind(switch_instance, "box", switch_instance_box_binding));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let group;
  let updating_box;
  let current;
  function group_box_binding(value) {
    ctx[4](value);
  }
  let group_props = {
    $$slots: {
      default: [
        create_default_slot,
        ({ addToGroup }) => ({ 8: addToGroup }),
        ({ addToGroup }) => addToGroup ? 256 : 0
      ]
    },
    $$scope: { ctx }
  };
  if (ctx[0] !== void 0) {
    group_props.box = ctx[0];
  }
  group = new Group({ props: group_props });
  binding_callbacks.push(() => bind(group, "box", group_box_binding));
  return {
    c() {
      create_component(group.$$.fragment);
    },
    l(nodes) {
      claim_component(group.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(group, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const group_changes = {};
      if (dirty & 322) {
        group_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_box && dirty & 1) {
        updating_box = true;
        group_changes.box = ctx2[0];
        add_flush_callback(() => updating_box = false);
      }
      group.$set(group_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(group.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(group.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(group, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let t_value = ctx[1].title + "";
  let t;
  return {
    c() {
      t = text(t_value);
    },
    l(nodes) {
      t = claim_text(nodes, t_value);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t_value !== (t_value = ctx2[1].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_default_slot_1(ctx) {
  let t0;
  let t1;
  let t2;
  let t3_value = ctx[9].title + "";
  let t3;
  let t4;
  return {
    c() {
      t0 = text("Child ");
      t1 = text(ctx[11]);
      t2 = text(" - ");
      t3 = text(t3_value);
      t4 = space();
    },
    l(nodes) {
      t0 = claim_text(nodes, "Child ");
      t1 = claim_text(nodes, ctx[11]);
      t2 = claim_text(nodes, " - ");
      t3 = claim_text(nodes, t3_value);
      t4 = claim_space(nodes);
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, t4, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t3_value !== (t3_value = ctx2[9].title + ""))
        set_data(t3, t3_value);
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(t4);
    }
  };
}
function create_each_block(ctx) {
  let nodes;
  let current;
  nodes = new Nodes({
    props: {
      node: ctx[9],
      addNodeElToParent: ctx[8],
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(nodes.$$.fragment);
    },
    l(nodes$1) {
      claim_component(nodes.$$.fragment, nodes$1);
    },
    m(target, anchor) {
      mount_component(nodes, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const nodes_changes = {};
      if (dirty & 2)
        nodes_changes.node = ctx2[9];
      if (dirty & 256)
        nodes_changes.addNodeElToParent = ctx2[8];
      if (dirty & 66) {
        nodes_changes.$$scope = { dirty, ctx: ctx2 };
      }
      nodes.$set(nodes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(nodes.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(nodes.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(nodes, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let t0_value = ctx[1].title + "";
  let t0;
  let t1;
  let t2_value = ctx[1].children.length + "";
  let t2;
  let t3;
  let br;
  let t4;
  let each_1_anchor;
  let current;
  let each_value = ctx[1].children;
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      t0 = text(t0_value);
      t1 = text(" has ");
      t2 = text(t2_value);
      t3 = text(" children");
      br = element("br");
      t4 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      t0 = claim_text(nodes, t0_value);
      t1 = claim_text(nodes, " has ");
      t2 = claim_text(nodes, t2_value);
      t3 = claim_text(nodes, " children");
      br = claim_element(nodes, "BR", {});
      t4 = claim_space(nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      insert_hydration(target, t0, anchor);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, br, anchor);
      insert_hydration(target, t4, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty & 2) && t0_value !== (t0_value = ctx2[1].title + ""))
        set_data(t0, t0_value);
      if ((!current || dirty & 2) && t2_value !== (t2_value = ctx2[1].children.length + ""))
        set_data(t2, t2_value);
      if (dirty & 258) {
        each_value = ctx2[1].children;
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(t0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(br);
      if (detaching)
        detach(t4);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = ctx[1] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { nodeElement = null } = $$props;
  let { node } = $$props;
  let { addNodeElToParent = null } = $$props;
  console.log({ node });
  function group_box_binding(value) {
    nodeElement = value;
    $$invalidate(0, nodeElement);
  }
  function switch_instance_box_binding(value) {
    nodeElement = value;
    $$invalidate(0, nodeElement);
  }
  $$self.$$set = ($$props2) => {
    if ("nodeElement" in $$props2)
      $$invalidate(0, nodeElement = $$props2.nodeElement);
    if ("node" in $$props2)
      $$invalidate(1, node = $$props2.node);
    if ("addNodeElToParent" in $$props2)
      $$invalidate(2, addNodeElToParent = $$props2.addNodeElToParent);
    if ("$$scope" in $$props2)
      $$invalidate(6, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 5) {
      if (nodeElement && addNodeElToParent)
        addNodeElToParent(nodeElement);
    }
  };
  return [
    nodeElement,
    node,
    addNodeElToParent,
    slots,
    group_box_binding,
    switch_instance_box_binding,
    $$scope
  ];
}
class Nodes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
      nodeElement: 0,
      node: 1,
      addNodeElToParent: 2
    });
  }
}
var App_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let nodes;
  let current;
  nodes = new Nodes({ props: { node: ctx[1] } });
  return {
    c() {
      create_component(nodes.$$.fragment);
    },
    l(nodes$1) {
      claim_component(nodes.$$.fragment, nodes$1);
    },
    m(target, anchor) {
      mount_component(nodes, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const nodes_changes = {};
      if (dirty & 2)
        nodes_changes.node = ctx2[1];
      nodes.$set(nodes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(nodes.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(nodes.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(nodes, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let section;
  let div0;
  let div0_resize_listener;
  let t0;
  let div1;
  let h4;
  let t1;
  let t2;
  let p0;
  let t3;
  let t4;
  let p1;
  let t5;
  let t6;
  let p2;
  let t7;
  let t8;
  let p3;
  let t9;
  let t10;
  let p4;
  let t11;
  let current;
  let if_block = ctx[3] && ctx[1].children.length && create_if_block(ctx);
  return {
    c() {
      section = element("section");
      div0 = element("div");
      if (if_block)
        if_block.c();
      t0 = space();
      div1 = element("div");
      h4 = element("h4");
      t1 = text("STATE MACHINE");
      t2 = space();
      p0 = element("p");
      t3 = text("Nodes are connected with the StateMachine connector.");
      t4 = space();
      p1 = element("p");
      t5 = text("Endpoints are located with 'Continuous' anchors, which are anchors whose location is\r\n			calculated based on the location of all other connected elements, and which guarantee a unique\r\n			endpoint per connection.");
      t6 = space();
      p2 = element("p");
      t7 = text("Click and drag new Connections from the orange div in each element; the main elements in the\r\n			UI are configured to be Connection targets. You can drag from one of these divs onto its\r\n			parent element to create a 'loopback' connection. Each element supports up to 5 Connections.");
      t8 = space();
      p3 = element("p");
      t9 = text("Click on a Connection to delete it.");
      t10 = space();
      p4 = element("p");
      t11 = text("Double click on whitespace to add a new node");
      this.h();
    },
    l(nodes) {
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      div0 = claim_element(section_nodes, "DIV", { class: true, id: true });
      var div0_nodes = children(div0);
      if (if_block)
        if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      t0 = claim_space(section_nodes);
      div1 = claim_element(section_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      h4 = claim_element(div1_nodes, "H4", {});
      var h4_nodes = children(h4);
      t1 = claim_text(h4_nodes, "STATE MACHINE");
      h4_nodes.forEach(detach);
      t2 = claim_space(div1_nodes);
      p0 = claim_element(div1_nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "Nodes are connected with the StateMachine connector.");
      p0_nodes.forEach(detach);
      t4 = claim_space(div1_nodes);
      p1 = claim_element(div1_nodes, "P", {});
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, "Endpoints are located with 'Continuous' anchors, which are anchors whose location is\r\n			calculated based on the location of all other connected elements, and which guarantee a unique\r\n			endpoint per connection.");
      p1_nodes.forEach(detach);
      t6 = claim_space(div1_nodes);
      p2 = claim_element(div1_nodes, "P", {});
      var p2_nodes = children(p2);
      t7 = claim_text(p2_nodes, "Click and drag new Connections from the orange div in each element; the main elements in the\r\n			UI are configured to be Connection targets. You can drag from one of these divs onto its\r\n			parent element to create a 'loopback' connection. Each element supports up to 5 Connections.");
      p2_nodes.forEach(detach);
      t8 = claim_space(div1_nodes);
      p3 = claim_element(div1_nodes, "P", {});
      var p3_nodes = children(p3);
      t9 = claim_text(p3_nodes, "Click on a Connection to delete it.");
      p3_nodes.forEach(detach);
      t10 = claim_space(div1_nodes);
      p4 = claim_element(div1_nodes, "P", {});
      var p4_nodes = children(p4);
      t11 = claim_text(p4_nodes, "Double click on whitespace to add a new node");
      p4_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan canvas svelte-14onxtt");
      attr(div0, "id", "canvas");
      add_render_callback(() => ctx[6].call(div0));
      attr(div1, "class", "description");
      attr(section, "class", "jtk-demo-main demo svelte-14onxtt");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      append_hydration(section, div0);
      if (if_block)
        if_block.m(div0, null);
      ctx[5](div0);
      div0_resize_listener = add_resize_listener(div0, ctx[6].bind(div0));
      append_hydration(section, t0);
      append_hydration(section, div1);
      append_hydration(div1, h4);
      append_hydration(h4, t1);
      append_hydration(div1, t2);
      append_hydration(div1, p0);
      append_hydration(p0, t3);
      append_hydration(div1, t4);
      append_hydration(div1, p1);
      append_hydration(p1, t5);
      append_hydration(div1, t6);
      append_hydration(div1, p2);
      append_hydration(p2, t7);
      append_hydration(div1, t8);
      append_hydration(div1, p3);
      append_hydration(p3, t9);
      append_hydration(div1, t10);
      append_hydration(div1, p4);
      append_hydration(p4, t11);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[3] && ctx2[1].children.length) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 10) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(section);
      if (if_block)
        if_block.d();
      ctx[5](null);
      div0_resize_listener();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let canvas;
  let jsPlumbInstance;
  let offsetHeight, offsetWidth;
  setContext(key, { getInstance: () => jsPlumbInstance });
  let boxes;
  onMount(async () => {
    const { newInstance } = await __vitePreload(() => import("../chunks/jsplumb.browser-ui.es-82a2c62e.js"), true ? ["chunks/jsplumb.browser-ui.es-82a2c62e.js","chunks/jsplumb.core.es-2ecea26b.js","chunks/vendor-e8797a8c.js"] : void 0);
    await __vitePreload(() => import("../chunks/jsplumb.connector-bezier.es-c24f8cad.js"), true ? ["chunks/jsplumb.connector-bezier.es-c24f8cad.js","chunks/vendor-e8797a8c.js","chunks/jsplumb.core.es-2ecea26b.js"] : void 0);
    const { uuid: uuid2 } = await __vitePreload(() => import("../chunks/vendor-e8797a8c.js").then(function(n) {
      return n.jsplumb_util_es;
    }), true ? [] : void 0);
    const { EVENT_CONNECTION } = await __vitePreload(() => import("../chunks/jsplumb.core.es-2ecea26b.js").then(function(n) {
      return n.jsplumb_core_es;
    }), true ? ["chunks/jsplumb.core.es-2ecea26b.js","chunks/vendor-e8797a8c.js"] : void 0);
    $$invalidate(3, jsPlumbInstance = newInstance({
      endpoint: {
        type: "Dot",
        options: {
          radius: 4,
          cssClass: "endpointRound",
          hoverClass: "endpointRoundHover"
        }
      },
      connectionOverlays: [
        {
          type: "Arrow",
          options: {
            location: 0.8,
            id: "arrow",
            length: 16,
            foldback: 0.8
          }
        },
        {
          type: "Label",
          options: {
            label: "Connect!",
            id: "label",
            cssClass: "aLabel"
          }
        }
      ],
      container: canvas,
      dragOptions: { filter: ".svlt-grid-resizer" }
    }));
    jsPlumbInstance.bind(EVENT_CONNECTION, handleConnection);
    function handleConnection(params) {
      console.log("Connection", { params });
      $$invalidate(1, boxes.edges = [
        ...boxes.edges,
        {
          source: params.sourceId,
          target: params.targetId
        }
      ], boxes);
    }
    jsPlumbInstance.registerConnectionType("basic", {
      anchor: "Continuous",
      connector: "StateMachine",
      paintStyle: {
        stroke: "#5c96bc",
        strokeWidth: 2,
        outlineStroke: "transparent",
        outlineWidth: 4
      },
      hoverPaintStyle: { stroke: "#1e8151", strokeWidth: 2 }
    });
    var windows = document.querySelectorAll(".statemachine-demo .w");
    jsPlumbInstance.bind("click", function(c) {
      jsPlumbInstance.deleteConnection(c);
    });
    jsPlumbInstance.bind("connection", function(info) {
      info.connection.getOverlay("label").setLabel(info.connection.id);
    });
    jsPlumbInstance.on(canvas, "dblclick", function(e) {
      newNode(e.offsetX, e.offsetY);
    });
    function newNode(x, y) {
      $$invalidate(1, boxes = __spreadProps(__spreadValues({}, boxes), {
        nodes: [
          ...boxes.nodes,
          {
            name: uuid2(),
            left: x,
            top: y,
            action: "",
            title: uuid2()
          }
        ]
      }));
    }
    jsPlumbInstance.addTargetSelector(".w", {
      anchor: "Continuous",
      allowLoopback: true
    });
    jsPlumbInstance.batch(function() {
      jsPlumbInstance.manageAll(windows);
    });
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(2, canvas);
    });
  }
  function div0_elementresize_handler() {
    offsetHeight = this.offsetHeight;
    offsetWidth = this.offsetWidth;
    $$invalidate(0, offsetHeight);
    $$invalidate(4, offsetWidth);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      if (offsetHeight)
        $$invalidate(1, boxes = {
          edges: [],
          title: "My Boxes",
          children: [
            {
              id: uuid(),
              name: "opened",
              left: offsetHeight / 6,
              top: offsetHeight / 5,
              action: "begin",
              title: "BEGIN",
              edges: ["phone1"],
              group: {},
              children: [
                {
                  id: uuid(),
                  name: "phone2",
                  left: 10,
                  top: 23,
                  action: "begin",
                  title: "PHONE INTERVIEW 2"
                },
                {
                  id: uuid(),
                  name: "inperson",
                  left: offsetHeight / 3,
                  top: offsetHeight / 2,
                  action: "begin",
                  title: "IN PERSON"
                }
              ]
            },
            {
              id: uuid(),
              name: "phone1",
              left: offsetHeight / 5,
              top: offsetHeight / 4,
              action: "begin",
              title: "PHONE INTERVIEW 1"
            },
            {
              id: uuid(),
              name: "rejected",
              left: offsetHeight / 2,
              top: offsetHeight / 4,
              action: "begin",
              title: "REJECTED"
            }
          ]
        });
    }
    if ($$self.$$.dirty & 2) {
      boxes && console.log({ boxes });
    }
  };
  return [
    offsetHeight,
    boxes,
    canvas,
    jsPlumbInstance,
    offsetWidth,
    div0_binding,
    div0_elementresize_handler
  ];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let app2;
  let current;
  app2 = new App({});
  return {
    c() {
      create_component(app2.$$.fragment);
    },
    l(nodes) {
      claim_component(app2.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(app2, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(app2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(app2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(app2, detaching);
    }
  };
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
//# sourceMappingURL=index.svelte-81cb4bf0.js.map
