import { _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, S as SvelteComponentDev, v as validate_slots, f as space, g as element, q as query_selector_all, j as detach_dev, k as claim_space, l as claim_element, m as children, r as attr_dev, p as add_location, u as insert_dev, w as append_dev, H as noop } from './client.5830b9dc.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "src/routes/certifications.svelte";

function create_fragment(ctx) {
  var t0;
  var div;
  var a0;
  var img0;
  var img0_src_value;
  var t1;
  var a1;
  var img1;
  var img1_src_value;
  var t2;
  var a2;
  var img2;
  var img2_src_value;
  var t3;
  var a3;
  var img3;
  var img3_src_value;
  var block = {
    c: function create() {
      t0 = space();
      div = element("div");
      a0 = element("a");
      img0 = element("img");
      t1 = space();
      a1 = element("a");
      img1 = element("img");
      t2 = space();
      a2 = element("a");
      img2 = element("img");
      t3 = space();
      a3 = element("a");
      img3 = element("img");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-nw7d5l\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      a0 = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        target: true
      });
      var a0_nodes = children(a0);
      img0 = claim_element(a0_nodes, "IMG", {
        loading: true,
        src: true,
        alt: true,
        class: true
      });
      a0_nodes.forEach(detach_dev);
      t1 = claim_space(div_nodes);
      a1 = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        target: true
      });
      var a1_nodes = children(a1);
      img1 = claim_element(a1_nodes, "IMG", {
        loading: true,
        src: true,
        alt: true,
        class: true
      });
      a1_nodes.forEach(detach_dev);
      t2 = claim_space(div_nodes);
      a2 = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        target: true
      });
      var a2_nodes = children(a2);
      img2 = claim_element(a2_nodes, "IMG", {
        loading: true,
        src: true,
        alt: true,
        class: true
      });
      a2_nodes.forEach(detach_dev);
      t3 = claim_space(div_nodes);
      a3 = claim_element(div_nodes, "A", {
        href: true,
        title: true,
        target: true
      });
      var a3_nodes = children(a3);
      img3 = claim_element(a3_nodes, "IMG", {
        loading: true,
        src: true,
        alt: true,
        class: true
      });
      a3_nodes.forEach(detach_dev);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Certifications | Diego Sánchez";
      attr_dev(img0, "loading", "lazy");
      if (img0.src !== (img0_src_value = "Images/DSMScertificate.png")) attr_dev(img0, "src", img0_src_value);
      attr_dev(img0, "alt", "Duke University certification");
      attr_dev(img0, "class", "svelte-hv2m64");
      add_location(img0, file, 18, 2, 384);
      attr_dev(a0, "href", "https://www.coursera.org/account/accomplishments/certificate/FUF5A6SNBHQC");
      attr_dev(a0, "title", "Duke University");
      attr_dev(a0, "target", "_blank");
      add_location(a0, file, 17, 1, 257);
      attr_dev(img1, "loading", "lazy");
      if (img1.src !== (img1_src_value = "Images/FDMcertificate.png")) attr_dev(img1, "src", img1_src_value);
      attr_dev(img1, "alt", "Fundamentals of Digital Marketing certification");
      attr_dev(img1, "class", "svelte-hv2m64");
      add_location(img1, file, 21, 2, 628);
      attr_dev(a1, "href", "https://learndigital.withgoogle.com/digitalgarage/validate-certificate-code");
      attr_dev(a1, "title", "Fundamentals of Digital Marketing");
      attr_dev(a1, "target", "_blank");
      add_location(a1, file, 20, 1, 481);
      attr_dev(img2, "loading", "lazy");
      if (img2.src !== (img2_src_value = "Images/RWDcertificate.png")) attr_dev(img2, "src", img2_src_value);
      attr_dev(img2, "alt", "FCC Responsive Web Design certification");
      attr_dev(img2, "class", "svelte-hv2m64");
      add_location(img2, file, 24, 2, 884);
      attr_dev(a2, "href", "https://www.freecodecamp.org/certification/diegosanchez/responsive-web-design");
      attr_dev(a2, "title", "FCC: Responsive Web Design");
      attr_dev(a2, "target", "_blank");
      add_location(a2, file, 23, 1, 742);
      attr_dev(img3, "loading", "lazy");
      if (img3.src !== (img3_src_value = "Images/FELcertificate.png")) attr_dev(img3, "src", img3_src_value);
      attr_dev(img3, "alt", "FCC: Front End Libraries certification");
      attr_dev(img3, "class", "svelte-hv2m64");
      add_location(img3, file, 27, 2, 1128);
      attr_dev(a3, "href", "https://www.freecodecamp.org/certification/diegosanchez/front-end-libraries");
      attr_dev(a3, "title", "FCC: Front End Libraries");
      attr_dev(a3, "target", "_blank");
      add_location(a3, file, 26, 1, 990);
      attr_dev(div, "class", "container svelte-hv2m64");
      add_location(div, file, 16, 0, 232);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, div, anchor);
      append_dev(div, a0);
      append_dev(a0, img0);
      append_dev(div, t1);
      append_dev(div, a1);
      append_dev(a1, img1);
      append_dev(div, t2);
      append_dev(div, a2);
      append_dev(a2, img2);
      append_dev(div, t3);
      append_dev(div, a3);
      append_dev(a3, img3);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(div);
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

function instance($$self, $$props) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Certifications> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Certifications", $$slots, []);
  return [];
}

var Certifications = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Certifications, _SvelteComponentDev);

  var _super = _createSuper(Certifications);

  function Certifications(options) {
    var _this;

    _classCallCheck(this, Certifications);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Certifications",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  return Certifications;
}(SvelteComponentDev);

export default Certifications;
