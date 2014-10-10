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
var map__20068_20069 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__20068_20070__$1 = ((cljs.core.seq_QMARK_.call(null,map__20068_20069))?cljs.core.apply.call(null,cljs.core.hash_map,map__20068_20069):map__20068_20069);var state_20071 = cljs.core.get.call(null,map__20068_20070__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_20072 = cljs.core.get.call(null,map__20068_20070__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_20073 = cljs.core.get.call(null,map__20068_20070__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_20074 = cljs.core.get.call(null,map__20068_20070__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_20074;
room.core.ch_chsk = ch_recv_20073;
room.core.chsk_send_BANG_ = send_fn_20072;
room.core.chsk_state = state_20071;
room.core.messages = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.add_message = (function add_message(id,author,text,time,topic_id){return cljs.core.swap_BANG_.call(null,room.core.messages,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706),topic_id], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.messages,cljs.core.dissoc,id);
});
var seq__20075_20079 = cljs.core.seq.call(null,cljs.core.js__GT_clj.call(null,window.messages));var chunk__20076_20080 = null;var count__20077_20081 = (0);var i__20078_20082 = (0);while(true){
if((i__20078_20082 < count__20077_20081))
{var m_20083 = cljs.core._nth.call(null,chunk__20076_20080,i__20078_20082);var author_20084 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_20083,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_20083,"author"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_20083,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_20083,"hash")], null);var id_20085 = cljs.core.get.call(null,m_20083,"id");room.core.add_message.call(null,id_20085,author_20084,cljs.core.get.call(null,m_20083,"text"),cljs.core.get.call(null,m_20083,"created_at"),cljs.core.get.call(null,m_20083,"topic_id"));
{
var G__20086 = seq__20075_20079;
var G__20087 = chunk__20076_20080;
var G__20088 = count__20077_20081;
var G__20089 = (i__20078_20082 + (1));
seq__20075_20079 = G__20086;
chunk__20076_20080 = G__20087;
count__20077_20081 = G__20088;
i__20078_20082 = G__20089;
continue;
}
} else
{var temp__4126__auto___20090 = cljs.core.seq.call(null,seq__20075_20079);if(temp__4126__auto___20090)
{var seq__20075_20091__$1 = temp__4126__auto___20090;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20075_20091__$1))
{var c__4231__auto___20092 = cljs.core.chunk_first.call(null,seq__20075_20091__$1);{
var G__20093 = cljs.core.chunk_rest.call(null,seq__20075_20091__$1);
var G__20094 = c__4231__auto___20092;
var G__20095 = cljs.core.count.call(null,c__4231__auto___20092);
var G__20096 = (0);
seq__20075_20079 = G__20093;
chunk__20076_20080 = G__20094;
count__20077_20081 = G__20095;
i__20078_20082 = G__20096;
continue;
}
} else
{var m_20097 = cljs.core.first.call(null,seq__20075_20091__$1);var author_20098 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_20097,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_20097,"author"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_20097,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_20097,"hash")], null);var id_20099 = cljs.core.get.call(null,m_20097,"id");room.core.add_message.call(null,id_20099,author_20098,cljs.core.get.call(null,m_20097,"text"),cljs.core.get.call(null,m_20097,"created_at"),cljs.core.get.call(null,m_20097,"topic_id"));
{
var G__20100 = cljs.core.next.call(null,seq__20075_20091__$1);
var G__20101 = null;
var G__20102 = (0);
var G__20103 = (0);
seq__20075_20079 = G__20100;
chunk__20076_20080 = G__20101;
count__20077_20081 = G__20102;
i__20078_20082 = G__20103;
continue;
}
}
} else
{}
}
break;
}
room.core.event_msg_handler = (function (){var method_table__4341__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4342__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4343__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4344__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4345__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("event-msg-handler",new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4345__auto__,method_table__4341__auto__,prefer_table__4342__auto__,method_cache__4343__auto__,cached_hierarchy__4344__auto__));
})();
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__20104){var map__20107 = p__20104;var map__20107__$1 = ((cljs.core.seq_QMARK_.call(null,map__20107))?cljs.core.apply.call(null,cljs.core.hash_map,map__20107):map__20107);var ev_msg = map__20107__$1;var event = cljs.core.get.call(null,map__20107__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__20107__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__20108 = event;var id = cljs.core.nth.call(null,vec__20108,(0),null);var data = cljs.core.nth.call(null,vec__20108,(1),null);var ev = vec__20108;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__20109){var map__20110 = p__20109;var map__20110__$1 = ((cljs.core.seq_QMARK_.call(null,map__20110))?cljs.core.apply.call(null,cljs.core.hash_map,map__20110):map__20110);var ev_msg = map__20110__$1;var event = cljs.core.get.call(null,map__20110__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__20111){var map__20112 = p__20111;var map__20112__$1 = ((cljs.core.seq_QMARK_.call(null,map__20112))?cljs.core.apply.call(null,cljs.core.hash_map,map__20112):map__20112);var ev_msg = map__20112__$1;var _QMARK_data = cljs.core.get.call(null,map__20112__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
} else
{return null;
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__20113){var map__20114 = p__20113;var map__20114__$1 = ((cljs.core.seq_QMARK_.call(null,map__20114))?cljs.core.apply.call(null,cljs.core.hash_map,map__20114):map__20114);var ev_msg = map__20114__$1;var event = cljs.core.get.call(null,map__20114__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__20114__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__20115 = event;var id = cljs.core.nth.call(null,vec__20115,(0),null);var data = cljs.core.nth.call(null,vec__20115,(1),null);var ev = vec__20115;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("topic","broadcast","topic/broadcast",1595774233)))
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
room.core.message_input = (function message_input(p__20118){var map__20121 = p__20118;var map__20121__$1 = ((cljs.core.seq_QMARK_.call(null,map__20121))?cljs.core.apply.call(null,cljs.core.hash_map,map__20121):map__20121);var on_stop = cljs.core.get.call(null,map__20121__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__20121__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__20121__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__20121,map__20121__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__20121,map__20121__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__20121,map__20121__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__20121,map__20121__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text){
return (function (p1__20116_SHARP_){var G__20122 = p1__20116_SHARP_.which;switch (G__20122) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text){
return (function (p1__20117_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__20117_SHARP_.target.value);
});})(val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__20121,map__20121__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__20124_SHARP_){return reagent.core.dom_node.call(null,p1__20124_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__20126){var map__20132 = p__20126;var map__20132__$1 = ((cljs.core.seq_QMARK_.call(null,map__20132))?cljs.core.apply.call(null,cljs.core.hash_map,map__20132):map__20132);var topic_id = cljs.core.get.call(null,map__20132__$1,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706));return ((function (map__20132,map__20132__$1,topic_id){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4200__auto__ = ((function (map__20132,map__20132__$1,topic_id){
return (function iter__20133(s__20134){return (new cljs.core.LazySeq(null,((function (map__20132,map__20132__$1,topic_id){
return (function (){var s__20134__$1 = s__20134;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__20134__$1);if(temp__4126__auto__)
{var s__20134__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__20134__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__20134__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__20136 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__20135 = (0);while(true){
if((i__20135 < size__4199__auto__))
{var message = cljs.core._nth.call(null,c__4198__auto__,i__20135);cljs.core.chunk_append.call(null,b__20136,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__20135,id,author,message,c__4198__auto__,size__4199__auto__,b__20136,s__20134__$2,temp__4126__auto__,map__20132,map__20132__$1,topic_id){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__20135,id,author,message,c__4198__auto__,size__4199__auto__,b__20136,s__20134__$2,temp__4126__auto__,map__20132,map__20132__$1,topic_id))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__20137 = (i__20135 + (1));
i__20135 = G__20137;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20136),iter__20133.call(null,cljs.core.chunk_rest.call(null,s__20134__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20136),null);
}
} else
{var message = cljs.core.first.call(null,s__20134__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__20134__$2,temp__4126__auto__,map__20132,map__20132__$1,topic_id){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__20134__$2,temp__4126__auto__,map__20132,map__20132__$1,topic_id))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__20133.call(null,cljs.core.rest.call(null,s__20134__$2)));
}
} else
{return null;
}
break;
}
});})(map__20132,map__20132__$1,topic_id))
,null,null));
});})(map__20132,map__20132__$1,topic_id))
;return iter__4200__auto__.call(null,cljs.core.filter.call(null,((function (iter__4200__auto__,map__20132,map__20132__$1,topic_id){
return (function (p1__20125_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"topic-id","topic-id",-1334453706).cljs$core$IFn$_invoke$arity$1(p1__20125_SHARP_),topic_id);
});})(iter__4200__auto__,map__20132,map__20132__$1,topic_id))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.messages))));
})()], null);
});
;})(map__20132,map__20132__$1,topic_id))
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
var action__4433__auto___20140 = (function (params__4434__auto__){if(cljs.core.map_QMARK_.call(null,params__4434__auto__))
{var map__20138 = params__4434__auto__;var map__20138__$1 = ((cljs.core.seq_QMARK_.call(null,map__20138))?cljs.core.apply.call(null,cljs.core.hash_map,map__20138):map__20138);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
} else
{if(cljs.core.vector_QMARK_.call(null,params__4434__auto__))
{var vec__20139 = params__4434__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4433__auto___20140);
var action__4433__auto___20143 = (function (params__4434__auto__){if(cljs.core.map_QMARK_.call(null,params__4434__auto__))
{var map__20141 = params__4434__auto__;var map__20141__$1 = ((cljs.core.seq_QMARK_.call(null,map__20141))?cljs.core.apply.call(null,cljs.core.hash_map,map__20141):map__20141);var id = cljs.core.get.call(null,map__20141__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),parseInt(id));
} else
{if(cljs.core.vector_QMARK_.call(null,params__4434__auto__))
{var vec__20142 = params__4434__auto__;var id = cljs.core.nth.call(null,vec__20142,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),parseInt(id));
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/topics/:id",action__4433__auto___20143);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864)))], null);
});
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),(2));
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
goog.exportSymbol('room.core.init_BANG_', room.core.init_BANG_);
room.core.init_BANG_.call(null);
