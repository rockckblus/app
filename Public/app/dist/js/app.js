var mui = function (t, e) {
    var n = /complete|loaded|interactive/, i = /^#([\w-]+)$/, r = /^\.([\w-]+)$/, o = /^[\w-]+$/, a = /translate(?:3d)?\((.+?)\)/, s = /matrix(3d)?\((.+?)\)/, l = function (e, n) {
        if (n = n || t, !e)return c();
        if ("object" == typeof e)return l.isArrayLike(e) ? c(l.slice.call(e), null) : c([e], null);
        if ("function" == typeof e)return l.ready(e);
        if ("string" == typeof e)try {
            if (e = e.trim(), i.test(e)) {
                var r = t.getElementById(RegExp.$1);
                return c(r ? [r] : [])
            }
            return c(l.qsa(e, n), e)
        } catch (o) {
        }
        return c()
    }, c = function (t, e) {
        return t = t || [], Object.setPrototypeOf(t, l.fn), t.selector = e || "", t
    };
    l.uuid = 0, l.data = {}, l.extend = function () {
        var t, n, i, r, o, a, s = arguments[0] || {}, c = 1, u = arguments.length, h = !1;
        for ("boolean" == typeof s && (h = s, s = arguments[c] || {}, c++), "object" == typeof s || l.isFunction(s) || (s = {}), c === u && (s = this, c--); u > c; c++)if (null != (t = arguments[c]))for (n in t)i = s[n], r = t[n], s !== r && (h && r && (l.isPlainObject(r) || (o = l.isArray(r))) ? (o ? (o = !1, a = i && l.isArray(i) ? i : []) : a = i && l.isPlainObject(i) ? i : {}, s[n] = l.extend(h, a, r)) : r !== e && (s[n] = r));
        return s
    }, l.noop = function () {
    }, l.slice = [].slice, l.filter = [].filter, l.type = function (t) {
        return null == t ? t + "" : u[{}.toString.call(t)] || "object"
    }, l.isArray = Array.isArray || function (t) {
            return t instanceof Array
        }, l.isArrayLike = function (t) {
        var e = !!t && "length" in t && t.length, n = l.type(t);
        return "function" === n || l.isWindow(t) ? !1 : "array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }, l.isWindow = function (t) {
        return null != t && t === t.window
    }, l.isObject = function (t) {
        return "object" === l.type(t)
    }, l.isPlainObject = function (t) {
        return l.isObject(t) && !l.isWindow(t) && Object.getPrototypeOf(t) === Object.prototype
    }, l.isEmptyObject = function (t) {
        for (var n in t)if (n !== e)return !1;
        return !0
    }, l.isFunction = function (t) {
        return "function" === l.type(t)
    }, l.qsa = function (e, n) {
        return n = n || t, l.slice.call(r.test(e) ? n.getElementsByClassName(RegExp.$1) : o.test(e) ? n.getElementsByTagName(e) : n.querySelectorAll(e))
    }, l.ready = function (e) {
        return n.test(t.readyState) ? e(l) : t.addEventListener("DOMContentLoaded", function () {
            e(l)
        }, !1), this
    }, l.buffer = function (t, e, n) {
        function i() {
            r && (r.cancel(), r = 0), o = l.now(), t.apply(n || this, arguments), a = l.now()
        }

        var r, o = 0, a = 0, e = e || 150;
        return l.extend(function () {
            !o || a >= o && l.now() - a > e || o > a && l.now() - o > 8 * e ? i() : (r && r.cancel(), r = l.later(i, e, null, arguments))
        }, {
            stop: function () {
                r && (r.cancel(), r = 0)
            }
        })
    }, l.each = function (t, e, n) {
        if (!t)return this;
        if ("number" == typeof t.length)[].every.call(t, function (t, n) {
            return e.call(t, n, t) !== !1
        }); else for (var i in t)if (n) {
            if (t.hasOwnProperty(i) && e.call(t[i], i, t[i]) === !1)return t
        } else if (e.call(t[i], i, t[i]) === !1)return t;
        return this
    }, l.focus = function (t) {
        l.os.ios ? setTimeout(function () {
            t.focus()
        }, 10) : t.focus()
    }, l.trigger = function (t, e, n) {
        return t.dispatchEvent(new CustomEvent(e, {detail: n, bubbles: !0, cancelable: !0})), this
    }, l.getStyles = function (t, e) {
        var n = t.ownerDocument.defaultView.getComputedStyle(t, null);
        return e ? n.getPropertyValue(e) || n[e] : n
    }, l.parseTranslate = function (t, e) {
        var n = t.match(a || "");
        return n && n[1] || (n = ["", "0,0,0"]), n = n[1].split(","), n = {
            x: parseFloat(n[0]),
            y: parseFloat(n[1]),
            z: parseFloat(n[2])
        }, e && n.hasOwnProperty(e) ? n[e] : n
    }, l.parseTranslateMatrix = function (t, e) {
        var n = t.match(s), i = n && n[1];
        n ? (n = n[2].split(","), "3d" === i ? n = n.slice(12, 15) : (n.push(0), n = n.slice(4, 7))) : n = [0, 0, 0];
        var r = {x: parseFloat(n[0]), y: parseFloat(n[1]), z: parseFloat(n[2])};
        return e && r.hasOwnProperty(e) ? r[e] : r
    }, l.hooks = {}, l.addAction = function (t, e) {
        var n = l.hooks[t];
        return n || (n = []), e.index = e.index || 1e3, n.push(e), n.sort(function (t, e) {
            return t.index - e.index
        }), l.hooks[t] = n, l.hooks[t]
    }, l.doAction = function (t, e) {
        l.isFunction(e) ? l.each(l.hooks[t], e) : l.each(l.hooks[t], function (t, e) {
            return !e.handle()
        })
    }, l.later = function (t, e, n, i) {
        e = e || 0;
        var r, o, a = t, s = i;
        return "string" == typeof t && (a = n[t]), r = function () {
            a.apply(n, l.isArray(s) ? s : [s])
        }, o = setTimeout(r, e), {
            id: o, cancel: function () {
                clearTimeout(o)
            }
        }
    }, l.now = Date.now || function () {
            return +new Date
        };
    var u = {};
    return l.each(["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error"], function (t, e) {
        u["[object " + e + "]"] = e.toLowerCase()
    }), window.JSON && (l.parseJSON = JSON.parse), l.fn = {
        each: function (t) {
            return [].every.call(this, function (e, n) {
                return t.call(e, n, e) !== !1
            }), this
        }
    }, "function" == typeof define && define.amd && define("mui", [], function () {
        return l
    }), l
}(document);
!function (t, e) {
    function n(n) {
        this.os = {};
        var i = [function () {
            var t = n.match(/(MicroMessenger)\/([\d\.]+)/i);
            return t && (this.os.wechat = {version: t[2].replace(/_/g, ".")}), !1
        }, function () {
            var t = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            return t && (this.os.android = !0, this.os.version = t[2], this.os.isBadAndroid = !/Chrome\/\d/.test(e.navigator.appVersion)), this.os.android === !0
        }, function () {
            var t = n.match(/(iPhone\sOS)\s([\d_]+)/);
            if (t)this.os.ios = this.os.iphone = !0, this.os.version = t[2].replace(/_/g, "."); else {
                var e = n.match(/(iPad).*OS\s([\d_]+)/);
                e && (this.os.ios = this.os.ipad = !0, this.os.version = e[2].replace(/_/g, "."))
            }
            return this.os.ios === !0
        }];
        [].every.call(i, function (e) {
            return !e.call(t)
        })
    }

    n.call(t, navigator.userAgent)
}(mui, window), function (t, e) {
    function n(n) {
        this.os = this.os || {};
        var i = n.match(/Html5Plus/i);
        i && (this.os.plus = !0, t(function () {
            e.body.classList.add("mui-plus")
        }), n.match(/StreamApp/i) && (this.os.stream = !0, t(function () {
            e.body.classList.add("mui-plus-stream")
        })))
    }

    n.call(t, navigator.userAgent)
}(mui, document), function (t) {
    "ontouchstart" in window ? (t.isTouchable = !0, t.EVENT_START = "touchstart", t.EVENT_MOVE = "touchmove", t.EVENT_END = "touchend") : (t.isTouchable = !1, t.EVENT_START = "mousedown", t.EVENT_MOVE = "mousemove", t.EVENT_END = "mouseup"), t.EVENT_CANCEL = "touchcancel", t.EVENT_CLICK = "click";
    var e = 1, n = {}, i = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    }, r = function () {
        return !0
    }, o = function () {
        return !1
    }, a = function (e, n) {
        return e.detail ? e.detail.currentTarget = n : e.detail = {currentTarget: n}, t.each(i, function (t, n) {
            var i = e[t];
            e[t] = function () {
                return this[n] = r, i && i.apply(e, arguments)
            }, e[n] = o
        }, !0), e
    }, s = function (t) {
        return t && (t._mid || (t._mid = e++))
    }, l = {}, c = function (e, i) {
        return function (r) {
            for (var o = n[e._mid][i], s = [], l = r.target, c = {}; l && l !== document && l !== e && (!~["click", "tap", "doubletap", "longtap", "hold"].indexOf(i) || !l.disabled && !l.classList.contains("mui-disabled")); l = l.parentNode) {
                var u = {};
                t.each(o, function (n, i) {
                    c[n] || (c[n] = t.qsa(n, e)), c[n] && ~c[n].indexOf(l) && (u[n] || (u[n] = i))
                }, !0), t.isEmptyObject(u) || s.push({element: l, handlers: u})
            }
            c = null, r = a(r), t.each(s, function (e, n) {
                l = n.element;
                var o = l.tagName;
                return "tap" === i && "INPUT" !== o && "TEXTAREA" !== o && "SELECT" !== o && (r.preventDefault(), r.detail && r.detail.gesture && r.detail.gesture.preventDefault()), t.each(n.handlers, function (e, n) {
                    t.each(n, function (t, e) {
                        e.call(l, r) === !1 && (r.preventDefault(), r.stopPropagation())
                    }, !0)
                }, !0), r.isPropagationStopped() ? !1 : void 0
            }, !0)
        }
    }, u = function (t, e) {
        var n = l[s(t)], i = [];
        if (n) {
            if (i = [], e) {
                var r = function (t) {
                    return t.type === e
                };
                return n.filter(r)
            }
            i = n
        }
        return i
    }, h = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
    t.fn.on = function (e, i, r) {
        return this.each(function () {
            var o = this;
            s(o), s(r);
            var a = !1, u = n[o._mid] || (n[o._mid] = {}), f = u[e] || (u[e] = {});
            t.isEmptyObject(f) && (a = !0);
            var d = f[i] || (f[i] = []);
            if (d.push(r), a) {
                var p = l[s(o)];
                p || (p = []);
                var m = c(o, e, i, r);
                p.push(m), m.i = p.length - 1, m.type = e, l[s(o)] = p, o.addEventListener(e, m), "tap" === e && o.addEventListener("click", function (t) {
                    if (t.target) {
                        var e = t.target.tagName;
                        if (!h.test(e))if ("A" === e) {
                            var n = t.target.href;
                            n && ~n.indexOf("tel:") || t.preventDefault()
                        } else t.preventDefault()
                    }
                })
            }
        })
    }, t.fn.off = function (e, i, r) {
        return this.each(function () {
            var o = s(this);
            if (e)if (i)if (r) {
                var a = n[o] && n[o][e] && n[o][e][i];
                t.each(a, function (t, e) {
                    return s(e) === s(r) ? (a.splice(t, 1), !1) : void 0
                }, !0)
            } else n[o] && n[o][e] && delete n[o][e][i]; else n[o] && delete n[o][e]; else n[o] && delete n[o];
            n[o] ? (!n[o][e] || t.isEmptyObject(n[o][e])) && u(this, e).forEach(function (t) {
                this.removeEventListener(t.type, t), delete l[o][t.i]
            }.bind(this)) : u(this).forEach(function (t) {
                this.removeEventListener(t.type, t), delete l[o][t.i]
            }.bind(this))
        })
    }
}(mui), function (t, e, n) {
    t.targets = {}, t.targetHandles = [], t.registerTarget = function (e) {
        return e.index = e.index || 1e3, t.targetHandles.push(e), t.targetHandles.sort(function (t, e) {
            return t.index - e.index
        }), t.targetHandles
    }, e.addEventListener(t.EVENT_START, function (e) {
        for (var i = e.target, r = {}; i && i !== n; i = i.parentNode) {
            var o = !1;
            if (t.each(t.targetHandles, function (n, a) {
                    var s = a.name;
                    o || r[s] || !a.hasOwnProperty("handle") ? r[s] || a.isReset !== !1 && (t.targets[s] = !1) : (t.targets[s] = a.handle(e, i), t.targets[s] && (r[s] = !0, a.isContinue !== !0 && (o = !0)))
                }), o)break
        }
    }), e.addEventListener("click", function (e) {
        for (var i = e.target, r = !1; i && i !== n && ("A" !== i.tagName || (t.each(t.targetHandles, function (t, n) {
            return n.name, n.hasOwnProperty("handle") && n.handle(e, i) ? (r = !0, e.preventDefault(), !1) : void 0
        }), !r)); i = i.parentNode);
    })
}(mui, window, document), function (t) {
    String.prototype.trim === t && (String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "")
    }), Object.setPrototypeOf = Object.setPrototypeOf || function (t, e) {
            return t.__proto__ = e, t
        }
}(), function () {
    function t(t, e) {
        e = e || {bubbles: !1, cancelable: !1, detail: void 0};
        var n = document.createEvent("Events"), i = !0;
        for (var r in e)"bubbles" === r ? i = !!e[r] : n[r] = e[r];
        return n.initEvent(t, i, !0), n
    }

    window.CustomEvent === void 0 && (t.prototype = window.Event.prototype, window.CustomEvent = t)
}(), Function.prototype.bind = Function.prototype.bind || function (t) {
        var e = Array.prototype.splice.call(arguments, 1), n = this, i = function () {
            var r = e.concat(Array.prototype.splice.call(arguments, 0));
            return this instanceof i ? void n.apply(this, r) : n.apply(t, r)
        };
        return i.prototype = n.prototype, i
    }, function (t) {
    "classList" in t.documentElement || !Object.defineProperty || "undefined" == typeof HTMLElement || Object.defineProperty(HTMLElement.prototype, "classList", {
        get: function () {
            function t(t) {
                return function (n) {
                    var i = e.className.split(/\s+/), r = i.indexOf(n);
                    t(i, r, n), e.className = i.join(" ")
                }
            }

            var e = this, n = {
                add: t(function (t, e, n) {
                    ~e || t.push(n)
                }), remove: t(function (t, e) {
                    ~e && t.splice(e, 1)
                }), toggle: t(function (t, e, n) {
                    ~e ? t.splice(e, 1) : t.push(n)
                }), contains: function (t) {
                    return !!~e.className.split(/\s+/).indexOf(t)
                }, item: function (t) {
                    return e.className.split(/\s+/)[t] || null
                }
            };
            return Object.defineProperty(n, "length", {
                get: function () {
                    return e.className.split(/\s+/).length
                }
            }), n
        }
    })
}(document), function (t) {
    if (!t.requestAnimationFrame) {
        var e = 0;
        t.requestAnimationFrame = t.webkitRequestAnimationFrame || function (n) {
                var i = (new Date).getTime(), r = Math.max(0, 16.7 - (i - e)), o = t.setTimeout(function () {
                    n(i + r)
                }, r);
                return e = i + r, o
            }, t.cancelAnimationFrame = t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame || function (t) {
                clearTimeout(t)
            }
    }
}(window), function (t, e, n) {
    if ((t.os.android || t.os.ios) && !e.FastClick) {
        var i = function (t, e) {
            return "LABEL" === e.tagName && e.parentNode && (e = e.parentNode.querySelector("input")), !e || "radio" !== e.type && "checkbox" !== e.type || e.disabled ? !1 : e
        };
        t.registerTarget({name: n, index: 40, handle: i, target: !1});
        var r = function (n) {
            var i = t.targets.click;
            if (i) {
                var r, o;
                document.activeElement && document.activeElement !== i && document.activeElement.blur(), o = n.detail.gesture.changedTouches[0], r = document.createEvent("MouseEvents"), r.initMouseEvent("click", !0, !0, e, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), r.forwardedTouchEvent = !0, i.dispatchEvent(r), n.detail && n.detail.gesture.preventDefault()
            }
        };
        e.addEventListener("tap", r), e.addEventListener("doubletap", r), e.addEventListener("click", function (e) {
            return t.targets.click && !e.forwardedTouchEvent ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : void 0
        }, !0)
    }
}(mui, window, "click"), function (t, e) {
    t(function () {
        if (t.os.ios) {
            var n = "mui-focusin", i = "mui-bar-tab", r = "mui-bar-footer", o = "mui-bar-footer-secondary", a = "mui-bar-footer-secondary-tab";
            e.addEventListener("focusin", function (s) {
                if (!(t.os.plus && window.plus && plus.webview.currentWebview().children().length > 0)) {
                    var l = s.target;
                    if (l.tagName && ("TEXTAREA" === l.tagName || "INPUT" === l.tagName && ("text" === l.type || "search" === l.type || "number" === l.type))) {
                        if (l.disabled || l.readOnly)return;
                        e.body.classList.add(n);
                        for (var c = !1; l && l !== e; l = l.parentNode) {
                            var u = l.classList;
                            if (u && u.contains(i) || u.contains(r) || u.contains(o) || u.contains(a)) {
                                c = !0;
                                break
                            }
                        }
                        if (c) {
                            var h = e.body.scrollHeight, f = e.body.scrollLeft;
                            setTimeout(function () {
                                window.scrollTo(f, h)
                            }, 20)
                        }
                    }
                }
            }), e.addEventListener("focusout", function () {
                var t = e.body.classList;
                t.contains(n) && (t.remove(n), setTimeout(function () {
                    window.scrollTo(e.body.scrollLeft, e.body.scrollTop)
                }, 20))
            })
        }
    })
}(mui, document), function (t) {
    t.namespace = "mui", t.classNamePrefix = t.namespace + "-", t.classSelectorPrefix = "." + t.classNamePrefix, t.className = function (e) {
        return t.classNamePrefix + e
    }, t.classSelector = function (e) {
        return e.replace(/\./g, t.classSelectorPrefix)
    }, t.eventName = function (e, n) {
        return e + (t.namespace ? "." + t.namespace : "") + (n ? "." + n : "")
    }
}(mui), function (t, e) {
    t.gestures = {session: {}}, t.preventDefault = function (t) {
        t.preventDefault()
    }, t.stopPropagation = function (t) {
        t.stopPropagation()
    }, t.addGesture = function (e) {
        return t.addAction("gestures", e)
    };
    var n = Math.round, i = Math.abs, r = Math.sqrt, o = (Math.atan, Math.atan2), a = function (t, e, n) {
        n || (n = ["x", "y"]);
        var i = e[n[0]] - t[n[0]], o = e[n[1]] - t[n[1]];
        return r(i * i + o * o)
    }, s = function (t, e) {
        if (t.length >= 2 && e.length >= 2) {
            var n = ["pageX", "pageY"];
            return a(e[1], e[0], n) / a(t[1], t[0], n)
        }
        return 1
    }, l = function (t, e, n) {
        n || (n = ["x", "y"]);
        var i = e[n[0]] - t[n[0]], r = e[n[1]] - t[n[1]];
        return 180 * o(r, i) / Math.PI
    }, c = function (t, e) {
        return t === e ? "" : i(t) >= i(e) ? t > 0 ? "left" : "right" : e > 0 ? "up" : "down"
    }, u = function (t, e) {
        var n = ["pageX", "pageY"];
        return l(e[1], e[0], n) - l(t[1], t[0], n)
    }, h = function (t, e, n) {
        return {x: e / t || 0, y: n / t || 0}
    }, f = function (e, n) {
        t.gestures.stoped || t.doAction("gestures", function (i, r) {
            t.gestures.stoped || t.options.gestureConfig[r.name] !== !1 && r.handle(e, n)
        })
    }, d = function (t, e) {
        for (; t;) {
            if (t == e)return !0;
            t = t.parentNode
        }
        return !1
    }, p = function (t, e, n) {
        for (var i = [], r = [], o = 0; t.length > o;) {
            var a = e ? t[o][e] : t[o];
            0 > r.indexOf(a) && i.push(t[o]), r[o] = a, o++
        }
        return n && (i = e ? i.sort(function (t, n) {
            return t[e] > n[e]
        }) : i.sort()), i
    }, m = function (t) {
        var e = t.length;
        if (1 === e)return {x: n(t[0].pageX), y: n(t[0].pageY)};
        for (var i = 0, r = 0, o = 0; e > o;)i += t[o].pageX, r += t[o].pageY, o++;
        return {x: n(i / e), y: n(r / e)}
    }, v = function () {
        return t.options.gestureConfig.pinch
    }, g = function (e) {
        for (var i = [], r = 0; e.touches.length > r;)i[r] = {
            pageX: n(e.touches[r].pageX),
            pageY: n(e.touches[r].pageY)
        }, r++;
        return {
            timestamp: t.now(),
            gesture: e.gesture,
            touches: i,
            center: m(e.touches),
            deltaX: e.deltaX,
            deltaY: e.deltaY
        }
    }, b = function (e) {
        var n = t.gestures.session, i = e.center, r = n.offsetDelta || {}, o = n.prevDelta || {}, a = n.prevTouch || {};
        (e.gesture.type === t.EVENT_START || e.gesture.type === t.EVENT_END) && (o = n.prevDelta = {
            x: a.deltaX || 0,
            y: a.deltaY || 0
        }, r = n.offsetDelta = {x: i.x, y: i.y}), e.deltaX = o.x + (i.x - r.x), e.deltaY = o.y + (i.y - r.y)
    }, $ = function (e) {
        var n = t.gestures.session, i = e.touches, r = i.length;
        n.firstTouch || (n.firstTouch = g(e)), v() && r > 1 && !n.firstMultiTouch ? n.firstMultiTouch = g(e) : 1 === r && (n.firstMultiTouch = !1);
        var o = n.firstTouch, h = n.firstMultiTouch, f = h ? h.center : o.center, d = e.center = m(i);
        e.timestamp = t.now(), e.deltaTime = e.timestamp - o.timestamp, e.angle = l(f, d), e.distance = a(f, d), b(e), e.offsetDirection = c(e.deltaX, e.deltaY), e.scale = h ? s(h.touches, i) : 1, e.rotation = h ? u(h.touches, i) : 0, y(e)
    }, w = 25, y = function (e) {
        var n, r, o, a, s = t.gestures.session, l = s.lastInterval || e, u = e.timestamp - l.timestamp;
        if (e.gesture.type != t.EVENT_CANCEL && (u > w || void 0 === l.velocity)) {
            var f = l.deltaX - e.deltaX, d = l.deltaY - e.deltaY, p = h(u, f, d);
            r = p.x, o = p.y, n = i(p.x) > i(p.y) ? p.x : p.y, a = c(f, d) || l.direction, s.lastInterval = e
        } else n = l.velocity, r = l.velocityX, o = l.velocityY, a = l.direction;
        e.velocity = n, e.velocityX = r, e.velocityY = o, e.direction = a
    }, x = {}, E = function (t) {
        for (var e = 0; t.length > e; e++)!t.identifier && (t.identifier = 0);
        return t
    }, S = function (e, n) {
        var i = E(t.slice.call(e.touches || [e])), r = e.type, o = [], a = [];
        if (r !== t.EVENT_START && r !== t.EVENT_MOVE || 1 !== i.length) {
            var s = 0, o = [], a = [], l = E(t.slice.call(e.changedTouches || [e]));
            n.target = e.target;
            var c = t.gestures.session.target || e.target;
            if (o = i.filter(function (t) {
                    return d(t.target, c)
                }), r === t.EVENT_START)for (s = 0; o.length > s;)x[o[s].identifier] = !0, s++;
            for (s = 0; l.length > s;)x[l[s].identifier] && a.push(l[s]), (r === t.EVENT_END || r === t.EVENT_CANCEL) && delete x[l[s].identifier], s++;
            if (!a.length)return !1
        } else x[i[0].identifier] = !0, o = i, a = i, n.target = e.target;
        o = p(o.concat(a), "identifier", !0);
        var u = o.length, h = a.length;
        return r === t.EVENT_START && 0 === u - h && (n.isFirst = !0, t.gestures.touch = t.gestures.session = {target: e.target}), n.isFinal = (r === t.EVENT_END || r === t.EVENT_CANCEL) && 0 === u - h, n.touches = o, n.changedTouches = a, !0
    }, C = function (e) {
        var n = {gesture: e}, i = S(e, n);
        i && ($(n), f(e, n), t.gestures.session.prevTouch = n, e.type !== t.EVENT_END || t.isTouchable || (t.gestures.touch = t.gestures.session = {}))
    };
    e.addEventListener(t.EVENT_START, C), e.addEventListener(t.EVENT_MOVE, C), e.addEventListener(t.EVENT_END, C), e.addEventListener(t.EVENT_CANCEL, C), e.addEventListener(t.EVENT_CLICK, function (e) {
        (t.os.android || t.os.ios) && (t.targets.popover && e.target === t.targets.popover || t.targets.tab || t.targets.offcanvas || t.targets.modal) && e.preventDefault()
    }, !0), t.isScrolling = !1;
    var T = null;
    e.addEventListener("scroll", function () {
        t.isScrolling = !0, T && clearTimeout(T), T = setTimeout(function () {
            t.isScrolling = !1
        }, 250)
    })
}(mui, window), function (t, e) {
    var n = 0, i = function (i, r) {
        var o = t.gestures.session, a = this.options, s = t.now();
        switch (i.type) {
            case t.EVENT_MOVE:
                s - n > 300 && (n = s, o.flickStart = r.center);
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                r.flick = !1, o.flickStart && a.flickMaxTime > s - n && r.distance > a.flickMinDistince && (r.flick = !0, r.flickTime = s - n, r.flickDistanceX = r.center.x - o.flickStart.x, r.flickDistanceY = r.center.y - o.flickStart.y, t.trigger(o.target, e, r), t.trigger(o.target, e + r.direction, r))
        }
    };
    t.addGesture({name: e, index: 5, handle: i, options: {flickMaxTime: 200, flickMinDistince: 10}})
}(mui, "flick"), function (t, e) {
    var n = function (n, i) {
        var r = t.gestures.session;
        if (n.type === t.EVENT_END || n.type === t.EVENT_CANCEL) {
            var o = this.options;
            i.swipe = !1, i.direction && o.swipeMaxTime > i.deltaTime && i.distance > o.swipeMinDistince && (i.swipe = !0, t.trigger(r.target, e, i), t.trigger(r.target, e + i.direction, i))
        }
    };
    t.addGesture({name: e, index: 10, handle: n, options: {swipeMaxTime: 300, swipeMinDistince: 18}})
}(mui, "swipe"), function (t, e) {
    var n = function (n, i) {
        var r = t.gestures.session;
        switch (n.type) {
            case t.EVENT_START:
                break;
            case t.EVENT_MOVE:
                if (!i.direction || !r.target)return;
                r.lockDirection && r.startDirection && r.startDirection && r.startDirection !== i.direction && (i.direction = "up" === r.startDirection || "down" === r.startDirection ? 0 > i.deltaY ? "up" : "down" : 0 > i.deltaX ? "left" : "right"), r.drag || (r.drag = !0, t.trigger(r.target, e + "start", i)), t.trigger(r.target, e, i), t.trigger(r.target, e + i.direction, i);
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                r.drag && i.isFinal && t.trigger(r.target, e + "end", i)
        }
    };
    t.addGesture({name: e, index: 20, handle: n, options: {fingers: 1}})
}(mui, "drag"), function (t, e) {
    var n, i, r = function (r, o) {
        var a = t.gestures.session, s = this.options;
        switch (r.type) {
            case t.EVENT_END:
                if (!o.isFinal)return;
                var l = a.target;
                if (!l || l.disabled || l.classList && l.classList.contains("mui-disabled"))return;
                if (o.distance < s.tapMaxDistance && o.deltaTime < s.tapMaxTime) {
                    if (t.options.gestureConfig.doubletap && n && n === l && i && o.timestamp - i < s.tapMaxInterval)return t.trigger(l, "doubletap", o), i = t.now(), void(n = l);
                    t.trigger(l, e, o), i = t.now(), n = l
                }
        }
    };
    t.addGesture({
        name: e,
        index: 30,
        handle: r,
        options: {fingers: 1, tapMaxInterval: 300, tapMaxDistance: 5, tapMaxTime: 250}
    })
}(mui, "tap"), function (t, e) {
    var n, i = function (i, r) {
        var o = t.gestures.session, a = this.options;
        switch (i.type) {
            case t.EVENT_START:
                clearTimeout(n), n = setTimeout(function () {
                    t.trigger(o.target, e, r)
                }, a.holdTimeout);
                break;
            case t.EVENT_MOVE:
                r.distance > a.holdThreshold && clearTimeout(n);
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                clearTimeout(n)
        }
    };
    t.addGesture({name: e, index: 10, handle: i, options: {fingers: 1, holdTimeout: 500, holdThreshold: 2}})
}(mui, "longtap"), function (t, e) {
    var n, i = function (i, r) {
        var o = t.gestures.session, a = this.options;
        switch (i.type) {
            case t.EVENT_START:
                t.options.gestureConfig.hold && (n && clearTimeout(n), n = setTimeout(function () {
                    r.hold = !0, t.trigger(o.target, e, r)
                }, a.holdTimeout));
                break;
            case t.EVENT_MOVE:
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                n && (clearTimeout(n) && (n = null), t.trigger(o.target, "release", r))
        }
    };
    t.addGesture({name: e, index: 10, handle: i, options: {fingers: 1, holdTimeout: 0}})
}(mui, "hold"), function (t, e) {
    var n = function (n, i) {
        var r = this.options, o = t.gestures.session;
        switch (n.type) {
            case t.EVENT_START:
                break;
            case t.EVENT_MOVE:
                if (t.options.gestureConfig.pinch) {
                    if (2 > i.touches.length)return;
                    o.pinch || (o.pinch = !0, t.trigger(o.target, e + "start", i)), t.trigger(o.target, e, i);
                    var a = i.scale, s = i.rotation, l = i.lastScale === void 0 ? 1 : i.lastScale, c = 1e-12;
                    a > l ? (l = a - c, t.trigger(o.target, e + "out", i)) : l > a && (l = a + c, t.trigger(o.target, e + "in", i)), Math.abs(s) > r.minRotationAngle && t.trigger(o.target, "rotate", i)
                }
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                t.options.gestureConfig.pinch && o.pinch && 2 === i.touches.length && (o.pinch = !1, t.trigger(o.target, e + "end", i))
        }
    };
    t.addGesture({name: e, index: 10, handle: n, options: {minRotationAngle: 0}})
}(mui, "pinch"), function (t) {
    function e(t, e) {
        var n = "MUI_SCROLL_POSITION_" + document.location.href + "_" + e.src, i = parseFloat(localStorage.getItem(n)) || 0;
        i && !function (t) {
            e.onload = function () {
                window.scrollTo(0, t)
            }
        }(i), setInterval(function () {
            var t = window.scrollY;
            i !== t && (localStorage.setItem(n, t + ""), i = t)
        }, 100)
    }

    t.global = t.options = {
        gestureConfig: {
            tap: !0,
            doubletap: !1,
            longtap: !1,
            hold: !1,
            flick: !0,
            swipe: !0,
            drag: !0,
            pinch: !1
        }
    }, t.initGlobal = function (e) {
        return t.options = t.extend(!0, t.global, e), this
    };
    var n = {}, i = !1;
    t.init = function (e) {
        return i = !0, t.options = t.extend(!0, t.global, e || {}), t.ready(function () {
            t.doAction("inits", function (e, i) {
                var r = !(n[i.name] && !i.repeat);
                r && (i.handle.call(t), n[i.name] = !0)
            })
        }), this
    }, t.addInit = function (e) {
        return t.addAction("inits", e)
    }, t.addInit({
        name: "iframe", index: 100, handle: function () {
            var e = t.options, n = e.subpages || [];
            !t.os.plus && n.length && r(n[0])
        }
    });
    var r = function (n) {
        var i = document.createElement("div");
        i.className = "mui-iframe-wrapper";
        var r = n.styles || {};
        "string" != typeof r.top && (r.top = "0px"), "string" != typeof r.bottom && (r.bottom = "0px"), i.style.top = r.top, i.style.bottom = r.bottom;
        var o = document.createElement("iframe");
        o.src = n.url, o.id = n.id || n.url, o.name = o.id, i.appendChild(o), document.body.appendChild(i), t.os.wechat && e(i, o)
    };
    t(function () {
        var e = document.body.classList, n = [];
        t.os.ios ? (n.push({
            os: "ios",
            version: t.os.version
        }), e.add("mui-ios")) : t.os.android && (n.push({
            os: "android",
            version: t.os.version
        }), e.add("mui-android")), t.os.wechat && (n.push({
            os: "wechat",
            version: t.os.wechat.version
        }), e.add("mui-wechat")), n.length && t.each(n, function (n, i) {
            var r = "";
            i.version && t.each(i.version.split("."), function (n, o) {
                r = r + (r ? "-" : "") + o, e.add(t.className(i.os + "-" + r))
            })
        })
    })
}(mui), function (t) {
    var e = {
        swipeBack: !1,
        preloadPages: [],
        preloadLimit: 10,
        keyEventBind: {backbutton: !0, menubutton: !0}
    }, n = {autoShow: !0, duration: t.os.ios ? 200 : 100, aniShow: "slide-in-right"};
    t.options.show && (n = t.extend(!0, n, t.options.show)), t.currentWebview = null, t.isHomePage = !1, t.extend(!0, t.global, e), t.extend(!0, t.options, e), t.waitingOptions = function (e) {
        return t.extend(!0, {}, {autoShow: !0, title: "", modal: !1}, e)
    }, t.showOptions = function (e) {
        return t.extend(!0, {}, n, e)
    }, t.windowOptions = function (e) {
        return t.extend({scalable: !1, bounce: ""}, e)
    }, t.plusReady = function (t) {
        return window.plus ? setTimeout(function () {
            t()
        }, 0) : document.addEventListener("plusready", function () {
            t()
        }, !1), this
    }, t.fire = function (e, n, i) {
        e && ("" !== i && (i = i || {}, t.isPlainObject(i) && (i = JSON.stringify(i || {}).replace(/\'/g, "\\u0027").replace(/\\/g, "\\u005c"))), e.evalJS("typeof mui!=='undefined'&&mui.receive('" + n + "','" + i + "')"))
    }, t.receive = function (e, n) {
        if (e) {
            try {
                n && (n = JSON.parse(n))
            } catch (i) {
            }
            t.trigger(document, e, n)
        }
    };
    var i = function (e) {
        if (!e.preloaded) {
            t.fire(e, "preload");
            for (var n = e.children(), i = 0; n.length > i; i++)t.fire(n[i], "preload");
            e.preloaded = !0
        }
    }, r = function (e, n, i) {
        if (i) {
            if (!e[n + "ed"]) {
                t.fire(e, n);
                for (var r = e.children(), o = 0; r.length > o; o++)t.fire(r[o], n);
                e[n + "ed"] = !0
            }
        } else {
            t.fire(e, n);
            for (var r = e.children(), o = 0; r.length > o; o++)t.fire(r[o], n)
        }
    };
    t.openWindow = function (e, n, o) {
        if ("object" == typeof e ? (o = e, e = o.url, n = o.id || e) : "object" == typeof n ? (o = n, n = e) : n = n || e, !t.os.plus)return void(t.os.ios || t.os.android ? window.top.location.href = e : window.parent.location.href = e);
        if (window.plus) {
            o = o || {};
            var a, s, l = o.params || {}, c = null, u = null;
            if (t.webviews[n] && (u = t.webviews[n], plus.webview.getWebviewById(n) && (c = u.webview)), u && c)return a = u.show, a = o.show ? t.extend(a, o.show) : a, c.show(a.aniShow, a.duration, function () {
                i(c), r(c, "pagebeforeshow", !1)
            }), u.afterShowMethodName && c.evalJS(u.afterShowMethodName + "('" + JSON.stringify(l) + "')"), c;
            if (o.createNew !== !0) {
                if (c = plus.webview.getWebviewById(n))return a = t.showOptions(o.show), a.autoShow && c.show(a.aniShow, a.duration, function () {
                    i(c), r(c, "pagebeforeshow", !1)
                }), c;
                if (!e)throw Error("webview[" + n + "] does not exist")
            }
            var h = t.waitingOptions(o.waiting);
            if (h.autoShow && (s = plus.nativeUI.showWaiting(h.title, h.options)), o = t.extend(o, {
                    id: n,
                    url: e
                }), c = t.createWindow(o), a = t.showOptions(o.show), a.autoShow) {
                var f = function () {
                    s && s.close(), c.show(a.aniShow, a.duration, function () {
                    }), c.showed = !0, o.afterShowMethodName && c.evalJS(o.afterShowMethodName + "('" + JSON.stringify(l) + "')")
                };
                e ? (c.addEventListener("titleUpdate", f, !1), c.addEventListener("loaded", function () {
                    i(c), r(c, "pagebeforeshow", !1)
                }, !1)) : f()
            }
            return c
        }
    }, t.createWindow = function (e, n) {
        if (window.plus) {
            var i, r = e.id || e.url;
            if (e.preload) {
                t.webviews[r] && t.webviews[r].webview.getURL() ? i = t.webviews[r].webview : (e.createNew !== !0 && (i = plus.webview.getWebviewById(r)), i || (i = plus.webview.create(e.url, r, t.windowOptions(e.styles), t.extend({preload: !0}, e.extras)), e.subpages && t.each(e.subpages, function (e, n) {
                    var r = n.id || n.url;
                    if (r) {
                        var o = plus.webview.getWebviewById(r);
                        o || (o = plus.webview.create(n.url, r, t.windowOptions(n.styles), t.extend({preload: !0}, n.extras))), i.append(o)
                    }
                }))), t.webviews[r] = {
                    webview: i,
                    preload: !0,
                    show: t.showOptions(e.show),
                    afterShowMethodName: e.afterShowMethodName
                };
                var o = t.data.preloads, a = o.indexOf(r);
                if (~a && o.splice(a, 1), o.push(r), o.length > t.options.preloadLimit) {
                    var s = t.data.preloads.shift(), l = t.webviews[s];
                    l && l.webview && t.closeAll(l.webview), delete t.webviews[s]
                }
            } else n !== !1 && (i = plus.webview.create(e.url, r, t.windowOptions(e.styles), e.extras), e.subpages && t.each(e.subpages, function (e, n) {
                var r = n.id || n.url, o = plus.webview.getWebviewById(r);
                o || (o = plus.webview.create(n.url, r, t.windowOptions(n.styles), n.extras)), i.append(o)
            }));
            return i
        }
    }, t.preload = function (e) {
        return e.preload || (e.preload = !0), t.createWindow(e)
    }, t.closeOpened = function (e) {
        var n = e.opened();
        if (n)for (var i = 0, r = n.length; r > i; i++) {
            var o = n[i], a = o.opened();
            a && a.length > 0 ? (t.closeOpened(o), o.close("none")) : o.parent() !== e && o.close("none")
        }
    }, t.closeAll = function (e, n) {
        t.closeOpened(e), n ? e.close(n) : e.close()
    }, t.createWindows = function (e) {
        t.each(e, function (e, n) {
            t.createWindow(n, !1)
        })
    }, t.appendWebview = function (e) {
        if (window.plus) {
            var n, i = e.id || e.url;
            return t.webviews[i] || (plus.webview.getWebviewById(i) || (n = plus.webview.create(e.url, i, e.styles, e.extras)), plus.webview.currentWebview().append(n), t.webviews[i] = e), n
        }
    }, t.webviews = {}, t.data.preloads = [], t.plusReady(function () {
        t.currentWebview = plus.webview.currentWebview()
    }), t.addInit({
        name: "5+", index: 100, handle: function () {
            var e = t.options, n = e.subpages || [];
            t.os.plus && t.plusReady(function () {
                t.each(n, function (e, n) {
                    t.appendWebview(n)
                }), plus.webview.currentWebview() === plus.webview.getWebviewById(plus.runtime.appid) && (t.isHomePage = !0, setTimeout(function () {
                    i(plus.webview.currentWebview())
                }, 300)), t.os.ios && t.options.statusBarBackground && plus.navigator.setStatusBarBackground(t.options.statusBarBackground), t.os.android && 4.4 > parseFloat(t.os.version) && null == plus.webview.currentWebview().parent() && document.addEventListener("resume", function () {
                    var t = document.body;
                    t.style.display = "none", setTimeout(function () {
                        t.style.display = ""
                    }, 10)
                })
            })
        }
    }), window.addEventListener("preload", function () {
        var e = t.options.preloadPages || [];
        t.plusReady(function () {
            t.each(e, function (e, n) {
                t.createWindow(t.extend(n, {preload: !0}))
            })
        })
    }), t.supportStatusbarOffset = function () {
        return t.os.plus && t.os.ios && parseFloat(t.os.version) >= 7
    }, t.ready(function () {
        t.supportStatusbarOffset() && document.body.classList.add("mui-statusbar")
    })
}(mui), function (t, e) {
    t.addBack = function (e) {
        return t.addAction("backs", e)
    }, t.addBack({
        name: "browser", index: 100, handle: function () {
            return e.history.length > 1 ? (e.history.back(), !0) : !1
        }
    }), t.back = function () {
        ("function" != typeof t.options.beforeback || t.options.beforeback() !== !1) && t.doAction("backs")
    }, e.addEventListener("tap", function () {
        var e = t.targets.action;
        e && e.classList.contains("mui-action-back") && (t.back(), t.targets.action = !1)
    }), e.addEventListener("swiperight", function (e) {
        var n = e.detail;
        t.options.swipeBack === !0 && 3 > Math.abs(n.angle) && t.back()
    })
}(mui, window), function (t, e) {
    t.os.plus && t.os.android && t.addBack({
        name: "mui", index: 5, handle: function () {
            if (t.targets._popover && t.targets._popover.classList.contains("mui-active"))return t(t.targets._popover).popover("hide"), !0;
            var e = document.querySelector(".mui-off-canvas-wrap.mui-active");
            if (e)return t(e).offCanvas("close"), !0;
            var n = t.isFunction(t.getPreviewImage) && t.getPreviewImage();
            return n && n.isShown() ? (n.close(), !0) : t.closePopup()
        }
    }), t.__back__first = null, t.addBack({
        name: "5+", index: 10, handle: function () {
            if (!e.plus)return !1;
            var n = plus.webview.currentWebview(), i = n.parent();
            return i ? i.evalJS("mui&&mui.back();") : n.canBack(function (i) {
                i.canBack ? e.history.back() : n.id === plus.runtime.appid ? t.__back__first ? 2e3 > (new Date).getTime() - t.__back__first && plus.runtime.quit() : (t.__back__first = (new Date).getTime(), mui.toast("再按一次退出应用"), setTimeout(function () {
                    t.__back__first = null
                }, 2e3)) : n.preload ? n.hide("auto") : t.closeAll(n)
            }), !0
        }
    }), t.menu = function () {
        var n = document.querySelector(".mui-action-menu");
        if (n)t.trigger(n, t.EVENT_START), t.trigger(n, "tap"); else if (e.plus) {
            var i = t.currentWebview, r = i.parent();
            r && r.evalJS("mui&&mui.menu();")
        }
    };
    var n = function () {
        t.back()
    }, i = function () {
        t.menu()
    };
    t.plusReady(function () {
        t.options.keyEventBind.backbutton && plus.key.addEventListener("backbutton", n, !1), t.options.keyEventBind.menubutton && plus.key.addEventListener("menubutton", i, !1)
    }), t.addInit({
        name: "keyEventBind", index: 1e3, handle: function () {
            t.plusReady(function () {
                t.options.keyEventBind.backbutton || plus.key.removeEventListener("backbutton", n), t.options.keyEventBind.menubutton || plus.key.removeEventListener("menubutton", i)
            })
        }
    })
}(mui, window), function (t) {
    t.addInit({
        name: "pullrefresh", index: 1e3, handle: function () {
            var e = t.options, n = e.pullRefresh || {}, i = n.down && n.down.hasOwnProperty("callback"), r = n.up && n.up.hasOwnProperty("callback");
            if (i || r) {
                var o = n.container;
                if (o) {
                    var a = t(o);
                    1 === a.length && (t.os.plus && t.os.android ? t.plusReady(function () {
                        var e = plus.webview.currentWebview();
                        if (r) {
                            var o = {};
                            o.up = n.up, o.webviewId = e.id || e.getURL(), a.pullRefresh(o)
                        }
                        if (i) {
                            var s = e.parent(), l = e.id || e.getURL();
                            if (s) {
                                r || a.pullRefresh({webviewId: l});
                                var c = {webviewId: l};
                                c.down = t.extend({}, n.down), c.down.callback = "_CALLBACK", s.evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(c) + "')")
                            }
                        }
                    }) : a.pullRefresh(n))
                }
            }
        }
    })
}(mui), function (t, e, n) {
    var i = "application/json", r = "text/html", o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, a = /^(?:text|application)\/javascript/i, s = /^(?:text|application)\/xml/i, l = /^\s*$/;
    t.ajaxSettings = {
        type: "GET",
        beforeSend: t.noop,
        success: t.noop,
        error: t.noop,
        complete: t.noop,
        context: null,
        xhr: function () {
            return new e.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: i,
            xml: "application/xml, text/xml",
            html: r,
            text: "text/plain"
        },
        timeout: 0,
        processData: !0,
        cache: !0
    };
    var c = function (t, e) {
        var n = e.context;
        return e.beforeSend.call(n, t, e) === !1 ? !1 : void 0
    }, u = function (t, e, n) {
        n.success.call(n.context, t, "success", e), f("success", e, n)
    }, h = function (t, e, n, i) {
        i.error.call(i.context, n, e, t), f(e, n, i)
    }, f = function (t, e, n) {
        n.complete.call(n.context, e, t)
    }, d = function (e, n, i, r) {
        var o, a = t.isArray(n), s = t.isPlainObject(n);
        t.each(n, function (n, l) {
            o = t.type(l), r && (n = i ? r : r + "[" + (s || "object" === o || "array" === o ? n : "") + "]"), !r && a ? e.add(l.name, l.value) : "array" === o || !i && "object" === o ? d(e, l, i, n) : e.add(n, l)
        })
    }, p = function (e) {
        if (e.processData && e.data && "string" != typeof e.data) {
            var r = e.contentType;
            !r && e.headers && (r = e.headers["Content-Type"]), e.data = r && ~r.indexOf(i) ? JSON.stringify(e.data) : t.param(e.data, e.traditional)
        }
        !e.data || e.type && "GET" !== e.type.toUpperCase() || (e.url = m(e.url, e.data), e.data = n)
    }, m = function (t, e) {
        return "" === e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }, v = function (t) {
        return t && (t = t.split(";", 2)[0]), t && (t === r ? "html" : t === i ? "json" : a.test(t) ? "script" : s.test(t) && "xml") || "text"
    }, g = function (e, i, r, o) {
        return t.isFunction(i) && (o = r, r = i, i = n), t.isFunction(r) || (o = r, r = n), {
            url: e,
            data: i,
            success: r,
            dataType: o
        }
    };
    t.ajax = function (i, r) {
        "object" == typeof i && (r = i, i = n);
        var o = r || {};
        o.url = i || o.url;
        for (var a in t.ajaxSettings)o[a] === n && (o[a] = t.ajaxSettings[a]);
        p(o);
        var s = o.dataType;
        o.cache !== !1 && (r && r.cache === !0 || "script" !== s) || (o.url = m(o.url, "_=" + t.now()));
        var f, d = o.accepts[s && s.toLowerCase()], g = {}, b = function (t, e) {
            g[t.toLowerCase()] = [t, e]
        }, $ = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : e.location.protocol, w = o.xhr(o), y = w.setRequestHeader;
        if (b("X-Requested-With", "XMLHttpRequest"), b("Accept", d || "*/*"), (d = o.mimeType || d) && (d.indexOf(",") > -1 && (d = d.split(",", 2)[0]), w.overrideMimeType && w.overrideMimeType(d)), (o.contentType || o.contentType !== !1 && o.data && "GET" !== o.type.toUpperCase()) && b("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers)for (var x in o.headers)b(x, o.headers[x]);
        if (w.setRequestHeader = b, w.onreadystatechange = function () {
                if (4 === w.readyState) {
                    w.onreadystatechange = t.noop, clearTimeout(f);
                    var e, n = !1, i = "file:" === $;
                    if (w.status >= 200 && 300 > w.status || 304 === w.status || 0 === w.status && i && w.responseText) {
                        s = s || v(o.mimeType || w.getResponseHeader("content-type")), e = w.responseText;
                        try {
                            "script" === s ? (1, eval)(e) : "xml" === s ? e = w.responseXML : "json" === s && (e = l.test(e) ? null : t.parseJSON(e))
                        } catch (r) {
                            n = r
                        }
                        n ? h(n, "parsererror", w, o) : u(e, w, o)
                    } else {
                        var a = w.status ? "error" : "abort", c = w.statusText || null;
                        i && (a = "error", c = "404"), h(c, a, w, o)
                    }
                }
            }, c(w, o) === !1)return w.abort(), h(null, "abort", w, o), w;
        if (o.xhrFields)for (var x in o.xhrFields)w[x] = o.xhrFields[x];
        var E = "async" in o ? o.async : !0;
        w.open(o.type.toUpperCase(), o.url, E, o.username, o.password);
        for (var x in g)g.hasOwnProperty(x) && y.apply(w, g[x]);
        return o.timeout > 0 && (f = setTimeout(function () {
            w.onreadystatechange = t.noop, w.abort(), h(null, "timeout", w, o)
        }, o.timeout)), w.send(o.data ? o.data : null), w
    }, t.param = function (t, e) {
        var n = [];
        return n.add = function (t, e) {
            this.push(encodeURIComponent(t) + "=" + encodeURIComponent(e))
        }, d(n, t, e), n.join("&").replace(/%20/g, "+")
    }, t.get = function () {
        return t.ajax(g.apply(null, arguments))
    }, t.post = function () {
        var e = g.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
    }, t.getJSON = function () {
        var e = g.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
    }, t.fn.load = function (e, n, i) {
        if (!this.length)return this;
        var r, a = this, s = e.split(/\s/), l = g(e, n, i), c = l.success;
        return s.length > 1 && (l.url = s[0], r = s[1]), l.success = function (t) {
            if (r) {
                var e = document.createElement("div");
                e.innerHTML = t.replace(o, "");
                var n = document.createElement("div"), i = e.querySelectorAll(r);
                if (i && i.length > 0)for (var s = 0, l = i.length; l > s; s++)n.appendChild(i[s]);
                a[0].innerHTML = n.innerHTML
            } else a[0].innerHTML = t;
            c && c.apply(a, arguments)
        }, t.ajax(l), this
    }
}(mui, window), function (t) {
    var e = document.createElement("a");
    e.href = window.location.href, t.plusReady(function () {
        t.ajaxSettings = t.extend(t.ajaxSettings, {
            xhr: function (t) {
                if (t.crossDomain)return new plus.net.XMLHttpRequest;
                if ("file:" !== e.protocol) {
                    var n = document.createElement("a");
                    if (n.href = t.url, n.href = n.href, t.crossDomain = e.protocol + "//" + e.host != n.protocol + "//" + n.host, t.crossDomain)return new plus.net.XMLHttpRequest
                }
                return new window.XMLHttpRequest
            }
        })
    })
}(mui), function (t, e, n) {
    t.offset = function (t) {
        var i = {top: 0, left: 0};
        return typeof t.getBoundingClientRect !== n && (i = t.getBoundingClientRect()), {
            top: i.top + e.pageYOffset - t.clientTop,
            left: i.left + e.pageXOffset - t.clientLeft
        }
    }
}(mui, window), function (t, e) {
    t.scrollTo = function (t, n, i) {
        n = n || 1e3;
        var r = function (n) {
            if (0 >= n)return e.scrollTo(0, t), void(i && i());
            var o = t - e.scrollY;
            setTimeout(function () {
                e.scrollTo(0, e.scrollY + 10 * (o / n)), r(n - 10)
            }, 16.7)
        };
        r(n)
    }, t.animationFrame = function (t) {
        var e, n, i;
        return function () {
            e = arguments, i = this, n || (n = !0, requestAnimationFrame(function () {
                t.apply(i, e), n = !1
            }))
        }
    }
}(mui, window), function (t) {
    var e = !1, n = /xyz/.test(function () {
    }) ? /\b_super\b/ : /.*/, i = function () {
    };
    i.extend = function (t) {
        function i() {
            !e && this.init && this.init.apply(this, arguments)
        }

        var r = this.prototype;
        e = !0;
        var o = new this;
        e = !1;
        for (var a in t)o[a] = "function" == typeof t[a] && "function" == typeof r[a] && n.test(t[a]) ? function (t, e) {
            return function () {
                var n = this._super;
                this._super = r[t];
                var i = e.apply(this, arguments);
                return this._super = n, i
            }
        }(a, t[a]) : t[a];
        return i.prototype = o, i.prototype.constructor = i, i.extend = arguments.callee, i
    }, t.Class = i
}(mui), function (t, e) {
    var n = "mui-pull-top-pocket", i = "mui-pull-bottom-pocket", r = "mui-pull", o = "mui-pull-loading", a = "mui-pull-caption", s = "mui-pull-caption-down", l = "mui-pull-caption-refresh", c = "mui-pull-caption-nomore", u = "mui-icon", h = "mui-spinner", f = "mui-icon-pulldown", d = "mui-block", p = "mui-hidden", m = "mui-visibility", v = o + " " + u + " " + f, g = o + " " + u + " " + f, b = o + " " + u + " " + h, $ = ['<div class="' + r + '">', '<div class="{icon}"></div>', '<div class="' + a + '">{contentrefresh}</div>', "</div>"].join(""), w = {
        init: function (e, n) {
            this._super(e, t.extend(!0, {
                scrollY: !0,
                scrollX: !1,
                indicators: !0,
                deceleration: .003,
                down: {
                    height: 50,
                    contentinit: "下拉可以刷新",
                    contentdown: "下拉可以刷新",
                    contentover: "释放立即刷新",
                    contentrefresh: "正在刷新..."
                },
                up: {
                    height: 50,
                    auto: !1,
                    contentinit: "上拉显示更多",
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了",
                    duration: 300
                }
            }, n))
        }, _init: function () {
            this._super(), this._initPocket()
        }, _initPulldownRefresh: function () {
            this.pulldown = !0, this.pullPocket = this.topPocket, this.pullPocket.classList.add(d), this.pullPocket.classList.add(m), this.pullCaption = this.topCaption, this.pullLoading = this.topLoading
        }, _initPullupRefresh: function () {
            this.pulldown = !1, this.pullPocket = this.bottomPocket, this.pullPocket.classList.add(d), this.pullPocket.classList.add(m), this.pullCaption = this.bottomCaption, this.pullLoading = this.bottomLoading
        }, _initPocket: function () {
            var t = this.options;
            t.down && t.down.hasOwnProperty("callback") && (this.topPocket = this.scroller.querySelector("." + n), this.topPocket || (this.topPocket = this._createPocket(n, t.down, g), this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild)), this.topLoading = this.topPocket.querySelector("." + o), this.topCaption = this.topPocket.querySelector("." + a)), t.up && t.up.hasOwnProperty("callback") && (this.bottomPocket = this.scroller.querySelector("." + i), this.bottomPocket || (this.bottomPocket = this._createPocket(i, t.up, b), this.scroller.appendChild(this.bottomPocket)), this.bottomLoading = this.bottomPocket.querySelector("." + o), this.bottomCaption = this.bottomPocket.querySelector("." + a), this.wrapper.addEventListener("scrollbottom", this))
        }, _createPocket: function (t, n, i) {
            var r = e.createElement("div");
            return r.className = t, r.innerHTML = $.replace("{contentrefresh}", n.contentinit).replace("{icon}", i), r
        }, _resetPullDownLoading: function () {
            var t = this.pullLoading;
            t && (this.pullCaption.innerHTML = this.options.down.contentdown, t.style.webkitTransition = "", t.style.webkitTransform = "", t.style.webkitAnimation = "", t.className = g)
        }, _setCaptionClass: function (t, e, n) {
            if (!t)switch (n) {
                case this.options.up.contentdown:
                    e.className = a + " " + s;
                    break;
                case this.options.up.contentrefresh:
                    e.className = a + " " + l;
                    break;
                case this.options.up.contentnomore:
                    e.className = a + " " + c
            }
        }, _setCaption: function (t, e) {
            if (!this.loading) {
                var n = this.options, i = this.pullPocket, r = this.pullCaption, o = this.pullLoading, a = this.pulldown, s = this;
                i && (e ? setTimeout(function () {
                    r.innerHTML = s.lastTitle = t, a ? o.className = g : (s._setCaptionClass(!1, r, t), o.className = b), o.style.webkitAnimation = "", o.style.webkitTransition = "", o.style.webkitTransform = ""
                }, 100) : t !== this.lastTitle && (r.innerHTML = t, a ? t === n.down.contentrefresh ? (o.className = b, o.style.webkitAnimation = "spinner-spin 1s step-end infinite") : t === n.down.contentover ? (o.className = v, o.style.webkitTransition = "-webkit-transform 0.3s ease-in", o.style.webkitTransform = "rotate(180deg)") : t === n.down.contentdown && (o.className = g, o.style.webkitTransition = "-webkit-transform 0.3s ease-in", o.style.webkitTransform = "rotate(0deg)") : (o.className = t === n.up.contentrefresh ? b + " " + m : b + " " + p, s._setCaptionClass(!1, r, t)), this.lastTitle = t))
            }
        }
    };
    t.PullRefresh = w
}(mui, document), function (t, e, n, i) {
    var r = "mui-scroll", o = "mui-scrollbar", a = "mui-scrollbar-indicator", s = o + "-vertical", l = o + "-horizontal", c = "mui-active", u = {
        quadratic: {
            style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fn: function (t) {
                return t * (2 - t)
            }
        },
        circular: {
            style: "cubic-bezier(0.1, 0.57, 0.1, 1)", fn: function (t) {
                return Math.sqrt(1 - --t * t)
            }
        },
        outCirc: {style: "cubic-bezier(0.075, 0.82, 0.165, 1)"},
        outCubic: {style: "cubic-bezier(0.165, 0.84, 0.44, 1)"}
    }, h = t.Class.extend({
        init: function (e, n) {
            this.wrapper = this.element = e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller && this.scroller.style, this.stopped = !1, this.options = t.extend(!0, {
                scrollY: !0,
                scrollX: !1,
                startX: 0,
                startY: 0,
                indicators: !0,
                stopPropagation: !1,
                hardwareAccelerated: !0,
                fixedBadAndorid: !1,
                preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/},
                momentum: !0,
                snapX: .5,
                snap: !1,
                bounce: !0,
                bounceTime: 500,
                bounceEasing: u.outCirc,
                scrollTime: 500,
                scrollEasing: u.outCubic,
                directionLockThreshold: 5,
                parallaxElement: !1,
                parallaxRatio: .5
            }, n), this.x = 0, this.y = 0, this.translateZ = this.options.hardwareAccelerated ? " translateZ(0)" : "", this._init(), this.scroller && (this.refresh(), this.scrollTo(this.options.startX, this.options.startY))
        }, _init: function () {
            this._initParallax(), this._initIndicators(), this._initEvent()
        }, _initParallax: function () {
            this.options.parallaxElement && (this.parallaxElement = n.querySelector(this.options.parallaxElement), this.parallaxStyle = this.parallaxElement.style, this.parallaxHeight = this.parallaxElement.offsetHeight, this.parallaxImgStyle = this.parallaxElement.querySelector("img").style)
        }, _initIndicators: function () {
            var t = this;
            if (t.indicators = [], this.options.indicators) {
                var e, n = [];
                t.options.scrollY && (e = {
                    el: this._createScrollBar(s),
                    listenX: !1
                }, this.wrapper.appendChild(e.el), n.push(e)), this.options.scrollX && (e = {
                    el: this._createScrollBar(l),
                    listenY: !1
                }, this.wrapper.appendChild(e.el), n.push(e));
                for (var i = n.length; i--;)this.indicators.push(new f(this, n[i]))
            }
        }, _initSnap: function () {
            this.currentPage = {}, this.pages = [];
            for (var t = this.snaps, e = t.length, n = 0, i = -1, r = 0, o = 0, a = 0, s = 0, l = 0; e > l; l++) {
                var u = t[l], h = u.offsetLeft, f = u.offsetWidth;
                (0 === l || t[l - 1].offsetLeft >= h) && (n = 0, i++), this.pages[n] || (this.pages[n] = []), r = this._getSnapX(h), s = Math.round(f * this.options.snapX), o = r - s, a = r - f + s, this.pages[n][i] = {
                    x: r,
                    leftX: o,
                    rightX: a,
                    pageX: n,
                    element: u
                }, u.classList.contains(c) && (this.currentPage = this.pages[n][0]), r >= this.maxScrollX && n++
            }
            this.options.startX = this.currentPage.x || 0
        }, _getSnapX: function (t) {
            return Math.max(Math.min(0, -t + this.wrapperWidth / 2), this.maxScrollX)
        }, _gotoPage: function (t) {
            this.currentPage = this.pages[Math.min(t, this.pages.length - 1)][0];
            for (var e = 0, n = this.snaps.length; n > e; e++)e === t ? this.snaps[e].classList.add(c) : this.snaps[e].classList.remove(c);
            this.scrollTo(this.currentPage.x, 0, this.options.scrollTime)
        }, _nearestSnap: function (t) {
            if (!this.pages.length)return {x: 0, pageX: 0};
            var e = 0, n = this.pages.length;
            for (t > 0 ? t = 0 : this.maxScrollX > t && (t = this.maxScrollX); n > e; e++) {
                var i = "left" === this.direction ? this.pages[e][0].leftX : this.pages[e][0].rightX;
                if (t >= i)return this.pages[e][0]
            }
            return {x: 0, pageX: 0}
        }, _initEvent: function (n) {
            var i = n ? "removeEventListener" : "addEventListener";
            e[i]("orientationchange", this), e[i]("resize", this), this.scroller[i]("webkitTransitionEnd", this), this.wrapper[i](t.EVENT_START, this), this.wrapper[i](t.EVENT_CANCEL, this), this.wrapper[i](t.EVENT_END, this), this.wrapper[i]("drag", this), this.wrapper[i]("dragend", this), this.wrapper[i]("flick", this), this.wrapper[i]("scrollend", this), this.options.scrollX && this.wrapper[i]("swiperight", this);
            var r = this.wrapper.querySelector(".mui-segmented-control");
            r && mui(r)[n ? "off" : "on"]("click", "a", t.preventDefault), this.wrapper[i]("scrollstart", this), this.wrapper[i]("refresh", this)
        }, _handleIndicatorScrollend: function () {
            this.indicators.map(function (t) {
                t.fade()
            })
        }, _handleIndicatorScrollstart: function () {
            this.indicators.map(function (t) {
                t.fade(1)
            })
        }, _handleIndicatorRefresh: function () {
            this.indicators.map(function (t) {
                t.refresh()
            })
        }, handleEvent: function (e) {
            if (this.stopped)return void this.resetPosition();
            switch (e.type) {
                case t.EVENT_START:
                    this._start(e);
                    break;
                case"drag":
                    this.options.stopPropagation && e.stopPropagation(), this._drag(e);
                    break;
                case"dragend":
                case"flick":
                    this.options.stopPropagation && e.stopPropagation(), this._flick(e);
                    break;
                case t.EVENT_CANCEL:
                case t.EVENT_END:
                    this._end(e);
                    break;
                case"webkitTransitionEnd":
                    this.transitionTimer && this.transitionTimer.cancel(), this._transitionEnd(e);
                    break;
                case"scrollstart":
                    this._handleIndicatorScrollstart(e);
                    break;
                case"scrollend":
                    this._handleIndicatorScrollend(e), this._scrollend(e), e.stopPropagation();
                    break;
                case"orientationchange":
                case"resize":
                    this._resize();
                    break;
                case"swiperight":
                    e.stopPropagation();
                    break;
                case"refresh":
                    this._handleIndicatorRefresh(e)
            }
        }, _start: function (e) {
            if (this.moved = this.needReset = !1, this._transitionTime(), this.isInTransition) {
                this.needReset = !0, this.isInTransition = !1;
                var n = t.parseTranslateMatrix(t.getStyles(this.scroller, "webkitTransform"));
                this.setTranslate(Math.round(n.x), Math.round(n.y)), t.trigger(this.scroller, "scrollend", this), e.preventDefault()
            }
            this.reLayout(), t.trigger(this.scroller, "beforescrollstart", this)
        }, _getDirectionByAngle: function (t) {
            return -80 > t && t > -100 ? "up" : t >= 80 && 100 > t ? "down" : t >= 170 || -170 >= t ? "left" : t >= -35 && 10 >= t ? "right" : null
        }, _drag: function (n) {
            var i = n.detail;
            if ((this.options.scrollY || "up" === i.direction || "down" === i.direction) && t.os.ios && parseFloat(t.os.version) >= 8) {
                var r = i.gesture.touches[0].clientY;
                if (r + 10 > e.innerHeight || 10 > r)return void this.resetPosition(this.options.bounceTime)
            }
            var o = isReturn = !1;
            if (this._getDirectionByAngle(i.angle), "left" === i.direction || "right" === i.direction ? this.options.scrollX ? (o = !0, this.moved || (t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = i.direction)) : this.options.scrollY && !this.moved && (isReturn = !0) : "up" === i.direction || "down" === i.direction ? this.options.scrollY ? (o = !0, this.moved || (t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = i.direction)) : this.options.scrollX && !this.moved && (isReturn = !0) : isReturn = !0, (this.moved || o) && (n.stopPropagation(), i.gesture && i.gesture.preventDefault()), !isReturn) {
                this.moved ? n.stopPropagation() : t.trigger(this.scroller, "scrollstart", this);
                var a = 0, s = 0;
                this.moved ? (a = i.deltaX - t.gestures.session.prevTouch.deltaX, s = i.deltaY - t.gestures.session.prevTouch.deltaY) : (a = i.deltaX, s = i.deltaY);
                var l = Math.abs(i.deltaX), c = Math.abs(i.deltaY);
                l > c + this.options.directionLockThreshold ? s = 0 : c >= l + this.options.directionLockThreshold && (a = 0), a = this.hasHorizontalScroll ? a : 0, s = this.hasVerticalScroll ? s : 0;
                var u = this.x + a, h = this.y + s;
                (u > 0 || this.maxScrollX > u) && (u = this.options.bounce ? this.x + a / 3 : u > 0 ? 0 : this.maxScrollX), (h > 0 || this.maxScrollY > h) && (h = this.options.bounce ? this.y + s / 3 : h > 0 ? 0 : this.maxScrollY), this.requestAnimationFrame || this._updateTranslate(), this.direction = i.deltaX > 0 ? "right" : "left", this.moved = !0, this.x = u, this.y = h, t.trigger(this.scroller, "scroll", this)
            }
        }, _flick: function (e) {
            if (this.moved) {
                e.stopPropagation();
                var n = e.detail;
                if (this._clearRequestAnimationFrame(), "dragend" !== e.type || !n.flick) {
                    var i = Math.round(this.x), r = Math.round(this.y);
                    if (this.isInTransition = !1, !this.resetPosition(this.options.bounceTime)) {
                        if (this.scrollTo(i, r), "dragend" === e.type)return void t.trigger(this.scroller, "scrollend", this);
                        var o = 0, a = "";
                        return this.options.momentum && 300 > n.flickTime && (momentumX = this.hasHorizontalScroll ? this._momentum(this.x, n.flickDistanceX, n.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                            destination: i,
                            duration: 0
                        }, momentumY = this.hasVerticalScroll ? this._momentum(this.y, n.flickDistanceY, n.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                            destination: r,
                            duration: 0
                        }, i = momentumX.destination, r = momentumY.destination, o = Math.max(momentumX.duration, momentumY.duration), this.isInTransition = !0), i != this.x || r != this.y ? ((i > 0 || this.maxScrollX > i || r > 0 || this.maxScrollY > r) && (a = u.quadratic), void this.scrollTo(i, r, o, a)) : void t.trigger(this.scroller, "scrollend", this)
                    }
                }
            }
        }, _end: function (e) {
            this.needReset = !1, (!this.moved && this.needReset || e.type === t.EVENT_CANCEL) && this.resetPosition()
        }, _transitionEnd: function (e) {
            e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, t.trigger(this.scroller, "scrollend", this)))
        }, _scrollend: function () {
            (0 === this.y && 0 === this.maxScrollY || Math.abs(this.y) > 0 && this.y <= this.maxScrollY) && t.trigger(this.scroller, "scrollbottom", this)
        }, _resize: function () {
            var t = this;
            clearTimeout(t.resizeTimeout), t.resizeTimeout = setTimeout(function () {
                t.refresh()
            }, t.options.resizePolling)
        }, _transitionTime: function (e) {
            if (e = e || 0, this.scrollerStyle.webkitTransitionDuration = e + "ms", this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = e + "ms"), this.options.fixedBadAndorid && !e && t.os.isBadAndroid && (this.scrollerStyle.webkitTransitionDuration = "0.001s", this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = "0.001s")), this.indicators)for (var n = this.indicators.length; n--;)this.indicators[n].transitionTime(e);
            e && (this.transitionTimer && this.transitionTimer.cancel(), this.transitionTimer = t.later(function () {
                t.trigger(this.scroller, "webkitTransitionEnd")
            }, e + 100, this))
        }, _transitionTimingFunction: function (t) {
            if (this.scrollerStyle.webkitTransitionTimingFunction = t, this.parallaxElement && this.options.scrollY && (this.parallaxStyle.webkitTransitionDuration = t), this.indicators)for (var e = this.indicators.length; e--;)this.indicators[e].transitionTimingFunction(t)
        }, _translate: function (t, e) {
            this.x = t, this.y = e
        }, _clearRequestAnimationFrame: function () {
            this.requestAnimationFrame && (cancelAnimationFrame(this.requestAnimationFrame), this.requestAnimationFrame = null)
        }, _updateTranslate: function () {
            var t = this;
            (t.x !== t.lastX || t.y !== t.lastY) && t.setTranslate(t.x, t.y), t.requestAnimationFrame = requestAnimationFrame(function () {
                t._updateTranslate()
            })
        }, _createScrollBar: function (t) {
            var e = n.createElement("div"), i = n.createElement("div");
            return e.className = o + " " + t, i.className = a, e.appendChild(i), t === s ? (this.scrollbarY = e, this.scrollbarIndicatorY = i) : t === l && (this.scrollbarX = e, this.scrollbarIndicatorX = i), this.wrapper.appendChild(e), e
        }, _preventDefaultException: function (t, e) {
            for (var n in e)if (e[n].test(t[n]))return !0;
            return !1
        }, _reLayout: function () {
            if (this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.indicators.map(function (t) {
                    t.refresh()
                }), this.options.snap && "string" == typeof this.options.snap) {
                var t = this.scroller.querySelectorAll(this.options.snap);
                this.itemLength = 0, this.snaps = [];
                for (var e = 0, n = t.length; n > e; e++) {
                    var i = t[e];
                    i.parentNode === this.scroller && (this.itemLength++, this.snaps.push(i))
                }
                this._initSnap()
            }
        }, _momentum: function (t, e, n, r, o, a) {
            var s, l, c = parseFloat(Math.abs(e) / n);
            return a = a === i ? 6e-4 : a, s = t + c * c / (2 * a) * (0 > e ? -1 : 1), l = c / a, r > s ? (s = o ? r - o / 2.5 * (c / 8) : r, e = Math.abs(s - t), l = e / c) : s > 0 && (s = o ? o / 2.5 * (c / 8) : 0, e = Math.abs(t) + s, l = e / c), {
                destination: Math.round(s),
                duration: l
            }
        }, _getTranslateStr: function (t, e) {
            return this.options.hardwareAccelerated ? "translate3d(" + t + "px," + e + "px,0px) " + this.translateZ : "translate(" + t + "px," + e + "px) "
        }, setStopped: function (t) {
            this.stopped = !!t
        }, setTranslate: function (e, n) {
            if (this.x = e, this.y = n, this.scrollerStyle.webkitTransform = this._getTranslateStr(e, n), this.parallaxElement && this.options.scrollY) {
                var i = n * this.options.parallaxRatio, r = 1 + i / ((this.parallaxHeight - i) / 2);
                r > 1 ? (this.parallaxImgStyle.opacity = 1 - i / 100 * this.options.parallaxRatio, this.parallaxStyle.webkitTransform = this._getTranslateStr(0, -i) + " scale(" + r + "," + r + ")") : (this.parallaxImgStyle.opacity = 1, this.parallaxStyle.webkitTransform = this._getTranslateStr(0, -1) + " scale(1,1)")
            }
            if (this.indicators)for (var o = this.indicators.length; o--;)this.indicators[o].updatePosition();
            this.lastX = this.x, this.lastY = this.y, t.trigger(this.scroller, "scroll", this)
        }, reLayout: function () {
            this.wrapper.offsetHeight;
            var e = parseFloat(t.getStyles(this.wrapper, "padding-left")) || 0, n = parseFloat(t.getStyles(this.wrapper, "padding-right")) || 0, i = parseFloat(t.getStyles(this.wrapper, "padding-top")) || 0, r = parseFloat(t.getStyles(this.wrapper, "padding-bottom")) || 0, o = this.wrapper.clientWidth, a = this.wrapper.clientHeight;
            this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.wrapperWidth = o - e - n, this.wrapperHeight = a - i - r, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0), this.hasHorizontalScroll = this.options.scrollX && 0 > this.maxScrollX, this.hasVerticalScroll = this.options.scrollY && 0 > this.maxScrollY, this._reLayout()
        }, resetPosition: function (t) {
            var e = this.x, n = this.y;
            return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? n = 0 : this.y < this.maxScrollY && (n = this.maxScrollY), e == this.x && n == this.y ? !1 : (this.scrollTo(e, n, t, this.options.scrollEasing), !0)
        }, _reInit: function () {
            for (var t = this.wrapper.querySelectorAll("." + r), e = 0, n = t.length; n > e; e++)if (t[e].parentNode === this.wrapper) {
                this.scroller = t[e];
                break
            }
            this.scrollerStyle = this.scroller && this.scroller.style
        }, refresh: function () {
            this._reInit(), this.reLayout(), t.trigger(this.scroller, "refresh", this), this.resetPosition()
        }, scrollTo: function (t, e, n, i) {
            var i = i || u.circular;
            this.isInTransition = n > 0, this.isInTransition ? (this._clearRequestAnimationFrame(), this._transitionTimingFunction(i.style), this._transitionTime(n), this.setTranslate(t, e)) : this.setTranslate(t, e)
        }, scrollToBottom: function (t, e) {
            t = t || this.options.scrollTime, this.scrollTo(0, this.maxScrollY, t, e)
        }, gotoPage: function (t) {
            this._gotoPage(t)
        }, destroy: function () {
            this._initEvent(!0), delete t.data[this.wrapper.getAttribute("data-scroll")], this.wrapper.setAttribute("data-scroll", "")
        }
    }), f = function (e, i) {
        this.wrapper = "string" == typeof i.el ? n.querySelector(i.el) : i.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.options = t.extend({
            listenX: !0,
            listenY: !0,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        }, i), this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.fade && (this.wrapperStyle.webkitTransform = this.scroller.translateZ, this.wrapperStyle.webkitTransitionDuration = this.options.fixedBadAndorid && t.os.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
    };
    f.prototype = {
        handleEvent: function () {
        }, transitionTime: function (e) {
            e = e || 0, this.indicatorStyle.webkitTransitionDuration = e + "ms", this.scroller.options.fixedBadAndorid && !e && t.os.isBadAndroid && (this.indicatorStyle.webkitTransitionDuration = "0.001s")
        }, transitionTimingFunction: function (t) {
            this.indicatorStyle.webkitTransitionTimingFunction = t
        }, refresh: function () {
            this.transitionTime(), this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.wrapper.offsetHeight, this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = this.wrapperWidth - this.indicatorWidth, this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX, this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        }, updatePosition: function () {
            var t = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0, e = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;
            this.minBoundaryX > t ? (this.width = Math.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px", t = this.minBoundaryX) : t > this.maxBoundaryX ? (this.width = Math.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), this.minBoundaryY > e ? (this.height = Math.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px", e = this.minBoundaryY) : e > this.maxBoundaryY ? (this.height = Math.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"), this.x = t, this.y = e, this.indicatorStyle.webkitTransform = this.scroller._getTranslateStr(t, e)
        }, fade: function (t, e) {
            if (!e || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var n = t ? 250 : 500, i = t ? 0 : 300;
                t = t ? "1" : "0", this.wrapperStyle.webkitTransitionDuration = n + "ms", this.fadeTimeout = setTimeout(function (t) {
                    this.wrapperStyle.opacity = t, this.visible = +t
                }.bind(this, t), i)
            }
        }
    }, t.Scroll = h, t.fn.scroll = function (e) {
        var n = [];
        return this.each(function () {
            var i = null, r = this, o = r.getAttribute("data-scroll");
            if (o)i = t.data[o]; else {
                o = ++t.uuid;
                var a = t.extend({}, e);
                r.classList.contains("mui-segmented-control") && (a = t.extend(a, {
                    scrollY: !1,
                    scrollX: !0,
                    indicators: !1,
                    snap: ".mui-control-item"
                })), t.data[o] = i = new h(r, a), r.setAttribute("data-scroll", o)
            }
            n.push(i)
        }), 1 === n.length ? n[0] : n
    }
}(mui, window, document), function (t, e, n, i) {
    var r = "mui-visibility", o = "mui-hidden", a = t.Scroll.extend(t.extend({
        handleEvent: function (t) {
            this._super(t), "scrollbottom" === t.type && t.target === this.scroller && this._scrollbottom()
        }, _scrollbottom: function () {
            this.pulldown || this.loading || (this.pulldown = !1, this._initPullupRefresh(), this.pullupLoading())
        }, _start: function (t) {
            t.touches && t.touches.length && t.touches[0].clientX > 30 && t.target && !this._preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault(), this.loading || (this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = !1), this._super(t)
        }, _drag: function (t) {
            this._super(t), !this.pulldown && !this.loading && this.topPocket && "down" === t.detail.direction && this.y >= 0 && this._initPulldownRefresh(), this.pulldown && this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown)
        }, _reLayout: function () {
            this.hasVerticalScroll = !0, this._super()
        }, resetPosition: function (t) {
            if (this.pulldown) {
                if (this.y >= this.options.down.height)return this.pulldownLoading(i, t || 0), !0;
                !this.loading && this.topPocket.classList.remove(r)
            }
            return this._super(t)
        }, pulldownLoading: function (t, e) {
            if (t === void 0 && (t = this.options.down.height), this.scrollTo(0, t, e, this.options.bounceEasing), !this.loading) {
                this._initPulldownRefresh(), this._setCaption(this.options.down.contentrefresh), this.loading = !0, this.indicators.map(function (t) {
                    t.fade(0)
                });
                var n = this.options.down.callback;
                n && n.call(this)
            }
        }, endPulldownToRefresh: function () {
            var t = this;
            t.topPocket && t.loading && this.pulldown && (t.scrollTo(0, 0, t.options.bounceTime, t.options.bounceEasing), t.loading = !1, t._setCaption(t.options.down.contentdown, !0), setTimeout(function () {
                t.loading || t.topPocket.classList.remove(r)
            }, 350))
        }, pullupLoading: function (t, e, n) {
            e = e || 0, this.scrollTo(e, this.maxScrollY, n, this.options.bounceEasing), this.loading || (this._initPullupRefresh(), this._setCaption(this.options.up.contentrefresh), this.indicators.map(function (t) {
                t.fade(0)
            }), this.loading = !0, t = t || this.options.up.callback, t && t.call(this))
        }, endPullupToRefresh: function (t) {
            var e = this;
            e.bottomPocket && (e.loading = !1, t ? (this.finished = !0, e._setCaption(e.options.up.contentnomore), e.wrapper.removeEventListener("scrollbottom", e)) : (e._setCaption(e.options.up.contentdown), e.loading || e.bottomPocket.classList.remove(r)))
        }, disablePullupToRefresh: function () {
            this._initPullupRefresh(), this.bottomPocket.className = "mui-pull-bottom-pocket " + o, this.wrapper.removeEventListener("scrollbottom", this)
        }, enablePullupToRefresh: function () {
            this._initPullupRefresh(), this.bottomPocket.classList.remove(o), this._setCaption(this.options.up.contentdown), this.wrapper.addEventListener("scrollbottom", this)
        }, refresh: function (t) {
            t && this.finished && (this.enablePullupToRefresh(), this.finished = !1), this._super()
        }
    }, t.PullRefresh));
    t.fn.pullRefresh = function (e) {
        if (1 === this.length) {
            var n = this[0], i = null;
            e = e || {};
            var r = n.getAttribute("data-pullrefresh");
            return r ? i = t.data[r] : (r = ++t.uuid, t.data[r] = i = new a(n, e), n.setAttribute("data-pullrefresh", r)), e.down && e.down.auto ? i.pulldownLoading(e.down.autoY) : e.up && e.up.auto && i.pullupLoading(), i
        }
    }
}(mui, window, document), function (t, e) {
    var n = "mui-slider", i = "mui-slider-group", r = "mui-slider-loop", o = "mui-action-previous", a = "mui-action-next", s = "mui-slider-item", l = "mui-active", c = "." + s, u = ".mui-slider-progress-bar", h = t.Slider = t.Scroll.extend({
        init: function (e, n) {
            this._super(e, t.extend(!0, {
                fingers: 1,
                interval: 0,
                scrollY: !1,
                scrollX: !0,
                indicators: !1,
                scrollTime: 1e3,
                startX: !1,
                slideTime: 0,
                snap: c
            }, n)), this.options.startX
        }, _init: function () {
            this._reInit(), this.scroller && (this.scrollerStyle = this.scroller.style, this.progressBar = this.wrapper.querySelector(u), this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style), this._super(), this._initTimer())
        }, _triggerSlide: function () {
            var e = this;
            e.isInTransition = !1, e.currentPage, e.slideNumber = e._fixedSlideNumber(), e.loop && (0 === e.slideNumber ? e.setTranslate(e.pages[1][0].x, 0) : e.slideNumber === e.itemLength - 3 && e.setTranslate(e.pages[e.itemLength - 2][0].x, 0)), e.lastSlideNumber != e.slideNumber && (e.lastSlideNumber = e.slideNumber, e.lastPage = e.currentPage, t.trigger(e.wrapper, "slide", {slideNumber: e.slideNumber})), e._initTimer()
        }, _handleSlide: function (e) {
            var n = this;
            if (e.target === n.wrapper) {
                var i = e.detail;
                i.slideNumber = i.slideNumber || 0;
                for (var r = n.scroller.querySelectorAll(c), o = [], a = 0, s = r.length; s > a; a++) {
                    var u = r[a];
                    u.parentNode === n.scroller && o.push(u)
                }
                var h = i.slideNumber;
                if (n.loop && (h += 1), !n.wrapper.classList.contains("mui-segmented-control"))for (var a = 0, s = o.length; s > a; a++) {
                    var u = o[a];
                    u.parentNode === n.scroller && (a === h ? u.classList.add(l) : u.classList.remove(l))
                }
                var f = n.wrapper.querySelector(".mui-slider-indicator");
                if (f) {
                    f.getAttribute("data-scroll") && t(f).scroll().gotoPage(i.slideNumber);
                    var d = f.querySelectorAll(".mui-indicator");
                    if (d.length > 0)for (var a = 0, s = d.length; s > a; a++)d[a].classList[a === i.slideNumber ? "add" : "remove"](l); else {
                        var p = f.querySelector(".mui-number span");
                        if (p)p.innerText = i.slideNumber + 1; else for (var m = f.querySelectorAll(".mui-control-item"), a = 0, s = m.length; s > a; a++)m[a].classList[a === i.slideNumber ? "add" : "remove"](l)
                    }
                }
                e.stopPropagation()
            }
        }, _handleTabShow: function (t) {
            var e = this;
            e.gotoItem(t.detail.tabNumber || 0, e.options.slideTime)
        }, _handleIndicatorTap: function (t) {
            var e = this, n = t.target;
            (n.classList.contains(o) || n.classList.contains(a)) && (e[n.classList.contains(o) ? "prevItem" : "nextItem"](), t.stopPropagation())
        }, _initEvent: function (e) {
            var n = this;
            n._super(e);
            var i = e ? "removeEventListener" : "addEventListener";
            n.wrapper[i]("slide", this), n.wrapper[i](t.eventName("shown", "tab"), this)
        }, handleEvent: function (e) {
            switch (this._super(e), e.type) {
                case"slide":
                    this._handleSlide(e);
                    break;
                case t.eventName("shown", "tab"):
                    ~this.snaps.indexOf(e.target) && this._handleTabShow(e)
            }
        }, _scrollend: function (t) {
            this._super(t), this._triggerSlide(t)
        }, _drag: function (t) {
            this._super(t);
            var n = t.detail.direction;
            if ("left" === n || "right" === n) {
                var i = this.wrapper.getAttribute("data-slidershowTimer");
                i && e.clearTimeout(i), t.stopPropagation()
            }
        }, _initTimer: function () {
            var t = this, n = t.wrapper, i = t.options.interval, r = n.getAttribute("data-slidershowTimer");
            r && e.clearTimeout(r), i && (r = e.setTimeout(function () {
                n && ((n.offsetWidth || n.offsetHeight) && t.nextItem(!0), t._initTimer())
            }, i), n.setAttribute("data-slidershowTimer", r))
        }, _fixedSlideNumber: function (t) {
            t = t || this.currentPage;
            var e = t.pageX;
            return this.loop && (e = 0 === t.pageX ? this.itemLength - 3 : t.pageX === this.itemLength - 1 ? 0 : t.pageX - 1), e
        }, _reLayout: function () {
            this.hasHorizontalScroll = !0, this.loop = this.scroller.classList.contains(r), this._super()
        }, _getScroll: function () {
            var e = t.parseTranslateMatrix(t.getStyles(this.scroller, "webkitTransform"));
            return e ? e.x : 0
        }, _transitionEnd: function (e) {
            e.target === this.scroller && this.isInTransition && (this._transitionTime(), this.isInTransition = !1, t.trigger(this.wrapper, "scrollend", this))
        }, _flick: function (t) {
            if (this.moved) {
                var e = t.detail, n = e.direction;
                this._clearRequestAnimationFrame(), this.isInTransition = !0, "flick" === t.type ? (200 > e.deltaTime && (this.x = this._getPage(this.slideNumber + ("right" === n ? -1 : 1), !0).x), this.resetPosition(this.options.bounceTime)) : "dragend" !== t.type || e.flick || this.resetPosition(this.options.bounceTime), t.stopPropagation()
            }
        }, _initSnap: function () {
            if (this.scrollerWidth = this.itemLength * this.scrollerWidth, this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0), this._super(), this.currentPage.x)this.slideNumber = this._fixedSlideNumber(), this.lastSlideNumber = this.lastSlideNumber === void 0 ? this.slideNumber : this.lastSlideNumber; else {
                var t = this.pages[this.loop ? 1 : 0];
                if (t = t || this.pages[0], !t)return;
                this.currentPage = t[0], this.slideNumber = 0, this.lastSlideNumber = this.lastSlideNumber === void 0 ? 0 : this.lastSlideNumber
            }
            this.options.startX = this.currentPage.x || 0
        }, _getSnapX: function (t) {
            return Math.max(-t, this.maxScrollX)
        }, _getPage: function (t, e) {
            return this.loop ? t > this.itemLength - (e ? 2 : 3) ? (t = 1, time = 0) : (e ? -1 : 0) > t ? (t = this.itemLength - 2, time = 0) : t += 1 : (e || (t > this.itemLength - 1 ? (t = 0, time = 0) : 0 > t && (t = this.itemLength - 1, time = 0)), t = Math.min(Math.max(0, t), this.itemLength - 1)), this.pages[t][0]
        }, _gotoItem: function (e, n) {
            this.currentPage = this._getPage(e, !0), this.scrollTo(this.currentPage.x, 0, n, this.options.scrollEasing), 0 === n && t.trigger(this.wrapper, "scrollend", this)
        }, setTranslate: function (t, e) {
            this._super(t, e);
            var n = this.progressBar;
            n && (this.progressBarStyle.webkitTransform = this._getTranslateStr(-t * (this.progressBarWidth / this.wrapperWidth), 0))
        }, resetPosition: function (t) {
            return t = t || 0, this.x > 0 ? this.x = 0 : this.x < this.maxScrollX && (this.x = this.maxScrollX), this.currentPage = this._nearestSnap(this.x), this.scrollTo(this.currentPage.x, 0, t, this.options.scrollEasing), !0
        }, gotoItem: function (t, e) {
            this._gotoItem(t, e === void 0 ? this.options.scrollTime : e)
        }, nextItem: function () {
            this._gotoItem(this.slideNumber + 1, this.options.scrollTime)
        }, prevItem: function () {
            this._gotoItem(this.slideNumber - 1, this.options.scrollTime)
        }, getSlideNumber: function () {
            return this.slideNumber || 0
        }, _reInit: function () {
            for (var t = this.wrapper.querySelectorAll("." + i), e = 0, n = t.length; n > e; e++)if (t[e].parentNode === this.wrapper) {
                this.scroller = t[e];
                break
            }
            this.scrollerStyle = this.scroller && this.scroller.style, this.progressBar && (this.progressBarWidth = this.progressBar.offsetWidth, this.progressBarStyle = this.progressBar.style)
        }, refresh: function (e) {
            e ? (t.extend(this.options, e), this._super(), this._initTimer()) : this._super()
        }, destroy: function () {
            this._initEvent(!0), delete t.data[this.wrapper.getAttribute("data-slider")], this.wrapper.setAttribute("data-slider", "")
        }
    });
    t.fn.slider = function (e) {
        var i = null;
        return this.each(function () {
            var r = this;
            if (this.classList.contains(n) || (r = this.querySelector("." + n)), r && r.querySelector(c)) {
                var o = r.getAttribute("data-slider");
                o ? (i = t.data[o], i && e && i.refresh(e)) : (o = ++t.uuid, t.data[o] = i = new h(r, e), r.setAttribute("data-slider", o))
            }
        }), i
    }, t.ready(function () {
        t(".mui-slider").slider(), t(".mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control").scroll({
            scrollY: !1,
            scrollX: !0,
            indicators: !1,
            snap: ".mui-control-item"
        })
    })
}(mui, window), function (t, e) {
    if (t.os.plus && t.os.android) {
        var n = "mui-plus-pullrefresh", i = "mui-visibility", r = "mui-hidden", o = "mui-block", a = "mui-pull-caption", s = "mui-pull-caption-down", l = "mui-pull-caption-refresh", c = "mui-pull-caption-nomore", u = t.Class.extend({
            init: function (t, e) {
                this.element = t, this.options = e, this.wrapper = this.scroller = t, this._init(), this._initPulldownRefreshEvent()
            }, _init: function () {
                var t = this;
                window.addEventListener("dragup", t), e.addEventListener("plusscrollbottom", t), t.scrollInterval = window.setInterval(function () {
                    t.isScroll && !t.loading && window.pageYOffset + window.innerHeight + 10 >= e.documentElement.scrollHeight && (t.isScroll = !1, t.bottomPocket && t.pullupLoading())
                }, 100)
            }, _initPulldownRefreshEvent: function () {
                var e = this;
                e.topPocket && e.options.webviewId && t.plusReady(function () {
                    var t = plus.webview.getWebviewById(e.options.webviewId);
                    if (t) {
                        e.options.webview = t;
                        var n = e.options.down, i = n.height;
                        t.addEventListener("dragBounce", function (i) {
                            switch (e.pulldown ? e.pullPocket.classList.add(o) : e._initPulldownRefresh(), i.status) {
                                case"beforeChangeOffset":
                                    e._setCaption(n.contentdown);
                                    break;
                                case"afterChangeOffset":
                                    e._setCaption(n.contentover);
                                    break;
                                case"dragEndAfterChangeOffset":
                                    t.evalJS("mui&&mui.options.pullRefresh.down.callback()"), e._setCaption(n.contentrefresh)
                            }
                        }, !1), t.setBounce({position: {top: 2 * i + "px"}, changeoffset: {top: i + "px"}})
                    }
                })
            }, handleEvent: function (t) {
                var e = this;
                e.stopped || (e.isScroll = !1, ("dragup" === t.type || "plusscrollbottom" === t.type) && (e.isScroll = !0, setTimeout(function () {
                    e.isScroll = !1
                }, 1e3)))
            }
        }).extend(t.extend({
            setStopped: function (t) {
                this.stopped = !!t;
                var e = plus.webview.currentWebview();
                if (this.stopped)e.setStyle({bounce: "none"}), e.setBounce({position: {top: "none"}}); else {
                    var n = this.options.down.height;
                    e.setStyle({bounce: "vertical"}), e.setBounce({
                        position: {top: 2 * n + "px"},
                        changeoffset: {top: n + "px"}
                    })
                }
            }, pulldownLoading: function () {
                t.plusReady(function () {
                    plus.webview.currentWebview().setBounce({offset: {top: this.options.down.height + "px"}})
                }.bind(this))
            }, _pulldownLoading: function () {
                var e = this;
                t.plusReady(function () {
                    var t = plus.webview.getWebviewById(e.options.webviewId);
                    t.setBounce({offset: {top: e.options.down.height + "px"}})
                })
            }, endPulldownToRefresh: function () {
                var t = plus.webview.currentWebview();
                t.parent().evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({webviewId: t.id}) + "')._endPulldownToRefresh()")
            }, _endPulldownToRefresh: function () {
                var t = this;
                t.topPocket && t.options.webview && (t.options.webview.endPullToRefresh(), t.loading = !1, t._setCaption(t.options.down.contentdown, !0), setTimeout(function () {
                    t.loading || t.topPocket.classList.remove(o)
                }, 350))
            }, pullupLoading: function (t) {
                var e = this;
                e.isLoading || (e.isLoading = !0, e.pulldown !== !1 ? e._initPullupRefresh() : this.pullPocket.classList.add(o), setTimeout(function () {
                    e.pullLoading.classList.add(i), e.pullLoading.classList.remove(r), e.pullCaption.innerHTML = "", e.pullCaption.className = a + " " + l, e.pullCaption.innerHTML = e.options.up.contentrefresh, t = t || e.options.up.callback, t && t.call(e)
                }, 300))
            }, endPullupToRefresh: function (t) {
                var n = this;
                n.pullLoading && (n.pullLoading.classList.remove(i), n.pullLoading.classList.add(r), n.isLoading = !1, t ? (n.finished = !0, n.pullCaption.className = a + " " + c, n.pullCaption.innerHTML = n.options.up.contentnomore, e.removeEventListener("plusscrollbottom", n), window.removeEventListener("dragup", n)) : (n.pullCaption.className = a + " " + s, n.pullCaption.innerHTML = n.options.up.contentdown))
            }, disablePullupToRefresh: function () {
                this._initPullupRefresh(), this.bottomPocket.className = "mui-pull-bottom-pocket " + r, window.removeEventListener("dragup", this)
            }, enablePullupToRefresh: function () {
                this._initPullupRefresh(), this.bottomPocket.classList.remove(r), this.pullCaption.className = a + " " + s, this.pullCaption.innerHTML = this.options.up.contentdown, e.addEventListener("plusscrollbottom", this), window.addEventListener("dragup", this)
            }, scrollTo: function (e, n, i) {
                t.scrollTo(n, i)
            }, scrollToBottom: function (n) {
                t.scrollTo(e.documentElement.scrollHeight, n)
            }, refresh: function (t) {
                t && this.finished && (this.enablePullupToRefresh(), this.finished = !1)
            }
        }, t.PullRefresh));
        t.fn.pullRefresh = function (i) {
            var r;
            0 === this.length ? (r = e.createElement("div"), r.className = "mui-content", e.body.appendChild(r)) : r = this[0];
            var o = i;
            i = i || {}, "string" == typeof i && (i = t.parseJSON(i)), !i.webviewId && (i.webviewId = plus.webview.currentWebview().id || plus.webview.currentWebview().getURL());
            var a = null, s = i.webviewId && i.webviewId.replace(/\//g, "_"), l = r.getAttribute("data-pullrefresh-plus-" + s);
            return l || o !== void 0 ? (l ? a = t.data[l] : (l = ++t.uuid, r.setAttribute("data-pullrefresh-plus-" + s, l), e.body.classList.add(n), t.data[l] = a = new u(r, i)), i.down && i.down.auto ? a._pulldownLoading() : i.up && i.up.auto && a.pullupLoading(), a) : !1
        }
    }
}(mui, document), function (t, e, n, i) {
    var r = "mui-off-canvas-left", o = "mui-off-canvas-right", a = "mui-off-canvas-backdrop", s = "mui-off-canvas-wrap", l = "mui-slide-in", c = "mui-active", u = "mui-transitioning", h = ".mui-inner-wrap", f = t.Class.extend({
        init: function (e, i) {
            this.wrapper = this.element = e, this.scroller = this.wrapper.querySelector(h), this.classList = this.wrapper.classList, this.scroller && (this.options = t.extend(!0, {
                dragThresholdX: 10,
                scale: .8,
                opacity: .1,
                preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/}
            }, i), n.body.classList.add("mui-fullscreen"), this.refresh(), this.initEvent())
        }, _preventDefaultException: function (t, e) {
            for (var n in e)if (e[n].test(t[n]))return !0;
            return !1
        }, refresh: function (t) {
            this.slideIn = this.classList.contains(l), this.scalable = this.classList.contains("mui-scalable") && !this.slideIn, this.scroller = this.wrapper.querySelector(h), this.offCanvasLefts = this.wrapper.querySelectorAll("." + r), this.offCanvasRights = this.wrapper.querySelectorAll("." + o), t ? t.classList.contains(r) ? this.offCanvasLeft = t : t.classList.contains(o) && (this.offCanvasRight = t) : (this.offCanvasRight = this.wrapper.querySelector("." + o), this.offCanvasLeft = this.wrapper.querySelector("." + r)), this.offCanvasRightWidth = this.offCanvasLeftWidth = 0, this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = !1, this.offCanvasRight && (this.offCanvasRightWidth = this.offCanvasRight.offsetWidth, this.offCanvasRightSlideIn = this.slideIn && this.offCanvasRight.parentNode === this.wrapper), this.offCanvasLeft && (this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth, this.offCanvasLeftSlideIn = this.slideIn && this.offCanvasLeft.parentNode === this.wrapper), this.backdrop = this.scroller.querySelector("." + a), this.options.dragThresholdX = this.options.dragThresholdX || 10, this.visible = !1, this.startX = null, this.lastX = null, this.offsetX = null, this.lastTranslateX = null
        }, handleEvent: function (e) {
            switch (e.type) {
                case t.EVENT_START:
                    e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
                    break;
                case"webkitTransitionEnd":
                    e.target === this.scroller && this._dispatchEvent();
                    break;
                case"drag":
                    var n = e.detail;
                    this.startX ? this.lastX = n.center.x : (this.startX = n.center.x, this.lastX = this.startX), !this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && ("left" === n.direction || "right" === n.direction) && (this.slideIn ? (this.scroller = this.wrapper.querySelector(h), this.classList.contains(c) ? this.offCanvasRight && this.offCanvasRight.classList.contains(c) ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : "left" === n.direction && this.offCanvasRight ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === n.direction && this.offCanvasLeft ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : this.scroller = null) : this.classList.contains(c) ? "left" === n.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : "right" === n.direction ? (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth) : (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth), this.offCanvas && this.scroller && (this.startX = this.lastX, this.isDragging = !0, t.gestures.session.lockDirection = !0, t.gestures.session.startDirection = n.direction, this.offCanvas.classList.remove(u), this.scroller.classList.remove(u), this.offsetX = this.getTranslateX(), this._initOffCanvasVisible())), this.isDragging && (this.updateTranslate(this.offsetX + (this.lastX - this.startX)), n.gesture.preventDefault(), e.stopPropagation());
                    break;
                case"dragend":
                    if (this.isDragging) {
                        var n = e.detail, i = n.direction;
                        this.isDragging = !1, this.offCanvas.classList.add(u), this.scroller.classList.add(u);
                        var r = 0, o = this.getTranslateX();
                        if (this.slideIn) {
                            if (r = o >= 0 ? this.offCanvasRightWidth && o / this.offCanvasRightWidth || 0 : this.offCanvasLeftWidth && o / this.offCanvasLeftWidth || 0, "right" === i && 0 >= r && (r >= -.5 || n.swipe) ? this.openPercentage(100) : "right" === i && r > 0 && (r >= .5 || n.swipe) ? this.openPercentage(0) : "right" === i && -.5 >= r ? this.openPercentage(0) : "right" === i && r > 0 && .5 >= r ? this.openPercentage(-100) : "left" === i && r >= 0 && (.5 >= r || n.swipe) ? this.openPercentage(-100) : "left" === i && 0 > r && (-.5 >= r || n.swipe) ? this.openPercentage(0) : "left" === i && r >= .5 ? this.openPercentage(0) : "left" === i && r >= -.5 && 0 > r ? this.openPercentage(100) : this.openPercentage(0), 1 === r || -1 === r || 0 === r)return void this._dispatchEvent()
                        } else {
                            if (r = o >= 0 ? this.offCanvasLeftWidth && o / this.offCanvasLeftWidth || 0 : this.offCanvasRightWidth && o / this.offCanvasRightWidth || 0, 0 === r)return this.openPercentage(0), void this._dispatchEvent();
                            "right" === i && r >= 0 && (r >= .5 || n.swipe) ? this.openPercentage(100) : "right" === i && 0 > r && (r > -.5 || n.swipe) ? this.openPercentage(0) : "right" === i && r > 0 && .5 > r ? this.openPercentage(0) : "right" === i && .5 > r ? this.openPercentage(-100) : "left" === i && 0 >= r && (-.5 >= r || n.swipe) ? this.openPercentage(-100) : "left" === i && r > 0 && (.5 >= r || n.swipe) ? this.openPercentage(0) : "left" === i && 0 > r && r >= -.5 ? this.openPercentage(0) : "left" === i && r > .5 ? this.openPercentage(100) : this.openPercentage(0), (1 === r || -1 === r) && this._dispatchEvent()
                        }
                    }
            }
        }, _dispatchEvent: function () {
            this.classList.contains(c) ? t.trigger(this.wrapper, "shown", this) : t.trigger(this.wrapper, "hidden", this)
        }, _initOffCanvasVisible: function () {
            this.visible || (this.visible = !0, this.offCanvasLeft && (this.offCanvasLeft.style.visibility = "visible"), this.offCanvasRight && (this.offCanvasRight.style.visibility = "visible"))
        }, initEvent: function () {
            var e = this;
            e.backdrop && e.backdrop.addEventListener("tap", function (t) {
                e.close(), t.detail.gesture.preventDefault()
            }), this.classList.contains("mui-draggable") && (this.wrapper.addEventListener(t.EVENT_START, this), this.wrapper.addEventListener("drag", this), this.wrapper.addEventListener("dragend", this)), this.wrapper.addEventListener("webkitTransitionEnd", this)
        }, openPercentage: function (t) {
            var e = t / 100;
            this.slideIn ? (this.offCanvasLeft && t >= 0 ? (e = 0 === e ? -1 : 0, this.updateTranslate(this.offCanvasLeftWidth * e), this.offCanvasLeft.classList[0 !== t ? "add" : "remove"](c)) : this.offCanvasRight && 0 >= t && (e = 0 === e ? 1 : 0, this.updateTranslate(this.offCanvasRightWidth * e), this.offCanvasRight.classList[0 !== t ? "add" : "remove"](c)), this.classList[0 !== t ? "add" : "remove"](c)) : (this.offCanvasLeft && t >= 0 ? (this.updateTranslate(this.offCanvasLeftWidth * e), this.offCanvasLeft.classList[0 !== e ? "add" : "remove"](c)) : this.offCanvasRight && 0 >= t && (this.updateTranslate(this.offCanvasRightWidth * e), this.offCanvasRight.classList[0 !== e ? "add" : "remove"](c)), this.classList[0 !== e ? "add" : "remove"](c))
        }, updateTranslate: function (e) {
            if (e !== this.lastTranslateX) {
                if (this.slideIn) {
                    if (this.offCanvas.classList.contains(o)) {
                        if (0 > e)return void this.setTranslateX(0);
                        if (e > this.offCanvasRightWidth)return void this.setTranslateX(this.offCanvasRightWidth)
                    } else {
                        if (e > 0)return void this.setTranslateX(0);
                        if (-this.offCanvasLeftWidth > e)return void this.setTranslateX(-this.offCanvasLeftWidth)
                    }
                    this.setTranslateX(e)
                } else {
                    if (!this.offCanvasLeft && e > 0 || !this.offCanvasRight && 0 > e)return void this.setTranslateX(0);
                    if (this.leftShowing && e > this.offCanvasLeftWidth)return void this.setTranslateX(this.offCanvasLeftWidth);
                    if (this.rightShowing && -this.offCanvasRightWidth > e)return void this.setTranslateX(-this.offCanvasRightWidth);
                    this.setTranslateX(e), e >= 0 ? (this.leftShowing = !0, this.rightShowing = !1, e > 0 && (this.offCanvasLeft && t.each(this.offCanvasLefts, function (t, e) {
                        e === this.offCanvasLeft ? this.offCanvasLeft.style.zIndex = 0 : e.style.zIndex = -1
                    }.bind(this)), this.offCanvasRight && (this.offCanvasRight.style.zIndex = -1))) : (this.rightShowing = !0, this.leftShowing = !1, this.offCanvasRight && t.each(this.offCanvasRights, function (t, e) {
                        e.style.zIndex = e === this.offCanvasRight ? 0 : -1
                    }.bind(this)), this.offCanvasLeft && (this.offCanvasLeft.style.zIndex = -1))
                }
                this.lastTranslateX = e
            }
        }, setTranslateX: t.animationFrame(function (t) {
            if (this.scroller)if (this.scalable && this.offCanvas.parentNode === this.wrapper) {
                var e = Math.abs(t) / this.offCanvasWidth, n = 1 - (1 - this.options.scale) * e, i = this.options.scale + (1 - this.options.scale) * e, o = (1 - (1 - this.options.opacity) * e, this.options.opacity + (1 - this.options.opacity) * e);
                this.offCanvas.classList.contains(r) ? (this.offCanvas.style.webkitTransformOrigin = "-100%", this.scroller.style.webkitTransformOrigin = "left") : (this.offCanvas.style.webkitTransformOrigin = "200%", this.scroller.style.webkitTransformOrigin = "right"), this.offCanvas.style.opacity = o, this.offCanvas.style.webkitTransform = "translate3d(0,0,0) scale(" + i + ")", this.scroller.style.webkitTransform = "translate3d(" + t + "px,0,0) scale(" + n + ")"
            } else this.slideIn ? this.offCanvas.style.webkitTransform = "translate3d(" + t + "px,0,0)" : this.scroller.style.webkitTransform = "translate3d(" + t + "px,0,0)"
        }), getTranslateX: function () {
            if (this.offCanvas) {
                var e = this.slideIn ? this.offCanvas : this.scroller, n = t.parseTranslateMatrix(t.getStyles(e, "webkitTransform"));
                return n && n.x || 0
            }
            return 0
        }, isShown: function (t) {
            var e = !1;
            if (this.slideIn)e = "left" === t ? this.classList.contains(c) && this.wrapper.querySelector("." + r + "." + c) : "right" === t ? this.classList.contains(c) && this.wrapper.querySelector("." + o + "." + c) : this.classList.contains(c) && (this.wrapper.querySelector("." + r + "." + c) || this.wrapper.querySelector("." + o + "." + c)); else {
                var n = this.getTranslateX();
                e = "right" === t ? this.classList.contains(c) && 0 > n : "left" === t ? this.classList.contains(c) && n > 0 : this.classList.contains(c) && 0 !== n
            }
            return e
        }, close: function () {
            this._initOffCanvasVisible(), this.offCanvas = this.wrapper.querySelector("." + o + "." + c) || this.wrapper.querySelector("." + r + "." + c), this.offCanvasWidth = this.offCanvas.offsetWidth, this.scroller && (this.offCanvas.offsetHeight, this.offCanvas.classList.add(u), this.scroller.classList.add(u), this.openPercentage(0))
        }, show: function (t) {
            return this._initOffCanvasVisible(), this.isShown(t) ? !1 : (t || (t = this.wrapper.querySelector("." + o) ? "right" : "left"), "right" === t ? (this.offCanvas = this.offCanvasRight, this.offCanvasWidth = this.offCanvasRightWidth) : (this.offCanvas = this.offCanvasLeft, this.offCanvasWidth = this.offCanvasLeftWidth), this.scroller && (this.offCanvas.offsetHeight, this.offCanvas.classList.add(u), this.scroller.classList.add(u), this.openPercentage("left" === t ? 100 : -100)), !0)
        }, toggle: function (t) {
            var e = t;
            t && t.classList && (e = t.classList.contains(r) ? "left" : "right", this.refresh(t)), this.show(e) || this.close()
        }
    }), d = function (t) {
        if (parentNode = t.parentNode) {
            if (parentNode.classList.contains(s))return parentNode;
            if (parentNode = parentNode.parentNode, parentNode.classList.contains(s))return parentNode
        }
    }, p = function (e, i) {
        if ("A" === i.tagName && i.hash) {
            var r = n.getElementById(i.hash.replace("#", ""));
            if (r) {
                var o = d(r);
                if (o)return t.targets._container = o, r
            }
        }
        return !1
    };
    t.registerTarget({
        name: i,
        index: 60,
        handle: p,
        target: !1,
        isReset: !1,
        isContinue: !0
    }), e.addEventListener("tap", function (e) {
        if (t.targets.offcanvas)for (var i = e.target; i && i !== n; i = i.parentNode)if ("A" === i.tagName && i.hash && i.hash === "#" + t.targets.offcanvas.id) {
            e.detail && e.detail.gesture && e.detail.gesture.preventDefault(), t(t.targets._container).offCanvas().toggle(t.targets.offcanvas), t.targets.offcanvas = t.targets._container = null;
            break
        }
    }), t.fn.offCanvas = function (e) {
        var n = [];
        return this.each(function () {
            var i = null, r = this;
            r.classList.contains(s) || (r = d(r));
            var o = r.getAttribute("data-offCanvas");
            o ? i = t.data[o] : (o = ++t.uuid, t.data[o] = i = new f(r, e), r.setAttribute("data-offCanvas", o)), ("show" === e || "close" === e || "toggle" === e) && i.toggle(), n.push(i)
        }), 1 === n.length ? n[0] : n
    }, t.ready(function () {
        t(".mui-off-canvas-wrap").offCanvas()
    })
}(mui, window, document, "offcanvas"), function (t, e) {
    var n = "mui-action", i = function (t, e) {
        var i = e.className || "";
        return "string" != typeof i && (i = ""), i && ~i.indexOf(n) ? (e.classList.contains("mui-action-back") && t.preventDefault(), e) : !1
    };
    t.registerTarget({name: e, index: 50, handle: i, target: !1, isContinue: !0})
}(mui, "action"), function (t, e, n, i) {
    var r = "mui-modal", o = function (t, e) {
        if ("A" === e.tagName && e.hash) {
            var i = n.getElementById(e.hash.replace("#", ""));
            if (i && i.classList.contains(r))return i
        }
        return !1
    };
    t.registerTarget({
        name: i,
        index: 50,
        handle: o,
        target: !1,
        isReset: !1,
        isContinue: !0
    }), e.addEventListener("tap", function (e) {
        t.targets.modal && (e.detail.gesture.preventDefault(), t.targets.modal.classList.toggle("mui-active"))
    })
}(mui, window, document, "modal"), function (t, e, n, i) {
    var r = "mui-popover", o = "mui-popover-arrow", a = "mui-popover-action", s = "mui-backdrop", l = "mui-bar-popover", c = "mui-bar-backdrop", u = "mui-backdrop-action", h = "mui-active", f = "mui-bottom", d = function (e, i) {
        if ("A" === i.tagName && i.hash) {
            if (t.targets._popover = n.getElementById(i.hash.replace("#", "")), t.targets._popover && t.targets._popover.classList.contains(r))return i;
            t.targets._popover = null
        }
        return !1
    };
    t.registerTarget({name: i, index: 60, handle: d, target: !1, isReset: !1, isContinue: !0});
    var p, m = function () {
    }, v = function () {
        this.removeEventListener("webkitTransitionEnd", v), this.addEventListener(t.EVENT_MOVE, t.preventDefault), t.trigger(this, "shown", this)
    }, g = function () {
        y(this, "none"), this.removeEventListener("webkitTransitionEnd", g), this.removeEventListener(t.EVENT_MOVE, t.preventDefault), m(!1), t.trigger(this, "hidden", this)
    }, b = function () {
        var e = n.createElement("div");
        return e.classList.add(s), e.addEventListener(t.EVENT_MOVE, t.preventDefault), e.addEventListener("tap", function () {
            var e = t.targets._popover;
            e && (e.addEventListener("webkitTransitionEnd", g), e.classList.remove(h), $(e), n.body.setAttribute("style", ""))
        }), e
    }(), $ = function (e) {
        b.setAttribute("style", "opacity:0"), t.targets.popover = t.targets._popover = null, p = t.later(function () {
            !e.classList.contains(h) && b.parentNode && b.parentNode === n.body && n.body.removeChild(b)
        }, 350)
    };
    e.addEventListener("tap", function (e) {
        if (t.targets.popover) {
            for (var i = !1, r = e.target; r && r !== n; r = r.parentNode)r === t.targets.popover && (i = !0);
            i && (e.detail.gesture.preventDefault(), w(t.targets._popover, t.targets.popover))
        }
    });
    var w = function (t, e, i) {
        if (!("show" === i && t.classList.contains(h) || "hide" === i && !t.classList.contains(h))) {
            p && p.cancel(), t.removeEventListener("webkitTransitionEnd", v), t.removeEventListener("webkitTransitionEnd", g), b.classList.remove(c), b.classList.remove(u);
            var r = n.querySelector(".mui-popover.mui-active");
            if (r && (r.addEventListener("webkitTransitionEnd", g), r.classList.remove(h), t === r))return void $(r);
            var o = !1;
            (t.classList.contains(l) || t.classList.contains(a)) && (t.classList.contains(a) ? (o = !0, b.classList.add(u)) : b.classList.add(c)), y(t, "block"), t.offsetHeight, t.classList.add(h), b.setAttribute("style", ""), n.body.appendChild(b), m(!0), x(t, e, o), b.classList.add(h), t.addEventListener("webkitTransitionEnd", v)
        }
    }, y = function (t, e, n, i) {
        var r = t.style;
        e !== void 0 && (r.display = e), n !== void 0 && (r.top = n + "px"), i !== void 0 && (r.left = i + "px")
    }, x = function (i, r, s) {
        if (i && r) {
            if (s)return void y(i, "block");
            var l = e.innerWidth, c = e.innerHeight, u = i.offsetWidth, h = i.offsetHeight, d = r.offsetWidth, p = r.offsetHeight, m = t.offset(r), v = i.querySelector("." + o);
            v || (v = n.createElement("div"), v.className = o, i.appendChild(v));
            var g = v && v.offsetWidth / 2 || 0, b = 0, $ = 0, w = 0, x = 0, E = i.classList.contains(a) ? 0 : 5, S = "top";
            m.top - e.pageYOffset > h + g ? b = m.top - h - g : c - (m.top - e.pageYOffset) - p > h + g ? (S = "bottom", b = m.top + p + g) : (S = "middle", b = Math.max((c - h) / 2 + e.pageYOffset, 0), $ = Math.max((l - u) / 2 + e.pageXOffset, 0)), "top" === S || "bottom" === S ? ($ = d / 2 + m.left - u / 2, w = $, E > $ && ($ = E), $ + u > l && ($ = l - u - E), v && ("top" === S ? v.classList.add(f) : v.classList.remove(f), w -= $, x = u / 2 - g / 2 + w, x = Math.max(Math.min(x, u - 2 * g - 6), 6), v.setAttribute("style", "left:" + x + "px"))) : "middle" === S && v.setAttribute("style", "display:none"), y(i, "block", b, $)
        }
    };
    t.createMask = function (e) {
        var i = n.createElement("div");
        i.classList.add(s), i.addEventListener(t.EVENT_MOVE, t.preventDefault), i.addEventListener("tap", function () {
            r.close()
        });
        var r = [i];
        return r._show = !1, r.show = function () {
            return r._show = !0, i.setAttribute("style", "opacity:1"), n.body.appendChild(i), r
        }, r._remove = function () {
            return r._show && (r._show = !1, i.setAttribute("style", "opacity:0"), t.later(function () {
                var t = n.body;
                i.parentNode === t && t.removeChild(i)
            }, 350)), r
        }, r.close = function () {
            e ? e() !== !1 && r._remove() : r._remove()
        }, r
    }, t.fn.popover = function () {
        var e = arguments;
        this.each(function () {
            t.targets._popover = this, ("show" === e[0] || "hide" === e[0] || "toggle" === e[0]) && w(this, e[1], e[0])
        })
    }
}(mui, window, document, "popover"), function (t, e, n, i) {
    var r = "mui-control-item", o = "mui-segmented-control", a = "mui-segmented-control-vertical", s = "mui-control-content", l = "mui-bar-tab", c = "mui-tab-item", u = function (t, e) {
        return e.classList && (e.classList.contains(r) || e.classList.contains(c)) ? (e.parentNode && e.parentNode.classList && e.parentNode.classList.contains(a) || t.preventDefault(), e) : !1
    };
    t.registerTarget({name: i, index: 80, handle: u, target: !1}), e.addEventListener("tap", function (e) {
        var a = t.targets.tab;
        if (a) {
            for (var u, h, f, d = "mui-active", p = "." + d, m = a.parentNode; m && m !== n; m = m.parentNode) {
                if (m.classList.contains(o)) {
                    u = m.querySelector(p + "." + r);
                    break
                }
                m.classList.contains(l) && (u = m.querySelector(p + "." + c))
            }
            u && u.classList.remove(d);
            var v = a === u;
            if (a && a.classList.add(d), a.hash && (f = n.getElementById(a.hash.replace("#", "")))) {
                if (!f.classList.contains(s))return void a.classList[v ? "remove" : "add"](d);
                if (!v) {
                    var g = f.parentNode;
                    h = g.querySelectorAll("." + s + p);
                    for (var b = 0; h.length > b; b++) {
                        var $ = h[b];
                        $.parentNode === g && $.classList.remove(d)
                    }
                    f.classList.add(d);
                    for (var w = [], y = g.querySelectorAll("." + s), b = 0; y.length > b; b++)y[b].parentNode === g && w.push(y[b]);
                    t.trigger(f, t.eventName("shown", i), {tabNumber: Array.prototype.indexOf.call(w, f)}), e.detail && e.detail.gesture.preventDefault()
                }
            }
        }
    })
}(mui, window, document, "tab"), function (t, e, n) {
    var i = "mui-switch", r = "mui-switch-handle", o = "mui-active", a = "mui-dragging", s = "mui-disabled", l = "." + r, c = function (t, e) {
        return e.classList && e.classList.contains(i) ? e : !1
    };
    t.registerTarget({name: n, index: 100, handle: c, target: !1});
    var u = function (t) {
        this.element = t, this.classList = this.element.classList, this.handle = this.element.querySelector(l), this.init(), this.initEvent()
    };
    u.prototype.init = function () {
        this.toggleWidth = this.element.offsetWidth, this.handleWidth = this.handle.offsetWidth, this.handleX = this.toggleWidth - this.handleWidth - 3
    }, u.prototype.initEvent = function () {
        this.element.addEventListener(t.EVENT_START, this), this.element.addEventListener("drag", this), this.element.addEventListener("swiperight", this), this.element.addEventListener(t.EVENT_END, this), this.element.addEventListener(t.EVENT_CANCEL, this)
    }, u.prototype.handleEvent = function (e) {
        if (!this.classList.contains(s))switch (e.type) {
            case t.EVENT_START:
                this.start(e);
                break;
            case"drag":
                this.drag(e);
                break;
            case"swiperight":
                this.swiperight();
                break;
            case t.EVENT_END:
            case t.EVENT_CANCEL:
                this.end(e)
        }
    }, u.prototype.start = function () {
        this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = ".2s", this.classList.add(a), (0 === this.toggleWidth || 0 === this.handleWidth) && this.init()
    }, u.prototype.drag = function (t) {
        var e = t.detail;
        this.isDragging || ("left" === e.direction || "right" === e.direction) && (this.isDragging = !0, this.lastChanged = void 0, this.initialState = this.classList.contains(o)), this.isDragging && (this.setTranslateX(e.deltaX), t.stopPropagation(), e.gesture.preventDefault())
    }, u.prototype.swiperight = function (t) {
        this.isDragging && t.stopPropagation()
    }, u.prototype.end = function (e) {
        this.classList.remove(a), this.isDragging ? (this.isDragging = !1, e.stopPropagation(), t.trigger(this.element, "toggle", {isActive: this.classList.contains(o)})) : this.toggle()
    }, u.prototype.toggle = function (e) {
        var n = this.classList;
        this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = e === !1 ? "0s" : ".2s", n.contains(o) ? (n.remove(o), this.handle.style.webkitTransform = "translate(0,0)") : (n.add(o), this.handle.style.webkitTransform = "translate(" + this.handleX + "px,0)"), t.trigger(this.element, "toggle", {isActive: this.classList.contains(o)})
    }, u.prototype.setTranslateX = t.animationFrame(function (t) {
        if (this.isDragging) {
            var e = !1;
            (this.initialState && -t > this.handleX / 2 || !this.initialState && t > this.handleX / 2) && (e = !0), this.lastChanged !== e && (e ? (this.handle.style.webkitTransform = "translate(" + (this.initialState ? 0 : this.handleX) + "px,0)", this.classList[this.initialState ? "remove" : "add"](o)) : (this.handle.style.webkitTransform = "translate(" + (this.initialState ? this.handleX : 0) + "px,0)", this.classList[this.initialState ? "add" : "remove"](o)), this.lastChanged = e)
        }
    }), t.fn["switch"] = function () {
        var e = [];
        return this.each(function () {
            var n = null, i = this.getAttribute("data-switch");
            i ? n = t.data[i] : (i = ++t.uuid, t.data[i] = new u(this), this.setAttribute("data-switch", i)), e.push(n)
        }), e.length > 1 ? e : e[0]
    }, t.ready(function () {
        t("." + i)["switch"]()
    })
}(mui, window, "toggle"), function (t, e, n) {
    function i(t, e) {
        var n = e ? "removeEventListener" : "addEventListener";
        t[n]("drag", _), t[n]("dragend", _), t[n]("swiperight", _), t[n]("swipeleft", _), t[n]("flick", _)
    }

    var r, o, a = "mui-active", s = "mui-selected", l = "mui-grid-view", c = "mui-table-view-radio", u = "mui-table-view-cell", h = "mui-collapse-content", f = "mui-disabled", d = "mui-switch", p = "mui-btn", m = "mui-slider-handle", v = "mui-slider-left", g = "mui-slider-right", b = "mui-transitioning", $ = "." + m, w = "." + v, y = "." + g, x = "." + s, E = "." + p, S = .8, C = isOpened = openedActions = progress = !1, T = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, L = translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0, k = function (t) {
        t ? o ? o.classList.add(a) : r && r.classList.add(a) : (L && L.cancel(), o ? o.classList.remove(a) : r && r.classList.remove(a))
    }, A = function () {
        if (translateX !== lastTranslateX) {
            if (buttonsRight && buttonsRight.length > 0) {
                progress = translateX / sliderActionRightWidth, -sliderActionRightWidth > translateX && (translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, S));
                for (var t = 0, e = buttonsRight.length; e > t; t++) {
                    var n = buttonsRight[t];
                    n._buttonOffset === void 0 && (n._buttonOffset = n.offsetLeft), buttonOffset = n._buttonOffset, N(n, translateX - buttonOffset * (1 + Math.max(progress, -1)))
                }
            }
            if (buttonsLeft && buttonsLeft.length > 0) {
                progress = translateX / sliderActionLeftWidth, translateX > sliderActionLeftWidth && (translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, S));
                for (var t = 0, e = buttonsLeft.length; e > t; t++) {
                    var i = buttonsLeft[t];
                    i._buttonOffset === void 0 && (i._buttonOffset = sliderActionLeftWidth - i.offsetLeft - i.offsetWidth), buttonOffset = i._buttonOffset, buttonsLeft.length > 1 && (i.style.zIndex = buttonsLeft.length - t), N(i, translateX + buttonOffset * (1 - Math.min(progress, 1)))
                }
            }
            N(T, translateX), lastTranslateX = translateX
        }
        sliderRequestAnimationFrame = requestAnimationFrame(function () {
            A()
        })
    }, N = function (t, e) {
        t && (t.style.webkitTransform = "translate(" + e + "px,0)")
    };
    e.addEventListener(t.EVENT_START, function (e) {
        r && k(!1), r = o = !1, C = isOpened = openedActions = !1;
        for (var a = e.target, s = !1; a && a !== n; a = a.parentNode)if (a.classList) {
            var m = a.classList;
            if (("INPUT" === a.tagName && "radio" !== a.type && "checkbox" !== a.type || "BUTTON" === a.tagName || m.contains(d) || m.contains(p) || m.contains(f)) && (s = !0), m.contains(h))break;
            if (m.contains(u)) {
                r = a;
                var v = r.parentNode.querySelector(x);
                if (!r.parentNode.classList.contains(c) && v && v !== r)return t.swipeoutClose(v), void(r = s = !1);
                if (!r.parentNode.classList.contains(l)) {
                    var g = r.querySelector("a");
                    g && g.parentNode === r && (o = g)
                }
                var b = r.querySelector($);
                b && (i(r), e.stopPropagation()), s || (b ? (L && L.cancel(), L = t.later(function () {
                    k(!0)
                }, 100)) : k(!0));
                break
            }
        }
    }), e.addEventListener(t.EVENT_MOVE, function () {
        k(!1)
    });
    var _ = {
        handleEvent: function (t) {
            switch (t.type) {
                case"drag":
                    this.drag(t);
                    break;
                case"dragend":
                    this.dragend(t);
                    break;
                case"flick":
                    this.flick(t);
                    break;
                case"swiperight":
                    this.swiperight(t);
                    break;
                case"swipeleft":
                    this.swipeleft(t)
            }
        }, drag: function (t) {
            if (r) {
                C || (T = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = !1, T = r.querySelector($), T && (sliderActionLeft = r.querySelector(w), sliderActionRight = r.querySelector(y), sliderActionLeft && (sliderActionLeftWidth = sliderActionLeft.offsetWidth, buttonsLeft = sliderActionLeft.querySelectorAll(E)), sliderActionRight && (sliderActionRightWidth = sliderActionRight.offsetWidth, buttonsRight = sliderActionRight.querySelectorAll(E)), r.classList.remove(b), isOpened = r.classList.contains(s), isOpened && (openedActions = r.querySelector(w + x) ? "left" : "right")));
                var e = t.detail, n = e.direction, i = e.angle;
                if ("left" === n && (i > 150 || -150 > i) ? (buttonsRight || buttonsLeft && isOpened) && (C = !0) : "right" === n && i > -30 && 30 > i && (buttonsLeft || buttonsRight && isOpened) && (C = !0), C) {
                    t.stopPropagation(), t.detail.gesture.preventDefault();
                    var o = t.detail.deltaX;
                    if (isOpened && ("right" === openedActions ? o -= sliderActionRightWidth : o += sliderActionLeftWidth), o > 0 && !buttonsLeft || 0 > o && !buttonsRight) {
                        if (!isOpened)return;
                        o = 0
                    }
                    0 > o ? sliderDirection = "toLeft" : o > 0 ? sliderDirection = "toRight" : sliderDirection || (sliderDirection = "toLeft"), sliderRequestAnimationFrame || A(), translateX = o
                }
            }
        }, flick: function (t) {
            C && t.stopPropagation()
        }, swipeleft: function (t) {
            C && t.stopPropagation()
        }, swiperight: function (t) {
            C && t.stopPropagation()
        }, dragend: function (e) {
            if (C) {
                e.stopPropagation(), sliderRequestAnimationFrame && (cancelAnimationFrame(sliderRequestAnimationFrame), sliderRequestAnimationFrame = null);
                var n = e.detail;
                C = !1;
                var i = "close", o = "toLeft" === sliderDirection ? sliderActionRightWidth : sliderActionLeftWidth, a = n.swipe || Math.abs(translateX) > o / 2;
                a && (isOpened ? "left" === n.direction && "right" === openedActions ? i = "open" : "right" === n.direction && "left" === openedActions && (i = "open") : i = "open"), r.classList.add(b);
                var l;
                if ("open" === i) {
                    var c = "toLeft" === sliderDirection ? -o : o;
                    if (N(T, c), l = "toLeft" === sliderDirection ? buttonsRight : buttonsLeft, l !== void 0) {
                        for (var u = null, h = 0; l.length > h; h++)u = l[h], N(u, c);
                        u.parentNode.classList.add(s), r.classList.add(s), isOpened || t.trigger(r, "toLeft" === sliderDirection ? "slideleft" : "slideright")
                    }
                } else N(T, 0), sliderActionLeft && sliderActionLeft.classList.remove(s), sliderActionRight && sliderActionRight.classList.remove(s), r.classList.remove(s);
                var f;
                if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== l)for (var h = 0, d = buttonsLeft.length; d > h; h++) {
                    var p = buttonsLeft[h];
                    f = p._buttonOffset, f === void 0 && (p._buttonOffset = sliderActionLeftWidth - p.offsetLeft - p.offsetWidth), N(p, f)
                }
                if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== l)for (var h = 0, d = buttonsRight.length; d > h; h++) {
                    var m = buttonsRight[h];
                    f = m._buttonOffset, f === void 0 && (m._buttonOffset = m.offsetLeft), N(m, -f)
                }
            }
        }
    };
    t.swipeoutOpen = function (e, n) {
        if (e) {
            var i = e.classList;
            if (!i.contains(s)) {
                n || (n = e.querySelector(y) ? "right" : "left");
                var r = e.querySelector(t.classSelector(".slider-" + n));
                if (r) {
                    r.classList.add(s), i.add(s), i.remove(b);
                    for (var o, a = r.querySelectorAll(E), l = r.offsetWidth, c = "right" === n ? -l : l, u = a.length, h = 0; u > h; h++)o = a[h], "right" === n ? N(o, -o.offsetLeft) : N(o, l - o.offsetWidth - o.offsetLeft);
                    i.add(b);
                    for (var h = 0; u > h; h++)N(a[h], c);
                    N(e.querySelector($), c)
                }
            }
        }
    }, t.swipeoutClose = function (e) {
        if (e) {
            var n = e.classList;
            if (n.contains(s)) {
                var i = e.querySelector(y + x) ? "right" : "left", r = e.querySelector(t.classSelector(".slider-" + i));
                if (r) {
                    r.classList.remove(s), n.remove(s), n.add(b);
                    var o, a = r.querySelectorAll(E), l = r.offsetWidth, c = a.length;
                    N(e.querySelector($), 0);
                    for (var u = 0; c > u; u++)o = a[u], "right" === i ? N(o, -o.offsetLeft) : N(o, l - o.offsetWidth - o.offsetLeft)
                }
            }
        }
    }, e.addEventListener(t.EVENT_END, function () {
        r && (k(!1), T && i(r, !0))
    }), e.addEventListener(t.EVENT_CANCEL, function () {
        r && (k(!1), T && i(r, !0))
    });
    var P = function (e) {
        var n = e.target && e.target.type || "";
        if ("radio" !== n && "checkbox" !== n) {
            var i = r.classList;
            if (i.contains("mui-radio")) {
                var o = r.querySelector("input[type=radio]");
                o && (o.disabled || o.readOnly || (o.checked = !o.checked, t.trigger(o, "change")))
            } else if (i.contains("mui-checkbox")) {
                var o = r.querySelector("input[type=checkbox]");
                o && (o.disabled || o.readOnly || (o.checked = !o.checked, t.trigger(o, "change")))
            }
        }
    };
    e.addEventListener(t.EVENT_CLICK, function (t) {
        r && r.classList.contains("mui-collapse") && t.preventDefault()
    }), e.addEventListener("doubletap", function (t) {
        r && P(t)
    });
    var O = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
    e.addEventListener("tap", function (e) {
        if (r) {
            var n = !1, i = r.classList, o = r.parentNode;
            if (o && o.classList.contains(c)) {
                if (i.contains(s))return;
                var l = o.querySelector("li" + x);
                return l && l.classList.remove(s), i.add(s), void t.trigger(r, "selected", {el: r})
            }
            if (i.contains("mui-collapse") && !r.parentNode.classList.contains("mui-unfold")) {
                if (O.test(e.target.tagName) || e.detail.gesture.preventDefault(), !i.contains(a)) {
                    var u = r.parentNode.querySelector(".mui-collapse.mui-active");
                    u && u.classList.remove(a), n = !0
                }
                i.toggle(a), n && t.trigger(r, "expand")
            } else P(e)
        }
    })
}(mui, window, document), function (t, e) {
    t.alert = function (n, i, r, o) {
        if (t.os.plus) {
            if (n === void 0)return;
            "function" == typeof i ? (o = i, i = null, r = "确定") : "function" == typeof r && (o = r, r = null), t.plusReady(function () {
                plus.nativeUI.alert(n, o, i, r)
            })
        } else e.alert(n)
    }
}(mui, window), function (t, e) {
    t.confirm = function (n, i, r, o) {
        if (t.os.plus) {
            if (n === void 0)return;
            "function" == typeof i ? (o = i, i = null, r = null) : "function" == typeof r && (o = r, r = null), t.plusReady(function () {
                plus.nativeUI.confirm(n, o, i, r)
            })
        } else o(e.confirm(n) ? {index: 0} : {index: 1})
    }
}(mui, window), function (t, e) {
    t.prompt = function (n, i, r, o, a) {
        if (t.os.plus) {
            if ("undefined" == typeof message)return;
            "function" == typeof i ? (a = i, i = null, r = null, o = null) : "function" == typeof r ? (a = r, r = null, o = null) : "function" == typeof o && (a = o, o = null), t.plusReady(function () {
                plus.nativeUI.prompt(n, a, r, i, o)
            })
        } else {
            var s = e.prompt(n);
            a(s ? {index: 0, value: s} : {index: 1, value: ""})
        }
    }
}(mui, window), function (t) {
    var e = "mui-active";
    t.toast = function (n) {
        if (t.os.plus)t.plusReady(function () {
            plus.nativeUI.toast(n, {verticalAlign: "bottom"})
        }); else {
            var i = document.createElement("div");
            i.classList.add("mui-toast-container"), i.innerHTML = '<div class="mui-toast-message">' + n + "</div>", i.addEventListener("webkitTransitionEnd", function () {
                i.classList.contains(e) || i.parentNode.removeChild(i)
            }), document.body.appendChild(i), i.offsetHeight, i.classList.add(e), setTimeout(function () {
                i.classList.remove(e)
            }, 2e3)
        }
    }
}(mui, window), function (t, e, n) {
    var i = "mui-popup", r = "mui-popup-backdrop", o = "mui-popup-in", a = "mui-popup-out", s = "mui-popup-inner", l = "mui-popup-title", c = "mui-popup-text", u = "mui-popup-input", h = "mui-popup-buttons", f = "mui-popup-button", d = "mui-popup-button-bold", r = "mui-popup-backdrop", p = "mui-active", m = [], v = function () {
        var e = n.createElement("div");
        return e.classList.add(r), e.addEventListener(t.EVENT_MOVE, t.preventDefault), e.addEventListener("webkitTransitionEnd", function () {
            this.classList.contains(p) || e.parentNode && e.parentNode.removeChild(e)
        }), e
    }(), g = function (t) {
        return '<div class="' + u + '"><input type="text" autofocus placeholder="' + (t || "") + '"/></div>'
    }, b = function (t, e, n) {
        return '<div class="' + s + '"><div class="' + l + '">' + e + '</div><div class="' + c + '">' + t.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") + "</div>" + (n || "") + "</div>"
    }, $ = function (t) {
        for (var e = t.length, n = [], i = 0; e > i; i++)n.push('<span class="' + f + (i === e - 1 ? " " + d : "") + '">' + t[i] + "</span>");
        return '<div class="' + h + '">' + n.join("") + "</div>"
    }, w = function (e, r) {
        var s = n.createElement("div");
        s.className = i, s.innerHTML = e;
        var l = function () {
            s.parentNode && s.parentNode.removeChild(s), s = null
        };
        s.addEventListener(t.EVENT_MOVE, t.preventDefault), s.addEventListener("webkitTransitionEnd", function (t) {
            s && t.target === s && s.classList.contains(a) && l()
        }), s.style.display = "block", n.body.appendChild(s), s.offsetHeight, s.classList.add(o), v.classList.contains(p) || (v.style.display = "block", n.body.appendChild(v), v.offsetHeight, v.classList.add(p));
        var c = t.qsa("." + f, s), h = s.querySelector("." + u + " input"), d = {
            element: s, close: function (t, e) {
                s && (r && r({
                    index: t || 0,
                    value: h && h.value || ""
                }), e !== !1 ? (s.classList.remove(o), s.classList.add(a)) : l(), m.pop(), m.length ? m[m.length - 1].show(e) : v.classList.remove(p))
            }
        }, g = function (t) {
            d.close(c.indexOf(t.target))
        };
        return t(s).on("tap", "." + f, g), m.length && m[m.length - 1].hide(), m.push({
            close: d.close,
            show: function () {
                s.style.display = "block", s.offsetHeight, s.classList.add(o)
            },
            hide: function () {
                s.style.display = "none", s.classList.remove(o)
            }
        }), d
    }, y = function (e, n, i, r, o) {
        return e !== void 0 ? ("function" == typeof n ? (r = n, o = i, n = null, i = null) : "function" == typeof i && (o = r, r = i, i = null), t.os.plus && "div" !== o ? plus.nativeUI.alert(e, r, n || "提示", i || "确定") : w(b(e, n || "提示") + $([i || "确定"]), r)) : void 0
    }, x = function (e, n, i, r, o) {
        return e !== void 0 ? ("function" == typeof n ? (r = n, o = i, n = null, i = null) : "function" == typeof i && (o = r, r = i, i = null), t.os.plus && "div" !== o ? plus.nativeUI.confirm(e, r, n, i || ["取消", "确认"]) : w(b(e, n || "提示") + $(i || ["取消", "确认"]), r)) : void 0
    }, E = function (e, n, i, r, o, a) {
        return e !== void 0 ? ("function" == typeof n ? (o = n, a = i, n = null, i = null, r = null) : "function" == typeof i ? (o = i, a = r, i = null, r = null) : "function" == typeof r && (a = o, o = r, r = null), t.os.plus && "div" !== a ? plus.nativeUI.prompt(e, o, i || "提示", n, r || ["取消", "确认"]) : w(b(e, i || "提示", g(n)) + $(r || ["取消", "确认"]), o)) : void 0
    }, S = function () {
        return m.length ? (m[m.length - 1].close(), !0) : !1
    }, C = function () {
        for (; m.length;)m[m.length - 1].close()
    };
    t.closePopup = S, t.closePopups = C, t.alert = y, t.confirm = x, t.prompt = E
}(mui, window, document), function (t, e) {
    var n = "mui-progressbar", i = "mui-progressbar-in", r = "mui-progressbar-out", o = "mui-progressbar-infinite", a = ".mui-progressbar", s = function (e) {
        if (e = t(e || "body"), 0 !== e.length) {
            if (e = e[0], e.classList.contains(n))return e;
            var i = e.querySelectorAll(a);
            if (i)for (var r = 0, o = i.length; o > r; r++) {
                var s = i[r];
                if (s.parentNode === e)return s
            }
        }
    }, l = function (s, l, c) {
        if ("number" == typeof s && (c = l, l = s, s = "body"), s = t(s || "body"), 0 !== s.length) {
            s = s[0];
            var h;
            if (s.classList.contains(n))h = s; else {
                var f = s.querySelectorAll(a + ":not(." + r + ")");
                if (f)for (var d = 0, p = f.length; p > d; d++) {
                    var m = f[d];
                    if (m.parentNode === s) {
                        h = m;
                        break
                    }
                }
                h ? h.classList.add(i) : (h = e.createElement("span"), h.className = n + " " + i + (l !== void 0 ? "" : " " + o) + (c ? " " + n + "-" + c : ""), l !== void 0 && (h.innerHTML = "<span></span>"), s.appendChild(h))
            }
            return l && u(s, l), h
        }
    }, c = function (t) {
        var e = s(t);
        if (e) {
            var n = e.classList;
            n.contains(i) && !n.contains(r) && (n.remove(i), n.add(r), e.addEventListener("webkitAnimationEnd", function () {
                e.parentNode && e.parentNode.removeChild(e), e = null
            }))
        }
    }, u = function (t, e, n) {
        "number" == typeof t && (n = e, e = t, t = !1);
        var i = s(t);
        if (i && !i.classList.contains(o)) {
            e && (e = Math.min(Math.max(e, 0), 100)), i.offsetHeight;
            var r = i.querySelector("span");
            if (r) {
                var a = r.style;
                a.webkitTransform = "translate3d(" + (-100 + e) + "%,0,0)", a.webkitTransitionDuration = n !== void 0 ? n + "ms" : ""
            }
            return i
        }
    };
    t.fn.progressbar = function (t) {
        var e = [];
        return t = t || {}, this.each(function () {
            var n = this, i = n.mui_plugin_progressbar;
            i ? t && i.setOptions(t) : n.mui_plugin_progressbar = i = {
                options: t, setOptions: function (t) {
                    this.options = t
                }, show: function () {
                    return l(n, this.options.progress, this.options.color)
                }, setProgress: function (t) {
                    return u(n, t)
                }, hide: function () {
                    return c(n)
                }
            }, e.push(i)
        }), 1 === e.length ? e[0] : e
    }
}(mui, document), function (t, e, n) {
    var i = "mui-icon", r = "mui-icon-clear", o = "mui-icon-speech", a = "mui-icon-search", s = "mui-icon-eye", l = "mui-input-row", c = "mui-placeholder", u = "mui-tooltip", h = "mui-hidden", f = "mui-focusin", d = "." + r, p = "." + o, m = "." + s, v = "." + c, g = "." + u, b = function (t) {
        for (; t && t !== n; t = t.parentNode)if (t.classList && t.classList.contains(l))return t;
        return null
    }, $ = function (t, e) {
        this.element = t, this.options = e || {actions: "clear"}, ~this.options.actions.indexOf("slider") ? (this.sliderActionClass = u + " " + h, this.sliderActionSelector = g) : (~this.options.actions.indexOf("clear") && (this.clearActionClass = i + " " + r + " " + h, this.clearActionSelector = d), ~this.options.actions.indexOf("speech") && (this.speechActionClass = i + " " + o, this.speechActionSelector = p), ~this.options.actions.indexOf("search") && (this.searchActionClass = c, this.searchActionSelector = v), ~this.options.actions.indexOf("password") && (this.passwordActionClass = i + " " + s, this.passwordActionSelector = m)), this.init()
    };
    $.prototype.init = function () {
        this.initAction(), this.initElementEvent()
    }, $.prototype.initAction = function () {
        var e = this, n = e.element.parentNode;
        n && (e.sliderActionClass ? e.sliderAction = e.createAction(n, e.sliderActionClass, e.sliderActionSelector) : (e.searchActionClass && (e.searchAction = e.createAction(n, e.searchActionClass, e.searchActionSelector), e.searchAction.addEventListener("tap", function (n) {
            t.focus(e.element), n.stopPropagation()
        })), e.speechActionClass && (e.speechAction = e.createAction(n, e.speechActionClass, e.speechActionSelector), e.speechAction.addEventListener("click", t.stopPropagation), e.speechAction.addEventListener("tap", function (t) {
            e.speechActionClick(t)
        })), e.clearActionClass && (e.clearAction = e.createAction(n, e.clearActionClass, e.clearActionSelector), e.clearAction.addEventListener("tap", function (t) {
            e.clearActionClick(t)
        })), e.passwordActionClass && (e.passwordAction = e.createAction(n, e.passwordActionClass, e.passwordActionSelector), e.passwordAction.addEventListener("tap", function (t) {
            e.passwordActionClick(t)
        }))))
    }, $.prototype.createAction = function (t, e, r) {
        var o = t.querySelector(r);
        if (!o) {
            var o = n.createElement("span");
            o.className = e, e === this.searchActionClass && (o.innerHTML = '<span class="' + i + " " + a + '"></span><span>' + this.element.getAttribute("placeholder") + "</span>", this.element.setAttribute("placeholder", ""), this.element.value.trim() && t.classList.add("mui-active")), t.insertBefore(o, this.element.nextSibling)
        }
        return o
    }, $.prototype.initElementEvent = function () {
        var e = this.element;
        if (this.sliderActionClass) {
            var n = this.sliderAction, i = null, r = function () {
                n.classList.remove(h);
                var t = e.offsetLeft, r = e.offsetWidth - 28, o = n.offsetWidth, a = Math.abs(e.max - e.min), s = r / a * Math.abs(e.value - e.min);
                n.style.left = 14 + t + s - o / 2 + "px", n.innerText = e.value, i && clearTimeout(i), i = setTimeout(function () {
                    n.classList.add(h)
                }, 1e3)
            };
            e.addEventListener("input", r), e.addEventListener("tap", r), e.addEventListener(t.EVENT_MOVE, function (t) {
                t.stopPropagation()
            })
        } else {
            if (this.clearActionClass) {
                var o = this.clearAction;
                if (!o)return;
                t.each(["keyup", "change", "input", "focus", "cut", "paste"], function (t, n) {
                    !function (t) {
                        e.addEventListener(t, function () {
                            o.classList[e.value.trim() ? "remove" : "add"](h)
                        })
                    }(n)
                }), e.addEventListener("blur", function () {
                    o.classList.add(h)
                })
            }
            this.searchActionClass && (e.addEventListener("focus", function () {
                e.parentNode.classList.add("mui-active")
            }), e.addEventListener("blur", function () {
                e.value.trim() || e.parentNode.classList.remove("mui-active")
            }))
        }
    }, $.prototype.setPlaceholder = function (t) {
        if (this.searchActionClass) {
            var e = this.element.parentNode.querySelector(v);
            e && (e.getElementsByTagName("span")[1].innerText = t)
        } else this.element.setAttribute("placeholder", t)
    }, $.prototype.passwordActionClick = function (t) {
        this.element.type = "text" === this.element.type ? "password" : "text", this.passwordAction.classList.toggle("mui-active"), t.preventDefault()
    }, $.prototype.clearActionClick = function (e) {
        var n = this;
        n.element.value = "", t.focus(n.element), n.clearAction.classList.add(h), e.preventDefault()
    }, $.prototype.speechActionClick = function (i) {
        if (e.plus) {
            var r = this, o = r.element.value;
            r.element.value = "", n.body.classList.add(f), plus.speech.startRecognize({engine: "iFly"}, function (e) {
                r.element.value += e, t.focus(r.element), plus.speech.stopRecognize(), t.trigger(r.element, "recognized", {value: r.element.value}), o !== r.element.value && (t.trigger(r.element, "change"), t.trigger(r.element, "input"))
            }, function () {
                n.body.classList.remove(f)
            })
        } else alert("only for 5+");
        i.preventDefault()
    }, t.fn.input = function () {
        var e = [];
        return this.each(function () {
            var n = null, i = [], r = b(this.parentNode);
            if ("range" === this.type && r.classList.contains("mui-input-range"))i.push("slider"); else {
                var o = this.classList;
                o.contains("mui-input-clear") && i.push("clear"), t.os.android && t.os.stream || !o.contains("mui-input-speech") || i.push("speech"), o.contains("mui-input-password") && i.push("password"), "search" === this.type && r.classList.contains("mui-search") && i.push("search")
            }
            var a = this.getAttribute("data-input-" + i[0]);
            if (a)n = t.data[a]; else {
                a = ++t.uuid, n = t.data[a] = new $(this, {actions: i.join(",")});
                for (var s = 0, l = i.length; l > s; s++)this.setAttribute("data-input-" + i[s], a)
            }
            e.push(n)
        }), 1 === e.length ? e[0] : e
    }, t.ready(function () {
        t(".mui-input-row input").input()
    })
}(mui, window, document), function (t, e) {
    var n = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/, i = function (t) {
        var e = t.match(n);
        return e && 5 === e.length ? [e[1], e[2], e[3], e[4]] : []
    }, r = function (e, n) {
        this.element = e, this.options = t.extend({
            top: 0,
            offset: 150,
            duration: 16
        }, n || {}), this._style = this.element.style, this._bgColor = this._style.backgroundColor;
        var r = i(mui.getStyles(this.element, "backgroundColor"));
        if (!r.length)throw Error("元素背景颜色必须为RGBA");
        this._R = r[0], this._G = r[1], this._B = r[2], this._A = r[3], this._bufferFn = t.buffer(this.handleScroll, this.options.duration, this), this.initEvent()
    };
    r.prototype.initEvent = function () {
        e.addEventListener("scroll", this._bufferFn), e.addEventListener(t.EVENT_MOVE, this._bufferFn)
    }, r.prototype.handleScroll = function () {
        this._style.backgroundColor = "rgba(" + this._R + "," + this._G + "," + this._B + "," + (e.scrollY - this.options.top) / this.options.offset + ")"
    }, r.prototype.destory = function () {
        e.removeEventListener("scroll", this._bufferFn), e.removeEventListener(t.EVENT_MOVE, this._bufferFn), this.element.style.backgroundColor = this._bgColor, this.element.mui_plugin_transparent = null
    }, t.fn.transparent = function (t) {
        t = t || {};
        var e = [];
        return this.each(function () {
            var n = this.mui_plugin_transparent;
            if (!n) {
                var i = this.getAttribute("data-top"), o = this.getAttribute("data-offset"), a = this.getAttribute("data-duration");
                null !== i && t.top === void 0 && (t.top = i), null !== o && t.offset === void 0 && (t.offset = o), null !== a && t.duration === void 0 && (t.duration = a), n = this.mui_plugin_transparent = new r(this, t)
            }
            e.push(n)
        }), 1 === e.length ? e[0] : e
    }, t.ready(function () {
        t(".mui-bar-transparent").transparent()
    })
}(mui, window), function (t) {
    var e = "ontouchstart" in document, n = e ? "tap" : "click", i = "change", r = "mui-numbox", o = ".mui-btn-numbox-plus,.mui-numbox-btn-plus", a = ".mui-btn-numbox-minus,.mui-numbox-btn-minus", s = ".mui-input-numbox,.mui-numbox-input", l = t.Numbox = t.Class.extend({
        init: function (e, n) {
            var i = this;
            if (!e)throw"构造 numbox 时缺少容器元素";
            i.holder = e, n = n || {}, n.step = parseInt(n.step || 1), i.options = n, i.input = t.qsa(s, i.holder)[0], i.plus = t.qsa(o, i.holder)[0], i.minus = t.qsa(a, i.holder)[0], i.checkValue(), i.initEvent()
        }, initEvent: function () {
            var e = this;
            e.plus.addEventListener(n, function () {
                var n = parseInt(e.input.value) + e.options.step;
                e.input.value = "" + n, t.trigger(e.input, i, null)
            }), e.minus.addEventListener(n, function () {
                var n = parseInt(e.input.value) - e.options.step;
                e.input.value = "" + n, t.trigger(e.input, i, null)
            }), e.input.addEventListener(i, function () {
                e.checkValue();
                var n = parseInt(e.input.value);
                t.trigger(e.holder, i, {value: n})
            })
        }, getValue: function () {
            var t = this;
            return parseInt(t.input.value)
        }, checkValue: function () {
            var t = this, e = t.input.value;
            if (null == e || "" == e || isNaN(e))t.input.value = t.options.min || 0, t.minus.disabled = null != t.options.min; else {
                var e = parseInt(e);
                null != t.options.max && !isNaN(t.options.max) && e >= parseInt(t.options.max) ? (e = t.options.max, t.plus.disabled = !0) : t.plus.disabled = !1, null != t.options.min && !isNaN(t.options.min) && parseInt(t.options.min) >= e ? (e = t.options.min, t.minus.disabled = !0) : t.minus.disabled = !1, t.input.value = e
            }
        }, setOption: function (t, e) {
            var n = this;
            n.options[t] = e
        }
    });
    t.fn.numbox = function () {
        return this.each(function (t, e) {
            if (!e.numbox)if (i)e.numbox = new l(e, i); else {
                var n = e.getAttribute("data-numbox-options"), i = n ? JSON.parse(n) : {};
                i.step = e.getAttribute("data-numbox-step") || i.step, i.min = e.getAttribute("data-numbox-min") || i.min, i.max = e.getAttribute("data-numbox-max") || i.max, e.numbox = new l(e, i)
            }
        }), this[0] ? this[0].numbox : null
    }, t.ready(function () {
        t("." + r).numbox()
    })
}(mui), function (t, e, n) {
    "use strict";
    function i(t) {
        return function () {
            var e, n = arguments[0], n = "[" + (t ? t + ":" : "") + n + "] http://errors.angularjs.org/1.2.16/" + (t ? t + "/" : "") + n;
            for (e = 1; arguments.length > e; e++)n = n + (1 == e ? "?" : "&") + "p" + (e - 1) + "=" + encodeURIComponent("function" == typeof arguments[e] ? ("" + arguments[e]).replace(/ \{[\s\S]*$/, "") : arguments[e] === void 0 ? "undefined" : "string" != typeof arguments[e] ? JSON.stringify(arguments[e]) : arguments[e]);
            return Error(n)
        }
    }

    function r(t) {
        if (null == t || T(t))return !1;
        var e = t.length;
        return 1 === t.nodeType && e ? !0 : w(t) || E(t) || 0 === e || "number" == typeof e && e > 0 && e - 1 in t
    }

    function o(t, e, n) {
        var i;
        if (t)if (S(t))for (i in t)"prototype" == i || "length" == i || "name" == i || t.hasOwnProperty && !t.hasOwnProperty(i) || e.call(n, t[i], i); else if (t.forEach && t.forEach !== o)t.forEach(e, n); else if (r(t))for (i = 0; t.length > i; i++)e.call(n, t[i], i); else for (i in t)t.hasOwnProperty(i) && e.call(n, t[i], i);
        return t
    }

    function a(t) {
        var e, n = [];
        for (e in t)t.hasOwnProperty(e) && n.push(e);
        return n.sort()
    }

    function s(t, e, n) {
        for (var i = a(t), r = 0; i.length > r; r++)e.call(n, t[i[r]], i[r]);
        return i
    }

    function l(t) {
        return function (e, n) {
            t(n, e)
        }
    }

    function c() {
        for (var t, e = oi.length; e;) {
            if (e--, t = oi[e].charCodeAt(0), 57 == t)return oi[e] = "A", oi.join("");
            if (90 != t)return oi[e] = String.fromCharCode(t + 1), oi.join("");
            oi[e] = "0"
        }
        return oi.unshift("0"), oi.join("")
    }

    function u(t, e) {
        e ? t.$$hashKey = e : delete t.$$hashKey
    }

    function h(t) {
        var e = t.$$hashKey;
        return o(arguments, function (e) {
            e !== t && o(e, function (e, n) {
                t[n] = e
            })
        }), u(t, e), t
    }

    function f(t) {
        return parseInt(t, 10)
    }

    function d(t, e) {
        return h(new (h(function () {
        }, {prototype: t})), e)
    }

    function p() {
    }

    function m(t) {
        return t
    }

    function v(t) {
        return function () {
            return t
        }
    }

    function g(t) {
        return t === void 0
    }

    function b(t) {
        return t !== void 0
    }

    function $(t) {
        return null != t && "object" == typeof t
    }

    function w(t) {
        return "string" == typeof t
    }

    function y(t) {
        return "number" == typeof t
    }

    function x(t) {
        return "[object Date]" === ni.call(t)
    }

    function E(t) {
        return "[object Array]" === ni.call(t)
    }

    function S(t) {
        return "function" == typeof t
    }

    function C(t) {
        return "[object RegExp]" === ni.call(t)
    }

    function T(t) {
        return t && t.document && t.location && t.alert && t.setInterval
    }

    function L(t) {
        return !(!t || !(t.nodeName || t.prop && t.attr && t.find))
    }

    function k(t, e, n) {
        var i = [];
        return o(t, function (t, r, o) {
            i.push(e.call(n, t, r, o))
        }), i
    }

    function A(t, e) {
        if (t.indexOf)return t.indexOf(e);
        for (var n = 0; t.length > n; n++)if (e === t[n])return n;
        return -1
    }

    function N(t, e) {
        var n = A(t, e);
        return n >= 0 && t.splice(n, 1), e
    }

    function _(t, e) {
        if (T(t) || t && t.$evalAsync && t.$watch)throw ii("cpws");
        if (e) {
            if (t === e)throw ii("cpi");
            if (E(t))for (var n = e.length = 0; t.length > n; n++)e.push(_(t[n])); else {
                n = e.$$hashKey, o(e, function (t, n) {
                    delete e[n]
                });
                for (var i in t)e[i] = _(t[i]);
                u(e, n)
            }
        } else(e = t) && (E(t) ? e = _(t, []) : x(t) ? e = new Date(t.getTime()) : C(t) ? e = RegExp(t.source) : $(t) && (e = _(t, {})));
        return e
    }

    function P(t, e) {
        e = e || {};
        for (var n in t)!t.hasOwnProperty(n) || "$" === n.charAt(0) && "$" === n.charAt(1) || (e[n] = t[n]);
        return e
    }

    function O(t, e) {
        if (t === e)return !0;
        if (null === t || null === e)return !1;
        if (t !== t && e !== e)return !0;
        var i, r = typeof t;
        if (r == typeof e && "object" == r) {
            if (!E(t)) {
                if (x(t))return x(e) && t.getTime() == e.getTime();
                if (C(t) && C(e))return "" + t == "" + e;
                if (t && t.$evalAsync && t.$watch || e && e.$evalAsync && e.$watch || T(t) || T(e) || E(e))return !1;
                r = {};
                for (i in t)if ("$" !== i.charAt(0) && !S(t[i])) {
                    if (!O(t[i], e[i]))return !1;
                    r[i] = !0
                }
                for (i in e)if (!r.hasOwnProperty(i) && "$" !== i.charAt(0) && e[i] !== n && !S(e[i]))return !1;
                return !0
            }
            if (!E(e))return !1;
            if ((r = t.length) == e.length) {
                for (i = 0; r > i; i++)if (!O(t[i], e[i]))return !1;
                return !0
            }
        }
        return !1
    }

    function I() {
        return e.securityPolicy && e.securityPolicy.isActive || e.querySelector && !(!e.querySelector("[ng-csp]") && !e.querySelector("[data-ng-csp]"))
    }

    function R(t, e) {
        var n = arguments.length > 2 ? ti.call(arguments, 2) : [];
        return !S(e) || e instanceof RegExp ? e : n.length ? function () {
            return arguments.length ? e.apply(t, n.concat(ti.call(arguments, 0))) : e.apply(t, n)
        } : function () {
            return arguments.length ? e.apply(t, arguments) : e.call(t)
        }
    }

    function M(t, i) {
        var r = i;
        return "string" == typeof t && "$" === t.charAt(0) ? r = n : T(i) ? r = "$WINDOW" : i && e === i ? r = "$DOCUMENT" : i && i.$evalAsync && i.$watch && (r = "$SCOPE"), r
    }

    function j(t, e) {
        return t === void 0 ? n : JSON.stringify(t, M, e ? "  " : null)
    }

    function D(t) {
        return w(t) ? JSON.parse(t) : t
    }

    function q(t) {
        return "function" == typeof t ? t = !0 : t && 0 !== t.length ? (t = Kn("" + t), t = !("f" == t || "0" == t || "false" == t || "no" == t || "n" == t || "[]" == t)) : t = !1, t
    }

    function W(t) {
        t = Yn(t).clone();
        try {
            t.empty()
        } catch (e) {
        }
        var n = Yn("<div>").append(t).html();
        try {
            return 3 === t[0].nodeType ? Kn(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (t, e) {
                return "<" + Kn(e)
            })
        } catch (i) {
            return Kn(n)
        }
    }

    function H(t) {
        try {
            return decodeURIComponent(t)
        } catch (e) {
        }
    }

    function V(t) {
        var e, n, i = {};
        return o((t || "").split("&"), function (t) {
            t && (e = t.split("="), n = H(e[0]), b(n) && (t = b(e[1]) ? H(e[1]) : !0, i[n] ? E(i[n]) ? i[n].push(t) : i[n] = [i[n], t] : i[n] = t))
        }), i
    }

    function X(t) {
        var e = [];
        return o(t, function (t, n) {
            E(t) ? o(t, function (t) {
                e.push(B(n, !0) + (!0 === t ? "" : "=" + B(t, !0)))
            }) : e.push(B(n, !0) + (!0 === t ? "" : "=" + B(t, !0)))
        }), e.length ? e.join("&") : ""
    }

    function F(t) {
        return B(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function B(t, e) {
        return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, e ? "%20" : "+")
    }

    function U(t, n) {
        function i(t) {
            t && s.push(t)
        }

        var r, a, s = [t], l = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], c = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        o(l, function (n) {
            l[n] = !0, i(e.getElementById(n)), n = n.replace(":", "\\:"), t.querySelectorAll && (o(t.querySelectorAll("." + n), i), o(t.querySelectorAll("." + n + "\\:"), i), o(t.querySelectorAll("[" + n + "]"), i))
        }), o(s, function (t) {
            if (!r) {
                var e = c.exec(" " + t.className + " ");
                e ? (r = t, a = (e[2] || "").replace(/\s+/g, ",")) : o(t.attributes, function (e) {
                    !r && l[e.name] && (r = t, a = e.value)
                })
            }
        }), r && n(r, a ? [a] : [])
    }

    function Y(n, i) {
        var r = function () {
            if (n = Yn(n), n.injector()) {
                var t = n[0] === e ? "document" : W(n);
                throw ii("btstrpd", t)
            }
            return i = i || [], i.unshift(["$provide", function (t) {
                t.value("$rootElement", n)
            }]), i.unshift("ng"), t = Ee(i), t.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (t, e, n, i) {
                t.$apply(function () {
                    e.data("$injector", i), n(e)(t)
                })
            }]), t
        }, a = /^NG_DEFER_BOOTSTRAP!/;
        return t && !a.test(t.name) ? r() : (t.name = t.name.replace(a, ""), ri.resumeBootstrap = function (t) {
            o(t, function (t) {
                i.push(t)
            }), r()
        }, void 0)
    }

    function z(t, e) {
        return e = e || "_", t.replace(si, function (t, n) {
            return (n ? e : "") + t.toLowerCase()
        })
    }

    function J(t, e, n) {
        if (!t)throw ii("areq", e || "?", n || "required");
        return t
    }

    function G(t, e, n) {
        return n && E(t) && (t = t[t.length - 1]), J(S(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" : typeof t)), t
    }

    function K(t, e) {
        if ("hasOwnProperty" === t)throw ii("badname", e)
    }

    function Z(t, e, n) {
        if (!e)return t;
        e = e.split(".");
        for (var i, r = t, o = e.length, a = 0; o > a; a++)i = e[a], t && (t = (r = t)[i]);
        return !n && S(t) ? R(r, t) : t
    }

    function Q(t) {
        var e = t[0];
        if (t = t[t.length - 1], e === t)return Yn(e);
        var n = [e];
        do {
            if (e = e.nextSibling, !e)break;
            n.push(e)
        } while (e !== t);
        return Yn(n)
    }

    function te(t) {
        var e = i("$injector"), n = i("ng");
        return t = t.angular || (t.angular = {}), t.$$minErr = t.$$minErr || i, t.module || (t.module = function () {
            var t = {};
            return function (i, r, o) {
                if ("hasOwnProperty" === i)throw n("badname", "module");
                return r && t.hasOwnProperty(i) && (t[i] = null), t[i] || (t[i] = function () {
                    function t(t, e, i) {
                        return function () {
                            return n[i || "push"]([t, e, arguments]), l
                        }
                    }

                    if (!r)throw e("nomod", i);
                    var n = [], a = [], s = t("$injector", "invoke"), l = {
                        _invokeQueue: n,
                        _runBlocks: a,
                        requires: r,
                        name: i,
                        provider: t("$provide", "provider"),
                        factory: t("$provide", "factory"),
                        service: t("$provide", "service"),
                        value: t("$provide", "value"),
                        constant: t("$provide", "constant", "unshift"),
                        animation: t("$animateProvider", "register"),
                        filter: t("$filterProvider", "register"),
                        controller: t("$controllerProvider", "register"),
                        directive: t("$compileProvider", "directive"),
                        config: s,
                        run: function (t) {
                            return a.push(t), this
                        }
                    };
                    return o && s(o), l
                }())
            }
        }())
    }

    function ee(e) {
        h(e, {
            bootstrap: Y,
            copy: _,
            extend: h,
            equals: O,
            element: Yn,
            forEach: o,
            injector: Ee,
            noop: p,
            bind: R,
            toJson: j,
            fromJson: D,
            identity: m,
            isUndefined: g,
            isDefined: b,
            isString: w,
            isFunction: S,
            isObject: $,
            isNumber: y,
            isElement: L,
            isArray: E,
            version: li,
            isDate: x,
            lowercase: Kn,
            uppercase: Qn,
            callbacks: {counter: 0},
            $$minErr: i,
            $$csp: I
        }), Jn = te(t);
        try {
            Jn("ngLocale")
        } catch (n) {
            Jn("ngLocale", []).provider("$locale", Be)
        }
        Jn("ng", ["ngLocale"], ["$provide", function (t) {
            t.provider({$$sanitizeUri: bn}), t.provider("$compile", Ne).directive({
                a: ir,
                input: dr,
                textarea: dr,
                form: sr,
                script: zr,
                select: Kr,
                style: Qr,
                option: Zr,
                ngBind: Cr,
                ngBindHtml: Lr,
                ngBindTemplate: Tr,
                ngClass: kr,
                ngClassEven: Nr,
                ngClassOdd: Ar,
                ngCloak: _r,
                ngController: Pr,
                ngForm: lr,
                ngHide: Vr,
                ngIf: Ir,
                ngInclude: Rr,
                ngInit: jr,
                ngNonBindable: Dr,
                ngPluralize: qr,
                ngRepeat: Wr,
                ngShow: Hr,
                ngStyle: Xr,
                ngSwitch: Fr,
                ngSwitchWhen: Br,
                ngSwitchDefault: Ur,
                ngOptions: Gr,
                ngTransclude: Yr,
                ngModel: $r,
                ngList: xr,
                ngChange: wr,
                required: yr,
                ngRequired: yr,
                ngValue: Sr
            }).directive({ngInclude: Mr}).directive(rr).directive(Or), t.provider({
                $anchorScroll: Se,
                $animate: Pi,
                $browser: Le,
                $cacheFactory: ke,
                $controller: Oe,
                $document: Ie,
                $exceptionHandler: Re,
                $filter: kn,
                $interpolate: Xe,
                $interval: Fe,
                $http: qe,
                $httpBackend: He,
                $location: rn,
                $log: on,
                $parse: dn,
                $rootScope: gn,
                $q: pn,
                $sce: xn,
                $sceDelegate: yn,
                $sniffer: En,
                $templateCache: Ae,
                $timeout: Sn,
                $window: Ln,
                $$rAF: vn,
                $$asyncCallback: Ce
            })
        }])
    }

    function ne(t) {
        return t.replace(pi, function (t, e, n, i) {
            return i ? n.toUpperCase() : n
        }).replace(mi, "Moz$1")
    }

    function ie(t, e, n, i) {
        function r(t) {
            var r, a, s, l, c, u, h = n && t ? [this.filter(t)] : [this], f = e;
            if (!i || null != t)for (; h.length;)for (r = h.shift(), a = 0, s = r.length; s > a; a++)for (l = Yn(r[a]), f ? l.triggerHandler("$destroy") : f = !f, c = 0, l = (u = l.children()).length; l > c; c++)h.push(zn(u[c]));
            return o.apply(this, arguments)
        }

        var o = zn.fn[t], o = o.$original || o;
        r.$original = o, zn.fn[t] = r
    }

    function re(t) {
        if (t instanceof re)return t;
        if (w(t) && (t = ai(t)), !(this instanceof re)) {
            if (w(t) && "<" != t.charAt(0))throw vi("nosel");
            return new re(t)
        }
        if (w(t)) {
            var n = t;
            t = e;
            var i;
            if (i = gi.exec(n))t = [t.createElement(i[1])]; else {
                var r, o = t;
                if (t = o.createDocumentFragment(), i = [], bi.test(n)) {
                    for (o = t.appendChild(o.createElement("div")), r = ($i.exec(n) || ["", ""])[1].toLowerCase(), r = yi[r] || yi._default, o.innerHTML = "<div>&#160;</div>" + r[1] + n.replace(wi, "<$1></$2>") + r[2], o.removeChild(o.firstChild), n = r[0]; n--;)o = o.lastChild;
                    for (n = 0, r = o.childNodes.length; r > n; ++n)i.push(o.childNodes[n]);
                    o = t.firstChild, o.textContent = ""
                } else i.push(o.createTextNode(n));
                t.textContent = "", t.innerHTML = "", t = i
            }
            pe(this, t), Yn(e.createDocumentFragment()).append(this)
        } else pe(this, t)
    }

    function oe(t) {
        return t.cloneNode(!0)
    }

    function ae(t) {
        le(t);
        var e = 0;
        for (t = t.childNodes || []; t.length > e; e++)ae(t[e])
    }

    function se(t, e, n, i) {
        if (b(i))throw vi("offargs");
        var r = ce(t, "events");
        ce(t, "handle") && (g(e) ? o(r, function (e, n) {
            di(t, n, e), delete r[n]
        }) : o(e.split(" "), function (e) {
            g(n) ? (di(t, e, r[e]), delete r[e]) : N(r[e] || [], n)
        }))
    }

    function le(t, e) {
        var i = t[ui], r = ci[i];
        r && (e ? delete ci[i].data[e] : (r.handle && (r.events.$destroy && r.handle({}, "$destroy"), se(t)), delete ci[i], t[ui] = n))
    }

    function ce(t, e, n) {
        var i = t[ui], i = ci[i || -1];
        return b(n) ? (i || (t[ui] = i = ++hi, i = ci[i] = {}), i[e] = n, void 0) : i && i[e]
    }

    function ue(t, e, n) {
        var i = ce(t, "data"), r = b(n), o = !r && b(e), a = o && !$(e);
        if (i || a || ce(t, "data", i = {}), r)i[e] = n; else {
            if (!o)return i;
            if (a)return i && i[e];
            h(i, e)
        }
    }

    function he(t, e) {
        return t.getAttribute ? (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1 : !1
    }

    function fe(t, e) {
        e && t.setAttribute && o(e.split(" "), function (e) {
            t.setAttribute("class", ai((" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + ai(e) + " ", " ")))
        })
    }

    function de(t, e) {
        if (e && t.setAttribute) {
            var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            o(e.split(" "), function (t) {
                t = ai(t), -1 === n.indexOf(" " + t + " ") && (n += t + " ")
            }), t.setAttribute("class", ai(n))
        }
    }

    function pe(t, e) {
        if (e) {
            e = e.nodeName || !b(e.length) || T(e) ? [e] : e;
            for (var n = 0; e.length > n; n++)t.push(e[n])
        }
    }

    function me(t, e) {
        return ve(t, "$" + (e || "ngController") + "Controller")
    }

    function ve(t, e, i) {
        for (t = Yn(t), 9 == t[0].nodeType && (t = t.find("html")), e = E(e) ? e : [e]; t.length;) {
            for (var r = t[0], o = 0, a = e.length; a > o; o++)if ((i = t.data(e[o])) !== n)return i;
            t = Yn(r.parentNode || 11 === r.nodeType && r.host)
        }
    }

    function ge(t) {
        for (var e = 0, n = t.childNodes; n.length > e; e++)ae(n[e]);
        for (; t.firstChild;)t.removeChild(t.firstChild)
    }

    function be(t, e) {
        var n = Ei[e.toLowerCase()];
        return n && Si[t.nodeName] && n
    }

    function $e(t, n) {
        var i = function (i, r) {
            if (i.preventDefault || (i.preventDefault = function () {
                    i.returnValue = !1
                }), i.stopPropagation || (i.stopPropagation = function () {
                    i.cancelBubble = !0
                }), i.target || (i.target = i.srcElement || e), g(i.defaultPrevented)) {
                var a = i.preventDefault;
                i.preventDefault = function () {
                    i.defaultPrevented = !0, a.call(i)
                }, i.defaultPrevented = !1
            }
            i.isDefaultPrevented = function () {
                return i.defaultPrevented || !1 === i.returnValue
            };
            var s = P(n[r || i.type] || []);
            o(s, function (e) {
                e.call(t, i)
            }), 8 >= Un ? (i.preventDefault = null, i.stopPropagation = null, i.isDefaultPrevented = null) : (delete i.preventDefault, delete i.stopPropagation, delete i.isDefaultPrevented)
        };
        return i.elem = t, i
    }

    function we(t) {
        var e, i = typeof t;
        return "object" == i && null !== t ? "function" == typeof(e = t.$$hashKey) ? e = t.$$hashKey() : e === n && (e = t.$$hashKey = c()) : e = t, i + ":" + e
    }

    function ye(t) {
        o(t, this.put, this)
    }

    function xe(t) {
        var e, n;
        return "function" == typeof t ? (e = t.$inject) || (e = [], t.length && (n = ("" + t).replace(Ai, ""), n = n.match(Ti), o(n[1].split(Li), function (t) {
            t.replace(ki, function (t, n, i) {
                e.push(i)
            })
        })), t.$inject = e) : E(t) ? (n = t.length - 1, G(t[n], "fn"), e = t.slice(0, n)) : G(t, "fn", !0), e
    }

    function Ee(t) {
        function e(t) {
            return function (e, n) {
                return $(e) ? (o(e, l(t)), void 0) : t(e, n)
            }
        }

        function n(t, e) {
            if (K(t, "service"), (S(e) || E(e)) && (e = d.instantiate(e)), !e.$get)throw Ni("pget", t);
            return f[t + c] = e
        }

        function i(t, e) {
            return n(t, {$get: e})
        }

        function r(t) {
            var e, n, i, a, s = [];
            return o(t, function (t) {
                if (!h.get(t)) {
                    h.put(t, !0);
                    try {
                        if (w(t))for (e = Jn(t), s = s.concat(r(e.requires)).concat(e._runBlocks), n = e._invokeQueue, i = 0, a = n.length; a > i; i++) {
                            var o = n[i], l = d.get(o[0]);
                            l[o[1]].apply(l, o[2])
                        } else S(t) ? s.push(d.invoke(t)) : E(t) ? s.push(d.invoke(t)) : G(t, "module")
                    } catch (c) {
                        throw E(t) && (t = t[t.length - 1]), c.message && c.stack && -1 == c.stack.indexOf(c.message) && (c = c.message + "\n" + c.stack), Ni("modulerr", t, c.stack || c.message || c)
                    }
                }
            }), s
        }

        function a(t, e) {
            function n(n) {
                if (t.hasOwnProperty(n)) {
                    if (t[n] === s)throw Ni("cdep", u.join(" <- "));
                    return t[n]
                }
                try {
                    return u.unshift(n), t[n] = s, t[n] = e(n)
                } catch (i) {
                    throw t[n] === s && delete t[n], i
                } finally {
                    u.shift()
                }
            }

            function i(t, e, i) {
                var r, o, a, s = [], l = xe(t);
                for (o = 0, r = l.length; r > o; o++) {
                    if (a = l[o], "string" != typeof a)throw Ni("itkn", a);
                    s.push(i && i.hasOwnProperty(a) ? i[a] : n(a))
                }
                return t.$inject || (t = t[r]), t.apply(e, s)
            }

            return {
                invoke: i, instantiate: function (t, e) {
                    var n, r = function () {
                    };
                    return r.prototype = (E(t) ? t[t.length - 1] : t).prototype, r = new r, n = i(t, r, e), $(n) || S(n) ? n : r
                }, get: n, annotate: xe, has: function (e) {
                    return f.hasOwnProperty(e + c) || t.hasOwnProperty(e)
                }
            }
        }

        var s = {}, c = "Provider", u = [], h = new ye, f = {
            $provide: {
                provider: e(n),
                factory: e(i),
                service: e(function (t, e) {
                    return i(t, ["$injector", function (t) {
                        return t.instantiate(e)
                    }])
                }),
                value: e(function (t, e) {
                    return i(t, v(e))
                }),
                constant: e(function (t, e) {
                    K(t, "constant"), f[t] = e, m[t] = e
                }),
                decorator: function (t, e) {
                    var n = d.get(t + c), i = n.$get;
                    n.$get = function () {
                        var t = g.invoke(i, n);
                        return g.invoke(e, null, {$delegate: t})
                    }
                }
            }
        }, d = f.$injector = a(f, function () {
            throw Ni("unpr", u.join(" <- "))
        }), m = {}, g = m.$injector = a(m, function (t) {
            return t = d.get(t + c), g.invoke(t.$get, t)
        });
        return o(r(t), function (t) {
            g.invoke(t || p)
        }), g
    }

    function Se() {
        var t = !0;
        this.disableAutoScrolling = function () {
            t = !1
        }, this.$get = ["$window", "$location", "$rootScope", function (e, n, i) {
            function r(t) {
                var e = null;
                return o(t, function (t) {
                    e || "a" !== Kn(t.nodeName) || (e = t)
                }), e
            }

            function a() {
                var t, i = n.hash();
                i ? (t = s.getElementById(i)) ? t.scrollIntoView() : (t = r(s.getElementsByName(i))) ? t.scrollIntoView() : "top" === i && e.scrollTo(0, 0) : e.scrollTo(0, 0)
            }

            var s = e.document;
            return t && i.$watch(function () {
                return n.hash()
            }, function () {
                i.$evalAsync(a)
            }), a
        }]
    }

    function Ce() {
        this.$get = ["$$rAF", "$timeout", function (t, e) {
            return t.supported ? function (e) {
                return t(e)
            } : function (t) {
                return e(t, 0, !1)
            }
        }]
    }

    function Te(t, e, i, r) {
        function a(t) {
            try {
                t.apply(null, ti.call(arguments, 1))
            } finally {
                if (b--, 0 === b)for (; $.length;)try {
                    $.pop()()
                } catch (e) {
                    i.error(e)
                }
            }
        }

        function s(t, e) {
            (function n() {
                o(x, function (t) {
                    t()
                }), y = e(n, t)
            })()
        }

        function l() {
            C = null, E != c.url() && (E = c.url(), o(T, function (t) {
                t(c.url())
            }))
        }

        var c = this, u = e[0], h = t.location, f = t.history, d = t.setTimeout, m = t.clearTimeout, v = {};
        c.isMock = !1;
        var b = 0, $ = [];
        c.$$completeOutstandingRequest = a, c.$$incOutstandingRequestCount = function () {
            b++
        }, c.notifyWhenNoOutstandingRequests = function (t) {
            o(x, function (t) {
                t()
            }), 0 === b ? t() : $.push(t)
        };
        var y, x = [];
        c.addPollFn = function (t) {
            return g(y) && s(100, d), x.push(t), t
        };
        var E = h.href, S = e.find("base"), C = null;
        c.url = function (e, n) {
            return h !== t.location && (h = t.location), f !== t.history && (f = t.history), e ? E != e ? (E = e, r.history ? n ? f.replaceState(null, "", e) : (f.pushState(null, "", e), S.attr("href", S.attr("href"))) : (C = e, n ? h.replace(e) : h.href = e), c) : void 0 : C || h.href.replace(/%27/g, "'")
        };
        var T = [], L = !1;
        c.onUrlChange = function (e) {
            return L || (r.history && Yn(t).on("popstate", l), r.hashchange ? Yn(t).on("hashchange", l) : c.addPollFn(l), L = !0), T.push(e), e
        }, c.baseHref = function () {
            var t = S.attr("href");
            return t ? t.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        };
        var k = {}, A = "", N = c.baseHref();
        c.cookies = function (t, e) {
            var r, o, a, s;
            if (!t) {
                if (u.cookie !== A)for (A = u.cookie, r = A.split("; "), k = {}, a = 0; r.length > a; a++)o = r[a], s = o.indexOf("="), s > 0 && (t = unescape(o.substring(0, s)), k[t] === n && (k[t] = unescape(o.substring(s + 1))));
                return k
            }
            e === n ? u.cookie = escape(t) + "=;path=" + N + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : w(e) && (r = (u.cookie = escape(t) + "=" + escape(e) + ";path=" + N).length + 1, r > 4096 && i.warn("Cookie '" + t + "' possibly not set or overflowed because it was too large (" + r + " > 4096 bytes)!"))
        }, c.defer = function (t, e) {
            var n;
            return b++, n = d(function () {
                delete v[n], a(t)
            }, e || 0), v[n] = !0, n
        }, c.defer.cancel = function (t) {
            return v[t] ? (delete v[t], m(t), a(p), !0) : !1
        }
    }

    function Le() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (t, e, n, i) {
            return new Te(t, i, e, n)
        }]
    }

    function ke() {
        this.$get = function () {
            function t(t, n) {
                function r(t) {
                    t != f && (d ? d == t && (d = t.n) : d = t, o(t.n, t.p), o(t, f), f = t, f.n = null)
                }

                function o(t, e) {
                    t != e && (t && (t.p = e), e && (e.n = t))
                }

                if (t in e)throw i("$cacheFactory")("iid", t);
                var a = 0, s = h({}, n, {id: t}), l = {}, c = n && n.capacity || Number.MAX_VALUE, u = {}, f = null, d = null;
                return e[t] = {
                    put: function (t, e) {
                        if (Number.MAX_VALUE > c) {
                            var n = u[t] || (u[t] = {key: t});
                            r(n)
                        }
                        return g(e) ? void 0 : (t in l || a++, l[t] = e, a > c && this.remove(d.key), e)
                    }, get: function (t) {
                        if (Number.MAX_VALUE > c) {
                            var e = u[t];
                            if (!e)return;
                            r(e)
                        }
                        return l[t]
                    }, remove: function (t) {
                        if (Number.MAX_VALUE > c) {
                            var e = u[t];
                            if (!e)return;
                            e == f && (f = e.p), e == d && (d = e.n), o(e.n, e.p), delete u[t]
                        }
                        delete l[t], a--
                    }, removeAll: function () {
                        l = {}, a = 0, u = {}, f = d = null
                    }, destroy: function () {
                        u = s = l = null, delete e[t]
                    }, info: function () {
                        return h({}, s, {size: a})
                    }
                }
            }

            var e = {};
            return t.info = function () {
                var t = {};
                return o(e, function (e, n) {
                    t[n] = e.info()
                }), t
            }, t.get = function (t) {
                return e[t]
            }, t
        }
    }

    function Ae() {
        this.$get = ["$cacheFactory", function (t) {
            return t("templates")
        }]
    }

    function Ne(t, i) {
        var r = {}, a = "Directive", s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, c = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, u = /^(on[a-z]+|formaction)$/;
        this.directive = function f(e, n) {
            return K(e, "directive"), w(e) ? (J(n, "directiveFactory"), r.hasOwnProperty(e) || (r[e] = [], t.factory(e + a, ["$injector", "$exceptionHandler", function (t, n) {
                var i = [];
                return o(r[e], function (r, o) {
                    try {
                        var a = t.invoke(r);
                        S(a) ? a = {compile: v(a)} : !a.compile && a.link && (a.compile = v(a.link)), a.priority = a.priority || 0, a.index = o, a.name = a.name || e, a.require = a.require || a.controller && a.name, a.restrict = a.restrict || "A", i.push(a)
                    } catch (s) {
                        n(s)
                    }
                }), i
            }])), r[e].push(n)) : o(e, l(f)), this
        }, this.aHrefSanitizationWhitelist = function (t) {
            return b(t) ? (i.aHrefSanitizationWhitelist(t), this) : i.aHrefSanitizationWhitelist()
        }, this.imgSrcSanitizationWhitelist = function (t) {
            return b(t) ? (i.imgSrcSanitizationWhitelist(t), this) : i.imgSrcSanitizationWhitelist()
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function (t, i, l, f, p, g, b, y, x, C, T, L) {
            function k(t, e, n, i, r) {
                t instanceof Yn || (t = Yn(t)), o(t, function (e, n) {
                    3 == e.nodeType && e.nodeValue.match(/\S+/) && (t[n] = Yn(e).wrap("<span></span>").parent()[0])
                });
                var a = N(t, e, t, n, i, r);
                return A(t, "ng-scope"), function (e, n, i) {
                    J(e, "scope");
                    var r = n ? xi.clone.call(t) : t;
                    o(i, function (t, e) {
                        r.data("$" + e + "Controller", t)
                    }), i = 0;
                    for (var s = r.length; s > i; i++) {
                        var l = r[i].nodeType;
                        1 !== l && 9 !== l || r.eq(i).data("$scope", e)
                    }
                    return n && n(r, e), a && a(e, r, r), r
                }
            }

            function A(t, e) {
                try {
                    t.addClass(e)
                } catch (n) {
                }
            }

            function N(t, e, i, r, o, a) {
                function s(t, i, r, o) {
                    var a, s, l, c, u, h, d;
                    a = i.length;
                    var p = Array(a);
                    for (u = 0; a > u; u++)p[u] = i[u];
                    for (d = u = 0, h = f.length; h > u; d++)s = p[d], i = f[u++], a = f[u++], l = Yn(s), i ? (i.scope ? (c = t.$new(), l.data("$scope", c)) : c = t, (l = i.transclude) || !o && e ? i(a, c, s, r, _(t, l || e)) : i(a, c, s, r, o)) : a && a(t, s.childNodes, n, o)
                }

                for (var l, c, u, h, f = [], d = 0; t.length > d; d++)l = new Q, c = I(t[d], [], l, 0 === d ? r : n, o), (a = c.length ? D(c, t[d], l, e, i, null, [], [], a) : null) && a.scope && A(Yn(t[d]), "ng-scope"), l = a && a.terminal || !(u = t[d].childNodes) || !u.length ? null : N(u, a ? a.transclude : e), f.push(a, l), h = h || a || l, a = null;
                return h ? s : null
            }

            function _(t, e) {
                return function (n, i, r) {
                    var o = !1;
                    return n || (n = t.$new(), o = n.$$transcluded = !0), i = e(n, i, r), o && i.on("$destroy", R(n, n.$destroy)), i
                }
            }

            function I(t, e, n, i, r) {
                var o, a = n.$attr;
                switch (t.nodeType) {
                    case 1:
                        H(e, _e(Gn(t).toLowerCase()), "E", i, r);
                        var l, u, h;
                        o = t.attributes;
                        for (var f = 0, d = o && o.length; d > f; f++) {
                            var p = !1, m = !1;
                            if (l = o[f], !Un || Un >= 8 || l.specified) {
                                u = l.name, h = _e(u), ie.test(h) && (u = z(h.substr(6), "-"));
                                var v = h.replace(/(Start|End)$/, "");
                                h === v + "Start" && (p = u, m = u.substr(0, u.length - 5) + "end", u = u.substr(0, u.length - 6)), h = _e(u.toLowerCase()), a[h] = u, n[h] = l = ai(l.value), be(t, h) && (n[h] = !0), G(t, e, l, h), H(e, h, "A", i, r, p, m)
                            }
                        }
                        if (t = t.className, w(t) && "" !== t)for (; o = c.exec(t);)h = _e(o[2]), H(e, h, "C", i, r) && (n[h] = ai(o[3])), t = t.substr(o.index + o[0].length);
                        break;
                    case 3:
                        U(e, t.nodeValue);
                        break;
                    case 8:
                        try {
                            (o = s.exec(t.nodeValue)) && (h = _e(o[1]), H(e, h, "M", i, r) && (n[h] = ai(o[2])))
                        } catch (g) {
                        }
                }
                return e.sort(F), e
            }

            function M(t, e, n) {
                var i = [], r = 0;
                if (e && t.hasAttribute && t.hasAttribute(e)) {
                    do {
                        if (!t)throw Oi("uterdir", e, n);
                        1 == t.nodeType && (t.hasAttribute(e) && r++, t.hasAttribute(n) && r--), i.push(t), t = t.nextSibling
                    } while (r > 0)
                } else i.push(t);
                return Yn(i)
            }

            function j(t, e, n) {
                return function (i, r, o, a, s) {
                    return r = M(r[0], e, n), t(i, r, o, a, s)
                }
            }

            function D(t, r, a, s, c, u, h, f, d) {
                function p(t, e, n, i) {
                    t && (n && (t = j(t, n, i)), t.require = x.require, (R === x || x.$$isolateScope) && (t = Z(t, {isolateScope: !0})), h.push(t)), e && (n && (e = j(e, n, i)), e.require = x.require, (R === x || x.$$isolateScope) && (e = Z(e, {isolateScope: !0})), f.push(e))
                }

                function m(t, e, n) {
                    var i, r = "data", a = !1;
                    if (w(t)) {
                        for (; "^" == (i = t.charAt(0)) || "?" == i;)t = t.substr(1), "^" == i && (r = "inheritedData"), a = a || "?" == i;
                        if (i = null, n && "data" === r && (i = n[t]), i = i || e[r]("$" + t + "Controller"), !i && !a)throw Oi("ctreq", t, C)
                    } else E(t) && (i = [], o(t, function (t) {
                        i.push(m(t, e, n))
                    }));
                    return i
                }

                function v(t, e, s, c, u) {
                    function d(t, e) {
                        var i;
                        return 2 > arguments.length && (e = t, t = n), U && (i = S), u(t, e, i)
                    }

                    var p, v, $, w, y, x, E, S = {};
                    if (p = r === s ? a : P(a, new Q(Yn(s), a.$attr)), v = p.$$element, R) {
                        var C = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        c = Yn(s), x = e.$new(!0), D && D === R.$$originalDirective ? c.data("$isolateScope", x) : c.data("$isolateScopeNoTemplate", x), A(c, "ng-isolate-scope"), o(R.scope, function (t, n) {
                            var r, o, a, s, l = t.match(C) || [], c = l[3] || n, u = "?" == l[2], l = l[1];
                            switch (x.$$isolateBindings[n] = l + c, l) {
                                case"@":
                                    p.$observe(c, function (t) {
                                        x[n] = t
                                    }), p.$$observers[c].$$scope = e, p[c] && (x[n] = i(p[c])(e));
                                    break;
                                case"=":
                                    if (u && !p[c])break;
                                    o = g(p[c]), s = o.literal ? O : function (t, e) {
                                        return t === e
                                    }, a = o.assign || function () {
                                            throw r = x[n] = o(e), Oi("nonassign", p[c], R.name)
                                        }, r = x[n] = o(e), x.$watch(function () {
                                        var t = o(e);
                                        return s(t, x[n]) || (s(t, r) ? a(e, t = x[n]) : x[n] = t), r = t
                                    }, null, o.literal);
                                    break;
                                case"&":
                                    o = g(p[c]), x[n] = function (t) {
                                        return o(e, t)
                                    };
                                    break;
                                default:
                                    throw Oi("iscp", R.name, n, t)
                            }
                        })
                    }
                    for (E = u && d, _ && o(_, function (t) {
                        var n, i = {
                            $scope: t === R || t.$$isolateScope ? x : e,
                            $element: v,
                            $attrs: p,
                            $transclude: E
                        };
                        y = t.controller, "@" == y && (y = p[t.name]), n = b(y, i), S[t.name] = n, U || v.data("$" + t.name + "Controller", n), t.controllerAs && (i.$scope[t.controllerAs] = n)
                    }), c = 0, $ = h.length; $ > c; c++)try {
                        w = h[c], w(w.isolateScope ? x : e, v, p, w.require && m(w.require, v, S), E)
                    } catch (T) {
                        l(T, W(v))
                    }
                    for (c = e, R && (R.template || null === R.templateUrl) && (c = x), t && t(c, s.childNodes, n, u), c = f.length - 1; c >= 0; c--)try {
                        w = f[c], w(w.isolateScope ? x : e, v, p, w.require && m(w.require, v, S), E)
                    } catch (L) {
                        l(L, W(v))
                    }
                }

                d = d || {};
                for (var y, x, C, T, L, N = -Number.MAX_VALUE, _ = d.controllerDirectives, R = d.newIsolateScopeDirective, D = d.templateDirective, H = d.nonTlbTranscludeDirective, F = !1, U = d.hasElementTranscludeDirective, Y = a.$$element = Yn(r), z = s, J = 0, G = t.length; G > J; J++) {
                    x = t[J];
                    var te = x.$$start, ee = x.$$end;
                    if (te && (Y = M(r, te, ee)), T = n, N > x.priority)break;
                    if ((T = x.scope) && (y = y || x, x.templateUrl || (B("new/isolated scope", R, x, Y), $(T) && (R = x))), C = x.name, !x.templateUrl && x.controller && (T = x.controller, _ = _ || {}, B("'" + C + "' controller", _[C], x, Y), _[C] = x), (T = x.transclude) && (F = !0, x.$$tlb || (B("transclusion", H, x, Y), H = x), "element" == T ? (U = !0, N = x.priority, T = M(r, te, ee), Y = a.$$element = Yn(e.createComment(" " + C + ": " + a[C] + " ")), r = Y[0], K(c, Yn(ti.call(T, 0)), r), z = k(T, s, N, u && u.name, {nonTlbTranscludeDirective: H})) : (T = Yn(oe(r)).contents(), Y.empty(), z = k(T, s))), x.template)if (B("template", D, x, Y), D = x, T = S(x.template) ? x.template(Y, a) : x.template, T = ne(T), x.replace) {
                        if (u = x, T = bi.test(T) ? Yn(T) : [], r = T[0], 1 != T.length || 1 !== r.nodeType)throw Oi("tplrt", C, "");
                        K(c, Y, r), G = {$attr: {}}, T = I(r, [], G);
                        var ie = t.splice(J + 1, t.length - (J + 1));
                        R && q(T), t = t.concat(T).concat(ie), V(a, G), G = t.length
                    } else Y.html(T);
                    if (x.templateUrl)B("template", D, x, Y), D = x, x.replace && (u = x), v = X(t.splice(J, t.length - J), Y, a, c, z, h, f, {
                        controllerDirectives: _,
                        newIsolateScopeDirective: R,
                        templateDirective: D,
                        nonTlbTranscludeDirective: H
                    }), G = t.length; else if (x.compile)try {
                        L = x.compile(Y, a, z), S(L) ? p(null, L, te, ee) : L && p(L.pre, L.post, te, ee)
                    } catch (re) {
                        l(re, W(Y))
                    }
                    x.terminal && (v.terminal = !0, N = Math.max(N, x.priority))
                }
                return v.scope = y && !0 === y.scope, v.transclude = F && z, d.hasElementTranscludeDirective = U, v
            }

            function q(t) {
                for (var e = 0, n = t.length; n > e; e++)t[e] = d(t[e], {$$isolateScope: !0})
            }

            function H(e, i, o, s, c, u, h) {
                if (i === c)return null;
                if (c = null, r.hasOwnProperty(i)) {
                    var f;
                    i = t.get(i + a);
                    for (var p = 0, m = i.length; m > p; p++)try {
                        f = i[p], (s === n || s > f.priority) && -1 != f.restrict.indexOf(o) && (u && (f = d(f, {
                            $$start: u,
                            $$end: h
                        })), e.push(f), c = f)
                    } catch (v) {
                        l(v)
                    }
                }
                return c
            }

            function V(t, e) {
                var n = e.$attr, i = t.$attr, r = t.$$element;
                o(t, function (i, r) {
                    "$" != r.charAt(0) && (e[r] && (i += ("style" === r ? ";" : " ") + e[r]), t.$set(r, i, !0, n[r]))
                }), o(e, function (e, o) {
                    "class" == o ? (A(r, e), t["class"] = (t["class"] ? t["class"] + " " : "") + e) : "style" == o ? (r.attr("style", r.attr("style") + ";" + e), t.style = (t.style ? t.style + ";" : "") + e) : "$" == o.charAt(0) || t.hasOwnProperty(o) || (t[o] = e, i[o] = n[o])
                })
            }

            function X(t, e, n, i, r, a, s, l) {
                var c, u, d = [], m = e[0], v = t.shift(), g = h({}, v, {
                    templateUrl: null,
                    transclude: null,
                    replace: null,
                    $$originalDirective: v
                }), b = S(v.templateUrl) ? v.templateUrl(e, n) : v.templateUrl;
                return e.empty(), f.get(C.getTrustedResourceUrl(b), {cache: p}).success(function (h) {
                    var f, p;
                    if (h = ne(h), v.replace) {
                        if (h = bi.test(h) ? Yn(h) : [], f = h[0], 1 != h.length || 1 !== f.nodeType)throw Oi("tplrt", v.name, b);
                        h = {$attr: {}}, K(i, e, f);
                        var w = I(f, [], h);
                        $(v.scope) && q(w), t = w.concat(t), V(n, h)
                    } else f = m, e.html(h);
                    for (t.unshift(g), c = D(t, f, n, r, e, v, a, s, l), o(i, function (t, n) {
                        t == f && (i[n] = e[0])
                    }), u = N(e[0].childNodes, r); d.length;) {
                        h = d.shift(), p = d.shift();
                        var y = d.shift(), x = d.shift(), w = e[0];
                        if (p !== m) {
                            var E = p.className;
                            l.hasElementTranscludeDirective && v.replace || (w = oe(f)), K(y, Yn(p), w), A(Yn(w), E)
                        }
                        p = c.transclude ? _(h, c.transclude) : x, c(u, h, w, i, p)
                    }
                    d = null
                }).error(function (t, e, n, i) {
                    throw Oi("tpload", i.url)
                }), function (t, e, n, i, r) {
                    d ? (d.push(e), d.push(n), d.push(i), d.push(r)) : c(u, e, n, i, r)
                }
            }

            function F(t, e) {
                var n = e.priority - t.priority;
                return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index
            }

            function B(t, e, n, i) {
                if (e)throw Oi("multidir", e.name, n.name, t, W(i))
            }

            function U(t, e) {
                var n = i(e, !0);
                n && t.push({
                    priority: 0, compile: v(function (t, e) {
                        var i = e.parent(), r = i.data("$binding") || [];
                        r.push(n), A(i.data("$binding", r), "ng-binding"), t.$watch(n, function (t) {
                            e[0].nodeValue = t
                        })
                    })
                })
            }

            function Y(t, e) {
                if ("srcdoc" == e)return C.HTML;
                var n = Gn(t);
                return "xlinkHref" == e || "FORM" == n && "action" == e || "IMG" != n && ("src" == e || "ngSrc" == e) ? C.RESOURCE_URL : void 0
            }

            function G(t, e, n, r) {
                var o = i(n, !0);
                if (o) {
                    if ("multiple" === r && "SELECT" === Gn(t))throw Oi("selmulti", W(t));
                    e.push({
                        priority: 100, compile: function () {
                            return {
                                pre: function (e, n, a) {
                                    if (n = a.$$observers || (a.$$observers = {}), u.test(r))throw Oi("nodomevents");
                                    (o = i(a[r], !0, Y(t, r))) && (a[r] = o(e), (n[r] || (n[r] = [])).$$inter = !0, (a.$$observers && a.$$observers[r].$$scope || e).$watch(o, function (t, e) {
                                        "class" === r && t != e ? a.$updateClass(t, e) : a.$set(r, t)
                                    }))
                                }
                            }
                        }
                    })
                }
            }

            function K(t, n, i) {
                var r, o, a = n[0], s = n.length, l = a.parentNode;
                if (t)for (r = 0, o = t.length; o > r; r++)if (t[r] == a) {
                    t[r++] = i, o = r + s - 1;
                    for (var c = t.length; c > r; r++, o++)c > o ? t[r] = t[o] : delete t[r];
                    t.length -= s - 1;
                    break
                }
                for (l && l.replaceChild(i, a), t = e.createDocumentFragment(), t.appendChild(a), i[Yn.expando] = a[Yn.expando], a = 1, s = n.length; s > a; a++)l = n[a], Yn(l).remove(), t.appendChild(l), delete n[a];
                n[0] = i, n.length = 1
            }

            function Z(t, e) {
                return h(function () {
                    return t.apply(null, arguments)
                }, t, e)
            }

            var Q = function (t, e) {
                this.$$element = t, this.$attr = e || {}
            };
            Q.prototype = {
                $normalize: _e, $addClass: function (t) {
                    t && t.length > 0 && T.addClass(this.$$element, t)
                }, $removeClass: function (t) {
                    t && t.length > 0 && T.removeClass(this.$$element, t)
                }, $updateClass: function (t, e) {
                    var n = Pe(t, e), i = Pe(e, t);
                    0 === n.length ? T.removeClass(this.$$element, i) : 0 === i.length ? T.addClass(this.$$element, n) : T.setClass(this.$$element, n, i)
                }, $set: function (t, e, i, r) {
                    var a = be(this.$$element[0], t);
                    a && (this.$$element.prop(t, e), r = a), this[t] = e, r ? this.$attr[t] = r : (r = this.$attr[t]) || (this.$attr[t] = r = z(t, "-")), a = Gn(this.$$element), ("A" === a && "href" === t || "IMG" === a && "src" === t) && (this[t] = e = L(e, "src" === t)), !1 !== i && (null === e || e === n ? this.$$element.removeAttr(r) : this.$$element.attr(r, e)), (i = this.$$observers) && o(i[t], function (t) {
                        try {
                            t(e)
                        } catch (n) {
                            l(n)
                        }
                    })
                }, $observe: function (t, e) {
                    var n = this, i = n.$$observers || (n.$$observers = {}), r = i[t] || (i[t] = []);
                    return r.push(e), y.$evalAsync(function () {
                        r.$$inter || e(n[t])
                    }), e
                }
            };
            var te = i.startSymbol(), ee = i.endSymbol(), ne = "{{" == te || "}}" == ee ? m : function (t) {
                return t.replace(/\{\{/g, te).replace(/}}/g, ee)
            }, ie = /^ngAttr[A-Z]/;
            return k
        }]
    }

    function _e(t) {
        return ne(t.replace(Ii, ""))
    }

    function Pe(t, e) {
        var n = "", i = t.split(/\s+/), r = e.split(/\s+/), o = 0;
        t:for (; i.length > o; o++) {
            for (var a = i[o], s = 0; r.length > s; s++)if (a == r[s])continue t;
            n += (n.length > 0 ? " " : "") + a
        }
        return n
    }

    function Oe() {
        var t = {}, e = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (e, n) {
            K(e, "controller"), $(e) ? h(t, e) : t[e] = n
        }, this.$get = ["$injector", "$window", function (n, r) {
            return function (o, a) {
                var s, l, c;
                if (w(o) && (s = o.match(e), l = s[1], c = s[3], o = t.hasOwnProperty(l) ? t[l] : Z(a.$scope, l, !0) || Z(r, l, !0), G(o, l, !0)), s = n.instantiate(o, a), c) {
                    if (!a || "object" != typeof a.$scope)throw i("$controller")("noscp", l || o.name, c);
                    a.$scope[c] = s
                }
                return s
            }
        }]
    }

    function Ie() {
        this.$get = ["$window", function (t) {
            return Yn(t.document)
        }]
    }

    function Re() {
        this.$get = ["$log", function (t) {
            return function () {
                t.error.apply(t, arguments)
            }
        }]
    }

    function Me(t) {
        var e, n, i, r = {};
        return t ? (o(t.split("\n"), function (t) {
            i = t.indexOf(":"), e = Kn(ai(t.substr(0, i))), n = ai(t.substr(i + 1)), e && (r[e] = r[e] ? r[e] + (", " + n) : n)
        }), r) : r
    }

    function je(t) {
        var e = $(t) ? t : n;
        return function (n) {
            return e || (e = Me(t)), n ? e[Kn(n)] || null : e
        }
    }

    function De(t, e, n) {
        return S(n) ? n(t, e) : (o(n, function (n) {
            t = n(t, e)
        }), t)
    }

    function qe() {
        var t = /^\s*(\[|\{[^\{])/, e = /[\}\]]\s*$/, i = /^\)\]\}',?\n/, r = {"Content-Type": "application/json;charset=utf-8"}, a = this.defaults = {
            transformResponse: [function (n) {
                return w(n) && (n = n.replace(i, ""), t.test(n) && e.test(n) && (n = D(n))), n
            }],
            transformRequest: [function (t) {
                return $(t) && "[object File]" !== ni.call(t) && "[object Blob]" !== ni.call(t) ? j(t) : t
            }],
            headers: {common: {Accept: "application/json, text/plain, */*"}, post: _(r), put: _(r), patch: _(r)},
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }, l = this.interceptors = [], c = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (t, e, i, r, u, f) {
            function d(t) {
                function i(t) {
                    var e = h({}, t, {data: De(t.data, t.headers, r.transformResponse)});
                    return t.status >= 200 && 300 > t.status ? e : u.reject(e)
                }

                var r = {
                    method: "get",
                    transformRequest: a.transformRequest,
                    transformResponse: a.transformResponse
                }, s = function (t) {
                    function e(t) {
                        var e;
                        o(t, function (n, i) {
                            S(n) && (e = n(), null != e ? t[i] = e : delete t[i])
                        })
                    }

                    var n, i, r = a.headers, s = h({}, t.headers), r = h({}, r.common, r[Kn(t.method)]);
                    e(r), e(s);
                    t:for (n in r) {
                        t = Kn(n);
                        for (i in s)if (Kn(i) === t)continue t;
                        s[n] = r[n]
                    }
                    return s
                }(t);
                h(r, t), r.headers = s, r.method = Qn(r.method), (t = Tn(r.url) ? e.cookies()[r.xsrfCookieName || a.xsrfCookieName] : n) && (s[r.xsrfHeaderName || a.xsrfHeaderName] = t);
                var l = [function (t) {
                    s = t.headers;
                    var e = De(t.data, je(s), t.transformRequest);
                    return g(t.data) && o(s, function (t, e) {
                        "content-type" === Kn(e) && delete s[e]
                    }), g(t.withCredentials) && !g(a.withCredentials) && (t.withCredentials = a.withCredentials), p(t, e, s).then(i, i)
                }, n], c = u.when(r);
                for (o(y, function (t) {
                    (t.request || t.requestError) && l.unshift(t.request, t.requestError), (t.response || t.responseError) && l.push(t.response, t.responseError)
                }); l.length;) {
                    t = l.shift();
                    var f = l.shift(), c = c.then(t, f)
                }
                return c.success = function (t) {
                    return c.then(function (e) {
                        t(e.data, e.status, e.headers, r)
                    }), c
                }, c.error = function (t) {
                    return c.then(null, function (e) {
                        t(e.data, e.status, e.headers, r)
                    }), c
                }, c
            }

            function p(e, n, i) {
                function o(t, e, n, i) {
                    c && (t >= 200 && 300 > t ? c.put(w, [t, e, Me(n), i]) : c.remove(w)), s(e, t, n, i), r.$$phase || r.$apply()
                }

                function s(t, n, i, r) {
                    n = Math.max(n, 0), (n >= 200 && 300 > n ? f.resolve : f.reject)({
                        data: t,
                        status: n,
                        headers: je(i),
                        config: e,
                        statusText: r
                    })
                }

                function l() {
                    var t = A(d.pendingRequests, e);
                    -1 !== t && d.pendingRequests.splice(t, 1)
                }

                var c, h, f = u.defer(), p = f.promise, w = m(e.url, e.params);
                if (d.pendingRequests.push(e), p.then(l, l), (e.cache || a.cache) && !1 !== e.cache && "GET" == e.method && (c = $(e.cache) ? e.cache : $(a.cache) ? a.cache : v), c)if (h = c.get(w), b(h)) {
                    if (h.then)return h.then(l, l), h;
                    E(h) ? s(h[1], h[0], _(h[2]), h[3]) : s(h, 200, {}, "OK")
                } else c.put(w, p);
                return g(h) && t(e.method, w, n, o, i, e.timeout, e.withCredentials, e.responseType), p
            }

            function m(t, e) {
                if (!e)return t;
                var n = [];
                return s(e, function (t, e) {
                    null === t || g(t) || (E(t) || (t = [t]), o(t, function (t) {
                        $(t) && (t = j(t)), n.push(B(e) + "=" + B(t))
                    }))
                }), n.length > 0 && (t += (-1 == t.indexOf("?") ? "?" : "&") + n.join("&")), t
            }

            var v = i("$http"), y = [];
            return o(l, function (t) {
                y.unshift(w(t) ? f.get(t) : f.invoke(t))
            }), o(c, function (t, e) {
                var n = w(t) ? f.get(t) : f.invoke(t);
                y.splice(e, 0, {
                    response: function (t) {
                        return n(u.when(t))
                    }, responseError: function (t) {
                        return n(u.reject(t))
                    }
                })
            }), d.pendingRequests = [], function () {
                o(arguments, function (t) {
                    d[t] = function (e, n) {
                        return d(h(n || {}, {method: t, url: e}))
                    }
                })
            }("get", "delete", "head", "jsonp"), function () {
                o(arguments, function (t) {
                    d[t] = function (e, n, i) {
                        return d(h(i || {}, {method: t, url: e, data: n}))
                    }
                })
            }("post", "put"), d.defaults = a, d
        }]
    }

    function We(e) {
        if (8 >= Un && (!e.match(/^(get|post|head|put|delete|options)$/i) || !t.XMLHttpRequest))return new t.ActiveXObject("Microsoft.XMLHTTP");
        if (t.XMLHttpRequest)return new t.XMLHttpRequest;
        throw i("$httpBackend")("noxhr")
    }

    function He() {
        this.$get = ["$browser", "$window", "$document", function (t, e, n) {
            return Ve(t, We, t.defer, e.angular.callbacks, n[0])
        }]
    }

    function Ve(t, e, n, i, r) {
        function a(t, e) {
            var n = r.createElement("script"), i = function () {
                n.onreadystatechange = n.onload = n.onerror = null, r.body.removeChild(n), e && e()
            };
            return n.type = "text/javascript", n.src = t, Un && 8 >= Un ? n.onreadystatechange = function () {
                /loaded|complete/.test(n.readyState) && i()
            } : n.onload = n.onerror = function () {
                i()
            }, r.body.appendChild(n), i
        }

        var s = -1;
        return function (r, l, c, u, h, f, d, m) {
            function v() {
                $ = s, y && y(), x && x.abort()
            }

            function g(e, i, r, o, a) {
                S && n.cancel(S), y = x = null, 0 === i && (i = r ? 200 : "file" == Cn(l).protocol ? 404 : 0), e(1223 === i ? 204 : i, r, o, a || ""), t.$$completeOutstandingRequest(p)
            }

            var $;
            if (t.$$incOutstandingRequestCount(), l = l || t.url(), "jsonp" == Kn(r)) {
                var w = "_" + (i.counter++).toString(36);
                i[w] = function (t) {
                    i[w].data = t
                };
                var y = a(l.replace("JSON_CALLBACK", "angular.callbacks." + w), function () {
                    i[w].data ? g(u, 200, i[w].data) : g(u, $ || -2), i[w] = ri.noop
                })
            } else {
                var x = e(r);
                if (x.open(r, l, !0), o(h, function (t, e) {
                        b(t) && x.setRequestHeader(e, t)
                    }), x.onreadystatechange = function () {
                        if (x && 4 == x.readyState) {
                            var t = null, e = null;
                            $ !== s && (t = x.getAllResponseHeaders(), e = "response" in x ? x.response : x.responseText), g(u, $ || x.status, e, t, x.statusText || "")
                        }
                    }, d && (x.withCredentials = !0), m)try {
                    x.responseType = m
                } catch (E) {
                    if ("json" !== m)throw E
                }
                x.send(c || null)
            }
            if (f > 0)var S = n(v, f); else f && f.then && f.then(v)
        }
    }

    function Xe() {
        var t = "{{", e = "}}";
        this.startSymbol = function (e) {
            return e ? (t = e, this) : t
        }, this.endSymbol = function (t) {
            return t ? (e = t, this) : e
        }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, i, r) {
            function o(o, l, c) {
                for (var u, h, f = 0, d = [], p = o.length, m = !1, v = []; p > f;)-1 != (u = o.indexOf(t, f)) && -1 != (h = o.indexOf(e, u + a)) ? (f != u && d.push(o.substring(f, u)), d.push(f = n(m = o.substring(u + a, h))), f.exp = m, f = h + s, m = !0) : (f != p && d.push(o.substring(f)), f = p);
                if ((p = d.length) || (d.push(""), p = 1), c && d.length > 1)throw Ri("noconcat", o);
                return !l || m ? (v.length = p, f = function (t) {
                    try {
                        for (var e, n = 0, a = p; a > n; n++)"function" == typeof(e = d[n]) && (e = e(t), e = c ? r.getTrusted(c, e) : r.valueOf(e), null === e || g(e) ? e = "" : "string" != typeof e && (e = j(e))), v[n] = e;
                        return v.join("")
                    } catch (s) {
                        t = Ri("interr", o, "" + s), i(t)
                    }
                }, f.exp = o, f.parts = d, f) : void 0
            }

            var a = t.length, s = e.length;
            return o.startSymbol = function () {
                return t
            }, o.endSymbol = function () {
                return e
            }, o
        }]
    }

    function Fe() {
        this.$get = ["$rootScope", "$window", "$q", function (t, e, n) {
            function i(i, o, a, s) {
                var l = e.setInterval, c = e.clearInterval, u = n.defer(), h = u.promise, f = 0, d = b(s) && !s;
                return a = b(a) ? a : 0, h.then(null, null, i), h.$$intervalId = l(function () {
                    u.notify(f++), a > 0 && f >= a && (u.resolve(f), c(h.$$intervalId), delete r[h.$$intervalId]), d || t.$apply()
                }, o), r[h.$$intervalId] = u, h
            }

            var r = {};
            return i.cancel = function (t) {
                return t && t.$$intervalId in r ? (r[t.$$intervalId].reject("canceled"), clearInterval(t.$$intervalId), delete r[t.$$intervalId], !0) : !1
            }, i
        }]
    }

    function Be() {
        this.$get = function () {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January February March April May June July August September October November December".split(" "),
                    SHORTMONTH: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    DAY: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    SHORTDAY: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function (t) {
                    return 1 === t ? "one" : "other"
                }
            }
        }
    }

    function Ue(t) {
        t = t.split("/");
        for (var e = t.length; e--;)t[e] = F(t[e]);
        return t.join("/")
    }

    function Ye(t, e, n) {
        t = Cn(t, n), e.$$protocol = t.protocol, e.$$host = t.hostname, e.$$port = f(t.port) || ji[t.protocol] || null
    }

    function ze(t, e, n) {
        var i = "/" !== t.charAt(0);
        i && (t = "/" + t), t = Cn(t, n), e.$$path = decodeURIComponent(i && "/" === t.pathname.charAt(0) ? t.pathname.substring(1) : t.pathname), e.$$search = V(t.search), e.$$hash = decodeURIComponent(t.hash), e.$$path && "/" != e.$$path.charAt(0) && (e.$$path = "/" + e.$$path)
    }

    function Je(t, e) {
        return 0 === e.indexOf(t) ? e.substr(t.length) : void 0
    }

    function Ge(t) {
        var e = t.indexOf("#");
        return -1 == e ? t : t.substr(0, e)
    }

    function Ke(t) {
        return t.substr(0, Ge(t).lastIndexOf("/") + 1)
    }

    function Ze(t, e) {
        this.$$html5 = !0, e = e || "";
        var i = Ke(t);
        Ye(t, this, t), this.$$parse = function (e) {
            var n = Je(i, e);
            if (!w(n))throw Di("ipthprfx", e, i);
            ze(n, this, t), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function () {
            var t = X(this.$$search), e = this.$$hash ? "#" + F(this.$$hash) : "";
            this.$$url = Ue(this.$$path) + (t ? "?" + t : "") + e, this.$$absUrl = i + this.$$url.substr(1)
        }, this.$$rewrite = function (r) {
            var o;
            return (o = Je(t, r)) !== n ? (r = o, (o = Je(e, o)) !== n ? i + (Je("/", o) || o) : t + r) : (o = Je(i, r)) !== n ? i + o : i == r + "/" ? i : void 0
        }
    }

    function Qe(t, e) {
        var n = Ke(t);
        Ye(t, this, t), this.$$parse = function (i) {
            var r = Je(t, i) || Je(n, i), r = "#" == r.charAt(0) ? Je(e, r) : this.$$html5 ? r : "";
            if (!w(r))throw Di("ihshprfx", i, e);
            ze(r, this, t), i = this.$$path;
            var o = /^\/?.*?:(\/.*)/;
            0 === r.indexOf(t) && (r = r.replace(t, "")), o.exec(r) || (i = (r = o.exec(i)) ? r[1] : i), this.$$path = i, this.$$compose()
        }, this.$$compose = function () {
            var n = X(this.$$search), i = this.$$hash ? "#" + F(this.$$hash) : "";
            this.$$url = Ue(this.$$path) + (n ? "?" + n : "") + i, this.$$absUrl = t + (this.$$url ? e + this.$$url : "")
        }, this.$$rewrite = function (e) {
            return Ge(t) == Ge(e) ? e : void 0
        }
    }

    function tn(t, e) {
        this.$$html5 = !0, Qe.apply(this, arguments);
        var n = Ke(t);
        this.$$rewrite = function (i) {
            var r;
            return t == Ge(i) ? i : (r = Je(n, i)) ? t + e + r : n === i + "/" ? n : void 0
        }
    }

    function en(t) {
        return function () {
            return this[t]
        }
    }

    function nn(t, e) {
        return function (n) {
            return g(n) ? this[t] : (this[t] = e(n), this.$$compose(), this)
        }
    }

    function rn() {
        var e = "", n = !1;
        this.hashPrefix = function (t) {
            return b(t) ? (e = t, this) : e
        }, this.html5Mode = function (t) {
            return b(t) ? (n = t, this) : n
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (i, r, o, a) {
            function s(t) {
                i.$broadcast("$locationChangeSuccess", l.absUrl(), t)
            }

            var l, c = r.baseHref(), u = r.url();
            n ? (c = u.substring(0, u.indexOf("/", u.indexOf("//") + 2)) + (c || "/"), o = o.history ? Ze : tn) : (c = Ge(u), o = Qe), l = new o(c, "#" + e), l.$$parse(l.$$rewrite(u)), a.on("click", function (e) {
                if (!e.ctrlKey && !e.metaKey && 2 != e.which) {
                    for (var n = Yn(e.target); "a" !== Kn(n[0].nodeName);)if (n[0] === a[0] || !(n = n.parent())[0])return;
                    var o = n.prop("href");
                    $(o) && "[object SVGAnimatedString]" == "" + o && (o = Cn(o.animVal).href);
                    var s = l.$$rewrite(o);
                    o && !n.attr("target") && s && !e.isDefaultPrevented() && (e.preventDefault(), s != r.url() && (l.$$parse(s), i.$apply(), t.angular["ff-684208-preventDefault"] = !0))
                }
            }), l.absUrl() != u && r.url(l.absUrl(), !0), r.onUrlChange(function (t) {
                l.absUrl() != t && (i.$evalAsync(function () {
                    var e = l.absUrl();
                    l.$$parse(t), i.$broadcast("$locationChangeStart", t, e).defaultPrevented ? (l.$$parse(e), r.url(e)) : s(e)
                }), i.$$phase || i.$digest())
            });
            var h = 0;
            return i.$watch(function () {
                var t = r.url(), e = l.$$replace;
                return h && t == l.absUrl() || (h++, i.$evalAsync(function () {
                    i.$broadcast("$locationChangeStart", l.absUrl(), t).defaultPrevented ? l.$$parse(t) : (r.url(l.absUrl(), e), s(t))
                })), l.$$replace = !1, h
            }), l
        }]
    }

    function on() {
        var t = !0, e = this;
        this.debugEnabled = function (e) {
            return b(e) ? (t = e, this) : t
        }, this.$get = ["$window", function (n) {
            function i(t) {
                return t instanceof Error && (t.stack ? t = t.message && -1 === t.stack.indexOf(t.message) ? "Error: " + t.message + "\n" + t.stack : t.stack : t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), t
            }

            function r(t) {
                var e = n.console || {}, r = e[t] || e.log || p;
                t = !1;
                try {
                    t = !!r.apply
                } catch (a) {
                }
                return t ? function () {
                    var t = [];
                    return o(arguments, function (e) {
                        t.push(i(e))
                    }), r.apply(e, t)
                } : function (t, e) {
                    r(t, null == e ? "" : e)
                }
            }

            return {
                log: r("log"), info: r("info"), warn: r("warn"), error: r("error"), debug: function () {
                    var n = r("debug");
                    return function () {
                        t && n.apply(e, arguments)
                    }
                }()
            }
        }]
    }

    function an(t, e) {
        if ("constructor" === t)throw Wi("isecfld", e);
        return t
    }

    function sn(t, e) {
        if (t) {
            if (t.constructor === t)throw Wi("isecfn", e);
            if (t.document && t.location && t.alert && t.setInterval)throw Wi("isecwindow", e);
            if (t.children && (t.nodeName || t.prop && t.attr && t.find))throw Wi("isecdom", e)
        }
        return t
    }

    function ln(t, e, i, r, o) {
        o = o || {}, e = e.split(".");
        for (var a, s = 0; e.length > 1; s++) {
            a = an(e.shift(), r);
            var l = t[a];
            l || (l = {}, t[a] = l), t = l, t.then && o.unwrapPromises && (qi(r), "$$v" in t || function (t) {
                t.then(function (e) {
                    t.$$v = e
                })
            }(t), t.$$v === n && (t.$$v = {}), t = t.$$v)
        }
        return a = an(e.shift(), r), t[a] = i
    }

    function cn(t, e, i, r, o, a, s) {
        return an(t, a), an(e, a), an(i, a), an(r, a), an(o, a), s.unwrapPromises ? function (s, l) {
            var c, u = l && l.hasOwnProperty(t) ? l : s;
            return null == u ? u : ((u = u[t]) && u.then && (qi(a), "$$v" in u || (c = u, c.$$v = n, c.then(function (t) {
                c.$$v = t
            })), u = u.$$v), e ? null == u ? n : ((u = u[e]) && u.then && (qi(a), "$$v" in u || (c = u, c.$$v = n, c.then(function (t) {
                c.$$v = t
            })), u = u.$$v), i ? null == u ? n : ((u = u[i]) && u.then && (qi(a), "$$v" in u || (c = u, c.$$v = n, c.then(function (t) {
                c.$$v = t
            })), u = u.$$v), r ? null == u ? n : ((u = u[r]) && u.then && (qi(a), "$$v" in u || (c = u, c.$$v = n, c.then(function (t) {
                c.$$v = t
            })), u = u.$$v), o ? null == u ? n : ((u = u[o]) && u.then && (qi(a), "$$v" in u || (c = u, c.$$v = n, c.then(function (t) {
                c.$$v = t
            })), u = u.$$v), u) : u) : u) : u) : u)
        } : function (a, s) {
            var l = s && s.hasOwnProperty(t) ? s : a;
            return null == l ? l : (l = l[t], e ? null == l ? n : (l = l[e], i ? null == l ? n : (l = l[i], r ? null == l ? n : (l = l[r], o ? null == l ? n : l = l[o] : l) : l) : l) : l)
        }
    }

    function un(t, e) {
        return an(t, e), function (e, i) {
            return null == e ? n : (i && i.hasOwnProperty(t) ? i : e)[t]
        }
    }

    function hn(t, e, i) {
        return an(t, i), an(e, i), function (i, r) {
            return null == i ? n : (i = (r && r.hasOwnProperty(t) ? r : i)[t], null == i ? n : i[e])
        }
    }

    function fn(t, e, i) {
        if (Ui.hasOwnProperty(t))return Ui[t];
        var r, a = t.split("."), s = a.length;
        if (e.unwrapPromises || 1 !== s)if (e.unwrapPromises || 2 !== s)if (e.csp)r = 6 > s ? cn(a[0], a[1], a[2], a[3], a[4], i, e) : function (t, r) {
            var o, l = 0;
            do o = cn(a[l++], a[l++], a[l++], a[l++], a[l++], i, e)(t, r), r = n, t = o; while (s > l);
            return o
        }; else {
            var l = "var p;\n";
            o(a, function (t, n) {
                an(t, i), l += "if(s == null) return undefined;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + t + '"))?k:s)') + '["' + t + '"];\n' + (e.unwrapPromises ? 'if (s && s.then) {\n pw("' + i.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n' : "")
            });
            var l = l + "return s;", c = Function("s", "k", "pw", l);
            c.toString = v(l), r = e.unwrapPromises ? function (t, e) {
                return c(t, e, qi)
            } : c
        } else r = hn(a[0], a[1], i); else r = un(a[0], i);
        return "hasOwnProperty" !== t && (Ui[t] = r), r
    }

    function dn() {
        var t = {}, e = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
        this.unwrapPromises = function (t) {
            return b(t) ? (e.unwrapPromises = !!t, this) : e.unwrapPromises
        }, this.logPromiseWarnings = function (t) {
            return b(t) ? (e.logPromiseWarnings = t, this) : e.logPromiseWarnings
        }, this.$get = ["$filter", "$sniffer", "$log", function (n, i, r) {
            return e.csp = i.csp, qi = function (t) {
                e.logPromiseWarnings && !Hi.hasOwnProperty(t) && (Hi[t] = !0, r.warn("[$parse] Promise found in the expression `" + t + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
            }, function (i) {
                var r;
                switch (typeof i) {
                    case"string":
                        return t.hasOwnProperty(i) ? t[i] : (r = new Fi(e), r = new Bi(r, n, e).parse(i, !1), "hasOwnProperty" !== i && (t[i] = r), r);
                    case"function":
                        return i;
                    default:
                        return p
                }
            }
        }]
    }

    function pn() {
        this.$get = ["$rootScope", "$exceptionHandler", function (t, e) {
            return mn(function (e) {
                t.$evalAsync(e)
            }, e)
        }]
    }

    function mn(t, e) {
        function i(t) {
            return t
        }

        function r(t) {
            return l(t)
        }

        var a = function () {
            var o, l, u = [];
            return l = {
                resolve: function (e) {
                    if (u) {
                        var i = u;
                        u = n, o = s(e), i.length && t(function () {
                            for (var t, e = 0, n = i.length; n > e; e++)t = i[e], o.then(t[0], t[1], t[2])
                        })
                    }
                }, reject: function (t) {
                    l.resolve(c(t))
                }, notify: function (e) {
                    if (u) {
                        var n = u;
                        u.length && t(function () {
                            for (var t, i = 0, r = n.length; r > i; i++)t = n[i], t[2](e)
                        })
                    }
                }, promise: {
                    then: function (t, n, s) {
                        var l = a(), c = function (n) {
                            try {
                                l.resolve((S(t) ? t : i)(n))
                            } catch (r) {
                                l.reject(r), e(r)
                            }
                        }, h = function (t) {
                            try {
                                l.resolve((S(n) ? n : r)(t))
                            } catch (i) {
                                l.reject(i), e(i)
                            }
                        }, f = function (t) {
                            try {
                                l.notify((S(s) ? s : i)(t))
                            } catch (n) {
                                e(n)
                            }
                        };
                        return u ? u.push([c, h, f]) : o.then(c, h, f), l.promise
                    }, "catch": function (t) {
                        return this.then(null, t)
                    }, "finally": function (t) {
                        function e(t, e) {
                            var n = a();
                            return e ? n.resolve(t) : n.reject(t), n.promise
                        }

                        function n(n, r) {
                            var o = null;
                            try {
                                o = (t || i)()
                            } catch (a) {
                                return e(a, !1)
                            }
                            return o && S(o.then) ? o.then(function () {
                                return e(n, r)
                            }, function (t) {
                                return e(t, !1)
                            }) : e(n, r)
                        }

                        return this.then(function (t) {
                            return n(t, !0)
                        }, function (t) {
                            return n(t, !1)
                        })
                    }
                }
            }
        }, s = function (e) {
            return e && S(e.then) ? e : {
                then: function (n) {
                    var i = a();
                    return t(function () {
                        i.resolve(n(e))
                    }), i.promise
                }
            }
        }, l = function (t) {
            var e = a();
            return e.reject(t), e.promise
        }, c = function (n) {
            return {
                then: function (i, o) {
                    var s = a();
                    return t(function () {
                        try {
                            s.resolve((S(o) ? o : r)(n))
                        } catch (t) {
                            s.reject(t), e(t)
                        }
                    }), s.promise
                }
            }
        };
        return {
            defer: a, reject: l, when: function (n, o, c, u) {
                var h, f = a(), d = function (t) {
                    try {
                        return (S(o) ? o : i)(t)
                    } catch (n) {
                        return e(n), l(n)
                    }
                }, p = function (t) {
                    try {
                        return (S(c) ? c : r)(t)
                    } catch (n) {
                        return e(n), l(n)
                    }
                }, m = function (t) {
                    try {
                        return (S(u) ? u : i)(t)
                    } catch (n) {
                        e(n)
                    }
                };
                return t(function () {
                    s(n).then(function (t) {
                        h || (h = !0, f.resolve(s(t).then(d, p, m)))
                    }, function (t) {
                        h || (h = !0, f.resolve(p(t)))
                    }, function (t) {
                        h || f.notify(m(t))
                    })
                }), f.promise
            }, all: function (t) {
                var e = a(), n = 0, i = E(t) ? [] : {};
                return o(t, function (t, r) {
                    n++, s(t).then(function (t) {
                        i.hasOwnProperty(r) || (i[r] = t, --n || e.resolve(i))
                    }, function (t) {
                        i.hasOwnProperty(r) || e.reject(t)
                    })
                }), 0 === n && e.resolve(i), e.promise
            }
        }
    }

    function vn() {
        this.$get = ["$window", "$timeout", function (t, e) {
            var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame, i = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.webkitCancelRequestAnimationFrame, r = !!n, o = r ? function (t) {
                var e = n(t);
                return function () {
                    i(e)
                }
            } : function (t) {
                var n = e(t, 16.66, !1);
                return function () {
                    e.cancel(n)
                }
            };
            return o.supported = r, o
        }]
    }

    function gn() {
        var t = 10, e = i("$rootScope"), n = null;
        this.digestTtl = function (e) {
            return arguments.length && (t = e), t
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (i, a, s, l) {
            function u() {
                this.$id = c(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$postDigestQueue = [], this.$$listeners = {}, this.$$listenerCount = {}, this.$$isolateBindings = {}
            }

            function h(t) {
                if (v.$$phase)throw e("inprog", v.$$phase);
                v.$$phase = t
            }

            function f(t, e) {
                var n = s(t);
                return G(n, e), n
            }

            function d(t, e, n) {
                do t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n]; while (t = t.$parent)
            }

            function m() {
            }

            u.prototype = {
                constructor: u, $new: function (t) {
                    return t ? (t = new u, t.$root = this.$root, t.$$asyncQueue = this.$$asyncQueue, t.$$postDigestQueue = this.$$postDigestQueue) : (t = function () {
                    }, t.prototype = this, t = new t, t.$id = c()), t["this"] = t, t.$$listeners = {}, t.$$listenerCount = {}, t.$parent = this, t.$$watchers = t.$$nextSibling = t.$$childHead = t.$$childTail = null, t.$$prevSibling = this.$$childTail, this.$$childHead ? this.$$childTail = this.$$childTail.$$nextSibling = t : this.$$childHead = this.$$childTail = t, t
                }, $watch: function (t, e, i) {
                    var r = f(t, "watch"), o = this.$$watchers, a = {fn: e, last: m, get: r, exp: t, eq: !!i};
                    if (n = null, !S(e)) {
                        var s = f(e || p, "listener");
                        a.fn = function (t, e, n) {
                            s(n)
                        }
                    }
                    if ("string" == typeof t && r.constant) {
                        var l = a.fn;
                        a.fn = function (t, e, n) {
                            l.call(this, t, e, n), N(o, a)
                        }
                    }
                    return o || (o = this.$$watchers = []), o.unshift(a), function () {
                        N(o, a), n = null
                    }
                }, $watchCollection: function (t, e) {
                    var n, i, o, a = this, l = e.length > 1, c = 0, u = s(t), h = [], f = {}, d = !0, p = 0;
                    return this.$watch(function () {
                        n = u(a);
                        var t, e;
                        if ($(n))if (r(n))for (i !== h && (i = h, p = i.length = 0, c++), t = n.length, p !== t && (c++, i.length = p = t), e = 0; t > e; e++)i[e] !== i[e] && n[e] !== n[e] || i[e] === n[e] || (c++, i[e] = n[e]); else {
                            i !== f && (i = f = {}, p = 0, c++), t = 0;
                            for (e in n)n.hasOwnProperty(e) && (t++, i.hasOwnProperty(e) ? i[e] !== n[e] && (c++, i[e] = n[e]) : (p++, i[e] = n[e], c++));
                            if (p > t)for (e in c++, i)i.hasOwnProperty(e) && !n.hasOwnProperty(e) && (p--, delete i[e])
                        } else i !== n && (i = n, c++);
                        return c
                    }, function () {
                        if (d ? (d = !1, e(n, n, a)) : e(n, o, a), l)if ($(n))if (r(n)) {
                            o = Array(n.length);
                            for (var t = 0; n.length > t; t++)o[t] = n[t]
                        } else for (t in o = {}, n)Zn.call(n, t) && (o[t] = n[t]); else o = n
                    })
                }, $digest: function () {
                    var i, r, o, s, l, c, u, f, d, p, g = this.$$asyncQueue, b = this.$$postDigestQueue, $ = t, w = [];
                    h("$digest"), n = null;
                    do {
                        for (c = !1, u = this; g.length;) {
                            try {
                                p = g.shift(), p.scope.$eval(p.expression)
                            } catch (y) {
                                v.$$phase = null, a(y)
                            }
                            n = null
                        }
                        t:do {
                            if (s = u.$$watchers)for (l = s.length; l--;)try {
                                if (i = s[l])if ((r = i.get(u)) === (o = i.last) || (i.eq ? O(r, o) : "number" == typeof r && "number" == typeof o && isNaN(r) && isNaN(o))) {
                                    if (i === n) {
                                        c = !1;
                                        break t
                                    }
                                } else c = !0, n = i, i.last = i.eq ? _(r) : r, i.fn(r, o === m ? r : o, u), 5 > $ && (f = 4 - $, w[f] || (w[f] = []), d = S(i.exp) ? "fn: " + (i.exp.name || "" + i.exp) : i.exp, d += "; newVal: " + j(r) + "; oldVal: " + j(o), w[f].push(d))
                            } catch (x) {
                                v.$$phase = null, a(x)
                            }
                            if (!(s = u.$$childHead || u !== this && u.$$nextSibling))for (; u !== this && !(s = u.$$nextSibling);)u = u.$parent
                        } while (u = s);
                        if ((c || g.length) && !$--)throw v.$$phase = null, e("infdig", t, j(w))
                    } while (c || g.length);
                    for (v.$$phase = null; b.length;)try {
                        b.shift()()
                    } catch (E) {
                        a(E)
                    }
                }, $destroy: function () {
                    if (!this.$$destroyed) {
                        var t = this.$parent;
                        this.$broadcast("$destroy"), this.$$destroyed = !0, this !== v && (o(this.$$listenerCount, R(null, d, this)), t.$$childHead == this && (t.$$childHead = this.$$nextSibling), t.$$childTail == this && (t.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null, this.$$listeners = {}, this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [], this.$destroy = this.$digest = this.$apply = p, this.$on = this.$watch = function () {
                            return p
                        })
                    }
                }, $eval: function (t, e) {
                    return s(t)(this, e)
                }, $evalAsync: function (t) {
                    v.$$phase || v.$$asyncQueue.length || l.defer(function () {
                        v.$$asyncQueue.length && v.$digest()
                    }), this.$$asyncQueue.push({scope: this, expression: t})
                }, $$postDigest: function (t) {
                    this.$$postDigestQueue.push(t)
                }, $apply: function (t) {
                    try {
                        return h("$apply"), this.$eval(t)
                    } catch (e) {
                        a(e)
                    } finally {
                        v.$$phase = null;
                        try {
                            v.$digest()
                        } catch (n) {
                            throw a(n), n
                        }
                    }
                }, $on: function (t, e) {
                    var n = this.$$listeners[t];
                    n || (this.$$listeners[t] = n = []), n.push(e);
                    var i = this;
                    do i.$$listenerCount[t] || (i.$$listenerCount[t] = 0), i.$$listenerCount[t]++; while (i = i.$parent);
                    var r = this;
                    return function () {
                        n[A(n, e)] = null, d(r, 1, t)
                    }
                }, $emit: function (t) {
                    var e, n, i, r = [], o = this, s = !1, l = {
                        name: t, targetScope: o, stopPropagation: function () {
                            s = !0
                        }, preventDefault: function () {
                            l.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, c = [l].concat(ti.call(arguments, 1));
                    do {
                        for (e = o.$$listeners[t] || r, l.currentScope = o, n = 0, i = e.length; i > n; n++)if (e[n])try {
                            e[n].apply(null, c)
                        } catch (u) {
                            a(u)
                        } else e.splice(n, 1), n--, i--;
                        if (s)break;
                        o = o.$parent
                    } while (o);
                    return l
                }, $broadcast: function (t) {
                    for (var e, n, i = this, r = this, o = {
                        name: t, targetScope: this, preventDefault: function () {
                            o.defaultPrevented = !0
                        }, defaultPrevented: !1
                    }, s = [o].concat(ti.call(arguments, 1)); i = r;) {
                        for (o.currentScope = i, r = i.$$listeners[t] || [], e = 0, n = r.length; n > e; e++)if (r[e])try {
                            r[e].apply(null, s)
                        } catch (l) {
                            a(l)
                        } else r.splice(e, 1), e--, n--;
                        if (!(r = i.$$listenerCount[t] && i.$$childHead || i !== this && i.$$nextSibling))for (; i !== this && !(r = i.$$nextSibling);)i = i.$parent
                    }
                    return o
                }
            };
            var v = new u;
            return v
        }]
    }

    function bn() {
        var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*(https?|ftp|file):|data:image\//;
        this.aHrefSanitizationWhitelist = function (e) {
            return b(e) ? (t = e, this) : t
        }, this.imgSrcSanitizationWhitelist = function (t) {
            return b(t) ? (e = t, this) : e
        }, this.$get = function () {
            return function (n, i) {
                var r, o = i ? e : t;
                return Un && !(Un >= 8) || (r = Cn(n).href, "" === r || r.match(o)) ? n : "unsafe:" + r
            }
        }
    }

    function $n(t) {
        if ("self" === t)return t;
        if (w(t)) {
            if (t.indexOf("***") > -1)throw Yi("iwcard", t);
            return t = t.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08").replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"), RegExp("^" + t + "$")
        }
        if (C(t))return RegExp("^" + t.source + "$");
        throw Yi("imatcher")
    }

    function wn(t) {
        var e = [];
        return b(t) && o(t, function (t) {
            e.push($n(t))
        }), e
    }

    function yn() {
        this.SCE_CONTEXTS = zi;
        var t = ["self"], e = [];
        this.resourceUrlWhitelist = function (e) {
            return arguments.length && (t = wn(e)), t
        }, this.resourceUrlBlacklist = function (t) {
            return arguments.length && (e = wn(t)), e
        }, this.$get = ["$injector", function (i) {
            function r(t) {
                var e = function (t) {
                    this.$$unwrapTrustedValue = function () {
                        return t
                    }
                };
                return t && (e.prototype = new t), e.prototype.valueOf = function () {
                    return this.$$unwrapTrustedValue()
                }, e.prototype.toString = function () {
                    return "" + this.$$unwrapTrustedValue()
                }, e
            }

            var o = function () {
                throw Yi("unsafe")
            };
            i.has("$sanitize") && (o = i.get("$sanitize"));
            var a = r(), s = {};
            return s[zi.HTML] = r(a), s[zi.CSS] = r(a), s[zi.URL] = r(a), s[zi.JS] = r(a), s[zi.RESOURCE_URL] = r(s[zi.URL]), {
                trustAs: function (t, e) {
                    var i = s.hasOwnProperty(t) ? s[t] : null;
                    if (!i)throw Yi("icontext", t, e);
                    if (null === e || e === n || "" === e)return e;
                    if ("string" != typeof e)throw Yi("itype", t);
                    return new i(e)
                }, getTrusted: function (i, r) {
                    if (null === r || r === n || "" === r)return r;
                    var a = s.hasOwnProperty(i) ? s[i] : null;
                    if (a && r instanceof a)return r.$$unwrapTrustedValue();
                    if (i === zi.RESOURCE_URL) {
                        var l, c, a = Cn("" + r), u = !1;
                        for (l = 0, c = t.length; c > l; l++)if ("self" === t[l] ? Tn(a) : t[l].exec(a.href)) {
                            u = !0;
                            break
                        }
                        if (u)for (l = 0, c = e.length; c > l; l++)if ("self" === e[l] ? Tn(a) : e[l].exec(a.href)) {
                            u = !1;
                            break
                        }
                        if (u)return r;
                        throw Yi("insecurl", "" + r)
                    }
                    if (i === zi.HTML)return o(r);
                    throw Yi("unsafe")
                }, valueOf: function (t) {
                    return t instanceof a ? t.$$unwrapTrustedValue() : t
                }
            }
        }]
    }

    function xn() {
        var t = !0;
        this.enabled = function (e) {
            return arguments.length && (t = !!e), t
        }, this.$get = ["$parse", "$sniffer", "$sceDelegate", function (e, n, i) {
            if (t && n.msie && 8 > n.msieDocumentMode)throw Yi("iequirks");
            var r = _(zi);
            r.isEnabled = function () {
                return t
            }, r.trustAs = i.trustAs, r.getTrusted = i.getTrusted, r.valueOf = i.valueOf, t || (r.trustAs = r.getTrusted = function (t, e) {
                return e
            }, r.valueOf = m), r.parseAs = function (t, n) {
                var i = e(n);
                return i.literal && i.constant ? i : function (e, n) {
                    return r.getTrusted(t, i(e, n))
                }
            };
            var a = r.parseAs, s = r.getTrusted, l = r.trustAs;
            return o(zi, function (t, e) {
                var n = Kn(e);
                r[ne("parse_as_" + n)] = function (e) {
                    return a(t, e)
                }, r[ne("get_trusted_" + n)] = function (e) {
                    return s(t, e)
                }, r[ne("trust_as_" + n)] = function (e) {
                    return l(t, e)
                }
            }), r
        }]
    }

    function En() {
        this.$get = ["$window", "$document", function (t, e) {
            var n, i = {}, r = f((/android (\d+)/.exec(Kn((t.navigator || {}).userAgent)) || [])[1]), o = /Boxee/i.test((t.navigator || {}).userAgent), a = e[0] || {}, s = a.documentMode, l = /^(Moz|webkit|O|ms)(?=[A-Z])/, c = a.body && a.body.style, u = !1, h = !1;
            if (c) {
                for (var d in c)if (u = l.exec(d)) {
                    n = u[0], n = n.substr(0, 1).toUpperCase() + n.substr(1);
                    break
                }
                n || (n = "WebkitOpacity" in c && "webkit"), u = !!("transition" in c || n + "Transition" in c), h = !!("animation" in c || n + "Animation" in c), !r || u && h || (u = w(a.body.style.webkitTransition), h = w(a.body.style.webkitAnimation))
            }
            return {
                history: !(!t.history || !t.history.pushState || 4 > r || o),
                hashchange: "onhashchange" in t && (!s || s > 7),
                hasEvent: function (t) {
                    if ("input" == t && 9 == Un)return !1;
                    if (g(i[t])) {
                        var e = a.createElement("div");
                        i[t] = "on" + t in e
                    }
                    return i[t]
                },
                csp: I(),
                vendorPrefix: n,
                transitions: u,
                animations: h,
                android: r,
                msie: Un,
                msieDocumentMode: s
            }
        }]
    }

    function Sn() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (t, e, n, i) {
            function r(r, a, s) {
                var l = n.defer(), c = l.promise, u = b(s) && !s;
                return a = e.defer(function () {
                    try {
                        l.resolve(r())
                    } catch (e) {
                        l.reject(e), i(e)
                    } finally {
                        delete o[c.$$timeoutId]
                    }
                    u || t.$apply()
                }, a), c.$$timeoutId = a, o[a] = l, c
            }

            var o = {};
            return r.cancel = function (t) {
                return t && t.$$timeoutId in o ? (o[t.$$timeoutId].reject("canceled"), delete o[t.$$timeoutId], e.defer.cancel(t.$$timeoutId)) : !1
            }, r
        }]
    }

    function Cn(t) {
        var e = t;
        return Un && (Ji.setAttribute("href", e), e = Ji.href), Ji.setAttribute("href", e), {
            href: Ji.href,
            protocol: Ji.protocol ? Ji.protocol.replace(/:$/, "") : "",
            host: Ji.host,
            search: Ji.search ? Ji.search.replace(/^\?/, "") : "",
            hash: Ji.hash ? Ji.hash.replace(/^#/, "") : "",
            hostname: Ji.hostname,
            port: Ji.port,
            pathname: "/" === Ji.pathname.charAt(0) ? Ji.pathname : "/" + Ji.pathname
        }
    }

    function Tn(t) {
        return t = w(t) ? Cn(t) : t, t.protocol === Gi.protocol && t.host === Gi.host
    }

    function Ln() {
        this.$get = v(t)
    }

    function kn(t) {
        function e(i, r) {
            if ($(i)) {
                var a = {};
                return o(i, function (t, n) {
                    a[n] = e(n, t)
                }), a
            }
            return t.factory(i + n, r)
        }

        var n = "Filter";
        this.register = e, this.$get = ["$injector", function (t) {
            return function (e) {
                return t.get(e + n)
            }
        }], e("currency", Nn), e("date", Mn), e("filter", An), e("json", jn), e("limitTo", Dn), e("lowercase", er), e("number", _n), e("orderBy", qn), e("uppercase", nr)
    }

    function An() {
        return function (t, e, n) {
            if (!E(t))return t;
            var i = typeof n, r = [];
            r.check = function (t) {
                for (var e = 0; r.length > e; e++)if (!r[e](t))return !1;
                return !0
            }, "function" !== i && (n = "boolean" === i && n ? function (t, e) {
                return ri.equals(t, e)
            } : function (t, e) {
                if (t && e && "object" == typeof t && "object" == typeof e) {
                    for (var i in t)if ("$" !== i.charAt(0) && Zn.call(t, i) && n(t[i], e[i]))return !0;
                    return !1
                }
                return e = ("" + e).toLowerCase(), ("" + t).toLowerCase().indexOf(e) > -1
            });
            var o = function (t, e) {
                if ("string" == typeof e && "!" === e.charAt(0))return !o(t, e.substr(1));
                switch (typeof t) {
                    case"boolean":
                    case"number":
                    case"string":
                        return n(t, e);
                    case"object":
                        switch (typeof e) {
                            case"object":
                                return n(t, e);
                            default:
                                for (var i in t)if ("$" !== i.charAt(0) && o(t[i], e))return !0
                        }
                        return !1;
                    case"array":
                        for (i = 0; t.length > i; i++)if (o(t[i], e))return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof e) {
                case"boolean":
                case"number":
                case"string":
                    e = {$: e};
                case"object":
                    for (var a in e)(function (t) {
                        e[t] !== void 0 && r.push(function (n) {
                            return o("$" == t ? n : n && n[t], e[t])
                        })
                    })(a);
                    break;
                case"function":
                    r.push(e);
                    break;
                default:
                    return t
            }
            for (i = [], a = 0; t.length > a; a++) {
                var s = t[a];
                r.check(s) && i.push(s)
            }
            return i
        }
    }

    function Nn(t) {
        var e = t.NUMBER_FORMATS;
        return function (t, n) {
            return g(n) && (n = e.CURRENCY_SYM), Pn(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, 2).replace(/\u00A4/g, n)
        }
    }

    function _n(t) {
        var e = t.NUMBER_FORMATS;
        return function (t, n) {
            return Pn(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n)
        }
    }

    function Pn(t, e, n, i, r) {
        if (null == t || !isFinite(t) || $(t))return "";
        var o = 0 > t;
        t = Math.abs(t);
        var a = t + "", s = "", l = [], c = !1;
        if (-1 !== a.indexOf("e")) {
            var u = a.match(/([\d\.]+)e(-?)(\d+)/);
            u && "-" == u[2] && u[3] > r + 1 ? a = "0" : (s = a, c = !0)
        }
        if (c)r > 0 && t > -1 && 1 > t && (s = t.toFixed(r)); else {
            a = (a.split(Ki)[1] || "").length, g(r) && (r = Math.min(Math.max(e.minFrac, a), e.maxFrac)), a = Math.pow(10, r), t = Math.round(t * a) / a, t = ("" + t).split(Ki), a = t[0], t = t[1] || "";
            var u = 0, h = e.lgSize, f = e.gSize;
            if (a.length >= h + f)for (u = a.length - h, c = 0; u > c; c++)0 === (u - c) % f && 0 !== c && (s += n), s += a.charAt(c);
            for (c = u; a.length > c; c++)0 === (a.length - c) % h && 0 !== c && (s += n), s += a.charAt(c);
            for (; r > t.length;)t += "0";
            r && "0" !== r && (s += i + t.substr(0, r))
        }
        return l.push(o ? e.negPre : e.posPre), l.push(s), l.push(o ? e.negSuf : e.posSuf), l.join("")
    }

    function On(t, e, n) {
        var i = "";
        for (0 > t && (i = "-", t = -t), t = "" + t; e > t.length;)t = "0" + t;
        return n && (t = t.substr(t.length - e)), i + t
    }

    function In(t, e, n, i) {
        return n = n || 0, function (r) {
            return r = r["get" + t](), (n > 0 || r > -n) && (r += n), 0 === r && -12 == n && (r = 12), On(r, e, i)
        }
    }

    function Rn(t, e) {
        return function (n, i) {
            var r = n["get" + t](), o = Qn(e ? "SHORT" + t : t);
            return i[o][r]
        }
    }

    function Mn(t) {
        function e(t) {
            var e;
            if (e = t.match(n)) {
                t = new Date(0);
                var i = 0, r = 0, o = e[8] ? t.setUTCFullYear : t.setFullYear, a = e[8] ? t.setUTCHours : t.setHours;
                e[9] && (i = f(e[9] + e[10]), r = f(e[9] + e[11])), o.call(t, f(e[1]), f(e[2]) - 1, f(e[3])), i = f(e[4] || 0) - i, r = f(e[5] || 0) - r, o = f(e[6] || 0), e = Math.round(1e3 * parseFloat("0." + (e[7] || 0))), a.call(t, i, r, o, e)
            }
            return t
        }

        var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (n, i) {
            var r, a, s = "", l = [];
            if (i = i || "mediumDate", i = t.DATETIME_FORMATS[i] || i, w(n) && (n = tr.test(n) ? f(n) : e(n)), y(n) && (n = new Date(n)), !x(n))return n;
            for (; i;)(a = Qi.exec(i)) ? (l = l.concat(ti.call(a, 1)), i = l.pop()) : (l.push(i), i = null);
            return o(l, function (e) {
                r = Zi[e], s += r ? r(n, t.DATETIME_FORMATS) : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), s
        }
    }

    function jn() {
        return function (t) {
            return j(t, !0)
        }
    }

    function Dn() {
        return function (t, e) {
            if (!E(t) && !w(t))return t;
            if (e = f(e), w(t))return e ? e >= 0 ? t.slice(0, e) : t.slice(e, t.length) : "";
            var n, i, r = [];
            for (e > t.length ? e = t.length : -t.length > e && (e = -t.length), e > 0 ? (n = 0, i = e) : (n = t.length + e, i = t.length); i > n; n++)r.push(t[n]);
            return r
        }
    }

    function qn(t) {
        return function (e, n, i) {
            function r(t, e) {
                return q(e) ? function (e, n) {
                    return t(n, e)
                } : t
            }

            function o(t, e) {
                var n = typeof t, i = typeof e;
                return n == i ? ("string" == n && (t = t.toLowerCase(), e = e.toLowerCase()), t === e ? 0 : e > t ? -1 : 1) : i > n ? -1 : 1
            }

            if (!E(e) || !n)return e;
            n = E(n) ? n : [n], n = k(n, function (e) {
                var n = !1, i = e || m;
                if (w(e) && (("+" == e.charAt(0) || "-" == e.charAt(0)) && (n = "-" == e.charAt(0), e = e.substring(1)), i = t(e), i.constant)) {
                    var a = i();
                    return r(function (t, e) {
                        return o(t[a], e[a])
                    }, n)
                }
                return r(function (t, e) {
                    return o(i(t), i(e))
                }, n)
            });
            for (var a = [], s = 0; e.length > s; s++)a.push(e[s]);
            return a.sort(r(function (t, e) {
                for (var i = 0; n.length > i; i++) {
                    var r = n[i](t, e);
                    if (0 !== r)return r
                }
                return 0
            }, i))
        }
    }

    function Wn(t) {
        return S(t) && (t = {link: t}), t.restrict = t.restrict || "AC", v(t)
    }

    function Hn(t, e, n, i) {
        function r(e, n) {
            n = n ? "-" + z(n, "-") : "", i.removeClass(t, (e ? mr : pr) + n), i.addClass(t, (e ? pr : mr) + n)
        }

        var a = this, s = t.parent().controller("form") || or, l = 0, c = a.$error = {}, u = [];
        a.$name = e.name || e.ngForm, a.$dirty = !1, a.$pristine = !0, a.$valid = !0, a.$invalid = !1, s.$addControl(a), t.addClass(vr), r(!0), a.$addControl = function (t) {
            K(t.$name, "input"), u.push(t), t.$name && (a[t.$name] = t)
        }, a.$removeControl = function (t) {
            t.$name && a[t.$name] === t && delete a[t.$name], o(c, function (e, n) {
                a.$setValidity(n, !0, t)
            }), N(u, t)
        }, a.$setValidity = function (t, e, n) {
            var i = c[t];
            if (e)i && (N(i, n), i.length || (l--, l || (r(e), a.$valid = !0, a.$invalid = !1), c[t] = !1, r(!0, t), s.$setValidity(t, !0, a))); else {
                if (l || r(e), i) {
                    if (-1 != A(i, n))return
                } else c[t] = i = [], l++, r(!1, t), s.$setValidity(t, !1, a);
                i.push(n), a.$valid = !1, a.$invalid = !0
            }
        }, a.$setDirty = function () {
            i.removeClass(t, vr), i.addClass(t, gr), a.$dirty = !0, a.$pristine = !1, s.$setDirty()
        }, a.$setPristine = function () {
            i.removeClass(t, gr), i.addClass(t, vr), a.$dirty = !1, a.$pristine = !0, o(u, function (t) {
                t.$setPristine()
            })
        }
    }

    function Vn(t, e, i, r) {
        return t.$setValidity(e, i), i ? r : n
    }

    function Xn(t, e, n) {
        var i = n.prop("validity");
        $(i) && t.$parsers.push(function (n) {
            return t.$error[e] || !(i.badInput || i.customError || i.typeMismatch) || i.valueMissing ? n : (t.$setValidity(e, !1), void 0)
        })
    }

    function Fn(t, e, n, r, o, a) {
        var s = e.prop("validity");
        if (!o.android) {
            var l = !1;
            e.on("compositionstart", function () {
                l = !0
            }), e.on("compositionend", function () {
                l = !1, c()
            })
        }
        var c = function () {
            if (!l) {
                var i = e.val();
                q(n.ngTrim || "T") && (i = ai(i)), (r.$viewValue !== i || s && "" === i && !s.valueMissing) && (t.$$phase ? r.$setViewValue(i) : t.$apply(function () {
                    r.$setViewValue(i)
                }))
            }
        };
        if (o.hasEvent("input"))e.on("input", c); else {
            var u, h = function () {
                u || (u = a.defer(function () {
                    c(), u = null
                }))
            };
            e.on("keydown", function (t) {
                t = t.keyCode, 91 === t || t > 15 && 19 > t || t >= 37 && 40 >= t || h()
            }), o.hasEvent("paste") && e.on("paste cut", h)
        }
        e.on("change", c), r.$render = function () {
            e.val(r.$isEmpty(r.$viewValue) ? "" : r.$viewValue)
        };
        var d = n.ngPattern;
        if (d && ((o = d.match(/^\/(.*)\/([gim]*)$/)) ? (d = RegExp(o[1], o[2]), o = function (t) {
                return Vn(r, "pattern", r.$isEmpty(t) || d.test(t), t)
            }) : o = function (n) {
                var o = t.$eval(d);
                if (!o || !o.test)throw i("ngPattern")("noregexp", d, o, W(e));
                return Vn(r, "pattern", r.$isEmpty(n) || o.test(n), n)
            }, r.$formatters.push(o), r.$parsers.push(o)), n.ngMinlength) {
            var p = f(n.ngMinlength);
            o = function (t) {
                return Vn(r, "minlength", r.$isEmpty(t) || t.length >= p, t)
            }, r.$parsers.push(o), r.$formatters.push(o)
        }
        if (n.ngMaxlength) {
            var m = f(n.ngMaxlength);
            o = function (t) {
                return Vn(r, "maxlength", r.$isEmpty(t) || m >= t.length, t)
            }, r.$parsers.push(o), r.$formatters.push(o)
        }
    }

    function Bn(t, e) {
        return t = "ngClass" + t, ["$animate", function (n) {
            function i(t, e) {
                var n = [], i = 0;
                t:for (; t.length > i; i++) {
                    for (var r = t[i], o = 0; e.length > o; o++)if (r == e[o])continue t;
                    n.push(r)
                }
                return n
            }

            function r(t) {
                if (!E(t)) {
                    if (w(t))return t.split(" ");
                    if ($(t)) {
                        var e = [];
                        return o(t, function (t, n) {
                            t && e.push(n)
                        }), e
                    }
                }
                return t
            }

            return {
                restrict: "AC", link: function (a, s, l) {
                    function c(t, e) {
                        var n = s.data("$classCounts") || {}, i = [];
                        return o(t, function (t) {
                            (e > 0 || n[t]) && (n[t] = (n[t] || 0) + e, n[t] === +(e > 0) && i.push(t))
                        }), s.data("$classCounts", n), i.join(" ")
                    }

                    function u(t) {
                        if (!0 === e || a.$index % 2 === e) {
                            var o = r(t || []);
                            if (h) {
                                if (!O(t, h)) {
                                    var u = r(h), f = i(o, u), o = i(u, o), o = c(o, -1), f = c(f, 1);
                                    0 === f.length ? n.removeClass(s, o) : 0 === o.length ? n.addClass(s, f) : n.setClass(s, f, o)
                                }
                            } else {
                                var f = c(o, 1);
                                l.$addClass(f)
                            }
                        }
                        h = _(t)
                    }

                    var h;
                    a.$watch(l[t], u, !0), l.$observe("class", function () {
                        u(a.$eval(l[t]))
                    }), "ngClass" !== t && a.$watch("$index", function (n, i) {
                        var o = 1 & n;
                        if (1 & o !== i) {
                            var s = r(a.$eval(l[t]));
                            o === e ? (o = c(s, 1), l.$addClass(o)) : (o = c(s, -1), l.$removeClass(o))
                        }
                    })
                }
            }
        }]
    }

    var Un, Yn, zn, Jn, Gn, Kn = function (t) {
        return w(t) ? t.toLowerCase() : t
    }, Zn = Object.prototype.hasOwnProperty, Qn = function (t) {
        return w(t) ? t.toUpperCase() : t
    }, ti = [].slice, ei = [].push, ni = Object.prototype.toString, ii = i("ng"), ri = t.angular || (t.angular = {}), oi = ["0", "0", "0"];
    Un = f((/msie (\d+)/.exec(Kn(navigator.userAgent)) || [])[1]), isNaN(Un) && (Un = f((/trident\/.*; rv:(\d+)/.exec(Kn(navigator.userAgent)) || [])[1])), p.$inject = [], m.$inject = [];
    var ai = function () {
        return String.prototype.trim ? function (t) {
            return w(t) ? t.trim() : t
        } : function (t) {
            return w(t) ? t.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : t
        }
    }();
    Gn = 9 > Un ? function (t) {
        return t = t.nodeName ? t : t[0], t.scopeName && "HTML" != t.scopeName ? Qn(t.scopeName + ":" + t.nodeName) : t.nodeName
    } : function (t) {
        return t.nodeName ? t.nodeName : t[0].nodeName
    };
    var si = /[A-Z]/g, li = {
        full: "1.2.16",
        major: 1,
        minor: 2,
        dot: 16,
        codeName: "badger-enumeration"
    }, ci = re.cache = {}, ui = re.expando = "ng-" + (new Date).getTime(), hi = 1, fi = t.document.addEventListener ? function (t, e, n) {
        t.addEventListener(e, n, !1)
    } : function (t, e, n) {
        t.attachEvent("on" + e, n)
    }, di = t.document.removeEventListener ? function (t, e, n) {
        t.removeEventListener(e, n, !1)
    } : function (t, e, n) {
        t.detachEvent("on" + e, n)
    };
    re._data = function (t) {
        return this.cache[t[this.expando]] || {}
    };
    var pi = /([\:\-\_]+(.))/g, mi = /^moz([A-Z])/, vi = i("jqLite"), gi = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, bi = /<|&#?\w+;/, $i = /<([\w:]+)/, wi = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, yi = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    yi.optgroup = yi.option, yi.tbody = yi.tfoot = yi.colgroup = yi.caption = yi.thead, yi.th = yi.td;
    var xi = re.prototype = {
        ready: function (n) {
            function i() {
                r || (r = !0, n())
            }

            var r = !1;
            "complete" === e.readyState ? setTimeout(i) : (this.on("DOMContentLoaded", i), re(t).on("load", i))
        }, toString: function () {
            var t = [];
            return o(this, function (e) {
                t.push("" + e)
            }), "[" + t.join(", ") + "]"
        }, eq: function (t) {
            return t >= 0 ? Yn(this[t]) : Yn(this[this.length + t])
        }, length: 0, push: ei, sort: [].sort, splice: [].splice
    }, Ei = {};
    o("multiple selected checked disabled readOnly required open".split(" "), function (t) {
        Ei[Kn(t)] = t
    });
    var Si = {};
    o("input select option textarea button form details".split(" "), function (t) {
        Si[Qn(t)] = !0
    }), o({
        data: ue, inheritedData: ve, scope: function (t) {
            return Yn(t).data("$scope") || ve(t.parentNode || t, ["$isolateScope", "$scope"])
        }, isolateScope: function (t) {
            return Yn(t).data("$isolateScope") || Yn(t).data("$isolateScopeNoTemplate")
        }, controller: me, injector: function (t) {
            return ve(t, "$injector")
        }, removeAttr: function (t, e) {
            t.removeAttribute(e)
        }, hasClass: he, css: function (t, e, i) {
            if (e = ne(e), !b(i)) {
                var r;
                return 8 >= Un && (r = t.currentStyle && t.currentStyle[e], "" === r && (r = "auto")), r = r || t.style[e], 8 >= Un && (r = "" === r ? n : r), r
            }
            t.style[e] = i
        }, attr: function (t, e, i) {
            var r = Kn(e);
            if (Ei[r]) {
                if (!b(i))return t[e] || (t.attributes.getNamedItem(e) || p).specified ? r : n;
                i ? (t[e] = !0, t.setAttribute(e, r)) : (t[e] = !1, t.removeAttribute(r))
            } else if (b(i))t.setAttribute(e, i); else if (t.getAttribute)return t = t.getAttribute(e, 2), null === t ? n : t
        }, prop: function (t, e, n) {
            return b(n) ? (t[e] = n, void 0) : t[e]
        }, text: function () {
            function t(t, n) {
                var i = e[t.nodeType];
                return g(n) ? i ? t[i] : "" : (t[i] = n, void 0)
            }

            var e = [];
            return 9 > Un ? (e[1] = "innerText", e[3] = "nodeValue") : e[1] = e[3] = "textContent", t.$dv = "", t
        }(), val: function (t, e) {
            if (g(e)) {
                if ("SELECT" === Gn(t) && t.multiple) {
                    var n = [];
                    return o(t.options, function (t) {
                        t.selected && n.push(t.value || t.text)
                    }), 0 === n.length ? null : n
                }
                return t.value
            }
            t.value = e
        }, html: function (t, e) {
            if (g(e))return t.innerHTML;
            for (var n = 0, i = t.childNodes; i.length > n; n++)ae(i[n]);
            t.innerHTML = e
        }, empty: ge
    }, function (t, e) {
        re.prototype[e] = function (e, i) {
            var r, o;
            if (t !== ge && (2 == t.length && t !== he && t !== me ? e : i) === n) {
                if ($(e)) {
                    for (r = 0; this.length > r; r++)if (t === ue)t(this[r], e); else for (o in e)t(this[r], o, e[o]);
                    return this
                }
                r = t.$dv, o = r === n ? Math.min(this.length, 1) : this.length;
                for (var a = 0; o > a; a++) {
                    var s = t(this[a], e, i);
                    r = r ? r + s : s
                }
                return r
            }
            for (r = 0; this.length > r; r++)t(this[r], e, i);
            return this
        }
    }), o({
        removeData: le, dealoc: ae, on: function Ci(t, n, i, r) {
            if (b(r))throw vi("onargs");
            var a = ce(t, "events"), s = ce(t, "handle");
            a || ce(t, "events", a = {}), s || ce(t, "handle", s = $e(t, a)), o(n.split(" "), function (n) {
                var r = a[n];
                if (!r) {
                    if ("mouseenter" == n || "mouseleave" == n) {
                        var o = e.body.contains || e.body.compareDocumentPosition ? function (t, e) {
                            var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                            return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                        } : function (t, e) {
                            if (e)for (; e = e.parentNode;)if (e === t)return !0;
                            return !1
                        };
                        a[n] = [], Ci(t, {mouseleave: "mouseout", mouseenter: "mouseover"}[n], function (t) {
                            var e = t.relatedTarget;
                            e && (e === this || o(this, e)) || s(t, n)
                        })
                    } else fi(t, n, s), a[n] = [];
                    r = a[n]
                }
                r.push(i)
            })
        }, off: se, one: function (t, e, n) {
            t = Yn(t), t.on(e, function i() {
                t.off(e, n), t.off(e, i)
            }), t.on(e, n)
        }, replaceWith: function (t, e) {
            var n, i = t.parentNode;
            ae(t), o(new re(e), function (e) {
                n ? i.insertBefore(e, n.nextSibling) : i.replaceChild(e, t), n = e
            })
        }, children: function (t) {
            var e = [];
            return o(t.childNodes, function (t) {
                1 === t.nodeType && e.push(t)
            }), e
        }, contents: function (t) {
            return t.contentDocument || t.childNodes || []
        }, append: function (t, e) {
            o(new re(e), function (e) {
                1 !== t.nodeType && 11 !== t.nodeType || t.appendChild(e)
            })
        }, prepend: function (t, e) {
            if (1 === t.nodeType) {
                var n = t.firstChild;
                o(new re(e), function (e) {
                    t.insertBefore(e, n)
                })
            }
        }, wrap: function (t, e) {
            e = Yn(e)[0];
            var n = t.parentNode;
            n && n.replaceChild(e, t), e.appendChild(t)
        }, remove: function (t) {
            ae(t);
            var e = t.parentNode;
            e && e.removeChild(t)
        }, after: function (t, e) {
            var n = t, i = t.parentNode;
            o(new re(e), function (t) {
                i.insertBefore(t, n.nextSibling), n = t
            })
        }, addClass: de, removeClass: fe, toggleClass: function (t, e, n) {
            e && o(e.split(" "), function (e) {
                var i = n;
                g(i) && (i = !he(t, e)), (i ? de : fe)(t, e)
            })
        }, parent: function (t) {
            return (t = t.parentNode) && 11 !== t.nodeType ? t : null
        }, next: function (t) {
            if (t.nextElementSibling)return t.nextElementSibling;
            for (t = t.nextSibling; null != t && 1 !== t.nodeType;)t = t.nextSibling;
            return t
        }, find: function (t, e) {
            return t.getElementsByTagName ? t.getElementsByTagName(e) : []
        }, clone: oe, triggerHandler: function (t, e, n) {
            e = (ce(t, "events") || {})[e], n = n || [];
            var i = [{preventDefault: p, stopPropagation: p}];
            o(e, function (e) {
                e.apply(t, i.concat(n))
            })
        }
    }, function (t, e) {
        re.prototype[e] = function (e, n, i) {
            for (var r, o = 0; this.length > o; o++)g(r) ? (r = t(this[o], e, n, i), b(r) && (r = Yn(r))) : pe(r, t(this[o], e, n, i));
            return b(r) ? r : this
        }, re.prototype.bind = re.prototype.on, re.prototype.unbind = re.prototype.off
    }), ye.prototype = {
        put: function (t, e) {
            this[we(t)] = e
        }, get: function (t) {
            return this[we(t)]
        }, remove: function (t) {
            var e = this[t = we(t)];
            return delete this[t], e
        }
    };
    var Ti = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, Li = /,/, ki = /^\s*(_?)(\S+?)\1\s*$/, Ai = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Ni = i("$injector"), _i = i("$animate"), Pi = ["$provide", function (t) {
        this.$$selectors = {}, this.register = function (e, n) {
            var i = e + "-animation";
            if (e && "." != e.charAt(0))throw _i("notcsel", e);
            this.$$selectors[e.substr(1)] = i, t.factory(i, n)
        }, this.classNameFilter = function (t) {
            return 1 === arguments.length && (this.$$classNameFilter = t instanceof RegExp ? t : null), this.$$classNameFilter
        }, this.$get = ["$timeout", "$$asyncCallback", function (t, e) {
            return {
                enter: function (t, n, i, r) {
                    i ? i.after(t) : (n && n[0] || (n = i.parent()), n.append(t)), r && e(r)
                }, leave: function (t, n) {
                    t.remove(), n && e(n)
                }, move: function (t, e, n, i) {
                    this.enter(t, e, n, i)
                }, addClass: function (t, n, i) {
                    n = w(n) ? n : E(n) ? n.join(" ") : "", o(t, function (t) {
                        de(t, n)
                    }), i && e(i)
                }, removeClass: function (t, n, i) {
                    n = w(n) ? n : E(n) ? n.join(" ") : "", o(t, function (t) {
                        fe(t, n)
                    }), i && e(i)
                }, setClass: function (t, n, i, r) {
                    o(t, function (t) {
                        de(t, n), fe(t, i)
                    }), r && e(r)
                }, enabled: p
            }
        }]
    }], Oi = i("$compile");
    Ne.$inject = ["$provide", "$$sanitizeUriProvider"];
    var Ii = /^(x[\:\-_]|data[\:\-_])/i, Ri = i("$interpolate"), Mi = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, ji = {
        http: 80,
        https: 443,
        ftp: 21
    }, Di = i("$location");
    tn.prototype = Qe.prototype = Ze.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: en("$$absUrl"),
        url: function (t, e) {
            if (g(t))return this.$$url;
            var n = Mi.exec(t);
            return n[1] && this.path(decodeURIComponent(n[1])), (n[2] || n[1]) && this.search(n[3] || ""), this.hash(n[5] || "", e), this
        },
        protocol: en("$$protocol"),
        host: en("$$host"),
        port: en("$$port"),
        path: nn("$$path", function (t) {
            return "/" == t.charAt(0) ? t : "/" + t
        }),
        search: function (t, e) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (w(t))this.$$search = V(t); else {
                        if (!$(t))throw Di("isrcharg");
                        this.$$search = t
                    }
                    break;
                default:
                    g(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e
            }
            return this.$$compose(), this
        },
        hash: nn("$$hash", m),
        replace: function () {
            return this.$$replace = !0, this
        }
    };
    var qi, Wi = i("$parse"), Hi = {}, Vi = {
        "null": function () {
            return null
        }, "true": function () {
            return !0
        }, "false": function () {
            return !1
        }, undefined: p, "+": function (t, e, i, r) {
            return i = i(t, e), r = r(t, e), b(i) ? b(r) ? i + r : i : b(r) ? r : n
        }, "-": function (t, e, n, i) {
            return n = n(t, e), i = i(t, e), (b(n) ? n : 0) - (b(i) ? i : 0)
        }, "*": function (t, e, n, i) {
            return n(t, e) * i(t, e)
        }, "/": function (t, e, n, i) {
            return n(t, e) / i(t, e)
        }, "%": function (t, e, n, i) {
            return n(t, e) % i(t, e)
        }, "^": function (t, e, n, i) {
            return n(t, e) ^ i(t, e)
        }, "=": p, "===": function (t, e, n, i) {
            return n(t, e) === i(t, e)
        }, "!==": function (t, e, n, i) {
            return n(t, e) !== i(t, e)
        }, "==": function (t, e, n, i) {
            return n(t, e) == i(t, e)
        }, "!=": function (t, e, n, i) {
            return n(t, e) != i(t, e)
        }, "<": function (t, e, n, i) {
            return n(t, e) < i(t, e)
        }, ">": function (t, e, n, i) {
            return n(t, e) > i(t, e)
        }, "<=": function (t, e, n, i) {
            return n(t, e) <= i(t, e)
        }, ">=": function (t, e, n, i) {
            return n(t, e) >= i(t, e)
        }, "&&": function (t, e, n, i) {
            return n(t, e) && i(t, e)
        }, "||": function (t, e, n, i) {
            return n(t, e) || i(t, e)
        }, "&": function (t, e, n, i) {
            return n(t, e) & i(t, e)
        }, "|": function (t, e, n, i) {
            return i(t, e)(t, e, n(t, e))
        }, "!": function (t, e, n) {
            return !n(t, e)
        }
    }, Xi = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, Fi = function (t) {
        this.options = t
    };
    Fi.prototype = {
        constructor: Fi, lex: function (t) {
            this.text = t, this.index = 0, this.ch = n, this.lastCh = ":", this.tokens = [];
            var e;
            for (t = []; this.index < this.text.length;) {
                if (this.ch = this.text.charAt(this.index), this.is("\"'"))this.readString(this.ch); else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))this.readNumber(); else if (this.isIdent(this.ch))this.readIdent(), this.was("{,") && "{" === t[0] && (e = this.tokens[this.tokens.length - 1]) && (e.json = -1 === e.text.indexOf(".")); else if (this.is("(){}[].,;:?"))this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }), this.is("{[") && t.unshift(this.ch), this.is("}]") && t.shift(), this.index++; else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    var i = this.ch + this.peek(), r = i + this.peek(2), o = Vi[this.ch], a = Vi[i], s = Vi[r];
                    s ? (this.tokens.push({
                        index: this.index,
                        text: r,
                        fn: s
                    }), this.index += 3) : a ? (this.tokens.push({
                        index: this.index,
                        text: i,
                        fn: a
                    }), this.index += 2) : o ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: o,
                        json: this.was("[,:") && this.is("+-")
                    }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        }, is: function (t) {
            return -1 !== t.indexOf(this.ch)
        }, was: function (t) {
            return -1 !== t.indexOf(this.lastCh)
        }, peek: function (t) {
            return t = t || 1, this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
        }, isNumber: function (t) {
            return t >= "0" && "9" >= t
        }, isWhitespace: function (t) {
            return " " === t || "\r" === t || "	" === t || "\n" === t || "" === t || " " === t
        }, isIdent: function (t) {
            return t >= "a" && "z" >= t || t >= "A" && "Z" >= t || "_" === t || "$" === t
        }, isExpOperator: function (t) {
            return "-" === t || "+" === t || this.isNumber(t)
        }, throwError: function (t, e, n) {
            throw n = n || this.index, e = b(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" : " " + n, Wi("lexerr", t, e, this.text)
        }, readNumber: function () {
            for (var t = "", e = this.index; this.index < this.text.length;) {
                var n = Kn(this.text.charAt(this.index));
                if ("." == n || this.isNumber(n))t += n; else {
                    var i = this.peek();
                    if ("e" == n && this.isExpOperator(i))t += n; else if (this.isExpOperator(n) && i && this.isNumber(i) && "e" == t.charAt(t.length - 1))t += n; else {
                        if (!this.isExpOperator(n) || i && this.isNumber(i) || "e" != t.charAt(t.length - 1))break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            t *= 1, this.tokens.push({
                index: e, text: t, json: !0, fn: function () {
                    return t
                }
            })
        }, readIdent: function () {
            for (var t, e, n, i, r = this, o = "", a = this.index; this.index < this.text.length && (i = this.text.charAt(this.index), "." === i || this.isIdent(i) || this.isNumber(i));)"." === i && (t = this.index), o += i, this.index++;
            if (t)for (e = this.index; this.text.length > e;) {
                if (i = this.text.charAt(e), "(" === i) {
                    n = o.substr(t - a + 1), o = o.substr(0, t - a), this.index = e;
                    break
                }
                if (!this.isWhitespace(i))break;
                e++
            }
            if (a = {index: a, text: o}, Vi.hasOwnProperty(o))a.fn = Vi[o], a.json = Vi[o]; else {
                var s = fn(o, this.options, this.text);
                a.fn = h(function (t, e) {
                    return s(t, e)
                }, {
                    assign: function (t, e) {
                        return ln(t, o, e, r.text, r.options)
                    }
                })
            }
            this.tokens.push(a), n && (this.tokens.push({
                index: t,
                text: ".",
                json: !1
            }), this.tokens.push({index: t + 1, text: n, json: !1}))
        }, readString: function (t) {
            var e = this.index;
            this.index++;
            for (var n = "", i = t, r = !1; this.index < this.text.length;) {
                var o = this.text.charAt(this.index), i = i + o;
                if (r)"u" === o ? (o = this.text.substring(this.index + 1, this.index + 5), o.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + o + "]"), this.index += 4, n += String.fromCharCode(parseInt(o, 16))) : n = (r = Xi[o]) ? n + r : n + o, r = !1; else if ("\\" === o)r = !0; else {
                    if (o === t)return this.index++, this.tokens.push({
                        index: e,
                        text: i,
                        string: n,
                        json: !0,
                        fn: function () {
                            return n
                        }
                    }), void 0;
                    n += o
                }
                this.index++
            }
            this.throwError("Unterminated quote", e)
        }
    };
    var Bi = function (t, e, n) {
        this.lexer = t, this.$filter = e, this.options = n
    };
    Bi.ZERO = h(function () {
        return 0
    }, {constant: !0}), Bi.prototype = {
        constructor: Bi, parse: function (t, e) {
            this.text = t, this.json = e, this.tokens = this.lexer.lex(t), e && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
                this.throwError("is not valid json", {text: t, index: 0})
            });
            var n = e ? this.primary() : this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), n.literal = !!n.literal, n.constant = !!n.constant, n
        }, primary: function () {
            var t;
            if (this.expect("("))t = this.filterChain(), this.consume(")"); else if (this.expect("["))t = this.arrayDeclaration(); else if (this.expect("{"))t = this.object(); else {
                var e = this.expect();
                (t = e.fn) || this.throwError("not a primary expression", e), e.json && (t.constant = !0, t.literal = !0)
            }
            for (var n; e = this.expect("(", "[", ".");)"(" === e.text ? (t = this.functionCall(t, n), n = null) : "[" === e.text ? (n = t, t = this.objectIndex(t)) : "." === e.text ? (n = t, t = this.fieldAccess(t)) : this.throwError("IMPOSSIBLE");
            return t
        }, throwError: function (t, e) {
            throw Wi("syntax", e.text, t, e.index + 1, this.text, this.text.substring(e.index))
        }, peekToken: function () {
            if (0 === this.tokens.length)throw Wi("ueoe", this.text);
            return this.tokens[0]
        }, peek: function (t, e, n, i) {
            if (this.tokens.length > 0) {
                var r = this.tokens[0], o = r.text;
                if (o === t || o === e || o === n || o === i || !(t || e || n || i))return r
            }
            return !1
        }, expect: function (t, e, n, i) {
            return (t = this.peek(t, e, n, i)) ? (this.json && !t.json && this.throwError("is not valid json", t), this.tokens.shift(), t) : !1
        }, consume: function (t) {
            this.expect(t) || this.throwError("is unexpected, expecting [" + t + "]", this.peek())
        }, unaryFn: function (t, e) {
            return h(function (n, i) {
                return t(n, i, e)
            }, {constant: e.constant})
        }, ternaryFn: function (t, e, n) {
            return h(function (i, r) {
                return t(i, r) ? e(i, r) : n(i, r)
            }, {constant: t.constant && e.constant && n.constant})
        }, binaryFn: function (t, e, n) {
            return h(function (i, r) {
                return e(i, r, t, n)
            }, {constant: t.constant && n.constant})
        }, statements: function () {
            for (var t = []; ;)if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && t.push(this.filterChain()), !this.expect(";"))return 1 === t.length ? t[0] : function (e, n) {
                for (var i, r = 0; t.length > r; r++) {
                    var o = t[r];
                    o && (i = o(e, n))
                }
                return i
            }
        }, filterChain: function () {
            for (var t, e = this.expression(); ;) {
                if (!(t = this.expect("|")))return e;
                e = this.binaryFn(e, t.fn, this.filter())
            }
        }, filter: function () {
            for (var t = this.expect(), e = this.$filter(t.text), n = []; ;) {
                if (!(t = this.expect(":"))) {
                    var i = function (t, i, r) {
                        r = [r];
                        for (var o = 0; n.length > o; o++)r.push(n[o](t, i));
                        return e.apply(t, r)
                    };
                    return function () {
                        return i
                    }
                }
                n.push(this.expression())
            }
        }, expression: function () {
            return this.assignment()
        }, assignment: function () {
            var t, e, n = this.ternary();
            return (e = this.expect("=")) ? (n.assign || this.throwError("implies assignment but [" + this.text.substring(0, e.index) + "] can not be assigned to", e), t = this.ternary(), function (e, i) {
                return n.assign(e, t(e, i), i)
            }) : n
        }, ternary: function () {
            var t, e, n = this.logicalOR();
            return this.expect("?") ? (t = this.ternary(), (e = this.expect(":")) ? this.ternaryFn(n, t, this.ternary()) : (this.throwError("expected :", e), void 0)) : n
        }, logicalOR: function () {
            for (var t, e = this.logicalAND(); ;) {
                if (!(t = this.expect("||")))return e;
                e = this.binaryFn(e, t.fn, this.logicalAND())
            }
        }, logicalAND: function () {
            var t, e = this.equality();
            return (t = this.expect("&&")) && (e = this.binaryFn(e, t.fn, this.logicalAND())), e
        }, equality: function () {
            var t, e = this.relational();
            return (t = this.expect("==", "!=", "===", "!==")) && (e = this.binaryFn(e, t.fn, this.equality())), e
        }, relational: function () {
            var t, e = this.additive();
            return (t = this.expect("<", ">", "<=", ">=")) && (e = this.binaryFn(e, t.fn, this.relational())), e
        }, additive: function () {
            for (var t, e = this.multiplicative(); t = this.expect("+", "-");)e = this.binaryFn(e, t.fn, this.multiplicative());
            return e
        }, multiplicative: function () {
            for (var t, e = this.unary(); t = this.expect("*", "/", "%");)e = this.binaryFn(e, t.fn, this.unary());
            return e
        }, unary: function () {
            var t;
            return this.expect("+") ? this.primary() : (t = this.expect("-")) ? this.binaryFn(Bi.ZERO, t.fn, this.unary()) : (t = this.expect("!")) ? this.unaryFn(t.fn, this.unary()) : this.primary()
        }, fieldAccess: function (t) {
            var e = this, n = this.expect().text, i = fn(n, this.options, this.text);
            return h(function (e, n, r) {
                return i(r || t(e, n))
            }, {
                assign: function (i, r, o) {
                    return ln(t(i, o), n, r, e.text, e.options)
                }
            })
        }, objectIndex: function (t) {
            var e = this, i = this.expression();
            return this.consume("]"), h(function (r, o) {
                var a, s = t(r, o), l = i(r, o);
                return s ? ((s = sn(s[l], e.text)) && s.then && e.options.unwrapPromises && (a = s, "$$v" in s || (a.$$v = n, a.then(function (t) {
                    a.$$v = t
                })), s = s.$$v), s) : n
            }, {
                assign: function (n, r, o) {
                    var a = i(n, o);
                    return sn(t(n, o), e.text)[a] = r
                }
            })
        }, functionCall: function (t, e) {
            var n = [];
            if (")" !== this.peekToken().text)do n.push(this.expression()); while (this.expect(","));
            this.consume(")");
            var i = this;
            return function (r, o) {
                for (var a = [], s = e ? e(r, o) : r, l = 0; n.length > l; l++)a.push(n[l](r, o));
                return l = t(r, o, s) || p, sn(s, i.text), sn(l, i.text), a = l.apply ? l.apply(s, a) : l(a[0], a[1], a[2], a[3], a[4]), sn(a, i.text)
            }
        }, arrayDeclaration: function () {
            var t = [], e = !0;
            if ("]" !== this.peekToken().text)do {
                if (this.peek("]"))break;
                var n = this.expression();
                t.push(n), n.constant || (e = !1)
            } while (this.expect(","));
            return this.consume("]"), h(function (e, n) {
                for (var i = [], r = 0; t.length > r; r++)i.push(t[r](e, n));
                return i
            }, {literal: !0, constant: e})
        }, object: function () {
            var t = [], e = !0;
            if ("}" !== this.peekToken().text)do {
                if (this.peek("}"))break;
                var n = this.expect(), n = n.string || n.text;
                this.consume(":");
                var i = this.expression();
                t.push({key: n, value: i}), i.constant || (e = !1)
            } while (this.expect(","));
            return this.consume("}"), h(function (e, n) {
                for (var i = {}, r = 0; t.length > r; r++) {
                    var o = t[r];
                    i[o.key] = o.value(e, n)
                }
                return i
            }, {literal: !0, constant: e})
        }
    };
    var Ui = {}, Yi = i("$sce"), zi = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }, Ji = e.createElement("a"), Gi = Cn(t.location.href, !0);
    kn.$inject = ["$provide"], Nn.$inject = ["$locale"], _n.$inject = ["$locale"];
    var Ki = ".", Zi = {
        yyyy: In("FullYear", 4),
        yy: In("FullYear", 2, 0, !0),
        y: In("FullYear", 1),
        MMMM: Rn("Month"),
        MMM: Rn("Month", !0),
        MM: In("Month", 2, 1),
        M: In("Month", 1, 1),
        dd: In("Date", 2),
        d: In("Date", 1),
        HH: In("Hours", 2),
        H: In("Hours", 1),
        hh: In("Hours", 2, -12),
        h: In("Hours", 1, -12),
        mm: In("Minutes", 2),
        m: In("Minutes", 1),
        ss: In("Seconds", 2),
        s: In("Seconds", 1),
        sss: In("Milliseconds", 3),
        EEEE: Rn("Day"),
        EEE: Rn("Day", !0),
        a: function (t, e) {
            return 12 > t.getHours() ? e.AMPMS[0] : e.AMPMS[1]
        },
        Z: function (t) {
            return t = -1 * t.getTimezoneOffset(), t = (t >= 0 ? "+" : "") + (On(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + On(Math.abs(t % 60), 2))
        }
    }, Qi = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, tr = /^\-?\d+$/;
    Mn.$inject = ["$locale"];
    var er = v(Kn), nr = v(Qn);
    qn.$inject = ["$parse"];
    var ir = v({
        restrict: "E", compile: function (t, n) {
            return 8 >= Un && (n.href || n.name || n.$set("href", ""), t.append(e.createComment("IE fix"))), n.href || n.xlinkHref || n.name ? void 0 : function (t, e) {
                var n = "[object SVGAnimatedString]" === ni.call(e.prop("href")) ? "xlink:href" : "href";
                e.on("click", function (t) {
                    e.attr(n) || t.preventDefault()
                })
            }
        }
    }), rr = {};
    o(Ei, function (t, e) {
        if ("multiple" != t) {
            var n = _e("ng-" + e);
            rr[n] = function () {
                return {
                    priority: 100, link: function (t, i, r) {
                        t.$watch(r[n], function (t) {
                            r.$set(e, !!t)
                        })
                    }
                }
            }
        }
    }), o(["src", "srcset", "href"], function (t) {
        var e = _e("ng-" + t);
        rr[e] = function () {
            return {
                priority: 99, link: function (n, i, r) {
                    var o = t, a = t;
                    "href" === t && "[object SVGAnimatedString]" === ni.call(i.prop("href")) && (a = "xlinkHref", r.$attr[a] = "xlink:href", o = null), r.$observe(e, function (t) {
                        t && (r.$set(a, t), Un && o && i.prop(o, r[a]))
                    })
                }
            }
        }
    });
    var or = {$addControl: p, $removeControl: p, $setValidity: p, $setDirty: p, $setPristine: p};
    Hn.$inject = ["$element", "$attrs", "$scope", "$animate"];
    var ar = function (t) {
        return ["$timeout", function (e) {
            return {
                name: "form", restrict: t ? "EAC" : "E", controller: Hn, compile: function () {
                    return {
                        pre: function (t, i, r, o) {
                            if (!r.action) {
                                var a = function (t) {
                                    t.preventDefault ? t.preventDefault() : t.returnValue = !1
                                };
                                fi(i[0], "submit", a), i.on("$destroy", function () {
                                    e(function () {
                                        di(i[0], "submit", a)
                                    }, 0, !1)
                                })
                            }
                            var s = i.parent().controller("form"), l = r.name || r.ngForm;
                            l && ln(t, l, o, l), s && i.on("$destroy", function () {
                                s.$removeControl(o), l && ln(t, l, n, l), h(o, or)
                            })
                        }
                    }
                }
            }
        }]
    }, sr = ar(), lr = ar(!0), cr = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, ur = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i, hr = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, fr = {
        text: Fn,
        number: function (t, e, i, r, o, a) {
            Fn(t, e, i, r, o, a), r.$parsers.push(function (t) {
                var e = r.$isEmpty(t);
                return e || hr.test(t) ? (r.$setValidity("number", !0), "" === t ? null : e ? t : parseFloat(t)) : (r.$setValidity("number", !1), n)
            }), Xn(r, "number", e), r.$formatters.push(function (t) {
                return r.$isEmpty(t) ? "" : "" + t
            }), i.min && (t = function (t) {
                var e = parseFloat(i.min);
                return Vn(r, "min", r.$isEmpty(t) || t >= e, t)
            }, r.$parsers.push(t), r.$formatters.push(t)), i.max && (t = function (t) {
                var e = parseFloat(i.max);
                return Vn(r, "max", r.$isEmpty(t) || e >= t, t)
            }, r.$parsers.push(t), r.$formatters.push(t)), r.$formatters.push(function (t) {
                return Vn(r, "number", r.$isEmpty(t) || y(t), t)
            })
        },
        url: function (t, e, n, i, r, o) {
            Fn(t, e, n, i, r, o), t = function (t) {
                return Vn(i, "url", i.$isEmpty(t) || cr.test(t), t)
            }, i.$formatters.push(t), i.$parsers.push(t)
        },
        email: function (t, e, n, i, r, o) {
            Fn(t, e, n, i, r, o), t = function (t) {
                return Vn(i, "email", i.$isEmpty(t) || ur.test(t), t)
            }, i.$formatters.push(t), i.$parsers.push(t)
        },
        radio: function (t, e, n, i) {
            g(n.name) && e.attr("name", c()), e.on("click", function () {
                e[0].checked && t.$apply(function () {
                    i.$setViewValue(n.value)
                })
            }), i.$render = function () {
                e[0].checked = n.value == i.$viewValue
            }, n.$observe("value", i.$render)
        },
        checkbox: function (t, e, n, i) {
            var r = n.ngTrueValue, o = n.ngFalseValue;
            w(r) || (r = !0), w(o) || (o = !1), e.on("click", function () {
                t.$apply(function () {
                    i.$setViewValue(e[0].checked)
                })
            }), i.$render = function () {
                e[0].checked = i.$viewValue
            }, i.$isEmpty = function (t) {
                return t !== r
            }, i.$formatters.push(function (t) {
                return t === r
            }), i.$parsers.push(function (t) {
                return t ? r : o
            })
        },
        hidden: p,
        button: p,
        submit: p,
        reset: p,
        file: p
    }, dr = ["$browser", "$sniffer", function (t, e) {
        return {
            restrict: "E", require: "?ngModel", link: function (n, i, r, o) {
                o && (fr[Kn(r.type)] || fr.text)(n, i, r, o, e, t)
            }
        }
    }], pr = "ng-valid", mr = "ng-invalid", vr = "ng-pristine", gr = "ng-dirty", br = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function (t, e, n, r, a, s) {
        function l(t, e) {
            e = e ? "-" + z(e, "-") : "", s.removeClass(r, (t ? mr : pr) + e), s.addClass(r, (t ? pr : mr) + e)
        }

        this.$modelValue = this.$viewValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = n.name;
        var c = a(n.ngModel), u = c.assign;
        if (!u)throw i("ngModel")("nonassign", n.ngModel, W(r));
        this.$render = p, this.$isEmpty = function (t) {
            return g(t) || "" === t || null === t || t !== t
        };
        var h = r.inheritedData("$formController") || or, f = 0, d = this.$error = {};
        r.addClass(vr), l(!0), this.$setValidity = function (t, e) {
            d[t] !== !e && (e ? (d[t] && f--, f || (l(!0), this.$valid = !0, this.$invalid = !1)) : (l(!1), this.$invalid = !0, this.$valid = !1, f++), d[t] = !e, l(e, t), h.$setValidity(t, e, this))
        }, this.$setPristine = function () {
            this.$dirty = !1, this.$pristine = !0, s.removeClass(r, gr), s.addClass(r, vr)
        }, this.$setViewValue = function (n) {
            this.$viewValue = n, this.$pristine && (this.$dirty = !0, this.$pristine = !1, s.removeClass(r, vr), s.addClass(r, gr), h.$setDirty()), o(this.$parsers, function (t) {
                n = t(n)
            }), this.$modelValue !== n && (this.$modelValue = n, u(t, n), o(this.$viewChangeListeners, function (t) {
                try {
                    t()
                } catch (n) {
                    e(n)
                }
            }))
        };
        var m = this;
        t.$watch(function () {
            var e = c(t);
            if (m.$modelValue !== e) {
                var n = m.$formatters, i = n.length;
                for (m.$modelValue = e; i--;)e = n[i](e);
                m.$viewValue !== e && (m.$viewValue = e, m.$render())
            }
            return e
        })
    }], $r = function () {
        return {
            require: ["ngModel", "^?form"], controller: br, link: function (t, e, n, i) {
                var r = i[0], o = i[1] || or;
                o.$addControl(r), t.$on("$destroy", function () {
                    o.$removeControl(r)
                })
            }
        }
    }, wr = v({
        require: "ngModel", link: function (t, e, n, i) {
            i.$viewChangeListeners.push(function () {
                t.$eval(n.ngChange)
            })
        }
    }), yr = function () {
        return {
            require: "?ngModel", link: function (t, e, n, i) {
                if (i) {
                    n.required = !0;
                    var r = function (t) {
                        return n.required && i.$isEmpty(t) ? (i.$setValidity("required", !1), void 0) : (i.$setValidity("required", !0), t)
                    };
                    i.$formatters.push(r), i.$parsers.unshift(r), n.$observe("required", function () {
                        r(i.$viewValue)
                    })
                }
            }
        }
    }, xr = function () {
        return {
            require: "ngModel", link: function (t, e, i, r) {
                var a = (t = /\/(.*)\//.exec(i.ngList)) && RegExp(t[1]) || i.ngList || ",";
                r.$parsers.push(function (t) {
                    if (!g(t)) {
                        var e = [];
                        return t && o(t.split(a), function (t) {
                            t && e.push(ai(t))
                        }), e
                    }
                }), r.$formatters.push(function (t) {
                    return E(t) ? t.join(", ") : n
                }), r.$isEmpty = function (t) {
                    return !t || !t.length
                }
            }
        }
    }, Er = /^(true|false|\d+)$/, Sr = function () {
        return {
            priority: 100, compile: function (t, e) {
                return Er.test(e.ngValue) ? function (t, e, n) {
                    n.$set("value", t.$eval(n.ngValue))
                } : function (t, e, n) {
                    t.$watch(n.ngValue, function (t) {
                        n.$set("value", t)
                    })
                }
            }
        }
    }, Cr = Wn(function (t, e, i) {
        e.addClass("ng-binding").data("$binding", i.ngBind), t.$watch(i.ngBind, function (t) {
            e.text(t == n ? "" : t)
        })
    }), Tr = ["$interpolate", function (t) {
        return function (e, n, i) {
            e = t(n.attr(i.$attr.ngBindTemplate)), n.addClass("ng-binding").data("$binding", e), i.$observe("ngBindTemplate", function (t) {
                n.text(t)
            })
        }
    }], Lr = ["$sce", "$parse", function (t, e) {
        return function (n, i, r) {
            i.addClass("ng-binding").data("$binding", r.ngBindHtml);
            var o = e(r.ngBindHtml);
            n.$watch(function () {
                return "" + (o(n) || "")
            }, function () {
                i.html(t.getTrustedHtml(o(n)) || "")
            })
        }
    }], kr = Bn("", !0), Ar = Bn("Odd", 0), Nr = Bn("Even", 1), _r = Wn({
        compile: function (t, e) {
            e.$set("ngCloak", n), t.removeClass("ng-cloak")
        }
    }), Pr = [function () {
        return {scope: !0, controller: "@", priority: 500}
    }], Or = {};
    o("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (t) {
        var e = _e("ng-" + t);
        Or[e] = ["$parse", function (n) {
            return {
                compile: function (i, r) {
                    var o = n(r[e]);
                    return function (e, n) {
                        n.on(Kn(t), function (t) {
                            e.$apply(function () {
                                o(e, {$event: t})
                            })
                        })
                    }
                }
            }
        }]
    });
    var Ir = ["$animate", function (t) {
        return {
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function (n, i, r, o, a) {
                var s, l, c;
                n.$watch(r.ngIf, function (o) {
                    q(o) ? l || (l = n.$new(), a(l, function (n) {
                        n[n.length++] = e.createComment(" end ngIf: " + r.ngIf + " "), s = {clone: n}, t.enter(n, i.parent(), i)
                    })) : (c && (c.remove(), c = null), l && (l.$destroy(), l = null), s && (c = Q(s.clone), t.leave(c, function () {
                        c = null
                    }), s = null))
                })
            }
        }
    }], Rr = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function (t, e, n, i, r) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: ri.noop,
            compile: function (o, a) {
                var s = a.ngInclude || a.src, l = a.onload || "", c = a.autoscroll;
                return function (o, a, u, h, f) {
                    var d, p, m, v = 0, g = function () {
                        p && (p.remove(), p = null), d && (d.$destroy(), d = null), m && (i.leave(m, function () {
                            p = null
                        }), p = m, m = null)
                    };
                    o.$watch(r.parseAsResourceUrl(s), function (r) {
                        var s = function () {
                            !b(c) || c && !o.$eval(c) || n()
                        }, u = ++v;
                        r ? (t.get(r, {cache: e}).success(function (t) {
                            if (u === v) {
                                var e = o.$new();
                                h.template = t, t = f(e, function (t) {
                                    g(), i.enter(t, null, a, s)
                                }), d = e, m = t, d.$emit("$includeContentLoaded"), o.$eval(l)
                            }
                        }).error(function () {
                            u === v && g()
                        }), o.$emit("$includeContentRequested")) : (g(), h.template = null)
                    })
                }
            }
        }
    }], Mr = ["$compile", function (t) {
        return {
            restrict: "ECA", priority: -400, require: "ngInclude", link: function (e, n, i, r) {
                n.html(r.template), t(n.contents())(e)
            }
        }
    }], jr = Wn({
        priority: 450, compile: function () {
            return {
                pre: function (t, e, n) {
                    t.$eval(n.ngInit)
                }
            }
        }
    }), Dr = Wn({terminal: !0, priority: 1e3}), qr = ["$locale", "$interpolate", function (t, e) {
        var n = /{}/g;
        return {
            restrict: "EA", link: function (i, r, a) {
                var s = a.count, l = a.$attr.when && r.attr(a.$attr.when), c = a.offset || 0, u = i.$eval(l) || {}, h = {}, f = e.startSymbol(), d = e.endSymbol(), p = /^when(Minus)?(.+)$/;
                o(a, function (t, e) {
                    p.test(e) && (u[Kn(e.replace("when", "").replace("Minus", "-"))] = r.attr(a.$attr[e]))
                }), o(u, function (t, i) {
                    h[i] = e(t.replace(n, f + s + "-" + c + d))
                }), i.$watch(function () {
                    var e = parseFloat(i.$eval(s));
                    return isNaN(e) ? "" : (e in u || (e = t.pluralCat(e - c)), h[e](i, r, !0))
                }, function (t) {
                    r.text(t)
                })
            }
        }
    }], Wr = ["$parse", "$animate", function (t, n) {
        var a = i("ngRepeat");
        return {
            transclude: "element", priority: 1e3, terminal: !0, $$tlb: !0, link: function (i, s, l, c, u) {
                var h, f, d, p, m, v, g = l.ngRepeat, b = g.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), $ = {$id: we};
                if (!b)throw a("iexp", g);
                if (l = b[1], c = b[2], (b = b[3]) ? (h = t(b), f = function (t, e, n) {
                        return v && ($[v] = t), $[m] = e, $.$index = n, h(i, $)
                    }) : (d = function (t, e) {
                        return we(e)
                    }, p = function (t) {
                        return t
                    }), b = l.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !b)throw a("iidexp", l);
                m = b[3] || b[1], v = b[2];
                var w = {};
                i.$watchCollection(c, function (t) {
                    var l, c, h, b, $, y, x, E, S, C = s[0], T = {}, L = [];
                    if (r(t))E = t, h = f || d; else {
                        h = f || p, E = [];
                        for (y in t)t.hasOwnProperty(y) && "$" != y.charAt(0) && E.push(y);
                        E.sort()
                    }
                    for (b = E.length, c = L.length = E.length, l = 0; c > l; l++)if (y = t === E ? l : E[l], x = t[y], x = h(y, x, l), K(x, "`track by` id"), w.hasOwnProperty(x))S = w[x], delete w[x], T[x] = S, L[l] = S; else {
                        if (T.hasOwnProperty(x))throw o(L, function (t) {
                            t && t.scope && (w[t.id] = t)
                        }), a("dupes", g, x);
                        L[l] = {id: x}, T[x] = !1
                    }
                    for (y in w)w.hasOwnProperty(y) && (S = w[y], l = Q(S.clone), n.leave(l), o(l, function (t) {
                        t.$$NG_REMOVED = !0
                    }), S.scope.$destroy());
                    for (l = 0, c = E.length; c > l; l++) {
                        if (y = t === E ? l : E[l], x = t[y], S = L[l], L[l - 1] && (C = L[l - 1].clone[L[l - 1].clone.length - 1]), S.scope) {
                            $ = S.scope, h = C;
                            do h = h.nextSibling; while (h && h.$$NG_REMOVED);
                            S.clone[0] != h && n.move(Q(S.clone), null, Yn(C)), C = S.clone[S.clone.length - 1]
                        } else $ = i.$new();
                        $[m] = x, v && ($[v] = y), $.$index = l, $.$first = 0 === l, $.$last = l === b - 1, $.$middle = !($.$first || $.$last), $.$odd = !($.$even = 0 === (1 & l)), S.scope || u($, function (t) {
                            t[t.length++] = e.createComment(" end ngRepeat: " + g + " "), n.enter(t, null, Yn(C)), C = t, S.scope = $, S.clone = t, T[S.id] = S
                        })
                    }
                    w = T
                })
            }
        }
    }], Hr = ["$animate", function (t) {
        return function (e, n, i) {
            e.$watch(i.ngShow, function (e) {
                t[q(e) ? "removeClass" : "addClass"](n, "ng-hide")
            })
        }
    }], Vr = ["$animate", function (t) {
        return function (e, n, i) {
            e.$watch(i.ngHide, function (e) {
                t[q(e) ? "addClass" : "removeClass"](n, "ng-hide")
            })
        }
    }], Xr = Wn(function (t, e, n) {
        t.$watch(n.ngStyle, function (t, n) {
            n && t !== n && o(n, function (t, n) {
                e.css(n, "")
            }), t && e.css(t)
        }, !0)
    }), Fr = ["$animate", function (t) {
        return {
            restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
                this.cases = {}
            }], link: function (e, n, i, r) {
                var a, s, l, c = [];
                e.$watch(i.ngSwitch || i.on, function (n) {
                    var u, h = c.length;
                    if (h > 0) {
                        if (l) {
                            for (u = 0; h > u; u++)l[u].remove();
                            l = null
                        }
                        for (l = [], u = 0; h > u; u++) {
                            var f = s[u];
                            c[u].$destroy(), l[u] = f, t.leave(f, function () {
                                l.splice(u, 1), 0 === l.length && (l = null)
                            })
                        }
                    }
                    s = [], c = [], (a = r.cases["!" + n] || r.cases["?"]) && (e.$eval(i.change), o(a, function (n) {
                        var i = e.$new();
                        c.push(i), n.transclude(i, function (e) {
                            var i = n.element;
                            s.push(e), t.enter(e, i.parent(), i)
                        })
                    }))
                })
            }
        }
    }], Br = Wn({
        transclude: "element", priority: 800, require: "^ngSwitch", link: function (t, e, n, i, r) {
            i.cases["!" + n.ngSwitchWhen] = i.cases["!" + n.ngSwitchWhen] || [], i.cases["!" + n.ngSwitchWhen].push({
                transclude: r,
                element: e
            })
        }
    }), Ur = Wn({
        transclude: "element", priority: 800, require: "^ngSwitch", link: function (t, e, n, i, r) {
            i.cases["?"] = i.cases["?"] || [], i.cases["?"].push({transclude: r, element: e})
        }
    }), Yr = Wn({
        link: function (t, e, n, r, o) {
            if (!o)throw i("ngTransclude")("orphan", W(e));
            o(function (t) {
                e.empty(), e.append(t)
            })
        }
    }), zr = ["$templateCache", function (t) {
        return {
            restrict: "E", terminal: !0, compile: function (e, n) {
                "text/ng-template" == n.type && t.put(n.id, e[0].text)
            }
        }
    }], Jr = i("ngOptions"), Gr = v({terminal: !0}), Kr = ["$compile", "$parse", function (t, i) {
        var r = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/, s = {$setViewValue: p};
        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: ["$element", "$scope", "$attrs", function (t, e, n) {
                var i, r = this, o = {}, a = s;
                r.databound = n.ngModel, r.init = function (t, e, n) {
                    a = t, i = n
                }, r.addOption = function (e) {
                    K(e, '"option value"'), o[e] = !0, a.$viewValue == e && (t.val(e), i.parent() && i.remove())
                }, r.removeOption = function (t) {
                    this.hasOption(t) && (delete o[t], a.$viewValue == t && this.renderUnknownOption(t))
                }, r.renderUnknownOption = function (e) {
                    e = "? " + we(e) + " ?", i.val(e), t.prepend(i), t.val(e), i.prop("selected", !0)
                }, r.hasOption = function (t) {
                    return o.hasOwnProperty(t)
                }, e.$on("$destroy", function () {
                    r.renderUnknownOption = p
                })
            }],
            link: function (s, l, c, u) {
                function h(t, e, n, i) {
                    n.$render = function () {
                        var t = n.$viewValue;
                        i.hasOption(t) ? (S.parent() && S.remove(), e.val(t), "" === t && m.prop("selected", !0)) : g(t) && m ? e.val("") : i.renderUnknownOption(t)
                    }, e.on("change", function () {
                        t.$apply(function () {
                            S.parent() && S.remove(), n.$setViewValue(e.val())
                        })
                    })
                }

                function f(t, e, n) {
                    var i;
                    n.$render = function () {
                        var t = new ye(n.$viewValue);
                        o(e.find("option"), function (e) {
                            e.selected = b(t.get(e.value))
                        })
                    }, t.$watch(function () {
                        O(i, n.$viewValue) || (i = _(n.$viewValue), n.$render())
                    }), e.on("change", function () {
                        t.$apply(function () {
                            var t = [];
                            o(e.find("option"), function (e) {
                                e.selected && t.push(e.value)
                            }), n.$setViewValue(t)
                        })
                    })
                }

                function d(e, o, s) {
                    function l() {
                        var t, n, i, r, l, c = {"": []}, $ = [""];
                        r = s.$modelValue, l = m(e) || [];
                        var C, T, L, k = f ? a(l) : l;
                        T = {}, i = !1;
                        var A, N;
                        if (v)if (g && E(r))for (i = new ye([]), L = 0; r.length > L; L++)T[h] = r[L], i.put(g(e, T), r[L]); else i = new ye(r);
                        for (L = 0; C = k.length, C > L; L++) {
                            if (n = L, f) {
                                if (n = k[L], "$" === n.charAt(0))continue;
                                T[f] = n
                            }
                            T[h] = l[n], t = d(e, T) || "", (n = c[t]) || (n = c[t] = [], $.push(t)), v ? t = b(i.remove(g ? g(e, T) : p(e, T))) : (g ? (t = {}, t[h] = r, t = g(e, t) === g(e, T)) : t = r === p(e, T), i = i || t), A = u(e, T), A = b(A) ? A : "", n.push({
                                id: g ? g(e, T) : f ? k[L] : L,
                                label: A,
                                selected: t
                            })
                        }
                        for (v || (w || null === r ? c[""].unshift({
                            id: "",
                            label: "",
                            selected: !i
                        }) : i || c[""].unshift({id: "?", label: "", selected: !0})), T = 0, k = $.length; k > T; T++) {
                            for (t = $[T], n = c[t], T >= S.length ? (r = {
                                element: x.clone().attr("label", t),
                                label: n.label
                            }, l = [r], S.push(l), o.append(r.element)) : (l = S[T], r = l[0], r.label != t && r.element.attr("label", r.label = t)), A = null, L = 0, C = n.length; C > L; L++)i = n[L], (t = l[L + 1]) ? (A = t.element, t.label !== i.label && A.text(t.label = i.label), t.id !== i.id && A.val(t.id = i.id), t.selected !== i.selected && A.prop("selected", t.selected = i.selected)) : ("" === i.id && w ? N = w : (N = y.clone()).val(i.id).attr("selected", i.selected).text(i.label), l.push({
                                element: N,
                                label: i.label,
                                id: i.id,
                                selected: i.selected
                            }), A ? A.after(N) : r.element.append(N), A = N);
                            for (L++; l.length > L;)l.pop().element.remove()
                        }
                        for (; S.length > T;)S.pop()[0].element.remove()
                    }

                    var c;
                    if (!(c = $.match(r)))throw Jr("iexp", $, W(o));
                    var u = i(c[2] || c[1]), h = c[4] || c[6], f = c[5], d = i(c[3] || ""), p = i(c[2] ? c[1] : h), m = i(c[7]), g = c[8] ? i(c[8]) : null, S = [[{
                        element: o,
                        label: ""
                    }]];
                    w && (t(w)(e), w.removeClass("ng-scope"), w.remove()), o.empty(), o.on("change", function () {
                        e.$apply(function () {
                            var t, i, r, a, l, c, u, d, b = m(e) || [], $ = {};
                            if (v) {
                                for (r = [], l = 0, u = S.length; u > l; l++)for (t = S[l], a = 1, c = t.length; c > a; a++)if ((i = t[a].element)[0].selected) {
                                    if (i = i.val(), f && ($[f] = i), g)for (d = 0; b.length > d && ($[h] = b[d], g(e, $) != i); d++); else $[h] = b[i];
                                    r.push(p(e, $))
                                }
                            } else {
                                if (i = o.val(), "?" == i)r = n; else if ("" === i)r = null; else if (g) {
                                    for (d = 0; b.length > d; d++)if ($[h] = b[d], g(e, $) == i) {
                                        r = p(e, $);
                                        break
                                    }
                                } else $[h] = b[i], f && ($[f] = i), r = p(e, $);
                                S[0].length > 1 && S[0][1].id !== i && (S[0][1].selected = !1)
                            }
                            s.$setViewValue(r)
                        })
                    }), s.$render = l, e.$watch(l)
                }

                if (u[1]) {
                    var p = u[0];
                    u = u[1];
                    var m, v = c.multiple, $ = c.ngOptions, w = !1, y = Yn(e.createElement("option")), x = Yn(e.createElement("optgroup")), S = y.clone();
                    c = 0;
                    for (var C = l.children(), T = C.length; T > c; c++)if ("" === C[c].value) {
                        m = w = C.eq(c);
                        break
                    }
                    p.init(u, w, S), v && (u.$isEmpty = function (t) {
                        return !t || 0 === t.length
                    }), $ ? d(s, l, u) : v ? f(s, l, u) : h(s, l, u, p)
                }
            }
        }
    }], Zr = ["$interpolate", function (t) {
        var e = {addOption: p, removeOption: p};
        return {
            restrict: "E", priority: 100, compile: function (n, i) {
                if (g(i.value)) {
                    var r = t(n.text(), !0);
                    r || i.$set("value", n.text())
                }
                return function (t, n, i) {
                    var o = n.parent(), a = o.data("$selectController") || o.parent().data("$selectController");
                    a && a.databound ? n.prop("selected", !1) : a = e, r ? t.$watch(r, function (t, e) {
                        i.$set("value", t), t !== e && a.removeOption(e), a.addOption(t)
                    }) : a.addOption(i.value), n.on("$destroy", function () {
                        a.removeOption(i.value)
                    })
                }
            }
        }
    }], Qr = v({restrict: "E", terminal: !0});
    t.angular.bootstrap ? console.log("WARNING: Tried to load angular more than once.") : ((zn = t.jQuery) ? (Yn = zn, h(zn.fn, {
        scope: xi.scope,
        isolateScope: xi.isolateScope,
        controller: xi.controller,
        injector: xi.injector,
        inheritedData: xi.inheritedData
    }), ie("remove", !0, !0, !1), ie("empty", !1, !1, !1), ie("html", !1, !1, !0)) : Yn = re, ri.element = Yn, ee(ri), Yn(e).ready(function () {
        U(e, Y)
    }))
}(window, document), !angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>'), "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"), function (t, e, n) {
    "use strict";
    function i(t, e) {
        return I(new (I(function () {
        }, {prototype: t})), e)
    }

    function r(t) {
        return O(arguments, function (e) {
            e !== t && O(e, function (e, n) {
                t.hasOwnProperty(n) || (t[n] = e)
            })
        }), t
    }

    function o(t, e) {
        var n = [];
        for (var i in t.path) {
            if (t.path[i] !== e.path[i])break;
            n.push(t.path[i])
        }
        return n
    }

    function a(t, e) {
        if (Array.prototype.indexOf)return t.indexOf(e, Number(arguments[2]) || 0);
        var n = t.length >>> 0, i = Number(arguments[2]) || 0;
        for (i = 0 > i ? Math.ceil(i) : Math.floor(i), 0 > i && (i += n); n > i; i++)if (i in t && t[i] === e)return i;
        return -1
    }

    function s(t, e, n, i) {
        var r, s = o(n, i), l = {}, c = [];
        for (var u in s)if (s[u].params && s[u].params.length) {
            r = s[u].params;
            for (var h in r)a(c, r[h]) >= 0 || (c.push(r[h]), l[r[h]] = t[r[h]])
        }
        return I({}, l, e)
    }

    function l(t, e) {
        var n = {};
        return O(t, function (t) {
            var i = e[t];
            n[t] = null != i ? i + "" : null
        }), n
    }

    function c(t, e, n) {
        if (!n) {
            n = [];
            for (var i in t)n.push(i)
        }
        for (var r = 0; n.length > r; r++) {
            var o = n[r];
            if (t[o] != e[o])return !1
        }
        return !0
    }

    function u(t, e) {
        var n = {};
        return O(t, function (t) {
            n[t] = e[t]
        }), n
    }

    function h(t, e) {
        var i = 1, o = 2, a = {}, s = [], l = a, c = I(t.when(a), {$$promises: a, $$values: a});
        this.study = function (a) {
            function u(t, n) {
                if (p[n] !== o) {
                    if (d.push(n), p[n] === i)throw d.splice(0, d.indexOf(n)), Error("Cyclic dependency: " + d.join(" -> "));
                    if (p[n] = i, N(t))f.push(n, [function () {
                        return e.get(t)
                    }], s); else {
                        var r = e.annotate(t);
                        O(r, function (t) {
                            t !== n && a.hasOwnProperty(t) && u(a[t], t)
                        }), f.push(n, t, r)
                    }
                    d.pop(), p[n] = o
                }
            }

            function h(t) {
                return _(t) && t.then && t.$$promises
            }

            if (!_(a))throw Error("'invocables' must be an object");
            var f = [], d = [], p = {};
            return O(a, u), a = d = p = null, function (i, o, a) {
                function s() {
                    --b || ($ || r(g, o.$$values), m.$$values = g, m.$$promises = !0, p.resolve(g))
                }

                function u(t) {
                    m.$$failure = t, p.reject(t)
                }

                function d(n, r, o) {
                    function l(t) {
                        h.reject(t), u(t)
                    }

                    function c() {
                        if (!k(m.$$failure))try {
                            h.resolve(e.invoke(r, a, g)), h.promise.then(function (t) {
                                g[n] = t, s()
                            }, l)
                        } catch (t) {
                            l(t)
                        }
                    }

                    var h = t.defer(), f = 0;
                    O(o, function (t) {
                        v.hasOwnProperty(t) && !i.hasOwnProperty(t) && (f++, v[t].then(function (e) {
                            g[t] = e, --f || c()
                        }, l))
                    }), f || c(), v[n] = h.promise
                }

                if (h(i) && a === n && (a = o, o = i, i = null), i) {
                    if (!_(i))throw Error("'locals' must be an object")
                } else i = l;
                if (o) {
                    if (!h(o))throw Error("'parent' must be a promise returned by $resolve.resolve()")
                } else o = c;
                var p = t.defer(), m = p.promise, v = m.$$promises = {}, g = I({}, i), b = 1 + f.length / 3, $ = !1;
                if (k(o.$$failure))return u(o.$$failure), m;
                o.$$values ? ($ = r(g, o.$$values), s()) : (I(v, o.$$promises), o.then(s, u));
                for (var w = 0, y = f.length; y > w; w += 3)i.hasOwnProperty(f[w]) ? s() : d(f[w], f[w + 1], f[w + 2]);
                return m
            }
        }, this.resolve = function (t, e, n, i) {
            return this.study(t)(e, n, i)
        }
    }

    function f(t, e, n) {
        this.fromConfig = function (t, e, n) {
            return k(t.template) ? this.fromString(t.template, e) : k(t.templateUrl) ? this.fromUrl(t.templateUrl, e) : k(t.templateProvider) ? this.fromProvider(t.templateProvider, e, n) : null
        }, this.fromString = function (t, e) {
            return A(t) ? t(e) : t
        }, this.fromUrl = function (n, i) {
            return A(n) && (n = n(i)), null == n ? null : t.get(n, {cache: e}).then(function (t) {
                return t.data
            })
        }, this.fromProvider = function (t, e, i) {
            return n.invoke(t, null, i || {params: e})
        }
    }

    function d(t) {
        function e(e) {
            if (!/^\w+(-+\w+)*$/.test(e))throw Error("Invalid parameter name '" + e + "' in pattern '" + t + "'");
            if (o[e])throw Error("Duplicate parameter name '" + e + "' in pattern '" + t + "'");
            o[e] = !0, c.push(e)
        }

        function n(t) {
            return t.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&")
        }

        var i, r = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g, o = {}, a = "^", s = 0, l = this.segments = [], c = this.params = [];
        this.source = t;
        for (var u, h, f; (i = r.exec(t)) && (u = i[2] || i[3], h = i[4] || ("*" == i[1] ? ".*" : "[^/]*"), f = t.substring(s, i.index), !(f.indexOf("?") >= 0));)a += n(f) + "(" + h + ")", e(u), l.push(f), s = r.lastIndex;
        f = t.substring(s);
        var d = f.indexOf("?");
        if (d >= 0) {
            var p = this.sourceSearch = f.substring(d);
            f = f.substring(0, d), this.sourcePath = t.substring(0, s + d), O(p.substring(1).split(/[&?]/), e)
        } else this.sourcePath = t, this.sourceSearch = "";
        a += n(f) + "$", l.push(f), this.regexp = RegExp(a), this.prefix = l[0]
    }

    function p() {
        this.compile = function (t) {
            return new d(t)
        }, this.isMatcher = function (t) {
            return _(t) && A(t.exec) && A(t.format) && A(t.concat)
        }, this.$get = function () {
            return this
        }
    }

    function m(t) {
        function e(t) {
            var e = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(t.source);
            return null != e ? e[1].replace(/\\(.)/g, "$1") : ""
        }

        function n(t, e) {
            return t.replace(/\$(\$|\d{1,2})/, function (t, n) {
                return e["$" === n ? 0 : Number(n)]
            })
        }

        function i(t, e, n) {
            if (!n)return !1;
            var i = t.invoke(e, e, {$match: n});
            return k(i) ? i : !0
        }

        var r = [], o = null;
        this.rule = function (t) {
            if (!A(t))throw Error("'rule' must be a function");
            return r.push(t), this
        }, this.otherwise = function (t) {
            if (N(t)) {
                var e = t;
                t = function () {
                    return e
                }
            } else if (!A(t))throw Error("'rule' must be a function");
            return o = t, this
        }, this.when = function (r, o) {
            var a, s = N(o);
            if (N(r) && (r = t.compile(r)), !s && !A(o) && !P(o))throw Error("invalid 'handler' in when()");
            var l = {
                matcher: function (e, n) {
                    return s && (a = t.compile(n), n = ["$match", function (t) {
                        return a.format(t)
                    }]), I(function (t, r) {
                        return i(t, n, e.exec(r.path(), r.search()))
                    }, {prefix: N(e.prefix) ? e.prefix : ""})
                }, regex: function (t, r) {
                    if (t.global || t.sticky)throw Error("when() RegExp must not be global or sticky");
                    return s && (a = r, r = ["$match", function (t) {
                        return n(a, t)
                    }]), I(function (e, n) {
                        return i(e, r, t.exec(n.path()))
                    }, {prefix: e(t)})
                }
            }, c = {matcher: t.isMatcher(r), regex: r instanceof RegExp};
            for (var u in c)if (c[u])return this.rule(l[u](r, o));
            throw Error("invalid 'what' in when()")
        }, this.$get = ["$location", "$rootScope", "$injector", function (t, e, n) {
            function i(e) {
                function i(e) {
                    var i = e(n, t);
                    return i ? (N(i) && t.replace().url(i), !0) : !1
                }

                if (!e || !e.defaultPrevented) {
                    var a, s = r.length;
                    for (a = 0; s > a; a++)if (i(r[a]))return;
                    o && i(o)
                }
            }

            return e.$on("$locationChangeSuccess", i), {
                sync: function () {
                    i()
                }
            }
        }]
    }

    function v(t, r, o) {
        function a(t) {
            return 0 === t.indexOf(".") || 0 === t.indexOf("^")
        }

        function h(t, e) {
            var i = N(t), r = i ? t : t.name, o = a(r);
            if (o) {
                if (!e)throw Error("No reference point given for path '" + r + "'");
                for (var s = r.split("."), l = 0, c = s.length, u = e; c > l; l++)if ("" !== s[l] || 0 !== l) {
                    if ("^" !== s[l])break;
                    if (!u.parent)throw Error("Path '" + r + "' not valid for state '" + e.name + "'");
                    u = u.parent
                } else u = e;
                s = s.slice(l).join("."), r = u.name + (u.name && s ? "." : "") + s
            }
            var h = x[r];
            return !h || !i && (i || h !== t && h.self !== t) ? n : h
        }

        function f(t, e) {
            E[t] || (E[t] = []), E[t].push(e)
        }

        function d(e) {
            e = i(e, {
                self: e, resolve: e.resolve || {}, toString: function () {
                    return this.name
                }
            });
            var n = e.name;
            if (!N(n) || n.indexOf("@") >= 0)throw Error("State must have a valid name");
            if (x.hasOwnProperty(n))throw Error("State '" + n + "'' is already defined");
            var r = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : N(e.parent) ? e.parent : "";
            if (r && !x[r])return f(r, e.self);
            for (var o in C)A(C[o]) && (e[o] = C[o](e, C.$delegates[o]));
            if (x[n] = e, !e[S] && e.url && t.when(e.url, ["$match", "$stateParams", function (t, n) {
                    y.$current.navigable == e && c(t, n) || y.transitionTo(e, t, {location: !1})
                }]), E[n])for (var a = 0; E[n].length > a; a++)d(E[n][a]);
            return e
        }

        function p(t) {
            return t.indexOf("*") > -1
        }

        function m(t) {
            var e = t.split("."), n = y.$current.name.split(".");
            if ("**" === e[0] && (n = n.slice(n.indexOf(e[1])), n.unshift("**")), "**" === e[e.length - 1] && (n.splice(n.indexOf(e[e.length - 2]) + 1, Number.MAX_VALUE), n.push("**")), e.length != n.length)return !1;
            for (var i = 0, r = e.length; r > i; i++)"*" === e[i] && (n[i] = "*");
            return n.join("") === e.join("")
        }

        function v(t, e) {
            return N(t) && !k(e) ? C[t] : A(e) && N(t) ? (C[t] && !C.$delegates[t] && (C.$delegates[t] = C[t]), C[t] = e, this) : this
        }

        function g(t, e) {
            return _(t) ? e = t : e.name = t, d(e), this
        }

        function b(t, r, a, f, d, v, g, b, E) {
            function C() {
                g.url() !== D && (g.url(D), g.replace())
            }

            function T(t, n, i, o, s) {
                var l = i ? n : u(t.params, n), c = {$stateParams: l};
                s.resolve = d.resolve(t.resolve, c, s.resolve, t);
                var h = [s.resolve.then(function (t) {
                    s.globals = t
                })];
                return o && h.push(o), O(t.views, function (n, i) {
                    var r = n.resolve && n.resolve !== t.resolve ? n.resolve : {};
                    r.$template = [function () {
                        return a.load(i, {view: n, locals: c, params: l, notify: !1}) || ""
                    }], h.push(d.resolve(r, c, s.resolve, t).then(function (o) {
                        if (A(n.controllerProvider) || P(n.controllerProvider)) {
                            var a = e.extend({}, r, c);
                            o.$$controller = f.invoke(n.controllerProvider, null, a)
                        } else o.$$controller = n.controller;
                        o.$$state = t, o.$$controllerAs = n.controllerAs, s[i] = o
                    }))
                }), r.all(h).then(function () {
                    return s
                })
            }

            var L = r.reject(Error("transition superseded")), _ = r.reject(Error("transition prevented")), M = r.reject(Error("transition aborted")), j = r.reject(Error("transition failed")), D = g.url(), q = E.baseHref();
            return w.locals = {resolve: null, globals: {$stateParams: {}}}, y = {
                params: {},
                current: w.self,
                $current: w,
                transition: null
            }, y.reload = function () {
                y.transitionTo(y.current, v, {reload: !0, inherit: !1, notify: !1})
            }, y.go = function (t, e, n) {
                return this.transitionTo(t, e, I({inherit: !0, relative: y.$current}, n))
            }, y.transitionTo = function (e, n, o) {
                n = n || {}, o = I({
                    location: !0,
                    inherit: !1,
                    relative: null,
                    notify: !0,
                    reload: !1,
                    $retry: !1
                }, o || {});
                var a, u = y.$current, d = y.params, p = u.path, m = h(e, o.relative);
                if (!k(m)) {
                    var b = {to: e, toParams: n, options: o};
                    if (a = t.$broadcast("$stateNotFound", b, u.self, d), a.defaultPrevented)return C(), M;
                    if (a.retry) {
                        if (o.$retry)return C(), j;
                        var x = y.transition = r.when(a.retry);
                        return x.then(function () {
                            return x !== y.transition ? L : (b.options.$retry = !0, y.transitionTo(b.to, b.toParams, b.options))
                        }, function () {
                            return M
                        }), C(), x
                    }
                    if (e = b.to, n = b.toParams, o = b.options, m = h(e, o.relative), !k(m)) {
                        if (o.relative)throw Error("Could not resolve '" + e + "' from state '" + o.relative + "'");
                        throw Error("No such state '" + e + "'")
                    }
                }
                if (m[S])throw Error("Cannot transition to abstract state '" + e + "'");
                o.inherit && (n = s(v, n || {}, y.$current, m)), e = m;
                var E, A, N = e.path, P = w.locals, O = [];
                for (E = 0, A = N[E]; A && A === p[E] && c(n, d, A.ownParams) && !o.reload; E++, A = N[E])P = O[E] = A.locals;
                if ($(e, u, P, o))return e.self.reloadOnSearch !== !1 && C(), y.transition = null, r.when(y.current);
                if (n = l(e.params, n || {}), o.notify && (a = t.$broadcast("$stateChangeStart", e.self, n, u.self, d), a.defaultPrevented))return C(), _;
                for (var q = r.when(P), W = E; N.length > W; W++, A = N[W])P = O[W] = i(P), q = T(A, n, A === e, q, P);
                var H = y.transition = q.then(function () {
                    var i, r, a;
                    if (y.transition !== H)return L;
                    for (i = p.length - 1; i >= E; i--)a = p[i], a.self.onExit && f.invoke(a.self.onExit, a.self, a.locals.globals), a.locals = null;
                    for (i = E; N.length > i; i++)r = N[i], r.locals = O[i], r.self.onEnter && f.invoke(r.self.onEnter, r.self, r.locals.globals);
                    if (y.transition !== H)return L;
                    y.$current = e, y.current = e.self, y.params = n, R(y.params, v), y.transition = null;
                    var s = e.navigable;
                    return o.location && s && (g.url(s.url.format(s.locals.globals.$stateParams)), "replace" === o.location && g.replace()), o.notify && t.$broadcast("$stateChangeSuccess", e.self, n, u.self, d), D = g.url(), y.current
                }, function (i) {
                    return y.transition !== H ? L : (y.transition = null, t.$broadcast("$stateChangeError", e.self, n, u.self, d, i), C(), r.reject(i))
                });
                return H
            }, y.is = function (t, i) {
                var r = h(t);
                return k(r) ? y.$current !== r ? !1 : k(i) && null !== i ? e.equals(v, i) : !0 : n
            }, y.includes = function (t, i) {
                if (N(t) && p(t)) {
                    if (!m(t))return !1;
                    t = y.$current.name
                }
                var r = h(t);
                if (!k(r))return n;
                if (!k(y.$current.includes[r.name]))return !1;
                var o = !0;
                return e.forEach(i, function (t, e) {
                    k(v[e]) && v[e] === t || (o = !1)
                }), o
            }, y.href = function (t, e, n) {
                n = I({lossy: !0, inherit: !1, absolute: !1, relative: y.$current}, n || {});
                var i = h(t, n.relative);
                if (!k(i))return null;
                e = s(v, e || {}, y.$current, i);
                var r = i && n.lossy ? i.navigable : i, a = r && r.url ? r.url.format(l(i.params, e || {})) : null;
                return !o.html5Mode() && a && (a = "#" + o.hashPrefix() + a), "/" !== q && (o.html5Mode() ? a = q.slice(0, -1) + a : n.absolute && (a = q.slice(1) + a)), n.absolute && a && (a = g.protocol() + "://" + g.host() + (80 == g.port() || 443 == g.port() ? "" : ":" + g.port()) + (!o.html5Mode() && a ? "/" : "") + a), a
            }, y.get = function (t, e) {
                if (!k(t)) {
                    var n = [];
                    return O(x, function (t) {
                        n.push(t.self)
                    }), n
                }
                var i = h(t, e);
                return i && i.self ? i.self : null
            }, y
        }

        function $(t, e, n, i) {
            return t !== e || (n !== e.locals || i.reload) && t.self.reloadOnSearch !== !1 ? void 0 : !0
        }

        var w, y, x = {}, E = {}, S = "abstract", C = {
            parent: function (t) {
                if (k(t.parent) && t.parent)return h(t.parent);
                var e = /^(.+)\.[^.]+$/.exec(t.name);
                return e ? h(e[1]) : w
            }, data: function (t) {
                return t.parent && t.parent.data && (t.data = t.self.data = I({}, t.parent.data, t.data)), t.data
            }, url: function (t) {
                var e = t.url;
                if (N(e))return "^" == e.charAt(0) ? r.compile(e.substring(1)) : (t.parent.navigable || w).url.concat(e);
                if (r.isMatcher(e) || null == e)return e;
                throw Error("Invalid url '" + e + "' in state '" + t + "'")
            }, navigable: function (t) {
                return t.url ? t : t.parent ? t.parent.navigable : null
            }, params: function (t) {
                if (!t.params)return t.url ? t.url.parameters() : t.parent.params;
                if (!P(t.params))throw Error("Invalid params in state '" + t + "'");
                if (t.url)throw Error("Both params and url specicified in state '" + t + "'");
                return t.params
            }, views: function (t) {
                var e = {};
                return O(k(t.views) ? t.views : {"": t}, function (n, i) {
                    0 > i.indexOf("@") && (i += "@" + t.parent.name), e[i] = n
                }), e
            }, ownParams: function (t) {
                if (!t.parent)return t.params;
                var e = {};
                O(t.params, function (t) {
                    e[t] = !0
                }), O(t.parent.params, function (n) {
                    if (!e[n])throw Error("Missing required parameter '" + n + "' in state '" + t.name + "'");
                    e[n] = !1
                });
                var n = [];
                return O(e, function (t, e) {
                    t && n.push(e)
                }), n
            }, path: function (t) {
                return t.parent ? t.parent.path.concat(t) : []
            }, includes: function (t) {
                var e = t.parent ? I({}, t.parent.includes) : {};
                return e[t.name] = !0, e
            }, $delegates: {}
        };
        w = d({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }), w.navigable = null, this.decorator = v, this.state = g, this.$get = b, b.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$location", "$urlRouter", "$browser"]
    }

    function g() {
        function t(t, e) {
            return {
                load: function (n, i) {
                    var r, o = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return i = I(o, i), i.view && (r = e.fromConfig(i.view, i.params, i.locals)), r && i.notify && t.$broadcast("$viewContentLoading", i), r
                }
            }
        }

        this.$get = t, t.$inject = ["$rootScope", "$templateFactory"]
    }

    function b() {
        var t = !1;
        this.useAnchorScroll = function () {
            t = !0
        }, this.$get = ["$anchorScroll", "$timeout", function (e, n) {
            return t ? e : function (t) {
                n(function () {
                    t[0].scrollIntoView()
                }, 0, !1)
            }
        }]
    }

    function $(t, n, i) {
        function r() {
            return n.has ? function (t) {
                return n.has(t) ? n.get(t) : null
            } : function (t) {
                try {
                    return n.get(t)
                } catch (e) {
                    return null
                }
            }
        }

        function o(t, e) {
            var n = function () {
                return {
                    enter: function (t, e, n) {
                        e.after(t), n()
                    }, leave: function (t, e) {
                        t.remove(), e()
                    }
                }
            };
            if (l)return {
                enter: function (t, e, n) {
                    l.enter(t, null, e, n)
                }, leave: function (t, e) {
                    l.leave(t, e)
                }
            };
            if (s) {
                var i = s && s(e, t);
                return {
                    enter: function (t, e, n) {
                        i.enter(t, null, e), n()
                    }, leave: function (t, e) {
                        i.leave(t), e()
                    }
                }
            }
            return n()
        }

        var a = r(), s = a("$animator"), l = a("$animate"), c = {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            compile: function (n, r, a) {
                return function (n, r, s) {
                    function l() {
                        u && (u.remove(), u = null), f && (f.$destroy(), f = null), h && (v.leave(h, function () {
                            u = null
                        }), u = h, h = null)
                    }

                    function c(o) {
                        var s = n.$new(), c = h && h.data("$uiViewName"), u = c && t.$current && t.$current.locals[c];
                        if (o || u !== d) {
                            var g = a(s, function (t) {
                                v.enter(t, r, function () {
                                    (e.isDefined(m) && !m || n.$eval(m)) && i(t)
                                }), l()
                            });
                            d = t.$current.locals[g.data("$uiViewName")], h = g, f = s, f.$emit("$viewContentLoaded"), f.$eval(p)
                        }
                    }

                    var u, h, f, d, p = s.onload || "", m = s.autoscroll, v = o(s, n);
                    n.$on("$stateChangeSuccess", function () {
                        c(!1)
                    }), n.$on("$viewContentLoading", function () {
                        c(!1)
                    }), c(!0)
                }
            }
        };
        return c
    }

    function w(t, e, n) {
        return {
            restrict: "ECA", priority: -400, compile: function (i) {
                var r = i.html();
                return function (i, o, a) {
                    var s = a.uiView || a.name || "", l = o.inheritedData("$uiView");
                    0 > s.indexOf("@") && (s = s + "@" + (l ? l.state.name : "")), o.data("$uiViewName", s);
                    var c = n.$current, u = c && c.locals[s];
                    if (u) {
                        o.data("$uiView", {name: s, state: u.$$state}), o.html(u.$template ? u.$template : r);
                        var h = t(o.contents());
                        if (u.$$controller) {
                            u.$scope = i;
                            var f = e(u.$$controller, u);
                            u.$$controllerAs && (i[u.$$controllerAs] = f), o.data("$ngControllerController", f), o.children().data("$ngControllerController", f)
                        }
                        h(i)
                    }
                }
            }
        }
    }

    function y(t) {
        var e = t.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
        if (!e || 4 !== e.length)throw Error("Invalid state ref '" + t + "'");
        return {state: e[1], paramExpr: e[3] || null}
    }

    function x(t) {
        var e = t.parent().inheritedData("$uiView");
        return e && e.state && e.state.name ? e.state : void 0
    }

    function E(t, n) {
        var i = ["location", "inherit", "reload"];
        return {
            restrict: "A", require: "?^uiSrefActive", link: function (r, o, a, s) {
                var l = y(a.uiSref), c = null, u = x(o) || t.$current, h = "FORM" === o[0].nodeName, f = h ? "action" : "href", d = !0, p = {relative: u}, m = r.$eval(a.uiSrefOpts) || {};
                e.forEach(i, function (t) {
                    t in m && (p[t] = m[t])
                });
                var v = function (e) {
                    if (e && (c = e), d) {
                        var n = t.href(l.state, c, p);
                        return s && s.$$setStateInfo(l.state, c), n ? void(o[0][f] = n) : (d = !1, !1)
                    }
                };
                l.paramExpr && (r.$watch(l.paramExpr, function (t) {
                    t !== c && v(t)
                }, !0), c = r.$eval(l.paramExpr)), v(), h || o.bind("click", function (e) {
                    var i = e.which || e.button;
                    i > 1 || e.ctrlKey || e.metaKey || e.shiftKey || o.attr("target") || (n(function () {
                        t.go(l.state, c, p)
                    }), e.preventDefault())
                })
            }
        }
    }

    function S(t, e, n) {
        return {
            restrict: "A", controller: ["$scope", "$element", "$attrs", function (i, r, o) {
                function a() {
                    t.$current.self === l && s() ? r.addClass(h) : r.removeClass(h)
                }

                function s() {
                    return !u || c(u, e)
                }

                var l, u, h;
                h = n(o.uiSrefActive || "", !1)(i), this.$$setStateInfo = function (e, n) {
                    l = t.get(e, x(r)), u = n, a()
                }, i.$on("$stateChangeSuccess", a)
            }]
        }
    }

    function C(t) {
        return function (e) {
            return t.is(e)
        }
    }

    function T(t) {
        return function (e) {
            return t.includes(e)
        }
    }

    function L(t, e) {
        function r(t) {
            this.locals = t.locals.globals, this.params = this.locals.$stateParams
        }

        function o() {
            this.locals = null, this.params = null
        }

        function a(n, a) {
            if (null != a.redirectTo) {
                var s, c = a.redirectTo;
                if (N(c))s = c; else {
                    if (!A(c))throw Error("Invalid 'redirectTo' in when()");
                    s = function (t, e) {
                        return c(t, e.path(), e.search())
                    }
                }
                e.when(n, s)
            } else t.state(i(a, {parent: null, name: "route:" + encodeURIComponent(n), url: n, onEnter: r, onExit: o}));
            return l.push(a), this
        }

        function s(t, e, i) {
            function r(t) {
                return "" !== t.name ? t : n
            }

            var o = {routes: l, params: i, current: n};
            return e.$on("$stateChangeStart", function (t, n, i, o) {
                e.$broadcast("$routeChangeStart", r(n), r(o))
            }), e.$on("$stateChangeSuccess", function (t, n, i, a) {
                o.current = r(n), e.$broadcast("$routeChangeSuccess", r(n), r(a)), R(i, o.params)
            }), e.$on("$stateChangeError", function (t, n, i, o, a, s) {
                e.$broadcast("$routeChangeError", r(n), r(o), s)
            }), o
        }

        var l = [];
        r.$inject = ["$$state"], this.when = a, this.$get = s, s.$inject = ["$state", "$rootScope", "$routeParams"]
    }

    var k = e.isDefined, A = e.isFunction, N = e.isString, _ = e.isObject, P = e.isArray, O = e.forEach, I = e.extend, R = e.copy;
    e.module("ui.router.util", ["ng"]), e.module("ui.router.router", ["ui.router.util"]), e.module("ui.router.state", ["ui.router.router", "ui.router.util"]), e.module("ui.router", ["ui.router.state"]), e.module("ui.router.compat", ["ui.router"]), h.$inject = ["$q", "$injector"], e.module("ui.router.util").service("$resolve", h), f.$inject = ["$http", "$templateCache", "$injector"], e.module("ui.router.util").service("$templateFactory", f), d.prototype.concat = function (t) {
        return new d(this.sourcePath + t + this.sourceSearch)
    }, d.prototype.toString = function () {
        return this.source
    }, d.prototype.exec = function (t, e) {
        var n = this.regexp.exec(t);
        if (!n)return null;
        var i, r = this.params, o = r.length, a = this.segments.length - 1, s = {};
        if (a !== n.length - 1)throw Error("Unbalanced capture group in route '" + this.source + "'");
        for (i = 0; a > i; i++)s[r[i]] = n[i + 1];
        for (; o > i; i++)s[r[i]] = e[r[i]];
        return s
    }, d.prototype.parameters = function () {
        return this.params
    }, d.prototype.format = function (t) {
        var e = this.segments, n = this.params;
        if (!t)return e.join("");
        var i, r, o, a = e.length - 1, s = n.length, l = e[0];
        for (i = 0; a > i; i++)o = t[n[i]], null != o && (l += encodeURIComponent(o)), l += e[i + 1];
        for (; s > i; i++)o = t[n[i]], null != o && (l += (r ? "&" : "?") + n[i] + "=" + encodeURIComponent(o), r = !0);
        return l
    }, e.module("ui.router.util").provider("$urlMatcherFactory", p), m.$inject = ["$urlMatcherFactoryProvider"], e.module("ui.router.router").provider("$urlRouter", m), v.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"], e.module("ui.router.state").value("$stateParams", {}).provider("$state", v), g.$inject = [], e.module("ui.router.state").provider("$view", g), e.module("ui.router.state").provider("$uiViewScroll", b), $.$inject = ["$state", "$injector", "$uiViewScroll"], w.$inject = ["$compile", "$controller", "$state"], e.module("ui.router.state").directive("uiView", $), e.module("ui.router.state").directive("uiView", w), E.$inject = ["$state", "$timeout"], S.$inject = ["$state", "$stateParams", "$interpolate"], e.module("ui.router.state").directive("uiSref", E).directive("uiSrefActive", S), C.$inject = ["$state"], T.$inject = ["$state"], e.module("ui.router.state").filter("isState", C).filter("includedByState", T), L.$inject = ["$stateProvider", "$urlRouterProvider"], e.module("ui.router.compat").provider("$route", L).directive("ngView", $)
}(window, window.angular), !function () {
    "use strict";
    var t = angular.module("pasvaz.bindonce", []);
    t.directive("bindonce", function () {
        var t = function (t) {
            if (t && 0 !== t.length) {
                var e = angular.lowercase("" + t);
                t = !("f" === e || "0" === e || "false" === e || "no" === e || "n" === e || "[]" === e)
            } else t = !1;
            return t
        }, e = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
        isNaN(e) && (e = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10));
        var n = {
            restrict: "AM", controller: ["$scope", "$element", "$attrs", "$interpolate", function (n, i, r, o) {
                var a = function (e, n, i) {
                    var r = "show" === n ? "" : "none", o = "hide" === n ? "" : "none";
                    e.css("display", t(i) ? r : o)
                }, s = function (t, e) {
                    if (angular.isObject(e) && !angular.isArray(e)) {
                        var n = [];
                        angular.forEach(e, function (t, e) {
                            t && n.push(e)
                        }), e = n
                    }
                    e && t.addClass(angular.isArray(e) ? e.join(" ") : e)
                }, l = function (t, e) {
                    t.transclude(e, function (e) {
                        var n = t.element.parent(), i = t.element && t.element[t.element.length - 1], r = n && n[0] || i && i.parentNode, o = i && i.nextSibling || null;
                        angular.forEach(e, function (t) {
                            r.insertBefore(t, o)
                        })
                    })
                }, c = {
                    watcherRemover: void 0, binders: [], group: r.boName, element: i, ran: !1, addBinder: function (t) {
                        this.binders.push(t), this.ran && this.runBinders()
                    }, setupWatcher: function (t) {
                        var e = this;
                        this.watcherRemover = n.$watch(t, function (t) {
                            void 0 !== t && (e.removeWatcher(), e.checkBindonce(t))
                        }, !0)
                    }, checkBindonce: function (t) {
                        var e = this, n = t.$promise ? t.$promise.then : t.then;
                        "function" == typeof n ? n(function () {
                            e.runBinders()
                        }) : e.runBinders()
                    }, removeWatcher: function () {
                        void 0 !== this.watcherRemover && (this.watcherRemover(), this.watcherRemover = void 0)
                    }, runBinders: function () {
                        for (; this.binders.length > 0;) {
                            var n = this.binders.shift();
                            if (!this.group || this.group == n.group) {
                                var i = n.scope.$eval(n.interpolate ? o(n.value) : n.value);
                                switch (n.attr) {
                                    case"boIf":
                                        t(i) && l(n, n.scope.$new());
                                        break;
                                    case"boSwitch":
                                        var r, c = n.controller[0];
                                        (r = c.cases["!" + i] || c.cases["?"]) && (n.scope.$eval(n.attrs.change), angular.forEach(r, function (t) {
                                            l(t, n.scope.$new())
                                        }));
                                        break;
                                    case"boSwitchWhen":
                                        var u = n.controller[0];
                                        u.cases["!" + n.attrs.boSwitchWhen] = u.cases["!" + n.attrs.boSwitchWhen] || [], u.cases["!" + n.attrs.boSwitchWhen].push({
                                            transclude: n.transclude,
                                            element: n.element
                                        });
                                        break;
                                    case"boSwitchDefault":
                                        var u = n.controller[0];
                                        u.cases["?"] = u.cases["?"] || [], u.cases["?"].push({
                                            transclude: n.transclude,
                                            element: n.element
                                        });
                                        break;
                                    case"hide":
                                    case"show":
                                        a(n.element, n.attr, i);
                                        break;
                                    case"class":
                                        s(n.element, i);
                                        break;
                                    case"text":
                                        n.element.text(i);
                                        break;
                                    case"html":
                                        n.element.html(i);
                                        break;
                                    case"style":
                                        n.element.css(i);
                                        break;
                                    case"disabled":
                                        n.element.prop("disabled", i);
                                        break;
                                    case"src":
                                        n.element.attr(n.attr, i), e && n.element.prop("src", i);
                                        break;
                                    case"attr":
                                        angular.forEach(n.attrs, function (t, e) {
                                            var i, r;
                                            e.match(/^boAttr./) && n.attrs[e] && (i = e.replace(/^boAttr/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r = n.scope.$eval(n.attrs[e]), n.element.attr(i, r))
                                        });
                                        break;
                                    case"href":
                                    case"alt":
                                    case"title":
                                    case"id":
                                    case"value":
                                        n.element.attr(n.attr, i)
                                }
                            }
                        }
                        this.ran = !0
                    }
                };
                angular.extend(this, c)
            }], link: function (t, e, n, i) {
                var r = n.bindonce && t.$eval(n.bindonce);
                void 0 !== r ? i.checkBindonce(r) : (i.setupWatcher(n.bindonce), e.bind("$destroy", i.removeWatcher))
            }
        };
        return n
    }), angular.forEach([{directiveName: "boShow", attribute: "show"}, {
        directiveName: "boHide",
        attribute: "hide"
    }, {directiveName: "boClass", attribute: "class"}, {
        directiveName: "boText",
        attribute: "text"
    }, {directiveName: "boBind", attribute: "text"}, {
        directiveName: "boHtml",
        attribute: "html"
    }, {directiveName: "boSrcI", attribute: "src", interpolate: !0}, {
        directiveName: "boSrc",
        attribute: "src"
    }, {directiveName: "boHrefI", attribute: "href", interpolate: !0}, {
        directiveName: "boHref",
        attribute: "href"
    }, {directiveName: "boAlt", attribute: "alt"}, {
        directiveName: "boTitle",
        attribute: "title"
    }, {directiveName: "boId", attribute: "id"}, {
        directiveName: "boStyle",
        attribute: "style"
    }, {directiveName: "boDisabled", attribute: "disabled"}, {
        directiveName: "boValue",
        attribute: "value"
    }, {directiveName: "boAttr", attribute: "attr"}, {
        directiveName: "boIf",
        transclude: "element",
        terminal: !0,
        priority: 1e3
    }, {
        directiveName: "boSwitch", require: "boSwitch", controller: function () {
            this.cases = {}
        }
    }, {
        directiveName: "boSwitchWhen",
        transclude: "element",
        priority: 800,
        require: "^boSwitch"
    }, {directiveName: "boSwitchDefault", transclude: "element", priority: 800, require: "^boSwitch"}], function (e) {
        var n = 200;
        return t.directive(e.directiveName, function () {
            var t = {
                priority: e.priority || n,
                transclude: e.transclude || !1,
                terminal: e.terminal || !1,
                require: ["^bindonce"].concat(e.require || []),
                controller: e.controller,
                compile: function (t, n, i) {
                    return function (t, n, r, o) {
                        var a = o[0], s = r.boParent;
                        if (s && a.group !== s) {
                            var l = a.element.parent();
                            a = void 0;
                            for (var c; 9 !== l[0].nodeType && l.length;) {
                                if ((c = l.data("$bindonceController")) && c.group === s) {
                                    a = c;
                                    break
                                }
                                l = l.parent()
                            }
                            if (!a)throw Error("No bindonce controller: " + s)
                        }
                        a.addBinder({
                            element: n,
                            attr: e.attribute || e.directiveName,
                            attrs: r,
                            value: r[e.directiveName],
                            interpolate: e.interpolate,
                            group: s,
                            transclude: i,
                            controller: o.slice(1),
                            scope: t
                        })
                    }
                }
            };
            return t
        })
    })
}(), function () {
    "use strict";
    function t(e, i) {
        function r(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        var o;
        if (i = i || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = i.touchBoundary || 10, this.layer = e, this.tapDelay = i.tapDelay || 200, this.tapTimeout = i.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = this, l = 0, c = a.length; c > l; l++)s[a[l]] = r(s[a[l]], s);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, i) {
                var r = Node.prototype.removeEventListener;
                "click" === t ? r.call(e, t, n.hijacked || n, i) : r.call(e, t, n, i)
            }, e.addEventListener = function (t, n, i) {
                var r = Node.prototype.addEventListener;
                "click" === t ? r.call(e, t, n.hijacked || (n.hijacked = function (t) {
                        t.propagationStopped || n(t)
                    }), i) : r.call(e, t, n, i)
            }), "function" == typeof e.onclick && (o = e.onclick, e.addEventListener("click", function (t) {
                o(t)
            }, !1), e.onclick = null)
        }
    }

    var e = navigator.userAgent.indexOf("Windows Phone") >= 0, n = navigator.userAgent.indexOf("Android") > 0 && !e, i = /iP(ad|hone|od)/.test(navigator.userAgent) && !e, r = i && /OS 4_\d(_\d)?/.test(navigator.userAgent), o = i && /OS [6-7]_\d/.test(navigator.userAgent), a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"button":
            case"select":
            case"textarea":
                if (t.disabled)return !0;
                break;
            case"input":
                if (i && "file" === t.type || t.disabled)return !0;
                break;
            case"label":
            case"iframe":
            case"video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function (t) {
        switch (t.nodeName.toLowerCase()) {
            case"textarea":
                return !0;
            case"select":
                return !n;
            case"input":
                switch (t.type) {
                    case"button":
                    case"checkbox":
                    case"file":
                    case"image":
                    case"radio":
                    case"submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function (t, e) {
        var n, i;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), i = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function (t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function (t) {
        var e;
        i && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function (t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function (t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function (t) {
        var e, n, o;
        if (t.targetTouches.length > 1)return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], i) {
            if (o = window.getSelection(), o.rangeCount && !o.isCollapsed)return !0;
            if (!r) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier)return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function (t) {
        var e = t.changedTouches[0], n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n ? !0 : !1
    }, t.prototype.onTouchMove = function (t) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, t.prototype.findControl = function (t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function (t) {
        var e, a, s, l, c, u = this.targetElement;
        if (!this.trackingClick)return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout)return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, o && (c = t.changedTouches[0], u = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || u, u.fastClickScrollParent = this.targetElement.fastClickScrollParent), s = u.tagName.toLowerCase(), "label" === s) {
            if (e = this.findControl(u)) {
                if (this.focus(u), n)return !1;
                u = e
            }
        } else if (this.needsFocus(u))return t.timeStamp - a > 100 || i && window.top !== window && "input" === s ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, t), i && "select" === s || (this.targetElement = null, t.preventDefault()), !1);
        return i && !r && (l = u.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(u) || (t.preventDefault(), this.sendClick(u, t)), !1)
    }, t.prototype.onTouchCancel = function () {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function (t) {
        return this.targetElement ? t.forwardedTouchEvent ? !0 : t.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1) : !0 : !0 : !0
    }, t.prototype.onClick = function (t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail ? !0 : (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function () {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function (t) {
        var e, i, r, o;
        if (window.ontouchstart === void 0)return !0;
        if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n)return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
                if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth)return !0
            }
        }
        if (a && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no"))return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth)return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction ? !0 : (o = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], o >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === t.style.touchAction || "manipulation" === t.style.touchAction ? !0 : !1)
    }, t.attach = function (e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui.core.activeLinks", []).run(["$rootScope", "$window", "$document", "$location", function (t, e, n, i) {
        var r = function () {
            var t, r = i.url(), o = r.indexOf("#"), a = r.indexOf("?"), s = e.location.href, l = s.indexOf(r);
            -1 === o && -1 === a ? t = s : -1 !== o && o > a ? t = s.slice(0, l + o) : -1 !== a && a > o && (t = s.slice(0, l + a));
            for (var c = n[0].links, u = 0; c.length > u; u++) {
                var h = c[u], f = angular.element(h);
                f.attr("href") && "" !== f.attr("href") && h.href === t ? f.addClass("active") : f.attr("href") && "" !== f.attr("href") && h.href && h.href.length && f.removeClass("active")
            }
        };
        t.$on("$locationChangeSuccess", r), t.$on("$includeContentLoaded", r)
    }])
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui.core.capture", []).run(["Capture", "$rootScope", function (t, e) {
        e.$on("$routeChangeSuccess", function () {
            t.resetAll()
        })
    }]).factory("Capture", ["$compile", function (t) {
        var e = {};
        return {
            resetAll: function () {
                for (var t in e)e.hasOwnProperty(t) && this.resetYielder(t)
            }, resetYielder: function (t) {
                var n = e[t];
                this.setContentFor(t, n.defaultContent, n.defaultScope)
            }, putYielder: function (t, n, i, r) {
                var o = {};
                o.name = t, o.element = n, o.defaultContent = r || "", o.defaultScope = i, e[t] = o
            }, getYielder: function (t) {
                return e[t]
            }, removeYielder: function (t) {
                delete e[t]
            }, setContentFor: function (n, i, r) {
                var o = e[n];
                o && (o.element.html(i), t(o.element.contents())(r))
            }
        }
    }]).directive("uiContentFor", ["Capture", function (t) {
        return {
            compile: function (e, n) {
                var i = e.html();
                return (null === n.uiDuplicate || void 0 === n.uiDuplicate) && (e.html(""), e.remove()), function (e, n, r) {
                    t.setContentFor(r.uiContentFor, i, e)
                }
            }
        }
    }]).directive("uiYieldTo", ["$compile", "Capture", function (t, e) {
        return {
            link: function (t, n, i) {
                e.putYielder(i.uiYieldTo, n, t, n.html()), n.on("$destroy", function () {
                    e.removeYielder(i.uiYieldTo)
                }), t.$on("$destroy", function () {
                    e.removeYielder(i.uiYieldTo)
                })
            }
        }
    }])
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.core.fastclick", []);
    t.run(["$window", function (t) {
        function e(t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        }

        var n = FastClick.prototype.onTouchEnd;
        FastClick.prototype.onTouchEnd = function (t) {
            t.changedTouches || (t.changedTouches = [{}]), n = e(n, this), n(t)
        }, FastClick.attach(t.document.body)
    }]), angular.forEach(["select", "input", "textarea"], function (e) {
        t.directive(e, function () {
            return {
                restrict: "E", compile: function (t) {
                    t.addClass("needsclick")
                }
            }
        })
    })
}(), function () {
    "use strict";
    var t = function (t, e) {
        for (var n = t; n.length > 0;) {
            if (n[0] === e[0])return n = null, !0;
            n = n.parent()
        }
        return n = null, !1
    };
    angular.module("mobile-angular-ui.core.outerClick", []).factory("bindOuterClick", ["$document", "$timeout", function (e, n) {
        return function (i, r, o, a) {
            var s = function (e) {
                t(angular.element(e.target), r) || i.$apply(function () {
                    o(i, {$event: e})
                })
            }, l = angular.noop, c = null;
            a ? l = i.$watch(a, function (t) {
                n.cancel(c), t ? c = n(function () {
                    e.on("click tap", s)
                }, 0) : e.unbind("click tap", s)
            }) : (n.cancel(c), e.on("click tap", s)), i.$on("$destroy", function () {
                l(), e.unbind("click tap", s)
            })
        }
    }]).directive("uiOuterClick", ["bindOuterClick", "$parse", function (t, e) {
        return {
            restrict: "A", compile: function (n, i) {
                var r = e(i.uiOuterClick), o = i.uiOuterClickIf;
                return function (e, n) {
                    t(e, n, r, o)
                }
            }
        }
    }])
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.core.sharedState", []);
    t.factory("SharedState", ["$rootScope", function (t) {
        var e = {}, n = {}, i = {}, r = {};
        return {
            initialize: function (o, a, s) {
                s = s || {};
                var l = void 0 === i[o], c = s.defaultValue, u = s.exclusionGroup;
                i[o.$id] = i[o.$id] || [], i[o.$id].push(a), n[a] ? l && n[a].references++ : (n[a] = angular.extend({}, s, {references: 1}), t.$broadcast("mobile-angular-ui.state.initialized." + a, c), void 0 !== c && this.setOne(a, c), u && (r[u] = r[u] || {}, r[u][a] = !0)), o.$on("$destroy", function () {
                    for (var s = i[o.$id] || [], l = 0; s.length > l; l++) {
                        var c = n[s[l]];
                        c.exclusionGroup && (delete r[c.exclusionGroup][s[l]], 0 === Object.keys(r[c.exclusionGroup]).length && delete r[c.exclusionGroup]), c.references--, 0 >= c.references && (delete n[s[l]], delete e[s[l]], t.$broadcast("mobile-angular-ui.state.destroyed." + a))
                    }
                    delete i[o.$id]
                })
            }, setOne: function (i, r) {
                if (void 0 !== n[i]) {
                    var o = e[i];
                    return e[i] = r, o !== r && t.$broadcast("mobile-angular-ui.state.changed." + i, r, o), r
                }
                console && console.warn("Warning: Attempt to set uninitialized shared state:", i)
            }, setMany: function (t) {
                angular.forEach(t, function (t, e) {
                    this.setOne(e, t)
                }, this)
            }, set: function (t, e) {
                angular.isObject(t) && angular.isUndefined(e) ? this.setMany(t) : this.setOne(t, e)
            }, turnOn: function (t) {
                var e = n[t] && n[t].exclusionGroup;
                if (e)for (var i = Object.keys(r[e]), o = 0; i.length > o; o++) {
                    var a = i[o];
                    a !== t && this.turnOff(a)
                }
                return this.setOne(t, !0)
            }, turnOff: function (t) {
                return this.setOne(t, !1)
            }, toggle: function (t) {
                return this.get(t) ? this.turnOff(t) : this.turnOn(t)
            }, get: function (t) {
                return n[t] && e[t]
            }, isActive: function (t) {
                return !!this.get(t)
            }, active: function (t) {
                return this.isActive(t)
            }, isUndefined: function (t) {
                return void 0 === n[t] || void 0 === this.get(t)
            }, has: function (t) {
                return void 0 !== n[t]
            }, referenceCount: function (t) {
                var e = n[t];
                return void 0 === e ? 0 : e.references
            }, equals: function (t, e) {
                return this.get(t) === e
            }, eq: function (t, e) {
                return this.equals(t, e)
            }, values: function () {
                return e
            }
        }
    }]);
    var e = function (t, e, n, i) {
        n = n || "click tap", e.on(n, function (e) {
            t.$apply(function () {
                i(t, {$event: e})
            })
        })
    };
    t.directive("uiState", ["SharedState", function (t) {
        return {
            restrict: "EA", priority: 601, link: function (e, n, i) {
                var r = i.uiState || i.id, o = i.uiDefault || i["default"], a = o ? e.$eval(o) : void 0;
                t.initialize(e, r, {defaultValue: a, exclusionGroup: i.uiExclusionGroup})
            }
        }
    }]), angular.forEach(["toggle", "turnOn", "turnOff", "set"], function (n) {
        var i = "ui" + n[0].toUpperCase() + n.slice(1);
        t.directive(i, ["$parse", "$interpolate", "SharedState", function (t, r, o) {
            var a = o[n];
            return {
                restrict: "A", priority: 1, compile: function (s, l) {
                    var c = l[i], u = c.match(/\{\{/), h = function (e) {
                        var i = c;
                        if (u) {
                            var o = r(i);
                            i = o(e)
                        }
                        return "set" === n && (i = t(i)(e)), i
                    };
                    return function (t, n, i) {
                        var r = function () {
                            var e = h(t);
                            return a.call(o, e)
                        };
                        e(t, n, i.uiTriggers, r)
                    }
                }
            }
        }])
    });
    var n = function (t) {
        if (!t || "" === t)return [];
        for (var e = t ? t.trim().split(/ *, */) : [], n = [], i = 0; e.length > i; i++) {
            var r = e[i].split(/ *as */);
            if (r.length > 2 || 1 > r.length)throw Error('Error parsing uiScopeContext="' + t + '"');
            n.push(r)
        }
        return n
    }, i = function (t, e, n) {
        for (var i = 0; e.length > i; i++) {
            var r = e[i][0], o = e[i][1] || r;
            t[o] = r.split(".").reduce(function (t, e) {
                return t[e]
            }, n)
        }
    }, r = function (t, e, r, o, a, s) {
        var l, c = e[t], u = c.match(/\{\{/);
        l = u ? function (t) {
            var e = s(c), n = a(e(r));
            return n(t)
        } : a(c);
        var h = n(e.uiScopeContext);
        return function () {
            var t;
            return h.length ? (t = angular.extend({}, o.values()), i(t, h, r)) : t = o.values(), l(t)
        }
    };
    t.directive("uiIf", ["$animate", "SharedState", "$parse", "$interpolate", function (t, e, n, i) {
        function o(t) {
            var e = t[0], n = t[t.length - 1], i = [e];
            do {
                if (e = e.nextSibling, !e)break;
                i.push(e)
            } while (e !== n);
            return angular.element(i)
        }

        return {
            multiElement: !0,
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function (a, s, l, c, u) {
                var h, f, d, p = r("uiIf", l, a, e, n, i);
                a.$watch(p, function (e) {
                    if (e)f || u(function (e, n) {
                        f = n, e[e.length++] = document.createComment(" end uiIf: " + l.uiIf + " "), h = {clone: e}, t.enter(e, s.parent(), s)
                    }); else if (d && (d.remove(), d = null), f && (f.$destroy(), f = null), h) {
                        d = o(h.clone);
                        var n = function () {
                            d = null
                        }, i = t.leave(d, n);
                        i && i.then(n), h = null
                    }
                })
            }
        }
    }]), t.directive("uiHide", ["$animate", "SharedState", "$parse", "$interpolate", function (t, e, n, i) {
        var o = "ng-hide", a = "ng-hide-animate";
        return {
            restrict: "A", multiElement: !0, link: function (s, l, c) {
                var u = r("uiHide", c, s, e, n, i);
                s.$watch(u, function (e) {
                    t[e ? "addClass" : "removeClass"](l, o, {tempClasses: a})
                })
            }
        }
    }]), t.directive("uiShow", ["$animate", "SharedState", "$parse", "$interpolate", function (t, e, n) {
        var i = "ng-hide", o = "ng-hide-animate";
        return {
            restrict: "A", multiElement: !0, link: function (a, s, l) {
                var c = r("uiShow", l, a, e, n);
                a.$watch(c, function (e) {
                    t[e ? "removeClass" : "addClass"](s, i, {tempClasses: o})
                })
            }
        }
    }]), t.directive("uiClass", ["SharedState", "$parse", "$interpolate", function (t, e) {
        return {
            restrict: "A", link: function (n, i, o) {
                var a = r("uiClass", o, n, t, e);
                n.$watch(a, function (t) {
                    var e = "", n = "";
                    angular.forEach(t, function (t, r) {
                        t ? e += " " + r : n += " " + r, e = e.trim(), n = n.trim(), e.length && i.addClass(e), n.length && i.removeClass(n)
                    })
                }, !0)
            }
        }
    }]), t.run(["$rootScope", "SharedState", function (t, e) {
        t.Ui = e
    }])
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.core.touchmoveDefaults", []);
    t.directive("uiPreventTouchmoveDefaults", function () {
        var t = function (t) {
            t.allowTouchmoveDefault !== !0 && t.preventDefault()
        };
        return {
            compile: function (e) {
                "ontouchmove" in document && e.on("touchmove", t)
            }
        }
    }), t.factory("allowTouchmoveDefault", function () {
        var t = function () {
            return !0
        };
        return "ontouchmove" in document ? function (e, n) {
            n = n || t;
            var i = function (t) {
                n(t) && (t.allowTouchmoveDefault = !0)
            };
            return e = angular.element(e), e.on("touchmove", i), e.on("$destroy", function () {
                e.off("touchmove", i), e = null
            }), function () {
                e && e.off("touchmove", i)
            }
        } : angular.noop
    })
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui.core", ["mobile-angular-ui.core.fastclick", "mobile-angular-ui.core.activeLinks", "mobile-angular-ui.core.capture", "mobile-angular-ui.core.outerClick", "mobile-angular-ui.core.sharedState", "mobile-angular-ui.core.touchmoveDefaults"])
}(), function (t) {
    var e = t.document, n = e.documentElement, i = "overthrow-enabled", r = "ontouchmove" in e, o = "WebkitOverflowScrolling" in n.style || "msOverflowStyle" in n.style || !r && t.screen.width > 800 || function () {
            var e = t.navigator.userAgent, n = e.match(/AppleWebKit\/([0-9]+)/), i = n && n[1], r = n && i >= 534;
            return e.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && r || e.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && t.blackberry && r || e.indexOf("PlayBook") > -1 && r && -1 === !e.indexOf("Android 2") || e.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 || e.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && r || e.match(/NokiaBrowser\/([0-9\.]+)/) && 7.3 === parseFloat(RegExp.$1) && n && i >= 533
        }();
    t.overthrow = {}, t.overthrow.enabledClassName = i, t.overthrow.addClass = function () {
        -1 === n.className.indexOf(t.overthrow.enabledClassName) && (n.className += " " + t.overthrow.enabledClassName)
    }, t.overthrow.removeClass = function () {
        n.className = n.className.replace(t.overthrow.enabledClassName, "")
    }, t.overthrow.set = function () {
        o && t.overthrow.addClass()
    }, t.overthrow.canBeFilledWithPoly = r, t.overthrow.forget = function () {
        t.overthrow.removeClass()
    }, t.overthrow.support = o ? "native" : "none"
}(this), function (t) {
    t.overthrow.set()
}(this), function (t, e, n) {
    if (e !== n) {
        e.scrollIndicatorClassName = "overthrow";
        var i = t.document, r = i.documentElement, o = "native" === e.support, a = e.canBeFilledWithPoly, s = (e.configure, e.set), l = e.forget, c = e.scrollIndicatorClassName;
        e.closest = function (t, n) {
            return !n && t.className && t.className.indexOf(c) > -1 && t || e.closest(t.parentNode)
        };
        var u = !1;
        e.set = function () {
            if (s(), !u && !o && a) {
                t.overthrow.addClass(), u = !0, e.support = "polyfilled", e.forget = function () {
                    l(), u = !1, i.removeEventListener && i.removeEventListener("touchstart", w, !1)
                };
                var c, h, f, d, p = [], m = [], v = function () {
                    p = [], h = null
                }, g = function () {
                    m = [], f = null
                }, b = function (t) {
                    d = c.querySelectorAll("textarea, input");
                    for (var e = 0, n = d.length; n > e; e++)d[e].style.pointerEvents = t
                }, $ = function (t, e) {
                    if (i.createEvent) {
                        var r, o = (!e || e === n) && c.parentNode || c.touchchild || c;
                        o !== c && (r = i.createEvent("HTMLEvents"), r.initEvent("touchend", !0, !0), c.dispatchEvent(r), o.touchchild = c, c = o, o.dispatchEvent(t))
                    }
                }, w = function (t) {
                    if (e.intercept && e.intercept(), v(), g(), c = e.closest(t.target), c && c !== r && !(t.touches.length > 1)) {
                        b("none");
                        var n = t, i = c.scrollTop, o = c.scrollLeft, a = c.offsetHeight, s = c.offsetWidth, l = t.touches[0].pageY, u = t.touches[0].pageX, d = c.scrollHeight, w = c.scrollWidth, y = function (t) {
                            var e = i + l - t.touches[0].pageY, r = o + u - t.touches[0].pageX, b = e >= (p.length ? p[0] : 0), y = r >= (m.length ? m[0] : 0);
                            e > 0 && d - a > e || r > 0 && w - s > r ? t.preventDefault() : $(n), h && b !== h && v(), f && y !== f && g(), h = b, f = y, c.scrollTop = e, c.scrollLeft = r, p.unshift(e), m.unshift(r), p.length > 3 && p.pop(), m.length > 3 && m.pop()
                        }, x = function () {
                            b("auto"), setTimeout(function () {
                                b("none")
                            }, 450), c.removeEventListener("touchmove", y, !1), c.removeEventListener("touchend", x, !1)
                        };
                        c.addEventListener("touchmove", y, !1), c.addEventListener("touchend", x, !1)
                    }
                };
                i.addEventListener("touchstart", w, !1)
            }
        }
    }
}(this, this.overthrow), function () {
    "use strict";
    angular.module("mobile-angular-ui.components.modals", []).directive("modal", ["$rootElement", function (t) {
        return {
            restrict: "C", link: function (e, n) {
                t.addClass("has-modal"), n.on("$destroy", function () {
                    t.removeClass("has-modal")
                }), e.$on("$destroy", function () {
                    t.removeClass("has-modal")
                }), n.hasClass("modal-overlay") && (t.addClass("has-modal-overlay"), n.on("$destroy", function () {
                    t.removeClass("has-modal-overlay")
                }), e.$on("$destroy", function () {
                    t.removeClass("has-modal-overlay")
                }))
            }
        }
    }])
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.components.navbars", []);
    angular.forEach(["top", "bottom"], function (e) {
        var n = "navbarAbsolute" + e.charAt(0).toUpperCase() + e.slice(1);
        t.directive(n, ["$rootElement", function (t) {
            return {
                restrict: "C", link: function (n) {
                    t.addClass("has-navbar-" + e), n.$on("$destroy", function () {
                        t.removeClass("has-navbar-" + e)
                    })
                }
            }
        }])
    })
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.components.scrollable", ["mobile-angular-ui.core.touchmoveDefaults"]), e = function (t) {
        var e = t.touches && t.touches.length ? t.touches : [t], n = t.changedTouches && t.changedTouches[0] || t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] || e[0].originalEvent || e[0];
        return n.clientY
    };
    t.directive("scrollableContent", function () {
        return {
            restrict: "C", controller: ["$element", "allowTouchmoveDefault", function (t, n) {
                var i = t[0], r = t.parent()[0];
                if ("ontouchmove" in document) {
                    var o, a, s, l, c, u = function (t) {
                        o = i.scrollTop > 0, a = i.scrollTop < i.scrollHeight - i.clientHeight, s = null, l = null, c = e(t)
                    };
                    t.on("touchstart", u), t.on("$destroy", function () {
                        t.off("touchstart")
                    }), n(t, function (t) {
                        var n = e(t), i = n > c, r = !i;
                        return c = n, i && o || r && a
                    })
                }
                this.scrollableContent = i, this.scrollTo = function (t, e) {
                    if (e = e || 0, angular.isNumber(t))i.scrollTop = t - e; else {
                        var n = angular.element(t)[0];
                        n.offsetParent && n.offsetParent !== r ? this.scrollTo(n.offsetParent, e - n.offsetTop) : i.scrollTop = n.offsetTop - e
                    }
                }
            }], link: function (t, e) {
                "native" !== overthrow.support && (e.addClass("overthrow"), overthrow.forget(), overthrow.set())
            }
        }
    }), angular.forEach(["input", "textarea"], function (e) {
        t.directive(e, ["$rootScope", "$timeout", function (t, e) {
            return {
                require: "?^^scrollableContent", link: function (t, n, i, r) {
                    n.on("focus", function () {
                        if (r && r.scrollableContent) {
                            var t = r.scrollableContent.offsetHeight;
                            e(function () {
                                var e = r.scrollableContent.offsetHeight;
                                t > e && r.scrollTo(n, 10)
                            }, 500)
                        }
                    })
                }
            }
        }])
    }), angular.forEach({
        uiScrollTop: function (t) {
            return 0 === t.scrollTop
        }, uiScrollBottom: function (t) {
            return t.scrollHeight === t.scrollTop + t.clientHeight
        }
    }, function (e, n) {
        t.directive(n, [function () {
            return {
                restrict: "A", link: function (t, i, r) {
                    i.on("scroll", function () {
                        e(i[0]) && t.$apply(function () {
                            t.$eval(r[n])
                        })
                    })
                }
            }
        }])
    }), angular.forEach({Top: "scrollableHeader", Bottom: "scrollableFooter"}, function (e, n) {
        t.directive(e, ["$window", function (t) {
            return {
                restrict: "C", link: function (e, i) {
                    var r = i[0], o = i.parent()[0].style, a = function () {
                        var e = t.getComputedStyle(r), i = parseInt(e.marginTop, 10) + parseInt(e.marginBottom, 10);
                        o["padding" + n] = r.offsetHeight + i + "px"
                    }, s = setInterval(a, 30);
                    i.on("$destroy", function () {
                        o["padding" + n] = null, clearInterval(s), s = a = i = null
                    })
                }
            }
        }])
    })
}(), function () {
    "use strict";
    var t = angular.module("mobile-angular-ui.components.sidebars", ["mobile-angular-ui.core.sharedState", "mobile-angular-ui.core.outerClick"]);
    angular.forEach(["left", "right"], function (e) {
        var n = "sidebar" + e.charAt(0).toUpperCase() + e.slice(1), i = "ui" + n.charAt(0).toUpperCase() + n.slice(1);
        t.directive(n, ["$rootElement", "SharedState", "bindOuterClick", "$location", function (t, n, r, o) {
            return {
                restrict: "C", link: function (a, s, l) {
                    var c = "has-sidebar-" + e, u = "sidebar-" + e + "-visible", h = "sidebar-" + e + "-in";
                    l.id && (i = l.id);
                    var f = function () {
                        n.turnOff(i)
                    }, d = function () {
                        return n.isActive(i)
                    };
                    t.addClass(c), a.$on("$destroy", function () {
                        t.removeClass(c), t.removeClass(u), t.removeClass(h)
                    });
                    var p = void 0 !== l.active && "false" !== l.active;
                    n.initialize(a, i, {defaultValue: p}), a.$on("mobile-angular-ui.state.changed." + i, function (e, n) {
                        ("" === l.uiTrackAsSearchParam || l.uiTrackAsSearchParam) && o.search(i, n || null), n ? (t.addClass(u), t.addClass(h)) : t.removeClass(h)
                    }), a.$on("$routeChangeSuccess", function () {
                        n.turnOff(i)
                    }), a.$on("$routeUpdate", function () {
                        l.uiTrackAsSearchParam && (o.search()[i] ? n.turnOn(i) : n.turnOff(i))
                    }), a.$on("mobile-angular-ui.app.transitionend", function () {
                        n.isActive(i) || t.removeClass(u)
                    }), "false" !== l.closeOnOuterClicks && r(a, s, f, d)
                }
            }
        }])
    }), t.directive("app", ["$rootScope", function (t) {
        return {
            restrict: "C", link: function (e, n) {
                n.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                    t.$broadcast("mobile-angular-ui.app.transitionend")
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui.components.switch", []).directive("uiSwitch", ["$injector", function (t) {
        var e = t.has("$drag") && t.get("$drag");
        return {
            restrict: "EA", scope: {model: "=ngModel", changeExpr: "@ngChange"}, link: function (t, n, i) {
                n.addClass("switch");
                var r = i.disabled || n.attr("disabled"), o = t.$watch(function () {
                    return i.disabled || n.attr("disabled")
                }, function (t) {
                    r = t && "false" !== t && "0" !== t ? !0 : !1
                }), a = angular.element('<div class="switch-handle"></div>');
                n.append(a), t.model && n.addClass("active"), n.addClass("switch-transition-enabled");
                var s = t.$watch("model", function (t) {
                    t ? n.addClass("active") : n.removeClass("active")
                }), l = function () {
                    return !r
                }, c = function (e) {
                    l() && e !== t.model && (t.model = e, t.$apply(), null !== t.changeExpr && void 0 !== t.changeExpr && t.$parent.$eval(t.changeExpr))
                }, u = function () {
                    c(!t.model)
                };
                n.on("click tap", u);
                var h = angular.noop;
                e && (h = e.bind(a, {
                    transform: e.TRANSLATE_INSIDE(n), start: function () {
                        n.off("click tap", u)
                    }, cancel: function () {
                        a.removeAttr("style"), n.off("click tap", u), n.on("click tap", u)
                    }, end: function () {
                        var t = a[0].getBoundingClientRect(), e = n[0].getBoundingClientRect();
                        t.left - e.left < t.width / 3 ? (c(!1), a.removeAttr("style")) : e.right - t.right < t.width / 3 ? (c(!0), a.removeAttr("style")) : a.removeAttr("style"), n.on("click tap", u)
                    }
                })), n.on("$destroy", function () {
                    h(), o(), s(), l = c = h = s = o = u = null
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui.components", ["mobile-angular-ui.components.modals", "mobile-angular-ui.components.navbars", "mobile-angular-ui.components.sidebars", "mobile-angular-ui.components.scrollable", "mobile-angular-ui.components.switch"])
}(), function () {
    "use strict";
    angular.module("mobile-angular-ui", ["mobile-angular-ui.core", "mobile-angular-ui.components"])
}(), function (t, e) {
    "use strict";
    function n(e, n) {
        n.when("", "/home"), e.state("home", {
            url: "/home",
            templateUrl: t.tplPath + "route/home.html"
        }).state("need", {url: "/need", templateUrl: t.tplPath + "route/home.html"}).state("star", {
            url: "/star",
            templateUrl: t.tplPath + "route/home.html"
        }).state("area", {
            url: "/area",
            templateUrl: t.tplPath + "route/block/area.html"
        }).state("search", {
            url: "/search",
            templateUrl: t.tplPath + "route/block/search.html"
        }).state("memberIndex", {
            url: "/memberIndex",
            templateUrl: t.tplPath + "route/member/memberIndex.html"
        }).state("setting", {
            url: "/setting",
            templateUrl: t.tplPath + "route/member/setting.html"
        }).state("member/memberInfo", {
            url: "member/memberInfo",
            templateUrl: t.tplPath + "route/member/memberInfo.html"
        }).state("loginOut", {
            url: "/loginOut",
            templateUrl: t.tplPath + "route/member/loginOut.html"
        }).state("member_addArticle", {
            url: "/member_addArticle",
            templateUrl: t.tplPath + "route/member/addArticle.html"
        }).state("login", {url: "/login", templateUrl: t.tplPath + "route/login.html"}).state("master", {
            url: "/master",
            templateUrl: t.tplPath + "route/master.html"
        })
    }

    function i(t) {
        var e = t;
        e.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8", e.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
        var n = function (t) {
            var e, i, r, o, a, s, l, c = "";
            for (e in t)if (i = t[e], i instanceof Array)for (l = 0; i.length > l; ++l)a = i[l], r = e + "[" + l + "]", s = {}, s[r] = a, c += n(s) + "&"; else if (i instanceof Object)for (o in i)a = i[o], r = e + "[" + o + "]", s = {}, s[r] = a, c += n(s) + "&"; else void 0 !== i && null !== i && (c += encodeURIComponent(e) + "=" + encodeURIComponent(i) + "&")
        };
        e.defaults.transformRequest = [function (t) {
            return t && t.queryNode ? t : angular.isObject(t) && "[object File]" != t + "" ? n(t) : t
        }]
    }

    function r() {
        return {
            debugApi: !0,
            version: {"default": "2.0"},
            host: {
                nodeHost: "http://192.168.0.7:3082",
                nodeHostTest: "http://192.168.0.7:8878",
                phpHost: "http://dipan.so:8080",
                phpHostTest: "http://192.168.0.7:8889",
                appPath: "http://192.168.0.7:8080/Public/App/"
            },
            localSaveName: {
                downLoad: {
                    appJsPath: "appJsPath",
                    appCssPath: "appCssPath",
                    isFirstJs: "isFirstJs",
                    isFirstCss: "isFirstCss"
                },
                system: {trueUpdata: "trueUpdata"},
                user: {roundCodeId: "roundCodeId", isLogin: "isLogin", userData: "userData"},
                version: {key: "version"}
            },
            system: {timeoutUpData: 1e4}
        }
    }

    e.addEventListener("plusready", function () {
        t.config = r()
    }), angular.module("dipan", ["pasvaz.bindonce", "ui.router", "block"]).config(n), angular.module("dipan").factory("config", function () {
        return r()
    }), i.$inject = ["$httpProvider"], n.$inject = ["$stateProvider", "$urlRouterProvider"]
}(window, document), function () {
    "use strict";
    angular.module("block", [])
}(), function () {
    "use strict";
    function t(t, e, n, i, r, o, a) {
        function s() {
            function t() {
                o.go("login")
            }

            return localStorage.getItem("isLogin") ? !0 : (t(), !1)
        }

        t.$on("changeBody", function () {
            s(), e.$broadcast("openLoading");
            var l = "/" + o.current.name;
            n(function () {
                t.title = i.getTitle(l), t.showTab = i.showTab(l), t.tabList = i.tab(l), t.url = l, mui.plusReady(function () {
                    function t() {
                        e(), n()
                    }

                    function e() {
                        var t = o.current.name + "_scrollTop", e = parseInt(localStorage.getItem(t));
                        try {
                            document.body.scrollTop = e
                        } catch (n) {
                            try {
                                window.pageYOffset = e
                            } catch (n) {
                                document.documentElement.scrollTop = e
                            }
                        }
                    }

                    function n() {
                        function t() {
                            if (!i())return !1;
                            var t = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                            0 === t && a.alert({title: "请求最新数据"})
                        }

                        window.onscroll = function () {
                            t()
                        }
                    }

                    function i() {
                        switch (o.current.name) {
                            case"home":
                                return !0
                        }
                    }

                    t()
                }), r.init()
            }, 0)
        })
    }

    angular.module("dipan").controller("body", t), t.$inject = ["$scope", "$rootScope", "$timeout", "localData", "tap", "$state", "tools", "getList"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "C", replace: !1, link: function (t, e) {
                t.$watch("$viewContentLoaded", function () {
                    e[0].style.display = "block"
                })
            }
        }
    }

    angular.module("dipan").directive("angularEnd", t)
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/block/alert.block.alertUi.html",
            link: function () {
            }
        }
    }

    function e(t, e, n) {
        function i(e, i) {
            t.showAlertUi = !0, t.title = i.title, t.content = i.content, n(function () {
                t.alertUiClass = "hideThis", n(function () {
                    t.showAlertUi = !1, t.alertUiClass = "showThis"
                }, 800)
            }, 1e3)
        }

        t.alertUiClass = "showThis", t.showAlertUi = !1, t.title = "错误", t.content = "请重试", t.$on("alert", i)
    }

    angular.module("block").directive("alert", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            controller: e,
            templateUrl: window.tplPath + "directive/block/area.dipan.areaSelect.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e) {
        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody")
        })
    }

    angular.module("block").directive("area", t), e.$inject = ["$scope", "$rootScope", "$timeout", "tools"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/block/loading.dipan.loanding.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e, n) {
        t.loading = !0, t.$on("closeLoading", function () {
            n(function () {
                t.loading = !1
            }, 0)
        }), t.$on("openLoading", function () {
            n(function () {
                t.loading = !0
            }, 0)
        })
    }

    angular.module("block").directive("loading", t), e.$inject = ["$scope", "$rootScope", "$timeout"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            controller: e,
            templateUrl: window.tplPath + "directive/block/search.dipan.search.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e) {
        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody")
        })
    }

    angular.module("block").directive("search", t), e.$inject = ["$scope", "$rootScope", "$timeout", "tools"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            controller: e,
            templateUrl: window.tplPath + "directive/block/tab.block.tabNav.directive.html",
            link: function () {
            }
        }
    }

    function e() {
    }

    angular.module("block").directive("tab", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !0,
            controller: e,
            templateUrl: window.tplPath + "directive/block/top.block.topNav.html",
            link: function () {
            }
        }
    }

    function e() {
    }

    angular.module("block").directive("top", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData"]
}(), function () {
    "use strict";
    function home() {
        return {
            restrict: "A",
            replace: !0,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + "directive/home.dipan.home.directive.html",
            link: function () {
            }
        }
    }

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile, $state, getList) {
        function init() {
            _init(), plusInit(), bindLoadMoreClick()
        }

        function _init() {
            function t() {
                var t = "catchList_" + $state.current.name + "-" + tools.getToday();
                return tools.getLocalStorageObj(t)
            }

            function e() {
                return tools.getLocalStorageObj("starArr")
            }

            var n = e();
            n && n[0] && (getList.globalCatchList.starArr = n);
            var i = t();
            if (i && i[0]) {
                getList.pushToGoldCatcth(i), getList.giveFirstCatchList(t(), function (t) {
                    t = getList.editShowStar(t), $timeout(function () {
                        $scope.list.push(t), _bind(t, "list[0]"), $rootScope.$broadcast("closeLoading")
                    }, 0)
                }, "list[0]", $scope, !0);
                var r = $state.current.name + "_scrollTop";
                "0" === localStorage.getItem(r) && tools.alert({title: "请求NewData"})
            } else getList.getList($state.current.name, !1, !1, $scope, "list[0]", _bind)
        }

        function bindLoadMoreClick() {
            var t = document.getElementById("isWeb");
            try {
                console.log("binBtn", t), t.addEventListener("tap", function () {
                    downGetList(!0)
                })
            } catch (e) {
                console.log("binBtn", t), console.log("没找到isWebId")
            }
        }

        function plusInit() {
            mui.plusReady(function () {
                document.addEventListener("plusscrollbottom", function () {
                    downGetList()
                }, !1)
            })
        }

        function _bind(doc, listName) {
            function _getLastId(t) {
                var e = t.length - 1;
                return t[e]._id
            }

            function _bindTapIcon() {
                angular.forEach(eval("$scope." + listName), function (vo) {
                    function _getStartFromCatch(t) {
                        var e = "star";
                        star = tools.getLocalStorageObj(e), star || (star = []), $timeout(function () {
                            t()
                        }, 200)
                    }

                    function _saveStarArr(_id) {
                        getList.globalCatchList.starArr.push(_id);
                        var idDom = document.getElementById(_id);
                        idDom = angular.element(idDom);
                        var listName = idDom.attr("listName"), thisScope = eval("$scope." + listName);
                        angular.forEach(thisScope, function (t) {
                            t._id == _id && (delete t.$$hashKey, _getStartFromCatch(function () {
                                star.push(t);
                                var e = "star";
                                tools.saveLocalStorageObj(e, star)
                            }))
                        })
                    }

                    function _delStarArr(t) {
                        getList.delStarIdFromStarArr(t), _getStartFromCatch(function () {
                            var e = [];
                            angular.forEach(star, function (n) {
                                n._id !== t && e.push(n)
                            });
                            var n = "star";
                            tools.saveLocalStorageObj(n, e)
                        })
                    }

                    var idStr = "#" + vo._id;
                    $timeout(function () {
                        mui(idStr).on("tap", ".iconStar", function () {
                            "fa-star-o" == vo.iconStar ? $timeout(function () {
                                vo.iconStar = "fa-star", _saveStarArr(vo._id)
                            }, 0) : "fa-star" == vo.iconStar && $timeout(function () {
                                vo.iconStar = "fa-star-o", _delStarArr(vo._id)
                            }, 0)
                        })
                    }, 400)
                })
            }

            if ("down" == type && console.log("down", type), !firstId)try {
                firstId = doc[0]._id
            } catch (e) {
                console.log("error")
            }
            try {
                endId = _getLastId(doc)
            } catch (e) {
                console.log("error")
            }
            _bindTapIcon()
        }

        function downGetList() {
            return "star" == $state.current.name ? !1 : (type = "down", getList.getList($state.current.name, !1, endId, $scope, "list[" + $scope.list.length + "]", _bind), void 0)
        }

        function call(t) {
            $timeout(function () {
                console.log("re", t), plusInit()
            }, 0)
        }

        function err() {
            tools.alert({title: "网络请求失败", content: "请检查网络"})
        }

        function reForList(t, e) {
            angular.forEach(e, function (e) {
                e._id == t && ("fa-star-o" == e.iconStar ? $timeout(function () {
                    e.iconStar = "fa-star"
                }, 0) : "fa-star" == e.iconStar && $timeout(function () {
                    e.iconStar = "fa-star-o"
                }, 0))
            })
        }

        $scope.$watch("$viewContentLoading", function () {
            $rootScope.$broadcast("changeBody")
        }), $scope.urlName = $state.current.name, $scope.list = [];
        var endId, firstId, type = "up", star = [];
        init()
    }

    angular.module("block").directive("home", home), thisController.$inject = ["$scope", "$rootScope", "$timeout", "tools", "update", "config", "compile", "$state", "getList"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !1,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/login.dipan.login.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e, n, i, r, o, a) {
        function s() {
            f--, n(function () {
                t.codeText = f + "秒后重发"
            }, 0), 0 === f && (clearInterval(h), u = !1, f = 59, n(function () {
                t.codeClass = "btn-danger", t.codeText = "获取验证码"
            }, 0))
        }

        function l() {
            if (!t.tel)return r.alert({title: "手机必填"}), !1;
            if (!r.checkMobile(t.tel))return r.alert({title: "手机号格式不正确"}), !1;
            if (!u) {
                var e = localStorage.getItem(o.localSaveName.user.roundCodeId);
                r.postJsp(o.host.phpHost + "/Api/Sem/getCode/roundCodeId/" + e + "/mtNum/" + t.tel, {}, !0).then(function (t) {
                    r.alert({title: t})
                }), n(function () {
                    t.codeText = "60秒后重发"
                }, 0), t.codeClass = "btn-warning", u = !0, h = setInterval(s, 1e3)
            }
        }

        function c() {
            function e(t) {
                "S" == t.data.code ? (localStorage.setItem("isLogin", "true"), r.saveLocalStorageObj("userData", t.data.userData), a.go("home")) : n("登录失败")
            }

            function n() {
                r.alert({title: "登录失败"})
            }

            if (!t.tel || !t.code)return r.alert({title: "手机和验证码都必填"}), !1;
            if (r.checkMobile(t.tel)) {
                var i = o.host.phpHost + "/Api/loginIn";
                r.postJsp(i, {code: t.code, mtNum: t.tel}).then(e, n)
            } else r.alert({title: "手机号格式不正确"})
        }

        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody")
        }), setTimeout(function () {
            e.$broadcast("closeLoading")
        }, 0), t.formSub = c, t.getCode = l, t.codeText = "获取验证码", t.tel = !1, t.code = !1, t.codeClass = "btn-danger";
        var u, h, f = 59
    }

    angular.module("dipan").directive("login", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData", "tools", "config", "$state"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !1,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/master.dipan.masterIndex.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e) {
        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody")
        })
    }

    angular.module("dipan").directive("master", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData", "tools", "config", "$state"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !1,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/member/add.dipan.addFrom.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e, n, i) {
        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody"), setTimeout(function () {
                e.$broadcast("closeLoading")
            }, 0)
        }), t.form = {}, t.formSub = function () {
            t.form.title += "&|";
            var e = "http://192.168.0.56:3082/sns/addOneArticle";
            i.postJsp(e, t.form).then(function () {
                i.alert({title: "添加成功"})
            }, function (t) {
                i.alert({title: "添加失败", content: t})
            })
        }
    }

    angular.module("dipan").directive("add", t), e.$inject = ["$scope", "$rootScope", "$timeout", "tools"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A", replace: !1, scope: {}, controller: e, link: function () {
            }
        }
    }

    function e(t, e) {
        var n = ["isLogin", "userData"];
        angular.forEach(n, function (t) {
            localStorage.removeItem(t)
        }), e(function () {
            t.go("login")
        }, 0)
    }

    angular.module("dipan").directive("loginOut", t), e.$inject = ["$state", "$timeout"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !1,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/member/my.dipan.myIndexNav.html",
            link: function () {
            }
        }
    }

    function e(t, e, n, i, r, o) {
        function a() {
            function t(t) {
                "S" == t.data.code && (o.saveLocalStorageObj("userData", t.data.userData), n(function () {
                    e.$broadcast("changeBody"), e.$broadcast("closeLoading")
                }, 200))
            }

            var i = r.host.nodeHost + "/member/getUserData", a = o.getLocalStorageObj("userData");
            n(function () {
                a = a.uid, o.postJsp(i, {uid: a}, !0).then(t, function () {
                })
            }, 0)
        }

        mui.plusReady(function () {
            mui.previewImage()
        }), t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody"), n(function () {
                a()
            }, 400)
        }), t.listNav = i.memberIndexNav, t.listNav && n(function () {
            e.$broadcast("closeLoading")
        }, 0)
    }

    angular.module("dipan").directive("my", t), e.$inject = ["$scope", "$rootScope", "$timeout", "localData", "config", "tools"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A",
            replace: !1,
            scope: {},
            controller: e,
            templateUrl: window.tplPath + "directive/member/setting.dipan.setting.directive.html",
            link: function () {
            }
        }
    }

    function e(t, e, n, i, r, o) {
        t.$watch("$viewContentLoading", function () {
            e.$broadcast("changeBody"), setTimeout(function () {
                e.$broadcast("closeLoading")
            }, 0)
        }), t.listNav = r.setting, t.version = o.version.default, t.listNav && n(function () {
            e.$broadcast("closeLoading")
        }, 0)
    }

    angular.module("dipan").directive("setting", t), e.$inject = ["$scope", "$rootScope", "$timeout", "tools", "localData", "config"]
}(), function () {
    "use strict";
    function t() {
        return {
            restrict: "A", replace: !1, scope: {}, controller: e, link: function (t, e, n) {
                t.data = JSON.parse(n.urlParse)
            }
        }
    }

    function e(t, e, i, r, o) {
        i(function () {
            r.data = t.data, t.data.queryNode = !0, o("saveSession", t.data, n), e.$broadcast("urlParseChange"), o("findSessionContent", t.data.session, function () {
            })
        }, 0)
    }

    function n() {
    }

    angular.module("dipan").directive("urlParse", t), e.$inject = ["$scope", "$rootScope", "$timeout", "urlParse", "api"]
}(), function () {
    "use strict";
    function t(t) {
        return function (e) {
            return t.trustAsHtml(e)
        }
    }

    angular.module("dipan").filter("toHtml", t), t.$inject = ["$sce"]
}(), function () {
    "use strict";
    function t(t, e) {
        var n;
        return n
    }

    angular.module("dipan").factory("api", t), t.$inject = ["$http", "$q", "config"]
}(), function () {
    "use strict";
    function t(t) {
        function e(e, n, i, r) {
            try {
                var o = document.getElementById(e);
                o = angular.element(o);
                var a = document.getElementById(n);
                a = angular.element(a);
                var s = a[0];
                r ? s = n : a.html("");
                var l = t(s)(i);
                o.append(l)
            } catch (c) {
                console.error(c)
            }
        }

        return e
    }

    angular.module("dipan").factory("compile", t), t.$inject = ["$compile"]
}(), function () {
    "use strict";
    function getList(t, e, n, i, r, o, a) {
        return thisObj.globalCatchList = {
            home: [],
            need: [],
            starArr: []
        }, thisObj.pushToGoldCatcth = pushToGoldCatcth, thisObj.delGoldCatcth = delGoldCatcth, thisObj.saveCatecNewList = saveCatecNewList, thisObj.delStarIdFromStarArr = delStarIdFromStarArr, thisObj.editShowStar = editShowStar, thisObj.getList = _getList, thisObj.giveFirstCatchList = _addNewListToOldList, thisObj._init = function () {
            _tools = t, _config = e, _timeout = n, _compile = i, _state = r, _rootScope = o, _filter = a
        }, thisObj._init(), thisObj
    }

    function _getList(name, frontId, endId, scope, listNam, callBack) {
        function _getCatchList(t) {
            switch (_state.current.name) {
                case"star":
                    _logicStar(t);
                    break;
                default:
                    _logicHome(t)
            }
        }

        function _logicStar(t) {
            var e = _tools.getLocalStorageObj("star");
            if (!e || !e[0])return _tools.alert({title: "没有标记过的信息"}), _rootScope.$broadcast("closeLoading"), void 0;
            var n = {doc: e};
            _rootScope.$broadcast("closeLoading"), t(n)
        }

        function _logicHome(t) {
            delDataReturnThisData(), t("", !0)
        }

        function call(re) {
            _addNewListToOldList(re.doc, function (reList) {
                return reList = editShowStar(reList), re.doc || re.doc[0] ? (callSucessCount = 0, _timeout(function () {
                    eval("scope." + listNam + "= reList"), callBack(reList, listNam)
                }, 0), void 0) : (callSucessCount++, setTimeout(function () {
                    callSucessCount > 1 && _tools.alert({title: "没有更多数据啦! ^_^"})
                }, 0), !1)
            }, listNam, scope)
        }

        function err() {
            _tools.alert({title: "网络请求失败", content: "请检查网络"})
        }

        function saveLocalObjEdit(t) {
            var e = [], n = 0;
            return angular.forEach(t, function (i) {
                n++, 20 > t.length ? e.push(i) : (1 == type && 20 > n && e.push(i), 2 == type && n > t.length - 20 && e.push(i))
            }), e
        }

        function delDataReturnThisData() {
            function t() {
                e()
            }

            function e() {
                function t(t) {
                    var e = t.split("_");
                    if ("catchList" == e[0]) {
                        var n = t.split("-"), i = _tools.getToday();
                        n[1] !== i && localStorage.removeItem(t)
                    }
                }

                angular.forEach(n, function (e) {
                    t(e)
                })
            }

            var n = _tools.getAllCatchListName();
            t()
        }

        var url, type = 1;
        switch (name) {
            case"memberIndex":
                url = "http://192.168.18.13:8080/homeListOne.json?" + _tools.getRoundCode(8);
                break;
            case"home":
                url = _config.host.nodeHost + "/sns/getList?" + _tools.getRoundCode(8);
                break;
            case"need":
                url = "http://192.168.18.15:3082/sns/getList?" + _tools.getRoundCode(8);
                break;
            case"star":
                url = !0;
                break;
            case"login":
                url = "http://192.168.18.13:8080/homeListOne.json?" + _tools.getRoundCode(8);
                break;
            case"area":
                url = "http://192.168.18.13:8080/homeListOne.json?" + _tools.getRoundCode(8);
                break;
            case"search":
                url = "http://192.168.18.13:8080/homeListOne.json?" + _tools.getRoundCode(8);
                break;
            default:
                return !1
        }
        if (url) {
            var _frontId = 0;
            frontId && (_frontId = frontId);
            var _endId = 0;
            endId && (_endId = endId, type = 2);
            var postData = {frontId: _frontId, endId: _endId};
            _getCatchList(function (t, e) {
                e ? _tools.postJsp(url, postData).then(call, err) : call(t)
            })
        }
    }

    function _addNewListToOldList(t, e, n, i, r) {
        var o = "";
        o += '        <li id="repListLi"  class="mui-table-view-cell item" url="content#{{vo.id}}" bindonce bo-attr ng-repeat=""', o += '            style="background-color: #fff;margin-top: 10px">', o += '            <div class="clear">', o += '                <div class="left listHeader">', o += '                    <img bo-src="vo.listHeader"/>', o += "                </div>", o += '                <div class="left listTitle">', o += '                    <span bo-text="vo.title"></span>', o += "                </div>", o += "            </div>", o += '            <div class="mui-navigate-right" style="font-size:14px;color: #777;margin-top: 5px" bindonce', o += '                 ng-repeat="(key,vo2) in vo.content">', o += '                <span style="color:#bd0000" bo-text="key + \':\'"></span>', o += '                <span bo-text="vo2"></span>', o += "            </div>", o += "", o += '            <div class="panle">', o += '                <div class="mui-btn fa fa-weixin fa-1x icon-btn"></div>', o += '                <div class="mui-btn fa  fa-1x icon-btn-noBack iconStar" ng-class="vo.iconStar" bo-attr', o += '                     bo-attr-iconId="vo._id"></div>', o += "            </div>", o += "        </li>";
        var a = angular.element(o);
        a.attr("ng-repeat", "vo in " + n), a.attr("listName", n), a.attr("bo-id", "vo._id"), _compile("list", a[0], i, !0), r || pushToGoldCatcth(t), e(t)
    }

    function saveCatecNewList() {
        var t, e = _state.current.name;
        switch (e) {
            case"home":
                t = thisObj.globalCatchList.home;
                break;
            case"need":
                t = thisObj.globalCatchList.need;
                break;
            case"star":
                _tools.saveLocalStorageObj("starArr", thisObj.globalCatchList.starArr)
        }
        if (!t)return !1;
        var n = [], i = "catchList_" + _state.current.name + "-" + _tools.getToday(), r = 0;
        angular.forEach(t, function (t) {
            angular.forEach(t, function (t) {
                r++;
                try {
                    t.iconStar = "fa-star-o", delete t.$$hashKey
                } catch (e) {
                    console.error("删除hashKey失败")
                }
                return 30 > r ? (n.push(t), void 0) : !1
            })
        }), _tools.saveLocalStorageObj(i, n), _tools.saveLocalStorageObj("starArr", thisObj.globalCatchList.starArr), delGoldCatcth()
    }

    function pushToGoldCatcth(t) {
        var e = _state.current.name;
        switch (e) {
            case"home":
                thisObj.globalCatchList.home.push(t);
                break;
            case"need":
                thisObj.globalCatchList.need.push(t)
        }
    }

    function delGoldCatcth() {
        var t = _state.current.name;
        switch (t) {
            case"home":
                thisObj.globalCatchList.home = [], thisObj.globalCatchList.starArr = [];
                break;
            case"need":
                thisObj.globalCatchList.need = [], thisObj.globalCatchList.starArr = [];
                break;
            case"star":
                thisObj.globalCatchList.starArr = []
        }
    }

    function saveStarArrToGoldCatch(t) {
        thisObj.globalCatchList.starArr.push(t)
    }

    function delStarIdFromStarArr(t) {
        var e = [];
        angular.forEach(thisObj.globalCatchList.starArr, function (n) {
            n != t && e.push(n)
        }), thisObj.globalCatchList.starArr = e
    }

    function editShowStar(t) {
        function e(t) {
            var e = thisObj.globalCatchList.starArr.indexOf(t._id);
            return -1 !== e && (t.iconStar = "fa-star"), t
        }

        var n = [];
        return angular.forEach(t, function (t) {
            t = e(t), n.push(t)
        }), n
    }

    angular.module("dipan").factory("getList", getList), getList.$inject = ["tools", "config", "$timeout", "compile", "$state", "$rootScope", "$filter"];
    var thisObj = {}, _tools, _config, _timeout, _compile, _state, _rootScope, _filter, callSucessCount = 0
}(), function () {
    "use strict";
    function t(t, p, m, v, g) {
        return c = m, l = t, f.memberIndexNav = n(), f.setting = i(), f.tab = o, f.showTab = r, f.getTitle = e, f.giveRoundCode = s, f.gps = {isHaveGps: !1}, f._init = function () {
            d = p, u = v, h = g, f.giveRoundCode(), a()
        }, f._init(), f
    }

    function e(t) {
        function e() {
            var t = d.getLocalStorageObj("userData");
            try {
                var e = "";
                return t.headerImg && (e += '<img class="hImg" src="' + t.headerImg + '" /> &nbsp;'), t.mt && (e += t.mt), h("toHtml")(e)
            } catch (n) {
                return "我的"
            }
        }

        switch (t) {
            case"/memberIndex":
                return e();
            case"/home":
                return h("toHtml")("天津武清河西务唐庄村");
            case"/need":
                return h("toHtml")("天津武清河西务唐庄村");
            case"/star":
                return h("toHtml")("标记");
            case"/login":
                return h("toHtml")("地盘");
            case"/area":
                return h("toHtml")("地区选择");
            case"/search":
                return h("toHtml")("搜索");
            case"/setting":
                return h("toHtml")("设置");
            default:
                return h("toHtml")("地盘 dipan.so")
        }
    }

    function n() {
        return [{
            name: "我的地盘",
            url: "myArea",
            id: 1,
            hrefId: "hrefMemberMyArea",
            icon: "fa fa-map-marker fa-1x"
        }, {name: "我的发布", url: "push", id: 2, hrefId: "hrefMemberPush", icon: "fa fa-sign-out fa-1x"}, {
            name: "设置",
            url: "setting",
            hrefId: "hrefMemberSetting",
            id: 3,
            icon: "fa fa-sign-out fa-1x"
        }]
    }

    function i() {
        return [{
            name: "退出登录",
            url: "loginOut",
            id: 1,
            hrefId: "hrefMemberLoginOut",
            icon: "fa fa-sign-out fa-1x"
        }, {
            name: "测试snsArticle添加",
            url: "member_addArticle",
            hrefId: "hrefMemberAddArticle",
            id: 2,
            icon: "fa fa-sign-out fa-1x"
        }]
    }

    function r(t) {
        switch (t) {
            case"/home":
                return !0;
            case"/need":
                return !0;
            case"/star":
                return !0;
            case"/memberIndex":
                return !0;
            default:
                return !1
        }
    }

    function o(t) {
        function n(t) {
            var e = d.getLocalStorageObj("userData");
            if (e[t]) {
                var n = '<i style="font-size: 12px">' + e[t] + "</i>";
                return e[t + "_height"] && (n += '<i class="fa fa-ellipsis-h fa-2x" style="width: 7px;overflow-x: hidden;color:#bd0000;position:absolute;margin-left:-1px;margin-top:-7px;"></i>'), n
            }
            return ""
        }

        var i = [], r = e(), o = {colNumCss: "twoTab", thisItem: "thisItem", name: r, route: t};
        switch (t) {
            case"/home":
                return i = [{
                    colNumCss: "fourTab",
                    thisItem: o.thisItem,
                    name: "供",
                    route: "hrefTabHome",
                    stateName: "home"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: "需",
                    route: "hrefTabNeed",
                    stateName: "need"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: '<i class="fa fa-ellipsis-h"></i>',
                    route: "hrefTabmemberIndex",
                    stateName: "memberIndex"
                }, {colNumCss: "fourTab", thisItem: !1, name: "标记", route: "hrefTabStar", stateName: "star"}];
            case"/need":
                return i = [{
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: "供",
                    route: "hrefTabHome",
                    stateName: "home"
                }, {
                    colNumCss: "fourTab",
                    thisItem: "thisItem",
                    name: "需",
                    route: "hrefTabNeed",
                    stateName: "need"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: '<i class="fa fa-ellipsis-h"></i>',
                    route: "hrefTabMemberIndex",
                    stateName: "memberIndex"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: '<i class="fa fa-star-o"></i>',
                    route: "hrefTabStar",
                    stateName: "star"
                }];
            case"/star":
                return i = [{
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: "供",
                    route: "hrefTabHome",
                    stateName: "home"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: "需",
                    route: "hrefTabNeed",
                    stateName: "need"
                }, {
                    colNumCss: "fourTab",
                    thisItem: !1,
                    name: '<i class="fa fa-ellipsis-h"></i>',
                    route: "hrefTabMemberIndex",
                    stateName: "memberIndex"
                }, {
                    colNumCss: "fourTab",
                    thisItem: "thisItem",
                    name: '<i class="fa fa-star-o"></i>',
                    route: "hrefTabStar",
                    stateName: "star"
                }];
            case"/memberIndex":
                return i = [{
                    colNumCss: "threeTab",
                    thisItem: !1,
                    name: "粉丝 " + n("fensi"),
                    route: "hrefTabFensi",
                    stateName: "fensi"
                }, {
                    colNumCss: "threeTab",
                    thisItem: !1,
                    name: "关注 " + n("guanzhu"),
                    route: "hrefTabGuanZhu",
                    stateName: "guanzhu"
                }, {
                    colNumCss: "threeTab",
                    thisItem: !1,
                    name: "联系 " + n("lianxi"),
                    route: "hrefTabLianXi",
                    stateName: "lianxi"
                }];
            case"/login":
                return i = [{
                    colNumCss: o.colNumCss,
                    thisItem: o.thisItem,
                    name: "登录",
                    route: "login"
                }, {colNumCss: o.colNumCss, thisItem: !1, name: "设置", route: "memberIndex"}];
            default:
                return []
        }
    }

    function a() {
        function t() {
            function t(t) {
                d.alert({title: t.ip})
            }

            function e() {
            }

            var n = u.host.phpHost + "/Api/Jsonp/getIP/from/web";
            d.getJsp(n, !0).then(t, e)
        }

        function e() {
            function t() {
                window.plus && setTimeout(function () {
                    plus.geolocation.getCurrentPosition(e, n, i)
                }, 0)
            }

            function e(t) {
                r.lat = t.coords.latitude, r.lng = t.coords.longitude, d.alert({title: "title" + r.lat, content: r.lng})
            }

            function n(t) {
                console.log(t), d.alert({title: "获取位置失败", content: t.message})
            }

            function i() {
                return {enableHightAccuracy: !1, timeout: 1e4, maximumAge: 6e5}
            }

            var r = {};
            window.plus ? t() : document.addEventListener("plusready", t, !1)
        }

        d.trueWeb(t, e)
    }

    function s() {
        localStorage.removeItem(u.localSaveName.user.roundCodeId), setTimeout(function () {
            var t = d.getRoundCode(8);
            localStorage.setItem(u.localSaveName.user.roundCodeId, t)
        }, 200)
    }

    angular.module("dipan").factory("localData", t), t.$inject = ["$location", "tools", "$rootScope", "config", "$filter"];
    var l, c, u, h, f = {}, d = {}
}(), function () {
    "use strict";
    function t(t, e, n) {
        function i(t) {
            function e() {
                window.plus && setTimeout(function () {
                    t()
                }, 0)
            }

            window.plus ? e() : document.addEventListener("plusready", e, !1)
        }

        function r() {
            function t() {
                angular.forEach(l, function (t) {
                    var e = a(t);
                    if (e) {
                        var n = angular.element(e), i = n.attr("url");
                        o(e, i)
                    }
                })
            }

            e.trueWeb(t, function () {
                i(t)
            })
        }

        function o(i, r) {
            function o() {
                var e = t.current.name, n = e + "_scrollTop", i = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                localStorage.removeItem(n), localStorage.setItem(n, i)
            }

            function a() {
                n.saveCatecNewList()
            }

            var s = "tap";
            e.trueWeb(function () {
                s = "click"
            }, function () {
            }), i.addEventListener(s, function () {
                switch (t.current.name) {
                    case"home":
                        a();
                        break;
                    case"need":
                        a();
                        break;
                    case"star":
                        a()
                }
                o(), "goHistory" == r ? history.go(-1) : t.go(r)
            })
        }

        function a(t) {
            if (t && -1 == c.indexOf(t)) {
                var e = document.getElementById(t);
                if (e)return -1 == u.indexOf(t) && c.push(t), e
            }
        }

        var s = {init: r}, l = ["goHistory", "hrefArea", "hrefSearch", "hrefHome", "hrefTabHome", "hrefTabNeed", "hrefTabStar", "hrefMaster", "hrefMember", "hrefMemberAddArticle", "login", "hrefMemberLoginOut", "hrefMemberSetting"], c = [], u = ["hrefTabHome", "hrefTabNeed", "hrefTabStar", "hrefMemberAddArticle", "hrefMemberLoginOut", "hrefMemberSetting"];
        return s
    }

    angular.module("dipan").factory("tap", t), t.$inject = ["$state", "tools", "getList"]
}(), function (t) {
    "use strict";
    function e(e, n, i, r, o, a) {
        function s(t) {
            var e = document.getElementById("otherData");
            e && (e = angular.element(e), setTimeout(function () {
                e = e.attr("data"), e = JSON.parse(e), t(e)
            }, 0))
        }

        function l(t) {
            return t ? !0 : !1
        }

        function c(t) {
            return /^1[3|4|5|7|8][0-9]\d{4,8}$/.test(t) ? !0 : !1
        }

        function u(t, e) {
            Array.prototype.remove || (Array.prototype.remove = function (t, e) {
                var n = this.slice((e || t) + 1 || this.length);
                return this.length = 0 > t ? this.length + t : t, this.push.apply(this, n)
            }), t.remove(e), delete Array.prototype.remove
        }

        function h(t, r) {
            function o(t) {
                var o = i.defer();
                return e({url: t, method: "GET", timeout: 1e4}).success(function (t) {
                    r || n.$broadcast("closeLoading"), o.resolve(t)
                }).error(function (t) {
                    r || n.$broadcast("closeLoading"), o.reject(t), x.alert({title: "网络请求失败", content: "请检查网络设置"})
                }), o.promise
            }

            return r || n.$broadcast("openLoading"), o(t)
        }

        function f(t, r, o) {
            function s(t, r, c) {
                var u = i.defer();
                return e({url: t, method: "POST", data: r, timeout: 1e4}).success(function (t) {
                    function e(e) {
                        a.debugApi && !c ? t.complete ? s(l, r, !0) : e() : e()
                    }

                    function i() {
                        o || n.$broadcast("closeLoading"), u.resolve(t)
                    }

                    e(i)
                }).error(function (t) {
                    o || n.$broadcast("closeLoading"), u.reject(t), x.alert({title: "网络请求失败", content: "请检查网络设置"})
                }), u.promise
            }

            var l = t;
            if (a.debugApi) {
                var c = y(t), u = "http://" + c.host + ":" + c.port;
                u == a.host.nodeHost ? t = a.host.nodeHostTest + c.path : u == a.host.phpHost && (t = a.host.phpHostTest + c.path + c.query)
            }
            o || n.$broadcast("openLoading");
            var h = {};
            for (var f in r)h[f] = r[f];
            return s(t, h)
        }

        function d(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }

        function p(t) {
            r.alert(t)
        }

        function m(e, n) {
            setTimeout(function () {
                t.trueWeb() ? e() : n()
            }, 0)
        }

        function v(t, e) {
            localStorage.removeItem(t), setTimeout(function () {
                var n = JSON.stringify(e);
                localStorage.setItem(t, n)
            }, 200)
        }

        function g(t) {
            var e = localStorage.getItem(t);
            if ("undefined" !== e) {
                var n = JSON.parse(e);
                return n
            }
        }

        function b() {
            var t = [];
            return angular.forEach(localStorage, function (e, n) {
                t.push(n)
            }), t
        }

        function $(t) {
            for (var e = "", n = 0; t > n; n++)e += Math.floor(10 * Math.random());
            return e
        }

        function w() {
            var t = new Date;
            return o("date")(t, "yyyy_MM_dd")
        }

        function y(t) {
            var e = document.createElement("a");
            return e.href = t, {
                source: t,
                protocol: e.protocol.replace(":", ""),
                host: e.hostname,
                port: e.port,
                query: e.search,
                params: function () {
                    for (var t, n = {}, i = e.search.replace(/^\?/, "").split("&"), r = i.length, o = 0; r > o; o++)i[o] && (t = i[o].split("="), n[t[0]] = t[1]);
                    return n
                }(),
                hash: e.hash.replace("#", ""),
                path: e.pathname.replace(/^([^\/])/, "/$1")
            }
        }

        var x;
        return x = {
            otherData: s,
            isEmpty: l,
            checkMobile: c,
            arrDel: u,
            getJsp: h,
            postJsp: f,
            isFunction: d,
            alert: p,
            trueWeb: m,
            saveLocalStorageObj: v,
            getLocalStorageObj: g,
            getAllCatchListName: b,
            getRoundCode: $,
            getToday: w,
            parseUrl: y
        }
    }

    angular.module("dipan").factory("tools", e), e.$inject = ["$http", "$rootScope", "$q", "ui", "$filter", "config"]
}(window), function () {
    "use strict";
    function t() {
    }

    angular.module("dipan").factory("touchScroll", t), t.$inject = ["$rootScope"]
}(), function () {
    "use strict";
    function t(t) {
        function e(e) {
            t.$broadcast("alert", e)
        }

        var n = {};
        return n.alert = e, n
    }

    angular.module("dipan").factory("ui", t), t.$inject = ["$rootScope"]
}(),function () {
    "use strict";
    function t(t, i, l) {
        function c() {
            window.plus && setTimeout(function () {
                e()
            }, t.system.timeoutUpData)
        }

        var u = {};
        u.trueUpdata = n, u.init = e, r = u, o = t, a = l, s = i, window.plus ? c() : document.addEventListener("plusready", c, !1)
    }

    function e() {
        n().then(i, function (t) {
            a.alert({title: "升级失败", content: t})
        })
    }

    function n() {
        function t(t, e) {
            var n = o.host.nodeHost + "/version?" + new Date;
            a.postJsp(n, {}, !0).then(function (e) {
                t(e)
            }, function (t) {
                e(t), console.log("err", "请求version接口失败")
            })
        }

        var e = s.defer(), n = localStorage.getItem(o.localSaveName.version.key);
        return n || (localStorage.setItem(o.localSaveName.version.key, o.version.default), e.reject("第一次运行,写入版本号")), n && t(function (t) {
            try {
                parseFloat(n) < parseFloat(t.version) ? e.resolve(t.version) : e.reject("无需升级")
            } catch (i) {
                return console.error("请求版本失败(callBack方法中)"), e.reject("写入版本号请求版本失败(callBack方法中)")
            }
        }, function (t) {
            return e.reject(t)
        }), e.promise
    }

    function i(t) {
        a.alert({title: "打开updataWebView", content: t + "号"}), plus.webview.create("updata.html", "", "", {verison: t})
    }

    angular.module("dipan").factory("update", t), t.$inject = ["config", "$q", "tools"];
    var r, o, a, s
}(),function () {
    "use strict";
    function t(t, r) {
        function o() {
            t.$on("urlParseChange", function () {
                t.$broadcast("urlParseChangeSub")
            })
        }

        return e = r, o(), {data: i, fun: n}
    }

    angular.module("dipan").factory("urlParse", t), t.$inject = ["$rootScope", "api"];
    var e, n = {}, i = {};
    n.getTopArea = function (t) {
        var e;
        try {
            switch (t.place.type) {
                case 1:
                    e = t.place.thisCityInfo.name;
                    break;
                case 2:
                    e = t.place.oneCityInfo.name + t.place.thisCityInfo.name;
                    break;
                case 3:
                    e = t.place.oneCityInfo.name + t.place.twoCityInfo.name + t.place.thisCityInfo.name;
                    break;
                default:
                    e = "地盘网"
            }
            return e
        } catch (n) {
            return "地盘网"
        }
    }, n.selectHotCity = function (t) {
        e("selectHotCity", {}, function (e) {
            t(e)
        }, function (t) {
            console.error(t)
        })
    }
}(),angular.module("dipan").run(["$templateCache", function (t) {
    "use strict";
    t.put("directive/block/alert.block.alertUi.html", '<div id="alertUi" ng-if="showAlertUi">\n    <div style="width: 100%;height: 100%;" ng-class="alertUiClass">\n        <div class="left" style="margin-left: 30px;width:50px;overflow: hidden">\n            <i class="fa fa-ban fa-3x" style="color: #f4f4f4;margin-top: 7px"></i>\n        </div>\n        <div class="left" style="width:60%;overflow: hidden">\n            <div class="clear" style="margin-left: 20px;font-size: 1.2em;margin-top: 10px ">{{title}}</div>\n            <div class="clear" style="margin-left: 20px;font-size: 0.9em;margin-top: 3px;color: #777;height: 20px;overflow: hidden ">{{content}}</div> </div>\n    </div>\n</div>'), t.put("directive/block/area.dipan.areaSelect.directive.html", '<div class="clear viewContent">\n    <div class="title">area</div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'), t.put("directive/block/loading.dipan.loanding.directive.html", '<i ng-show="loading"  class="fa fa-spinner fa-spin fa-3x fa-fw loading"></i>'), t.put("directive/block/search.dipan.search.directive.html", '<div class="clear viewContent">\n    <div class="title">search</div>\n</div>\n\n'), t.put("directive/block/tab.block.tabNav.directive.html", '<div id="tab" class="clear" style="">\n    <div id="{{vo.route}}" url="{{vo.stateName}}" ng-class="vo.colNumCss" class="linkMouse" ng-repeat="vo in tabList">\n        <span ng-class="vo.thisItem" class="btn" ng-bind-html="vo.name|toHtml"></span>\n    </div>\n</div>'), t.put("directive/block/top.block.topNav.html", '<header class="mui-bar mui-bar-nav">\n    <i ng-show="url !== \'/login\'" ng-if="url !== \'/home\'" onclick="history.go(-1);" id="goHistory" url="goHistory"\n       class="fa fa-angle-left linkMouse  mui-pull-left mui-btn icon-btn"></i>\n    <i ng-show="url == \'/home\'" id="hrefArea" url="area"\n       class="fa fa-location-arrow  mui-pull-left mui-btn icon-btn linkMouse"></i>\n    <i ng-show="(url != \'/login\') && (url != \'/memberIndex\') && (url != \'/setting\')" id="hrefSearch" url="search"\n       class="fa fa-search fa-1  mui-pull-right mui-icon icon-btn"\n       style="padding-right: 17px;padding-top: 13px;"></i>\n    <i ng-show="(url == \'/memberIndex\')" id="editMemberInfo" url="editMemberInfo"\n       class="fa fa-pencil-square-o fa-1x  mui-pull-right mui-icon icon-btn"\n       style="padding-right: 17px;padding-top: 13px;"></i>\n\n    <h1 class="mui-title" ng-bind-html="title"></h1>\n</header>\n'), t.put("directive/home.dipan.home.directive.html", '<div class="clear viewContent" style="background-color: #777;margin-top: 44px">\n    <style>\n        .mui-navigate-right:after, .mui-push-right:after {\n            right: 0px;\n            content: \'\';\n        }\n\n        .mui-table-view-chevron .mui-table-view-cell {\n            padding-right: 30px;\n        }\n\n    </style>\n    <div class="titleInfo clear" ng-show="false">\n        <div id="titleInfo">\n            <i class="fa fa-user"></i>\n            刚刚有{{peopleNum}}3人访问了你\n        </div>\n    </div>\n\n\n    <div id="list" class="mui-table-view mui-table-view-chevron clear" style="background-color:#777;margin-top: 10px">\n    </div>\n    <div class="mui-btn" ng-show="urlName != \'star\'" id="isWeb"\n         style="width:140px;left: 50%;margin-left: -70px;margin-top: 20px;margin-bottom: 20px">加载更多...\n    </div>\n    <div class="mui-btn" ng-show="urlName == \'star\'" id="isStar"\n         style="width:140px;left: 50%;margin-left: -70px;margin-top: 20px;margin-bottom: 20px;background-color: #bd0000">\n        清空标记\n    </div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'), t.put("directive/login.dipan.login.directive.html", '<div class="scrollable-content section viewContent">\n    <style>\n        .btn-danger {\n            background-color: #bd0000;\n            border-color: #bd0000;\n        }\n\n        .has-success .form-control:focus {\n            border-color: #000000;\n            -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #aeafb1;\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #a8a6b1;\n        }\n\n        .has-success .form-control {\n            border-color: #000000;\n            -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n        }\n\n        fieldset {\n            border: 0px;\n        }\n    </style>\n\n\n    <div id="loginLogo"></div>\n\n\n    <form name="myForm" id="myForm" novalidate>\n        <fieldset>\n            <div class="form-group has-success has-feedback ">\n                <input type="number" name="tel" required ng-model="tel"\n                       class="form-control"\n                       placeholder="手机号">\n            </div>\n            <div class="clearThis"></div>\n            <div class="form-group has-success has-feedback left" style="width:60%">\n                <input type="number" ng-model="code" class="form-control " placeholder="验证码">\n            </div>\n            <div class="mui-btn right" ng-class="codeClass" ng-click="getCode()"\n                 style="width:38%;background-color: #f4f4f4;border-color:#000;color:#000;font-size: 17px ">\n                {{codeText}}\n            </div>\n            <div class="clear"></div>\n            <button style="width:100%;color:#fff;font-size: 17px;font-weight: bold" ng-click="formSub()"\n                    class="btn btn-danger btn-block btn-lg">\n                登录\n            </button>\n        </fieldset>\n    </form>\n</div>\n'), t.put("directive/master/master.dipan.masterIndex.directive.html", "masterDireicet"), t.put("directive/member/add.dipan.addFrom.directive.html", '<div class="clear viewContent" style="margin-top: 44px">\n    <div class="mui-table-view mui-table-view-chevron clear" style="margin-top: 10px">\n        <form name="addFrom" id="myAddForm" novalidate>\n            <fieldset>\n                <div class="form-group ">\n                    <input type="text" name="title" required ng-model="form.title"\n                           class="form-control"\n                           placeholder="标题">\n                </div>\n                <div class="form-group ">\n                    <textarea type="text" name="content" required ng-model="form.content"\n                              class="form-control"\n                              placeholder="内容"></textarea>\n                </div>\n                <div class="clearThis"></div>\n                <div class="clear"></div>\n                <button style="width:100%;font-size: 17px;font-weight: bold" ng-click="formSub()"\n                        class="btn btn-danger btn-block btn-lg">\n                    提交\n                </button>\n            </fieldset>\n\n        </form>\n    </div>\n</div>\n'), t.put("directive/member/my.dipan.myIndexNav.html", '<div class="clear viewContent" style="text-align: center ;margin-top: 130px">\n\n    <div id="myArea">\n        <img src="http://pic.qqtn.com/up/2016-9/2016091415331175622.jpg" data-preview-src="http://pic.qqtn.com/up/2016-9/2016091415331175622.jpg" data-preview-group="1"/>\n        <img src="http://pic.qqtn.com/up/2016-9/2016091415331175622.jpg" data-preview-src="http://pic.qqtn.com/up/2016-9/2016091415331175622.jpg" data-preview-group="1"/>\n    </div>\n\n\n    <ul id="{{vo.hrefId}}" url="{{vo.url}}" class="mui-table-view mui-table-view-chevron" style="text-align: left"\n        bindonce ng-repeat="vo in listNav">\n        <div class="mui-table-view-cell linkMouse clear"\n             style="padding-right: 26px;height: 50px;padding-top: 16px;">\n            <i class="{{vo.icon}} pull-left" style="color:#888;margin-top: 3px"></i>\n            <i class="fa fa-chevron-right pull-right"></i>\n            <span style="font-size: 1.4em;margin-left: 20px">{{vo.name}}</span>\n        </div>\n    </ul>\n    <div class="clear" style="margin-top: 40px"></div>\n</div>\n'), t.put("directive/member/setting.dipan.setting.directive.html", '<div class="clear viewContent" style="text-align: center ;margin-top: 130px">\n    <ul id="{{vo.hrefId}}" url="{{vo.url}}" class="mui-table-view mui-table-view-chevron" style="text-align: left"\n        bindonce ng-repeat="vo in listNav">\n        <div class="mui-table-view-cell linkMouse clear"\n             style="padding-right: 26px;height: 50px;padding-top: 16px;">\n            <i class="{{vo.icon}} pull-left" style="color:#888;margin-top: 3px"></i>\n            <i class="fa fa-chevron-right pull-right"></i>\n            <span style="font-size: 1.4em;margin-left: 20px">{{vo.name}}</span>\n        </div>\n    </ul>\n    <div class="clear" style="margin-top: 40px"></div>\n    <div class="clear" style="font-size: 12px">当前版本:<span style="color: #bd0000">{{version}}</span></div>\n</div>\n'), t.put("index.html", '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="utf-8"/>\n    <title>地盘 dipan.so</title>\n    <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="black">\n\n    <script>\n\n        (function (window) {\n            //判断web 还是 app\n            window.trueWeb = trueWeb;\n            function trueWeb() {\n                var url = window.location.href;\n                url = url.split(\':\');\n                if (url[0] === \'http\') {\n                    return true;\n                }\n            }\n\n            //web端\n            if (trueWeb()) {\n                document.write(\'<script src="/Public/app/dist/js/init.js"><\\/script>\');\n            } else {\n                //app 端\n                document.write(\'<script src="../../dist/js/init.js"><\\/script>\');\n            }\n        })(window);\n\n    </script>\n</head>\n\n<body ng-app="dipan" class="angularEnd" ng-controller="body">\n\n<!--顶部-->\n<div top></div>\n\n<!--<div tab ng-if="showTab"></div>-->\n\n<!--底部-->\n<nav class="mui-bar mui-bar-tab" style="padding-top: 0px;" ng-show="url != \'/login\'">\n    <div id="hrefHome" url="home" class="bottomBar mui-btn  icon-btn">\n        <span class="mui-icon fa fa-home fa-navbar"></span>\n    </div>\n    <div id="hrefMaster" url="master" class="bottomBar  mui-btn icon-btn">\n        <span class="mui-icon fa fa-map-marker fa-navbar"></span>\n    </div>\n    <div id="hrefMember" url="memberIndex" class="bottomBar mui-btn icon-btn">\n        <span class="mui-icon fa fa-user fa-navbar ">\n        </span>\n        <i class="fa fa-ellipsis-h fa-2x" style="\nwidth: 7px;\noverflow-x: hidden;\ncolor: #bd0000;\nposition: absolute;\nbottom:13px;\nmargin-left: -2px;\n"></i>\n    </div>\n    <div id="beian"><a href="http://www.miitbeian.gov.cn/">津ICP备14005697号</a></div>\n</nav>\n\n\n<!--内容-->\n<div class="mui-content">\n    <div loading></div>\n    <div alert></div>\n    <div tab ng-if="showTab"></div>\n    <ui-view></ui-view>\n</div>\n<!--<div class="app">-->\n<!--&lt;!&ndash; topNavbars &ndash;&gt;-->\n<!--<div top></div>-->\n\n<!--<div class="navbar navbar-app navbar-absolute-bottom">-->\n<!--<div class="btn-group justified">-->\n<!--&lt;!&ndash;底部连接&ndash;&gt;-->\n<!--<a ui-sref="home" class="btn btn-navbar"><i class="fa fa-home fa-navbar fa-lg"></i> </a>-->\n<!--<a href="#" class="btn btn-navbar"><i-->\n<!--class="fa fa-map-marker fa-navbar fa-lg"></i> </a>-->\n<!--<a ui-sref="memberIndex" class="btn btn-navbar"><i-->\n<!--class="fa fa-user fa-navbar fa-lg"></i> </a>-->\n<!--</div>-->\n<!--</div>-->\n\n<!--&lt;!&ndash; App Body &ndash;&gt;-->\n<!--<div class="app-body">-->\n<!--&lt;!&ndash;loading directive&ndash;&gt;-->\n<!--<div loading></div>-->\n<!--<div alert></div>-->\n<!--<ui-view></ui-view>-->\n<!--</div>-->\n\n<!--</div>&lt;!&ndash; ~ .app &ndash;&gt;-->\n\n<!--数据div-->\n<!--<div url-parse={{$indexAllRe}}></div>-->\n\n<script>\n    if (trueWeb()) {\n        document.getElementById(\'beian\').style.display = \'block\';\n        document.write (\'<script language="javascript" type="text/javascript" src="http://js.users.51.la/17648708.js">\\<\\/script>\');\n    }\n</script>\n</body>\n</html>\n'), t.put("indexBak.html", '<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="utf-8"/>\n    <title>dipan.so</title>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>\n    <meta name="apple-mobile-web-app-capable" content="yes"/>\n    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0"/>\n    <meta name="apple-mobile-web-app-status-bar-style" content="yes"/>\n\n    <script>\n\n        (function (window) {\n            //判断web 还是 app\n            window.trueWeb = trueWeb;\n            function trueWeb() {\n                var url = window.location.href;\n                url = url.split(\':\');\n                if (url[0] === \'http\') {\n                    return true;\n                }\n            }\n\n            //web端\n            if (trueWeb()) {\n                document.write(\'<script src="/Public/app/dist/js/init.js"><\\/script>\');\n            } else {\n\n                //app 端\n                document.write(\'<script src="../../dist/js/init.js"><\\/script>\');\n\n            }\n        })(window);\n\n    </script>\n</head>\n\n<body ng-app="dipan" class="angularEnd" ng-controller="body">\n<div class="app">\n    <!-- topNavbars -->\n    <div top></div>\n\n    <div class="navbar navbar-app navbar-absolute-bottom">\n        <div class="btn-group justified">\n            <!--底部连接-->\n            <a ui-sref="home" class="btn btn-navbar"><i class="fa fa-home fa-navbar fa-lg"></i> </a>\n            <a href="#" class="btn btn-navbar"><i\n                    class="fa fa-map-marker fa-navbar fa-lg"></i> </a>\n            <a ui-sref="memberIndex" class="btn btn-navbar"><i\n                    class="fa fa-user fa-navbar fa-lg"></i> </a>\n        </div>\n    </div>\n\n    <!-- App Body -->\n    <div class="app-body">\n        <!--loading directive-->\n        <div loading></div>\n        <div alert></div>\n        <ui-view></ui-view>\n    </div>\n\n</div><!-- ~ .app -->\n\n<!--数据div-->\n<!--<div url-parse={{$indexAllRe}}></div>-->\n\n</body>\n</html>\n'), t.put("route/block/area.html", "<div area>\n\n</div>"), t.put("route/block/search.html", "<div search>\n</div>"), t.put("route/home.html", "\n<div home></div>\n\n\n"), t.put("route/login.html", "<div login></div>\n"), t.put("route/master.html", "<div master></div>\n"), t.put("route/member/addArticle.html", "<div add></div>"), t.put("route/member/loginOut.html", "<div login-out></div>\n"), t.put("route/member/memberIndex.html", "<!--我的导航列表-->\n<div my></div>\n"), t.put("route/member/memberInfo.html", "memberINfo"), t.put("route/member/setting.html", "<div setting></div>"), t.put("updata.html", '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Title</title>\n    <script>\n        (function (window) {\n            //判断web 还是 app\n            window.trueWeb = trueWeb;\n            function trueWeb() {\n                var url = window.location.href;\n                url = url.split(\':\');\n                if (url[0] === \'http\') {\n                    return true;\n                }\n            }\n\n        })(window);\n    </script>\n    <script src="../../dist/js/init.js"></script>\n    <script src="../../dist/js/updata.js"></script>\n</head>\n<body>\n<h1>\n\n    upData\n</h1>\n</body>\n</html>')
}]);