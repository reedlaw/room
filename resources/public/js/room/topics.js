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
var map__20144_20145 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__20144_20146__$1 = ((cljs.core.seq_QMARK_.call(null,map__20144_20145))?cljs.core.apply.call(null,cljs.core.hash_map,map__20144_20145):map__20144_20145);var state_20147 = cljs.core.get.call(null,map__20144_20146__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_20148 = cljs.core.get.call(null,map__20144_20146__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_20149 = cljs.core.get.call(null,map__20144_20146__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_20150 = cljs.core.get.call(null,map__20144_20146__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.topics.chsk = chsk_20150;
room.topics.ch_chsk = ch_recv_20149;
room.topics.chsk_send_BANG_ = send_fn_20148;
room.topics.chsk_state = state_20147;
room.topics.users = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.users));
room.topics.topics = reagent.core.atom.call(null,cljs.core.sorted_map.call(null));
room.topics.add_topic = (function add_topic(id,name,users){return cljs.core.swap_BANG_.call(null,room.topics.topics,cljs.core.assoc,id,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"users","users",-713552705),users], null));
});
var seq__20151_20155 = cljs.core.seq.call(null,cljs.core.js__GT_clj.call(null,window.topics));var chunk__20152_20156 = null;var count__20153_20157 = (0);var i__20154_20158 = (0);while(true){
if((i__20154_20158 < count__20153_20157))
{var t_20159 = cljs.core._nth.call(null,chunk__20152_20156,i__20154_20158);room.topics.add_topic.call(null,cljs.core.get.call(null,t_20159,"id"),cljs.core.get.call(null,t_20159,"name"),cljs.core.get.call(null,t_20159,"users"));
{
var G__20160 = seq__20151_20155;
var G__20161 = chunk__20152_20156;
var G__20162 = count__20153_20157;
var G__20163 = (i__20154_20158 + (1));
seq__20151_20155 = G__20160;
chunk__20152_20156 = G__20161;
count__20153_20157 = G__20162;
i__20154_20158 = G__20163;
continue;
}
} else
{var temp__4126__auto___20164 = cljs.core.seq.call(null,seq__20151_20155);if(temp__4126__auto___20164)
{var seq__20151_20165__$1 = temp__4126__auto___20164;if(cljs.core.chunked_seq_QMARK_.call(null,seq__20151_20165__$1))
{var c__4231__auto___20166 = cljs.core.chunk_first.call(null,seq__20151_20165__$1);{
var G__20167 = cljs.core.chunk_rest.call(null,seq__20151_20165__$1);
var G__20168 = c__4231__auto___20166;
var G__20169 = cljs.core.count.call(null,c__4231__auto___20166);
var G__20170 = (0);
seq__20151_20155 = G__20167;
chunk__20152_20156 = G__20168;
count__20153_20157 = G__20169;
i__20154_20158 = G__20170;
continue;
}
} else
{var t_20171 = cljs.core.first.call(null,seq__20151_20165__$1);room.topics.add_topic.call(null,cljs.core.get.call(null,t_20171,"id"),cljs.core.get.call(null,t_20171,"name"),cljs.core.get.call(null,t_20171,"users"));
{
var G__20172 = cljs.core.next.call(null,seq__20151_20165__$1);
var G__20173 = null;
var G__20174 = (0);
var G__20175 = (0);
seq__20151_20155 = G__20172;
chunk__20152_20156 = G__20173;
count__20153_20157 = G__20174;
i__20154_20158 = G__20175;
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
return (function (p1__20176_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__20176_SHARP_.target.value);
});})(val,stop,save,editing))
,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),stop,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,editing){
return (function (p1__20177_SHARP_){var G__20179 = p1__20177_SHARP_.which;switch (G__20179) {
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
room.topics.topic_input_box = cljs.core.with_meta.call(null,room.topics.topic_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (p1__20181_SHARP_){return reagent.core.dom_node.call(null,p1__20181_SHARP_).focus();
})], null));
room.topics.topic_list = (function topic_list(){var id = room.session.get.call(null,new cljs.core.Keyword(null,"current-topic-id","current-topic-id",-740928864));return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#topics","div#topics",-1963481584),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),"Topics"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),cljs.core.doall.call(null,(function (){var iter__4200__auto__ = ((function (id){
return (function iter__20190(s__20191){return (new cljs.core.LazySeq(null,((function (id){
return (function (){var s__20191__$1 = s__20191;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__20191__$1);if(temp__4126__auto__)
{var s__20191__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__20191__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__20191__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__20193 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__20192 = (0);while(true){
if((i__20192 < size__4199__auto__))
{var topic = cljs.core._nth.call(null,c__4198__auto__,i__20192);cljs.core.chunk_append.call(null,b__20193,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),id))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__20192,topic,c__4198__auto__,size__4199__auto__,b__20193,s__20191__$2,temp__4126__auto__,id){
return (function (){return room.topics.join_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(i__20192,topic,c__4198__auto__,size__4199__auto__,b__20193,s__20191__$2,temp__4126__auto__,id))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__20192,topic,c__4198__auto__,size__4199__auto__,b__20193,s__20191__$2,temp__4126__auto__,id){
return (function (){return room.topics.leave_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(i__20192,topic,c__4198__auto__,size__4199__auto__,b__20193,s__20191__$2,temp__4126__auto__,id))
], null)], null)], null));
{
var G__20198 = (i__20192 + (1));
i__20192 = G__20198;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20193),iter__20190.call(null,cljs.core.chunk_rest.call(null,s__20191__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20193),null);
}
} else
{var topic = cljs.core.first.call(null,s__20191__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),id))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__20191__$2,temp__4126__auto__,id){
return (function (){return room.topics.join_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(topic,s__20191__$2,temp__4126__auto__,id))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__20191__$2,temp__4126__auto__,id){
return (function (){return room.topics.leave_topic.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(topic));
});})(topic,s__20191__$2,temp__4126__auto__,id))
], null)], null)], null),iter__20190.call(null,cljs.core.rest.call(null,s__20191__$2)));
}
} else
{return null;
}
break;
}
});})(id))
,null,null));
});})(id))
;return iter__4200__auto__.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,room.topics.topics)));
})()),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-search","i.fa-li.fa.fa-search",-1076535420)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"More topics"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.topics.topic_input_box], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),"People"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4200__auto__ = ((function (id){
return (function iter__20194(s__20195){return (new cljs.core.LazySeq(null,((function (id){
return (function (){var s__20195__$1 = s__20195;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__20195__$1);if(temp__4126__auto__)
{var s__20195__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__20195__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__20195__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__20197 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__20196 = (0);while(true){
if((i__20196 < size__4199__auto__))
{var user = cljs.core._nth.call(null,c__4198__auto__,i__20196);cljs.core.chunk_append.call(null,b__20197,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null));
{
var G__20199 = (i__20196 + (1));
i__20196 = G__20199;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20197),iter__20194.call(null,cljs.core.chunk_rest.call(null,s__20195__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20197),null);
}
} else
{var user = cljs.core.first.call(null,s__20195__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null),iter__20194.call(null,cljs.core.rest.call(null,s__20195__$2)));
}
} else
{return null;
}
break;
}
});})(id))
,null,null));
});})(id))
;return iter__4200__auto__.call(null,cljs.core.deref.call(null,room.topics.users));
})()], null)], null);
});
room.topics.topic_box = cljs.core.with_meta.call(null,room.topics.topic_list,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (){return ((2) + (2));
})], null));
room.topics.topic_header = (function topic_header(id){var topic = cljs.core.get.call(null,cljs.core.deref.call(null,room.topics.topics),id);return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#header","div#header",-546369869),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(topic),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span#topic-users","span#topic-users",2123004794),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"users","users",-713552705).cljs$core$IFn$_invoke$arity$1(topic)))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul#topic-users","ul#topic-users",-39671443),(function (){var iter__4200__auto__ = ((function (topic){
return (function iter__20204(s__20205){return (new cljs.core.LazySeq(null,((function (topic){
return (function (){var s__20205__$1 = s__20205;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__20205__$1);if(temp__4126__auto__)
{var s__20205__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__20205__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__20205__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__20207 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__20206 = (0);while(true){
if((i__20206 < size__4199__auto__))
{var user = cljs.core._nth.call(null,c__4198__auto__,i__20206);cljs.core.chunk_append.call(null,b__20207,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user], null));
{
var G__20208 = (i__20206 + (1));
i__20206 = G__20208;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20207),iter__20204.call(null,cljs.core.chunk_rest.call(null,s__20205__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20207),null);
}
} else
{var user = cljs.core.first.call(null,s__20205__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user], null),iter__20204.call(null,cljs.core.rest.call(null,s__20205__$2)));
}
} else
{return null;
}
break;
}
});})(topic))
,null,null));
});})(topic))
;return iter__4200__auto__.call(null,new cljs.core.Keyword(null,"users","users",-713552705).cljs$core$IFn$_invoke$arity$1(topic));
})()], null)], null)], null);
});
