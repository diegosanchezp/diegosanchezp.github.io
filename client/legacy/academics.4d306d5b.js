import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, B as Button_1, v as validate_slots, L as Label, f as space, g as element, t as text, h as create_component, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, n as claim_text, o as claim_component, p as add_location, r as attr_dev, u as insert_dev, w as append_dev, x as mount_component, y as _slicedToArray, z as transition_in, A as transition_out, E as destroy_component } from './client.5830b9dc.js';
import { f as fly, t as transition } from './transition.d01f925c.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/academics.svelte"; // (45:28) <Label>

function create_default_slot_1(ctx) {
  var t;
  var block = {
    c: function create() {
      t = text("See academic curriculum");
    },
    l: function claim(nodes) {
      t = claim_text(nodes, "See academic curriculum");
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
    id: create_default_slot_1.name,
    type: "slot",
    source: "(45:28) <Label>",
    ctx: ctx
  });
  return block;
} // (45:3) <Button variant="raised">


function create_default_slot(ctx) {
  var current;
  var label = new Label({
    props: {
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
      1) {
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
    id: create_default_slot.name,
    type: "slot",
    source: "(45:3) <Button variant=\\\"raised\\\">",
    ctx: ctx
  });
  return block;
}

function create_fragment(ctx) {
  var t0;
  var div3;
  var div1;
  var div0;
  var p0;
  var t1;
  var b0;
  var t2;
  var t3;
  var t4;
  var p1;
  var t5;
  var b1;
  var t6;
  var t7;
  var t8;
  var img;
  var img_src_value;
  var t9;
  var div2;
  var a;
  var current;
  var button = new Button_1({
    props: {
      variant: "raised",
      $$slots: {
        default: [create_default_slot]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      t0 = space();
      div3 = element("div");
      div1 = element("div");
      div0 = element("div");
      p0 = element("p");
      t1 = text("Diego is a computer science ");
      b0 = element("b");
      t2 = text("student ");
      t3 = text("at the Central University of Venezuela (UCV), \n\t\t\t\the’s currently at the 6th semester.");
      t4 = space();
      p1 = element("p");
      t5 = text("He is also a ");
      b1 = element("b");
      t6 = text("practical instructor");
      t7 = text(" teaching Probability and Statistics in \n\t\t\t\tthe UCV.");
      t8 = space();
      img = element("img");
      t9 = space();
      div2 = element("div");
      a = element("a");
      create_component(button.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-172mg3u\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div3 = claim_element(nodes, "DIV", {
        class: true
      });
      var div3_nodes = children(div3);
      div1 = claim_element(div3_nodes, "DIV", {
        id: true,
        class: true
      });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {});
      var div0_nodes = children(div0);
      p0 = claim_element(div0_nodes, "P", {});
      var p0_nodes = children(p0);
      t1 = claim_text(p0_nodes, "Diego is a computer science ");
      b0 = claim_element(p0_nodes, "B", {});
      var b0_nodes = children(b0);
      t2 = claim_text(b0_nodes, "student ");
      b0_nodes.forEach(detach_dev);
      t3 = claim_text(p0_nodes, "at the Central University of Venezuela (UCV), \n\t\t\t\the’s currently at the 6th semester.");
      p0_nodes.forEach(detach_dev);
      t4 = claim_space(div0_nodes);
      p1 = claim_element(div0_nodes, "P", {});
      var p1_nodes = children(p1);
      t5 = claim_text(p1_nodes, "He is also a ");
      b1 = claim_element(p1_nodes, "B", {});
      var b1_nodes = children(b1);
      t6 = claim_text(b1_nodes, "practical instructor");
      b1_nodes.forEach(detach_dev);
      t7 = claim_text(p1_nodes, " teaching Probability and Statistics in \n\t\t\t\tthe UCV.");
      p1_nodes.forEach(detach_dev);
      div0_nodes.forEach(detach_dev);
      t8 = claim_space(div1_nodes);
      img = claim_element(div1_nodes, "IMG", {
        src: true,
        alt: true,
        class: true
      });
      div1_nodes.forEach(detach_dev);
      t9 = claim_space(div3_nodes);
      div2 = claim_element(div3_nodes, "DIV", {
        class: true
      });
      var div2_nodes = children(div2);
      a = claim_element(div2_nodes, "A", {
        href: true,
        target: true
      });
      var a_nodes = children(a);
      claim_component(button.$$.fragment, a_nodes);
      a_nodes.forEach(detach_dev);
      div2_nodes.forEach(detach_dev);
      div3_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Academics | Diego Sánchez";
      add_location(b0, file, 29, 32, 493);
      add_location(p0, file, 28, 3, 457);
      add_location(b1, file, 33, 17, 627);
      add_location(p1, file, 32, 3, 606);
      add_location(div0, file, 27, 2, 448);
      if (img.src !== (img_src_value = "Images/UCVLogo.png")) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", "UCV Logo");
      attr_dev(img, "class", "svelte-10anfu7");
      add_location(img, file, 37, 2, 727);
      attr_dev(div1, "id", "content");
      attr_dev(div1, "class", "svelte-10anfu7");
      add_location(div1, file, 26, 1, 427);
      attr_dev(a, "href", "http://www.computacion.ciens.ucv.ve/pensum2k/docs/Plan%20de%20Estudios-aprobadoCU%20Revisado20-01-2005.pdf");
      attr_dev(a, "target", "_blank");
      add_location(a, file, 41, 2, 812);
      attr_dev(div2, "class", "center-block");
      add_location(div2, file, 40, 1, 783);
      attr_dev(div3, "class", "center-absolute");
      add_location(div3, file, 25, 0, 396);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div3, anchor);
      append_dev(div3, div1);
      append_dev(div1, div0);
      append_dev(div0, p0);
      append_dev(p0, t1);
      append_dev(p0, b0);
      append_dev(b0, t2);
      append_dev(p0, t3);
      append_dev(div0, t4);
      append_dev(div0, p1);
      append_dev(p1, t5);
      append_dev(p1, b1);
      append_dev(b1, t6);
      append_dev(p1, t7);
      append_dev(div1, t8);
      append_dev(div1, img);
      append_dev(div3, t9);
      append_dev(div3, div2);
      append_dev(div2, a);
      mount_component(button, a, null);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      var button_changes = {};

      if (dirty &
      /*$$scope*/
      1) {
        button_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      button.$set(button_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div3);
      destroy_component(button);
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
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Academics> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Academics", $$slots, []);

  $$self.$capture_state = function () {
    return {
      Button: Button_1,
      Label: Label,
      fly: fly,
      transition: transition
    };
  };

  return [];
}

var Academics = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Academics, _SvelteComponentDev);

  var _super = _createSuper(Academics);

  function Academics(options) {
    var _this;

    _classCallCheck(this, Academics);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Academics",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Academics;
}(SvelteComponentDev);

export default Academics;
