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
var map__23448_23449 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__23448_23450__$1 = ((cljs.core.seq_QMARK_.call(null,map__23448_23449))?cljs.core.apply.call(null,cljs.core.hash_map,map__23448_23449):map__23448_23449);var state_23451 = cljs.core.get.call(null,map__23448_23450__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_23452 = cljs.core.get.call(null,map__23448_23450__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_23453 = cljs.core.get.call(null,map__23448_23450__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_23454 = cljs.core.get.call(null,map__23448_23450__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_23454;
room.core.ch_chsk = ch_recv_23453;
room.core.chsk_send_BANG_ = send_fn_23452;
room.core.chsk_state = state_23451;
room.core.messages = cljs.core.js__GT_clj.call(null,window.messages);
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.rms = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.message_counter = reagent.core.atom.call(null,(0));
room.core.add_message = (function add_message(id,author,text,time,room__$1){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"room","room",536484922),room__$1], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.dissoc,id);
});
var seq__23455_23459 = cljs.core.seq.call(null,room.core.messages);var chunk__23456_23460 = null;var count__23457_23461 = (0);var i__23458_23462 = (0);while(true){
if((i__23458_23462 < count__23457_23461))
{var m_23463 = cljs.core._nth.call(null,chunk__23456_23460,i__23458_23462);var author_23464 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_23463,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_23463,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_23463,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_23463,"hash")], null);var id_23465 = cljs.core.get.call(null,m_23463,"id");room.core.add_message.call(null,id_23465,author_23464,cljs.core.get.call(null,m_23463,"text"),cljs.core.get.call(null,m_23463,"created_at"),cljs.core.get.call(null,m_23463,"room"));
{
var G__23466 = seq__23455_23459;
var G__23467 = chunk__23456_23460;
var G__23468 = count__23457_23461;
var G__23469 = (i__23458_23462 + (1));
seq__23455_23459 = G__23466;
chunk__23456_23460 = G__23467;
count__23457_23461 = G__23468;
i__23458_23462 = G__23469;
continue;
}
} else
{var temp__4126__auto___23470 = cljs.core.seq.call(null,seq__23455_23459);if(temp__4126__auto___23470)
{var seq__23455_23471__$1 = temp__4126__auto___23470;if(cljs.core.chunked_seq_QMARK_.call(null,seq__23455_23471__$1))
{var c__4422__auto___23472 = cljs.core.chunk_first.call(null,seq__23455_23471__$1);{
var G__23473 = cljs.core.chunk_rest.call(null,seq__23455_23471__$1);
var G__23474 = c__4422__auto___23472;
var G__23475 = cljs.core.count.call(null,c__4422__auto___23472);
var G__23476 = (0);
seq__23455_23459 = G__23473;
chunk__23456_23460 = G__23474;
count__23457_23461 = G__23475;
i__23458_23462 = G__23476;
continue;
}
} else
{var m_23477 = cljs.core.first.call(null,seq__23455_23471__$1);var author_23478 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_23477,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_23477,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_23477,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_23477,"hash")], null);var id_23479 = cljs.core.get.call(null,m_23477,"id");room.core.add_message.call(null,id_23479,author_23478,cljs.core.get.call(null,m_23477,"text"),cljs.core.get.call(null,m_23477,"created_at"),cljs.core.get.call(null,m_23477,"room"));
{
var G__23480 = cljs.core.next.call(null,seq__23455_23471__$1);
var G__23481 = null;
var G__23482 = (0);
var G__23483 = (0);
seq__23455_23459 = G__23480;
chunk__23456_23460 = G__23481;
count__23457_23461 = G__23482;
i__23458_23462 = G__23483;
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
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__23484){var map__23487 = p__23484;var map__23487__$1 = ((cljs.core.seq_QMARK_.call(null,map__23487))?cljs.core.apply.call(null,cljs.core.hash_map,map__23487):map__23487);var ev_msg = map__23487__$1;var event = cljs.core.get.call(null,map__23487__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__23487__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__23488 = event;var id = cljs.core.nth.call(null,vec__23488,(0),null);var data = cljs.core.nth.call(null,vec__23488,(1),null);var ev = vec__23488;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__23489){var map__23490 = p__23489;var map__23490__$1 = ((cljs.core.seq_QMARK_.call(null,map__23490))?cljs.core.apply.call(null,cljs.core.hash_map,map__23490):map__23490);var ev_msg = map__23490__$1;var event = cljs.core.get.call(null,map__23490__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__23491){var map__23492 = p__23491;var map__23492__$1 = ((cljs.core.seq_QMARK_.call(null,map__23492))?cljs.core.apply.call(null,cljs.core.hash_map,map__23492):map__23492);var ev_msg = map__23492__$1;var _QMARK_data = cljs.core.get.call(null,map__23492__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__23493){var map__23494 = p__23493;var map__23494__$1 = ((cljs.core.seq_QMARK_.call(null,map__23494))?cljs.core.apply.call(null,cljs.core.hash_map,map__23494):map__23494);var ev_msg = map__23494__$1;var event = cljs.core.get.call(null,map__23494__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__23494__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__23495 = event;var id = cljs.core.nth.call(null,vec__23495,(0),null);var data = cljs.core.nth.call(null,vec__23495,(1),null);var ev = vec__23495;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("chat","broadcast","chat/broadcast",1767233264)))
{var msg_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(params);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(params);var room__$1 = new cljs.core.Keyword(null,"room","room",536484922).cljs$core$IFn$_invoke$arity$1(params);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,msg_id,author,msg,moment(),room__$1);
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("message","delete","message/delete",-974271757)))
{return room.core.delete_message.call(null,params);
} else
{return null;
}
}
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","send","message/send",-2110392641),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"room","room",536484922),room.session.get.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240))], null)], null));
});
room.core.send_delete_message = (function send_delete_message(id){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","delete","message/delete",-974271757),id], null));
});
room.core.send_typing = (function send_typing(){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","typing","user/typing",1085864163)], null));
});
room.core.message_input = (function message_input(p__23498){var map__23501 = p__23498;var map__23501__$1 = ((cljs.core.seq_QMARK_.call(null,map__23501))?cljs.core.apply.call(null,cljs.core.hash_map,map__23501):map__23501);var on_stop = cljs.core.get.call(null,map__23501__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__23501__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__23501__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__23501,map__23501__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__23501,map__23501__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__23501,map__23501__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__23501,map__23501__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text){
return (function (p1__23496_SHARP_){var G__23502 = p1__23496_SHARP_.which;switch (G__23502) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text){
return (function (p1__23497_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__23497_SHARP_.target.value);
});})(val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__23501,map__23501__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__23504_SHARP_){return reagent.core.dom_node.call(null,p1__23504_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__23506){var map__23512 = p__23506;var map__23512__$1 = ((cljs.core.seq_QMARK_.call(null,map__23512))?cljs.core.apply.call(null,cljs.core.hash_map,map__23512):map__23512);var corner = cljs.core.get.call(null,map__23512__$1,new cljs.core.Keyword(null,"corner","corner",1296717125));var messages = cljs.core.get.call(null,map__23512__$1,new cljs.core.Keyword(null,"messages","messages",345434482));return ((function (map__23512,map__23512__$1,corner,messages){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4391__auto__ = ((function (map__23512,map__23512__$1,corner,messages){
return (function iter__23513(s__23514){return (new cljs.core.LazySeq(null,((function (map__23512,map__23512__$1,corner,messages){
return (function (){var s__23514__$1 = s__23514;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__23514__$1);if(temp__4126__auto__)
{var s__23514__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__23514__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__23514__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__23516 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__23515 = (0);while(true){
if((i__23515 < size__4390__auto__))
{var message = cljs.core._nth.call(null,c__4389__auto__,i__23515);cljs.core.chunk_append.call(null,b__23516,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__23515,id,author,message,c__4389__auto__,size__4390__auto__,b__23516,s__23514__$2,temp__4126__auto__,map__23512,map__23512__$1,corner,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__23515,id,author,message,c__4389__auto__,size__4390__auto__,b__23516,s__23514__$2,temp__4126__auto__,map__23512,map__23512__$1,corner,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__23517 = (i__23515 + (1));
i__23515 = G__23517;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23516),iter__23513.call(null,cljs.core.chunk_rest.call(null,s__23514__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23516),null);
}
} else
{var message = cljs.core.first.call(null,s__23514__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__23514__$2,temp__4126__auto__,map__23512,map__23512__$1,corner,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__23514__$2,temp__4126__auto__,map__23512,map__23512__$1,corner,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__23513.call(null,cljs.core.rest.call(null,s__23514__$2)));
}
} else
{return null;
}
break;
}
});})(map__23512,map__23512__$1,corner,messages))
,null,null));
});})(map__23512,map__23512__$1,corner,messages))
;return iter__4391__auto__.call(null,cljs.core.filter.call(null,((function (iter__4391__auto__,map__23512,map__23512__$1,corner,messages){
return (function (p1__23505_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"room","room",536484922).cljs$core$IFn$_invoke$arity$1(p1__23505_SHARP_),corner);
});})(iter__4391__auto__,map__23512,map__23512__$1,corner,messages))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs))));
})()], null);
});
;})(map__23512,map__23512__$1,corner,messages))
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
return (function iter__23522(s__23523){return (new cljs.core.LazySeq(null,((function (messages,user,rooms,filt){
return (function (){var s__23523__$1 = s__23523;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__23523__$1);if(temp__4126__auto__)
{var s__23523__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__23523__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__23523__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__23525 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__23524 = (0);while(true){
if((i__23524 < size__4390__auto__))
{var room__$1 = cljs.core._nth.call(null,c__4389__auto__,i__23524);cljs.core.chunk_append.call(null,b__23525,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),room__$1.call(null,"room"),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__23524,room__$1,c__4389__auto__,size__4390__auto__,b__23525,s__23523__$2,temp__4126__auto__,messages,user,rooms,filt){
return (function (){return secretary.core.dispatch_BANG_.call(null,("/corners/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(room__$1.call(null,"room"))));
});})(i__23524,room__$1,c__4389__auto__,size__4390__auto__,b__23525,s__23523__$2,temp__4126__auto__,messages,user,rooms,filt))
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.hash","span.hash",553893890),"#"], null),room__$1.call(null,"room")], null));
{
var G__23526 = (i__23524 + (1));
i__23524 = G__23526;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23525),iter__23522.call(null,cljs.core.chunk_rest.call(null,s__23523__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23525),null);
}
} else
{var room__$1 = cljs.core.first.call(null,s__23523__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),room__$1.call(null,"room"),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (room__$1,s__23523__$2,temp__4126__auto__,messages,user,rooms,filt){
return (function (){return secretary.core.dispatch_BANG_.call(null,("/corners/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(room__$1.call(null,"room"))));
});})(room__$1,s__23523__$2,temp__4126__auto__,messages,user,rooms,filt))
], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.hash","span.hash",553893890),"#"], null),room__$1.call(null,"room")], null),iter__23522.call(null,cljs.core.rest.call(null,s__23523__$2)));
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
var action__4624__auto___23529 = (function (params__4625__auto__){if(cljs.core.map_QMARK_.call(null,params__4625__auto__))
{var map__23527 = params__4625__auto__;var map__23527__$1 = ((cljs.core.seq_QMARK_.call(null,map__23527))?cljs.core.apply.call(null,cljs.core.hash_map,map__23527):map__23527);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
} else
{if(cljs.core.vector_QMARK_.call(null,params__4625__auto__))
{var vec__23528 = params__4625__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4624__auto___23529);
var action__4624__auto___23532 = (function (params__4625__auto__){if(cljs.core.map_QMARK_.call(null,params__4625__auto__))
{var map__23530 = params__4625__auto__;var map__23530__$1 = ((cljs.core.seq_QMARK_.call(null,map__23530))?cljs.core.apply.call(null,cljs.core.hash_map,map__23530):map__23530);var id = cljs.core.get.call(null,map__23530__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),id);
} else
{if(cljs.core.vector_QMARK_.call(null,params__4625__auto__))
{var vec__23531 = params__4625__auto__;var id = cljs.core.nth.call(null,vec__23531,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),id);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/corners/:id",action__4624__auto___23532);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240)))], null);
});
room.core.current_corner = reagent.core.atom.call(null,null);
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-corner","current-corner",-348075240),"general");
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
room.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map