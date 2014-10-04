// Compiled by ClojureScript 0.0-2356
goog.provide('room.core');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('reagent.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('reagent.core');
goog.require('secretary.core');
goog.require('room.session');
goog.require('cljs.core.async');
goog.require('reagent.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('secretary.core');
goog.require('room.session');
goog.require('taoensso.encore');
taoensso.encore.logf.call(null,"ClojureScript appears to have loaded correctly.");
room.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"saved?","saved?",-2027163192),false], null));
var map__22343_22344 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__22343_22345__$1 = ((cljs.core.seq_QMARK_.call(null,map__22343_22344))?cljs.core.apply.call(null,cljs.core.hash_map,map__22343_22344):map__22343_22344);var state_22346 = cljs.core.get.call(null,map__22343_22345__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_22347 = cljs.core.get.call(null,map__22343_22345__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_22348 = cljs.core.get.call(null,map__22343_22345__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_22349 = cljs.core.get.call(null,map__22343_22345__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_22349;
room.core.ch_chsk = ch_recv_22348;
room.core.chsk_send_BANG_ = send_fn_22347;
room.core.chsk_state = state_22346;
room.core.messages = cljs.core.js__GT_clj.call(null,window.messages);
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.rms = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.message_counter = reagent.core.atom.call(null,(0));
room.core.add_message = (function add_message(id,author,text,time,room__$1){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"room","room",536484922),room__$1], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.dissoc,id);
});
var seq__22350_22354 = cljs.core.seq.call(null,room.core.messages);var chunk__22351_22355 = null;var count__22352_22356 = (0);var i__22353_22357 = (0);while(true){
if((i__22353_22357 < count__22352_22356))
{var m_22358 = cljs.core._nth.call(null,chunk__22351_22355,i__22353_22357);var author_22359 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_22358,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_22358,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_22358,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_22358,"hash")], null);var id_22360 = cljs.core.get.call(null,m_22358,"id");room.core.add_message.call(null,id_22360,author_22359,cljs.core.get.call(null,m_22358,"text"),cljs.core.get.call(null,m_22358,"created_at"),cljs.core.get.call(null,m_22358,"room"));
{
var G__22361 = seq__22350_22354;
var G__22362 = chunk__22351_22355;
var G__22363 = count__22352_22356;
var G__22364 = (i__22353_22357 + (1));
seq__22350_22354 = G__22361;
chunk__22351_22355 = G__22362;
count__22352_22356 = G__22363;
i__22353_22357 = G__22364;
continue;
}
} else
{var temp__4126__auto___22365 = cljs.core.seq.call(null,seq__22350_22354);if(temp__4126__auto___22365)
{var seq__22350_22366__$1 = temp__4126__auto___22365;if(cljs.core.chunked_seq_QMARK_.call(null,seq__22350_22366__$1))
{var c__4422__auto___22367 = cljs.core.chunk_first.call(null,seq__22350_22366__$1);{
var G__22368 = cljs.core.chunk_rest.call(null,seq__22350_22366__$1);
var G__22369 = c__4422__auto___22367;
var G__22370 = cljs.core.count.call(null,c__4422__auto___22367);
var G__22371 = (0);
seq__22350_22354 = G__22368;
chunk__22351_22355 = G__22369;
count__22352_22356 = G__22370;
i__22353_22357 = G__22371;
continue;
}
} else
{var m_22372 = cljs.core.first.call(null,seq__22350_22366__$1);var author_22373 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_22372,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_22372,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_22372,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_22372,"hash")], null);var id_22374 = cljs.core.get.call(null,m_22372,"id");room.core.add_message.call(null,id_22374,author_22373,cljs.core.get.call(null,m_22372,"text"),cljs.core.get.call(null,m_22372,"created_at"),cljs.core.get.call(null,m_22372,"room"));
{
var G__22375 = cljs.core.next.call(null,seq__22350_22366__$1);
var G__22376 = null;
var G__22377 = (0);
var G__22378 = (0);
seq__22350_22354 = G__22375;
chunk__22351_22355 = G__22376;
count__22352_22356 = G__22377;
i__22353_22357 = G__22378;
continue;
}
}
} else
{}
}
break;
}
room.core.event_msg_handler = (function (){var method_table__4532__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4533__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4534__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4535__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4536__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("event-msg-handler",new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4536__auto__,method_table__4532__auto__,prefer_table__4533__auto__,method_cache__4534__auto__,cached_hierarchy__4535__auto__));
})();
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__22379){var map__22382 = p__22379;var map__22382__$1 = ((cljs.core.seq_QMARK_.call(null,map__22382))?cljs.core.apply.call(null,cljs.core.hash_map,map__22382):map__22382);var ev_msg = map__22382__$1;var event = cljs.core.get.call(null,map__22382__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__22382__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__22383 = event;var id = cljs.core.nth.call(null,vec__22383,(0),null);var data = cljs.core.nth.call(null,vec__22383,(1),null);var ev = vec__22383;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__22384){var map__22385 = p__22384;var map__22385__$1 = ((cljs.core.seq_QMARK_.call(null,map__22385))?cljs.core.apply.call(null,cljs.core.hash_map,map__22385):map__22385);var ev_msg = map__22385__$1;var event = cljs.core.get.call(null,map__22385__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__22386){var map__22387 = p__22386;var map__22387__$1 = ((cljs.core.seq_QMARK_.call(null,map__22387))?cljs.core.apply.call(null,cljs.core.hash_map,map__22387):map__22387);var ev_msg = map__22387__$1;var _QMARK_data = cljs.core.get.call(null,map__22387__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__22388){var map__22389 = p__22388;var map__22389__$1 = ((cljs.core.seq_QMARK_.call(null,map__22389))?cljs.core.apply.call(null,cljs.core.hash_map,map__22389):map__22389);var ev_msg = map__22389__$1;var event = cljs.core.get.call(null,map__22389__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__22389__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__22390 = event;var id = cljs.core.nth.call(null,vec__22390,(0),null);var data = cljs.core.nth.call(null,vec__22390,(1),null);var ev = vec__22390;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("chat","broadcast","chat/broadcast",1767233264)))
{var msg_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(params);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(params);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,msg_id,author,msg,moment());
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("message","delete","message/delete",-974271757)))
{return room.core.delete_message.call(null,params);
} else
{return null;
}
}
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","send","message/send",-2110392641),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),text], null)], null));
});
room.core.send_delete_message = (function send_delete_message(id){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","delete","message/delete",-974271757),id], null));
});
room.core.send_typing = (function send_typing(){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","typing","user/typing",1085864163)], null));
});
room.core.message_input = (function message_input(p__22393){var map__22396 = p__22393;var map__22396__$1 = ((cljs.core.seq_QMARK_.call(null,map__22396))?cljs.core.apply.call(null,cljs.core.hash_map,map__22396):map__22396);var on_stop = cljs.core.get.call(null,map__22396__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__22396__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__22396__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__22396,map__22396__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__22396,map__22396__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__22396,map__22396__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__22396,map__22396__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text){
return (function (p1__22391_SHARP_){var G__22397 = p1__22391_SHARP_.which;switch (G__22397) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text){
return (function (p1__22392_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__22392_SHARP_.target.value);
});})(val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__22396,map__22396__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__22399_SHARP_){return reagent.core.dom_node.call(null,p1__22399_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__22401){var map__22407 = p__22401;var map__22407__$1 = ((cljs.core.seq_QMARK_.call(null,map__22407))?cljs.core.apply.call(null,cljs.core.hash_map,map__22407):map__22407);var corner = cljs.core.get.call(null,map__22407__$1,new cljs.core.Keyword(null,"corner","corner",1296717125));var messages = cljs.core.get.call(null,map__22407__$1,new cljs.core.Keyword(null,"messages","messages",345434482));return ((function (map__22407,map__22407__$1,corner,messages){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4391__auto__ = ((function (map__22407,map__22407__$1,corner,messages){
return (function iter__22408(s__22409){return (new cljs.core.LazySeq(null,((function (map__22407,map__22407__$1,corner,messages){
return (function (){var s__22409__$1 = s__22409;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__22409__$1);if(temp__4126__auto__)
{var s__22409__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22409__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__22409__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__22411 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__22410 = (0);while(true){
if((i__22410 < size__4390__auto__))
{var message = cljs.core._nth.call(null,c__4389__auto__,i__22410);cljs.core.chunk_append.call(null,b__22411,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__22410,id,author,message,c__4389__auto__,size__4390__auto__,b__22411,s__22409__$2,temp__4126__auto__,map__22407,map__22407__$1,corner,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__22410,id,author,message,c__4389__auto__,size__4390__auto__,b__22411,s__22409__$2,temp__4126__auto__,map__22407,map__22407__$1,corner,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__22412 = (i__22410 + (1));
i__22410 = G__22412;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22411),iter__22408.call(null,cljs.core.chunk_rest.call(null,s__22409__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22411),null);
}
} else
{var message = cljs.core.first.call(null,s__22409__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__22409__$2,temp__4126__auto__,map__22407,map__22407__$1,corner,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__22409__$2,temp__4126__auto__,map__22407,map__22407__$1,corner,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__22408.call(null,cljs.core.rest.call(null,s__22409__$2)));
}
} else
{return null;
}
break;
}
});})(map__22407,map__22407__$1,corner,messages))
,null,null));
});})(map__22407,map__22407__$1,corner,messages))
;return iter__4391__auto__.call(null,cljs.core.filter.call(null,((function (iter__4391__auto__,map__22407,map__22407__$1,corner,messages){
return (function (p1__22400_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"room","room",536484922).cljs$core$IFn$_invoke$arity$1(p1__22400_SHARP_),corner);
});})(iter__4391__auto__,map__22407,map__22407__$1,corner,messages))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs))));
})()], null);
});
;})(map__22407,map__22407__$1,corner,messages))
});
room.core.message_box = cljs.core.with_meta.call(null,room.core.message_list,(function (){var should_scroll = reagent.core.atom.call(null,false);return cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-will-update","component-will-update",335247566),((function (should_scroll){
return (function (this$,new_argv){var n = reagent.core.dom_node.call(null,this$);if(((n.offsetHeight + n.scrollTop) === n.scrollHeight))
{return cljs.core.reset_BANG_.call(null,should_scroll,true);
} else
{return null;
}
});})(should_scroll))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),((function (should_scroll){
return (function (this$){if(cljs.core.truth_(cljs.core.deref.call(null,should_scroll)))
{var n = reagent.core.dom_node.call(null,this$);n.scrollTop = n.scrollHeight;
return cljs.core.reset_BANG_.call(null,should_scroll,false);
} else
{return null;
}
});})(should_scroll))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),((function (should_scroll){
return (function (this$){var n = reagent.core.dom_node.call(null,this$);n.scrollTop = n.scrollHeight;
return cljs.core.reset_BANG_.call(null,should_scroll,false);
});})(should_scroll))
], null));
})());
room.core.about = (function about(){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h1","h1",-1896887462),"hello"], null);
});
room.core.home = (function home(corner){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var messages = cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs));var user = cljs.core.js__GT_clj.call(null,window.user);var rooms = cljs.core.js__GT_clj.call(null,window.rooms);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#app-container","div#app-container",885069730),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#nav","div#nav",1538049517),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#usermenu","div#usermenu",-1448102456),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img#userimage","img#userimage",-1628825411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(user.call(null,"hash"))+"?s=100")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#username","span#username",1476994130),user.call(null,"name")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"/logout"], null),"Logout"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#rooms","div#rooms",1844160804),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Corners"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),(function (){var iter__4391__auto__ = ((function (messages,user,rooms,filt){
return (function iter__22417(s__22418){return (new cljs.core.LazySeq(null,((function (messages,user,rooms,filt){
return (function (){var s__22418__$1 = s__22418;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__22418__$1);if(temp__4126__auto__)
{var s__22418__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__22418__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__22418__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__22420 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__22419 = (0);while(true){
if((i__22419 < size__4390__auto__))
{var room__$1 = cljs.core._nth.call(null,c__4389__auto__,i__22419);cljs.core.chunk_append.call(null,b__22420,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),room__$1.call(null,"room"),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__22419,room__$1,c__4389__auto__,size__4390__auto__,b__22420,s__22418__$2,temp__4126__auto__,messages,user,rooms,filt){
return (function (){return secretary.core.dispatch_BANG_.call(null,("/corners/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(room__$1.call(null,"room"))));
});})(i__22419,room__$1,c__4389__auto__,size__4390__auto__,b__22420,s__22418__$2,temp__4126__auto__,messages,user,rooms,filt))
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.hash","span.hash",553893890),"#"], null),room__$1.call(null,"room")], null));
{
var G__22421 = (i__22419 + (1));
i__22419 = G__22421;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22420),iter__22417.call(null,cljs.core.chunk_rest.call(null,s__22418__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__22420),null);
}
} else
{var room__$1 = cljs.core.first.call(null,s__22418__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),room__$1.call(null,"room"),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (room__$1,s__22418__$2,temp__4126__auto__,messages,user,rooms,filt){
return (function (){return secretary.core.dispatch_BANG_.call(null,("/corners/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(room__$1.call(null,"room"))));
});})(room__$1,s__22418__$2,temp__4126__auto__,messages,user,rooms,filt))
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.hash","span.hash",553893890),"#"], null),room__$1.call(null,"room")], null),iter__22417.call(null,cljs.core.rest.call(null,s__22418__$2)));
}
} else
{return null;
}
break;
}
});})(messages,user,rooms,filt))
,null,null));
});})(messages,user,rooms,filt))
;return iter__4391__auto__.call(null,rooms);
})()], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#content","div#content",-850771127),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#body","div#body",250558726),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_box,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"messages","messages",345434482),messages,new cljs.core.Keyword(null,"corner","corner",1296717125),corner], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#footer","div#footer",861595109),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null)], null)], null)], null);
});
;})(filt))
});
var action__4624__auto___22424 = (function (params__4625__auto__){if(cljs.core.map_QMARK_.call(null,params__4625__auto__))
{var map__22422 = params__4625__auto__;var map__22422__$1 = ((cljs.core.seq_QMARK_.call(null,map__22422))?cljs.core.apply.call(null,cljs.core.hash_map,map__22422):map__22422);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
} else
{if(cljs.core.vector_QMARK_.call(null,params__4625__auto__))
{var vec__22423 = params__4625__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4624__auto___22424);
var action__4624__auto___22427 = (function (params__4625__auto__){if(cljs.core.map_QMARK_.call(null,params__4625__auto__))
{var map__22425 = params__4625__auto__;var map__22425__$1 = ((cljs.core.seq_QMARK_.call(null,map__22425))?cljs.core.apply.call(null,cljs.core.hash_map,map__22425):map__22425);var id = cljs.core.get.call(null,map__22425__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),id);
} else
{if(cljs.core.vector_QMARK_.call(null,params__4625__auto__))
{var vec__22426 = params__4625__auto__;var id = cljs.core.nth.call(null,vec__22426,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),id);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/corners/:id",action__4624__auto___22427);
room.core.current_corner = reagent.core.atom.call(null,null);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240)))], null);
});
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
room.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map