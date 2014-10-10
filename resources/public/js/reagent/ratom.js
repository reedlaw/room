// Compiled by ClojureScript 0.0-2356
goog.provide('reagent.ratom');
goog.require('cljs.core');
reagent.ratom.debug = false;
reagent.ratom._running = cljs.core.atom.call(null,(0));
reagent.ratom.running = (function running(){return cljs.core.deref.call(null,reagent.ratom._running);
});
reagent.ratom.capture_derefed = (function capture_derefed(f,obj){obj.cljsCaptured = null;
var _STAR_ratom_context_STAR_10654 = reagent.ratom._STAR_ratom_context_STAR_;try{reagent.ratom._STAR_ratom_context_STAR_ = obj;
return f.call(null);
}finally {reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR_10654;
}});
reagent.ratom.captured = (function captured(obj){var c = obj.cljsCaptured;obj.cljsCaptured = null;
return c;
});
reagent.ratom.notify_deref_watcher_BANG_ = (function notify_deref_watcher_BANG_(derefable){var obj = reagent.ratom._STAR_ratom_context_STAR_;if((obj == null))
{return null;
} else
{var captured = obj.cljsCaptured;return obj.cljsCaptured = cljs.core.conj.call(null,(((captured == null))?cljs.core.PersistentHashSet.EMPTY:captured),derefable);
}
});

