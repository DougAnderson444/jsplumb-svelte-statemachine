import { SvelteComponent, init, safe_not_equal, create_slot, element, space, claim_element, children, claim_space, detach, attr, set_style, insert_hydration, append_hydration, update_slot_base, get_all_dirty_from_scope, get_slot_changes, transition_in, transition_out, getContext, text, claim_text, binding_callbacks, empty, create_component, claim_component, mount_component, add_flush_callback, group_outros, destroy_component, check_outros, bind, destroy_each, add_render_callback, add_resize_listener, setContext, onMount, set_data, noop } from "../chunks/vendor-43d368f5.js";
import { __vitePreload } from "../chunks/preload-helper-dafa6aee.js";
var app = "";
const key = Symbol();
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
function create_fragment$2(ctx) {
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
      attr(div0, "class", "ep svelte-n0urzy");
      attr(div0, "action", ctx[1]);
      attr(div1, "class", "w svelte-n0urzy");
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
function instance_1$1($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { action } = $$props;
  let { left } = $$props;
  let { top } = $$props;
  let { box = null } = $$props;
  let ep;
  const context = getContext(key);
  const instance = context.getInstance();
  instance.addSourceSelector(".ep", {
    edgeType: "basic",
    extract: { action: "the-action" },
    maxConnections: 2,
    onMaxConnections(info, e) {
      alert("Maximum connections (" + info.maxConnections + ") reached");
    }
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      ep = $$value;
      $$invalidate(4, ep);
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
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      if (box)
        instance.manage(box);
    }
  };
  return [box, action, left, top, ep, $$scope, slots, div0_binding, div1_binding];
}
class Box extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1$1, create_fragment$2, safe_not_equal, { action: 1, left: 2, top: 3, box: 0 });
  }
}
var App_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  child_ctx[16] = list;
  child_ctx[17] = i;
  return child_ctx;
}
function create_if_block(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ctx[4];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 16) {
        each_value = ctx2[4];
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
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_default_slot(ctx) {
  let t_value = ctx[15].title + "";
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
      if (dirty & 16 && t_value !== (t_value = ctx2[15].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block(ctx) {
  let switch_instance;
  let updating_box;
  let switch_instance_anchor;
  let current;
  function switch_instance_box_binding(value) {
    ctx[5](value, ctx[15]);
  }
  var switch_value = Box;
  function switch_props(ctx2) {
    let switch_instance_props = {
      left: ctx2[15].left,
      top: ctx2[15].top,
      action: ctx2[15].action,
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: ctx2 }
    };
    if (ctx2[4][ctx2[15].name] !== void 0) {
      switch_instance_props.box = ctx2[4][ctx2[15].name];
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
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const switch_instance_changes = {};
      if (dirty & 16)
        switch_instance_changes.left = ctx[15].left;
      if (dirty & 16)
        switch_instance_changes.top = ctx[15].top;
      if (dirty & 16)
        switch_instance_changes.action = ctx[15].action;
      if (dirty & 262160) {
        switch_instance_changes.$$scope = { dirty, ctx };
      }
      if (!updating_box && dirty & 16) {
        updating_box = true;
        switch_instance_changes.box = ctx[4][ctx[15].name];
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
          switch_instance = new switch_value(switch_props(ctx));
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
  let if_block = ctx[2] && ctx[4].length && create_if_block(ctx);
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
      attr(div0, "class", "jtk-demo-canvas canvas-wide statemachine-demo jtk-surface jtk-surface-nopan canvas svelte-11tuab");
      attr(div0, "id", "canvas");
      add_render_callback(() => ctx[7].call(div0));
      attr(div1, "class", "description");
      attr(section, "class", "jtk-demo-main demo svelte-11tuab");
    },
    m(target, anchor) {
      insert_hydration(target, section, anchor);
      append_hydration(section, div0);
      if (if_block)
        if_block.m(div0, null);
      ctx[6](div0);
      div0_resize_listener = add_resize_listener(div0, ctx[7].bind(div0));
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
      if (ctx2[2] && ctx2[4].length) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 20) {
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
      ctx[6](null);
      div0_resize_listener();
    }
  };
}
function instance_1($$self, $$props, $$invalidate) {
  let canvas;
  let instance;
  let opened, phone1, phone2, inperson, rejected;
  let offsetHeight, offsetWidth;
  setContext(key, { getInstance: () => instance });
  let boxes;
  onMount(async () => {
    const { newInstance } = await __vitePreload(() => import("../chunks/jsplumb.browser-ui.es-276086c0.js"), true ? ["chunks/jsplumb.browser-ui.es-276086c0.js","chunks/jsplumb.core.es-0ce3d9c6.js","chunks/jsplumb.util.es-fcf8a180.js"] : void 0);
    await __vitePreload(() => import("../chunks/jsplumb.connector-bezier.es-5cf1637c.js"), true ? ["chunks/jsplumb.connector-bezier.es-5cf1637c.js","chunks/jsplumb.util.es-fcf8a180.js","chunks/jsplumb.core.es-0ce3d9c6.js"] : void 0);
    const { uuid } = await __vitePreload(() => import("../chunks/jsplumb.util.es-fcf8a180.js"), true ? [] : void 0);
    $$invalidate(2, instance = newInstance({
      endpoint: { type: "Dot", options: { radius: 2 } },
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
      container: canvas
    }));
    instance.registerConnectionType("basic", {
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
    instance.bind("click", function(c) {
      instance.deleteConnection(c);
    });
    instance.bind("connection", function(info) {
      info.connection.getOverlay("label").setLabel(info.connection.id);
    });
    instance.on(canvas, "dblclick", function(e) {
      newNode(e.offsetX, e.offsetY);
    });
    function newNode(x, y) {
      $$invalidate(4, boxes = [
        ...boxes,
        {
          name: uuid(),
          left: x,
          top: y,
          action: "",
          title: uuid()
        }
      ]);
    }
    instance.addTargetSelector(".w", {
      anchor: "Continuous",
      allowLoopback: true
    });
    instance.batch(function() {
      instance.manageAll(windows);
      instance.connect({
        source: opened,
        target: phone1,
        type: "basic"
      });
      instance.connect({
        source: phone1,
        target: phone1,
        type: "basic"
      });
      instance.connect({
        source: phone1,
        target: inperson,
        type: "basic"
      });
      instance.connect({
        source: phone2,
        target: rejected,
        type: "basic"
      });
    });
  });
  function switch_instance_box_binding(value, box) {
    if ($$self.$$.not_equal(boxes[box.name], value)) {
      boxes[box.name] = value;
      $$invalidate(4, boxes), $$invalidate(0, offsetHeight);
    }
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(1, canvas);
    });
  }
  function div0_elementresize_handler() {
    offsetHeight = this.offsetHeight;
    offsetWidth = this.offsetWidth;
    $$invalidate(0, offsetHeight);
    $$invalidate(3, offsetWidth);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 1) {
      if (offsetHeight)
        $$invalidate(4, boxes = [
          {
            name: "opened",
            left: offsetHeight / 6,
            top: offsetHeight / 5,
            action: "begin",
            title: "BEGIN"
          },
          {
            name: "phone1",
            left: offsetHeight / 5,
            top: offsetHeight / 4,
            action: "begin",
            title: "PHONE INTERVIEW 1"
          },
          {
            name: "phone2",
            left: offsetHeight / 4,
            top: offsetHeight / 3,
            action: "begin",
            title: "PHONE INTERVIEW 2"
          },
          {
            name: "inperson",
            left: offsetHeight / 3,
            top: offsetHeight / 2,
            action: "begin",
            title: "IN PERSON"
          },
          {
            name: "rejected",
            left: offsetHeight / 2,
            top: offsetHeight / 4,
            action: "begin",
            title: "REJECTED"
          }
        ]);
    }
  };
  return [
    offsetHeight,
    canvas,
    instance,
    offsetWidth,
    boxes,
    switch_instance_box_binding,
    div0_binding,
    div0_elementresize_handler
  ];
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance_1, create_fragment$1, safe_not_equal, {});
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
//# sourceMappingURL=index.svelte-7ef06f44.js.map
