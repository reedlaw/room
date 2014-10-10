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
taoensso.encore.logf.call(null,"ClojureScript appears to have loaded correctly.");
room.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"saved?","saved?",-2027163192),false], null));
var map__11906_11907 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__11906_11908__$1 = ((cljs.core.seq_QMARK_.call(null,map__11906_11907))?cljs.core.apply.call(null,cljs.core.hash_map,map__11906_11907):map__11906_11907);var state_11909 = cljs.core.get.call(null,map__11906_11908__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_11910 = cljs.core.get.call(null,map__11906_11908__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_11911 = cljs.core.get.call(null,map__11906_11908__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_11912 = cljs.core.get.call(null,map__11906_11908__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_11912;
room.core.ch_chsk = ch_recv_11911;
room.core.chsk_send_BANG_ = send_fn_11910;
room.core.chsk_state = state_11909;
room.core.messages = cljs.core.js__GT_clj.call(null,window.messages);
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.current_topic = reagent.core.atom.call(null,null);
room.core.add_message = (function add_message(id,author,text,time,topic){if(!(cljs.core._EQ_.call(null,topic,room.core.current_topic)))
{room.topics.notify_new_message.call(null,topic);
} else
{}
return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"topic","topic",-1960480691),topic], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.dissoc,id);
});
var seq__11913_11917 = cljs.core.seq.call(null,room.core.messages);var chunk__11914_11918 = null;var count__11915_11919 = (0);var i__11916_11920 = (0);while(true){
if((i__11916_11920 < count__11915_11919))
{var m_11921 = cljs.core._nth.call(null,chunk__11914_11918,i__11916_11920);var author_11922 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_11921,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_11921,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_11921,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_11921,"hash")], null);var id_11923 = cljs.core.get.call(null,m_11921,"id");room.core.add_message.call(null,id_11923,author_11922,cljs.core.get.call(null,m_11921,"text"),cljs.core.get.call(null,m_11921,"created_at"),cljs.core.get.call(null,m_11921,"topic"));
{
var G__11924 = seq__11913_11917;
var G__11925 = chunk__11914_11918;
var G__11926 = count__11915_11919;
var G__11927 = (i__11916_11920 + (1));
seq__11913_11917 = G__11924;
chunk__11914_11918 = G__11925;
count__11915_11919 = G__11926;
i__11916_11920 = G__11927;
continue;
}
} else
{var temp__4126__auto___11928 = cljs.core.seq.call(null,seq__11913_11917);if(temp__4126__auto___11928)
{var seq__11913_11929__$1 = temp__4126__auto___11928;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11913_11929__$1))
{var c__4231__auto___11930 = cljs.core.chunk_first.call(null,seq__11913_11929__$1);{
var G__11931 = cljs.core.chunk_rest.call(null,seq__11913_11929__$1);
var G__11932 = c__4231__auto___11930;
var G__11933 = cljs.core.count.call(null,c__4231__auto___11930);
var G__11934 = (0);
seq__11913_11917 = G__11931;
chunk__11914_11918 = G__11932;
count__11915_11919 = G__11933;
i__11916_11920 = G__11934;
continue;
}
} else
{var m_11935 = cljs.core.first.call(null,seq__11913_11929__$1);var author_11936 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_11935,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_11935,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_11935,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_11935,"hash")], null);var id_11937 = cljs.core.get.call(null,m_11935,"id");room.core.add_message.call(null,id_11937,author_11936,cljs.core.get.call(null,m_11935,"text"),cljs.core.get.call(null,m_11935,"created_at"),cljs.core.get.call(null,m_11935,"topic"));
{
var G__11938 = cljs.core.next.call(null,seq__11913_11929__$1);
var G__11939 = null;
var G__11940 = (0);
var G__11941 = (0);
seq__11913_11917 = G__11938;
chunk__11914_11918 = G__11939;
count__11915_11919 = G__11940;
i__11916_11920 = G__11941;
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
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__11942){var map__11945 = p__11942;var map__11945__$1 = ((cljs.core.seq_QMARK_.call(null,map__11945))?cljs.core.apply.call(null,cljs.core.hash_map,map__11945):map__11945);var ev_msg = map__11945__$1;var event = cljs.core.get.call(null,map__11945__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__11945__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__11946 = event;var id = cljs.core.nth.call(null,vec__11946,(0),null);var data = cljs.core.nth.call(null,vec__11946,(1),null);var ev = vec__11946;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__11947){var map__11948 = p__11947;var map__11948__$1 = ((cljs.core.seq_QMARK_.call(null,map__11948))?cljs.core.apply.call(null,cljs.core.hash_map,map__11948):map__11948);var ev_msg = map__11948__$1;var event = cljs.core.get.call(null,map__11948__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__11949){var map__11950 = p__11949;var map__11950__$1 = ((cljs.core.seq_QMARK_.call(null,map__11950))?cljs.core.apply.call(null,cljs.core.hash_map,map__11950):map__11950);var ev_msg = map__11950__$1;var _QMARK_data = cljs.core.get.call(null,map__11950__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__11951){var map__11952 = p__11951;var map__11952__$1 = ((cljs.core.seq_QMARK_.call(null,map__11952))?cljs.core.apply.call(null,cljs.core.hash_map,map__11952):map__11952);var ev_msg = map__11952__$1;var event = cljs.core.get.call(null,map__11952__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__11952__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__11953 = event;var id = cljs.core.nth.call(null,vec__11953,(0),null);var data = cljs.core.nth.call(null,vec__11953,(1),null);var ev = vec__11953;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("topic","broadcast","topic/broadcast",1595774233)))
{var msg_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(params);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(params);var topic = new cljs.core.Keyword(null,"topic","topic",-1960480691).cljs$core$IFn$_invoke$arity$1(params);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,msg_id,author,msg,moment(),topic);
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("message","delete","message/delete",-974271757)))
{return room.core.delete_message.call(null,params);
} else
{return null;
}
}
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","send","message/send",-2110392641),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"topic","topic",-1960480691),room.session.get.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460))], null)], null));
});
room.core.send_delete_message = (function send_delete_message(id){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","delete","message/delete",-974271757),id], null));
});
room.core.send_typing = (function send_typing(){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","typing","user/typing",1085864163)], null));
});
room.core.message_input = (function message_input(p__11956){var map__11959 = p__11956;var map__11959__$1 = ((cljs.core.seq_QMARK_.call(null,map__11959))?cljs.core.apply.call(null,cljs.core.hash_map,map__11959):map__11959);var on_stop = cljs.core.get.call(null,map__11959__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__11959__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__11959__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__11959,map__11959__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__11959,map__11959__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__11959,map__11959__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__11959,map__11959__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text){
return (function (p1__11954_SHARP_){var G__11960 = p1__11954_SHARP_.which;switch (G__11960) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text){
return (function (p1__11955_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__11955_SHARP_.target.value);
});})(val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__11959,map__11959__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__11962_SHARP_){return reagent.core.dom_node.call(null,p1__11962_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__11964){var map__11970 = p__11964;var map__11970__$1 = ((cljs.core.seq_QMARK_.call(null,map__11970))?cljs.core.apply.call(null,cljs.core.hash_map,map__11970):map__11970);var topic = cljs.core.get.call(null,map__11970__$1,new cljs.core.Keyword(null,"topic","topic",-1960480691));var messages = cljs.core.get.call(null,map__11970__$1,new cljs.core.Keyword(null,"messages","messages",345434482));return ((function (map__11970,map__11970__$1,topic,messages){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4200__auto__ = ((function (map__11970,map__11970__$1,topic,messages){
return (function iter__11971(s__11972){return (new cljs.core.LazySeq(null,((function (map__11970,map__11970__$1,topic,messages){
return (function (){var s__11972__$1 = s__11972;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__11972__$1);if(temp__4126__auto__)
{var s__11972__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__11972__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__11972__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__11974 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__11973 = (0);while(true){
if((i__11973 < size__4199__auto__))
{var message = cljs.core._nth.call(null,c__4198__auto__,i__11973);cljs.core.chunk_append.call(null,b__11974,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__11973,id,author,message,c__4198__auto__,size__4199__auto__,b__11974,s__11972__$2,temp__4126__auto__,map__11970,map__11970__$1,topic,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__11973,id,author,message,c__4198__auto__,size__4199__auto__,b__11974,s__11972__$2,temp__4126__auto__,map__11970,map__11970__$1,topic,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__11975 = (i__11973 + (1));
i__11973 = G__11975;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11974),iter__11971.call(null,cljs.core.chunk_rest.call(null,s__11972__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11974),null);
}
} else
{var message = cljs.core.first.call(null,s__11972__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__11972__$2,temp__4126__auto__,map__11970,map__11970__$1,topic,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__11972__$2,temp__4126__auto__,map__11970,map__11970__$1,topic,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__11971.call(null,cljs.core.rest.call(null,s__11972__$2)));
}
} else
{return null;
}
break;
}
});})(map__11970,map__11970__$1,topic,messages))
,null,null));
});})(map__11970,map__11970__$1,topic,messages))
;return iter__4200__auto__.call(null,cljs.core.filter.call(null,((function (iter__4200__auto__,map__11970,map__11970__$1,topic,messages){
return (function (p1__11963_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"topic","topic",-1960480691).cljs$core$IFn$_invoke$arity$1(p1__11963_SHARP_),topic);
});})(iter__4200__auto__,map__11970,map__11970__$1,topic,messages))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs))));
})()], null);
});
;})(map__11970,map__11970__$1,topic,messages))
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
room.core.home = (function home(topic){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var messages = cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs));var user = cljs.core.js__GT_clj.call(null,window.user);return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#app-container","div#app-container",885069730),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#nav","div#nav",1538049517),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#usermenu","div#usermenu",-1448102456),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img#userimage","img#userimage",-1628825411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("//www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(user.call(null,"hash"))+"?s=100")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#username","span#username",1476994130),user.call(null,"name")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"/logout"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-sign-out","i.fa.fa-sign-out",1449928134)], null)], null)], null),room.topics.topic_list.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460)))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#content","div#content",-850771127),room.topics.topic_header.call(null,topic),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#body","div#body",250558726),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_box,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"messages","messages",345434482),messages,new cljs.core.Keyword(null,"topic","topic",-1960480691),topic], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#footer","div#footer",861595109),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null)], null)], null)], null);
});
;})(filt))
});
var action__4433__auto___11978 = (function (params__4434__auto__){if(cljs.core.map_QMARK_.call(null,params__4434__auto__))
{var map__11976 = params__4434__auto__;var map__11976__$1 = ((cljs.core.seq_QMARK_.call(null,map__11976))?cljs.core.apply.call(null,cljs.core.hash_map,map__11976):map__11976);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460),"general");
} else
{if(cljs.core.vector_QMARK_.call(null,params__4434__auto__))
{var vec__11977 = params__4434__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460),"general");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4433__auto___11978);
var action__4433__auto___11981 = (function (params__4434__auto__){if(cljs.core.map_QMARK_.call(null,params__4434__auto__))
{var map__11979 = params__4434__auto__;var map__11979__$1 = ((cljs.core.seq_QMARK_.call(null,map__11979))?cljs.core.apply.call(null,cljs.core.hash_map,map__11979):map__11979);var id = cljs.core.get.call(null,map__11979__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460),id);
} else
{if(cljs.core.vector_QMARK_.call(null,params__4434__auto__))
{var vec__11980 = params__4434__auto__;var id = cljs.core.nth.call(null,vec__11980,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460),id);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/topics/:id",action__4433__auto___11981);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460)))], null);
});
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic","current-topic",906553460),"general");
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
goog.exportSymbol('room.core.init_BANG_', room.core.init_BANG_);
room.core.init_BANG_.call(null);
