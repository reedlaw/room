// Compiled by ClojureScript 0.0-2356
goog.provide('room.topics');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('reagent.core');
goog.require('taoensso.sente');
goog.require('taoensso.sente');
goog.require('taoensso.encore');
goog.require('taoensso.encore');
goog.require('reagent.core');
goog.require('reagent.core');
goog.require('secretary.core');
goog.require('secretary.core');
var map__12245_12246 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__12245_12247__$1 = ((cljs.core.seq_QMARK_.call(null,map__12245_12246))?cljs.core.apply.call(null,cljs.core.hash_map,map__12245_12246):map__12245_12246);var state_12248 = cljs.core.get.call(null,map__12245_12247__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_12249 = cljs.core.get.call(null,map__12245_12247__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_12250 = cljs.core.get.call(null,map__12245_12247__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_12251 = cljs.core.get.call(null,map__12245_12247__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.topics.chsk = chsk_12251;
room.topics.ch_chsk = ch_recv_12250;
room.topics.chsk_send_BANG_ = send_fn_12249;
room.topics.chsk_state = state_12248;
room.topics.topics = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.topics));
room.topics.users = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.users));
room.topics.join_topic = (function join_topic(topic){return secretary.core.dispatch_BANG_.call(null,("/topics/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(topic)));
});
room.topics.add_topic = (function add_topic(topic){if(cljs.core.not.call(null,cljs.core.some.call(null,(function (p1__12252_SHARP_){return cljs.core._EQ_.call(null,topic,p1__12252_SHARP_);
}),cljs.core.deref.call(null,room.topics.topics))))
{cljs.core.swap_BANG_.call(null,room.topics.topics,cljs.core.conj,topic);
return room.topics.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("topic","join","topic/join",-615293299),topic], null));
} else
{return null;
}
});
room.topics.leave_topic = (function leave_topic(topic,cur){cljs.core.swap_BANG_.call(null,room.topics.topics,cljs.core.dissoc,topic);
room.topics.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("topic","leave","topic/leave",843811202),topic], null));
if(cljs.core._EQ_.call(null,topic,cur))
{return room.topics.join_topic.call(null,cljs.core.first.call(null,cljs.core.deref.call(null,room.topics.topics)));
} else
{return null;
}
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
{room.topics.add_topic.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,editing))
;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,editing){
return (function (p1__12253_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__12253_SHARP_.target.value);
});})(val,stop,save,editing))
,new cljs.core.Keyword(null,"on-blur","on-blur",814300747),stop,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,editing){
return (function (p1__12254_SHARP_){var G__12256 = p1__12254_SHARP_.which;switch (G__12256) {
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
room.topics.topic_input_box = cljs.core.with_meta.call(null,room.topics.topic_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (p1__12258_SHARP_){return reagent.core.dom_node.call(null,p1__12258_SHARP_).focus();
})], null));
room.topics.topic_list = (function topic_list(cur){return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#topics","div#topics",-1963481584),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),"Topics"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4200__auto__ = (function iter__12267(s__12268){return (new cljs.core.LazySeq(null,(function (){var s__12268__$1 = s__12268;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__12268__$1);if(temp__4126__auto__)
{var s__12268__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__12268__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__12268__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__12270 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__12269 = (0);while(true){
if((i__12269 < size__4199__auto__))
{var topic = cljs.core._nth.call(null,c__4198__auto__,i__12269);cljs.core.chunk_append.call(null,b__12270,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,topic.call(null,"name"),cur))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),topic,new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__12269,topic,c__4198__auto__,size__4199__auto__,b__12270,s__12268__$2,temp__4126__auto__){
return (function (){return room.topics.join_topic.call(null,topic.call(null,"name"));
});})(i__12269,topic,c__4198__auto__,size__4199__auto__,b__12270,s__12268__$2,temp__4126__auto__))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),topic.call(null,"name"),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__12269,topic,c__4198__auto__,size__4199__auto__,b__12270,s__12268__$2,temp__4126__auto__){
return (function (){return room.topics.leave_topic.call(null,topic.call(null,"name"),cur);
});})(i__12269,topic,c__4198__auto__,size__4199__auto__,b__12270,s__12268__$2,temp__4126__auto__))
], null)], null)], null));
{
var G__12275 = (i__12269 + (1));
i__12269 = G__12275;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12270),iter__12267.call(null,cljs.core.chunk_rest.call(null,s__12268__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12270),null);
}
} else
{var topic = cljs.core.first.call(null,s__12268__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,topic.call(null,"name"),cur))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),topic,new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__12268__$2,temp__4126__auto__){
return (function (){return room.topics.join_topic.call(null,topic.call(null,"name"));
});})(topic,s__12268__$2,temp__4126__auto__))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),topic.call(null,"name"),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-times-circle","i.fa.fa-times-circle",-11066977),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (topic,s__12268__$2,temp__4126__auto__){
return (function (){return room.topics.leave_topic.call(null,topic.call(null,"name"),cur);
});})(topic,s__12268__$2,temp__4126__auto__))
], null)], null)], null),iter__12267.call(null,cljs.core.rest.call(null,s__12268__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4200__auto__.call(null,cljs.core.deref.call(null,room.topics.topics));
})(),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-search","i.fa-li.fa.fa-search",-1076535420)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"More topics"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.topics.topic_input_box], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),"People"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4200__auto__ = (function iter__12271(s__12272){return (new cljs.core.LazySeq(null,(function (){var s__12272__$1 = s__12272;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__12272__$1);if(temp__4126__auto__)
{var s__12272__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__12272__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__12272__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__12274 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__12273 = (0);while(true){
if((i__12273 < size__4199__auto__))
{var user = cljs.core._nth.call(null,c__4198__auto__,i__12273);cljs.core.chunk_append.call(null,b__12274,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null));
{
var G__12276 = (i__12273 + (1));
i__12273 = G__12276;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12274),iter__12271.call(null,cljs.core.chunk_rest.call(null,s__12272__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__12274),null);
}
} else
{var user = cljs.core.first.call(null,s__12272__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),user.call(null,"name")], null)], null),iter__12271.call(null,cljs.core.rest.call(null,s__12272__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4200__auto__.call(null,cljs.core.deref.call(null,room.topics.users));
})()], null)], null);
});
room.topics.topic_header = (function topic_header(topic){return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#header","div#header",-546369869),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(topic)+" "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__12277_SHARP_){return cljs.core._EQ_.call(null,topic,p1__12277_SHARP_.call(null,"name"));
}),cljs.core.deref.call(null,room.topics.topics))).call(null,"users"))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null)], null);
});
