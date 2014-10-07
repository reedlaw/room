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
goog.require('room.chats');
goog.require('room.session');
goog.require('cljs.core.async');
goog.require('reagent.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('room.chats');
goog.require('taoensso.encore');
goog.require('secretary.core');
goog.require('room.session');
goog.require('taoensso.encore');
taoensso.encore.logf.call(null,"ClojureScript appears to have loaded correctly.");
room.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"saved?","saved?",-2027163192),false], null));
var map__11854_11855 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__11854_11856__$1 = ((cljs.core.seq_QMARK_.call(null,map__11854_11855))?cljs.core.apply.call(null,cljs.core.hash_map,map__11854_11855):map__11854_11855);var state_11857 = cljs.core.get.call(null,map__11854_11856__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_11858 = cljs.core.get.call(null,map__11854_11856__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_11859 = cljs.core.get.call(null,map__11854_11856__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_11860 = cljs.core.get.call(null,map__11854_11856__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_11860;
room.core.ch_chsk = ch_recv_11859;
room.core.chsk_send_BANG_ = send_fn_11858;
room.core.chsk_state = state_11857;
room.core.messages = cljs.core.js__GT_clj.call(null,window.messages);
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.rms = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.message_counter = reagent.core.atom.call(null,(0));
room.core.add_message = (function add_message(id,author,text,time,chat){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time,new cljs.core.Keyword(null,"chat","chat",-518268339),chat], null));
});
room.core.delete_message = (function delete_message(id){return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.dissoc,id);
});
var seq__11861_11865 = cljs.core.seq.call(null,room.core.messages);var chunk__11862_11866 = null;var count__11863_11867 = (0);var i__11864_11868 = (0);while(true){
if((i__11864_11868 < count__11863_11867))
{var m_11869 = cljs.core._nth.call(null,chunk__11862_11866,i__11864_11868);var author_11870 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_11869,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_11869,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_11869,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_11869,"hash")], null);var id_11871 = cljs.core.get.call(null,m_11869,"id");room.core.add_message.call(null,id_11871,author_11870,cljs.core.get.call(null,m_11869,"text"),cljs.core.get.call(null,m_11869,"created_at"),cljs.core.get.call(null,m_11869,"chat"));
{
var G__11872 = seq__11861_11865;
var G__11873 = chunk__11862_11866;
var G__11874 = count__11863_11867;
var G__11875 = (i__11864_11868 + (1));
seq__11861_11865 = G__11872;
chunk__11862_11866 = G__11873;
count__11863_11867 = G__11874;
i__11864_11868 = G__11875;
continue;
}
} else
{var temp__4126__auto___11876 = cljs.core.seq.call(null,seq__11861_11865);if(temp__4126__auto___11876)
{var seq__11861_11877__$1 = temp__4126__auto___11876;if(cljs.core.chunked_seq_QMARK_.call(null,seq__11861_11877__$1))
{var c__4422__auto___11878 = cljs.core.chunk_first.call(null,seq__11861_11877__$1);{
var G__11879 = cljs.core.chunk_rest.call(null,seq__11861_11877__$1);
var G__11880 = c__4422__auto___11878;
var G__11881 = cljs.core.count.call(null,c__4422__auto___11878);
var G__11882 = (0);
seq__11861_11865 = G__11879;
chunk__11862_11866 = G__11880;
count__11863_11867 = G__11881;
i__11864_11868 = G__11882;
continue;
}
} else
{var m_11883 = cljs.core.first.call(null,seq__11861_11877__$1);var author_11884 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_11883,"author_id"),new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_11883,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_11883,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_11883,"hash")], null);var id_11885 = cljs.core.get.call(null,m_11883,"id");room.core.add_message.call(null,id_11885,author_11884,cljs.core.get.call(null,m_11883,"text"),cljs.core.get.call(null,m_11883,"created_at"),cljs.core.get.call(null,m_11883,"chat"));
{
var G__11886 = cljs.core.next.call(null,seq__11861_11877__$1);
var G__11887 = null;
var G__11888 = (0);
var G__11889 = (0);
seq__11861_11865 = G__11886;
chunk__11862_11866 = G__11887;
count__11863_11867 = G__11888;
i__11864_11868 = G__11889;
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
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__11890){var map__11893 = p__11890;var map__11893__$1 = ((cljs.core.seq_QMARK_.call(null,map__11893))?cljs.core.apply.call(null,cljs.core.hash_map,map__11893):map__11893);var ev_msg = map__11893__$1;var event = cljs.core.get.call(null,map__11893__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__11893__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__11894 = event;var id = cljs.core.nth.call(null,vec__11894,(0),null);var data = cljs.core.nth.call(null,vec__11894,(1),null);var ev = vec__11894;taoensso.encore.logf.call(null,"Data: %s",data);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__11895){var map__11896 = p__11895;var map__11896__$1 = ((cljs.core.seq_QMARK_.call(null,map__11896))?cljs.core.apply.call(null,cljs.core.hash_map,map__11896):map__11896);var ev_msg = map__11896__$1;var event = cljs.core.get.call(null,map__11896__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__11897){var map__11898 = p__11897;var map__11898__$1 = ((cljs.core.seq_QMARK_.call(null,map__11898))?cljs.core.apply.call(null,cljs.core.hash_map,map__11898):map__11898);var ev_msg = map__11898__$1;var _QMARK_data = cljs.core.get.call(null,map__11898__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__11899){var map__11900 = p__11899;var map__11900__$1 = ((cljs.core.seq_QMARK_.call(null,map__11900))?cljs.core.apply.call(null,cljs.core.hash_map,map__11900):map__11900);var ev_msg = map__11900__$1;var event = cljs.core.get.call(null,map__11900__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__11900__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var vec__11901 = event;var id = cljs.core.nth.call(null,vec__11901,(0),null);var data = cljs.core.nth.call(null,vec__11901,(1),null);var ev = vec__11901;var command = cljs.core.first.call(null,data);var params = cljs.core.last.call(null,data);if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("chat","broadcast","chat/broadcast",1767233264)))
{var msg_id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(params);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(params);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(params);var chat = new cljs.core.Keyword(null,"chat","chat",-518268339).cljs$core$IFn$_invoke$arity$1(params);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(params),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,msg_id,author,msg,moment(),chat);
} else
{if(cljs.core._EQ_.call(null,command,new cljs.core.Keyword("message","delete","message/delete",-974271757)))
{return room.core.delete_message.call(null,params);
} else
{return null;
}
}
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","send","message/send",-2110392641),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"chat","chat",-518268339),room.session.get.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312))], null)], null));
});
room.core.send_delete_message = (function send_delete_message(id){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("message","delete","message/delete",-974271757),id], null));
});
room.core.send_typing = (function send_typing(){return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("user","typing","user/typing",1085864163)], null));
});
room.core.message_input = (function message_input(p__11904){var map__11907 = p__11904;var map__11907__$1 = ((cljs.core.seq_QMARK_.call(null,map__11907))?cljs.core.apply.call(null,cljs.core.hash_map,map__11907):map__11907);var on_stop = cljs.core.get.call(null,map__11907__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__11907__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__11907__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__11907,map__11907__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__11907,map__11907__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__11907,map__11907__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__11907,map__11907__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text){
return (function (p1__11902_SHARP_){var G__11908 = p1__11902_SHARP_.which;switch (G__11908) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text){
return (function (p1__11903_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__11903_SHARP_.target.value);
});})(val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__11907,map__11907__$1,on_stop,on_save,text))
});
room.core.message_input_box = cljs.core.with_meta.call(null,room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),(function (p1__11910_SHARP_){return reagent.core.dom_node.call(null,p1__11910_SHARP_).focus();
})], null));
room.core.message_list = (function message_list(p__11912){var map__11918 = p__11912;var map__11918__$1 = ((cljs.core.seq_QMARK_.call(null,map__11918))?cljs.core.apply.call(null,cljs.core.hash_map,map__11918):map__11918);var chat = cljs.core.get.call(null,map__11918__$1,new cljs.core.Keyword(null,"chat","chat",-518268339));var messages = cljs.core.get.call(null,map__11918__$1,new cljs.core.Keyword(null,"messages","messages",345434482));return ((function (map__11918,map__11918__$1,chat,messages){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4391__auto__ = ((function (map__11918,map__11918__$1,chat,messages){
return (function iter__11919(s__11920){return (new cljs.core.LazySeq(null,((function (map__11918,map__11918__$1,chat,messages){
return (function (){var s__11920__$1 = s__11920;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__11920__$1);if(temp__4126__auto__)
{var s__11920__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__11920__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__11920__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__11922 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__11921 = (0);while(true){
if((i__11921 < size__4390__auto__))
{var message = cljs.core._nth.call(null,c__4389__auto__,i__11921);cljs.core.chunk_append.call(null,b__11922,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__11921,id,author,message,c__4389__auto__,size__4390__auto__,b__11922,s__11920__$2,temp__4126__auto__,map__11918,map__11918__$1,chat,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(i__11921,id,author,message,c__4389__auto__,size__4390__auto__,b__11922,s__11920__$2,temp__4126__auto__,map__11918,map__11918__$1,chat,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__11923 = (i__11921 + (1));
i__11921 = G__11923;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11922),iter__11919.call(null,cljs.core.chunk_rest.call(null,s__11920__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11922),null);
}
} else
{var message = cljs.core.first.call(null,s__11920__$2);return cljs.core.cons.call(null,(function (){var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),((cljs.core._EQ_.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"id"),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(author)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times","i.fa.fa-times",923360983),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (id,author,message,s__11920__$2,temp__4126__auto__,map__11918,map__11918__$1,chat,messages){
return (function (){return room.core.send_delete_message.call(null,id);
});})(id,author,message,s__11920__$2,temp__4126__auto__,map__11918,map__11918__$1,chat,messages))
], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__11919.call(null,cljs.core.rest.call(null,s__11920__$2)));
}
} else
{return null;
}
break;
}
});})(map__11918,map__11918__$1,chat,messages))
,null,null));
});})(map__11918,map__11918__$1,chat,messages))
;return iter__4391__auto__.call(null,cljs.core.filter.call(null,((function (iter__4391__auto__,map__11918,map__11918__$1,chat,messages){
return (function (p1__11911_SHARP_){return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"chat","chat",-518268339).cljs$core$IFn$_invoke$arity$1(p1__11911_SHARP_),chat);
});})(iter__4391__auto__,map__11918,map__11918__$1,chat,messages))
,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs))));
})()], null);
});
;})(map__11918,map__11918__$1,chat,messages))
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
room.core.current_chat = reagent.core.atom.call(null,null);
room.core.home = (function home(chat){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var messages = cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs));var user = cljs.core.js__GT_clj.call(null,window.user);return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#app-container","div#app-container",885069730),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#nav","div#nav",1538049517),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#usermenu","div#usermenu",-1448102456),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img#userimage","img#userimage",-1628825411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(user.call(null,"hash"))+"?s=100")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#username","span#username",1476994130),user.call(null,"name")], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),"/logout"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-sign-out","i.fa.fa-sign-out",1449928134)], null)], null)], null),room.chats.chat_list.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312))),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#content","div#content",-850771127),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#header","div#header",-546369869),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),chat], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#body","div#body",250558726),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_box,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"messages","messages",345434482),messages,new cljs.core.Keyword(null,"chat","chat",-518268339),chat], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#footer","div#footer",861595109),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null)], null)], null)], null)], null);
});
;})(filt))
});
var action__10633__auto___11926 = (function (params__10634__auto__){if(cljs.core.map_QMARK_.call(null,params__10634__auto__))
{var map__11924 = params__10634__auto__;var map__11924__$1 = ((cljs.core.seq_QMARK_.call(null,map__11924))?cljs.core.apply.call(null,cljs.core.hash_map,map__11924):map__11924);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312),"general");
} else
{if(cljs.core.vector_QMARK_.call(null,params__10634__auto__))
{var vec__11925 = params__10634__auto__;return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312),"general");
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__10633__auto___11926);
var action__10633__auto___11929 = (function (params__10634__auto__){if(cljs.core.map_QMARK_.call(null,params__10634__auto__))
{var map__11927 = params__10634__auto__;var map__11927__$1 = ((cljs.core.seq_QMARK_.call(null,map__11927))?cljs.core.apply.call(null,cljs.core.hash_map,map__11927):map__11927);var id = cljs.core.get.call(null,map__11927__$1,new cljs.core.Keyword(null,"id","id",-1388402092));return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312),id);
} else
{if(cljs.core.vector_QMARK_.call(null,params__10634__auto__))
{var vec__11928 = params__10634__auto__;var id = cljs.core.nth.call(null,vec__11928,(0),null);return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312),id);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/chats/:id",action__10633__auto___11929);
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.home.call(null,room.session.get.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312)))], null);
});
room.core.init_BANG_ = (function init_BANG_(){room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-chat","current-chat",-2044587312),"general");
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
room.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map