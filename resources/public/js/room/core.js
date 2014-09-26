// Compiled by ClojureScript 0.0-2342
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
var map__11392_11393 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__11392_11394__$1 = ((cljs.core.seq_QMARK_.call(null,map__11392_11393))?cljs.core.apply.call(null,cljs.core.hash_map,map__11392_11393):map__11392_11393);var state_11395 = cljs.core.get.call(null,map__11392_11394__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_11396 = cljs.core.get.call(null,map__11392_11394__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_11397 = cljs.core.get.call(null,map__11392_11394__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_11398 = cljs.core.get.call(null,map__11392_11394__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.core.chsk = chsk_11398;
room.core.ch_chsk = ch_recv_11397;
room.core.chsk_send_BANG_ = send_fn_11396;
room.core.chsk_state = state_11395;
room.core.msgs = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.core.counter = reagent.core.atom.call(null,(0));
room.core.add_message = (function add_message(text){var id = cljs.core.swap_BANG_.call(null,room.core.counter,cljs.core.inc);return cljs.core.swap_BANG_.call(null,room.core.msgs,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"text","text",-1790561697),text], null));
});
room.core.add_message.call(null,"Test");
room.core.event_msg_handler = (function (){var method_table__4503__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var prefer_table__4504__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var method_cache__4505__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var cached_hierarchy__4506__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var hierarchy__4507__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));return (new cljs.core.MultiFn("event-msg-handler",new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4507__auto__,method_table__4503__auto__,prefer_table__4504__auto__,method_cache__4505__auto__,cached_hierarchy__4506__auto__));
})();
room.core.event_msg_handler_STAR_ = (function event_msg_handler_STAR_(p__11399){var map__11401 = p__11399;var map__11401__$1 = ((cljs.core.seq_QMARK_.call(null,map__11401))?cljs.core.apply.call(null,cljs.core.hash_map,map__11401):map__11401);var ev_msg = map__11401__$1;var event = cljs.core.get.call(null,map__11401__$1,new cljs.core.Keyword(null,"event","event",301435442));var _QMARK_data = cljs.core.get.call(null,map__11401__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var id = cljs.core.get.call(null,map__11401__$1,new cljs.core.Keyword(null,"id","id",-1388402092));taoensso.encore.logf.call(null,"Event: %s",event);
return room.core.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__11402){var map__11403 = p__11402;var map__11403__$1 = ((cljs.core.seq_QMARK_.call(null,map__11403))?cljs.core.apply.call(null,cljs.core.hash_map,map__11403):map__11403);var ev_msg = map__11403__$1;var event = cljs.core.get.call(null,map__11403__$1,new cljs.core.Keyword(null,"event","event",301435442));return taoensso.encore.logf.call(null,"Unhandled event: %s",event);
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__11404){var map__11405 = p__11404;var map__11405__$1 = ((cljs.core.seq_QMARK_.call(null,map__11405))?cljs.core.apply.call(null,cljs.core.hash_map,map__11405):map__11405);var ev_msg = map__11405__$1;var _QMARK_data = cljs.core.get.call(null,map__11405__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"first-open?","first-open?",396686530),true], null)))
{return taoensso.encore.logf.call(null,"Channel socket successfully established!");
} else
{return taoensso.encore.logf.call(null,"Channel socket state change: %s",_QMARK_data);
}
}));
cljs.core._add_method.call(null,room.core.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__11406){var map__11407 = p__11406;var map__11407__$1 = ((cljs.core.seq_QMARK_.call(null,map__11407))?cljs.core.apply.call(null,cljs.core.hash_map,map__11407):map__11407);var ev_msg = map__11407__$1;var _QMARK_data = cljs.core.get.call(null,map__11407__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));var msg = new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(cljs.core.last.call(null,_QMARK_data)));return room.core.add_message.call(null,msg);
}));
room.core.send_message = (function send_message(text){taoensso.encore.logf.call(null,"Sending message: %s",text);
return room.core.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("room","req","room/req",-320779682),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),text], null)], null));
});
room.core.message_input = (function message_input(p__11410){var map__11413 = p__11410;var map__11413__$1 = ((cljs.core.seq_QMARK_.call(null,map__11413))?cljs.core.apply.call(null,cljs.core.hash_map,map__11413):map__11413);var on_stop = cljs.core.get.call(null,map__11413__$1,new cljs.core.Keyword(null,"on-stop","on-stop",1520114515));var on_save = cljs.core.get.call(null,map__11413__$1,new cljs.core.Keyword(null,"on-save","on-save",1618176266));var text = cljs.core.get.call(null,map__11413__$1,new cljs.core.Keyword(null,"text","text",-1790561697));var val = reagent.core.atom.call(null,text);var stop = ((function (val,map__11413,map__11413__$1,on_stop,on_save,text){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
if(cljs.core.truth_(on_stop))
{return on_stop.call(null);
} else
{return null;
}
});})(val,map__11413,map__11413__$1,on_stop,on_save,text))
;var save = ((function (val,stop,map__11413,map__11413__$1,on_stop,on_save,text){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{on_save.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,map__11413,map__11413__$1,on_stop,on_save,text))
;return ((function (val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text){
return (function (props){return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"message"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),"message-input",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Message",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,val),new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text){
return (function (p1__11408_SHARP_){var G__11414 = p1__11408_SHARP_.which;switch (G__11414) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text))
,new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text){
return (function (p1__11409_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__11409_SHARP_.target.value);
});})(val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text))
], null)], null)], null);
});
;})(val,stop,save,map__11413,map__11413__$1,on_stop,on_save,text))
});
room.core.home = (function home(){var filt = reagent.core.atom.call(null,new cljs.core.Keyword(null,"all","all",892129742));return ((function (filt){
return (function (){var messages = cljs.core.vals.call(null,cljs.core.deref.call(null,room.core.msgs));return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#message-list","ul#message-list",1758327781),(function (){var iter__4362__auto__ = ((function (messages,filt){
return (function iter__11420(s__11421){return (new cljs.core.LazySeq(null,((function (messages,filt){
return (function (){var s__11421__$1 = s__11421;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__11421__$1);if(temp__4126__auto__)
{var s__11421__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__11421__$2))
{var c__4360__auto__ = cljs.core.chunk_first.call(null,s__11421__$2);var size__4361__auto__ = cljs.core.count.call(null,c__4360__auto__);var b__11423 = cljs.core.chunk_buffer.call(null,size__4361__auto__);if((function (){var i__11422 = (0);while(true){
if((i__11422 < size__4361__auto__))
{var message = cljs.core._nth.call(null,c__4360__auto__,i__11422);cljs.core.chunk_append.call(null,b__11423,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null));
{
var G__11424 = (i__11422 + (1));
i__11422 = G__11424;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11423),iter__11420.call(null,cljs.core.chunk_rest.call(null,s__11421__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__11423),null);
}
} else
{var message = cljs.core.first.call(null,s__11421__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(message)], null),iter__11420.call(null,cljs.core.rest.call(null,s__11421__$2)));
}
} else
{return null;
}
break;
}
});})(messages,filt))
,null,null));
});})(messages,filt))
;return iter__4362__auto__.call(null,messages);
})()], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.message_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-save","on-save",1618176266),room.core.send_message], null)], null)], null);
});
;})(filt))
});
room.core.page = (function page(){return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"page","page",849072397).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,room.core.state))], null);
});
secretary.core.set_config_BANG_.call(null,new cljs.core.Keyword(null,"prefix","prefix",-265908465),"#");
var action__4595__auto___11427 = (function (params__4596__auto__){if(cljs.core.map_QMARK_.call(null,params__4596__auto__))
{var map__11425 = params__4596__auto__;var map__11425__$1 = ((cljs.core.seq_QMARK_.call(null,map__11425))?cljs.core.apply.call(null,cljs.core.hash_map,map__11425):map__11425);console.log("hi!");
return cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
} else
{if(cljs.core.vector_QMARK_.call(null,params__4596__auto__))
{var vec__11426 = params__4596__auto__;console.log("hi!");
return cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
} else
{return null;
}
}
});secretary.core.add_route_BANG_.call(null,"/",action__4595__auto___11427);
room.core.init_BANG_ = (function init_BANG_(){cljs.core.swap_BANG_.call(null,room.core.state,cljs.core.assoc,new cljs.core.Keyword(null,"page","page",849072397),room.core.home);
taoensso.sente.start_chsk_router_BANG_.call(null,room.core.ch_chsk,room.core.event_msg_handler_STAR_);
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.core.page], null),document.getElementById("app"));
});
room.core.init_BANG_.call(null);

//# sourceMappingURL=core.js.map