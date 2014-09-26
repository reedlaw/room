// Compiled by ClojureScript 0.0-2342
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
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t11473 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11473 = (function (f,fn_handler,meta11474){
this.f = f;
this.fn_handler = fn_handler;
this.meta11474 = meta11474;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11473.cljs$lang$type = true;
cljs.core.async.t11473.cljs$lang$ctorStr = "cljs.core.async/t11473";
cljs.core.async.t11473.cljs$lang$ctorPrWriter = (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t11473");
});
cljs.core.async.t11473.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11473.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t11473.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t11473.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11475){var self__ = this;
var _11475__$1 = this;return self__.meta11474;
});
cljs.core.async.t11473.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11475,meta11474__$1){var self__ = this;
var _11475__$1 = this;return (new cljs.core.async.t11473(self__.f,self__.fn_handler,meta11474__$1));
});
cljs.core.async.__GT_t11473 = (function __GT_t11473(f__$1,fn_handler__$1,meta11474){return (new cljs.core.async.t11473(f__$1,fn_handler__$1,meta11474));
});
}
return (new cljs.core.async.t11473(f,fn_handler,null));
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
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__11477 = buff;if(G__11477)
{var bit__4287__auto__ = null;if(cljs.core.truth_((function (){var or__3624__auto__ = bit__4287__auto__;if(cljs.core.truth_(or__3624__auto__))
{return or__3624__auto__;
} else
{return G__11477.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__11477.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11477);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11477);
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
{var val_11478 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_11478);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_11478,ret){
return (function (){return fn1.call(null,val_11478);
});})(val_11478,ret))
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
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4493__auto___11479 = n;var x_11480 = (0);while(true){
if((x_11480 < n__4493__auto___11479))
{(a[x_11480] = (0));
{
var G__11481 = (x_11480 + (1));
x_11480 = G__11481;
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
var G__11482 = (i + (1));
i = G__11482;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t11486 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11486 = (function (flag,alt_flag,meta11487){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta11487 = meta11487;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11486.cljs$lang$type = true;
cljs.core.async.t11486.cljs$lang$ctorStr = "cljs.core.async/t11486";
cljs.core.async.t11486.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t11486");
});})(flag))
;
cljs.core.async.t11486.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11486.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t11486.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t11486.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_11488){var self__ = this;
var _11488__$1 = this;return self__.meta11487;
});})(flag))
;
cljs.core.async.t11486.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_11488,meta11487__$1){var self__ = this;
var _11488__$1 = this;return (new cljs.core.async.t11486(self__.flag,self__.alt_flag,meta11487__$1));
});})(flag))
;
cljs.core.async.__GT_t11486 = ((function (flag){
return (function __GT_t11486(flag__$1,alt_flag__$1,meta11487){return (new cljs.core.async.t11486(flag__$1,alt_flag__$1,meta11487));
});})(flag))
;
}
return (new cljs.core.async.t11486(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t11492 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11492 = (function (cb,flag,alt_handler,meta11493){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta11493 = meta11493;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11492.cljs$lang$type = true;
cljs.core.async.t11492.cljs$lang$ctorStr = "cljs.core.async/t11492";
cljs.core.async.t11492.cljs$lang$ctorPrWriter = (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t11492");
});
cljs.core.async.t11492.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11492.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t11492.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t11492.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11494){var self__ = this;
var _11494__$1 = this;return self__.meta11493;
});
cljs.core.async.t11492.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11494,meta11493__$1){var self__ = this;
var _11494__$1 = this;return (new cljs.core.async.t11492(self__.cb,self__.flag,self__.alt_handler,meta11493__$1));
});
cljs.core.async.__GT_t11492 = (function __GT_t11492(cb__$1,flag__$1,alt_handler__$1,meta11493){return (new cljs.core.async.t11492(cb__$1,flag__$1,alt_handler__$1,meta11493));
});
}
return (new cljs.core.async.t11492(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11495_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11495_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11496_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11496_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3624__auto__ = wport;if(cljs.core.truth_(or__3624__auto__))
{return or__3624__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__11497 = (i + (1));
i = G__11497;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3624__auto__ = ret;if(cljs.core.truth_(or__3624__auto__))
{return or__3624__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__3612__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3612__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3612__auto__;
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
var alts_BANG___delegate = function (ports,p__11498){var map__11500 = p__11498;var map__11500__$1 = ((cljs.core.seq_QMARK_.call(null,map__11500))?cljs.core.apply.call(null,cljs.core.hash_map,map__11500):map__11500);var opts = map__11500__$1;throw (new Error("alts! used not in (go ...) block"));
};
var alts_BANG_ = function (ports,var_args){
var p__11498 = null;if (arguments.length > 1) {
  p__11498 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__11498);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__11501){
var ports = cljs.core.first(arglist__11501);
var p__11498 = cljs.core.rest(arglist__11501);
return alts_BANG___delegate(ports,p__11498);
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
var pipe__3 = (function (from,to,close_QMARK_){var c__5806__auto___11596 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___11596){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___11596){
return (function (state_11572){var state_val_11573 = (state_11572[(1)]);if((state_val_11573 === (7)))
{var inst_11568 = (state_11572[(2)]);var state_11572__$1 = state_11572;var statearr_11574_11597 = state_11572__$1;(statearr_11574_11597[(2)] = inst_11568);
(statearr_11574_11597[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (1)))
{var state_11572__$1 = state_11572;var statearr_11575_11598 = state_11572__$1;(statearr_11575_11598[(2)] = null);
(statearr_11575_11598[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (4)))
{var inst_11551 = (state_11572[(7)]);var inst_11551__$1 = (state_11572[(2)]);var inst_11552 = (inst_11551__$1 == null);var state_11572__$1 = (function (){var statearr_11576 = state_11572;(statearr_11576[(7)] = inst_11551__$1);
return statearr_11576;
})();if(cljs.core.truth_(inst_11552))
{var statearr_11577_11599 = state_11572__$1;(statearr_11577_11599[(1)] = (5));
} else
{var statearr_11578_11600 = state_11572__$1;(statearr_11578_11600[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (13)))
{var state_11572__$1 = state_11572;var statearr_11579_11601 = state_11572__$1;(statearr_11579_11601[(2)] = null);
(statearr_11579_11601[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (6)))
{var inst_11551 = (state_11572[(7)]);var state_11572__$1 = state_11572;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11572__$1,(11),to,inst_11551);
} else
{if((state_val_11573 === (3)))
{var inst_11570 = (state_11572[(2)]);var state_11572__$1 = state_11572;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11572__$1,inst_11570);
} else
{if((state_val_11573 === (12)))
{var state_11572__$1 = state_11572;var statearr_11580_11602 = state_11572__$1;(statearr_11580_11602[(2)] = null);
(statearr_11580_11602[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (2)))
{var state_11572__$1 = state_11572;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11572__$1,(4),from);
} else
{if((state_val_11573 === (11)))
{var inst_11561 = (state_11572[(2)]);var state_11572__$1 = state_11572;if(cljs.core.truth_(inst_11561))
{var statearr_11581_11603 = state_11572__$1;(statearr_11581_11603[(1)] = (12));
} else
{var statearr_11582_11604 = state_11572__$1;(statearr_11582_11604[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (9)))
{var state_11572__$1 = state_11572;var statearr_11583_11605 = state_11572__$1;(statearr_11583_11605[(2)] = null);
(statearr_11583_11605[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (5)))
{var state_11572__$1 = state_11572;if(cljs.core.truth_(close_QMARK_))
{var statearr_11584_11606 = state_11572__$1;(statearr_11584_11606[(1)] = (8));
} else
{var statearr_11585_11607 = state_11572__$1;(statearr_11585_11607[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (14)))
{var inst_11566 = (state_11572[(2)]);var state_11572__$1 = state_11572;var statearr_11586_11608 = state_11572__$1;(statearr_11586_11608[(2)] = inst_11566);
(statearr_11586_11608[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (10)))
{var inst_11558 = (state_11572[(2)]);var state_11572__$1 = state_11572;var statearr_11587_11609 = state_11572__$1;(statearr_11587_11609[(2)] = inst_11558);
(statearr_11587_11609[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11573 === (8)))
{var inst_11555 = cljs.core.async.close_BANG_.call(null,to);var state_11572__$1 = state_11572;var statearr_11588_11610 = state_11572__$1;(statearr_11588_11610[(2)] = inst_11555);
(statearr_11588_11610[(1)] = (10));
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
});})(c__5806__auto___11596))
;return ((function (switch__5791__auto__,c__5806__auto___11596){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11592 = [null,null,null,null,null,null,null,null];(statearr_11592[(0)] = state_machine__5792__auto__);
(statearr_11592[(1)] = (1));
return statearr_11592;
});
var state_machine__5792__auto____1 = (function (state_11572){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11572);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11593){if((e11593 instanceof Object))
{var ex__5795__auto__ = e11593;var statearr_11594_11611 = state_11572;(statearr_11594_11611[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11572);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11593;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__11612 = state_11572;
state_11572 = G__11612;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11572){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11572);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___11596))
})();var state__5808__auto__ = (function (){var statearr_11595 = f__5807__auto__.call(null);(statearr_11595[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___11596);
return statearr_11595;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___11596))
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
return (function (p__11796){var vec__11797 = p__11796;var v = cljs.core.nth.call(null,vec__11797,(0),null);var p = cljs.core.nth.call(null,vec__11797,(1),null);var job = vec__11797;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);var c__5806__auto___11979 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results){
return (function (state_11802){var state_val_11803 = (state_11802[(1)]);if((state_val_11803 === (2)))
{var inst_11799 = (state_11802[(2)]);var inst_11800 = cljs.core.async.close_BANG_.call(null,res);var state_11802__$1 = (function (){var statearr_11804 = state_11802;(statearr_11804[(7)] = inst_11799);
return statearr_11804;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11802__$1,inst_11800);
} else
{if((state_val_11803 === (1)))
{var state_11802__$1 = state_11802;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11802__$1,(2),res,v);
} else
{return null;
}
}
});})(c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results))
;return ((function (switch__5791__auto__,c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11808 = [null,null,null,null,null,null,null,null];(statearr_11808[(0)] = state_machine__5792__auto__);
(statearr_11808[(1)] = (1));
return statearr_11808;
});
var state_machine__5792__auto____1 = (function (state_11802){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11802);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11809){if((e11809 instanceof Object))
{var ex__5795__auto__ = e11809;var statearr_11810_11980 = state_11802;(statearr_11810_11980[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11802);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11809;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__11981 = state_11802;
state_11802 = G__11981;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11802){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11802);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results))
})();var state__5808__auto__ = (function (){var statearr_11811 = f__5807__auto__.call(null);(statearr_11811[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___11979);
return statearr_11811;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___11979,res,vec__11797,v,p,job,jobs,results))
);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results))
;var async = ((function (jobs,results,process){
return (function (p__11812){var vec__11813 = p__11812;var v = cljs.core.nth.call(null,vec__11813,(0),null);var p = cljs.core.nth.call(null,vec__11813,(1),null);var job = vec__11813;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1));xf.call(null,v,res);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results,process))
;var n__4493__auto___11982 = n;var __11983 = (0);while(true){
if((__11983 < n__4493__auto___11982))
{var G__11814_11984 = (((type instanceof cljs.core.Keyword))?type.fqn:null);switch (G__11814_11984) {
case "async":
var c__5806__auto___11986 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__11983,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (__11983,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function (state_11827){var state_val_11828 = (state_11827[(1)]);if((state_val_11828 === (7)))
{var inst_11823 = (state_11827[(2)]);var state_11827__$1 = state_11827;var statearr_11829_11987 = state_11827__$1;(statearr_11829_11987[(2)] = inst_11823);
(statearr_11829_11987[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11828 === (6)))
{var state_11827__$1 = state_11827;var statearr_11830_11988 = state_11827__$1;(statearr_11830_11988[(2)] = null);
(statearr_11830_11988[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11828 === (5)))
{var state_11827__$1 = state_11827;var statearr_11831_11989 = state_11827__$1;(statearr_11831_11989[(2)] = null);
(statearr_11831_11989[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11828 === (4)))
{var inst_11817 = (state_11827[(2)]);var inst_11818 = async.call(null,inst_11817);var state_11827__$1 = state_11827;if(cljs.core.truth_(inst_11818))
{var statearr_11832_11990 = state_11827__$1;(statearr_11832_11990[(1)] = (5));
} else
{var statearr_11833_11991 = state_11827__$1;(statearr_11833_11991[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11828 === (3)))
{var inst_11825 = (state_11827[(2)]);var state_11827__$1 = state_11827;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11827__$1,inst_11825);
} else
{if((state_val_11828 === (2)))
{var state_11827__$1 = state_11827;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11827__$1,(4),jobs);
} else
{if((state_val_11828 === (1)))
{var state_11827__$1 = state_11827;var statearr_11834_11992 = state_11827__$1;(statearr_11834_11992[(2)] = null);
(statearr_11834_11992[(1)] = (2));
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
});})(__11983,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
;return ((function (__11983,switch__5791__auto__,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11838 = [null,null,null,null,null,null,null];(statearr_11838[(0)] = state_machine__5792__auto__);
(statearr_11838[(1)] = (1));
return statearr_11838;
});
var state_machine__5792__auto____1 = (function (state_11827){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11827);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11839){if((e11839 instanceof Object))
{var ex__5795__auto__ = e11839;var statearr_11840_11993 = state_11827;(statearr_11840_11993[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11827);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11839;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__11994 = state_11827;
state_11827 = G__11994;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11827){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11827);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(__11983,switch__5791__auto__,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
})();var state__5808__auto__ = (function (){var statearr_11841 = f__5807__auto__.call(null);(statearr_11841[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___11986);
return statearr_11841;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(__11983,c__5806__auto___11986,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
);

break;
case "compute":
var c__5806__auto___11995 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__11983,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (__11983,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function (state_11854){var state_val_11855 = (state_11854[(1)]);if((state_val_11855 === (7)))
{var inst_11850 = (state_11854[(2)]);var state_11854__$1 = state_11854;var statearr_11856_11996 = state_11854__$1;(statearr_11856_11996[(2)] = inst_11850);
(statearr_11856_11996[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11855 === (6)))
{var state_11854__$1 = state_11854;var statearr_11857_11997 = state_11854__$1;(statearr_11857_11997[(2)] = null);
(statearr_11857_11997[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11855 === (5)))
{var state_11854__$1 = state_11854;var statearr_11858_11998 = state_11854__$1;(statearr_11858_11998[(2)] = null);
(statearr_11858_11998[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11855 === (4)))
{var inst_11844 = (state_11854[(2)]);var inst_11845 = process.call(null,inst_11844);var state_11854__$1 = state_11854;if(cljs.core.truth_(inst_11845))
{var statearr_11859_11999 = state_11854__$1;(statearr_11859_11999[(1)] = (5));
} else
{var statearr_11860_12000 = state_11854__$1;(statearr_11860_12000[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11855 === (3)))
{var inst_11852 = (state_11854[(2)]);var state_11854__$1 = state_11854;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11854__$1,inst_11852);
} else
{if((state_val_11855 === (2)))
{var state_11854__$1 = state_11854;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11854__$1,(4),jobs);
} else
{if((state_val_11855 === (1)))
{var state_11854__$1 = state_11854;var statearr_11861_12001 = state_11854__$1;(statearr_11861_12001[(2)] = null);
(statearr_11861_12001[(1)] = (2));
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
});})(__11983,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
;return ((function (__11983,switch__5791__auto__,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11865 = [null,null,null,null,null,null,null];(statearr_11865[(0)] = state_machine__5792__auto__);
(statearr_11865[(1)] = (1));
return statearr_11865;
});
var state_machine__5792__auto____1 = (function (state_11854){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11854);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11866){if((e11866 instanceof Object))
{var ex__5795__auto__ = e11866;var statearr_11867_12002 = state_11854;(statearr_11867_12002[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11854);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11866;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12003 = state_11854;
state_11854 = G__12003;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11854){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11854);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(__11983,switch__5791__auto__,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
})();var state__5808__auto__ = (function (){var statearr_11868 = f__5807__auto__.call(null);(statearr_11868[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___11995);
return statearr_11868;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(__11983,c__5806__auto___11995,G__11814_11984,n__4493__auto___11982,jobs,results,process,async))
);

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type))));

}
{
var G__12004 = (__11983 + (1));
__11983 = G__12004;
continue;
}
} else
{}
break;
}
var c__5806__auto___12005 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___12005,jobs,results,process,async){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___12005,jobs,results,process,async){
return (function (state_11890){var state_val_11891 = (state_11890[(1)]);if((state_val_11891 === (9)))
{var inst_11883 = (state_11890[(2)]);var state_11890__$1 = (function (){var statearr_11892 = state_11890;(statearr_11892[(7)] = inst_11883);
return statearr_11892;
})();var statearr_11893_12006 = state_11890__$1;(statearr_11893_12006[(2)] = null);
(statearr_11893_12006[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11891 === (8)))
{var inst_11876 = (state_11890[(8)]);var inst_11881 = (state_11890[(2)]);var state_11890__$1 = (function (){var statearr_11894 = state_11890;(statearr_11894[(9)] = inst_11881);
return statearr_11894;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11890__$1,(9),results,inst_11876);
} else
{if((state_val_11891 === (7)))
{var inst_11886 = (state_11890[(2)]);var state_11890__$1 = state_11890;var statearr_11895_12007 = state_11890__$1;(statearr_11895_12007[(2)] = inst_11886);
(statearr_11895_12007[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11891 === (6)))
{var inst_11876 = (state_11890[(8)]);var inst_11871 = (state_11890[(10)]);var inst_11876__$1 = cljs.core.async.chan.call(null,(1));var inst_11877 = cljs.core.PersistentVector.EMPTY_NODE;var inst_11878 = [inst_11871,inst_11876__$1];var inst_11879 = (new cljs.core.PersistentVector(null,2,(5),inst_11877,inst_11878,null));var state_11890__$1 = (function (){var statearr_11896 = state_11890;(statearr_11896[(8)] = inst_11876__$1);
return statearr_11896;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11890__$1,(8),jobs,inst_11879);
} else
{if((state_val_11891 === (5)))
{var inst_11874 = cljs.core.async.close_BANG_.call(null,jobs);var state_11890__$1 = state_11890;var statearr_11897_12008 = state_11890__$1;(statearr_11897_12008[(2)] = inst_11874);
(statearr_11897_12008[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11891 === (4)))
{var inst_11871 = (state_11890[(10)]);var inst_11871__$1 = (state_11890[(2)]);var inst_11872 = (inst_11871__$1 == null);var state_11890__$1 = (function (){var statearr_11898 = state_11890;(statearr_11898[(10)] = inst_11871__$1);
return statearr_11898;
})();if(cljs.core.truth_(inst_11872))
{var statearr_11899_12009 = state_11890__$1;(statearr_11899_12009[(1)] = (5));
} else
{var statearr_11900_12010 = state_11890__$1;(statearr_11900_12010[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11891 === (3)))
{var inst_11888 = (state_11890[(2)]);var state_11890__$1 = state_11890;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11890__$1,inst_11888);
} else
{if((state_val_11891 === (2)))
{var state_11890__$1 = state_11890;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11890__$1,(4),from);
} else
{if((state_val_11891 === (1)))
{var state_11890__$1 = state_11890;var statearr_11901_12011 = state_11890__$1;(statearr_11901_12011[(2)] = null);
(statearr_11901_12011[(1)] = (2));
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
});})(c__5806__auto___12005,jobs,results,process,async))
;return ((function (switch__5791__auto__,c__5806__auto___12005,jobs,results,process,async){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11905 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_11905[(0)] = state_machine__5792__auto__);
(statearr_11905[(1)] = (1));
return statearr_11905;
});
var state_machine__5792__auto____1 = (function (state_11890){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11890);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11906){if((e11906 instanceof Object))
{var ex__5795__auto__ = e11906;var statearr_11907_12012 = state_11890;(statearr_11907_12012[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11890);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11906;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12013 = state_11890;
state_11890 = G__12013;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11890){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11890);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___12005,jobs,results,process,async))
})();var state__5808__auto__ = (function (){var statearr_11908 = f__5807__auto__.call(null);(statearr_11908[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___12005);
return statearr_11908;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___12005,jobs,results,process,async))
);
var c__5806__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto__,jobs,results,process,async){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto__,jobs,results,process,async){
return (function (state_11946){var state_val_11947 = (state_11946[(1)]);if((state_val_11947 === (7)))
{var inst_11942 = (state_11946[(2)]);var state_11946__$1 = state_11946;var statearr_11948_12014 = state_11946__$1;(statearr_11948_12014[(2)] = inst_11942);
(statearr_11948_12014[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (20)))
{var state_11946__$1 = state_11946;var statearr_11949_12015 = state_11946__$1;(statearr_11949_12015[(2)] = null);
(statearr_11949_12015[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (1)))
{var state_11946__$1 = state_11946;var statearr_11950_12016 = state_11946__$1;(statearr_11950_12016[(2)] = null);
(statearr_11950_12016[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (4)))
{var inst_11911 = (state_11946[(7)]);var inst_11911__$1 = (state_11946[(2)]);var inst_11912 = (inst_11911__$1 == null);var state_11946__$1 = (function (){var statearr_11951 = state_11946;(statearr_11951[(7)] = inst_11911__$1);
return statearr_11951;
})();if(cljs.core.truth_(inst_11912))
{var statearr_11952_12017 = state_11946__$1;(statearr_11952_12017[(1)] = (5));
} else
{var statearr_11953_12018 = state_11946__$1;(statearr_11953_12018[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (15)))
{var inst_11924 = (state_11946[(8)]);var state_11946__$1 = state_11946;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11946__$1,(18),to,inst_11924);
} else
{if((state_val_11947 === (21)))
{var inst_11937 = (state_11946[(2)]);var state_11946__$1 = state_11946;var statearr_11954_12019 = state_11946__$1;(statearr_11954_12019[(2)] = inst_11937);
(statearr_11954_12019[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (13)))
{var inst_11939 = (state_11946[(2)]);var state_11946__$1 = (function (){var statearr_11955 = state_11946;(statearr_11955[(9)] = inst_11939);
return statearr_11955;
})();var statearr_11956_12020 = state_11946__$1;(statearr_11956_12020[(2)] = null);
(statearr_11956_12020[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (6)))
{var inst_11911 = (state_11946[(7)]);var state_11946__$1 = state_11946;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11946__$1,(11),inst_11911);
} else
{if((state_val_11947 === (17)))
{var inst_11932 = (state_11946[(2)]);var state_11946__$1 = state_11946;if(cljs.core.truth_(inst_11932))
{var statearr_11957_12021 = state_11946__$1;(statearr_11957_12021[(1)] = (19));
} else
{var statearr_11958_12022 = state_11946__$1;(statearr_11958_12022[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (3)))
{var inst_11944 = (state_11946[(2)]);var state_11946__$1 = state_11946;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11946__$1,inst_11944);
} else
{if((state_val_11947 === (12)))
{var inst_11921 = (state_11946[(10)]);var state_11946__$1 = state_11946;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11946__$1,(14),inst_11921);
} else
{if((state_val_11947 === (2)))
{var state_11946__$1 = state_11946;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11946__$1,(4),results);
} else
{if((state_val_11947 === (19)))
{var state_11946__$1 = state_11946;var statearr_11959_12023 = state_11946__$1;(statearr_11959_12023[(2)] = null);
(statearr_11959_12023[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (11)))
{var inst_11921 = (state_11946[(2)]);var state_11946__$1 = (function (){var statearr_11960 = state_11946;(statearr_11960[(10)] = inst_11921);
return statearr_11960;
})();var statearr_11961_12024 = state_11946__$1;(statearr_11961_12024[(2)] = null);
(statearr_11961_12024[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (9)))
{var state_11946__$1 = state_11946;var statearr_11962_12025 = state_11946__$1;(statearr_11962_12025[(2)] = null);
(statearr_11962_12025[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (5)))
{var state_11946__$1 = state_11946;if(cljs.core.truth_(close_QMARK_))
{var statearr_11963_12026 = state_11946__$1;(statearr_11963_12026[(1)] = (8));
} else
{var statearr_11964_12027 = state_11946__$1;(statearr_11964_12027[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (14)))
{var inst_11926 = (state_11946[(11)]);var inst_11924 = (state_11946[(8)]);var inst_11924__$1 = (state_11946[(2)]);var inst_11925 = (inst_11924__$1 == null);var inst_11926__$1 = cljs.core.not.call(null,inst_11925);var state_11946__$1 = (function (){var statearr_11965 = state_11946;(statearr_11965[(11)] = inst_11926__$1);
(statearr_11965[(8)] = inst_11924__$1);
return statearr_11965;
})();if(inst_11926__$1)
{var statearr_11966_12028 = state_11946__$1;(statearr_11966_12028[(1)] = (15));
} else
{var statearr_11967_12029 = state_11946__$1;(statearr_11967_12029[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (16)))
{var inst_11926 = (state_11946[(11)]);var state_11946__$1 = state_11946;var statearr_11968_12030 = state_11946__$1;(statearr_11968_12030[(2)] = inst_11926);
(statearr_11968_12030[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (10)))
{var inst_11918 = (state_11946[(2)]);var state_11946__$1 = state_11946;var statearr_11969_12031 = state_11946__$1;(statearr_11969_12031[(2)] = inst_11918);
(statearr_11969_12031[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (18)))
{var inst_11929 = (state_11946[(2)]);var state_11946__$1 = state_11946;var statearr_11970_12032 = state_11946__$1;(statearr_11970_12032[(2)] = inst_11929);
(statearr_11970_12032[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_11947 === (8)))
{var inst_11915 = cljs.core.async.close_BANG_.call(null,to);var state_11946__$1 = state_11946;var statearr_11971_12033 = state_11946__$1;(statearr_11971_12033[(2)] = inst_11915);
(statearr_11971_12033[(1)] = (10));
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
});})(c__5806__auto__,jobs,results,process,async))
;return ((function (switch__5791__auto__,c__5806__auto__,jobs,results,process,async){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_11975 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_11975[(0)] = state_machine__5792__auto__);
(statearr_11975[(1)] = (1));
return statearr_11975;
});
var state_machine__5792__auto____1 = (function (state_11946){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_11946);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e11976){if((e11976 instanceof Object))
{var ex__5795__auto__ = e11976;var statearr_11977_12034 = state_11946;(statearr_11977_12034[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11946);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e11976;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12035 = state_11946;
state_11946 = G__12035;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_11946){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_11946);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto__,jobs,results,process,async))
})();var state__5808__auto__ = (function (){var statearr_11978 = f__5807__auto__.call(null);(statearr_11978[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto__);
return statearr_11978;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto__,jobs,results,process,async))
);
return c__5806__auto__;
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
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__5806__auto___12136 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___12136,tc,fc){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___12136,tc,fc){
return (function (state_12111){var state_val_12112 = (state_12111[(1)]);if((state_val_12112 === (7)))
{var inst_12107 = (state_12111[(2)]);var state_12111__$1 = state_12111;var statearr_12113_12137 = state_12111__$1;(statearr_12113_12137[(2)] = inst_12107);
(statearr_12113_12137[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (1)))
{var state_12111__$1 = state_12111;var statearr_12114_12138 = state_12111__$1;(statearr_12114_12138[(2)] = null);
(statearr_12114_12138[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (4)))
{var inst_12088 = (state_12111[(7)]);var inst_12088__$1 = (state_12111[(2)]);var inst_12089 = (inst_12088__$1 == null);var state_12111__$1 = (function (){var statearr_12115 = state_12111;(statearr_12115[(7)] = inst_12088__$1);
return statearr_12115;
})();if(cljs.core.truth_(inst_12089))
{var statearr_12116_12139 = state_12111__$1;(statearr_12116_12139[(1)] = (5));
} else
{var statearr_12117_12140 = state_12111__$1;(statearr_12117_12140[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (13)))
{var state_12111__$1 = state_12111;var statearr_12118_12141 = state_12111__$1;(statearr_12118_12141[(2)] = null);
(statearr_12118_12141[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (6)))
{var inst_12088 = (state_12111[(7)]);var inst_12094 = p.call(null,inst_12088);var state_12111__$1 = state_12111;if(cljs.core.truth_(inst_12094))
{var statearr_12119_12142 = state_12111__$1;(statearr_12119_12142[(1)] = (9));
} else
{var statearr_12120_12143 = state_12111__$1;(statearr_12120_12143[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (3)))
{var inst_12109 = (state_12111[(2)]);var state_12111__$1 = state_12111;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12111__$1,inst_12109);
} else
{if((state_val_12112 === (12)))
{var state_12111__$1 = state_12111;var statearr_12121_12144 = state_12111__$1;(statearr_12121_12144[(2)] = null);
(statearr_12121_12144[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (2)))
{var state_12111__$1 = state_12111;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12111__$1,(4),ch);
} else
{if((state_val_12112 === (11)))
{var inst_12088 = (state_12111[(7)]);var inst_12098 = (state_12111[(2)]);var state_12111__$1 = state_12111;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12111__$1,(8),inst_12098,inst_12088);
} else
{if((state_val_12112 === (9)))
{var state_12111__$1 = state_12111;var statearr_12122_12145 = state_12111__$1;(statearr_12122_12145[(2)] = tc);
(statearr_12122_12145[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (5)))
{var inst_12091 = cljs.core.async.close_BANG_.call(null,tc);var inst_12092 = cljs.core.async.close_BANG_.call(null,fc);var state_12111__$1 = (function (){var statearr_12123 = state_12111;(statearr_12123[(8)] = inst_12091);
return statearr_12123;
})();var statearr_12124_12146 = state_12111__$1;(statearr_12124_12146[(2)] = inst_12092);
(statearr_12124_12146[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (14)))
{var inst_12105 = (state_12111[(2)]);var state_12111__$1 = state_12111;var statearr_12125_12147 = state_12111__$1;(statearr_12125_12147[(2)] = inst_12105);
(statearr_12125_12147[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (10)))
{var state_12111__$1 = state_12111;var statearr_12126_12148 = state_12111__$1;(statearr_12126_12148[(2)] = fc);
(statearr_12126_12148[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12112 === (8)))
{var inst_12100 = (state_12111[(2)]);var state_12111__$1 = state_12111;if(cljs.core.truth_(inst_12100))
{var statearr_12127_12149 = state_12111__$1;(statearr_12127_12149[(1)] = (12));
} else
{var statearr_12128_12150 = state_12111__$1;(statearr_12128_12150[(1)] = (13));
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
});})(c__5806__auto___12136,tc,fc))
;return ((function (switch__5791__auto__,c__5806__auto___12136,tc,fc){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_12132 = [null,null,null,null,null,null,null,null,null];(statearr_12132[(0)] = state_machine__5792__auto__);
(statearr_12132[(1)] = (1));
return statearr_12132;
});
var state_machine__5792__auto____1 = (function (state_12111){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_12111);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e12133){if((e12133 instanceof Object))
{var ex__5795__auto__ = e12133;var statearr_12134_12151 = state_12111;(statearr_12134_12151[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12111);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12133;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12152 = state_12111;
state_12111 = G__12152;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_12111){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_12111);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___12136,tc,fc))
})();var state__5808__auto__ = (function (){var statearr_12135 = f__5807__auto__.call(null);(statearr_12135[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___12136);
return statearr_12135;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___12136,tc,fc))
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
cljs.core.async.reduce = (function reduce(f,init,ch){var c__5806__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto__){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto__){
return (function (state_12199){var state_val_12200 = (state_12199[(1)]);if((state_val_12200 === (7)))
{var inst_12195 = (state_12199[(2)]);var state_12199__$1 = state_12199;var statearr_12201_12217 = state_12199__$1;(statearr_12201_12217[(2)] = inst_12195);
(statearr_12201_12217[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12200 === (6)))
{var inst_12185 = (state_12199[(7)]);var inst_12188 = (state_12199[(8)]);var inst_12192 = f.call(null,inst_12185,inst_12188);var inst_12185__$1 = inst_12192;var state_12199__$1 = (function (){var statearr_12202 = state_12199;(statearr_12202[(7)] = inst_12185__$1);
return statearr_12202;
})();var statearr_12203_12218 = state_12199__$1;(statearr_12203_12218[(2)] = null);
(statearr_12203_12218[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12200 === (5)))
{var inst_12185 = (state_12199[(7)]);var state_12199__$1 = state_12199;var statearr_12204_12219 = state_12199__$1;(statearr_12204_12219[(2)] = inst_12185);
(statearr_12204_12219[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12200 === (4)))
{var inst_12188 = (state_12199[(8)]);var inst_12188__$1 = (state_12199[(2)]);var inst_12189 = (inst_12188__$1 == null);var state_12199__$1 = (function (){var statearr_12205 = state_12199;(statearr_12205[(8)] = inst_12188__$1);
return statearr_12205;
})();if(cljs.core.truth_(inst_12189))
{var statearr_12206_12220 = state_12199__$1;(statearr_12206_12220[(1)] = (5));
} else
{var statearr_12207_12221 = state_12199__$1;(statearr_12207_12221[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12200 === (3)))
{var inst_12197 = (state_12199[(2)]);var state_12199__$1 = state_12199;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12199__$1,inst_12197);
} else
{if((state_val_12200 === (2)))
{var state_12199__$1 = state_12199;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12199__$1,(4),ch);
} else
{if((state_val_12200 === (1)))
{var inst_12185 = init;var state_12199__$1 = (function (){var statearr_12208 = state_12199;(statearr_12208[(7)] = inst_12185);
return statearr_12208;
})();var statearr_12209_12222 = state_12199__$1;(statearr_12209_12222[(2)] = null);
(statearr_12209_12222[(1)] = (2));
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
});})(c__5806__auto__))
;return ((function (switch__5791__auto__,c__5806__auto__){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_12213 = [null,null,null,null,null,null,null,null,null];(statearr_12213[(0)] = state_machine__5792__auto__);
(statearr_12213[(1)] = (1));
return statearr_12213;
});
var state_machine__5792__auto____1 = (function (state_12199){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_12199);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e12214){if((e12214 instanceof Object))
{var ex__5795__auto__ = e12214;var statearr_12215_12223 = state_12199;(statearr_12215_12223[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12199);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12214;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12224 = state_12199;
state_12199 = G__12224;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_12199){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_12199);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto__))
})();var state__5808__auto__ = (function (){var statearr_12216 = f__5807__auto__.call(null);(statearr_12216[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto__);
return statearr_12216;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto__))
);
return c__5806__auto__;
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
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__5806__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto__){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto__){
return (function (state_12298){var state_val_12299 = (state_12298[(1)]);if((state_val_12299 === (7)))
{var inst_12280 = (state_12298[(2)]);var state_12298__$1 = state_12298;var statearr_12300_12323 = state_12298__$1;(statearr_12300_12323[(2)] = inst_12280);
(statearr_12300_12323[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (1)))
{var inst_12274 = cljs.core.seq.call(null,coll);var inst_12275 = inst_12274;var state_12298__$1 = (function (){var statearr_12301 = state_12298;(statearr_12301[(7)] = inst_12275);
return statearr_12301;
})();var statearr_12302_12324 = state_12298__$1;(statearr_12302_12324[(2)] = null);
(statearr_12302_12324[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (4)))
{var inst_12275 = (state_12298[(7)]);var inst_12278 = cljs.core.first.call(null,inst_12275);var state_12298__$1 = state_12298;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12298__$1,(7),ch,inst_12278);
} else
{if((state_val_12299 === (13)))
{var inst_12292 = (state_12298[(2)]);var state_12298__$1 = state_12298;var statearr_12303_12325 = state_12298__$1;(statearr_12303_12325[(2)] = inst_12292);
(statearr_12303_12325[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (6)))
{var inst_12283 = (state_12298[(2)]);var state_12298__$1 = state_12298;if(cljs.core.truth_(inst_12283))
{var statearr_12304_12326 = state_12298__$1;(statearr_12304_12326[(1)] = (8));
} else
{var statearr_12305_12327 = state_12298__$1;(statearr_12305_12327[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (3)))
{var inst_12296 = (state_12298[(2)]);var state_12298__$1 = state_12298;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12298__$1,inst_12296);
} else
{if((state_val_12299 === (12)))
{var state_12298__$1 = state_12298;var statearr_12306_12328 = state_12298__$1;(statearr_12306_12328[(2)] = null);
(statearr_12306_12328[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (2)))
{var inst_12275 = (state_12298[(7)]);var state_12298__$1 = state_12298;if(cljs.core.truth_(inst_12275))
{var statearr_12307_12329 = state_12298__$1;(statearr_12307_12329[(1)] = (4));
} else
{var statearr_12308_12330 = state_12298__$1;(statearr_12308_12330[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (11)))
{var inst_12289 = cljs.core.async.close_BANG_.call(null,ch);var state_12298__$1 = state_12298;var statearr_12309_12331 = state_12298__$1;(statearr_12309_12331[(2)] = inst_12289);
(statearr_12309_12331[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (9)))
{var state_12298__$1 = state_12298;if(cljs.core.truth_(close_QMARK_))
{var statearr_12310_12332 = state_12298__$1;(statearr_12310_12332[(1)] = (11));
} else
{var statearr_12311_12333 = state_12298__$1;(statearr_12311_12333[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (5)))
{var inst_12275 = (state_12298[(7)]);var state_12298__$1 = state_12298;var statearr_12312_12334 = state_12298__$1;(statearr_12312_12334[(2)] = inst_12275);
(statearr_12312_12334[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (10)))
{var inst_12294 = (state_12298[(2)]);var state_12298__$1 = state_12298;var statearr_12313_12335 = state_12298__$1;(statearr_12313_12335[(2)] = inst_12294);
(statearr_12313_12335[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12299 === (8)))
{var inst_12275 = (state_12298[(7)]);var inst_12285 = cljs.core.next.call(null,inst_12275);var inst_12275__$1 = inst_12285;var state_12298__$1 = (function (){var statearr_12314 = state_12298;(statearr_12314[(7)] = inst_12275__$1);
return statearr_12314;
})();var statearr_12315_12336 = state_12298__$1;(statearr_12315_12336[(2)] = null);
(statearr_12315_12336[(1)] = (2));
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
});})(c__5806__auto__))
;return ((function (switch__5791__auto__,c__5806__auto__){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_12319 = [null,null,null,null,null,null,null,null];(statearr_12319[(0)] = state_machine__5792__auto__);
(statearr_12319[(1)] = (1));
return statearr_12319;
});
var state_machine__5792__auto____1 = (function (state_12298){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_12298);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e12320){if((e12320 instanceof Object))
{var ex__5795__auto__ = e12320;var statearr_12321_12337 = state_12298;(statearr_12321_12337[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12298);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12320;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12338 = state_12298;
state_12298 = G__12338;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_12298){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_12298);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto__))
})();var state__5808__auto__ = (function (){var statearr_12322 = f__5807__auto__.call(null);(statearr_12322[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto__);
return statearr_12322;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto__))
);
return c__5806__auto__;
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
cljs.core.async.Mux = (function (){var obj12340 = {};return obj12340;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3612__auto__ = _;if(and__3612__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3612__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4260__auto__ = (((_ == null))?null:_);return (function (){var or__3624__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj12342 = {};return obj12342;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
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
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t12564 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12564 = (function (cs,ch,mult,meta12565){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta12565 = meta12565;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12564.cljs$lang$type = true;
cljs.core.async.t12564.cljs$lang$ctorStr = "cljs.core.async/t12564";
cljs.core.async.t12564.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t12564");
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t12564.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12564.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_12566){var self__ = this;
var _12566__$1 = this;return self__.meta12565;
});})(cs))
;
cljs.core.async.t12564.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_12566,meta12565__$1){var self__ = this;
var _12566__$1 = this;return (new cljs.core.async.t12564(self__.cs,self__.ch,self__.mult,meta12565__$1));
});})(cs))
;
cljs.core.async.__GT_t12564 = ((function (cs){
return (function __GT_t12564(cs__$1,ch__$1,mult__$1,meta12565){return (new cljs.core.async.t12564(cs__$1,ch__$1,mult__$1,meta12565));
});})(cs))
;
}
return (new cljs.core.async.t12564(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__5806__auto___12785 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___12785,cs,m,dchan,dctr,done){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___12785,cs,m,dchan,dctr,done){
return (function (state_12697){var state_val_12698 = (state_12697[(1)]);if((state_val_12698 === (7)))
{var inst_12693 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12699_12786 = state_12697__$1;(statearr_12699_12786[(2)] = inst_12693);
(statearr_12699_12786[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (20)))
{var inst_12598 = (state_12697[(7)]);var inst_12608 = cljs.core.first.call(null,inst_12598);var inst_12609 = cljs.core.nth.call(null,inst_12608,(0),null);var inst_12610 = cljs.core.nth.call(null,inst_12608,(1),null);var state_12697__$1 = (function (){var statearr_12700 = state_12697;(statearr_12700[(8)] = inst_12609);
return statearr_12700;
})();if(cljs.core.truth_(inst_12610))
{var statearr_12701_12787 = state_12697__$1;(statearr_12701_12787[(1)] = (22));
} else
{var statearr_12702_12788 = state_12697__$1;(statearr_12702_12788[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (27)))
{var inst_12569 = (state_12697[(9)]);var inst_12645 = (state_12697[(10)]);var inst_12638 = (state_12697[(11)]);var inst_12640 = (state_12697[(12)]);var inst_12645__$1 = cljs.core._nth.call(null,inst_12638,inst_12640);var inst_12646 = cljs.core.async.put_BANG_.call(null,inst_12645__$1,inst_12569,done);var state_12697__$1 = (function (){var statearr_12703 = state_12697;(statearr_12703[(10)] = inst_12645__$1);
return statearr_12703;
})();if(cljs.core.truth_(inst_12646))
{var statearr_12704_12789 = state_12697__$1;(statearr_12704_12789[(1)] = (30));
} else
{var statearr_12705_12790 = state_12697__$1;(statearr_12705_12790[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (1)))
{var state_12697__$1 = state_12697;var statearr_12706_12791 = state_12697__$1;(statearr_12706_12791[(2)] = null);
(statearr_12706_12791[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (24)))
{var inst_12598 = (state_12697[(7)]);var inst_12615 = (state_12697[(2)]);var inst_12616 = cljs.core.next.call(null,inst_12598);var inst_12578 = inst_12616;var inst_12579 = null;var inst_12580 = (0);var inst_12581 = (0);var state_12697__$1 = (function (){var statearr_12707 = state_12697;(statearr_12707[(13)] = inst_12615);
(statearr_12707[(14)] = inst_12581);
(statearr_12707[(15)] = inst_12579);
(statearr_12707[(16)] = inst_12578);
(statearr_12707[(17)] = inst_12580);
return statearr_12707;
})();var statearr_12708_12792 = state_12697__$1;(statearr_12708_12792[(2)] = null);
(statearr_12708_12792[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (39)))
{var state_12697__$1 = state_12697;var statearr_12712_12793 = state_12697__$1;(statearr_12712_12793[(2)] = null);
(statearr_12712_12793[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (4)))
{var inst_12569 = (state_12697[(9)]);var inst_12569__$1 = (state_12697[(2)]);var inst_12570 = (inst_12569__$1 == null);var state_12697__$1 = (function (){var statearr_12713 = state_12697;(statearr_12713[(9)] = inst_12569__$1);
return statearr_12713;
})();if(cljs.core.truth_(inst_12570))
{var statearr_12714_12794 = state_12697__$1;(statearr_12714_12794[(1)] = (5));
} else
{var statearr_12715_12795 = state_12697__$1;(statearr_12715_12795[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (15)))
{var inst_12581 = (state_12697[(14)]);var inst_12579 = (state_12697[(15)]);var inst_12578 = (state_12697[(16)]);var inst_12580 = (state_12697[(17)]);var inst_12594 = (state_12697[(2)]);var inst_12595 = (inst_12581 + (1));var tmp12709 = inst_12579;var tmp12710 = inst_12578;var tmp12711 = inst_12580;var inst_12578__$1 = tmp12710;var inst_12579__$1 = tmp12709;var inst_12580__$1 = tmp12711;var inst_12581__$1 = inst_12595;var state_12697__$1 = (function (){var statearr_12716 = state_12697;(statearr_12716[(18)] = inst_12594);
(statearr_12716[(14)] = inst_12581__$1);
(statearr_12716[(15)] = inst_12579__$1);
(statearr_12716[(16)] = inst_12578__$1);
(statearr_12716[(17)] = inst_12580__$1);
return statearr_12716;
})();var statearr_12717_12796 = state_12697__$1;(statearr_12717_12796[(2)] = null);
(statearr_12717_12796[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (21)))
{var inst_12619 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12721_12797 = state_12697__$1;(statearr_12721_12797[(2)] = inst_12619);
(statearr_12721_12797[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (31)))
{var inst_12645 = (state_12697[(10)]);var inst_12649 = done.call(null,null);var inst_12650 = cljs.core.async.untap_STAR_.call(null,m,inst_12645);var state_12697__$1 = (function (){var statearr_12722 = state_12697;(statearr_12722[(19)] = inst_12649);
return statearr_12722;
})();var statearr_12723_12798 = state_12697__$1;(statearr_12723_12798[(2)] = inst_12650);
(statearr_12723_12798[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (32)))
{var inst_12637 = (state_12697[(20)]);var inst_12639 = (state_12697[(21)]);var inst_12638 = (state_12697[(11)]);var inst_12640 = (state_12697[(12)]);var inst_12652 = (state_12697[(2)]);var inst_12653 = (inst_12640 + (1));var tmp12718 = inst_12637;var tmp12719 = inst_12639;var tmp12720 = inst_12638;var inst_12637__$1 = tmp12718;var inst_12638__$1 = tmp12720;var inst_12639__$1 = tmp12719;var inst_12640__$1 = inst_12653;var state_12697__$1 = (function (){var statearr_12724 = state_12697;(statearr_12724[(20)] = inst_12637__$1);
(statearr_12724[(21)] = inst_12639__$1);
(statearr_12724[(22)] = inst_12652);
(statearr_12724[(11)] = inst_12638__$1);
(statearr_12724[(12)] = inst_12640__$1);
return statearr_12724;
})();var statearr_12725_12799 = state_12697__$1;(statearr_12725_12799[(2)] = null);
(statearr_12725_12799[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (40)))
{var inst_12665 = (state_12697[(23)]);var inst_12669 = done.call(null,null);var inst_12670 = cljs.core.async.untap_STAR_.call(null,m,inst_12665);var state_12697__$1 = (function (){var statearr_12726 = state_12697;(statearr_12726[(24)] = inst_12669);
return statearr_12726;
})();var statearr_12727_12800 = state_12697__$1;(statearr_12727_12800[(2)] = inst_12670);
(statearr_12727_12800[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (33)))
{var inst_12656 = (state_12697[(25)]);var inst_12658 = cljs.core.chunked_seq_QMARK_.call(null,inst_12656);var state_12697__$1 = state_12697;if(inst_12658)
{var statearr_12728_12801 = state_12697__$1;(statearr_12728_12801[(1)] = (36));
} else
{var statearr_12729_12802 = state_12697__$1;(statearr_12729_12802[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (13)))
{var inst_12588 = (state_12697[(26)]);var inst_12591 = cljs.core.async.close_BANG_.call(null,inst_12588);var state_12697__$1 = state_12697;var statearr_12730_12803 = state_12697__$1;(statearr_12730_12803[(2)] = inst_12591);
(statearr_12730_12803[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (22)))
{var inst_12609 = (state_12697[(8)]);var inst_12612 = cljs.core.async.close_BANG_.call(null,inst_12609);var state_12697__$1 = state_12697;var statearr_12731_12804 = state_12697__$1;(statearr_12731_12804[(2)] = inst_12612);
(statearr_12731_12804[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (36)))
{var inst_12656 = (state_12697[(25)]);var inst_12660 = cljs.core.chunk_first.call(null,inst_12656);var inst_12661 = cljs.core.chunk_rest.call(null,inst_12656);var inst_12662 = cljs.core.count.call(null,inst_12660);var inst_12637 = inst_12661;var inst_12638 = inst_12660;var inst_12639 = inst_12662;var inst_12640 = (0);var state_12697__$1 = (function (){var statearr_12732 = state_12697;(statearr_12732[(20)] = inst_12637);
(statearr_12732[(21)] = inst_12639);
(statearr_12732[(11)] = inst_12638);
(statearr_12732[(12)] = inst_12640);
return statearr_12732;
})();var statearr_12733_12805 = state_12697__$1;(statearr_12733_12805[(2)] = null);
(statearr_12733_12805[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (41)))
{var inst_12656 = (state_12697[(25)]);var inst_12672 = (state_12697[(2)]);var inst_12673 = cljs.core.next.call(null,inst_12656);var inst_12637 = inst_12673;var inst_12638 = null;var inst_12639 = (0);var inst_12640 = (0);var state_12697__$1 = (function (){var statearr_12734 = state_12697;(statearr_12734[(27)] = inst_12672);
(statearr_12734[(20)] = inst_12637);
(statearr_12734[(21)] = inst_12639);
(statearr_12734[(11)] = inst_12638);
(statearr_12734[(12)] = inst_12640);
return statearr_12734;
})();var statearr_12735_12806 = state_12697__$1;(statearr_12735_12806[(2)] = null);
(statearr_12735_12806[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (43)))
{var state_12697__$1 = state_12697;var statearr_12736_12807 = state_12697__$1;(statearr_12736_12807[(2)] = null);
(statearr_12736_12807[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (29)))
{var inst_12681 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12737_12808 = state_12697__$1;(statearr_12737_12808[(2)] = inst_12681);
(statearr_12737_12808[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (44)))
{var inst_12690 = (state_12697[(2)]);var state_12697__$1 = (function (){var statearr_12738 = state_12697;(statearr_12738[(28)] = inst_12690);
return statearr_12738;
})();var statearr_12739_12809 = state_12697__$1;(statearr_12739_12809[(2)] = null);
(statearr_12739_12809[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (6)))
{var inst_12629 = (state_12697[(29)]);var inst_12628 = cljs.core.deref.call(null,cs);var inst_12629__$1 = cljs.core.keys.call(null,inst_12628);var inst_12630 = cljs.core.count.call(null,inst_12629__$1);var inst_12631 = cljs.core.reset_BANG_.call(null,dctr,inst_12630);var inst_12636 = cljs.core.seq.call(null,inst_12629__$1);var inst_12637 = inst_12636;var inst_12638 = null;var inst_12639 = (0);var inst_12640 = (0);var state_12697__$1 = (function (){var statearr_12740 = state_12697;(statearr_12740[(20)] = inst_12637);
(statearr_12740[(21)] = inst_12639);
(statearr_12740[(11)] = inst_12638);
(statearr_12740[(29)] = inst_12629__$1);
(statearr_12740[(30)] = inst_12631);
(statearr_12740[(12)] = inst_12640);
return statearr_12740;
})();var statearr_12741_12810 = state_12697__$1;(statearr_12741_12810[(2)] = null);
(statearr_12741_12810[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (28)))
{var inst_12656 = (state_12697[(25)]);var inst_12637 = (state_12697[(20)]);var inst_12656__$1 = cljs.core.seq.call(null,inst_12637);var state_12697__$1 = (function (){var statearr_12742 = state_12697;(statearr_12742[(25)] = inst_12656__$1);
return statearr_12742;
})();if(inst_12656__$1)
{var statearr_12743_12811 = state_12697__$1;(statearr_12743_12811[(1)] = (33));
} else
{var statearr_12744_12812 = state_12697__$1;(statearr_12744_12812[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (25)))
{var inst_12639 = (state_12697[(21)]);var inst_12640 = (state_12697[(12)]);var inst_12642 = (inst_12640 < inst_12639);var inst_12643 = inst_12642;var state_12697__$1 = state_12697;if(cljs.core.truth_(inst_12643))
{var statearr_12745_12813 = state_12697__$1;(statearr_12745_12813[(1)] = (27));
} else
{var statearr_12746_12814 = state_12697__$1;(statearr_12746_12814[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (34)))
{var state_12697__$1 = state_12697;var statearr_12747_12815 = state_12697__$1;(statearr_12747_12815[(2)] = null);
(statearr_12747_12815[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (17)))
{var state_12697__$1 = state_12697;var statearr_12748_12816 = state_12697__$1;(statearr_12748_12816[(2)] = null);
(statearr_12748_12816[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (3)))
{var inst_12695 = (state_12697[(2)]);var state_12697__$1 = state_12697;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12697__$1,inst_12695);
} else
{if((state_val_12698 === (12)))
{var inst_12624 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12749_12817 = state_12697__$1;(statearr_12749_12817[(2)] = inst_12624);
(statearr_12749_12817[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (2)))
{var state_12697__$1 = state_12697;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12697__$1,(4),ch);
} else
{if((state_val_12698 === (23)))
{var state_12697__$1 = state_12697;var statearr_12750_12818 = state_12697__$1;(statearr_12750_12818[(2)] = null);
(statearr_12750_12818[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (35)))
{var inst_12679 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12751_12819 = state_12697__$1;(statearr_12751_12819[(2)] = inst_12679);
(statearr_12751_12819[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (19)))
{var inst_12598 = (state_12697[(7)]);var inst_12602 = cljs.core.chunk_first.call(null,inst_12598);var inst_12603 = cljs.core.chunk_rest.call(null,inst_12598);var inst_12604 = cljs.core.count.call(null,inst_12602);var inst_12578 = inst_12603;var inst_12579 = inst_12602;var inst_12580 = inst_12604;var inst_12581 = (0);var state_12697__$1 = (function (){var statearr_12752 = state_12697;(statearr_12752[(14)] = inst_12581);
(statearr_12752[(15)] = inst_12579);
(statearr_12752[(16)] = inst_12578);
(statearr_12752[(17)] = inst_12580);
return statearr_12752;
})();var statearr_12753_12820 = state_12697__$1;(statearr_12753_12820[(2)] = null);
(statearr_12753_12820[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (11)))
{var inst_12598 = (state_12697[(7)]);var inst_12578 = (state_12697[(16)]);var inst_12598__$1 = cljs.core.seq.call(null,inst_12578);var state_12697__$1 = (function (){var statearr_12754 = state_12697;(statearr_12754[(7)] = inst_12598__$1);
return statearr_12754;
})();if(inst_12598__$1)
{var statearr_12755_12821 = state_12697__$1;(statearr_12755_12821[(1)] = (16));
} else
{var statearr_12756_12822 = state_12697__$1;(statearr_12756_12822[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (9)))
{var inst_12626 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12757_12823 = state_12697__$1;(statearr_12757_12823[(2)] = inst_12626);
(statearr_12757_12823[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (5)))
{var inst_12576 = cljs.core.deref.call(null,cs);var inst_12577 = cljs.core.seq.call(null,inst_12576);var inst_12578 = inst_12577;var inst_12579 = null;var inst_12580 = (0);var inst_12581 = (0);var state_12697__$1 = (function (){var statearr_12758 = state_12697;(statearr_12758[(14)] = inst_12581);
(statearr_12758[(15)] = inst_12579);
(statearr_12758[(16)] = inst_12578);
(statearr_12758[(17)] = inst_12580);
return statearr_12758;
})();var statearr_12759_12824 = state_12697__$1;(statearr_12759_12824[(2)] = null);
(statearr_12759_12824[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (14)))
{var state_12697__$1 = state_12697;var statearr_12760_12825 = state_12697__$1;(statearr_12760_12825[(2)] = null);
(statearr_12760_12825[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (45)))
{var inst_12687 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12761_12826 = state_12697__$1;(statearr_12761_12826[(2)] = inst_12687);
(statearr_12761_12826[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (26)))
{var inst_12629 = (state_12697[(29)]);var inst_12683 = (state_12697[(2)]);var inst_12684 = cljs.core.seq.call(null,inst_12629);var state_12697__$1 = (function (){var statearr_12762 = state_12697;(statearr_12762[(31)] = inst_12683);
return statearr_12762;
})();if(inst_12684)
{var statearr_12763_12827 = state_12697__$1;(statearr_12763_12827[(1)] = (42));
} else
{var statearr_12764_12828 = state_12697__$1;(statearr_12764_12828[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (16)))
{var inst_12598 = (state_12697[(7)]);var inst_12600 = cljs.core.chunked_seq_QMARK_.call(null,inst_12598);var state_12697__$1 = state_12697;if(inst_12600)
{var statearr_12765_12829 = state_12697__$1;(statearr_12765_12829[(1)] = (19));
} else
{var statearr_12766_12830 = state_12697__$1;(statearr_12766_12830[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (38)))
{var inst_12676 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12767_12831 = state_12697__$1;(statearr_12767_12831[(2)] = inst_12676);
(statearr_12767_12831[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (30)))
{var state_12697__$1 = state_12697;var statearr_12768_12832 = state_12697__$1;(statearr_12768_12832[(2)] = null);
(statearr_12768_12832[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (10)))
{var inst_12581 = (state_12697[(14)]);var inst_12579 = (state_12697[(15)]);var inst_12587 = cljs.core._nth.call(null,inst_12579,inst_12581);var inst_12588 = cljs.core.nth.call(null,inst_12587,(0),null);var inst_12589 = cljs.core.nth.call(null,inst_12587,(1),null);var state_12697__$1 = (function (){var statearr_12769 = state_12697;(statearr_12769[(26)] = inst_12588);
return statearr_12769;
})();if(cljs.core.truth_(inst_12589))
{var statearr_12770_12833 = state_12697__$1;(statearr_12770_12833[(1)] = (13));
} else
{var statearr_12771_12834 = state_12697__$1;(statearr_12771_12834[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (18)))
{var inst_12622 = (state_12697[(2)]);var state_12697__$1 = state_12697;var statearr_12772_12835 = state_12697__$1;(statearr_12772_12835[(2)] = inst_12622);
(statearr_12772_12835[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (42)))
{var state_12697__$1 = state_12697;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12697__$1,(45),dchan);
} else
{if((state_val_12698 === (37)))
{var inst_12569 = (state_12697[(9)]);var inst_12656 = (state_12697[(25)]);var inst_12665 = (state_12697[(23)]);var inst_12665__$1 = cljs.core.first.call(null,inst_12656);var inst_12666 = cljs.core.async.put_BANG_.call(null,inst_12665__$1,inst_12569,done);var state_12697__$1 = (function (){var statearr_12773 = state_12697;(statearr_12773[(23)] = inst_12665__$1);
return statearr_12773;
})();if(cljs.core.truth_(inst_12666))
{var statearr_12774_12836 = state_12697__$1;(statearr_12774_12836[(1)] = (39));
} else
{var statearr_12775_12837 = state_12697__$1;(statearr_12775_12837[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12698 === (8)))
{var inst_12581 = (state_12697[(14)]);var inst_12580 = (state_12697[(17)]);var inst_12583 = (inst_12581 < inst_12580);var inst_12584 = inst_12583;var state_12697__$1 = state_12697;if(cljs.core.truth_(inst_12584))
{var statearr_12776_12838 = state_12697__$1;(statearr_12776_12838[(1)] = (10));
} else
{var statearr_12777_12839 = state_12697__$1;(statearr_12777_12839[(1)] = (11));
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
});})(c__5806__auto___12785,cs,m,dchan,dctr,done))
;return ((function (switch__5791__auto__,c__5806__auto___12785,cs,m,dchan,dctr,done){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_12781 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12781[(0)] = state_machine__5792__auto__);
(statearr_12781[(1)] = (1));
return statearr_12781;
});
var state_machine__5792__auto____1 = (function (state_12697){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_12697);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e12782){if((e12782 instanceof Object))
{var ex__5795__auto__ = e12782;var statearr_12783_12840 = state_12697;(statearr_12783_12840[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12697);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12782;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12841 = state_12697;
state_12697 = G__12841;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_12697){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_12697);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___12785,cs,m,dchan,dctr,done))
})();var state__5808__auto__ = (function (){var statearr_12784 = f__5807__auto__.call(null);(statearr_12784[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___12785);
return statearr_12784;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___12785,cs,m,dchan,dctr,done))
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
cljs.core.async.Mix = (function (){var obj12843 = {};return obj12843;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3612__auto__ = m;if(and__3612__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4260__auto__ = (((m == null))?null:m);return (function (){var or__3624__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
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
;var m = (function (){if(typeof cljs.core.async.t12963 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t12963 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta12964){
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
this.meta12964 = meta12964;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t12963.cljs$lang$type = true;
cljs.core.async.t12963.cljs$lang$ctorStr = "cljs.core.async/t12963";
cljs.core.async.t12963.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t12963");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t12963.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12965){var self__ = this;
var _12965__$1 = this;return self__.meta12964;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t12963.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_12965,meta12964__$1){var self__ = this;
var _12965__$1 = this;return (new cljs.core.async.t12963(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta12964__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t12963 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t12963(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta12964){return (new cljs.core.async.t12963(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta12964));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t12963(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__5806__auto___13082 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_13035){var state_val_13036 = (state_13035[(1)]);if((state_val_13036 === (7)))
{var inst_12979 = (state_13035[(7)]);var inst_12984 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12979);var state_13035__$1 = state_13035;var statearr_13037_13083 = state_13035__$1;(statearr_13037_13083[(2)] = inst_12984);
(statearr_13037_13083[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (20)))
{var inst_12994 = (state_13035[(8)]);var state_13035__$1 = state_13035;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13035__$1,(23),out,inst_12994);
} else
{if((state_val_13036 === (1)))
{var inst_12969 = (state_13035[(9)]);var inst_12969__$1 = calc_state.call(null);var inst_12970 = cljs.core.seq_QMARK_.call(null,inst_12969__$1);var state_13035__$1 = (function (){var statearr_13038 = state_13035;(statearr_13038[(9)] = inst_12969__$1);
return statearr_13038;
})();if(inst_12970)
{var statearr_13039_13084 = state_13035__$1;(statearr_13039_13084[(1)] = (2));
} else
{var statearr_13040_13085 = state_13035__$1;(statearr_13040_13085[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (24)))
{var inst_12987 = (state_13035[(10)]);var inst_12979 = inst_12987;var state_13035__$1 = (function (){var statearr_13041 = state_13035;(statearr_13041[(7)] = inst_12979);
return statearr_13041;
})();var statearr_13042_13086 = state_13035__$1;(statearr_13042_13086[(2)] = null);
(statearr_13042_13086[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (4)))
{var inst_12969 = (state_13035[(9)]);var inst_12975 = (state_13035[(2)]);var inst_12976 = cljs.core.get.call(null,inst_12975,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_12977 = cljs.core.get.call(null,inst_12975,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_12978 = cljs.core.get.call(null,inst_12975,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_12979 = inst_12969;var state_13035__$1 = (function (){var statearr_13043 = state_13035;(statearr_13043[(7)] = inst_12979);
(statearr_13043[(11)] = inst_12977);
(statearr_13043[(12)] = inst_12978);
(statearr_13043[(13)] = inst_12976);
return statearr_13043;
})();var statearr_13044_13087 = state_13035__$1;(statearr_13044_13087[(2)] = null);
(statearr_13044_13087[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (15)))
{var state_13035__$1 = state_13035;var statearr_13045_13088 = state_13035__$1;(statearr_13045_13088[(2)] = null);
(statearr_13045_13088[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (21)))
{var inst_12987 = (state_13035[(10)]);var inst_12979 = inst_12987;var state_13035__$1 = (function (){var statearr_13046 = state_13035;(statearr_13046[(7)] = inst_12979);
return statearr_13046;
})();var statearr_13047_13089 = state_13035__$1;(statearr_13047_13089[(2)] = null);
(statearr_13047_13089[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (13)))
{var inst_13031 = (state_13035[(2)]);var state_13035__$1 = state_13035;var statearr_13048_13090 = state_13035__$1;(statearr_13048_13090[(2)] = inst_13031);
(statearr_13048_13090[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (22)))
{var inst_13029 = (state_13035[(2)]);var state_13035__$1 = state_13035;var statearr_13049_13091 = state_13035__$1;(statearr_13049_13091[(2)] = inst_13029);
(statearr_13049_13091[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (6)))
{var inst_13033 = (state_13035[(2)]);var state_13035__$1 = state_13035;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13035__$1,inst_13033);
} else
{if((state_val_13036 === (25)))
{var state_13035__$1 = state_13035;var statearr_13050_13092 = state_13035__$1;(statearr_13050_13092[(2)] = null);
(statearr_13050_13092[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (17)))
{var inst_13009 = (state_13035[(14)]);var state_13035__$1 = state_13035;var statearr_13051_13093 = state_13035__$1;(statearr_13051_13093[(2)] = inst_13009);
(statearr_13051_13093[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (3)))
{var inst_12969 = (state_13035[(9)]);var state_13035__$1 = state_13035;var statearr_13052_13094 = state_13035__$1;(statearr_13052_13094[(2)] = inst_12969);
(statearr_13052_13094[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (12)))
{var inst_12995 = (state_13035[(15)]);var inst_13009 = (state_13035[(14)]);var inst_12990 = (state_13035[(16)]);var inst_13009__$1 = inst_12990.call(null,inst_12995);var state_13035__$1 = (function (){var statearr_13053 = state_13035;(statearr_13053[(14)] = inst_13009__$1);
return statearr_13053;
})();if(cljs.core.truth_(inst_13009__$1))
{var statearr_13054_13095 = state_13035__$1;(statearr_13054_13095[(1)] = (17));
} else
{var statearr_13055_13096 = state_13035__$1;(statearr_13055_13096[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (2)))
{var inst_12969 = (state_13035[(9)]);var inst_12972 = cljs.core.apply.call(null,cljs.core.hash_map,inst_12969);var state_13035__$1 = state_13035;var statearr_13056_13097 = state_13035__$1;(statearr_13056_13097[(2)] = inst_12972);
(statearr_13056_13097[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (23)))
{var inst_13020 = (state_13035[(2)]);var state_13035__$1 = state_13035;if(cljs.core.truth_(inst_13020))
{var statearr_13057_13098 = state_13035__$1;(statearr_13057_13098[(1)] = (24));
} else
{var statearr_13058_13099 = state_13035__$1;(statearr_13058_13099[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (19)))
{var inst_13017 = (state_13035[(2)]);var state_13035__$1 = state_13035;if(cljs.core.truth_(inst_13017))
{var statearr_13059_13100 = state_13035__$1;(statearr_13059_13100[(1)] = (20));
} else
{var statearr_13060_13101 = state_13035__$1;(statearr_13060_13101[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (11)))
{var inst_12994 = (state_13035[(8)]);var inst_13000 = (inst_12994 == null);var state_13035__$1 = state_13035;if(cljs.core.truth_(inst_13000))
{var statearr_13061_13102 = state_13035__$1;(statearr_13061_13102[(1)] = (14));
} else
{var statearr_13062_13103 = state_13035__$1;(statearr_13062_13103[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (9)))
{var inst_12987 = (state_13035[(10)]);var inst_12987__$1 = (state_13035[(2)]);var inst_12988 = cljs.core.get.call(null,inst_12987__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_12989 = cljs.core.get.call(null,inst_12987__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_12990 = cljs.core.get.call(null,inst_12987__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_13035__$1 = (function (){var statearr_13063 = state_13035;(statearr_13063[(17)] = inst_12989);
(statearr_13063[(10)] = inst_12987__$1);
(statearr_13063[(16)] = inst_12990);
return statearr_13063;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13035__$1,(10),inst_12988);
} else
{if((state_val_13036 === (5)))
{var inst_12979 = (state_13035[(7)]);var inst_12982 = cljs.core.seq_QMARK_.call(null,inst_12979);var state_13035__$1 = state_13035;if(inst_12982)
{var statearr_13064_13104 = state_13035__$1;(statearr_13064_13104[(1)] = (7));
} else
{var statearr_13065_13105 = state_13035__$1;(statearr_13065_13105[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (14)))
{var inst_12995 = (state_13035[(15)]);var inst_13002 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_12995);var state_13035__$1 = state_13035;var statearr_13066_13106 = state_13035__$1;(statearr_13066_13106[(2)] = inst_13002);
(statearr_13066_13106[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (26)))
{var inst_13025 = (state_13035[(2)]);var state_13035__$1 = state_13035;var statearr_13067_13107 = state_13035__$1;(statearr_13067_13107[(2)] = inst_13025);
(statearr_13067_13107[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (16)))
{var inst_13005 = (state_13035[(2)]);var inst_13006 = calc_state.call(null);var inst_12979 = inst_13006;var state_13035__$1 = (function (){var statearr_13068 = state_13035;(statearr_13068[(7)] = inst_12979);
(statearr_13068[(18)] = inst_13005);
return statearr_13068;
})();var statearr_13069_13108 = state_13035__$1;(statearr_13069_13108[(2)] = null);
(statearr_13069_13108[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (10)))
{var inst_12995 = (state_13035[(15)]);var inst_12994 = (state_13035[(8)]);var inst_12993 = (state_13035[(2)]);var inst_12994__$1 = cljs.core.nth.call(null,inst_12993,(0),null);var inst_12995__$1 = cljs.core.nth.call(null,inst_12993,(1),null);var inst_12996 = (inst_12994__$1 == null);var inst_12997 = cljs.core._EQ_.call(null,inst_12995__$1,change);var inst_12998 = (inst_12996) || (inst_12997);var state_13035__$1 = (function (){var statearr_13070 = state_13035;(statearr_13070[(15)] = inst_12995__$1);
(statearr_13070[(8)] = inst_12994__$1);
return statearr_13070;
})();if(cljs.core.truth_(inst_12998))
{var statearr_13071_13109 = state_13035__$1;(statearr_13071_13109[(1)] = (11));
} else
{var statearr_13072_13110 = state_13035__$1;(statearr_13072_13110[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (18)))
{var inst_12995 = (state_13035[(15)]);var inst_12989 = (state_13035[(17)]);var inst_12990 = (state_13035[(16)]);var inst_13012 = cljs.core.empty_QMARK_.call(null,inst_12990);var inst_13013 = inst_12989.call(null,inst_12995);var inst_13014 = cljs.core.not.call(null,inst_13013);var inst_13015 = (inst_13012) && (inst_13014);var state_13035__$1 = state_13035;var statearr_13073_13111 = state_13035__$1;(statearr_13073_13111[(2)] = inst_13015);
(statearr_13073_13111[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13036 === (8)))
{var inst_12979 = (state_13035[(7)]);var state_13035__$1 = state_13035;var statearr_13074_13112 = state_13035__$1;(statearr_13074_13112[(2)] = inst_12979);
(statearr_13074_13112[(1)] = (9));
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
});})(c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__5791__auto__,c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13078 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13078[(0)] = state_machine__5792__auto__);
(statearr_13078[(1)] = (1));
return statearr_13078;
});
var state_machine__5792__auto____1 = (function (state_13035){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13035);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13079){if((e13079 instanceof Object))
{var ex__5795__auto__ = e13079;var statearr_13080_13113 = state_13035;(statearr_13080_13113[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13035);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13079;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13114 = state_13035;
state_13035 = G__13114;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13035){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13035);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__5808__auto__ = (function (){var statearr_13081 = f__5807__auto__.call(null);(statearr_13081[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13082);
return statearr_13081;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13082,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
cljs.core.async.Pub = (function (){var obj13116 = {};return obj13116;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3612__auto__ = p;if(and__3612__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3612__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4260__auto__ = (((p == null))?null:p);return (function (){var or__3624__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3612__auto__ = p;if(and__3612__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3612__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4260__auto__ = (((p == null))?null:p);return (function (){var or__3624__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3612__auto__ = p;if(and__3612__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3612__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4260__auto__ = (((p == null))?null:p);return (function (){var or__3624__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3612__auto__ = p;if(and__3612__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3612__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4260__auto__ = (((p == null))?null:p);return (function (){var or__3624__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4260__auto__)]);if(or__3624__auto__)
{return or__3624__auto__;
} else
{var or__3624__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3624__auto____$1)
{return or__3624__auto____$1;
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
return (function (topic){var or__3624__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3624__auto__))
{return or__3624__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3624__auto__,mults){
return (function (p1__13117_SHARP_){if(cljs.core.truth_(p1__13117_SHARP_.call(null,topic)))
{return p1__13117_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__13117_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3624__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t13240 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13240 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta13241){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta13241 = meta13241;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13240.cljs$lang$type = true;
cljs.core.async.t13240.cljs$lang$ctorStr = "cljs.core.async/t13240";
cljs.core.async.t13240.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t13240");
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t13240.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13240.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_13242){var self__ = this;
var _13242__$1 = this;return self__.meta13241;
});})(mults,ensure_mult))
;
cljs.core.async.t13240.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_13242,meta13241__$1){var self__ = this;
var _13242__$1 = this;return (new cljs.core.async.t13240(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta13241__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t13240 = ((function (mults,ensure_mult){
return (function __GT_t13240(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13241){return (new cljs.core.async.t13240(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13241));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t13240(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__5806__auto___13362 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13362,mults,ensure_mult,p){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13362,mults,ensure_mult,p){
return (function (state_13314){var state_val_13315 = (state_13314[(1)]);if((state_val_13315 === (7)))
{var inst_13310 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13316_13363 = state_13314__$1;(statearr_13316_13363[(2)] = inst_13310);
(statearr_13316_13363[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (20)))
{var state_13314__$1 = state_13314;var statearr_13317_13364 = state_13314__$1;(statearr_13317_13364[(2)] = null);
(statearr_13317_13364[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (1)))
{var state_13314__$1 = state_13314;var statearr_13318_13365 = state_13314__$1;(statearr_13318_13365[(2)] = null);
(statearr_13318_13365[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (24)))
{var inst_13293 = (state_13314[(7)]);var inst_13302 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_13293);var state_13314__$1 = state_13314;var statearr_13319_13366 = state_13314__$1;(statearr_13319_13366[(2)] = inst_13302);
(statearr_13319_13366[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (4)))
{var inst_13245 = (state_13314[(8)]);var inst_13245__$1 = (state_13314[(2)]);var inst_13246 = (inst_13245__$1 == null);var state_13314__$1 = (function (){var statearr_13320 = state_13314;(statearr_13320[(8)] = inst_13245__$1);
return statearr_13320;
})();if(cljs.core.truth_(inst_13246))
{var statearr_13321_13367 = state_13314__$1;(statearr_13321_13367[(1)] = (5));
} else
{var statearr_13322_13368 = state_13314__$1;(statearr_13322_13368[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (15)))
{var inst_13287 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13323_13369 = state_13314__$1;(statearr_13323_13369[(2)] = inst_13287);
(statearr_13323_13369[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (21)))
{var inst_13307 = (state_13314[(2)]);var state_13314__$1 = (function (){var statearr_13324 = state_13314;(statearr_13324[(9)] = inst_13307);
return statearr_13324;
})();var statearr_13325_13370 = state_13314__$1;(statearr_13325_13370[(2)] = null);
(statearr_13325_13370[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (13)))
{var inst_13269 = (state_13314[(10)]);var inst_13271 = cljs.core.chunked_seq_QMARK_.call(null,inst_13269);var state_13314__$1 = state_13314;if(inst_13271)
{var statearr_13326_13371 = state_13314__$1;(statearr_13326_13371[(1)] = (16));
} else
{var statearr_13327_13372 = state_13314__$1;(statearr_13327_13372[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (22)))
{var inst_13299 = (state_13314[(2)]);var state_13314__$1 = state_13314;if(cljs.core.truth_(inst_13299))
{var statearr_13328_13373 = state_13314__$1;(statearr_13328_13373[(1)] = (23));
} else
{var statearr_13329_13374 = state_13314__$1;(statearr_13329_13374[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (6)))
{var inst_13293 = (state_13314[(7)]);var inst_13295 = (state_13314[(11)]);var inst_13245 = (state_13314[(8)]);var inst_13293__$1 = topic_fn.call(null,inst_13245);var inst_13294 = cljs.core.deref.call(null,mults);var inst_13295__$1 = cljs.core.get.call(null,inst_13294,inst_13293__$1);var state_13314__$1 = (function (){var statearr_13330 = state_13314;(statearr_13330[(7)] = inst_13293__$1);
(statearr_13330[(11)] = inst_13295__$1);
return statearr_13330;
})();if(cljs.core.truth_(inst_13295__$1))
{var statearr_13331_13375 = state_13314__$1;(statearr_13331_13375[(1)] = (19));
} else
{var statearr_13332_13376 = state_13314__$1;(statearr_13332_13376[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (25)))
{var inst_13304 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13333_13377 = state_13314__$1;(statearr_13333_13377[(2)] = inst_13304);
(statearr_13333_13377[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (17)))
{var inst_13269 = (state_13314[(10)]);var inst_13278 = cljs.core.first.call(null,inst_13269);var inst_13279 = cljs.core.async.muxch_STAR_.call(null,inst_13278);var inst_13280 = cljs.core.async.close_BANG_.call(null,inst_13279);var inst_13281 = cljs.core.next.call(null,inst_13269);var inst_13255 = inst_13281;var inst_13256 = null;var inst_13257 = (0);var inst_13258 = (0);var state_13314__$1 = (function (){var statearr_13334 = state_13314;(statearr_13334[(12)] = inst_13256);
(statearr_13334[(13)] = inst_13257);
(statearr_13334[(14)] = inst_13255);
(statearr_13334[(15)] = inst_13280);
(statearr_13334[(16)] = inst_13258);
return statearr_13334;
})();var statearr_13335_13378 = state_13314__$1;(statearr_13335_13378[(2)] = null);
(statearr_13335_13378[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (3)))
{var inst_13312 = (state_13314[(2)]);var state_13314__$1 = state_13314;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13314__$1,inst_13312);
} else
{if((state_val_13315 === (12)))
{var inst_13289 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13336_13379 = state_13314__$1;(statearr_13336_13379[(2)] = inst_13289);
(statearr_13336_13379[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (2)))
{var state_13314__$1 = state_13314;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13314__$1,(4),ch);
} else
{if((state_val_13315 === (23)))
{var state_13314__$1 = state_13314;var statearr_13337_13380 = state_13314__$1;(statearr_13337_13380[(2)] = null);
(statearr_13337_13380[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (19)))
{var inst_13295 = (state_13314[(11)]);var inst_13245 = (state_13314[(8)]);var inst_13297 = cljs.core.async.muxch_STAR_.call(null,inst_13295);var state_13314__$1 = state_13314;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13314__$1,(22),inst_13297,inst_13245);
} else
{if((state_val_13315 === (11)))
{var inst_13255 = (state_13314[(14)]);var inst_13269 = (state_13314[(10)]);var inst_13269__$1 = cljs.core.seq.call(null,inst_13255);var state_13314__$1 = (function (){var statearr_13338 = state_13314;(statearr_13338[(10)] = inst_13269__$1);
return statearr_13338;
})();if(inst_13269__$1)
{var statearr_13339_13381 = state_13314__$1;(statearr_13339_13381[(1)] = (13));
} else
{var statearr_13340_13382 = state_13314__$1;(statearr_13340_13382[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (9)))
{var inst_13291 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13341_13383 = state_13314__$1;(statearr_13341_13383[(2)] = inst_13291);
(statearr_13341_13383[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (5)))
{var inst_13252 = cljs.core.deref.call(null,mults);var inst_13253 = cljs.core.vals.call(null,inst_13252);var inst_13254 = cljs.core.seq.call(null,inst_13253);var inst_13255 = inst_13254;var inst_13256 = null;var inst_13257 = (0);var inst_13258 = (0);var state_13314__$1 = (function (){var statearr_13342 = state_13314;(statearr_13342[(12)] = inst_13256);
(statearr_13342[(13)] = inst_13257);
(statearr_13342[(14)] = inst_13255);
(statearr_13342[(16)] = inst_13258);
return statearr_13342;
})();var statearr_13343_13384 = state_13314__$1;(statearr_13343_13384[(2)] = null);
(statearr_13343_13384[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (14)))
{var state_13314__$1 = state_13314;var statearr_13347_13385 = state_13314__$1;(statearr_13347_13385[(2)] = null);
(statearr_13347_13385[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (16)))
{var inst_13269 = (state_13314[(10)]);var inst_13273 = cljs.core.chunk_first.call(null,inst_13269);var inst_13274 = cljs.core.chunk_rest.call(null,inst_13269);var inst_13275 = cljs.core.count.call(null,inst_13273);var inst_13255 = inst_13274;var inst_13256 = inst_13273;var inst_13257 = inst_13275;var inst_13258 = (0);var state_13314__$1 = (function (){var statearr_13348 = state_13314;(statearr_13348[(12)] = inst_13256);
(statearr_13348[(13)] = inst_13257);
(statearr_13348[(14)] = inst_13255);
(statearr_13348[(16)] = inst_13258);
return statearr_13348;
})();var statearr_13349_13386 = state_13314__$1;(statearr_13349_13386[(2)] = null);
(statearr_13349_13386[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (10)))
{var inst_13256 = (state_13314[(12)]);var inst_13257 = (state_13314[(13)]);var inst_13255 = (state_13314[(14)]);var inst_13258 = (state_13314[(16)]);var inst_13263 = cljs.core._nth.call(null,inst_13256,inst_13258);var inst_13264 = cljs.core.async.muxch_STAR_.call(null,inst_13263);var inst_13265 = cljs.core.async.close_BANG_.call(null,inst_13264);var inst_13266 = (inst_13258 + (1));var tmp13344 = inst_13256;var tmp13345 = inst_13257;var tmp13346 = inst_13255;var inst_13255__$1 = tmp13346;var inst_13256__$1 = tmp13344;var inst_13257__$1 = tmp13345;var inst_13258__$1 = inst_13266;var state_13314__$1 = (function (){var statearr_13350 = state_13314;(statearr_13350[(12)] = inst_13256__$1);
(statearr_13350[(13)] = inst_13257__$1);
(statearr_13350[(17)] = inst_13265);
(statearr_13350[(14)] = inst_13255__$1);
(statearr_13350[(16)] = inst_13258__$1);
return statearr_13350;
})();var statearr_13351_13387 = state_13314__$1;(statearr_13351_13387[(2)] = null);
(statearr_13351_13387[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (18)))
{var inst_13284 = (state_13314[(2)]);var state_13314__$1 = state_13314;var statearr_13352_13388 = state_13314__$1;(statearr_13352_13388[(2)] = inst_13284);
(statearr_13352_13388[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13315 === (8)))
{var inst_13257 = (state_13314[(13)]);var inst_13258 = (state_13314[(16)]);var inst_13260 = (inst_13258 < inst_13257);var inst_13261 = inst_13260;var state_13314__$1 = state_13314;if(cljs.core.truth_(inst_13261))
{var statearr_13353_13389 = state_13314__$1;(statearr_13353_13389[(1)] = (10));
} else
{var statearr_13354_13390 = state_13314__$1;(statearr_13354_13390[(1)] = (11));
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
});})(c__5806__auto___13362,mults,ensure_mult,p))
;return ((function (switch__5791__auto__,c__5806__auto___13362,mults,ensure_mult,p){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13358 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13358[(0)] = state_machine__5792__auto__);
(statearr_13358[(1)] = (1));
return statearr_13358;
});
var state_machine__5792__auto____1 = (function (state_13314){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13314);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13359){if((e13359 instanceof Object))
{var ex__5795__auto__ = e13359;var statearr_13360_13391 = state_13314;(statearr_13360_13391[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13314);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13359;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13392 = state_13314;
state_13314 = G__13392;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13314){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13314);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13362,mults,ensure_mult,p))
})();var state__5808__auto__ = (function (){var statearr_13361 = f__5807__auto__.call(null);(statearr_13361[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13362);
return statearr_13361;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13362,mults,ensure_mult,p))
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
,cljs.core.range.call(null,cnt));var c__5806__auto___13529 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_13499){var state_val_13500 = (state_13499[(1)]);if((state_val_13500 === (7)))
{var state_13499__$1 = state_13499;var statearr_13501_13530 = state_13499__$1;(statearr_13501_13530[(2)] = null);
(statearr_13501_13530[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (1)))
{var state_13499__$1 = state_13499;var statearr_13502_13531 = state_13499__$1;(statearr_13502_13531[(2)] = null);
(statearr_13502_13531[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (4)))
{var inst_13463 = (state_13499[(7)]);var inst_13465 = (inst_13463 < cnt);var state_13499__$1 = state_13499;if(cljs.core.truth_(inst_13465))
{var statearr_13503_13532 = state_13499__$1;(statearr_13503_13532[(1)] = (6));
} else
{var statearr_13504_13533 = state_13499__$1;(statearr_13504_13533[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (15)))
{var inst_13495 = (state_13499[(2)]);var state_13499__$1 = state_13499;var statearr_13505_13534 = state_13499__$1;(statearr_13505_13534[(2)] = inst_13495);
(statearr_13505_13534[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (13)))
{var inst_13488 = cljs.core.async.close_BANG_.call(null,out);var state_13499__$1 = state_13499;var statearr_13506_13535 = state_13499__$1;(statearr_13506_13535[(2)] = inst_13488);
(statearr_13506_13535[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (6)))
{var state_13499__$1 = state_13499;var statearr_13507_13536 = state_13499__$1;(statearr_13507_13536[(2)] = null);
(statearr_13507_13536[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (3)))
{var inst_13497 = (state_13499[(2)]);var state_13499__$1 = state_13499;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13499__$1,inst_13497);
} else
{if((state_val_13500 === (12)))
{var inst_13485 = (state_13499[(8)]);var inst_13485__$1 = (state_13499[(2)]);var inst_13486 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_13485__$1);var state_13499__$1 = (function (){var statearr_13508 = state_13499;(statearr_13508[(8)] = inst_13485__$1);
return statearr_13508;
})();if(cljs.core.truth_(inst_13486))
{var statearr_13509_13537 = state_13499__$1;(statearr_13509_13537[(1)] = (13));
} else
{var statearr_13510_13538 = state_13499__$1;(statearr_13510_13538[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (2)))
{var inst_13462 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_13463 = (0);var state_13499__$1 = (function (){var statearr_13511 = state_13499;(statearr_13511[(7)] = inst_13463);
(statearr_13511[(9)] = inst_13462);
return statearr_13511;
})();var statearr_13512_13539 = state_13499__$1;(statearr_13512_13539[(2)] = null);
(statearr_13512_13539[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (11)))
{var inst_13463 = (state_13499[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_13499,(10),Object,null,(9));var inst_13472 = chs__$1.call(null,inst_13463);var inst_13473 = done.call(null,inst_13463);var inst_13474 = cljs.core.async.take_BANG_.call(null,inst_13472,inst_13473);var state_13499__$1 = state_13499;var statearr_13513_13540 = state_13499__$1;(statearr_13513_13540[(2)] = inst_13474);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13499__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (9)))
{var inst_13463 = (state_13499[(7)]);var inst_13476 = (state_13499[(2)]);var inst_13477 = (inst_13463 + (1));var inst_13463__$1 = inst_13477;var state_13499__$1 = (function (){var statearr_13514 = state_13499;(statearr_13514[(7)] = inst_13463__$1);
(statearr_13514[(10)] = inst_13476);
return statearr_13514;
})();var statearr_13515_13541 = state_13499__$1;(statearr_13515_13541[(2)] = null);
(statearr_13515_13541[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (5)))
{var inst_13483 = (state_13499[(2)]);var state_13499__$1 = (function (){var statearr_13516 = state_13499;(statearr_13516[(11)] = inst_13483);
return statearr_13516;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13499__$1,(12),dchan);
} else
{if((state_val_13500 === (14)))
{var inst_13485 = (state_13499[(8)]);var inst_13490 = cljs.core.apply.call(null,f,inst_13485);var state_13499__$1 = state_13499;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13499__$1,(16),out,inst_13490);
} else
{if((state_val_13500 === (16)))
{var inst_13492 = (state_13499[(2)]);var state_13499__$1 = (function (){var statearr_13517 = state_13499;(statearr_13517[(12)] = inst_13492);
return statearr_13517;
})();var statearr_13518_13542 = state_13499__$1;(statearr_13518_13542[(2)] = null);
(statearr_13518_13542[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (10)))
{var inst_13467 = (state_13499[(2)]);var inst_13468 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_13499__$1 = (function (){var statearr_13519 = state_13499;(statearr_13519[(13)] = inst_13467);
return statearr_13519;
})();var statearr_13520_13543 = state_13499__$1;(statearr_13520_13543[(2)] = inst_13468);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13499__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13500 === (8)))
{var inst_13481 = (state_13499[(2)]);var state_13499__$1 = state_13499;var statearr_13521_13544 = state_13499__$1;(statearr_13521_13544[(2)] = inst_13481);
(statearr_13521_13544[(1)] = (5));
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
});})(c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__5791__auto__,c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13525 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13525[(0)] = state_machine__5792__auto__);
(statearr_13525[(1)] = (1));
return statearr_13525;
});
var state_machine__5792__auto____1 = (function (state_13499){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13499);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13526){if((e13526 instanceof Object))
{var ex__5795__auto__ = e13526;var statearr_13527_13545 = state_13499;(statearr_13527_13545[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13499);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13526;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13546 = state_13499;
state_13499 = G__13546;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13499){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13499);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__5808__auto__ = (function (){var statearr_13528 = f__5807__auto__.call(null);(statearr_13528[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13529);
return statearr_13528;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13529,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___13654 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13654,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13654,out){
return (function (state_13630){var state_val_13631 = (state_13630[(1)]);if((state_val_13631 === (7)))
{var inst_13610 = (state_13630[(7)]);var inst_13609 = (state_13630[(8)]);var inst_13609__$1 = (state_13630[(2)]);var inst_13610__$1 = cljs.core.nth.call(null,inst_13609__$1,(0),null);var inst_13611 = cljs.core.nth.call(null,inst_13609__$1,(1),null);var inst_13612 = (inst_13610__$1 == null);var state_13630__$1 = (function (){var statearr_13632 = state_13630;(statearr_13632[(7)] = inst_13610__$1);
(statearr_13632[(8)] = inst_13609__$1);
(statearr_13632[(9)] = inst_13611);
return statearr_13632;
})();if(cljs.core.truth_(inst_13612))
{var statearr_13633_13655 = state_13630__$1;(statearr_13633_13655[(1)] = (8));
} else
{var statearr_13634_13656 = state_13630__$1;(statearr_13634_13656[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (1)))
{var inst_13601 = cljs.core.vec.call(null,chs);var inst_13602 = inst_13601;var state_13630__$1 = (function (){var statearr_13635 = state_13630;(statearr_13635[(10)] = inst_13602);
return statearr_13635;
})();var statearr_13636_13657 = state_13630__$1;(statearr_13636_13657[(2)] = null);
(statearr_13636_13657[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (4)))
{var inst_13602 = (state_13630[(10)]);var state_13630__$1 = state_13630;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13630__$1,(7),inst_13602);
} else
{if((state_val_13631 === (6)))
{var inst_13626 = (state_13630[(2)]);var state_13630__$1 = state_13630;var statearr_13637_13658 = state_13630__$1;(statearr_13637_13658[(2)] = inst_13626);
(statearr_13637_13658[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (3)))
{var inst_13628 = (state_13630[(2)]);var state_13630__$1 = state_13630;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13630__$1,inst_13628);
} else
{if((state_val_13631 === (2)))
{var inst_13602 = (state_13630[(10)]);var inst_13604 = cljs.core.count.call(null,inst_13602);var inst_13605 = (inst_13604 > (0));var state_13630__$1 = state_13630;if(cljs.core.truth_(inst_13605))
{var statearr_13639_13659 = state_13630__$1;(statearr_13639_13659[(1)] = (4));
} else
{var statearr_13640_13660 = state_13630__$1;(statearr_13640_13660[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (11)))
{var inst_13602 = (state_13630[(10)]);var inst_13619 = (state_13630[(2)]);var tmp13638 = inst_13602;var inst_13602__$1 = tmp13638;var state_13630__$1 = (function (){var statearr_13641 = state_13630;(statearr_13641[(10)] = inst_13602__$1);
(statearr_13641[(11)] = inst_13619);
return statearr_13641;
})();var statearr_13642_13661 = state_13630__$1;(statearr_13642_13661[(2)] = null);
(statearr_13642_13661[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (9)))
{var inst_13610 = (state_13630[(7)]);var state_13630__$1 = state_13630;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13630__$1,(11),out,inst_13610);
} else
{if((state_val_13631 === (5)))
{var inst_13624 = cljs.core.async.close_BANG_.call(null,out);var state_13630__$1 = state_13630;var statearr_13643_13662 = state_13630__$1;(statearr_13643_13662[(2)] = inst_13624);
(statearr_13643_13662[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (10)))
{var inst_13622 = (state_13630[(2)]);var state_13630__$1 = state_13630;var statearr_13644_13663 = state_13630__$1;(statearr_13644_13663[(2)] = inst_13622);
(statearr_13644_13663[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13631 === (8)))
{var inst_13602 = (state_13630[(10)]);var inst_13610 = (state_13630[(7)]);var inst_13609 = (state_13630[(8)]);var inst_13611 = (state_13630[(9)]);var inst_13614 = (function (){var c = inst_13611;var v = inst_13610;var vec__13607 = inst_13609;var cs = inst_13602;return ((function (c,v,vec__13607,cs,inst_13602,inst_13610,inst_13609,inst_13611,state_val_13631,c__5806__auto___13654,out){
return (function (p1__13547_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__13547_SHARP_);
});
;})(c,v,vec__13607,cs,inst_13602,inst_13610,inst_13609,inst_13611,state_val_13631,c__5806__auto___13654,out))
})();var inst_13615 = cljs.core.filterv.call(null,inst_13614,inst_13602);var inst_13602__$1 = inst_13615;var state_13630__$1 = (function (){var statearr_13645 = state_13630;(statearr_13645[(10)] = inst_13602__$1);
return statearr_13645;
})();var statearr_13646_13664 = state_13630__$1;(statearr_13646_13664[(2)] = null);
(statearr_13646_13664[(1)] = (2));
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
});})(c__5806__auto___13654,out))
;return ((function (switch__5791__auto__,c__5806__auto___13654,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13650 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13650[(0)] = state_machine__5792__auto__);
(statearr_13650[(1)] = (1));
return statearr_13650;
});
var state_machine__5792__auto____1 = (function (state_13630){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13630);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13651){if((e13651 instanceof Object))
{var ex__5795__auto__ = e13651;var statearr_13652_13665 = state_13630;(statearr_13652_13665[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13630);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13651;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13666 = state_13630;
state_13630 = G__13666;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13630){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13630);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13654,out))
})();var state__5808__auto__ = (function (){var statearr_13653 = f__5807__auto__.call(null);(statearr_13653[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13654);
return statearr_13653;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13654,out))
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
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___13759 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13759,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13759,out){
return (function (state_13736){var state_val_13737 = (state_13736[(1)]);if((state_val_13737 === (7)))
{var inst_13718 = (state_13736[(7)]);var inst_13718__$1 = (state_13736[(2)]);var inst_13719 = (inst_13718__$1 == null);var inst_13720 = cljs.core.not.call(null,inst_13719);var state_13736__$1 = (function (){var statearr_13738 = state_13736;(statearr_13738[(7)] = inst_13718__$1);
return statearr_13738;
})();if(inst_13720)
{var statearr_13739_13760 = state_13736__$1;(statearr_13739_13760[(1)] = (8));
} else
{var statearr_13740_13761 = state_13736__$1;(statearr_13740_13761[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (1)))
{var inst_13713 = (0);var state_13736__$1 = (function (){var statearr_13741 = state_13736;(statearr_13741[(8)] = inst_13713);
return statearr_13741;
})();var statearr_13742_13762 = state_13736__$1;(statearr_13742_13762[(2)] = null);
(statearr_13742_13762[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (4)))
{var state_13736__$1 = state_13736;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13736__$1,(7),ch);
} else
{if((state_val_13737 === (6)))
{var inst_13731 = (state_13736[(2)]);var state_13736__$1 = state_13736;var statearr_13743_13763 = state_13736__$1;(statearr_13743_13763[(2)] = inst_13731);
(statearr_13743_13763[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (3)))
{var inst_13733 = (state_13736[(2)]);var inst_13734 = cljs.core.async.close_BANG_.call(null,out);var state_13736__$1 = (function (){var statearr_13744 = state_13736;(statearr_13744[(9)] = inst_13733);
return statearr_13744;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13736__$1,inst_13734);
} else
{if((state_val_13737 === (2)))
{var inst_13713 = (state_13736[(8)]);var inst_13715 = (inst_13713 < n);var state_13736__$1 = state_13736;if(cljs.core.truth_(inst_13715))
{var statearr_13745_13764 = state_13736__$1;(statearr_13745_13764[(1)] = (4));
} else
{var statearr_13746_13765 = state_13736__$1;(statearr_13746_13765[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (11)))
{var inst_13713 = (state_13736[(8)]);var inst_13723 = (state_13736[(2)]);var inst_13724 = (inst_13713 + (1));var inst_13713__$1 = inst_13724;var state_13736__$1 = (function (){var statearr_13747 = state_13736;(statearr_13747[(10)] = inst_13723);
(statearr_13747[(8)] = inst_13713__$1);
return statearr_13747;
})();var statearr_13748_13766 = state_13736__$1;(statearr_13748_13766[(2)] = null);
(statearr_13748_13766[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (9)))
{var state_13736__$1 = state_13736;var statearr_13749_13767 = state_13736__$1;(statearr_13749_13767[(2)] = null);
(statearr_13749_13767[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (5)))
{var state_13736__$1 = state_13736;var statearr_13750_13768 = state_13736__$1;(statearr_13750_13768[(2)] = null);
(statearr_13750_13768[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (10)))
{var inst_13728 = (state_13736[(2)]);var state_13736__$1 = state_13736;var statearr_13751_13769 = state_13736__$1;(statearr_13751_13769[(2)] = inst_13728);
(statearr_13751_13769[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13737 === (8)))
{var inst_13718 = (state_13736[(7)]);var state_13736__$1 = state_13736;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13736__$1,(11),out,inst_13718);
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
});})(c__5806__auto___13759,out))
;return ((function (switch__5791__auto__,c__5806__auto___13759,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13755 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_13755[(0)] = state_machine__5792__auto__);
(statearr_13755[(1)] = (1));
return statearr_13755;
});
var state_machine__5792__auto____1 = (function (state_13736){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13736);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13756){if((e13756 instanceof Object))
{var ex__5795__auto__ = e13756;var statearr_13757_13770 = state_13736;(statearr_13757_13770[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13736);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13756;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13771 = state_13736;
state_13736 = G__13771;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13736){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13736);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13759,out))
})();var state__5808__auto__ = (function (){var statearr_13758 = f__5807__auto__.call(null);(statearr_13758[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13759);
return statearr_13758;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13759,out))
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
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t13779 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13779 = (function (ch,f,map_LT_,meta13780){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta13780 = meta13780;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13779.cljs$lang$type = true;
cljs.core.async.t13779.cljs$lang$ctorStr = "cljs.core.async/t13779";
cljs.core.async.t13779.cljs$lang$ctorPrWriter = (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t13779");
});
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t13782 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13782 = (function (fn1,_,meta13780,ch,f,map_LT_,meta13783){
this.fn1 = fn1;
this._ = _;
this.meta13780 = meta13780;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta13783 = meta13783;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13782.cljs$lang$type = true;
cljs.core.async.t13782.cljs$lang$ctorStr = "cljs.core.async/t13782";
cljs.core.async.t13782.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t13782");
});})(___$1))
;
cljs.core.async.t13782.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t13782.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t13782.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t13782.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__13772_SHARP_){return f1.call(null,(((p1__13772_SHARP_ == null))?null:self__.f.call(null,p1__13772_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t13782.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_13784){var self__ = this;
var _13784__$1 = this;return self__.meta13783;
});})(___$1))
;
cljs.core.async.t13782.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_13784,meta13783__$1){var self__ = this;
var _13784__$1 = this;return (new cljs.core.async.t13782(self__.fn1,self__._,self__.meta13780,self__.ch,self__.f,self__.map_LT_,meta13783__$1));
});})(___$1))
;
cljs.core.async.__GT_t13782 = ((function (___$1){
return (function __GT_t13782(fn1__$1,___$2,meta13780__$1,ch__$2,f__$2,map_LT___$2,meta13783){return (new cljs.core.async.t13782(fn1__$1,___$2,meta13780__$1,ch__$2,f__$2,map_LT___$2,meta13783));
});})(___$1))
;
}
return (new cljs.core.async.t13782(fn1,___$1,self__.meta13780,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3612__auto__ = ret;if(cljs.core.truth_(and__3612__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3612__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t13779.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t13779.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13781){var self__ = this;
var _13781__$1 = this;return self__.meta13780;
});
cljs.core.async.t13779.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13781,meta13780__$1){var self__ = this;
var _13781__$1 = this;return (new cljs.core.async.t13779(self__.ch,self__.f,self__.map_LT_,meta13780__$1));
});
cljs.core.async.__GT_t13779 = (function __GT_t13779(ch__$1,f__$1,map_LT___$1,meta13780){return (new cljs.core.async.t13779(ch__$1,f__$1,map_LT___$1,meta13780));
});
}
return (new cljs.core.async.t13779(ch,f,map_LT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t13788 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13788 = (function (ch,f,map_GT_,meta13789){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta13789 = meta13789;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13788.cljs$lang$type = true;
cljs.core.async.t13788.cljs$lang$ctorStr = "cljs.core.async/t13788";
cljs.core.async.t13788.cljs$lang$ctorPrWriter = (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t13788");
});
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t13788.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t13788.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13790){var self__ = this;
var _13790__$1 = this;return self__.meta13789;
});
cljs.core.async.t13788.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13790,meta13789__$1){var self__ = this;
var _13790__$1 = this;return (new cljs.core.async.t13788(self__.ch,self__.f,self__.map_GT_,meta13789__$1));
});
cljs.core.async.__GT_t13788 = (function __GT_t13788(ch__$1,f__$1,map_GT___$1,meta13789){return (new cljs.core.async.t13788(ch__$1,f__$1,map_GT___$1,meta13789));
});
}
return (new cljs.core.async.t13788(ch,f,map_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t13794 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13794 = (function (ch,p,filter_GT_,meta13795){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta13795 = meta13795;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13794.cljs$lang$type = true;
cljs.core.async.t13794.cljs$lang$ctorStr = "cljs.core.async/t13794";
cljs.core.async.t13794.cljs$lang$ctorPrWriter = (function (this__4200__auto__,writer__4201__auto__,opt__4202__auto__){return cljs.core._write.call(null,writer__4201__auto__,"cljs.core.async/t13794");
});
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t13794.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t13794.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_13796){var self__ = this;
var _13796__$1 = this;return self__.meta13795;
});
cljs.core.async.t13794.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_13796,meta13795__$1){var self__ = this;
var _13796__$1 = this;return (new cljs.core.async.t13794(self__.ch,self__.p,self__.filter_GT_,meta13795__$1));
});
cljs.core.async.__GT_t13794 = (function __GT_t13794(ch__$1,p__$1,filter_GT___$1,meta13795){return (new cljs.core.async.t13794(ch__$1,p__$1,filter_GT___$1,meta13795));
});
}
return (new cljs.core.async.t13794(ch,p,filter_GT_,null));
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
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___13879 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___13879,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___13879,out){
return (function (state_13858){var state_val_13859 = (state_13858[(1)]);if((state_val_13859 === (7)))
{var inst_13854 = (state_13858[(2)]);var state_13858__$1 = state_13858;var statearr_13860_13880 = state_13858__$1;(statearr_13860_13880[(2)] = inst_13854);
(statearr_13860_13880[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (1)))
{var state_13858__$1 = state_13858;var statearr_13861_13881 = state_13858__$1;(statearr_13861_13881[(2)] = null);
(statearr_13861_13881[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (4)))
{var inst_13840 = (state_13858[(7)]);var inst_13840__$1 = (state_13858[(2)]);var inst_13841 = (inst_13840__$1 == null);var state_13858__$1 = (function (){var statearr_13862 = state_13858;(statearr_13862[(7)] = inst_13840__$1);
return statearr_13862;
})();if(cljs.core.truth_(inst_13841))
{var statearr_13863_13882 = state_13858__$1;(statearr_13863_13882[(1)] = (5));
} else
{var statearr_13864_13883 = state_13858__$1;(statearr_13864_13883[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (6)))
{var inst_13840 = (state_13858[(7)]);var inst_13845 = p.call(null,inst_13840);var state_13858__$1 = state_13858;if(cljs.core.truth_(inst_13845))
{var statearr_13865_13884 = state_13858__$1;(statearr_13865_13884[(1)] = (8));
} else
{var statearr_13866_13885 = state_13858__$1;(statearr_13866_13885[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (3)))
{var inst_13856 = (state_13858[(2)]);var state_13858__$1 = state_13858;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13858__$1,inst_13856);
} else
{if((state_val_13859 === (2)))
{var state_13858__$1 = state_13858;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13858__$1,(4),ch);
} else
{if((state_val_13859 === (11)))
{var inst_13848 = (state_13858[(2)]);var state_13858__$1 = state_13858;var statearr_13867_13886 = state_13858__$1;(statearr_13867_13886[(2)] = inst_13848);
(statearr_13867_13886[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (9)))
{var state_13858__$1 = state_13858;var statearr_13868_13887 = state_13858__$1;(statearr_13868_13887[(2)] = null);
(statearr_13868_13887[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (5)))
{var inst_13843 = cljs.core.async.close_BANG_.call(null,out);var state_13858__$1 = state_13858;var statearr_13869_13888 = state_13858__$1;(statearr_13869_13888[(2)] = inst_13843);
(statearr_13869_13888[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (10)))
{var inst_13851 = (state_13858[(2)]);var state_13858__$1 = (function (){var statearr_13870 = state_13858;(statearr_13870[(8)] = inst_13851);
return statearr_13870;
})();var statearr_13871_13889 = state_13858__$1;(statearr_13871_13889[(2)] = null);
(statearr_13871_13889[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13859 === (8)))
{var inst_13840 = (state_13858[(7)]);var state_13858__$1 = state_13858;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13858__$1,(11),out,inst_13840);
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
});})(c__5806__auto___13879,out))
;return ((function (switch__5791__auto__,c__5806__auto___13879,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_13875 = [null,null,null,null,null,null,null,null,null];(statearr_13875[(0)] = state_machine__5792__auto__);
(statearr_13875[(1)] = (1));
return statearr_13875;
});
var state_machine__5792__auto____1 = (function (state_13858){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_13858);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e13876){if((e13876 instanceof Object))
{var ex__5795__auto__ = e13876;var statearr_13877_13890 = state_13858;(statearr_13877_13890[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13858);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13876;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13891 = state_13858;
state_13858 = G__13891;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_13858){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_13858);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___13879,out))
})();var state__5808__auto__ = (function (){var statearr_13878 = f__5807__auto__.call(null);(statearr_13878[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___13879);
return statearr_13878;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___13879,out))
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
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__5806__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto__){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto__){
return (function (state_14057){var state_val_14058 = (state_14057[(1)]);if((state_val_14058 === (7)))
{var inst_14053 = (state_14057[(2)]);var state_14057__$1 = state_14057;var statearr_14059_14100 = state_14057__$1;(statearr_14059_14100[(2)] = inst_14053);
(statearr_14059_14100[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (20)))
{var inst_14023 = (state_14057[(7)]);var inst_14034 = (state_14057[(2)]);var inst_14035 = cljs.core.next.call(null,inst_14023);var inst_14009 = inst_14035;var inst_14010 = null;var inst_14011 = (0);var inst_14012 = (0);var state_14057__$1 = (function (){var statearr_14060 = state_14057;(statearr_14060[(8)] = inst_14009);
(statearr_14060[(9)] = inst_14010);
(statearr_14060[(10)] = inst_14034);
(statearr_14060[(11)] = inst_14012);
(statearr_14060[(12)] = inst_14011);
return statearr_14060;
})();var statearr_14061_14101 = state_14057__$1;(statearr_14061_14101[(2)] = null);
(statearr_14061_14101[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (1)))
{var state_14057__$1 = state_14057;var statearr_14062_14102 = state_14057__$1;(statearr_14062_14102[(2)] = null);
(statearr_14062_14102[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (4)))
{var inst_13998 = (state_14057[(13)]);var inst_13998__$1 = (state_14057[(2)]);var inst_13999 = (inst_13998__$1 == null);var state_14057__$1 = (function (){var statearr_14063 = state_14057;(statearr_14063[(13)] = inst_13998__$1);
return statearr_14063;
})();if(cljs.core.truth_(inst_13999))
{var statearr_14064_14103 = state_14057__$1;(statearr_14064_14103[(1)] = (5));
} else
{var statearr_14065_14104 = state_14057__$1;(statearr_14065_14104[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (15)))
{var state_14057__$1 = state_14057;var statearr_14069_14105 = state_14057__$1;(statearr_14069_14105[(2)] = null);
(statearr_14069_14105[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (21)))
{var state_14057__$1 = state_14057;var statearr_14070_14106 = state_14057__$1;(statearr_14070_14106[(2)] = null);
(statearr_14070_14106[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (13)))
{var inst_14009 = (state_14057[(8)]);var inst_14010 = (state_14057[(9)]);var inst_14012 = (state_14057[(11)]);var inst_14011 = (state_14057[(12)]);var inst_14019 = (state_14057[(2)]);var inst_14020 = (inst_14012 + (1));var tmp14066 = inst_14009;var tmp14067 = inst_14010;var tmp14068 = inst_14011;var inst_14009__$1 = tmp14066;var inst_14010__$1 = tmp14067;var inst_14011__$1 = tmp14068;var inst_14012__$1 = inst_14020;var state_14057__$1 = (function (){var statearr_14071 = state_14057;(statearr_14071[(14)] = inst_14019);
(statearr_14071[(8)] = inst_14009__$1);
(statearr_14071[(9)] = inst_14010__$1);
(statearr_14071[(11)] = inst_14012__$1);
(statearr_14071[(12)] = inst_14011__$1);
return statearr_14071;
})();var statearr_14072_14107 = state_14057__$1;(statearr_14072_14107[(2)] = null);
(statearr_14072_14107[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (22)))
{var state_14057__$1 = state_14057;var statearr_14073_14108 = state_14057__$1;(statearr_14073_14108[(2)] = null);
(statearr_14073_14108[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (6)))
{var inst_13998 = (state_14057[(13)]);var inst_14007 = f.call(null,inst_13998);var inst_14008 = cljs.core.seq.call(null,inst_14007);var inst_14009 = inst_14008;var inst_14010 = null;var inst_14011 = (0);var inst_14012 = (0);var state_14057__$1 = (function (){var statearr_14074 = state_14057;(statearr_14074[(8)] = inst_14009);
(statearr_14074[(9)] = inst_14010);
(statearr_14074[(11)] = inst_14012);
(statearr_14074[(12)] = inst_14011);
return statearr_14074;
})();var statearr_14075_14109 = state_14057__$1;(statearr_14075_14109[(2)] = null);
(statearr_14075_14109[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (17)))
{var inst_14023 = (state_14057[(7)]);var inst_14027 = cljs.core.chunk_first.call(null,inst_14023);var inst_14028 = cljs.core.chunk_rest.call(null,inst_14023);var inst_14029 = cljs.core.count.call(null,inst_14027);var inst_14009 = inst_14028;var inst_14010 = inst_14027;var inst_14011 = inst_14029;var inst_14012 = (0);var state_14057__$1 = (function (){var statearr_14076 = state_14057;(statearr_14076[(8)] = inst_14009);
(statearr_14076[(9)] = inst_14010);
(statearr_14076[(11)] = inst_14012);
(statearr_14076[(12)] = inst_14011);
return statearr_14076;
})();var statearr_14077_14110 = state_14057__$1;(statearr_14077_14110[(2)] = null);
(statearr_14077_14110[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (3)))
{var inst_14055 = (state_14057[(2)]);var state_14057__$1 = state_14057;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14057__$1,inst_14055);
} else
{if((state_val_14058 === (12)))
{var inst_14043 = (state_14057[(2)]);var state_14057__$1 = state_14057;var statearr_14078_14111 = state_14057__$1;(statearr_14078_14111[(2)] = inst_14043);
(statearr_14078_14111[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (2)))
{var state_14057__$1 = state_14057;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14057__$1,(4),in$);
} else
{if((state_val_14058 === (23)))
{var inst_14051 = (state_14057[(2)]);var state_14057__$1 = state_14057;var statearr_14079_14112 = state_14057__$1;(statearr_14079_14112[(2)] = inst_14051);
(statearr_14079_14112[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (19)))
{var inst_14038 = (state_14057[(2)]);var state_14057__$1 = state_14057;var statearr_14080_14113 = state_14057__$1;(statearr_14080_14113[(2)] = inst_14038);
(statearr_14080_14113[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (11)))
{var inst_14009 = (state_14057[(8)]);var inst_14023 = (state_14057[(7)]);var inst_14023__$1 = cljs.core.seq.call(null,inst_14009);var state_14057__$1 = (function (){var statearr_14081 = state_14057;(statearr_14081[(7)] = inst_14023__$1);
return statearr_14081;
})();if(inst_14023__$1)
{var statearr_14082_14114 = state_14057__$1;(statearr_14082_14114[(1)] = (14));
} else
{var statearr_14083_14115 = state_14057__$1;(statearr_14083_14115[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (9)))
{var inst_14045 = (state_14057[(2)]);var inst_14046 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_14057__$1 = (function (){var statearr_14084 = state_14057;(statearr_14084[(15)] = inst_14045);
return statearr_14084;
})();if(cljs.core.truth_(inst_14046))
{var statearr_14085_14116 = state_14057__$1;(statearr_14085_14116[(1)] = (21));
} else
{var statearr_14086_14117 = state_14057__$1;(statearr_14086_14117[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (5)))
{var inst_14001 = cljs.core.async.close_BANG_.call(null,out);var state_14057__$1 = state_14057;var statearr_14087_14118 = state_14057__$1;(statearr_14087_14118[(2)] = inst_14001);
(statearr_14087_14118[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (14)))
{var inst_14023 = (state_14057[(7)]);var inst_14025 = cljs.core.chunked_seq_QMARK_.call(null,inst_14023);var state_14057__$1 = state_14057;if(inst_14025)
{var statearr_14088_14119 = state_14057__$1;(statearr_14088_14119[(1)] = (17));
} else
{var statearr_14089_14120 = state_14057__$1;(statearr_14089_14120[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (16)))
{var inst_14041 = (state_14057[(2)]);var state_14057__$1 = state_14057;var statearr_14090_14121 = state_14057__$1;(statearr_14090_14121[(2)] = inst_14041);
(statearr_14090_14121[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14058 === (10)))
{var inst_14010 = (state_14057[(9)]);var inst_14012 = (state_14057[(11)]);var inst_14017 = cljs.core._nth.call(null,inst_14010,inst_14012);var state_14057__$1 = state_14057;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14057__$1,(13),out,inst_14017);
} else
{if((state_val_14058 === (18)))
{var inst_14023 = (state_14057[(7)]);var inst_14032 = cljs.core.first.call(null,inst_14023);var state_14057__$1 = state_14057;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14057__$1,(20),out,inst_14032);
} else
{if((state_val_14058 === (8)))
{var inst_14012 = (state_14057[(11)]);var inst_14011 = (state_14057[(12)]);var inst_14014 = (inst_14012 < inst_14011);var inst_14015 = inst_14014;var state_14057__$1 = state_14057;if(cljs.core.truth_(inst_14015))
{var statearr_14091_14122 = state_14057__$1;(statearr_14091_14122[(1)] = (10));
} else
{var statearr_14092_14123 = state_14057__$1;(statearr_14092_14123[(1)] = (11));
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
});})(c__5806__auto__))
;return ((function (switch__5791__auto__,c__5806__auto__){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_14096 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14096[(0)] = state_machine__5792__auto__);
(statearr_14096[(1)] = (1));
return statearr_14096;
});
var state_machine__5792__auto____1 = (function (state_14057){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_14057);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e14097){if((e14097 instanceof Object))
{var ex__5795__auto__ = e14097;var statearr_14098_14124 = state_14057;(statearr_14098_14124[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14057);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14097;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14125 = state_14057;
state_14057 = G__14125;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_14057){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_14057);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto__))
})();var state__5808__auto__ = (function (){var statearr_14099 = f__5807__auto__.call(null);(statearr_14099[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto__);
return statearr_14099;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto__))
);
return c__5806__auto__;
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
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___14222 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___14222,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___14222,out){
return (function (state_14197){var state_val_14198 = (state_14197[(1)]);if((state_val_14198 === (7)))
{var inst_14192 = (state_14197[(2)]);var state_14197__$1 = state_14197;var statearr_14199_14223 = state_14197__$1;(statearr_14199_14223[(2)] = inst_14192);
(statearr_14199_14223[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (1)))
{var inst_14174 = null;var state_14197__$1 = (function (){var statearr_14200 = state_14197;(statearr_14200[(7)] = inst_14174);
return statearr_14200;
})();var statearr_14201_14224 = state_14197__$1;(statearr_14201_14224[(2)] = null);
(statearr_14201_14224[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (4)))
{var inst_14177 = (state_14197[(8)]);var inst_14177__$1 = (state_14197[(2)]);var inst_14178 = (inst_14177__$1 == null);var inst_14179 = cljs.core.not.call(null,inst_14178);var state_14197__$1 = (function (){var statearr_14202 = state_14197;(statearr_14202[(8)] = inst_14177__$1);
return statearr_14202;
})();if(inst_14179)
{var statearr_14203_14225 = state_14197__$1;(statearr_14203_14225[(1)] = (5));
} else
{var statearr_14204_14226 = state_14197__$1;(statearr_14204_14226[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (6)))
{var state_14197__$1 = state_14197;var statearr_14205_14227 = state_14197__$1;(statearr_14205_14227[(2)] = null);
(statearr_14205_14227[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (3)))
{var inst_14194 = (state_14197[(2)]);var inst_14195 = cljs.core.async.close_BANG_.call(null,out);var state_14197__$1 = (function (){var statearr_14206 = state_14197;(statearr_14206[(9)] = inst_14194);
return statearr_14206;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14197__$1,inst_14195);
} else
{if((state_val_14198 === (2)))
{var state_14197__$1 = state_14197;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14197__$1,(4),ch);
} else
{if((state_val_14198 === (11)))
{var inst_14177 = (state_14197[(8)]);var inst_14186 = (state_14197[(2)]);var inst_14174 = inst_14177;var state_14197__$1 = (function (){var statearr_14207 = state_14197;(statearr_14207[(10)] = inst_14186);
(statearr_14207[(7)] = inst_14174);
return statearr_14207;
})();var statearr_14208_14228 = state_14197__$1;(statearr_14208_14228[(2)] = null);
(statearr_14208_14228[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (9)))
{var inst_14177 = (state_14197[(8)]);var state_14197__$1 = state_14197;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14197__$1,(11),out,inst_14177);
} else
{if((state_val_14198 === (5)))
{var inst_14177 = (state_14197[(8)]);var inst_14174 = (state_14197[(7)]);var inst_14181 = cljs.core._EQ_.call(null,inst_14177,inst_14174);var state_14197__$1 = state_14197;if(inst_14181)
{var statearr_14210_14229 = state_14197__$1;(statearr_14210_14229[(1)] = (8));
} else
{var statearr_14211_14230 = state_14197__$1;(statearr_14211_14230[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (10)))
{var inst_14189 = (state_14197[(2)]);var state_14197__$1 = state_14197;var statearr_14212_14231 = state_14197__$1;(statearr_14212_14231[(2)] = inst_14189);
(statearr_14212_14231[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14198 === (8)))
{var inst_14174 = (state_14197[(7)]);var tmp14209 = inst_14174;var inst_14174__$1 = tmp14209;var state_14197__$1 = (function (){var statearr_14213 = state_14197;(statearr_14213[(7)] = inst_14174__$1);
return statearr_14213;
})();var statearr_14214_14232 = state_14197__$1;(statearr_14214_14232[(2)] = null);
(statearr_14214_14232[(1)] = (2));
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
});})(c__5806__auto___14222,out))
;return ((function (switch__5791__auto__,c__5806__auto___14222,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_14218 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_14218[(0)] = state_machine__5792__auto__);
(statearr_14218[(1)] = (1));
return statearr_14218;
});
var state_machine__5792__auto____1 = (function (state_14197){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_14197);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e14219){if((e14219 instanceof Object))
{var ex__5795__auto__ = e14219;var statearr_14220_14233 = state_14197;(statearr_14220_14233[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14197);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14219;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14234 = state_14197;
state_14197 = G__14234;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_14197){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_14197);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___14222,out))
})();var state__5808__auto__ = (function (){var statearr_14221 = f__5807__auto__.call(null);(statearr_14221[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___14222);
return statearr_14221;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___14222,out))
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
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___14369 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___14369,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___14369,out){
return (function (state_14339){var state_val_14340 = (state_14339[(1)]);if((state_val_14340 === (7)))
{var inst_14335 = (state_14339[(2)]);var state_14339__$1 = state_14339;var statearr_14341_14370 = state_14339__$1;(statearr_14341_14370[(2)] = inst_14335);
(statearr_14341_14370[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (1)))
{var inst_14302 = (new Array(n));var inst_14303 = inst_14302;var inst_14304 = (0);var state_14339__$1 = (function (){var statearr_14342 = state_14339;(statearr_14342[(7)] = inst_14303);
(statearr_14342[(8)] = inst_14304);
return statearr_14342;
})();var statearr_14343_14371 = state_14339__$1;(statearr_14343_14371[(2)] = null);
(statearr_14343_14371[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (4)))
{var inst_14307 = (state_14339[(9)]);var inst_14307__$1 = (state_14339[(2)]);var inst_14308 = (inst_14307__$1 == null);var inst_14309 = cljs.core.not.call(null,inst_14308);var state_14339__$1 = (function (){var statearr_14344 = state_14339;(statearr_14344[(9)] = inst_14307__$1);
return statearr_14344;
})();if(inst_14309)
{var statearr_14345_14372 = state_14339__$1;(statearr_14345_14372[(1)] = (5));
} else
{var statearr_14346_14373 = state_14339__$1;(statearr_14346_14373[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (15)))
{var inst_14329 = (state_14339[(2)]);var state_14339__$1 = state_14339;var statearr_14347_14374 = state_14339__$1;(statearr_14347_14374[(2)] = inst_14329);
(statearr_14347_14374[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (13)))
{var state_14339__$1 = state_14339;var statearr_14348_14375 = state_14339__$1;(statearr_14348_14375[(2)] = null);
(statearr_14348_14375[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (6)))
{var inst_14304 = (state_14339[(8)]);var inst_14325 = (inst_14304 > (0));var state_14339__$1 = state_14339;if(cljs.core.truth_(inst_14325))
{var statearr_14349_14376 = state_14339__$1;(statearr_14349_14376[(1)] = (12));
} else
{var statearr_14350_14377 = state_14339__$1;(statearr_14350_14377[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (3)))
{var inst_14337 = (state_14339[(2)]);var state_14339__$1 = state_14339;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14339__$1,inst_14337);
} else
{if((state_val_14340 === (12)))
{var inst_14303 = (state_14339[(7)]);var inst_14327 = cljs.core.vec.call(null,inst_14303);var state_14339__$1 = state_14339;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14339__$1,(15),out,inst_14327);
} else
{if((state_val_14340 === (2)))
{var state_14339__$1 = state_14339;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14339__$1,(4),ch);
} else
{if((state_val_14340 === (11)))
{var inst_14319 = (state_14339[(2)]);var inst_14320 = (new Array(n));var inst_14303 = inst_14320;var inst_14304 = (0);var state_14339__$1 = (function (){var statearr_14351 = state_14339;(statearr_14351[(10)] = inst_14319);
(statearr_14351[(7)] = inst_14303);
(statearr_14351[(8)] = inst_14304);
return statearr_14351;
})();var statearr_14352_14378 = state_14339__$1;(statearr_14352_14378[(2)] = null);
(statearr_14352_14378[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (9)))
{var inst_14303 = (state_14339[(7)]);var inst_14317 = cljs.core.vec.call(null,inst_14303);var state_14339__$1 = state_14339;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14339__$1,(11),out,inst_14317);
} else
{if((state_val_14340 === (5)))
{var inst_14307 = (state_14339[(9)]);var inst_14312 = (state_14339[(11)]);var inst_14303 = (state_14339[(7)]);var inst_14304 = (state_14339[(8)]);var inst_14311 = (inst_14303[inst_14304] = inst_14307);var inst_14312__$1 = (inst_14304 + (1));var inst_14313 = (inst_14312__$1 < n);var state_14339__$1 = (function (){var statearr_14353 = state_14339;(statearr_14353[(12)] = inst_14311);
(statearr_14353[(11)] = inst_14312__$1);
return statearr_14353;
})();if(cljs.core.truth_(inst_14313))
{var statearr_14354_14379 = state_14339__$1;(statearr_14354_14379[(1)] = (8));
} else
{var statearr_14355_14380 = state_14339__$1;(statearr_14355_14380[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (14)))
{var inst_14332 = (state_14339[(2)]);var inst_14333 = cljs.core.async.close_BANG_.call(null,out);var state_14339__$1 = (function (){var statearr_14357 = state_14339;(statearr_14357[(13)] = inst_14332);
return statearr_14357;
})();var statearr_14358_14381 = state_14339__$1;(statearr_14358_14381[(2)] = inst_14333);
(statearr_14358_14381[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (10)))
{var inst_14323 = (state_14339[(2)]);var state_14339__$1 = state_14339;var statearr_14359_14382 = state_14339__$1;(statearr_14359_14382[(2)] = inst_14323);
(statearr_14359_14382[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14340 === (8)))
{var inst_14312 = (state_14339[(11)]);var inst_14303 = (state_14339[(7)]);var tmp14356 = inst_14303;var inst_14303__$1 = tmp14356;var inst_14304 = inst_14312;var state_14339__$1 = (function (){var statearr_14360 = state_14339;(statearr_14360[(7)] = inst_14303__$1);
(statearr_14360[(8)] = inst_14304);
return statearr_14360;
})();var statearr_14361_14383 = state_14339__$1;(statearr_14361_14383[(2)] = null);
(statearr_14361_14383[(1)] = (2));
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
});})(c__5806__auto___14369,out))
;return ((function (switch__5791__auto__,c__5806__auto___14369,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_14365 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14365[(0)] = state_machine__5792__auto__);
(statearr_14365[(1)] = (1));
return statearr_14365;
});
var state_machine__5792__auto____1 = (function (state_14339){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_14339);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e14366){if((e14366 instanceof Object))
{var ex__5795__auto__ = e14366;var statearr_14367_14384 = state_14339;(statearr_14367_14384[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14339);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14366;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14385 = state_14339;
state_14339 = G__14385;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_14339){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_14339);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___14369,out))
})();var state__5808__auto__ = (function (){var statearr_14368 = f__5807__auto__.call(null);(statearr_14368[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___14369);
return statearr_14368;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___14369,out))
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
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5806__auto___14528 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5806__auto___14528,out){
return (function (){var f__5807__auto__ = (function (){var switch__5791__auto__ = ((function (c__5806__auto___14528,out){
return (function (state_14498){var state_val_14499 = (state_14498[(1)]);if((state_val_14499 === (7)))
{var inst_14494 = (state_14498[(2)]);var state_14498__$1 = state_14498;var statearr_14500_14529 = state_14498__$1;(statearr_14500_14529[(2)] = inst_14494);
(statearr_14500_14529[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (1)))
{var inst_14457 = [];var inst_14458 = inst_14457;var inst_14459 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_14498__$1 = (function (){var statearr_14501 = state_14498;(statearr_14501[(7)] = inst_14459);
(statearr_14501[(8)] = inst_14458);
return statearr_14501;
})();var statearr_14502_14530 = state_14498__$1;(statearr_14502_14530[(2)] = null);
(statearr_14502_14530[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (4)))
{var inst_14462 = (state_14498[(9)]);var inst_14462__$1 = (state_14498[(2)]);var inst_14463 = (inst_14462__$1 == null);var inst_14464 = cljs.core.not.call(null,inst_14463);var state_14498__$1 = (function (){var statearr_14503 = state_14498;(statearr_14503[(9)] = inst_14462__$1);
return statearr_14503;
})();if(inst_14464)
{var statearr_14504_14531 = state_14498__$1;(statearr_14504_14531[(1)] = (5));
} else
{var statearr_14505_14532 = state_14498__$1;(statearr_14505_14532[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (15)))
{var inst_14488 = (state_14498[(2)]);var state_14498__$1 = state_14498;var statearr_14506_14533 = state_14498__$1;(statearr_14506_14533[(2)] = inst_14488);
(statearr_14506_14533[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (13)))
{var state_14498__$1 = state_14498;var statearr_14507_14534 = state_14498__$1;(statearr_14507_14534[(2)] = null);
(statearr_14507_14534[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (6)))
{var inst_14458 = (state_14498[(8)]);var inst_14483 = inst_14458.length;var inst_14484 = (inst_14483 > (0));var state_14498__$1 = state_14498;if(cljs.core.truth_(inst_14484))
{var statearr_14508_14535 = state_14498__$1;(statearr_14508_14535[(1)] = (12));
} else
{var statearr_14509_14536 = state_14498__$1;(statearr_14509_14536[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (3)))
{var inst_14496 = (state_14498[(2)]);var state_14498__$1 = state_14498;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14498__$1,inst_14496);
} else
{if((state_val_14499 === (12)))
{var inst_14458 = (state_14498[(8)]);var inst_14486 = cljs.core.vec.call(null,inst_14458);var state_14498__$1 = state_14498;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14498__$1,(15),out,inst_14486);
} else
{if((state_val_14499 === (2)))
{var state_14498__$1 = state_14498;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14498__$1,(4),ch);
} else
{if((state_val_14499 === (11)))
{var inst_14466 = (state_14498[(10)]);var inst_14462 = (state_14498[(9)]);var inst_14476 = (state_14498[(2)]);var inst_14477 = [];var inst_14478 = inst_14477.push(inst_14462);var inst_14458 = inst_14477;var inst_14459 = inst_14466;var state_14498__$1 = (function (){var statearr_14510 = state_14498;(statearr_14510[(7)] = inst_14459);
(statearr_14510[(11)] = inst_14476);
(statearr_14510[(12)] = inst_14478);
(statearr_14510[(8)] = inst_14458);
return statearr_14510;
})();var statearr_14511_14537 = state_14498__$1;(statearr_14511_14537[(2)] = null);
(statearr_14511_14537[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (9)))
{var inst_14458 = (state_14498[(8)]);var inst_14474 = cljs.core.vec.call(null,inst_14458);var state_14498__$1 = state_14498;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14498__$1,(11),out,inst_14474);
} else
{if((state_val_14499 === (5)))
{var inst_14466 = (state_14498[(10)]);var inst_14459 = (state_14498[(7)]);var inst_14462 = (state_14498[(9)]);var inst_14466__$1 = f.call(null,inst_14462);var inst_14467 = cljs.core._EQ_.call(null,inst_14466__$1,inst_14459);var inst_14468 = cljs.core.keyword_identical_QMARK_.call(null,inst_14459,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_14469 = (inst_14467) || (inst_14468);var state_14498__$1 = (function (){var statearr_14512 = state_14498;(statearr_14512[(10)] = inst_14466__$1);
return statearr_14512;
})();if(cljs.core.truth_(inst_14469))
{var statearr_14513_14538 = state_14498__$1;(statearr_14513_14538[(1)] = (8));
} else
{var statearr_14514_14539 = state_14498__$1;(statearr_14514_14539[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (14)))
{var inst_14491 = (state_14498[(2)]);var inst_14492 = cljs.core.async.close_BANG_.call(null,out);var state_14498__$1 = (function (){var statearr_14516 = state_14498;(statearr_14516[(13)] = inst_14491);
return statearr_14516;
})();var statearr_14517_14540 = state_14498__$1;(statearr_14517_14540[(2)] = inst_14492);
(statearr_14517_14540[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (10)))
{var inst_14481 = (state_14498[(2)]);var state_14498__$1 = state_14498;var statearr_14518_14541 = state_14498__$1;(statearr_14518_14541[(2)] = inst_14481);
(statearr_14518_14541[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14499 === (8)))
{var inst_14466 = (state_14498[(10)]);var inst_14462 = (state_14498[(9)]);var inst_14458 = (state_14498[(8)]);var inst_14471 = inst_14458.push(inst_14462);var tmp14515 = inst_14458;var inst_14458__$1 = tmp14515;var inst_14459 = inst_14466;var state_14498__$1 = (function (){var statearr_14519 = state_14498;(statearr_14519[(14)] = inst_14471);
(statearr_14519[(7)] = inst_14459);
(statearr_14519[(8)] = inst_14458__$1);
return statearr_14519;
})();var statearr_14520_14542 = state_14498__$1;(statearr_14520_14542[(2)] = null);
(statearr_14520_14542[(1)] = (2));
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
});})(c__5806__auto___14528,out))
;return ((function (switch__5791__auto__,c__5806__auto___14528,out){
return (function() {
var state_machine__5792__auto__ = null;
var state_machine__5792__auto____0 = (function (){var statearr_14524 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14524[(0)] = state_machine__5792__auto__);
(statearr_14524[(1)] = (1));
return statearr_14524;
});
var state_machine__5792__auto____1 = (function (state_14498){while(true){
var ret_value__5793__auto__ = (function (){try{while(true){
var result__5794__auto__ = switch__5791__auto__.call(null,state_14498);if(cljs.core.keyword_identical_QMARK_.call(null,result__5794__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5794__auto__;
}
break;
}
}catch (e14525){if((e14525 instanceof Object))
{var ex__5795__auto__ = e14525;var statearr_14526_14543 = state_14498;(statearr_14526_14543[(5)] = ex__5795__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14498);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14525;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5793__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14544 = state_14498;
state_14498 = G__14544;
continue;
}
} else
{return ret_value__5793__auto__;
}
break;
}
});
state_machine__5792__auto__ = function(state_14498){
switch(arguments.length){
case 0:
return state_machine__5792__auto____0.call(this);
case 1:
return state_machine__5792__auto____1.call(this,state_14498);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5792__auto____0;
state_machine__5792__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5792__auto____1;
return state_machine__5792__auto__;
})()
;})(switch__5791__auto__,c__5806__auto___14528,out))
})();var state__5808__auto__ = (function (){var statearr_14527 = f__5807__auto__.call(null);(statearr_14527[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5806__auto___14528);
return statearr_14527;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5808__auto__);
});})(c__5806__auto___14528,out))
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

//# sourceMappingURL=async.js.map