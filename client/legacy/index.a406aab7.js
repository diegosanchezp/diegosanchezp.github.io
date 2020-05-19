import { I as styleInject, _ as _inherits, a as _getPrototypeOf, b as _possibleConstructorReturn, c as _classCallCheck, i as init, s as safe_not_equal, d as _assertThisInitialized, e as dispatch_dev, J as _createClass, S as SvelteComponentDev, K as create_slot, M as exclude, N as assign, O as forwardEventsBuilder, P as get_current_component, v as validate_slots, Q as exclude_internal_props, R as useActions, g as element, l as claim_element, m as children, j as detach_dev, T as set_attributes, p as add_location, u as insert_dev, U as run_all, V as action_destroyer, y as _slicedToArray, W as get_slot_context, X as get_slot_changes, Y as get_spread_update, Z as is_function, z as transition_in, A as transition_out, $ as classAdderBuilder, a0 as Div, a1 as Ripple, a2 as __extends, a3 as _assign, a4 as MDCFoundation, a5 as MDCRipple, a6 as MDCRippleFoundation, a7 as MDCComponent, a8 as setContext, a9 as onMount, aa as listen_dev, F as binding_callbacks, ab as validate_each_argument, ac as validate_each_keys, ad as onDestroy, ae as afterUpdate, af as empty, ag as group_outros, ah as update_keyed_each, ai as check_outros, aj as outro_and_destroy_block, L as Label, h as create_component, o as claim_component, r as attr_dev, x as mount_component, E as destroy_component, t as text, f as space, n as claim_text, k as claim_space, w as append_dev, ak as set_data_dev, H as noop, q as query_selector_all, al as add_render_callback, am as create_bidirectional_transition, an as destroy_each } from './client.5830b9dc.js';
import { f as fly, t as transition } from './transition.d01f925c.js';

// ====== Free Code Camp Projects ====== 
// FCC: Front End Libraries projects
var FELprojects = [{
  title: 'Drum Machine',
  url: 'https://diegosanchezp.github.io/drum-machine-fcc/',
  img: 'drum-machine-screenshot.png',
  description: 'A drum machine that you can play with your keyboard buttons',
  tags: ['Lit-html', 'Web Components']
}, {
  title: 'Random Quote Machine',
  url: 'https://diegosanchezp.github.io/random-quote-machine',
  img: 'random-quote-machine-screenshot.png',
  description: 'Random Quotes',
  tags: ['ReactJs']
}, {
  title: 'React Markdown Previewer',
  url: 'https://diegosanchezp.github.io/simple-react-markdown-previewer',
  img: 'simple-react-markdown-screenshot.png',
  description: 'Live preview markdown editor',
  tags: ['ReactJs']
}, {
  title: 'JavaScript Calculator',
  url: 'https://diegosanchezp.github.io/javascript-calculator',
  img: 'javascript-calculator-screenshot.png',
  description: 'A simple, basic calculator',
  tags: ['ReactJs']
}, {
  title: 'Pomodoro Tracker',
  url: 'https://diegosanchezp.github.io/pomodoro-timer',
  img: 'pomodo-timer-screenshot.png',
  description: 'Simple Pomodoro Tracker for working',
  tags: ['ReactJs']
}]; // FCC: Responsive Web Design projects

var WorkProjects = [{
  title: 'Copin Pay',
  url: 'http://copinpay.com/',
  img: 'copin-webpage-screenshot.png',
  description: 'A platform for managing your monetary assets from Copyn\s \
    story platform',
  tags: ['Angular8', 'Ionic', 'Firebase']
}];

var css_248z = "body{background-color:#000;color:#fff}.mdc-card{border-radius:4px;background-color:#121212;background-color:var(--mdc-theme-surface,#121212);box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);display:flex;flex-direction:column;box-sizing:border-box}.mdc-card--outlined{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);border:1px solid #2e2e2e}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:50%;background-size:cover}.mdc-card__media:before{display:block;content:\"\"}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__media--square:before{margin-top:100%}.mdc-card__media--16-9:before{margin-top:56.25%}.mdc-card__media-content{position:absolute;top:0;right:0;bottom:0;left:0;box-sizing:border-box}.mdc-card__primary-action{display:flex;flex-direction:column;box-sizing:border-box;position:relative;outline:none;color:inherit;text-decoration:none;cursor:pointer;overflow:hidden}.mdc-card__primary-action:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__primary-action:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mdc-card__actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mdc-card__actions--full-bleed{padding:0}.mdc-card__action-buttons,.mdc-card__action-icons{display:flex;flex-direction:row;align-items:center;box-sizing:border-box}.mdc-card__action-icons{color:hsla(0,0%,100%,.6);flex-grow:1;justify-content:flex-end}.mdc-card__action-buttons+.mdc-card__action-icons{margin-left:16px;margin-right:0}.mdc-card__action-buttons+.mdc-card__action-icons[dir=rtl],[dir=rtl] .mdc-card__action-buttons+.mdc-card__action-icons{margin-left:0;margin-right:16px}.mdc-card__action{display:inline-flex;flex-direction:row;align-items:center;box-sizing:border-box;justify-content:center;cursor:pointer;user-select:none}.mdc-card__action:focus{outline:none}.mdc-card__action--button{margin-left:0;margin-right:8px;padding:0 8px}.mdc-card__action--button[dir=rtl],[dir=rtl] .mdc-card__action--button{margin-left:8px;margin-right:0}.mdc-card__action--button:last-child,.mdc-card__action--button:last-child[dir=rtl],[dir=rtl] .mdc-card__action--button:last-child{margin-left:0;margin-right:0}.mdc-card__actions--full-bleed .mdc-card__action--button{justify-content:space-between;width:100%;height:auto;max-height:none;margin:0;padding:8px 16px;text-align:left}.mdc-card__actions--full-bleed .mdc-card__action--button[dir=rtl],[dir=rtl] .mdc-card__actions--full-bleed .mdc-card__action--button{text-align:right}.mdc-card__action--icon{margin:-6px 0;padding:12px}.mdc-card__action--icon:not(:disabled){color:hsla(0,0%,100%,.6)}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-card__primary-action{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-card__primary-action:after,.mdc-card__primary-action:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-card__primary-action:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-card__primary-action.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-card__primary-action.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-card__primary-action.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-card__primary-action.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-card__primary-action.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-card__primary-action:after,.mdc-card__primary-action:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-card__primary-action.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-card__primary-action:after,.mdc-card__primary-action:before{background-color:#fff}.mdc-card__primary-action:hover:before{opacity:.08}.mdc-card__primary-action.mdc-ripple-upgraded--background-focused:before,.mdc-card__primary-action:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-card__primary-action:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-card__primary-action:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-card__primary-action.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-button{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:2.25rem;font-weight:500;letter-spacing:.08929em;text-decoration:none;text-transform:uppercase;padding:0 8px;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;height:36px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:hidden;vertical-align:middle;border-radius:4px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{background-color:transparent;color:hsla(0,0%,100%,.37);cursor:default;pointer-events:none}.mdc-button.mdc-button--dense{border-radius:4px}.mdc-button:not(:disabled){background-color:transparent}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;width:18px;height:18px;font-size:18px;vertical-align:top}.mdc-button .mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button .mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button:not(:disabled){color:#fc0;color:var(--mdc-theme-primary,#fc0)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}.mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button__label+.mdc-button__icon{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--outlined .mdc-button__icon,.mdc-button--raised .mdc-button__icon,.mdc-button--unelevated .mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--outlined .mdc-button__icon[dir=rtl],.mdc-button--outlined .mdc-button__label+.mdc-button__icon,.mdc-button--raised .mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon,.mdc-button--unelevated .mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--outlined .mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__icon{margin-left:8px;margin-right:-4px}.mdc-button--outlined .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--raised .mdc-button__label+.mdc-button__icon[dir=rtl],.mdc-button--unelevated .mdc-button__label+.mdc-button__icon[dir=rtl],[dir=rtl] .mdc-button--outlined .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--raised .mdc-button__label+.mdc-button__icon,[dir=rtl] .mdc-button--unelevated .mdc-button__label+.mdc-button__icon{margin-left:-4px;margin-right:8px}.mdc-button--raised,.mdc-button--unelevated{padding:0 16px}.mdc-button--raised:disabled,.mdc-button--unelevated:disabled{background-color:hsla(0,0%,100%,.12);color:hsla(0,0%,100%,.37)}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-primary,#fc0)}}.mdc-button--raised:not(:disabled),.mdc-button--unelevated:not(:disabled){color:#000;color:var(--mdc-theme-on-primary,#000)}.mdc-button--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);transition:box-shadow .28s cubic-bezier(.4,0,.2,1)}.mdc-button--raised:focus,.mdc-button--raised:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12)}.mdc-button--raised:active{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.mdc-button--raised:disabled{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.mdc-button--outlined{border-style:solid;padding:0 15px;border-width:1px}.mdc-button--outlined:disabled{border-color:hsla(0,0%,100%,.37)}.mdc-button--outlined:not(:disabled){border-color:#fc0;border-color:var(--mdc-theme-primary,#fc0)}.mdc-button--dense{height:32px;font-size:.8125rem}.mdc-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-button:after,.mdc-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-button.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-button.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-button:after,.mdc-button:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-button:after,.mdc-button:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-button:after,.mdc-button:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-button:hover:before{opacity:.08}.mdc-button.mdc-ripple-upgraded--background-focused:before,.mdc-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:#000}@supports not (-ms-ime-align:auto){.mdc-button--raised:after,.mdc-button--raised:before,.mdc-button--unelevated:after,.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-primary,#000)}}.mdc-button--raised:hover:before,.mdc-button--unelevated:hover:before{opacity:.04}.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.mdc-button--raised:not(.mdc-ripple-upgraded):after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.mdc-button--raised.mdc-ripple-upgraded,.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-button--color-secondary:not(:disabled){color:#fc0;color:var(--mdc-theme-secondary,#fc0)}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:#fc0}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){background-color:var(--mdc-theme-secondary,#fc0)}}.smui-button--color-secondary.mdc-button--raised:not(:disabled),.smui-button--color-secondary.mdc-button--unelevated:not(:disabled){color:#000;color:var(--mdc-theme-on-secondary,#000)}.smui-button--color-secondary.mdc-button--outlined:not(:disabled){border-color:#fc0;border-color:var(--mdc-theme-secondary,#fc0)}.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.smui-button--color-secondary:after,.smui-button--color-secondary:before{background-color:var(--mdc-theme-secondary,#fc0)}}.smui-button--color-secondary:hover:before{opacity:.08}.smui-button--color-secondary.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.smui-button--color-secondary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.smui-button--color-secondary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:#000}@supports not (-ms-ime-align:auto){.smui-button--color-secondary.mdc-button--raised:after,.smui-button--color-secondary.mdc-button--raised:before,.smui-button--color-secondary.mdc-button--unelevated:after,.smui-button--color-secondary.mdc-button--unelevated:before{background-color:var(--mdc-theme-on-secondary,#000)}}.smui-button--color-secondary.mdc-button--raised:hover:before,.smui-button--color-secondary.mdc-button--unelevated:hover:before{opacity:.04}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):focus:before,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded--background-focused:before,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.12}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.smui-button--color-secondary.mdc-button--raised:not(.mdc-ripple-upgraded):active:after,.smui-button--color-secondary.mdc-button--unelevated:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.12}.smui-button--color-secondary.mdc-button--raised.mdc-ripple-upgraded,.smui-button--color-secondary.mdc-button--unelevated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.12}.smui-button__group{display:inline-flex}.smui-button__group>.mdc-button,.smui-button__group>.smui-button__group-item>.mdc-button{margin-left:0;margin-right:0}.smui-button__group>.mdc-button:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button{border-top-right-radius:0;border-bottom-right-radius:0}.smui-button__group>.mdc-button:not(:first-child),.smui-button__group>.smui-button__group-item:not(:first-child)>.mdc-button{border-top-left-radius:0;border-bottom-left-radius:0}.smui-button__group.smui-button__group--raised{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised,.smui-button__group>.smui-button__group-item>.mdc-button--raised{border-radius:4px;box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--raised.mdc-button--dense,.smui-button__group>.smui-button__group-item>.mdc-button--raised.mdc-button--dense{border-radius:4px}.smui-button__group>.mdc-button--raised:active,.smui-button__group>.mdc-button--raised:disabled,.smui-button__group>.mdc-button--raised:focus,.smui-button__group>.mdc-button--raised:hover,.smui-button__group>.smui-button__group-item>.mdc-button--raised:active,.smui-button__group>.smui-button__group-item>.mdc-button--raised:disabled,.smui-button__group>.smui-button__group-item>.mdc-button--raised:focus,.smui-button__group>.smui-button__group-item>.mdc-button--raised:hover{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)}.smui-button__group>.mdc-button--outlined:not(:last-child),.smui-button__group>.smui-button__group-item:not(:last-child)>.mdc-button--outlined{border-right-width:0}.mdc-icon-button{width:48px;height:48px;padding:12px;font-size:24px;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:transparent;fill:currentColor;color:inherit;text-decoration:none;cursor:pointer;user-select:none}.mdc-icon-button img,.mdc-icon-button svg{width:24px;height:24px}.mdc-icon-button:disabled{color:rgba(0,0,0,.38);color:var(--mdc-theme-text-disabled-on-light,rgba(0,0,0,.38));cursor:default;pointer-events:none}.mdc-icon-button__icon{display:inline-block}.mdc-icon-button--on .mdc-icon-button__icon,.mdc-icon-button__icon.mdc-icon-button__icon--on{display:none}.mdc-icon-button--on .mdc-icon-button__icon.mdc-icon-button__icon--on{display:inline-block}.mdc-icon-button{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-icon-button:after,.mdc-icon-button:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-icon-button:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-icon-button.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-icon-button.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-icon-button.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-icon-button.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-icon-button:after,.mdc-icon-button:before{top:0;left:0;width:100%;height:100%}.mdc-icon-button.mdc-ripple-upgraded:after,.mdc-icon-button.mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-icon-button:after,.mdc-icon-button:before{background-color:#fff}.mdc-icon-button:hover:before{opacity:.08}.mdc-icon-button.mdc-ripple-upgraded--background-focused:before,.mdc-icon-button:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-icon-button:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-icon-button:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-icon-button.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative;outline:none;overflow:hidden}.mdc-ripple-surface:after,.mdc-ripple-surface:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-ripple-surface:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-ripple-surface.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-ripple-surface.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-ripple-surface.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-ripple-surface:after,.mdc-ripple-surface:before{background-color:#fff}.mdc-ripple-surface:hover:before{opacity:.08}.mdc-ripple-surface.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface:after,.mdc-ripple-surface:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-ripple-surface.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]{overflow:visible}.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded]:before{top:0;left:0;width:100%;height:100%}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after,.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:before{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0);width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface[data-mdc-ripple-is-unbounded].mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--primary:after,.mdc-ripple-surface--primary:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-ripple-surface--primary:hover:before{opacity:.08}.mdc-ripple-surface--primary.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--primary:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--primary.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-ripple-surface--accent:after,.mdc-ripple-surface--accent:before{background-color:var(--mdc-theme-secondary,#fc0)}}.mdc-ripple-surface--accent:hover:before{opacity:.08}.mdc-ripple-surface--accent.mdc-ripple-upgraded--background-focused:before,.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-ripple-surface--accent:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-ripple-surface--accent.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.smui-card--padded,.smui-card__content,.smui-card__primary-action--padded{padding:16px}";
styleInject(css_248z);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file = "node_modules/@smui/card/Card.svelte";

