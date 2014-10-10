// Compiled by ClojureScript 0.0-2356
goog.provide('room.chats');
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
var map__10513_10514 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492)], null));var map__10513_10515__$1 = ((cljs.core.seq_QMARK_.call(null,map__10513_10514))?cljs.core.apply.call(null,cljs.core.hash_map,map__10513_10514):map__10513_10514);var state_10516 = cljs.core.get.call(null,map__10513_10515__$1,new cljs.core.Keyword(null,"state","state",-1988618099));var send_fn_10517 = cljs.core.get.call(null,map__10513_10515__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));var ch_recv_10518 = cljs.core.get.call(null,map__10513_10515__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));var chsk_10519 = cljs.core.get.call(null,map__10513_10515__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));room.chats.chsk = chsk_10519;
room.chats.ch_chsk = ch_recv_10518;
room.chats.chsk_send_BANG_ = send_fn_10517;
room.chats.chsk_state = state_10516;
room.chats.chats = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.user).call(null,"chats"));
room.chats.users = reagent.core.atom.call(null,cljs.core.js__GT_clj.call(null,window.users));
room.chats.join_chat = (function join_chat(chat){return secretary.core.dispatch_BANG_.call(null,("/chats/"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(chat)));
});
room.chats.add_chat = (function add_chat(chat){room.chats.join_chat.call(null,chat);
if(cljs.core.not.call(null,cljs.core.some.call(null,(function (p1__10520_SHARP_){return cljs.core._EQ_.call(null,chat,p1__10520_SHARP_);
}),cljs.core.deref.call(null,room.chats.chats))))
{cljs.core.swap_BANG_.call(null,room.chats.chats,cljs.core.conj,chat);
return room.chats.chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chat","join","chat/join",-711254922),chat], null));
} else
{return null;
}
});
room.chats.notify_new_message = (function notify_new_message(chat){return null;
});
room.chats.chat_input = (function chat_input(){var editing = reagent.core.atom.call(null,false);return ((function (editing){
return (function (props){if(cljs.core.truth_(cljs.core.deref.call(null,editing)))
{var val = reagent.core.atom.call(null,"");var stop = ((function (val,editing){
return (function (){cljs.core.reset_BANG_.call(null,val,"");
return cljs.core.reset_BANG_.call(null,editing,false);
});})(val,editing))
;var save = ((function (val,stop,editing){
return (function (){var v = clojure.string.trim.call(null,(''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,val))));if(!(cljs.core.empty_QMARK_.call(null,v)))
{room.chats.add_chat.call(null,v);
} else
{}
return stop.call(null);
});})(val,stop,editing))
;return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"on-change","on-change",-732046149),((function (val,stop,save,editing){
return (function (p1__10521_SHARP_){return cljs.core.reset_BANG_.call(null,val,p1__10521_SHARP_.target.value);
});})(val,stop,save,editing))
,new cljs.core.Keyword(null,"on-key-up","on-key-up",884441808),((function (val,stop,save,editing){
return (function (p1__10522_SHARP_){var G__10524 = p1__10522_SHARP_.which;switch (G__10524) {
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
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-plus-square-o","i.fa-li.fa.fa-plus-square-o",1423236083)], null),"Start a new chat"], null);
}
});
;})(editing))
});
room.chats.chat_input_box = cljs.core.with_meta.call(null,room.chats.chat_input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),(function (p1__10526_SHARP_){return reagent.core.dom_node.call(null,p1__10526_SHARP_).focus();
})], null));
room.chats.chat_list = (function chat_list(cur){return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#topics","div#topics",-1963481584),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-users","i.fa.fa-users",-337244888)], null),"Topics"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4200__auto__ = (function iter__10535(s__10536){return (new cljs.core.LazySeq(null,(function (){var s__10536__$1 = s__10536;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10536__$1);if(temp__4126__auto__)
{var s__10536__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10536__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__10536__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__10538 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__10537 = (0);while(true){
if((i__10537 < size__4199__auto__))
{var chat = cljs.core._nth.call(null,c__4198__auto__,i__10537);cljs.core.chunk_append.call(null,b__10538,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,chat,cur))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),chat,new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (i__10537,chat,c__4198__auto__,size__4199__auto__,b__10538,s__10536__$2,temp__4126__auto__){
return (function (){return room.chats.join_chat.call(null,chat);
});})(i__10537,chat,c__4198__auto__,size__4199__auto__,b__10538,s__10536__$2,temp__4126__auto__))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),chat], null));
{
var G__10543 = (i__10537 + (1));
i__10537 = G__10543;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10538),iter__10535.call(null,cljs.core.chunk_rest.call(null,s__10536__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10538),null);
}
} else
{var chat = cljs.core.first.call(null,s__10536__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"class","class",-2030961996),((cljs.core._EQ_.call(null,chat,cur))?"current":null),new cljs.core.Keyword(null,"key","key",-1516042587),chat,new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (chat,s__10536__$2,temp__4126__auto__){
return (function (){return room.chats.join_chat.call(null,chat);
});})(chat,s__10536__$2,temp__4126__auto__))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-check-square-o","i.fa-li.fa.fa-check-square-o",1622375460)], null),chat], null),iter__10535.call(null,cljs.core.rest.call(null,s__10536__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4200__auto__.call(null,cljs.core.deref.call(null,room.chats.chats));
})(),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [room.chats.chat_input_box], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa.fa-user","i.fa.fa-user",382004105)], null),"People"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul.fa-ul","ul.fa-ul",591795787),(function (){var iter__4200__auto__ = (function iter__10539(s__10540){return (new cljs.core.LazySeq(null,(function (){var s__10540__$1 = s__10540;while(true){
var temp__4126__auto__ = cljs.core.seq.call(null,s__10540__$1);if(temp__4126__auto__)
{var s__10540__$2 = temp__4126__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__10540__$2))
{var c__4198__auto__ = cljs.core.chunk_first.call(null,s__10540__$2);var size__4199__auto__ = cljs.core.count.call(null,c__4198__auto__);var b__10542 = cljs.core.chunk_buffer.call(null,size__4199__auto__);if((function (){var i__10541 = (0);while(true){
if((i__10541 < size__4199__auto__))
{var user = cljs.core._nth.call(null,c__4198__auto__,i__10541);cljs.core.chunk_append.call(null,b__10542,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user.call(null,"name"),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null)], null));
{
var G__10544 = (i__10541 + (1));
i__10541 = G__10544;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10542),iter__10539.call(null,cljs.core.chunk_rest.call(null,s__10540__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10542),null);
}
} else
{var user = cljs.core.first.call(null,s__10540__$2);return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),user], null),user.call(null,"name"),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fa-li.fa.fa-square-o","i.fa-li.fa.fa-square-o",638149487)], null)], null),iter__10539.call(null,cljs.core.rest.call(null,s__10540__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__4200__auto__.call(null,cljs.core.deref.call(null,room.chats.users));
})()], null)], null);
});
