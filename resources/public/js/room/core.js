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
goog.require('room.topics');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('room.topics');
goog.require('secretary.core');
goog.require('room.session');
goog.require('taoensso.encore');
var map__10518_10519 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10518_10520__$1 = ((cljs.core.seq_QMARK_.call(null,map__10518_10519))?cljs.core.apply.call(null,cljs.core.hash_map,map__10518_10519):map__10518_10519);var state_10521 = cljs.core.get.call(null,map__10518_10520__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_10522 = cljs.core.get.call(null,map__10518_10520__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10523 = cljs.core.get.call(null,map__10518_10520__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10524 = cljs.core.get.call(null,map__10518_10520__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_10524;
room.core.ch_chsk = ch_recv_10523;
room.core.chsk_send_BANG_ = send_fn_10522;
room.core.chsk_state = state_10521;
room.core.messages = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.add_message = (function add_message(id,author,text,time,topic_id){return cljs.core.swap_BANG_.call(null,room.core.messages,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706),topic_id], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.messages,cljs.core.dissoc,id);
});
var seq__10525_10529 = cljs.core.seq.call(null,cljs.core.js__GT_clj.call(null,window.messages));var chunk__10526_10530 = null;var count__10527_10531 = (0);var i__10528_10532 = (0);while(true){
if((i__10528_10532 < count__10527_10531))
{var m_10533 = cljs.core._nth.call(null,chunk__10526_10530,i__10528_10532);var author_10534 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_10533,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_10533,"author"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_10533,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_10533,"hash")], null);var id_10535 = cljs.core.get.call(null,m_10533,"id");room.core.add_message.call(null,id_10535,author_10534,cljs.core.get.call(null,m_10533,"text"),cljs.core.get.call(null,m_10533,"created_at"),cljs.core.get.call(null,m_10533,"topic_id"));
{
var G__10536 = seq__10525_10529;
var G__10537 = chunk__10526_10530;
var G__10538 = count__10527_10531;
var G__10539 = (i__10528_10532 + (1));
seq__10525_10529 = G__10536;
chunk__10526_10530 = G__10537;
count__10527_10531 = G__10538;
i__10528_10532 = G__10539;
continue;
}
} else
{var temp__4126__auto___10540 = cljs.core.seq.call(null,seq__10525_10529);if(temp__4126__auto___10540)
{var seq__10525_10541__$1 = temp__4126__auto___10540;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10525_10541__$1))
{var c__4233__auto___10542 = cljs.core.chunk_first.call(null,seq__10525_10541__$1);{
var G__10543 = cljs.core.chunk_rest.call(null,seq__10525_10541__$1);
var G__10544 = c__4233__auto___10542;
var G__10545 = cljs.core.count.call(null,c__4233__auto___10542);
var G__10546 = (0);
seq__10525_10529 = G__10543;
chunk__10526_10530 = G__10544;
count__10527_10531 = G__10545;
i__10528_10532 = G__10546;
continue;
}
} else
{var m_10547 = cljs.core.first.call(null,seq__10525_10541__$1);var author_10548 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_10547,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_10547,"author"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_10547,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_10547,"hash")], null);var id_10549 = cljs.core.get.call(null,m_10547,"id");room.core.add_message.call(null,id_10549,author_10548,cljs.core.get.call(null,m_10547,"text"),cljs.core.get.call(null,m_10547,"created_at"),cljs.core.get.call(null,m_10547,"topic_id"));
{
var G__10550 = cljs.core.next.call(null,seq__10525_10541__$1);
var G__10551 = null;
var G__10552 = (0);
var G__10553 = (0);
seq__10525_10529 = G__10550;
chunk__10526_10530 = G__10551;
count__10527_10531 = G__10552;
i__10528_10532 = G__10553;
continue;
}
}
} else
{}
}
break;
}
room.core.event_msg_handler = (function (){var method_table__4343__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4344__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4345__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4346__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4347__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("event-msg-handler",new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4347__auto__,method_table__4343__auto__,prefer_table__4344__auto__,method_cache__4345__auto__,cached_hierarchy__4346__auto__));
})();
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__10554){var map__10557 = p__10554;var map__10557__$1 = ((cljs.core.seq_QMARK_.call(null,map__10557))?cljs.core.apply.call(null,cljs.core.hash_map,map__10557):map__10557);var ev_msg = map__10557__$1;var event = cljs.core.get.call(null,map__10557__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__10557__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__10558 = event;var id = cljs.core.nth.call(null,vec__10558,(0),null);var data = cljs.core.nth.call(null,vec__10558,(1),null);var ev = vec__10558;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__10559){var map__10560 = p__10559;var map__10560__$1 = ((cljs.core.seq_QMARK_.call(null,map__10560))?cljs.core.apply.call(null,cljs.core.hash_map,map__10560):map__10560);var ev_msg = map__10560__$1;var event = cljs.core.get.call(null,map__10560__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__10561){var map__10562 = p__10561;var map__10562__$1 = ((cljs.core.seq_QMARK_.call(null,map__10562))?cljs.core.apply.call(null,cljs.core.hash_map,map__10562):map__10562);var ev_msg = map__10562__$1;var _QMARK_data = cljs.core.get.call(null,map__10562__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
} else
{return null;
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__10563){var map__10564 = p__10563;var map__10564__$1 = ((cljs.core.seq_QMARK_.call(null,map__10564))?cljs.core.apply.call(null,cljs.core.hash_map,map__10564):map__10564);var ev_msg = map__10564__$1;var event = cljs.core.get.call(null,map__10564__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__10564__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__10565 = event;var id = cljs.core.nth.call(null,vec__10565,(0),null);var data = cljs.core.nth.call(null,vec__10565,(1),null);var ev = vec__10565;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("topic","broadcast","topic/broadcast",1595774233)))
{var msg_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(params);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(params);var topic_id = new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706).cljs$core$IFn$_invoke$arity$1(params);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,msg_id,author,msg,moment(),topic_id);
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("topic","new","topic/new",-2111599339)))
{var id__$1 = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params);var users = new cljs.core.Keyword(null,"users","users",-713552705).cljs$core$IFn$_invoke$arity$1(params);return room.topics.add_topic.call(null,id__$1,name,users);
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("message","delete","message/delete",-974271757)))
{return room.core.delete_message.call(null,params);
} else
{return null;
}
}
}
}));
room.core.send_message = (function send_message(text){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","send","message/send",-2110392641),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"topic","topic",-1960480691),room.session.get.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864))], null)], null));
});
room.core.send_delete_message = (function send_delete_message(id){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","delete","message/delete",-974271757),id], null));
});
room.core.send_typing = (function send_typing(){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","typing","user/typing",1085864163)], null));
});
room.core.message_input = (function message_input(p__10568){var map__10571 = p__10568;var map__10571__$1 = ((cljs.core.seq_QMARK_.call(null,map__10571))?cljs.core.apply.call(null,cljs.core.hash_map,map__10571):map__10571);var on_stop = cljs.core.get.call(null,map__10571__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__10571__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__10571__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__10571,map__10571__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__10571,map__10571__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__10571,map__10571__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__10571,map__10571__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text){
return (function (p1__10566_SHARP_){var G__10572 = p1__10566_SHARP_.which;switch (G__10572) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text){
return (function (p1__10567_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__10567_SHARP_.target.value);
});})(val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__10571,map__10571__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__10574_SHARP_){return reagent.core.dom_node.call(null,p1__10574_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__10576){var map__10582 = p__10576;var map__10582__$1 = ((cljs.core.seq_QMARK_.call(null,map__10582))?cljs.core.apply.call(null,cljs.core.hash_map,map__10582):map__10582);var topic_id = cljs.core.get.call(null,map__10582__$1,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706));return ((function (map__10582,map__10582__$1,topic_id){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4202__auto__ = ((function (map__10582,map__10582__$1,topic_id){
return (function iter__10583(s__10584){return (new cljs.core.LazySeq(null,((function (map__10582,map__10582__$1,topic_id){
return (function (){var s__10584__$1 = s__10584;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10584__$1);if(temp__4126__auto__)
{var s__10584__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10584__$2))
{var c__4200__auto__ = cljs.core.chunk_first.call(null,s__10584__$2);var size__4201__auto__ = cljs.core.count.call(null,c__4200__auto__);var b__10586 = cljs.core.chunk_buffer.call(null,size__4201__auto__);if((function (){var i__10585 = (0);while(true){
if((i__10585 < size__4201__auto__))
{var message = cljs.core._nth.call(null,c__4200__auto__,i__10585);cljs.core.chunk_append.call(null,b__10586,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__10585,id,author,message,c__4200__auto__,size__4201__auto__,b__10586,s__10584__$2,temp__4126__auto__,map__10582,map__10582__$1,topic_id){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__10585,id,author,message,c__4200__auto__,size__4201__auto__,b__10586,s__10584__$2,temp__4126__auto__,map__10582,map__10582__$1,topic_id))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__10587 = (i__10585 + (1));
i__10585 = G__10587;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10586),iter__10583.call(null,cljs.core.chunk_rest.call(null,s__10584__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10586),null);
}
} else
{var message = cljs.core.first.call(null,s__10584__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__10584__$2,temp__4126__auto__,map__10582,map__10582__$1,topic_id){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__10584__$2,temp__4126__auto__,map__10582,map__10582__$1,topic_id))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__10583.call(null,cljs.core.rest.call(null,s__10584__$2)));
}
} else
{return null;
}
break;
}
});})(map__10582,map__10582__$1,topic_id))
,null,null));
});})(map__10582,map__10582__$1,topic_id))
;return iter__4202__auto__.call(null,cljs.core.filter.call(null,((function (iter__4202__auto__,map__10582,map__10582__$1,topic_id){
return (function (p1__10575_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706).cljs$core$IFn$_invoke$arity$1(p1__10575_SHARP_),topic_id);
});})(iter__4202__auto__,map__10582,map__10582__$1,topic_id))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.messages))));
})()], null);
});
;})(map__10582,map__10582__$1,topic_id))
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
room.core.home = (function home(topic_id){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var user = cljs.core.js__GT_clj.call(null,window.user);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#app-container","div#app-container",885069730),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#nav","div#nav",1538049517),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#usermenu","div#usermenu",-1448102456),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img#userimage","img#userimage",-1628825411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(user.call(null,"hash"))+"?s=100")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#username","span#username",1476994130),user.call(null,"name")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"/logout"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-sign-out","i.fa.fa-sign-out",1449928134)], null)], null)], null),room.topics.topic_list.call(null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#content","div#content",-850771127),room.topics.topic_header.call(null,topic_id),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#body","div#body",250558726),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706),topic_id], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#footer","div#footer",861595109),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null)], null)], null)], null);
});
;})(filt))
});
var action__5053__auto___10590 = (function (params__5054__auto__){if(cljs.core.map_QMARK_.call(null,params__5054__auto__))
{var map__10588 = params__5054__auto__;var map__10588__$1 = ((cljs.core.seq_QMARK_.call(null,map__10588))?cljs.core.apply.call(null,cljs.core.hash_map,map__10588):map__10588);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
} else
{if(cljs.core.vector_QMARK_.call(null,params__5054__auto__))
{var vec__10589 = params__5054__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__5053__auto___10590);
var action__5053__auto___10593 = (function (params__5054__auto__){if(cljs.core.map_QMARK_.call(null,params__5054__auto__))
{var map__10591 = params__5054__auto__;var map__10591__$1 = ((cljs.core.seq_QMARK_.call(null,map__10591))?cljs.core.apply.call(null,cljs.core.hash_map,map__10591):map__10591);var id = cljs.core.get.call(null,map__10591__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),parseInt(id));
} else
{if(cljs.core.vector_QMARK_.call(null,params__5054__auto__))
{var vec__10592 = params__5054__auto__;var id = cljs.core.nth.call(null,vec__10592,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),parseInt(id));
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/topics/:id",action__5053__auto___10593);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864)))], null);
});
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
goog.exportSymbol('room.core.init_BANG_', room.core.init_BANG_);
room.core.init_BANG_.call(null);
