// Compiled by ClojureScript 0.0-2356
goog.provide('room.core');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('cljs.core.async');
goog.require('reagent.core');
goog.require('taoensso.sente');
goog.require('reagent.core');
goog.require('secretary.core');
goog.require('cljs.core.async');
goog.require('reagent.core');
goog.require('cljs.core.async');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('secretary.core');
goog.require('taoensso.encore');
taoensso.encore.logf.call(null,"ClojureScript appears to have loaded correctly.");
room.core.state = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"doc","doc",1913296891),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"saved?","saved?",-2027163192),false], null));
var map__12840_12841 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__12840_12842__$1 = ((cljs.core.seq_QMARK_.call(null,map__12840_12841))?cljs.core.apply.call(null,cljs.core.hash_map,map__12840_12841):map__12840_12841);var state_12843 = cljs.core.get.call(null,map__12840_12842__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_12844 = cljs.core.get.call(null,map__12840_12842__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_12845 = cljs.core.get.call(null,map__12840_12842__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_12846 = cljs.core.get.call(null,map__12840_12842__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_12846;
room.core.ch_chsk = ch_recv_12845;
room.core.chsk_send_BANG_ = send_fn_12844;
room.core.chsk_state = state_12843;
room.core.messages = cljs.core.js__GT_clj.call(null,window.messages);
room.core.rooms = cljs.core.js__GT_clj.call(null,window.rooms);
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.rms = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.message_counter = reagent.core.atom.call(null,(0));
room.core.add_message = (function add_message(author,text,time){var id = cljs.core.swap_BANG_.call(null,room.core.message_counter,cljs.core.inc);return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"author","author",2111686192),author,new cljs.core.Keyword(null,"text","text",-1790561697),text,new cljs.core.Keyword(null,"time","time",1385887882),time], null));
});
var seq__12847_12851 = cljs.core.seq.call(null,room.core.messages);var chunk__12848_12852 = null;var count__12849_12853 = (0);var i__12850_12854 = (0);while(true){
if((i__12850_12854 < count__12849_12853))
{var m_12855 = cljs.core._nth.call(null,chunk__12848_12852,i__12850_12854);var author_12856 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_12855,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_12855,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_12855,"hash"),new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_12855,"id")], null);room.core.add_message.call(null,author_12856,cljs.core.get.call(null,m_12855,"text"),cljs.core.get.call(null,m_12855,"created_at"));
{
var G__12857 = seq__12847_12851;
var G__12858 = chunk__12848_12852;
var G__12859 = count__12849_12853;
var G__12860 = (i__12850_12854 + (1));
seq__12847_12851 = G__12857;
chunk__12848_12852 = G__12858;
count__12849_12853 = G__12859;
i__12850_12854 = G__12860;
continue;
}
} else
{var temp__4126__auto___12861 = cljs.core.seq.call(null,seq__12847_12851);if(temp__4126__auto___12861)
{var seq__12847_12862__$1 = temp__4126__auto___12861;if(cljs.core.chunked_seq_QMARK_.call(null,seq__12847_12862__$1))
{var c__4422__auto___12863 = cljs.core.chunk_first.call(null,seq__12847_12862__$1);{
var G__12864 = cljs.core.chunk_rest.call(null,seq__12847_12862__$1);
var G__12865 = c__4422__auto___12863;
var G__12866 = cljs.core.count.call(null,c__4422__auto___12863);
var G__12867 = (0);
seq__12847_12851 = G__12864;
chunk__12848_12852 = G__12865;
count__12849_12853 = G__12866;
i__12850_12854 = G__12867;
continue;
}
} else
{var m_12868 = cljs.core.first.call(null,seq__12847_12862__$1);var author_12869 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.get.call(null,m_12868,"name"),new cljs.core.Keyword(null,"email","email",1415816706),cljs.core.get.call(null,m_12868,"email"),new cljs.core.Keyword(null,"hash","hash",-13781596),cljs.core.get.call(null,m_12868,"hash"),new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.get.call(null,m_12868,"id")], null);room.core.add_message.call(null,author_12869,cljs.core.get.call(null,m_12868,"text"),cljs.core.get.call(null,m_12868,"created_at"));
{
var G__12870 = cljs.core.next.call(null,seq__12847_12862__$1);
var G__12871 = null;
var G__12872 = (0);
var G__12873 = (0);
seq__12847_12851 = G__12870;
chunk__12848_12852 = G__12871;
count__12849_12853 = G__12872;
i__12850_12854 = G__12873;
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
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__12874){var map__12876 = p__12874;var map__12876__$1 = ((cljs.core.seq_QMARK_.call(null,map__12876))?cljs.core.apply.call(null,cljs.core.hash_map,map__12876):map__12876);var ev_msg = map__12876__$1;var event = cljs.core.get.call(null,map__12876__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__12876__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var id = cljs.core.get.call(null,map__12876__$1,new cljs.core.Keyword(null,"id","id",-1388402092));taoensso.encore.logf.call(null,"Event: %s",event);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__12877){var map__12878 = p__12877;var map__12878__$1 = ((cljs.core.seq_QMARK_.call(null,map__12878))?cljs.core.apply.call(null,cljs.core.hash_map,map__12878):map__12878);var ev_msg = map__12878__$1;var event = cljs.core.get.call(null,map__12878__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__12879){var map__12880 = p__12879;var map__12880__$1 = ((cljs.core.seq_QMARK_.call(null,map__12880))?cljs.core.apply.call(null,cljs.core.hash_map,map__12880):map__12880);var ev_msg = map__12880__$1;var _QMARK_data = cljs.core.get.call(null,map__12880__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__12881){var map__12882 = p__12881;var map__12882__$1 = ((cljs.core.seq_QMARK_.call(null,map__12882))?cljs.core.apply.call(null,cljs.core.hash_map,map__12882):map__12882);var ev_msg = map__12882__$1;var _QMARK_data = cljs.core.get.call(null,map__12882__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var d = cljs.core.last.call(null,_QMARK_data);var msg = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(d);var uid = new cljs.core.Keyword(null,"uid","uid",-1447769400).cljs$core$IFn$_invoke$arity$1(d);var author = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(d),new cljs.core.Keyword(null,"email","email",1415816706),new cljs.core.Keyword(null,"email","email",1415816706).cljs$core$IFn$_invoke$arity$1(d),new cljs.core.Keyword(null,"hash","hash",-13781596),new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(d),new cljs.core.Keyword(null,"id","id",-1388402092),uid], null);return room.core.add_message.call(null,author,msg,moment());
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("room","req","room/req",-320779682),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),text], null)], null));
});
room.core.message_input = (function message_input(p__12885){var map__12888 = p__12885;var map__12888__$1 = ((cljs.core.seq_QMARK_.call(null,map__12888))?cljs.core.apply.call(null,cljs.core.hash_map,map__12888):map__12888);var on_stop = cljs.core.get.call(null,map__12888__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__12888__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__12888__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__12888,map__12888__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__12888,map__12888__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__12888,map__12888__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__12888,map__12888__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text){
return (function (p1__12883_SHARP_){var G__12889 = p1__12883_SHARP_.which;switch (G__12889) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text){
return (function (p1__12884_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__12884_SHARP_.target.value);
});})(val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text))
], null)], null);
});
;})(val,stop,save,map__12888,map__12888__$1,on_stop,on_save,text))
});
room.core.message_list = (function message_list(p__12891){var map__12897 = p__12891;var map__12897__$1 = ((cljs.core.seq_QMARK_.call(null,map__12897))?cljs.core.apply.call(null,cljs.core.hash_map,map__12897):map__12897);var messages = cljs.core.get.call(null,map__12897__$1,new cljs.core.Keyword(null,"messages","messages",345434482));return ((function (map__12897,map__12897__$1,messages){
return (function (props){return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4391__auto__ = ((function (map__12897,map__12897__$1,messages){
return (function iter__12898(s__12899){return (new cljs.core.LazySeq(null,((function (map__12897,map__12897__$1,messages){
return (function (){var s__12899__$1 = s__12899;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__12899__$1);if(temp__4126__auto__)
{var s__12899__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__12899__$2))
{var c__4389__auto__ = cljs.core.chunk_first.call(null,s__12899__$2);var size__4390__auto__ = cljs.core.count.call(null,c__4389__auto__);var b__12901 = cljs.core.chunk_buffer.call(null,size__4390__auto__);if((function (){var i__12900 = (0);while(true){
if((i__12900 < size__4390__auto__))
{var message = cljs.core._nth.call(null,c__4389__auto__,i__12900);cljs.core.chunk_append.call(null,b__12901,(function (){var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})());
{
var G__12902 = (i__12900 + (1));
i__12900 = G__12902;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12901),iter__12898.call(null,cljs.core.chunk_rest.call(null,s__12899__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12901),null);
}
} else
{var message = cljs.core.first.call(null,s__12899__$2);return cljs.core.cons.call(null,(function (){var author = new cljs.core.Keyword(null,"author","author",2111686192).cljs$core$IFn$_invoke$arity$1(message);var id = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(message);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message","div.message",197515312),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),id], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.avatar","a.avatar",1853546955),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),("http://www.gravatar.com/avatar/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"hash","hash",-13781596).cljs$core$IFn$_invoke$arity$1(author))+"?s=30")], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.message-body","div.message-body",566197895),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.username","a.username",-294692231),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(author)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.time","span.time",-193970810),moment.utc(new cljs.core.Keyword(null,"time","time",1385887882).cljs$core$IFn$_invoke$arity$1(message)).local().format("h:mm a")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.text","span.text",-1380952257),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null)], null)], null)], null)], null);
})(),iter__12898.call(null,cljs.core.rest.call(null,s__12899__$2)));
}
} else
{return null;
}
break;
}
});})(map__12897,map__12897__$1,messages))
,null,null));
});})(map__12897,map__12897__$1,messages))
;return iter__4391__auto__.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs)));
})()], null);
});
;})(map__12897,map__12897__$1,messages))
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
room.core.home = (function home(){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var messages = cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs));return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#content","div#content",-850771127),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#body","div#body",250558726),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_box,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"messages","messages",345434482),messages], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#footer","div#footer",861595109),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null)], null)], null);
});
;})(filt))
});
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"page","page",849072397).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,room.core.state))], null);
});
secretary.core.set_config_BANG_.call(null,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"#");
var action__4624__auto___12905 = (function (params__4625__auto__){if(cljs.core.map_QMARK_.call(null,params__4625__auto__))
{var map__12903 = params__4625__auto__;var map__12903__$1 = ((cljs.core.seq_QMARK_.call(null,map__12903))?cljs.core.apply.call(null,cljs.core.hash_map,map__12903):map__12903);console.log("hi!");
return cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
} else
{if(cljs.core.vector_QMARK_.call(null,params__4625__auto__))
{var vec__12904 = params__4625__auto__;console.log("hi!");
return cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4624__auto___12905);
room.core.init_BANG_ = (function init_BANG_(){cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
room.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map