import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, B as Button_1, D as Dialog, v as validate_slots, L as Label, C as Content, f as space, g as element, t as text, h as create_component, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, n as claim_text, o as claim_component, p as add_location, r as attr_dev, u as insert_dev, w as append_dev, x as mount_component, y as _slicedToArray, z as transition_in, A as transition_out, E as destroy_component, F as binding_callbacks, G as set_style } from './client.5830b9dc.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/index.svelte"; // (42:58) <Label>

function create_default_slot_3(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("Contact me");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "Contact me");
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(42:58) <Label>",
    ctx: ctx
  });
  return block;
} // (42:2) <Button variant="raised" on:click={()=>{dialog.open()}}>


function create_default_slot_2(ctx) {
  var current;
  var label = new Label({
    props: {
      $$slots: {
        default: [create_default_slot_3]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(label.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(label.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(label, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var label_changes = {};

      if (dirty &
      /*$$scope*/
      8) {
        label_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      label.$set(label_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(label.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(label.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(label, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(42:2) <Button variant=\\\"raised\\\" on:click={()=>{dialog.open()}}>",
    ctx: ctx
  });
  return block;
} // (46:2) <Content id="dialog-content">


function create_default_slot_1(ctx) {
  var div;
  var p0;
  var t0;
  var t1;
  var p1;
  var b;
  var t2;
  var block = {
    c: function create() {
      div = element("div");
      p0 = element("p");
      t0 = text("Send me an email at");
      t1 = space();
      p1 = element("p");
      b = element("b");
      t2 = text("diegosandmg@gmail.com");
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        style: true
      });
      var div_nodes = children(div);
      p0 = claim_element(div_nodes, "P", {});
      var p0_nodes = children(p0);
      t0 = claim_text(p0_nodes, "Send me an email at");
      p0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      p1 = claim_element(div_nodes, "P", {});
      var p1_nodes = children(p1);
      b = claim_element(p1_nodes, "B", {});
      var b_nodes = children(b);
      t2 = claim_text(b_nodes, "diegosandmg@gmail.com");
      b_nodes.forEach(detach_dev);
      p1_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      add_location(p0, file, 47, 3, 1048);
      add_location(b, file, 48, 6, 1081);
      add_location(p1, file, 48, 3, 1078);
      set_style(div, "padding", "10px");
      set_style(div, "text-align", "center");
      set_style(div, "color", "white");
      add_location(div, file, 46, 2, 983);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, p0);
      append_dev(p0, t0);
      append_dev(div, t1);
      append_dev(div, p1);
      append_dev(p1, b);
      append_dev(b, t2);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(46:2) <Content id=\\\"dialog-content\\\">",
    ctx: ctx
  });
  return block;
} // (45:1) <Dialog bind:this={dialog}>


function create_default_slot(ctx) {
  var current;
  var content = new Content({
    props: {
      id: "dialog-content",
      $$slots: {
        default: [create_default_slot_1]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(content.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(content.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var content_changes = {};

      if (dirty &
      /*$$scope*/
      8) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(45:1) <Dialog bind:this={dialog}>",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var div2;
  var h1;
  var t1;
  var t2;
  var p0;
  var t3;
  var t4;
  var div0;
  var img;
  var img_src_value;
  var t5;
  var p1;
  var t6;
  var t7;
  var p2;
  var t8;
  var t9;
  var div1;
  var t10;
  var current;
  var button = new Button_1({
    props: {
      variant: "raised",
      $$slots: {
        default: [create_default_slot_2]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  button.$on("click",
  /*click_handler*/
  ctx[1]);
  var dialog_1_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx: ctx
    }
  };
  var dialog_1 = new Dialog({
    props: dialog_1_props,
    $$inline: true
  });
  /*dialog_1_binding*/

  ctx[2](dialog_1);
  var block = {
    c: function create() {
      t0 = space();
      div2 = element("div");
      h1 = element("h1");
      t1 = text("Hi I'm Diego !");
      t2 = space();
      p0 = element("p");
      t3 = text("A computer science student from 🇻🇪, that likes to make webpages with the \n\t\tlatest technologies.");
      t4 = space();
      div0 = element("div");
      img = element("img");
      t5 = space();
      p1 = element("p");
      t6 = text("Diego develops the two ends of the web, the user interface “front end” and the \n\t\tbussiness server logic “back end”.");
      t7 = space();
      p2 = element("p");
      t8 = text("If you are interested to work me with me, you can");
      t9 = space();
      div1 = element("div");
      create_component(button.$$.fragment);
      t10 = space();
      create_component(dialog_1.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-16qiiz2\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div2 = claim_element(nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      h1 = claim_element(div2_nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Hi I'm Diego !");
      h1_nodes.forEach(detach_dev);
      t2 = claim_space(div2_nodes);
      p0 = claim_element(div2_nodes, "P", {});
      var p0_nodes = children(p0);
      t3 = claim_text(p0_nodes, "A computer science student from 🇻🇪, that likes to make webpages with the \n\t\tlatest technologies.");
      p0_nodes.forEach(detach_dev);
      t4 = claim_space(div2_nodes);
      div0 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);
      img = claim_element(div0_nodes, "IMG", {
        alt: true,
        src: true,
        class: true
      });
      div0_nodes.forEach(detach_dev);
      t5 = claim_space(div2_nodes);
      p1 = claim_element(div2_nodes, "P", {});
      var p1_nodes = children(p1);
      t6 = claim_text(p1_nodes, "Diego develops the two ends of the web, the user interface “front end” and the \n\t\tbussiness server logic “back end”.");
      p1_nodes.forEach(detach_dev);
      t7 = claim_space(div2_nodes);
      p2 = claim_element(div2_nodes, "P", {});
      var p2_nodes = children(p2);
      t8 = claim_text(p2_nodes, "If you are interested to work me with me, you can");
      p2_nodes.forEach(detach_dev);
      t9 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);
      claim_component(button.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach_dev);
      t10 = claim_space(div2_nodes);
      claim_component(dialog_1.$$.fragment, div2_nodes);
      div2_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Diego Sánchez";
      add_location(h1, file, 24, 1, 375);
      add_location(p0, file, 25, 1, 400);
      attr_dev(img, "alt", "Tech stack");
      if (img.src !== (img_src_value = "Images/TechStack.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "class", "svelte-180208v");
      add_location(img, file, 31, 2, 542);
      attr_dev(div0, "class", "center-block");
      add_location(div0, file, 30, 1, 513);
      add_location(p1, file, 34, 1, 602);
      add_location(p2, file, 38, 1, 732);
      attr_dev(div1, "class", "center-block");
      add_location(div1, file, 40, 1, 791);
      attr_dev(div2, "class", "center-absolute align-text svelte-180208v");
      add_location(div2, file, 22, 0, 332);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div2, anchor);
      append_dev(div2, h1);
      append_dev(h1, t1);
      append_dev(div2, t2);
      append_dev(div2, p0);
      append_dev(p0, t3);
      append_dev(div2, t4);
      append_dev(div2, div0);
      append_dev(div0, img);
      append_dev(div2, t5);
      append_dev(div2, p1);
      append_dev(p1, t6);
      append_dev(div2, t7);
      append_dev(div2, p2);
      append_dev(p2, t8);
      append_dev(div2, t9);
      append_dev(div2, div1);
      mount_component(button, div1, null);
      append_dev(div2, t10);
      mount_component(dialog_1, div2, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var button_changes = {};

      if (dirty &
      /*$$scope*/
      8) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
      var dialog_1_changes = {};

      if (dirty &
      /*$$scope*/
      8) {
        dialog_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      dialog_1.$set(dialog_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      transition_in(dialog_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      transition_out(dialog_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div2);
      destroy_component(button);
      /*dialog_1_binding*/

      ctx[2](null);
      destroy_component(dialog_1);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance($$self, $$props, $$invalidate) {
  var dialog;
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Routes> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Routes", $$slots, []);

  var click_handler = function click_handler() {
    dialog.open();
  };

  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(0, dialog = $$value);
    });
  }

  $$self.$capture_state = function () {
    return {
      Button: Button_1,
      Label: Label,
      Dialog: Dialog,
      Content: Content,
      dialog: dialog
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("dialog" in $$props) $$invalidate(0, dialog = $$props.dialog);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [dialog, click_handler, dialog_1_binding];
}

var Routes = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Routes, _SvelteComponentDev);

  var _super = _createSuper(Routes);

  function Routes(options) {
    var _this;

    _classCallCheck(this, Routes);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Routes",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Routes;
}(SvelteComponentDev);

export default Routes;
