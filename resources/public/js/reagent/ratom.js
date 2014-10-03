// Compiled by ClojureScript 0.0-2356
goog.provide('reagent.ratom');
goog.require('cljs.core');
reagent.ratom.debug = false;
reagent.ratom._running = cljs.core.atom.call(null,(0));
reagent.ratom.running = (function running(){return cljs.core.deref.call(null,reagent.ratom._running);
});
reagent.ratom.capture_derefed = (function capture_derefed(f,obj){obj.cljsCaptured = null;
var _STAR_ratom_context_STAR_10609 = reagent.ratom._STAR_ratom_context_STAR_;try{reagent.ratom._STAR_ratom_context_STAR_ = obj;
return f.call(null);
}finally {reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR_10609;
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
reagent.ratom.RAtom.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"reagent.ratom/RAtom");
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
var G__10613__delegate = function (x,p__10610){var map__10612 = p__10610;var map__10612__$1 = ((cljs.core.seq_QMARK_.call(null,map__10612))?cljs.core.apply.call(null,cljs.core.hash_map,map__10612):map__10612);var validator = cljs.core.get.call(null,map__10612__$1,new cljs.core.Keyword(null,"validator","validator",-1966190681));var meta = cljs.core.get.call(null,map__10612__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));return (new reagent.ratom.RAtom(x,meta,validator,null));
};
var G__10613 = function (x,var_args){
var p__10610 = null;if (arguments.length > 1) {
  p__10610 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return G__10613__delegate.call(this,x,p__10610);};
G__10613.cljs$lang$maxFixedArity = 1;
G__10613.cljs$lang$applyTo = (function (arglist__10614){
var x = cljs.core.first(arglist__10614);
var p__10610 = cljs.core.rest(arglist__10614);
return G__10613__delegate(x,p__10610);
});
G__10613.cljs$core$IFn$_invoke$arity$variadic = G__10613__delegate;
return G__10613;
})()
;
atom = function(x,var_args){
var p__10610 = var_args;
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
reagent.ratom.IDisposable = (function (){var obj10616 = {};return obj10616;
})();
reagent.ratom.dispose_BANG_ = (function dispose_BANG_(this$){if((function (){var and__3625__auto__ = this$;if(and__3625__auto__)
{return this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1;
} else
{return and__3625__auto__;
}
})())
{return this$.reagent$ratom$IDisposable$dispose_BANG_$arity$1(this$);
} else
{var x__4273__auto__ = (((this$ == null))?null:this$);return (function (){var or__3637__auto__ = (reagent.ratom.dispose_BANG_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (reagent.ratom.dispose_BANG_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IDisposable.dispose!",this$);
}
}
})().call(null,this$);
}
});
reagent.ratom.IRunnable = (function (){var obj10618 = {};return obj10618;
})();
reagent.ratom.run = (function run(this$){if((function (){var and__3625__auto__ = this$;if(and__3625__auto__)
{return this$.reagent$ratom$IRunnable$run$arity$1;
} else
{return and__3625__auto__;
}
})())
{return this$.reagent$ratom$IRunnable$run$arity$1(this$);
} else
{var x__4273__auto__ = (((this$ == null))?null:this$);return (function (){var or__3637__auto__ = (reagent.ratom.run[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (reagent.ratom.run["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IRunnable.run",this$);
}
}
})().call(null,this$);
}
});
reagent.ratom.IComputedImpl = (function (){var obj10620 = {};return obj10620;
})();
reagent.ratom._update_watching = (function _update_watching(this$,derefed){if((function (){var and__3625__auto__ = this$;if(and__3625__auto__)
{return this$.reagent$ratom$IComputedImpl$_update_watching$arity$2;
} else
{return and__3625__auto__;
}
})())
{return this$.reagent$ratom$IComputedImpl$_update_watching$arity$2(this$,derefed);
} else
{var x__4273__auto__ = (((this$ == null))?null:this$);return (function (){var or__3637__auto__ = (reagent.ratom._update_watching[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (reagent.ratom._update_watching["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IComputedImpl.-update-watching",this$);
}
}
})().call(null,this$,derefed);
}
});
reagent.ratom._handle_change = (function _handle_change(k,sender,oldval,newval){if((function (){var and__3625__auto__ = k;if(and__3625__auto__)
{return k.reagent$ratom$IComputedImpl$_handle_change$arity$4;
} else
{return and__3625__auto__;
}
})())
{return k.reagent$ratom$IComputedImpl$_handle_change$arity$4(k,sender,oldval,newval);
} else
{var x__4273__auto__ = (((k == null))?null:k);return (function (){var or__3637__auto__ = (reagent.ratom._handle_change[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (reagent.ratom._handle_change["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
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
reagent.ratom.Reaction.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"reagent.ratom/Reaction");
});
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$ = true;
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$_handle_change$arity$4 = (function (this$,sender,oldval,newval){var self__ = this;
var this$__$1 = this;if(cljs.core.truth_((function (){var and__3625__auto__ = self__.active_QMARK_;if(cljs.core.truth_(and__3625__auto__))
{return (cljs.core.not.call(null,self__.dirty_QMARK_)) && (!((oldval === newval)));
} else
{return and__3625__auto__;
}
})()))
{self__.dirty_QMARK_ = true;
return (function (){var or__3637__auto__ = self__.auto_run;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{return reagent.ratom.run;
}
})().call(null,this$__$1);
} else
{return null;
}
});
reagent.ratom.Reaction.prototype.reagent$ratom$IComputedImpl$_update_watching$arity$2 = (function (this$,derefed){var self__ = this;
var this$__$1 = this;var seq__10621_10633 = cljs.core.seq.call(null,derefed);var chunk__10622_10634 = null;var count__10623_10635 = (0);var i__10624_10636 = (0);while(true){
if((i__10624_10636 < count__10623_10635))
{var w_10637 = cljs.core._nth.call(null,chunk__10622_10634,i__10624_10636);if(cljs.core.contains_QMARK_.call(null,self__.watching,w_10637))
{} else
{cljs.core.add_watch.call(null,w_10637,this$__$1,reagent.ratom._handle_change);
}
{
var G__10638 = seq__10621_10633;
var G__10639 = chunk__10622_10634;
var G__10640 = count__10623_10635;
var G__10641 = (i__10624_10636 + (1));
seq__10621_10633 = G__10638;
chunk__10622_10634 = G__10639;
count__10623_10635 = G__10640;
i__10624_10636 = G__10641;
continue;
}
} else
{var temp__4126__auto___10642 = cljs.core.seq.call(null,seq__10621_10633);if(temp__4126__auto___10642)
{var seq__10621_10643__$1 = temp__4126__auto___10642;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10621_10643__$1))
{var c__4406__auto___10644 = cljs.core.chunk_first.call(null,seq__10621_10643__$1);{
var G__10645 = cljs.core.chunk_rest.call(null,seq__10621_10643__$1);
var G__10646 = c__4406__auto___10644;
var G__10647 = cljs.core.count.call(null,c__4406__auto___10644);
var G__10648 = (0);
seq__10621_10633 = G__10645;
chunk__10622_10634 = G__10646;
count__10623_10635 = G__10647;
i__10624_10636 = G__10648;
continue;
}
} else
{var w_10649 = cljs.core.first.call(null,seq__10621_10643__$1);if(cljs.core.contains_QMARK_.call(null,self__.watching,w_10649))
{} else
{cljs.core.add_watch.call(null,w_10649,this$__$1,reagent.ratom._handle_change);
}
{
var G__10650 = cljs.core.next.call(null,seq__10621_10643__$1);
var G__10651 = null;
var G__10652 = (0);
var G__10653 = (0);
seq__10621_10633 = G__10650;
chunk__10622_10634 = G__10651;
count__10623_10635 = G__10652;
i__10624_10636 = G__10653;
continue;
}
}
} else
{}
}
break;
}
var seq__10625_10654 = cljs.core.seq.call(null,self__.watching);var chunk__10626_10655 = null;var count__10627_10656 = (0);var i__10628_10657 = (0);while(true){
if((i__10628_10657 < count__10627_10656))
{var w_10658 = cljs.core._nth.call(null,chunk__10626_10655,i__10628_10657);if(cljs.core.contains_QMARK_.call(null,derefed,w_10658))
{} else
{cljs.core.remove_watch.call(null,w_10658,this$__$1);
}
{
var G__10659 = seq__10625_10654;
var G__10660 = chunk__10626_10655;
var G__10661 = count__10627_10656;
var G__10662 = (i__10628_10657 + (1));
seq__10625_10654 = G__10659;
chunk__10626_10655 = G__10660;
count__10627_10656 = G__10661;
i__10628_10657 = G__10662;
continue;
}
} else
{var temp__4126__auto___10663 = cljs.core.seq.call(null,seq__10625_10654);if(temp__4126__auto___10663)
{var seq__10625_10664__$1 = temp__4126__auto___10663;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10625_10664__$1))
{var c__4406__auto___10665 = cljs.core.chunk_first.call(null,seq__10625_10664__$1);{
var G__10666 = cljs.core.chunk_rest.call(null,seq__10625_10664__$1);
var G__10667 = c__4406__auto___10665;
var G__10668 = cljs.core.count.call(null,c__4406__auto___10665);
var G__10669 = (0);
seq__10625_10654 = G__10666;
chunk__10626_10655 = G__10667;
count__10627_10656 = G__10668;
i__10628_10657 = G__10669;
continue;
}
} else
{var w_10670 = cljs.core.first.call(null,seq__10625_10664__$1);if(cljs.core.contains_QMARK_.call(null,derefed,w_10670))
{} else
{cljs.core.remove_watch.call(null,w_10670,this$__$1);
}
{
var G__10671 = cljs.core.next.call(null,seq__10625_10664__$1);
var G__10672 = null;
var G__10673 = (0);
var G__10674 = (0);
seq__10625_10654 = G__10671;
chunk__10626_10655 = G__10672;
count__10627_10656 = G__10673;
i__10628_10657 = G__10674;
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
var this$__$1 = this;var seq__10629_10675 = cljs.core.seq.call(null,self__.watching);var chunk__10630_10676 = null;var count__10631_10677 = (0);var i__10632_10678 = (0);while(true){
if((i__10632_10678 < count__10631_10677))
{var w_10679 = cljs.core._nth.call(null,chunk__10630_10676,i__10632_10678);cljs.core.remove_watch.call(null,w_10679,this$__$1);
{
var G__10680 = seq__10629_10675;
var G__10681 = chunk__10630_10676;
var G__10682 = count__10631_10677;
var G__10683 = (i__10632_10678 + (1));
seq__10629_10675 = G__10680;
chunk__10630_10676 = G__10681;
count__10631_10677 = G__10682;
i__10632_10678 = G__10683;
continue;
}
} else
{var temp__4126__auto___10684 = cljs.core.seq.call(null,seq__10629_10675);if(temp__4126__auto___10684)
{var seq__10629_10685__$1 = temp__4126__auto___10684;if(cljs.core.chunked_seq_QMARK_.call(null,seq__10629_10685__$1))
{var c__4406__auto___10686 = cljs.core.chunk_first.call(null,seq__10629_10685__$1);{
var G__10687 = cljs.core.chunk_rest.call(null,seq__10629_10685__$1);
var G__10688 = c__4406__auto___10686;
var G__10689 = cljs.core.count.call(null,c__4406__auto___10686);
var G__10690 = (0);
seq__10629_10675 = G__10687;
chunk__10630_10676 = G__10688;
count__10631_10677 = G__10689;
i__10632_10678 = G__10690;
continue;
}
} else
{var w_10691 = cljs.core.first.call(null,seq__10629_10685__$1);cljs.core.remove_watch.call(null,w_10691,this$__$1);
{
var G__10692 = cljs.core.next.call(null,seq__10629_10685__$1);
var G__10693 = null;
var G__10694 = (0);
var G__10695 = (0);
seq__10629_10675 = G__10692;
chunk__10630_10676 = G__10693;
count__10631_10677 = G__10694;
i__10632_10678 = G__10695;
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
var this$__$1 = this;if(cljs.core.not.call(null,(function (){var or__3637__auto__ = self__.auto_run;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{return reagent.ratom._STAR_ratom_context_STAR_;
}
})()))
{var x__6416__auto___10696 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.auto_run,reagent.ratom._STAR_ratom_context_STAR_], null);if(!((console.log == null)))
{console.log((''+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("dbg reagent.ratom:"+177+": [auto-run *ratom-context*]: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,x__6416__auto___10696))))));
} else
{}
} else
{}
if(cljs.core.truth_((function (){var or__3637__auto__ = self__.auto_run;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
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
var make_reaction__delegate = function (f,p__10697){var map__10699 = p__10697;var map__10699__$1 = ((cljs.core.seq_QMARK_.call(null,map__10699))?cljs.core.apply.call(null,cljs.core.hash_map,map__10699):map__10699);var derefed = cljs.core.get.call(null,map__10699__$1,new cljs.core.Keyword(null,"derefed","derefed",590684583));var on_dispose = cljs.core.get.call(null,map__10699__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360));var on_set = cljs.core.get.call(null,map__10699__$1,new cljs.core.Keyword(null,"on-set","on-set",-140953470));var auto_run = cljs.core.get.call(null,map__10699__$1,new cljs.core.Keyword(null,"auto-run","auto-run",1958400437));var runner = ((cljs.core._EQ_.call(null,auto_run,true))?reagent.ratom.run:auto_run);var active = !((derefed == null));var dirty = !(active);var reaction = (new reagent.ratom.Reaction(f,null,dirty,active,null,cljs.core.PersistentArrayMap.EMPTY,runner,on_set,on_dispose));if((derefed == null))
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
var p__10697 = null;if (arguments.length > 1) {
  p__10697 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return make_reaction__delegate.call(this,f,p__10697);};
make_reaction.cljs$lang$maxFixedArity = 1;
make_reaction.cljs$lang$applyTo = (function (arglist__10700){
var f = cljs.core.first(arglist__10700);
var p__10697 = cljs.core.rest(arglist__10700);
return make_reaction__delegate(f,p__10697);
});
make_reaction.cljs$core$IFn$_invoke$arity$variadic = make_reaction__delegate;
return make_reaction;
})()
;

//# sourceMappingURL=ratom.js.map