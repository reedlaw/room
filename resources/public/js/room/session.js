// Compiled by ClojureScript 0.0-2356
goog.provide('room.session');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('reagent.core');
goog.require('reagent.core');
room.session.state = reagent.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
/**
* @param {...*} var_args
*/
room.session.get = (function() { 
var get__delegate = function (k,p__5036){var vec__5038 = p__5036;var default$ = cljs.core.nth.call(null,vec__5038,(0),null);return cljs.core.get.call(null,cljs.core.deref.call(null,room.session.state),k,default$);
};
var get = function (k,var_args){
var p__5036 = null;if (arguments.length > 1) {
  p__5036 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return get__delegate.call(this,k,p__5036);};
get.cljs$lang$maxFixedArity = 1;
get.cljs$lang$applyTo = (function (arglist__5039){
var k = cljs.core.first(arglist__5039);
var p__5036 = cljs.core.rest(arglist__5039);
return get__delegate(k,p__5036);
});
get.cljs$core$IFn$_invoke$arity$variadic = get__delegate;
return get;
})()
;
room.session.put_BANG_ = (function put_BANG_(k,v){return cljs.core.swap_BANG_.call(null,room.session.state,cljs.core.assoc,k,v);
});
/**
* @param {...*} var_args
*/
room.session.update_in_BANG_ = (function() { 
var update_in_BANG___delegate = function (ks,f,args){return cljs.core.swap_BANG_.call(null,room.session.state,(function (p1__5040_SHARP_){return cljs.core.apply.call(null,cljs.core.partial.call(null,cljs.core.update_in,p1__5040_SHARP_,ks,f),args);
}));
};
var update_in_BANG_ = function (ks,f,var_args){
var args = null;if (arguments.length > 2) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);} 
return update_in_BANG___delegate.call(this,ks,f,args);};
update_in_BANG_.cljs$lang$maxFixedArity = 2;
update_in_BANG_.cljs$lang$applyTo = (function (arglist__5041){
var ks = cljs.core.first(arglist__5041);
arglist__5041 = cljs.core.next(arglist__5041);
var f = cljs.core.first(arglist__5041);
var args = cljs.core.rest(arglist__5041);
return update_in_BANG___delegate(ks,f,args);
});
update_in_BANG_.cljs$core$IFn$_invoke$arity$variadic = update_in_BANG___delegate;
return update_in_BANG_;
})()
;