/**
* @constructor
*/
reagent.ratom.RAtom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = 2153938944;
this.cljs$lang$protocol_mask$partition1$ = 114690;
})
reagent.ratom.RAtom.cljs$lang$type = true;
reagent.ratom.RAtom.cljs$lang$ctorStr = "reagent.ratom/RAtom";
reagent.ratom.RAtom.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"reagent.ratom/RAtom");
});
reagent.ratom.RAtom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return goog.getUid(this$__$1);
});
reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){var self__ = this;
var this$__$1 = this;return cljs.core.reduce_kv.call(null,((function (this$__$1){
return (function (_,key,f){f.call(null,key,this$__$1,oldval,newval);
return null;
});})(this$__$1))
,null,self__.watches);
});
reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){var self__ = this;
var this$__$1 = this;return self__.watches = cljs.core.assoc.call(null,self__.watches,key,f);
});
reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){var self__ = this;
var this$__$1 = this;return self__.watches = cljs.core.dissoc.call(null,self__.watches,key);
});
reagent.ratom.RAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,writer,opts){var self__ = this;
var a__$1 = this;cljs.core._write.call(null,writer,"#<Atom: ");
cljs.core.pr_writer.call(null,self__.state,writer,opts);
return cljs.core._write.call(null,writer,">");
});
reagent.ratom.RAtom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.meta;
});
reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state));
});
reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x));
});
reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f.call(null,self__.state,x,y));
});
reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f,self__.state,x,y,more));
});
reagent.ratom.RAtom.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,new_value){var self__ = this;
var a__$1 = this;if((self__.validator == null))
{} else
{if(cljs.core.truth_(self__.validator.call(null,new_value)))
{} else
{throw (new Error(("Assert failed: Validator rejected reference state\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"validator","validator",-325659154,null),new cljs.core.Symbol(null,"new-value","new-value",-1567397401,null)))))));
}
}
var old_value = self__.state;self__.state = new_value;
if((self__.watches == null))
{} else
{cljs.core._notify_watches.call(null,a__$1,old_value,new_value);
}
return new_value;
});
reagent.ratom.RAtom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;reagent.ratom.notify_deref_watcher_BANG_.call(null,this$__$1);
return self__.state;
});
reagent.ratom.RAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){var self__ = this;
var o__$1 = this;return (o__$1 === other);
});
reagent.ratom.__GT_RAtom = (function __GT_RAtom(state,meta,validator,watches){return (new reagent.ratom.RAtom(state,meta,validator,watches));
});
/**
* Like clojure.core/atom, except that it keeps track of derefs.
* @param {...*} var_args
*/
reagent.ratom.atom = (function() {
var atom = null;
var atom__1 = (function (x){return (new reagent.ratom.RAtom(x,null,null,null));
});
var atom__2 = (function() { 
var G__10658__delegate = function (x,p__10655){var map__10657 = p__10655;var map__10657__$1 = ((cljs.core.seq_QMARK_.call(null,map__10657))?cljs.core.apply.call(null,cljs.core.hash_map,map__10657):map__10657);var validator = cljs.core.get.call(null,map__10657__$1,new cljs.core.Keyword(null,"validator","validator",-1966190681));var meta = cljs.core.get.call(null,map__10657__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));return (new reagent.ratom.RAtom(x,meta,validator,null));
};
var G__10658 = function (x,var_args){
var p__10655 = null;if (arguments.length > 1) {
  p__10655 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__10658__delegate.call(this,x,p__10655);};
G__10658.cljs$lang$maxFixedArity = 1;
G__10658.cljs$lang$applyTo = (function (arglist__10659){
var x = cljs.core.first(arglist__10659);
var p__10655 = cljs.core.rest(arglist__10659);
return G__10658__delegate(x,p__10655);
});
G__10658.cljs$core$IFn$_invoke$arity$variadic = G__10658__delegate;
return G__10658;
})()
;
atom = function(x,var_args){
var p__10655 = var_args;
switch(arguments.length){
case 1:
return atom__1.call(this,x);
default:
return atom__2.cljs$core$IFn$_invoke$arity$variadic(x, cljs.core.array_seq(arguments, 1));
}
throw(new Error('Invalid arity: ' + arguments.length));
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__2.cljs$lang$applyTo;
atom.cljs$core$IFn$_invoke$arity$1 = atom__1;
atom.cljs$core$IFn$_invoke$arity$variadic = atom__2.cljs$core$IFn$_invoke$arity$variadic;
return atom;
})()
;
reagent.ratom.IDisposable = (function (){var obj10661 = {};return obj10661;
})();
reagent.ratom.dispose_BANG_ = (function dispose_BANG_(this$){if((function (){var and__3450__auto__ = this$;if(and__3450__auto__)
{return this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1;
} else
{return and__3450__auto__;
}
})())
{return this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1(this$);
} else
{var x__4098__auto__ = (((this$ == null))?null:this$);return (function (){var or__3462__auto__ = (reagent.ratom.dispose_BANG_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (reagent.ratom.dispose_BANG_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IDisposable.dispose!",this$);
}
}
})().call(null,this$);
}
});
reagent.ratom.IRunnable = (function (){var obj10663 = {};return obj10663;
})();
reagent.ratom.run = (function run(this$){if((function (){var and__3450__auto__ = this$;if(and__3450__auto__)
{return this$.reagent$ratom$IRunnable$run$arity$1;
} else
{return and__3450__auto__;
}
})())
{return this$.reagent$ratom$IRunnable$run$arity$1(this$);
} else
{var x__4098__auto__ = (((this$ == null))?null:this$);return (function (){var or__3462__auto__ = (reagent.ratom.run[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (reagent.ratom.run["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IRunnable.run",this$);
}
}
})().call(null,this$);
}
});
reagent.ratom.IComputedImpl = (function (){var obj10665 = {};return obj10665;
})();
reagent.ratom._update_watching = (function _update_watching(this$,derefed){if((function (){var and__3450__auto__ = this$;if(and__3450__auto__)
{return this$.reagent$ratom$IComputedImpl$_update_watching$arity$2;
} else
{return and__3450__auto__;
}
})())
{return this$.reagent$ratom$IComputedImpl$_update_watching$arity$2(this$,derefed);
} else
{var x__4098__auto__ = (((this$ == null))?null:this$);return (function (){var or__3462__auto__ = (reagent.ratom._update_watching[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (reagent.ratom._update_watching["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IComputedImpl.-update-watching",this$);
}
}
})().call(null,this$,derefed);
}
});
reagent.ratom._handle_change = (function _handle_change(k,sender,oldval,newval){if((function (){var and__3450__auto__ = k;if(and__3450__auto__)
{return k.reagent$ratom$IComputedImpl$_handle_change$arity$4;
} else
{return and__3450__auto__;
}
})())
{return k.reagent$ratom$IComputedImpl$_handle_change$arity$4(k,sender,oldval,newval);
} else
{var x__4098__auto__ = (((k == null))?null:k);return (function (){var or__3462__auto__ = (reagent.ratom._handle_change[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (reagent.ratom._handle_change["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IComputedImpl.-handle-change",k);
}
}
})().call(null,k,sender,oldval,newval);
}
});
reagent.ratom.call_watches = (function call_watches(obs,watches,oldval,newval){return cljs.core.reduce_kv.call(null,(function (_,key,f){f.call(null,key,obs,oldval,newval);
return null;
}),null,watches);
});

/**
* @constructor
*/
reagent.ratom.Reaction = (function (f,state,dirty_QMARK_,active_QMARK_,watching,watches,auto_run,on_set,on_dispose){
this.f = f;
this.state = state;
this.dirty_QMARK_ = dirty_QMARK_;
this.active_QMARK_ = active_QMARK_;
this.watching = watching;
this.watches = watches;
this.auto_run = auto_run;
this.on_set = on_set;
this.on_dispose = on_dispose;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 114690;
})
reagent.ratom.Reaction.cljs$lang$type = true;
reagent.ratom.Reaction.cljs$lang$ctorStr = "reagent.ratom/Reaction";
reagent.ratom.Reaction.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"reagent.ratom/Reaction");
});
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$ = true;
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$_handle_change$arity$4 = (function (this$,sender,oldval,newval){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_((function (){var and__3450__auto__ = self__.active_QMARK_;if(cljs.core.truth_(and__3450__auto__))
{return (cljs.core.not.call(null,self__.dirty_QMARK_)) && (!((oldval === newval)));
} else
{return and__3450__auto__;
}
})()))
{self__.dirty_QMARK_ = true;
return (function (){var or__3462__auto__ = self__.auto_run;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return reagent.ratom.run;
}
})().call(null,this$__$1);
} else
{return null;
}
});
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$_update_watching$arity$2 = (function (this$,derefed){var self__ = this;
var this$__$1 = this;var seq__10666_10678 = cljs.core.seq.call(null,derefed);var chunk__10667_10679 = null;var count__10668_10680 = (0);var i__10669_10681 = (0);while(true){
if((i__10669_10681 < count__10668_10680))
{var w_10682 = cljs.core._nth.call(null,chunk__10667_10679,i__10669_10681);if(cljs.core.contains_QMARK_.call(null,self__.watching,w_10682))
{} else
{cljs.core.add_watch.call(null,w_10682,this$__$1,reagent.ratom._handle_change);
}
{
var G__10683 = seq__10666_10678;
var G__10684 = chunk__10667_10679;
var G__10685 = count__10668_10680;
var G__10686 = (i__10669_10681 + (1));
seq__10666_10678 = G__10683;
chunk__10667_10679 = G__10684;
count__10668_10680 = G__10685;
i__10669_10681 = G__10686;
continue;
}
} else
{var temp__4126__auto___10687 = cljs.core.seq.call(null,seq__10666_10678);if(temp__4126__auto___10687)
{var seq__10666_10688__$1 = temp__4126__auto___10687;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10666_10688__$1))
{var c__4231__auto___10689 = cljs.core.chunk_first.call(null,seq__10666_10688__$1);{
var G__10690 = cljs.core.chunk_rest.call(null,seq__10666_10688__$1);
var G__10691 = c__4231__auto___10689;
var G__10692 = cljs.core.count.call(null,c__4231__auto___10689);
var G__10693 = (0);
seq__10666_10678 = G__10690;
chunk__10667_10679 = G__10691;
count__10668_10680 = G__10692;
i__10669_10681 = G__10693;
continue;
}
} else
{var w_10694 = cljs.core.first.call(null,seq__10666_10688__$1);if(cljs.core.contains_QMARK_.call(null,self__.watching,w_10694))
{} else
{cljs.core.add_watch.call(null,w_10694,this$__$1,reagent.ratom._handle_change);
}
{
var G__10695 = cljs.core.next.call(null,seq__10666_10688__$1);
var G__10696 = null;
var G__10697 = (0);
var G__10698 = (0);
seq__10666_10678 = G__10695;
chunk__10667_10679 = G__10696;
count__10668_10680 = G__10697;
i__10669_10681 = G__10698;
continue;
}
}
} else
{}
}
break;
}
var seq__10670_10699 = cljs.core.seq.call(null,self__.watching);var chunk__10671_10700 = null;var count__10672_10701 = (0);var i__10673_10702 = (0);while(true){
if((i__10673_10702 < count__10672_10701))
{var w_10703 = cljs.core._nth.call(null,chunk__10671_10700,i__10673_10702);if(cljs.core.contains_QMARK_.call(null,derefed,w_10703))
{} else
{cljs.core.remove_watch.call(null,w_10703,this$__$1);
}
{
var G__10704 = seq__10670_10699;
var G__10705 = chunk__10671_10700;
var G__10706 = count__10672_10701;
var G__10707 = (i__10673_10702 + (1));
seq__10670_10699 = G__10704;
chunk__10671_10700 = G__10705;
count__10672_10701 = G__10706;
i__10673_10702 = G__10707;
continue;
}
} else
{var temp__4126__auto___10708 = cljs.core.seq.call(null,seq__10670_10699);if(temp__4126__auto___10708)
{var seq__10670_10709__$1 = temp__4126__auto___10708;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10670_10709__$1))
{var c__4231__auto___10710 = cljs.core.chunk_first.call(null,seq__10670_10709__$1);{
var G__10711 = cljs.core.chunk_rest.call(null,seq__10670_10709__$1);
var G__10712 = c__4231__auto___10710;
var G__10713 = cljs.core.count.call(null,c__4231__auto___10710);
var G__10714 = (0);
seq__10670_10699 = G__10711;
chunk__10671_10700 = G__10712;
count__10672_10701 = G__10713;
i__10673_10702 = G__10714;
continue;
}
} else
{var w_10715 = cljs.core.first.call(null,seq__10670_10709__$1);if(cljs.core.contains_QMARK_.call(null,derefed,w_10715))
{} else
{cljs.core.remove_watch.call(null,w_10715,this$__$1);
}
{
var G__10716 = cljs.core.next.call(null,seq__10670_10709__$1);
var G__10717 = null;
var G__10718 = (0);
var G__10719 = (0);
seq__10670_10699 = G__10716;
chunk__10671_10700 = G__10717;
count__10672_10701 = G__10718;
i__10673_10702 = G__10719;
continue;
}
}
} else
{}
}
break;
}
return self__.watching = derefed;
});
reagent.ratom.Reaction.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this$,writer,opts){var self__ = this;
var this$__$1 = this;cljs.core._write.call(null,writer,("#<Reaction "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.hash.call(null,this$__$1))+": "));
cljs.core.pr_writer.call(null,self__.state,writer,opts);
return cljs.core._write.call(null,writer,">");
});
reagent.ratom.Reaction.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;return goog.getUid(this$__$1);
});
reagent.ratom.Reaction.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){var self__ = this;
var o__$1 = this;return (o__$1 === other);
});
reagent.ratom.Reaction.prototype.reagent$ratom$IDisposable$ = true;
reagent.ratom.Reaction.prototype.reagent$ratom$IDisposable$dispose_BANG_$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var seq__10674_10720 = cljs.core.seq.call(null,self__.watching);var chunk__10675_10721 = null;var count__10676_10722 = (0);var i__10677_10723 = (0);while(true){
if((i__10677_10723 < count__10676_10722))
{var w_10724 = cljs.core._nth.call(null,chunk__10675_10721,i__10677_10723);cljs.core.remove_watch.call(null,w_10724,this$__$1);
{
var G__10725 = seq__10674_10720;
var G__10726 = chunk__10675_10721;
var G__10727 = count__10676_10722;
var G__10728 = (i__10677_10723 + (1));
seq__10674_10720 = G__10725;
chunk__10675_10721 = G__10726;
count__10676_10722 = G__10727;
i__10677_10723 = G__10728;
continue;
}
} else
{var temp__4126__auto___10729 = cljs.core.seq.call(null,seq__10674_10720);if(temp__4126__auto___10729)
{var seq__10674_10730__$1 = temp__4126__auto___10729;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10674_10730__$1))
{var c__4231__auto___10731 = cljs.core.chunk_first.call(null,seq__10674_10730__$1);{
var G__10732 = cljs.core.chunk_rest.call(null,seq__10674_10730__$1);
var G__10733 = c__4231__auto___10731;
var G__10734 = cljs.core.count.call(null,c__4231__auto___10731);
var G__10735 = (0);
seq__10674_10720 = G__10732;
chunk__10675_10721 = G__10733;
count__10676_10722 = G__10734;
i__10677_10723 = G__10735;
continue;
}
} else
{var w_10736 = cljs.core.first.call(null,seq__10674_10730__$1);cljs.core.remove_watch.call(null,w_10736,this$__$1);
{
var G__10737 = cljs.core.next.call(null,seq__10674_10730__$1);
var G__10738 = null;
var G__10739 = (0);
var G__10740 = (0);
seq__10674_10720 = G__10737;
chunk__10675_10721 = G__10738;
count__10676_10722 = G__10739;
i__10677_10723 = G__10740;
continue;
}
}
} else
{}
}
break;
}
self__.watching = cljs.core.PersistentHashSet.EMPTY;
self__.state = null;
self__.dirty_QMARK_ = true;
if(cljs.core.truth_(self__.active_QMARK_))
{if(cljs.core.truth_(reagent.ratom.debug))
{cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core.dec);
} else
{}
self__.active_QMARK_ = false;
} else
{}
if(cljs.core.truth_(self__.on_dispose))
{return self__.on_dispose.call(null);
} else
{return null;
}
});
reagent.ratom.Reaction.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,new_value){var self__ = this;
var a__$1 = this;var old_value = self__.state;self__.state = new_value;
cljs.core._notify_watches.call(null,a__$1,old_value,new_value);
return new_value;
});
reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f__$1){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,self__.state));
});
reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f__$1,x){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,self__.state,x));
});
reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f__$1,x,y){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,f__$1.call(null,self__.state,x,y));
});
reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f__$1,x,y,more){var self__ = this;
var a__$1 = this;return cljs.core._reset_BANG_.call(null,a__$1,cljs.core.apply.call(null,f__$1,self__.state,x,y,more));
});
reagent.ratom.Reaction.prototype.reagent$ratom$IRunnable$ = true;
reagent.ratom.Reaction.prototype.reagent$ratom$IRunnable$run$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;var oldstate = self__.state;var res = reagent.ratom.capture_derefed.call(null,self__.f,this$__$1);var derefed = reagent.ratom.captured.call(null,this$__$1);if(cljs.core.not_EQ_.call(null,derefed,self__.watching))
{reagent.ratom._update_watching.call(null,this$__$1,derefed);
} else
{}
if(cljs.core.truth_(self__.active_QMARK_))
{} else
{if(cljs.core.truth_(reagent.ratom.debug))
{cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core.inc);
} else
{}
self__.active_QMARK_ = true;
}
self__.dirty_QMARK_ = false;
self__.state = res;
reagent.ratom.call_watches.call(null,this$__$1,self__.watches,oldstate,self__.state);
return res;
});
reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,oldval,newval){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_(self__.on_set))
{self__.on_set.call(null,oldval,newval);
} else
{}
return reagent.ratom.call_watches.call(null,this$__$1,self__.watches,oldval,newval);
});
reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,k,wf){var self__ = this;
var this$__$1 = this;return self__.watches = cljs.core.assoc.call(null,self__.watches,k,wf);
});
reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,k){var self__ = this;
var this$__$1 = this;self__.watches = cljs.core.dissoc.call(null,self__.watches,k);
if(cljs.core.empty_QMARK_.call(null,self__.watches))
{return reagent.ratom.dispose_BANG_.call(null,this$__$1);
} else
{return null;
}
});
reagent.ratom.Reaction.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){var self__ = this;
var this$__$1 = this;if(cljs.core.not.call(null,(function (){var or__3462__auto__ = self__.auto_run;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return reagent.ratom._STAR_ratom_context_STAR_;
}
})()))
{var x__6241__auto___10741 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.auto_run,reagent.ratom._STAR_ratom_context_STAR_], null);if(!((console.log == null)))
{console.log((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("dbg reagent.ratom:"+177+": [auto-run *ratom-context*]: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,x__6241__auto___10741))))));
} else
{}
} else
{}
if(cljs.core.truth_((function (){var or__3462__auto__ = self__.auto_run;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return reagent.ratom._STAR_ratom_context_STAR_;
}
})()))
{} else
{throw (new Error(("Assert failed: Reaction derefed outside auto-running context\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),new cljs.core.Symbol(null,"auto-run","auto-run",-696035332,null),new cljs.core.Symbol(null,"*ratom-context*","*ratom-context*",-1557728360,null)))))));
}
reagent.ratom.notify_deref_watcher_BANG_.call(null,this$__$1);
if(cljs.core.truth_(self__.dirty_QMARK_))
{return reagent.ratom.run.call(null,this$__$1);
} else
{return self__.state;
}
});
reagent.ratom.__GT_Reaction = (function __GT_Reaction(f,state,dirty_QMARK_,active_QMARK_,watching,watches,auto_run,on_set,on_dispose){return (new reagent.ratom.Reaction(f,state,dirty_QMARK_,active_QMARK_,watching,watches,auto_run,on_set,on_dispose));
});
/**
* @param {...*} var_args
*/
reagent.ratom.make_reaction = (function() { 
var make_reaction__delegate = function (f,p__10742){var map__10744 = p__10742;var map__10744__$1 = ((cljs.core.seq_QMARK_.call(null,map__10744))?cljs.core.apply.call(null,cljs.core.hash_map,map__10744):map__10744);var derefed = cljs.core.get.call(null,map__10744__$1,new cljs.core.Keyword(null,"derefed","derefed",590684583));var on_dispose = cljs.core.get.call(null,map__10744__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360));var on_set = cljs.core.get.call(null,map__10744__$1,new cljs.core.Keyword(null,"on-set","on-set",-140953470));var auto_run = cljs.core.get.call(null,map__10744__$1,new cljs.core.Keyword(null,"auto-run","auto-run",1958400437));var runner = ((cljs.core._EQ_.call(null,auto_run,true))?reagent.ratom.run:auto_run);var active = !((derefed == null));var dirty = !(active);var reaction = (new reagent.ratom.Reaction(f,null,dirty,active,null,cljs.core.PersistentArrayMap.EMPTY,runner,on_set,on_dispose));if((derefed == null))
{} else
{if(cljs.core.truth_(reagent.ratom.debug))
{cljs.core.swap_BANG_.call(null,reagent.ratom._running,cljs.core.inc);
} else
{}
reagent.ratom._update_watching.call(null,reaction,derefed);
}
return reaction;
};
var make_reaction = function (f,var_args){
var p__10742 = null;if (arguments.length > 1) {
  p__10742 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return make_reaction__delegate.call(this,f,p__10742);};
make_reaction.cljs$lang$maxFixedArity = 1;
make_reaction.cljs$lang$applyTo = (function (arglist__10745){
var f = cljs.core.first(arglist__10745);
var p__10742 = cljs.core.rest(arglist__10745);
return make_reaction__delegate(f,p__10742);
});
make_reaction.cljs$core$IFn$_invoke$arity$variadic = make_reaction__delegate;
return make_reaction;
})()
;

//# sourceMappingURL=ratom.js.map