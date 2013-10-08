/*! musicPlayer - v2.0 - 2013-10-08 9:38:23 AM
* Copyright (c) 2013 韩升; Licensed  */
KISSY.add("gallery/musicPlayer/2.0/player/audio",function(a){function b(){j={_bindEvent:function(){a.all(i.nstop)&&a.all(i.nstop).on("click",function(){g.stop()}),a.all(i.nplay)&&a.all(i.nplay).on("click",function(){g.play()}),a.all(i.npause)&&a.all(i.npause).on("click",function(){g.pause()}),a.all(i.npre)&&a.all(i.npre).on("click",function(){g.pre()}),a.all(i.nnext)&&a.all(i.nnext).on("click",function(){g.next()})},_createAudio:function(){h=document.createElement("audio")},_progress_handle:function(){var a=f(h.currentTime),b=f(h.duration),c=(100*(h.currentTime/h.duration)).toFixed(2);a!=m&&"NaN:NaN"!=b&&(m=a,t=h.duration,n=c,m==b&&(c=100),g.sendProgress({index:l,curtime:a,counttime:b,progress:c}))},_ended_handle:function(){g.stop("ended")},_init:function(b){g=this,a.mix(i,b),this._bindEvent(),this._initAudio()},_initAudio:function(){a.log(["audio",h]),h.addEventListener("timeupdate",this._progress_handle,!0),h.addEventListener("ended",this._ended_handle,!0),h.addEventListener("loadedmetadata",function(){}),this.setList(i.musicList),i.auto&&this.play("first_delay_sendstatus")},play:function(a){return null==a&&(a=-1),a>o?(c("\u64ad\u653e\u97f3\u4e50\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"),void 0):(a>=0&&(l=a),h.addEventListener("canplaythrough",function(){},!1),h.addEventListener("loadedmetadata",function(){},!1),r||(h.src=k[l].path),h.play(),q=!0,r=!1,"first_delay_sendstatus"==a?setTimeout(function(){d("play")},10):d("play"),void 0)},stop:function(a){q&&(h.currentTime=0,h.pause(),q=!1),d("stop"),null!=a&&e()},pause:function(){q&&(p=h.currentTime,h.pause(),r=!0,d("pause"))},pre:function(){l>0&&l--,this.stop(null),this.play()},next:function(){o>l&&l++,this.stop(null),this.play()},setList:function(a){return k=a||{},null==k||k.length<=0?(c("\u8bf7\u68c0\u67e5\u6b4c\u66f2\u5217\u8868, \u53c2\u8003 [{name:'name', path:'path'}]"),void 0):(o=k.length-1,l=0,void 0)},_setMode:function(a){s=a},_setBuffer:function(a){h.buffer=a},_setVolume:function(a){h.volume=a},_setProgress:function(a){h.currentTime=a/100*t}}}function c(a){var b=a||"\u9519\u8bef\u5f02\u5e38!",c=2e3,d={type:c,msg:b};g.sendError(d)}function d(a){var b=a||null,c=l,d=k[l].name||null,e=k[l].path||null,f=s||null,h={status:b,index:c,name:d,path:e,mode:f};g.sendStatus(h)}function e(){switch(s){case u.ORDER:l=l==o?0:l+1,g.play(l);break;case u.RANDOM:l=Math.ceil(Math.random()*o),g.play(l);break;case u.SINGLE:g.play(l);break;case u.STOP:}}function f(a){var b=Math.floor(a/60),c=Math.floor(a%60);return 10>c&&(c="0"+c),10>b&&(b="0"+b),b+":"+c}var g,h,i,j,k,l,m,n,o,p,q,r,s,t,u={ORDER:"order",RANDOM:"random",STOP:"stop",SINGLE:"single"};return{init:function(a){return i=a,b(),j},isSupportAudio:function(){h=document.createElement("audio"),h.contentType="Content-Type:application/octet-stream";var a=!!h.canPlayType;return a}}},{requires:["node"]}),KISSY.add("gallery/musicPlayer/2.0/player/flash",function(a,b,c){function d(){h={_bindEvent:function(){a.all(g.nstop)&&a.all(g.nstop).on("click",function(){f.callSWF("onStop")}),a.all(g.nplay)&&a.all(g.nplay).on("click",function(){f.callSWF("onPlay")}),a.all(g.npause)&&a.all(g.npause).on("click",function(){f.callSWF("onPause")}),a.all(g.npre)&&a.all(g.npre).on("click",function(){f.callSWF("onPre")}),a.all(g.nnext)&&a.all(g.nnext).on("click",function(){f.callSWF("onNext")})},_createSWF:function(){f=new c({src:"http://gtms02.alicdn.com/tps/i2/T1iNTbFbddXXXtxVjX.swf",attrs:{width:1,height:1},params:{flashVars:{mp3list:g.musicList,auto:g.auto,mode:g.mode,volume:g.volume,buffer:g.buffer},allowscriptaccess:"always",quality:"low"},render:"#ks-musicplayer"});var a=setInterval(function(){switch(f.get("status")){case c.Status.SUCCESS:e.sendStatus({status:"render",swfid:f.get("el").id}),setTimeout(function(){f.callSWF("setSWFID",[f.get("el").id])},100),clearInterval(a);break;case c.Status.NOT_INSTALLED:e.sendError({type:2e3,msg:c.Status.NOT_INSTALLED}),clearInterval(a);break;case c.Status.TOO_LOW:e.sendError({type:2e3,msg:c.Status.TOO_LOW}),clearInterval(a)}},10)},_createDIV:function(){var b='<div id="ks-musicplayer" style="position:absolute;left: -9999px; top: -9999px; width:1px; height:1px"></div>';a.one("body").append(b)},_init:function(b){a.log("flash"),e=this,a.mix(g,b),this._createDIV(),this._createSWF(),this._bindEvent(),this._setfire()},_setfire:function(){a.namespace("MusicPlayer"),a.mix(a.MusicPlayer,{error:function(a){e.sendError(a)},status:function(a){e.sendStatus(a)},progress:function(a){e.sendProgress(a)}})},play:function(a){null==a&&(a=-1),f.callSWF("onPlay",[a])},stop:function(){f.callSWF("onStop")},pause:function(){f.callSWF("onPause")},pre:function(){f.callSWF("onPre")},next:function(){f.callSWF("onNext")},setList:function(a){null==a&&(a={}),f.callSWF("setMP3List",[a])},_setMode:function(a){f.callSWF("setMode",[a])},_setBuffer:function(a){f.callSWF("setBuffer",[a])},_setVolume:function(a){f.callSWF("setVolume",[a])},_setProgress:function(a){f.callSWF("setProgress",[a])}}}var e,f,g,h;return{init:function(a){return g=a,d(),h}}},{requires:["node","swf"]}),KISSY.add("gallery/musicPlayer/2.0/index",function(a,b,c,d,e){function f(b){g=this;var c=d.isSupportAudio();switch(b.type){case"html5":a.mix(this,d.init(h));break;case"flash":a.mix(this,e.init(h));break;default:c?a.mix(this,d.init(h)):a.mix(this,e.init(h))}this._init(b);var i=this;f.superclass.constructor.call(i,b)}var g,h={nplay:null,nstop:null,npause:null,npre:null,nnext:null,musicList:null,mode:"order",auto:!1,volume:.25,buffer:1e3,type:"auto"},i={_bindEvent:function(){},_init:function(){},play:function(){},stop:function(){},pause:function(){},pre:function(){},next:function(){},setList:function(){},_setMode:function(){},_setBuffer:function(){},_setVolume:function(){},_setProgress:function(){}};return a.mix(i,{sendError:function(a){g.fire("error",a)},sendStatus:function(a){g.fire("status",a)},sendProgress:function(a){g.fire("progress",a)},MODE:{ORDER:"order",RANDOM:"random",SINGLE:"single"},EVENT:{LOADING:"loading",RENDER:"render",STATU:"status",ERROR:"error"},STATUS:{PLAY:"play",PAUSE:"pause",STOP:"stop",LOADING:"loading",RENDER:"render"}}),a.extend(f,c,i,{ATTRS:{mode:{value:h.mode,setter:function(a){return this._setMode(a),a}},buffer:{value:h.buffer,setter:function(a){return this._setBuffer(a),a}},volume:{value:h.volume,setter:function(a){return this._setVolume(a),a}},progress:{value:0,setter:function(a){return this._setProgress(a),a}}}}),f},{requires:["node","base","./player/audio","./player/flash"]});