function create_fragment(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[7].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[6], null);
  var div_levels = [{
    class: "\n    mdc-card\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*variant*/
    ctx[2] === "outlined" ? "mdc-card--outlined" : "") + "\n    " + (
    /*padded*/
    ctx[3] ? "smui-card--padded" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[5], ["use", "class", "variant", "padded"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[4].call(null, div))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        64) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[6], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[6], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, variant, padded*/
      14 && {
        class: "\n    mdc-card\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*variant*/
        ctx[2] === "outlined" ? "mdc-card--outlined" : "") + "\n    " + (
        /*padded*/
        ctx[3] ? "smui-card--padded" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      32 && exclude(
      /*$$props*/
      ctx[5], ["use", "class", "variant", "padded"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
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
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$variant = _$$props3.variant,
      variant = _$$props3$variant === void 0 ? "raised" : _$$props3$variant;
  var _$$props4 = $$props,
      _$$props4$padded = _$$props4.padded,
      padded = _$$props4$padded === void 0 ? false : _$$props4$padded;
  var _$$props5 = $$props,
      _$$props5$$$slots = _$$props5.$$slots,
      $$slots = _$$props5$$$slots === void 0 ? {} : _$$props5$$$slots,
      $$scope = _$$props5.$$scope;
  validate_slots("Card", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("variant" in $$new_props) $$invalidate(2, variant = $$new_props.variant);
    if ("padded" in $$new_props) $$invalidate(3, padded = $$new_props.padded);
    if ("$$scope" in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      variant: variant,
      padded: padded
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(5, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("variant" in $$props) $$invalidate(2, variant = $$new_props.variant);
    if ("padded" in $$props) $$invalidate(3, padded = $$new_props.padded);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, variant, padded, forwardEvents, $$props, $$scope, $$slots];
}

var Card = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Card, _SvelteComponentDev);

  var _super = _createSuper(Card);

  function Card(options) {
    var _this;

    _classCallCheck(this, Card);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, {
      use: 0,
      class: 1,
      variant: 2,
      padded: 3
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Card",
      options: options,
      id: create_fragment.name
    });
    return _this;
  }

  _createClass(Card, [{
    key: "use",
    get: function get() {
      throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "variant",
    get: function get() {
      throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padded",
    get: function get() {
      throw new Error("<Card>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Card>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Card;
}(SvelteComponentDev);

var Content = classAdderBuilder({
  class: 'smui-card__content',
  component: Div,
  contexts: {}
});

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$1 = "node_modules/@smui/card/PrimaryAction.svelte";

function create_fragment$1(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var Ripple_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[9].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[8], null);
  var div_levels = [{
    class: "\n    mdc-card__primary-action\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*padded*/
    ctx[4] ? "smui-card__primary-action--padded" : "") + "\n  "
  }, {
    tabindex:
    /*tabindex*/
    ctx[5]
  }, exclude(
  /*$$props*/
  ctx[7], ["use", "class", "ripple", "color", "padded", "tabindex"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true,
        tabindex: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$1, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[6].call(null, div)), action_destroyer(Ripple_action = Ripple.call(null, div, {
        ripple:
        /*ripple*/
        ctx[2],
        unbounded: false,
        color:
        /*color*/
        ctx[3]
      }))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        256) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[8], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[8], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, padded*/
      18 && {
        class: "\n    mdc-card__primary-action\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*padded*/
        ctx[4] ? "smui-card__primary-action--padded" : "") + "\n  "
      }, dirty &
      /*tabindex*/
      32 && {
        tabindex:
        /*tabindex*/
        ctx[5]
      }, dirty &
      /*exclude, $$props*/
      128 && exclude(
      /*$$props*/
      ctx[7], ["use", "class", "ripple", "color", "padded", "tabindex"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
      if (Ripple_action && is_function(Ripple_action.update) && dirty &
      /*ripple, color*/
      12) Ripple_action.update.call(null, {
        ripple:
        /*ripple*/
        ctx[2],
        unbounded: false,
        color:
        /*color*/
        ctx[3]
      });
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$1.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$1($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$ripple = _$$props3.ripple,
      ripple = _$$props3$ripple === void 0 ? true : _$$props3$ripple;
  var _$$props4 = $$props,
      _$$props4$color = _$$props4.color,
      color = _$$props4$color === void 0 ? null : _$$props4$color;
  var _$$props5 = $$props,
      _$$props5$padded = _$$props5.padded,
      padded = _$$props5$padded === void 0 ? false : _$$props5$padded;
  var _$$props6 = $$props,
      _$$props6$tabindex = _$$props6.tabindex,
      tabindex = _$$props6$tabindex === void 0 ? "0" : _$$props6$tabindex;
  var _$$props7 = $$props,
      _$$props7$$$slots = _$$props7.$$slots,
      $$slots = _$$props7$$$slots === void 0 ? {} : _$$props7$$$slots,
      $$scope = _$$props7.$$scope;
  validate_slots("PrimaryAction", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$new_props) $$invalidate(3, color = $$new_props.color);
    if ("padded" in $$new_props) $$invalidate(4, padded = $$new_props.padded);
    if ("tabindex" in $$new_props) $$invalidate(5, tabindex = $$new_props.tabindex);
    if ("$$scope" in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      Ripple: Ripple,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      color: color,
      padded: padded,
      tabindex: tabindex
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(7, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(2, ripple = $$new_props.ripple);
    if ("color" in $$props) $$invalidate(3, color = $$new_props.color);
    if ("padded" in $$props) $$invalidate(4, padded = $$new_props.padded);
    if ("tabindex" in $$props) $$invalidate(5, tabindex = $$new_props.tabindex);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, ripple, color, padded, tabindex, forwardEvents, $$props, $$scope, $$slots];
}

var PrimaryAction = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(PrimaryAction, _SvelteComponentDev);

  var _super = _createSuper$1(PrimaryAction);

  function PrimaryAction(options) {
    var _this;

    _classCallCheck(this, PrimaryAction);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, {
      use: 0,
      class: 1,
      ripple: 2,
      color: 3,
      padded: 4,
      tabindex: 5
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "PrimaryAction",
      options: options,
      id: create_fragment$1.name
    });
    return _this;
  }

  _createClass(PrimaryAction, [{
    key: "use",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "color",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "padded",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "tabindex",
    get: function get() {
      throw new Error("<PrimaryAction>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<PrimaryAction>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return PrimaryAction;
}(SvelteComponentDev);

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$2 = "node_modules/@smui/card/Media.svelte";

function create_fragment$2(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[6].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[5], null);
  var div_levels = [{
    class: "\n    mdc-card__media\n    " +
    /*className*/
    ctx[1] + "\n    " + (
    /*aspectRatio*/
    ctx[2] === "square" ? "mdc-card__media--square" : "") + "\n    " + (
    /*aspectRatio*/
    ctx[2] === "16x9" ? "mdc-card__media--16-9" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[4], ["use", "class", "aspectRatio"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$2, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }

      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[0])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[3].call(null, div))];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        32) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[5], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[5], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, aspectRatio*/
      6 && {
        class: "\n    mdc-card__media\n    " +
        /*className*/
        ctx[1] + "\n    " + (
        /*aspectRatio*/
        ctx[2] === "square" ? "mdc-card__media--square" : "") + "\n    " + (
        /*aspectRatio*/
        ctx[2] === "16x9" ? "mdc-card__media--16-9" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      16 && exclude(
      /*$$props*/
      ctx[4], ["use", "class", "aspectRatio"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      1) useActions_action.update.call(null,
      /*use*/
      ctx[0]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$2.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$2($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$aspectRatio = _$$props3.aspectRatio,
      aspectRatio = _$$props3$aspectRatio === void 0 ? null : _$$props3$aspectRatio;
  var _$$props4 = $$props,
      _$$props4$$$slots = _$$props4.$$slots,
      $$slots = _$$props4$$$slots === void 0 ? {} : _$$props4$$$slots,
      $$scope = _$$props4.$$scope;
  validate_slots("Media", $$slots, ['default']);

  $$self.$set = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
    if ("aspectRatio" in $$new_props) $$invalidate(2, aspectRatio = $$new_props.aspectRatio);
    if ("$$scope" in $$new_props) $$invalidate(5, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      aspectRatio: aspectRatio
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(4, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(0, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(1, className = $$new_props.className);
    if ("aspectRatio" in $$props) $$invalidate(2, aspectRatio = $$new_props.aspectRatio);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$props = exclude_internal_props($$props);
  return [use, className, aspectRatio, forwardEvents, $$props, $$scope, $$slots];
}

var Media = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Media, _SvelteComponentDev);

  var _super = _createSuper$2(Media);

  function Media(options) {
    var _this;

    _classCallCheck(this, Media);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, {
      use: 0,
      class: 1,
      aspectRatio: 2
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Media",
      options: options,
      id: create_fragment$2.name
    });
    return _this;
  }

  _createClass(Media, [{
    key: "use",
    get: function get() {
      throw new Error("<Media>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Media>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Media>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Media>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "aspectRatio",
    get: function get() {
      throw new Error("<Media>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Media>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Media;
}(SvelteComponentDev);

var MediaContent = classAdderBuilder({
  class: 'mdc-card__media-content',
  component: Div,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-card__action-buttons',
  component: Div,
  contexts: {}
});

classAdderBuilder({
  class: 'mdc-card__action-icons',
  component: Div,
  contexts: {}
});

var css_248z$1 = "body{background-color:#000;color:#fff}.mdc-chip__icon--leading,.mdc-chip__icon--trailing{color:hsla(0,0%,100%,.54)}.mdc-chip__icon--trailing:hover{color:hsla(0,0%,100%,.62)}.mdc-chip__icon--trailing:focus{color:hsla(0,0%,100%,.87)}.mdc-chip__icon.mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.mdc-chip__icon.mdc-chip__icon--trailing{width:18px;height:18px;font-size:18px}.mdc-chip__icon--trailing{margin-right:-4px;margin-left:4px}.mdc-chip{border-radius:16px;background-color:#2e2e2e;font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit;height:32px;display:inline-flex;position:relative;align-items:center;box-sizing:border-box;padding:0 12px;border-width:0;outline:none;cursor:pointer;-webkit-appearance:none;overflow:hidden}.mdc-chip,.mdc-chip:hover{color:hsla(0,0%,100%,.87)}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark,.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:-4px;margin-right:4px}.mdc-chip.mdc-chip--selected .mdc-chip__checkmark[dir=rtl],.mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden)[dir=rtl],[dir=rtl] .mdc-chip.mdc-chip--selected .mdc-chip__checkmark,[dir=rtl] .mdc-chip .mdc-chip__icon--leading:not(.mdc-chip__icon--leading-hidden){margin-left:4px;margin-right:-4px}.mdc-chip::-moz-focus-inner{padding:0;border:0}.mdc-chip:hover{color:#fff;color:var(--mdc-theme-on-surface,#fff)}.mdc-chip--exit{transition:opacity 75ms cubic-bezier(.4,0,.2,1),width .15s cubic-bezier(0,0,.2,1),padding .1s linear,margin .1s linear;opacity:0}.mdc-chip__text{white-space:nowrap}.mdc-chip__icon{border-radius:50%;outline:none;vertical-align:middle}.mdc-chip__checkmark{height:20px}.mdc-chip__checkmark-path{transition:stroke-dashoffset .15s cubic-bezier(.4,0,.6,1) 50ms;stroke-width:2px;stroke-dashoffset:29.78334;stroke-dasharray:29.78334}.mdc-chip--selected .mdc-chip__checkmark-path{stroke-dashoffset:0}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected{color:#fc0;color:var(--mdc-theme-primary,#fc0)}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected .mdc-chip__icon--leading{color:rgba(255,204,0,.54)}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:hover{color:#fc0;color:var(--mdc-theme-primary,#fc0)}.mdc-chip-set--choice .mdc-chip .mdc-chip__checkmark-path{stroke:#fc0;stroke:var(--mdc-theme-primary,#fc0)}.mdc-chip-set--choice .mdc-chip--selected{background-color:#121212;background-color:var(--mdc-theme-surface,#121212)}.mdc-chip__checkmark-svg{width:0;height:20px;transition:width .15s cubic-bezier(.4,0,.2,1)}.mdc-chip--selected .mdc-chip__checkmark-svg{width:20px}.mdc-chip-set--filter .mdc-chip__icon--leading{transition:opacity 75ms linear;transition-delay:-50ms;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark{transition:opacity 75ms linear;transition-delay:80ms;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading+.mdc-chip__checkmark .mdc-chip__checkmark-svg{transition:width 0ms}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading{opacity:0}.mdc-chip-set--filter .mdc-chip--selected .mdc-chip__icon--leading+.mdc-chip__checkmark{width:0;opacity:1}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading{width:0;opacity:0}.mdc-chip-set--filter .mdc-chip__icon--leading-hidden.mdc-chip__icon--leading+.mdc-chip__checkmark{width:20px}@keyframes mdc-ripple-fg-radius-in{0%{animation-timing-function:cubic-bezier(.4,0,.2,1);transform:translate(var(--mdc-ripple-fg-translate-start,0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}}@keyframes mdc-ripple-fg-opacity-in{0%{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity,0)}}@keyframes mdc-ripple-fg-opacity-out{0%{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity,0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var:1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug:before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-chip{--mdc-ripple-fg-size:0;--mdc-ripple-left:0;--mdc-ripple-top:0;--mdc-ripple-fg-scale:1;--mdc-ripple-fg-translate-end:0;--mdc-ripple-fg-translate-start:0;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mdc-chip:after,.mdc-chip:before{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:\"\"}.mdc-chip:before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1}.mdc-chip.mdc-ripple-upgraded:before{transform:scale(var(--mdc-ripple-fg-scale,1))}.mdc-chip.mdc-ripple-upgraded:after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-chip.mdc-ripple-upgraded--unbounded:after{top:var(--mdc-ripple-top,0);left:var(--mdc-ripple-left,0)}.mdc-chip.mdc-ripple-upgraded--foreground-activation:after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-chip.mdc-ripple-upgraded--foreground-deactivation:after{animation:mdc-ripple-fg-opacity-out .15s;transform:translate(var(--mdc-ripple-fg-translate-end,0)) scale(var(--mdc-ripple-fg-scale,1))}.mdc-chip:after,.mdc-chip:before{top:-50%;left:-50%;width:200%;height:200%}.mdc-chip.mdc-ripple-upgraded:after{width:var(--mdc-ripple-fg-size,100%);height:var(--mdc-ripple-fg-size,100%)}.mdc-chip:after,.mdc-chip:before{background-color:hsla(0,0%,100%,.87)}.mdc-chip:hover:before{opacity:.08}.mdc-chip.mdc-ripple-upgraded--background-focused:before,.mdc-chip:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.24}.mdc-chip:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-chip:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.24}.mdc-chip.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.24}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:before{opacity:.16}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:after,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:before{background-color:#fc0}@supports not (-ms-ime-align:auto){.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:after,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:before{background-color:var(--mdc-theme-primary,#fc0)}}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:hover:before{opacity:.24}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected.mdc-ripple-upgraded--background-focused:before,.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):focus:before{transition-duration:75ms;opacity:.4}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):after{transition:opacity .15s linear}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected:not(.mdc-ripple-upgraded):active:after{transition-duration:75ms;opacity:.4}.mdc-chip-set--choice .mdc-chip.mdc-chip--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:0.4}@keyframes mdc-chip-entry{0%{transform:scale(.8);opacity:.4}to{transform:scale(1);opacity:1}}.mdc-chip-set{padding:4px;display:flex;flex-wrap:wrap;box-sizing:border-box}.mdc-chip-set .mdc-chip{margin:4px}.mdc-chip-set--input .mdc-chip{animation:mdc-chip-entry .1s cubic-bezier(0,0,.2,1)}";
styleInject(css_248z$1);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
  ARIA_CHECKED: 'aria-checked',
  CHECKMARK_SELECTOR: '.mdc-chip__checkmark',
  ENTRY_ANIMATION_NAME: 'mdc-chip-entry',
  INTERACTION_EVENT: 'MDCChip:interaction',
  LEADING_ICON_SELECTOR: '.mdc-chip__icon--leading',
  REMOVAL_EVENT: 'MDCChip:removal',
  SELECTION_EVENT: 'MDCChip:selection',
  TRAILING_ICON_INTERACTION_EVENT: 'MDCChip:trailingIconInteraction',
  TRAILING_ICON_SELECTOR: '.mdc-chip__icon--trailing'
};
var cssClasses = {
  CHECKMARK: 'mdc-chip__checkmark',
  CHIP_EXIT: 'mdc-chip--exit',
  HIDDEN_LEADING_ICON: 'mdc-chip__icon--leading-hidden',
  LEADING_ICON: 'mdc-chip__icon--leading',
  SELECTED: 'mdc-chip--selected',
  TRAILING_ICON: 'mdc-chip__icon--trailing'
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var emptyClientRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0
};

var MDCChipFoundation =
/** @class */
function (_super) {
  __extends(MDCChipFoundation, _super);

  function MDCChipFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCChipFoundation.defaultAdapter, adapter)) || this;
    /**
     * Whether a trailing icon click should immediately trigger exit/removal of the chip.
     */


    _this.shouldRemoveOnTrailingIconClick_ = true;
    return _this;
  }

  Object.defineProperty(MDCChipFoundation, "strings", {
    get: function get() {
      return strings;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChipFoundation, "cssClasses", {
    get: function get() {
      return cssClasses;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChipFoundation, "defaultAdapter", {
    get: function get() {
      return {
        addClass: function addClass() {
          return undefined;
        },
        addClassToLeadingIcon: function addClassToLeadingIcon() {
          return undefined;
        },
        eventTargetHasClass: function eventTargetHasClass() {
          return false;
        },
        getCheckmarkBoundingClientRect: function getCheckmarkBoundingClientRect() {
          return emptyClientRect;
        },
        getComputedStyleValue: function getComputedStyleValue() {
          return '';
        },
        getRootBoundingClientRect: function getRootBoundingClientRect() {
          return emptyClientRect;
        },
        hasClass: function hasClass() {
          return false;
        },
        hasLeadingIcon: function hasLeadingIcon() {
          return false;
        },
        notifyInteraction: function notifyInteraction() {
          return undefined;
        },
        notifyRemoval: function notifyRemoval() {
          return undefined;
        },
        notifySelection: function notifySelection() {
          return undefined;
        },
        notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
          return undefined;
        },
        removeClass: function removeClass() {
          return undefined;
        },
        removeClassFromLeadingIcon: function removeClassFromLeadingIcon() {
          return undefined;
        },
        setAttr: function setAttr() {
          return undefined;
        },
        setStyleProperty: function setStyleProperty() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });

  MDCChipFoundation.prototype.isSelected = function () {
    return this.adapter_.hasClass(cssClasses.SELECTED);
  };

  MDCChipFoundation.prototype.setSelected = function (selected) {
    if (selected) {
      this.adapter_.addClass(cssClasses.SELECTED);
      this.adapter_.setAttr(strings.ARIA_CHECKED, 'true');
    } else {
      this.adapter_.removeClass(cssClasses.SELECTED);
      this.adapter_.setAttr(strings.ARIA_CHECKED, 'false');
    }

    this.adapter_.notifySelection(selected);
  };

  MDCChipFoundation.prototype.getShouldRemoveOnTrailingIconClick = function () {
    return this.shouldRemoveOnTrailingIconClick_;
  };

  MDCChipFoundation.prototype.setShouldRemoveOnTrailingIconClick = function (shouldRemove) {
    this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
  };

  MDCChipFoundation.prototype.getDimensions = function () {
    var _this = this;

    var getRootRect = function getRootRect() {
      return _this.adapter_.getRootBoundingClientRect();
    };

    var getCheckmarkRect = function getCheckmarkRect() {
      return _this.adapter_.getCheckmarkBoundingClientRect();
    }; // When a chip has a checkmark and not a leading icon, the bounding rect changes in size depending on the current
    // size of the checkmark.


    if (!this.adapter_.hasLeadingIcon()) {
      var checkmarkRect = getCheckmarkRect();

      if (checkmarkRect) {
        var rootRect = getRootRect(); // Checkmark is a square, meaning the client rect's width and height are identical once the animation completes.
        // However, the checkbox is initially hidden by setting the width to 0.
        // To account for an initial width of 0, we use the checkbox's height instead (which equals the end-state width)
        // when adding it to the root client rect's width.

        return {
          bottom: rootRect.bottom,
          height: rootRect.height,
          left: rootRect.left,
          right: rootRect.right,
          top: rootRect.top,
          width: rootRect.width + checkmarkRect.height
        };
      }
    }

    return getRootRect();
  };
  /**
   * Begins the exit animation which leads to removal of the chip.
   */


  MDCChipFoundation.prototype.beginExit = function () {
    this.adapter_.addClass(cssClasses.CHIP_EXIT);
  };
  /**
   * Handles an interaction event on the root element.
   */


  MDCChipFoundation.prototype.handleInteraction = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;

    if (evt.type === 'click' || isEnter) {
      this.adapter_.notifyInteraction();
    }
  };
  /**
   * Handles a transition end event on the root element.
   */


  MDCChipFoundation.prototype.handleTransitionEnd = function (evt) {
    var _this = this; // Handle transition end event on the chip when it is about to be removed.


    if (this.adapter_.eventTargetHasClass(evt.target, cssClasses.CHIP_EXIT)) {
      if (evt.propertyName === 'width') {
        this.adapter_.notifyRemoval();
      } else if (evt.propertyName === 'opacity') {
        // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
        var chipWidth_1 = this.adapter_.getComputedStyleValue('width'); // On the next frame (once we get the computed width), explicitly set the chip's width
        // to its current pixel width, so we aren't transitioning out of 'auto'.

        requestAnimationFrame(function () {
          _this.adapter_.setStyleProperty('width', chipWidth_1); // To mitigate jitter, start transitioning padding and margin before width.


          _this.adapter_.setStyleProperty('padding', '0');

          _this.adapter_.setStyleProperty('margin', '0'); // On the next frame (once width is explicitly set), transition width to 0.


          requestAnimationFrame(function () {
            _this.adapter_.setStyleProperty('width', '0');
          });
        });
      }

      return;
    } // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.


    if (evt.propertyName !== 'opacity') {
      return;
    }

    if (this.adapter_.eventTargetHasClass(evt.target, cssClasses.LEADING_ICON) && this.adapter_.hasClass(cssClasses.SELECTED)) {
      this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
    } else if (this.adapter_.eventTargetHasClass(evt.target, cssClasses.CHECKMARK) && !this.adapter_.hasClass(cssClasses.SELECTED)) {
      this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
    }
  };
  /**
   * Handles an interaction event on the trailing icon element. This is used to
   * prevent the ripple from activating on interaction with the trailing icon.
   */


  MDCChipFoundation.prototype.handleTrailingIconInteraction = function (evt) {
    var isEnter = evt.key === 'Enter' || evt.keyCode === 13;
    evt.stopPropagation();

    if (evt.type === 'click' || isEnter) {
      this.adapter_.notifyTrailingIconInteraction();

      if (this.shouldRemoveOnTrailingIconClick_) {
        this.beginExit();
      }
    }
  };

  return MDCChipFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INTERACTION_EVENTS = ['click', 'keydown'];

var MDCChip =
/** @class */
function (_super) {
  __extends(MDCChip, _super);

  function MDCChip() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(MDCChip.prototype, "selected", {
    /**
     * @return Whether the chip is selected.
     */
    get: function get() {
      return this.foundation_.isSelected();
    },

    /**
     * Sets selected state on the chip.
     */
    set: function set(selected) {
      this.foundation_.setSelected(selected);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChip.prototype, "shouldRemoveOnTrailingIconClick", {
    /**
     * @return Whether a trailing icon click should trigger exit/removal of the chip.
     */
    get: function get() {
      return this.foundation_.getShouldRemoveOnTrailingIconClick();
    },

    /**
     * Sets whether a trailing icon click should trigger exit/removal of the chip.
     */
    set: function set(shouldRemove) {
      this.foundation_.setShouldRemoveOnTrailingIconClick(shouldRemove);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChip.prototype, "ripple", {
    get: function get() {
      return this.ripple_;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChip.prototype, "id", {
    get: function get() {
      return this.root_.id;
    },
    enumerable: true,
    configurable: true
  });

  MDCChip.attachTo = function (root) {
    return new MDCChip(root);
  };

  MDCChip.prototype.initialize = function (rippleFactory) {
    var _this = this;

    if (rippleFactory === void 0) {
      rippleFactory = function rippleFactory(el, foundation) {
        return new MDCRipple(el, foundation);
      };
    }

    this.leadingIcon_ = this.root_.querySelector(strings.LEADING_ICON_SELECTOR);
    this.trailingIcon_ = this.root_.querySelector(strings.TRAILING_ICON_SELECTOR);
    this.checkmark_ = this.root_.querySelector(strings.CHECKMARK_SELECTOR); // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.

    var rippleAdapter = _assign({}, MDCRipple.createAdapter(this), {
      computeBoundingRect: function computeBoundingRect() {
        return _this.foundation_.getDimensions();
      }
    });

    this.ripple_ = rippleFactory(this.root_, new MDCRippleFoundation(rippleAdapter));
  };

  MDCChip.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.handleInteraction_ = function (evt) {
      return _this.foundation_.handleInteraction(evt);
    };

    this.handleTransitionEnd_ = function (evt) {
      return _this.foundation_.handleTransitionEnd(evt);
    };

    this.handleTrailingIconInteraction_ = function (evt) {
      return _this.foundation_.handleTrailingIconInteraction(evt);
    };

    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.listen(evtType, _this.handleInteraction_);
    });
    this.listen('transitionend', this.handleTransitionEnd_);

    if (this.trailingIcon_) {
      INTERACTION_EVENTS.forEach(function (evtType) {
        _this.trailingIcon_.addEventListener(evtType, _this.handleTrailingIconInteraction_);
      });
    }
  };

  MDCChip.prototype.destroy = function () {
    var _this = this;

    this.ripple_.destroy();
    INTERACTION_EVENTS.forEach(function (evtType) {
      _this.unlisten(evtType, _this.handleInteraction_);
    });
    this.unlisten('transitionend', this.handleTransitionEnd_);

    if (this.trailingIcon_) {
      INTERACTION_EVENTS.forEach(function (evtType) {
        _this.trailingIcon_.removeEventListener(evtType, _this.handleTrailingIconInteraction_);
      });
    }

    _super.prototype.destroy.call(this);
  };
  /**
   * Begins the exit animation which leads to removal of the chip.
   */


  MDCChip.prototype.beginExit = function () {
    this.foundation_.beginExit();
  };

  MDCChip.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      addClass: function addClass(className) {
        return _this.root_.classList.add(className);
      },
      addClassToLeadingIcon: function addClassToLeadingIcon(className) {
        if (_this.leadingIcon_) {
          _this.leadingIcon_.classList.add(className);
        }
      },
      eventTargetHasClass: function eventTargetHasClass(target, className) {
        return target ? target.classList.contains(className) : false;
      },
      getCheckmarkBoundingClientRect: function getCheckmarkBoundingClientRect() {
        return _this.checkmark_ ? _this.checkmark_.getBoundingClientRect() : null;
      },
      getComputedStyleValue: function getComputedStyleValue(propertyName) {
        return window.getComputedStyle(_this.root_).getPropertyValue(propertyName);
      },
      getRootBoundingClientRect: function getRootBoundingClientRect() {
        return _this.root_.getBoundingClientRect();
      },
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      hasLeadingIcon: function hasLeadingIcon() {
        return !!_this.leadingIcon_;
      },
      notifyInteraction: function notifyInteraction() {
        return _this.emit(strings.INTERACTION_EVENT, {
          chipId: _this.id
        }, true
        /* shouldBubble */
        );
      },
      notifyRemoval: function notifyRemoval() {
        return _this.emit(strings.REMOVAL_EVENT, {
          chipId: _this.id,
          root: _this.root_
        }, true
        /* shouldBubble */
        );
      },
      notifySelection: function notifySelection(selected) {
        return _this.emit(strings.SELECTION_EVENT, {
          chipId: _this.id,
          selected: selected
        }, true
        /* shouldBubble */
        );
      },
      notifyTrailingIconInteraction: function notifyTrailingIconInteraction() {
        return _this.emit(strings.TRAILING_ICON_INTERACTION_EVENT, {
          chipId: _this.id
        }, true
        /* shouldBubble */
        );
      },
      removeClass: function removeClass(className) {
        return _this.root_.classList.remove(className);
      },
      removeClassFromLeadingIcon: function removeClassFromLeadingIcon(className) {
        if (_this.leadingIcon_) {
          _this.leadingIcon_.classList.remove(className);
        }
      },
      setAttr: function setAttr(attr, value) {
        return _this.root_.setAttribute(attr, value);
      },
      setStyleProperty: function setStyleProperty(propertyName, value) {
        return _this.root_.style.setProperty(propertyName, value);
      }
    };
    return new MDCChipFoundation(adapter);
  };

  return MDCChip;
}(MDCComponent);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings$1 = {
  CHIP_SELECTOR: '.mdc-chip'
};
var cssClasses$1 = {
  CHOICE: 'mdc-chip-set--choice',
  FILTER: 'mdc-chip-set--filter'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var MDCChipSetFoundation =
/** @class */
function (_super) {
  __extends(MDCChipSetFoundation, _super);

  function MDCChipSetFoundation(adapter) {
    var _this = _super.call(this, _assign({}, MDCChipSetFoundation.defaultAdapter, adapter)) || this;
    /**
     * The ids of the selected chips in the set. Only used for choice chip set or filter chip set.
     */


    _this.selectedChipIds_ = [];
    return _this;
  }

  Object.defineProperty(MDCChipSetFoundation, "strings", {
    get: function get() {
      return strings$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChipSetFoundation, "cssClasses", {
    get: function get() {
      return cssClasses$1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChipSetFoundation, "defaultAdapter", {
    get: function get() {
      return {
        hasClass: function hasClass() {
          return false;
        },
        removeChip: function removeChip() {
          return undefined;
        },
        setSelected: function setSelected() {
          return undefined;
        }
      };
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Returns an array of the IDs of all selected chips.
   */

  MDCChipSetFoundation.prototype.getSelectedChipIds = function () {
    return this.selectedChipIds_.slice();
  };
  /**
   * Selects the chip with the given id. Deselects all other chips if the chip set is of the choice variant.
   */


  MDCChipSetFoundation.prototype.select = function (chipId) {
    if (this.selectedChipIds_.indexOf(chipId) >= 0) {
      return;
    }

    if (this.adapter_.hasClass(cssClasses$1.CHOICE) && this.selectedChipIds_.length > 0) {
      var previouslySelectedChip = this.selectedChipIds_[0];
      this.selectedChipIds_.length = 0;
      this.adapter_.setSelected(previouslySelectedChip, false);
    }

    this.selectedChipIds_.push(chipId);
    this.adapter_.setSelected(chipId, true);
  };
  /**
   * Handles a chip interaction event
   */


  MDCChipSetFoundation.prototype.handleChipInteraction = function (chipId) {
    if (this.adapter_.hasClass(cssClasses$1.CHOICE) || this.adapter_.hasClass(cssClasses$1.FILTER)) {
      this.toggleSelect_(chipId);
    }
  };
  /**
   * Handles a chip selection event, used to handle discrepancy when selection state is set directly on the Chip.
   */


  MDCChipSetFoundation.prototype.handleChipSelection = function (chipId, selected) {
    var chipIsSelected = this.selectedChipIds_.indexOf(chipId) >= 0;

    if (selected && !chipIsSelected) {
      this.select(chipId);
    } else if (!selected && chipIsSelected) {
      this.deselect_(chipId);
    }
  };
  /**
   * Handles the event when a chip is removed.
   */


  MDCChipSetFoundation.prototype.handleChipRemoval = function (chipId) {
    this.deselect_(chipId);
    this.adapter_.removeChip(chipId);
  };
  /**
   * Deselects the chip with the given id.
   */


  MDCChipSetFoundation.prototype.deselect_ = function (chipId) {
    var index = this.selectedChipIds_.indexOf(chipId);

    if (index >= 0) {
      this.selectedChipIds_.splice(index, 1);
      this.adapter_.setSelected(chipId, false);
    }
  };
  /**
   * Toggles selection of the chip with the given id.
   */


  MDCChipSetFoundation.prototype.toggleSelect_ = function (chipId) {
    if (this.selectedChipIds_.indexOf(chipId) >= 0) {
      this.deselect_(chipId);
    } else {
      this.select(chipId);
    }
  };

  return MDCChipSetFoundation;
}(MDCFoundation);

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var _a = MDCChipFoundation.strings,
    INTERACTION_EVENT = _a.INTERACTION_EVENT,
    SELECTION_EVENT = _a.SELECTION_EVENT,
    REMOVAL_EVENT = _a.REMOVAL_EVENT;
var CHIP_SELECTOR = MDCChipSetFoundation.strings.CHIP_SELECTOR;
var idCounter = 0;

var MDCChipSet =
/** @class */
function (_super) {
  __extends(MDCChipSet, _super);

  function MDCChipSet() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MDCChipSet.attachTo = function (root) {
    return new MDCChipSet(root);
  };

  Object.defineProperty(MDCChipSet.prototype, "chips", {
    get: function get() {
      return this.chips_.slice();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MDCChipSet.prototype, "selectedChipIds", {
    /**
     * @return An array of the IDs of all selected chips.
     */
    get: function get() {
      return this.foundation_.getSelectedChipIds();
    },
    enumerable: true,
    configurable: true
  });
  /**
   * @param chipFactory A function which creates a new MDCChip.
   */

  MDCChipSet.prototype.initialize = function (chipFactory) {
    if (chipFactory === void 0) {
      chipFactory = function chipFactory(el) {
        return new MDCChip(el);
      };
    }

    this.chipFactory_ = chipFactory;
    this.chips_ = this.instantiateChips_(this.chipFactory_);
  };

  MDCChipSet.prototype.initialSyncWithDOM = function () {
    var _this = this;

    this.chips_.forEach(function (chip) {
      if (chip.id && chip.selected) {
        _this.foundation_.select(chip.id);
      }
    });

    this.handleChipInteraction_ = function (evt) {
      return _this.foundation_.handleChipInteraction(evt.detail.chipId);
    };

    this.handleChipSelection_ = function (evt) {
      return _this.foundation_.handleChipSelection(evt.detail.chipId, evt.detail.selected);
    };

    this.handleChipRemoval_ = function (evt) {
      return _this.foundation_.handleChipRemoval(evt.detail.chipId);
    };

    this.listen(INTERACTION_EVENT, this.handleChipInteraction_);
    this.listen(SELECTION_EVENT, this.handleChipSelection_);
    this.listen(REMOVAL_EVENT, this.handleChipRemoval_);
  };

  MDCChipSet.prototype.destroy = function () {
    this.chips_.forEach(function (chip) {
      chip.destroy();
    });
    this.unlisten(INTERACTION_EVENT, this.handleChipInteraction_);
    this.unlisten(SELECTION_EVENT, this.handleChipSelection_);
    this.unlisten(REMOVAL_EVENT, this.handleChipRemoval_);

    _super.prototype.destroy.call(this);
  };
  /**
   * Adds a new chip object to the chip set from the given chip element.
   */


  MDCChipSet.prototype.addChip = function (chipEl) {
    chipEl.id = chipEl.id || "mdc-chip-" + ++idCounter;
    this.chips_.push(this.chipFactory_(chipEl));
  };

  MDCChipSet.prototype.getDefaultFoundation = function () {
    var _this = this; // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.


    var adapter = {
      hasClass: function hasClass(className) {
        return _this.root_.classList.contains(className);
      },
      removeChip: function removeChip(chipId) {
        var index = _this.findChipIndex_(chipId);

        if (index >= 0) {
          _this.chips_[index].destroy();

          _this.chips_.splice(index, 1);
        }
      },
      setSelected: function setSelected(chipId, selected) {
        var index = _this.findChipIndex_(chipId);

        if (index >= 0) {
          _this.chips_[index].selected = selected;
        }
      }
    };
    return new MDCChipSetFoundation(adapter);
  };
  /**
   * Instantiates chip components on all of the chip set's child chip elements.
   */


  MDCChipSet.prototype.instantiateChips_ = function (chipFactory) {
    var chipElements = [].slice.call(this.root_.querySelectorAll(CHIP_SELECTOR));
    return chipElements.map(function (el) {
      el.id = el.id || "mdc-chip-" + ++idCounter;
      return chipFactory(el);
    });
  };
  /**
   * Returns the index of the chip with the given id, or -1 if the chip does not exist.
   */


  MDCChipSet.prototype.findChipIndex_ = function (chipId) {
    for (var i = 0; i < this.chips_.length; i++) {
      if (this.chips_[i].id === chipId) {
        return i;
      }
    }

    return -1;
  };

  return MDCChipSet;
}(MDCComponent);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$3 = "node_modules/@smui/chips/Chip.svelte";

function create_fragment$3(ctx) {
  var div;
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var default_slot_template =
  /*$$slots*/
  ctx[13].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[12], null);
  var div_levels = [{
    class: "\n    mdc-chip\n    " +
    /*className*/
    ctx[2] + "\n    " + (
    /*selected*/
    ctx[0] ? "mdc-chip--selected" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[6], ["use", "class", "ripple", "selected", "shouldRemoveOnTrailingIconClick"])];
  var div_data = {};

  for (var i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }

  var block = {
    c: function create() {
      div = element("div");
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      if (default_slot) default_slot.l(div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$3, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      if (default_slot) {
        default_slot.m(div, null);
      }
      /*div_binding*/


      ctx[14](div);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[1])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[4].call(null, div)), listen_dev(div, "MDCChip:selection",
      /*handleSelection*/
      ctx[5], false, false, false)];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope*/
        4096) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[12], null), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[12], dirty, null));
        }
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, selected*/
      5 && {
        class: "\n    mdc-chip\n    " +
        /*className*/
        ctx[2] + "\n    " + (
        /*selected*/
        ctx[0] ? "mdc-chip--selected" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      64 && exclude(
      /*$$props*/
      ctx[6], ["use", "class", "ripple", "selected", "shouldRemoveOnTrailingIconClick"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      if (default_slot) default_slot.d(detaching);
      /*div_binding*/

      ctx[14](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$3.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$3($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCChip:interaction", "MDCChip:selection", "MDCChip:removal", "MDCChip:trailingIconInteraction"]);
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$ripple = _$$props3.ripple,
      ripple = _$$props3$ripple === void 0 ? true : _$$props3$ripple;
  var _$$props4 = $$props,
      _$$props4$selected = _$$props4.selected,
      selected = _$$props4$selected === void 0 ? false : _$$props4$selected;
  var _$$props5 = $$props,
      _$$props5$shouldRemov = _$$props5.shouldRemoveOnTrailingIconClick,
      shouldRemoveOnTrailingIconClick = _$$props5$shouldRemov === void 0 ? true : _$$props5$shouldRemov;
  setContext("SMUI:label:context", "chip");
  setContext("SMUI:icon:context", "chip");
  var element;
  var chip;
  var previousSelected = selected;
  onMount(function () {
    $$invalidate(3, element.setChip = setChip, element);
  });

  function setChip(component) {
    $$invalidate(9, chip = component);

    if (!ripple) {
      chip.ripple && chip.ripple.destroy();
    }
  }

  function handleSelection(e) {
    $$invalidate(0, selected = e.detail.selected);
  }

  var _$$props6 = $$props,
      _$$props6$$$slots = _$$props6.$$slots,
      $$slots = _$$props6$$$slots === void 0 ? {} : _$$props6$$$slots,
      $$scope = _$$props6.$$scope;
  validate_slots("Chip", $$slots, ['default']);

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(3, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("ripple" in $$new_props) $$invalidate(7, ripple = $$new_props.ripple);
    if ("selected" in $$new_props) $$invalidate(0, selected = $$new_props.selected);
    if ("shouldRemoveOnTrailingIconClick" in $$new_props) $$invalidate(8, shouldRemoveOnTrailingIconClick = $$new_props.shouldRemoveOnTrailingIconClick);
    if ("$$scope" in $$new_props) $$invalidate(12, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCChip: MDCChip,
      onMount: onMount,
      setContext: setContext,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      ripple: ripple,
      selected: selected,
      shouldRemoveOnTrailingIconClick: shouldRemoveOnTrailingIconClick,
      element: element,
      chip: chip,
      previousSelected: previousSelected,
      setChip: setChip,
      handleSelection: handleSelection
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("ripple" in $$props) $$invalidate(7, ripple = $$new_props.ripple);
    if ("selected" in $$props) $$invalidate(0, selected = $$new_props.selected);
    if ("shouldRemoveOnTrailingIconClick" in $$props) $$invalidate(8, shouldRemoveOnTrailingIconClick = $$new_props.shouldRemoveOnTrailingIconClick);
    if ("element" in $$props) $$invalidate(3, element = $$new_props.element);
    if ("chip" in $$props) $$invalidate(9, chip = $$new_props.chip);
    if ("previousSelected" in $$props) $$invalidate(10, previousSelected = $$new_props.previousSelected);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*chip, previousSelected, selected*/
    1537) {
       if (chip && previousSelected !== selected) {
        if (selected !== chip.selected) {
          $$invalidate(9, chip.selected = selected, chip);
        }

        $$invalidate(10, previousSelected = selected);
      }
    }

    if ($$self.$$.dirty &
    /*chip, shouldRemoveOnTrailingIconClick*/
    768) {
       if (chip && chip.shouldRemoveOnTrailingIconClick !== shouldRemoveOnTrailingIconClick) {
        $$invalidate(9, chip.shouldRemoveOnTrailingIconClick = shouldRemoveOnTrailingIconClick, chip);
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [selected, use, className, element, forwardEvents, handleSelection, $$props, ripple, shouldRemoveOnTrailingIconClick, chip, previousSelected, setChip, $$scope, $$slots, div_binding];
}

var Chip = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Chip, _SvelteComponentDev);

  var _super = _createSuper$3(Chip);

  function Chip(options) {
    var _this;

    _classCallCheck(this, Chip);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, {
      use: 1,
      class: 2,
      ripple: 7,
      selected: 0,
      shouldRemoveOnTrailingIconClick: 8
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Chip",
      options: options,
      id: create_fragment$3.name
    });
    return _this;
  }

  _createClass(Chip, [{
    key: "use",
    get: function get() {
      throw new Error("<Chip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Chip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Chip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Chip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "ripple",
    get: function get() {
      throw new Error("<Chip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Chip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Chip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Chip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "shouldRemoveOnTrailingIconClick",
    get: function get() {
      throw new Error("<Chip>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Chip>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Chip;
}(SvelteComponentDev);

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$4 = "node_modules/@smui/chips/Set.svelte";

var get_default_slot_changes = function get_default_slot_changes(dirty) {
  return {
    chip: dirty &
    /*chips*/
    1
  };
};

var get_default_slot_context = function get_default_slot_context(ctx) {
  return {
    chip:
    /*chip*/
    ctx[20]
  };
};

function get_each_context(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  child_ctx[22] = i;
  return child_ctx;
} // (16:2) {#each chips as chip, i (key(chip))}


function create_each_block(key_2, ctx) {
  var first;
  var current;
  var default_slot_template =
  /*$$slots*/
  ctx[18].default;
  var default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[17], get_default_slot_context);
  var block = {
    key: key_2,
    first: null,
    c: function create() {
      first = empty();
      if (default_slot) default_slot.c();
      this.h();
    },
    l: function claim(nodes) {
      first = empty();
      if (default_slot) default_slot.l(nodes);
      this.h();
    },
    h: function hydrate() {
      this.first = first;
    },
    m: function mount(target, anchor) {
      insert_dev(target, first, anchor);

      if (default_slot) {
        default_slot.m(target, anchor);
      }

      current = true;
    },
    p: function update(ctx, dirty) {
      if (default_slot) {
        if (default_slot.p && dirty &
        /*$$scope, chips*/
        131073) {
          default_slot.p(get_slot_context(default_slot_template, ctx,
          /*$$scope*/
          ctx[17], get_default_slot_context), get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[17], dirty, get_default_slot_changes));
        }
      }
    },
    i: function intro(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(first);
      if (default_slot) default_slot.d(detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block.name,
    type: "each",
    source: "(16:2) {#each chips as chip, i (key(chip))}",
    ctx: ctx
  });
  return block;
}

function create_fragment$4(ctx) {
  var div;
  var each_blocks = [];
  var each_1_lookup = new Map();
  var useActions_action;
  var forwardEvents_action;
  var current;
  var dispose;
  var each_value =
  /*chips*/
  ctx[0];
  validate_each_argument(each_value);

  var get_key = function get_key(ctx) {
    return (
      /*key*/
      ctx[3](
      /*chip*/
      ctx[20])
    );
  };

  validate_each_keys(ctx, each_value, get_each_context, get_key);

  for (var i = 0; i < each_value.length; i += 1) {
    var child_ctx = get_each_context(ctx, each_value, i);
    var key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }

  var div_levels = [{
    class: "\n    mdc-chip-set\n    " +
    /*className*/
    ctx[2] + "\n    " + (
    /*choice*/
    ctx[4] ? "mdc-chip-set--choice" : "") + "\n    " + (
    /*filter*/
    ctx[5] ? "mdc-chip-set--filter" : "") + "\n    " + (
    /*input*/
    ctx[6] ? "mdc-chip-set--input" : "") + "\n  "
  }, exclude(
  /*$$props*/
  ctx[11], ["use", "class", "chips", "key", "selected", "choice", "filter", "input"])];
  var div_data = {};

  for (var _i = 0; _i < div_levels.length; _i += 1) {
    div_data = assign(div_data, div_levels[_i]);
  }

  var block = {
    c: function create() {
      div = element("div");

      for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
        each_blocks[_i2].c();
      }

      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].l(div_nodes);
      }

      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      set_attributes(div, div_data);
      add_location(div, file$4, 0, 0, 0);
    },
    m: function mount(target, anchor, remount) {
      insert_dev(target, div, anchor);

      for (var _i4 = 0; _i4 < each_blocks.length; _i4 += 1) {
        each_blocks[_i4].m(div, null);
      }
      /*div_binding*/


      ctx[19](div);
      current = true;
      if (remount) run_all(dispose);
      dispose = [action_destroyer(useActions_action = useActions.call(null, div,
      /*use*/
      ctx[1])), action_destroyer(forwardEvents_action =
      /*forwardEvents*/
      ctx[8].call(null, div)), listen_dev(div, "MDCChip:removal",
      /*handleRemoval*/
      ctx[10], false, false, false), listen_dev(div, "MDCChip:selection",
      /*handleSelection*/
      ctx[9], false, false, false)];
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*$$scope, chips*/
      131073) {
        var _each_value =
        /*chips*/
        ctx[0];
        validate_each_argument(_each_value);
        group_outros();
        validate_each_keys(ctx, _each_value, get_each_context, get_key);
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, _each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, null, get_each_context);
        check_outros();
      }

      set_attributes(div, get_spread_update(div_levels, [dirty &
      /*className, choice, filter, input*/
      116 && {
        class: "\n    mdc-chip-set\n    " +
        /*className*/
        ctx[2] + "\n    " + (
        /*choice*/
        ctx[4] ? "mdc-chip-set--choice" : "") + "\n    " + (
        /*filter*/
        ctx[5] ? "mdc-chip-set--filter" : "") + "\n    " + (
        /*input*/
        ctx[6] ? "mdc-chip-set--input" : "") + "\n  "
      }, dirty &
      /*exclude, $$props*/
      2048 && exclude(
      /*$$props*/
      ctx[11], ["use", "class", "chips", "key", "selected", "choice", "filter", "input"])]));
      if (useActions_action && is_function(useActions_action.update) && dirty &
      /*use*/
      2) useActions_action.update.call(null,
      /*use*/
      ctx[1]);
    },
    i: function intro(local) {
      if (current) return;

      for (var _i5 = 0; _i5 < each_value.length; _i5 += 1) {
        transition_in(each_blocks[_i5]);
      }

      current = true;
    },
    o: function outro(local) {
      for (var _i6 = 0; _i6 < each_blocks.length; _i6 += 1) {
        transition_out(each_blocks[_i6]);
      }

      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].d();
      }
      /*div_binding*/


      ctx[19](null);
      run_all(dispose);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$4.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$4($$self, $$props, $$invalidate) {
  var forwardEvents = forwardEventsBuilder(get_current_component());
  var _$$props = $$props,
      _$$props$use = _$$props.use,
      use = _$$props$use === void 0 ? [] : _$$props$use;
  var _$$props2 = $$props,
      _$$props2$class = _$$props2.class,
      className = _$$props2$class === void 0 ? "" : _$$props2$class;
  var _$$props3 = $$props,
      _$$props3$chips = _$$props3.chips,
      chips = _$$props3$chips === void 0 ? [] : _$$props3$chips;
  var _$$props4 = $$props,
      _$$props4$key = _$$props4.key,
      key = _$$props4$key === void 0 ? function (chip) {
    return chip;
  } : _$$props4$key;
  var _$$props5 = $$props,
      _$$props5$selected = _$$props5.selected,
      selected = _$$props5$selected === void 0 ? null : _$$props5$selected;
  var _$$props6 = $$props,
      _$$props6$choice = _$$props6.choice,
      choice = _$$props6$choice === void 0 ? false : _$$props6$choice;
  var _$$props7 = $$props,
      _$$props7$filter = _$$props7.filter,
      filter = _$$props7$filter === void 0 ? false : _$$props7$filter;
  var _$$props8 = $$props,
      _$$props8$input = _$$props8.input,
      input = _$$props8$input === void 0 ? false : _$$props8$input;
  var element;
  var chipSet;
  onMount(function () {
    $$invalidate(13, chipSet = new MDCChipSet(element));

    for (var i = 0; i < element.children.length; i++) {
      element.children[i].setChip(chipSet.chips[i]);
    }
  });
  onDestroy(function () {
    chipSet && chipSet.destroy();
  });
  var previousChipsLength = chips.length;
  afterUpdate(function () {
    if (previousChipsLength !== chips.length) {
      while (previousChipsLength < chips.length) {
        chipSet.addChip(element.children[previousChipsLength]);
        element.children[previousChipsLength].setChip(chipSet.chips[previousChipsLength]);
        previousChipsLength++;
      }

      previousChipsLength = chips.length;
    }
  });
  var selectedRaf;

  function handleSelection(e) {
    if (selectedRaf) {
      window.cancelAnimationFrame(selectedRaf);
    }

    selectedRaf = window.requestAnimationFrame(updateSelected);
  }

  function updateSelected() {
    if (!chipSet) {
      return;
    }

    if (choice) {
      if (!chipSet.selectedChipIds.length) {
        $$invalidate(12, selected = null);
        return;
      }

      for (var i = 0; i < chipSet.chips.length; i++) {
        if (chipSet.chips[i].id === chipSet.selectedChipIds[0]) {
          $$invalidate(12, selected = chips[i]);
          return;
        }
      }

      $$invalidate(12, selected = null);
    } else {
      if (!Array.isArray(selected)) {
        $$invalidate(12, selected = []);
      }

      selected.splice(0, selected.length);

      for (var _i8 = 0; _i8 < chipSet.chips.length; _i8++) {
        if (chipSet.selectedChipIds.indexOf(chipSet.chips[_i8].id) !== -1) {
          selected.push(chips[_i8]);
        }
      }

      $$invalidate(12, selected);
    }
  }

  function handleRemoval(e) {
    var i = 0;
    var el = e.detail.root;

    while (el.previousSibling) {
      el = el.previousSibling;

      if (el.nodeType === 1) {
        i++;
      }
    }

    chips.splice(i, 1);
    $$invalidate(0, chips);
  }

  var _$$props9 = $$props,
      _$$props9$$$slots = _$$props9.$$slots,
      $$slots = _$$props9$$$slots === void 0 ? {} : _$$props9$$$slots,
      $$scope = _$$props9.$$scope;
  validate_slots("Set", $$slots, ['default']);

  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](function () {
      $$invalidate(7, element = $$value);
    });
  }

  $$self.$set = function ($$new_props) {
    $$invalidate(11, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
    if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    if ("chips" in $$new_props) $$invalidate(0, chips = $$new_props.chips);
    if ("key" in $$new_props) $$invalidate(3, key = $$new_props.key);
    if ("selected" in $$new_props) $$invalidate(12, selected = $$new_props.selected);
    if ("choice" in $$new_props) $$invalidate(4, choice = $$new_props.choice);
    if ("filter" in $$new_props) $$invalidate(5, filter = $$new_props.filter);
    if ("input" in $$new_props) $$invalidate(6, input = $$new_props.input);
    if ("$$scope" in $$new_props) $$invalidate(17, $$scope = $$new_props.$$scope);
  };

  $$self.$capture_state = function () {
    return {
      MDCChipSet: MDCChipSet,
      onMount: onMount,
      onDestroy: onDestroy,
      afterUpdate: afterUpdate,
      get_current_component: get_current_component,
      forwardEventsBuilder: forwardEventsBuilder,
      exclude: exclude,
      useActions: useActions,
      forwardEvents: forwardEvents,
      use: use,
      className: className,
      chips: chips,
      key: key,
      selected: selected,
      choice: choice,
      filter: filter,
      input: input,
      element: element,
      chipSet: chipSet,
      previousChipsLength: previousChipsLength,
      selectedRaf: selectedRaf,
      handleSelection: handleSelection,
      updateSelected: updateSelected,
      handleRemoval: handleRemoval
    };
  };

  $$self.$inject_state = function ($$new_props) {
    $$invalidate(11, $$props = assign(assign({}, $$props), $$new_props));
    if ("use" in $$props) $$invalidate(1, use = $$new_props.use);
    if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    if ("chips" in $$props) $$invalidate(0, chips = $$new_props.chips);
    if ("key" in $$props) $$invalidate(3, key = $$new_props.key);
    if ("selected" in $$props) $$invalidate(12, selected = $$new_props.selected);
    if ("choice" in $$props) $$invalidate(4, choice = $$new_props.choice);
    if ("filter" in $$props) $$invalidate(5, filter = $$new_props.filter);
    if ("input" in $$props) $$invalidate(6, input = $$new_props.input);
    if ("element" in $$props) $$invalidate(7, element = $$new_props.element);
    if ("chipSet" in $$props) $$invalidate(13, chipSet = $$new_props.chipSet);
    if ("previousChipsLength" in $$props) previousChipsLength = $$new_props.previousChipsLength;
    if ("selectedRaf" in $$props) selectedRaf = $$new_props.selectedRaf;
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  $$self.$$.update = function () {
    if ($$self.$$.dirty &
    /*chipSet, choice, selected, chips*/
    12305) {
      // Update the MDCChip when the selection changes.
       if (chipSet) {
        if (choice) {
          if (selected !== null) {
            // Find the selected item.
            var i;

            for (i = 0; i < chips.length; i++) {
              if (selected === chips[i]) {
                break;
              }
            }

            for (var j = 0; j < chipSet.chips.length; j++) {
              if (chipSet.chips[j].selected !== (j === i)) {
                $$invalidate(13, chipSet.chips[j].selected = j === i, chipSet);
              }
            }
          } else {
            for (var _i9 = 0; _i9 < chipSet.chips.length; _i9++) {
              if (chipSet.chips[_i9].selected) {
                $$invalidate(13, chipSet.chips[_i9].selected = false, chipSet);
              }
            }
          }
        } else if (Array.isArray(selected)) {
          for (var _i10 = 0; _i10 < chipSet.chips.length; _i10++) {
            var sel = selected.indexOf(chips[_i10]) !== -1;

            if (chipSet.chips[_i10].selected !== sel) {
              $$invalidate(13, chipSet.chips[_i10].selected = sel, chipSet);
            }
          }
        }
      }
    }
  };

  $$props = exclude_internal_props($$props);
  return [chips, use, className, key, choice, filter, input, element, forwardEvents, handleSelection, handleRemoval, $$props, selected, chipSet, previousChipsLength, selectedRaf, updateSelected, $$scope, $$slots, div_binding];
}

var Set = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Set, _SvelteComponentDev);

  var _super = _createSuper$4(Set);

  function Set(options) {
    var _this;

    _classCallCheck(this, Set);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, {
      use: 1,
      class: 2,
      chips: 0,
      key: 3,
      selected: 12,
      choice: 4,
      filter: 5,
      input: 6
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Set",
      options: options,
      id: create_fragment$4.name
    });
    return _this;
  }

  _createClass(Set, [{
    key: "use",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "class",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "chips",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "key",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "selected",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "choice",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "filter",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }, {
    key: "input",
    get: function get() {
      throw new Error("<Set>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<Set>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return Set;
}(SvelteComponentDev);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$5 = "src/components/ProjectCard.svelte"; // (43:6) <Media>

function create_default_slot_6(ctx) {
  var a;
  var img;
  var img_src_value;
  var img_alt_value;
  var a_href_value;
  var a_title_value;
  var block = {
    c: function create() {
      a = element("a");
      img = element("img");
      this.h();
    },
    l: function claim(nodes) {
      a = claim_element(nodes, "A", {
        class: true,
        href: true,
        title: true,
        target: true
      });
      var a_nodes = children(a);
      img = claim_element(a_nodes, "IMG", {
        src: true,
        alt: true,
        loading: true,
        class: true
      });
      a_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      if (img.src !== (img_src_value = "Images/".concat(
      /*project*/
      ctx[0].img))) attr_dev(img, "src", img_src_value);
      attr_dev(img, "alt", img_alt_value = "".concat(
      /*project*/
      ctx[0].title, " screenshot"));
      attr_dev(img, "loading", "lazy");
      attr_dev(img, "class", "svelte-i4xof9");
      add_location(img, file$5, 48, 10, 862);
      attr_dev(a, "class", "project-webpage svelte-i4xof9");
      attr_dev(a, "href", a_href_value =
      /*project*/
      ctx[0].url);
      attr_dev(a, "title", a_title_value = "See ".concat(
      /*project*/
      ctx[0].title));
      attr_dev(a, "target", "_blank");
      add_location(a, file$5, 43, 8, 716);
    },
    m: function mount(target, anchor) {
      insert_dev(target, a, anchor);
      append_dev(a, img);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*project*/
      1 && img.src !== (img_src_value = "Images/".concat(
      /*project*/
      ctx[0].img))) {
        attr_dev(img, "src", img_src_value);
      }

      if (dirty &
      /*project*/
      1 && img_alt_value !== (img_alt_value = "".concat(
      /*project*/
      ctx[0].title, " screenshot"))) {
        attr_dev(img, "alt", img_alt_value);
      }

      if (dirty &
      /*project*/
      1 && a_href_value !== (a_href_value =
      /*project*/
      ctx[0].url)) {
        attr_dev(a, "href", a_href_value);
      }

      if (dirty &
      /*project*/
      1 && a_title_value !== (a_title_value = "See ".concat(
      /*project*/
      ctx[0].title))) {
        attr_dev(a, "title", a_title_value);
      }
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(a);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_6.name,
    type: "slot",
    source: "(43:6) <Media>",
    ctx: ctx
  });
  return block;
} // (42:4) <PrimaryAction>


function create_default_slot_5(ctx) {
  var current;
  var media = new Media({
    props: {
      $$slots: {
        default: [create_default_slot_6]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(media.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(media.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(media, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var media_changes = {};

      if (dirty &
      /*$$scope, project*/
      5) {
        media_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      media.$set(media_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(media.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(media.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(media, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_5.name,
    type: "slot",
    source: "(42:4) <PrimaryAction>",
    ctx: ctx
  });
  return block;
} // (59:14) <Text>


function create_default_slot_4(ctx) {
  var t_value =
  /*chip*/
  ctx[1] + "";
  var t;
  var block = {
    c: function create() {
      t = text(t_value);
    },
    l: function claim(nodes) {
      t = claim_text(nodes, t_value);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t, anchor);
    },
    p: function update(ctx, dirty) {
      if (dirty &
      /*chip*/
      2 && t_value !== (t_value =
      /*chip*/
      ctx[1] + "")) set_data_dev(t, t_value);
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_4.name,
    type: "slot",
    source: "(59:14) <Text>",
    ctx: ctx
  });
  return block;
} // (59:8) <Chip>


function create_default_slot_3(ctx) {
  var current;
  var text_1 = new Label({
    props: {
      $$slots: {
        default: [create_default_slot_4]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(text_1.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(text_1.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(text_1, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var text_1_changes = {};

      if (dirty &
      /*$$scope, chip*/
      6) {
        text_1_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      text_1.$set(text_1_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(text_1.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(text_1.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(text_1, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_3.name,
    type: "slot",
    source: "(59:8) <Chip>",
    ctx: ctx
  });
  return block;
} // (58:6) <Set chips={project.tags} let:chip>


function create_default_slot_2(ctx) {
  var current;
  var chip = new Chip({
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
      create_component(chip.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(chip.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(chip, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      var chip_changes = {};

      if (dirty &
      /*$$scope, chip*/
      6) {
        chip_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      chip.$set(chip_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(chip.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(chip.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(chip, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_2.name,
    type: "slot",
    source: "(58:6) <Set chips={project.tags} let:chip>",
    ctx: ctx
  });
  return block;
} // (56:4) <Content>


function create_default_slot_1(ctx) {
  var p;
  var t0_value =
  /*project*/
  ctx[0].description + "";
  var t0;
  var t1;
  var current;
  var set = new Set({
    props: {
      chips:
      /*project*/
      ctx[0].tags,
      $$slots: {
        default: [create_default_slot_2, function (_ref) {
          var chip = _ref.chip;
          return {
            1: chip
          };
        }, function (_ref2) {
          var chip = _ref2.chip;
          return chip ? 2 : 0;
        }]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      p = element("p");
      t0 = text(t0_value);
      t1 = space();
      create_component(set.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      p = claim_element(nodes, "P", {
        class: true
      });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, t0_value);
      p_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      claim_component(set.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(p, "class", "svelte-i4xof9");
      add_location(p, file$5, 56, 6, 1051);
    },
    m: function mount(target, anchor) {
      insert_dev(target, p, anchor);
      append_dev(p, t0);
      insert_dev(target, t1, anchor);
      mount_component(set, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*project*/
      1) && t0_value !== (t0_value =
      /*project*/
      ctx[0].description + "")) set_data_dev(t0, t0_value);
      var set_changes = {};
      if (dirty &
      /*project*/
      1) set_changes.chips =
      /*project*/
      ctx[0].tags;

      if (dirty &
      /*$$scope, chip*/
      6) {
        set_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      set.$set(set_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(set.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(set.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(p);
      if (detaching) detach_dev(t1);
      destroy_component(set, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot_1.name,
    type: "slot",
    source: "(56:4) <Content>",
    ctx: ctx
  });
  return block;
} // (40:2) <Card class="card-itself">


function create_default_slot(ctx) {
  var h1;
  var t0_value =
  /*project*/
  ctx[0].title + "";
  var t0;
  var t1;
  var t2;
  var current;
  var primaryaction = new PrimaryAction({
    props: {
      $$slots: {
        default: [create_default_slot_5]
      },
      $$scope: {
        ctx: ctx
      }
    },
    $$inline: true
  });
  var content = new Content({
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
      h1 = element("h1");
      t0 = text(t0_value);
      t1 = space();
      create_component(primaryaction.$$.fragment);
      t2 = space();
      create_component(content.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      h1 = claim_element(nodes, "H1", {
        class: true
      });
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, t0_value);
      h1_nodes.forEach(detach_dev);
      t1 = claim_space(nodes);
      claim_component(primaryaction.$$.fragment, nodes);
      t2 = claim_space(nodes);
      claim_component(content.$$.fragment, nodes);
      this.h();
    },
    h: function hydrate() {
      attr_dev(h1, "class", "project-title svelte-i4xof9");
      add_location(h1, file$5, 40, 4, 627);
    },
    m: function mount(target, anchor) {
      insert_dev(target, h1, anchor);
      append_dev(h1, t0);
      insert_dev(target, t1, anchor);
      mount_component(primaryaction, target, anchor);
      insert_dev(target, t2, anchor);
      mount_component(content, target, anchor);
      current = true;
    },
    p: function update(ctx, dirty) {
      if ((!current || dirty &
      /*project*/
      1) && t0_value !== (t0_value =
      /*project*/
      ctx[0].title + "")) set_data_dev(t0, t0_value);
      var primaryaction_changes = {};

      if (dirty &
      /*$$scope, project*/
      5) {
        primaryaction_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      primaryaction.$set(primaryaction_changes);
      var content_changes = {};

      if (dirty &
      /*$$scope, project*/
      5) {
        content_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      content.$set(content_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(primaryaction.$$.fragment, local);
      transition_in(content.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(primaryaction.$$.fragment, local);
      transition_out(content.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(h1);
      if (detaching) detach_dev(t1);
      destroy_component(primaryaction, detaching);
      if (detaching) detach_dev(t2);
      destroy_component(content, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_default_slot.name,
    type: "slot",
    source: "(40:2) <Card class=\\\"card-itself\\\">",
    ctx: ctx
  });
  return block;
}

function create_fragment$5(ctx) {
  var div;
  var current;
  var card = new Card({
    props: {
      class: "card-itself",
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
      div = element("div");
      create_component(card.$$.fragment);
      this.h();
    },
    l: function claim(nodes) {
      div = claim_element(nodes, "DIV", {
        class: true
      });
      var div_nodes = children(div);
      claim_component(card.$$.fragment, div_nodes);
      div_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      attr_dev(div, "class", "project-card svelte-i4xof9");
      add_location(div, file$5, 38, 0, 567);
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      mount_component(card, div, null);
      current = true;
    },
    p: function update(ctx, _ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          dirty = _ref4[0];

      var card_changes = {};

      if (dirty &
      /*$$scope, project*/
      5) {
        card_changes.$$scope = {
          dirty: dirty,
          ctx: ctx
        };
      }

      card.$set(card_changes);
    },
    i: function intro(local) {
      if (current) return;
      transition_in(card.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(card.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(div);
      destroy_component(card);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$5.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$5($$self, $$props, $$invalidate) {
  var _$$props$project = $$props.project,
      project = _$$props$project === void 0 ? {
    title: "",
    url: "",
    img: "",
    description: "",
    tags: []
  } : _$$props$project;
  var writable_props = ["project"];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<ProjectCard> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("ProjectCard", $$slots, []);

  $$self.$set = function ($$props) {
    if ("project" in $$props) $$invalidate(0, project = $$props.project);
  };

  $$self.$capture_state = function () {
    return {
      Card: Card,
      Content: Content,
      Media: Media,
      MediaContent: MediaContent,
      PrimaryAction: PrimaryAction,
      Chip: Chip,
      Set: Set,
      Text: Label,
      project: project
    };
  };

  $$self.$inject_state = function ($$props) {
    if ("project" in $$props) $$invalidate(0, project = $$props.project);
  };

  if ($$props && "$$inject" in $$props) {
    $$self.$inject_state($$props.$$inject);
  }

  return [project];
}

var ProjectCard = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(ProjectCard, _SvelteComponentDev);

  var _super = _createSuper$5(ProjectCard);

  function ProjectCard(options) {
    var _this;

    _classCallCheck(this, ProjectCard);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, {
      project: 0
    });
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "ProjectCard",
      options: options,
      id: create_fragment$5.name
    });
    return _this;
  }

  _createClass(ProjectCard, [{
    key: "project",
    get: function get() {
      throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    },
    set: function set(value) {
      throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    }
  }]);

  return ProjectCard;
}(SvelteComponentDev);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var file$6 = "src/routes/projects/index.svelte";

function get_each_context$1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[0] = list[i];
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  var child_ctx = ctx.slice();
  child_ctx[0] = list[i];
  return child_ctx;
} // (40:4) {#each WorkProjects as project}


function create_each_block_1(ctx) {
  var current;
  var projectcard = new ProjectCard({
    props: {
      project:
      /*project*/
      ctx[0]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(projectcard.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(projectcard.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(projectcard, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(projectcard.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(projectcard.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(projectcard, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block_1.name,
    type: "each",
    source: "(40:4) {#each WorkProjects as project}",
    ctx: ctx
  });
  return block;
} // (51:4) {#each FELprojects as project}


function create_each_block$1(ctx) {
  var current;
  var projectcard = new ProjectCard({
    props: {
      project:
      /*project*/
      ctx[0]
    },
    $$inline: true
  });
  var block = {
    c: function create() {
      create_component(projectcard.$$.fragment);
    },
    l: function claim(nodes) {
      claim_component(projectcard.$$.fragment, nodes);
    },
    m: function mount(target, anchor) {
      mount_component(projectcard, target, anchor);
      current = true;
    },
    p: noop,
    i: function intro(local) {
      if (current) return;
      transition_in(projectcard.$$.fragment, local);
      current = true;
    },
    o: function outro(local) {
      transition_out(projectcard.$$.fragment, local);
      current = false;
    },
    d: function destroy(detaching) {
      destroy_component(projectcard, detaching);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_each_block$1.name,
    type: "each",
    source: "(51:4) {#each FELprojects as project}",
    ctx: ctx
  });
  return block;
}

function create_fragment$6(ctx) {
  var t0;
  var main;
  var h10;
  var t1;
  var t2;
  var hr0;
  var t3;
  var p0;
  var t4;
  var t5;
  var div0;
  var t6;
  var h11;
  var t7;
  var t8;
  var hr1;
  var t9;
  var p1;
  var t10;
  var t11;
  var div1;
  var t12;
  var h12;
  var t13;
  var t14;
  var hr2;
  var t15;
  var p2;
  var t16;
  var a;
  var t17;
  var t18;
  var main_transition;
  var current;
  var each_value_1 = WorkProjects;
  validate_each_argument(each_value_1);
  var each_blocks_1 = [];

  for (var i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  var out = function out(i) {
    return transition_out(each_blocks_1[i], 1, 1, function () {
      each_blocks_1[i] = null;
    });
  };

  var each_value = FELprojects;
  validate_each_argument(each_value);
  var each_blocks = [];

  for (var _i = 0; _i < each_value.length; _i += 1) {
    each_blocks[_i] = create_each_block$1(get_each_context$1(ctx, each_value, _i));
  }

  var out_1 = function out_1(i) {
    return transition_out(each_blocks[i], 1, 1, function () {
      each_blocks[i] = null;
    });
  };

  var block = {
    c: function create() {
      t0 = space();
      main = element("main");
      h10 = element("h1");
      t1 = text("Work projects");
      t2 = space();
      hr0 = element("hr");
      t3 = space();
      p0 = element("p");
      t4 = text("Projects that I've been employed");
      t5 = space();
      div0 = element("div");

      for (var _i2 = 0; _i2 < each_blocks_1.length; _i2 += 1) {
        each_blocks_1[_i2].c();
      }

      t6 = space();
      h11 = element("h1");
      t7 = text("Miniprojects");
      t8 = space();
      hr1 = element("hr");
      t9 = space();
      p1 = element("p");
      t10 = text("Projects done to get freecodecamp certifications");
      t11 = space();
      div1 = element("div");

      for (var _i3 = 0; _i3 < each_blocks.length; _i3 += 1) {
        each_blocks[_i3].c();
      }

      t12 = space();
      h12 = element("h1");
      t13 = text("Others");
      t14 = space();
      hr2 = element("hr");
      t15 = space();
      p2 = element("p");
      t16 = text("See my \n    ");
      a = element("a");
      t17 = text("codepen");
      t18 = text(" \n    profile");
      this.h();
    },
    l: function claim(nodes) {
      var head_nodes = query_selector_all("[data-svelte=\"svelte-q65064\"]", document.head);
      head_nodes.forEach(detach_dev);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", {});
      var main_nodes = children(main);
      h10 = claim_element(main_nodes, "H1", {});
      var h10_nodes = children(h10);
      t1 = claim_text(h10_nodes, "Work projects");
      h10_nodes.forEach(detach_dev);
      t2 = claim_space(main_nodes);
      hr0 = claim_element(main_nodes, "HR", {
        class: true
      });
      t3 = claim_space(main_nodes);
      p0 = claim_element(main_nodes, "P", {});
      var p0_nodes = children(p0);
      t4 = claim_text(p0_nodes, "Projects that I've been employed");
      p0_nodes.forEach(detach_dev);
      t5 = claim_space(main_nodes);
      div0 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div0_nodes = children(div0);

      for (var _i4 = 0; _i4 < each_blocks_1.length; _i4 += 1) {
        each_blocks_1[_i4].l(div0_nodes);
      }

      div0_nodes.forEach(detach_dev);
      t6 = claim_space(main_nodes);
      h11 = claim_element(main_nodes, "H1", {});
      var h11_nodes = children(h11);
      t7 = claim_text(h11_nodes, "Miniprojects");
      h11_nodes.forEach(detach_dev);
      t8 = claim_space(main_nodes);
      hr1 = claim_element(main_nodes, "HR", {
        class: true
      });
      t9 = claim_space(main_nodes);
      p1 = claim_element(main_nodes, "P", {});
      var p1_nodes = children(p1);
      t10 = claim_text(p1_nodes, "Projects done to get freecodecamp certifications");
      p1_nodes.forEach(detach_dev);
      t11 = claim_space(main_nodes);
      div1 = claim_element(main_nodes, "DIV", {
        class: true
      });
      var div1_nodes = children(div1);

      for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
        each_blocks[_i5].l(div1_nodes);
      }

      div1_nodes.forEach(detach_dev);
      t12 = claim_space(main_nodes);
      h12 = claim_element(main_nodes, "H1", {});
      var h12_nodes = children(h12);
      t13 = claim_text(h12_nodes, "Others");
      h12_nodes.forEach(detach_dev);
      t14 = claim_space(main_nodes);
      hr2 = claim_element(main_nodes, "HR", {
        class: true
      });
      t15 = claim_space(main_nodes);
      p2 = claim_element(main_nodes, "P", {});
      var p2_nodes = children(p2);
      t16 = claim_text(p2_nodes, "See my \n    ");
      a = claim_element(p2_nodes, "A", {
        href: true,
        target: true
      });
      var a_nodes = children(a);
      t17 = claim_text(a_nodes, "codepen");
      a_nodes.forEach(detach_dev);
      t18 = claim_text(p2_nodes, " \n    profile");
      p2_nodes.forEach(detach_dev);
      main_nodes.forEach(detach_dev);
      this.h();
    },
    h: function hydrate() {
      document.title = "Projects | Diego Sánchez";
      add_location(h10, file$6, 33, 2, 695);
      attr_dev(hr0, "class", "svelte-z6li3e");
      add_location(hr0, file$6, 34, 2, 720);
      add_location(p0, file$6, 36, 2, 729);
      attr_dev(div0, "class", "container svelte-z6li3e");
      add_location(div0, file$6, 38, 2, 773);
      add_location(h11, file$6, 44, 2, 898);
      attr_dev(hr1, "class", "svelte-z6li3e");
      add_location(hr1, file$6, 45, 2, 922);
      add_location(p1, file$6, 47, 2, 931);
      attr_dev(div1, "class", "container svelte-z6li3e");
      add_location(div1, file$6, 49, 2, 990);
      add_location(h12, file$6, 55, 2, 1114);
      attr_dev(hr2, "class", "svelte-z6li3e");
      add_location(hr2, file$6, 56, 2, 1132);
      attr_dev(a, "href", "https://codepen.io/diegosanchezp_/");
      attr_dev(a, "target", "_blank");
      add_location(a, file$6, 59, 4, 1160);
      add_location(p2, file$6, 57, 2, 1140);
      add_location(main, file$6, 32, 0, 656);
    },
    m: function mount(target, anchor) {
      insert_dev(target, t0, anchor);
      insert_dev(target, main, anchor);
      append_dev(main, h10);
      append_dev(h10, t1);
      append_dev(main, t2);
      append_dev(main, hr0);
      append_dev(main, t3);
      append_dev(main, p0);
      append_dev(p0, t4);
      append_dev(main, t5);
      append_dev(main, div0);

      for (var _i6 = 0; _i6 < each_blocks_1.length; _i6 += 1) {
        each_blocks_1[_i6].m(div0, null);
      }

      append_dev(main, t6);
      append_dev(main, h11);
      append_dev(h11, t7);
      append_dev(main, t8);
      append_dev(main, hr1);
      append_dev(main, t9);
      append_dev(main, p1);
      append_dev(p1, t10);
      append_dev(main, t11);
      append_dev(main, div1);

      for (var _i7 = 0; _i7 < each_blocks.length; _i7 += 1) {
        each_blocks[_i7].m(div1, null);
      }

      append_dev(main, t12);
      append_dev(main, h12);
      append_dev(h12, t13);
      append_dev(main, t14);
      append_dev(main, hr2);
      append_dev(main, t15);
      append_dev(main, p2);
      append_dev(p2, t16);
      append_dev(p2, a);
      append_dev(a, t17);
      append_dev(p2, t18);
      current = true;
    },
    p: function update(ctx, _ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          dirty = _ref2[0];

      if (dirty &
      /*WorkProjects*/
      0) {
        each_value_1 = WorkProjects;
        validate_each_argument(each_value_1);

        var _i8;

        for (_i8 = 0; _i8 < each_value_1.length; _i8 += 1) {
          var child_ctx = get_each_context_1(ctx, each_value_1, _i8);

          if (each_blocks_1[_i8]) {
            each_blocks_1[_i8].p(child_ctx, dirty);

            transition_in(each_blocks_1[_i8], 1);
          } else {
            each_blocks_1[_i8] = create_each_block_1(child_ctx);

            each_blocks_1[_i8].c();

            transition_in(each_blocks_1[_i8], 1);

            each_blocks_1[_i8].m(div0, null);
          }
        }

        group_outros();

        for (_i8 = each_value_1.length; _i8 < each_blocks_1.length; _i8 += 1) {
          out(_i8);
        }

        check_outros();
      }

      if (dirty &
      /*FELprojects*/
      0) {
        each_value = FELprojects;
        validate_each_argument(each_value);

        var _i9;

        for (_i9 = 0; _i9 < each_value.length; _i9 += 1) {
          var _child_ctx = get_each_context$1(ctx, each_value, _i9);

          if (each_blocks[_i9]) {
            each_blocks[_i9].p(_child_ctx, dirty);

            transition_in(each_blocks[_i9], 1);
          } else {
            each_blocks[_i9] = create_each_block$1(_child_ctx);

            each_blocks[_i9].c();

            transition_in(each_blocks[_i9], 1);

            each_blocks[_i9].m(div1, null);
          }
        }

        group_outros();

        for (_i9 = each_value.length; _i9 < each_blocks.length; _i9 += 1) {
          out_1(_i9);
        }

        check_outros();
      }
    },
    i: function intro(local) {
      if (current) return;

      for (var _i10 = 0; _i10 < each_value_1.length; _i10 += 1) {
        transition_in(each_blocks_1[_i10]);
      }

      for (var _i11 = 0; _i11 < each_value.length; _i11 += 1) {
        transition_in(each_blocks[_i11]);
      }

      add_render_callback(function () {
        if (!main_transition) main_transition = create_bidirectional_transition(main, fly, transition, true);
        main_transition.run(1);
      });
      current = true;
    },
    o: function outro(local) {
      each_blocks_1 = each_blocks_1.filter(Boolean);

      for (var _i12 = 0; _i12 < each_blocks_1.length; _i12 += 1) {
        transition_out(each_blocks_1[_i12]);
      }

      each_blocks = each_blocks.filter(Boolean);

      for (var _i13 = 0; _i13 < each_blocks.length; _i13 += 1) {
        transition_out(each_blocks[_i13]);
      }

      if (!main_transition) main_transition = create_bidirectional_transition(main, fly, transition, false);
      main_transition.run(0);
      current = false;
    },
    d: function destroy(detaching) {
      if (detaching) detach_dev(t0);
      if (detaching) detach_dev(main);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      if (detaching && main_transition) main_transition.end();
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block: block,
    id: create_fragment$6.name,
    type: "component",
    source: "",
    ctx: ctx
  });
  return block;
}

function instance$6($$self, $$props, $$invalidate) {
  var writable_props = [];
  Object.keys($$props).forEach(function (key) {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn("<Projects> was created with unknown prop '".concat(key, "'"));
  });
  var _$$props$$$slots = $$props.$$slots,
      $$slots = _$$props$$$slots === void 0 ? {} : _$$props$$$slots,
      $$scope = $$props.$$scope;
  validate_slots("Projects", $$slots, []);

  $$self.$capture_state = function () {
    return {
      FELprojects: FELprojects,
      WorkProjects: WorkProjects,
      ProjectCard: ProjectCard,
      fly: fly,
      transition: transition
    };
  };

  return [];
}

var Projects = /*#__PURE__*/function (_SvelteComponentDev) {
  _inherits(Projects, _SvelteComponentDev);

  var _super = _createSuper$6(Projects);

  function Projects(options) {
    var _this;

    _classCallCheck(this, Projects);

    _this = _super.call(this, options);
    init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: _assertThisInitialized(_this),
      tagName: "Projects",
      options: options,
      id: create_fragment$6.name
    });
    return _this;
  }

  return Projects;
}(SvelteComponentDev);

export default Projects;
