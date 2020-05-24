function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}function _defineProperties(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function _createClass(t,e,i){return e&&_defineProperties(t.prototype,e),i&&_defineProperties(t,i),t}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&_setPrototypeOf(t,e)}function _setPrototypeOf(t,e){return(_setPrototypeOf=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var i,a=_getPrototypeOf(t);if(e){var n=_getPrototypeOf(this).constructor;i=Reflect.construct(a,arguments,n)}else i=a.apply(this,arguments);return _possibleConstructorReturn(this,i)}}function _possibleConstructorReturn(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?_assertThisInitialized(t):e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function _getPrototypeOf(t){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"0B1/":function(t,e,i){"use strict";i.r(e),i.d(e,"ProjectsModule",(function(){return _t}));var a,n,r,s,c,o,l,h,d,p,u,m,b,f=i("ofXK"),g=i("jhN1"),_=i("FtGj"),y=i("fXoL"),v=i("FKr1"),C=i("8LU1"),k=i("XNiG"),x=i("VRyK"),w=i("IzEk"),S=i("1G5W"),I=i("JX91"),j=i("R1ws"),O=i("u47x"),R=i("0EQZ"),A=(i("GU7r"),i("xgIS"),i("R0Ic"),i("cH1L")),F=i("nLfN"),T=((a=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||a)},a.\u0275dir=y.Ib({type:a}),a),M=i("3Pt+"),D=["*"],P=Object(v.p)(Object(v.l)(Object(v.m)((function t(e){_classCallCheck(this,t),this._elementRef=e})),"primary"),-1),E=((c=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||c)},c.\u0275dir=y.Ib({type:c,selectors:[["mat-chip-avatar"],["","matChipAvatar",""]],hostAttrs:[1,"mat-chip-avatar"]}),c),L=((s=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||s)},s.\u0275dir=y.Ib({type:s,selectors:[["mat-chip-trailing-icon"],["","matChipTrailingIcon",""]],hostAttrs:[1,"mat-chip-trailing-icon"]}),s),N=((r=function(t){_inherits(i,t);var e=_createSuper(i);function i(t,a,n,r,s,c,o,l){var h;return _classCallCheck(this,i),(h=e.call(this,t))._elementRef=t,h._ngZone=a,h._changeDetectorRef=c,h._hasFocus=!1,h.chipListSelectable=!0,h._chipListMultiple=!1,h._chipListDisabled=!1,h._selected=!1,h._selectable=!0,h._disabled=!1,h._removable=!0,h._onFocus=new k.a,h._onBlur=new k.a,h.selectionChange=new y.n,h.destroyed=new y.n,h.removed=new y.n,h._addHostClassName(),h._chipRippleTarget=(l||document).createElement("div"),h._chipRippleTarget.classList.add("mat-chip-ripple"),h._elementRef.nativeElement.appendChild(h._chipRippleTarget),h._chipRipple=new v.k(_assertThisInitialized(h),a,h._chipRippleTarget,n),h._chipRipple.setupTriggerEvents(t),h.rippleConfig=r||{},h._animationsDisabled="NoopAnimations"===s,h.tabIndex=null!=o&&parseInt(o)||-1,h}return _createClass(i,[{key:"_addHostClassName",value:function(){var t=this._elementRef.nativeElement;t.hasAttribute("mat-basic-chip")||"mat-basic-chip"===t.tagName.toLowerCase()?t.classList.add("mat-basic-chip"):t.classList.add("mat-standard-chip")}},{key:"ngOnDestroy",value:function(){this.destroyed.emit({chip:this}),this._chipRipple._removeTriggerEvents()}},{key:"select",value:function(){this._selected||(this._selected=!0,this._dispatchSelectionChange(),this._markForCheck())}},{key:"deselect",value:function(){this._selected&&(this._selected=!1,this._dispatchSelectionChange(),this._markForCheck())}},{key:"selectViaInteraction",value:function(){this._selected||(this._selected=!0,this._dispatchSelectionChange(!0),this._markForCheck())}},{key:"toggleSelected",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this._selected=!this.selected,this._dispatchSelectionChange(t),this._markForCheck(),this.selected}},{key:"focus",value:function(){this._hasFocus||(this._elementRef.nativeElement.focus(),this._onFocus.next({chip:this})),this._hasFocus=!0}},{key:"remove",value:function(){this.removable&&this.removed.emit({chip:this})}},{key:"_handleClick",value:function(t){this.disabled?t.preventDefault():t.stopPropagation()}},{key:"_handleKeydown",value:function(t){if(!this.disabled)switch(t.keyCode){case _.c:case _.b:this.remove(),t.preventDefault();break;case _.l:this.selectable&&this.toggleSelected(!0),t.preventDefault()}}},{key:"_blur",value:function(){var t=this;this._ngZone.onStable.asObservable().pipe(Object(w.a)(1)).subscribe((function(){t._ngZone.run((function(){t._hasFocus=!1,t._onBlur.next({chip:t})}))}))}},{key:"_dispatchSelectionChange",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.selectionChange.emit({source:this,isUserInput:t,selected:this._selected})}},{key:"_markForCheck",value:function(){this._changeDetectorRef&&this._changeDetectorRef.markForCheck()}},{key:"rippleDisabled",get:function(){return this.disabled||this.disableRipple||!!this.rippleConfig.disabled}},{key:"selected",get:function(){return this._selected},set:function(t){var e=Object(C.b)(t);e!==this._selected&&(this._selected=e,this._dispatchSelectionChange())}},{key:"value",get:function(){return void 0!==this._value?this._value:this._elementRef.nativeElement.textContent},set:function(t){this._value=t}},{key:"selectable",get:function(){return this._selectable&&this.chipListSelectable},set:function(t){this._selectable=Object(C.b)(t)}},{key:"disabled",get:function(){return this._chipListDisabled||this._disabled},set:function(t){this._disabled=Object(C.b)(t)}},{key:"removable",get:function(){return this._removable},set:function(t){this._removable=Object(C.b)(t)}},{key:"ariaSelected",get:function(){return this.selectable&&(this._chipListMultiple||this.selected)?this.selected.toString():null}}]),i}(P)).\u0275fac=function(t){return new(t||r)(y.Nb(y.l),y.Nb(y.z),y.Nb(F.a),y.Nb(v.c,8),y.Nb(j.a,8),y.Nb(y.h),y.Xb("tabindex"),y.Nb(f.c,8))},r.\u0275dir=y.Ib({type:r,selectors:[["mat-basic-chip"],["","mat-basic-chip",""],["mat-chip"],["","mat-chip",""]],contentQueries:function(t,e,i){var a;1&t&&(y.Gb(i,E,!0),y.Gb(i,L,!0),y.Gb(i,z,!0)),2&t&&(y.ic(a=y.bc())&&(e.avatar=a.first),y.ic(a=y.bc())&&(e.trailingIcon=a.first),y.ic(a=y.bc())&&(e.removeIcon=a.first))},hostAttrs:["role","option",1,"mat-chip","mat-focus-indicator"],hostVars:14,hostBindings:function(t,e){1&t&&y.ac("click",(function(t){return e._handleClick(t)}))("keydown",(function(t){return e._handleKeydown(t)}))("focus",(function(){return e.focus()}))("blur",(function(){return e._blur()})),2&t&&(y.Db("tabindex",e.disabled?null:e.tabIndex)("disabled",e.disabled||null)("aria-disabled",e.disabled.toString())("aria-selected",e.ariaSelected),y.Eb("mat-chip-selected",e.selected)("mat-chip-with-avatar",e.avatar)("mat-chip-with-trailing-icon",e.trailingIcon||e.removeIcon)("mat-chip-disabled",e.disabled)("_mat-animation-noopable",e._animationsDisabled))},inputs:{color:"color",disableRipple:"disableRipple",tabIndex:"tabIndex",selected:"selected",value:"value",selectable:"selectable",disabled:"disabled",removable:"removable"},outputs:{selectionChange:"selectionChange",destroyed:"destroyed",removed:"removed"},exportAs:["matChip"],features:[y.zb]}),r),z=((n=function(){function t(e,i){_classCallCheck(this,t),this._parentChip=e,i&&"BUTTON"===i.nativeElement.nodeName&&i.nativeElement.setAttribute("type","button")}return _createClass(t,[{key:"_handleClick",value:function(t){var e=this._parentChip;e.removable&&!e.disabled&&e.remove(),t.stopPropagation()}}]),t}()).\u0275fac=function(t){return new(t||n)(y.Nb(N),y.Nb(y.l))},n.\u0275dir=y.Ib({type:n,selectors:[["","matChipRemove",""]],hostAttrs:[1,"mat-chip-remove","mat-chip-trailing-icon"],hostBindings:function(t,e){1&t&&y.ac("click",(function(t){return e._handleClick(t)}))}}),n),V=new y.q("mat-chips-default-options"),B=Object(v.o)((function t(e,i,a,n){_classCallCheck(this,t),this._defaultErrorStateMatcher=e,this._parentForm=i,this._parentFormGroup=a,this.ngControl=n})),W=0,q=function t(e,i){_classCallCheck(this,t),this.source=e,this.value=i},H=((o=function(t){_inherits(i,t);var e=_createSuper(i);function i(t,a,n,r,s,c,o){var l;return _classCallCheck(this,i),(l=e.call(this,c,r,s,o))._elementRef=t,l._changeDetectorRef=a,l._dir=n,l.ngControl=o,l.controlType="mat-chip-list",l._lastDestroyedChipIndex=null,l._destroyed=new k.a,l._uid="mat-chip-list-"+W++,l._tabIndex=0,l._userTabIndex=null,l._onTouched=function(){},l._onChange=function(){},l._multiple=!1,l._compareWith=function(t,e){return t===e},l._required=!1,l._disabled=!1,l.ariaOrientation="horizontal",l._selectable=!0,l.change=new y.n,l.valueChange=new y.n,l.ngControl&&(l.ngControl.valueAccessor=_assertThisInitialized(l)),l}return _createClass(i,[{key:"ngAfterContentInit",value:function(){var t=this;this._keyManager=new O.a(this.chips).withWrap().withVerticalOrientation().withHorizontalOrientation(this._dir?this._dir.value:"ltr"),this._dir&&this._dir.change.pipe(Object(S.a)(this._destroyed)).subscribe((function(e){return t._keyManager.withHorizontalOrientation(e)})),this._keyManager.tabOut.pipe(Object(S.a)(this._destroyed)).subscribe((function(){t._allowFocusEscape()})),this.chips.changes.pipe(Object(I.a)(null),Object(S.a)(this._destroyed)).subscribe((function(){t.disabled&&Promise.resolve().then((function(){t._syncChipsState()})),t._resetChips(),t._initializeSelection(),t._updateTabIndex(),t._updateFocusForDestroyedChips(),t.stateChanges.next()}))}},{key:"ngOnInit",value:function(){this._selectionModel=new R.b(this.multiple,void 0,!1),this.stateChanges.next()}},{key:"ngDoCheck",value:function(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==this._disabled&&(this.disabled=!!this.ngControl.disabled))}},{key:"ngOnDestroy",value:function(){this._destroyed.next(),this._destroyed.complete(),this.stateChanges.complete(),this._dropSubscriptions()}},{key:"registerInput",value:function(t){this._chipInput=t}},{key:"setDescribedByIds",value:function(t){this._ariaDescribedby=t.join(" ")}},{key:"writeValue",value:function(t){this.chips&&this._setSelectionByValue(t,!1)}},{key:"registerOnChange",value:function(t){this._onChange=t}},{key:"registerOnTouched",value:function(t){this._onTouched=t}},{key:"setDisabledState",value:function(t){this.disabled=t,this.stateChanges.next()}},{key:"onContainerClick",value:function(t){this._originatesFromChip(t)||this.focus()}},{key:"focus",value:function(t){this.disabled||this._chipInput&&this._chipInput.focused||(this.chips.length>0?(this._keyManager.setFirstItemActive(),this.stateChanges.next()):(this._focusInput(t),this.stateChanges.next()))}},{key:"_focusInput",value:function(t){this._chipInput&&this._chipInput.focus(t)}},{key:"_keydown",value:function(t){var e=t.target;t.keyCode===_.b&&this._isInputEmpty(e)?(this._keyManager.setLastItemActive(),t.preventDefault()):e&&e.classList.contains("mat-chip")&&(t.keyCode===_.h?(this._keyManager.setFirstItemActive(),t.preventDefault()):t.keyCode===_.e?(this._keyManager.setLastItemActive(),t.preventDefault()):this._keyManager.onKeydown(t),this.stateChanges.next())}},{key:"_updateTabIndex",value:function(){this._tabIndex=this._userTabIndex||(0===this.chips.length?-1:0)}},{key:"_updateFocusForDestroyedChips",value:function(){if(null!=this._lastDestroyedChipIndex)if(this.chips.length){var t=Math.min(this._lastDestroyedChipIndex,this.chips.length-1);this._keyManager.setActiveItem(t)}else this.focus();this._lastDestroyedChipIndex=null}},{key:"_isValidIndex",value:function(t){return t>=0&&t<this.chips.length}},{key:"_isInputEmpty",value:function(t){return!(!t||"input"!==t.nodeName.toLowerCase()||t.value)}},{key:"_setSelectionByValue",value:function(t){var e=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(this._clearSelection(),this.chips.forEach((function(t){return t.deselect()})),Array.isArray(t))t.forEach((function(t){return e._selectValue(t,i)})),this._sortValues();else{var a=this._selectValue(t,i);a&&i&&this._keyManager.setActiveItem(a)}}},{key:"_selectValue",value:function(t){var e=this,i=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=this.chips.find((function(i){return null!=i.value&&e._compareWith(i.value,t)}));return a&&(i?a.selectViaInteraction():a.select(),this._selectionModel.select(a)),a}},{key:"_initializeSelection",value:function(){var t=this;Promise.resolve().then((function(){(t.ngControl||t._value)&&(t._setSelectionByValue(t.ngControl?t.ngControl.value:t._value,!1),t.stateChanges.next())}))}},{key:"_clearSelection",value:function(t){this._selectionModel.clear(),this.chips.forEach((function(e){e!==t&&e.deselect()})),this.stateChanges.next()}},{key:"_sortValues",value:function(){var t=this;this._multiple&&(this._selectionModel.clear(),this.chips.forEach((function(e){e.selected&&t._selectionModel.select(e)})),this.stateChanges.next())}},{key:"_propagateChanges",value:function(t){var e;e=Array.isArray(this.selected)?this.selected.map((function(t){return t.value})):this.selected?this.selected.value:t,this._value=e,this.change.emit(new q(this,e)),this.valueChange.emit(e),this._onChange(e),this._changeDetectorRef.markForCheck()}},{key:"_blur",value:function(){var t=this;this._hasFocusedChip()||this._keyManager.setActiveItem(-1),this.disabled||(this._chipInput?setTimeout((function(){t.focused||t._markAsTouched()})):this._markAsTouched())}},{key:"_markAsTouched",value:function(){this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next()}},{key:"_allowFocusEscape",value:function(){var t=this;-1!==this._tabIndex&&(this._tabIndex=-1,setTimeout((function(){t._tabIndex=t._userTabIndex||0,t._changeDetectorRef.markForCheck()})))}},{key:"_resetChips",value:function(){this._dropSubscriptions(),this._listenToChipsFocus(),this._listenToChipsSelection(),this._listenToChipsRemoved()}},{key:"_dropSubscriptions",value:function(){this._chipFocusSubscription&&(this._chipFocusSubscription.unsubscribe(),this._chipFocusSubscription=null),this._chipBlurSubscription&&(this._chipBlurSubscription.unsubscribe(),this._chipBlurSubscription=null),this._chipSelectionSubscription&&(this._chipSelectionSubscription.unsubscribe(),this._chipSelectionSubscription=null),this._chipRemoveSubscription&&(this._chipRemoveSubscription.unsubscribe(),this._chipRemoveSubscription=null)}},{key:"_listenToChipsSelection",value:function(){var t=this;this._chipSelectionSubscription=this.chipSelectionChanges.subscribe((function(e){e.source.selected?t._selectionModel.select(e.source):t._selectionModel.deselect(e.source),t.multiple||t.chips.forEach((function(e){!t._selectionModel.isSelected(e)&&e.selected&&e.deselect()})),e.isUserInput&&t._propagateChanges()}))}},{key:"_listenToChipsFocus",value:function(){var t=this;this._chipFocusSubscription=this.chipFocusChanges.subscribe((function(e){var i=t.chips.toArray().indexOf(e.chip);t._isValidIndex(i)&&t._keyManager.updateActiveItem(i),t.stateChanges.next()})),this._chipBlurSubscription=this.chipBlurChanges.subscribe((function(){t._blur(),t.stateChanges.next()}))}},{key:"_listenToChipsRemoved",value:function(){var t=this;this._chipRemoveSubscription=this.chipRemoveChanges.subscribe((function(e){var i=e.chip,a=t.chips.toArray().indexOf(e.chip);t._isValidIndex(a)&&i._hasFocus&&(t._lastDestroyedChipIndex=a)}))}},{key:"_originatesFromChip",value:function(t){for(var e=t.target;e&&e!==this._elementRef.nativeElement;){if(e.classList.contains("mat-chip"))return!0;e=e.parentElement}return!1}},{key:"_hasFocusedChip",value:function(){return this.chips.some((function(t){return t._hasFocus}))}},{key:"_syncChipsState",value:function(){var t=this;this.chips&&this.chips.forEach((function(e){e._chipListDisabled=t._disabled,e._chipListMultiple=t.multiple}))}},{key:"selected",get:function(){return this.multiple?this._selectionModel.selected:this._selectionModel.selected[0]}},{key:"role",get:function(){return this.empty?null:"listbox"}},{key:"multiple",get:function(){return this._multiple},set:function(t){this._multiple=Object(C.b)(t),this._syncChipsState()}},{key:"compareWith",get:function(){return this._compareWith},set:function(t){this._compareWith=t,this._selectionModel&&this._initializeSelection()}},{key:"value",get:function(){return this._value},set:function(t){this.writeValue(t),this._value=t}},{key:"id",get:function(){return this._chipInput?this._chipInput.id:this._uid}},{key:"required",get:function(){return this._required},set:function(t){this._required=Object(C.b)(t),this.stateChanges.next()}},{key:"placeholder",get:function(){return this._chipInput?this._chipInput.placeholder:this._placeholder},set:function(t){this._placeholder=t,this.stateChanges.next()}},{key:"focused",get:function(){return this._chipInput&&this._chipInput.focused||this._hasFocusedChip()}},{key:"empty",get:function(){return(!this._chipInput||this._chipInput.empty)&&0===this.chips.length}},{key:"shouldLabelFloat",get:function(){return!this.empty||this.focused}},{key:"disabled",get:function(){return this.ngControl?!!this.ngControl.disabled:this._disabled},set:function(t){this._disabled=Object(C.b)(t),this._syncChipsState()}},{key:"selectable",get:function(){return this._selectable},set:function(t){var e=this;this._selectable=Object(C.b)(t),this.chips&&this.chips.forEach((function(t){return t.chipListSelectable=e._selectable}))}},{key:"tabIndex",set:function(t){this._userTabIndex=t,this._tabIndex=t}},{key:"chipSelectionChanges",get:function(){return Object(x.a).apply(void 0,_toConsumableArray(this.chips.map((function(t){return t.selectionChange}))))}},{key:"chipFocusChanges",get:function(){return Object(x.a).apply(void 0,_toConsumableArray(this.chips.map((function(t){return t._onFocus}))))}},{key:"chipBlurChanges",get:function(){return Object(x.a).apply(void 0,_toConsumableArray(this.chips.map((function(t){return t._onBlur}))))}},{key:"chipRemoveChanges",get:function(){return Object(x.a).apply(void 0,_toConsumableArray(this.chips.map((function(t){return t.destroyed}))))}}]),i}(B)).\u0275fac=function(t){return new(t||o)(y.Nb(y.l),y.Nb(y.h),y.Nb(A.b,8),y.Nb(M.d,8),y.Nb(M.a,8),y.Nb(v.a),y.Nb(M.c,10))},o.\u0275cmp=y.Hb({type:o,selectors:[["mat-chip-list"]],contentQueries:function(t,e,i){var a;1&t&&y.Gb(i,N,!0),2&t&&y.ic(a=y.bc())&&(e.chips=a)},hostAttrs:[1,"mat-chip-list"],hostVars:15,hostBindings:function(t,e){1&t&&y.ac("focus",(function(){return e.focus()}))("blur",(function(){return e._blur()}))("keydown",(function(t){return e._keydown(t)})),2&t&&(y.Vb("id",e._uid),y.Db("tabindex",e.disabled?null:e._tabIndex)("aria-describedby",e._ariaDescribedby||null)("aria-required",e.role?e.required:null)("aria-disabled",e.disabled.toString())("aria-invalid",e.errorState)("aria-multiselectable",e.multiple)("role",e.role)("aria-orientation",e.ariaOrientation),y.Eb("mat-chip-list-disabled",e.disabled)("mat-chip-list-invalid",e.errorState)("mat-chip-list-required",e.required))},inputs:{ariaOrientation:["aria-orientation","ariaOrientation"],multiple:"multiple",compareWith:"compareWith",value:"value",required:"required",placeholder:"placeholder",disabled:"disabled",selectable:"selectable",tabIndex:"tabIndex",errorStateMatcher:"errorStateMatcher"},outputs:{change:"change",valueChange:"valueChange"},exportAs:["matChipList"],features:[y.Bb([{provide:T,useExisting:o}]),y.zb],ngContentSelectors:D,decls:2,vars:0,consts:[[1,"mat-chip-list-wrapper"]],template:function(t,e){1&t&&(y.ec(),y.Sb(0,"div",0),y.dc(1),y.Rb())},styles:['.mat-chip{position:relative;box-sizing:border-box;-webkit-tap-highlight-color:transparent;transform:translateZ(0);border:none;-webkit-appearance:none;-moz-appearance:none}.mat-standard-chip{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:inline-flex;padding:7px 12px;border-radius:16px;align-items:center;cursor:default;min-height:32px;height:1px}._mat-animation-noopable.mat-standard-chip{transition:none;animation:none}.mat-standard-chip .mat-chip-remove.mat-icon{width:18px;height:18px}.mat-standard-chip::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;opacity:0;content:"";pointer-events:none;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1)}.mat-standard-chip:hover::after{opacity:.12}.mat-standard-chip:focus{outline:none}.mat-standard-chip:focus::after{opacity:.16}.cdk-high-contrast-active .mat-standard-chip{outline:solid 1px}.cdk-high-contrast-active .mat-standard-chip:focus{outline:dotted 2px}.mat-standard-chip.mat-chip-disabled::after{opacity:0}.mat-standard-chip.mat-chip-disabled .mat-chip-remove,.mat-standard-chip.mat-chip-disabled .mat-chip-trailing-icon{cursor:default}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar,.mat-standard-chip.mat-chip-with-avatar{padding-top:0;padding-bottom:0}.mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-right:8px;padding-left:0}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon.mat-chip-with-avatar{padding-left:8px;padding-right:0}.mat-standard-chip.mat-chip-with-trailing-icon{padding-top:7px;padding-bottom:7px;padding-right:8px;padding-left:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-trailing-icon{padding-left:8px;padding-right:12px}.mat-standard-chip.mat-chip-with-avatar{padding-left:0;padding-right:12px}[dir=rtl] .mat-standard-chip.mat-chip-with-avatar{padding-right:0;padding-left:12px}.mat-standard-chip .mat-chip-avatar{width:24px;height:24px;margin-right:8px;margin-left:4px}[dir=rtl] .mat-standard-chip .mat-chip-avatar{margin-left:8px;margin-right:4px}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{width:18px;height:18px;cursor:pointer}.mat-standard-chip .mat-chip-remove,.mat-standard-chip .mat-chip-trailing-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-standard-chip .mat-chip-remove,[dir=rtl] .mat-standard-chip .mat-chip-trailing-icon{margin-right:8px;margin-left:0}.mat-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit;overflow:hidden}.mat-chip-list-wrapper{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;margin:-4px}.mat-chip-list-wrapper input.mat-input-element,.mat-chip-list-wrapper .mat-standard-chip{margin:4px}.mat-chip-list-stacked .mat-chip-list-wrapper{flex-direction:column;align-items:flex-start}.mat-chip-list-stacked .mat-chip-list-wrapper .mat-standard-chip{width:100%}.mat-chip-avatar{border-radius:50%;justify-content:center;align-items:center;display:flex;overflow:hidden;object-fit:cover}input.mat-chip-input{width:150px;margin:4px;flex:1 0 150px}\n'],encapsulation:2,changeDetection:0}),o),K={separatorKeyCodes:[_.f]},G=((l=function t(){_classCallCheck(this,t)}).\u0275mod=y.Lb({type:l}),l.\u0275inj=y.Kb({factory:function(t){return new(t||l)},providers:[v.a,{provide:V,useValue:K}]}),l),J=["*",[["mat-card-footer"]]],U=["*","mat-card-footer"],Q=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],X=["[mat-card-avatar], [matCardAvatar]","mat-card-title, mat-card-subtitle,\n      [mat-card-title], [mat-card-subtitle],\n      [matCardTitle], [matCardSubtitle]","*"],Z=((b=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||b)},b.\u0275dir=y.Ib({type:b,selectors:[["mat-card-content"],["","mat-card-content",""],["","matCardContent",""]],hostAttrs:[1,"mat-card-content"]}),b),$=((m=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||m)},m.\u0275dir=y.Ib({type:m,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-card-title"]}),m),Y=((u=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||u)},u.\u0275dir=y.Ib({type:u,selectors:[["","mat-card-image",""],["","matCardImage",""]],hostAttrs:[1,"mat-card-image"]}),u),tt=((p=function t(e){_classCallCheck(this,t),this._animationMode=e}).\u0275fac=function(t){return new(t||p)(y.Nb(j.a,8))},p.\u0275cmp=y.Hb({type:p,selectors:[["mat-card"]],hostAttrs:[1,"mat-card","mat-focus-indicator"],hostVars:2,hostBindings:function(t,e){2&t&&y.Eb("_mat-animation-noopable","NoopAnimations"===e._animationMode)},exportAs:["matCard"],ngContentSelectors:U,decls:2,vars:0,template:function(t,e){1&t&&(y.ec(J),y.dc(0),y.dc(1,1))},styles:[".mat-card{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);display:block;position:relative;padding:16px;border-radius:4px}._mat-animation-noopable.mat-card{transition:none;animation:none}.mat-card .mat-divider-horizontal{position:absolute;left:0;width:100%}[dir=rtl] .mat-card .mat-divider-horizontal{left:auto;right:0}.mat-card .mat-divider-horizontal.mat-divider-inset{position:static;margin:0}[dir=rtl] .mat-card .mat-divider-horizontal.mat-divider-inset{margin-right:0}.cdk-high-contrast-active .mat-card{outline:solid 1px}.mat-card-actions,.mat-card-subtitle,.mat-card-content{display:block;margin-bottom:16px}.mat-card-title{display:block;margin-bottom:8px}.mat-card-actions{margin-left:-8px;margin-right:-8px;padding:8px 0}.mat-card-actions-align-end{display:flex;justify-content:flex-end}.mat-card-image{width:calc(100% + 32px);margin:0 -16px 16px -16px}.mat-card-footer{display:block;margin:0 -16px -16px -16px}.mat-card-actions .mat-button,.mat-card-actions .mat-raised-button,.mat-card-actions .mat-stroked-button{margin:0 8px}.mat-card-header{display:flex;flex-direction:row}.mat-card-header .mat-card-title{margin-bottom:12px}.mat-card-header-text{margin:0 16px}.mat-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;object-fit:cover}.mat-card-title-group{display:flex;justify-content:space-between}.mat-card-sm-image{width:80px;height:80px}.mat-card-md-image{width:112px;height:112px}.mat-card-lg-image{width:152px;height:152px}.mat-card-xl-image{width:240px;height:240px;margin:-8px}.mat-card-title-group>.mat-card-xl-image{margin:-8px 0 8px}@media(max-width: 599px){.mat-card-title-group{margin:0}.mat-card-xl-image{margin-left:0;margin-right:0}}.mat-card>:first-child,.mat-card-content>:first-child{margin-top:0}.mat-card>:last-child:not(.mat-card-footer),.mat-card-content>:last-child:not(.mat-card-footer){margin-bottom:0}.mat-card-image:first-child{margin-top:-16px;border-top-left-radius:inherit;border-top-right-radius:inherit}.mat-card>.mat-card-actions:last-child{margin-bottom:-8px;padding-bottom:0}.mat-card-actions .mat-button:first-child,.mat-card-actions .mat-raised-button:first-child,.mat-card-actions .mat-stroked-button:first-child{margin-left:0;margin-right:0}.mat-card-title:not(:first-child),.mat-card-subtitle:not(:first-child){margin-top:-4px}.mat-card-header .mat-card-subtitle:not(:first-child){margin-top:-8px}.mat-card>.mat-card-xl-image:first-child{margin-top:-8px}.mat-card>.mat-card-xl-image:last-child{margin-bottom:-8px}\n"],encapsulation:2,changeDetection:0}),p),et=((d=function t(){_classCallCheck(this,t)}).\u0275fac=function(t){return new(t||d)},d.\u0275cmp=y.Hb({type:d,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-card-header"],ngContentSelectors:X,decls:4,vars:0,consts:[[1,"mat-card-header-text"]],template:function(t,e){1&t&&(y.ec(Q),y.dc(0),y.Sb(1,"div",0),y.dc(2,1),y.Rb(),y.dc(3,2))},encapsulation:2,changeDetection:0}),d),it=((h=function t(){_classCallCheck(this,t)}).\u0275mod=y.Lb({type:h}),h.\u0275inj=y.Kb({factory:function(t){return new(t||h)},imports:[[v.d],v.d]}),h),at=i("tyNb"),nt=[{title:"Drum Machine",url:"https://diegosanchezp.github.io/drum-machine-fcc/",img:"drum-machine-screenshot.png",description:"A drum machine that you can play with your keyboard buttons",tags:["Lit-html","Web Components"]},{title:"Random Quote Machine",url:"https://diegosanchezp.github.io/random-quote-machine",img:"random-quote-machine-screenshot.png",description:"Random Quotes",tags:["ReactJs"]},{title:"React Markdown Previewer",url:"https://diegosanchezp.github.io/simple-react-markdown-previewer",img:"simple-react-markdown-screenshot.png",description:"Live preview markdown editor",tags:["ReactJs"]},{title:"JavaScript Calculator",url:"https://diegosanchezp.github.io/javascript-calculator",img:"javascript-calculator-screenshot.png",description:"A simple, basic calculator",tags:["ReactJs"]},{title:"Pomodoro Tracker",url:"https://diegosanchezp.github.io/pomodoro-timer",img:"pomodo-timer-screenshot.png",description:"Simple Pomodoro Tracker for working",tags:["ReactJs"]}],rt=[{title:"Copin Pay",url:"http://copinpay.com/",img:"copin-webpage-screenshot.png",description:"A platform for managing your monetary assets from Copin's     story platform",tags:["Angular8","Ionic","Firebase"]}];function st(t,e){1&t&&y.Ob(0,"project-card",3),2&t&&y.fc("project",e.$implicit)}function ct(t,e){1&t&&y.Ob(0,"project-card",3),2&t&&y.fc("project",e.$implicit)}function ot(t,e){if(1&t&&(y.Sb(0,"mat-chip"),y.sc(1),y.Rb()),2&t){var i=e.$implicit;y.Cb(1),y.tc(i)}}var lt,ht,dt,pt,ut=((ht=function(){function t(e,i){_classCallCheck(this,t),this.titleService=e,this.metaService=i,this.FELprojects=nt,this.WorkProjects=rt}return _createClass(t,[{key:"ngOnInit",value:function(){this.titleService.setTitle("Projects | Diego S\xe1nchez"),this.metaService.updateTag({name:"description",content:"Web development projects done by Diego S\xe1nchez"})}}]),t}()).\u0275fac=function(t){return new(t||ht)(y.Nb(g.e),y.Nb(g.d))},ht.\u0275cmp=y.Hb({type:ht,selectors:[["app-projects"]],decls:22,vars:2,consts:[[1,"container"],[3,"project",4,"ngFor","ngForOf"],["href","https://codepen.io/diegosanchezp_/","target","_blank"],[3,"project"]],template:function(t,e){1&t&&(y.Sb(0,"h1"),y.sc(1,"Work projects"),y.Rb(),y.Ob(2,"hr"),y.Sb(3,"p"),y.sc(4,"Projects that I've been employed "),y.Rb(),y.Sb(5,"div",0),y.rc(6,st,1,1,"project-card",1),y.Rb(),y.Sb(7,"h1"),y.sc(8,"Miniprojects"),y.Rb(),y.Ob(9,"hr"),y.Sb(10,"p"),y.sc(11,"Projects done to get freecodecamp certifications"),y.Rb(),y.Sb(12,"div",0),y.rc(13,ct,1,1,"project-card",1),y.Rb(),y.Sb(14,"h1"),y.sc(15,"Others"),y.Rb(),y.Ob(16,"hr"),y.Sb(17,"p"),y.sc(18," See my "),y.Sb(19,"a",2),y.sc(20,"codepen"),y.Rb(),y.sc(21," profile\n"),y.Rb()),2&t&&(y.Cb(6),y.fc("ngForOf",e.WorkProjects),y.Cb(7),y.fc("ngForOf",e.FELprojects))},directives:function(){return[f.h,mt]},styles:["","hr[_ngcontent-%COMP%]{\n    width: 100%;\n    background-color: black;\n  }\n  a[_ngcontent-%COMP%]{\n    text-decoration: none;\n    color: black;\n    background-color: #FFCC00;\n    border-radius: 3px;\n    padding: 3px;\n  }\n  .container[_ngcontent-%COMP%]{\n    display: grid;\n    grid-template-columns: repeat(3, 1fr); \n    grid-gap: 10px 10px;\n    margin: 0 auto;\n    padding: 10px 0px;\n  }\n\n  @media(max-width: 500px){\n    .container[_ngcontent-%COMP%]{\n      grid-template-columns: 1fr;\n    }\n  }"]}),ht),mt=((lt=function t(){_classCallCheck(this,t),this.project={title:"",url:"",img:"",description:"",tags:[]}}).\u0275fac=function(t){return new(t||lt)},lt.\u0275cmp=y.Hb({type:lt,selectors:[["project-card"]],inputs:{project:"project"},decls:11,vars:7,consts:[[1,"project-card"],["target","_blank",3,"href","title"],["mat-card-image","",2,"margin-top","0",3,"src","alt"],["aria-label","Project technologies","title","Project technologies"],[4,"ngFor","ngForOf"]],template:function(t,e){1&t&&(y.Sb(0,"mat-card",0),y.Sb(1,"mat-card-header"),y.Sb(2,"mat-card-title"),y.sc(3),y.Rb(),y.Rb(),y.Sb(4,"a",1),y.Ob(5,"img",2),y.Rb(),y.Sb(6,"mat-card-content"),y.Sb(7,"p"),y.sc(8),y.Rb(),y.Sb(9,"mat-chip-list",3),y.rc(10,ot,2,1,"mat-chip",4),y.Rb(),y.Rb(),y.Rb()),2&t&&(y.Cb(3),y.tc(e.project.title),y.Cb(1),y.hc("title","See ",e.project.title,""),y.fc("href",e.project.url,y.mc),y.Cb(1),y.hc("src","../../../assets/Images/",e.project.img,"",y.mc),y.gc("alt",e.project.title),y.Cb(3),y.uc(" ",e.project.description," "),y.Cb(2),y.fc("ngForOf",e.project.tags))},directives:[tt,et,$,Y,Z,H,f.h,N],styles:["a[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{\n      margint-top: 0 !important;\n    }\n    .project-card[_ngcontent-%COMP%]{\n      background-color: #121212;\n      box-shadow: 0px 0px 1px;\n    }"]}),lt),bt=[{path:"",component:ut}],ft=((dt=function t(){_classCallCheck(this,t)}).\u0275mod=y.Lb({type:dt}),dt.\u0275inj=y.Kb({factory:function(t){return new(t||dt)},imports:[[at.f.forChild(bt)],at.f]}),dt),gt=i("h+eY"),_t=((pt=function t(){_classCallCheck(this,t)}).\u0275mod=y.Lb({type:pt}),pt.\u0275inj=y.Kb({factory:function(t){return new(t||pt)},providers:[g.e,gt.b],imports:[[f.b,it,G,v.j,ft,gt.a]]}),pt)}}]);