// Compiled by ClojureScript 0.0-2356
goog.provide('room.topics');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('reagent.core');
goog.require('taoensso.sente');
goog.require('reagent.core');
goog.require('secretary.core');
goog.require('room.session');
goog.require('reagent.core');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('secretary.core');
goog.require('room.session');
goog.require('taoensso.encore');
var map__10453_10454 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10453_10455__$1 = ((cljs.core.seq_QMARK_.call(null,map__10453_10454))?cljs.core.apply.call(null,cljs.core.hash_map,map__10453_10454):map__10453_10454);var state_10456 = cljs.core.get.call(null,map__10453_10455__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_10457 = cljs.core.get.call(null,map__10453_10455__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10458 = cljs.core.get.call(null,map__10453_10455__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10459 = cljs.core.get.call(null,map__10453_10455__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.topics.chsk = chsk_10459;
room.topics.ch_chsk = ch_recv_10458;
room.topics.chsk_send_BANG_ = send_fn_10457;
room.topics.chsk_state = state_10456;
room.topics.users = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.users));
room.topics.topics = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.topics.add_topic = (function add_topic(id,name,users){return cljs.core.swap_BANG_.call(null,room.topics.topics,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"users","users",-713552705),users], null));
});
var seq__10460_10464 = cljs.core.seq.call(null,cljs.core.js__GT_clj.call(null,window.topics));var chunk__10461_10465 = null;var count__10462_10466 = (0);var i__10463_10467 = (0);while(true){
if((i__10463_10467 < count__10462_10466))
{var t_10468 = cljs.core._nth.call(null,chunk__10461_10465,i__10463_10467);room.topics.add_topic.call(null,cljs.core.get.call(null,t_10468,"id"),cljs.core.get.call(null,t_10468,"name"),cljs.core.get.call(null,t_10468,"users"));
{
var G__10469 = seq__10460_10464;
var G__10470 = chunk__10461_10465;
var G__10471 = count__10462_10466;
var G__10472 = (i__10463_10467 + (1));
seq__10460_10464 = G__10469;
chunk__10461_10465 = G__10470;
count__10462_10466 = G__10471;
i__10463_10467 = G__10472;
continue;
}
} else
{var temp__4126__auto___10473 = cljs.core.seq.call(null,seq__10460_10464);if(temp__4126__auto___10473)
{var seq__10460_10474__$1 = temp__4126__auto___10473;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10460_10474__$1))
{var c__4233__auto___10475 = cljs.core.chunk_first.call(null,seq__10460_10474__$1);{
var G__10476 = cljs.core.chunk_rest.call(null,seq__10460_10474__$1);
var G__10477 = c__4233__auto___10475;
var G__10478 = cljs.core.count.call(null,c__4233__auto___10475);
var G__10479 = (0);
seq__10460_10464 = G__10476;
chunk__10461_10465 = G__10477;
count__10462_10466 = G__10478;
i__10463_10467 = G__10479;
continue;
}
} else
{var t_10480 = cljs.core.first.call(null,seq__10460_10474__$1);room.topics.add_topic.call(null,cljs.core.get.call(null,t_10480,"id"),cljs.core.get.call(null,t_10480,"name"),cljs.core.get.call(null,t_10480,"users"));
{
var G__10481 = cljs.core.next.call(null,seq__10460_10474__$1);
var G__10482 = null;
var G__10483 = (0);
var G__10484 = (0);
seq__10460_10464 = G__10481;
chunk__10461_10465 = G__10482;
count__10462_10466 = G__10483;
i__10463_10467 = G__10484;
continue;
}
}
} else
{}
}
break;
}
room.topics.jump_to_topic = (function jump_to_topic(id){return room.session.put_BANG_.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864),id);
});
room.topics.join_topic = (function join_topic(id){return secretary.core.dispatch_BANG_.call(null,("/topics/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)));
});
room.topics.leave_topic = (function leave_topic(id){cljs.core.swap_BANG_.call(null,room.topics.topics,cljs.core.dissoc,id);
return room.topics.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("topic","leave","topic/leave",843811202),id], null));
});
room.topics.notify_new_message = (function notify_new_message(topic){return null;
});
room.topics.topic_input = (function topic_input(){var editing = reagent.core.atom.call(null,false);return ((function (editing){
return (function (props){if(cljs.core.truth_(cljs.core.deref.call(null,editing)))
{var val = reagent.core.atom.call(null,"");var stop = ((function (val,editing){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
return cljs.core.reset_BANG_.call(null,editing,false);
});})(val,editing))
;var save = ((function (val,stop,editing){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{room.topics.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("topic","create","topic/create",-1311537255),v], null));
} else
{}
return stop.call(null);
});})(val,stop,editing))
;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,editing){
return (function (p1__10485_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__10485_SHARP_.target.value);
});})(val,stop,save,editing))
,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),stop,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,editing){
return (function (p1__10486_SHARP_){var G__10488 = p1__10486_SHARP_.which;switch (G__10488) {
case (13):
return save.call(null);

break;
case (27):
return stop.call(null);

break;
default:
return null;

}
});})(val,stop,save,editing))
], null)], null);
} else
{return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing){
return (function (){return cljs.core.reset_BANG_.call(null,editing,true);
});})(editing))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-plus-square-o","i.fa-li.fa.fa-plus-square-o",1423236083)], null),"Start a new topic"], null);
}
});
;})(editing))
});
room.topics.topic_input_box = cljs.core.with_meta.call(null,room.topics.topic_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (p1__10490_SHARP_){return reagent.core.dom_node.call(null,p1__10490_SHARP_).focus();
})], null));
room.topics.topic_list = (function topic_list(){var id = room.session.get.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864));return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#topics","div#topics",-1963481584),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),"Topics"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),cljs.core.doall.call(null,(function (){var iter__4202__auto__ = ((function (id){
return (function iter__10499(s__10500){return (new cljs.core.LazySeq(null,((function (id){
return (function (){var s__10500__$1 = s__10500;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10500__$1);if(temp__4126__auto__)
{var s__10500__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10500__$2))
{var c__4200__auto__ = cljs.core.chunk_first.call(null,s__10500__$2);var size__4201__auto__ = cljs.core.count.call(null,c__4200__auto__);var b__10502 = cljs.core.chunk_buffer.call(null,size__4201__auto__);if((function (){var i__10501 = (0);while(true){
if((i__10501 < size__4201__auto__))
{var topic = cljs.core._nth.call(null,c__4200__auto__,i__10501);cljs.core.chunk_append.call(null,b__10502,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),id))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__10501,topic,c__4200__auto__,size__4201__auto__,b__10502,s__10500__$2,temp__4126__auto__,id){
return (function (){return room.topics.join_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(i__10501,topic,c__4200__auto__,size__4201__auto__,b__10502,s__10500__$2,temp__4126__auto__,id))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__10501,topic,c__4200__auto__,size__4201__auto__,b__10502,s__10500__$2,temp__4126__auto__,id){
return (function (){return room.topics.leave_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(i__10501,topic,c__4200__auto__,size__4201__auto__,b__10502,s__10500__$2,temp__4126__auto__,id))
], null)], null)], null));
{
var G__10507 = (i__10501 + (1));
i__10501 = G__10507;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10502),iter__10499.call(null,cljs.core.chunk_rest.call(null,s__10500__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10502),null);
}
} else
{var topic = cljs.core.first.call(null,s__10500__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),id))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__10500__$2,temp__4126__auto__,id){
return (function (){return room.topics.join_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(topic,s__10500__$2,temp__4126__auto__,id))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__10500__$2,temp__4126__auto__,id){
return (function (){return room.topics.leave_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(topic,s__10500__$2,temp__4126__auto__,id))
], null)], null)], null),iter__10499.call(null,cljs.core.rest.call(null,s__10500__$2)));
}
} else
{return null;
}
break;
}
});})(id))
,null,null));
});})(id))
;return iter__4202__auto__.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,room.topics.topics)));
})()),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-search","i.fa-li.fa.fa-search",-1076535420)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"More topics"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.topics.topic_input_box], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),"People"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4202__auto__ = ((function (id){
return (function iter__10503(s__10504){return (new cljs.core.LazySeq(null,((function (id){
return (function (){var s__10504__$1 = s__10504;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10504__$1);if(temp__4126__auto__)
{var s__10504__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10504__$2))
{var c__4200__auto__ = cljs.core.chunk_first.call(null,s__10504__$2);var size__4201__auto__ = cljs.core.count.call(null,c__4200__auto__);var b__10506 = cljs.core.chunk_buffer.call(null,size__4201__auto__);if((function (){var i__10505 = (0);while(true){
if((i__10505 < size__4201__auto__))
{var user = cljs.core._nth.call(null,c__4200__auto__,i__10505);cljs.core.chunk_append.call(null,b__10506,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null));
{
var G__10508 = (i__10505 + (1));
i__10505 = G__10508;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10506),iter__10503.call(null,cljs.core.chunk_rest.call(null,s__10504__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10506),null);
}
} else
{var user = cljs.core.first.call(null,s__10504__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null),iter__10503.call(null,cljs.core.rest.call(null,s__10504__$2)));
}
} else
{return null;
}
break;
}
});})(id))
,null,null));
});})(id))
;return iter__4202__auto__.call(null,cljs.core.deref.call(null,room.topics.users));
})()], null)], null);
});
room.topics.topic_box = cljs.core.with_meta.call(null,room.topics.topic_list,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (){return ((2) + (2));
})], null));
room.topics.topic_header = (function topic_header(id){var topic = cljs.core.get.call(null,cljs.core.deref.call(null,room.topics.topics),id);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#header","div#header",-546369869),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#topic-users","span#topic-users",2123004794),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"users","users",-713552705).cljs$core$IFn$_invoke$arity$1(topic)))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#topic-users","ul#topic-users",-39671443),(function (){var iter__4202__auto__ = ((function (topic){
return (function iter__10513(s__10514){return (new cljs.core.LazySeq(null,((function (topic){
return (function (){var s__10514__$1 = s__10514;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10514__$1);if(temp__4126__auto__)
{var s__10514__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10514__$2))
{var c__4200__auto__ = cljs.core.chunk_first.call(null,s__10514__$2);var size__4201__auto__ = cljs.core.count.call(null,c__4200__auto__);var b__10516 = cljs.core.chunk_buffer.call(null,size__4201__auto__);if((function (){var i__10515 = (0);while(true){
if((i__10515 < size__4201__auto__))
{var user = cljs.core._nth.call(null,c__4200__auto__,i__10515);cljs.core.chunk_append.call(null,b__10516,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user], null));
{
var G__10517 = (i__10515 + (1));
i__10515 = G__10517;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10516),iter__10513.call(null,cljs.core.chunk_rest.call(null,s__10514__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10516),null);
}
} else
{var user = cljs.core.first.call(null,s__10514__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user], null),iter__10513.call(null,cljs.core.rest.call(null,s__10514__$2)));
}
} else
{return null;
}
break;
}
});})(topic))
,null,null));
});})(topic))
;return iter__4202__auto__.call(null,new cljs.core.Keyword(null,"users","users",-713552705).cljs$core$IFn$_invoke$arity$1(topic));
})()], null)], null)], null);
});
