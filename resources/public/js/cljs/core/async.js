// Compiled by ClojureScript 0.0-2356
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t12889 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12889 = (function (f,fn_handler,meta12890){
this.f = f;
this.fn_handler = fn_handler;
this.meta12890 = meta12890;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12889.cljs$lang$type = true;
cljs.core.async.t12889.cljs$lang$ctorStr = "cljs.core.async/t12889";
cljs.core.async.t12889.cljs$lang$ctorPrWriter = (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t12889");
});
cljs.core.async.t12889.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t12889.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t12889.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t12889.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12891){var self__ = this;
var _12891__$1 = this;return self__.meta12890;
});
cljs.core.async.t12889.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12891,meta12890__$1){var self__ = this;
var _12891__$1 = this;return (new cljs.core.async.t12889(self__.f,self__.fn_handler,meta12890__$1));
});
cljs.core.async.__GT_t12889 = (function __GT_t12889(f__$1,fn_handler__$1,meta12890){return (new cljs.core.async.t12889(f__$1,fn_handler__$1,meta12890));
});
}
return (new cljs.core.async.t12889(f,fn_handler,null));
});
/**
* Returns a fixed buffer of size n. When full, puts will block/park.
*/
cljs.core.async.buffer = (function buffer(n){return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete but
* val will be dropped (no transfer).
*/
cljs.core.async.dropping_buffer = (function dropping_buffer(n){return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
* Returns a buffer of size n. When full, puts will complete, and be
* buffered, but oldest elements in buffer will be dropped (not
* transferred).
*/
cljs.core.async.sliding_buffer = (function sliding_buffer(n){return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
* Returns true if a channel created with buff will never block. That is to say,
* puts into this buffer will never cause the buffer to be full.
*/
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__12893 = buff;if(G__12893)
{var bit__4127__auto__ = null;if(cljs.core.truth_((function (){var or__3464__auto__ = bit__4127__auto__;if(cljs.core.truth_(or__3464__auto__))
{return or__3464__auto__;
} else
{return G__12893.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__12893.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__12893);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__12893);
}
});
/**
* Creates a channel with an optional buffer, an optional transducer (like (map f),
* (filter p) etc or a composition thereof), and an optional exception handler.
* If buf-or-n is a number, will create and use a fixed buffer of that size. If a
* transducer is supplied a buffer must be specified. ex-handler must be a
* fn of one argument - if an exception occurs during transformation it will be called
* with the thrown value as an argument, and any non-nil return value will be placed
* in the channel.
*/
cljs.core.async.chan = (function() {
var chan = null;
var chan__0 = (function (){return chan.call(null,null);
});
var chan__1 = (function (buf_or_n){return chan.call(null,buf_or_n,null,null);
});
var chan__2 = (function (buf_or_n,xform){return chan.call(null,buf_or_n,xform,null);
});
var chan__3 = (function (buf_or_n,xform,ex_handler){var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);if(cljs.core.truth_(xform))
{if(cljs.core.truth_(buf_or_n__$1))
{} else
{throw (new Error(("Assert failed: buffer must be supplied when transducer is\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null))))));
}
} else
{}
return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});
chan = function(buf_or_n,xform,ex_handler){
switch(arguments.length){
case 0:
return chan__0.call(this);
case 1:
return chan__1.call(this,buf_or_n);
case 2:
return chan__2.call(this,buf_or_n,xform);
case 3:
return chan__3.call(this,buf_or_n,xform,ex_handler);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
chan.cljs$core$IFn$_invoke$arity$0 = chan__0;
chan.cljs$core$IFn$_invoke$arity$1 = chan__1;
chan.cljs$core$IFn$_invoke$arity$2 = chan__2;
chan.cljs$core$IFn$_invoke$arity$3 = chan__3;
return chan;
})()
;
/**
* Returns a channel that will close after msecs
*/
cljs.core.async.timeout = (function timeout(msecs){return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
* takes a val from port. Must be called inside a (go ...) block. Will
* return nil if closed. Will park if nothing is available.
* Returns true unless port is already closed
*/
cljs.core.async._LT__BANG_ = (function _LT__BANG_(port){throw (new Error("<! used not in (go ...) block"));
});
/**
* Asynchronously takes a val from port, passing to fn1. Will pass nil
* if closed. If on-caller? (default true) is true, and value is
* immediately available, will call fn1 on calling thread.
* Returns nil.
*/
cljs.core.async.take_BANG_ = (function() {
var take_BANG_ = null;
var take_BANG___2 = (function (port,fn1){return take_BANG_.call(null,port,fn1,true);
});
var take_BANG___3 = (function (port,fn1,on_caller_QMARK_){var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(ret))
{var val_12894 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_12894);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_12894,ret){
return (function (){return fn1.call(null,val_12894);
});})(val_12894,ret))
);
}
} else
{}
return null;
});
take_BANG_ = function(port,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return take_BANG___2.call(this,port,fn1);
case 3:
return take_BANG___3.call(this,port,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take_BANG_.cljs$core$IFn$_invoke$arity$2 = take_BANG___2;
take_BANG_.cljs$core$IFn$_invoke$arity$3 = take_BANG___3;
return take_BANG_;
})()
;
cljs.core.async.nop = (function nop(_){return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
* puts a val into port. nil values are not allowed. Must be called
* inside a (go ...) block. Will park if no buffer space is available.
* Returns true unless port is already closed.
*/
cljs.core.async._GT__BANG_ = (function _GT__BANG_(port,val){throw (new Error(">! used not in (go ...) block"));
});
/**
* Asynchronously puts a val into port, calling fn0 (if supplied) when
* complete. nil values are not allowed. Will throw if closed. If
* on-caller? (default true) is true, and the put is immediately
* accepted, will call fn0 on calling thread.  Returns nil.
*/
cljs.core.async.put_BANG_ = (function() {
var put_BANG_ = null;
var put_BANG___2 = (function (port,val){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);if(cljs.core.truth_(temp__4124__auto__))
{var ret = temp__4124__auto__;return cljs.core.deref.call(null,ret);
} else
{return true;
}
});
var put_BANG___3 = (function (port,val,fn1){return put_BANG_.call(null,port,val,fn1,true);
});
var put_BANG___4 = (function (port,val,fn1,on_caller_QMARK_){var temp__4124__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));if(cljs.core.truth_(temp__4124__auto__))
{var retb = temp__4124__auto__;var ret = cljs.core.deref.call(null,retb);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,ret);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4124__auto__){
return (function (){return fn1.call(null,ret);
});})(ret,retb,temp__4124__auto__))
);
}
return ret;
} else
{return true;
}
});
put_BANG_ = function(port,val,fn1,on_caller_QMARK_){
switch(arguments.length){
case 2:
return put_BANG___2.call(this,port,val);
case 3:
return put_BANG___3.call(this,port,val,fn1);
case 4:
return put_BANG___4.call(this,port,val,fn1,on_caller_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
put_BANG_.cljs$core$IFn$_invoke$arity$2 = put_BANG___2;
put_BANG_.cljs$core$IFn$_invoke$arity$3 = put_BANG___3;
put_BANG_.cljs$core$IFn$_invoke$arity$4 = put_BANG___4;
return put_BANG_;
})()
;
cljs.core.async.close_BANG_ = (function close_BANG_(port){return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4333__auto___12895 = n;var x_12896 = (0);while(true){
if((x_12896 < n__4333__auto___12895))
{(a[x_12896] = (0));
{
var G__12897 = (x_12896 + (1));
x_12896 = G__12897;
continue;
}
} else
{}
break;
}
var i = (1);while(true){
if(cljs.core._EQ_.call(null,i,n))
{return a;
} else
{var j = cljs.core.rand_int.call(null,i);(a[i] = (a[j]));
(a[j] = i);
{
var G__12898 = (i + (1));
i = G__12898;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t12902 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12902 = (function (flag,alt_flag,meta12903){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta12903 = meta12903;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12902.cljs$lang$type = true;
cljs.core.async.t12902.cljs$lang$ctorStr = "cljs.core.async/t12902";
cljs.core.async.t12902.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t12902");
});})(flag))
;
cljs.core.async.t12902.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t12902.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t12902.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t12902.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_12904){var self__ = this;
var _12904__$1 = this;return self__.meta12903;
});})(flag))
;
cljs.core.async.t12902.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_12904,meta12903__$1){var self__ = this;
var _12904__$1 = this;return (new cljs.core.async.t12902(self__.flag,self__.alt_flag,meta12903__$1));
});})(flag))
;
cljs.core.async.__GT_t12902 = ((function (flag){
return (function __GT_t12902(flag__$1,alt_flag__$1,meta12903){return (new cljs.core.async.t12902(flag__$1,alt_flag__$1,meta12903));
});})(flag))
;
}
return (new cljs.core.async.t12902(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t12908 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12908 = (function (cb,flag,alt_handler,meta12909){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta12909 = meta12909;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12908.cljs$lang$type = true;
cljs.core.async.t12908.cljs$lang$ctorStr = "cljs.core.async/t12908";
cljs.core.async.t12908.cljs$lang$ctorPrWriter = (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t12908");
});
cljs.core.async.t12908.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t12908.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t12908.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t12908.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12910){var self__ = this;
var _12910__$1 = this;return self__.meta12909;
});
cljs.core.async.t12908.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12910,meta12909__$1){var self__ = this;
var _12910__$1 = this;return (new cljs.core.async.t12908(self__.cb,self__.flag,self__.alt_handler,meta12909__$1));
});
cljs.core.async.__GT_t12908 = (function __GT_t12908(cb__$1,flag__$1,alt_handler__$1,meta12909){return (new cljs.core.async.t12908(cb__$1,flag__$1,alt_handler__$1,meta12909));
});
}
return (new cljs.core.async.t12908(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__12911_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__12911_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__12912_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__12912_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3464__auto__ = wport;if(cljs.core.truth_(or__3464__auto__))
{return or__3464__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__12913 = (i + (1));
i = G__12913;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3464__auto__ = ret;if(cljs.core.truth_(or__3464__auto__))
{return or__3464__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__3452__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3452__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3452__auto__;
}
})();if(cljs.core.truth_(temp__4126__auto__))
{var got = temp__4126__auto__;return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else
{return null;
}
} else
{return null;
}
}
});
/**
* Completes at most one of several channel operations. Must be called
* inside a (go ...) block. ports is a vector of channel endpoints,
* which can be either a channel to take from or a vector of
* [channel-to-put-to val-to-put], in any combination. Takes will be
* made as if by <!, and puts will be made as if by >!. Unless
* the :priority option is true, if more than one port operation is
* ready a non-deterministic choice will be made. If no operation is
* ready and a :default value is supplied, [default-val :default] will
* be returned, otherwise alts! will park until the first operation to
* become ready completes. Returns [val port] of the completed
* operation, where val is the value taken for takes, and a
* boolean (true unless already closed, as per put!) for puts.
* 
* opts are passed as :key val ... Supported options:
* 
* :default val - the value to use if none of the operations are immediately ready
* :priority true - (default nil) when true, the operations will be tried in order.
* 
* Note: there is no guarantee that the port exps or val exprs will be
* used, nor in what order should they be, so they should not be
* depended upon for side effects.
* @param {...*} var_args
*/
cljs.core.async.alts_BANG_ = (function() { 
var alts_BANG___delegate = function (ports,p__12914){var map__12916 = p__12914;var map__12916__$1 = ((cljs.core.seq_QMARK_.call(null,map__12916))?cljs.core.apply.call(null,cljs.core.hash_map,map__12916):map__12916);var opts = map__12916__$1;throw (new Error("alts! used not in (go ...) block"));
};
var alts_BANG_ = function (ports,var_args){
var p__12914 = null;if (arguments.length > 1) {
  p__12914 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__12914);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__12917){
var ports = cljs.core.first(arglist__12917);
var p__12914 = cljs.core.rest(arglist__12917);
return alts_BANG___delegate(ports,p__12914);
});
alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = alts_BANG___delegate;
return alts_BANG_;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel. By default, the to channel will be closed when the from
* channel closes, but can be determined by the close?  parameter. Will
* stop consuming the from channel if the to channel closes
*/
cljs.core.async.pipe = (function() {
var pipe = null;
var pipe__2 = (function (from,to){return pipe.call(null,from,to,true);
});
var pipe__3 = (function (from,to,close_QMARK_){var c__6391__auto___13012 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___13012){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___13012){
return (function (state_12988){var state_val_12989 = (state_12988[(1)]);if((state_val_12989 === (7)))
{var inst_12984 = (state_12988[(2)]);var state_12988__$1 = state_12988;var statearr_12990_13013 = state_12988__$1;(statearr_12990_13013[(2)] = inst_12984);
(statearr_12990_13013[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (1)))
{var state_12988__$1 = state_12988;var statearr_12991_13014 = state_12988__$1;(statearr_12991_13014[(2)] = null);
(statearr_12991_13014[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (4)))
{var inst_12967 = (state_12988[(7)]);var inst_12967__$1 = (state_12988[(2)]);var inst_12968 = (inst_12967__$1 == null);var state_12988__$1 = (function (){var statearr_12992 = state_12988;(statearr_12992[(7)] = inst_12967__$1);
return statearr_12992;
})();if(cljs.core.truth_(inst_12968))
{var statearr_12993_13015 = state_12988__$1;(statearr_12993_13015[(1)] = (5));
} else
{var statearr_12994_13016 = state_12988__$1;(statearr_12994_13016[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (13)))
{var state_12988__$1 = state_12988;var statearr_12995_13017 = state_12988__$1;(statearr_12995_13017[(2)] = null);
(statearr_12995_13017[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (6)))
{var inst_12967 = (state_12988[(7)]);var state_12988__$1 = state_12988;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12988__$1,(11),to,inst_12967);
} else
{if((state_val_12989 === (3)))
{var inst_12986 = (state_12988[(2)]);var state_12988__$1 = state_12988;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12988__$1,inst_12986);
} else
{if((state_val_12989 === (12)))
{var state_12988__$1 = state_12988;var statearr_12996_13018 = state_12988__$1;(statearr_12996_13018[(2)] = null);
(statearr_12996_13018[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (2)))
{var state_12988__$1 = state_12988;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12988__$1,(4),from);
} else
{if((state_val_12989 === (11)))
{var inst_12977 = (state_12988[(2)]);var state_12988__$1 = state_12988;if(cljs.core.truth_(inst_12977))
{var statearr_12997_13019 = state_12988__$1;(statearr_12997_13019[(1)] = (12));
} else
{var statearr_12998_13020 = state_12988__$1;(statearr_12998_13020[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (9)))
{var state_12988__$1 = state_12988;var statearr_12999_13021 = state_12988__$1;(statearr_12999_13021[(2)] = null);
(statearr_12999_13021[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (5)))
{var state_12988__$1 = state_12988;if(cljs.core.truth_(close_QMARK_))
{var statearr_13000_13022 = state_12988__$1;(statearr_13000_13022[(1)] = (8));
} else
{var statearr_13001_13023 = state_12988__$1;(statearr_13001_13023[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (14)))
{var inst_12982 = (state_12988[(2)]);var state_12988__$1 = state_12988;var statearr_13002_13024 = state_12988__$1;(statearr_13002_13024[(2)] = inst_12982);
(statearr_13002_13024[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (10)))
{var inst_12974 = (state_12988[(2)]);var state_12988__$1 = state_12988;var statearr_13003_13025 = state_12988__$1;(statearr_13003_13025[(2)] = inst_12974);
(statearr_13003_13025[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12989 === (8)))
{var inst_12971 = cljs.core.async.close_BANG_.call(null,to);var state_12988__$1 = state_12988;var statearr_13004_13026 = state_12988__$1;(statearr_13004_13026[(2)] = inst_12971);
(statearr_13004_13026[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___13012))
;return ((function (switch__6326__auto__,c__6391__auto___13012){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13008 = [null,null,null,null,null,null,null,null];(statearr_13008[(0)] = state_machine__6327__auto__);
(statearr_13008[(1)] = (1));
return statearr_13008;
});
var state_machine__6327__auto____1 = (function (state_12988){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_12988);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13009){if((e13009 instanceof Object))
{var ex__6330__auto__ = e13009;var statearr_13010_13027 = state_12988;(statearr_13010_13027[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12988);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13009;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13028 = state_12988;
state_12988 = G__13028;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_12988){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_12988);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___13012))
})();var state__6393__auto__ = (function (){var statearr_13011 = f__6392__auto__.call(null);(statearr_13011[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13012);
return statearr_13011;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___13012))
);
return to;
});
pipe = function(from,to,close_QMARK_){
switch(arguments.length){
case 2:
return pipe__2.call(this,from,to);
case 3:
return pipe__3.call(this,from,to,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipe.cljs$core$IFn$_invoke$arity$2 = pipe__2;
pipe.cljs$core$IFn$_invoke$arity$3 = pipe__3;
return pipe;
})()
;
cljs.core.async.pipeline_STAR_ = (function pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){if((n > (0)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null)))))));
}
var jobs = cljs.core.async.chan.call(null,n);var results = cljs.core.async.chan.call(null,n);var process = ((function (jobs,results){
return (function (p__13212){var vec__13213 = p__13212;var v = cljs.core.nth.call(null,vec__13213,(0),null);var p = cljs.core.nth.call(null,vec__13213,(1),null);var job = vec__13213;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);var c__6391__auto___13395 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results){
return (function (state_13218){var state_val_13219 = (state_13218[(1)]);if((state_val_13219 === (2)))
{var inst_13215 = (state_13218[(2)]);var inst_13216 = cljs.core.async.close_BANG_.call(null,res);var state_13218__$1 = (function (){var statearr_13220 = state_13218;(statearr_13220[(7)] = inst_13215);
return statearr_13220;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13218__$1,inst_13216);
} else
{if((state_val_13219 === (1)))
{var state_13218__$1 = state_13218;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13218__$1,(2),res,v);
} else
{return null;
}
}
});})(c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results))
;return ((function (switch__6326__auto__,c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13224 = [null,null,null,null,null,null,null,null];(statearr_13224[(0)] = state_machine__6327__auto__);
(statearr_13224[(1)] = (1));
return statearr_13224;
});
var state_machine__6327__auto____1 = (function (state_13218){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13218);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13225){if((e13225 instanceof Object))
{var ex__6330__auto__ = e13225;var statearr_13226_13396 = state_13218;(statearr_13226_13396[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13218);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13225;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13397 = state_13218;
state_13218 = G__13397;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13218){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13218);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results))
})();var state__6393__auto__ = (function (){var statearr_13227 = f__6392__auto__.call(null);(statearr_13227[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13395);
return statearr_13227;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___13395,res,vec__13213,v,p,job,jobs,results))
);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results))
;var async = ((function (jobs,results,process){
return (function (p__13228){var vec__13229 = p__13228;var v = cljs.core.nth.call(null,vec__13229,(0),null);var p = cljs.core.nth.call(null,vec__13229,(1),null);var job = vec__13229;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1));xf.call(null,v,res);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results,process))
;var n__4333__auto___13398 = n;var __13399 = (0);while(true){
if((__13399 < n__4333__auto___13398))
{var G__13230_13400 = (((type instanceof cljs.core.Keyword))?type.fqn:null);switch (G__13230_13400) {
case "async":
var c__6391__auto___13402 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__13399,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (__13399,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function (state_13243){var state_val_13244 = (state_13243[(1)]);if((state_val_13244 === (7)))
{var inst_13239 = (state_13243[(2)]);var state_13243__$1 = state_13243;var statearr_13245_13403 = state_13243__$1;(statearr_13245_13403[(2)] = inst_13239);
(statearr_13245_13403[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13244 === (6)))
{var state_13243__$1 = state_13243;var statearr_13246_13404 = state_13243__$1;(statearr_13246_13404[(2)] = null);
(statearr_13246_13404[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13244 === (5)))
{var state_13243__$1 = state_13243;var statearr_13247_13405 = state_13243__$1;(statearr_13247_13405[(2)] = null);
(statearr_13247_13405[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13244 === (4)))
{var inst_13233 = (state_13243[(2)]);var inst_13234 = async.call(null,inst_13233);var state_13243__$1 = state_13243;if(cljs.core.truth_(inst_13234))
{var statearr_13248_13406 = state_13243__$1;(statearr_13248_13406[(1)] = (5));
} else
{var statearr_13249_13407 = state_13243__$1;(statearr_13249_13407[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13244 === (3)))
{var inst_13241 = (state_13243[(2)]);var state_13243__$1 = state_13243;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13243__$1,inst_13241);
} else
{if((state_val_13244 === (2)))
{var state_13243__$1 = state_13243;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13243__$1,(4),jobs);
} else
{if((state_val_13244 === (1)))
{var state_13243__$1 = state_13243;var statearr_13250_13408 = state_13243__$1;(statearr_13250_13408[(2)] = null);
(statearr_13250_13408[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(__13399,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
;return ((function (__13399,switch__6326__auto__,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13254 = [null,null,null,null,null,null,null];(statearr_13254[(0)] = state_machine__6327__auto__);
(statearr_13254[(1)] = (1));
return statearr_13254;
});
var state_machine__6327__auto____1 = (function (state_13243){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13243);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13255){if((e13255 instanceof Object))
{var ex__6330__auto__ = e13255;var statearr_13256_13409 = state_13243;(statearr_13256_13409[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13243);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13255;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13410 = state_13243;
state_13243 = G__13410;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13243){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13243);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(__13399,switch__6326__auto__,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
})();var state__6393__auto__ = (function (){var statearr_13257 = f__6392__auto__.call(null);(statearr_13257[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13402);
return statearr_13257;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(__13399,c__6391__auto___13402,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
);

break;
case "compute":
var c__6391__auto___13411 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__13399,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (__13399,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function (state_13270){var state_val_13271 = (state_13270[(1)]);if((state_val_13271 === (7)))
{var inst_13266 = (state_13270[(2)]);var state_13270__$1 = state_13270;var statearr_13272_13412 = state_13270__$1;(statearr_13272_13412[(2)] = inst_13266);
(statearr_13272_13412[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13271 === (6)))
{var state_13270__$1 = state_13270;var statearr_13273_13413 = state_13270__$1;(statearr_13273_13413[(2)] = null);
(statearr_13273_13413[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13271 === (5)))
{var state_13270__$1 = state_13270;var statearr_13274_13414 = state_13270__$1;(statearr_13274_13414[(2)] = null);
(statearr_13274_13414[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13271 === (4)))
{var inst_13260 = (state_13270[(2)]);var inst_13261 = process.call(null,inst_13260);var state_13270__$1 = state_13270;if(cljs.core.truth_(inst_13261))
{var statearr_13275_13415 = state_13270__$1;(statearr_13275_13415[(1)] = (5));
} else
{var statearr_13276_13416 = state_13270__$1;(statearr_13276_13416[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13271 === (3)))
{var inst_13268 = (state_13270[(2)]);var state_13270__$1 = state_13270;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13270__$1,inst_13268);
} else
{if((state_val_13271 === (2)))
{var state_13270__$1 = state_13270;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13270__$1,(4),jobs);
} else
{if((state_val_13271 === (1)))
{var state_13270__$1 = state_13270;var statearr_13277_13417 = state_13270__$1;(statearr_13277_13417[(2)] = null);
(statearr_13277_13417[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(__13399,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
;return ((function (__13399,switch__6326__auto__,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13281 = [null,null,null,null,null,null,null];(statearr_13281[(0)] = state_machine__6327__auto__);
(statearr_13281[(1)] = (1));
return statearr_13281;
});
var state_machine__6327__auto____1 = (function (state_13270){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13270);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13282){if((e13282 instanceof Object))
{var ex__6330__auto__ = e13282;var statearr_13283_13418 = state_13270;(statearr_13283_13418[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13270);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13282;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13419 = state_13270;
state_13270 = G__13419;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13270){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13270);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(__13399,switch__6326__auto__,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
})();var state__6393__auto__ = (function (){var statearr_13284 = f__6392__auto__.call(null);(statearr_13284[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13411);
return statearr_13284;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(__13399,c__6391__auto___13411,G__13230_13400,n__4333__auto___13398,jobs,results,process,async))
);

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type))));

}
{
var G__13420 = (__13399 + (1));
__13399 = G__13420;
continue;
}
} else
{}
break;
}
var c__6391__auto___13421 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___13421,jobs,results,process,async){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___13421,jobs,results,process,async){
return (function (state_13306){var state_val_13307 = (state_13306[(1)]);if((state_val_13307 === (9)))
{var inst_13299 = (state_13306[(2)]);var state_13306__$1 = (function (){var statearr_13308 = state_13306;(statearr_13308[(7)] = inst_13299);
return statearr_13308;
})();var statearr_13309_13422 = state_13306__$1;(statearr_13309_13422[(2)] = null);
(statearr_13309_13422[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13307 === (8)))
{var inst_13292 = (state_13306[(8)]);var inst_13297 = (state_13306[(2)]);var state_13306__$1 = (function (){var statearr_13310 = state_13306;(statearr_13310[(9)] = inst_13297);
return statearr_13310;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13306__$1,(9),results,inst_13292);
} else
{if((state_val_13307 === (7)))
{var inst_13302 = (state_13306[(2)]);var state_13306__$1 = state_13306;var statearr_13311_13423 = state_13306__$1;(statearr_13311_13423[(2)] = inst_13302);
(statearr_13311_13423[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13307 === (6)))
{var inst_13287 = (state_13306[(10)]);var inst_13292 = (state_13306[(8)]);var inst_13292__$1 = cljs.core.async.chan.call(null,(1));var inst_13293 = cljs.core.PersistentVector.EMPTY_NODE;var inst_13294 = [inst_13287,inst_13292__$1];var inst_13295 = (new cljs.core.PersistentVector(null,2,(5),inst_13293,inst_13294,null));var state_13306__$1 = (function (){var statearr_13312 = state_13306;(statearr_13312[(8)] = inst_13292__$1);
return statearr_13312;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13306__$1,(8),jobs,inst_13295);
} else
{if((state_val_13307 === (5)))
{var inst_13290 = cljs.core.async.close_BANG_.call(null,jobs);var state_13306__$1 = state_13306;var statearr_13313_13424 = state_13306__$1;(statearr_13313_13424[(2)] = inst_13290);
(statearr_13313_13424[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13307 === (4)))
{var inst_13287 = (state_13306[(10)]);var inst_13287__$1 = (state_13306[(2)]);var inst_13288 = (inst_13287__$1 == null);var state_13306__$1 = (function (){var statearr_13314 = state_13306;(statearr_13314[(10)] = inst_13287__$1);
return statearr_13314;
})();if(cljs.core.truth_(inst_13288))
{var statearr_13315_13425 = state_13306__$1;(statearr_13315_13425[(1)] = (5));
} else
{var statearr_13316_13426 = state_13306__$1;(statearr_13316_13426[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13307 === (3)))
{var inst_13304 = (state_13306[(2)]);var state_13306__$1 = state_13306;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13306__$1,inst_13304);
} else
{if((state_val_13307 === (2)))
{var state_13306__$1 = state_13306;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13306__$1,(4),from);
} else
{if((state_val_13307 === (1)))
{var state_13306__$1 = state_13306;var statearr_13317_13427 = state_13306__$1;(statearr_13317_13427[(2)] = null);
(statearr_13317_13427[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___13421,jobs,results,process,async))
;return ((function (switch__6326__auto__,c__6391__auto___13421,jobs,results,process,async){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13321 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13321[(0)] = state_machine__6327__auto__);
(statearr_13321[(1)] = (1));
return statearr_13321;
});
var state_machine__6327__auto____1 = (function (state_13306){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13306);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13322){if((e13322 instanceof Object))
{var ex__6330__auto__ = e13322;var statearr_13323_13428 = state_13306;(statearr_13323_13428[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13306);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13322;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13429 = state_13306;
state_13306 = G__13429;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13306){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13306);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___13421,jobs,results,process,async))
})();var state__6393__auto__ = (function (){var statearr_13324 = f__6392__auto__.call(null);(statearr_13324[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13421);
return statearr_13324;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___13421,jobs,results,process,async))
);
var c__6391__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto__,jobs,results,process,async){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto__,jobs,results,process,async){
return (function (state_13362){var state_val_13363 = (state_13362[(1)]);if((state_val_13363 === (7)))
{var inst_13358 = (state_13362[(2)]);var state_13362__$1 = state_13362;var statearr_13364_13430 = state_13362__$1;(statearr_13364_13430[(2)] = inst_13358);
(statearr_13364_13430[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (20)))
{var state_13362__$1 = state_13362;var statearr_13365_13431 = state_13362__$1;(statearr_13365_13431[(2)] = null);
(statearr_13365_13431[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (1)))
{var state_13362__$1 = state_13362;var statearr_13366_13432 = state_13362__$1;(statearr_13366_13432[(2)] = null);
(statearr_13366_13432[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (4)))
{var inst_13327 = (state_13362[(7)]);var inst_13327__$1 = (state_13362[(2)]);var inst_13328 = (inst_13327__$1 == null);var state_13362__$1 = (function (){var statearr_13367 = state_13362;(statearr_13367[(7)] = inst_13327__$1);
return statearr_13367;
})();if(cljs.core.truth_(inst_13328))
{var statearr_13368_13433 = state_13362__$1;(statearr_13368_13433[(1)] = (5));
} else
{var statearr_13369_13434 = state_13362__$1;(statearr_13369_13434[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (15)))
{var inst_13340 = (state_13362[(8)]);var state_13362__$1 = state_13362;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13362__$1,(18),to,inst_13340);
} else
{if((state_val_13363 === (21)))
{var inst_13353 = (state_13362[(2)]);var state_13362__$1 = state_13362;var statearr_13370_13435 = state_13362__$1;(statearr_13370_13435[(2)] = inst_13353);
(statearr_13370_13435[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (13)))
{var inst_13355 = (state_13362[(2)]);var state_13362__$1 = (function (){var statearr_13371 = state_13362;(statearr_13371[(9)] = inst_13355);
return statearr_13371;
})();var statearr_13372_13436 = state_13362__$1;(statearr_13372_13436[(2)] = null);
(statearr_13372_13436[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (6)))
{var inst_13327 = (state_13362[(7)]);var state_13362__$1 = state_13362;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13362__$1,(11),inst_13327);
} else
{if((state_val_13363 === (17)))
{var inst_13348 = (state_13362[(2)]);var state_13362__$1 = state_13362;if(cljs.core.truth_(inst_13348))
{var statearr_13373_13437 = state_13362__$1;(statearr_13373_13437[(1)] = (19));
} else
{var statearr_13374_13438 = state_13362__$1;(statearr_13374_13438[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (3)))
{var inst_13360 = (state_13362[(2)]);var state_13362__$1 = state_13362;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13362__$1,inst_13360);
} else
{if((state_val_13363 === (12)))
{var inst_13337 = (state_13362[(10)]);var state_13362__$1 = state_13362;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13362__$1,(14),inst_13337);
} else
{if((state_val_13363 === (2)))
{var state_13362__$1 = state_13362;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13362__$1,(4),results);
} else
{if((state_val_13363 === (19)))
{var state_13362__$1 = state_13362;var statearr_13375_13439 = state_13362__$1;(statearr_13375_13439[(2)] = null);
(statearr_13375_13439[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (11)))
{var inst_13337 = (state_13362[(2)]);var state_13362__$1 = (function (){var statearr_13376 = state_13362;(statearr_13376[(10)] = inst_13337);
return statearr_13376;
})();var statearr_13377_13440 = state_13362__$1;(statearr_13377_13440[(2)] = null);
(statearr_13377_13440[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (9)))
{var state_13362__$1 = state_13362;var statearr_13378_13441 = state_13362__$1;(statearr_13378_13441[(2)] = null);
(statearr_13378_13441[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (5)))
{var state_13362__$1 = state_13362;if(cljs.core.truth_(close_QMARK_))
{var statearr_13379_13442 = state_13362__$1;(statearr_13379_13442[(1)] = (8));
} else
{var statearr_13380_13443 = state_13362__$1;(statearr_13380_13443[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (14)))
{var inst_13340 = (state_13362[(8)]);var inst_13342 = (state_13362[(11)]);var inst_13340__$1 = (state_13362[(2)]);var inst_13341 = (inst_13340__$1 == null);var inst_13342__$1 = cljs.core.not.call(null,inst_13341);var state_13362__$1 = (function (){var statearr_13381 = state_13362;(statearr_13381[(8)] = inst_13340__$1);
(statearr_13381[(11)] = inst_13342__$1);
return statearr_13381;
})();if(inst_13342__$1)
{var statearr_13382_13444 = state_13362__$1;(statearr_13382_13444[(1)] = (15));
} else
{var statearr_13383_13445 = state_13362__$1;(statearr_13383_13445[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (16)))
{var inst_13342 = (state_13362[(11)]);var state_13362__$1 = state_13362;var statearr_13384_13446 = state_13362__$1;(statearr_13384_13446[(2)] = inst_13342);
(statearr_13384_13446[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (10)))
{var inst_13334 = (state_13362[(2)]);var state_13362__$1 = state_13362;var statearr_13385_13447 = state_13362__$1;(statearr_13385_13447[(2)] = inst_13334);
(statearr_13385_13447[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (18)))
{var inst_13345 = (state_13362[(2)]);var state_13362__$1 = state_13362;var statearr_13386_13448 = state_13362__$1;(statearr_13386_13448[(2)] = inst_13345);
(statearr_13386_13448[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13363 === (8)))
{var inst_13331 = cljs.core.async.close_BANG_.call(null,to);var state_13362__$1 = state_13362;var statearr_13387_13449 = state_13362__$1;(statearr_13387_13449[(2)] = inst_13331);
(statearr_13387_13449[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto__,jobs,results,process,async))
;return ((function (switch__6326__auto__,c__6391__auto__,jobs,results,process,async){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13391 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13391[(0)] = state_machine__6327__auto__);
(statearr_13391[(1)] = (1));
return statearr_13391;
});
var state_machine__6327__auto____1 = (function (state_13362){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13362);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13392){if((e13392 instanceof Object))
{var ex__6330__auto__ = e13392;var statearr_13393_13450 = state_13362;(statearr_13393_13450[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13362);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13392;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13451 = state_13362;
state_13362 = G__13451;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13362){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13362);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto__,jobs,results,process,async))
})();var state__6393__auto__ = (function (){var statearr_13394 = f__6392__auto__.call(null);(statearr_13394[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto__);
return statearr_13394;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto__,jobs,results,process,async))
);
return c__6391__auto__;
});
/**
* Takes elements from the from channel and supplies them to the to
* channel, subject to the async function af, with parallelism n. af
* must be a function of two arguments, the first an input value and
* the second a channel on which to place the result(s). af must close!
* the channel before returning.  The presumption is that af will
* return immediately, having launched some asynchronous operation
* whose completion/callback will manipulate the result channel. Outputs
* will be returned in order relative to  the inputs. By default, the to
* channel will be closed when the from channel closes, but can be
* determined by the close?  parameter. Will stop consuming the from
* channel if the to channel closes.
*/
cljs.core.async.pipeline_async = (function() {
var pipeline_async = null;
var pipeline_async__4 = (function (n,to,af,from){return pipeline_async.call(null,n,to,af,from,true);
});
var pipeline_async__5 = (function (n,to,af,from,close_QMARK_){return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});
pipeline_async = function(n,to,af,from,close_QMARK_){
switch(arguments.length){
case 4:
return pipeline_async__4.call(this,n,to,af,from);
case 5:
return pipeline_async__5.call(this,n,to,af,from,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipeline_async.cljs$core$IFn$_invoke$arity$4 = pipeline_async__4;
pipeline_async.cljs$core$IFn$_invoke$arity$5 = pipeline_async__5;
return pipeline_async;
})()
;
/**
* Takes elements from the from channel and supplies them to the to
* channel, subject to the transducer xf, with parallelism n. Because
* it is parallel, the transducer will be applied independently to each
* element, not across elements, and may produce zero or more outputs
* per input.  Outputs will be returned in order relative to the
* inputs. By default, the to channel will be closed when the from
* channel closes, but can be determined by the close?  parameter. Will
* stop consuming the from channel if the to channel closes.
* 
* Note this is supplied for API compatibility with the Clojure version.
* Values of N > 1 will not result in actual concurrency in a
* single-threaded runtime.
*/
cljs.core.async.pipeline = (function() {
var pipeline = null;
var pipeline__4 = (function (n,to,xf,from){return pipeline.call(null,n,to,xf,from,true);
});
var pipeline__5 = (function (n,to,xf,from,close_QMARK_){return pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});
var pipeline__6 = (function (n,to,xf,from,close_QMARK_,ex_handler){return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});
pipeline = function(n,to,xf,from,close_QMARK_,ex_handler){
switch(arguments.length){
case 4:
return pipeline__4.call(this,n,to,xf,from);
case 5:
return pipeline__5.call(this,n,to,xf,from,close_QMARK_);
case 6:
return pipeline__6.call(this,n,to,xf,from,close_QMARK_,ex_handler);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pipeline.cljs$core$IFn$_invoke$arity$4 = pipeline__4;
pipeline.cljs$core$IFn$_invoke$arity$5 = pipeline__5;
pipeline.cljs$core$IFn$_invoke$arity$6 = pipeline__6;
return pipeline;
})()
;
/**
* Takes a predicate and a source channel and returns a vector of two
* channels, the first of which will contain the values for which the
* predicate returned true, the second those for which it returned
* false.
* 
* The out channels will be unbuffered by default, or two buf-or-ns can
* be supplied. The channels will close after the source channel has
* closed.
*/
cljs.core.async.split = (function() {
var split = null;
var split__2 = (function (p,ch){return split.call(null,p,ch,null,null);
});
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__6391__auto___13552 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___13552,tc,fc){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___13552,tc,fc){
return (function (state_13527){var state_val_13528 = (state_13527[(1)]);if((state_val_13528 === (7)))
{var inst_13523 = (state_13527[(2)]);var state_13527__$1 = state_13527;var statearr_13529_13553 = state_13527__$1;(statearr_13529_13553[(2)] = inst_13523);
(statearr_13529_13553[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (1)))
{var state_13527__$1 = state_13527;var statearr_13530_13554 = state_13527__$1;(statearr_13530_13554[(2)] = null);
(statearr_13530_13554[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (4)))
{var inst_13504 = (state_13527[(7)]);var inst_13504__$1 = (state_13527[(2)]);var inst_13505 = (inst_13504__$1 == null);var state_13527__$1 = (function (){var statearr_13531 = state_13527;(statearr_13531[(7)] = inst_13504__$1);
return statearr_13531;
})();if(cljs.core.truth_(inst_13505))
{var statearr_13532_13555 = state_13527__$1;(statearr_13532_13555[(1)] = (5));
} else
{var statearr_13533_13556 = state_13527__$1;(statearr_13533_13556[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (13)))
{var state_13527__$1 = state_13527;var statearr_13534_13557 = state_13527__$1;(statearr_13534_13557[(2)] = null);
(statearr_13534_13557[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (6)))
{var inst_13504 = (state_13527[(7)]);var inst_13510 = p.call(null,inst_13504);var state_13527__$1 = state_13527;if(cljs.core.truth_(inst_13510))
{var statearr_13535_13558 = state_13527__$1;(statearr_13535_13558[(1)] = (9));
} else
{var statearr_13536_13559 = state_13527__$1;(statearr_13536_13559[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (3)))
{var inst_13525 = (state_13527[(2)]);var state_13527__$1 = state_13527;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13527__$1,inst_13525);
} else
{if((state_val_13528 === (12)))
{var state_13527__$1 = state_13527;var statearr_13537_13560 = state_13527__$1;(statearr_13537_13560[(2)] = null);
(statearr_13537_13560[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (2)))
{var state_13527__$1 = state_13527;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13527__$1,(4),ch);
} else
{if((state_val_13528 === (11)))
{var inst_13504 = (state_13527[(7)]);var inst_13514 = (state_13527[(2)]);var state_13527__$1 = state_13527;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13527__$1,(8),inst_13514,inst_13504);
} else
{if((state_val_13528 === (9)))
{var state_13527__$1 = state_13527;var statearr_13538_13561 = state_13527__$1;(statearr_13538_13561[(2)] = tc);
(statearr_13538_13561[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (5)))
{var inst_13507 = cljs.core.async.close_BANG_.call(null,tc);var inst_13508 = cljs.core.async.close_BANG_.call(null,fc);var state_13527__$1 = (function (){var statearr_13539 = state_13527;(statearr_13539[(8)] = inst_13507);
return statearr_13539;
})();var statearr_13540_13562 = state_13527__$1;(statearr_13540_13562[(2)] = inst_13508);
(statearr_13540_13562[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (14)))
{var inst_13521 = (state_13527[(2)]);var state_13527__$1 = state_13527;var statearr_13541_13563 = state_13527__$1;(statearr_13541_13563[(2)] = inst_13521);
(statearr_13541_13563[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (10)))
{var state_13527__$1 = state_13527;var statearr_13542_13564 = state_13527__$1;(statearr_13542_13564[(2)] = fc);
(statearr_13542_13564[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13528 === (8)))
{var inst_13516 = (state_13527[(2)]);var state_13527__$1 = state_13527;if(cljs.core.truth_(inst_13516))
{var statearr_13543_13565 = state_13527__$1;(statearr_13543_13565[(1)] = (12));
} else
{var statearr_13544_13566 = state_13527__$1;(statearr_13544_13566[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___13552,tc,fc))
;return ((function (switch__6326__auto__,c__6391__auto___13552,tc,fc){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13548 = [null,null,null,null,null,null,null,null,null];(statearr_13548[(0)] = state_machine__6327__auto__);
(statearr_13548[(1)] = (1));
return statearr_13548;
});
var state_machine__6327__auto____1 = (function (state_13527){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13527);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13549){if((e13549 instanceof Object))
{var ex__6330__auto__ = e13549;var statearr_13550_13567 = state_13527;(statearr_13550_13567[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13527);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13549;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13568 = state_13527;
state_13527 = G__13568;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13527){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13527);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___13552,tc,fc))
})();var state__6393__auto__ = (function (){var statearr_13551 = f__6392__auto__.call(null);(statearr_13551[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___13552);
return statearr_13551;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___13552,tc,fc))
);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});
split = function(p,ch,t_buf_or_n,f_buf_or_n){
switch(arguments.length){
case 2:
return split__2.call(this,p,ch);
case 4:
return split__4.call(this,p,ch,t_buf_or_n,f_buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
split.cljs$core$IFn$_invoke$arity$2 = split__2;
split.cljs$core$IFn$_invoke$arity$4 = split__4;
return split;
})()
;
/**
* f should be a function of 2 arguments. Returns a channel containing
* the single result of applying f to init and the first item from the
* channel, then applying f to that result and the 2nd item, etc. If
* the channel closes without yielding items, returns init and f is not
* called. ch must close before reduce produces a result.
*/
cljs.core.async.reduce = (function reduce(f,init,ch){var c__6391__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto__){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto__){
return (function (state_13615){var state_val_13616 = (state_13615[(1)]);if((state_val_13616 === (7)))
{var inst_13611 = (state_13615[(2)]);var state_13615__$1 = state_13615;var statearr_13617_13633 = state_13615__$1;(statearr_13617_13633[(2)] = inst_13611);
(statearr_13617_13633[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13616 === (6)))
{var inst_13604 = (state_13615[(7)]);var inst_13601 = (state_13615[(8)]);var inst_13608 = f.call(null,inst_13601,inst_13604);var inst_13601__$1 = inst_13608;var state_13615__$1 = (function (){var statearr_13618 = state_13615;(statearr_13618[(8)] = inst_13601__$1);
return statearr_13618;
})();var statearr_13619_13634 = state_13615__$1;(statearr_13619_13634[(2)] = null);
(statearr_13619_13634[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13616 === (5)))
{var inst_13601 = (state_13615[(8)]);var state_13615__$1 = state_13615;var statearr_13620_13635 = state_13615__$1;(statearr_13620_13635[(2)] = inst_13601);
(statearr_13620_13635[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13616 === (4)))
{var inst_13604 = (state_13615[(7)]);var inst_13604__$1 = (state_13615[(2)]);var inst_13605 = (inst_13604__$1 == null);var state_13615__$1 = (function (){var statearr_13621 = state_13615;(statearr_13621[(7)] = inst_13604__$1);
return statearr_13621;
})();if(cljs.core.truth_(inst_13605))
{var statearr_13622_13636 = state_13615__$1;(statearr_13622_13636[(1)] = (5));
} else
{var statearr_13623_13637 = state_13615__$1;(statearr_13623_13637[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13616 === (3)))
{var inst_13613 = (state_13615[(2)]);var state_13615__$1 = state_13615;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13615__$1,inst_13613);
} else
{if((state_val_13616 === (2)))
{var state_13615__$1 = state_13615;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13615__$1,(4),ch);
} else
{if((state_val_13616 === (1)))
{var inst_13601 = init;var state_13615__$1 = (function (){var statearr_13624 = state_13615;(statearr_13624[(8)] = inst_13601);
return statearr_13624;
})();var statearr_13625_13638 = state_13615__$1;(statearr_13625_13638[(2)] = null);
(statearr_13625_13638[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
});})(c__6391__auto__))
;return ((function (switch__6326__auto__,c__6391__auto__){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13629 = [null,null,null,null,null,null,null,null,null];(statearr_13629[(0)] = state_machine__6327__auto__);
(statearr_13629[(1)] = (1));
return statearr_13629;
});
var state_machine__6327__auto____1 = (function (state_13615){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13615);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13630){if((e13630 instanceof Object))
{var ex__6330__auto__ = e13630;var statearr_13631_13639 = state_13615;(statearr_13631_13639[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13615);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13630;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13640 = state_13615;
state_13615 = G__13640;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13615){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13615);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto__))
})();var state__6393__auto__ = (function (){var statearr_13632 = f__6392__auto__.call(null);(statearr_13632[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto__);
return statearr_13632;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto__))
);
return c__6391__auto__;
});
/**
* Puts the contents of coll into the supplied channel.
* 
* By default the channel will be closed after the items are copied,
* but can be determined by the close? parameter.
* 
* Returns a channel which will close after the items are copied.
*/
cljs.core.async.onto_chan = (function() {
var onto_chan = null;
var onto_chan__2 = (function (ch,coll){return onto_chan.call(null,ch,coll,true);
});
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__6391__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto__){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto__){
return (function (state_13714){var state_val_13715 = (state_13714[(1)]);if((state_val_13715 === (7)))
{var inst_13696 = (state_13714[(2)]);var state_13714__$1 = state_13714;var statearr_13716_13739 = state_13714__$1;(statearr_13716_13739[(2)] = inst_13696);
(statearr_13716_13739[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (1)))
{var inst_13690 = cljs.core.seq.call(null,coll);var inst_13691 = inst_13690;var state_13714__$1 = (function (){var statearr_13717 = state_13714;(statearr_13717[(7)] = inst_13691);
return statearr_13717;
})();var statearr_13718_13740 = state_13714__$1;(statearr_13718_13740[(2)] = null);
(statearr_13718_13740[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (4)))
{var inst_13691 = (state_13714[(7)]);var inst_13694 = cljs.core.first.call(null,inst_13691);var state_13714__$1 = state_13714;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13714__$1,(7),ch,inst_13694);
} else
{if((state_val_13715 === (13)))
{var inst_13708 = (state_13714[(2)]);var state_13714__$1 = state_13714;var statearr_13719_13741 = state_13714__$1;(statearr_13719_13741[(2)] = inst_13708);
(statearr_13719_13741[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (6)))
{var inst_13699 = (state_13714[(2)]);var state_13714__$1 = state_13714;if(cljs.core.truth_(inst_13699))
{var statearr_13720_13742 = state_13714__$1;(statearr_13720_13742[(1)] = (8));
} else
{var statearr_13721_13743 = state_13714__$1;(statearr_13721_13743[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (3)))
{var inst_13712 = (state_13714[(2)]);var state_13714__$1 = state_13714;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13714__$1,inst_13712);
} else
{if((state_val_13715 === (12)))
{var state_13714__$1 = state_13714;var statearr_13722_13744 = state_13714__$1;(statearr_13722_13744[(2)] = null);
(statearr_13722_13744[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (2)))
{var inst_13691 = (state_13714[(7)]);var state_13714__$1 = state_13714;if(cljs.core.truth_(inst_13691))
{var statearr_13723_13745 = state_13714__$1;(statearr_13723_13745[(1)] = (4));
} else
{var statearr_13724_13746 = state_13714__$1;(statearr_13724_13746[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (11)))
{var inst_13705 = cljs.core.async.close_BANG_.call(null,ch);var state_13714__$1 = state_13714;var statearr_13725_13747 = state_13714__$1;(statearr_13725_13747[(2)] = inst_13705);
(statearr_13725_13747[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (9)))
{var state_13714__$1 = state_13714;if(cljs.core.truth_(close_QMARK_))
{var statearr_13726_13748 = state_13714__$1;(statearr_13726_13748[(1)] = (11));
} else
{var statearr_13727_13749 = state_13714__$1;(statearr_13727_13749[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (5)))
{var inst_13691 = (state_13714[(7)]);var state_13714__$1 = state_13714;var statearr_13728_13750 = state_13714__$1;(statearr_13728_13750[(2)] = inst_13691);
(statearr_13728_13750[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (10)))
{var inst_13710 = (state_13714[(2)]);var state_13714__$1 = state_13714;var statearr_13729_13751 = state_13714__$1;(statearr_13729_13751[(2)] = inst_13710);
(statearr_13729_13751[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13715 === (8)))
{var inst_13691 = (state_13714[(7)]);var inst_13701 = cljs.core.next.call(null,inst_13691);var inst_13691__$1 = inst_13701;var state_13714__$1 = (function (){var statearr_13730 = state_13714;(statearr_13730[(7)] = inst_13691__$1);
return statearr_13730;
})();var statearr_13731_13752 = state_13714__$1;(statearr_13731_13752[(2)] = null);
(statearr_13731_13752[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto__))
;return ((function (switch__6326__auto__,c__6391__auto__){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_13735 = [null,null,null,null,null,null,null,null];(statearr_13735[(0)] = state_machine__6327__auto__);
(statearr_13735[(1)] = (1));
return statearr_13735;
});
var state_machine__6327__auto____1 = (function (state_13714){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_13714);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e13736){if((e13736 instanceof Object))
{var ex__6330__auto__ = e13736;var statearr_13737_13753 = state_13714;(statearr_13737_13753[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13714);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13736;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13754 = state_13714;
state_13714 = G__13754;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_13714){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_13714);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto__))
})();var state__6393__auto__ = (function (){var statearr_13738 = f__6392__auto__.call(null);(statearr_13738[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto__);
return statearr_13738;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto__))
);
return c__6391__auto__;
});
onto_chan = function(ch,coll,close_QMARK_){
switch(arguments.length){
case 2:
return onto_chan__2.call(this,ch,coll);
case 3:
return onto_chan__3.call(this,ch,coll,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
onto_chan.cljs$core$IFn$_invoke$arity$2 = onto_chan__2;
onto_chan.cljs$core$IFn$_invoke$arity$3 = onto_chan__3;
return onto_chan;
})()
;
/**
* Creates and returns a channel which contains the contents of coll,
* closing when exhausted.
*/
cljs.core.async.to_chan = (function to_chan(coll){var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));cljs.core.async.onto_chan.call(null,ch,coll);
return ch;
});
cljs.core.async.Mux = (function (){var obj13756 = {};return obj13756;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3452__auto__ = _;if(and__3452__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3452__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4100__auto__ = (((_ == null))?null:_);return (function (){var or__3464__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj13758 = {};return obj13758;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
})().call(null,m);
}
});
/**
* Creates and returns a mult(iple) of the supplied channel. Channels
* containing copies of the channel can be created with 'tap', and
* detached with 'untap'.
* 
* Each item is distributed to all taps in parallel and synchronously,
* i.e. each tap must accept before the next item is distributed. Use
* buffering/windowing to prevent slow taps from holding up the mult.
* 
* Items received when there are no taps get dropped.
* 
* If a tap puts to a closed channel, it will be removed from the mult.
*/
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t13980 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13980 = (function (cs,ch,mult,meta13981){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta13981 = meta13981;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13980.cljs$lang$type = true;
cljs.core.async.t13980.cljs$lang$ctorStr = "cljs.core.async/t13980";
cljs.core.async.t13980.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t13980");
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t13980.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13980.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_13982){var self__ = this;
var _13982__$1 = this;return self__.meta13981;
});})(cs))
;
cljs.core.async.t13980.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_13982,meta13981__$1){var self__ = this;
var _13982__$1 = this;return (new cljs.core.async.t13980(self__.cs,self__.ch,self__.mult,meta13981__$1));
});})(cs))
;
cljs.core.async.__GT_t13980 = ((function (cs){
return (function __GT_t13980(cs__$1,ch__$1,mult__$1,meta13981){return (new cljs.core.async.t13980(cs__$1,ch__$1,mult__$1,meta13981));
});})(cs))
;
}
return (new cljs.core.async.t13980(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__6391__auto___14201 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___14201,cs,m,dchan,dctr,done){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___14201,cs,m,dchan,dctr,done){
return (function (state_14113){var state_val_14114 = (state_14113[(1)]);if((state_val_14114 === (7)))
{var inst_14109 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14115_14202 = state_14113__$1;(statearr_14115_14202[(2)] = inst_14109);
(statearr_14115_14202[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (20)))
{var inst_14014 = (state_14113[(7)]);var inst_14024 = cljs.core.first.call(null,inst_14014);var inst_14025 = cljs.core.nth.call(null,inst_14024,(0),null);var inst_14026 = cljs.core.nth.call(null,inst_14024,(1),null);var state_14113__$1 = (function (){var statearr_14116 = state_14113;(statearr_14116[(8)] = inst_14025);
return statearr_14116;
})();if(cljs.core.truth_(inst_14026))
{var statearr_14117_14203 = state_14113__$1;(statearr_14117_14203[(1)] = (22));
} else
{var statearr_14118_14204 = state_14113__$1;(statearr_14118_14204[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (27)))
{var inst_14056 = (state_14113[(9)]);var inst_14054 = (state_14113[(10)]);var inst_14061 = (state_14113[(11)]);var inst_13985 = (state_14113[(12)]);var inst_14061__$1 = cljs.core._nth.call(null,inst_14054,inst_14056);var inst_14062 = cljs.core.async.put_BANG_.call(null,inst_14061__$1,inst_13985,done);var state_14113__$1 = (function (){var statearr_14119 = state_14113;(statearr_14119[(11)] = inst_14061__$1);
return statearr_14119;
})();if(cljs.core.truth_(inst_14062))
{var statearr_14120_14205 = state_14113__$1;(statearr_14120_14205[(1)] = (30));
} else
{var statearr_14121_14206 = state_14113__$1;(statearr_14121_14206[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (1)))
{var state_14113__$1 = state_14113;var statearr_14122_14207 = state_14113__$1;(statearr_14122_14207[(2)] = null);
(statearr_14122_14207[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (24)))
{var inst_14014 = (state_14113[(7)]);var inst_14031 = (state_14113[(2)]);var inst_14032 = cljs.core.next.call(null,inst_14014);var inst_13994 = inst_14032;var inst_13995 = null;var inst_13996 = (0);var inst_13997 = (0);var state_14113__$1 = (function (){var statearr_14123 = state_14113;(statearr_14123[(13)] = inst_13994);
(statearr_14123[(14)] = inst_13995);
(statearr_14123[(15)] = inst_14031);
(statearr_14123[(16)] = inst_13997);
(statearr_14123[(17)] = inst_13996);
return statearr_14123;
})();var statearr_14124_14208 = state_14113__$1;(statearr_14124_14208[(2)] = null);
(statearr_14124_14208[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (39)))
{var state_14113__$1 = state_14113;var statearr_14128_14209 = state_14113__$1;(statearr_14128_14209[(2)] = null);
(statearr_14128_14209[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (4)))
{var inst_13985 = (state_14113[(12)]);var inst_13985__$1 = (state_14113[(2)]);var inst_13986 = (inst_13985__$1 == null);var state_14113__$1 = (function (){var statearr_14129 = state_14113;(statearr_14129[(12)] = inst_13985__$1);
return statearr_14129;
})();if(cljs.core.truth_(inst_13986))
{var statearr_14130_14210 = state_14113__$1;(statearr_14130_14210[(1)] = (5));
} else
{var statearr_14131_14211 = state_14113__$1;(statearr_14131_14211[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (15)))
{var inst_13994 = (state_14113[(13)]);var inst_13995 = (state_14113[(14)]);var inst_13997 = (state_14113[(16)]);var inst_13996 = (state_14113[(17)]);var inst_14010 = (state_14113[(2)]);var inst_14011 = (inst_13997 + (1));var tmp14125 = inst_13994;var tmp14126 = inst_13995;var tmp14127 = inst_13996;var inst_13994__$1 = tmp14125;var inst_13995__$1 = tmp14126;var inst_13996__$1 = tmp14127;var inst_13997__$1 = inst_14011;var state_14113__$1 = (function (){var statearr_14132 = state_14113;(statearr_14132[(13)] = inst_13994__$1);
(statearr_14132[(14)] = inst_13995__$1);
(statearr_14132[(18)] = inst_14010);
(statearr_14132[(16)] = inst_13997__$1);
(statearr_14132[(17)] = inst_13996__$1);
return statearr_14132;
})();var statearr_14133_14212 = state_14113__$1;(statearr_14133_14212[(2)] = null);
(statearr_14133_14212[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (21)))
{var inst_14035 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14137_14213 = state_14113__$1;(statearr_14137_14213[(2)] = inst_14035);
(statearr_14137_14213[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (31)))
{var inst_14061 = (state_14113[(11)]);var inst_14065 = done.call(null,null);var inst_14066 = cljs.core.async.untap_STAR_.call(null,m,inst_14061);var state_14113__$1 = (function (){var statearr_14138 = state_14113;(statearr_14138[(19)] = inst_14065);
return statearr_14138;
})();var statearr_14139_14214 = state_14113__$1;(statearr_14139_14214[(2)] = inst_14066);
(statearr_14139_14214[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (32)))
{var inst_14056 = (state_14113[(9)]);var inst_14054 = (state_14113[(10)]);var inst_14055 = (state_14113[(20)]);var inst_14053 = (state_14113[(21)]);var inst_14068 = (state_14113[(2)]);var inst_14069 = (inst_14056 + (1));var tmp14134 = inst_14054;var tmp14135 = inst_14055;var tmp14136 = inst_14053;var inst_14053__$1 = tmp14136;var inst_14054__$1 = tmp14134;var inst_14055__$1 = tmp14135;var inst_14056__$1 = inst_14069;var state_14113__$1 = (function (){var statearr_14140 = state_14113;(statearr_14140[(9)] = inst_14056__$1);
(statearr_14140[(10)] = inst_14054__$1);
(statearr_14140[(22)] = inst_14068);
(statearr_14140[(20)] = inst_14055__$1);
(statearr_14140[(21)] = inst_14053__$1);
return statearr_14140;
})();var statearr_14141_14215 = state_14113__$1;(statearr_14141_14215[(2)] = null);
(statearr_14141_14215[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (40)))
{var inst_14081 = (state_14113[(23)]);var inst_14085 = done.call(null,null);var inst_14086 = cljs.core.async.untap_STAR_.call(null,m,inst_14081);var state_14113__$1 = (function (){var statearr_14142 = state_14113;(statearr_14142[(24)] = inst_14085);
return statearr_14142;
})();var statearr_14143_14216 = state_14113__$1;(statearr_14143_14216[(2)] = inst_14086);
(statearr_14143_14216[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (33)))
{var inst_14072 = (state_14113[(25)]);var inst_14074 = cljs.core.chunked_seq_QMARK_.call(null,inst_14072);var state_14113__$1 = state_14113;if(inst_14074)
{var statearr_14144_14217 = state_14113__$1;(statearr_14144_14217[(1)] = (36));
} else
{var statearr_14145_14218 = state_14113__$1;(statearr_14145_14218[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (13)))
{var inst_14004 = (state_14113[(26)]);var inst_14007 = cljs.core.async.close_BANG_.call(null,inst_14004);var state_14113__$1 = state_14113;var statearr_14146_14219 = state_14113__$1;(statearr_14146_14219[(2)] = inst_14007);
(statearr_14146_14219[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (22)))
{var inst_14025 = (state_14113[(8)]);var inst_14028 = cljs.core.async.close_BANG_.call(null,inst_14025);var state_14113__$1 = state_14113;var statearr_14147_14220 = state_14113__$1;(statearr_14147_14220[(2)] = inst_14028);
(statearr_14147_14220[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (36)))
{var inst_14072 = (state_14113[(25)]);var inst_14076 = cljs.core.chunk_first.call(null,inst_14072);var inst_14077 = cljs.core.chunk_rest.call(null,inst_14072);var inst_14078 = cljs.core.count.call(null,inst_14076);var inst_14053 = inst_14077;var inst_14054 = inst_14076;var inst_14055 = inst_14078;var inst_14056 = (0);var state_14113__$1 = (function (){var statearr_14148 = state_14113;(statearr_14148[(9)] = inst_14056);
(statearr_14148[(10)] = inst_14054);
(statearr_14148[(20)] = inst_14055);
(statearr_14148[(21)] = inst_14053);
return statearr_14148;
})();var statearr_14149_14221 = state_14113__$1;(statearr_14149_14221[(2)] = null);
(statearr_14149_14221[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (41)))
{var inst_14072 = (state_14113[(25)]);var inst_14088 = (state_14113[(2)]);var inst_14089 = cljs.core.next.call(null,inst_14072);var inst_14053 = inst_14089;var inst_14054 = null;var inst_14055 = (0);var inst_14056 = (0);var state_14113__$1 = (function (){var statearr_14150 = state_14113;(statearr_14150[(9)] = inst_14056);
(statearr_14150[(27)] = inst_14088);
(statearr_14150[(10)] = inst_14054);
(statearr_14150[(20)] = inst_14055);
(statearr_14150[(21)] = inst_14053);
return statearr_14150;
})();var statearr_14151_14222 = state_14113__$1;(statearr_14151_14222[(2)] = null);
(statearr_14151_14222[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (43)))
{var state_14113__$1 = state_14113;var statearr_14152_14223 = state_14113__$1;(statearr_14152_14223[(2)] = null);
(statearr_14152_14223[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (29)))
{var inst_14097 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14153_14224 = state_14113__$1;(statearr_14153_14224[(2)] = inst_14097);
(statearr_14153_14224[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (44)))
{var inst_14106 = (state_14113[(2)]);var state_14113__$1 = (function (){var statearr_14154 = state_14113;(statearr_14154[(28)] = inst_14106);
return statearr_14154;
})();var statearr_14155_14225 = state_14113__$1;(statearr_14155_14225[(2)] = null);
(statearr_14155_14225[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (6)))
{var inst_14045 = (state_14113[(29)]);var inst_14044 = cljs.core.deref.call(null,cs);var inst_14045__$1 = cljs.core.keys.call(null,inst_14044);var inst_14046 = cljs.core.count.call(null,inst_14045__$1);var inst_14047 = cljs.core.reset_BANG_.call(null,dctr,inst_14046);var inst_14052 = cljs.core.seq.call(null,inst_14045__$1);var inst_14053 = inst_14052;var inst_14054 = null;var inst_14055 = (0);var inst_14056 = (0);var state_14113__$1 = (function (){var statearr_14156 = state_14113;(statearr_14156[(29)] = inst_14045__$1);
(statearr_14156[(9)] = inst_14056);
(statearr_14156[(10)] = inst_14054);
(statearr_14156[(30)] = inst_14047);
(statearr_14156[(20)] = inst_14055);
(statearr_14156[(21)] = inst_14053);
return statearr_14156;
})();var statearr_14157_14226 = state_14113__$1;(statearr_14157_14226[(2)] = null);
(statearr_14157_14226[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (28)))
{var inst_14072 = (state_14113[(25)]);var inst_14053 = (state_14113[(21)]);var inst_14072__$1 = cljs.core.seq.call(null,inst_14053);var state_14113__$1 = (function (){var statearr_14158 = state_14113;(statearr_14158[(25)] = inst_14072__$1);
return statearr_14158;
})();if(inst_14072__$1)
{var statearr_14159_14227 = state_14113__$1;(statearr_14159_14227[(1)] = (33));
} else
{var statearr_14160_14228 = state_14113__$1;(statearr_14160_14228[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (25)))
{var inst_14056 = (state_14113[(9)]);var inst_14055 = (state_14113[(20)]);var inst_14058 = (inst_14056 < inst_14055);var inst_14059 = inst_14058;var state_14113__$1 = state_14113;if(cljs.core.truth_(inst_14059))
{var statearr_14161_14229 = state_14113__$1;(statearr_14161_14229[(1)] = (27));
} else
{var statearr_14162_14230 = state_14113__$1;(statearr_14162_14230[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (34)))
{var state_14113__$1 = state_14113;var statearr_14163_14231 = state_14113__$1;(statearr_14163_14231[(2)] = null);
(statearr_14163_14231[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (17)))
{var state_14113__$1 = state_14113;var statearr_14164_14232 = state_14113__$1;(statearr_14164_14232[(2)] = null);
(statearr_14164_14232[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (3)))
{var inst_14111 = (state_14113[(2)]);var state_14113__$1 = state_14113;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14113__$1,inst_14111);
} else
{if((state_val_14114 === (12)))
{var inst_14040 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14165_14233 = state_14113__$1;(statearr_14165_14233[(2)] = inst_14040);
(statearr_14165_14233[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (2)))
{var state_14113__$1 = state_14113;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14113__$1,(4),ch);
} else
{if((state_val_14114 === (23)))
{var state_14113__$1 = state_14113;var statearr_14166_14234 = state_14113__$1;(statearr_14166_14234[(2)] = null);
(statearr_14166_14234[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (35)))
{var inst_14095 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14167_14235 = state_14113__$1;(statearr_14167_14235[(2)] = inst_14095);
(statearr_14167_14235[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (19)))
{var inst_14014 = (state_14113[(7)]);var inst_14018 = cljs.core.chunk_first.call(null,inst_14014);var inst_14019 = cljs.core.chunk_rest.call(null,inst_14014);var inst_14020 = cljs.core.count.call(null,inst_14018);var inst_13994 = inst_14019;var inst_13995 = inst_14018;var inst_13996 = inst_14020;var inst_13997 = (0);var state_14113__$1 = (function (){var statearr_14168 = state_14113;(statearr_14168[(13)] = inst_13994);
(statearr_14168[(14)] = inst_13995);
(statearr_14168[(16)] = inst_13997);
(statearr_14168[(17)] = inst_13996);
return statearr_14168;
})();var statearr_14169_14236 = state_14113__$1;(statearr_14169_14236[(2)] = null);
(statearr_14169_14236[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (11)))
{var inst_13994 = (state_14113[(13)]);var inst_14014 = (state_14113[(7)]);var inst_14014__$1 = cljs.core.seq.call(null,inst_13994);var state_14113__$1 = (function (){var statearr_14170 = state_14113;(statearr_14170[(7)] = inst_14014__$1);
return statearr_14170;
})();if(inst_14014__$1)
{var statearr_14171_14237 = state_14113__$1;(statearr_14171_14237[(1)] = (16));
} else
{var statearr_14172_14238 = state_14113__$1;(statearr_14172_14238[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (9)))
{var inst_14042 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14173_14239 = state_14113__$1;(statearr_14173_14239[(2)] = inst_14042);
(statearr_14173_14239[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (5)))
{var inst_13992 = cljs.core.deref.call(null,cs);var inst_13993 = cljs.core.seq.call(null,inst_13992);var inst_13994 = inst_13993;var inst_13995 = null;var inst_13996 = (0);var inst_13997 = (0);var state_14113__$1 = (function (){var statearr_14174 = state_14113;(statearr_14174[(13)] = inst_13994);
(statearr_14174[(14)] = inst_13995);
(statearr_14174[(16)] = inst_13997);
(statearr_14174[(17)] = inst_13996);
return statearr_14174;
})();var statearr_14175_14240 = state_14113__$1;(statearr_14175_14240[(2)] = null);
(statearr_14175_14240[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (14)))
{var state_14113__$1 = state_14113;var statearr_14176_14241 = state_14113__$1;(statearr_14176_14241[(2)] = null);
(statearr_14176_14241[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (45)))
{var inst_14103 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14177_14242 = state_14113__$1;(statearr_14177_14242[(2)] = inst_14103);
(statearr_14177_14242[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (26)))
{var inst_14045 = (state_14113[(29)]);var inst_14099 = (state_14113[(2)]);var inst_14100 = cljs.core.seq.call(null,inst_14045);var state_14113__$1 = (function (){var statearr_14178 = state_14113;(statearr_14178[(31)] = inst_14099);
return statearr_14178;
})();if(inst_14100)
{var statearr_14179_14243 = state_14113__$1;(statearr_14179_14243[(1)] = (42));
} else
{var statearr_14180_14244 = state_14113__$1;(statearr_14180_14244[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (16)))
{var inst_14014 = (state_14113[(7)]);var inst_14016 = cljs.core.chunked_seq_QMARK_.call(null,inst_14014);var state_14113__$1 = state_14113;if(inst_14016)
{var statearr_14181_14245 = state_14113__$1;(statearr_14181_14245[(1)] = (19));
} else
{var statearr_14182_14246 = state_14113__$1;(statearr_14182_14246[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (38)))
{var inst_14092 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14183_14247 = state_14113__$1;(statearr_14183_14247[(2)] = inst_14092);
(statearr_14183_14247[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (30)))
{var state_14113__$1 = state_14113;var statearr_14184_14248 = state_14113__$1;(statearr_14184_14248[(2)] = null);
(statearr_14184_14248[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (10)))
{var inst_13995 = (state_14113[(14)]);var inst_13997 = (state_14113[(16)]);var inst_14003 = cljs.core._nth.call(null,inst_13995,inst_13997);var inst_14004 = cljs.core.nth.call(null,inst_14003,(0),null);var inst_14005 = cljs.core.nth.call(null,inst_14003,(1),null);var state_14113__$1 = (function (){var statearr_14185 = state_14113;(statearr_14185[(26)] = inst_14004);
return statearr_14185;
})();if(cljs.core.truth_(inst_14005))
{var statearr_14186_14249 = state_14113__$1;(statearr_14186_14249[(1)] = (13));
} else
{var statearr_14187_14250 = state_14113__$1;(statearr_14187_14250[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (18)))
{var inst_14038 = (state_14113[(2)]);var state_14113__$1 = state_14113;var statearr_14188_14251 = state_14113__$1;(statearr_14188_14251[(2)] = inst_14038);
(statearr_14188_14251[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (42)))
{var state_14113__$1 = state_14113;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14113__$1,(45),dchan);
} else
{if((state_val_14114 === (37)))
{var inst_14081 = (state_14113[(23)]);var inst_14072 = (state_14113[(25)]);var inst_13985 = (state_14113[(12)]);var inst_14081__$1 = cljs.core.first.call(null,inst_14072);var inst_14082 = cljs.core.async.put_BANG_.call(null,inst_14081__$1,inst_13985,done);var state_14113__$1 = (function (){var statearr_14189 = state_14113;(statearr_14189[(23)] = inst_14081__$1);
return statearr_14189;
})();if(cljs.core.truth_(inst_14082))
{var statearr_14190_14252 = state_14113__$1;(statearr_14190_14252[(1)] = (39));
} else
{var statearr_14191_14253 = state_14113__$1;(statearr_14191_14253[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14114 === (8)))
{var inst_13997 = (state_14113[(16)]);var inst_13996 = (state_14113[(17)]);var inst_13999 = (inst_13997 < inst_13996);var inst_14000 = inst_13999;var state_14113__$1 = state_14113;if(cljs.core.truth_(inst_14000))
{var statearr_14192_14254 = state_14113__$1;(statearr_14192_14254[(1)] = (10));
} else
{var statearr_14193_14255 = state_14113__$1;(statearr_14193_14255[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___14201,cs,m,dchan,dctr,done))
;return ((function (switch__6326__auto__,c__6391__auto___14201,cs,m,dchan,dctr,done){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_14197 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14197[(0)] = state_machine__6327__auto__);
(statearr_14197[(1)] = (1));
return statearr_14197;
});
var state_machine__6327__auto____1 = (function (state_14113){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_14113);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e14198){if((e14198 instanceof Object))
{var ex__6330__auto__ = e14198;var statearr_14199_14256 = state_14113;(statearr_14199_14256[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14113);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14198;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14257 = state_14113;
state_14113 = G__14257;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_14113){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_14113);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___14201,cs,m,dchan,dctr,done))
})();var state__6393__auto__ = (function (){var statearr_14200 = f__6392__auto__.call(null);(statearr_14200[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___14201);
return statearr_14200;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___14201,cs,m,dchan,dctr,done))
);
return m;
});
/**
* Copies the mult source onto the supplied channel.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.tap = (function() {
var tap = null;
var tap__2 = (function (mult,ch){return tap.call(null,mult,ch,true);
});
var tap__3 = (function (mult,ch,close_QMARK_){cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);
return ch;
});
tap = function(mult,ch,close_QMARK_){
switch(arguments.length){
case 2:
return tap__2.call(this,mult,ch);
case 3:
return tap__3.call(this,mult,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
tap.cljs$core$IFn$_invoke$arity$2 = tap__2;
tap.cljs$core$IFn$_invoke$arity$3 = tap__3;
return tap;
})()
;
/**
* Disconnects a target channel from a mult
*/
cljs.core.async.untap = (function untap(mult,ch){return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
* Disconnects all target channels from a mult
*/
cljs.core.async.untap_all = (function untap_all(mult){return cljs.core.async.untap_all_STAR_.call(null,mult);
});
cljs.core.async.Mix = (function (){var obj14259 = {};return obj14259;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3452__auto__ = m;if(and__3452__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4100__auto__ = (((m == null))?null:m);return (function (){var or__3464__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
})().call(null,m,mode);
}
});
/**
* Creates and returns a mix of one or more input channels which will
* be put on the supplied out channel. Input sources can be added to
* the mix with 'admix', and removed with 'unmix'. A mix supports
* soloing, muting and pausing multiple inputs atomically using
* 'toggle', and can solo using either muting or pausing as determined
* by 'solo-mode'.
* 
* Each channel can have zero or more boolean modes set via 'toggle':
* 
* :solo - when true, only this (ond other soloed) channel(s) will appear
* in the mix output channel. :mute and :pause states of soloed
* channels are ignored. If solo-mode is :mute, non-soloed
* channels are muted, if :pause, non-soloed channels are
* paused.
* 
* :mute - muted channels will have their contents consumed but not included in the mix
* :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
*/
cljs.core.async.mix = (function mix(out){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));var change = cljs.core.async.chan.call(null);var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){if(cljs.core.truth_(attr.call(null,v)))
{return cljs.core.conj.call(null,ret,c);
} else
{return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){var chs = cljs.core.deref.call(null,cs);var mode = cljs.core.deref.call(null,solo_mode);var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;var m = (function (){if(typeof cljs.core.async.t14379 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14379 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta14380){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta14380 = meta14380;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14379.cljs$lang$type = true;
cljs.core.async.t14379.cljs$lang$ctorStr = "cljs.core.async/t14379";
cljs.core.async.t14379.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t14379");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t14379.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_14381){var self__ = this;
var _14381__$1 = this;return self__.meta14380;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t14379.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_14381,meta14380__$1){var self__ = this;
var _14381__$1 = this;return (new cljs.core.async.t14379(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta14380__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t14379 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t14379(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta14380){return (new cljs.core.async.t14379(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta14380));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t14379(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__6391__auto___14498 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_14451){var state_val_14452 = (state_14451[(1)]);if((state_val_14452 === (7)))
{var inst_14395 = (state_14451[(7)]);var inst_14400 = cljs.core.apply.call(null,cljs.core.hash_map,inst_14395);var state_14451__$1 = state_14451;var statearr_14453_14499 = state_14451__$1;(statearr_14453_14499[(2)] = inst_14400);
(statearr_14453_14499[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (20)))
{var inst_14410 = (state_14451[(8)]);var state_14451__$1 = state_14451;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14451__$1,(23),out,inst_14410);
} else
{if((state_val_14452 === (1)))
{var inst_14385 = (state_14451[(9)]);var inst_14385__$1 = calc_state.call(null);var inst_14386 = cljs.core.seq_QMARK_.call(null,inst_14385__$1);var state_14451__$1 = (function (){var statearr_14454 = state_14451;(statearr_14454[(9)] = inst_14385__$1);
return statearr_14454;
})();if(inst_14386)
{var statearr_14455_14500 = state_14451__$1;(statearr_14455_14500[(1)] = (2));
} else
{var statearr_14456_14501 = state_14451__$1;(statearr_14456_14501[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (24)))
{var inst_14403 = (state_14451[(10)]);var inst_14395 = inst_14403;var state_14451__$1 = (function (){var statearr_14457 = state_14451;(statearr_14457[(7)] = inst_14395);
return statearr_14457;
})();var statearr_14458_14502 = state_14451__$1;(statearr_14458_14502[(2)] = null);
(statearr_14458_14502[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (4)))
{var inst_14385 = (state_14451[(9)]);var inst_14391 = (state_14451[(2)]);var inst_14392 = cljs.core.get.call(null,inst_14391,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_14393 = cljs.core.get.call(null,inst_14391,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_14394 = cljs.core.get.call(null,inst_14391,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_14395 = inst_14385;var state_14451__$1 = (function (){var statearr_14459 = state_14451;(statearr_14459[(11)] = inst_14392);
(statearr_14459[(12)] = inst_14394);
(statearr_14459[(13)] = inst_14393);
(statearr_14459[(7)] = inst_14395);
return statearr_14459;
})();var statearr_14460_14503 = state_14451__$1;(statearr_14460_14503[(2)] = null);
(statearr_14460_14503[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (15)))
{var state_14451__$1 = state_14451;var statearr_14461_14504 = state_14451__$1;(statearr_14461_14504[(2)] = null);
(statearr_14461_14504[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (21)))
{var inst_14403 = (state_14451[(10)]);var inst_14395 = inst_14403;var state_14451__$1 = (function (){var statearr_14462 = state_14451;(statearr_14462[(7)] = inst_14395);
return statearr_14462;
})();var statearr_14463_14505 = state_14451__$1;(statearr_14463_14505[(2)] = null);
(statearr_14463_14505[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (13)))
{var inst_14447 = (state_14451[(2)]);var state_14451__$1 = state_14451;var statearr_14464_14506 = state_14451__$1;(statearr_14464_14506[(2)] = inst_14447);
(statearr_14464_14506[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (22)))
{var inst_14445 = (state_14451[(2)]);var state_14451__$1 = state_14451;var statearr_14465_14507 = state_14451__$1;(statearr_14465_14507[(2)] = inst_14445);
(statearr_14465_14507[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (6)))
{var inst_14449 = (state_14451[(2)]);var state_14451__$1 = state_14451;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14451__$1,inst_14449);
} else
{if((state_val_14452 === (25)))
{var state_14451__$1 = state_14451;var statearr_14466_14508 = state_14451__$1;(statearr_14466_14508[(2)] = null);
(statearr_14466_14508[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (17)))
{var inst_14425 = (state_14451[(14)]);var state_14451__$1 = state_14451;var statearr_14467_14509 = state_14451__$1;(statearr_14467_14509[(2)] = inst_14425);
(statearr_14467_14509[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (3)))
{var inst_14385 = (state_14451[(9)]);var state_14451__$1 = state_14451;var statearr_14468_14510 = state_14451__$1;(statearr_14468_14510[(2)] = inst_14385);
(statearr_14468_14510[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (12)))
{var inst_14406 = (state_14451[(15)]);var inst_14425 = (state_14451[(14)]);var inst_14411 = (state_14451[(16)]);var inst_14425__$1 = inst_14406.call(null,inst_14411);var state_14451__$1 = (function (){var statearr_14469 = state_14451;(statearr_14469[(14)] = inst_14425__$1);
return statearr_14469;
})();if(cljs.core.truth_(inst_14425__$1))
{var statearr_14470_14511 = state_14451__$1;(statearr_14470_14511[(1)] = (17));
} else
{var statearr_14471_14512 = state_14451__$1;(statearr_14471_14512[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (2)))
{var inst_14385 = (state_14451[(9)]);var inst_14388 = cljs.core.apply.call(null,cljs.core.hash_map,inst_14385);var state_14451__$1 = state_14451;var statearr_14472_14513 = state_14451__$1;(statearr_14472_14513[(2)] = inst_14388);
(statearr_14472_14513[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (23)))
{var inst_14436 = (state_14451[(2)]);var state_14451__$1 = state_14451;if(cljs.core.truth_(inst_14436))
{var statearr_14473_14514 = state_14451__$1;(statearr_14473_14514[(1)] = (24));
} else
{var statearr_14474_14515 = state_14451__$1;(statearr_14474_14515[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (19)))
{var inst_14433 = (state_14451[(2)]);var state_14451__$1 = state_14451;if(cljs.core.truth_(inst_14433))
{var statearr_14475_14516 = state_14451__$1;(statearr_14475_14516[(1)] = (20));
} else
{var statearr_14476_14517 = state_14451__$1;(statearr_14476_14517[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (11)))
{var inst_14410 = (state_14451[(8)]);var inst_14416 = (inst_14410 == null);var state_14451__$1 = state_14451;if(cljs.core.truth_(inst_14416))
{var statearr_14477_14518 = state_14451__$1;(statearr_14477_14518[(1)] = (14));
} else
{var statearr_14478_14519 = state_14451__$1;(statearr_14478_14519[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (9)))
{var inst_14403 = (state_14451[(10)]);var inst_14403__$1 = (state_14451[(2)]);var inst_14404 = cljs.core.get.call(null,inst_14403__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_14405 = cljs.core.get.call(null,inst_14403__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_14406 = cljs.core.get.call(null,inst_14403__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_14451__$1 = (function (){var statearr_14479 = state_14451;(statearr_14479[(15)] = inst_14406);
(statearr_14479[(10)] = inst_14403__$1);
(statearr_14479[(17)] = inst_14405);
return statearr_14479;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_14451__$1,(10),inst_14404);
} else
{if((state_val_14452 === (5)))
{var inst_14395 = (state_14451[(7)]);var inst_14398 = cljs.core.seq_QMARK_.call(null,inst_14395);var state_14451__$1 = state_14451;if(inst_14398)
{var statearr_14480_14520 = state_14451__$1;(statearr_14480_14520[(1)] = (7));
} else
{var statearr_14481_14521 = state_14451__$1;(statearr_14481_14521[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (14)))
{var inst_14411 = (state_14451[(16)]);var inst_14418 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_14411);var state_14451__$1 = state_14451;var statearr_14482_14522 = state_14451__$1;(statearr_14482_14522[(2)] = inst_14418);
(statearr_14482_14522[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (26)))
{var inst_14441 = (state_14451[(2)]);var state_14451__$1 = state_14451;var statearr_14483_14523 = state_14451__$1;(statearr_14483_14523[(2)] = inst_14441);
(statearr_14483_14523[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (16)))
{var inst_14421 = (state_14451[(2)]);var inst_14422 = calc_state.call(null);var inst_14395 = inst_14422;var state_14451__$1 = (function (){var statearr_14484 = state_14451;(statearr_14484[(7)] = inst_14395);
(statearr_14484[(18)] = inst_14421);
return statearr_14484;
})();var statearr_14485_14524 = state_14451__$1;(statearr_14485_14524[(2)] = null);
(statearr_14485_14524[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (10)))
{var inst_14410 = (state_14451[(8)]);var inst_14411 = (state_14451[(16)]);var inst_14409 = (state_14451[(2)]);var inst_14410__$1 = cljs.core.nth.call(null,inst_14409,(0),null);var inst_14411__$1 = cljs.core.nth.call(null,inst_14409,(1),null);var inst_14412 = (inst_14410__$1 == null);var inst_14413 = cljs.core._EQ_.call(null,inst_14411__$1,change);var inst_14414 = (inst_14412) || (inst_14413);var state_14451__$1 = (function (){var statearr_14486 = state_14451;(statearr_14486[(8)] = inst_14410__$1);
(statearr_14486[(16)] = inst_14411__$1);
return statearr_14486;
})();if(cljs.core.truth_(inst_14414))
{var statearr_14487_14525 = state_14451__$1;(statearr_14487_14525[(1)] = (11));
} else
{var statearr_14488_14526 = state_14451__$1;(statearr_14488_14526[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (18)))
{var inst_14406 = (state_14451[(15)]);var inst_14405 = (state_14451[(17)]);var inst_14411 = (state_14451[(16)]);var inst_14428 = cljs.core.empty_QMARK_.call(null,inst_14406);var inst_14429 = inst_14405.call(null,inst_14411);var inst_14430 = cljs.core.not.call(null,inst_14429);var inst_14431 = (inst_14428) && (inst_14430);var state_14451__$1 = state_14451;var statearr_14489_14527 = state_14451__$1;(statearr_14489_14527[(2)] = inst_14431);
(statearr_14489_14527[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14452 === (8)))
{var inst_14395 = (state_14451[(7)]);var state_14451__$1 = state_14451;var statearr_14490_14528 = state_14451__$1;(statearr_14490_14528[(2)] = inst_14395);
(statearr_14490_14528[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__6326__auto__,c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_14494 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14494[(0)] = state_machine__6327__auto__);
(statearr_14494[(1)] = (1));
return statearr_14494;
});
var state_machine__6327__auto____1 = (function (state_14451){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_14451);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e14495){if((e14495 instanceof Object))
{var ex__6330__auto__ = e14495;var statearr_14496_14529 = state_14451;(statearr_14496_14529[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14451);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14495;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14530 = state_14451;
state_14451 = G__14530;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_14451){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_14451);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__6393__auto__ = (function (){var statearr_14497 = f__6392__auto__.call(null);(statearr_14497[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___14498);
return statearr_14497;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___14498,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);
return m;
});
/**
* Adds ch as an input to the mix
*/
cljs.core.async.admix = (function admix(mix,ch){return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
* Removes ch as an input to the mix
*/
cljs.core.async.unmix = (function unmix(mix,ch){return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
* removes all inputs from the mix
*/
cljs.core.async.unmix_all = (function unmix_all(mix){return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
* Atomically sets the state(s) of one or more channels in a mix. The
* state map is a map of channels -> channel-state-map. A
* channel-state-map is a map of attrs -> boolean, where attr is one or
* more of :mute, :pause or :solo. Any states supplied are merged with
* the current state.
* 
* Note that channels can be added to a mix via toggle, which can be
* used to add channels in a particular (e.g. paused) state.
*/
cljs.core.async.toggle = (function toggle(mix,state_map){return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
* Sets the solo mode of the mix. mode must be one of :mute or :pause
*/
cljs.core.async.solo_mode = (function solo_mode(mix,mode){return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});
cljs.core.async.Pub = (function (){var obj14532 = {};return obj14532;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3452__auto__ = p;if(and__3452__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3452__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4100__auto__ = (((p == null))?null:p);return (function (){var or__3464__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3452__auto__ = p;if(and__3452__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3452__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4100__auto__ = (((p == null))?null:p);return (function (){var or__3464__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3452__auto__ = p;if(and__3452__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3452__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4100__auto__ = (((p == null))?null:p);return (function (){var or__3464__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3452__auto__ = p;if(and__3452__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3452__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4100__auto__ = (((p == null))?null:p);return (function (){var or__3464__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4100__auto__)]);if(or__3464__auto__)
{return or__3464__auto__;
} else
{var or__3464__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3464__auto____$1)
{return or__3464__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p,v);
}
});
unsub_all_STAR_ = function(p,v){
switch(arguments.length){
case 1:
return unsub_all_STAR___1.call(this,p);
case 2:
return unsub_all_STAR___2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = unsub_all_STAR___1;
unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = unsub_all_STAR___2;
return unsub_all_STAR_;
})()
;
/**
* Creates and returns a pub(lication) of the supplied channel,
* partitioned into topics by the topic-fn. topic-fn will be applied to
* each value on the channel and the result will determine the 'topic'
* on which that value will be put. Channels can be subscribed to
* receive copies of topics using 'sub', and unsubscribed using
* 'unsub'. Each topic will be handled by an internal mult on a
* dedicated channel. By default these internal channels are
* unbuffered, but a buf-fn can be supplied which, given a topic,
* creates a buffer with desired properties.
* 
* Each item is distributed to all subs in parallel and synchronously,
* i.e. each sub must accept before the next item is distributed. Use
* buffering/windowing to prevent slow subs from holding up the pub.
* 
* Items received when there are no matching subs get dropped.
* 
* Note that if buf-fns are used then each topic is handled
* asynchronously, i.e. if a channel is subscribed to more than one
* topic it should not expect them to be interleaved identically with
* the source.
*/
cljs.core.async.pub = (function() {
var pub = null;
var pub__2 = (function (ch,topic_fn){return pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});
var pub__3 = (function (ch,topic_fn,buf_fn){var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var ensure_mult = ((function (mults){
return (function (topic){var or__3464__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3464__auto__))
{return or__3464__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3464__auto__,mults){
return (function (p1__14533_SHARP_){if(cljs.core.truth_(p1__14533_SHARP_.call(null,topic)))
{return p1__14533_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__14533_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3464__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t14656 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14656 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta14657){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta14657 = meta14657;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14656.cljs$lang$type = true;
cljs.core.async.t14656.cljs$lang$ctorStr = "cljs.core.async/t14656";
cljs.core.async.t14656.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t14656");
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t14656.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t14656.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_14658){var self__ = this;
var _14658__$1 = this;return self__.meta14657;
});})(mults,ensure_mult))
;
cljs.core.async.t14656.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_14658,meta14657__$1){var self__ = this;
var _14658__$1 = this;return (new cljs.core.async.t14656(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta14657__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t14656 = ((function (mults,ensure_mult){
return (function __GT_t14656(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta14657){return (new cljs.core.async.t14656(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta14657));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t14656(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__6391__auto___14778 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___14778,mults,ensure_mult,p){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___14778,mults,ensure_mult,p){
return (function (state_14730){var state_val_14731 = (state_14730[(1)]);if((state_val_14731 === (7)))
{var inst_14726 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14732_14779 = state_14730__$1;(statearr_14732_14779[(2)] = inst_14726);
(statearr_14732_14779[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (20)))
{var state_14730__$1 = state_14730;var statearr_14733_14780 = state_14730__$1;(statearr_14733_14780[(2)] = null);
(statearr_14733_14780[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (1)))
{var state_14730__$1 = state_14730;var statearr_14734_14781 = state_14730__$1;(statearr_14734_14781[(2)] = null);
(statearr_14734_14781[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (24)))
{var inst_14709 = (state_14730[(7)]);var inst_14718 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_14709);var state_14730__$1 = state_14730;var statearr_14735_14782 = state_14730__$1;(statearr_14735_14782[(2)] = inst_14718);
(statearr_14735_14782[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (4)))
{var inst_14661 = (state_14730[(8)]);var inst_14661__$1 = (state_14730[(2)]);var inst_14662 = (inst_14661__$1 == null);var state_14730__$1 = (function (){var statearr_14736 = state_14730;(statearr_14736[(8)] = inst_14661__$1);
return statearr_14736;
})();if(cljs.core.truth_(inst_14662))
{var statearr_14737_14783 = state_14730__$1;(statearr_14737_14783[(1)] = (5));
} else
{var statearr_14738_14784 = state_14730__$1;(statearr_14738_14784[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (15)))
{var inst_14703 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14739_14785 = state_14730__$1;(statearr_14739_14785[(2)] = inst_14703);
(statearr_14739_14785[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (21)))
{var inst_14723 = (state_14730[(2)]);var state_14730__$1 = (function (){var statearr_14740 = state_14730;(statearr_14740[(9)] = inst_14723);
return statearr_14740;
})();var statearr_14741_14786 = state_14730__$1;(statearr_14741_14786[(2)] = null);
(statearr_14741_14786[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (13)))
{var inst_14685 = (state_14730[(10)]);var inst_14687 = cljs.core.chunked_seq_QMARK_.call(null,inst_14685);var state_14730__$1 = state_14730;if(inst_14687)
{var statearr_14742_14787 = state_14730__$1;(statearr_14742_14787[(1)] = (16));
} else
{var statearr_14743_14788 = state_14730__$1;(statearr_14743_14788[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (22)))
{var inst_14715 = (state_14730[(2)]);var state_14730__$1 = state_14730;if(cljs.core.truth_(inst_14715))
{var statearr_14744_14789 = state_14730__$1;(statearr_14744_14789[(1)] = (23));
} else
{var statearr_14745_14790 = state_14730__$1;(statearr_14745_14790[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (6)))
{var inst_14661 = (state_14730[(8)]);var inst_14709 = (state_14730[(7)]);var inst_14711 = (state_14730[(11)]);var inst_14709__$1 = topic_fn.call(null,inst_14661);var inst_14710 = cljs.core.deref.call(null,mults);var inst_14711__$1 = cljs.core.get.call(null,inst_14710,inst_14709__$1);var state_14730__$1 = (function (){var statearr_14746 = state_14730;(statearr_14746[(7)] = inst_14709__$1);
(statearr_14746[(11)] = inst_14711__$1);
return statearr_14746;
})();if(cljs.core.truth_(inst_14711__$1))
{var statearr_14747_14791 = state_14730__$1;(statearr_14747_14791[(1)] = (19));
} else
{var statearr_14748_14792 = state_14730__$1;(statearr_14748_14792[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (25)))
{var inst_14720 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14749_14793 = state_14730__$1;(statearr_14749_14793[(2)] = inst_14720);
(statearr_14749_14793[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (17)))
{var inst_14685 = (state_14730[(10)]);var inst_14694 = cljs.core.first.call(null,inst_14685);var inst_14695 = cljs.core.async.muxch_STAR_.call(null,inst_14694);var inst_14696 = cljs.core.async.close_BANG_.call(null,inst_14695);var inst_14697 = cljs.core.next.call(null,inst_14685);var inst_14671 = inst_14697;var inst_14672 = null;var inst_14673 = (0);var inst_14674 = (0);var state_14730__$1 = (function (){var statearr_14750 = state_14730;(statearr_14750[(12)] = inst_14674);
(statearr_14750[(13)] = inst_14696);
(statearr_14750[(14)] = inst_14672);
(statearr_14750[(15)] = inst_14673);
(statearr_14750[(16)] = inst_14671);
return statearr_14750;
})();var statearr_14751_14794 = state_14730__$1;(statearr_14751_14794[(2)] = null);
(statearr_14751_14794[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (3)))
{var inst_14728 = (state_14730[(2)]);var state_14730__$1 = state_14730;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14730__$1,inst_14728);
} else
{if((state_val_14731 === (12)))
{var inst_14705 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14752_14795 = state_14730__$1;(statearr_14752_14795[(2)] = inst_14705);
(statearr_14752_14795[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (2)))
{var state_14730__$1 = state_14730;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14730__$1,(4),ch);
} else
{if((state_val_14731 === (23)))
{var state_14730__$1 = state_14730;var statearr_14753_14796 = state_14730__$1;(statearr_14753_14796[(2)] = null);
(statearr_14753_14796[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (19)))
{var inst_14661 = (state_14730[(8)]);var inst_14711 = (state_14730[(11)]);var inst_14713 = cljs.core.async.muxch_STAR_.call(null,inst_14711);var state_14730__$1 = state_14730;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14730__$1,(22),inst_14713,inst_14661);
} else
{if((state_val_14731 === (11)))
{var inst_14685 = (state_14730[(10)]);var inst_14671 = (state_14730[(16)]);var inst_14685__$1 = cljs.core.seq.call(null,inst_14671);var state_14730__$1 = (function (){var statearr_14754 = state_14730;(statearr_14754[(10)] = inst_14685__$1);
return statearr_14754;
})();if(inst_14685__$1)
{var statearr_14755_14797 = state_14730__$1;(statearr_14755_14797[(1)] = (13));
} else
{var statearr_14756_14798 = state_14730__$1;(statearr_14756_14798[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (9)))
{var inst_14707 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14757_14799 = state_14730__$1;(statearr_14757_14799[(2)] = inst_14707);
(statearr_14757_14799[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (5)))
{var inst_14668 = cljs.core.deref.call(null,mults);var inst_14669 = cljs.core.vals.call(null,inst_14668);var inst_14670 = cljs.core.seq.call(null,inst_14669);var inst_14671 = inst_14670;var inst_14672 = null;var inst_14673 = (0);var inst_14674 = (0);var state_14730__$1 = (function (){var statearr_14758 = state_14730;(statearr_14758[(12)] = inst_14674);
(statearr_14758[(14)] = inst_14672);
(statearr_14758[(15)] = inst_14673);
(statearr_14758[(16)] = inst_14671);
return statearr_14758;
})();var statearr_14759_14800 = state_14730__$1;(statearr_14759_14800[(2)] = null);
(statearr_14759_14800[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (14)))
{var state_14730__$1 = state_14730;var statearr_14763_14801 = state_14730__$1;(statearr_14763_14801[(2)] = null);
(statearr_14763_14801[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (16)))
{var inst_14685 = (state_14730[(10)]);var inst_14689 = cljs.core.chunk_first.call(null,inst_14685);var inst_14690 = cljs.core.chunk_rest.call(null,inst_14685);var inst_14691 = cljs.core.count.call(null,inst_14689);var inst_14671 = inst_14690;var inst_14672 = inst_14689;var inst_14673 = inst_14691;var inst_14674 = (0);var state_14730__$1 = (function (){var statearr_14764 = state_14730;(statearr_14764[(12)] = inst_14674);
(statearr_14764[(14)] = inst_14672);
(statearr_14764[(15)] = inst_14673);
(statearr_14764[(16)] = inst_14671);
return statearr_14764;
})();var statearr_14765_14802 = state_14730__$1;(statearr_14765_14802[(2)] = null);
(statearr_14765_14802[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (10)))
{var inst_14674 = (state_14730[(12)]);var inst_14672 = (state_14730[(14)]);var inst_14673 = (state_14730[(15)]);var inst_14671 = (state_14730[(16)]);var inst_14679 = cljs.core._nth.call(null,inst_14672,inst_14674);var inst_14680 = cljs.core.async.muxch_STAR_.call(null,inst_14679);var inst_14681 = cljs.core.async.close_BANG_.call(null,inst_14680);var inst_14682 = (inst_14674 + (1));var tmp14760 = inst_14672;var tmp14761 = inst_14673;var tmp14762 = inst_14671;var inst_14671__$1 = tmp14762;var inst_14672__$1 = tmp14760;var inst_14673__$1 = tmp14761;var inst_14674__$1 = inst_14682;var state_14730__$1 = (function (){var statearr_14766 = state_14730;(statearr_14766[(12)] = inst_14674__$1);
(statearr_14766[(14)] = inst_14672__$1);
(statearr_14766[(17)] = inst_14681);
(statearr_14766[(15)] = inst_14673__$1);
(statearr_14766[(16)] = inst_14671__$1);
return statearr_14766;
})();var statearr_14767_14803 = state_14730__$1;(statearr_14767_14803[(2)] = null);
(statearr_14767_14803[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (18)))
{var inst_14700 = (state_14730[(2)]);var state_14730__$1 = state_14730;var statearr_14768_14804 = state_14730__$1;(statearr_14768_14804[(2)] = inst_14700);
(statearr_14768_14804[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14731 === (8)))
{var inst_14674 = (state_14730[(12)]);var inst_14673 = (state_14730[(15)]);var inst_14676 = (inst_14674 < inst_14673);var inst_14677 = inst_14676;var state_14730__$1 = state_14730;if(cljs.core.truth_(inst_14677))
{var statearr_14769_14805 = state_14730__$1;(statearr_14769_14805[(1)] = (10));
} else
{var statearr_14770_14806 = state_14730__$1;(statearr_14770_14806[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___14778,mults,ensure_mult,p))
;return ((function (switch__6326__auto__,c__6391__auto___14778,mults,ensure_mult,p){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_14774 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14774[(0)] = state_machine__6327__auto__);
(statearr_14774[(1)] = (1));
return statearr_14774;
});
var state_machine__6327__auto____1 = (function (state_14730){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_14730);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e14775){if((e14775 instanceof Object))
{var ex__6330__auto__ = e14775;var statearr_14776_14807 = state_14730;(statearr_14776_14807[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14730);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14775;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14808 = state_14730;
state_14730 = G__14808;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_14730){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_14730);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___14778,mults,ensure_mult,p))
})();var state__6393__auto__ = (function (){var statearr_14777 = f__6392__auto__.call(null);(statearr_14777[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___14778);
return statearr_14777;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___14778,mults,ensure_mult,p))
);
return p;
});
pub = function(ch,topic_fn,buf_fn){
switch(arguments.length){
case 2:
return pub__2.call(this,ch,topic_fn);
case 3:
return pub__3.call(this,ch,topic_fn,buf_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
pub.cljs$core$IFn$_invoke$arity$2 = pub__2;
pub.cljs$core$IFn$_invoke$arity$3 = pub__3;
return pub;
})()
;
/**
* Subscribes a channel to a topic of a pub.
* 
* By default the channel will be closed when the source closes,
* but can be determined by the close? parameter.
*/
cljs.core.async.sub = (function() {
var sub = null;
var sub__3 = (function (p,topic,ch){return sub.call(null,p,topic,ch,true);
});
var sub__4 = (function (p,topic,ch,close_QMARK_){return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});
sub = function(p,topic,ch,close_QMARK_){
switch(arguments.length){
case 3:
return sub__3.call(this,p,topic,ch);
case 4:
return sub__4.call(this,p,topic,ch,close_QMARK_);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
sub.cljs$core$IFn$_invoke$arity$3 = sub__3;
sub.cljs$core$IFn$_invoke$arity$4 = sub__4;
return sub;
})()
;
/**
* Unsubscribes a channel from a topic of a pub
*/
cljs.core.async.unsub = (function unsub(p,topic,ch){return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
* Unsubscribes all channels from a pub, or a topic of a pub
*/
cljs.core.async.unsub_all = (function() {
var unsub_all = null;
var unsub_all__1 = (function (p){return cljs.core.async.unsub_all_STAR_.call(null,p);
});
var unsub_all__2 = (function (p,topic){return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});
unsub_all = function(p,topic){
switch(arguments.length){
case 1:
return unsub_all__1.call(this,p);
case 2:
return unsub_all__2.call(this,p,topic);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unsub_all.cljs$core$IFn$_invoke$arity$1 = unsub_all__1;
unsub_all.cljs$core$IFn$_invoke$arity$2 = unsub_all__2;
return unsub_all;
})()
;
/**
* Takes a function and a collection of source channels, and returns a
* channel which contains the values produced by applying f to the set
* of first items taken from each source channel, followed by applying
* f to the set of second items from each channel, until any one of the
* channels is closed, at which point the output channel will be
* closed. The returned channel will be unbuffered by default, or a
* buf-or-n can be supplied
*/
cljs.core.async.map = (function() {
var map = null;
var map__2 = (function (f,chs){return map.call(null,f,chs,null);
});
var map__3 = (function (f,chs,buf_or_n){var chs__$1 = cljs.core.vec.call(null,chs);var out = cljs.core.async.chan.call(null,buf_or_n);var cnt = cljs.core.count.call(null,chs__$1);var rets = cljs.core.object_array.call(null,cnt);var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){(rets[i] = ret);
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else
{return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));var c__6391__auto___14945 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_14915){var state_val_14916 = (state_14915[(1)]);if((state_val_14916 === (7)))
{var state_14915__$1 = state_14915;var statearr_14917_14946 = state_14915__$1;(statearr_14917_14946[(2)] = null);
(statearr_14917_14946[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (1)))
{var state_14915__$1 = state_14915;var statearr_14918_14947 = state_14915__$1;(statearr_14918_14947[(2)] = null);
(statearr_14918_14947[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (4)))
{var inst_14879 = (state_14915[(7)]);var inst_14881 = (inst_14879 < cnt);var state_14915__$1 = state_14915;if(cljs.core.truth_(inst_14881))
{var statearr_14919_14948 = state_14915__$1;(statearr_14919_14948[(1)] = (6));
} else
{var statearr_14920_14949 = state_14915__$1;(statearr_14920_14949[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (15)))
{var inst_14911 = (state_14915[(2)]);var state_14915__$1 = state_14915;var statearr_14921_14950 = state_14915__$1;(statearr_14921_14950[(2)] = inst_14911);
(statearr_14921_14950[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (13)))
{var inst_14904 = cljs.core.async.close_BANG_.call(null,out);var state_14915__$1 = state_14915;var statearr_14922_14951 = state_14915__$1;(statearr_14922_14951[(2)] = inst_14904);
(statearr_14922_14951[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (6)))
{var state_14915__$1 = state_14915;var statearr_14923_14952 = state_14915__$1;(statearr_14923_14952[(2)] = null);
(statearr_14923_14952[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (3)))
{var inst_14913 = (state_14915[(2)]);var state_14915__$1 = state_14915;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14915__$1,inst_14913);
} else
{if((state_val_14916 === (12)))
{var inst_14901 = (state_14915[(8)]);var inst_14901__$1 = (state_14915[(2)]);var inst_14902 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_14901__$1);var state_14915__$1 = (function (){var statearr_14924 = state_14915;(statearr_14924[(8)] = inst_14901__$1);
return statearr_14924;
})();if(cljs.core.truth_(inst_14902))
{var statearr_14925_14953 = state_14915__$1;(statearr_14925_14953[(1)] = (13));
} else
{var statearr_14926_14954 = state_14915__$1;(statearr_14926_14954[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (2)))
{var inst_14878 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_14879 = (0);var state_14915__$1 = (function (){var statearr_14927 = state_14915;(statearr_14927[(7)] = inst_14879);
(statearr_14927[(9)] = inst_14878);
return statearr_14927;
})();var statearr_14928_14955 = state_14915__$1;(statearr_14928_14955[(2)] = null);
(statearr_14928_14955[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (11)))
{var inst_14879 = (state_14915[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_14915,(10),Object,null,(9));var inst_14888 = chs__$1.call(null,inst_14879);var inst_14889 = done.call(null,inst_14879);var inst_14890 = cljs.core.async.take_BANG_.call(null,inst_14888,inst_14889);var state_14915__$1 = state_14915;var statearr_14929_14956 = state_14915__$1;(statearr_14929_14956[(2)] = inst_14890);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14915__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (9)))
{var inst_14879 = (state_14915[(7)]);var inst_14892 = (state_14915[(2)]);var inst_14893 = (inst_14879 + (1));var inst_14879__$1 = inst_14893;var state_14915__$1 = (function (){var statearr_14930 = state_14915;(statearr_14930[(7)] = inst_14879__$1);
(statearr_14930[(10)] = inst_14892);
return statearr_14930;
})();var statearr_14931_14957 = state_14915__$1;(statearr_14931_14957[(2)] = null);
(statearr_14931_14957[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (5)))
{var inst_14899 = (state_14915[(2)]);var state_14915__$1 = (function (){var statearr_14932 = state_14915;(statearr_14932[(11)] = inst_14899);
return statearr_14932;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14915__$1,(12),dchan);
} else
{if((state_val_14916 === (14)))
{var inst_14901 = (state_14915[(8)]);var inst_14906 = cljs.core.apply.call(null,f,inst_14901);var state_14915__$1 = state_14915;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14915__$1,(16),out,inst_14906);
} else
{if((state_val_14916 === (16)))
{var inst_14908 = (state_14915[(2)]);var state_14915__$1 = (function (){var statearr_14933 = state_14915;(statearr_14933[(12)] = inst_14908);
return statearr_14933;
})();var statearr_14934_14958 = state_14915__$1;(statearr_14934_14958[(2)] = null);
(statearr_14934_14958[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (10)))
{var inst_14883 = (state_14915[(2)]);var inst_14884 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_14915__$1 = (function (){var statearr_14935 = state_14915;(statearr_14935[(13)] = inst_14883);
return statearr_14935;
})();var statearr_14936_14959 = state_14915__$1;(statearr_14936_14959[(2)] = inst_14884);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14915__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14916 === (8)))
{var inst_14897 = (state_14915[(2)]);var state_14915__$1 = state_14915;var statearr_14937_14960 = state_14915__$1;(statearr_14937_14960[(2)] = inst_14897);
(statearr_14937_14960[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__6326__auto__,c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_14941 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14941[(0)] = state_machine__6327__auto__);
(statearr_14941[(1)] = (1));
return statearr_14941;
});
var state_machine__6327__auto____1 = (function (state_14915){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_14915);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e14942){if((e14942 instanceof Object))
{var ex__6330__auto__ = e14942;var statearr_14943_14961 = state_14915;(statearr_14943_14961[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14915);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14942;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14962 = state_14915;
state_14915 = G__14962;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_14915){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_14915);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__6393__auto__ = (function (){var statearr_14944 = f__6392__auto__.call(null);(statearr_14944[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___14945);
return statearr_14944;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___14945,chs__$1,out,cnt,rets,dchan,dctr,done))
);
return out;
});
map = function(f,chs,buf_or_n){
switch(arguments.length){
case 2:
return map__2.call(this,f,chs);
case 3:
return map__3.call(this,f,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
map.cljs$core$IFn$_invoke$arity$2 = map__2;
map.cljs$core$IFn$_invoke$arity$3 = map__3;
return map;
})()
;
/**
* Takes a collection of source channels and returns a channel which
* contains all values taken from them. The returned channel will be
* unbuffered by default, or a buf-or-n can be supplied. The channel
* will close after all the source channels have closed.
*/
cljs.core.async.merge = (function() {
var merge = null;
var merge__1 = (function (chs){return merge.call(null,chs,null);
});
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15070 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15070,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15070,out){
return (function (state_15046){var state_val_15047 = (state_15046[(1)]);if((state_val_15047 === (7)))
{var inst_15025 = (state_15046[(7)]);var inst_15026 = (state_15046[(8)]);var inst_15025__$1 = (state_15046[(2)]);var inst_15026__$1 = cljs.core.nth.call(null,inst_15025__$1,(0),null);var inst_15027 = cljs.core.nth.call(null,inst_15025__$1,(1),null);var inst_15028 = (inst_15026__$1 == null);var state_15046__$1 = (function (){var statearr_15048 = state_15046;(statearr_15048[(9)] = inst_15027);
(statearr_15048[(7)] = inst_15025__$1);
(statearr_15048[(8)] = inst_15026__$1);
return statearr_15048;
})();if(cljs.core.truth_(inst_15028))
{var statearr_15049_15071 = state_15046__$1;(statearr_15049_15071[(1)] = (8));
} else
{var statearr_15050_15072 = state_15046__$1;(statearr_15050_15072[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (1)))
{var inst_15017 = cljs.core.vec.call(null,chs);var inst_15018 = inst_15017;var state_15046__$1 = (function (){var statearr_15051 = state_15046;(statearr_15051[(10)] = inst_15018);
return statearr_15051;
})();var statearr_15052_15073 = state_15046__$1;(statearr_15052_15073[(2)] = null);
(statearr_15052_15073[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (4)))
{var inst_15018 = (state_15046[(10)]);var state_15046__$1 = state_15046;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_15046__$1,(7),inst_15018);
} else
{if((state_val_15047 === (6)))
{var inst_15042 = (state_15046[(2)]);var state_15046__$1 = state_15046;var statearr_15053_15074 = state_15046__$1;(statearr_15053_15074[(2)] = inst_15042);
(statearr_15053_15074[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (3)))
{var inst_15044 = (state_15046[(2)]);var state_15046__$1 = state_15046;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15046__$1,inst_15044);
} else
{if((state_val_15047 === (2)))
{var inst_15018 = (state_15046[(10)]);var inst_15020 = cljs.core.count.call(null,inst_15018);var inst_15021 = (inst_15020 > (0));var state_15046__$1 = state_15046;if(cljs.core.truth_(inst_15021))
{var statearr_15055_15075 = state_15046__$1;(statearr_15055_15075[(1)] = (4));
} else
{var statearr_15056_15076 = state_15046__$1;(statearr_15056_15076[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (11)))
{var inst_15018 = (state_15046[(10)]);var inst_15035 = (state_15046[(2)]);var tmp15054 = inst_15018;var inst_15018__$1 = tmp15054;var state_15046__$1 = (function (){var statearr_15057 = state_15046;(statearr_15057[(10)] = inst_15018__$1);
(statearr_15057[(11)] = inst_15035);
return statearr_15057;
})();var statearr_15058_15077 = state_15046__$1;(statearr_15058_15077[(2)] = null);
(statearr_15058_15077[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (9)))
{var inst_15026 = (state_15046[(8)]);var state_15046__$1 = state_15046;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15046__$1,(11),out,inst_15026);
} else
{if((state_val_15047 === (5)))
{var inst_15040 = cljs.core.async.close_BANG_.call(null,out);var state_15046__$1 = state_15046;var statearr_15059_15078 = state_15046__$1;(statearr_15059_15078[(2)] = inst_15040);
(statearr_15059_15078[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (10)))
{var inst_15038 = (state_15046[(2)]);var state_15046__$1 = state_15046;var statearr_15060_15079 = state_15046__$1;(statearr_15060_15079[(2)] = inst_15038);
(statearr_15060_15079[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15047 === (8)))
{var inst_15027 = (state_15046[(9)]);var inst_15025 = (state_15046[(7)]);var inst_15018 = (state_15046[(10)]);var inst_15026 = (state_15046[(8)]);var inst_15030 = (function (){var c = inst_15027;var v = inst_15026;var vec__15023 = inst_15025;var cs = inst_15018;return ((function (c,v,vec__15023,cs,inst_15027,inst_15025,inst_15018,inst_15026,state_val_15047,c__6391__auto___15070,out){
return (function (p1__14963_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__14963_SHARP_);
});
;})(c,v,vec__15023,cs,inst_15027,inst_15025,inst_15018,inst_15026,state_val_15047,c__6391__auto___15070,out))
})();var inst_15031 = cljs.core.filterv.call(null,inst_15030,inst_15018);var inst_15018__$1 = inst_15031;var state_15046__$1 = (function (){var statearr_15061 = state_15046;(statearr_15061[(10)] = inst_15018__$1);
return statearr_15061;
})();var statearr_15062_15080 = state_15046__$1;(statearr_15062_15080[(2)] = null);
(statearr_15062_15080[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15070,out))
;return ((function (switch__6326__auto__,c__6391__auto___15070,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15066 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_15066[(0)] = state_machine__6327__auto__);
(statearr_15066[(1)] = (1));
return statearr_15066;
});
var state_machine__6327__auto____1 = (function (state_15046){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15046);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15067){if((e15067 instanceof Object))
{var ex__6330__auto__ = e15067;var statearr_15068_15081 = state_15046;(statearr_15068_15081[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15046);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15067;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15082 = state_15046;
state_15046 = G__15082;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15046){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15046);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15070,out))
})();var state__6393__auto__ = (function (){var statearr_15069 = f__6392__auto__.call(null);(statearr_15069[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15070);
return statearr_15069;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15070,out))
);
return out;
});
merge = function(chs,buf_or_n){
switch(arguments.length){
case 1:
return merge__1.call(this,chs);
case 2:
return merge__2.call(this,chs,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
merge.cljs$core$IFn$_invoke$arity$1 = merge__1;
merge.cljs$core$IFn$_invoke$arity$2 = merge__2;
return merge;
})()
;
/**
* Returns a channel containing the single (collection) result of the
* items taken from the channel conjoined to the supplied
* collection. ch must close before into produces a result.
*/
cljs.core.async.into = (function into(coll,ch){return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
* Returns a channel that will return, at most, n items from ch. After n items
* have been returned, or ch has been closed, the return chanel will close.
* 
* The output channel is unbuffered by default, unless buf-or-n is given.
*/
cljs.core.async.take = (function() {
var take = null;
var take__2 = (function (n,ch){return take.call(null,n,ch,null);
});
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15175 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15175,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15175,out){
return (function (state_15152){var state_val_15153 = (state_15152[(1)]);if((state_val_15153 === (7)))
{var inst_15134 = (state_15152[(7)]);var inst_15134__$1 = (state_15152[(2)]);var inst_15135 = (inst_15134__$1 == null);var inst_15136 = cljs.core.not.call(null,inst_15135);var state_15152__$1 = (function (){var statearr_15154 = state_15152;(statearr_15154[(7)] = inst_15134__$1);
return statearr_15154;
})();if(inst_15136)
{var statearr_15155_15176 = state_15152__$1;(statearr_15155_15176[(1)] = (8));
} else
{var statearr_15156_15177 = state_15152__$1;(statearr_15156_15177[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (1)))
{var inst_15129 = (0);var state_15152__$1 = (function (){var statearr_15157 = state_15152;(statearr_15157[(8)] = inst_15129);
return statearr_15157;
})();var statearr_15158_15178 = state_15152__$1;(statearr_15158_15178[(2)] = null);
(statearr_15158_15178[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (4)))
{var state_15152__$1 = state_15152;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15152__$1,(7),ch);
} else
{if((state_val_15153 === (6)))
{var inst_15147 = (state_15152[(2)]);var state_15152__$1 = state_15152;var statearr_15159_15179 = state_15152__$1;(statearr_15159_15179[(2)] = inst_15147);
(statearr_15159_15179[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (3)))
{var inst_15149 = (state_15152[(2)]);var inst_15150 = cljs.core.async.close_BANG_.call(null,out);var state_15152__$1 = (function (){var statearr_15160 = state_15152;(statearr_15160[(9)] = inst_15149);
return statearr_15160;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15152__$1,inst_15150);
} else
{if((state_val_15153 === (2)))
{var inst_15129 = (state_15152[(8)]);var inst_15131 = (inst_15129 < n);var state_15152__$1 = state_15152;if(cljs.core.truth_(inst_15131))
{var statearr_15161_15180 = state_15152__$1;(statearr_15161_15180[(1)] = (4));
} else
{var statearr_15162_15181 = state_15152__$1;(statearr_15162_15181[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (11)))
{var inst_15129 = (state_15152[(8)]);var inst_15139 = (state_15152[(2)]);var inst_15140 = (inst_15129 + (1));var inst_15129__$1 = inst_15140;var state_15152__$1 = (function (){var statearr_15163 = state_15152;(statearr_15163[(10)] = inst_15139);
(statearr_15163[(8)] = inst_15129__$1);
return statearr_15163;
})();var statearr_15164_15182 = state_15152__$1;(statearr_15164_15182[(2)] = null);
(statearr_15164_15182[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (9)))
{var state_15152__$1 = state_15152;var statearr_15165_15183 = state_15152__$1;(statearr_15165_15183[(2)] = null);
(statearr_15165_15183[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (5)))
{var state_15152__$1 = state_15152;var statearr_15166_15184 = state_15152__$1;(statearr_15166_15184[(2)] = null);
(statearr_15166_15184[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (10)))
{var inst_15144 = (state_15152[(2)]);var state_15152__$1 = state_15152;var statearr_15167_15185 = state_15152__$1;(statearr_15167_15185[(2)] = inst_15144);
(statearr_15167_15185[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15153 === (8)))
{var inst_15134 = (state_15152[(7)]);var state_15152__$1 = state_15152;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15152__$1,(11),out,inst_15134);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15175,out))
;return ((function (switch__6326__auto__,c__6391__auto___15175,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15171 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_15171[(0)] = state_machine__6327__auto__);
(statearr_15171[(1)] = (1));
return statearr_15171;
});
var state_machine__6327__auto____1 = (function (state_15152){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15152);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15172){if((e15172 instanceof Object))
{var ex__6330__auto__ = e15172;var statearr_15173_15186 = state_15152;(statearr_15173_15186[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15152);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15172;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15187 = state_15152;
state_15152 = G__15187;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15152){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15152);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15175,out))
})();var state__6393__auto__ = (function (){var statearr_15174 = f__6392__auto__.call(null);(statearr_15174[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15175);
return statearr_15174;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15175,out))
);
return out;
});
take = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return take__2.call(this,n,ch);
case 3:
return take__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
take.cljs$core$IFn$_invoke$arity$2 = take__2;
take.cljs$core$IFn$_invoke$arity$3 = take__3;
return take;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t15195 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t15195 = (function (ch,f,map_LT_,meta15196){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta15196 = meta15196;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t15195.cljs$lang$type = true;
cljs.core.async.t15195.cljs$lang$ctorStr = "cljs.core.async/t15195";
cljs.core.async.t15195.cljs$lang$ctorPrWriter = (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t15195");
});
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t15198 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t15198 = (function (fn1,_,meta15196,ch,f,map_LT_,meta15199){
this.fn1 = fn1;
this._ = _;
this.meta15196 = meta15196;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta15199 = meta15199;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t15198.cljs$lang$type = true;
cljs.core.async.t15198.cljs$lang$ctorStr = "cljs.core.async/t15198";
cljs.core.async.t15198.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t15198");
});})(___$1))
;
cljs.core.async.t15198.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t15198.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t15198.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t15198.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__15188_SHARP_){return f1.call(null,(((p1__15188_SHARP_ == null))?null:self__.f.call(null,p1__15188_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t15198.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_15200){var self__ = this;
var _15200__$1 = this;return self__.meta15199;
});})(___$1))
;
cljs.core.async.t15198.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_15200,meta15199__$1){var self__ = this;
var _15200__$1 = this;return (new cljs.core.async.t15198(self__.fn1,self__._,self__.meta15196,self__.ch,self__.f,self__.map_LT_,meta15199__$1));
});})(___$1))
;
cljs.core.async.__GT_t15198 = ((function (___$1){
return (function __GT_t15198(fn1__$1,___$2,meta15196__$1,ch__$2,f__$2,map_LT___$2,meta15199){return (new cljs.core.async.t15198(fn1__$1,___$2,meta15196__$1,ch__$2,f__$2,map_LT___$2,meta15199));
});})(___$1))
;
}
return (new cljs.core.async.t15198(fn1,___$1,self__.meta15196,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3452__auto__ = ret;if(cljs.core.truth_(and__3452__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3452__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t15195.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t15195.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15197){var self__ = this;
var _15197__$1 = this;return self__.meta15196;
});
cljs.core.async.t15195.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15197,meta15196__$1){var self__ = this;
var _15197__$1 = this;return (new cljs.core.async.t15195(self__.ch,self__.f,self__.map_LT_,meta15196__$1));
});
cljs.core.async.__GT_t15195 = (function __GT_t15195(ch__$1,f__$1,map_LT___$1,meta15196){return (new cljs.core.async.t15195(ch__$1,f__$1,map_LT___$1,meta15196));
});
}
return (new cljs.core.async.t15195(ch,f,map_LT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t15204 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t15204 = (function (ch,f,map_GT_,meta15205){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta15205 = meta15205;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t15204.cljs$lang$type = true;
cljs.core.async.t15204.cljs$lang$ctorStr = "cljs.core.async/t15204";
cljs.core.async.t15204.cljs$lang$ctorPrWriter = (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t15204");
});
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t15204.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t15204.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15206){var self__ = this;
var _15206__$1 = this;return self__.meta15205;
});
cljs.core.async.t15204.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15206,meta15205__$1){var self__ = this;
var _15206__$1 = this;return (new cljs.core.async.t15204(self__.ch,self__.f,self__.map_GT_,meta15205__$1));
});
cljs.core.async.__GT_t15204 = (function __GT_t15204(ch__$1,f__$1,map_GT___$1,meta15205){return (new cljs.core.async.t15204(ch__$1,f__$1,map_GT___$1,meta15205));
});
}
return (new cljs.core.async.t15204(ch,f,map_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t15210 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t15210 = (function (ch,p,filter_GT_,meta15211){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta15211 = meta15211;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t15210.cljs$lang$type = true;
cljs.core.async.t15210.cljs$lang$ctorStr = "cljs.core.async/t15210";
cljs.core.async.t15210.cljs$lang$ctorPrWriter = (function (this__4040__auto__,writer__4041__auto__,opt__4042__auto__){return cljs.core._write.call(null,writer__4041__auto__,"cljs.core.async/t15210");
});
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t15210.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t15210.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_15212){var self__ = this;
var _15212__$1 = this;return self__.meta15211;
});
cljs.core.async.t15210.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_15212,meta15211__$1){var self__ = this;
var _15212__$1 = this;return (new cljs.core.async.t15210(self__.ch,self__.p,self__.filter_GT_,meta15211__$1));
});
cljs.core.async.__GT_t15210 = (function __GT_t15210(ch__$1,p__$1,filter_GT___$1,meta15211){return (new cljs.core.async.t15210(ch__$1,p__$1,filter_GT___$1,meta15211));
});
}
return (new cljs.core.async.t15210(ch,p,filter_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.remove_GT_ = (function remove_GT_(p,ch){return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_LT_ = (function() {
var filter_LT_ = null;
var filter_LT___2 = (function (p,ch){return filter_LT_.call(null,p,ch,null);
});
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15295 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15295,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15295,out){
return (function (state_15274){var state_val_15275 = (state_15274[(1)]);if((state_val_15275 === (7)))
{var inst_15270 = (state_15274[(2)]);var state_15274__$1 = state_15274;var statearr_15276_15296 = state_15274__$1;(statearr_15276_15296[(2)] = inst_15270);
(statearr_15276_15296[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (1)))
{var state_15274__$1 = state_15274;var statearr_15277_15297 = state_15274__$1;(statearr_15277_15297[(2)] = null);
(statearr_15277_15297[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (4)))
{var inst_15256 = (state_15274[(7)]);var inst_15256__$1 = (state_15274[(2)]);var inst_15257 = (inst_15256__$1 == null);var state_15274__$1 = (function (){var statearr_15278 = state_15274;(statearr_15278[(7)] = inst_15256__$1);
return statearr_15278;
})();if(cljs.core.truth_(inst_15257))
{var statearr_15279_15298 = state_15274__$1;(statearr_15279_15298[(1)] = (5));
} else
{var statearr_15280_15299 = state_15274__$1;(statearr_15280_15299[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (6)))
{var inst_15256 = (state_15274[(7)]);var inst_15261 = p.call(null,inst_15256);var state_15274__$1 = state_15274;if(cljs.core.truth_(inst_15261))
{var statearr_15281_15300 = state_15274__$1;(statearr_15281_15300[(1)] = (8));
} else
{var statearr_15282_15301 = state_15274__$1;(statearr_15282_15301[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (3)))
{var inst_15272 = (state_15274[(2)]);var state_15274__$1 = state_15274;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15274__$1,inst_15272);
} else
{if((state_val_15275 === (2)))
{var state_15274__$1 = state_15274;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15274__$1,(4),ch);
} else
{if((state_val_15275 === (11)))
{var inst_15264 = (state_15274[(2)]);var state_15274__$1 = state_15274;var statearr_15283_15302 = state_15274__$1;(statearr_15283_15302[(2)] = inst_15264);
(statearr_15283_15302[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (9)))
{var state_15274__$1 = state_15274;var statearr_15284_15303 = state_15274__$1;(statearr_15284_15303[(2)] = null);
(statearr_15284_15303[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (5)))
{var inst_15259 = cljs.core.async.close_BANG_.call(null,out);var state_15274__$1 = state_15274;var statearr_15285_15304 = state_15274__$1;(statearr_15285_15304[(2)] = inst_15259);
(statearr_15285_15304[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (10)))
{var inst_15267 = (state_15274[(2)]);var state_15274__$1 = (function (){var statearr_15286 = state_15274;(statearr_15286[(8)] = inst_15267);
return statearr_15286;
})();var statearr_15287_15305 = state_15274__$1;(statearr_15287_15305[(2)] = null);
(statearr_15287_15305[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15275 === (8)))
{var inst_15256 = (state_15274[(7)]);var state_15274__$1 = state_15274;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15274__$1,(11),out,inst_15256);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15295,out))
;return ((function (switch__6326__auto__,c__6391__auto___15295,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15291 = [null,null,null,null,null,null,null,null,null];(statearr_15291[(0)] = state_machine__6327__auto__);
(statearr_15291[(1)] = (1));
return statearr_15291;
});
var state_machine__6327__auto____1 = (function (state_15274){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15274);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15292){if((e15292 instanceof Object))
{var ex__6330__auto__ = e15292;var statearr_15293_15306 = state_15274;(statearr_15293_15306[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15274);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15292;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15307 = state_15274;
state_15274 = G__15307;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15274){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15274);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15295,out))
})();var state__6393__auto__ = (function (){var statearr_15294 = f__6392__auto__.call(null);(statearr_15294[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15295);
return statearr_15294;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15295,out))
);
return out;
});
filter_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return filter_LT___2.call(this,p,ch);
case 3:
return filter_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
filter_LT_.cljs$core$IFn$_invoke$arity$2 = filter_LT___2;
filter_LT_.cljs$core$IFn$_invoke$arity$3 = filter_LT___3;
return filter_LT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.remove_LT_ = (function() {
var remove_LT_ = null;
var remove_LT___2 = (function (p,ch){return remove_LT_.call(null,p,ch,null);
});
var remove_LT___3 = (function (p,ch,buf_or_n){return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});
remove_LT_ = function(p,ch,buf_or_n){
switch(arguments.length){
case 2:
return remove_LT___2.call(this,p,ch);
case 3:
return remove_LT___3.call(this,p,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
remove_LT_.cljs$core$IFn$_invoke$arity$2 = remove_LT___2;
remove_LT_.cljs$core$IFn$_invoke$arity$3 = remove_LT___3;
return remove_LT_;
})()
;
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__6391__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto__){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto__){
return (function (state_15473){var state_val_15474 = (state_15473[(1)]);if((state_val_15474 === (7)))
{var inst_15469 = (state_15473[(2)]);var state_15473__$1 = state_15473;var statearr_15475_15516 = state_15473__$1;(statearr_15475_15516[(2)] = inst_15469);
(statearr_15475_15516[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (20)))
{var inst_15439 = (state_15473[(7)]);var inst_15450 = (state_15473[(2)]);var inst_15451 = cljs.core.next.call(null,inst_15439);var inst_15425 = inst_15451;var inst_15426 = null;var inst_15427 = (0);var inst_15428 = (0);var state_15473__$1 = (function (){var statearr_15476 = state_15473;(statearr_15476[(8)] = inst_15427);
(statearr_15476[(9)] = inst_15426);
(statearr_15476[(10)] = inst_15450);
(statearr_15476[(11)] = inst_15425);
(statearr_15476[(12)] = inst_15428);
return statearr_15476;
})();var statearr_15477_15517 = state_15473__$1;(statearr_15477_15517[(2)] = null);
(statearr_15477_15517[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (1)))
{var state_15473__$1 = state_15473;var statearr_15478_15518 = state_15473__$1;(statearr_15478_15518[(2)] = null);
(statearr_15478_15518[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (4)))
{var inst_15414 = (state_15473[(13)]);var inst_15414__$1 = (state_15473[(2)]);var inst_15415 = (inst_15414__$1 == null);var state_15473__$1 = (function (){var statearr_15479 = state_15473;(statearr_15479[(13)] = inst_15414__$1);
return statearr_15479;
})();if(cljs.core.truth_(inst_15415))
{var statearr_15480_15519 = state_15473__$1;(statearr_15480_15519[(1)] = (5));
} else
{var statearr_15481_15520 = state_15473__$1;(statearr_15481_15520[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (15)))
{var state_15473__$1 = state_15473;var statearr_15485_15521 = state_15473__$1;(statearr_15485_15521[(2)] = null);
(statearr_15485_15521[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (21)))
{var state_15473__$1 = state_15473;var statearr_15486_15522 = state_15473__$1;(statearr_15486_15522[(2)] = null);
(statearr_15486_15522[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (13)))
{var inst_15427 = (state_15473[(8)]);var inst_15426 = (state_15473[(9)]);var inst_15425 = (state_15473[(11)]);var inst_15428 = (state_15473[(12)]);var inst_15435 = (state_15473[(2)]);var inst_15436 = (inst_15428 + (1));var tmp15482 = inst_15427;var tmp15483 = inst_15426;var tmp15484 = inst_15425;var inst_15425__$1 = tmp15484;var inst_15426__$1 = tmp15483;var inst_15427__$1 = tmp15482;var inst_15428__$1 = inst_15436;var state_15473__$1 = (function (){var statearr_15487 = state_15473;(statearr_15487[(8)] = inst_15427__$1);
(statearr_15487[(9)] = inst_15426__$1);
(statearr_15487[(11)] = inst_15425__$1);
(statearr_15487[(12)] = inst_15428__$1);
(statearr_15487[(14)] = inst_15435);
return statearr_15487;
})();var statearr_15488_15523 = state_15473__$1;(statearr_15488_15523[(2)] = null);
(statearr_15488_15523[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (22)))
{var state_15473__$1 = state_15473;var statearr_15489_15524 = state_15473__$1;(statearr_15489_15524[(2)] = null);
(statearr_15489_15524[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (6)))
{var inst_15414 = (state_15473[(13)]);var inst_15423 = f.call(null,inst_15414);var inst_15424 = cljs.core.seq.call(null,inst_15423);var inst_15425 = inst_15424;var inst_15426 = null;var inst_15427 = (0);var inst_15428 = (0);var state_15473__$1 = (function (){var statearr_15490 = state_15473;(statearr_15490[(8)] = inst_15427);
(statearr_15490[(9)] = inst_15426);
(statearr_15490[(11)] = inst_15425);
(statearr_15490[(12)] = inst_15428);
return statearr_15490;
})();var statearr_15491_15525 = state_15473__$1;(statearr_15491_15525[(2)] = null);
(statearr_15491_15525[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (17)))
{var inst_15439 = (state_15473[(7)]);var inst_15443 = cljs.core.chunk_first.call(null,inst_15439);var inst_15444 = cljs.core.chunk_rest.call(null,inst_15439);var inst_15445 = cljs.core.count.call(null,inst_15443);var inst_15425 = inst_15444;var inst_15426 = inst_15443;var inst_15427 = inst_15445;var inst_15428 = (0);var state_15473__$1 = (function (){var statearr_15492 = state_15473;(statearr_15492[(8)] = inst_15427);
(statearr_15492[(9)] = inst_15426);
(statearr_15492[(11)] = inst_15425);
(statearr_15492[(12)] = inst_15428);
return statearr_15492;
})();var statearr_15493_15526 = state_15473__$1;(statearr_15493_15526[(2)] = null);
(statearr_15493_15526[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (3)))
{var inst_15471 = (state_15473[(2)]);var state_15473__$1 = state_15473;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15473__$1,inst_15471);
} else
{if((state_val_15474 === (12)))
{var inst_15459 = (state_15473[(2)]);var state_15473__$1 = state_15473;var statearr_15494_15527 = state_15473__$1;(statearr_15494_15527[(2)] = inst_15459);
(statearr_15494_15527[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (2)))
{var state_15473__$1 = state_15473;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15473__$1,(4),in$);
} else
{if((state_val_15474 === (23)))
{var inst_15467 = (state_15473[(2)]);var state_15473__$1 = state_15473;var statearr_15495_15528 = state_15473__$1;(statearr_15495_15528[(2)] = inst_15467);
(statearr_15495_15528[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (19)))
{var inst_15454 = (state_15473[(2)]);var state_15473__$1 = state_15473;var statearr_15496_15529 = state_15473__$1;(statearr_15496_15529[(2)] = inst_15454);
(statearr_15496_15529[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (11)))
{var inst_15439 = (state_15473[(7)]);var inst_15425 = (state_15473[(11)]);var inst_15439__$1 = cljs.core.seq.call(null,inst_15425);var state_15473__$1 = (function (){var statearr_15497 = state_15473;(statearr_15497[(7)] = inst_15439__$1);
return statearr_15497;
})();if(inst_15439__$1)
{var statearr_15498_15530 = state_15473__$1;(statearr_15498_15530[(1)] = (14));
} else
{var statearr_15499_15531 = state_15473__$1;(statearr_15499_15531[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (9)))
{var inst_15461 = (state_15473[(2)]);var inst_15462 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_15473__$1 = (function (){var statearr_15500 = state_15473;(statearr_15500[(15)] = inst_15461);
return statearr_15500;
})();if(cljs.core.truth_(inst_15462))
{var statearr_15501_15532 = state_15473__$1;(statearr_15501_15532[(1)] = (21));
} else
{var statearr_15502_15533 = state_15473__$1;(statearr_15502_15533[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (5)))
{var inst_15417 = cljs.core.async.close_BANG_.call(null,out);var state_15473__$1 = state_15473;var statearr_15503_15534 = state_15473__$1;(statearr_15503_15534[(2)] = inst_15417);
(statearr_15503_15534[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (14)))
{var inst_15439 = (state_15473[(7)]);var inst_15441 = cljs.core.chunked_seq_QMARK_.call(null,inst_15439);var state_15473__$1 = state_15473;if(inst_15441)
{var statearr_15504_15535 = state_15473__$1;(statearr_15504_15535[(1)] = (17));
} else
{var statearr_15505_15536 = state_15473__$1;(statearr_15505_15536[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (16)))
{var inst_15457 = (state_15473[(2)]);var state_15473__$1 = state_15473;var statearr_15506_15537 = state_15473__$1;(statearr_15506_15537[(2)] = inst_15457);
(statearr_15506_15537[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15474 === (10)))
{var inst_15426 = (state_15473[(9)]);var inst_15428 = (state_15473[(12)]);var inst_15433 = cljs.core._nth.call(null,inst_15426,inst_15428);var state_15473__$1 = state_15473;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15473__$1,(13),out,inst_15433);
} else
{if((state_val_15474 === (18)))
{var inst_15439 = (state_15473[(7)]);var inst_15448 = cljs.core.first.call(null,inst_15439);var state_15473__$1 = state_15473;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15473__$1,(20),out,inst_15448);
} else
{if((state_val_15474 === (8)))
{var inst_15427 = (state_15473[(8)]);var inst_15428 = (state_15473[(12)]);var inst_15430 = (inst_15428 < inst_15427);var inst_15431 = inst_15430;var state_15473__$1 = state_15473;if(cljs.core.truth_(inst_15431))
{var statearr_15507_15538 = state_15473__$1;(statearr_15507_15538[(1)] = (10));
} else
{var statearr_15508_15539 = state_15473__$1;(statearr_15508_15539[(1)] = (11));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto__))
;return ((function (switch__6326__auto__,c__6391__auto__){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15512 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_15512[(0)] = state_machine__6327__auto__);
(statearr_15512[(1)] = (1));
return statearr_15512;
});
var state_machine__6327__auto____1 = (function (state_15473){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15473);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15513){if((e15513 instanceof Object))
{var ex__6330__auto__ = e15513;var statearr_15514_15540 = state_15473;(statearr_15514_15540[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15473);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15513;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15541 = state_15473;
state_15473 = G__15541;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15473){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15473);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto__))
})();var state__6393__auto__ = (function (){var statearr_15515 = f__6392__auto__.call(null);(statearr_15515[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto__);
return statearr_15515;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto__))
);
return c__6391__auto__;
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.mapcat_LT_ = (function() {
var mapcat_LT_ = null;
var mapcat_LT___2 = (function (f,in$){return mapcat_LT_.call(null,f,in$,null);
});
var mapcat_LT___3 = (function (f,in$,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return out;
});
mapcat_LT_ = function(f,in$,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_LT___2.call(this,f,in$);
case 3:
return mapcat_LT___3.call(this,f,in$,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = mapcat_LT___2;
mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = mapcat_LT___3;
return mapcat_LT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.mapcat_GT_ = (function() {
var mapcat_GT_ = null;
var mapcat_GT___2 = (function (f,out){return mapcat_GT_.call(null,f,out,null);
});
var mapcat_GT___3 = (function (f,out,buf_or_n){var in$ = cljs.core.async.chan.call(null,buf_or_n);cljs.core.async.mapcat_STAR_.call(null,f,in$,out);
return in$;
});
mapcat_GT_ = function(f,out,buf_or_n){
switch(arguments.length){
case 2:
return mapcat_GT___2.call(this,f,out);
case 3:
return mapcat_GT___3.call(this,f,out,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = mapcat_GT___2;
mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = mapcat_GT___3;
return mapcat_GT_;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.unique = (function() {
var unique = null;
var unique__1 = (function (ch){return unique.call(null,ch,null);
});
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15638 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15638,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15638,out){
return (function (state_15613){var state_val_15614 = (state_15613[(1)]);if((state_val_15614 === (7)))
{var inst_15608 = (state_15613[(2)]);var state_15613__$1 = state_15613;var statearr_15615_15639 = state_15613__$1;(statearr_15615_15639[(2)] = inst_15608);
(statearr_15615_15639[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (1)))
{var inst_15590 = null;var state_15613__$1 = (function (){var statearr_15616 = state_15613;(statearr_15616[(7)] = inst_15590);
return statearr_15616;
})();var statearr_15617_15640 = state_15613__$1;(statearr_15617_15640[(2)] = null);
(statearr_15617_15640[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (4)))
{var inst_15593 = (state_15613[(8)]);var inst_15593__$1 = (state_15613[(2)]);var inst_15594 = (inst_15593__$1 == null);var inst_15595 = cljs.core.not.call(null,inst_15594);var state_15613__$1 = (function (){var statearr_15618 = state_15613;(statearr_15618[(8)] = inst_15593__$1);
return statearr_15618;
})();if(inst_15595)
{var statearr_15619_15641 = state_15613__$1;(statearr_15619_15641[(1)] = (5));
} else
{var statearr_15620_15642 = state_15613__$1;(statearr_15620_15642[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (6)))
{var state_15613__$1 = state_15613;var statearr_15621_15643 = state_15613__$1;(statearr_15621_15643[(2)] = null);
(statearr_15621_15643[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (3)))
{var inst_15610 = (state_15613[(2)]);var inst_15611 = cljs.core.async.close_BANG_.call(null,out);var state_15613__$1 = (function (){var statearr_15622 = state_15613;(statearr_15622[(9)] = inst_15610);
return statearr_15622;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15613__$1,inst_15611);
} else
{if((state_val_15614 === (2)))
{var state_15613__$1 = state_15613;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15613__$1,(4),ch);
} else
{if((state_val_15614 === (11)))
{var inst_15593 = (state_15613[(8)]);var inst_15602 = (state_15613[(2)]);var inst_15590 = inst_15593;var state_15613__$1 = (function (){var statearr_15623 = state_15613;(statearr_15623[(7)] = inst_15590);
(statearr_15623[(10)] = inst_15602);
return statearr_15623;
})();var statearr_15624_15644 = state_15613__$1;(statearr_15624_15644[(2)] = null);
(statearr_15624_15644[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (9)))
{var inst_15593 = (state_15613[(8)]);var state_15613__$1 = state_15613;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15613__$1,(11),out,inst_15593);
} else
{if((state_val_15614 === (5)))
{var inst_15593 = (state_15613[(8)]);var inst_15590 = (state_15613[(7)]);var inst_15597 = cljs.core._EQ_.call(null,inst_15593,inst_15590);var state_15613__$1 = state_15613;if(inst_15597)
{var statearr_15626_15645 = state_15613__$1;(statearr_15626_15645[(1)] = (8));
} else
{var statearr_15627_15646 = state_15613__$1;(statearr_15627_15646[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (10)))
{var inst_15605 = (state_15613[(2)]);var state_15613__$1 = state_15613;var statearr_15628_15647 = state_15613__$1;(statearr_15628_15647[(2)] = inst_15605);
(statearr_15628_15647[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15614 === (8)))
{var inst_15590 = (state_15613[(7)]);var tmp15625 = inst_15590;var inst_15590__$1 = tmp15625;var state_15613__$1 = (function (){var statearr_15629 = state_15613;(statearr_15629[(7)] = inst_15590__$1);
return statearr_15629;
})();var statearr_15630_15648 = state_15613__$1;(statearr_15630_15648[(2)] = null);
(statearr_15630_15648[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15638,out))
;return ((function (switch__6326__auto__,c__6391__auto___15638,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15634 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_15634[(0)] = state_machine__6327__auto__);
(statearr_15634[(1)] = (1));
return statearr_15634;
});
var state_machine__6327__auto____1 = (function (state_15613){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15613);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15635){if((e15635 instanceof Object))
{var ex__6330__auto__ = e15635;var statearr_15636_15649 = state_15613;(statearr_15636_15649[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15613);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15635;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15650 = state_15613;
state_15613 = G__15650;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15613){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15613);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15638,out))
})();var state__6393__auto__ = (function (){var statearr_15637 = f__6392__auto__.call(null);(statearr_15637[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15638);
return statearr_15637;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15638,out))
);
return out;
});
unique = function(ch,buf_or_n){
switch(arguments.length){
case 1:
return unique__1.call(this,ch);
case 2:
return unique__2.call(this,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
unique.cljs$core$IFn$_invoke$arity$1 = unique__1;
unique.cljs$core$IFn$_invoke$arity$2 = unique__2;
return unique;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.partition = (function() {
var partition = null;
var partition__2 = (function (n,ch){return partition.call(null,n,ch,null);
});
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15785 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15785,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15785,out){
return (function (state_15755){var state_val_15756 = (state_15755[(1)]);if((state_val_15756 === (7)))
{var inst_15751 = (state_15755[(2)]);var state_15755__$1 = state_15755;var statearr_15757_15786 = state_15755__$1;(statearr_15757_15786[(2)] = inst_15751);
(statearr_15757_15786[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (1)))
{var inst_15718 = (new Array(n));var inst_15719 = inst_15718;var inst_15720 = (0);var state_15755__$1 = (function (){var statearr_15758 = state_15755;(statearr_15758[(7)] = inst_15719);
(statearr_15758[(8)] = inst_15720);
return statearr_15758;
})();var statearr_15759_15787 = state_15755__$1;(statearr_15759_15787[(2)] = null);
(statearr_15759_15787[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (4)))
{var inst_15723 = (state_15755[(9)]);var inst_15723__$1 = (state_15755[(2)]);var inst_15724 = (inst_15723__$1 == null);var inst_15725 = cljs.core.not.call(null,inst_15724);var state_15755__$1 = (function (){var statearr_15760 = state_15755;(statearr_15760[(9)] = inst_15723__$1);
return statearr_15760;
})();if(inst_15725)
{var statearr_15761_15788 = state_15755__$1;(statearr_15761_15788[(1)] = (5));
} else
{var statearr_15762_15789 = state_15755__$1;(statearr_15762_15789[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (15)))
{var inst_15745 = (state_15755[(2)]);var state_15755__$1 = state_15755;var statearr_15763_15790 = state_15755__$1;(statearr_15763_15790[(2)] = inst_15745);
(statearr_15763_15790[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (13)))
{var state_15755__$1 = state_15755;var statearr_15764_15791 = state_15755__$1;(statearr_15764_15791[(2)] = null);
(statearr_15764_15791[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (6)))
{var inst_15720 = (state_15755[(8)]);var inst_15741 = (inst_15720 > (0));var state_15755__$1 = state_15755;if(cljs.core.truth_(inst_15741))
{var statearr_15765_15792 = state_15755__$1;(statearr_15765_15792[(1)] = (12));
} else
{var statearr_15766_15793 = state_15755__$1;(statearr_15766_15793[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (3)))
{var inst_15753 = (state_15755[(2)]);var state_15755__$1 = state_15755;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15755__$1,inst_15753);
} else
{if((state_val_15756 === (12)))
{var inst_15719 = (state_15755[(7)]);var inst_15743 = cljs.core.vec.call(null,inst_15719);var state_15755__$1 = state_15755;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15755__$1,(15),out,inst_15743);
} else
{if((state_val_15756 === (2)))
{var state_15755__$1 = state_15755;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15755__$1,(4),ch);
} else
{if((state_val_15756 === (11)))
{var inst_15735 = (state_15755[(2)]);var inst_15736 = (new Array(n));var inst_15719 = inst_15736;var inst_15720 = (0);var state_15755__$1 = (function (){var statearr_15767 = state_15755;(statearr_15767[(7)] = inst_15719);
(statearr_15767[(10)] = inst_15735);
(statearr_15767[(8)] = inst_15720);
return statearr_15767;
})();var statearr_15768_15794 = state_15755__$1;(statearr_15768_15794[(2)] = null);
(statearr_15768_15794[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (9)))
{var inst_15719 = (state_15755[(7)]);var inst_15733 = cljs.core.vec.call(null,inst_15719);var state_15755__$1 = state_15755;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15755__$1,(11),out,inst_15733);
} else
{if((state_val_15756 === (5)))
{var inst_15723 = (state_15755[(9)]);var inst_15719 = (state_15755[(7)]);var inst_15728 = (state_15755[(11)]);var inst_15720 = (state_15755[(8)]);var inst_15727 = (inst_15719[inst_15720] = inst_15723);var inst_15728__$1 = (inst_15720 + (1));var inst_15729 = (inst_15728__$1 < n);var state_15755__$1 = (function (){var statearr_15769 = state_15755;(statearr_15769[(11)] = inst_15728__$1);
(statearr_15769[(12)] = inst_15727);
return statearr_15769;
})();if(cljs.core.truth_(inst_15729))
{var statearr_15770_15795 = state_15755__$1;(statearr_15770_15795[(1)] = (8));
} else
{var statearr_15771_15796 = state_15755__$1;(statearr_15771_15796[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (14)))
{var inst_15748 = (state_15755[(2)]);var inst_15749 = cljs.core.async.close_BANG_.call(null,out);var state_15755__$1 = (function (){var statearr_15773 = state_15755;(statearr_15773[(13)] = inst_15748);
return statearr_15773;
})();var statearr_15774_15797 = state_15755__$1;(statearr_15774_15797[(2)] = inst_15749);
(statearr_15774_15797[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (10)))
{var inst_15739 = (state_15755[(2)]);var state_15755__$1 = state_15755;var statearr_15775_15798 = state_15755__$1;(statearr_15775_15798[(2)] = inst_15739);
(statearr_15775_15798[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15756 === (8)))
{var inst_15719 = (state_15755[(7)]);var inst_15728 = (state_15755[(11)]);var tmp15772 = inst_15719;var inst_15719__$1 = tmp15772;var inst_15720 = inst_15728;var state_15755__$1 = (function (){var statearr_15776 = state_15755;(statearr_15776[(7)] = inst_15719__$1);
(statearr_15776[(8)] = inst_15720);
return statearr_15776;
})();var statearr_15777_15799 = state_15755__$1;(statearr_15777_15799[(2)] = null);
(statearr_15777_15799[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15785,out))
;return ((function (switch__6326__auto__,c__6391__auto___15785,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15781 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_15781[(0)] = state_machine__6327__auto__);
(statearr_15781[(1)] = (1));
return statearr_15781;
});
var state_machine__6327__auto____1 = (function (state_15755){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15755);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15782){if((e15782 instanceof Object))
{var ex__6330__auto__ = e15782;var statearr_15783_15800 = state_15755;(statearr_15783_15800[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15755);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15782;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15801 = state_15755;
state_15755 = G__15801;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15755){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15755);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15785,out))
})();var state__6393__auto__ = (function (){var statearr_15784 = f__6392__auto__.call(null);(statearr_15784[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15785);
return statearr_15784;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15785,out))
);
return out;
});
partition = function(n,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition__2.call(this,n,ch);
case 3:
return partition__3.call(this,n,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition.cljs$core$IFn$_invoke$arity$2 = partition__2;
partition.cljs$core$IFn$_invoke$arity$3 = partition__3;
return partition;
})()
;
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.partition_by = (function() {
var partition_by = null;
var partition_by__2 = (function (f,ch){return partition_by.call(null,f,ch,null);
});
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__6391__auto___15944 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__6391__auto___15944,out){
return (function (){var f__6392__auto__ = (function (){var switch__6326__auto__ = ((function (c__6391__auto___15944,out){
return (function (state_15914){var state_val_15915 = (state_15914[(1)]);if((state_val_15915 === (7)))
{var inst_15910 = (state_15914[(2)]);var state_15914__$1 = state_15914;var statearr_15916_15945 = state_15914__$1;(statearr_15916_15945[(2)] = inst_15910);
(statearr_15916_15945[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (1)))
{var inst_15873 = [];var inst_15874 = inst_15873;var inst_15875 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_15914__$1 = (function (){var statearr_15917 = state_15914;(statearr_15917[(7)] = inst_15875);
(statearr_15917[(8)] = inst_15874);
return statearr_15917;
})();var statearr_15918_15946 = state_15914__$1;(statearr_15918_15946[(2)] = null);
(statearr_15918_15946[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (4)))
{var inst_15878 = (state_15914[(9)]);var inst_15878__$1 = (state_15914[(2)]);var inst_15879 = (inst_15878__$1 == null);var inst_15880 = cljs.core.not.call(null,inst_15879);var state_15914__$1 = (function (){var statearr_15919 = state_15914;(statearr_15919[(9)] = inst_15878__$1);
return statearr_15919;
})();if(inst_15880)
{var statearr_15920_15947 = state_15914__$1;(statearr_15920_15947[(1)] = (5));
} else
{var statearr_15921_15948 = state_15914__$1;(statearr_15921_15948[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (15)))
{var inst_15904 = (state_15914[(2)]);var state_15914__$1 = state_15914;var statearr_15922_15949 = state_15914__$1;(statearr_15922_15949[(2)] = inst_15904);
(statearr_15922_15949[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (13)))
{var state_15914__$1 = state_15914;var statearr_15923_15950 = state_15914__$1;(statearr_15923_15950[(2)] = null);
(statearr_15923_15950[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (6)))
{var inst_15874 = (state_15914[(8)]);var inst_15899 = inst_15874.length;var inst_15900 = (inst_15899 > (0));var state_15914__$1 = state_15914;if(cljs.core.truth_(inst_15900))
{var statearr_15924_15951 = state_15914__$1;(statearr_15924_15951[(1)] = (12));
} else
{var statearr_15925_15952 = state_15914__$1;(statearr_15925_15952[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (3)))
{var inst_15912 = (state_15914[(2)]);var state_15914__$1 = state_15914;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15914__$1,inst_15912);
} else
{if((state_val_15915 === (12)))
{var inst_15874 = (state_15914[(8)]);var inst_15902 = cljs.core.vec.call(null,inst_15874);var state_15914__$1 = state_15914;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15914__$1,(15),out,inst_15902);
} else
{if((state_val_15915 === (2)))
{var state_15914__$1 = state_15914;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15914__$1,(4),ch);
} else
{if((state_val_15915 === (11)))
{var inst_15878 = (state_15914[(9)]);var inst_15882 = (state_15914[(10)]);var inst_15892 = (state_15914[(2)]);var inst_15893 = [];var inst_15894 = inst_15893.push(inst_15878);var inst_15874 = inst_15893;var inst_15875 = inst_15882;var state_15914__$1 = (function (){var statearr_15926 = state_15914;(statearr_15926[(7)] = inst_15875);
(statearr_15926[(11)] = inst_15892);
(statearr_15926[(12)] = inst_15894);
(statearr_15926[(8)] = inst_15874);
return statearr_15926;
})();var statearr_15927_15953 = state_15914__$1;(statearr_15927_15953[(2)] = null);
(statearr_15927_15953[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (9)))
{var inst_15874 = (state_15914[(8)]);var inst_15890 = cljs.core.vec.call(null,inst_15874);var state_15914__$1 = state_15914;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15914__$1,(11),out,inst_15890);
} else
{if((state_val_15915 === (5)))
{var inst_15878 = (state_15914[(9)]);var inst_15875 = (state_15914[(7)]);var inst_15882 = (state_15914[(10)]);var inst_15882__$1 = f.call(null,inst_15878);var inst_15883 = cljs.core._EQ_.call(null,inst_15882__$1,inst_15875);var inst_15884 = cljs.core.keyword_identical_QMARK_.call(null,inst_15875,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_15885 = (inst_15883) || (inst_15884);var state_15914__$1 = (function (){var statearr_15928 = state_15914;(statearr_15928[(10)] = inst_15882__$1);
return statearr_15928;
})();if(cljs.core.truth_(inst_15885))
{var statearr_15929_15954 = state_15914__$1;(statearr_15929_15954[(1)] = (8));
} else
{var statearr_15930_15955 = state_15914__$1;(statearr_15930_15955[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (14)))
{var inst_15907 = (state_15914[(2)]);var inst_15908 = cljs.core.async.close_BANG_.call(null,out);var state_15914__$1 = (function (){var statearr_15932 = state_15914;(statearr_15932[(13)] = inst_15907);
return statearr_15932;
})();var statearr_15933_15956 = state_15914__$1;(statearr_15933_15956[(2)] = inst_15908);
(statearr_15933_15956[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (10)))
{var inst_15897 = (state_15914[(2)]);var state_15914__$1 = state_15914;var statearr_15934_15957 = state_15914__$1;(statearr_15934_15957[(2)] = inst_15897);
(statearr_15934_15957[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15915 === (8)))
{var inst_15878 = (state_15914[(9)]);var inst_15882 = (state_15914[(10)]);var inst_15874 = (state_15914[(8)]);var inst_15887 = inst_15874.push(inst_15878);var tmp15931 = inst_15874;var inst_15874__$1 = tmp15931;var inst_15875 = inst_15882;var state_15914__$1 = (function (){var statearr_15935 = state_15914;(statearr_15935[(14)] = inst_15887);
(statearr_15935[(7)] = inst_15875);
(statearr_15935[(8)] = inst_15874__$1);
return statearr_15935;
})();var statearr_15936_15958 = state_15914__$1;(statearr_15936_15958[(2)] = null);
(statearr_15936_15958[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__6391__auto___15944,out))
;return ((function (switch__6326__auto__,c__6391__auto___15944,out){
return (function() {
var state_machine__6327__auto__ = null;
var state_machine__6327__auto____0 = (function (){var statearr_15940 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_15940[(0)] = state_machine__6327__auto__);
(statearr_15940[(1)] = (1));
return statearr_15940;
});
var state_machine__6327__auto____1 = (function (state_15914){while(true){
var ret_value__6328__auto__ = (function (){try{while(true){
var result__6329__auto__ = switch__6326__auto__.call(null,state_15914);if(cljs.core.keyword_identical_QMARK_.call(null,result__6329__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__6329__auto__;
}
break;
}
}catch (e15941){if((e15941 instanceof Object))
{var ex__6330__auto__ = e15941;var statearr_15942_15959 = state_15914;(statearr_15942_15959[(5)] = ex__6330__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15914);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15941;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__6328__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15960 = state_15914;
state_15914 = G__15960;
continue;
}
} else
{return ret_value__6328__auto__;
}
break;
}
});
state_machine__6327__auto__ = function(state_15914){
switch(arguments.length){
case 0:
return state_machine__6327__auto____0.call(this);
case 1:
return state_machine__6327__auto____1.call(this,state_15914);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__6327__auto____0;
state_machine__6327__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__6327__auto____1;
return state_machine__6327__auto__;
})()
;})(switch__6326__auto__,c__6391__auto___15944,out))
})();var state__6393__auto__ = (function (){var statearr_15943 = f__6392__auto__.call(null);(statearr_15943[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__6391__auto___15944);
return statearr_15943;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__6393__auto__);
});})(c__6391__auto___15944,out))
);
return out;
});
partition_by = function(f,ch,buf_or_n){
switch(arguments.length){
case 2:
return partition_by__2.call(this,f,ch);
case 3:
return partition_by__3.call(this,f,ch,buf_or_n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
partition_by.cljs$core$IFn$_invoke$arity$2 = partition_by__2;
partition_by.cljs$core$IFn$_invoke$arity$3 = partition_by__3;
return partition_by;
})()
;
