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
cljs.core.async.fn_handler = (function fn_handler(f){if(typeof cljs.core.async.t11976 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11976 = (function (f,fn_handler,meta11977){
this.f = f;
this.fn_handler = fn_handler;
this.meta11977 = meta11977;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11976.cljs$lang$type = true;
cljs.core.async.t11976.cljs$lang$ctorStr = "cljs.core.async/t11976";
cljs.core.async.t11976.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t11976");
});
cljs.core.async.t11976.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11976.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return true;
});
cljs.core.async.t11976.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return self__.f;
});
cljs.core.async.t11976.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11978){var self__ = this;
var _11978__$1 = this;return self__.meta11977;
});
cljs.core.async.t11976.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11978,meta11977__$1){var self__ = this;
var _11978__$1 = this;return (new cljs.core.async.t11976(self__.f,self__.fn_handler,meta11977__$1));
});
cljs.core.async.__GT_t11976 = (function __GT_t11976(f__$1,fn_handler__$1,meta11977){return (new cljs.core.async.t11976(f__$1,fn_handler__$1,meta11977));
});
}
return (new cljs.core.async.t11976(f,fn_handler,null));
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
cljs.core.async.unblocking_buffer_QMARK_ = (function unblocking_buffer_QMARK_(buff){var G__11980 = buff;if(G__11980)
{var bit__4125__auto__ = null;if(cljs.core.truth_((function (){var or__3462__auto__ = bit__4125__auto__;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return G__11980.cljs$core$async$impl$protocols$UnblockingBuffer$;
}
})()))
{return true;
} else
{if((!G__11980.cljs$lang$protocol_mask$partition$))
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11980);
} else
{return false;
}
}
} else
{return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,G__11980);
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
{var val_11981 = cljs.core.deref.call(null,ret);if(cljs.core.truth_(on_caller_QMARK_))
{fn1.call(null,val_11981);
} else
{cljs.core.async.impl.dispatch.run.call(null,((function (val_11981,ret){
return (function (){return fn1.call(null,val_11981);
});})(val_11981,ret))
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
cljs.core.async.random_array = (function random_array(n){var a = (new Array(n));var n__4331__auto___11982 = n;var x_11983 = (0);while(true){
if((x_11983 < n__4331__auto___11982))
{(a[x_11983] = (0));
{
var G__11984 = (x_11983 + (1));
x_11983 = G__11984;
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
var G__11985 = (i + (1));
i = G__11985;
continue;
}
}
break;
}
});
cljs.core.async.alt_flag = (function alt_flag(){var flag = cljs.core.atom.call(null,true);if(typeof cljs.core.async.t11989 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11989 = (function (flag,alt_flag,meta11990){
this.flag = flag;
this.alt_flag = alt_flag;
this.meta11990 = meta11990;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11989.cljs$lang$type = true;
cljs.core.async.t11989.cljs$lang$ctorStr = "cljs.core.async/t11989";
cljs.core.async.t11989.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t11989");
});})(flag))
;
cljs.core.async.t11989.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11989.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.deref.call(null,self__.flag);
});})(flag))
;
cljs.core.async.t11989.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.flag,null);
return true;
});})(flag))
;
cljs.core.async.t11989.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_11991){var self__ = this;
var _11991__$1 = this;return self__.meta11990;
});})(flag))
;
cljs.core.async.t11989.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_11991,meta11990__$1){var self__ = this;
var _11991__$1 = this;return (new cljs.core.async.t11989(self__.flag,self__.alt_flag,meta11990__$1));
});})(flag))
;
cljs.core.async.__GT_t11989 = ((function (flag){
return (function __GT_t11989(flag__$1,alt_flag__$1,meta11990){return (new cljs.core.async.t11989(flag__$1,alt_flag__$1,meta11990));
});})(flag))
;
}
return (new cljs.core.async.t11989(flag,alt_flag,null));
});
cljs.core.async.alt_handler = (function alt_handler(flag,cb){if(typeof cljs.core.async.t11995 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t11995 = (function (cb,flag,alt_handler,meta11996){
this.cb = cb;
this.flag = flag;
this.alt_handler = alt_handler;
this.meta11996 = meta11996;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t11995.cljs$lang$type = true;
cljs.core.async.t11995.cljs$lang$ctorStr = "cljs.core.async/t11995";
cljs.core.async.t11995.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t11995");
});
cljs.core.async.t11995.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t11995.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});
cljs.core.async.t11995.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){var self__ = this;
var ___$1 = this;cljs.core.async.impl.protocols.commit.call(null,self__.flag);
return self__.cb;
});
cljs.core.async.t11995.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11997){var self__ = this;
var _11997__$1 = this;return self__.meta11996;
});
cljs.core.async.t11995.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11997,meta11996__$1){var self__ = this;
var _11997__$1 = this;return (new cljs.core.async.t11995(self__.cb,self__.flag,self__.alt_handler,meta11996__$1));
});
cljs.core.async.__GT_t11995 = (function __GT_t11995(cb__$1,flag__$1,alt_handler__$1,meta11996){return (new cljs.core.async.t11995(cb__$1,flag__$1,alt_handler__$1,meta11996));
});
}
return (new cljs.core.async.t11995(cb,flag,alt_handler,null));
});
/**
* returns derefable [val port] if immediate, nil if enqueued
*/
cljs.core.async.do_alts = (function do_alts(fret,ports,opts){var flag = cljs.core.async.alt_flag.call(null);var n = cljs.core.count.call(null,ports);var idxs = cljs.core.async.random_array.call(null,n);var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);var ret = (function (){var i = (0);while(true){
if((i < n))
{var idx = (cljs.core.truth_(priority)?i:(idxs[i]));var port = cljs.core.nth.call(null,ports,idx);var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11998_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11998_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__11999_SHARP_){return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__11999_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));if(cljs.core.truth_(vbox))
{return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__3462__auto__ = wport;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return port;
}
})()], null));
} else
{{
var G__12000 = (i + (1));
i = G__12000;
continue;
}
}
} else
{return null;
}
break;
}
})();var or__3462__auto__ = ret;if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328)))
{var temp__4126__auto__ = (function (){var and__3450__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);if(cljs.core.truth_(and__3450__auto__))
{return cljs.core.async.impl.protocols.commit.call(null,flag);
} else
{return and__3450__auto__;
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
var alts_BANG___delegate = function (ports,p__12001){var map__12003 = p__12001;var map__12003__$1 = ((cljs.core.seq_QMARK_.call(null,map__12003))?cljs.core.apply.call(null,cljs.core.hash_map,map__12003):map__12003);var opts = map__12003__$1;throw (new Error("alts! used not in (go ...) block"));
};
var alts_BANG_ = function (ports,var_args){
var p__12001 = null;if (arguments.length > 1) {
  p__12001 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);} 
return alts_BANG___delegate.call(this,ports,p__12001);};
alts_BANG_.cljs$lang$maxFixedArity = 1;
alts_BANG_.cljs$lang$applyTo = (function (arglist__12004){
var ports = cljs.core.first(arglist__12004);
var p__12001 = cljs.core.rest(arglist__12004);
return alts_BANG___delegate(ports,p__12001);
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
var pipe__3 = (function (from,to,close_QMARK_){var c__5663__auto___12099 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___12099){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___12099){
return (function (state_12075){var state_val_12076 = (state_12075[(1)]);if((state_val_12076 === (7)))
{var inst_12071 = (state_12075[(2)]);var state_12075__$1 = state_12075;var statearr_12077_12100 = state_12075__$1;(statearr_12077_12100[(2)] = inst_12071);
(statearr_12077_12100[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (1)))
{var state_12075__$1 = state_12075;var statearr_12078_12101 = state_12075__$1;(statearr_12078_12101[(2)] = null);
(statearr_12078_12101[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (4)))
{var inst_12054 = (state_12075[(7)]);var inst_12054__$1 = (state_12075[(2)]);var inst_12055 = (inst_12054__$1 == null);var state_12075__$1 = (function (){var statearr_12079 = state_12075;(statearr_12079[(7)] = inst_12054__$1);
return statearr_12079;
})();if(cljs.core.truth_(inst_12055))
{var statearr_12080_12102 = state_12075__$1;(statearr_12080_12102[(1)] = (5));
} else
{var statearr_12081_12103 = state_12075__$1;(statearr_12081_12103[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (13)))
{var state_12075__$1 = state_12075;var statearr_12082_12104 = state_12075__$1;(statearr_12082_12104[(2)] = null);
(statearr_12082_12104[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (6)))
{var inst_12054 = (state_12075[(7)]);var state_12075__$1 = state_12075;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12075__$1,(11),to,inst_12054);
} else
{if((state_val_12076 === (3)))
{var inst_12073 = (state_12075[(2)]);var state_12075__$1 = state_12075;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12075__$1,inst_12073);
} else
{if((state_val_12076 === (12)))
{var state_12075__$1 = state_12075;var statearr_12083_12105 = state_12075__$1;(statearr_12083_12105[(2)] = null);
(statearr_12083_12105[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (2)))
{var state_12075__$1 = state_12075;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12075__$1,(4),from);
} else
{if((state_val_12076 === (11)))
{var inst_12064 = (state_12075[(2)]);var state_12075__$1 = state_12075;if(cljs.core.truth_(inst_12064))
{var statearr_12084_12106 = state_12075__$1;(statearr_12084_12106[(1)] = (12));
} else
{var statearr_12085_12107 = state_12075__$1;(statearr_12085_12107[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (9)))
{var state_12075__$1 = state_12075;var statearr_12086_12108 = state_12075__$1;(statearr_12086_12108[(2)] = null);
(statearr_12086_12108[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (5)))
{var state_12075__$1 = state_12075;if(cljs.core.truth_(close_QMARK_))
{var statearr_12087_12109 = state_12075__$1;(statearr_12087_12109[(1)] = (8));
} else
{var statearr_12088_12110 = state_12075__$1;(statearr_12088_12110[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (14)))
{var inst_12069 = (state_12075[(2)]);var state_12075__$1 = state_12075;var statearr_12089_12111 = state_12075__$1;(statearr_12089_12111[(2)] = inst_12069);
(statearr_12089_12111[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (10)))
{var inst_12061 = (state_12075[(2)]);var state_12075__$1 = state_12075;var statearr_12090_12112 = state_12075__$1;(statearr_12090_12112[(2)] = inst_12061);
(statearr_12090_12112[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12076 === (8)))
{var inst_12058 = cljs.core.async.close_BANG_.call(null,to);var state_12075__$1 = state_12075;var statearr_12091_12113 = state_12075__$1;(statearr_12091_12113[(2)] = inst_12058);
(statearr_12091_12113[(1)] = (10));
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
});})(c__5663__auto___12099))
;return ((function (switch__5648__auto__,c__5663__auto___12099){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12095 = [null,null,null,null,null,null,null,null];(statearr_12095[(0)] = state_machine__5649__auto__);
(statearr_12095[(1)] = (1));
return statearr_12095;
});
var state_machine__5649__auto____1 = (function (state_12075){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12075);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12096){if((e12096 instanceof Object))
{var ex__5652__auto__ = e12096;var statearr_12097_12114 = state_12075;(statearr_12097_12114[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12075);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12096;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12115 = state_12075;
state_12075 = G__12115;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12075){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12075);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___12099))
})();var state__5665__auto__ = (function (){var statearr_12098 = f__5664__auto__.call(null);(statearr_12098[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12099);
return statearr_12098;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___12099))
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
return (function (p__12299){var vec__12300 = p__12299;var v = cljs.core.nth.call(null,vec__12300,(0),null);var p = cljs.core.nth.call(null,vec__12300,(1),null);var job = vec__12300;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);var c__5663__auto___12482 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results){
return (function (state_12305){var state_val_12306 = (state_12305[(1)]);if((state_val_12306 === (2)))
{var inst_12302 = (state_12305[(2)]);var inst_12303 = cljs.core.async.close_BANG_.call(null,res);var state_12305__$1 = (function (){var statearr_12307 = state_12305;(statearr_12307[(7)] = inst_12302);
return statearr_12307;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12305__$1,inst_12303);
} else
{if((state_val_12306 === (1)))
{var state_12305__$1 = state_12305;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12305__$1,(2),res,v);
} else
{return null;
}
}
});})(c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results))
;return ((function (switch__5648__auto__,c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12311 = [null,null,null,null,null,null,null,null];(statearr_12311[(0)] = state_machine__5649__auto__);
(statearr_12311[(1)] = (1));
return statearr_12311;
});
var state_machine__5649__auto____1 = (function (state_12305){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12305);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12312){if((e12312 instanceof Object))
{var ex__5652__auto__ = e12312;var statearr_12313_12483 = state_12305;(statearr_12313_12483[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12305);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12312;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12484 = state_12305;
state_12305 = G__12484;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12305){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12305);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results))
})();var state__5665__auto__ = (function (){var statearr_12314 = f__5664__auto__.call(null);(statearr_12314[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12482);
return statearr_12314;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___12482,res,vec__12300,v,p,job,jobs,results))
);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results))
;var async = ((function (jobs,results,process){
return (function (p__12315){var vec__12316 = p__12315;var v = cljs.core.nth.call(null,vec__12316,(0),null);var p = cljs.core.nth.call(null,vec__12316,(1),null);var job = vec__12316;if((job == null))
{cljs.core.async.close_BANG_.call(null,results);
return null;
} else
{var res = cljs.core.async.chan.call(null,(1));xf.call(null,v,res);
cljs.core.async.put_BANG_.call(null,p,res);
return true;
}
});})(jobs,results,process))
;var n__4331__auto___12485 = n;var __12486 = (0);while(true){
if((__12486 < n__4331__auto___12485))
{var G__12317_12487 = (((type instanceof cljs.core.Keyword))?type.fqn:null);switch (G__12317_12487) {
case "async":
var c__5663__auto___12489 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__12486,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (__12486,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function (state_12330){var state_val_12331 = (state_12330[(1)]);if((state_val_12331 === (7)))
{var inst_12326 = (state_12330[(2)]);var state_12330__$1 = state_12330;var statearr_12332_12490 = state_12330__$1;(statearr_12332_12490[(2)] = inst_12326);
(statearr_12332_12490[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12331 === (6)))
{var state_12330__$1 = state_12330;var statearr_12333_12491 = state_12330__$1;(statearr_12333_12491[(2)] = null);
(statearr_12333_12491[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12331 === (5)))
{var state_12330__$1 = state_12330;var statearr_12334_12492 = state_12330__$1;(statearr_12334_12492[(2)] = null);
(statearr_12334_12492[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12331 === (4)))
{var inst_12320 = (state_12330[(2)]);var inst_12321 = async.call(null,inst_12320);var state_12330__$1 = state_12330;if(cljs.core.truth_(inst_12321))
{var statearr_12335_12493 = state_12330__$1;(statearr_12335_12493[(1)] = (5));
} else
{var statearr_12336_12494 = state_12330__$1;(statearr_12336_12494[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12331 === (3)))
{var inst_12328 = (state_12330[(2)]);var state_12330__$1 = state_12330;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12330__$1,inst_12328);
} else
{if((state_val_12331 === (2)))
{var state_12330__$1 = state_12330;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12330__$1,(4),jobs);
} else
{if((state_val_12331 === (1)))
{var state_12330__$1 = state_12330;var statearr_12337_12495 = state_12330__$1;(statearr_12337_12495[(2)] = null);
(statearr_12337_12495[(1)] = (2));
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
});})(__12486,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
;return ((function (__12486,switch__5648__auto__,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12341 = [null,null,null,null,null,null,null];(statearr_12341[(0)] = state_machine__5649__auto__);
(statearr_12341[(1)] = (1));
return statearr_12341;
});
var state_machine__5649__auto____1 = (function (state_12330){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12330);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12342){if((e12342 instanceof Object))
{var ex__5652__auto__ = e12342;var statearr_12343_12496 = state_12330;(statearr_12343_12496[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12330);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12342;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12497 = state_12330;
state_12330 = G__12497;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12330){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12330);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(__12486,switch__5648__auto__,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
})();var state__5665__auto__ = (function (){var statearr_12344 = f__5664__auto__.call(null);(statearr_12344[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12489);
return statearr_12344;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(__12486,c__5663__auto___12489,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
);

break;
case "compute":
var c__5663__auto___12498 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (__12486,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (__12486,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function (state_12357){var state_val_12358 = (state_12357[(1)]);if((state_val_12358 === (7)))
{var inst_12353 = (state_12357[(2)]);var state_12357__$1 = state_12357;var statearr_12359_12499 = state_12357__$1;(statearr_12359_12499[(2)] = inst_12353);
(statearr_12359_12499[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12358 === (6)))
{var state_12357__$1 = state_12357;var statearr_12360_12500 = state_12357__$1;(statearr_12360_12500[(2)] = null);
(statearr_12360_12500[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12358 === (5)))
{var state_12357__$1 = state_12357;var statearr_12361_12501 = state_12357__$1;(statearr_12361_12501[(2)] = null);
(statearr_12361_12501[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12358 === (4)))
{var inst_12347 = (state_12357[(2)]);var inst_12348 = process.call(null,inst_12347);var state_12357__$1 = state_12357;if(cljs.core.truth_(inst_12348))
{var statearr_12362_12502 = state_12357__$1;(statearr_12362_12502[(1)] = (5));
} else
{var statearr_12363_12503 = state_12357__$1;(statearr_12363_12503[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12358 === (3)))
{var inst_12355 = (state_12357[(2)]);var state_12357__$1 = state_12357;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12357__$1,inst_12355);
} else
{if((state_val_12358 === (2)))
{var state_12357__$1 = state_12357;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12357__$1,(4),jobs);
} else
{if((state_val_12358 === (1)))
{var state_12357__$1 = state_12357;var statearr_12364_12504 = state_12357__$1;(statearr_12364_12504[(2)] = null);
(statearr_12364_12504[(1)] = (2));
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
});})(__12486,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
;return ((function (__12486,switch__5648__auto__,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12368 = [null,null,null,null,null,null,null];(statearr_12368[(0)] = state_machine__5649__auto__);
(statearr_12368[(1)] = (1));
return statearr_12368;
});
var state_machine__5649__auto____1 = (function (state_12357){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12357);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12369){if((e12369 instanceof Object))
{var ex__5652__auto__ = e12369;var statearr_12370_12505 = state_12357;(statearr_12370_12505[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12357);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12369;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12506 = state_12357;
state_12357 = G__12506;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12357){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12357);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(__12486,switch__5648__auto__,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
})();var state__5665__auto__ = (function (){var statearr_12371 = f__5664__auto__.call(null);(statearr_12371[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12498);
return statearr_12371;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(__12486,c__5663__auto___12498,G__12317_12487,n__4331__auto___12485,jobs,results,process,async))
);

break;
default:
throw (new Error(("No matching clause: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(type))));

}
{
var G__12507 = (__12486 + (1));
__12486 = G__12507;
continue;
}
} else
{}
break;
}
var c__5663__auto___12508 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___12508,jobs,results,process,async){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___12508,jobs,results,process,async){
return (function (state_12393){var state_val_12394 = (state_12393[(1)]);if((state_val_12394 === (9)))
{var inst_12386 = (state_12393[(2)]);var state_12393__$1 = (function (){var statearr_12395 = state_12393;(statearr_12395[(7)] = inst_12386);
return statearr_12395;
})();var statearr_12396_12509 = state_12393__$1;(statearr_12396_12509[(2)] = null);
(statearr_12396_12509[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12394 === (8)))
{var inst_12379 = (state_12393[(8)]);var inst_12384 = (state_12393[(2)]);var state_12393__$1 = (function (){var statearr_12397 = state_12393;(statearr_12397[(9)] = inst_12384);
return statearr_12397;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12393__$1,(9),results,inst_12379);
} else
{if((state_val_12394 === (7)))
{var inst_12389 = (state_12393[(2)]);var state_12393__$1 = state_12393;var statearr_12398_12510 = state_12393__$1;(statearr_12398_12510[(2)] = inst_12389);
(statearr_12398_12510[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12394 === (6)))
{var inst_12379 = (state_12393[(8)]);var inst_12374 = (state_12393[(10)]);var inst_12379__$1 = cljs.core.async.chan.call(null,(1));var inst_12380 = cljs.core.PersistentVector.EMPTY_NODE;var inst_12381 = [inst_12374,inst_12379__$1];var inst_12382 = (new cljs.core.PersistentVector(null,2,(5),inst_12380,inst_12381,null));var state_12393__$1 = (function (){var statearr_12399 = state_12393;(statearr_12399[(8)] = inst_12379__$1);
return statearr_12399;
})();return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12393__$1,(8),jobs,inst_12382);
} else
{if((state_val_12394 === (5)))
{var inst_12377 = cljs.core.async.close_BANG_.call(null,jobs);var state_12393__$1 = state_12393;var statearr_12400_12511 = state_12393__$1;(statearr_12400_12511[(2)] = inst_12377);
(statearr_12400_12511[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12394 === (4)))
{var inst_12374 = (state_12393[(10)]);var inst_12374__$1 = (state_12393[(2)]);var inst_12375 = (inst_12374__$1 == null);var state_12393__$1 = (function (){var statearr_12401 = state_12393;(statearr_12401[(10)] = inst_12374__$1);
return statearr_12401;
})();if(cljs.core.truth_(inst_12375))
{var statearr_12402_12512 = state_12393__$1;(statearr_12402_12512[(1)] = (5));
} else
{var statearr_12403_12513 = state_12393__$1;(statearr_12403_12513[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12394 === (3)))
{var inst_12391 = (state_12393[(2)]);var state_12393__$1 = state_12393;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12393__$1,inst_12391);
} else
{if((state_val_12394 === (2)))
{var state_12393__$1 = state_12393;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12393__$1,(4),from);
} else
{if((state_val_12394 === (1)))
{var state_12393__$1 = state_12393;var statearr_12404_12514 = state_12393__$1;(statearr_12404_12514[(2)] = null);
(statearr_12404_12514[(1)] = (2));
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
});})(c__5663__auto___12508,jobs,results,process,async))
;return ((function (switch__5648__auto__,c__5663__auto___12508,jobs,results,process,async){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12408 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_12408[(0)] = state_machine__5649__auto__);
(statearr_12408[(1)] = (1));
return statearr_12408;
});
var state_machine__5649__auto____1 = (function (state_12393){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12393);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12409){if((e12409 instanceof Object))
{var ex__5652__auto__ = e12409;var statearr_12410_12515 = state_12393;(statearr_12410_12515[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12393);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12409;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12516 = state_12393;
state_12393 = G__12516;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12393){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12393);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___12508,jobs,results,process,async))
})();var state__5665__auto__ = (function (){var statearr_12411 = f__5664__auto__.call(null);(statearr_12411[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12508);
return statearr_12411;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___12508,jobs,results,process,async))
);
var c__5663__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto__,jobs,results,process,async){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto__,jobs,results,process,async){
return (function (state_12449){var state_val_12450 = (state_12449[(1)]);if((state_val_12450 === (7)))
{var inst_12445 = (state_12449[(2)]);var state_12449__$1 = state_12449;var statearr_12451_12517 = state_12449__$1;(statearr_12451_12517[(2)] = inst_12445);
(statearr_12451_12517[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (20)))
{var state_12449__$1 = state_12449;var statearr_12452_12518 = state_12449__$1;(statearr_12452_12518[(2)] = null);
(statearr_12452_12518[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (1)))
{var state_12449__$1 = state_12449;var statearr_12453_12519 = state_12449__$1;(statearr_12453_12519[(2)] = null);
(statearr_12453_12519[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (4)))
{var inst_12414 = (state_12449[(7)]);var inst_12414__$1 = (state_12449[(2)]);var inst_12415 = (inst_12414__$1 == null);var state_12449__$1 = (function (){var statearr_12454 = state_12449;(statearr_12454[(7)] = inst_12414__$1);
return statearr_12454;
})();if(cljs.core.truth_(inst_12415))
{var statearr_12455_12520 = state_12449__$1;(statearr_12455_12520[(1)] = (5));
} else
{var statearr_12456_12521 = state_12449__$1;(statearr_12456_12521[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (15)))
{var inst_12427 = (state_12449[(8)]);var state_12449__$1 = state_12449;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12449__$1,(18),to,inst_12427);
} else
{if((state_val_12450 === (21)))
{var inst_12440 = (state_12449[(2)]);var state_12449__$1 = state_12449;var statearr_12457_12522 = state_12449__$1;(statearr_12457_12522[(2)] = inst_12440);
(statearr_12457_12522[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (13)))
{var inst_12442 = (state_12449[(2)]);var state_12449__$1 = (function (){var statearr_12458 = state_12449;(statearr_12458[(9)] = inst_12442);
return statearr_12458;
})();var statearr_12459_12523 = state_12449__$1;(statearr_12459_12523[(2)] = null);
(statearr_12459_12523[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (6)))
{var inst_12414 = (state_12449[(7)]);var state_12449__$1 = state_12449;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12449__$1,(11),inst_12414);
} else
{if((state_val_12450 === (17)))
{var inst_12435 = (state_12449[(2)]);var state_12449__$1 = state_12449;if(cljs.core.truth_(inst_12435))
{var statearr_12460_12524 = state_12449__$1;(statearr_12460_12524[(1)] = (19));
} else
{var statearr_12461_12525 = state_12449__$1;(statearr_12461_12525[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (3)))
{var inst_12447 = (state_12449[(2)]);var state_12449__$1 = state_12449;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12449__$1,inst_12447);
} else
{if((state_val_12450 === (12)))
{var inst_12424 = (state_12449[(10)]);var state_12449__$1 = state_12449;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12449__$1,(14),inst_12424);
} else
{if((state_val_12450 === (2)))
{var state_12449__$1 = state_12449;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12449__$1,(4),results);
} else
{if((state_val_12450 === (19)))
{var state_12449__$1 = state_12449;var statearr_12462_12526 = state_12449__$1;(statearr_12462_12526[(2)] = null);
(statearr_12462_12526[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (11)))
{var inst_12424 = (state_12449[(2)]);var state_12449__$1 = (function (){var statearr_12463 = state_12449;(statearr_12463[(10)] = inst_12424);
return statearr_12463;
})();var statearr_12464_12527 = state_12449__$1;(statearr_12464_12527[(2)] = null);
(statearr_12464_12527[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (9)))
{var state_12449__$1 = state_12449;var statearr_12465_12528 = state_12449__$1;(statearr_12465_12528[(2)] = null);
(statearr_12465_12528[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (5)))
{var state_12449__$1 = state_12449;if(cljs.core.truth_(close_QMARK_))
{var statearr_12466_12529 = state_12449__$1;(statearr_12466_12529[(1)] = (8));
} else
{var statearr_12467_12530 = state_12449__$1;(statearr_12467_12530[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (14)))
{var inst_12427 = (state_12449[(8)]);var inst_12429 = (state_12449[(11)]);var inst_12427__$1 = (state_12449[(2)]);var inst_12428 = (inst_12427__$1 == null);var inst_12429__$1 = cljs.core.not.call(null,inst_12428);var state_12449__$1 = (function (){var statearr_12468 = state_12449;(statearr_12468[(8)] = inst_12427__$1);
(statearr_12468[(11)] = inst_12429__$1);
return statearr_12468;
})();if(inst_12429__$1)
{var statearr_12469_12531 = state_12449__$1;(statearr_12469_12531[(1)] = (15));
} else
{var statearr_12470_12532 = state_12449__$1;(statearr_12470_12532[(1)] = (16));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (16)))
{var inst_12429 = (state_12449[(11)]);var state_12449__$1 = state_12449;var statearr_12471_12533 = state_12449__$1;(statearr_12471_12533[(2)] = inst_12429);
(statearr_12471_12533[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (10)))
{var inst_12421 = (state_12449[(2)]);var state_12449__$1 = state_12449;var statearr_12472_12534 = state_12449__$1;(statearr_12472_12534[(2)] = inst_12421);
(statearr_12472_12534[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (18)))
{var inst_12432 = (state_12449[(2)]);var state_12449__$1 = state_12449;var statearr_12473_12535 = state_12449__$1;(statearr_12473_12535[(2)] = inst_12432);
(statearr_12473_12535[(1)] = (17));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12450 === (8)))
{var inst_12418 = cljs.core.async.close_BANG_.call(null,to);var state_12449__$1 = state_12449;var statearr_12474_12536 = state_12449__$1;(statearr_12474_12536[(2)] = inst_12418);
(statearr_12474_12536[(1)] = (10));
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
});})(c__5663__auto__,jobs,results,process,async))
;return ((function (switch__5648__auto__,c__5663__auto__,jobs,results,process,async){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12478 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_12478[(0)] = state_machine__5649__auto__);
(statearr_12478[(1)] = (1));
return statearr_12478;
});
var state_machine__5649__auto____1 = (function (state_12449){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12449);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12479){if((e12479 instanceof Object))
{var ex__5652__auto__ = e12479;var statearr_12480_12537 = state_12449;(statearr_12480_12537[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12449);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12479;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12538 = state_12449;
state_12449 = G__12538;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12449){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12449);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto__,jobs,results,process,async))
})();var state__5665__auto__ = (function (){var statearr_12481 = f__5664__auto__.call(null);(statearr_12481[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto__);
return statearr_12481;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto__,jobs,results,process,async))
);
return c__5663__auto__;
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
var split__4 = (function (p,ch,t_buf_or_n,f_buf_or_n){var tc = cljs.core.async.chan.call(null,t_buf_or_n);var fc = cljs.core.async.chan.call(null,f_buf_or_n);var c__5663__auto___12639 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___12639,tc,fc){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___12639,tc,fc){
return (function (state_12614){var state_val_12615 = (state_12614[(1)]);if((state_val_12615 === (7)))
{var inst_12610 = (state_12614[(2)]);var state_12614__$1 = state_12614;var statearr_12616_12640 = state_12614__$1;(statearr_12616_12640[(2)] = inst_12610);
(statearr_12616_12640[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (1)))
{var state_12614__$1 = state_12614;var statearr_12617_12641 = state_12614__$1;(statearr_12617_12641[(2)] = null);
(statearr_12617_12641[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (4)))
{var inst_12591 = (state_12614[(7)]);var inst_12591__$1 = (state_12614[(2)]);var inst_12592 = (inst_12591__$1 == null);var state_12614__$1 = (function (){var statearr_12618 = state_12614;(statearr_12618[(7)] = inst_12591__$1);
return statearr_12618;
})();if(cljs.core.truth_(inst_12592))
{var statearr_12619_12642 = state_12614__$1;(statearr_12619_12642[(1)] = (5));
} else
{var statearr_12620_12643 = state_12614__$1;(statearr_12620_12643[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (13)))
{var state_12614__$1 = state_12614;var statearr_12621_12644 = state_12614__$1;(statearr_12621_12644[(2)] = null);
(statearr_12621_12644[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (6)))
{var inst_12591 = (state_12614[(7)]);var inst_12597 = p.call(null,inst_12591);var state_12614__$1 = state_12614;if(cljs.core.truth_(inst_12597))
{var statearr_12622_12645 = state_12614__$1;(statearr_12622_12645[(1)] = (9));
} else
{var statearr_12623_12646 = state_12614__$1;(statearr_12623_12646[(1)] = (10));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (3)))
{var inst_12612 = (state_12614[(2)]);var state_12614__$1 = state_12614;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12614__$1,inst_12612);
} else
{if((state_val_12615 === (12)))
{var state_12614__$1 = state_12614;var statearr_12624_12647 = state_12614__$1;(statearr_12624_12647[(2)] = null);
(statearr_12624_12647[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (2)))
{var state_12614__$1 = state_12614;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12614__$1,(4),ch);
} else
{if((state_val_12615 === (11)))
{var inst_12591 = (state_12614[(7)]);var inst_12601 = (state_12614[(2)]);var state_12614__$1 = state_12614;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12614__$1,(8),inst_12601,inst_12591);
} else
{if((state_val_12615 === (9)))
{var state_12614__$1 = state_12614;var statearr_12625_12648 = state_12614__$1;(statearr_12625_12648[(2)] = tc);
(statearr_12625_12648[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (5)))
{var inst_12594 = cljs.core.async.close_BANG_.call(null,tc);var inst_12595 = cljs.core.async.close_BANG_.call(null,fc);var state_12614__$1 = (function (){var statearr_12626 = state_12614;(statearr_12626[(8)] = inst_12594);
return statearr_12626;
})();var statearr_12627_12649 = state_12614__$1;(statearr_12627_12649[(2)] = inst_12595);
(statearr_12627_12649[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (14)))
{var inst_12608 = (state_12614[(2)]);var state_12614__$1 = state_12614;var statearr_12628_12650 = state_12614__$1;(statearr_12628_12650[(2)] = inst_12608);
(statearr_12628_12650[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (10)))
{var state_12614__$1 = state_12614;var statearr_12629_12651 = state_12614__$1;(statearr_12629_12651[(2)] = fc);
(statearr_12629_12651[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12615 === (8)))
{var inst_12603 = (state_12614[(2)]);var state_12614__$1 = state_12614;if(cljs.core.truth_(inst_12603))
{var statearr_12630_12652 = state_12614__$1;(statearr_12630_12652[(1)] = (12));
} else
{var statearr_12631_12653 = state_12614__$1;(statearr_12631_12653[(1)] = (13));
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
});})(c__5663__auto___12639,tc,fc))
;return ((function (switch__5648__auto__,c__5663__auto___12639,tc,fc){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12635 = [null,null,null,null,null,null,null,null,null];(statearr_12635[(0)] = state_machine__5649__auto__);
(statearr_12635[(1)] = (1));
return statearr_12635;
});
var state_machine__5649__auto____1 = (function (state_12614){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12614);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12636){if((e12636 instanceof Object))
{var ex__5652__auto__ = e12636;var statearr_12637_12654 = state_12614;(statearr_12637_12654[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12614);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12636;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12655 = state_12614;
state_12614 = G__12655;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12614){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12614);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___12639,tc,fc))
})();var state__5665__auto__ = (function (){var statearr_12638 = f__5664__auto__.call(null);(statearr_12638[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___12639);
return statearr_12638;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___12639,tc,fc))
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
cljs.core.async.reduce = (function reduce(f,init,ch){var c__5663__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto__){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto__){
return (function (state_12702){var state_val_12703 = (state_12702[(1)]);if((state_val_12703 === (7)))
{var inst_12698 = (state_12702[(2)]);var state_12702__$1 = state_12702;var statearr_12704_12720 = state_12702__$1;(statearr_12704_12720[(2)] = inst_12698);
(statearr_12704_12720[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12703 === (6)))
{var inst_12688 = (state_12702[(7)]);var inst_12691 = (state_12702[(8)]);var inst_12695 = f.call(null,inst_12688,inst_12691);var inst_12688__$1 = inst_12695;var state_12702__$1 = (function (){var statearr_12705 = state_12702;(statearr_12705[(7)] = inst_12688__$1);
return statearr_12705;
})();var statearr_12706_12721 = state_12702__$1;(statearr_12706_12721[(2)] = null);
(statearr_12706_12721[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12703 === (5)))
{var inst_12688 = (state_12702[(7)]);var state_12702__$1 = state_12702;var statearr_12707_12722 = state_12702__$1;(statearr_12707_12722[(2)] = inst_12688);
(statearr_12707_12722[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12703 === (4)))
{var inst_12691 = (state_12702[(8)]);var inst_12691__$1 = (state_12702[(2)]);var inst_12692 = (inst_12691__$1 == null);var state_12702__$1 = (function (){var statearr_12708 = state_12702;(statearr_12708[(8)] = inst_12691__$1);
return statearr_12708;
})();if(cljs.core.truth_(inst_12692))
{var statearr_12709_12723 = state_12702__$1;(statearr_12709_12723[(1)] = (5));
} else
{var statearr_12710_12724 = state_12702__$1;(statearr_12710_12724[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12703 === (3)))
{var inst_12700 = (state_12702[(2)]);var state_12702__$1 = state_12702;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12702__$1,inst_12700);
} else
{if((state_val_12703 === (2)))
{var state_12702__$1 = state_12702;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12702__$1,(4),ch);
} else
{if((state_val_12703 === (1)))
{var inst_12688 = init;var state_12702__$1 = (function (){var statearr_12711 = state_12702;(statearr_12711[(7)] = inst_12688);
return statearr_12711;
})();var statearr_12712_12725 = state_12702__$1;(statearr_12712_12725[(2)] = null);
(statearr_12712_12725[(1)] = (2));
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
});})(c__5663__auto__))
;return ((function (switch__5648__auto__,c__5663__auto__){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12716 = [null,null,null,null,null,null,null,null,null];(statearr_12716[(0)] = state_machine__5649__auto__);
(statearr_12716[(1)] = (1));
return statearr_12716;
});
var state_machine__5649__auto____1 = (function (state_12702){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12702);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12717){if((e12717 instanceof Object))
{var ex__5652__auto__ = e12717;var statearr_12718_12726 = state_12702;(statearr_12718_12726[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12702);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12717;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12727 = state_12702;
state_12702 = G__12727;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12702){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12702);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto__))
})();var state__5665__auto__ = (function (){var statearr_12719 = f__5664__auto__.call(null);(statearr_12719[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto__);
return statearr_12719;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto__))
);
return c__5663__auto__;
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
var onto_chan__3 = (function (ch,coll,close_QMARK_){var c__5663__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto__){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto__){
return (function (state_12801){var state_val_12802 = (state_12801[(1)]);if((state_val_12802 === (7)))
{var inst_12783 = (state_12801[(2)]);var state_12801__$1 = state_12801;var statearr_12803_12826 = state_12801__$1;(statearr_12803_12826[(2)] = inst_12783);
(statearr_12803_12826[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (1)))
{var inst_12777 = cljs.core.seq.call(null,coll);var inst_12778 = inst_12777;var state_12801__$1 = (function (){var statearr_12804 = state_12801;(statearr_12804[(7)] = inst_12778);
return statearr_12804;
})();var statearr_12805_12827 = state_12801__$1;(statearr_12805_12827[(2)] = null);
(statearr_12805_12827[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (4)))
{var inst_12778 = (state_12801[(7)]);var inst_12781 = cljs.core.first.call(null,inst_12778);var state_12801__$1 = state_12801;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12801__$1,(7),ch,inst_12781);
} else
{if((state_val_12802 === (13)))
{var inst_12795 = (state_12801[(2)]);var state_12801__$1 = state_12801;var statearr_12806_12828 = state_12801__$1;(statearr_12806_12828[(2)] = inst_12795);
(statearr_12806_12828[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (6)))
{var inst_12786 = (state_12801[(2)]);var state_12801__$1 = state_12801;if(cljs.core.truth_(inst_12786))
{var statearr_12807_12829 = state_12801__$1;(statearr_12807_12829[(1)] = (8));
} else
{var statearr_12808_12830 = state_12801__$1;(statearr_12808_12830[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (3)))
{var inst_12799 = (state_12801[(2)]);var state_12801__$1 = state_12801;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12801__$1,inst_12799);
} else
{if((state_val_12802 === (12)))
{var state_12801__$1 = state_12801;var statearr_12809_12831 = state_12801__$1;(statearr_12809_12831[(2)] = null);
(statearr_12809_12831[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (2)))
{var inst_12778 = (state_12801[(7)]);var state_12801__$1 = state_12801;if(cljs.core.truth_(inst_12778))
{var statearr_12810_12832 = state_12801__$1;(statearr_12810_12832[(1)] = (4));
} else
{var statearr_12811_12833 = state_12801__$1;(statearr_12811_12833[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (11)))
{var inst_12792 = cljs.core.async.close_BANG_.call(null,ch);var state_12801__$1 = state_12801;var statearr_12812_12834 = state_12801__$1;(statearr_12812_12834[(2)] = inst_12792);
(statearr_12812_12834[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (9)))
{var state_12801__$1 = state_12801;if(cljs.core.truth_(close_QMARK_))
{var statearr_12813_12835 = state_12801__$1;(statearr_12813_12835[(1)] = (11));
} else
{var statearr_12814_12836 = state_12801__$1;(statearr_12814_12836[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (5)))
{var inst_12778 = (state_12801[(7)]);var state_12801__$1 = state_12801;var statearr_12815_12837 = state_12801__$1;(statearr_12815_12837[(2)] = inst_12778);
(statearr_12815_12837[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (10)))
{var inst_12797 = (state_12801[(2)]);var state_12801__$1 = state_12801;var statearr_12816_12838 = state_12801__$1;(statearr_12816_12838[(2)] = inst_12797);
(statearr_12816_12838[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_12802 === (8)))
{var inst_12778 = (state_12801[(7)]);var inst_12788 = cljs.core.next.call(null,inst_12778);var inst_12778__$1 = inst_12788;var state_12801__$1 = (function (){var statearr_12817 = state_12801;(statearr_12817[(7)] = inst_12778__$1);
return statearr_12817;
})();var statearr_12818_12839 = state_12801__$1;(statearr_12818_12839[(2)] = null);
(statearr_12818_12839[(1)] = (2));
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
});})(c__5663__auto__))
;return ((function (switch__5648__auto__,c__5663__auto__){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_12822 = [null,null,null,null,null,null,null,null];(statearr_12822[(0)] = state_machine__5649__auto__);
(statearr_12822[(1)] = (1));
return statearr_12822;
});
var state_machine__5649__auto____1 = (function (state_12801){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_12801);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e12823){if((e12823 instanceof Object))
{var ex__5652__auto__ = e12823;var statearr_12824_12840 = state_12801;(statearr_12824_12840[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12801);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e12823;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__12841 = state_12801;
state_12801 = G__12841;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_12801){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_12801);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto__))
})();var state__5665__auto__ = (function (){var statearr_12825 = f__5664__auto__.call(null);(statearr_12825[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto__);
return statearr_12825;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto__))
);
return c__5663__auto__;
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
cljs.core.async.Mux = (function (){var obj12843 = {};return obj12843;
})();
cljs.core.async.muxch_STAR_ = (function muxch_STAR_(_){if((function (){var and__3450__auto__ = _;if(and__3450__auto__)
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1;
} else
{return and__3450__auto__;
}
})())
{return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else
{var x__4098__auto__ = (((_ == null))?null:_);return (function (){var or__3462__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
})().call(null,_);
}
});
cljs.core.async.Mult = (function (){var obj12845 = {};return obj12845;
})();
cljs.core.async.tap_STAR_ = (function tap_STAR_(m,ch,close_QMARK_){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mult$tap_STAR_$arity$3;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.tap_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
})().call(null,m,ch,close_QMARK_);
}
});
cljs.core.async.untap_STAR_ = (function untap_STAR_(m,ch){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mult$untap_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.untap_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.untap_all_STAR_ = (function untap_all_STAR_(m){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
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
cljs.core.async.mult = (function mult(ch){var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);var m = (function (){if(typeof cljs.core.async.t13067 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13067 = (function (cs,ch,mult,meta13068){
this.cs = cs;
this.ch = ch;
this.mult = mult;
this.meta13068 = meta13068;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13067.cljs$lang$type = true;
cljs.core.async.t13067.cljs$lang$ctorStr = "cljs.core.async/t13067";
cljs.core.async.t13067.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t13067");
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$async$Mult$ = true;
cljs.core.async.t13067.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$2,close_QMARK_){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$2,close_QMARK_);
return null;
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$2){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$2);
return null;
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return null;
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13067.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_13069){var self__ = this;
var _13069__$1 = this;return self__.meta13068;
});})(cs))
;
cljs.core.async.t13067.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_13069,meta13068__$1){var self__ = this;
var _13069__$1 = this;return (new cljs.core.async.t13067(self__.cs,self__.ch,self__.mult,meta13068__$1));
});})(cs))
;
cljs.core.async.__GT_t13067 = ((function (cs){
return (function __GT_t13067(cs__$1,ch__$1,mult__$1,meta13068){return (new cljs.core.async.t13067(cs__$1,ch__$1,mult__$1,meta13068));
});})(cs))
;
}
return (new cljs.core.async.t13067(cs,ch,mult,null));
})();var dchan = cljs.core.async.chan.call(null,(1));var dctr = cljs.core.atom.call(null,null);var done = ((function (cs,m,dchan,dctr){
return (function (_){if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0)))
{return cljs.core.async.put_BANG_.call(null,dchan,true);
} else
{return null;
}
});})(cs,m,dchan,dctr))
;var c__5663__auto___13288 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___13288,cs,m,dchan,dctr,done){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___13288,cs,m,dchan,dctr,done){
return (function (state_13200){var state_val_13201 = (state_13200[(1)]);if((state_val_13201 === (7)))
{var inst_13196 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13202_13289 = state_13200__$1;(statearr_13202_13289[(2)] = inst_13196);
(statearr_13202_13289[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (20)))
{var inst_13101 = (state_13200[(7)]);var inst_13111 = cljs.core.first.call(null,inst_13101);var inst_13112 = cljs.core.nth.call(null,inst_13111,(0),null);var inst_13113 = cljs.core.nth.call(null,inst_13111,(1),null);var state_13200__$1 = (function (){var statearr_13203 = state_13200;(statearr_13203[(8)] = inst_13112);
return statearr_13203;
})();if(cljs.core.truth_(inst_13113))
{var statearr_13204_13290 = state_13200__$1;(statearr_13204_13290[(1)] = (22));
} else
{var statearr_13205_13291 = state_13200__$1;(statearr_13205_13291[(1)] = (23));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (27)))
{var inst_13148 = (state_13200[(9)]);var inst_13141 = (state_13200[(10)]);var inst_13143 = (state_13200[(11)]);var inst_13072 = (state_13200[(12)]);var inst_13148__$1 = cljs.core._nth.call(null,inst_13141,inst_13143);var inst_13149 = cljs.core.async.put_BANG_.call(null,inst_13148__$1,inst_13072,done);var state_13200__$1 = (function (){var statearr_13206 = state_13200;(statearr_13206[(9)] = inst_13148__$1);
return statearr_13206;
})();if(cljs.core.truth_(inst_13149))
{var statearr_13207_13292 = state_13200__$1;(statearr_13207_13292[(1)] = (30));
} else
{var statearr_13208_13293 = state_13200__$1;(statearr_13208_13293[(1)] = (31));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (1)))
{var state_13200__$1 = state_13200;var statearr_13209_13294 = state_13200__$1;(statearr_13209_13294[(2)] = null);
(statearr_13209_13294[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (24)))
{var inst_13101 = (state_13200[(7)]);var inst_13118 = (state_13200[(2)]);var inst_13119 = cljs.core.next.call(null,inst_13101);var inst_13081 = inst_13119;var inst_13082 = null;var inst_13083 = (0);var inst_13084 = (0);var state_13200__$1 = (function (){var statearr_13210 = state_13200;(statearr_13210[(13)] = inst_13082);
(statearr_13210[(14)] = inst_13118);
(statearr_13210[(15)] = inst_13083);
(statearr_13210[(16)] = inst_13084);
(statearr_13210[(17)] = inst_13081);
return statearr_13210;
})();var statearr_13211_13295 = state_13200__$1;(statearr_13211_13295[(2)] = null);
(statearr_13211_13295[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (39)))
{var state_13200__$1 = state_13200;var statearr_13215_13296 = state_13200__$1;(statearr_13215_13296[(2)] = null);
(statearr_13215_13296[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (4)))
{var inst_13072 = (state_13200[(12)]);var inst_13072__$1 = (state_13200[(2)]);var inst_13073 = (inst_13072__$1 == null);var state_13200__$1 = (function (){var statearr_13216 = state_13200;(statearr_13216[(12)] = inst_13072__$1);
return statearr_13216;
})();if(cljs.core.truth_(inst_13073))
{var statearr_13217_13297 = state_13200__$1;(statearr_13217_13297[(1)] = (5));
} else
{var statearr_13218_13298 = state_13200__$1;(statearr_13218_13298[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (15)))
{var inst_13082 = (state_13200[(13)]);var inst_13083 = (state_13200[(15)]);var inst_13084 = (state_13200[(16)]);var inst_13081 = (state_13200[(17)]);var inst_13097 = (state_13200[(2)]);var inst_13098 = (inst_13084 + (1));var tmp13212 = inst_13082;var tmp13213 = inst_13083;var tmp13214 = inst_13081;var inst_13081__$1 = tmp13214;var inst_13082__$1 = tmp13212;var inst_13083__$1 = tmp13213;var inst_13084__$1 = inst_13098;var state_13200__$1 = (function (){var statearr_13219 = state_13200;(statearr_13219[(18)] = inst_13097);
(statearr_13219[(13)] = inst_13082__$1);
(statearr_13219[(15)] = inst_13083__$1);
(statearr_13219[(16)] = inst_13084__$1);
(statearr_13219[(17)] = inst_13081__$1);
return statearr_13219;
})();var statearr_13220_13299 = state_13200__$1;(statearr_13220_13299[(2)] = null);
(statearr_13220_13299[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (21)))
{var inst_13122 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13224_13300 = state_13200__$1;(statearr_13224_13300[(2)] = inst_13122);
(statearr_13224_13300[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (31)))
{var inst_13148 = (state_13200[(9)]);var inst_13152 = done.call(null,null);var inst_13153 = cljs.core.async.untap_STAR_.call(null,m,inst_13148);var state_13200__$1 = (function (){var statearr_13225 = state_13200;(statearr_13225[(19)] = inst_13152);
return statearr_13225;
})();var statearr_13226_13301 = state_13200__$1;(statearr_13226_13301[(2)] = inst_13153);
(statearr_13226_13301[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (32)))
{var inst_13142 = (state_13200[(20)]);var inst_13140 = (state_13200[(21)]);var inst_13141 = (state_13200[(10)]);var inst_13143 = (state_13200[(11)]);var inst_13155 = (state_13200[(2)]);var inst_13156 = (inst_13143 + (1));var tmp13221 = inst_13142;var tmp13222 = inst_13140;var tmp13223 = inst_13141;var inst_13140__$1 = tmp13222;var inst_13141__$1 = tmp13223;var inst_13142__$1 = tmp13221;var inst_13143__$1 = inst_13156;var state_13200__$1 = (function (){var statearr_13227 = state_13200;(statearr_13227[(20)] = inst_13142__$1);
(statearr_13227[(21)] = inst_13140__$1);
(statearr_13227[(10)] = inst_13141__$1);
(statearr_13227[(11)] = inst_13143__$1);
(statearr_13227[(22)] = inst_13155);
return statearr_13227;
})();var statearr_13228_13302 = state_13200__$1;(statearr_13228_13302[(2)] = null);
(statearr_13228_13302[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (40)))
{var inst_13168 = (state_13200[(23)]);var inst_13172 = done.call(null,null);var inst_13173 = cljs.core.async.untap_STAR_.call(null,m,inst_13168);var state_13200__$1 = (function (){var statearr_13229 = state_13200;(statearr_13229[(24)] = inst_13172);
return statearr_13229;
})();var statearr_13230_13303 = state_13200__$1;(statearr_13230_13303[(2)] = inst_13173);
(statearr_13230_13303[(1)] = (41));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (33)))
{var inst_13159 = (state_13200[(25)]);var inst_13161 = cljs.core.chunked_seq_QMARK_.call(null,inst_13159);var state_13200__$1 = state_13200;if(inst_13161)
{var statearr_13231_13304 = state_13200__$1;(statearr_13231_13304[(1)] = (36));
} else
{var statearr_13232_13305 = state_13200__$1;(statearr_13232_13305[(1)] = (37));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (13)))
{var inst_13091 = (state_13200[(26)]);var inst_13094 = cljs.core.async.close_BANG_.call(null,inst_13091);var state_13200__$1 = state_13200;var statearr_13233_13306 = state_13200__$1;(statearr_13233_13306[(2)] = inst_13094);
(statearr_13233_13306[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (22)))
{var inst_13112 = (state_13200[(8)]);var inst_13115 = cljs.core.async.close_BANG_.call(null,inst_13112);var state_13200__$1 = state_13200;var statearr_13234_13307 = state_13200__$1;(statearr_13234_13307[(2)] = inst_13115);
(statearr_13234_13307[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (36)))
{var inst_13159 = (state_13200[(25)]);var inst_13163 = cljs.core.chunk_first.call(null,inst_13159);var inst_13164 = cljs.core.chunk_rest.call(null,inst_13159);var inst_13165 = cljs.core.count.call(null,inst_13163);var inst_13140 = inst_13164;var inst_13141 = inst_13163;var inst_13142 = inst_13165;var inst_13143 = (0);var state_13200__$1 = (function (){var statearr_13235 = state_13200;(statearr_13235[(20)] = inst_13142);
(statearr_13235[(21)] = inst_13140);
(statearr_13235[(10)] = inst_13141);
(statearr_13235[(11)] = inst_13143);
return statearr_13235;
})();var statearr_13236_13308 = state_13200__$1;(statearr_13236_13308[(2)] = null);
(statearr_13236_13308[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (41)))
{var inst_13159 = (state_13200[(25)]);var inst_13175 = (state_13200[(2)]);var inst_13176 = cljs.core.next.call(null,inst_13159);var inst_13140 = inst_13176;var inst_13141 = null;var inst_13142 = (0);var inst_13143 = (0);var state_13200__$1 = (function (){var statearr_13237 = state_13200;(statearr_13237[(20)] = inst_13142);
(statearr_13237[(21)] = inst_13140);
(statearr_13237[(10)] = inst_13141);
(statearr_13237[(27)] = inst_13175);
(statearr_13237[(11)] = inst_13143);
return statearr_13237;
})();var statearr_13238_13309 = state_13200__$1;(statearr_13238_13309[(2)] = null);
(statearr_13238_13309[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (43)))
{var state_13200__$1 = state_13200;var statearr_13239_13310 = state_13200__$1;(statearr_13239_13310[(2)] = null);
(statearr_13239_13310[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (29)))
{var inst_13184 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13240_13311 = state_13200__$1;(statearr_13240_13311[(2)] = inst_13184);
(statearr_13240_13311[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (44)))
{var inst_13193 = (state_13200[(2)]);var state_13200__$1 = (function (){var statearr_13241 = state_13200;(statearr_13241[(28)] = inst_13193);
return statearr_13241;
})();var statearr_13242_13312 = state_13200__$1;(statearr_13242_13312[(2)] = null);
(statearr_13242_13312[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (6)))
{var inst_13132 = (state_13200[(29)]);var inst_13131 = cljs.core.deref.call(null,cs);var inst_13132__$1 = cljs.core.keys.call(null,inst_13131);var inst_13133 = cljs.core.count.call(null,inst_13132__$1);var inst_13134 = cljs.core.reset_BANG_.call(null,dctr,inst_13133);var inst_13139 = cljs.core.seq.call(null,inst_13132__$1);var inst_13140 = inst_13139;var inst_13141 = null;var inst_13142 = (0);var inst_13143 = (0);var state_13200__$1 = (function (){var statearr_13243 = state_13200;(statearr_13243[(20)] = inst_13142);
(statearr_13243[(21)] = inst_13140);
(statearr_13243[(10)] = inst_13141);
(statearr_13243[(29)] = inst_13132__$1);
(statearr_13243[(11)] = inst_13143);
(statearr_13243[(30)] = inst_13134);
return statearr_13243;
})();var statearr_13244_13313 = state_13200__$1;(statearr_13244_13313[(2)] = null);
(statearr_13244_13313[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (28)))
{var inst_13159 = (state_13200[(25)]);var inst_13140 = (state_13200[(21)]);var inst_13159__$1 = cljs.core.seq.call(null,inst_13140);var state_13200__$1 = (function (){var statearr_13245 = state_13200;(statearr_13245[(25)] = inst_13159__$1);
return statearr_13245;
})();if(inst_13159__$1)
{var statearr_13246_13314 = state_13200__$1;(statearr_13246_13314[(1)] = (33));
} else
{var statearr_13247_13315 = state_13200__$1;(statearr_13247_13315[(1)] = (34));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (25)))
{var inst_13142 = (state_13200[(20)]);var inst_13143 = (state_13200[(11)]);var inst_13145 = (inst_13143 < inst_13142);var inst_13146 = inst_13145;var state_13200__$1 = state_13200;if(cljs.core.truth_(inst_13146))
{var statearr_13248_13316 = state_13200__$1;(statearr_13248_13316[(1)] = (27));
} else
{var statearr_13249_13317 = state_13200__$1;(statearr_13249_13317[(1)] = (28));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (34)))
{var state_13200__$1 = state_13200;var statearr_13250_13318 = state_13200__$1;(statearr_13250_13318[(2)] = null);
(statearr_13250_13318[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (17)))
{var state_13200__$1 = state_13200;var statearr_13251_13319 = state_13200__$1;(statearr_13251_13319[(2)] = null);
(statearr_13251_13319[(1)] = (18));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (3)))
{var inst_13198 = (state_13200[(2)]);var state_13200__$1 = state_13200;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13200__$1,inst_13198);
} else
{if((state_val_13201 === (12)))
{var inst_13127 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13252_13320 = state_13200__$1;(statearr_13252_13320[(2)] = inst_13127);
(statearr_13252_13320[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (2)))
{var state_13200__$1 = state_13200;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13200__$1,(4),ch);
} else
{if((state_val_13201 === (23)))
{var state_13200__$1 = state_13200;var statearr_13253_13321 = state_13200__$1;(statearr_13253_13321[(2)] = null);
(statearr_13253_13321[(1)] = (24));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (35)))
{var inst_13182 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13254_13322 = state_13200__$1;(statearr_13254_13322[(2)] = inst_13182);
(statearr_13254_13322[(1)] = (29));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (19)))
{var inst_13101 = (state_13200[(7)]);var inst_13105 = cljs.core.chunk_first.call(null,inst_13101);var inst_13106 = cljs.core.chunk_rest.call(null,inst_13101);var inst_13107 = cljs.core.count.call(null,inst_13105);var inst_13081 = inst_13106;var inst_13082 = inst_13105;var inst_13083 = inst_13107;var inst_13084 = (0);var state_13200__$1 = (function (){var statearr_13255 = state_13200;(statearr_13255[(13)] = inst_13082);
(statearr_13255[(15)] = inst_13083);
(statearr_13255[(16)] = inst_13084);
(statearr_13255[(17)] = inst_13081);
return statearr_13255;
})();var statearr_13256_13323 = state_13200__$1;(statearr_13256_13323[(2)] = null);
(statearr_13256_13323[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (11)))
{var inst_13101 = (state_13200[(7)]);var inst_13081 = (state_13200[(17)]);var inst_13101__$1 = cljs.core.seq.call(null,inst_13081);var state_13200__$1 = (function (){var statearr_13257 = state_13200;(statearr_13257[(7)] = inst_13101__$1);
return statearr_13257;
})();if(inst_13101__$1)
{var statearr_13258_13324 = state_13200__$1;(statearr_13258_13324[(1)] = (16));
} else
{var statearr_13259_13325 = state_13200__$1;(statearr_13259_13325[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (9)))
{var inst_13129 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13260_13326 = state_13200__$1;(statearr_13260_13326[(2)] = inst_13129);
(statearr_13260_13326[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (5)))
{var inst_13079 = cljs.core.deref.call(null,cs);var inst_13080 = cljs.core.seq.call(null,inst_13079);var inst_13081 = inst_13080;var inst_13082 = null;var inst_13083 = (0);var inst_13084 = (0);var state_13200__$1 = (function (){var statearr_13261 = state_13200;(statearr_13261[(13)] = inst_13082);
(statearr_13261[(15)] = inst_13083);
(statearr_13261[(16)] = inst_13084);
(statearr_13261[(17)] = inst_13081);
return statearr_13261;
})();var statearr_13262_13327 = state_13200__$1;(statearr_13262_13327[(2)] = null);
(statearr_13262_13327[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (14)))
{var state_13200__$1 = state_13200;var statearr_13263_13328 = state_13200__$1;(statearr_13263_13328[(2)] = null);
(statearr_13263_13328[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (45)))
{var inst_13190 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13264_13329 = state_13200__$1;(statearr_13264_13329[(2)] = inst_13190);
(statearr_13264_13329[(1)] = (44));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (26)))
{var inst_13132 = (state_13200[(29)]);var inst_13186 = (state_13200[(2)]);var inst_13187 = cljs.core.seq.call(null,inst_13132);var state_13200__$1 = (function (){var statearr_13265 = state_13200;(statearr_13265[(31)] = inst_13186);
return statearr_13265;
})();if(inst_13187)
{var statearr_13266_13330 = state_13200__$1;(statearr_13266_13330[(1)] = (42));
} else
{var statearr_13267_13331 = state_13200__$1;(statearr_13267_13331[(1)] = (43));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (16)))
{var inst_13101 = (state_13200[(7)]);var inst_13103 = cljs.core.chunked_seq_QMARK_.call(null,inst_13101);var state_13200__$1 = state_13200;if(inst_13103)
{var statearr_13268_13332 = state_13200__$1;(statearr_13268_13332[(1)] = (19));
} else
{var statearr_13269_13333 = state_13200__$1;(statearr_13269_13333[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (38)))
{var inst_13179 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13270_13334 = state_13200__$1;(statearr_13270_13334[(2)] = inst_13179);
(statearr_13270_13334[(1)] = (35));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (30)))
{var state_13200__$1 = state_13200;var statearr_13271_13335 = state_13200__$1;(statearr_13271_13335[(2)] = null);
(statearr_13271_13335[(1)] = (32));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (10)))
{var inst_13082 = (state_13200[(13)]);var inst_13084 = (state_13200[(16)]);var inst_13090 = cljs.core._nth.call(null,inst_13082,inst_13084);var inst_13091 = cljs.core.nth.call(null,inst_13090,(0),null);var inst_13092 = cljs.core.nth.call(null,inst_13090,(1),null);var state_13200__$1 = (function (){var statearr_13272 = state_13200;(statearr_13272[(26)] = inst_13091);
return statearr_13272;
})();if(cljs.core.truth_(inst_13092))
{var statearr_13273_13336 = state_13200__$1;(statearr_13273_13336[(1)] = (13));
} else
{var statearr_13274_13337 = state_13200__$1;(statearr_13274_13337[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (18)))
{var inst_13125 = (state_13200[(2)]);var state_13200__$1 = state_13200;var statearr_13275_13338 = state_13200__$1;(statearr_13275_13338[(2)] = inst_13125);
(statearr_13275_13338[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (42)))
{var state_13200__$1 = state_13200;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13200__$1,(45),dchan);
} else
{if((state_val_13201 === (37)))
{var inst_13159 = (state_13200[(25)]);var inst_13072 = (state_13200[(12)]);var inst_13168 = (state_13200[(23)]);var inst_13168__$1 = cljs.core.first.call(null,inst_13159);var inst_13169 = cljs.core.async.put_BANG_.call(null,inst_13168__$1,inst_13072,done);var state_13200__$1 = (function (){var statearr_13276 = state_13200;(statearr_13276[(23)] = inst_13168__$1);
return statearr_13276;
})();if(cljs.core.truth_(inst_13169))
{var statearr_13277_13339 = state_13200__$1;(statearr_13277_13339[(1)] = (39));
} else
{var statearr_13278_13340 = state_13200__$1;(statearr_13278_13340[(1)] = (40));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13201 === (8)))
{var inst_13083 = (state_13200[(15)]);var inst_13084 = (state_13200[(16)]);var inst_13086 = (inst_13084 < inst_13083);var inst_13087 = inst_13086;var state_13200__$1 = state_13200;if(cljs.core.truth_(inst_13087))
{var statearr_13279_13341 = state_13200__$1;(statearr_13279_13341[(1)] = (10));
} else
{var statearr_13280_13342 = state_13200__$1;(statearr_13280_13342[(1)] = (11));
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
});})(c__5663__auto___13288,cs,m,dchan,dctr,done))
;return ((function (switch__5648__auto__,c__5663__auto___13288,cs,m,dchan,dctr,done){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_13284 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13284[(0)] = state_machine__5649__auto__);
(statearr_13284[(1)] = (1));
return statearr_13284;
});
var state_machine__5649__auto____1 = (function (state_13200){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_13200);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e13285){if((e13285 instanceof Object))
{var ex__5652__auto__ = e13285;var statearr_13286_13343 = state_13200;(statearr_13286_13343[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13200);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13285;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13344 = state_13200;
state_13200 = G__13344;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_13200){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_13200);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___13288,cs,m,dchan,dctr,done))
})();var state__5665__auto__ = (function (){var statearr_13287 = f__5664__auto__.call(null);(statearr_13287[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___13288);
return statearr_13287;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___13288,cs,m,dchan,dctr,done))
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
cljs.core.async.Mix = (function (){var obj13346 = {};return obj13346;
})();
cljs.core.async.admix_STAR_ = (function admix_STAR_(m,ch){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mix$admix_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.admix_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_STAR_ = (function unmix_STAR_(m,ch){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
})().call(null,m,ch);
}
});
cljs.core.async.unmix_all_STAR_ = (function unmix_all_STAR_(m){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
})().call(null,m);
}
});
cljs.core.async.toggle_STAR_ = (function toggle_STAR_(m,state_map){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
})().call(null,m,state_map);
}
});
cljs.core.async.solo_mode_STAR_ = (function solo_mode_STAR_(m,mode){if((function (){var and__3450__auto__ = m;if(and__3450__auto__)
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else
{var x__4098__auto__ = (((m == null))?null:m);return (function (){var or__3462__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
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
;var m = (function (){if(typeof cljs.core.async.t13466 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13466 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta13467){
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
this.meta13467 = meta13467;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13466.cljs$lang$type = true;
cljs.core.async.t13466.cljs$lang$ctorStr = "cljs.core.async/t13466";
cljs.core.async.t13466.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t13466");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$ = true;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){var self__ = this;
var ___$1 = this;cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.solo_modes.call(null,mode)))
{} else
{throw (new Error(("Assert failed: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(("mode must be one of: "+cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)))+"\n"+cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null)))))));
}
cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);
return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13466.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){var self__ = this;
var ___$1 = this;return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_13468){var self__ = this;
var _13468__$1 = this;return self__.meta13467;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.t13466.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_13468,meta13467__$1){var self__ = this;
var _13468__$1 = this;return (new cljs.core.async.t13466(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta13467__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
cljs.core.async.__GT_t13466 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function __GT_t13466(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta13467){return (new cljs.core.async.t13466(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta13467));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;
}
return (new cljs.core.async.t13466(change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,null));
})();var c__5663__auto___13585 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_13538){var state_val_13539 = (state_13538[(1)]);if((state_val_13539 === (7)))
{var inst_13482 = (state_13538[(7)]);var inst_13487 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13482);var state_13538__$1 = state_13538;var statearr_13540_13586 = state_13538__$1;(statearr_13540_13586[(2)] = inst_13487);
(statearr_13540_13586[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (20)))
{var inst_13497 = (state_13538[(8)]);var state_13538__$1 = state_13538;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13538__$1,(23),out,inst_13497);
} else
{if((state_val_13539 === (1)))
{var inst_13472 = (state_13538[(9)]);var inst_13472__$1 = calc_state.call(null);var inst_13473 = cljs.core.seq_QMARK_.call(null,inst_13472__$1);var state_13538__$1 = (function (){var statearr_13541 = state_13538;(statearr_13541[(9)] = inst_13472__$1);
return statearr_13541;
})();if(inst_13473)
{var statearr_13542_13587 = state_13538__$1;(statearr_13542_13587[(1)] = (2));
} else
{var statearr_13543_13588 = state_13538__$1;(statearr_13543_13588[(1)] = (3));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (24)))
{var inst_13490 = (state_13538[(10)]);var inst_13482 = inst_13490;var state_13538__$1 = (function (){var statearr_13544 = state_13538;(statearr_13544[(7)] = inst_13482);
return statearr_13544;
})();var statearr_13545_13589 = state_13538__$1;(statearr_13545_13589[(2)] = null);
(statearr_13545_13589[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (4)))
{var inst_13472 = (state_13538[(9)]);var inst_13478 = (state_13538[(2)]);var inst_13479 = cljs.core.get.call(null,inst_13478,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_13480 = cljs.core.get.call(null,inst_13478,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_13481 = cljs.core.get.call(null,inst_13478,new cljs.core.Keyword(null,"solos","solos",1441458643));var inst_13482 = inst_13472;var state_13538__$1 = (function (){var statearr_13546 = state_13538;(statearr_13546[(11)] = inst_13479);
(statearr_13546[(7)] = inst_13482);
(statearr_13546[(12)] = inst_13481);
(statearr_13546[(13)] = inst_13480);
return statearr_13546;
})();var statearr_13547_13590 = state_13538__$1;(statearr_13547_13590[(2)] = null);
(statearr_13547_13590[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (15)))
{var state_13538__$1 = state_13538;var statearr_13548_13591 = state_13538__$1;(statearr_13548_13591[(2)] = null);
(statearr_13548_13591[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (21)))
{var inst_13490 = (state_13538[(10)]);var inst_13482 = inst_13490;var state_13538__$1 = (function (){var statearr_13549 = state_13538;(statearr_13549[(7)] = inst_13482);
return statearr_13549;
})();var statearr_13550_13592 = state_13538__$1;(statearr_13550_13592[(2)] = null);
(statearr_13550_13592[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (13)))
{var inst_13534 = (state_13538[(2)]);var state_13538__$1 = state_13538;var statearr_13551_13593 = state_13538__$1;(statearr_13551_13593[(2)] = inst_13534);
(statearr_13551_13593[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (22)))
{var inst_13532 = (state_13538[(2)]);var state_13538__$1 = state_13538;var statearr_13552_13594 = state_13538__$1;(statearr_13552_13594[(2)] = inst_13532);
(statearr_13552_13594[(1)] = (13));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (6)))
{var inst_13536 = (state_13538[(2)]);var state_13538__$1 = state_13538;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13538__$1,inst_13536);
} else
{if((state_val_13539 === (25)))
{var state_13538__$1 = state_13538;var statearr_13553_13595 = state_13538__$1;(statearr_13553_13595[(2)] = null);
(statearr_13553_13595[(1)] = (26));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (17)))
{var inst_13512 = (state_13538[(14)]);var state_13538__$1 = state_13538;var statearr_13554_13596 = state_13538__$1;(statearr_13554_13596[(2)] = inst_13512);
(statearr_13554_13596[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (3)))
{var inst_13472 = (state_13538[(9)]);var state_13538__$1 = state_13538;var statearr_13555_13597 = state_13538__$1;(statearr_13555_13597[(2)] = inst_13472);
(statearr_13555_13597[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (12)))
{var inst_13493 = (state_13538[(15)]);var inst_13498 = (state_13538[(16)]);var inst_13512 = (state_13538[(14)]);var inst_13512__$1 = inst_13493.call(null,inst_13498);var state_13538__$1 = (function (){var statearr_13556 = state_13538;(statearr_13556[(14)] = inst_13512__$1);
return statearr_13556;
})();if(cljs.core.truth_(inst_13512__$1))
{var statearr_13557_13598 = state_13538__$1;(statearr_13557_13598[(1)] = (17));
} else
{var statearr_13558_13599 = state_13538__$1;(statearr_13558_13599[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (2)))
{var inst_13472 = (state_13538[(9)]);var inst_13475 = cljs.core.apply.call(null,cljs.core.hash_map,inst_13472);var state_13538__$1 = state_13538;var statearr_13559_13600 = state_13538__$1;(statearr_13559_13600[(2)] = inst_13475);
(statearr_13559_13600[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (23)))
{var inst_13523 = (state_13538[(2)]);var state_13538__$1 = state_13538;if(cljs.core.truth_(inst_13523))
{var statearr_13560_13601 = state_13538__$1;(statearr_13560_13601[(1)] = (24));
} else
{var statearr_13561_13602 = state_13538__$1;(statearr_13561_13602[(1)] = (25));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (19)))
{var inst_13520 = (state_13538[(2)]);var state_13538__$1 = state_13538;if(cljs.core.truth_(inst_13520))
{var statearr_13562_13603 = state_13538__$1;(statearr_13562_13603[(1)] = (20));
} else
{var statearr_13563_13604 = state_13538__$1;(statearr_13563_13604[(1)] = (21));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (11)))
{var inst_13497 = (state_13538[(8)]);var inst_13503 = (inst_13497 == null);var state_13538__$1 = state_13538;if(cljs.core.truth_(inst_13503))
{var statearr_13564_13605 = state_13538__$1;(statearr_13564_13605[(1)] = (14));
} else
{var statearr_13565_13606 = state_13538__$1;(statearr_13565_13606[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (9)))
{var inst_13490 = (state_13538[(10)]);var inst_13490__$1 = (state_13538[(2)]);var inst_13491 = cljs.core.get.call(null,inst_13490__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));var inst_13492 = cljs.core.get.call(null,inst_13490__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));var inst_13493 = cljs.core.get.call(null,inst_13490__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));var state_13538__$1 = (function (){var statearr_13566 = state_13538;(statearr_13566[(10)] = inst_13490__$1);
(statearr_13566[(17)] = inst_13492);
(statearr_13566[(15)] = inst_13493);
return statearr_13566;
})();return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_13538__$1,(10),inst_13491);
} else
{if((state_val_13539 === (5)))
{var inst_13482 = (state_13538[(7)]);var inst_13485 = cljs.core.seq_QMARK_.call(null,inst_13482);var state_13538__$1 = state_13538;if(inst_13485)
{var statearr_13567_13607 = state_13538__$1;(statearr_13567_13607[(1)] = (7));
} else
{var statearr_13568_13608 = state_13538__$1;(statearr_13568_13608[(1)] = (8));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (14)))
{var inst_13498 = (state_13538[(16)]);var inst_13505 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_13498);var state_13538__$1 = state_13538;var statearr_13569_13609 = state_13538__$1;(statearr_13569_13609[(2)] = inst_13505);
(statearr_13569_13609[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (26)))
{var inst_13528 = (state_13538[(2)]);var state_13538__$1 = state_13538;var statearr_13570_13610 = state_13538__$1;(statearr_13570_13610[(2)] = inst_13528);
(statearr_13570_13610[(1)] = (22));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (16)))
{var inst_13508 = (state_13538[(2)]);var inst_13509 = calc_state.call(null);var inst_13482 = inst_13509;var state_13538__$1 = (function (){var statearr_13571 = state_13538;(statearr_13571[(18)] = inst_13508);
(statearr_13571[(7)] = inst_13482);
return statearr_13571;
})();var statearr_13572_13611 = state_13538__$1;(statearr_13572_13611[(2)] = null);
(statearr_13572_13611[(1)] = (5));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (10)))
{var inst_13497 = (state_13538[(8)]);var inst_13498 = (state_13538[(16)]);var inst_13496 = (state_13538[(2)]);var inst_13497__$1 = cljs.core.nth.call(null,inst_13496,(0),null);var inst_13498__$1 = cljs.core.nth.call(null,inst_13496,(1),null);var inst_13499 = (inst_13497__$1 == null);var inst_13500 = cljs.core._EQ_.call(null,inst_13498__$1,change);var inst_13501 = (inst_13499) || (inst_13500);var state_13538__$1 = (function (){var statearr_13573 = state_13538;(statearr_13573[(8)] = inst_13497__$1);
(statearr_13573[(16)] = inst_13498__$1);
return statearr_13573;
})();if(cljs.core.truth_(inst_13501))
{var statearr_13574_13612 = state_13538__$1;(statearr_13574_13612[(1)] = (11));
} else
{var statearr_13575_13613 = state_13538__$1;(statearr_13575_13613[(1)] = (12));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (18)))
{var inst_13492 = (state_13538[(17)]);var inst_13493 = (state_13538[(15)]);var inst_13498 = (state_13538[(16)]);var inst_13515 = cljs.core.empty_QMARK_.call(null,inst_13493);var inst_13516 = inst_13492.call(null,inst_13498);var inst_13517 = cljs.core.not.call(null,inst_13516);var inst_13518 = (inst_13515) && (inst_13517);var state_13538__$1 = state_13538;var statearr_13576_13614 = state_13538__$1;(statearr_13576_13614[(2)] = inst_13518);
(statearr_13576_13614[(1)] = (19));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13539 === (8)))
{var inst_13482 = (state_13538[(7)]);var state_13538__$1 = state_13538;var statearr_13577_13615 = state_13538__$1;(statearr_13577_13615[(2)] = inst_13482);
(statearr_13577_13615[(1)] = (9));
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
});})(c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;return ((function (switch__5648__auto__,c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_13581 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13581[(0)] = state_machine__5649__auto__);
(statearr_13581[(1)] = (1));
return statearr_13581;
});
var state_machine__5649__auto____1 = (function (state_13538){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_13538);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e13582){if((e13582 instanceof Object))
{var ex__5652__auto__ = e13582;var statearr_13583_13616 = state_13538;(statearr_13583_13616[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13538);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13582;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13617 = state_13538;
state_13538 = G__13617;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_13538){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_13538);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();var state__5665__auto__ = (function (){var statearr_13584 = f__5664__auto__.call(null);(statearr_13584[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___13585);
return statearr_13584;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___13585,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
cljs.core.async.Pub = (function (){var obj13619 = {};return obj13619;
})();
cljs.core.async.sub_STAR_ = (function sub_STAR_(p,v,ch,close_QMARK_){if((function (){var and__3450__auto__ = p;if(and__3450__auto__)
{return p.cljs$core$async$Pub$sub_STAR_$arity$4;
} else
{return and__3450__auto__;
}
})())
{return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else
{var x__4098__auto__ = (((p == null))?null:p);return (function (){var or__3462__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.sub_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
})().call(null,p,v,ch,close_QMARK_);
}
});
cljs.core.async.unsub_STAR_ = (function unsub_STAR_(p,v,ch){if((function (){var and__3450__auto__ = p;if(and__3450__auto__)
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3;
} else
{return and__3450__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else
{var x__4098__auto__ = (((p == null))?null:p);return (function (){var or__3462__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
})().call(null,p,v,ch);
}
});
cljs.core.async.unsub_all_STAR_ = (function() {
var unsub_all_STAR_ = null;
var unsub_all_STAR___1 = (function (p){if((function (){var and__3450__auto__ = p;if(and__3450__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1;
} else
{return and__3450__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else
{var x__4098__auto__ = (((p == null))?null:p);return (function (){var or__3462__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
})().call(null,p);
}
});
var unsub_all_STAR___2 = (function (p,v){if((function (){var and__3450__auto__ = p;if(and__3450__auto__)
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2;
} else
{return and__3450__auto__;
}
})())
{return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else
{var x__4098__auto__ = (((p == null))?null:p);return (function (){var or__3462__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4098__auto__)]);if(or__3462__auto__)
{return or__3462__auto__;
} else
{var or__3462__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);if(or__3462__auto____$1)
{return or__3462__auto____$1;
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
return (function (topic){var or__3462__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);if(cljs.core.truth_(or__3462__auto__))
{return or__3462__auto__;
} else
{return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__3462__auto__,mults){
return (function (p1__13620_SHARP_){if(cljs.core.truth_(p1__13620_SHARP_.call(null,topic)))
{return p1__13620_SHARP_;
} else
{return cljs.core.assoc.call(null,p1__13620_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__3462__auto__,mults))
),topic);
}
});})(mults))
;var p = (function (){if(typeof cljs.core.async.t13743 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t13743 = (function (ensure_mult,mults,buf_fn,topic_fn,ch,pub,meta13744){
this.ensure_mult = ensure_mult;
this.mults = mults;
this.buf_fn = buf_fn;
this.topic_fn = topic_fn;
this.ch = ch;
this.pub = pub;
this.meta13744 = meta13744;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t13743.cljs$lang$type = true;
cljs.core.async.t13743.cljs$lang$ctorStr = "cljs.core.async/t13743";
cljs.core.async.t13743.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t13743");
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$async$Pub$ = true;
cljs.core.async.t13743.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2,close_QMARK_){var self__ = this;
var p__$1 = this;var m = self__.ensure_mult.call(null,topic);return cljs.core.async.tap.call(null,m,ch__$2,close_QMARK_);
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$2){var self__ = this;
var p__$1 = this;var temp__4126__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);if(cljs.core.truth_(temp__4126__auto__))
{var m = temp__4126__auto__;return cljs.core.async.untap.call(null,m,ch__$2);
} else
{return null;
}
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){var self__ = this;
var ___$1 = this;return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$async$Mux$ = true;
cljs.core.async.t13743.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){var self__ = this;
var ___$1 = this;return self__.ch;
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_13745){var self__ = this;
var _13745__$1 = this;return self__.meta13744;
});})(mults,ensure_mult))
;
cljs.core.async.t13743.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_13745,meta13744__$1){var self__ = this;
var _13745__$1 = this;return (new cljs.core.async.t13743(self__.ensure_mult,self__.mults,self__.buf_fn,self__.topic_fn,self__.ch,self__.pub,meta13744__$1));
});})(mults,ensure_mult))
;
cljs.core.async.__GT_t13743 = ((function (mults,ensure_mult){
return (function __GT_t13743(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13744){return (new cljs.core.async.t13743(ensure_mult__$1,mults__$1,buf_fn__$1,topic_fn__$1,ch__$1,pub__$1,meta13744));
});})(mults,ensure_mult))
;
}
return (new cljs.core.async.t13743(ensure_mult,mults,buf_fn,topic_fn,ch,pub,null));
})();var c__5663__auto___13865 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___13865,mults,ensure_mult,p){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___13865,mults,ensure_mult,p){
return (function (state_13817){var state_val_13818 = (state_13817[(1)]);if((state_val_13818 === (7)))
{var inst_13813 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13819_13866 = state_13817__$1;(statearr_13819_13866[(2)] = inst_13813);
(statearr_13819_13866[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (20)))
{var state_13817__$1 = state_13817;var statearr_13820_13867 = state_13817__$1;(statearr_13820_13867[(2)] = null);
(statearr_13820_13867[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (1)))
{var state_13817__$1 = state_13817;var statearr_13821_13868 = state_13817__$1;(statearr_13821_13868[(2)] = null);
(statearr_13821_13868[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (24)))
{var inst_13796 = (state_13817[(7)]);var inst_13805 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_13796);var state_13817__$1 = state_13817;var statearr_13822_13869 = state_13817__$1;(statearr_13822_13869[(2)] = inst_13805);
(statearr_13822_13869[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (4)))
{var inst_13748 = (state_13817[(8)]);var inst_13748__$1 = (state_13817[(2)]);var inst_13749 = (inst_13748__$1 == null);var state_13817__$1 = (function (){var statearr_13823 = state_13817;(statearr_13823[(8)] = inst_13748__$1);
return statearr_13823;
})();if(cljs.core.truth_(inst_13749))
{var statearr_13824_13870 = state_13817__$1;(statearr_13824_13870[(1)] = (5));
} else
{var statearr_13825_13871 = state_13817__$1;(statearr_13825_13871[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (15)))
{var inst_13790 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13826_13872 = state_13817__$1;(statearr_13826_13872[(2)] = inst_13790);
(statearr_13826_13872[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (21)))
{var inst_13810 = (state_13817[(2)]);var state_13817__$1 = (function (){var statearr_13827 = state_13817;(statearr_13827[(9)] = inst_13810);
return statearr_13827;
})();var statearr_13828_13873 = state_13817__$1;(statearr_13828_13873[(2)] = null);
(statearr_13828_13873[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (13)))
{var inst_13772 = (state_13817[(10)]);var inst_13774 = cljs.core.chunked_seq_QMARK_.call(null,inst_13772);var state_13817__$1 = state_13817;if(inst_13774)
{var statearr_13829_13874 = state_13817__$1;(statearr_13829_13874[(1)] = (16));
} else
{var statearr_13830_13875 = state_13817__$1;(statearr_13830_13875[(1)] = (17));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (22)))
{var inst_13802 = (state_13817[(2)]);var state_13817__$1 = state_13817;if(cljs.core.truth_(inst_13802))
{var statearr_13831_13876 = state_13817__$1;(statearr_13831_13876[(1)] = (23));
} else
{var statearr_13832_13877 = state_13817__$1;(statearr_13832_13877[(1)] = (24));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (6)))
{var inst_13748 = (state_13817[(8)]);var inst_13798 = (state_13817[(11)]);var inst_13796 = (state_13817[(7)]);var inst_13796__$1 = topic_fn.call(null,inst_13748);var inst_13797 = cljs.core.deref.call(null,mults);var inst_13798__$1 = cljs.core.get.call(null,inst_13797,inst_13796__$1);var state_13817__$1 = (function (){var statearr_13833 = state_13817;(statearr_13833[(11)] = inst_13798__$1);
(statearr_13833[(7)] = inst_13796__$1);
return statearr_13833;
})();if(cljs.core.truth_(inst_13798__$1))
{var statearr_13834_13878 = state_13817__$1;(statearr_13834_13878[(1)] = (19));
} else
{var statearr_13835_13879 = state_13817__$1;(statearr_13835_13879[(1)] = (20));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (25)))
{var inst_13807 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13836_13880 = state_13817__$1;(statearr_13836_13880[(2)] = inst_13807);
(statearr_13836_13880[(1)] = (21));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (17)))
{var inst_13772 = (state_13817[(10)]);var inst_13781 = cljs.core.first.call(null,inst_13772);var inst_13782 = cljs.core.async.muxch_STAR_.call(null,inst_13781);var inst_13783 = cljs.core.async.close_BANG_.call(null,inst_13782);var inst_13784 = cljs.core.next.call(null,inst_13772);var inst_13758 = inst_13784;var inst_13759 = null;var inst_13760 = (0);var inst_13761 = (0);var state_13817__$1 = (function (){var statearr_13837 = state_13817;(statearr_13837[(12)] = inst_13761);
(statearr_13837[(13)] = inst_13760);
(statearr_13837[(14)] = inst_13758);
(statearr_13837[(15)] = inst_13783);
(statearr_13837[(16)] = inst_13759);
return statearr_13837;
})();var statearr_13838_13881 = state_13817__$1;(statearr_13838_13881[(2)] = null);
(statearr_13838_13881[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (3)))
{var inst_13815 = (state_13817[(2)]);var state_13817__$1 = state_13817;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_13817__$1,inst_13815);
} else
{if((state_val_13818 === (12)))
{var inst_13792 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13839_13882 = state_13817__$1;(statearr_13839_13882[(2)] = inst_13792);
(statearr_13839_13882[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (2)))
{var state_13817__$1 = state_13817;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_13817__$1,(4),ch);
} else
{if((state_val_13818 === (23)))
{var state_13817__$1 = state_13817;var statearr_13840_13883 = state_13817__$1;(statearr_13840_13883[(2)] = null);
(statearr_13840_13883[(1)] = (25));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (19)))
{var inst_13748 = (state_13817[(8)]);var inst_13798 = (state_13817[(11)]);var inst_13800 = cljs.core.async.muxch_STAR_.call(null,inst_13798);var state_13817__$1 = state_13817;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_13817__$1,(22),inst_13800,inst_13748);
} else
{if((state_val_13818 === (11)))
{var inst_13772 = (state_13817[(10)]);var inst_13758 = (state_13817[(14)]);var inst_13772__$1 = cljs.core.seq.call(null,inst_13758);var state_13817__$1 = (function (){var statearr_13841 = state_13817;(statearr_13841[(10)] = inst_13772__$1);
return statearr_13841;
})();if(inst_13772__$1)
{var statearr_13842_13884 = state_13817__$1;(statearr_13842_13884[(1)] = (13));
} else
{var statearr_13843_13885 = state_13817__$1;(statearr_13843_13885[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (9)))
{var inst_13794 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13844_13886 = state_13817__$1;(statearr_13844_13886[(2)] = inst_13794);
(statearr_13844_13886[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (5)))
{var inst_13755 = cljs.core.deref.call(null,mults);var inst_13756 = cljs.core.vals.call(null,inst_13755);var inst_13757 = cljs.core.seq.call(null,inst_13756);var inst_13758 = inst_13757;var inst_13759 = null;var inst_13760 = (0);var inst_13761 = (0);var state_13817__$1 = (function (){var statearr_13845 = state_13817;(statearr_13845[(12)] = inst_13761);
(statearr_13845[(13)] = inst_13760);
(statearr_13845[(14)] = inst_13758);
(statearr_13845[(16)] = inst_13759);
return statearr_13845;
})();var statearr_13846_13887 = state_13817__$1;(statearr_13846_13887[(2)] = null);
(statearr_13846_13887[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (14)))
{var state_13817__$1 = state_13817;var statearr_13850_13888 = state_13817__$1;(statearr_13850_13888[(2)] = null);
(statearr_13850_13888[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (16)))
{var inst_13772 = (state_13817[(10)]);var inst_13776 = cljs.core.chunk_first.call(null,inst_13772);var inst_13777 = cljs.core.chunk_rest.call(null,inst_13772);var inst_13778 = cljs.core.count.call(null,inst_13776);var inst_13758 = inst_13777;var inst_13759 = inst_13776;var inst_13760 = inst_13778;var inst_13761 = (0);var state_13817__$1 = (function (){var statearr_13851 = state_13817;(statearr_13851[(12)] = inst_13761);
(statearr_13851[(13)] = inst_13760);
(statearr_13851[(14)] = inst_13758);
(statearr_13851[(16)] = inst_13759);
return statearr_13851;
})();var statearr_13852_13889 = state_13817__$1;(statearr_13852_13889[(2)] = null);
(statearr_13852_13889[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (10)))
{var inst_13761 = (state_13817[(12)]);var inst_13760 = (state_13817[(13)]);var inst_13758 = (state_13817[(14)]);var inst_13759 = (state_13817[(16)]);var inst_13766 = cljs.core._nth.call(null,inst_13759,inst_13761);var inst_13767 = cljs.core.async.muxch_STAR_.call(null,inst_13766);var inst_13768 = cljs.core.async.close_BANG_.call(null,inst_13767);var inst_13769 = (inst_13761 + (1));var tmp13847 = inst_13760;var tmp13848 = inst_13758;var tmp13849 = inst_13759;var inst_13758__$1 = tmp13848;var inst_13759__$1 = tmp13849;var inst_13760__$1 = tmp13847;var inst_13761__$1 = inst_13769;var state_13817__$1 = (function (){var statearr_13853 = state_13817;(statearr_13853[(12)] = inst_13761__$1);
(statearr_13853[(13)] = inst_13760__$1);
(statearr_13853[(14)] = inst_13758__$1);
(statearr_13853[(17)] = inst_13768);
(statearr_13853[(16)] = inst_13759__$1);
return statearr_13853;
})();var statearr_13854_13890 = state_13817__$1;(statearr_13854_13890[(2)] = null);
(statearr_13854_13890[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (18)))
{var inst_13787 = (state_13817[(2)]);var state_13817__$1 = state_13817;var statearr_13855_13891 = state_13817__$1;(statearr_13855_13891[(2)] = inst_13787);
(statearr_13855_13891[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_13818 === (8)))
{var inst_13761 = (state_13817[(12)]);var inst_13760 = (state_13817[(13)]);var inst_13763 = (inst_13761 < inst_13760);var inst_13764 = inst_13763;var state_13817__$1 = state_13817;if(cljs.core.truth_(inst_13764))
{var statearr_13856_13892 = state_13817__$1;(statearr_13856_13892[(1)] = (10));
} else
{var statearr_13857_13893 = state_13817__$1;(statearr_13857_13893[(1)] = (11));
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
});})(c__5663__auto___13865,mults,ensure_mult,p))
;return ((function (switch__5648__auto__,c__5663__auto___13865,mults,ensure_mult,p){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_13861 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_13861[(0)] = state_machine__5649__auto__);
(statearr_13861[(1)] = (1));
return statearr_13861;
});
var state_machine__5649__auto____1 = (function (state_13817){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_13817);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e13862){if((e13862 instanceof Object))
{var ex__5652__auto__ = e13862;var statearr_13863_13894 = state_13817;(statearr_13863_13894[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_13817);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e13862;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__13895 = state_13817;
state_13817 = G__13895;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_13817){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_13817);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___13865,mults,ensure_mult,p))
})();var state__5665__auto__ = (function (){var statearr_13864 = f__5664__auto__.call(null);(statearr_13864[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___13865);
return statearr_13864;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___13865,mults,ensure_mult,p))
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
,cljs.core.range.call(null,cnt));var c__5663__auto___14032 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_14002){var state_val_14003 = (state_14002[(1)]);if((state_val_14003 === (7)))
{var state_14002__$1 = state_14002;var statearr_14004_14033 = state_14002__$1;(statearr_14004_14033[(2)] = null);
(statearr_14004_14033[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (1)))
{var state_14002__$1 = state_14002;var statearr_14005_14034 = state_14002__$1;(statearr_14005_14034[(2)] = null);
(statearr_14005_14034[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (4)))
{var inst_13966 = (state_14002[(7)]);var inst_13968 = (inst_13966 < cnt);var state_14002__$1 = state_14002;if(cljs.core.truth_(inst_13968))
{var statearr_14006_14035 = state_14002__$1;(statearr_14006_14035[(1)] = (6));
} else
{var statearr_14007_14036 = state_14002__$1;(statearr_14007_14036[(1)] = (7));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (15)))
{var inst_13998 = (state_14002[(2)]);var state_14002__$1 = state_14002;var statearr_14008_14037 = state_14002__$1;(statearr_14008_14037[(2)] = inst_13998);
(statearr_14008_14037[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (13)))
{var inst_13991 = cljs.core.async.close_BANG_.call(null,out);var state_14002__$1 = state_14002;var statearr_14009_14038 = state_14002__$1;(statearr_14009_14038[(2)] = inst_13991);
(statearr_14009_14038[(1)] = (15));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (6)))
{var state_14002__$1 = state_14002;var statearr_14010_14039 = state_14002__$1;(statearr_14010_14039[(2)] = null);
(statearr_14010_14039[(1)] = (11));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (3)))
{var inst_14000 = (state_14002[(2)]);var state_14002__$1 = state_14002;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14002__$1,inst_14000);
} else
{if((state_val_14003 === (12)))
{var inst_13988 = (state_14002[(8)]);var inst_13988__$1 = (state_14002[(2)]);var inst_13989 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_13988__$1);var state_14002__$1 = (function (){var statearr_14011 = state_14002;(statearr_14011[(8)] = inst_13988__$1);
return statearr_14011;
})();if(cljs.core.truth_(inst_13989))
{var statearr_14012_14040 = state_14002__$1;(statearr_14012_14040[(1)] = (13));
} else
{var statearr_14013_14041 = state_14002__$1;(statearr_14013_14041[(1)] = (14));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (2)))
{var inst_13965 = cljs.core.reset_BANG_.call(null,dctr,cnt);var inst_13966 = (0);var state_14002__$1 = (function (){var statearr_14014 = state_14002;(statearr_14014[(7)] = inst_13966);
(statearr_14014[(9)] = inst_13965);
return statearr_14014;
})();var statearr_14015_14042 = state_14002__$1;(statearr_14015_14042[(2)] = null);
(statearr_14015_14042[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (11)))
{var inst_13966 = (state_14002[(7)]);var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_14002,(10),Object,null,(9));var inst_13975 = chs__$1.call(null,inst_13966);var inst_13976 = done.call(null,inst_13966);var inst_13977 = cljs.core.async.take_BANG_.call(null,inst_13975,inst_13976);var state_14002__$1 = state_14002;var statearr_14016_14043 = state_14002__$1;(statearr_14016_14043[(2)] = inst_13977);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14002__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (9)))
{var inst_13966 = (state_14002[(7)]);var inst_13979 = (state_14002[(2)]);var inst_13980 = (inst_13966 + (1));var inst_13966__$1 = inst_13980;var state_14002__$1 = (function (){var statearr_14017 = state_14002;(statearr_14017[(7)] = inst_13966__$1);
(statearr_14017[(10)] = inst_13979);
return statearr_14017;
})();var statearr_14018_14044 = state_14002__$1;(statearr_14018_14044[(2)] = null);
(statearr_14018_14044[(1)] = (4));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (5)))
{var inst_13986 = (state_14002[(2)]);var state_14002__$1 = (function (){var statearr_14019 = state_14002;(statearr_14019[(11)] = inst_13986);
return statearr_14019;
})();return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14002__$1,(12),dchan);
} else
{if((state_val_14003 === (14)))
{var inst_13988 = (state_14002[(8)]);var inst_13993 = cljs.core.apply.call(null,f,inst_13988);var state_14002__$1 = state_14002;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14002__$1,(16),out,inst_13993);
} else
{if((state_val_14003 === (16)))
{var inst_13995 = (state_14002[(2)]);var state_14002__$1 = (function (){var statearr_14020 = state_14002;(statearr_14020[(12)] = inst_13995);
return statearr_14020;
})();var statearr_14021_14045 = state_14002__$1;(statearr_14021_14045[(2)] = null);
(statearr_14021_14045[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (10)))
{var inst_13970 = (state_14002[(2)]);var inst_13971 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);var state_14002__$1 = (function (){var statearr_14022 = state_14002;(statearr_14022[(13)] = inst_13970);
return statearr_14022;
})();var statearr_14023_14046 = state_14002__$1;(statearr_14023_14046[(2)] = inst_13971);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14002__$1);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14003 === (8)))
{var inst_13984 = (state_14002[(2)]);var state_14002__$1 = state_14002;var statearr_14024_14047 = state_14002__$1;(statearr_14024_14047[(2)] = inst_13984);
(statearr_14024_14047[(1)] = (5));
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
});})(c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done))
;return ((function (switch__5648__auto__,c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14028 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14028[(0)] = state_machine__5649__auto__);
(statearr_14028[(1)] = (1));
return statearr_14028;
});
var state_machine__5649__auto____1 = (function (state_14002){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14002);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14029){if((e14029 instanceof Object))
{var ex__5652__auto__ = e14029;var statearr_14030_14048 = state_14002;(statearr_14030_14048[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14002);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14029;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14049 = state_14002;
state_14002 = G__14049;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14002){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14002);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done))
})();var state__5665__auto__ = (function (){var statearr_14031 = f__5664__auto__.call(null);(statearr_14031[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14032);
return statearr_14031;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14032,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var merge__2 = (function (chs,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___14157 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14157,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14157,out){
return (function (state_14133){var state_val_14134 = (state_14133[(1)]);if((state_val_14134 === (7)))
{var inst_14112 = (state_14133[(7)]);var inst_14113 = (state_14133[(8)]);var inst_14112__$1 = (state_14133[(2)]);var inst_14113__$1 = cljs.core.nth.call(null,inst_14112__$1,(0),null);var inst_14114 = cljs.core.nth.call(null,inst_14112__$1,(1),null);var inst_14115 = (inst_14113__$1 == null);var state_14133__$1 = (function (){var statearr_14135 = state_14133;(statearr_14135[(7)] = inst_14112__$1);
(statearr_14135[(8)] = inst_14113__$1);
(statearr_14135[(9)] = inst_14114);
return statearr_14135;
})();if(cljs.core.truth_(inst_14115))
{var statearr_14136_14158 = state_14133__$1;(statearr_14136_14158[(1)] = (8));
} else
{var statearr_14137_14159 = state_14133__$1;(statearr_14137_14159[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (1)))
{var inst_14104 = cljs.core.vec.call(null,chs);var inst_14105 = inst_14104;var state_14133__$1 = (function (){var statearr_14138 = state_14133;(statearr_14138[(10)] = inst_14105);
return statearr_14138;
})();var statearr_14139_14160 = state_14133__$1;(statearr_14139_14160[(2)] = null);
(statearr_14139_14160[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (4)))
{var inst_14105 = (state_14133[(10)]);var state_14133__$1 = state_14133;return cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_.call(null,state_14133__$1,(7),inst_14105);
} else
{if((state_val_14134 === (6)))
{var inst_14129 = (state_14133[(2)]);var state_14133__$1 = state_14133;var statearr_14140_14161 = state_14133__$1;(statearr_14140_14161[(2)] = inst_14129);
(statearr_14140_14161[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (3)))
{var inst_14131 = (state_14133[(2)]);var state_14133__$1 = state_14133;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14133__$1,inst_14131);
} else
{if((state_val_14134 === (2)))
{var inst_14105 = (state_14133[(10)]);var inst_14107 = cljs.core.count.call(null,inst_14105);var inst_14108 = (inst_14107 > (0));var state_14133__$1 = state_14133;if(cljs.core.truth_(inst_14108))
{var statearr_14142_14162 = state_14133__$1;(statearr_14142_14162[(1)] = (4));
} else
{var statearr_14143_14163 = state_14133__$1;(statearr_14143_14163[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (11)))
{var inst_14105 = (state_14133[(10)]);var inst_14122 = (state_14133[(2)]);var tmp14141 = inst_14105;var inst_14105__$1 = tmp14141;var state_14133__$1 = (function (){var statearr_14144 = state_14133;(statearr_14144[(11)] = inst_14122);
(statearr_14144[(10)] = inst_14105__$1);
return statearr_14144;
})();var statearr_14145_14164 = state_14133__$1;(statearr_14145_14164[(2)] = null);
(statearr_14145_14164[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (9)))
{var inst_14113 = (state_14133[(8)]);var state_14133__$1 = state_14133;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14133__$1,(11),out,inst_14113);
} else
{if((state_val_14134 === (5)))
{var inst_14127 = cljs.core.async.close_BANG_.call(null,out);var state_14133__$1 = state_14133;var statearr_14146_14165 = state_14133__$1;(statearr_14146_14165[(2)] = inst_14127);
(statearr_14146_14165[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (10)))
{var inst_14125 = (state_14133[(2)]);var state_14133__$1 = state_14133;var statearr_14147_14166 = state_14133__$1;(statearr_14147_14166[(2)] = inst_14125);
(statearr_14147_14166[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14134 === (8)))
{var inst_14112 = (state_14133[(7)]);var inst_14105 = (state_14133[(10)]);var inst_14113 = (state_14133[(8)]);var inst_14114 = (state_14133[(9)]);var inst_14117 = (function (){var c = inst_14114;var v = inst_14113;var vec__14110 = inst_14112;var cs = inst_14105;return ((function (c,v,vec__14110,cs,inst_14112,inst_14105,inst_14113,inst_14114,state_val_14134,c__5663__auto___14157,out){
return (function (p1__14050_SHARP_){return cljs.core.not_EQ_.call(null,c,p1__14050_SHARP_);
});
;})(c,v,vec__14110,cs,inst_14112,inst_14105,inst_14113,inst_14114,state_val_14134,c__5663__auto___14157,out))
})();var inst_14118 = cljs.core.filterv.call(null,inst_14117,inst_14105);var inst_14105__$1 = inst_14118;var state_14133__$1 = (function (){var statearr_14148 = state_14133;(statearr_14148[(10)] = inst_14105__$1);
return statearr_14148;
})();var statearr_14149_14167 = state_14133__$1;(statearr_14149_14167[(2)] = null);
(statearr_14149_14167[(1)] = (2));
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
});})(c__5663__auto___14157,out))
;return ((function (switch__5648__auto__,c__5663__auto___14157,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14153 = [null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14153[(0)] = state_machine__5649__auto__);
(statearr_14153[(1)] = (1));
return statearr_14153;
});
var state_machine__5649__auto____1 = (function (state_14133){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14133);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14154){if((e14154 instanceof Object))
{var ex__5652__auto__ = e14154;var statearr_14155_14168 = state_14133;(statearr_14155_14168[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14133);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14154;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14169 = state_14133;
state_14133 = G__14169;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14133){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14133);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14157,out))
})();var state__5665__auto__ = (function (){var statearr_14156 = f__5664__auto__.call(null);(statearr_14156[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14157);
return statearr_14156;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14157,out))
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
var take__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___14262 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14262,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14262,out){
return (function (state_14239){var state_val_14240 = (state_14239[(1)]);if((state_val_14240 === (7)))
{var inst_14221 = (state_14239[(7)]);var inst_14221__$1 = (state_14239[(2)]);var inst_14222 = (inst_14221__$1 == null);var inst_14223 = cljs.core.not.call(null,inst_14222);var state_14239__$1 = (function (){var statearr_14241 = state_14239;(statearr_14241[(7)] = inst_14221__$1);
return statearr_14241;
})();if(inst_14223)
{var statearr_14242_14263 = state_14239__$1;(statearr_14242_14263[(1)] = (8));
} else
{var statearr_14243_14264 = state_14239__$1;(statearr_14243_14264[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (1)))
{var inst_14216 = (0);var state_14239__$1 = (function (){var statearr_14244 = state_14239;(statearr_14244[(8)] = inst_14216);
return statearr_14244;
})();var statearr_14245_14265 = state_14239__$1;(statearr_14245_14265[(2)] = null);
(statearr_14245_14265[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (4)))
{var state_14239__$1 = state_14239;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14239__$1,(7),ch);
} else
{if((state_val_14240 === (6)))
{var inst_14234 = (state_14239[(2)]);var state_14239__$1 = state_14239;var statearr_14246_14266 = state_14239__$1;(statearr_14246_14266[(2)] = inst_14234);
(statearr_14246_14266[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (3)))
{var inst_14236 = (state_14239[(2)]);var inst_14237 = cljs.core.async.close_BANG_.call(null,out);var state_14239__$1 = (function (){var statearr_14247 = state_14239;(statearr_14247[(9)] = inst_14236);
return statearr_14247;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14239__$1,inst_14237);
} else
{if((state_val_14240 === (2)))
{var inst_14216 = (state_14239[(8)]);var inst_14218 = (inst_14216 < n);var state_14239__$1 = state_14239;if(cljs.core.truth_(inst_14218))
{var statearr_14248_14267 = state_14239__$1;(statearr_14248_14267[(1)] = (4));
} else
{var statearr_14249_14268 = state_14239__$1;(statearr_14249_14268[(1)] = (5));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (11)))
{var inst_14216 = (state_14239[(8)]);var inst_14226 = (state_14239[(2)]);var inst_14227 = (inst_14216 + (1));var inst_14216__$1 = inst_14227;var state_14239__$1 = (function (){var statearr_14250 = state_14239;(statearr_14250[(8)] = inst_14216__$1);
(statearr_14250[(10)] = inst_14226);
return statearr_14250;
})();var statearr_14251_14269 = state_14239__$1;(statearr_14251_14269[(2)] = null);
(statearr_14251_14269[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (9)))
{var state_14239__$1 = state_14239;var statearr_14252_14270 = state_14239__$1;(statearr_14252_14270[(2)] = null);
(statearr_14252_14270[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (5)))
{var state_14239__$1 = state_14239;var statearr_14253_14271 = state_14239__$1;(statearr_14253_14271[(2)] = null);
(statearr_14253_14271[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (10)))
{var inst_14231 = (state_14239[(2)]);var state_14239__$1 = state_14239;var statearr_14254_14272 = state_14239__$1;(statearr_14254_14272[(2)] = inst_14231);
(statearr_14254_14272[(1)] = (6));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14240 === (8)))
{var inst_14221 = (state_14239[(7)]);var state_14239__$1 = state_14239;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14239__$1,(11),out,inst_14221);
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
});})(c__5663__auto___14262,out))
;return ((function (switch__5648__auto__,c__5663__auto___14262,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14258 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_14258[(0)] = state_machine__5649__auto__);
(statearr_14258[(1)] = (1));
return statearr_14258;
});
var state_machine__5649__auto____1 = (function (state_14239){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14239);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14259){if((e14259 instanceof Object))
{var ex__5652__auto__ = e14259;var statearr_14260_14273 = state_14239;(statearr_14260_14273[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14239);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14259;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14274 = state_14239;
state_14239 = G__14274;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14239){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14239);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14262,out))
})();var state__5665__auto__ = (function (){var statearr_14261 = f__5664__auto__.call(null);(statearr_14261[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14262);
return statearr_14261;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14262,out))
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
cljs.core.async.map_LT_ = (function map_LT_(f,ch){if(typeof cljs.core.async.t14282 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14282 = (function (ch,f,map_LT_,meta14283){
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta14283 = meta14283;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14282.cljs$lang$type = true;
cljs.core.async.t14282.cljs$lang$ctorStr = "cljs.core.async/t14282";
cljs.core.async.t14282.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t14282");
});
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){if(typeof cljs.core.async.t14285 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14285 = (function (fn1,_,meta14283,ch,f,map_LT_,meta14286){
this.fn1 = fn1;
this._ = _;
this.meta14283 = meta14283;
this.ch = ch;
this.f = f;
this.map_LT_ = map_LT_;
this.meta14286 = meta14286;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14285.cljs$lang$type = true;
cljs.core.async.t14285.cljs$lang$ctorStr = "cljs.core.async/t14285";
cljs.core.async.t14285.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t14285");
});})(___$1))
;
cljs.core.async.t14285.prototype.cljs$core$async$impl$protocols$Handler$ = true;
cljs.core.async.t14285.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t14285.prototype.cljs$core$async$impl$protocols$Handler$lock_id$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;return cljs.core.async.impl.protocols.lock_id.call(null,self__.fn1);
});})(___$1))
;
cljs.core.async.t14285.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$3){var self__ = this;
var ___$4 = this;var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);return ((function (f1,___$4,___$1){
return (function (p1__14275_SHARP_){return f1.call(null,(((p1__14275_SHARP_ == null))?null:self__.f.call(null,p1__14275_SHARP_)));
});
;})(f1,___$4,___$1))
});})(___$1))
;
cljs.core.async.t14285.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_14287){var self__ = this;
var _14287__$1 = this;return self__.meta14286;
});})(___$1))
;
cljs.core.async.t14285.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_14287,meta14286__$1){var self__ = this;
var _14287__$1 = this;return (new cljs.core.async.t14285(self__.fn1,self__._,self__.meta14283,self__.ch,self__.f,self__.map_LT_,meta14286__$1));
});})(___$1))
;
cljs.core.async.__GT_t14285 = ((function (___$1){
return (function __GT_t14285(fn1__$1,___$2,meta14283__$1,ch__$2,f__$2,map_LT___$2,meta14286){return (new cljs.core.async.t14285(fn1__$1,___$2,meta14283__$1,ch__$2,f__$2,map_LT___$2,meta14286));
});})(___$1))
;
}
return (new cljs.core.async.t14285(fn1,___$1,self__.meta14283,self__.ch,self__.f,self__.map_LT_,null));
})());if(cljs.core.truth_((function (){var and__3450__auto__ = ret;if(cljs.core.truth_(and__3450__auto__))
{return !((cljs.core.deref.call(null,ret) == null));
} else
{return and__3450__auto__;
}
})()))
{return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else
{return ret;
}
});
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14282.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t14282.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14284){var self__ = this;
var _14284__$1 = this;return self__.meta14283;
});
cljs.core.async.t14282.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14284,meta14283__$1){var self__ = this;
var _14284__$1 = this;return (new cljs.core.async.t14282(self__.ch,self__.f,self__.map_LT_,meta14283__$1));
});
cljs.core.async.__GT_t14282 = (function __GT_t14282(ch__$1,f__$1,map_LT___$1,meta14283){return (new cljs.core.async.t14282(ch__$1,f__$1,map_LT___$1,meta14283));
});
}
return (new cljs.core.async.t14282(ch,f,map_LT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.map_GT_ = (function map_GT_(f,ch){if(typeof cljs.core.async.t14291 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14291 = (function (ch,f,map_GT_,meta14292){
this.ch = ch;
this.f = f;
this.map_GT_ = map_GT_;
this.meta14292 = meta14292;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14291.cljs$lang$type = true;
cljs.core.async.t14291.cljs$lang$ctorStr = "cljs.core.async/t14291";
cljs.core.async.t14291.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t14291");
});
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14291.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14291.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14293){var self__ = this;
var _14293__$1 = this;return self__.meta14292;
});
cljs.core.async.t14291.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14293,meta14292__$1){var self__ = this;
var _14293__$1 = this;return (new cljs.core.async.t14291(self__.ch,self__.f,self__.map_GT_,meta14292__$1));
});
cljs.core.async.__GT_t14291 = (function __GT_t14291(ch__$1,f__$1,map_GT___$1,meta14292){return (new cljs.core.async.t14291(ch__$1,f__$1,map_GT___$1,meta14292));
});
}
return (new cljs.core.async.t14291(ch,f,map_GT_,null));
});
/**
* Deprecated - this function will be removed. Use transducer instead
*/
cljs.core.async.filter_GT_ = (function filter_GT_(p,ch){if(typeof cljs.core.async.t14297 !== 'undefined')
{} else
{
/**
* @constructor
*/
cljs.core.async.t14297 = (function (ch,p,filter_GT_,meta14298){
this.ch = ch;
this.p = p;
this.filter_GT_ = filter_GT_;
this.meta14298 = meta14298;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
cljs.core.async.t14297.cljs$lang$type = true;
cljs.core.async.t14297.cljs$lang$ctorStr = "cljs.core.async/t14297";
cljs.core.async.t14297.cljs$lang$ctorPrWriter = (function (this__4038__auto__,writer__4039__auto__,opt__4040__auto__){return cljs.core._write.call(null,writer__4039__auto__,"cljs.core.async/t14297");
});
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$WritePort$ = true;
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){var self__ = this;
var ___$1 = this;if(cljs.core.truth_(self__.p.call(null,val)))
{return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else
{return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$Channel$ = true;
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});
cljs.core.async.t14297.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){var self__ = this;
var ___$1 = this;return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});
cljs.core.async.t14297.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_14299){var self__ = this;
var _14299__$1 = this;return self__.meta14298;
});
cljs.core.async.t14297.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_14299,meta14298__$1){var self__ = this;
var _14299__$1 = this;return (new cljs.core.async.t14297(self__.ch,self__.p,self__.filter_GT_,meta14298__$1));
});
cljs.core.async.__GT_t14297 = (function __GT_t14297(ch__$1,p__$1,filter_GT___$1,meta14298){return (new cljs.core.async.t14297(ch__$1,p__$1,filter_GT___$1,meta14298));
});
}
return (new cljs.core.async.t14297(ch,p,filter_GT_,null));
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
var filter_LT___3 = (function (p,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___14382 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14382,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14382,out){
return (function (state_14361){var state_val_14362 = (state_14361[(1)]);if((state_val_14362 === (7)))
{var inst_14357 = (state_14361[(2)]);var state_14361__$1 = state_14361;var statearr_14363_14383 = state_14361__$1;(statearr_14363_14383[(2)] = inst_14357);
(statearr_14363_14383[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (1)))
{var state_14361__$1 = state_14361;var statearr_14364_14384 = state_14361__$1;(statearr_14364_14384[(2)] = null);
(statearr_14364_14384[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (4)))
{var inst_14343 = (state_14361[(7)]);var inst_14343__$1 = (state_14361[(2)]);var inst_14344 = (inst_14343__$1 == null);var state_14361__$1 = (function (){var statearr_14365 = state_14361;(statearr_14365[(7)] = inst_14343__$1);
return statearr_14365;
})();if(cljs.core.truth_(inst_14344))
{var statearr_14366_14385 = state_14361__$1;(statearr_14366_14385[(1)] = (5));
} else
{var statearr_14367_14386 = state_14361__$1;(statearr_14367_14386[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (6)))
{var inst_14343 = (state_14361[(7)]);var inst_14348 = p.call(null,inst_14343);var state_14361__$1 = state_14361;if(cljs.core.truth_(inst_14348))
{var statearr_14368_14387 = state_14361__$1;(statearr_14368_14387[(1)] = (8));
} else
{var statearr_14369_14388 = state_14361__$1;(statearr_14369_14388[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (3)))
{var inst_14359 = (state_14361[(2)]);var state_14361__$1 = state_14361;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14361__$1,inst_14359);
} else
{if((state_val_14362 === (2)))
{var state_14361__$1 = state_14361;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14361__$1,(4),ch);
} else
{if((state_val_14362 === (11)))
{var inst_14351 = (state_14361[(2)]);var state_14361__$1 = state_14361;var statearr_14370_14389 = state_14361__$1;(statearr_14370_14389[(2)] = inst_14351);
(statearr_14370_14389[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (9)))
{var state_14361__$1 = state_14361;var statearr_14371_14390 = state_14361__$1;(statearr_14371_14390[(2)] = null);
(statearr_14371_14390[(1)] = (10));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (5)))
{var inst_14346 = cljs.core.async.close_BANG_.call(null,out);var state_14361__$1 = state_14361;var statearr_14372_14391 = state_14361__$1;(statearr_14372_14391[(2)] = inst_14346);
(statearr_14372_14391[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (10)))
{var inst_14354 = (state_14361[(2)]);var state_14361__$1 = (function (){var statearr_14373 = state_14361;(statearr_14373[(8)] = inst_14354);
return statearr_14373;
})();var statearr_14374_14392 = state_14361__$1;(statearr_14374_14392[(2)] = null);
(statearr_14374_14392[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14362 === (8)))
{var inst_14343 = (state_14361[(7)]);var state_14361__$1 = state_14361;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14361__$1,(11),out,inst_14343);
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
});})(c__5663__auto___14382,out))
;return ((function (switch__5648__auto__,c__5663__auto___14382,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14378 = [null,null,null,null,null,null,null,null,null];(statearr_14378[(0)] = state_machine__5649__auto__);
(statearr_14378[(1)] = (1));
return statearr_14378;
});
var state_machine__5649__auto____1 = (function (state_14361){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14361);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14379){if((e14379 instanceof Object))
{var ex__5652__auto__ = e14379;var statearr_14380_14393 = state_14361;(statearr_14380_14393[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14361);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14379;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14394 = state_14361;
state_14361 = G__14394;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14361){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14361);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14382,out))
})();var state__5665__auto__ = (function (){var statearr_14381 = f__5664__auto__.call(null);(statearr_14381[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14382);
return statearr_14381;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14382,out))
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
cljs.core.async.mapcat_STAR_ = (function mapcat_STAR_(f,in$,out){var c__5663__auto__ = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto__){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto__){
return (function (state_14560){var state_val_14561 = (state_14560[(1)]);if((state_val_14561 === (7)))
{var inst_14556 = (state_14560[(2)]);var state_14560__$1 = state_14560;var statearr_14562_14603 = state_14560__$1;(statearr_14562_14603[(2)] = inst_14556);
(statearr_14562_14603[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (20)))
{var inst_14526 = (state_14560[(7)]);var inst_14537 = (state_14560[(2)]);var inst_14538 = cljs.core.next.call(null,inst_14526);var inst_14512 = inst_14538;var inst_14513 = null;var inst_14514 = (0);var inst_14515 = (0);var state_14560__$1 = (function (){var statearr_14563 = state_14560;(statearr_14563[(8)] = inst_14514);
(statearr_14563[(9)] = inst_14512);
(statearr_14563[(10)] = inst_14515);
(statearr_14563[(11)] = inst_14537);
(statearr_14563[(12)] = inst_14513);
return statearr_14563;
})();var statearr_14564_14604 = state_14560__$1;(statearr_14564_14604[(2)] = null);
(statearr_14564_14604[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (1)))
{var state_14560__$1 = state_14560;var statearr_14565_14605 = state_14560__$1;(statearr_14565_14605[(2)] = null);
(statearr_14565_14605[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (4)))
{var inst_14501 = (state_14560[(13)]);var inst_14501__$1 = (state_14560[(2)]);var inst_14502 = (inst_14501__$1 == null);var state_14560__$1 = (function (){var statearr_14566 = state_14560;(statearr_14566[(13)] = inst_14501__$1);
return statearr_14566;
})();if(cljs.core.truth_(inst_14502))
{var statearr_14567_14606 = state_14560__$1;(statearr_14567_14606[(1)] = (5));
} else
{var statearr_14568_14607 = state_14560__$1;(statearr_14568_14607[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (15)))
{var state_14560__$1 = state_14560;var statearr_14572_14608 = state_14560__$1;(statearr_14572_14608[(2)] = null);
(statearr_14572_14608[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (21)))
{var state_14560__$1 = state_14560;var statearr_14573_14609 = state_14560__$1;(statearr_14573_14609[(2)] = null);
(statearr_14573_14609[(1)] = (23));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (13)))
{var inst_14514 = (state_14560[(8)]);var inst_14512 = (state_14560[(9)]);var inst_14515 = (state_14560[(10)]);var inst_14513 = (state_14560[(12)]);var inst_14522 = (state_14560[(2)]);var inst_14523 = (inst_14515 + (1));var tmp14569 = inst_14514;var tmp14570 = inst_14512;var tmp14571 = inst_14513;var inst_14512__$1 = tmp14570;var inst_14513__$1 = tmp14571;var inst_14514__$1 = tmp14569;var inst_14515__$1 = inst_14523;var state_14560__$1 = (function (){var statearr_14574 = state_14560;(statearr_14574[(8)] = inst_14514__$1);
(statearr_14574[(9)] = inst_14512__$1);
(statearr_14574[(14)] = inst_14522);
(statearr_14574[(10)] = inst_14515__$1);
(statearr_14574[(12)] = inst_14513__$1);
return statearr_14574;
})();var statearr_14575_14610 = state_14560__$1;(statearr_14575_14610[(2)] = null);
(statearr_14575_14610[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (22)))
{var state_14560__$1 = state_14560;var statearr_14576_14611 = state_14560__$1;(statearr_14576_14611[(2)] = null);
(statearr_14576_14611[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (6)))
{var inst_14501 = (state_14560[(13)]);var inst_14510 = f.call(null,inst_14501);var inst_14511 = cljs.core.seq.call(null,inst_14510);var inst_14512 = inst_14511;var inst_14513 = null;var inst_14514 = (0);var inst_14515 = (0);var state_14560__$1 = (function (){var statearr_14577 = state_14560;(statearr_14577[(8)] = inst_14514);
(statearr_14577[(9)] = inst_14512);
(statearr_14577[(10)] = inst_14515);
(statearr_14577[(12)] = inst_14513);
return statearr_14577;
})();var statearr_14578_14612 = state_14560__$1;(statearr_14578_14612[(2)] = null);
(statearr_14578_14612[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (17)))
{var inst_14526 = (state_14560[(7)]);var inst_14530 = cljs.core.chunk_first.call(null,inst_14526);var inst_14531 = cljs.core.chunk_rest.call(null,inst_14526);var inst_14532 = cljs.core.count.call(null,inst_14530);var inst_14512 = inst_14531;var inst_14513 = inst_14530;var inst_14514 = inst_14532;var inst_14515 = (0);var state_14560__$1 = (function (){var statearr_14579 = state_14560;(statearr_14579[(8)] = inst_14514);
(statearr_14579[(9)] = inst_14512);
(statearr_14579[(10)] = inst_14515);
(statearr_14579[(12)] = inst_14513);
return statearr_14579;
})();var statearr_14580_14613 = state_14560__$1;(statearr_14580_14613[(2)] = null);
(statearr_14580_14613[(1)] = (8));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (3)))
{var inst_14558 = (state_14560[(2)]);var state_14560__$1 = state_14560;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14560__$1,inst_14558);
} else
{if((state_val_14561 === (12)))
{var inst_14546 = (state_14560[(2)]);var state_14560__$1 = state_14560;var statearr_14581_14614 = state_14560__$1;(statearr_14581_14614[(2)] = inst_14546);
(statearr_14581_14614[(1)] = (9));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (2)))
{var state_14560__$1 = state_14560;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14560__$1,(4),in$);
} else
{if((state_val_14561 === (23)))
{var inst_14554 = (state_14560[(2)]);var state_14560__$1 = state_14560;var statearr_14582_14615 = state_14560__$1;(statearr_14582_14615[(2)] = inst_14554);
(statearr_14582_14615[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (19)))
{var inst_14541 = (state_14560[(2)]);var state_14560__$1 = state_14560;var statearr_14583_14616 = state_14560__$1;(statearr_14583_14616[(2)] = inst_14541);
(statearr_14583_14616[(1)] = (16));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (11)))
{var inst_14512 = (state_14560[(9)]);var inst_14526 = (state_14560[(7)]);var inst_14526__$1 = cljs.core.seq.call(null,inst_14512);var state_14560__$1 = (function (){var statearr_14584 = state_14560;(statearr_14584[(7)] = inst_14526__$1);
return statearr_14584;
})();if(inst_14526__$1)
{var statearr_14585_14617 = state_14560__$1;(statearr_14585_14617[(1)] = (14));
} else
{var statearr_14586_14618 = state_14560__$1;(statearr_14586_14618[(1)] = (15));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (9)))
{var inst_14548 = (state_14560[(2)]);var inst_14549 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);var state_14560__$1 = (function (){var statearr_14587 = state_14560;(statearr_14587[(15)] = inst_14548);
return statearr_14587;
})();if(cljs.core.truth_(inst_14549))
{var statearr_14588_14619 = state_14560__$1;(statearr_14588_14619[(1)] = (21));
} else
{var statearr_14589_14620 = state_14560__$1;(statearr_14589_14620[(1)] = (22));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (5)))
{var inst_14504 = cljs.core.async.close_BANG_.call(null,out);var state_14560__$1 = state_14560;var statearr_14590_14621 = state_14560__$1;(statearr_14590_14621[(2)] = inst_14504);
(statearr_14590_14621[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (14)))
{var inst_14526 = (state_14560[(7)]);var inst_14528 = cljs.core.chunked_seq_QMARK_.call(null,inst_14526);var state_14560__$1 = state_14560;if(inst_14528)
{var statearr_14591_14622 = state_14560__$1;(statearr_14591_14622[(1)] = (17));
} else
{var statearr_14592_14623 = state_14560__$1;(statearr_14592_14623[(1)] = (18));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (16)))
{var inst_14544 = (state_14560[(2)]);var state_14560__$1 = state_14560;var statearr_14593_14624 = state_14560__$1;(statearr_14593_14624[(2)] = inst_14544);
(statearr_14593_14624[(1)] = (12));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14561 === (10)))
{var inst_14515 = (state_14560[(10)]);var inst_14513 = (state_14560[(12)]);var inst_14520 = cljs.core._nth.call(null,inst_14513,inst_14515);var state_14560__$1 = state_14560;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14560__$1,(13),out,inst_14520);
} else
{if((state_val_14561 === (18)))
{var inst_14526 = (state_14560[(7)]);var inst_14535 = cljs.core.first.call(null,inst_14526);var state_14560__$1 = state_14560;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14560__$1,(20),out,inst_14535);
} else
{if((state_val_14561 === (8)))
{var inst_14514 = (state_14560[(8)]);var inst_14515 = (state_14560[(10)]);var inst_14517 = (inst_14515 < inst_14514);var inst_14518 = inst_14517;var state_14560__$1 = state_14560;if(cljs.core.truth_(inst_14518))
{var statearr_14594_14625 = state_14560__$1;(statearr_14594_14625[(1)] = (10));
} else
{var statearr_14595_14626 = state_14560__$1;(statearr_14595_14626[(1)] = (11));
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
});})(c__5663__auto__))
;return ((function (switch__5648__auto__,c__5663__auto__){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14599 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14599[(0)] = state_machine__5649__auto__);
(statearr_14599[(1)] = (1));
return statearr_14599;
});
var state_machine__5649__auto____1 = (function (state_14560){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14560);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14600){if((e14600 instanceof Object))
{var ex__5652__auto__ = e14600;var statearr_14601_14627 = state_14560;(statearr_14601_14627[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14560);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14600;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14628 = state_14560;
state_14560 = G__14628;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14560){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14560);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto__))
})();var state__5665__auto__ = (function (){var statearr_14602 = f__5664__auto__.call(null);(statearr_14602[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto__);
return statearr_14602;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto__))
);
return c__5663__auto__;
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
var unique__2 = (function (ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___14725 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14725,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14725,out){
return (function (state_14700){var state_val_14701 = (state_14700[(1)]);if((state_val_14701 === (7)))
{var inst_14695 = (state_14700[(2)]);var state_14700__$1 = state_14700;var statearr_14702_14726 = state_14700__$1;(statearr_14702_14726[(2)] = inst_14695);
(statearr_14702_14726[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (1)))
{var inst_14677 = null;var state_14700__$1 = (function (){var statearr_14703 = state_14700;(statearr_14703[(7)] = inst_14677);
return statearr_14703;
})();var statearr_14704_14727 = state_14700__$1;(statearr_14704_14727[(2)] = null);
(statearr_14704_14727[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (4)))
{var inst_14680 = (state_14700[(8)]);var inst_14680__$1 = (state_14700[(2)]);var inst_14681 = (inst_14680__$1 == null);var inst_14682 = cljs.core.not.call(null,inst_14681);var state_14700__$1 = (function (){var statearr_14705 = state_14700;(statearr_14705[(8)] = inst_14680__$1);
return statearr_14705;
})();if(inst_14682)
{var statearr_14706_14728 = state_14700__$1;(statearr_14706_14728[(1)] = (5));
} else
{var statearr_14707_14729 = state_14700__$1;(statearr_14707_14729[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (6)))
{var state_14700__$1 = state_14700;var statearr_14708_14730 = state_14700__$1;(statearr_14708_14730[(2)] = null);
(statearr_14708_14730[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (3)))
{var inst_14697 = (state_14700[(2)]);var inst_14698 = cljs.core.async.close_BANG_.call(null,out);var state_14700__$1 = (function (){var statearr_14709 = state_14700;(statearr_14709[(9)] = inst_14697);
return statearr_14709;
})();return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14700__$1,inst_14698);
} else
{if((state_val_14701 === (2)))
{var state_14700__$1 = state_14700;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14700__$1,(4),ch);
} else
{if((state_val_14701 === (11)))
{var inst_14680 = (state_14700[(8)]);var inst_14689 = (state_14700[(2)]);var inst_14677 = inst_14680;var state_14700__$1 = (function (){var statearr_14710 = state_14700;(statearr_14710[(7)] = inst_14677);
(statearr_14710[(10)] = inst_14689);
return statearr_14710;
})();var statearr_14711_14731 = state_14700__$1;(statearr_14711_14731[(2)] = null);
(statearr_14711_14731[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (9)))
{var inst_14680 = (state_14700[(8)]);var state_14700__$1 = state_14700;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14700__$1,(11),out,inst_14680);
} else
{if((state_val_14701 === (5)))
{var inst_14677 = (state_14700[(7)]);var inst_14680 = (state_14700[(8)]);var inst_14684 = cljs.core._EQ_.call(null,inst_14680,inst_14677);var state_14700__$1 = state_14700;if(inst_14684)
{var statearr_14713_14732 = state_14700__$1;(statearr_14713_14732[(1)] = (8));
} else
{var statearr_14714_14733 = state_14700__$1;(statearr_14714_14733[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (10)))
{var inst_14692 = (state_14700[(2)]);var state_14700__$1 = state_14700;var statearr_14715_14734 = state_14700__$1;(statearr_14715_14734[(2)] = inst_14692);
(statearr_14715_14734[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14701 === (8)))
{var inst_14677 = (state_14700[(7)]);var tmp14712 = inst_14677;var inst_14677__$1 = tmp14712;var state_14700__$1 = (function (){var statearr_14716 = state_14700;(statearr_14716[(7)] = inst_14677__$1);
return statearr_14716;
})();var statearr_14717_14735 = state_14700__$1;(statearr_14717_14735[(2)] = null);
(statearr_14717_14735[(1)] = (2));
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
});})(c__5663__auto___14725,out))
;return ((function (switch__5648__auto__,c__5663__auto___14725,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14721 = [null,null,null,null,null,null,null,null,null,null,null];(statearr_14721[(0)] = state_machine__5649__auto__);
(statearr_14721[(1)] = (1));
return statearr_14721;
});
var state_machine__5649__auto____1 = (function (state_14700){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14700);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14722){if((e14722 instanceof Object))
{var ex__5652__auto__ = e14722;var statearr_14723_14736 = state_14700;(statearr_14723_14736[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14700);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14722;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14737 = state_14700;
state_14700 = G__14737;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14700){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14700);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14725,out))
})();var state__5665__auto__ = (function (){var statearr_14724 = f__5664__auto__.call(null);(statearr_14724[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14725);
return statearr_14724;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14725,out))
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
var partition__3 = (function (n,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___14872 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___14872,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___14872,out){
return (function (state_14842){var state_val_14843 = (state_14842[(1)]);if((state_val_14843 === (7)))
{var inst_14838 = (state_14842[(2)]);var state_14842__$1 = state_14842;var statearr_14844_14873 = state_14842__$1;(statearr_14844_14873[(2)] = inst_14838);
(statearr_14844_14873[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (1)))
{var inst_14805 = (new Array(n));var inst_14806 = inst_14805;var inst_14807 = (0);var state_14842__$1 = (function (){var statearr_14845 = state_14842;(statearr_14845[(7)] = inst_14806);
(statearr_14845[(8)] = inst_14807);
return statearr_14845;
})();var statearr_14846_14874 = state_14842__$1;(statearr_14846_14874[(2)] = null);
(statearr_14846_14874[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (4)))
{var inst_14810 = (state_14842[(9)]);var inst_14810__$1 = (state_14842[(2)]);var inst_14811 = (inst_14810__$1 == null);var inst_14812 = cljs.core.not.call(null,inst_14811);var state_14842__$1 = (function (){var statearr_14847 = state_14842;(statearr_14847[(9)] = inst_14810__$1);
return statearr_14847;
})();if(inst_14812)
{var statearr_14848_14875 = state_14842__$1;(statearr_14848_14875[(1)] = (5));
} else
{var statearr_14849_14876 = state_14842__$1;(statearr_14849_14876[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (15)))
{var inst_14832 = (state_14842[(2)]);var state_14842__$1 = state_14842;var statearr_14850_14877 = state_14842__$1;(statearr_14850_14877[(2)] = inst_14832);
(statearr_14850_14877[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (13)))
{var state_14842__$1 = state_14842;var statearr_14851_14878 = state_14842__$1;(statearr_14851_14878[(2)] = null);
(statearr_14851_14878[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (6)))
{var inst_14807 = (state_14842[(8)]);var inst_14828 = (inst_14807 > (0));var state_14842__$1 = state_14842;if(cljs.core.truth_(inst_14828))
{var statearr_14852_14879 = state_14842__$1;(statearr_14852_14879[(1)] = (12));
} else
{var statearr_14853_14880 = state_14842__$1;(statearr_14853_14880[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (3)))
{var inst_14840 = (state_14842[(2)]);var state_14842__$1 = state_14842;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14842__$1,inst_14840);
} else
{if((state_val_14843 === (12)))
{var inst_14806 = (state_14842[(7)]);var inst_14830 = cljs.core.vec.call(null,inst_14806);var state_14842__$1 = state_14842;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14842__$1,(15),out,inst_14830);
} else
{if((state_val_14843 === (2)))
{var state_14842__$1 = state_14842;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14842__$1,(4),ch);
} else
{if((state_val_14843 === (11)))
{var inst_14822 = (state_14842[(2)]);var inst_14823 = (new Array(n));var inst_14806 = inst_14823;var inst_14807 = (0);var state_14842__$1 = (function (){var statearr_14854 = state_14842;(statearr_14854[(10)] = inst_14822);
(statearr_14854[(7)] = inst_14806);
(statearr_14854[(8)] = inst_14807);
return statearr_14854;
})();var statearr_14855_14881 = state_14842__$1;(statearr_14855_14881[(2)] = null);
(statearr_14855_14881[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (9)))
{var inst_14806 = (state_14842[(7)]);var inst_14820 = cljs.core.vec.call(null,inst_14806);var state_14842__$1 = state_14842;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_14842__$1,(11),out,inst_14820);
} else
{if((state_val_14843 === (5)))
{var inst_14810 = (state_14842[(9)]);var inst_14815 = (state_14842[(11)]);var inst_14806 = (state_14842[(7)]);var inst_14807 = (state_14842[(8)]);var inst_14814 = (inst_14806[inst_14807] = inst_14810);var inst_14815__$1 = (inst_14807 + (1));var inst_14816 = (inst_14815__$1 < n);var state_14842__$1 = (function (){var statearr_14856 = state_14842;(statearr_14856[(12)] = inst_14814);
(statearr_14856[(11)] = inst_14815__$1);
return statearr_14856;
})();if(cljs.core.truth_(inst_14816))
{var statearr_14857_14882 = state_14842__$1;(statearr_14857_14882[(1)] = (8));
} else
{var statearr_14858_14883 = state_14842__$1;(statearr_14858_14883[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (14)))
{var inst_14835 = (state_14842[(2)]);var inst_14836 = cljs.core.async.close_BANG_.call(null,out);var state_14842__$1 = (function (){var statearr_14860 = state_14842;(statearr_14860[(13)] = inst_14835);
return statearr_14860;
})();var statearr_14861_14884 = state_14842__$1;(statearr_14861_14884[(2)] = inst_14836);
(statearr_14861_14884[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (10)))
{var inst_14826 = (state_14842[(2)]);var state_14842__$1 = state_14842;var statearr_14862_14885 = state_14842__$1;(statearr_14862_14885[(2)] = inst_14826);
(statearr_14862_14885[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_14843 === (8)))
{var inst_14815 = (state_14842[(11)]);var inst_14806 = (state_14842[(7)]);var tmp14859 = inst_14806;var inst_14806__$1 = tmp14859;var inst_14807 = inst_14815;var state_14842__$1 = (function (){var statearr_14863 = state_14842;(statearr_14863[(7)] = inst_14806__$1);
(statearr_14863[(8)] = inst_14807);
return statearr_14863;
})();var statearr_14864_14886 = state_14842__$1;(statearr_14864_14886[(2)] = null);
(statearr_14864_14886[(1)] = (2));
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
});})(c__5663__auto___14872,out))
;return ((function (switch__5648__auto__,c__5663__auto___14872,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_14868 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_14868[(0)] = state_machine__5649__auto__);
(statearr_14868[(1)] = (1));
return statearr_14868;
});
var state_machine__5649__auto____1 = (function (state_14842){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_14842);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e14869){if((e14869 instanceof Object))
{var ex__5652__auto__ = e14869;var statearr_14870_14887 = state_14842;(statearr_14870_14887[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14842);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e14869;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__14888 = state_14842;
state_14842 = G__14888;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_14842){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_14842);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___14872,out))
})();var state__5665__auto__ = (function (){var statearr_14871 = f__5664__auto__.call(null);(statearr_14871[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___14872);
return statearr_14871;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___14872,out))
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
var partition_by__3 = (function (f,ch,buf_or_n){var out = cljs.core.async.chan.call(null,buf_or_n);var c__5663__auto___15031 = cljs.core.async.chan.call(null,(1));cljs.core.async.impl.dispatch.run.call(null,((function (c__5663__auto___15031,out){
return (function (){var f__5664__auto__ = (function (){var switch__5648__auto__ = ((function (c__5663__auto___15031,out){
return (function (state_15001){var state_val_15002 = (state_15001[(1)]);if((state_val_15002 === (7)))
{var inst_14997 = (state_15001[(2)]);var state_15001__$1 = state_15001;var statearr_15003_15032 = state_15001__$1;(statearr_15003_15032[(2)] = inst_14997);
(statearr_15003_15032[(1)] = (3));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (1)))
{var inst_14960 = [];var inst_14961 = inst_14960;var inst_14962 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);var state_15001__$1 = (function (){var statearr_15004 = state_15001;(statearr_15004[(7)] = inst_14962);
(statearr_15004[(8)] = inst_14961);
return statearr_15004;
})();var statearr_15005_15033 = state_15001__$1;(statearr_15005_15033[(2)] = null);
(statearr_15005_15033[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (4)))
{var inst_14965 = (state_15001[(9)]);var inst_14965__$1 = (state_15001[(2)]);var inst_14966 = (inst_14965__$1 == null);var inst_14967 = cljs.core.not.call(null,inst_14966);var state_15001__$1 = (function (){var statearr_15006 = state_15001;(statearr_15006[(9)] = inst_14965__$1);
return statearr_15006;
})();if(inst_14967)
{var statearr_15007_15034 = state_15001__$1;(statearr_15007_15034[(1)] = (5));
} else
{var statearr_15008_15035 = state_15001__$1;(statearr_15008_15035[(1)] = (6));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (15)))
{var inst_14991 = (state_15001[(2)]);var state_15001__$1 = state_15001;var statearr_15009_15036 = state_15001__$1;(statearr_15009_15036[(2)] = inst_14991);
(statearr_15009_15036[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (13)))
{var state_15001__$1 = state_15001;var statearr_15010_15037 = state_15001__$1;(statearr_15010_15037[(2)] = null);
(statearr_15010_15037[(1)] = (14));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (6)))
{var inst_14961 = (state_15001[(8)]);var inst_14986 = inst_14961.length;var inst_14987 = (inst_14986 > (0));var state_15001__$1 = state_15001;if(cljs.core.truth_(inst_14987))
{var statearr_15011_15038 = state_15001__$1;(statearr_15011_15038[(1)] = (12));
} else
{var statearr_15012_15039 = state_15001__$1;(statearr_15012_15039[(1)] = (13));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (3)))
{var inst_14999 = (state_15001[(2)]);var state_15001__$1 = state_15001;return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15001__$1,inst_14999);
} else
{if((state_val_15002 === (12)))
{var inst_14961 = (state_15001[(8)]);var inst_14989 = cljs.core.vec.call(null,inst_14961);var state_15001__$1 = state_15001;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15001__$1,(15),out,inst_14989);
} else
{if((state_val_15002 === (2)))
{var state_15001__$1 = state_15001;return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15001__$1,(4),ch);
} else
{if((state_val_15002 === (11)))
{var inst_14969 = (state_15001[(10)]);var inst_14965 = (state_15001[(9)]);var inst_14979 = (state_15001[(2)]);var inst_14980 = [];var inst_14981 = inst_14980.push(inst_14965);var inst_14961 = inst_14980;var inst_14962 = inst_14969;var state_15001__$1 = (function (){var statearr_15013 = state_15001;(statearr_15013[(7)] = inst_14962);
(statearr_15013[(11)] = inst_14979);
(statearr_15013[(12)] = inst_14981);
(statearr_15013[(8)] = inst_14961);
return statearr_15013;
})();var statearr_15014_15040 = state_15001__$1;(statearr_15014_15040[(2)] = null);
(statearr_15014_15040[(1)] = (2));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (9)))
{var inst_14961 = (state_15001[(8)]);var inst_14977 = cljs.core.vec.call(null,inst_14961);var state_15001__$1 = state_15001;return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_15001__$1,(11),out,inst_14977);
} else
{if((state_val_15002 === (5)))
{var inst_14962 = (state_15001[(7)]);var inst_14969 = (state_15001[(10)]);var inst_14965 = (state_15001[(9)]);var inst_14969__$1 = f.call(null,inst_14965);var inst_14970 = cljs.core._EQ_.call(null,inst_14969__$1,inst_14962);var inst_14971 = cljs.core.keyword_identical_QMARK_.call(null,inst_14962,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));var inst_14972 = (inst_14970) || (inst_14971);var state_15001__$1 = (function (){var statearr_15015 = state_15001;(statearr_15015[(10)] = inst_14969__$1);
return statearr_15015;
})();if(cljs.core.truth_(inst_14972))
{var statearr_15016_15041 = state_15001__$1;(statearr_15016_15041[(1)] = (8));
} else
{var statearr_15017_15042 = state_15001__$1;(statearr_15017_15042[(1)] = (9));
}
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (14)))
{var inst_14994 = (state_15001[(2)]);var inst_14995 = cljs.core.async.close_BANG_.call(null,out);var state_15001__$1 = (function (){var statearr_15019 = state_15001;(statearr_15019[(13)] = inst_14994);
return statearr_15019;
})();var statearr_15020_15043 = state_15001__$1;(statearr_15020_15043[(2)] = inst_14995);
(statearr_15020_15043[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (10)))
{var inst_14984 = (state_15001[(2)]);var state_15001__$1 = state_15001;var statearr_15021_15044 = state_15001__$1;(statearr_15021_15044[(2)] = inst_14984);
(statearr_15021_15044[(1)] = (7));
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{if((state_val_15002 === (8)))
{var inst_14969 = (state_15001[(10)]);var inst_14961 = (state_15001[(8)]);var inst_14965 = (state_15001[(9)]);var inst_14974 = inst_14961.push(inst_14965);var tmp15018 = inst_14961;var inst_14961__$1 = tmp15018;var inst_14962 = inst_14969;var state_15001__$1 = (function (){var statearr_15022 = state_15001;(statearr_15022[(7)] = inst_14962);
(statearr_15022[(14)] = inst_14974);
(statearr_15022[(8)] = inst_14961__$1);
return statearr_15022;
})();var statearr_15023_15045 = state_15001__$1;(statearr_15023_15045[(2)] = null);
(statearr_15023_15045[(1)] = (2));
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
});})(c__5663__auto___15031,out))
;return ((function (switch__5648__auto__,c__5663__auto___15031,out){
return (function() {
var state_machine__5649__auto__ = null;
var state_machine__5649__auto____0 = (function (){var statearr_15027 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];(statearr_15027[(0)] = state_machine__5649__auto__);
(statearr_15027[(1)] = (1));
return statearr_15027;
});
var state_machine__5649__auto____1 = (function (state_15001){while(true){
var ret_value__5650__auto__ = (function (){try{while(true){
var result__5651__auto__ = switch__5648__auto__.call(null,state_15001);if(cljs.core.keyword_identical_QMARK_.call(null,result__5651__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
continue;
}
} else
{return result__5651__auto__;
}
break;
}
}catch (e15028){if((e15028 instanceof Object))
{var ex__5652__auto__ = e15028;var statearr_15029_15046 = state_15001;(statearr_15029_15046[(5)] = ex__5652__auto__);
cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15001);
return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else
{throw e15028;

}
}})();if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__5650__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268)))
{{
var G__15047 = state_15001;
state_15001 = G__15047;
continue;
}
} else
{return ret_value__5650__auto__;
}
break;
}
});
state_machine__5649__auto__ = function(state_15001){
switch(arguments.length){
case 0:
return state_machine__5649__auto____0.call(this);
case 1:
return state_machine__5649__auto____1.call(this,state_15001);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$0 = state_machine__5649__auto____0;
state_machine__5649__auto__.cljs$core$IFn$_invoke$arity$1 = state_machine__5649__auto____1;
return state_machine__5649__auto__;
})()
;})(switch__5648__auto__,c__5663__auto___15031,out))
})();var state__5665__auto__ = (function (){var statearr_15030 = f__5664__auto__.call(null);(statearr_15030[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__5663__auto___15031);
return statearr_15030;
})();return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__5665__auto__);
});})(c__5663__auto___15031,out))
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