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
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t11931 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11931 = (function (f,fn_handler,meta11932){
this.f = f;
this.fn_handler = fn_handler;
this.meta11932 = meta11932;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11931.cljs$lang$type = true;
cljs.core.async.t11931.cljs$lang$ctorStr = "cljs.core.async/t11931";
cljs.core.async.t11931.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t11931");
});
cljs.core.async.t11931.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11931.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t11931.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t11931.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11933){var self__ = this;
var _11933__$1 = this;return self__.meta11932;
});
cljs.core.async.t11931.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11933,meta11932__$1){var self__ = this;
var _11933__$1 = this;return (new cljs.core.async.t11931(self__.f,self__.fn_handler,meta11932__$1));
});
cljs.core.async.__GT_t11931 = (function __GT_t11931(f__$1,fn_handler__$1,meta11932){return (new cljs.core.async.t11931(f__$1,fn_handler__$1,meta11932));
});
}
return (new cljs.core.async.t11931(f,fn_handler,null));
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
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__11935 = buff;if(G__11935)
{var bit__4300__auto__ = null;if(cljs.core.truth_((function (){var or__3637__auto__ = bit__4300__auto__;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{return G__11935.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__11935.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11935);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11935);
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
{var val_11936 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_11936);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_11936,ret){
return (function (){return fn1.call(null,val_11936);
});})(val_11936,ret))
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
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4506__auto___11937 = n;var x_11938 = (0);while(true){
if((x_11938 < n__4506__auto___11937))
{(a[x_11938] = (0));
{
var G__11939 = (x_11938 + (1));
x_11938 = G__11939;
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
var G__11940 = (i + (1));
i = G__11940;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t11944 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11944 = (function (flag,alt_flag,meta11945){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta11945 = meta11945;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11944.cljs$lang$type = true;
cljs.core.async.t11944.cljs$lang$ctorStr = "cljs.core.async/t11944";
cljs.core.async.t11944.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t11944");
});})(flag))
;
cljs.core.async.t11944.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11944.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t11944.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t11944.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_11946){var self__ = this;
var _11946__$1 = this;return self__.meta11945;
});})(flag))
;
cljs.core.async.t11944.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_11946,meta11945__$1){var self__ = this;
var _11946__$1 = this;return (new cljs.core.async.t11944(self__.flag,self__.alt_flag,meta11945__$1));
});})(flag))
;
cljs.core.async.__GT_t11944 = ((function (flag){
return (function __GT_t11944(flag__$1,alt_flag__$1,meta11945){return (new cljs.core.async.t11944(flag__$1,alt_flag__$1,meta11945));
});})(flag))
;
}
return (new cljs.core.async.t11944(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t11950 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11950 = (function (cb,flag,alt_handler,meta11951){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta11951 = meta11951;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11950.cljs$lang$type = true;
cljs.core.async.t11950.cljs$lang$ctorStr = "cljs.core.async/t11950";
cljs.core.async.t11950.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t11950");
});
cljs.core.async.t11950.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11950.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t11950.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t11950.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11952){var self__ = this;
var _11952__$1 = this;return self__.meta11951;
});
cljs.core.async.t11950.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11952,meta11951__$1){var self__ = this;
var _11952__$1 = this;return (new cljs.core.async.t11950(self__.cb,self__.flag,self__.alt_handler,meta11951__$1));
});
cljs.core.async.__GT_t11950 = (function __GT_t11950(cb__$1,flag__$1,alt_handler__$1,meta11951){return (new cljs.core.async.t11950(cb__$1,flag__$1,alt_handler__$1,meta11951));
});
}
return (new cljs.core.async.t11950(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11953_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11953_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11954_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11954_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3637__auto__ = wport;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__11955 = (i + (1));
i = G__11955;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3637__auto__ = ret;if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__3625__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3625__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3625__auto__;
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
var alts_BANG___delegate = function (ports,p__11956){var map__11958 = p__11956;var map__11958__$1 = ((cljs.core.seq_QMARK_.call(null,map__11958))?cljs.core.apply.call(null,cljs.core.hash_map,map__11958):map__11958);var opts = map__11958__$1;throw (new Error("alts! used not in (go ...) block"));
};
var alts_BANG_ = function (ports,var_args){
var p__11956 = null;if (arguments.length > 1) {
  p__11956 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__11956);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__11959){
var ports = cljs.core.first(arglist__11959);
var p__11956 = cljs.core.rest(arglist__11959);
return alts_BANG___delegate(ports,p__11956);
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
var pipe__3 = (function (from,to,close_QMARK_){var c__5838__auto___12054 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___12054){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___12054){
return (function (state_12030){var state_val_12031 = (state_12030[(1)]);if((state_val_12031 === (7)))
{var inst_12026 = (state_12030[(2)]);var state_12030__$1 = state_12030;var statearr_12032_12055 = state_12030__$1;(statearr_12032_12055[(2)] = inst_12026);
(statearr_12032_12055[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (1)))
{var state_12030__$1 = state_12030;var statearr_12033_12056 = state_12030__$1;(statearr_12033_12056[(2)] = null);
(statearr_12033_12056[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (4)))
{var inst_12009 = (state_12030[(7)]);var inst_12009__$1 = (state_12030[(2)]);var inst_12010 = (inst_12009__$1 == null);var state_12030__$1 = (function (){var statearr_12034 = state_12030;(statearr_12034[(7)] = inst_12009__$1);
return statearr_12034;
})();if(cljs.core.truth_(inst_12010))
{var statearr_12035_12057 = state_12030__$1;(statearr_12035_12057[(1)] = (5));
} else
{var statearr_12036_12058 = state_12030__$1;(statearr_12036_12058[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (13)))
{var state_12030__$1 = state_12030;var statearr_12037_12059 = state_12030__$1;(statearr_12037_12059[(2)] = null);
(statearr_12037_12059[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (6)))
{var inst_12009 = (state_12030[(7)]);var state_12030__$1 = state_12030;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12030__$1,(11),to,inst_12009);
} else
{if((state_val_12031 === (3)))
{var inst_12028 = (state_12030[(2)]);var state_12030__$1 = state_12030;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12030__$1,inst_12028);
} else
{if((state_val_12031 === (12)))
{var state_12030__$1 = state_12030;var statearr_12038_12060 = state_12030__$1;(statearr_12038_12060[(2)] = null);
(statearr_12038_12060[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (2)))
{var state_12030__$1 = state_12030;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12030__$1,(4),from);
} else
{if((state_val_12031 === (11)))
{var inst_12019 = (state_12030[(2)]);var state_12030__$1 = state_12030;if(cljs.core.truth_(inst_12019))
{var statearr_12039_12061 = state_12030__$1;(statearr_12039_12061[(1)] = (12));
} else
{var statearr_12040_12062 = state_12030__$1;(statearr_12040_12062[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (9)))
{var state_12030__$1 = state_12030;var statearr_12041_12063 = state_12030__$1;(statearr_12041_12063[(2)] = null);
(statearr_12041_12063[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (5)))
{var state_12030__$1 = state_12030;if(cljs.core.truth_(close_QMARK_))
{var statearr_12042_12064 = state_12030__$1;(statearr_12042_12064[(1)] = (8));
} else
{var statearr_12043_12065 = state_12030__$1;(statearr_12043_12065[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (14)))
{var inst_12024 = (state_12030[(2)]);var state_12030__$1 = state_12030;var statearr_12044_12066 = state_12030__$1;(statearr_12044_12066[(2)] = inst_12024);
(statearr_12044_12066[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (10)))
{var inst_12016 = (state_12030[(2)]);var state_12030__$1 = state_12030;var statearr_12045_12067 = state_12030__$1;(statearr_12045_12067[(2)] = inst_12016);
(statearr_12045_12067[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12031 === (8)))
{var inst_12013 = cljs.core.async.close_BANG_.call(null,to);var state_12030__$1 = state_12030;var statearr_12046_12068 = state_12030__$1;(statearr_12046_12068[(2)] = inst_12013);
(statearr_12046_12068[(1)] = (10));
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
});})(c__5838__auto___12054))
;return ((function (switch__5823__auto__,c__5838__auto___12054){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12050 = [null,null,null,null,null,null,null,null];(statearr_12050[(0)] = state_machine__5824__auto__);
(statearr_12050[(1)] = (1));
return statearr_12050;
});
var state_machine__5824__auto____1 = (function (state_12030){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12030);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12051){if((e12051 instanceof Object))
{var ex__5827__auto__ = e12051;var statearr_12052_12069 = state_12030;(statearr_12052_12069[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12030);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12051;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12070 = state_12030;
state_12030 = G__12070;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12030){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12030);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___12054))
})();var state__5840__auto__ = (function (){var statearr_12053 = f__5839__auto__.call(null);(statearr_12053[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12054);
return statearr_12053;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___12054))
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
return (function (p__12254){var vec__12255 = p__12254;var v = cljs.core.nth.call(null,vec__12255,(0),null);var p = cljs.core.nth.call(null,vec__12255,(1),null);var job = vec__12255;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);var c__5838__auto___12437 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results){
return (function (state_12260){var state_val_12261 = (state_12260[(1)]);if((state_val_12261 === (2)))
{var inst_12257 = (state_12260[(2)]);var inst_12258 = cljs.core.async.close_BANG_.call(null,res);var state_12260__$1 = (function (){var statearr_12262 = state_12260;(statearr_12262[(7)] = inst_12257);
return statearr_12262;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12260__$1,inst_12258);
} else
{if((state_val_12261 === (1)))
{var state_12260__$1 = state_12260;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12260__$1,(2),res,v);
} else
{return null;
}
}
});})(c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results))
;return ((function (switch__5823__auto__,c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12266 = [null,null,null,null,null,null,null,null];(statearr_12266[(0)] = state_machine__5824__auto__);
(statearr_12266[(1)] = (1));
return statearr_12266;
});
var state_machine__5824__auto____1 = (function (state_12260){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12260);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12267){if((e12267 instanceof Object))
{var ex__5827__auto__ = e12267;var statearr_12268_12438 = state_12260;(statearr_12268_12438[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12260);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12267;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12439 = state_12260;
state_12260 = G__12439;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12260){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12260);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results))
})();var state__5840__auto__ = (function (){var statearr_12269 = f__5839__auto__.call(null);(statearr_12269[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12437);
return statearr_12269;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___12437,res,vec__12255,v,p,job,jobs,results))
);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results))
;var async = ((function (jobs,results,process){
return (function (p__12270){var vec__12271 = p__12270;var v = cljs.core.nth.call(null,vec__12271,(0),null);var p = cljs.core.nth.call(null,vec__12271,(1),null);var job = vec__12271;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1));xf.call(null,v,res);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results,process))
;var n__4506__auto___12440 = n;var __12441 = (0);while(true){
if((__12441 < n__4506__auto___12440))
{var G__12272_12442 = (((type instanceof cljs.core.Keyword))?type.fqn:null);switch (G__12272_12442) {
case "async":
var c__5838__auto___12444 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__12441,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (__12441,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function (state_12285){var state_val_12286 = (state_12285[(1)]);if((state_val_12286 === (7)))
{var inst_12281 = (state_12285[(2)]);var state_12285__$1 = state_12285;var statearr_12287_12445 = state_12285__$1;(statearr_12287_12445[(2)] = inst_12281);
(statearr_12287_12445[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12286 === (6)))
{var state_12285__$1 = state_12285;var statearr_12288_12446 = state_12285__$1;(statearr_12288_12446[(2)] = null);
(statearr_12288_12446[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12286 === (5)))
{var state_12285__$1 = state_12285;var statearr_12289_12447 = state_12285__$1;(statearr_12289_12447[(2)] = null);
(statearr_12289_12447[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12286 === (4)))
{var inst_12275 = (state_12285[(2)]);var inst_12276 = async.call(null,inst_12275);var state_12285__$1 = state_12285;if(cljs.core.truth_(inst_12276))
{var statearr_12290_12448 = state_12285__$1;(statearr_12290_12448[(1)] = (5));
} else
{var statearr_12291_12449 = state_12285__$1;(statearr_12291_12449[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12286 === (3)))
{var inst_12283 = (state_12285[(2)]);var state_12285__$1 = state_12285;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12285__$1,inst_12283);
} else
{if((state_val_12286 === (2)))
{var state_12285__$1 = state_12285;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12285__$1,(4),jobs);
} else
{if((state_val_12286 === (1)))
{var state_12285__$1 = state_12285;var statearr_12292_12450 = state_12285__$1;(statearr_12292_12450[(2)] = null);
(statearr_12292_12450[(1)] = (2));
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
});})(__12441,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
;return ((function (__12441,switch__5823__auto__,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12296 = [null,null,null,null,null,null,null];(statearr_12296[(0)] = state_machine__5824__auto__);
(statearr_12296[(1)] = (1));
return statearr_12296;
});
var state_machine__5824__auto____1 = (function (state_12285){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12285);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12297){if((e12297 instanceof Object))
{var ex__5827__auto__ = e12297;var statearr_12298_12451 = state_12285;(statearr_12298_12451[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12285);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12297;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12452 = state_12285;
state_12285 = G__12452;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12285){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12285);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(__12441,switch__5823__auto__,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
})();var state__5840__auto__ = (function (){var statearr_12299 = f__5839__auto__.call(null);(statearr_12299[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12444);
return statearr_12299;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(__12441,c__5838__auto___12444,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
);

break;
case "compute":
var c__5838__auto___12453 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__12441,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (__12441,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function (state_12312){var state_val_12313 = (state_12312[(1)]);if((state_val_12313 === (7)))
{var inst_12308 = (state_12312[(2)]);var state_12312__$1 = state_12312;var statearr_12314_12454 = state_12312__$1;(statearr_12314_12454[(2)] = inst_12308);
(statearr_12314_12454[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12313 === (6)))
{var state_12312__$1 = state_12312;var statearr_12315_12455 = state_12312__$1;(statearr_12315_12455[(2)] = null);
(statearr_12315_12455[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12313 === (5)))
{var state_12312__$1 = state_12312;var statearr_12316_12456 = state_12312__$1;(statearr_12316_12456[(2)] = null);
(statearr_12316_12456[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12313 === (4)))
{var inst_12302 = (state_12312[(2)]);var inst_12303 = process.call(null,inst_12302);var state_12312__$1 = state_12312;if(cljs.core.truth_(inst_12303))
{var statearr_12317_12457 = state_12312__$1;(statearr_12317_12457[(1)] = (5));
} else
{var statearr_12318_12458 = state_12312__$1;(statearr_12318_12458[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12313 === (3)))
{var inst_12310 = (state_12312[(2)]);var state_12312__$1 = state_12312;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12312__$1,inst_12310);
} else
{if((state_val_12313 === (2)))
{var state_12312__$1 = state_12312;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12312__$1,(4),jobs);
} else
{if((state_val_12313 === (1)))
{var state_12312__$1 = state_12312;var statearr_12319_12459 = state_12312__$1;(statearr_12319_12459[(2)] = null);
(statearr_12319_12459[(1)] = (2));
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
});})(__12441,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
;return ((function (__12441,switch__5823__auto__,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12323 = [null,null,null,null,null,null,null];(statearr_12323[(0)] = state_machine__5824__auto__);
(statearr_12323[(1)] = (1));
return statearr_12323;
});
var state_machine__5824__auto____1 = (function (state_12312){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12312);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12324){if((e12324 instanceof Object))
{var ex__5827__auto__ = e12324;var statearr_12325_12460 = state_12312;(statearr_12325_12460[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12312);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12324;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12461 = state_12312;
state_12312 = G__12461;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12312){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12312);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(__12441,switch__5823__auto__,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
})();var state__5840__auto__ = (function (){var statearr_12326 = f__5839__auto__.call(null);(statearr_12326[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12453);
return statearr_12326;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(__12441,c__5838__auto___12453,G__12272_12442,n__4506__auto___12440,jobs,results,process,async))
);

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type))));

}
{
var G__12462 = (__12441 + (1));
__12441 = G__12462;
continue;
}
} else
{}
break;
}
var c__5838__auto___12463 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___12463,jobs,results,process,async){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___12463,jobs,results,process,async){
return (function (state_12348){var state_val_12349 = (state_12348[(1)]);if((state_val_12349 === (9)))
{var inst_12341 = (state_12348[(2)]);var state_12348__$1 = (function (){var statearr_12350 = state_12348;(statearr_12350[(7)] = inst_12341);
return statearr_12350;
})();var statearr_12351_12464 = state_12348__$1;(statearr_12351_12464[(2)] = null);
(statearr_12351_12464[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12349 === (8)))
{var inst_12334 = (state_12348[(8)]);var inst_12339 = (state_12348[(2)]);var state_12348__$1 = (function (){var statearr_12352 = state_12348;(statearr_12352[(9)] = inst_12339);
return statearr_12352;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12348__$1,(9),results,inst_12334);
} else
{if((state_val_12349 === (7)))
{var inst_12344 = (state_12348[(2)]);var state_12348__$1 = state_12348;var statearr_12353_12465 = state_12348__$1;(statearr_12353_12465[(2)] = inst_12344);
(statearr_12353_12465[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12349 === (6)))
{var inst_12329 = (state_12348[(10)]);var inst_12334 = (state_12348[(8)]);var inst_12334__$1 = cljs.core.async.chan.call(null,(1));var inst_12335 = cljs.core.PersistentVector.EMPTY_NODE;var inst_12336 = [inst_12329,inst_12334__$1];var inst_12337 = (new cljs.core.PersistentVector(null,2,(5),inst_12335,inst_12336,null));var state_12348__$1 = (function (){var statearr_12354 = state_12348;(statearr_12354[(8)] = inst_12334__$1);
return statearr_12354;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12348__$1,(8),jobs,inst_12337);
} else
{if((state_val_12349 === (5)))
{var inst_12332 = cljs.core.async.close_BANG_.call(null,jobs);var state_12348__$1 = state_12348;var statearr_12355_12466 = state_12348__$1;(statearr_12355_12466[(2)] = inst_12332);
(statearr_12355_12466[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12349 === (4)))
{var inst_12329 = (state_12348[(10)]);var inst_12329__$1 = (state_12348[(2)]);var inst_12330 = (inst_12329__$1 == null);var state_12348__$1 = (function (){var statearr_12356 = state_12348;(statearr_12356[(10)] = inst_12329__$1);
return statearr_12356;
})();if(cljs.core.truth_(inst_12330))
{var statearr_12357_12467 = state_12348__$1;(statearr_12357_12467[(1)] = (5));
} else
{var statearr_12358_12468 = state_12348__$1;(statearr_12358_12468[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12349 === (3)))
{var inst_12346 = (state_12348[(2)]);var state_12348__$1 = state_12348;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12348__$1,inst_12346);
} else
{if((state_val_12349 === (2)))
{var state_12348__$1 = state_12348;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12348__$1,(4),from);
} else
{if((state_val_12349 === (1)))
{var state_12348__$1 = state_12348;var statearr_12359_12469 = state_12348__$1;(statearr_12359_12469[(2)] = null);
(statearr_12359_12469[(1)] = (2));
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
});})(c__5838__auto___12463,jobs,results,process,async))
;return ((function (switch__5823__auto__,c__5838__auto___12463,jobs,results,process,async){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12363 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_12363[(0)] = state_machine__5824__auto__);
(statearr_12363[(1)] = (1));
return statearr_12363;
});
var state_machine__5824__auto____1 = (function (state_12348){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12348);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12364){if((e12364 instanceof Object))
{var ex__5827__auto__ = e12364;var statearr_12365_12470 = state_12348;(statearr_12365_12470[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12348);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12364;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12471 = state_12348;
state_12348 = G__12471;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12348){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12348);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___12463,jobs,results,process,async))
})();var state__5840__auto__ = (function (){var statearr_12366 = f__5839__auto__.call(null);(statearr_12366[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12463);
return statearr_12366;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___12463,jobs,results,process,async))
);
var c__5838__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto__,jobs,results,process,async){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto__,jobs,results,process,async){
return (function (state_12404){var state_val_12405 = (state_12404[(1)]);if((state_val_12405 === (7)))
{var inst_12400 = (state_12404[(2)]);var state_12404__$1 = state_12404;var statearr_12406_12472 = state_12404__$1;(statearr_12406_12472[(2)] = inst_12400);
(statearr_12406_12472[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (20)))
{var state_12404__$1 = state_12404;var statearr_12407_12473 = state_12404__$1;(statearr_12407_12473[(2)] = null);
(statearr_12407_12473[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (1)))
{var state_12404__$1 = state_12404;var statearr_12408_12474 = state_12404__$1;(statearr_12408_12474[(2)] = null);
(statearr_12408_12474[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (4)))
{var inst_12369 = (state_12404[(7)]);var inst_12369__$1 = (state_12404[(2)]);var inst_12370 = (inst_12369__$1 == null);var state_12404__$1 = (function (){var statearr_12409 = state_12404;(statearr_12409[(7)] = inst_12369__$1);
return statearr_12409;
})();if(cljs.core.truth_(inst_12370))
{var statearr_12410_12475 = state_12404__$1;(statearr_12410_12475[(1)] = (5));
} else
{var statearr_12411_12476 = state_12404__$1;(statearr_12411_12476[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (15)))
{var inst_12382 = (state_12404[(8)]);var state_12404__$1 = state_12404;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12404__$1,(18),to,inst_12382);
} else
{if((state_val_12405 === (21)))
{var inst_12395 = (state_12404[(2)]);var state_12404__$1 = state_12404;var statearr_12412_12477 = state_12404__$1;(statearr_12412_12477[(2)] = inst_12395);
(statearr_12412_12477[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (13)))
{var inst_12397 = (state_12404[(2)]);var state_12404__$1 = (function (){var statearr_12413 = state_12404;(statearr_12413[(9)] = inst_12397);
return statearr_12413;
})();var statearr_12414_12478 = state_12404__$1;(statearr_12414_12478[(2)] = null);
(statearr_12414_12478[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (6)))
{var inst_12369 = (state_12404[(7)]);var state_12404__$1 = state_12404;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12404__$1,(11),inst_12369);
} else
{if((state_val_12405 === (17)))
{var inst_12390 = (state_12404[(2)]);var state_12404__$1 = state_12404;if(cljs.core.truth_(inst_12390))
{var statearr_12415_12479 = state_12404__$1;(statearr_12415_12479[(1)] = (19));
} else
{var statearr_12416_12480 = state_12404__$1;(statearr_12416_12480[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (3)))
{var inst_12402 = (state_12404[(2)]);var state_12404__$1 = state_12404;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12404__$1,inst_12402);
} else
{if((state_val_12405 === (12)))
{var inst_12379 = (state_12404[(10)]);var state_12404__$1 = state_12404;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12404__$1,(14),inst_12379);
} else
{if((state_val_12405 === (2)))
{var state_12404__$1 = state_12404;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12404__$1,(4),results);
} else
{if((state_val_12405 === (19)))
{var state_12404__$1 = state_12404;var statearr_12417_12481 = state_12404__$1;(statearr_12417_12481[(2)] = null);
(statearr_12417_12481[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (11)))
{var inst_12379 = (state_12404[(2)]);var state_12404__$1 = (function (){var statearr_12418 = state_12404;(statearr_12418[(10)] = inst_12379);
return statearr_12418;
})();var statearr_12419_12482 = state_12404__$1;(statearr_12419_12482[(2)] = null);
(statearr_12419_12482[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (9)))
{var state_12404__$1 = state_12404;var statearr_12420_12483 = state_12404__$1;(statearr_12420_12483[(2)] = null);
(statearr_12420_12483[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (5)))
{var state_12404__$1 = state_12404;if(cljs.core.truth_(close_QMARK_))
{var statearr_12421_12484 = state_12404__$1;(statearr_12421_12484[(1)] = (8));
} else
{var statearr_12422_12485 = state_12404__$1;(statearr_12422_12485[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (14)))
{var inst_12382 = (state_12404[(8)]);var inst_12384 = (state_12404[(11)]);var inst_12382__$1 = (state_12404[(2)]);var inst_12383 = (inst_12382__$1 == null);var inst_12384__$1 = cljs.core.not.call(null,inst_12383);var state_12404__$1 = (function (){var statearr_12423 = state_12404;(statearr_12423[(8)] = inst_12382__$1);
(statearr_12423[(11)] = inst_12384__$1);
return statearr_12423;
})();if(inst_12384__$1)
{var statearr_12424_12486 = state_12404__$1;(statearr_12424_12486[(1)] = (15));
} else
{var statearr_12425_12487 = state_12404__$1;(statearr_12425_12487[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (16)))
{var inst_12384 = (state_12404[(11)]);var state_12404__$1 = state_12404;var statearr_12426_12488 = state_12404__$1;(statearr_12426_12488[(2)] = inst_12384);
(statearr_12426_12488[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (10)))
{var inst_12376 = (state_12404[(2)]);var state_12404__$1 = state_12404;var statearr_12427_12489 = state_12404__$1;(statearr_12427_12489[(2)] = inst_12376);
(statearr_12427_12489[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (18)))
{var inst_12387 = (state_12404[(2)]);var state_12404__$1 = state_12404;var statearr_12428_12490 = state_12404__$1;(statearr_12428_12490[(2)] = inst_12387);
(statearr_12428_12490[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12405 === (8)))
{var inst_12373 = cljs.core.async.close_BANG_.call(null,to);var state_12404__$1 = state_12404;var statearr_12429_12491 = state_12404__$1;(statearr_12429_12491[(2)] = inst_12373);
(statearr_12429_12491[(1)] = (10));
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
});})(c__5838__auto__,jobs,results,process,async))
;return ((function (switch__5823__auto__,c__5838__auto__,jobs,results,process,async){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12433 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12433[(0)] = state_machine__5824__auto__);
(statearr_12433[(1)] = (1));
return statearr_12433;
});
var state_machine__5824__auto____1 = (function (state_12404){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12404);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12434){if((e12434 instanceof Object))
{var ex__5827__auto__ = e12434;var statearr_12435_12492 = state_12404;(statearr_12435_12492[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12404);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12434;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12493 = state_12404;
state_12404 = G__12493;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12404){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12404);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto__,jobs,results,process,async))
})();var state__5840__auto__ = (function (){var statearr_12436 = f__5839__auto__.call(null);(statearr_12436[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto__);
return statearr_12436;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto__,jobs,results,process,async))
);
return c__5838__auto__;
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
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__5838__auto___12594 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___12594,tc,fc){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___12594,tc,fc){
return (function (state_12569){var state_val_12570 = (state_12569[(1)]);if((state_val_12570 === (7)))
{var inst_12565 = (state_12569[(2)]);var state_12569__$1 = state_12569;var statearr_12571_12595 = state_12569__$1;(statearr_12571_12595[(2)] = inst_12565);
(statearr_12571_12595[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (1)))
{var state_12569__$1 = state_12569;var statearr_12572_12596 = state_12569__$1;(statearr_12572_12596[(2)] = null);
(statearr_12572_12596[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (4)))
{var inst_12546 = (state_12569[(7)]);var inst_12546__$1 = (state_12569[(2)]);var inst_12547 = (inst_12546__$1 == null);var state_12569__$1 = (function (){var statearr_12573 = state_12569;(statearr_12573[(7)] = inst_12546__$1);
return statearr_12573;
})();if(cljs.core.truth_(inst_12547))
{var statearr_12574_12597 = state_12569__$1;(statearr_12574_12597[(1)] = (5));
} else
{var statearr_12575_12598 = state_12569__$1;(statearr_12575_12598[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (13)))
{var state_12569__$1 = state_12569;var statearr_12576_12599 = state_12569__$1;(statearr_12576_12599[(2)] = null);
(statearr_12576_12599[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (6)))
{var inst_12546 = (state_12569[(7)]);var inst_12552 = p.call(null,inst_12546);var state_12569__$1 = state_12569;if(cljs.core.truth_(inst_12552))
{var statearr_12577_12600 = state_12569__$1;(statearr_12577_12600[(1)] = (9));
} else
{var statearr_12578_12601 = state_12569__$1;(statearr_12578_12601[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (3)))
{var inst_12567 = (state_12569[(2)]);var state_12569__$1 = state_12569;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12569__$1,inst_12567);
} else
{if((state_val_12570 === (12)))
{var state_12569__$1 = state_12569;var statearr_12579_12602 = state_12569__$1;(statearr_12579_12602[(2)] = null);
(statearr_12579_12602[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (2)))
{var state_12569__$1 = state_12569;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12569__$1,(4),ch);
} else
{if((state_val_12570 === (11)))
{var inst_12546 = (state_12569[(7)]);var inst_12556 = (state_12569[(2)]);var state_12569__$1 = state_12569;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12569__$1,(8),inst_12556,inst_12546);
} else
{if((state_val_12570 === (9)))
{var state_12569__$1 = state_12569;var statearr_12580_12603 = state_12569__$1;(statearr_12580_12603[(2)] = tc);
(statearr_12580_12603[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (5)))
{var inst_12549 = cljs.core.async.close_BANG_.call(null,tc);var inst_12550 = cljs.core.async.close_BANG_.call(null,fc);var state_12569__$1 = (function (){var statearr_12581 = state_12569;(statearr_12581[(8)] = inst_12549);
return statearr_12581;
})();var statearr_12582_12604 = state_12569__$1;(statearr_12582_12604[(2)] = inst_12550);
(statearr_12582_12604[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (14)))
{var inst_12563 = (state_12569[(2)]);var state_12569__$1 = state_12569;var statearr_12583_12605 = state_12569__$1;(statearr_12583_12605[(2)] = inst_12563);
(statearr_12583_12605[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (10)))
{var state_12569__$1 = state_12569;var statearr_12584_12606 = state_12569__$1;(statearr_12584_12606[(2)] = fc);
(statearr_12584_12606[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12570 === (8)))
{var inst_12558 = (state_12569[(2)]);var state_12569__$1 = state_12569;if(cljs.core.truth_(inst_12558))
{var statearr_12585_12607 = state_12569__$1;(statearr_12585_12607[(1)] = (12));
} else
{var statearr_12586_12608 = state_12569__$1;(statearr_12586_12608[(1)] = (13));
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
});})(c__5838__auto___12594,tc,fc))
;return ((function (switch__5823__auto__,c__5838__auto___12594,tc,fc){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12590 = [null,null,null,null,null,null,null,null,null];(statearr_12590[(0)] = state_machine__5824__auto__);
(statearr_12590[(1)] = (1));
return statearr_12590;
});
var state_machine__5824__auto____1 = (function (state_12569){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12569);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12591){if((e12591 instanceof Object))
{var ex__5827__auto__ = e12591;var statearr_12592_12609 = state_12569;(statearr_12592_12609[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12569);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12591;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12610 = state_12569;
state_12569 = G__12610;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12569){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12569);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___12594,tc,fc))
})();var state__5840__auto__ = (function (){var statearr_12593 = f__5839__auto__.call(null);(statearr_12593[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___12594);
return statearr_12593;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___12594,tc,fc))
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
cljs.core.async.reduce = (function reduce(f,init,ch){var c__5838__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto__){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto__){
return (function (state_12657){var state_val_12658 = (state_12657[(1)]);if((state_val_12658 === (7)))
{var inst_12653 = (state_12657[(2)]);var state_12657__$1 = state_12657;var statearr_12659_12675 = state_12657__$1;(statearr_12659_12675[(2)] = inst_12653);
(statearr_12659_12675[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12658 === (6)))
{var inst_12643 = (state_12657[(7)]);var inst_12646 = (state_12657[(8)]);var inst_12650 = f.call(null,inst_12643,inst_12646);var inst_12643__$1 = inst_12650;var state_12657__$1 = (function (){var statearr_12660 = state_12657;(statearr_12660[(7)] = inst_12643__$1);
return statearr_12660;
})();var statearr_12661_12676 = state_12657__$1;(statearr_12661_12676[(2)] = null);
(statearr_12661_12676[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12658 === (5)))
{var inst_12643 = (state_12657[(7)]);var state_12657__$1 = state_12657;var statearr_12662_12677 = state_12657__$1;(statearr_12662_12677[(2)] = inst_12643);
(statearr_12662_12677[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12658 === (4)))
{var inst_12646 = (state_12657[(8)]);var inst_12646__$1 = (state_12657[(2)]);var inst_12647 = (inst_12646__$1 == null);var state_12657__$1 = (function (){var statearr_12663 = state_12657;(statearr_12663[(8)] = inst_12646__$1);
return statearr_12663;
})();if(cljs.core.truth_(inst_12647))
{var statearr_12664_12678 = state_12657__$1;(statearr_12664_12678[(1)] = (5));
} else
{var statearr_12665_12679 = state_12657__$1;(statearr_12665_12679[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12658 === (3)))
{var inst_12655 = (state_12657[(2)]);var state_12657__$1 = state_12657;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12657__$1,inst_12655);
} else
{if((state_val_12658 === (2)))
{var state_12657__$1 = state_12657;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12657__$1,(4),ch);
} else
{if((state_val_12658 === (1)))
{var inst_12643 = init;var state_12657__$1 = (function (){var statearr_12666 = state_12657;(statearr_12666[(7)] = inst_12643);
return statearr_12666;
})();var statearr_12667_12680 = state_12657__$1;(statearr_12667_12680[(2)] = null);
(statearr_12667_12680[(1)] = (2));
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
});})(c__5838__auto__))
;return ((function (switch__5823__auto__,c__5838__auto__){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12671 = [null,null,null,null,null,null,null,null,null];(statearr_12671[(0)] = state_machine__5824__auto__);
(statearr_12671[(1)] = (1));
return statearr_12671;
});
var state_machine__5824__auto____1 = (function (state_12657){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12657);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12672){if((e12672 instanceof Object))
{var ex__5827__auto__ = e12672;var statearr_12673_12681 = state_12657;(statearr_12673_12681[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12657);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12672;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12682 = state_12657;
state_12657 = G__12682;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12657){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12657);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto__))
})();var state__5840__auto__ = (function (){var statearr_12674 = f__5839__auto__.call(null);(statearr_12674[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto__);
return statearr_12674;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto__))
);
return c__5838__auto__;
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
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__5838__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto__){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto__){
return (function (state_12756){var state_val_12757 = (state_12756[(1)]);if((state_val_12757 === (7)))
{var inst_12738 = (state_12756[(2)]);var state_12756__$1 = state_12756;var statearr_12758_12781 = state_12756__$1;(statearr_12758_12781[(2)] = inst_12738);
(statearr_12758_12781[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (1)))
{var inst_12732 = cljs.core.seq.call(null,coll);var inst_12733 = inst_12732;var state_12756__$1 = (function (){var statearr_12759 = state_12756;(statearr_12759[(7)] = inst_12733);
return statearr_12759;
})();var statearr_12760_12782 = state_12756__$1;(statearr_12760_12782[(2)] = null);
(statearr_12760_12782[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (4)))
{var inst_12733 = (state_12756[(7)]);var inst_12736 = cljs.core.first.call(null,inst_12733);var state_12756__$1 = state_12756;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12756__$1,(7),ch,inst_12736);
} else
{if((state_val_12757 === (13)))
{var inst_12750 = (state_12756[(2)]);var state_12756__$1 = state_12756;var statearr_12761_12783 = state_12756__$1;(statearr_12761_12783[(2)] = inst_12750);
(statearr_12761_12783[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (6)))
{var inst_12741 = (state_12756[(2)]);var state_12756__$1 = state_12756;if(cljs.core.truth_(inst_12741))
{var statearr_12762_12784 = state_12756__$1;(statearr_12762_12784[(1)] = (8));
} else
{var statearr_12763_12785 = state_12756__$1;(statearr_12763_12785[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (3)))
{var inst_12754 = (state_12756[(2)]);var state_12756__$1 = state_12756;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12756__$1,inst_12754);
} else
{if((state_val_12757 === (12)))
{var state_12756__$1 = state_12756;var statearr_12764_12786 = state_12756__$1;(statearr_12764_12786[(2)] = null);
(statearr_12764_12786[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (2)))
{var inst_12733 = (state_12756[(7)]);var state_12756__$1 = state_12756;if(cljs.core.truth_(inst_12733))
{var statearr_12765_12787 = state_12756__$1;(statearr_12765_12787[(1)] = (4));
} else
{var statearr_12766_12788 = state_12756__$1;(statearr_12766_12788[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (11)))
{var inst_12747 = cljs.core.async.close_BANG_.call(null,ch);var state_12756__$1 = state_12756;var statearr_12767_12789 = state_12756__$1;(statearr_12767_12789[(2)] = inst_12747);
(statearr_12767_12789[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (9)))
{var state_12756__$1 = state_12756;if(cljs.core.truth_(close_QMARK_))
{var statearr_12768_12790 = state_12756__$1;(statearr_12768_12790[(1)] = (11));
} else
{var statearr_12769_12791 = state_12756__$1;(statearr_12769_12791[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (5)))
{var inst_12733 = (state_12756[(7)]);var state_12756__$1 = state_12756;var statearr_12770_12792 = state_12756__$1;(statearr_12770_12792[(2)] = inst_12733);
(statearr_12770_12792[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (10)))
{var inst_12752 = (state_12756[(2)]);var state_12756__$1 = state_12756;var statearr_12771_12793 = state_12756__$1;(statearr_12771_12793[(2)] = inst_12752);
(statearr_12771_12793[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12757 === (8)))
{var inst_12733 = (state_12756[(7)]);var inst_12743 = cljs.core.next.call(null,inst_12733);var inst_12733__$1 = inst_12743;var state_12756__$1 = (function (){var statearr_12772 = state_12756;(statearr_12772[(7)] = inst_12733__$1);
return statearr_12772;
})();var statearr_12773_12794 = state_12756__$1;(statearr_12773_12794[(2)] = null);
(statearr_12773_12794[(1)] = (2));
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
});})(c__5838__auto__))
;return ((function (switch__5823__auto__,c__5838__auto__){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_12777 = [null,null,null,null,null,null,null,null];(statearr_12777[(0)] = state_machine__5824__auto__);
(statearr_12777[(1)] = (1));
return statearr_12777;
});
var state_machine__5824__auto____1 = (function (state_12756){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_12756);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e12778){if((e12778 instanceof Object))
{var ex__5827__auto__ = e12778;var statearr_12779_12795 = state_12756;(statearr_12779_12795[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12756);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12778;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12796 = state_12756;
state_12756 = G__12796;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_12756){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_12756);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto__))
})();var state__5840__auto__ = (function (){var statearr_12780 = f__5839__auto__.call(null);(statearr_12780[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto__);
return statearr_12780;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto__))
);
return c__5838__auto__;
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
cljs.core.async.Mux = (function (){var obj12798 = {};return obj12798;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3625__auto__ = _;if(and__3625__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3625__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4273__auto__ = (((_ == null))?null:_);return (function (){var or__3637__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj12800 = {};return obj12800;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
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
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t13022 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13022 = (function (cs,ch,mult,meta13023){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta13023 = meta13023;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13022.cljs$lang$type = true;
cljs.core.async.t13022.cljs$lang$ctorStr = "cljs.core.async/t13022";
cljs.core.async.t13022.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t13022");
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t13022.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13022.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_13024){var self__ = this;
var _13024__$1 = this;return self__.meta13023;
});})(cs))
;
cljs.core.async.t13022.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_13024,meta13023__$1){var self__ = this;
var _13024__$1 = this;return (new cljs.core.async.t13022(self__.cs,self__.ch,self__.mult,meta13023__$1));
});})(cs))
;
cljs.core.async.__GT_t13022 = ((function (cs){
return (function __GT_t13022(cs__$1,ch__$1,mult__$1,meta13023){return (new cljs.core.async.t13022(cs__$1,ch__$1,mult__$1,meta13023));
});})(cs))
;
}
return (new cljs.core.async.t13022(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__5838__auto___13243 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___13243,cs,m,dchan,dctr,done){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___13243,cs,m,dchan,dctr,done){
return (function (state_13155){var state_val_13156 = (state_13155[(1)]);if((state_val_13156 === (7)))
{var inst_13151 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13157_13244 = state_13155__$1;(statearr_13157_13244[(2)] = inst_13151);
(statearr_13157_13244[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (20)))
{var inst_13056 = (state_13155[(7)]);var inst_13066 = cljs.core.first.call(null,inst_13056);var inst_13067 = cljs.core.nth.call(null,inst_13066,(0),null);var inst_13068 = cljs.core.nth.call(null,inst_13066,(1),null);var state_13155__$1 = (function (){var statearr_13158 = state_13155;(statearr_13158[(8)] = inst_13067);
return statearr_13158;
})();if(cljs.core.truth_(inst_13068))
{var statearr_13159_13245 = state_13155__$1;(statearr_13159_13245[(1)] = (22));
} else
{var statearr_13160_13246 = state_13155__$1;(statearr_13160_13246[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (27)))
{var inst_13096 = (state_13155[(9)]);var inst_13098 = (state_13155[(10)]);var inst_13103 = (state_13155[(11)]);var inst_13027 = (state_13155[(12)]);var inst_13103__$1 = cljs.core._nth.call(null,inst_13096,inst_13098);var inst_13104 = cljs.core.async.put_BANG_.call(null,inst_13103__$1,inst_13027,done);var state_13155__$1 = (function (){var statearr_13161 = state_13155;(statearr_13161[(11)] = inst_13103__$1);
return statearr_13161;
})();if(cljs.core.truth_(inst_13104))
{var statearr_13162_13247 = state_13155__$1;(statearr_13162_13247[(1)] = (30));
} else
{var statearr_13163_13248 = state_13155__$1;(statearr_13163_13248[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (1)))
{var state_13155__$1 = state_13155;var statearr_13164_13249 = state_13155__$1;(statearr_13164_13249[(2)] = null);
(statearr_13164_13249[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (24)))
{var inst_13056 = (state_13155[(7)]);var inst_13073 = (state_13155[(2)]);var inst_13074 = cljs.core.next.call(null,inst_13056);var inst_13036 = inst_13074;var inst_13037 = null;var inst_13038 = (0);var inst_13039 = (0);var state_13155__$1 = (function (){var statearr_13165 = state_13155;(statearr_13165[(13)] = inst_13038);
(statearr_13165[(14)] = inst_13036);
(statearr_13165[(15)] = inst_13073);
(statearr_13165[(16)] = inst_13039);
(statearr_13165[(17)] = inst_13037);
return statearr_13165;
})();var statearr_13166_13250 = state_13155__$1;(statearr_13166_13250[(2)] = null);
(statearr_13166_13250[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (39)))
{var state_13155__$1 = state_13155;var statearr_13170_13251 = state_13155__$1;(statearr_13170_13251[(2)] = null);
(statearr_13170_13251[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (4)))
{var inst_13027 = (state_13155[(12)]);var inst_13027__$1 = (state_13155[(2)]);var inst_13028 = (inst_13027__$1 == null);var state_13155__$1 = (function (){var statearr_13171 = state_13155;(statearr_13171[(12)] = inst_13027__$1);
return statearr_13171;
})();if(cljs.core.truth_(inst_13028))
{var statearr_13172_13252 = state_13155__$1;(statearr_13172_13252[(1)] = (5));
} else
{var statearr_13173_13253 = state_13155__$1;(statearr_13173_13253[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (15)))
{var inst_13038 = (state_13155[(13)]);var inst_13036 = (state_13155[(14)]);var inst_13039 = (state_13155[(16)]);var inst_13037 = (state_13155[(17)]);var inst_13052 = (state_13155[(2)]);var inst_13053 = (inst_13039 + (1));var tmp13167 = inst_13038;var tmp13168 = inst_13036;var tmp13169 = inst_13037;var inst_13036__$1 = tmp13168;var inst_13037__$1 = tmp13169;var inst_13038__$1 = tmp13167;var inst_13039__$1 = inst_13053;var state_13155__$1 = (function (){var statearr_13174 = state_13155;(statearr_13174[(18)] = inst_13052);
(statearr_13174[(13)] = inst_13038__$1);
(statearr_13174[(14)] = inst_13036__$1);
(statearr_13174[(16)] = inst_13039__$1);
(statearr_13174[(17)] = inst_13037__$1);
return statearr_13174;
})();var statearr_13175_13254 = state_13155__$1;(statearr_13175_13254[(2)] = null);
(statearr_13175_13254[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (21)))
{var inst_13077 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13179_13255 = state_13155__$1;(statearr_13179_13255[(2)] = inst_13077);
(statearr_13179_13255[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (31)))
{var inst_13103 = (state_13155[(11)]);var inst_13107 = done.call(null,null);var inst_13108 = cljs.core.async.untap_STAR_.call(null,m,inst_13103);var state_13155__$1 = (function (){var statearr_13180 = state_13155;(statearr_13180[(19)] = inst_13107);
return statearr_13180;
})();var statearr_13181_13256 = state_13155__$1;(statearr_13181_13256[(2)] = inst_13108);
(statearr_13181_13256[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (32)))
{var inst_13096 = (state_13155[(9)]);var inst_13097 = (state_13155[(20)]);var inst_13098 = (state_13155[(10)]);var inst_13095 = (state_13155[(21)]);var inst_13110 = (state_13155[(2)]);var inst_13111 = (inst_13098 + (1));var tmp13176 = inst_13096;var tmp13177 = inst_13097;var tmp13178 = inst_13095;var inst_13095__$1 = tmp13178;var inst_13096__$1 = tmp13176;var inst_13097__$1 = tmp13177;var inst_13098__$1 = inst_13111;var state_13155__$1 = (function (){var statearr_13182 = state_13155;(statearr_13182[(9)] = inst_13096__$1);
(statearr_13182[(20)] = inst_13097__$1);
(statearr_13182[(10)] = inst_13098__$1);
(statearr_13182[(21)] = inst_13095__$1);
(statearr_13182[(22)] = inst_13110);
return statearr_13182;
})();var statearr_13183_13257 = state_13155__$1;(statearr_13183_13257[(2)] = null);
(statearr_13183_13257[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (40)))
{var inst_13123 = (state_13155[(23)]);var inst_13127 = done.call(null,null);var inst_13128 = cljs.core.async.untap_STAR_.call(null,m,inst_13123);var state_13155__$1 = (function (){var statearr_13184 = state_13155;(statearr_13184[(24)] = inst_13127);
return statearr_13184;
})();var statearr_13185_13258 = state_13155__$1;(statearr_13185_13258[(2)] = inst_13128);
(statearr_13185_13258[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (33)))
{var inst_13114 = (state_13155[(25)]);var inst_13116 = cljs.core.chunked_seq_QMARK_.call(null,inst_13114);var state_13155__$1 = state_13155;if(inst_13116)
{var statearr_13186_13259 = state_13155__$1;(statearr_13186_13259[(1)] = (36));
} else
{var statearr_13187_13260 = state_13155__$1;(statearr_13187_13260[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (13)))
{var inst_13046 = (state_13155[(26)]);var inst_13049 = cljs.core.async.close_BANG_.call(null,inst_13046);var state_13155__$1 = state_13155;var statearr_13188_13261 = state_13155__$1;(statearr_13188_13261[(2)] = inst_13049);
(statearr_13188_13261[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (22)))
{var inst_13067 = (state_13155[(8)]);var inst_13070 = cljs.core.async.close_BANG_.call(null,inst_13067);var state_13155__$1 = state_13155;var statearr_13189_13262 = state_13155__$1;(statearr_13189_13262[(2)] = inst_13070);
(statearr_13189_13262[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (36)))
{var inst_13114 = (state_13155[(25)]);var inst_13118 = cljs.core.chunk_first.call(null,inst_13114);var inst_13119 = cljs.core.chunk_rest.call(null,inst_13114);var inst_13120 = cljs.core.count.call(null,inst_13118);var inst_13095 = inst_13119;var inst_13096 = inst_13118;var inst_13097 = inst_13120;var inst_13098 = (0);var state_13155__$1 = (function (){var statearr_13190 = state_13155;(statearr_13190[(9)] = inst_13096);
(statearr_13190[(20)] = inst_13097);
(statearr_13190[(10)] = inst_13098);
(statearr_13190[(21)] = inst_13095);
return statearr_13190;
})();var statearr_13191_13263 = state_13155__$1;(statearr_13191_13263[(2)] = null);
(statearr_13191_13263[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (41)))
{var inst_13114 = (state_13155[(25)]);var inst_13130 = (state_13155[(2)]);var inst_13131 = cljs.core.next.call(null,inst_13114);var inst_13095 = inst_13131;var inst_13096 = null;var inst_13097 = (0);var inst_13098 = (0);var state_13155__$1 = (function (){var statearr_13192 = state_13155;(statearr_13192[(9)] = inst_13096);
(statearr_13192[(20)] = inst_13097);
(statearr_13192[(10)] = inst_13098);
(statearr_13192[(21)] = inst_13095);
(statearr_13192[(27)] = inst_13130);
return statearr_13192;
})();var statearr_13193_13264 = state_13155__$1;(statearr_13193_13264[(2)] = null);
(statearr_13193_13264[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (43)))
{var state_13155__$1 = state_13155;var statearr_13194_13265 = state_13155__$1;(statearr_13194_13265[(2)] = null);
(statearr_13194_13265[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (29)))
{var inst_13139 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13195_13266 = state_13155__$1;(statearr_13195_13266[(2)] = inst_13139);
(statearr_13195_13266[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (44)))
{var inst_13148 = (state_13155[(2)]);var state_13155__$1 = (function (){var statearr_13196 = state_13155;(statearr_13196[(28)] = inst_13148);
return statearr_13196;
})();var statearr_13197_13267 = state_13155__$1;(statearr_13197_13267[(2)] = null);
(statearr_13197_13267[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (6)))
{var inst_13087 = (state_13155[(29)]);var inst_13086 = cljs.core.deref.call(null,cs);var inst_13087__$1 = cljs.core.keys.call(null,inst_13086);var inst_13088 = cljs.core.count.call(null,inst_13087__$1);var inst_13089 = cljs.core.reset_BANG_.call(null,dctr,inst_13088);var inst_13094 = cljs.core.seq.call(null,inst_13087__$1);var inst_13095 = inst_13094;var inst_13096 = null;var inst_13097 = (0);var inst_13098 = (0);var state_13155__$1 = (function (){var statearr_13198 = state_13155;(statearr_13198[(9)] = inst_13096);
(statearr_13198[(20)] = inst_13097);
(statearr_13198[(10)] = inst_13098);
(statearr_13198[(21)] = inst_13095);
(statearr_13198[(30)] = inst_13089);
(statearr_13198[(29)] = inst_13087__$1);
return statearr_13198;
})();var statearr_13199_13268 = state_13155__$1;(statearr_13199_13268[(2)] = null);
(statearr_13199_13268[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (28)))
{var inst_13095 = (state_13155[(21)]);var inst_13114 = (state_13155[(25)]);var inst_13114__$1 = cljs.core.seq.call(null,inst_13095);var state_13155__$1 = (function (){var statearr_13200 = state_13155;(statearr_13200[(25)] = inst_13114__$1);
return statearr_13200;
})();if(inst_13114__$1)
{var statearr_13201_13269 = state_13155__$1;(statearr_13201_13269[(1)] = (33));
} else
{var statearr_13202_13270 = state_13155__$1;(statearr_13202_13270[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (25)))
{var inst_13097 = (state_13155[(20)]);var inst_13098 = (state_13155[(10)]);var inst_13100 = (inst_13098 < inst_13097);var inst_13101 = inst_13100;var state_13155__$1 = state_13155;if(cljs.core.truth_(inst_13101))
{var statearr_13203_13271 = state_13155__$1;(statearr_13203_13271[(1)] = (27));
} else
{var statearr_13204_13272 = state_13155__$1;(statearr_13204_13272[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (34)))
{var state_13155__$1 = state_13155;var statearr_13205_13273 = state_13155__$1;(statearr_13205_13273[(2)] = null);
(statearr_13205_13273[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (17)))
{var state_13155__$1 = state_13155;var statearr_13206_13274 = state_13155__$1;(statearr_13206_13274[(2)] = null);
(statearr_13206_13274[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (3)))
{var inst_13153 = (state_13155[(2)]);var state_13155__$1 = state_13155;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13155__$1,inst_13153);
} else
{if((state_val_13156 === (12)))
{var inst_13082 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13207_13275 = state_13155__$1;(statearr_13207_13275[(2)] = inst_13082);
(statearr_13207_13275[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (2)))
{var state_13155__$1 = state_13155;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13155__$1,(4),ch);
} else
{if((state_val_13156 === (23)))
{var state_13155__$1 = state_13155;var statearr_13208_13276 = state_13155__$1;(statearr_13208_13276[(2)] = null);
(statearr_13208_13276[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (35)))
{var inst_13137 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13209_13277 = state_13155__$1;(statearr_13209_13277[(2)] = inst_13137);
(statearr_13209_13277[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (19)))
{var inst_13056 = (state_13155[(7)]);var inst_13060 = cljs.core.chunk_first.call(null,inst_13056);var inst_13061 = cljs.core.chunk_rest.call(null,inst_13056);var inst_13062 = cljs.core.count.call(null,inst_13060);var inst_13036 = inst_13061;var inst_13037 = inst_13060;var inst_13038 = inst_13062;var inst_13039 = (0);var state_13155__$1 = (function (){var statearr_13210 = state_13155;(statearr_13210[(13)] = inst_13038);
(statearr_13210[(14)] = inst_13036);
(statearr_13210[(16)] = inst_13039);
(statearr_13210[(17)] = inst_13037);
return statearr_13210;
})();var statearr_13211_13278 = state_13155__$1;(statearr_13211_13278[(2)] = null);
(statearr_13211_13278[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (11)))
{var inst_13036 = (state_13155[(14)]);var inst_13056 = (state_13155[(7)]);var inst_13056__$1 = cljs.core.seq.call(null,inst_13036);var state_13155__$1 = (function (){var statearr_13212 = state_13155;(statearr_13212[(7)] = inst_13056__$1);
return statearr_13212;
})();if(inst_13056__$1)
{var statearr_13213_13279 = state_13155__$1;(statearr_13213_13279[(1)] = (16));
} else
{var statearr_13214_13280 = state_13155__$1;(statearr_13214_13280[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (9)))
{var inst_13084 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13215_13281 = state_13155__$1;(statearr_13215_13281[(2)] = inst_13084);
(statearr_13215_13281[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (5)))
{var inst_13034 = cljs.core.deref.call(null,cs);var inst_13035 = cljs.core.seq.call(null,inst_13034);var inst_13036 = inst_13035;var inst_13037 = null;var inst_13038 = (0);var inst_13039 = (0);var state_13155__$1 = (function (){var statearr_13216 = state_13155;(statearr_13216[(13)] = inst_13038);
(statearr_13216[(14)] = inst_13036);
(statearr_13216[(16)] = inst_13039);
(statearr_13216[(17)] = inst_13037);
return statearr_13216;
})();var statearr_13217_13282 = state_13155__$1;(statearr_13217_13282[(2)] = null);
(statearr_13217_13282[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (14)))
{var state_13155__$1 = state_13155;var statearr_13218_13283 = state_13155__$1;(statearr_13218_13283[(2)] = null);
(statearr_13218_13283[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (45)))
{var inst_13145 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13219_13284 = state_13155__$1;(statearr_13219_13284[(2)] = inst_13145);
(statearr_13219_13284[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (26)))
{var inst_13087 = (state_13155[(29)]);var inst_13141 = (state_13155[(2)]);var inst_13142 = cljs.core.seq.call(null,inst_13087);var state_13155__$1 = (function (){var statearr_13220 = state_13155;(statearr_13220[(31)] = inst_13141);
return statearr_13220;
})();if(inst_13142)
{var statearr_13221_13285 = state_13155__$1;(statearr_13221_13285[(1)] = (42));
} else
{var statearr_13222_13286 = state_13155__$1;(statearr_13222_13286[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (16)))
{var inst_13056 = (state_13155[(7)]);var inst_13058 = cljs.core.chunked_seq_QMARK_.call(null,inst_13056);var state_13155__$1 = state_13155;if(inst_13058)
{var statearr_13223_13287 = state_13155__$1;(statearr_13223_13287[(1)] = (19));
} else
{var statearr_13224_13288 = state_13155__$1;(statearr_13224_13288[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (38)))
{var inst_13134 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13225_13289 = state_13155__$1;(statearr_13225_13289[(2)] = inst_13134);
(statearr_13225_13289[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (30)))
{var state_13155__$1 = state_13155;var statearr_13226_13290 = state_13155__$1;(statearr_13226_13290[(2)] = null);
(statearr_13226_13290[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (10)))
{var inst_13039 = (state_13155[(16)]);var inst_13037 = (state_13155[(17)]);var inst_13045 = cljs.core._nth.call(null,inst_13037,inst_13039);var inst_13046 = cljs.core.nth.call(null,inst_13045,(0),null);var inst_13047 = cljs.core.nth.call(null,inst_13045,(1),null);var state_13155__$1 = (function (){var statearr_13227 = state_13155;(statearr_13227[(26)] = inst_13046);
return statearr_13227;
})();if(cljs.core.truth_(inst_13047))
{var statearr_13228_13291 = state_13155__$1;(statearr_13228_13291[(1)] = (13));
} else
{var statearr_13229_13292 = state_13155__$1;(statearr_13229_13292[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (18)))
{var inst_13080 = (state_13155[(2)]);var state_13155__$1 = state_13155;var statearr_13230_13293 = state_13155__$1;(statearr_13230_13293[(2)] = inst_13080);
(statearr_13230_13293[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (42)))
{var state_13155__$1 = state_13155;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13155__$1,(45),dchan);
} else
{if((state_val_13156 === (37)))
{var inst_13027 = (state_13155[(12)]);var inst_13123 = (state_13155[(23)]);var inst_13114 = (state_13155[(25)]);var inst_13123__$1 = cljs.core.first.call(null,inst_13114);var inst_13124 = cljs.core.async.put_BANG_.call(null,inst_13123__$1,inst_13027,done);var state_13155__$1 = (function (){var statearr_13231 = state_13155;(statearr_13231[(23)] = inst_13123__$1);
return statearr_13231;
})();if(cljs.core.truth_(inst_13124))
{var statearr_13232_13294 = state_13155__$1;(statearr_13232_13294[(1)] = (39));
} else
{var statearr_13233_13295 = state_13155__$1;(statearr_13233_13295[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13156 === (8)))
{var inst_13038 = (state_13155[(13)]);var inst_13039 = (state_13155[(16)]);var inst_13041 = (inst_13039 < inst_13038);var inst_13042 = inst_13041;var state_13155__$1 = state_13155;if(cljs.core.truth_(inst_13042))
{var statearr_13234_13296 = state_13155__$1;(statearr_13234_13296[(1)] = (10));
} else
{var statearr_13235_13297 = state_13155__$1;(statearr_13235_13297[(1)] = (11));
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
});})(c__5838__auto___13243,cs,m,dchan,dctr,done))
;return ((function (switch__5823__auto__,c__5838__auto___13243,cs,m,dchan,dctr,done){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_13239 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13239[(0)] = state_machine__5824__auto__);
(statearr_13239[(1)] = (1));
return statearr_13239;
});
var state_machine__5824__auto____1 = (function (state_13155){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_13155);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e13240){if((e13240 instanceof Object))
{var ex__5827__auto__ = e13240;var statearr_13241_13298 = state_13155;(statearr_13241_13298[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13155);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13240;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13299 = state_13155;
state_13155 = G__13299;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_13155){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_13155);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___13243,cs,m,dchan,dctr,done))
})();var state__5840__auto__ = (function (){var statearr_13242 = f__5839__auto__.call(null);(statearr_13242[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___13243);
return statearr_13242;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___13243,cs,m,dchan,dctr,done))
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
cljs.core.async.Mix = (function (){var obj13301 = {};return obj13301;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3625__auto__ = m;if(and__3625__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4273__auto__ = (((m == null))?null:m);return (function (){var or__3637__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
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
;var m = (function (){if(typeof cljs.core.async.t13421 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13421 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta13422){
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
this.meta13422 = meta13422;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13421.cljs$lang$type = true;
cljs.core.async.t13421.cljs$lang$ctorStr = "cljs.core.async/t13421";
cljs.core.async.t13421.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t13421");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13421.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_13423){var self__ = this;
var _13423__$1 = this;return self__.meta13422;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13421.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_13423,meta13422__$1){var self__ = this;
var _13423__$1 = this;return (new cljs.core.async.t13421(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta13422__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t13421 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t13421(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta13422){return (new cljs.core.async.t13421(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta13422));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t13421(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__5838__auto___13540 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_13493){var state_val_13494 = (state_13493[(1)]);if((state_val_13494 === (7)))
{var inst_13437 = (state_13493[(7)]);var inst_13442 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13437);var state_13493__$1 = state_13493;var statearr_13495_13541 = state_13493__$1;(statearr_13495_13541[(2)] = inst_13442);
(statearr_13495_13541[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (20)))
{var inst_13452 = (state_13493[(8)]);var state_13493__$1 = state_13493;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13493__$1,(23),out,inst_13452);
} else
{if((state_val_13494 === (1)))
{var inst_13427 = (state_13493[(9)]);var inst_13427__$1 = calc_state.call(null);var inst_13428 = cljs.core.seq_QMARK_.call(null,inst_13427__$1);var state_13493__$1 = (function (){var statearr_13496 = state_13493;(statearr_13496[(9)] = inst_13427__$1);
return statearr_13496;
})();if(inst_13428)
{var statearr_13497_13542 = state_13493__$1;(statearr_13497_13542[(1)] = (2));
} else
{var statearr_13498_13543 = state_13493__$1;(statearr_13498_13543[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (24)))
{var inst_13445 = (state_13493[(10)]);var inst_13437 = inst_13445;var state_13493__$1 = (function (){var statearr_13499 = state_13493;(statearr_13499[(7)] = inst_13437);
return statearr_13499;
})();var statearr_13500_13544 = state_13493__$1;(statearr_13500_13544[(2)] = null);
(statearr_13500_13544[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (4)))
{var inst_13427 = (state_13493[(9)]);var inst_13433 = (state_13493[(2)]);var inst_13434 = cljs.core.get.call(null,inst_13433,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_13435 = cljs.core.get.call(null,inst_13433,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_13436 = cljs.core.get.call(null,inst_13433,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_13437 = inst_13427;var state_13493__$1 = (function (){var statearr_13501 = state_13493;(statearr_13501[(11)] = inst_13436);
(statearr_13501[(12)] = inst_13434);
(statearr_13501[(7)] = inst_13437);
(statearr_13501[(13)] = inst_13435);
return statearr_13501;
})();var statearr_13502_13545 = state_13493__$1;(statearr_13502_13545[(2)] = null);
(statearr_13502_13545[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (15)))
{var state_13493__$1 = state_13493;var statearr_13503_13546 = state_13493__$1;(statearr_13503_13546[(2)] = null);
(statearr_13503_13546[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (21)))
{var inst_13445 = (state_13493[(10)]);var inst_13437 = inst_13445;var state_13493__$1 = (function (){var statearr_13504 = state_13493;(statearr_13504[(7)] = inst_13437);
return statearr_13504;
})();var statearr_13505_13547 = state_13493__$1;(statearr_13505_13547[(2)] = null);
(statearr_13505_13547[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (13)))
{var inst_13489 = (state_13493[(2)]);var state_13493__$1 = state_13493;var statearr_13506_13548 = state_13493__$1;(statearr_13506_13548[(2)] = inst_13489);
(statearr_13506_13548[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (22)))
{var inst_13487 = (state_13493[(2)]);var state_13493__$1 = state_13493;var statearr_13507_13549 = state_13493__$1;(statearr_13507_13549[(2)] = inst_13487);
(statearr_13507_13549[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (6)))
{var inst_13491 = (state_13493[(2)]);var state_13493__$1 = state_13493;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13493__$1,inst_13491);
} else
{if((state_val_13494 === (25)))
{var state_13493__$1 = state_13493;var statearr_13508_13550 = state_13493__$1;(statearr_13508_13550[(2)] = null);
(statearr_13508_13550[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (17)))
{var inst_13467 = (state_13493[(14)]);var state_13493__$1 = state_13493;var statearr_13509_13551 = state_13493__$1;(statearr_13509_13551[(2)] = inst_13467);
(statearr_13509_13551[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (3)))
{var inst_13427 = (state_13493[(9)]);var state_13493__$1 = state_13493;var statearr_13510_13552 = state_13493__$1;(statearr_13510_13552[(2)] = inst_13427);
(statearr_13510_13552[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (12)))
{var inst_13453 = (state_13493[(15)]);var inst_13448 = (state_13493[(16)]);var inst_13467 = (state_13493[(14)]);var inst_13467__$1 = inst_13448.call(null,inst_13453);var state_13493__$1 = (function (){var statearr_13511 = state_13493;(statearr_13511[(14)] = inst_13467__$1);
return statearr_13511;
})();if(cljs.core.truth_(inst_13467__$1))
{var statearr_13512_13553 = state_13493__$1;(statearr_13512_13553[(1)] = (17));
} else
{var statearr_13513_13554 = state_13493__$1;(statearr_13513_13554[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (2)))
{var inst_13427 = (state_13493[(9)]);var inst_13430 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13427);var state_13493__$1 = state_13493;var statearr_13514_13555 = state_13493__$1;(statearr_13514_13555[(2)] = inst_13430);
(statearr_13514_13555[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (23)))
{var inst_13478 = (state_13493[(2)]);var state_13493__$1 = state_13493;if(cljs.core.truth_(inst_13478))
{var statearr_13515_13556 = state_13493__$1;(statearr_13515_13556[(1)] = (24));
} else
{var statearr_13516_13557 = state_13493__$1;(statearr_13516_13557[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (19)))
{var inst_13475 = (state_13493[(2)]);var state_13493__$1 = state_13493;if(cljs.core.truth_(inst_13475))
{var statearr_13517_13558 = state_13493__$1;(statearr_13517_13558[(1)] = (20));
} else
{var statearr_13518_13559 = state_13493__$1;(statearr_13518_13559[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (11)))
{var inst_13452 = (state_13493[(8)]);var inst_13458 = (inst_13452 == null);var state_13493__$1 = state_13493;if(cljs.core.truth_(inst_13458))
{var statearr_13519_13560 = state_13493__$1;(statearr_13519_13560[(1)] = (14));
} else
{var statearr_13520_13561 = state_13493__$1;(statearr_13520_13561[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (9)))
{var inst_13445 = (state_13493[(10)]);var inst_13445__$1 = (state_13493[(2)]);var inst_13446 = cljs.core.get.call(null,inst_13445__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_13447 = cljs.core.get.call(null,inst_13445__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_13448 = cljs.core.get.call(null,inst_13445__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_13493__$1 = (function (){var statearr_13521 = state_13493;(statearr_13521[(17)] = inst_13447);
(statearr_13521[(10)] = inst_13445__$1);
(statearr_13521[(16)] = inst_13448);
return statearr_13521;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13493__$1,(10),inst_13446);
} else
{if((state_val_13494 === (5)))
{var inst_13437 = (state_13493[(7)]);var inst_13440 = cljs.core.seq_QMARK_.call(null,inst_13437);var state_13493__$1 = state_13493;if(inst_13440)
{var statearr_13522_13562 = state_13493__$1;(statearr_13522_13562[(1)] = (7));
} else
{var statearr_13523_13563 = state_13493__$1;(statearr_13523_13563[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (14)))
{var inst_13453 = (state_13493[(15)]);var inst_13460 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_13453);var state_13493__$1 = state_13493;var statearr_13524_13564 = state_13493__$1;(statearr_13524_13564[(2)] = inst_13460);
(statearr_13524_13564[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (26)))
{var inst_13483 = (state_13493[(2)]);var state_13493__$1 = state_13493;var statearr_13525_13565 = state_13493__$1;(statearr_13525_13565[(2)] = inst_13483);
(statearr_13525_13565[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (16)))
{var inst_13463 = (state_13493[(2)]);var inst_13464 = calc_state.call(null);var inst_13437 = inst_13464;var state_13493__$1 = (function (){var statearr_13526 = state_13493;(statearr_13526[(18)] = inst_13463);
(statearr_13526[(7)] = inst_13437);
return statearr_13526;
})();var statearr_13527_13566 = state_13493__$1;(statearr_13527_13566[(2)] = null);
(statearr_13527_13566[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (10)))
{var inst_13453 = (state_13493[(15)]);var inst_13452 = (state_13493[(8)]);var inst_13451 = (state_13493[(2)]);var inst_13452__$1 = cljs.core.nth.call(null,inst_13451,(0),null);var inst_13453__$1 = cljs.core.nth.call(null,inst_13451,(1),null);var inst_13454 = (inst_13452__$1 == null);var inst_13455 = cljs.core._EQ_.call(null,inst_13453__$1,change);var inst_13456 = (inst_13454) || (inst_13455);var state_13493__$1 = (function (){var statearr_13528 = state_13493;(statearr_13528[(15)] = inst_13453__$1);
(statearr_13528[(8)] = inst_13452__$1);
return statearr_13528;
})();if(cljs.core.truth_(inst_13456))
{var statearr_13529_13567 = state_13493__$1;(statearr_13529_13567[(1)] = (11));
} else
{var statearr_13530_13568 = state_13493__$1;(statearr_13530_13568[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (18)))
{var inst_13453 = (state_13493[(15)]);var inst_13447 = (state_13493[(17)]);var inst_13448 = (state_13493[(16)]);var inst_13470 = cljs.core.empty_QMARK_.call(null,inst_13448);var inst_13471 = inst_13447.call(null,inst_13453);var inst_13472 = cljs.core.not.call(null,inst_13471);var inst_13473 = (inst_13470) && (inst_13472);var state_13493__$1 = state_13493;var statearr_13531_13569 = state_13493__$1;(statearr_13531_13569[(2)] = inst_13473);
(statearr_13531_13569[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13494 === (8)))
{var inst_13437 = (state_13493[(7)]);var state_13493__$1 = state_13493;var statearr_13532_13570 = state_13493__$1;(statearr_13532_13570[(2)] = inst_13437);
(statearr_13532_13570[(1)] = (9));
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
});})(c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__5823__auto__,c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_13536 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13536[(0)] = state_machine__5824__auto__);
(statearr_13536[(1)] = (1));
return statearr_13536;
});
var state_machine__5824__auto____1 = (function (state_13493){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_13493);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e13537){if((e13537 instanceof Object))
{var ex__5827__auto__ = e13537;var statearr_13538_13571 = state_13493;(statearr_13538_13571[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13493);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13537;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13572 = state_13493;
state_13493 = G__13572;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_13493){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_13493);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__5840__auto__ = (function (){var statearr_13539 = f__5839__auto__.call(null);(statearr_13539[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___13540);
return statearr_13539;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___13540,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
cljs.core.async.Pub = (function (){var obj13574 = {};return obj13574;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3625__auto__ = p;if(and__3625__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3625__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4273__auto__ = (((p == null))?null:p);return (function (){var or__3637__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3625__auto__ = p;if(and__3625__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3625__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4273__auto__ = (((p == null))?null:p);return (function (){var or__3637__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3625__auto__ = p;if(and__3625__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3625__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4273__auto__ = (((p == null))?null:p);return (function (){var or__3637__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3625__auto__ = p;if(and__3625__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3625__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4273__auto__ = (((p == null))?null:p);return (function (){var or__3637__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4273__auto__)]);if(or__3637__auto__)
{return or__3637__auto__;
} else
{var or__3637__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3637__auto____$1)
{return or__3637__auto____$1;
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
return (function (topic){var or__3637__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3637__auto__))
{return or__3637__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3637__auto__,mults){
return (function (p1__13575_SHARP_){if(cljs.core.truth_(p1__13575_SHARP_.call(null,topic)))
{return p1__13575_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__13575_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3637__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t13698 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13698 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta13699){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta13699 = meta13699;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13698.cljs$lang$type = true;
cljs.core.async.t13698.cljs$lang$ctorStr = "cljs.core.async/t13698";
cljs.core.async.t13698.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t13698");
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t13698.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13698.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_13700){var self__ = this;
var _13700__$1 = this;return self__.meta13699;
});})(mults,ensure_mult))
;
cljs.core.async.t13698.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_13700,meta13699__$1){var self__ = this;
var _13700__$1 = this;return (new cljs.core.async.t13698(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta13699__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t13698 = ((function (mults,ensure_mult){
return (function __GT_t13698(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13699){return (new cljs.core.async.t13698(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13699));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t13698(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__5838__auto___13820 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___13820,mults,ensure_mult,p){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___13820,mults,ensure_mult,p){
return (function (state_13772){var state_val_13773 = (state_13772[(1)]);if((state_val_13773 === (7)))
{var inst_13768 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13774_13821 = state_13772__$1;(statearr_13774_13821[(2)] = inst_13768);
(statearr_13774_13821[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (20)))
{var state_13772__$1 = state_13772;var statearr_13775_13822 = state_13772__$1;(statearr_13775_13822[(2)] = null);
(statearr_13775_13822[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (1)))
{var state_13772__$1 = state_13772;var statearr_13776_13823 = state_13772__$1;(statearr_13776_13823[(2)] = null);
(statearr_13776_13823[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (24)))
{var inst_13751 = (state_13772[(7)]);var inst_13760 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_13751);var state_13772__$1 = state_13772;var statearr_13777_13824 = state_13772__$1;(statearr_13777_13824[(2)] = inst_13760);
(statearr_13777_13824[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (4)))
{var inst_13703 = (state_13772[(8)]);var inst_13703__$1 = (state_13772[(2)]);var inst_13704 = (inst_13703__$1 == null);var state_13772__$1 = (function (){var statearr_13778 = state_13772;(statearr_13778[(8)] = inst_13703__$1);
return statearr_13778;
})();if(cljs.core.truth_(inst_13704))
{var statearr_13779_13825 = state_13772__$1;(statearr_13779_13825[(1)] = (5));
} else
{var statearr_13780_13826 = state_13772__$1;(statearr_13780_13826[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (15)))
{var inst_13745 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13781_13827 = state_13772__$1;(statearr_13781_13827[(2)] = inst_13745);
(statearr_13781_13827[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (21)))
{var inst_13765 = (state_13772[(2)]);var state_13772__$1 = (function (){var statearr_13782 = state_13772;(statearr_13782[(9)] = inst_13765);
return statearr_13782;
})();var statearr_13783_13828 = state_13772__$1;(statearr_13783_13828[(2)] = null);
(statearr_13783_13828[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (13)))
{var inst_13727 = (state_13772[(10)]);var inst_13729 = cljs.core.chunked_seq_QMARK_.call(null,inst_13727);var state_13772__$1 = state_13772;if(inst_13729)
{var statearr_13784_13829 = state_13772__$1;(statearr_13784_13829[(1)] = (16));
} else
{var statearr_13785_13830 = state_13772__$1;(statearr_13785_13830[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (22)))
{var inst_13757 = (state_13772[(2)]);var state_13772__$1 = state_13772;if(cljs.core.truth_(inst_13757))
{var statearr_13786_13831 = state_13772__$1;(statearr_13786_13831[(1)] = (23));
} else
{var statearr_13787_13832 = state_13772__$1;(statearr_13787_13832[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (6)))
{var inst_13753 = (state_13772[(11)]);var inst_13751 = (state_13772[(7)]);var inst_13703 = (state_13772[(8)]);var inst_13751__$1 = topic_fn.call(null,inst_13703);var inst_13752 = cljs.core.deref.call(null,mults);var inst_13753__$1 = cljs.core.get.call(null,inst_13752,inst_13751__$1);var state_13772__$1 = (function (){var statearr_13788 = state_13772;(statearr_13788[(11)] = inst_13753__$1);
(statearr_13788[(7)] = inst_13751__$1);
return statearr_13788;
})();if(cljs.core.truth_(inst_13753__$1))
{var statearr_13789_13833 = state_13772__$1;(statearr_13789_13833[(1)] = (19));
} else
{var statearr_13790_13834 = state_13772__$1;(statearr_13790_13834[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (25)))
{var inst_13762 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13791_13835 = state_13772__$1;(statearr_13791_13835[(2)] = inst_13762);
(statearr_13791_13835[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (17)))
{var inst_13727 = (state_13772[(10)]);var inst_13736 = cljs.core.first.call(null,inst_13727);var inst_13737 = cljs.core.async.muxch_STAR_.call(null,inst_13736);var inst_13738 = cljs.core.async.close_BANG_.call(null,inst_13737);var inst_13739 = cljs.core.next.call(null,inst_13727);var inst_13713 = inst_13739;var inst_13714 = null;var inst_13715 = (0);var inst_13716 = (0);var state_13772__$1 = (function (){var statearr_13792 = state_13772;(statearr_13792[(12)] = inst_13738);
(statearr_13792[(13)] = inst_13714);
(statearr_13792[(14)] = inst_13715);
(statearr_13792[(15)] = inst_13713);
(statearr_13792[(16)] = inst_13716);
return statearr_13792;
})();var statearr_13793_13836 = state_13772__$1;(statearr_13793_13836[(2)] = null);
(statearr_13793_13836[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (3)))
{var inst_13770 = (state_13772[(2)]);var state_13772__$1 = state_13772;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13772__$1,inst_13770);
} else
{if((state_val_13773 === (12)))
{var inst_13747 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13794_13837 = state_13772__$1;(statearr_13794_13837[(2)] = inst_13747);
(statearr_13794_13837[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (2)))
{var state_13772__$1 = state_13772;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13772__$1,(4),ch);
} else
{if((state_val_13773 === (23)))
{var state_13772__$1 = state_13772;var statearr_13795_13838 = state_13772__$1;(statearr_13795_13838[(2)] = null);
(statearr_13795_13838[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (19)))
{var inst_13753 = (state_13772[(11)]);var inst_13703 = (state_13772[(8)]);var inst_13755 = cljs.core.async.muxch_STAR_.call(null,inst_13753);var state_13772__$1 = state_13772;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13772__$1,(22),inst_13755,inst_13703);
} else
{if((state_val_13773 === (11)))
{var inst_13713 = (state_13772[(15)]);var inst_13727 = (state_13772[(10)]);var inst_13727__$1 = cljs.core.seq.call(null,inst_13713);var state_13772__$1 = (function (){var statearr_13796 = state_13772;(statearr_13796[(10)] = inst_13727__$1);
return statearr_13796;
})();if(inst_13727__$1)
{var statearr_13797_13839 = state_13772__$1;(statearr_13797_13839[(1)] = (13));
} else
{var statearr_13798_13840 = state_13772__$1;(statearr_13798_13840[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (9)))
{var inst_13749 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13799_13841 = state_13772__$1;(statearr_13799_13841[(2)] = inst_13749);
(statearr_13799_13841[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (5)))
{var inst_13710 = cljs.core.deref.call(null,mults);var inst_13711 = cljs.core.vals.call(null,inst_13710);var inst_13712 = cljs.core.seq.call(null,inst_13711);var inst_13713 = inst_13712;var inst_13714 = null;var inst_13715 = (0);var inst_13716 = (0);var state_13772__$1 = (function (){var statearr_13800 = state_13772;(statearr_13800[(13)] = inst_13714);
(statearr_13800[(14)] = inst_13715);
(statearr_13800[(15)] = inst_13713);
(statearr_13800[(16)] = inst_13716);
return statearr_13800;
})();var statearr_13801_13842 = state_13772__$1;(statearr_13801_13842[(2)] = null);
(statearr_13801_13842[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (14)))
{var state_13772__$1 = state_13772;var statearr_13805_13843 = state_13772__$1;(statearr_13805_13843[(2)] = null);
(statearr_13805_13843[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (16)))
{var inst_13727 = (state_13772[(10)]);var inst_13731 = cljs.core.chunk_first.call(null,inst_13727);var inst_13732 = cljs.core.chunk_rest.call(null,inst_13727);var inst_13733 = cljs.core.count.call(null,inst_13731);var inst_13713 = inst_13732;var inst_13714 = inst_13731;var inst_13715 = inst_13733;var inst_13716 = (0);var state_13772__$1 = (function (){var statearr_13806 = state_13772;(statearr_13806[(13)] = inst_13714);
(statearr_13806[(14)] = inst_13715);
(statearr_13806[(15)] = inst_13713);
(statearr_13806[(16)] = inst_13716);
return statearr_13806;
})();var statearr_13807_13844 = state_13772__$1;(statearr_13807_13844[(2)] = null);
(statearr_13807_13844[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (10)))
{var inst_13714 = (state_13772[(13)]);var inst_13715 = (state_13772[(14)]);var inst_13713 = (state_13772[(15)]);var inst_13716 = (state_13772[(16)]);var inst_13721 = cljs.core._nth.call(null,inst_13714,inst_13716);var inst_13722 = cljs.core.async.muxch_STAR_.call(null,inst_13721);var inst_13723 = cljs.core.async.close_BANG_.call(null,inst_13722);var inst_13724 = (inst_13716 + (1));var tmp13802 = inst_13714;var tmp13803 = inst_13715;var tmp13804 = inst_13713;var inst_13713__$1 = tmp13804;var inst_13714__$1 = tmp13802;var inst_13715__$1 = tmp13803;var inst_13716__$1 = inst_13724;var state_13772__$1 = (function (){var statearr_13808 = state_13772;(statearr_13808[(13)] = inst_13714__$1);
(statearr_13808[(14)] = inst_13715__$1);
(statearr_13808[(17)] = inst_13723);
(statearr_13808[(15)] = inst_13713__$1);
(statearr_13808[(16)] = inst_13716__$1);
return statearr_13808;
})();var statearr_13809_13845 = state_13772__$1;(statearr_13809_13845[(2)] = null);
(statearr_13809_13845[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (18)))
{var inst_13742 = (state_13772[(2)]);var state_13772__$1 = state_13772;var statearr_13810_13846 = state_13772__$1;(statearr_13810_13846[(2)] = inst_13742);
(statearr_13810_13846[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13773 === (8)))
{var inst_13715 = (state_13772[(14)]);var inst_13716 = (state_13772[(16)]);var inst_13718 = (inst_13716 < inst_13715);var inst_13719 = inst_13718;var state_13772__$1 = state_13772;if(cljs.core.truth_(inst_13719))
{var statearr_13811_13847 = state_13772__$1;(statearr_13811_13847[(1)] = (10));
} else
{var statearr_13812_13848 = state_13772__$1;(statearr_13812_13848[(1)] = (11));
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
});})(c__5838__auto___13820,mults,ensure_mult,p))
;return ((function (switch__5823__auto__,c__5838__auto___13820,mults,ensure_mult,p){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_13816 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13816[(0)] = state_machine__5824__auto__);
(statearr_13816[(1)] = (1));
return statearr_13816;
});
var state_machine__5824__auto____1 = (function (state_13772){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_13772);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e13817){if((e13817 instanceof Object))
{var ex__5827__auto__ = e13817;var statearr_13818_13849 = state_13772;(statearr_13818_13849[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13772);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13817;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13850 = state_13772;
state_13772 = G__13850;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_13772){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_13772);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___13820,mults,ensure_mult,p))
})();var state__5840__auto__ = (function (){var statearr_13819 = f__5839__auto__.call(null);(statearr_13819[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___13820);
return statearr_13819;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___13820,mults,ensure_mult,p))
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
,cljs.core.range.call(null,cnt));var c__5838__auto___13987 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_13957){var state_val_13958 = (state_13957[(1)]);if((state_val_13958 === (7)))
{var state_13957__$1 = state_13957;var statearr_13959_13988 = state_13957__$1;(statearr_13959_13988[(2)] = null);
(statearr_13959_13988[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (1)))
{var state_13957__$1 = state_13957;var statearr_13960_13989 = state_13957__$1;(statearr_13960_13989[(2)] = null);
(statearr_13960_13989[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (4)))
{var inst_13921 = (state_13957[(7)]);var inst_13923 = (inst_13921 < cnt);var state_13957__$1 = state_13957;if(cljs.core.truth_(inst_13923))
{var statearr_13961_13990 = state_13957__$1;(statearr_13961_13990[(1)] = (6));
} else
{var statearr_13962_13991 = state_13957__$1;(statearr_13962_13991[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (15)))
{var inst_13953 = (state_13957[(2)]);var state_13957__$1 = state_13957;var statearr_13963_13992 = state_13957__$1;(statearr_13963_13992[(2)] = inst_13953);
(statearr_13963_13992[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (13)))
{var inst_13946 = cljs.core.async.close_BANG_.call(null,out);var state_13957__$1 = state_13957;var statearr_13964_13993 = state_13957__$1;(statearr_13964_13993[(2)] = inst_13946);
(statearr_13964_13993[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (6)))
{var state_13957__$1 = state_13957;var statearr_13965_13994 = state_13957__$1;(statearr_13965_13994[(2)] = null);
(statearr_13965_13994[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (3)))
{var inst_13955 = (state_13957[(2)]);var state_13957__$1 = state_13957;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13957__$1,inst_13955);
} else
{if((state_val_13958 === (12)))
{var inst_13943 = (state_13957[(8)]);var inst_13943__$1 = (state_13957[(2)]);var inst_13944 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_13943__$1);var state_13957__$1 = (function (){var statearr_13966 = state_13957;(statearr_13966[(8)] = inst_13943__$1);
return statearr_13966;
})();if(cljs.core.truth_(inst_13944))
{var statearr_13967_13995 = state_13957__$1;(statearr_13967_13995[(1)] = (13));
} else
{var statearr_13968_13996 = state_13957__$1;(statearr_13968_13996[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (2)))
{var inst_13920 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_13921 = (0);var state_13957__$1 = (function (){var statearr_13969 = state_13957;(statearr_13969[(7)] = inst_13921);
(statearr_13969[(9)] = inst_13920);
return statearr_13969;
})();var statearr_13970_13997 = state_13957__$1;(statearr_13970_13997[(2)] = null);
(statearr_13970_13997[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (11)))
{var inst_13921 = (state_13957[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_13957,(10),Object,null,(9));var inst_13930 = chs__$1.call(null,inst_13921);var inst_13931 = done.call(null,inst_13921);var inst_13932 = cljs.core.async.take_BANG_.call(null,inst_13930,inst_13931);var state_13957__$1 = state_13957;var statearr_13971_13998 = state_13957__$1;(statearr_13971_13998[(2)] = inst_13932);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13957__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (9)))
{var inst_13921 = (state_13957[(7)]);var inst_13934 = (state_13957[(2)]);var inst_13935 = (inst_13921 + (1));var inst_13921__$1 = inst_13935;var state_13957__$1 = (function (){var statearr_13972 = state_13957;(statearr_13972[(7)] = inst_13921__$1);
(statearr_13972[(10)] = inst_13934);
return statearr_13972;
})();var statearr_13973_13999 = state_13957__$1;(statearr_13973_13999[(2)] = null);
(statearr_13973_13999[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (5)))
{var inst_13941 = (state_13957[(2)]);var state_13957__$1 = (function (){var statearr_13974 = state_13957;(statearr_13974[(11)] = inst_13941);
return statearr_13974;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13957__$1,(12),dchan);
} else
{if((state_val_13958 === (14)))
{var inst_13943 = (state_13957[(8)]);var inst_13948 = cljs.core.apply.call(null,f,inst_13943);var state_13957__$1 = state_13957;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13957__$1,(16),out,inst_13948);
} else
{if((state_val_13958 === (16)))
{var inst_13950 = (state_13957[(2)]);var state_13957__$1 = (function (){var statearr_13975 = state_13957;(statearr_13975[(12)] = inst_13950);
return statearr_13975;
})();var statearr_13976_14000 = state_13957__$1;(statearr_13976_14000[(2)] = null);
(statearr_13976_14000[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (10)))
{var inst_13925 = (state_13957[(2)]);var inst_13926 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_13957__$1 = (function (){var statearr_13977 = state_13957;(statearr_13977[(13)] = inst_13925);
return statearr_13977;
})();var statearr_13978_14001 = state_13957__$1;(statearr_13978_14001[(2)] = inst_13926);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13957__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13958 === (8)))
{var inst_13939 = (state_13957[(2)]);var state_13957__$1 = state_13957;var statearr_13979_14002 = state_13957__$1;(statearr_13979_14002[(2)] = inst_13939);
(statearr_13979_14002[(1)] = (5));
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
});})(c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__5823__auto__,c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_13983 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13983[(0)] = state_machine__5824__auto__);
(statearr_13983[(1)] = (1));
return statearr_13983;
});
var state_machine__5824__auto____1 = (function (state_13957){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_13957);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e13984){if((e13984 instanceof Object))
{var ex__5827__auto__ = e13984;var statearr_13985_14003 = state_13957;(statearr_13985_14003[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13957);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13984;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14004 = state_13957;
state_13957 = G__14004;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_13957){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_13957);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__5840__auto__ = (function (){var statearr_13986 = f__5839__auto__.call(null);(statearr_13986[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___13987);
return statearr_13986;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___13987,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14112 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14112,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14112,out){
return (function (state_14088){var state_val_14089 = (state_14088[(1)]);if((state_val_14089 === (7)))
{var inst_14067 = (state_14088[(7)]);var inst_14068 = (state_14088[(8)]);var inst_14067__$1 = (state_14088[(2)]);var inst_14068__$1 = cljs.core.nth.call(null,inst_14067__$1,(0),null);var inst_14069 = cljs.core.nth.call(null,inst_14067__$1,(1),null);var inst_14070 = (inst_14068__$1 == null);var state_14088__$1 = (function (){var statearr_14090 = state_14088;(statearr_14090[(7)] = inst_14067__$1);
(statearr_14090[(8)] = inst_14068__$1);
(statearr_14090[(9)] = inst_14069);
return statearr_14090;
})();if(cljs.core.truth_(inst_14070))
{var statearr_14091_14113 = state_14088__$1;(statearr_14091_14113[(1)] = (8));
} else
{var statearr_14092_14114 = state_14088__$1;(statearr_14092_14114[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (1)))
{var inst_14059 = cljs.core.vec.call(null,chs);var inst_14060 = inst_14059;var state_14088__$1 = (function (){var statearr_14093 = state_14088;(statearr_14093[(10)] = inst_14060);
return statearr_14093;
})();var statearr_14094_14115 = state_14088__$1;(statearr_14094_14115[(2)] = null);
(statearr_14094_14115[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (4)))
{var inst_14060 = (state_14088[(10)]);var state_14088__$1 = state_14088;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_14088__$1,(7),inst_14060);
} else
{if((state_val_14089 === (6)))
{var inst_14084 = (state_14088[(2)]);var state_14088__$1 = state_14088;var statearr_14095_14116 = state_14088__$1;(statearr_14095_14116[(2)] = inst_14084);
(statearr_14095_14116[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (3)))
{var inst_14086 = (state_14088[(2)]);var state_14088__$1 = state_14088;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14088__$1,inst_14086);
} else
{if((state_val_14089 === (2)))
{var inst_14060 = (state_14088[(10)]);var inst_14062 = cljs.core.count.call(null,inst_14060);var inst_14063 = (inst_14062 > (0));var state_14088__$1 = state_14088;if(cljs.core.truth_(inst_14063))
{var statearr_14097_14117 = state_14088__$1;(statearr_14097_14117[(1)] = (4));
} else
{var statearr_14098_14118 = state_14088__$1;(statearr_14098_14118[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (11)))
{var inst_14060 = (state_14088[(10)]);var inst_14077 = (state_14088[(2)]);var tmp14096 = inst_14060;var inst_14060__$1 = tmp14096;var state_14088__$1 = (function (){var statearr_14099 = state_14088;(statearr_14099[(11)] = inst_14077);
(statearr_14099[(10)] = inst_14060__$1);
return statearr_14099;
})();var statearr_14100_14119 = state_14088__$1;(statearr_14100_14119[(2)] = null);
(statearr_14100_14119[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (9)))
{var inst_14068 = (state_14088[(8)]);var state_14088__$1 = state_14088;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14088__$1,(11),out,inst_14068);
} else
{if((state_val_14089 === (5)))
{var inst_14082 = cljs.core.async.close_BANG_.call(null,out);var state_14088__$1 = state_14088;var statearr_14101_14120 = state_14088__$1;(statearr_14101_14120[(2)] = inst_14082);
(statearr_14101_14120[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (10)))
{var inst_14080 = (state_14088[(2)]);var state_14088__$1 = state_14088;var statearr_14102_14121 = state_14088__$1;(statearr_14102_14121[(2)] = inst_14080);
(statearr_14102_14121[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14089 === (8)))
{var inst_14067 = (state_14088[(7)]);var inst_14068 = (state_14088[(8)]);var inst_14069 = (state_14088[(9)]);var inst_14060 = (state_14088[(10)]);var inst_14072 = (function (){var c = inst_14069;var v = inst_14068;var vec__14065 = inst_14067;var cs = inst_14060;return ((function (c,v,vec__14065,cs,inst_14067,inst_14068,inst_14069,inst_14060,state_val_14089,c__5838__auto___14112,out){
return (function (p1__14005_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__14005_SHARP_);
});
;})(c,v,vec__14065,cs,inst_14067,inst_14068,inst_14069,inst_14060,state_val_14089,c__5838__auto___14112,out))
})();var inst_14073 = cljs.core.filterv.call(null,inst_14072,inst_14060);var inst_14060__$1 = inst_14073;var state_14088__$1 = (function (){var statearr_14103 = state_14088;(statearr_14103[(10)] = inst_14060__$1);
return statearr_14103;
})();var statearr_14104_14122 = state_14088__$1;(statearr_14104_14122[(2)] = null);
(statearr_14104_14122[(1)] = (2));
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
});})(c__5838__auto___14112,out))
;return ((function (switch__5823__auto__,c__5838__auto___14112,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14108 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14108[(0)] = state_machine__5824__auto__);
(statearr_14108[(1)] = (1));
return statearr_14108;
});
var state_machine__5824__auto____1 = (function (state_14088){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14088);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14109){if((e14109 instanceof Object))
{var ex__5827__auto__ = e14109;var statearr_14110_14123 = state_14088;(statearr_14110_14123[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14088);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14109;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14124 = state_14088;
state_14088 = G__14124;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14088){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14088);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14112,out))
})();var state__5840__auto__ = (function (){var statearr_14111 = f__5839__auto__.call(null);(statearr_14111[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14112);
return statearr_14111;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14112,out))
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
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14217 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14217,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14217,out){
return (function (state_14194){var state_val_14195 = (state_14194[(1)]);if((state_val_14195 === (7)))
{var inst_14176 = (state_14194[(7)]);var inst_14176__$1 = (state_14194[(2)]);var inst_14177 = (inst_14176__$1 == null);var inst_14178 = cljs.core.not.call(null,inst_14177);var state_14194__$1 = (function (){var statearr_14196 = state_14194;(statearr_14196[(7)] = inst_14176__$1);
return statearr_14196;
})();if(inst_14178)
{var statearr_14197_14218 = state_14194__$1;(statearr_14197_14218[(1)] = (8));
} else
{var statearr_14198_14219 = state_14194__$1;(statearr_14198_14219[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (1)))
{var inst_14171 = (0);var state_14194__$1 = (function (){var statearr_14199 = state_14194;(statearr_14199[(8)] = inst_14171);
return statearr_14199;
})();var statearr_14200_14220 = state_14194__$1;(statearr_14200_14220[(2)] = null);
(statearr_14200_14220[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (4)))
{var state_14194__$1 = state_14194;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14194__$1,(7),ch);
} else
{if((state_val_14195 === (6)))
{var inst_14189 = (state_14194[(2)]);var state_14194__$1 = state_14194;var statearr_14201_14221 = state_14194__$1;(statearr_14201_14221[(2)] = inst_14189);
(statearr_14201_14221[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (3)))
{var inst_14191 = (state_14194[(2)]);var inst_14192 = cljs.core.async.close_BANG_.call(null,out);var state_14194__$1 = (function (){var statearr_14202 = state_14194;(statearr_14202[(9)] = inst_14191);
return statearr_14202;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14194__$1,inst_14192);
} else
{if((state_val_14195 === (2)))
{var inst_14171 = (state_14194[(8)]);var inst_14173 = (inst_14171 < n);var state_14194__$1 = state_14194;if(cljs.core.truth_(inst_14173))
{var statearr_14203_14222 = state_14194__$1;(statearr_14203_14222[(1)] = (4));
} else
{var statearr_14204_14223 = state_14194__$1;(statearr_14204_14223[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (11)))
{var inst_14171 = (state_14194[(8)]);var inst_14181 = (state_14194[(2)]);var inst_14182 = (inst_14171 + (1));var inst_14171__$1 = inst_14182;var state_14194__$1 = (function (){var statearr_14205 = state_14194;(statearr_14205[(8)] = inst_14171__$1);
(statearr_14205[(10)] = inst_14181);
return statearr_14205;
})();var statearr_14206_14224 = state_14194__$1;(statearr_14206_14224[(2)] = null);
(statearr_14206_14224[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (9)))
{var state_14194__$1 = state_14194;var statearr_14207_14225 = state_14194__$1;(statearr_14207_14225[(2)] = null);
(statearr_14207_14225[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (5)))
{var state_14194__$1 = state_14194;var statearr_14208_14226 = state_14194__$1;(statearr_14208_14226[(2)] = null);
(statearr_14208_14226[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (10)))
{var inst_14186 = (state_14194[(2)]);var state_14194__$1 = state_14194;var statearr_14209_14227 = state_14194__$1;(statearr_14209_14227[(2)] = inst_14186);
(statearr_14209_14227[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14195 === (8)))
{var inst_14176 = (state_14194[(7)]);var state_14194__$1 = state_14194;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14194__$1,(11),out,inst_14176);
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
});})(c__5838__auto___14217,out))
;return ((function (switch__5823__auto__,c__5838__auto___14217,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14213 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_14213[(0)] = state_machine__5824__auto__);
(statearr_14213[(1)] = (1));
return statearr_14213;
});
var state_machine__5824__auto____1 = (function (state_14194){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14194);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14214){if((e14214 instanceof Object))
{var ex__5827__auto__ = e14214;var statearr_14215_14228 = state_14194;(statearr_14215_14228[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14194);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14214;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14229 = state_14194;
state_14194 = G__14229;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14194){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14194);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14217,out))
})();var state__5840__auto__ = (function (){var statearr_14216 = f__5839__auto__.call(null);(statearr_14216[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14217);
return statearr_14216;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14217,out))
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
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t14237 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14237 = (function (ch,f,map_LT_,meta14238){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta14238 = meta14238;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14237.cljs$lang$type = true;
cljs.core.async.t14237.cljs$lang$ctorStr = "cljs.core.async/t14237";
cljs.core.async.t14237.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t14237");
});
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t14240 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14240 = (function (fn1,_,meta14238,ch,f,map_LT_,meta14241){
this.fn1 = fn1;
this._ = _;
this.meta14238 = meta14238;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta14241 = meta14241;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14240.cljs$lang$type = true;
cljs.core.async.t14240.cljs$lang$ctorStr = "cljs.core.async/t14240";
cljs.core.async.t14240.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t14240");
});})(___$1))
;
cljs.core.async.t14240.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t14240.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t14240.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t14240.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__14230_SHARP_){return f1.call(null,(((p1__14230_SHARP_ == null))?null:self__.f.call(null,p1__14230_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t14240.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_14242){var self__ = this;
var _14242__$1 = this;return self__.meta14241;
});})(___$1))
;
cljs.core.async.t14240.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_14242,meta14241__$1){var self__ = this;
var _14242__$1 = this;return (new cljs.core.async.t14240(self__.fn1,self__._,self__.meta14238,self__.ch,self__.f,self__.map_LT_,meta14241__$1));
});})(___$1))
;
cljs.core.async.__GT_t14240 = ((function (___$1){
return (function __GT_t14240(fn1__$1,___$2,meta14238__$1,ch__$2,f__$2,map_LT___$2,meta14241){return (new cljs.core.async.t14240(fn1__$1,___$2,meta14238__$1,ch__$2,f__$2,map_LT___$2,meta14241));
});})(___$1))
;
}
return (new cljs.core.async.t14240(fn1,___$1,self__.meta14238,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3625__auto__ = ret;if(cljs.core.truth_(and__3625__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3625__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14237.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t14237.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14239){var self__ = this;
var _14239__$1 = this;return self__.meta14238;
});
cljs.core.async.t14237.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14239,meta14238__$1){var self__ = this;
var _14239__$1 = this;return (new cljs.core.async.t14237(self__.ch,self__.f,self__.map_LT_,meta14238__$1));
});
cljs.core.async.__GT_t14237 = (function __GT_t14237(ch__$1,f__$1,map_LT___$1,meta14238){return (new cljs.core.async.t14237(ch__$1,f__$1,map_LT___$1,meta14238));
});
}
return (new cljs.core.async.t14237(ch,f,map_LT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t14246 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14246 = (function (ch,f,map_GT_,meta14247){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta14247 = meta14247;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14246.cljs$lang$type = true;
cljs.core.async.t14246.cljs$lang$ctorStr = "cljs.core.async/t14246";
cljs.core.async.t14246.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t14246");
});
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14246.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14246.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14248){var self__ = this;
var _14248__$1 = this;return self__.meta14247;
});
cljs.core.async.t14246.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14248,meta14247__$1){var self__ = this;
var _14248__$1 = this;return (new cljs.core.async.t14246(self__.ch,self__.f,self__.map_GT_,meta14247__$1));
});
cljs.core.async.__GT_t14246 = (function __GT_t14246(ch__$1,f__$1,map_GT___$1,meta14247){return (new cljs.core.async.t14246(ch__$1,f__$1,map_GT___$1,meta14247));
});
}
return (new cljs.core.async.t14246(ch,f,map_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t14252 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14252 = (function (ch,p,filter_GT_,meta14253){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta14253 = meta14253;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14252.cljs$lang$type = true;
cljs.core.async.t14252.cljs$lang$ctorStr = "cljs.core.async/t14252";
cljs.core.async.t14252.cljs$lang$ctorPrWriter = (function (this__4213__auto__,writer__4214__auto__,opt__4215__auto__){return cljs.core._write.call(null,writer__4214__auto__,"cljs.core.async/t14252");
});
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14252.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t14252.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14254){var self__ = this;
var _14254__$1 = this;return self__.meta14253;
});
cljs.core.async.t14252.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14254,meta14253__$1){var self__ = this;
var _14254__$1 = this;return (new cljs.core.async.t14252(self__.ch,self__.p,self__.filter_GT_,meta14253__$1));
});
cljs.core.async.__GT_t14252 = (function __GT_t14252(ch__$1,p__$1,filter_GT___$1,meta14253){return (new cljs.core.async.t14252(ch__$1,p__$1,filter_GT___$1,meta14253));
});
}
return (new cljs.core.async.t14252(ch,p,filter_GT_,null));
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
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14337 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14337,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14337,out){
return (function (state_14316){var state_val_14317 = (state_14316[(1)]);if((state_val_14317 === (7)))
{var inst_14312 = (state_14316[(2)]);var state_14316__$1 = state_14316;var statearr_14318_14338 = state_14316__$1;(statearr_14318_14338[(2)] = inst_14312);
(statearr_14318_14338[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (1)))
{var state_14316__$1 = state_14316;var statearr_14319_14339 = state_14316__$1;(statearr_14319_14339[(2)] = null);
(statearr_14319_14339[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (4)))
{var inst_14298 = (state_14316[(7)]);var inst_14298__$1 = (state_14316[(2)]);var inst_14299 = (inst_14298__$1 == null);var state_14316__$1 = (function (){var statearr_14320 = state_14316;(statearr_14320[(7)] = inst_14298__$1);
return statearr_14320;
})();if(cljs.core.truth_(inst_14299))
{var statearr_14321_14340 = state_14316__$1;(statearr_14321_14340[(1)] = (5));
} else
{var statearr_14322_14341 = state_14316__$1;(statearr_14322_14341[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (6)))
{var inst_14298 = (state_14316[(7)]);var inst_14303 = p.call(null,inst_14298);var state_14316__$1 = state_14316;if(cljs.core.truth_(inst_14303))
{var statearr_14323_14342 = state_14316__$1;(statearr_14323_14342[(1)] = (8));
} else
{var statearr_14324_14343 = state_14316__$1;(statearr_14324_14343[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (3)))
{var inst_14314 = (state_14316[(2)]);var state_14316__$1 = state_14316;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14316__$1,inst_14314);
} else
{if((state_val_14317 === (2)))
{var state_14316__$1 = state_14316;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14316__$1,(4),ch);
} else
{if((state_val_14317 === (11)))
{var inst_14306 = (state_14316[(2)]);var state_14316__$1 = state_14316;var statearr_14325_14344 = state_14316__$1;(statearr_14325_14344[(2)] = inst_14306);
(statearr_14325_14344[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (9)))
{var state_14316__$1 = state_14316;var statearr_14326_14345 = state_14316__$1;(statearr_14326_14345[(2)] = null);
(statearr_14326_14345[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (5)))
{var inst_14301 = cljs.core.async.close_BANG_.call(null,out);var state_14316__$1 = state_14316;var statearr_14327_14346 = state_14316__$1;(statearr_14327_14346[(2)] = inst_14301);
(statearr_14327_14346[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (10)))
{var inst_14309 = (state_14316[(2)]);var state_14316__$1 = (function (){var statearr_14328 = state_14316;(statearr_14328[(8)] = inst_14309);
return statearr_14328;
})();var statearr_14329_14347 = state_14316__$1;(statearr_14329_14347[(2)] = null);
(statearr_14329_14347[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14317 === (8)))
{var inst_14298 = (state_14316[(7)]);var state_14316__$1 = state_14316;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14316__$1,(11),out,inst_14298);
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
});})(c__5838__auto___14337,out))
;return ((function (switch__5823__auto__,c__5838__auto___14337,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14333 = [null,null,null,null,null,null,null,null,null];(statearr_14333[(0)] = state_machine__5824__auto__);
(statearr_14333[(1)] = (1));
return statearr_14333;
});
var state_machine__5824__auto____1 = (function (state_14316){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14316);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14334){if((e14334 instanceof Object))
{var ex__5827__auto__ = e14334;var statearr_14335_14348 = state_14316;(statearr_14335_14348[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14316);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14334;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14349 = state_14316;
state_14316 = G__14349;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14316){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14316);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14337,out))
})();var state__5840__auto__ = (function (){var statearr_14336 = f__5839__auto__.call(null);(statearr_14336[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14337);
return statearr_14336;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14337,out))
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
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__5838__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto__){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto__){
return (function (state_14515){var state_val_14516 = (state_14515[(1)]);if((state_val_14516 === (7)))
{var inst_14511 = (state_14515[(2)]);var state_14515__$1 = state_14515;var statearr_14517_14558 = state_14515__$1;(statearr_14517_14558[(2)] = inst_14511);
(statearr_14517_14558[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (20)))
{var inst_14481 = (state_14515[(7)]);var inst_14492 = (state_14515[(2)]);var inst_14493 = cljs.core.next.call(null,inst_14481);var inst_14467 = inst_14493;var inst_14468 = null;var inst_14469 = (0);var inst_14470 = (0);var state_14515__$1 = (function (){var statearr_14518 = state_14515;(statearr_14518[(8)] = inst_14470);
(statearr_14518[(9)] = inst_14467);
(statearr_14518[(10)] = inst_14469);
(statearr_14518[(11)] = inst_14468);
(statearr_14518[(12)] = inst_14492);
return statearr_14518;
})();var statearr_14519_14559 = state_14515__$1;(statearr_14519_14559[(2)] = null);
(statearr_14519_14559[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (1)))
{var state_14515__$1 = state_14515;var statearr_14520_14560 = state_14515__$1;(statearr_14520_14560[(2)] = null);
(statearr_14520_14560[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (4)))
{var inst_14456 = (state_14515[(13)]);var inst_14456__$1 = (state_14515[(2)]);var inst_14457 = (inst_14456__$1 == null);var state_14515__$1 = (function (){var statearr_14521 = state_14515;(statearr_14521[(13)] = inst_14456__$1);
return statearr_14521;
})();if(cljs.core.truth_(inst_14457))
{var statearr_14522_14561 = state_14515__$1;(statearr_14522_14561[(1)] = (5));
} else
{var statearr_14523_14562 = state_14515__$1;(statearr_14523_14562[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (15)))
{var state_14515__$1 = state_14515;var statearr_14527_14563 = state_14515__$1;(statearr_14527_14563[(2)] = null);
(statearr_14527_14563[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (21)))
{var state_14515__$1 = state_14515;var statearr_14528_14564 = state_14515__$1;(statearr_14528_14564[(2)] = null);
(statearr_14528_14564[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (13)))
{var inst_14470 = (state_14515[(8)]);var inst_14467 = (state_14515[(9)]);var inst_14469 = (state_14515[(10)]);var inst_14468 = (state_14515[(11)]);var inst_14477 = (state_14515[(2)]);var inst_14478 = (inst_14470 + (1));var tmp14524 = inst_14467;var tmp14525 = inst_14469;var tmp14526 = inst_14468;var inst_14467__$1 = tmp14524;var inst_14468__$1 = tmp14526;var inst_14469__$1 = tmp14525;var inst_14470__$1 = inst_14478;var state_14515__$1 = (function (){var statearr_14529 = state_14515;(statearr_14529[(8)] = inst_14470__$1);
(statearr_14529[(9)] = inst_14467__$1);
(statearr_14529[(10)] = inst_14469__$1);
(statearr_14529[(11)] = inst_14468__$1);
(statearr_14529[(14)] = inst_14477);
return statearr_14529;
})();var statearr_14530_14565 = state_14515__$1;(statearr_14530_14565[(2)] = null);
(statearr_14530_14565[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (22)))
{var state_14515__$1 = state_14515;var statearr_14531_14566 = state_14515__$1;(statearr_14531_14566[(2)] = null);
(statearr_14531_14566[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (6)))
{var inst_14456 = (state_14515[(13)]);var inst_14465 = f.call(null,inst_14456);var inst_14466 = cljs.core.seq.call(null,inst_14465);var inst_14467 = inst_14466;var inst_14468 = null;var inst_14469 = (0);var inst_14470 = (0);var state_14515__$1 = (function (){var statearr_14532 = state_14515;(statearr_14532[(8)] = inst_14470);
(statearr_14532[(9)] = inst_14467);
(statearr_14532[(10)] = inst_14469);
(statearr_14532[(11)] = inst_14468);
return statearr_14532;
})();var statearr_14533_14567 = state_14515__$1;(statearr_14533_14567[(2)] = null);
(statearr_14533_14567[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (17)))
{var inst_14481 = (state_14515[(7)]);var inst_14485 = cljs.core.chunk_first.call(null,inst_14481);var inst_14486 = cljs.core.chunk_rest.call(null,inst_14481);var inst_14487 = cljs.core.count.call(null,inst_14485);var inst_14467 = inst_14486;var inst_14468 = inst_14485;var inst_14469 = inst_14487;var inst_14470 = (0);var state_14515__$1 = (function (){var statearr_14534 = state_14515;(statearr_14534[(8)] = inst_14470);
(statearr_14534[(9)] = inst_14467);
(statearr_14534[(10)] = inst_14469);
(statearr_14534[(11)] = inst_14468);
return statearr_14534;
})();var statearr_14535_14568 = state_14515__$1;(statearr_14535_14568[(2)] = null);
(statearr_14535_14568[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (3)))
{var inst_14513 = (state_14515[(2)]);var state_14515__$1 = state_14515;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14515__$1,inst_14513);
} else
{if((state_val_14516 === (12)))
{var inst_14501 = (state_14515[(2)]);var state_14515__$1 = state_14515;var statearr_14536_14569 = state_14515__$1;(statearr_14536_14569[(2)] = inst_14501);
(statearr_14536_14569[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (2)))
{var state_14515__$1 = state_14515;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14515__$1,(4),in$);
} else
{if((state_val_14516 === (23)))
{var inst_14509 = (state_14515[(2)]);var state_14515__$1 = state_14515;var statearr_14537_14570 = state_14515__$1;(statearr_14537_14570[(2)] = inst_14509);
(statearr_14537_14570[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (19)))
{var inst_14496 = (state_14515[(2)]);var state_14515__$1 = state_14515;var statearr_14538_14571 = state_14515__$1;(statearr_14538_14571[(2)] = inst_14496);
(statearr_14538_14571[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (11)))
{var inst_14467 = (state_14515[(9)]);var inst_14481 = (state_14515[(7)]);var inst_14481__$1 = cljs.core.seq.call(null,inst_14467);var state_14515__$1 = (function (){var statearr_14539 = state_14515;(statearr_14539[(7)] = inst_14481__$1);
return statearr_14539;
})();if(inst_14481__$1)
{var statearr_14540_14572 = state_14515__$1;(statearr_14540_14572[(1)] = (14));
} else
{var statearr_14541_14573 = state_14515__$1;(statearr_14541_14573[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (9)))
{var inst_14503 = (state_14515[(2)]);var inst_14504 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_14515__$1 = (function (){var statearr_14542 = state_14515;(statearr_14542[(15)] = inst_14503);
return statearr_14542;
})();if(cljs.core.truth_(inst_14504))
{var statearr_14543_14574 = state_14515__$1;(statearr_14543_14574[(1)] = (21));
} else
{var statearr_14544_14575 = state_14515__$1;(statearr_14544_14575[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (5)))
{var inst_14459 = cljs.core.async.close_BANG_.call(null,out);var state_14515__$1 = state_14515;var statearr_14545_14576 = state_14515__$1;(statearr_14545_14576[(2)] = inst_14459);
(statearr_14545_14576[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (14)))
{var inst_14481 = (state_14515[(7)]);var inst_14483 = cljs.core.chunked_seq_QMARK_.call(null,inst_14481);var state_14515__$1 = state_14515;if(inst_14483)
{var statearr_14546_14577 = state_14515__$1;(statearr_14546_14577[(1)] = (17));
} else
{var statearr_14547_14578 = state_14515__$1;(statearr_14547_14578[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (16)))
{var inst_14499 = (state_14515[(2)]);var state_14515__$1 = state_14515;var statearr_14548_14579 = state_14515__$1;(statearr_14548_14579[(2)] = inst_14499);
(statearr_14548_14579[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14516 === (10)))
{var inst_14470 = (state_14515[(8)]);var inst_14468 = (state_14515[(11)]);var inst_14475 = cljs.core._nth.call(null,inst_14468,inst_14470);var state_14515__$1 = state_14515;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14515__$1,(13),out,inst_14475);
} else
{if((state_val_14516 === (18)))
{var inst_14481 = (state_14515[(7)]);var inst_14490 = cljs.core.first.call(null,inst_14481);var state_14515__$1 = state_14515;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14515__$1,(20),out,inst_14490);
} else
{if((state_val_14516 === (8)))
{var inst_14470 = (state_14515[(8)]);var inst_14469 = (state_14515[(10)]);var inst_14472 = (inst_14470 < inst_14469);var inst_14473 = inst_14472;var state_14515__$1 = state_14515;if(cljs.core.truth_(inst_14473))
{var statearr_14549_14580 = state_14515__$1;(statearr_14549_14580[(1)] = (10));
} else
{var statearr_14550_14581 = state_14515__$1;(statearr_14550_14581[(1)] = (11));
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
});})(c__5838__auto__))
;return ((function (switch__5823__auto__,c__5838__auto__){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14554 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14554[(0)] = state_machine__5824__auto__);
(statearr_14554[(1)] = (1));
return statearr_14554;
});
var state_machine__5824__auto____1 = (function (state_14515){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14515);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14555){if((e14555 instanceof Object))
{var ex__5827__auto__ = e14555;var statearr_14556_14582 = state_14515;(statearr_14556_14582[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14515);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14555;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14583 = state_14515;
state_14515 = G__14583;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14515){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14515);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto__))
})();var state__5840__auto__ = (function (){var statearr_14557 = f__5839__auto__.call(null);(statearr_14557[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto__);
return statearr_14557;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto__))
);
return c__5838__auto__;
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
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14680 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14680,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14680,out){
return (function (state_14655){var state_val_14656 = (state_14655[(1)]);if((state_val_14656 === (7)))
{var inst_14650 = (state_14655[(2)]);var state_14655__$1 = state_14655;var statearr_14657_14681 = state_14655__$1;(statearr_14657_14681[(2)] = inst_14650);
(statearr_14657_14681[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (1)))
{var inst_14632 = null;var state_14655__$1 = (function (){var statearr_14658 = state_14655;(statearr_14658[(7)] = inst_14632);
return statearr_14658;
})();var statearr_14659_14682 = state_14655__$1;(statearr_14659_14682[(2)] = null);
(statearr_14659_14682[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (4)))
{var inst_14635 = (state_14655[(8)]);var inst_14635__$1 = (state_14655[(2)]);var inst_14636 = (inst_14635__$1 == null);var inst_14637 = cljs.core.not.call(null,inst_14636);var state_14655__$1 = (function (){var statearr_14660 = state_14655;(statearr_14660[(8)] = inst_14635__$1);
return statearr_14660;
})();if(inst_14637)
{var statearr_14661_14683 = state_14655__$1;(statearr_14661_14683[(1)] = (5));
} else
{var statearr_14662_14684 = state_14655__$1;(statearr_14662_14684[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (6)))
{var state_14655__$1 = state_14655;var statearr_14663_14685 = state_14655__$1;(statearr_14663_14685[(2)] = null);
(statearr_14663_14685[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (3)))
{var inst_14652 = (state_14655[(2)]);var inst_14653 = cljs.core.async.close_BANG_.call(null,out);var state_14655__$1 = (function (){var statearr_14664 = state_14655;(statearr_14664[(9)] = inst_14652);
return statearr_14664;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14655__$1,inst_14653);
} else
{if((state_val_14656 === (2)))
{var state_14655__$1 = state_14655;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14655__$1,(4),ch);
} else
{if((state_val_14656 === (11)))
{var inst_14635 = (state_14655[(8)]);var inst_14644 = (state_14655[(2)]);var inst_14632 = inst_14635;var state_14655__$1 = (function (){var statearr_14665 = state_14655;(statearr_14665[(10)] = inst_14644);
(statearr_14665[(7)] = inst_14632);
return statearr_14665;
})();var statearr_14666_14686 = state_14655__$1;(statearr_14666_14686[(2)] = null);
(statearr_14666_14686[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (9)))
{var inst_14635 = (state_14655[(8)]);var state_14655__$1 = state_14655;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14655__$1,(11),out,inst_14635);
} else
{if((state_val_14656 === (5)))
{var inst_14632 = (state_14655[(7)]);var inst_14635 = (state_14655[(8)]);var inst_14639 = cljs.core._EQ_.call(null,inst_14635,inst_14632);var state_14655__$1 = state_14655;if(inst_14639)
{var statearr_14668_14687 = state_14655__$1;(statearr_14668_14687[(1)] = (8));
} else
{var statearr_14669_14688 = state_14655__$1;(statearr_14669_14688[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (10)))
{var inst_14647 = (state_14655[(2)]);var state_14655__$1 = state_14655;var statearr_14670_14689 = state_14655__$1;(statearr_14670_14689[(2)] = inst_14647);
(statearr_14670_14689[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14656 === (8)))
{var inst_14632 = (state_14655[(7)]);var tmp14667 = inst_14632;var inst_14632__$1 = tmp14667;var state_14655__$1 = (function (){var statearr_14671 = state_14655;(statearr_14671[(7)] = inst_14632__$1);
return statearr_14671;
})();var statearr_14672_14690 = state_14655__$1;(statearr_14672_14690[(2)] = null);
(statearr_14672_14690[(1)] = (2));
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
});})(c__5838__auto___14680,out))
;return ((function (switch__5823__auto__,c__5838__auto___14680,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14676 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_14676[(0)] = state_machine__5824__auto__);
(statearr_14676[(1)] = (1));
return statearr_14676;
});
var state_machine__5824__auto____1 = (function (state_14655){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14655);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14677){if((e14677 instanceof Object))
{var ex__5827__auto__ = e14677;var statearr_14678_14691 = state_14655;(statearr_14678_14691[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14655);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14677;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14692 = state_14655;
state_14655 = G__14692;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14655){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14655);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14680,out))
})();var state__5840__auto__ = (function (){var statearr_14679 = f__5839__auto__.call(null);(statearr_14679[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14680);
return statearr_14679;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14680,out))
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
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14827 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14827,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14827,out){
return (function (state_14797){var state_val_14798 = (state_14797[(1)]);if((state_val_14798 === (7)))
{var inst_14793 = (state_14797[(2)]);var state_14797__$1 = state_14797;var statearr_14799_14828 = state_14797__$1;(statearr_14799_14828[(2)] = inst_14793);
(statearr_14799_14828[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (1)))
{var inst_14760 = (new Array(n));var inst_14761 = inst_14760;var inst_14762 = (0);var state_14797__$1 = (function (){var statearr_14800 = state_14797;(statearr_14800[(7)] = inst_14762);
(statearr_14800[(8)] = inst_14761);
return statearr_14800;
})();var statearr_14801_14829 = state_14797__$1;(statearr_14801_14829[(2)] = null);
(statearr_14801_14829[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (4)))
{var inst_14765 = (state_14797[(9)]);var inst_14765__$1 = (state_14797[(2)]);var inst_14766 = (inst_14765__$1 == null);var inst_14767 = cljs.core.not.call(null,inst_14766);var state_14797__$1 = (function (){var statearr_14802 = state_14797;(statearr_14802[(9)] = inst_14765__$1);
return statearr_14802;
})();if(inst_14767)
{var statearr_14803_14830 = state_14797__$1;(statearr_14803_14830[(1)] = (5));
} else
{var statearr_14804_14831 = state_14797__$1;(statearr_14804_14831[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (15)))
{var inst_14787 = (state_14797[(2)]);var state_14797__$1 = state_14797;var statearr_14805_14832 = state_14797__$1;(statearr_14805_14832[(2)] = inst_14787);
(statearr_14805_14832[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (13)))
{var state_14797__$1 = state_14797;var statearr_14806_14833 = state_14797__$1;(statearr_14806_14833[(2)] = null);
(statearr_14806_14833[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (6)))
{var inst_14762 = (state_14797[(7)]);var inst_14783 = (inst_14762 > (0));var state_14797__$1 = state_14797;if(cljs.core.truth_(inst_14783))
{var statearr_14807_14834 = state_14797__$1;(statearr_14807_14834[(1)] = (12));
} else
{var statearr_14808_14835 = state_14797__$1;(statearr_14808_14835[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (3)))
{var inst_14795 = (state_14797[(2)]);var state_14797__$1 = state_14797;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14797__$1,inst_14795);
} else
{if((state_val_14798 === (12)))
{var inst_14761 = (state_14797[(8)]);var inst_14785 = cljs.core.vec.call(null,inst_14761);var state_14797__$1 = state_14797;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14797__$1,(15),out,inst_14785);
} else
{if((state_val_14798 === (2)))
{var state_14797__$1 = state_14797;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14797__$1,(4),ch);
} else
{if((state_val_14798 === (11)))
{var inst_14777 = (state_14797[(2)]);var inst_14778 = (new Array(n));var inst_14761 = inst_14778;var inst_14762 = (0);var state_14797__$1 = (function (){var statearr_14809 = state_14797;(statearr_14809[(10)] = inst_14777);
(statearr_14809[(7)] = inst_14762);
(statearr_14809[(8)] = inst_14761);
return statearr_14809;
})();var statearr_14810_14836 = state_14797__$1;(statearr_14810_14836[(2)] = null);
(statearr_14810_14836[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (9)))
{var inst_14761 = (state_14797[(8)]);var inst_14775 = cljs.core.vec.call(null,inst_14761);var state_14797__$1 = state_14797;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14797__$1,(11),out,inst_14775);
} else
{if((state_val_14798 === (5)))
{var inst_14762 = (state_14797[(7)]);var inst_14761 = (state_14797[(8)]);var inst_14770 = (state_14797[(11)]);var inst_14765 = (state_14797[(9)]);var inst_14769 = (inst_14761[inst_14762] = inst_14765);var inst_14770__$1 = (inst_14762 + (1));var inst_14771 = (inst_14770__$1 < n);var state_14797__$1 = (function (){var statearr_14811 = state_14797;(statearr_14811[(12)] = inst_14769);
(statearr_14811[(11)] = inst_14770__$1);
return statearr_14811;
})();if(cljs.core.truth_(inst_14771))
{var statearr_14812_14837 = state_14797__$1;(statearr_14812_14837[(1)] = (8));
} else
{var statearr_14813_14838 = state_14797__$1;(statearr_14813_14838[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (14)))
{var inst_14790 = (state_14797[(2)]);var inst_14791 = cljs.core.async.close_BANG_.call(null,out);var state_14797__$1 = (function (){var statearr_14815 = state_14797;(statearr_14815[(13)] = inst_14790);
return statearr_14815;
})();var statearr_14816_14839 = state_14797__$1;(statearr_14816_14839[(2)] = inst_14791);
(statearr_14816_14839[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (10)))
{var inst_14781 = (state_14797[(2)]);var state_14797__$1 = state_14797;var statearr_14817_14840 = state_14797__$1;(statearr_14817_14840[(2)] = inst_14781);
(statearr_14817_14840[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14798 === (8)))
{var inst_14761 = (state_14797[(8)]);var inst_14770 = (state_14797[(11)]);var tmp14814 = inst_14761;var inst_14761__$1 = tmp14814;var inst_14762 = inst_14770;var state_14797__$1 = (function (){var statearr_14818 = state_14797;(statearr_14818[(7)] = inst_14762);
(statearr_14818[(8)] = inst_14761__$1);
return statearr_14818;
})();var statearr_14819_14841 = state_14797__$1;(statearr_14819_14841[(2)] = null);
(statearr_14819_14841[(1)] = (2));
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
});})(c__5838__auto___14827,out))
;return ((function (switch__5823__auto__,c__5838__auto___14827,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14823 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14823[(0)] = state_machine__5824__auto__);
(statearr_14823[(1)] = (1));
return statearr_14823;
});
var state_machine__5824__auto____1 = (function (state_14797){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14797);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14824){if((e14824 instanceof Object))
{var ex__5827__auto__ = e14824;var statearr_14825_14842 = state_14797;(statearr_14825_14842[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14797);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14824;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14843 = state_14797;
state_14797 = G__14843;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14797){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14797);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14827,out))
})();var state__5840__auto__ = (function (){var statearr_14826 = f__5839__auto__.call(null);(statearr_14826[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14827);
return statearr_14826;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14827,out))
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
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5838__auto___14986 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5838__auto___14986,out){
return (function (){var f__5839__auto__ = (function (){var switch__5823__auto__ = ((function (c__5838__auto___14986,out){
return (function (state_14956){var state_val_14957 = (state_14956[(1)]);if((state_val_14957 === (7)))
{var inst_14952 = (state_14956[(2)]);var state_14956__$1 = state_14956;var statearr_14958_14987 = state_14956__$1;(statearr_14958_14987[(2)] = inst_14952);
(statearr_14958_14987[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (1)))
{var inst_14915 = [];var inst_14916 = inst_14915;var inst_14917 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_14956__$1 = (function (){var statearr_14959 = state_14956;(statearr_14959[(7)] = inst_14917);
(statearr_14959[(8)] = inst_14916);
return statearr_14959;
})();var statearr_14960_14988 = state_14956__$1;(statearr_14960_14988[(2)] = null);
(statearr_14960_14988[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (4)))
{var inst_14920 = (state_14956[(9)]);var inst_14920__$1 = (state_14956[(2)]);var inst_14921 = (inst_14920__$1 == null);var inst_14922 = cljs.core.not.call(null,inst_14921);var state_14956__$1 = (function (){var statearr_14961 = state_14956;(statearr_14961[(9)] = inst_14920__$1);
return statearr_14961;
})();if(inst_14922)
{var statearr_14962_14989 = state_14956__$1;(statearr_14962_14989[(1)] = (5));
} else
{var statearr_14963_14990 = state_14956__$1;(statearr_14963_14990[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (15)))
{var inst_14946 = (state_14956[(2)]);var state_14956__$1 = state_14956;var statearr_14964_14991 = state_14956__$1;(statearr_14964_14991[(2)] = inst_14946);
(statearr_14964_14991[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (13)))
{var state_14956__$1 = state_14956;var statearr_14965_14992 = state_14956__$1;(statearr_14965_14992[(2)] = null);
(statearr_14965_14992[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (6)))
{var inst_14916 = (state_14956[(8)]);var inst_14941 = inst_14916.length;var inst_14942 = (inst_14941 > (0));var state_14956__$1 = state_14956;if(cljs.core.truth_(inst_14942))
{var statearr_14966_14993 = state_14956__$1;(statearr_14966_14993[(1)] = (12));
} else
{var statearr_14967_14994 = state_14956__$1;(statearr_14967_14994[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (3)))
{var inst_14954 = (state_14956[(2)]);var state_14956__$1 = state_14956;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14956__$1,inst_14954);
} else
{if((state_val_14957 === (12)))
{var inst_14916 = (state_14956[(8)]);var inst_14944 = cljs.core.vec.call(null,inst_14916);var state_14956__$1 = state_14956;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14956__$1,(15),out,inst_14944);
} else
{if((state_val_14957 === (2)))
{var state_14956__$1 = state_14956;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14956__$1,(4),ch);
} else
{if((state_val_14957 === (11)))
{var inst_14924 = (state_14956[(10)]);var inst_14920 = (state_14956[(9)]);var inst_14934 = (state_14956[(2)]);var inst_14935 = [];var inst_14936 = inst_14935.push(inst_14920);var inst_14916 = inst_14935;var inst_14917 = inst_14924;var state_14956__$1 = (function (){var statearr_14968 = state_14956;(statearr_14968[(7)] = inst_14917);
(statearr_14968[(11)] = inst_14936);
(statearr_14968[(12)] = inst_14934);
(statearr_14968[(8)] = inst_14916);
return statearr_14968;
})();var statearr_14969_14995 = state_14956__$1;(statearr_14969_14995[(2)] = null);
(statearr_14969_14995[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (9)))
{var inst_14916 = (state_14956[(8)]);var inst_14932 = cljs.core.vec.call(null,inst_14916);var state_14956__$1 = state_14956;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14956__$1,(11),out,inst_14932);
} else
{if((state_val_14957 === (5)))
{var inst_14917 = (state_14956[(7)]);var inst_14924 = (state_14956[(10)]);var inst_14920 = (state_14956[(9)]);var inst_14924__$1 = f.call(null,inst_14920);var inst_14925 = cljs.core._EQ_.call(null,inst_14924__$1,inst_14917);var inst_14926 = cljs.core.keyword_identical_QMARK_.call(null,inst_14917,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_14927 = (inst_14925) || (inst_14926);var state_14956__$1 = (function (){var statearr_14970 = state_14956;(statearr_14970[(10)] = inst_14924__$1);
return statearr_14970;
})();if(cljs.core.truth_(inst_14927))
{var statearr_14971_14996 = state_14956__$1;(statearr_14971_14996[(1)] = (8));
} else
{var statearr_14972_14997 = state_14956__$1;(statearr_14972_14997[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (14)))
{var inst_14949 = (state_14956[(2)]);var inst_14950 = cljs.core.async.close_BANG_.call(null,out);var state_14956__$1 = (function (){var statearr_14974 = state_14956;(statearr_14974[(13)] = inst_14949);
return statearr_14974;
})();var statearr_14975_14998 = state_14956__$1;(statearr_14975_14998[(2)] = inst_14950);
(statearr_14975_14998[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (10)))
{var inst_14939 = (state_14956[(2)]);var state_14956__$1 = state_14956;var statearr_14976_14999 = state_14956__$1;(statearr_14976_14999[(2)] = inst_14939);
(statearr_14976_14999[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14957 === (8)))
{var inst_14924 = (state_14956[(10)]);var inst_14920 = (state_14956[(9)]);var inst_14916 = (state_14956[(8)]);var inst_14929 = inst_14916.push(inst_14920);var tmp14973 = inst_14916;var inst_14916__$1 = tmp14973;var inst_14917 = inst_14924;var state_14956__$1 = (function (){var statearr_14977 = state_14956;(statearr_14977[(7)] = inst_14917);
(statearr_14977[(14)] = inst_14929);
(statearr_14977[(8)] = inst_14916__$1);
return statearr_14977;
})();var statearr_14978_15000 = state_14956__$1;(statearr_14978_15000[(2)] = null);
(statearr_14978_15000[(1)] = (2));
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
});})(c__5838__auto___14986,out))
;return ((function (switch__5823__auto__,c__5838__auto___14986,out){
return (function() {
var state_machine__5824__auto__ = null;
var state_machine__5824__auto____0 = (function (){var statearr_14982 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14982[(0)] = state_machine__5824__auto__);
(statearr_14982[(1)] = (1));
return statearr_14982;
});
var state_machine__5824__auto____1 = (function (state_14956){while(true){
var ret_value__5825__auto__ = (function (){try{while(true){
var result__5826__auto__ = switch__5823__auto__.call(null,state_14956);if(cljs.core.keyword_identical_QMARK_.call(null,result__5826__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5826__auto__;
}
break;
}
}catch (e14983){if((e14983 instanceof Object))
{var ex__5827__auto__ = e14983;var statearr_14984_15001 = state_14956;(statearr_14984_15001[(5)] = ex__5827__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14956);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14983;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5825__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15002 = state_14956;
state_14956 = G__15002;
continue;
}
} else
{return ret_value__5825__auto__;
}
break;
}
});
state_machine__5824__auto__ = function(state_14956){
switch(arguments.length){
case 0:
return state_machine__5824__auto____0.call(this);
case 1:
return state_machine__5824__auto____1.call(this,state_14956);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5824__auto____0;
state_machine__5824__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5824__auto____1;
return state_machine__5824__auto__;
})()
;})(switch__5823__auto__,c__5838__auto___14986,out))
})();var state__5840__auto__ = (function (){var statearr_14985 = f__5839__auto__.call(null);(statearr_14985[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5838__auto___14986);
return statearr_14985;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5840__auto__);
});})(c__5838__auto___14986,out))
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