!function(document,window,index){"use strict";var responsiveNav=function(el,options){!!window.getComputedStyle||(window.getComputedStyle=function(el){return this.el=el,this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;return"float"===prop&&(prop="styleFloat"),re.test(prop)&&(prop=prop.replace(re,function(){return arguments[2].toUpperCase()})),el.currentStyle[prop]?el.currentStyle[prop]:null},this});var nav,opts,navToggle,hasAnimFinished,isMobile,navOpen,addEvent=function(el,evt,fn,bubble){if("addEventListener"in el)try{el.addEventListener(evt,fn,bubble)}catch(e){if("object"!=typeof fn||!fn.handleEvent)throw e;el.addEventListener(evt,function(e){fn.handleEvent.call(fn,e)},bubble)}else"attachEvent"in el&&("object"==typeof fn&&fn.handleEvent?el.attachEvent("on"+evt,function(){fn.handleEvent.call(fn)}):el.attachEvent("on"+evt,fn))},removeEvent=function(el,evt,fn,bubble){if("removeEventListener"in el)try{el.removeEventListener(evt,fn,bubble)}catch(e){if("object"!=typeof fn||!fn.handleEvent)throw e;el.removeEventListener(evt,function(e){fn.handleEvent.call(fn,e)},bubble)}else"detachEvent"in el&&("object"==typeof fn&&fn.handleEvent?el.detachEvent("on"+evt,function(){fn.handleEvent.call(fn)}):el.detachEvent("on"+evt,fn))},getChildren=function(e){if(e.children.length<1)throw new Error("The Nav container has no containing elements");for(var children=[],i=0;i<e.children.length;i++)1===e.children[i].nodeType&&children.push(e.children[i]);return children},setAttributes=function(el,attrs){for(var key in attrs)el.setAttribute(key,attrs[key])},addClass=function(el,cls){0!==el.className.indexOf(cls)&&(el.className+=" "+cls,el.className=el.className.replace(/(^\s*)|(\s*$)/g,""))},removeClass=function(el,cls){var reg=new RegExp("(\\s|^)"+cls+"(\\s|$)");el.className=el.className.replace(reg," ").replace(/(^\s*)|(\s*$)/g,"")},forEach=function(array,callback,scope){for(var i=0;i<array.length;i++)callback.call(scope,i,array[i])},styleElement=document.createElement("style"),htmlEl=document.documentElement,ResponsiveNav=function(el,options){var i;this.options={animate:!1,transition:284,label:"Menu",insert:"before",customToggle:"",closeOnNavClick:!1,openPos:"absolute",closedPos:"static",navClass:"nav-collapse",navActiveClass:"js-nav-active",jsClass:"js",init:function(){},open:function(){},close:function(){}};for(i in options)this.options[i]=options[i];if(addClass(htmlEl,this.options.jsClass),this.wrapperEl=el.replace("#",""),document.getElementById(this.wrapperEl))this.wrapper=document.getElementById(this.wrapperEl);else{if(!document.querySelector(this.wrapperEl))throw new Error("The nav element you are trying to select doesn't exist");this.wrapper=document.querySelector(this.wrapperEl)}this.wrapper.inner=getChildren(this.wrapper),opts=this.options,nav=this.wrapper,this._init(this)};return ResponsiveNav.prototype={destroy:function(){this._removeStyles(),removeClass(nav,"closed"),removeClass(nav,"opened"),removeClass(nav,opts.navClass),removeClass(nav,opts.navClass+"-"+this.index),removeClass(htmlEl,opts.navActiveClass),nav.removeAttribute("style"),nav.removeAttribute("aria-hidden"),removeEvent(window,"resize",this,!1),removeEvent(window,"focus",this,!1),removeEvent(document.body,"touchmove",this,!1),removeEvent(navToggle,"touchstart",this,!1),removeEvent(navToggle,"touchend",this,!1),removeEvent(navToggle,"mouseup",this,!1),removeEvent(navToggle,"keyup",this,!1),removeEvent(navToggle,"click",this,!1),opts.customToggle?navToggle.removeAttribute("aria-hidden"):navToggle.parentNode.removeChild(navToggle)},toggle:function(){!0===hasAnimFinished&&(navOpen?this.close():this.open())},open:function(){navOpen||(removeClass(nav,"closed"),addClass(nav,"opened"),addClass(htmlEl,opts.navActiveClass),addClass(navToggle,"active"),nav.style.position=opts.openPos,setAttributes(nav,{"aria-hidden":"false"}),navOpen=!0,opts.open())},close:function(){navOpen&&(addClass(nav,"closed"),removeClass(nav,"opened"),removeClass(htmlEl,opts.navActiveClass),removeClass(navToggle,"active"),setAttributes(nav,{"aria-hidden":"true"}),opts.animate?(hasAnimFinished=!1,setTimeout(function(){nav.style.position=opts.openPos,hasAnimFinished=!0},opts.transition+10)):nav.style.position=opts.openPos,navOpen=!1,opts.close())},resize:function(){"none"!==window.getComputedStyle(navToggle,null).getPropertyValue("display")?(isMobile=!0,setAttributes(navToggle,{"aria-hidden":"false"}),nav.className.match(/(^|\s)closed(\s|$)/)&&(setAttributes(nav,{"aria-hidden":"true"}),nav.style.position=opts.openPos),this._createStyles(),this._calcHeight()):(isMobile=!1,setAttributes(navToggle,{"aria-hidden":"true"}),setAttributes(nav,{"aria-hidden":"false"}),nav.style.position=opts.closedPos,this._removeStyles())},handleEvent:function(e){var evt=e||window.event;switch(evt.type){case"touchstart":this._onTouchStart(evt);break;case"touchmove":this._onTouchMove(evt);break;case"touchend":case"mouseup":this._onTouchEnd(evt);break;case"click":this._preventDefault(evt);break;case"keyup":this._onKeyUp(evt);break;case"focus":case"resize":this.resize(evt)}},_init:function(){this.index=index++,removeClass(nav,"closed"),addClass(nav,opts.navClass),addClass(nav,opts.navClass+"-"+this.index),addClass(nav,"closed"),hasAnimFinished=!0,navOpen=!1,this._closeOnNavClick(),this._createToggle(),this._transitions(),this.resize();var self=this;setTimeout(function(){self.resize()},20),addEvent(window,"resize",this,!1),addEvent(window,"focus",this,!1),addEvent(document.body,"touchmove",this,!1),addEvent(navToggle,"touchstart",this,!1),addEvent(navToggle,"touchend",this,!1),addEvent(navToggle,"mouseup",this,!1),addEvent(navToggle,"keyup",this,!1),addEvent(navToggle,"click",this,!1),opts.init()},_createStyles:function(){styleElement.parentNode||(styleElement.type="text/css",document.getElementsByTagName("head")[0].appendChild(styleElement))},_removeStyles:function(){styleElement.parentNode&&styleElement.parentNode.removeChild(styleElement)},_createToggle:function(){if(opts.customToggle){var toggleEl=opts.customToggle.replace("#","");if(document.getElementById(toggleEl))navToggle=document.getElementById(toggleEl);else{if(!document.querySelector(toggleEl))throw new Error("The custom nav toggle you are trying to select doesn't exist");navToggle=document.querySelector(toggleEl)}}else{var toggle=document.createElement("a");toggle.innerHTML=opts.label,setAttributes(toggle,{href:"#",class:"nav-toggle"}),"after"===opts.insert?nav.parentNode.insertBefore(toggle,nav.nextSibling):nav.parentNode.insertBefore(toggle,nav),navToggle=toggle}},_closeOnNavClick:function(){if(opts.closeOnNavClick){var links=nav.getElementsByTagName("a"),self=this;forEach(links,function(i,el){addEvent(links[i],"click",function(){isMobile&&self.toggle()},!1)})}},_preventDefault:function(e){if(e.preventDefault)return e.stopImmediatePropagation&&e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation(),!1;e.returnValue=!1},_onTouchStart:function(e){Event.prototype.stopImmediatePropagation||this._preventDefault(e),this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY,this.touchHasMoved=!1,removeEvent(navToggle,"mouseup",this,!1)},_onTouchMove:function(e){(Math.abs(e.touches[0].clientX-this.startX)>10||Math.abs(e.touches[0].clientY-this.startY)>10)&&(this.touchHasMoved=!0)},_onTouchEnd:function(e){if(this._preventDefault(e),isMobile&&!this.touchHasMoved){if("touchend"===e.type)return void this.toggle();var evt=e||window.event;3!==evt.which&&2!==evt.button&&this.toggle()}},_onKeyUp:function(e){13===(e||window.event).keyCode&&this.toggle()},_transitions:function(){if(opts.animate){var objStyle=nav.style,transition="max-height "+opts.transition+"ms";objStyle.WebkitTransition=objStyle.MozTransition=objStyle.OTransition=objStyle.transition=transition}},_calcHeight:function(){for(var savedHeight=0,i=0;i<nav.inner.length;i++)savedHeight+=nav.inner[i].offsetHeight;var innerStyles="."+opts.jsClass+" ."+opts.navClass+"-"+this.index+".opened{max-height:"+savedHeight+"px !important} ."+opts.jsClass+" ."+opts.navClass+"-"+this.index+".opened.dropdown-active {max-height:9999px !important}";styleElement.styleSheet?styleElement.styleSheet.cssText=innerStyles:styleElement.innerHTML=innerStyles,innerStyles=""}},new ResponsiveNav(el,options)};"undefined"!=typeof module&&module.exports?module.exports=responsiveNav:window.responsiveNav=responsiveNav}(document,window,0);