! function(t) {
    t.VCO = {
        VERSION: "0.1",
        _originalL: t.VCO
    }
}(this), VCO.debug = !0, VCO.Bind = function(t, e) {
    return function() {
        return t.apply(e, arguments)
    }
}, trace = function(t) {
    VCO.debug && (window.console ? console.log(t) : "undefined" != typeof jsTrace && jsTrace.send(t))
}, VCO.Util = {
    mergeData: function(t, e) {
        var i;
        for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t
    },
    extend: function(t) {
        for (var e = Array.prototype.slice.call(arguments, 1), i = 0, n = e.length, a; n > i; i++) a = e[i] || {}, VCO.Util.mergeData(t, a);
        return t
    },
    isEven: function(t) {
        return t == parseFloat(t) ? !(t % 2) : void 0
    },
    findArrayNumberByUniqueID: function(t, e, i, n) {
        for (var a = n || 0, s = 0; s < e.length; s++) e[s].data[i] == t && (a = s);
        return a
    },
    convertUnixTime: function(t) {
        var e, i, n, a, s, o, r = [],
            h = {
                ymd: "",
                time: "",
                time_array: [],
                date_array: [],
                full_array: []
            };
        h.ymd = t.split(" ")[0], h.time = t.split(" ")[1], h.date_array = h.ymd.split("-"), h.time_array = h.time.split(":"), h.full_array = h.date_array.concat(h.time_array);
        for (var l = 0; l < h.full_array.length; l++) r.push(parseInt(h.full_array[l]));
        return e = new Date(r[0], r[1], r[2], r[3], r[4], r[5]), i = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], n = e.getFullYear(), a = i[e.getMonth()], s = e.getDate(), o = a + ", " + s + " " + n
    },
    setData: function(t, e) {
        t.data = VCO.Util.extend({}, t.data, e), "" === t.data.unique_id && (t.data.unique_id = VCO.Util.unique_ID(6))
    },
    stamp: function() {
        var t = 0,
            e = "_vco_id";
        return function(i) {
            return i[e] = i[e] || ++t, i[e]
        }
    }(),
    isArray: function() {
        if (Array.isArray) return Array.isArray;
        var t = Object.prototype.toString,
            e = t.call([]);
        return function(i) {
            return t.call(i) === e
        }
    }(),
    getRandomNumber: function(t) {
        return Math.floor(Math.random() * t)
    },
    unique_ID: function(t, e) {
        var i = function(t) {
            return Math.floor(Math.random() * t)
        }, n = function() {
                var t = "abcdefghijklmnopqurstuvwxyz";
                return t.substr(i(32), 1)
            }, a = function(t) {
                for (var e = "", i = 0; t > i; i++) e += n();
                return e
            };
        return e ? e + "-" + a(t) : "vco-" + a(t)
    },
    ensureUniqueKey: function(t, e) {
        if (e || (e = VCO.Util.unique_ID(6)), !(e in t)) return e;
        var i = e.match(/^(.+)(-\d+)?$/)[1],
            n = [];
        for (key in t) key.match(/^(.+?)(-\d+)?$/)[1] == i && n.push(key);
        e = i + "-" + (n.length + 1);
        for (var a = n.length; - 1 != n.indexOf(e); a++) e = i + "-" + a;
        return e
    },
    htmlify: function(t) {
        return t.match(/<p>[\s\S]*?<\/p>/) ? t : "<p>" + t + "</p>"
    },
    linkify: function(t, e, i) {
        var n = function(t, e, i) {
            i || (i = "");
            var n = 30;
            return e && e.length > n && (e = e.substring(0, n) + "…"), i + "<a class='vco-makelink' target='_blank' href='" + t + "' onclick='void(0)'>" + e + "</a>"
        }, a = /\b(?:https?|ftp):\/\/([a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim,
            s = /(^|[^\/>])(www\.[\S]+(\b|$))/gim,
            o = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/gim;
        return t.replace(a, function(t, e, i, a) {
            if (i > 0) {
                var s = a[i - 1];
                if ('"' == s || "'" == s || "=" == s) return t
            }
            return n(t, e)
        }).replace(s, function(t, e, i, a, s) {
            return n("http://" + i, i, e)
        }).replace(o, function(t, e, i, a) {
            return n("mailto:" + e, e)
        })
    },
    unlinkify: function(t) {
        return t ? (t = t.replace(/<a\b[^>]*>/i, ""), t = t.replace(/<\/a>/i, "")) : t
    },
    getParamString: function(t) {
        var e = [];
        for (var i in t) t.hasOwnProperty(i) && e.push(i + "=" + t[i]);
        return "?" + e.join("&")
    },
    formatNum: function(t, e) {
        var i = Math.pow(10, e || 5);
        return Math.round(t * i) / i
    },
    falseFn: function() {
        return !1
    },
    requestAnimFrame: function() {
        function t(t) {
            window.setTimeout(t, 1e3 / 60)
        }
        var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || t;
        return function(i, n, a, s) {
            i = n ? VCO.Util.bind(i, n) : i, a && e === t ? i() : e(i, s)
        }
    }(),
    bind: function(t, e) {
        return function() {
            return t.apply(e, arguments)
        }
    },
    template: function(t, e) {
        return t.replace(/\{ *([\w_]+) *\}/g, function(t, i) {
            var n = e[i];
            if (!e.hasOwnProperty(i)) throw new Error("No value provided for variable " + t);
            return n
        })
    },
    hexToRgb: function(t) {
        VCO.Util.css_named_colors[t.toLowerCase()] && (t = VCO.Util.css_named_colors[t.toLowerCase()]);
        var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        t = t.replace(e, function(t, e, i, n) {
            return e + e + i + i + n + n
        });
        var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
        return i ? {
            r: parseInt(i[1], 16),
            g: parseInt(i[2], 16),
            b: parseInt(i[3], 16)
        } : null
    },
    rgbToHex: function(t) {
        var e, i, n;
        if ("object" == typeof t) e = t.r, i = t.g, n = t.b;
        else if ("function" == typeof t.match) {
            var a = t.match(/^rgb\((\d+),(\d+),(\d+)\)$/);
            a && (e = a[1], i = a[2], n = a[3])
        }
        return "#" + parseInt(e, 10).toString(16) + parseInt(i, 10).toString(16) + parseInt(n, 10).toString(16)
    },
    colorObjToHex: function(t) {
        var e = [t.r, t.g, t.b];
        return VCO.Util.rgbToHex("rgb(" + e.join(",") + ")")
    },
    css_named_colors: {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    },
    ratio: {
        square: function(t) {
            var e = {
                w: 0,
                h: 0
            };
            return t.w > t.h && t.h > 0 ? (e.h = t.h, e.w = t.h) : (e.w = t.w, e.h = t.w), e
        },
        r16_9: function(t) {
            return null !== t.w && "" !== t.w ? Math.round(t.w / 16 * 9) : null !== t.h && "" !== t.h ? Math.round(t.h / 9 * 16) : 0
        },
        r4_3: function(t) {
            return null !== t.w && "" !== t.w ? Math.round(t.w / 4 * 3) : null !== t.h && "" !== t.h ? Math.round(t.h / 3 * 4) : void 0
        }
    },
    getObjectAttributeByIndex: function(t, e) {
        if ("undefined" != typeof t) {
            var i = 0;
            for (var n in t) {
                if (e === i) return t[n];
                i++
            }
            return ""
        }
        return ""
    },
    getUrlVars: function(t) {
        var e, i = [],
            n, a;
        e = t.toString(), e.match("&#038;") ? e = e.replace("&#038;", "&") : e.match("&#38;") ? e = e.replace("&#38;", "&") : e.match("&amp;") && (e = e.replace("&amp;", "&")), a = e.slice(e.indexOf("?") + 1).split("&");
        for (var s = 0; s < a.length; s++) n = a[s].split("="), i.push(n[0]), i[n[0]] = n[1];
        return i
    },
    trim: function(t) {
        return t && "function" == typeof t.replace ? t.replace(/^\s+|\s+$/g, "") : ""
    },
    slugify: function(t) {
        t = VCO.Util.trim(t), t = t.toLowerCase();
        for (var e = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;", i = "aaaaaeeeeeiiiiooooouuuunc------", n = 0, a = e.length; a > n; n++) t = t.replace(new RegExp(e.charAt(n), "g"), i.charAt(n));
        return t = t.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"), t = t.replace(/^([0-9])/, "_$1")
    },
    maxDepth: function(t) {
        for (var e = [], i = 0, n = 0; n < t.length; n++) {
            if (e.push(t[n]), e.length > 1) {
                for (var a = e[e.length - 1], s = -1, o = 0; o < e.length - 1; o++) e[o][1] < a[0] && (s = o);
                s >= 0 && (e = e.slice(s + 1))
            }
            e.length > i && (i = e.length)
        }
        return i
    },
    pad: function(t, e) {
        for (t = String(t), e = e || 2; t.length < e;) t = "0" + t;
        return t
    },
    findNextGreater: function(t, e, i) {
        for (var n = 0; n < t.length; n++)
            if (e < t[n]) return t[n];
        return i ? i : e
    },
    findNextLesser: function(t, e, i) {
        for (var n = t.length - 1; n >= 0; n--)
            if (e > t[n]) return t[n];
        return i ? i : e
    },
    isEmptyObject: function(t) {
        var e = [];
        if (Object.keys) e = Object.keys(t);
        else
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && e.push(i);
        for (var n = 0; n < e.length; n++) {
            var a = e[n];
            if (null != t[a] && "string" != typeof t[a]) return !1;
            if (0 != VCO.Util.trim(t[a]).length) return !1
        }
        return !0
    },
    parseYouTubeTime: function(t) {
        if ("string" == typeof t) {
            if (parts = t.match(/^\s*(\d+h)?(\d+m)?(\d+s)?\s*/i), parts) {
                var e = parseInt(parts[1]) || 0,
                    i = parseInt(parts[2]) || 0,
                    n = parseInt(parts[3]) || 0;
                return n + 60 * i + 60 * e * 60
            }
        } else if ("number" == typeof t) return t;
        return 0
    },
    transformImageURL: function(t) {
        return t.replace(/(.*)www.dropbox.com\/(.*)/, "$1dl.dropboxusercontent.com/$2")
    }
},
function(t) {
    var e = function() {
        function t(t) {
            return null == t ? String(t) : W[Z.call(t)] || "object"
        }

        function e(e) {
            return "function" == t(e)
        }

        function i(t) {
            return null != t && t == t.window
        }

        function n(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }

        function a(e) {
            return "object" == t(e)
        }

        function s(t) {
            return a(t) && !i(t) && Object.getPrototypeOf(t) == Object.prototype
        }

        function o(t) {
            return "number" == typeof t.length
        }

        function r(t) {
            return k.call(t, function(t) {
                return null != t
            })
        }

        function h(t) {
            return t.length > 0 ? $.fn.concat.apply([], t) : t
        }

        function l(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }

        function c(t) {
            return t in T ? T[t] : T[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }

        function d(t, e) {
            return "number" != typeof e || E[l(t)] ? e : e + "px"
        }

        function u(t) {
            var e, i;
            return D[t] || (e = M.createElement(t), M.body.appendChild(e), i = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == i && (i = "block"), D[t] = i), D[t]
        }

        function m(t) {
            return "children" in t ? V.call(t.children) : $.map(t.childNodes, function(t) {
                return 1 == t.nodeType ? t : void 0
            })
        }

        function f(t, e, i) {
            for (w in e) i && (s(e[w]) || K(e[w])) ? (s(e[w]) && !s(t[w]) && (t[w] = {}), K(e[w]) && !K(t[w]) && (t[w] = []), f(t[w], e[w], i)) : e[w] !== b && (t[w] = e[w])
        }

        function p(t, e) {
            return null == e ? $(t) : $(t).filter(e)
        }

        function _(t, i, n, a) {
            return e(i) ? i.call(t, n, a) : i
        }

        function g(t, e, i) {
            null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
        }

        function v(t, e) {
            var i = t.className,
                n = i && i.baseVal !== b;
            return e === b ? n ? i.baseVal : i : void(n ? i.baseVal = e : t.className = e)
        }

        function y(t) {
            var e;
            try {
                return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? $.parseJSON(t) : t : e) : t
            } catch (i) {
                return t
            }
        }

        function C(t, e) {
            e(t);
            for (var i in t.childNodes) C(t.childNodes[i], e)
        }
        var b, w, $, O, x = [],
            V = x.slice,
            k = x.filter,
            M = window.document,
            D = {}, T = {}, E = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            }, S = /^\s*<(\w+|!)[^>]*>/,
            L = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            N = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            I = /^(?:body|html)$/i,
            A = /([A-Z])/g,
            j = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            U = ["after", "prepend", "before", "append"],
            P = M.createElement("table"),
            z = M.createElement("tr"),
            B = {
                tr: M.createElement("tbody"),
                tbody: P,
                thead: P,
                tfoot: P,
                td: z,
                th: z,
                "*": M.createElement("div")
            }, q = /complete|loaded|interactive/,
            R = /^\.([\w-]+)$/,
            F = /^#([\w-]*)$/,
            H = /^[\w-]*$/,
            W = {}, Z = W.toString,
            Y = {}, G, J, X = M.createElement("div"),
            Q = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, K = Array.isArray || function(t) {
                return t instanceof Array
            };
        return Y.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType) return !1;
            var i = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (i) return i.call(t, e);
            var n, a = t.parentNode,
                s = !a;
            return s && (a = X).appendChild(t), n = ~Y.qsa(a, e).indexOf(t), s && X.removeChild(t), n
        }, G = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ""
            })
        }, J = function(t) {
            return k.call(t, function(e, i) {
                return t.indexOf(e) == i
            })
        }, Y.fragment = function(t, e, i) {
            var n, a, o;
            return L.test(t) && (n = $(M.createElement(RegExp.$1))), n || (t.replace && (t = t.replace(N, "<$1></$2>")), e === b && (e = S.test(t) && RegExp.$1), e in B || (e = "*"), o = B[e], o.innerHTML = "" + t, n = $.each(V.call(o.childNodes), function() {
                o.removeChild(this)
            })), s(i) && (a = $(n), $.each(i, function(t, e) {
                j.indexOf(t) > -1 ? a[t](e) : a.attr(t, e)
            })), n
        }, Y.Z = function(t, e) {
            return t = t || [], t.__proto__ = $.fn, t.selector = e || "", t
        }, Y.isZ = function(t) {
            return t instanceof Y.Z
        }, Y.init = function(t, i) {
            var n;
            if (!t) return Y.Z();
            if ("string" == typeof t)
                if (t = t.trim(), "<" == t[0] && S.test(t)) n = Y.fragment(t, RegExp.$1, i), t = null;
                else {
                    if (i !== b) return $(i).find(t);
                    n = Y.qsa(M, t)
                } else {
                    if (e(t)) return $(M).ready(t);
                    if (Y.isZ(t)) return t;
                    if (K(t)) n = r(t);
                    else if (a(t)) n = [t], t = null;
                    else if (S.test(t)) n = Y.fragment(t.trim(), RegExp.$1, i), t = null;
                    else {
                        if (i !== b) return $(i).find(t);
                        n = Y.qsa(M, t)
                    }
                }
            return Y.Z(n, t)
        }, $ = function(t, e) {
            return Y.init(t, e)
        }, $.extend = function(t) {
            var e, i = V.call(arguments, 1);
            return "boolean" == typeof t && (e = t, t = i.shift()), i.forEach(function(i) {
                f(t, i, e)
            }), t
        }, Y.qsa = function(t, e) {
            var i, a = "#" == e[0],
                s = !a && "." == e[0],
                o = a || s ? e.slice(1) : e,
                r = H.test(o);
            return n(t) && r && a ? (i = t.getElementById(o)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : V.call(r && !a ? s ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }, $.contains = function(t, e) {
            return t !== e && t.contains(e)
        }, $.type = t, $.isFunction = e, $.isWindow = i, $.isArray = K, $.isPlainObject = s, $.isEmptyObject = function(t) {
            var e;
            for (e in t) return !1;
            return !0
        }, $.inArray = function(t, e, i) {
            return x.indexOf.call(e, t, i)
        }, $.camelCase = G, $.trim = function(t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }, $.uuid = 0, $.support = {}, $.expr = {}, $.map = function(t, e) {
            var i, n = [],
                a, s;
            if (o(t))
                for (a = 0; a < t.length; a++) i = e(t[a], a), null != i && n.push(i);
            else
                for (s in t) i = e(t[s], s), null != i && n.push(i);
            return h(n)
        }, $.each = function(t, e) {
            var i, n;
            if (o(t)) {
                for (i = 0; i < t.length; i++)
                    if (e.call(t[i], i, t[i]) === !1) return t
            } else
                for (n in t)
                    if (e.call(t[n], n, t[n]) === !1) return t; return t
        }, $.grep = function(t, e) {
            return k.call(t, e)
        }, window.JSON && ($.parseJSON = JSON.parse), $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            W["[object " + e + "]"] = e.toLowerCase()
        }), $.fn = {
            forEach: x.forEach,
            reduce: x.reduce,
            push: x.push,
            sort: x.sort,
            indexOf: x.indexOf,
            concat: x.concat,
            map: function(t) {
                return $($.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return $(V.apply(this, arguments))
            },
            ready: function(t) {
                return q.test(M.readyState) && M.body ? t($) : M.addEventListener("DOMContentLoaded", function() {
                    t($)
                }, !1), this
            },
            get: function(t) {
                return t === b ? V.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                return x.every.call(this, function(e, i) {
                    return t.call(e, i, e) !== !1
                }), this
            },
            filter: function(t) {
                return e(t) ? this.not(this.not(t)) : $(k.call(this, function(e) {
                    return Y.matches(e, t)
                }))
            },
            add: function(t, e) {
                return $(J(this.concat($(t, e))))
            },
            is: function(t) {
                return this.length > 0 && Y.matches(this[0], t)
            },
            not: function(t) {
                var i = [];
                if (e(t) && t.call !== b) this.each(function(e) {
                    t.call(this, e) || i.push(this)
                });
                else {
                    var n = "string" == typeof t ? this.filter(t) : o(t) && e(t.item) ? V.call(t) : $(t);
                    this.forEach(function(t) {
                        n.indexOf(t) < 0 && i.push(t)
                    })
                }
                return $(i)
            },
            has: function(t) {
                return this.filter(function() {
                    return a(t) ? $.contains(this, t) : $(this).find(t).size()
                })
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !a(t) ? t : $(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !a(t) ? t : $(t)
            },
            find: function(t) {
                var e, i = this;
                return e = "object" == typeof t ? $(t).filter(function() {
                    var t = this;
                    return x.some.call(i, function(e) {
                        return $.contains(e, t)
                    })
                }) : 1 == this.length ? $(Y.qsa(this[0], t)) : this.map(function() {
                    return Y.qsa(this, t)
                })
            },
            closest: function(t, e) {
                var i = this[0],
                    a = !1;
                for ("object" == typeof t && (a = $(t)); i && !(a ? a.indexOf(i) >= 0 : Y.matches(i, t));) i = i !== e && !n(i) && i.parentNode;
                return $(i)
            },
            parents: function(t) {
                for (var e = [], i = this; i.length > 0;) i = $.map(i, function(t) {
                    return (t = t.parentNode) && !n(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
                });
                return p(e, t)
            },
            parent: function(t) {
                return p(J(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return p(this.map(function() {
                    return m(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return V.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return p(this.map(function(t, e) {
                    return k.call(m(e.parentNode), function(t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return $.map(this, function(e) {
                    return e[t]
                })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = u(this.nodeName))
                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var i = e(t);
                if (this[0] && !i) var n = $(t).get(0),
                a = n.parentNode || this.length > 1;
                return this.each(function(e) {
                    $(this).wrapAll(i ? t.call(this, e) : a ? n.cloneNode(!0) : n)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    $(this[0]).before(t = $(t));
                    for (var e;
                        (e = t.children()).length;) t = e.first();
                    $(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var i = e(t);
                return this.each(function(e) {
                    var n = $(this),
                        a = n.contents(),
                        s = i ? t.call(this, e) : t;
                    a.length ? a.wrapAll(s) : n.append(s)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    $(this).replaceWith($(this).children())
                }), this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var e = $(this);
                    (t === b ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function(t) {
                return $(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return $(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 === arguments.length ? this.length > 0 ? this[0].innerHTML : null : this.each(function(e) {
                    var i = this.innerHTML;
                    $(this).empty().append(_(this, t, e, i))
                })
            },
            text: function(t) {
                return 0 === arguments.length ? this.length > 0 ? this[0].textContent : null : this.each(function() {
                    this.textContent = t === b ? "" : "" + t
                })
            },
            attr: function(t, e) {
                var i;
                return "string" == typeof t && e === b ? 0 == this.length || 1 !== this[0].nodeType ? b : "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(i = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : i : this.each(function(i) {
                    if (1 === this.nodeType)
                        if (a(t))
                            for (w in t) g(this, w, t[w]);
                        else g(this, t, _(this, e, i, this.getAttribute(t)))
                })
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && g(this, t)
                })
            },
            prop: function(t, e) {
                return t = Q[t] || t, e === b ? this[0] && this[0][t] : this.each(function(i) {
                    this[t] = _(this, e, i, this[t])
                })
            },
            data: function(t, e) {
                var i = this.attr("data-" + t.replace(A, "-$1").toLowerCase(), e);
                return null !== i ? y(i) : b
            },
            val: function(t) {
                return 0 === arguments.length ? this[0] && (this[0].multiple ? $(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value) : this.each(function(e) {
                    this.value = _(this, t, e, this.value)
                })
            },
            offset: function(t) {
                if (t) return this.each(function(e) {
                    var i = $(this),
                        n = _(this, t, e, i.offset()),
                        a = i.offsetParent().offset(),
                        s = {
                            top: n.top - a.top,
                            left: n.left - a.left
                        };
                    "static" == i.css("position") && (s.position = "relative"), i.css(s)
                });
                if (0 == this.length) return null;
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function(e, i) {
                if (arguments.length < 2) {
                    var n = this[0],
                        a = getComputedStyle(n, "");
                    if (!n) return;
                    if ("string" == typeof e) return n.style[G(e)] || a.getPropertyValue(e);
                    if (K(e)) {
                        var s = {};
                        return $.each(K(e) ? e : [e], function(t, e) {
                            s[e] = n.style[G(e)] || a.getPropertyValue(e)
                        }), s
                    }
                }
                var o = "";
                if ("string" == t(e)) i || 0 === i ? o = l(e) + ":" + d(e, i) : this.each(function() {
                    this.style.removeProperty(l(e))
                });
                else
                    for (w in e) e[w] || 0 === e[w] ? o += l(w) + ":" + d(w, e[w]) + ";" : this.each(function() {
                        this.style.removeProperty(l(w))
                    });
                return this.each(function() {
                    this.style.cssText += ";" + o
                })
            },
            index: function(t) {
                return t ? this.indexOf($(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return t ? x.some.call(this, function(t) {
                    return this.test(v(t))
                }, c(t)) : !1
            },
            addClass: function(t) {
                return t ? this.each(function(e) {
                    O = [];
                    var i = v(this),
                        n = _(this, t, e, i);
                    n.split(/\s+/g).forEach(function(t) {
                        $(this).hasClass(t) || O.push(t)
                    }, this), O.length && v(this, i + (i ? " " : "") + O.join(" "))
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(e) {
                    return t === b ? v(this, "") : (O = v(this), _(this, t, e, O).split(/\s+/g).forEach(function(t) {
                        O = O.replace(c(t), " ")
                    }), void v(this, O.trim()))
                })
            },
            toggleClass: function(t, e) {
                return t ? this.each(function(i) {
                    var n = $(this),
                        a = _(this, t, i, v(this));
                    a.split(/\s+/g).forEach(function(t) {
                        (e === b ? !n.hasClass(t) : e) ? n.addClass(t) : n.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = "scrollTop" in this[0];
                    return t === b ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                        this.scrollTop = t
                    } : function() {
                        this.scrollTo(this.scrollX, t)
                    })
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = "scrollLeft" in this[0];
                    return t === b ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                        this.scrollLeft = t
                    } : function() {
                        this.scrollTo(t, this.scrollY)
                    })
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0],
                        e = this.offsetParent(),
                        i = this.offset(),
                        n = I.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                    return i.top -= parseFloat($(t).css("margin-top")) || 0, i.left -= parseFloat($(t).css("margin-left")) || 0, n.top += parseFloat($(e[0]).css("border-top-width")) || 0, n.left += parseFloat($(e[0]).css("border-left-width")) || 0, {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || M.body; t && !I.test(t.nodeName) && "static" == $(t).css("position");) t = t.offsetParent;
                    return t
                })
            }
        }, $.fn.detach = $.fn.remove, ["width", "height"].forEach(function(t) {
            var e = t.replace(/./, function(t) {
                return t[0].toUpperCase()
            });
            $.fn[t] = function(a) {
                var s, o = this[0];
                return a === b ? i(o) ? o["inner" + e] : n(o) ? o.documentElement["scroll" + e] : (s = this.offset()) && s[t] : this.each(function(e) {
                    o = $(this), o.css(t, _(this, a, e, o[t]()))
                })
            }
        }), U.forEach(function(e, i) {
            var n = i % 2;
            $.fn[e] = function() {
                var e, a = $.map(arguments, function(i) {
                        return e = t(i), "object" == e || "array" == e || null == i ? i : Y.fragment(i)
                    }),
                    s, o = this.length > 1;
                return a.length < 1 ? this : this.each(function(t, e) {
                    s = n ? e : e.parentNode, e = 0 == i ? e.nextSibling : 1 == i ? e.firstChild : 2 == i ? e : null, a.forEach(function(t) {
                        if (o) t = t.cloneNode(!0);
                        else if (!s) return $(t).remove();
                        C(s.insertBefore(t, e), function(t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                        })
                    })
                })
            }, $.fn[n ? e + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
                return $(t)[e](this), this
            }
        }), Y.Z.prototype = $.fn, Y.uniq = J, Y.deserializeValue = y, $.zepto = Y, $
    }();
    window.Zepto = e, void 0 === window.$ && (window.$ = e),
    function($) {
        function t(t) {
            return t._zid || (t._zid = d++)
        }

        function e(e, a, s, o) {
            if (a = i(a), a.ns) var r = n(a.ns);
            return (_[t(e)] || []).filter(function(e) {
                return e && (!a.e || e.e == a.e) && (!a.ns || r.test(e.ns)) && (!s || t(e.fn) === t(s)) && (!o || e.sel == o)
            })
        }

        function i(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }

        function n(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }

        function a(t, e) {
            return t.del && !v && t.e in y || !! e
        }

        function s(t) {
            return C[t] || v && y[t] || t
        }

        function o(e, n, o, r, l, c, d) {
            var m = t(e),
                f = _[m] || (_[m] = []);
            n.split(/\s/).forEach(function(t) {
                if ("ready" == t) return $(document).ready(o);
                var n = i(t);
                n.fn = o, n.sel = l, n.e in C && (o = function(t) {
                    var e = t.relatedTarget;
                    return !e || e !== this && !$.contains(this, e) ? n.fn.apply(this, arguments) : void 0
                }), n.del = c;
                var m = c || o;
                n.proxy = function(t) {
                    if (t = h(t), !t.isImmediatePropagationStopped()) {
                        t.data = r;
                        var i = m.apply(e, t._args == u ? [t] : [t].concat(t._args));
                        return i === !1 && (t.preventDefault(), t.stopPropagation()), i
                    }
                }, n.i = f.length, f.push(n), "addEventListener" in e && e.addEventListener(s(n.e), n.proxy, a(n, d))
            })
        }

        function r(i, n, o, r, h) {
            var l = t(i);
            (n || "").split(/\s/).forEach(function(t) {
                e(i, t, o, r).forEach(function(t) {
                    delete _[l][t.i], "removeEventListener" in i && i.removeEventListener(s(t.e), t.proxy, a(t, h))
                })
            })
        }

        function h(t, e) {
            return (e || !t.isDefaultPrevented) && (e || (e = t), $.each(x, function(i, n) {
                var a = e[i];
                t[i] = function() {
                    return this[n] = b, a && a.apply(e, arguments)
                }, t[n] = w
            }), (e.defaultPrevented !== u ? e.defaultPrevented : "returnValue" in e ? e.returnValue === !1 : e.getPreventDefault && e.getPreventDefault()) && (t.isDefaultPrevented = b)), t
        }

        function l(t) {
            var e, i = {
                    originalEvent: t
                };
            for (e in t) O.test(e) || t[e] === u || (i[e] = t[e]);
            return h(i, t)
        }
        var c = $.zepto.qsa,
            d = 1,
            u, m = Array.prototype.slice,
            f = $.isFunction,
            p = function(t) {
                return "string" == typeof t
            }, _ = {}, g = {}, v = "onfocusin" in window,
            y = {
                focus: "focusin",
                blur: "focusout"
            }, C = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
        g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", $.event = {
            add: o,
            remove: r
        }, $.proxy = function(e, i) {
            if (f(e)) {
                var n = function() {
                    return e.apply(i, arguments)
                };
                return n._zid = t(e), n
            }
            if (p(i)) return $.proxy(e[i], e);
            throw new TypeError("expected function")
        }, $.fn.bind = function(t, e, i) {
            return this.on(t, e, i)
        }, $.fn.unbind = function(t, e) {
            return this.off(t, e)
        }, $.fn.one = function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        };
        var b = function() {
            return !0
        }, w = function() {
                return !1
            }, O = /^([A-Z]|returnValue$|layer[XY]$)/,
            x = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
        $.fn.delegate = function(t, e, i) {
            return this.on(e, t, i)
        }, $.fn.undelegate = function(t, e, i) {
            return this.off(e, t, i)
        }, $.fn.live = function(t, e) {
            return $(document.body).delegate(this.selector, t, e), this
        }, $.fn.die = function(t, e) {
            return $(document.body).undelegate(this.selector, t, e), this
        }, $.fn.on = function(t, e, i, n, a) {
            var s, h, c = this;
            return t && !p(t) ? ($.each(t, function(t, n) {
                c.on(t, e, i, n, a)
            }), c) : (p(e) || f(n) || n === !1 || (n = i, i = e, e = u), (f(i) || i === !1) && (n = i, i = u), n === !1 && (n = w), c.each(function(c, d) {
                a && (s = function(t) {
                    return r(d, t.type, n), n.apply(this, arguments)
                }), e && (h = function(t) {
                    var i, a = $(t.target).closest(e, d).get(0);
                    return a && a !== d ? (i = $.extend(l(t), {
                        currentTarget: a,
                        liveFired: d
                    }), (s || n).apply(a, [i].concat(m.call(arguments, 1)))) : void 0
                }), o(d, t, n, i, e, h || s)
            }))
        }, $.fn.off = function(t, e, i) {
            var n = this;
            return t && !p(t) ? ($.each(t, function(t, i) {
                n.off(t, e, i)
            }), n) : (p(e) || f(i) || i === !1 || (i = e, e = u), i === !1 && (i = w), n.each(function() {
                r(this, t, i, e)
            }))
        }, $.fn.trigger = function(t, e) {
            return t = p(t) || $.isPlainObject(t) ? $.Event(t) : h(t), t._args = e, this.each(function() {
                "dispatchEvent" in this ? this.dispatchEvent(t) : $(this).triggerHandler(t, e)
            })
        }, $.fn.triggerHandler = function(t, i) {
            var n, a;
            return this.each(function(s, o) {
                n = l(p(t) ? $.Event(t) : t), n._args = i, n.target = o, $.each(e(o, t.type || t), function(t, e) {
                    return a = e.proxy(n), n.isImmediatePropagationStopped() ? !1 : void 0
                })
            }), a
        }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
            $.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.trigger(t)
            }
        }), ["focus", "blur"].forEach(function(t) {
            $.fn[t] = function(e) {
                return e ? this.bind(t, e) : this.each(function() {
                    try {
                        this[t]()
                    } catch (e) {}
                }), this
            }
        }), $.Event = function(t, e) {
            p(t) || (e = t, t = e.type);
            var i = document.createEvent(g[t] || "Events"),
                n = !0;
            if (e)
                for (var a in e) "bubbles" == a ? n = !! e[a] : i[a] = e[a];
            return i.initEvent(t, n, !0), h(i)
        }
    }(e),
    function($) {
        function t(t, e, i) {
            var n = $.Event(e);
            return $(t).trigger(n, i), !n.isDefaultPrevented()
        }

        function e(e, i, n, a) {
            return e.global ? t(i || p, n, a) : void 0
        }

        function i(t) {
            t.global && 0 === $.active++ && e(t, null, "ajaxStart")
        }

        function n(t) {
            t.global && !--$.active && e(t, null, "ajaxStop")
        }

        function a(t, i) {
            var n = i.context;
            return i.beforeSend.call(n, t, i) === !1 || e(i, n, "ajaxBeforeSend", [t, i]) === !1 ? !1 : void e(i, n, "ajaxSend", [t, i])
        }

        function s(t, i, n, a) {
            var s = n.context,
                o = "success";
            n.success.call(s, t, o, i), a && a.resolveWith(s, [t, o, i]), e(n, s, "ajaxSuccess", [i, n, t]), r(o, i, n)
        }

        function o(t, i, n, a, s) {
            var o = a.context;
            a.error.call(o, n, i, t), s && s.rejectWith(o, [n, i, t]), e(a, o, "ajaxError", [n, a, t || i]), r(i, n, a)
        }

        function r(t, i, a) {
            var s = a.context;
            a.complete.call(s, i, t), e(a, s, "ajaxComplete", [i, a]), n(a)
        }

        function h() {}

        function l(t) {
            return t && (t = t.split(";", 2)[0]), t && (t == w ? "html" : t == b ? "json" : y.test(t) ? "script" : C.test(t) && "xml") || "text"
        }

        function c(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }

        function d(t) {
            t.processData && t.data && "string" != $.type(t.data) && (t.data = $.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = c(t.url, t.data), t.data = void 0)
        }

        function u(t, e, i, n) {
            var a = !$.isFunction(e);
            return {
                url: t,
                data: a ? e : void 0,
                success: a ? $.isFunction(i) ? i : void 0 : e,
                dataType: a ? n || i : i
            }
        }

        function m(t, e, i, n) {
            var a, s = $.isArray(e),
                o = $.isPlainObject(e);
            $.each(e, function(e, r) {
                a = $.type(r), n && (e = i ? n : n + "[" + (o || "object" == a || "array" == a ? e : "") + "]"), !n && s ? t.add(r.name, r.value) : "array" == a || !i && "object" == a ? m(t, r, i, e) : t.add(e, r)
            })
        }
        var f = 0,
            p = window.document,
            _, g, v = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            y = /^(?:text|application)\/javascript/i,
            C = /^(?:text|application)\/xml/i,
            b = "application/json",
            w = "text/html",
            O = /^\s*$/;
        $.active = 0, $.ajaxJSONP = function(t, e) {
            if (!("type" in t)) return $.ajax(t);
            var i = t.jsonpCallback,
                n = ($.isFunction(i) ? i() : i) || "jsonp" + ++f,
                r = p.createElement("script"),
                h = window[n],
                l, c = function(t) {
                    $(r).triggerHandler("error", t || "abort")
                }, d = {
                    abort: c
                }, u;
            return e && e.promise(d), $(r).on("load error", function(i, a) {
                clearTimeout(u), $(r).off().remove(), "error" != i.type && l ? s(l[0], d, t, e) : o(null, a || "error", d, t, e), window[n] = h, l && $.isFunction(h) && h(l[0]), h = l = void 0
            }), a(d, t) === !1 ? (c("abort"), d) : (window[n] = function() {
                l = arguments
            }, r.src = t.url.replace(/\?(.+)=\?/, "?$1=" + n), p.head.appendChild(r), t.timeout > 0 && (u = setTimeout(function() {
                c("timeout")
            }, t.timeout)), d)
        }, $.ajaxSettings = {
            type: "GET",
            beforeSend: h,
            success: h,
            error: h,
            complete: h,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: b,
                xml: "application/xml, text/xml",
                html: w,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        }, $.ajax = function(t) {
            var e = $.extend({}, t || {}),
                n = $.Deferred && $.Deferred();
            for (_ in $.ajaxSettings) void 0 === e[_] && (e[_] = $.ajaxSettings[_]);
            i(e), e.crossDomain || (e.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(e.url) && RegExp.$2 != window.location.host), e.url || (e.url = window.location.toString()), d(e), e.cache === !1 && (e.url = c(e.url, "_=" + Date.now()));
            var r = e.dataType,
                u = /\?.+=\?/.test(e.url);
            if ("jsonp" == r || u) return u || (e.url = c(e.url, e.jsonp ? e.jsonp + "=?" : e.jsonp === !1 ? "" : "callback=?")), $.ajaxJSONP(e, n);
            var m = e.accepts[r],
                f = {}, p = function(t, e) {
                    f[t.toLowerCase()] = [t, e]
                }, v = /^([\w-]+:)\/\//.test(e.url) ? RegExp.$1 : window.location.protocol,
                y = e.xhr(),
                C = y.setRequestHeader,
                b;
            if (n && n.promise(y), e.crossDomain || p("X-Requested-With", "XMLHttpRequest"), p("Accept", m || "*/*"), (m = e.mimeType || m) && (m.indexOf(",") > -1 && (m = m.split(",", 2)[0]), y.overrideMimeType && y.overrideMimeType(m)), (e.contentType || e.contentType !== !1 && e.data && "GET" != e.type.toUpperCase()) && p("Content-Type", e.contentType || "application/x-www-form-urlencoded"), e.headers)
                for (g in e.headers) p(g, e.headers[g]);
            if (y.setRequestHeader = p, y.onreadystatechange = function() {
                if (4 == y.readyState) {
                    y.onreadystatechange = h, clearTimeout(b);
                    var t, i = !1;
                    if (y.status >= 200 && y.status < 300 || 304 == y.status || 0 == y.status && "file:" == v) {
                        r = r || l(e.mimeType || y.getResponseHeader("content-type")), t = y.responseText;
                        try {
                            "script" == r ? (1, eval)(t) : "xml" == r ? t = y.responseXML : "json" == r && (t = O.test(t) ? null : $.parseJSON(t))
                        } catch (a) {
                            i = a
                        }
                        i ? o(i, "parsererror", y, e, n) : s(t, y, e, n);
                    } else o(y.statusText || null, y.status ? "error" : "abort", y, e, n)
                }
            }, a(y, e) === !1) return y.abort(), o(null, "abort", y, e, n), y;
            if (e.xhrFields)
                for (g in e.xhrFields) y[g] = e.xhrFields[g];
            var w = "async" in e ? e.async : !0;
            y.open(e.type, e.url, w, e.username, e.password);
            for (g in f) C.apply(y, f[g]);
            return e.timeout > 0 && (b = setTimeout(function() {
                y.onreadystatechange = h, y.abort(), o(null, "timeout", y, e, n)
            }, e.timeout)), y.send(e.data ? e.data : null), y
        }, $.get = function(t, e, i, n) {
            return $.ajax(u.apply(null, arguments))
        }, $.post = function(t, e, i, n) {
            var a = u.apply(null, arguments);
            return a.type = "POST", $.ajax(a)
        }, $.getJSON = function(t, e, i) {
            var n = u.apply(null, arguments);
            return n.dataType = "json", $.ajax(n)
        }, $.fn.load = function(t, e, i) {
            if (!this.length) return this;
            var n = this,
                a = t.split(/\s/),
                s, o = u(t, e, i),
                r = o.success;
            return a.length > 1 && (o.url = a[0], s = a[1]), o.success = function(t) {
                n.html(s ? $("<div>").html(t.replace(v, "")).find(s) : t), r && r.apply(n, arguments)
            }, $.ajax(o), this
        };
        var x = encodeURIComponent;
        $.param = function(t, e) {
            var i = [];
            return i.add = function(t, e) {
                this.push(x(t) + "=" + x(e))
            }, m(i, t, e), i.join("&").replace(/%20/g, "+")
        }
    }(e),
    function($) {
        $.fn.serializeArray = function() {
            var t = [],
                e;
            return $([].slice.call(this.get(0).elements)).each(function() {
                e = $(this);
                var i = e.attr("type");
                "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != i && "reset" != i && "button" != i && ("radio" != i && "checkbox" != i || this.checked) && t.push({
                    name: e.attr("name"),
                    value: e.val()
                })
            }), t
        }, $.fn.serialize = function() {
            var t = [];
            return this.serializeArray().forEach(function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }), t.join("&")
        }, $.fn.submit = function(t) {
            if (t) this.bind("submit", t);
            else if (this.length) {
                var e = $.Event("submit");
                this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(e),
    function($) {
        "__proto__" in {} || $.extend($.zepto, {
            Z: function(t, e) {
                return t = t || [], $.extend(t, $.fn), t.selector = e || "", t.__Z = !0, t
            },
            isZ: function(t) {
                return "array" === $.type(t) && "__Z" in t
            }
        });
        try {
            getComputedStyle(void 0)
        } catch (t) {
            var e = getComputedStyle;
            window.getComputedStyle = function(t) {
                try {
                    return e(t)
                } catch (i) {
                    return null
                }
            }
        }
    }(e), t.getJSON = e.getJSON, t.ajax = e.ajax
}(VCO), VCO.Class = function() {}, VCO.Class.extend = function(t) {
    var e = function() {
        this.initialize && this.initialize.apply(this, arguments)
    }, i = function() {};
    i.prototype = this.prototype;
    var n = new i;
    n.constructor = e, e.prototype = n, e.superclass = this.prototype;
    for (var a in this) this.hasOwnProperty(a) && "prototype" !== a && "superclass" !== a && (e[a] = this[a]);
    return t.statics && (VCO.Util.extend(e, t.statics), delete t.statics), t.includes && (VCO.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), t.options && n.options && (t.options = VCO.Util.extend({}, n.options, t.options)), VCO.Util.extend(n, t), e.extend = VCO.Class.extend, e.include = function(t) {
        VCO.Util.extend(this.prototype, t)
    }, e
}, VCO.Events = {
    addEventListener: function(t, e, i) {
        var n = this._vco_events = this._vco_events || {};
        return n[t] = n[t] || [], n[t].push({
            action: e,
            context: i || this
        }), this
    },
    hasEventListeners: function(t) {
        var e = "_vco_events";
        return e in this && t in this[e] && this[e][t].length > 0
    },
    removeEventListener: function(t, e, i) {
        if (!this.hasEventListeners(t)) return this;
        for (var n = 0, a = this._vco_events, s = a[t].length; s > n; n++)
            if (a[t][n].action === e && (!i || a[t][n].context === i)) return a[t].splice(n, 1), this;
        return this
    },
    fireEvent: function(t, e) {
        if (!this.hasEventListeners(t)) return this;
        for (var i = VCO.Util.mergeData({
            type: t,
            target: this
        }, e), n = this._vco_events[t].slice(), a = 0, s = n.length; s > a; a++) n[a].action.call(n[a].context || this, i);
        return this
    }
}, VCO.Events.on = VCO.Events.addEventListener, VCO.Events.off = VCO.Events.removeEventListener, VCO.Events.fire = VCO.Events.fireEvent,
function() {
    var t = navigator.userAgent.toLowerCase(),
        e = document.documentElement,
        i = "ActiveXObject" in window,
        n = -1 !== t.indexOf("webkit"),
        a = -1 !== t.indexOf("phantom"),
        s = -1 !== t.search("android [23]"),
        o = "undefined" != typeof orientation,
        r = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !window.PointerEvent,
        h = window.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || r,
        l = i && "transition" in e.style,
        c = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !s,
        d = "MozPerspective" in e.style,
        u = "OTransition" in e.style,
        m = window.opera,
        f = "devicePixelRatio" in window && window.devicePixelRatio > 1;
    if (!f && "matchMedia" in window) {
        var p = window.matchMedia("(min-resolution:144dpi)");
        f = p && p.matches
    }
    var _ = !window.L_NO_TOUCH && !a && (h || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch);
    VCO.Browser = {
        ie: i,
        ielt9: i && !document.addEventListener,
        webkit: n,
        firefox: -1 !== t.indexOf("gecko") && !n && !window.opera && !i,
        android: -1 !== t.indexOf("android"),
        android23: s,
        chrome: -1 !== t.indexOf("chrome"),
        ie3d: l,
        webkit3d: c,
        gecko3d: d,
        opera3d: u,
        any3d: !window.L_DISABLE_3D && (l || c || d || u) && !a,
        mobile: o,
        mobileWebkit: o && n,
        mobileWebkit3d: o && c,
        mobileOpera: o && window.opera,
        touch: !! _,
        msPointer: !! r,
        pointer: !! h,
        retina: !! f,
        orientation: function() {
            var t = window.innerWidth,
                e = window.innerHeight,
                i = "portrait";
            return t > e && (i = "landscape"), 90 == Math.abs(window.orientation), trace(i), i
        }
    }
}(), VCO.Load = function(t) {
    function e(t) {
        var e = 0,
            n = !1;
        for (e = 0; e < i.length; e++) i[e] == t && (n = !0);
        return n ? !0 : (i.push(t), !1)
    }
    var i = [];
    return {
        css: function(t, i, n, a) {
            e(t) ? i() : VCO.LoadIt.css(t, i, n, a)
        },
        js: function(t, i, n, a) {
            e(t) ? i() : VCO.LoadIt.js(t, i, n, a)
        }
    }
}(this.document), VCO.LoadIt = function(t) {
    function e(e, i) {
        var n = t.createElement(e),
            a;
        for (a in i) i.hasOwnProperty(a) && n.setAttribute(a, i[a]);
        return n
    }

    function i(t) {
        var e = l[t],
            i, n;
        e && (i = e.callback, n = e.urls, n.shift(), c = 0, n.length || (i && i.call(e.context, e.obj), l[t] = null, d[t].length && a(t)))
    }

    function n() {
        var e = navigator.userAgent;
        r = {
            async: t.createElement("script").async === !0
        }, (r.webkit = /AppleWebKit\//.test(e)) || (r.ie = /MSIE/.test(e)) || (r.opera = /Opera/.test(e)) || (r.gecko = /Gecko\//.test(e)) || (r.unknown = !0)
    }

    function a(a, c, u, m, f) {
        var p = function() {
            i(a)
        }, _ = "css" === a,
            g = [],
            v, y, C, b, w, O;
        if (r || n(), c)
            if (c = "string" == typeof c ? [c] : c.concat(), _ || r.async || r.gecko || r.opera) d[a].push({
                urls: c,
                callback: u,
                obj: m,
                context: f
            });
            else
                for (v = 0, y = c.length; y > v; ++v) d[a].push({
                    urls: [c[v]],
                    callback: v === y - 1 ? u : null,
                    obj: m,
                    context: f
                });
        if (!l[a] && (b = l[a] = d[a].shift())) {
            for (h || (h = t.head || t.getElementsByTagName("head")[0]), w = b.urls, v = 0, y = w.length; y > v; ++v) O = w[v], _ ? C = r.gecko ? e("style") : e("link", {
                href: O,
                rel: "stylesheet"
            }) : (C = e("script", {
                src: O
            }), C.async = !1), C.className = "lazyload", C.setAttribute("charset", "utf-8"), r.ie && !_ ? C.onreadystatechange = function() {
                /loaded|complete/.test(C.readyState) && (C.onreadystatechange = null, p())
            } : _ && (r.gecko || r.webkit) ? r.webkit ? (b.urls[v] = C.href, o()) : (C.innerHTML = '@import "' + O + '";', s(C)) : C.onload = C.onerror = p, g.push(C);
            for (v = 0, y = g.length; y > v; ++v) h.appendChild(g[v])
        }
    }

    function s(t) {
        var e;
        try {
            e = !! t.sheet.cssRules
        } catch (n) {
            return c += 1, void(200 > c ? setTimeout(function() {
                s(t)
            }, 50) : e && i("css"))
        }
        i("css")
    }

    function o() {
        var t = l.css,
            e;
        if (t) {
            for (e = u.length; --e >= 0;)
                if (u[e].href === t.urls[0]) {
                    i("css");
                    break
                }
            c += 1, t && (200 > c ? setTimeout(o, 50) : i("css"))
        }
    }
    var r, h, l = {}, c = 0,
        d = {
            css: [],
            js: []
        }, u = t.styleSheets;
    return {
        css: function(t, e, i, n) {
            a("css", t, e, i, n)
        },
        js: function(t, e, i, n) {
            a("js", t, e, i, n)
        }
    }
}(this.document), VCO.TimelineConfig = VCO.Class.extend({
    includes: [],
    initialize: function(t) {
        if (this.title = "", this.scale = "", this.events = [], this.event_dict = {}, this.messages = {
            errors: [],
            warnings: []
        }, "object" == typeof t && t.events) {
            if (this.scale = t.scale, this.events = [], this._ensureValidScale(t.events), t.title) {
                var e = this._assignID(t.title);
                this._tidyFields(t.title), this.title = t.title, this.event_dict[e] = this.title
            }
            for (var i = 0; i < t.events.length; i++) try {
                this.addEvent(t.events[i], !0)
            } catch (n) {
                this.logError("Event " + i + ": " + n)
            }
            VCO.DateUtil.sortByDate(this.events)
        }
    },
    logError: function(t) {
        trace(t), this.messages.errors.push(t)
    },
    getErrors: function(t) {
        return t ? this.messages.errors.join(t) : this.messages.errors
    },
    validate: function() {
        ("undefined" == typeof this.events || "undefined" == typeof this.events.length || 0 == this.events.length) && this.logError("Timeline configuration has no events.")
    },
    isValid: function() {
        return 0 == this.messages.errors.length
    },
    addEvent: function(t, e) {
        var i = this._assignID(t);
        if ("undefined" == typeof t.start_date) throw i + " is missing a start_date";
        return this._processDates(t), this._tidyFields(t), this.events.push(t), this.event_dict[i] = t, e || VCO.DateUtil.sortByDate(this.events), i
    },
    _assignID: function(t) {
        var e = t.unique_id;
        return VCO.Util.trim(e) || (e = t.text ? VCO.Util.slugify(t.text.headline) : null), t.unique_id = VCO.Util.ensureUniqueKey(this.event_dict, e), t.unique_id
    },
    _makeUniqueIdentifiers: function(t, e) {
        for (var i = [t], n = 0; n < e.length; n++) VCO.Util.trim(e[n].unique_id) && (e[n].unique_id = VCO.Util.slugify(e[n].unique_id), -1 == i.indexOf(e[n].unique_id) ? i.push(e[n].unique_id) : e[n].unique_id = "");
        if (i.length != e.length + 1)
            for (var n = 0; n < e.length; n++)
                if (!e[n].unique_id) {
                    var a = e[n].text ? VCO.Util.slugify(e[n].text.headline) : null;
                    a || (a = VCO.Util.unique_ID(6)), -1 != i.indexOf(a) && (a = a + "-" + n), i.push(a), e[n].unique_id = a
                }
    },
    _ensureValidScale: function(t) {
        if (!this.scale) {
            trace("Determining scale dynamically"), this.scale = "human";
            for (var e = 0; e < t.length; e++) {
                if ("cosmological" == t[e].scale) {
                    this.scale = "cosmological";
                    break
                }
                if (t[e].start_date && "undefined" != typeof t[e].start_date.year) {
                    var i = new VCO.BigDate(t[e].start_date),
                        n = i.data.date_obj.year;
                    if (-271820 > n || n > 275759) {
                        this.scale = "cosmological";
                        break
                    }
                }
            }
        }
        var a = VCO.DateUtil.SCALE_DATE_CLASSES[this.scale];
        a || this.logError("Don't know how to process dates on scale " + this.scale)
    },
    _processDates: function(t) {
        var e = VCO.DateUtil.SCALE_DATE_CLASSES[this.scale];
        if (!(t.start_date instanceof e)) {
            var i = t.start_date;
            if (t.start_date = new e(i), "undefined" != typeof t.end_date && !(t.end_date instanceof e)) {
                var n = t.end_date,
                    a = !0;
                for (property in i) a = a && i[property] == n[property];
                a ? (trace("End date same as start date is redundant; dropping end date"), delete t.end_date) : t.end_date = new e(n)
            }
        }
    },
    _tidyFields: function(t) {
        function e(t, e, i) {
            i || (i = ""), t.hasOwnProperty(e) || (t[e] = i)
        }
        t.group && (t.group = VCO.Util.trim(t.group)), t.text || (t.text = {}), e(t.text, "text"), e(t.text, "headline")
    }
}),
function(t) {
    function e(t) {
        parts = {
            key: null,
            worksheet: 0
        };
        var e = /\bkey=([-_A-Za-z0-9]+)&?/i;
        if (t.match(e)) parts.key = t.match(e)[1];
        else if (t.match("docs.google.com/spreadsheets/d/")) {
            var i = t.indexOf("docs.google.com/spreadsheets/d/") + "docs.google.com/spreadsheets/d/".length,
                n = t.substr(i);
            parts.key = n.split("/")[0], t.match(/\?gid=(\d+)/) && (parts.worksheet = t.match(/\?gid=(\d+)/)[1])
        } else t.match(/^\b[-_A-Za-z0-9]+$/) && (parts.key = t);
        return parts.key ? parts : null
    }

    function i(e) {
        var i = {};
        for (k in e) 0 == k.indexOf("gsx$") && (i[k.substr(4)] = e[k].$t);
        if (t.Util.isEmptyObject(i)) return null;
        var n = {
            media: {
                caption: i.mediacaption || "",
                credit: i.mediacredit || "",
                url: i.media || "",
                thumbnail: i.mediathumbnail || ""
            },
            text: {
                headline: i.headline || "",
                text: i.text || ""
            },
            group: i.tag || "",
            type: i.type || ""
        };
        return i.startdate && (n.start_date = t.Date.parseDate(i.startdate)), i.enddate && (n.end_date = t.Date.parseDate(i.enddate)), n
    }

    function n(e) {
        function i(t) {
            return t ? t.replace(/[\s,]+/g, "") : void 0
        }
        var n = {};
        for (k in e) 0 == k.indexOf("gsx$") && (n[k.substr(4)] = t.Util.trim(e[k].$t));
        if (t.Util.isEmptyObject(n)) return null;
        var a = {
            media: {
                caption: n.mediacaption || "",
                credit: n.mediacredit || "",
                url: n.media || "",
                thumbnail: n.mediathumbnail || ""
            },
            text: {
                headline: n.headline || "",
                text: n.text || ""
            },
            start_date: {
                year: i(n.year),
                month: i(n.month) || "",
                day: i(n.day) || ""
            },
            end_date: {
                year: i(n.endyear) || "",
                month: i(n.endmonth) || "",
                day: i(n.endday) || ""
            },
            display_date: n.displaydate || "",
            type: n.type || ""
        };
        if (n.time && t.Util.mergeData(a.start_date, t.DateUtil.parseTime(n.time)), n.endtime && t.Util.mergeData(a.end_date, t.DateUtil.parseTime(n.endtime)), n.group && (a.group = n.group), "" == a.end_date.year) {
            var s = a.end_date;
            if (delete a.end_date, "" != s.month || "" != s.day || "" != s.time) {
                var o = a.text.headline || trace("Invalid end date for spreadsheet row. Must have a year if any other date fields are specified.");
                trace(e)
            }
        }
        return n.background && (n.background.match(/^(https?:)?\/\/?/) ? a.background = {
            url: n.background
        } : a.background = {
            color: n.background
        }), a
    }
    var a = function(t) {
        if ("undefined" == typeof t.feed.entry || 0 == t.feed.entry.length) throw "No data entries found.";
        var e = t.feed.entry[0];
        if ("undefined" != typeof e.gsx$startdate) return i;
        if ("undefined" != typeof e.gsx$year) return n;
        throw "Invalid data format."
    }, s = function(t) {
            return "https://spreadsheets.google.com/feeds/list/" + t.key + "/1/public/values?alt=json"
        }, o = function(i) {
            var i = s(e(i)),
                n = {
                    events: []
                }, a = t.ajax({
                    url: i,
                    async: !1
                });
            return a = JSON.parse(a.responseText), r(a)
        }, r = function(t) {
            for (var e = {
                events: [],
                errors: []
            }, i = a(t), n = 0; n < t.feed.entry.length; n++) try {
                var s = i(t.feed.entry[n]);
                if (s) {
                    var o = "event";
                    "undefined" != typeof s.type && (o = s.type, delete s.type), "title" == o ? e.title = s : e.events.push(s)
                }
            } catch (r) {
                r.message && (r = r.message), e.errors.push(r + " [" + n + "]")
            }
            return e
        }, h = function(i, n) {
            var a = e(i);
            if (a) {
                var s = o(i),
                    r = new t.TimelineConfig(s);
                if (s.errors)
                    for (var h = 0; h < s.errors.length; h++) r.logError(s.errors[h]);
                n(r)
            } else t.getJSON(i, function(e) {
                n(new t.TimelineConfig(e))
            })
        };
    t.ConfigFactory = {
        parseGoogleSpreadsheetURL: e,
        googleFeedJSONtoTimelineJSON: r,
        fromGoogle: function(t) {
            return console.log("VCO.ConfigFactory.fromGoogle is deprecated and will be removed soon. Use VCO.ConfigFactory.makeConfig(url,callback)"), o(t)
        },
        makeConfig: h
    }
}(VCO), VCO.Language = function(t) {
    for (k in VCO.Language.languages.en) this[k] = VCO.Language.languages.en[k];
    if (t && t.language && "string" == typeof t.language && "en" != t.language) {
        var e = t.language;
        if (!(e in VCO.Language.languages)) {
            if (/\.json$/.test(e)) var i = e;
            else {
                var n = "/locale/" + e + ".json",
                    a = t.script_path || VCO.Timeline.source_path;
                /\/$/.test(a) && (n = n.substr(1));
                var i = a + n
            }
            var s = this,
                o = VCO.ajax({
                    url: i,
                    async: !1
                });
            if (200 != o.status) throw "Could not load language [" + e + "]: " + o.statusText;
            VCO.Language.languages[e] = JSON.parse(o.responseText)
        }
        VCO.Util.mergeData(this, VCO.Language.languages[e])
    }
}, VCO.Language.formatNumber = function(t, e) {
    if (e.match(/%(\.(\d+))?f/)) {
        var i = e.match(/%(\.(\d+))?f/),
            n = i[0];
        return i[2] && (t = t.toFixed(i[2])), e.replace(n, t)
    }
    return e
}, VCO.Language.prototype.mergeData = function(t) {
    for (k in VCO.Language.languages.en) t[k] && ("object" == typeof this[k] ? VCO.Util.mergeData(t[k], this[k]) : this[k] = t[k])
}, VCO.Language.fallback = {
    messages: {}
}, VCO.Language.prototype.getMessage = function(t) {
    return this.messages[t] || VCO.Language.fallback.messages[t] || t
}, VCO.Language.prototype._ = VCO.Language.prototype.getMessage, VCO.Language.prototype.formatDate = function(t, e) {
    return t.constructor == Date ? this.formatJSDate(t, e) : t.constructor == VCO.BigYear ? this.formatBigYear(t, e) : t.data && t.data.date_obj ? this.formatDate(t.data.date_obj, e) : (trace("Unfamiliar date presented for formatting"), t.toString())
}, VCO.Language.prototype.formatBigYear = function(t, e) {
    var i = t.year,
        n = this.bigdateformats[e] || this.bigdateformats.fallback;
    if (n) {
        for (var a = 0; a < n.length; a++) {
            var s = n[a];
            if (Math.abs(i / s[0]) > 1) return VCO.Language.formatNumber(Math.abs(i / s[0]), s[1])
        }
        return i.toString()
    }
    return trace("Language file dateformats missing cosmological. Falling back."), VCO.Language.formatNumber(i, e)
}, VCO.Language.prototype.formatJSDate = function(t, e) {
    var i = this,
        n = function(t, e) {
            var n = i.period_labels[t];
            if (n) var t = 12 > e ? n[0] : n[1];
            return "<span class='vco-timeaxis-timesuffix'>" + t + "</span>"
        }, a = !1,
        s = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        o = /[^-+\dA-Z]/g;
    e || (e = "full");
    var r = this.dateformats[e] || VCO.Language.fallback.dateformats[e];
    r || (r = e);
    var h = a ? "getUTC" : "get",
        l = t[h + "Date"](),
        c = t[h + "Day"](),
        d = t[h + "Month"](),
        u = t[h + "FullYear"](),
        m = t[h + "Hours"](),
        f = t[h + "Minutes"](),
        p = t[h + "Seconds"](),
        _ = t[h + "Milliseconds"](),
        g = a ? 0 : t.getTimezoneOffset(),
        v = "",
        y = {
            d: l,
            dd: VCO.Util.pad(l),
            ddd: this.date.day_abbr[c],
            dddd: this.date.day[c],
            m: d + 1,
            mm: VCO.Util.pad(d + 1),
            mmm: this.date.month_abbr[d],
            mmmm: this.date.month[d],
            yy: String(u).slice(2),
            yyyy: 0 > u && this.has_negative_year_modifier() ? Math.abs(u) : u,
            h: m % 12 || 12,
            hh: VCO.Util.pad(m % 12 || 12),
            H: m,
            HH: VCO.Util.pad(m),
            M: f,
            MM: VCO.Util.pad(f),
            s: p,
            ss: VCO.Util.pad(p),
            l: VCO.Util.pad(_, 3),
            L: VCO.Util.pad(_ > 99 ? Math.round(_ / 10) : _),
            t: n("t", m),
            tt: n("tt", m),
            T: n("T", m),
            TT: n("TT", m),
            Z: a ? "UTC" : (String(t).match(s) || [""]).pop().replace(o, ""),
            o: (g > 0 ? "-" : "+") + VCO.Util.pad(100 * Math.floor(Math.abs(g) / 60) + Math.abs(g) % 60, 4),
            S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 != 10) * l % 10]
        }, C = r.replace(VCO.Language.DATE_FORMAT_TOKENS, function(t) {
            return t in y ? y[t] : t.slice(1, t.length - 1)
        });
    return this._applyEra(C, u)
}, VCO.Language.prototype.has_negative_year_modifier = function() {
    return Boolean(this.era_labels.negative_year.prefix || this.era_labels.negative_year.suffix)
}, VCO.Language.prototype._applyEra = function(t, e) {
    var i = 0 > e ? this.era_labels.negative_year : this.era_labels.positive_year,
        n = "";
    return i.prefix && (n += "<span>" + i.prefix + "</span> "), n += t, i.suffix && (n += " <span>" + i.suffix + "</span>"), n
}, VCO.Language.DATE_FORMAT_TOKENS = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g, VCO.Language.languages = {
    en: {
        name: "English",
        lang: "en",
        messages: {
            loading: "Loading",
            wikipedia: "From Wikipedia, the free encyclopedia",
            error: "Error"
        },
        date: {
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            month_abbr: ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            day_abbr: ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]
        },
        era_labels: {
            positive_year: {
                prefix: "",
                suffix: ""
            },
            negative_year: {
                prefix: "",
                suffix: "BCE"
            }
        },
        period_labels: {
            t: ["a", "p"],
            tt: ["am", "pm"],
            T: ["A", "P"],
            TT: ["AM", "PM"]
        },
        dateformats: {
            year: "yyyy",
            month_short: "mmm",
            month: "mmmm yyyy",
            full_short: "mmm d",
            full: "mmmm d',' yyyy",
            time: "h:MM:ss TT' <small>'mmmm d',' yyyy'</small>'",
            time_short: "h:MM:ss TT",
            time_no_seconds_short: "h:MM TT",
            time_no_minutes_short: "h TT",
            time_no_seconds_small_date: "h:MM TT' <small>'mmmm d',' yyyy'</small>'",
            time_milliseconds: "l",
            full_long: "mmm d',' yyyy 'at' h:MM TT",
            full_long_small_date: "h:MM TT' <small>mmm d',' yyyy'</small>'"
        },
        bigdateformats: {
            fallback: [
                [1e9, "%.2f billion years ago"],
                [1e6, "%.1f million years ago"],
                [1e3, "%.1f thousand years ago"],
                [1, "%f years ago"]
            ],
            compact: [
                [1e9, "%.2f bya"],
                [1e6, "%.1f mya"],
                [1e3, "%.1f kya"],
                [1, "%f years ago"]
            ],
            verbose: [
                [1e9, "%.2f billion years ago"],
                [1e6, "%.1f million years ago"],
                [1e3, "%.1f thousand years ago"],
                [1, "%f years ago"]
            ]
        }
    }
}, VCO.Language.fallback = new VCO.Language, VCO.I18NMixins = {
    getLanguage: function() {
        return this.options && this.options.language ? this.options.language : (trace("Expected a language option"), VCO.Language.fallback)
    },
    _: function(t) {
        return this.getLanguage()._(t)
    }
}, VCO.Easings = {
    ease: [.25, .1, .25, 1],
    linear: [0, 0, 1, 1],
    easein: [.42, 0, 1, 1],
    easeout: [0, 0, .58, 1],
    easeinout: [.42, 0, .58, 1]
}, VCO.Ease = {
    KeySpline: function(t) {
        function e(t, e) {
            return 1 - 3 * e + 3 * t
        }

        function i(t, e) {
            return 3 * e - 6 * t
        }

        function n(t) {
            return 3 * t
        }

        function a(t, a, s) {
            return ((e(a, s) * t + i(a, s)) * t + n(a)) * t
        }

        function s(t, a, s) {
            return 3 * e(a, s) * t * t + 2 * i(a, s) * t + n(a)
        }

        function o(e) {
            for (var i = e, n = 0; 4 > n; ++n) {
                var o = s(i, t[0], t[2]);
                if (0 == o) return i;
                var r = a(i, t[0], t[2]) - e;
                i -= r / o
            }
            return i
        }
        this.get = function(e) {
            return t[0] == t[1] && t[2] == t[3] ? e : a(o(e), t[1], t[3])
        }
    },
    easeInSpline: function(t) {
        var e = new VCO.Ease.KeySpline(VCO.Easings.easein);
        return e.get(t)
    },
    easeInOutExpo: function(t) {
        var e = new VCO.Ease.KeySpline(VCO.Easings.easein);
        return e.get(t)
    },
    easeOut: function(t) {
        return Math.sin(t * Math.PI / 2)
    },
    easeOutStrong: function(t) {
        return 1 == t ? 1 : 1 - Math.pow(2, -10 * t)
    },
    easeIn: function(t) {
        return t * t
    },
    easeInStrong: function(t) {
        return 0 == t ? 0 : Math.pow(2, 10 * (t - 1))
    },
    easeOutBounce: function(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    },
    easeInBack: function(t) {
        var e = 1.70158;
        return t * t * ((e + 1) * t - e)
    },
    easeOutBack: function(t) {
        var e = 1.70158;
        return (t -= 1) * t * ((e + 1) * t + e) + 1
    },
    bounce: function(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    },
    bouncePast: function(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
    },
    swingTo: function(t) {
        var e = 1.70158;
        return (t -= 1) * t * ((e + 1) * t + e) + 1
    },
    swingFrom: function(t) {
        var e = 1.70158;
        return t * t * ((e + 1) * t - e)
    },
    elastic: function(t) {
        return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1
    },
    spring: function(t) {
        return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6 * -t)
    },
    blink: function(t, e) {
        return Math.round(t * (e || 5)) % 2
    },
    pulse: function(t, e) {
        return -Math.cos(t * ((e || 5) - .5) * 2 * Math.PI) / 2 + .5
    },
    wobble: function(t) {
        return -Math.cos(t * Math.PI * (9 * t)) / 2 + .5
    },
    sinusoidal: function(t) {
        return -Math.cos(t * Math.PI) / 2 + .5
    },
    flicker: function(t) {
        var t = t + (Math.random() - .5) / 5;
        return easings.sinusoidal(0 > t ? 0 : t > 1 ? 1 : t)
    },
    mirror: function(t) {
        return .5 > t ? easings.sinusoidal(2 * t) : easings.sinusoidal(1 - 2 * (t - .5))
    },
    easeInQuad: function(t) {
        return t * t
    },
    easeOutQuad: function(t) {
        return t * (2 - t)
    },
    easeInOutQuad: function(t) {
        return .5 > t ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic: function(t) {
        return t * t * t
    },
    easeOutCubic: function(t) {
        return --t * t * t + 1
    },
    easeInOutCubic: function(t) {
        return .5 > t ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart: function(t) {
        return t * t * t * t
    },
    easeOutQuart: function(t) {
        return 1 - --t * t * t * t
    },
    easeInOutQuart: function(t) {
        return .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
    },
    easeInQuint: function(t) {
        return t * t * t * t * t
    },
    easeOutQuint: function(t) {
        return 1 + --t * t * t * t * t
    },
    easeInOutQuint: function(t) {
        return .5 > t ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
    }
}, VCO.Animate = function(t, e) {
    var i = new vcoanimate(t, e),
        n;
    return i
}, window.vcoanimate = function() {
    function t(t, e, i) {
        if (Array.prototype.indexOf) return t.indexOf(e);
        for (i = 0; i < t.length; ++i)
            if (t[i] === e) return i
    }

    function e(t) {
        var i, n = U.length;
        for (C && t > 1e12 && (t = b()), O && (t = b()), i = n; i--;) U[i](t);
        U.length && j(e)
    }

    function i(t) {
        1 === U.push(t) && j(e)
    }

    function n(e) {
        var i, n = t(U, e);
        n >= 0 && (i = U.slice(n + 1), U.length = n, U = U.concat(i))
    }

    function a(t, e) {
        var i = {}, n;
        return (n = t.match(D)) && (i.rotate = p(n[1], e ? e.rotate : null)), (n = t.match(T)) && (i.scale = p(n[1], e ? e.scale : null)), (n = t.match(E)) && (i.skewx = p(n[1], e ? e.skewx : null), i.skewy = p(n[3], e ? e.skewy : null)), (n = t.match(S)) && (i.translatex = p(n[1], e ? e.translatex : null), i.translatey = p(n[3], e ? e.translatey : null)), i
    }

    function s(t) {
        var e = "";
        return "rotate" in t && (e += "rotate(" + t.rotate + "deg) "), "scale" in t && (e += "scale(" + t.scale + ") "), "translatex" in t && (e += "translate(" + t.translatex + "px," + t.translatey + "px) "), "skewx" in t && (e += "skew(" + t.skewx + "deg," + t.skewy + "deg)"), e
    }

    function o(t, e, i) {
        return "#" + (1 << 24 | t << 16 | e << 8 | i).toString(16).slice(1)
    }

    function r(t) {
        var e = t.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return (e ? o(e[1], e[2], e[3]) : t).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3")
    }

    function h(t) {
        return t.replace(/-(.)/g, function(t, e) {
            return e.toUpperCase()
        })
    }

    function l(t) {
        return "function" == typeof t
    }

    function c(t) {
        return Math.sin(t * Math.PI / 2)
    }

    function d(t, e, a, s, o, r) {
        function h(t) {
            var i = t - f;
            return i > d || p ? (r = isFinite(r) ? r : 1, p ? g && e(r) : e(r), n(h), a && a.apply(u)) : void e(isFinite(r) ? m * s(i / d) + o : s(i / d))
        }
        s = l(s) ? s : _.easings[s] || c;
        var d = t || x,
            u = this,
            m = r - o,
            f = b(),
            p = 0,
            g = 0;
        return i(h), {
            stop: function(t) {
                p = 1, g = t, t || (a = null)
            }
        }
    }

    function u(t, e) {
        var i = t.length,
            n = [],
            a, s;
        for (a = 0; i > a; ++a) n[a] = [t[a][0], t[a][1]];
        for (s = 1; i > s; ++s)
            for (a = 0; i - s > a; ++a) n[a][0] = (1 - e) * n[a][0] + e * n[parseInt(a + 1, 10)][0], n[a][1] = (1 - e) * n[a][1] + e * n[parseInt(a + 1, 10)][1];
        return [n[0][0], n[0][1]]
    }

    function m(t, e, i) {
        var n = [],
            a, s, o, r;
        for (a = 0; 6 > a; a++) o = Math.min(15, parseInt(e.charAt(a), 16)), r = Math.min(15, parseInt(i.charAt(a), 16)), s = Math.floor((r - o) * t + o), s = s > 15 ? 15 : 0 > s ? 0 : s, n[a] = s.toString(16);
        return "#" + n.join("")
    }

    function f(t, e, i, n, a, s, o) {
        if ("transform" == a) {
            o = {};
            for (var r in i[s][a]) o[r] = r in n[s][a] ? Math.round(((n[s][a][r] - i[s][a][r]) * t + i[s][a][r]) * x) / x : i[s][a][r];
            return o
        }
        return "string" == typeof i[s][a] ? m(t, i[s][a], n[s][a]) : (o = Math.round(((n[s][a] - i[s][a]) * t + i[s][a]) * x) / x, a in L || (o += e[s][a] || "px"), o)
    }

    function p(t, e, i, n, a) {
        return (i = k.exec(t)) ? (a = parseFloat(i[2])) && e + ("+" == i[1] ? 1 : -1) * a : parseFloat(t)
    }

    function _(t, e) {
        var i = t ? i = isFinite(t.length) ? t : [t] : [],
            n, o = e.complete,
            c = e.duration,
            m = e.easing,
            _ = e.bezier,
            g = [],
            v = [],
            y = [],
            C = [],
            b, w;
        for (_ && (b = e.left, w = e.top, delete e.right, delete e.bottom, delete e.left, delete e.top), n = i.length; n--;) {
            if (g[n] = {}, v[n] = {}, y[n] = {}, _) {
                var O = A(i[n], "left"),
                    x = A(i[n], "top"),
                    k = [p(l(b) ? b(i[n]) : b || 0, parseFloat(O)), p(l(w) ? w(i[n]) : w || 0, parseFloat(x))];
                C[n] = l(_) ? _(i[n], k) : _, C[n].push(k), C[n].unshift([parseInt(O, 10), parseInt(x, 10)])
            }
            for (var D in e) {
                switch (D) {
                    case "complete":
                    case "duration":
                    case "easing":
                    case "bezier":
                        continue
                }
                var T = A(i[n], D),
                    E, S = l(e[D]) ? e[D](i[n]) : e[D];
                "string" != typeof S || !V.test(S) || V.test(T) ? (g[n][D] = "transform" == D ? a(T) : "string" == typeof S && V.test(S) ? r(T).slice(1) : parseFloat(T), v[n][D] = "transform" == D ? a(S, g[n][D]) : "string" == typeof S && "#" == S.charAt(0) ? r(S).slice(1) : p(S, parseFloat(T)), "string" == typeof S && (E = S.match(M)) && (y[n][D] = E[1])) : delete e[D]
            }
        }
        return d.apply(i, [c,
            function(t, a, o) {
                for (n = i.length; n--;) {
                    _ && (o = u(C[n], t), i[n].style.left = o[0] + "px", i[n].style.top = o[1] + "px");
                    for (var r in e) a = f(t, y, g, v, r, n), "transform" == r ? i[n].style[N] = s(a) : "opacity" != r || I ? i[n].style[h(r)] = a : i[n].style.filter = "alpha(opacity=" + 100 * a + ")"
                }
            },
            o, m
        ])
    }
    var g = document,
        v = window,
        y = v.performance,
        C = y && (y.now || y.webkitNow || y.msNow || y.mozNow),
        b = C ? function() {
            return C.call(y)
        } : function() {
            return +new Date
        }, w = g.documentElement,
        O = !1,
        x = 1e3,
        V = /^rgb\(|#/,
        k = /^([+\-])=([\d\.]+)/,
        M = /^(?:[\+\-]=?)?\d+(?:\.\d+)?(%|in|cm|mm|em|ex|pt|pc|px)$/,
        D = /rotate\(((?:[+\-]=)?([\-\d\.]+))deg\)/,
        T = /scale\(((?:[+\-]=)?([\d\.]+))\)/,
        E = /skew\(((?:[+\-]=)?([\-\d\.]+))deg, ?((?:[+\-]=)?([\-\d\.]+))deg\)/,
        S = /translate\(((?:[+\-]=)?([\-\d\.]+))px, ?((?:[+\-]=)?([\-\d\.]+))px\)/,
        L = {
            lineHeight: 1,
            zoom: 1,
            zIndex: 1,
            opacity: 1,
            transform: 1
        }, N = function() {
            var t = g.createElement("a").style,
                e = ["webkitTransform", "MozTransform", "OTransform", "msTransform", "Transform"],
                i;
            for (i = 0; i < e.length; i++)
                if (e[i] in t) return e[i]
        }(),
        I = function() {
            return "undefined" != typeof g.createElement("a").style.opacity
        }(),
        A = g.defaultView && g.defaultView.getComputedStyle ? function(t, e) {
            e = "transform" == e ? N : e, e = h(e);
            var i = null,
                n = g.defaultView.getComputedStyle(t, "");
            return n && (i = n[e]), t.style[e] || i
        } : w.currentStyle ? function(t, e) {
            if (e = h(e), "opacity" == e) {
                var i = 100;
                try {
                    i = t.filters["DXImageTransform.Microsoft.Alpha"].opacity
                } catch (n) {
                    try {
                        i = t.filters("alpha").opacity
                    } catch (a) {}
                }
                return i / 100
            }
            var s = t.currentStyle ? t.currentStyle[e] : null;
            return t.style[e] || s
        } : function(t, e) {
            return t.style[h(e)]
        }, j = function() {
            return v.requestAnimationFrame || v.webkitRequestAnimationFrame || v.mozRequestAnimationFrame || v.msRequestAnimationFrame || v.oRequestAnimationFrame || function(t) {
                v.setTimeout(function() {
                    t(+new Date)
                }, 17)
            }
        }(),
        U = [];
    return j(function(t) {
        O = t > 1e12 != b() > 1e12
    }), _.tween = d, _.getStyle = A, _.bezier = u, _.transform = N, _.parseTransform = a, _.formatTransform = s, _.easings = {}, _
}(), VCO.Point = function(t, e, i) {
    this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
}, VCO.Point.prototype = {
    add: function(t) {
        return this.clone()._add(t)
    },
    _add: function(t) {
        return this.x += t.x, this.y += t.y, this
    },
    subtract: function(t) {
        return this.clone()._subtract(t)
    },
    _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this
    },
    divideBy: function(t, e) {
        return new VCO.Point(this.x / t, this.y / t, e)
    },
    multiplyBy: function(t) {
        return new VCO.Point(this.x * t, this.y * t)
    },
    distanceTo: function(t) {
        var e = t.x - this.x,
            i = t.y - this.y;
        return Math.sqrt(e * e + i * i)
    },
    round: function() {
        return this.clone()._round()
    },
    _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    },
    clone: function() {
        return new VCO.Point(this.x, this.y)
    },
    toString: function() {
        return "Point(" + VCO.Util.formatNum(this.x) + ", " + VCO.Util.formatNum(this.y) + ")"
    }
}, VCO.DomMixins = {
    show: function(t) {
        t || (this._el.container.style.display = "block")
    },
    hide: function(t) {
        this._el.container.style.display = "none"
    },
    addTo: function(t) {
        t.appendChild(this._el.container), this.onAdd()
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container), this.onRemove()
    },
    animatePosition: function(t, e) {
        var i = {
            duration: this.options.duration,
            easing: this.options.ease
        };
        for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n] + "px");
        this.animator && this.animator.stop(), this.animator = VCO.Animate(e, i)
    },
    onLoaded: function() {
        this.fire("loaded", this.data)
    },
    onAdd: function() {
        this.fire("added", this.data)
    },
    onRemove: function() {
        this.fire("removed", this.data)
    },
    setPosition: function(t, e) {
        for (var i in t) t.hasOwnProperty(i) && (e ? e.style[i] = t[i] + "px" : this._el.container.style[i] = t[i] + "px")
    },
    getPosition: function() {
        return VCO.Dom.getPosition(this._el.container)
    }
}, VCO.Dom = {
    get: function(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    },
    getByClass: function(t) {
        return t ? document.getElementsByClassName(t) : void 0
    },
    create: function(t, e, i) {
        var n = document.createElement(t);
        return n.className = e, i && i.appendChild(n), n
    },
    createText: function(t, e) {
        var i = document.createTextNode(t);
        return e && e.appendChild(i), i
    },
    getTranslateString: function(t) {
        return VCO.Dom.TRANSLATE_OPEN + t.x + "px," + t.y + "px" + VCO.Dom.TRANSLATE_CLOSE
    },
    setPosition: function(t, e) {
        t._vco_pos = e, VCO.Browser.webkit3d ? (t.style[VCO.Dom.TRANSFORM] = VCO.Dom.getTranslateString(e), VCO.Browser.android && (t.style["-webkit-perspective"] = "1000", t.style["-webkit-backface-visibility"] = "hidden")) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
    },
    getPosition: function(t) {
        for (var e = {
            x: 0,
            y: 0
        }; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) e.x += t.offsetLeft, e.y += t.offsetTop, t = t.offsetParent;
        return e
    },
    testProp: function(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
            if (t[i] in e) return t[i];
        return !1
    }
}, VCO.Util.extend(VCO.Dom, {
    TRANSITION: VCO.Dom.testProp(["transition", "webkitTransition", "OTransition", "MozTransition", "msTransition"]),
    TRANSFORM: VCO.Dom.testProp(["transformProperty", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]),
    TRANSLATE_OPEN: "translate" + (VCO.Browser.webkit3d ? "3d(" : "("),
    TRANSLATE_CLOSE: VCO.Browser.webkit3d ? ",0)" : ")"
}), VCO.DomUtil = {
    get: function(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    },
    getStyle: function(t, e) {
        var i = t.style[e];
        if (!i && t.currentStyle && (i = t.currentStyle[e]), !i || "auto" === i) {
            var n = document.defaultView.getComputedStyle(t, null);
            i = n ? n[e] : null
        }
        return "auto" === i ? null : i
    },
    getViewportOffset: function(t) {
        var e = 0,
            i = 0,
            n = t,
            a = document.body;
        do {
            if (e += n.offsetTop || 0, i += n.offsetLeft || 0, n.offsetParent === a && "absolute" === VCO.DomUtil.getStyle(n, "position")) break;
            n = n.offsetParent
        } while (n);
        n = t;
        do {
            if (n === a) break;
            e -= n.scrollTop || 0, i -= n.scrollLeft || 0, n = n.parentNode
        } while (n);
        return new VCO.Point(i, e)
    },
    create: function(t, e, i) {
        var n = document.createElement(t);
        return n.className = e, i && i.appendChild(n), n
    },
    disableTextSelection: function() {
        document.selection && document.selection.empty && document.selection.empty(), this._onselectstart || (this._onselectstart = document.onselectstart, document.onselectstart = VCO.Util.falseFn)
    },
    enableTextSelection: function() {
        document.onselectstart = this._onselectstart, this._onselectstart = null
    },
    hasClass: function(t, e) {
        return t.className.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
    },
    addClass: function(t, e) {
        VCO.DomUtil.hasClass(t, e) || (t.className += (t.className ? " " : "") + e)
    },
    removeClass: function(t, e) {
        t.className = t.className.replace(/(\S+)\s*/g, function(t, i) {
            return i === e ? "" : t
        }).replace(/^\s+/, "")
    },
    setOpacity: function(t, e) {
        VCO.Browser.ie ? t.style.filter = "alpha(opacity=" + Math.round(100 * e) + ")" : t.style.opacity = e
    },
    testProp: function(t) {
        for (var e = document.documentElement.style, i = 0; i < t.length; i++)
            if (t[i] in e) return t[i];
        return !1
    },
    getTranslateString: function(t) {
        return VCO.DomUtil.TRANSLATE_OPEN + t.x + "px," + t.y + "px" + VCO.DomUtil.TRANSLATE_CLOSE
    },
    getScaleString: function(t, e) {
        var i = VCO.DomUtil.getTranslateString(e),
            n = " scale(" + t + ") ",
            a = VCO.DomUtil.getTranslateString(e.multiplyBy(-1));
        return i + n + a
    },
    setPosition: function(t, e) {
        t._vco_pos = e, VCO.Browser.webkit3d ? (t.style[VCO.DomUtil.TRANSFORM] = VCO.DomUtil.getTranslateString(e), VCO.Browser.android && (t.style["-webkit-perspective"] = "1000", t.style["-webkit-backface-visibility"] = "hidden")) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
    },
    getPosition: function(t) {
        return t._vco_pos
    }
}, VCO.DomEvent = {
    addListener: function(t, e, i, n) {
        var a = VCO.Util.stamp(i),
            s = "_vco_" + e + a;
        if (!t[s]) {
            var o = function(e) {
                return i.call(n || t, e || VCO.DomEvent._getEvent())
            };
            if (VCO.Browser.touch && "dblclick" === e && this.addDoubleTapListener) this.addDoubleTapListener(t, o, a);
            else if ("addEventListener" in t)
                if ("mousewheel" === e) t.addEventListener("DOMMouseScroll", o, !1), t.addEventListener(e, o, !1);
                else if ("mouseenter" === e || "mouseleave" === e) {
                var r = o,
                    h = "mouseenter" === e ? "mouseover" : "mouseout";
                o = function(e) {
                    return VCO.DomEvent._checkMouse(t, e) ? r(e) : void 0
                }, t.addEventListener(h, o, !1)
            } else t.addEventListener(e, o, !1);
            else "attachEvent" in t && t.attachEvent("on" + e, o);
            t[s] = o
        }
    },
    removeListener: function(t, e, i) {
        var n = VCO.Util.stamp(i),
            a = "_vco_" + e + n,
            s = t[a];
        s && (VCO.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, n) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", s, !1), t.removeEventListener(e, s, !1)) : "mouseenter" === e || "mouseleave" === e ? t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseout", s, !1) : t.removeEventListener(e, s, !1) : "detachEvent" in t && t.detachEvent("on" + e, s), t[a] = null)
    },
    _checkMouse: function(t, e) {
        var i = e.relatedTarget;
        if (!i) return !0;
        try {
            for (; i && i !== t;) i = i.parentNode
        } catch (n) {
            return !1
        }
        return i !== t
    },
    _getEvent: function() {
        var t = window.event;
        if (!t)
            for (var e = arguments.callee.caller; e && (t = e.arguments[0], !t || window.Event !== t.constructor);) e = e.caller;
        return t
    },
    stopPropagation: function(t) {
        t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
    },
    disableClickPropagation: function(t) {
        VCO.DomEvent.addListener(t, VCO.Draggable.START, VCO.DomEvent.stopPropagation), VCO.DomEvent.addListener(t, "click", VCO.DomEvent.stopPropagation), VCO.DomEvent.addListener(t, "dblclick", VCO.DomEvent.stopPropagation)
    },
    preventDefault: function(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    },
    stop: function(t) {
        VCO.DomEvent.preventDefault(t), VCO.DomEvent.stopPropagation(t)
    },
    getWheelDelta: function(t) {
        var e = 0;
        return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
    }
}, VCO.StyleSheet = VCO.Class.extend({
    includes: [VCO.Events],
    _el: {},
    initialize: function() {
        this.style = document.createElement("style"), this.style.appendChild(document.createTextNode("")), document.head.appendChild(this.style), this.sheet = this.style.sheet
    },
    addRule: function(t, e, i) {
        var n = 0;
        i && (n = i), "insertRule" in this.sheet ? this.sheet.insertRule(t + "{" + e + "}", n) : "addRule" in this.sheet && this.sheet.addRule(t, e, n)
    },
    onLoaded: function(t) {
        this._state.loaded = !0, this.fire("loaded", this.data)
    }
}), VCO.Date = VCO.Class.extend({
    initialize: function(t, e, i) {
        "number" == typeof t ? this.data = {
            format: "yyyy mmmm",
            date_obj: new Date(t)
        } : Date == t.constructor ? this.data = {
            format: "yyyy mmmm",
            date_obj: t
        } : (this.data = JSON.parse(JSON.stringify(t)), this._createDateObj()), this._setFormat(e, i)
    },
    setDateFormat: function(t) {
        this.data.format = t
    },
    getDisplayDate: function(t, e) {
        if (this.data.display_date) return this.data.display_date;
        t || (t = VCO.Language.fallback), t.constructor != VCO.Language && (trace("First argument to getDisplayDate must be VCO.Language"), t = VCO.Language.fallback);
        var i = e || this.data.format;
        return t.formatDate(this.data.date_obj, i)
    },
    getMillisecond: function() {
        return this.getTime()
    },
    getTime: function() {
        return this.data.date_obj.getTime()
    },
    isBefore: function(t) {
        if (!this.data.date_obj.constructor == t.data.date_obj.constructor) throw "Can't compare VCO.Dates on different scales";
        return "isBefore" in this.data.date_obj ? this.data.date_obj.isBefore(t.data.date_obj) : this.data.date_obj < t.data.date_obj
    },
    isAfter: function(t) {
        if (!this.data.date_obj.constructor == t.data.date_obj.constructor) throw "Can't compare VCO.Dates on different scales";
        return "isAfter" in this.data.date_obj ? this.data.date_obj.isAfter(t.data.date_obj) : this.data.date_obj > t.data.date_obj
    },
    floor: function(t) {
        for (var e = new Date(this.data.date_obj.getTime()), i = 0; i < VCO.Date.SCALES.length; i++)
            if (VCO.Date.SCALES[i][2](e), VCO.Date.SCALES[i][0] == t) return new VCO.Date(e);
        throw "invalid scale " + t
    },
    _getDateData: function() {
        var t = {
            year: 0,
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
        VCO.Util.mergeData(t, this.data);
        var e = VCO.Date.DATE_PARTS;
        for (var i in e) {
            var n = parseInt(t[e[i]]);
            isNaN(n) && (n = 4 == i || 5 == i ? 1 : 0), t[e[i]] = n
        }
        return t.month > 0 && t.month <= 12 && (t.month = t.month - 1), t
    },
    _createDateObj: function() {
        var t = this._getDateData();
        this.data.date_obj = new Date(t.year, t.month, t.day, t.hour, t.minute, t.second, t.millisecond), this.data.date_obj.getFullYear() != t.year && this.data.date_obj.setFullYear(t.year)
    },
    findBestFormat: function(t) {
        for (var e = VCO.Date.DATE_PARTS, i = "", n = 0; n < e.length; n++)
            if (this.data[e[n]]) return t ? t in VCO.Date.BEST_DATEFORMATS || (t = "short") : t = "base", VCO.Date.BEST_DATEFORMATS[t][e[n]];
        return ""
    },
    _setFormat: function(t, e) {
        t ? this.data.format = t : this.data.format || (this.data.format = this.findBestFormat()), e ? this.data.format_short = e : this.data.format_short || (this.data.format_short = this.findBestFormat(!0))
    }
}), VCO.Date.makeDate = function(t) {
    var e = new VCO.Date(t);
    return isNaN(e.getTime()) ? new VCO.BigDate(t) : e
}, VCO.BigYear = VCO.Class.extend({
    initialize: function(t) {
        if (this.year = parseInt(t), isNaN(this.year)) throw "Invalid year " + t
    },
    isBefore: function(t) {
        return this.year < t.year
    },
    isAfter: function(t) {
        return this.year > t.year
    },
    getTime: function() {
        return this.year
    }
}),
function(t) {
    t.SCALES = [
        ["millisecond", 1,
            function(t) {}
        ],
        ["second", 1e3,
            function(t) {
                t.setMilliseconds(0)
            }
        ],
        ["minute", 6e4,
            function(t) {
                t.setSeconds(0)
            }
        ],
        ["hour", 36e5,
            function(t) {
                t.setMinutes(0)
            }
        ],
        ["day", 864e5,
            function(t) {
                t.setHours(0)
            }
        ],
        ["month", 2592e6,
            function(t) {
                t.setDate(1)
            }
        ],
        ["year", 31536e6,
            function(t) {
                t.setMonth(0)
            }
        ],
        ["decade", 31536e7,
            function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 10)
            }
        ],
        ["century", 31536e8,
            function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 100)
            }
        ],
        ["millennium", 31536e9,
            function(t) {
                var e = t.getFullYear();
                t.setFullYear(e - e % 1e3)
            }
        ]
    ], t.DATE_PARTS = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
    var e = /^([\+-]?\d+?)(-\d{2}?)?(-\d{2}?)?$/,
        i = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    t.parseISODate = function(t) {
        var e = new Date(t);
        if (isNaN(e)) throw "Invalid date: " + t;
        return {
            year: e.getFullYear(),
            month: e.getMonth() + 1,
            day: e.getDate(),
            hour: e.getHours(),
            minute: e.getMinutes(),
            second: e.getSeconds(),
            millisecond: e.getMilliseconds()
        }
    }, t.parseDate = function(n) {
        if (n.match(e)) {
            var a = n.match(e).slice(1),
                s = {
                    year: a[0].replace("+", "")
                };
            return a[1] && (s.month = a[1].replace("-", "")), a[2] && (s.day = a[2].replace("-", "")), s
        }
        if (n.match(i)) return t.parseISODate(n);
        if (n.match(/^\-?\d+$/)) return {
            year: n
        };
        var o = {};
        if (n.match(/\d+\/\d+\/\d+/)) {
            var r = n.match(/\d+\/\d+\/\d+/)[0];
            n = VCO.Util.trim(n.replace(r, ""));
            var h = r.split("/");
            o.month = h[0], o.day = h[1], o.year = h[2]
        }
        if (n.match(/\d+\/\d+/)) {
            var r = n.match(/\d+\/\d+/)[0];
            n = VCO.Util.trim(n.replace(r, ""));
            var h = r.split("/");
            o.month = h[0], o.year = h[1]
        }
        if (n.match(":")) {
            var l = n.split(":");
            o.hour = l[0], o.minute = l[1], l[2] && (second_parts = l[2].split("."), o.second = second_parts[0], o.millisecond = second_parts[1])
        }
        return o
    }, t.BEST_DATEFORMATS = {
        base: {
            millisecond: "time_short",
            second: "time",
            minute: "time_no_seconds_small_date",
            hour: "time_no_seconds_small_date",
            day: "full",
            month: "month",
            year: "year",
            decade: "year",
            century: "year",
            millennium: "year",
            age: "fallback",
            epoch: "fallback",
            era: "fallback",
            eon: "fallback",
            eon2: "fallback"
        },
        "short": {
            millisecond: "time_short",
            second: "time_short",
            minute: "time_no_seconds_short",
            hour: "time_no_minutes_short",
            day: "full_short",
            month: "month_short",
            year: "year",
            decade: "year",
            century: "year",
            millennium: "year",
            age: "fallback",
            epoch: "fallback",
            era: "fallback",
            eon: "fallback",
            eon2: "fallback"
        }
    }
}(VCO.Date), VCO.BigDate = VCO.Date.extend({
    initialize: function(t, e, i) {
        VCO.BigYear == t.constructor ? this.data = {
            date_obj: t
        } : (this.data = JSON.parse(JSON.stringify(t)), this._createDateObj()), this._setFormat(e, i)
    },
    _createDateObj: function() {
        var t = this._getDateData();
        this.data.date_obj = new VCO.BigYear(t.year)
    },
    floor: function(t) {
        for (var e = 0; e < VCO.BigDate.SCALES.length; e++)
            if (VCO.BigDate.SCALES[e][0] == t) {
                var i = VCO.BigDate.SCALES[e][2](this.data.date_obj);
                return new VCO.BigDate(i)
            }
        throw "invalid scale " + t
    }
}),
function(t) {
    var e = 1e6,
        i = 10 * e,
        n = 10 * i,
        a = 10 * n,
        s = function(t) {
            return function(e) {
                var i = e.getTime();
                return new VCO.BigYear(Math.floor(i / t) * t)
            }
        };
    t.SCALES = [
        ["age", e, new s(e)],
        ["epoch", i, new s(i)],
        ["era", n, new s(n)],
        ["eon", a, new s(a)]
    ]
}(VCO.BigDate), VCO.DateUtil = {
    get: function(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    },
    sortByDate: function(t, e) {
        var e = e || "start_date";
        t.sort(function(t, i) {
            return t[e].isBefore(i[e]) ? -1 : t[e].isAfter(i[e]) ? 1 : 0
        })
    },
    parseTime: function(t) {
        var e = {
            hour: null,
            minute: null,
            second: null,
            millisecond: null
        }, i = null,
            n = t.match(/(\s*[AaPp]\.?[Mm]\.?\s*)$/);
        n && (i = VCO.Util.trim(n[0]), t = VCO.Util.trim(t.substring(0, t.lastIndexOf(i))));
        var a = [],
            s = t.match(/^\s*(\d{1,2})(\d{2})\s*$/);
        if (s ? a = s.slice(1) : (a = t.split(":"), 1 == a.length && (a = t.split("."))), a.length > 4) throw new Error("Invalid time: misuse of : or . as separator.");
        if (e.hour = parseInt(a[0]), i && "p" == i.toLowerCase()[0] && 12 != e.hour ? e.hour += 12 : i && "a" == i.toLowerCase()[0] && 12 == e.hour && (e.hour = 0), isNaN(e.hour) || e.hour < 0 || e.hour > 23) throw new Error("Invalid time (hour) " + e.hour);
        if (a.length > 1 && (e.minute = parseInt(a[1]), isNaN(e.minute))) throw new Error("Invalid time (minute)");
        if (a.length > 2) {
            var o = a[2].split(/[\.,]/);
            if (a = o.concat(a.slice(3)), a.length > 2) throw new Error("Invalid time (seconds and fractional seconds)");
            if (e.second = parseInt(a[0]), isNaN(e.second)) throw new Error("Invalid time (second)");
            if (2 == a.length) {
                var r = parseInt(a[1]);
                if (isNaN(r)) throw new Error("Invalid time (fractional seconds)");
                e.millisecond = 100 * r
            }
        }
        return e
    },
    SCALE_DATE_CLASSES: {
        human: VCO.Date,
        cosmological: VCO.BigDate
    }
}, VCO.Draggable = VCO.Class.extend({
    includes: VCO.Events,
    _el: {},
    mousedrag: {
        down: "mousedown",
        up: "mouseup",
        leave: "mouseleave",
        move: "mousemove"
    },
    touchdrag: {
        down: "touchstart",
        up: "touchend",
        leave: "mouseleave",
        move: "touchmove"
    },
    initialize: function(t, e, i) {
        this._el = {
            drag: t,
            move: t
        }, i && (this._el.move = i), this.options = {
            enable: {
                x: !0,
                y: !0
            },
            constraint: {
                top: !1,
                bottom: !1,
                left: !1,
                right: !1
            },
            momentum_multiplier: 2e3,
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint
        }, this.animator = null, this.dragevent = this.mousedrag, VCO.Browser.touch && (this.dragevent = this.touchdrag), this.data = {
            sliding: !1,
            direction: "none",
            pagex: {
                start: 0,
                end: 0
            },
            pagey: {
                start: 0,
                end: 0
            },
            pos: {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            new_pos: {
                x: 0,
                y: 0
            },
            new_pos_parent: {
                x: 0,
                y: 0
            },
            time: {
                start: 0,
                end: 0
            },
            touch: !1
        }, VCO.Util.mergeData(this.options, e)
    },
    enable: function(t) {
        this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
    },
    disable: function() {
        VCO.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
    },
    stopMomentum: function() {
        this.animator && this.animator.stop()
    },
    updateConstraint: function(t) {
        this.options.constraint = t
    },
    _onDragStart: function(t) {
        VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x && (this._el.move.style.left = this.data.pagex.start - this._el.move.offsetWidth / 2 + "px"), this.options.enable.y && (this._el.move.style.top = this.data.pagey.start - this._el.move.offsetHeight / 2 + "px"), this.data.pos.start = VCO.Dom.getPosition(this._el.drag), this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), VCO.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
    },
    _onDragEnd: function(t) {
        this.data.sliding = !1, VCO.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
    },
    _onDragMove: function(t) {
        t.preventDefault(), this.data.sliding = !0, VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), this.data.pos.end = VCO.Dom.getPosition(this._el.drag), this.data.new_pos.x = -(this.data.pagex.start - this.data.pagex.end - this.data.pos.start.x), this.data.new_pos.y = -(this.data.pagey.start - this.data.pagey.end - this.data.pos.start.y), this.options.enable.x && (this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && (this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
    },
    _momentum: function() {
        var t = {
            x: 0,
            y: 0,
            time: 0
        }, e = {
                x: 0,
                y: 0,
                time: 0
            }, i = !1,
            n = "";
        VCO.Browser.touch, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.pos.end.x + t.x), this.data.new_pos.y = Math.min(this.data.pos.end.y + t.y), this.options.enable.x ? this.data.new_pos.x < 0 && (this.data.new_pos.x = 0) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 3e3 && (i = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right")), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down")), this._animateMomentum(), i && this.fire("swipe_" + this.data.direction, this.data)
    },
    _animateMomentum: function() {
        var t = {
            x: this.data.new_pos.x,
            y: this.data.new_pos.y
        }, e = {
                duration: this.options.duration,
                easing: VCO.Ease.easeOutStrong
            };
        this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && ((this.options.constraint.left || this.options.constraint.right) && (t.x > this.options.constraint.left ? t.x = this.options.constraint.left : t.x < this.options.constraint.right && (t.x = this.options.constraint.right)), e.left = Math.floor(t.x) + "px"), this.animator = VCO.Animate(this._el.move, e), this.fire("momentum", this.data)
    }
}), VCO.Swipable = VCO.Class.extend({
    includes: VCO.Events,
    _el: {},
    mousedrag: {
        down: "mousedown",
        up: "mouseup",
        leave: "mouseleave",
        move: "mousemove"
    },
    touchdrag: {
        down: "touchstart",
        up: "touchend",
        leave: "mouseleave",
        move: "touchmove"
    },
    initialize: function(t, e, i) {
        this._el = {
            drag: t,
            move: t
        }, e && (this._el.move = e), this.options = {
            snap: !1,
            enable: {
                x: !0,
                y: !0
            },
            constraint: {
                top: !1,
                bottom: !1,
                left: 0,
                right: !1
            },
            momentum_multiplier: 2e3,
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint
        }, this.animator = null, this.dragevent = this.mousedrag, VCO.Browser.touch && (this.dragevent = this.touchdrag), this.data = {
            sliding: !1,
            direction: "none",
            pagex: {
                start: 0,
                end: 0
            },
            pagey: {
                start: 0,
                end: 0
            },
            pos: {
                start: {
                    x: 0,
                    y: 0
                },
                end: {
                    x: 0,
                    y: 0
                }
            },
            new_pos: {
                x: 0,
                y: 0
            },
            new_pos_parent: {
                x: 0,
                y: 0
            },
            time: {
                start: 0,
                end: 0
            },
            touch: !1
        }, VCO.Util.mergeData(this.options, i)
    },
    enable: function(t) {
        VCO.DomEvent.addListener(this._el.drag, this.dragevent.down, this._onDragStart, this), VCO.DomEvent.addListener(this._el.drag, this.dragevent.up, this._onDragEnd, this), this.data.pos.start = 0, this._el.move.style.left = this.data.pos.start.x + "px", this._el.move.style.top = this.data.pos.start.y + "px", this._el.move.style.position = "absolute"
    },
    disable: function() {
        VCO.DomEvent.removeListener(this._el.drag, this.dragevent.down, this._onDragStart, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.up, this._onDragEnd, this)
    },
    stopMomentum: function() {
        this.animator && this.animator.stop()
    },
    updateConstraint: function(t) {
        this.options.constraint = t
    },
    _onDragStart: function(t) {
        this.animator && this.animator.stop(), VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.start = t.originalEvent.touches[0].screenX, this.data.pagey.start = t.originalEvent.touches[0].screenY) : (this.data.pagex.start = t.targetTouches[0].screenX, this.data.pagey.start = t.targetTouches[0].screenY) : (this.data.pagex.start = t.pageX, this.data.pagey.start = t.pageY), this.options.enable.x, this.options.enable.y, this.data.pos.start = {
            x: this._el.move.offsetLeft,
            y: this._el.move.offsetTop
        }, this.data.time.start = (new Date).getTime(), this.fire("dragstart", this.data), VCO.DomEvent.addListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.addListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this)
    },
    _onDragEnd: function(t) {
        this.data.sliding = !1, VCO.DomEvent.removeListener(this._el.drag, this.dragevent.move, this._onDragMove, this), VCO.DomEvent.removeListener(this._el.drag, this.dragevent.leave, this._onDragEnd, this), this.fire("dragend", this.data), this._momentum()
    },
    _onDragMove: function(t) {
        var e = {
            x: 0,
            y: 0
        };
        this.data.sliding = !0, VCO.Browser.touch ? t.originalEvent ? (this.data.pagex.end = t.originalEvent.touches[0].screenX, this.data.pagey.end = t.originalEvent.touches[0].screenY) : (this.data.pagex.end = t.targetTouches[0].screenX, this.data.pagey.end = t.targetTouches[0].screenY) : (this.data.pagex.end = t.pageX, this.data.pagey.end = t.pageY), e.x = this.data.pagex.start - this.data.pagex.end, e.y = this.data.pagey.start - this.data.pagey.end, this.data.pos.end = {
            x: this._el.drag.offsetLeft,
            y: this._el.drag.offsetTop
        }, this.data.new_pos.x = -(e.x - this.data.pos.start.x), this.data.new_pos.y = -(e.y - this.data.pos.start.y), this.options.enable.x && Math.abs(e.x) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.left = this.data.new_pos.x + "px"), this.options.enable.y && Math.abs(e.y) > Math.abs(e.y) && (t.preventDefault(), this._el.move.style.top = this.data.new_pos.y + "px"), this.fire("dragmove", this.data)
    },
    _momentum: function() {
        var t = {
            x: 0,
            y: 0,
            time: 0
        }, e = {
                x: 0,
                y: 0,
                time: 0
            }, i = {
                x: !1,
                y: !1
            }, n = !1,
            a = "";
        this.data.direction = null, t.time = 10 * ((new Date).getTime() - this.data.time.start), e.time = 10 * ((new Date).getTime() - this.data.time.start), e.x = this.options.momentum_multiplier * (Math.abs(this.data.pagex.end) - Math.abs(this.data.pagex.start)), e.y = this.options.momentum_multiplier * (Math.abs(this.data.pagey.end) - Math.abs(this.data.pagey.start)), t.x = Math.round(e.x / e.time), t.y = Math.round(e.y / e.time), this.data.new_pos.x = Math.min(this.data.new_pos.x + t.x), this.data.new_pos.y = Math.min(this.data.new_pos.y + t.y), this.options.enable.x ? this.options.constraint.left && this.data.new_pos.x > this.options.constraint.left && (this.data.new_pos.x = this.options.constraint.left) : this.data.new_pos.x = this.data.pos.start.x, this.options.enable.y ? this.data.new_pos.y < 0 && (this.data.new_pos.y = 0) : this.data.new_pos.y = this.data.pos.start.y, e.time < 2e3 && (n = !0), this.options.enable.x && this.options.enable.y ? Math.abs(e.x) > Math.abs(e.y) ? i.x = !0 : i.y = !0 : this.options.enable.x ? Math.abs(e.x) > Math.abs(e.y) && (i.x = !0) : Math.abs(e.y) > Math.abs(e.x) && (i.y = !0), i.x && (Math.abs(e.x) > this._el.drag.offsetWidth / 2 && (n = !0), Math.abs(e.x) > 1e4 && (this.data.direction = "left", e.x > 0 && (this.data.direction = "right"))), i.y && (Math.abs(e.y) > this._el.drag.offsetHeight / 2 && (n = !0), Math.abs(e.y) > 1e4 && (this.data.direction = "up", e.y > 0 && (this.data.direction = "down"))), e.time < 1e3 || this._animateMomentum(), n && this.data.direction ? this.fire("swipe_" + this.data.direction, this.data) : this.data.direction ? this.fire("swipe_nodirection", this.data) : this.options.snap && (this.animator.stop(), this.animator = VCO.Animate(this._el.move, {
            top: this.data.pos.start.y,
            left: this.data.pos.start.x,
            duration: this.options.duration,
            easing: VCO.Ease.easeOutStrong
        }))
    },
    _animateMomentum: function() {
        var t = {
            x: this.data.new_pos.x,
            y: this.data.new_pos.y
        }, e = {
                duration: this.options.duration,
                easing: VCO.Ease.easeOutStrong
            };
        this.options.enable.y && ((this.options.constraint.top || this.options.constraint.bottom) && (t.y > this.options.constraint.bottom ? t.y = this.options.constraint.bottom : t.y < this.options.constraint.top && (t.y = this.options.constraint.top)), e.top = Math.floor(t.y) + "px"), this.options.enable.x && (this.options.constraint.left && t.x >= this.options.constraint.left && (t.x = this.options.constraint.left), this.options.constraint.right && t.x < this.options.constraint.right && (t.x = this.options.constraint.right), e.left = Math.floor(t.x) + "px"), this.animator = VCO.Animate(this._el.move, e), this.fire("momentum", this.data)
    }
}), VCO.MenuBar = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins],
    _el: {},
    initialize: function(t, e, i) {
        this._el = {
            parent: {},
            container: {},
            button_backtostart: {},
            button_zoomin: {},
            button_zoomout: {},
            arrow: {},
            line: {},
            coverbar: {},
            grip: {}
        }, this.collapsed = !1, "object" == typeof t ? this._el.container = t : this._el.container = VCO.Dom.get(t), e && (this._el.parent = e), this.options = {
            width: 600,
            height: 600,
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint,
            menubar_default_y: 0
        }, this.animator = {}, VCO.Util.mergeData(this.options, i), this._initLayout(), this._initEvents()
    },
    show: function(t) {
        var e = this.options.duration;
        t && (e = t)
    },
    hide: function(t) {},
    toogleZoomIn: function(t) {
        t ? (this._el.button_zoomin.className = "vco-menubar-button", this._el.button_zoomout.className = "vco-menubar-button") : (this._el.button_zoomin.className = "vco-menubar-button vco-menubar-button-inactive", this._el.button_zoomout.className = "vco-menubar-button")
    },
    toogleZoomOut: function(t) {
        t ? (this._el.button_zoomout.className = "vco-menubar-button", this._el.button_zoomin.className = "vco-menubar-button") : (this._el.button_zoomout.className = "vco-menubar-button vco-menubar-button-inactive", this._el.button_zoomin.className = "vco-menubar-button")
    },
    setSticky: function(t) {
        this.options.menubar_default_y = t
    },
    setColor: function(t) {
        t ? this._el.container.className = "vco-menubar vco-menubar-inverted" : this._el.container.className = "vco-menubar"
    },
    updateDisplay: function(t, e, i, n) {
        this._updateDisplay(t, e, i, n)
    },
    _onButtonZoomIn: function(t) {
        this.fire("zoom_in", t)
    },
    _onButtonZoomOut: function(t) {
        this.fire("zoom_out", t)
    },
    _onButtonBackToStart: function(t) {
        this.fire("back_to_start", t)
    },
    _initLayout: function() {
        this._el.button_zoomin = VCO.Dom.create("span", "vco-menubar-button", this._el.container), this._el.button_zoomout = VCO.Dom.create("span", "vco-menubar-button", this._el.container), this._el.button_backtostart = VCO.Dom.create("span", "vco-menubar-button", this._el.container), VCO.Browser.mobile && this._el.container.setAttribute("ontouchstart", " "), this._el.button_backtostart.innerHTML = "<span class='vco-icon-goback'></span>", this._el.button_zoomin.innerHTML = "<span class='vco-icon-zoom-in'></span>", this._el.button_zoomout.innerHTML = "<span class='vco-icon-zoom-out'></span>"
    },
    _initEvents: function() {
        VCO.DomEvent.addListener(this._el.button_backtostart, "click", this._onButtonBackToStart, this), VCO.DomEvent.addListener(this._el.button_zoomin, "click", this._onButtonZoomIn, this), VCO.DomEvent.addListener(this._el.button_zoomout, "click", this._onButtonZoomOut, this)
    },
    _updateDisplay: function(t, e, i) {
        t && (this.options.width = t), e && (this.options.height = e)
    }
}), VCO.Message = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins, VCO.I18NMixins],
    _el: {},
    initialize: function(t, e, i) {
        this._el = {
            parent: {},
            container: {},
            message_container: {},
            loading_icon: {},
            message: {}
        }, this.options = {
            width: 600,
            height: 600,
            message_class: "vco-message",
            message_icon_class: "vco-loading-icon"
        }, VCO.Util.mergeData(this.data, t), VCO.Util.mergeData(this.options, e), this._el.container = VCO.Dom.create("div", this.options.message_class), i && (i.appendChild(this._el.container), this._el.parent = i), this.animator = {}, this._initLayout(), this._initEvents()
    },
    updateMessage: function(t) {
        this._updateMessage(t)
    },
    updateDisplay: function(t, e) {
        this._updateDisplay(t, e)
    },
    _updateMessage: function(t) {
        t ? this._el.message.innerHTML = t : this._el.message.innerHTML = this._("loading")
    },
    _onMouseClick: function() {
        this.fire("clicked", this.options)
    },
    _initLayout: function() {
        this._el.message_container = VCO.Dom.create("div", "vco-message-container", this._el.container), this._el.loading_icon = VCO.Dom.create("div", this.options.message_icon_class, this._el.message_container), this._el.message = VCO.Dom.create("div", "vco-message-content", this._el.message_container), this._updateMessage()
    },
    _initEvents: function() {
        VCO.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this)
    },
    _updateDisplay: function(t, e, i) {}
}), VCO.MediaType = function(t) {
    for (var e = {}, i = [{
            type: "youtube",
            name: "YouTube",
            match_str: "^(https?:)?/*(www.)?youtube|youtu.be",
            cls: VCO.Media.YouTube
        }, {
            type: "vimeo",
            name: "Vimeo",
            match_str: "^(https?:)?/*(player.)?vimeo.com",
            cls: VCO.Media.Vimeo
        }, {
            type: "dailymotion",
            name: "DailyMotion",
            match_str: "^(https?:)?/*(www.)?dailymotion.com",
            cls: VCO.Media.DailyMotion
        }, {
            type: "vine",
            name: "Vine",
            match_str: "^(https?:)?/*(www.)?vine.co",
            cls: VCO.Media.Vine
        }, {
            type: "soundcloud",
            name: "SoundCloud",
            match_str: "^(https?:)?/*(player.)?soundcloud.com",
            cls: VCO.Media.SoundCloud
        }, {
            type: "twitter",
            name: "Twitter",
            match_str: "^(https?:)?/*(www.)?twitter.com",
            cls: VCO.Media.Twitter
        }, {
            type: "twitterembed",
            name: "TwitterEmbed",
            match_str: '<blockquote class="twitter-tweet"',
            cls: VCO.Media.TwitterEmbed
        }, {
            type: "googlemaps",
            name: "Google Map",
            match_str: /google.+?\/maps\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/search\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/place\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)|google.+?\/maps\/dir\/([\w\W]+)\/([\w\W]+)\/@([-\d.]+),([-\d.]+),((?:[-\d.]+[zmayht],?)*)/,
            cls: VCO.Media.GoogleMap
        }, {
            type: "googleplus",
            name: "Google+",
            match_str: "^(https?:)?/*plus.google",
            cls: VCO.Media.GooglePlus
        }, {
            type: "flickr",
            name: "Flickr",
            match_str: "^(https?:)?/*(www.)?flickr.com/photos",
            cls: VCO.Media.Flickr
        }, {
            type: "instagram",
            name: "Instagram",
            match_str: /^(https?:)?\/*(www.)?(instagr.am|^(https?:)?\/*(www.)?instagram.com)\/p\//,
            cls: VCO.Media.Instagram
        }, {
            type: "profile",
            name: "Profile",
            match_str: /^(https?:)?\/*(www.)?instagr.am\/[a-zA-Z0-9]{2,}|^(https?:)?\/*(www.)?instagram.com\/[a-zA-Z0-9]{2,}/,
            cls: VCO.Media.Profile
        }, {
            type: "documentcloud",
            name: "Document Cloud",
            match_str: /documentcloud.org\//,
            cls: VCO.Media.DocumentCloud
        }, {
            type: "image",
            name: "Image",
            match_str: /(jpg|jpeg|png|gif)(\?.*)?$/i,
            cls: VCO.Media.Image
        }, {
            type: "googledocs",
            name: "Google Doc",
            match_str: "^(https?:)?/*[^.]*.google.com/[^/]*/d/[^/]*/[^/]*?usp=sharing|^(https?:)?/*drive.google.com/open?id=[^&]*&authuser=0|^(https?:)?/*drive.google.com/open?id=[^&]*|^(https?:)?/*[^.]*.googledrive.com/host/[^/]*/",
            cls: VCO.Media.GoogleDoc
        }, {
            type: "wikipedia",
            name: "Wikipedia",
            match_str: "^(https?:)?/*(www.)?wikipedia.org|^(https?:)?/*([a-z][a-z].)?wikipedia.org",
            cls: VCO.Media.Wikipedia
        }, {
            type: "spotify",
            name: "spotify",
            match_str: "spotify",
            cls: VCO.Media.Spotify
        }, {
            type: "iframe",
            name: "iFrame",
            match_str: "iframe",
            cls: VCO.Media.IFrame
        }, {
            type: "storify",
            name: "Storify",
            match_str: "storify",
            cls: VCO.Media.Storify
        }, {
            type: "blockquote",
            name: "Quote",
            match_str: "blockquote",
            cls: VCO.Media.Blockquote
        }, {
            type: "imageblank",
            name: "Imageblank",
            match_str: "",
            cls: VCO.Media.Image
        }], n = 0; n < i.length; n++) {
        if (t instanceof Array) return e = {
            type: "slider",
            cls: VCO.Media.Slider
        };
        if (t.url.match(i[n].match_str)) return e = i[n]
    }
    return !1
}, VCO.Media = VCO.Class.extend({
    includes: [VCO.Events, VCO.I18NMixins],
    _el: {},
    initialize: function(t, e, i) {
        this._el = {
            container: {},
            content_container: {},
            content: {},
            content_item: {},
            content_link: {},
            caption: null,
            credit: null,
            parent: {},
            link: null
        }, this.player = null, this.timer = null, this.load_timer = null, this.message = null, this.media_id = null, this._state = {
            loaded: !1,
            show_meta: !1,
            media_loaded: !1
        }, this.data = {
            unique_id: null,
            url: null,
            credit: null,
            caption: null,
            credit_alternate: null,
            caption_alternate: null,
            link: null,
            link_target: null
        }, this.options = {
            api_key_flickr: "f2cc870b4d233dd0a5bfe73fd0d64ef0",
            api_key_googlemaps: "AIzaSyB9dW8e_iRrATFa8g24qB6BDBGdkrLDZYI",
            api_key_embedly: "",
            credit_height: 0,
            caption_height: 0
        }, this.animator = {}, VCO.Util.mergeData(this.options, e), VCO.Util.mergeData(this.data, t), this._el.container = VCO.Dom.create("div", "vco-media"), this.data.unique_id && (this._el.container.id = this.data.unique_id), this._initLayout(), i && (i.appendChild(this._el.container), this._el.parent = i)
    },
    loadMedia: function() {
        var t = this;
        if (!this._state.loaded) try {
            this.load_timer = setTimeout(function() {
                t._loadMedia(), t._state.loaded = !0, t._updateDisplay()
            }, 1200)
        } catch (e) {
            trace("Error loading media for ", this._media), trace(e)
        }
    },
    loadingMessage: function() {
        this.message.updateMessage(this._("loading") + " " + this.options.media_name)
    },
    errorMessage: function(t) {
        t = t ? this._("error") + ": " + t : this._("error"), this.message.updateMessage(t)
    },
    updateMediaDisplay: function(t) {
        this._state.loaded && (VCO.Browser.mobile ? this._el.content_item.style.maxHeight = this.options.height / 2 + "px" : this._el.content_item.style.maxHeight = this.options.height - this.options.credit_height - this.options.caption_height - 30 + "px", this._el.container.style.maxWidth = this.options.width + "px", VCO.Browser.firefox && this._el.content_item.offsetWidth > this._el.content_item.offsetHeight, this._updateMediaDisplay(t), this._state.media_loaded && (this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")))
    },
    _loadMedia: function() {},
    _updateMediaDisplay: function(t) {
        VCO.Browser.firefox && (this._el.content_item.style.maxWidth = this.options.width + "px", this._el.content_item.style.width = "auto")
    },
    _getMeta: function() {},
    show: function() {},
    hide: function() {},
    addTo: function(t) {
        t.appendChild(this._el.container), this.onAdd()
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container), this.onRemove()
    },
    updateDisplay: function(t, e, i) {
        this._updateDisplay(t, e, i)
    },
    stopMedia: function() {
        this._stopMedia()
    },
    loadErrorDisplay: function(t) {
        try {
            this._el.content.removeChild(this._el.content_item)
        } catch (e) {}
        this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-loaderror", this._el.content), this._el.content_item.innerHTML = "<div class='vco-icon-" + this.options.media_type + "'></div><p>" + t + "</p>", this.onLoaded(!0)
    },
    onLoaded: function(t) {
        this._state.loaded = !0, this.fire("loaded", this.data), this.message && this.message.hide(), t || this.showMeta(), this.updateDisplay()
    },
    onMediaLoaded: function(t) {
        this._state.media_loaded = !0, this.fire("media_loaded", this.data), this._el.credit && (this._el.credit.style.width = this._el.content_item.offsetWidth + "px"), this._el.caption && (this._el.caption.style.width = this._el.content_item.offsetWidth + "px")
    },
    showMeta: function(t, e) {
        this._state.show_meta = !0, this.data.credit && "" != this.data.credit && (this._el.credit = VCO.Dom.create("div", "vco-credit", this._el.content_container), this._el.credit.innerHTML = VCO.Util.linkify(this.data.credit), this.options.credit_height = this._el.credit.offsetHeight), this.data.caption && "" != this.data.caption && (this._el.caption = VCO.Dom.create("div", "vco-caption", this._el.content_container), this._el.caption.innerHTML = VCO.Util.linkify(this.data.caption), this.options.caption_height = this._el.caption.offsetHeight), this.data.caption && this.data.credit || this.getMeta()
    },
    getMeta: function() {
        this._getMeta()
    },
    updateMeta: function() {
        !this.data.credit && this.data.credit_alternate && (this._el.credit = VCO.Dom.create("div", "vco-credit", this._el.content_container), this._el.credit.innerHTML = this.data.credit_alternate, this.options.credit_height = this._el.credit.offsetHeight), !this.data.caption && this.data.caption_alternate && (this._el.caption = VCO.Dom.create("div", "vco-caption", this._el.content_container), this._el.caption.innerHTML = this.data.caption_alternate, this.options.caption_height = this._el.caption.offsetHeight), this.updateDisplay()
    },
    onAdd: function() {
        this.fire("added", this.data)
    },
    onRemove: function() {
        this.fire("removed", this.data)
    },
    _initLayout: function() {
        this.message = new VCO.Message({}, this.options), this.message.addTo(this._el.container), this._el.content_container = VCO.Dom.create("div", "vco-media-content-container", this._el.container), this.data.link && "" != this.data.link ? (this._el.link = VCO.Dom.create("a", "vco-media-link", this._el.content_container), this._el.link.href = this.data.link, this.data.link_target && "" != this.data.link_target ? this._el.link.target = this.data.link_target : this._el.link.target = "_blank", this._el.content = VCO.Dom.create("div", "vco-media-content", this._el.link)) : this._el.content = VCO.Dom.create("div", "vco-media-content", this._el.content_container)
    },
    _updateDisplay: function(t, e, i) {
        t && (this.options.width = t), e && (this.options.height = e), i && (this.options.layout = i), this._el.credit && (this.options.credit_height = this._el.credit.offsetHeight), this._el.caption && (this.options.caption_height = this._el.caption.offsetHeight + 5),
        this.updateMediaDisplay(this.options.layout)
    },
    _stopMedia: function() {}
}), VCO.Media.Blockquote = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-blockquote", this._el.content), this._el.content_container.className = "vco-media-content-container vco-media-content-container-text", this.media_id = this.data.url, this._el.content_item.innerHTML = this.media_id, this.onLoaded()
    },
    updateMediaDisplay: function() {},
    _updateMediaDisplay: function() {}
}), VCO.Media.DailyMotion = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-dailymotion", this._el.content), this.data.url.match("video") ? this.media_id = this.data.url.split("video/")[1].split(/[?&]/)[0] : this.media_id = this.data.url.split("embed/")[1].split(/[?&]/)[0], t = "http://www.dailymotion.com/embed/video/" + this.media_id, this._el.content_item.innerHTML = "<iframe autostart='false' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = VCO.Util.ratio.r16_9({
            w: this._el.content_item.offsetWidth
        }) + "px"
    }
}), VCO.Media.DocumentCloud = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-documentcloud vco-media-shadow", this._el.content), this._el.content_item.id = VCO.Util.unique_ID(7), this.data.url.match(/\.html$/) ? this.data.url = this._transformURL(this.data.url) : this.data.url.match(/.(json|js)$/) || trace("DOCUMENT CLOUD IN URL BUT INVALID SUFFIX"), VCO.Load.js(["//s3.documentcloud.org/viewer/loader.js", "//s3.amazonaws.com/s3.documentcloud.org/viewer/viewer.js"], function() {
            t.createMedia()
        })
    },
    _transformURL: function(t) {
        return t.replace(/(.*)\.html$/, "$1.js")
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px"
    },
    createMedia: function() {
        DV.load(this.data.url, {
            container: "#" + this._el.content_item.id,
            showSidebar: !1
        }), this.onLoaded()
    }
}), VCO.Media.Flickr = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_link = VCO.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.url, this._el.content_link.target = "_blank", this._el.content_item = VCO.Dom.create("img", "vco-media-item vco-media-image vco-media-flickr vco-media-shadow", this._el.content_link), this._el.content_item.addEventListener("load", function(t) {
            e.onMediaLoaded()
        }), this.establishMediaID(), t = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?", VCO.getJSON(t, function(t) {
            "ok" == t.stat ? e.createMedia(t) : e.loadErrorDisplay("Photo not found or private.")
        })
    },
    establishMediaID: function() {
        var t = "flickr.com/photos/",
            e = this.data.url.indexOf(t);
        if (-1 == e) throw "Invalid Flickr URL";
        var i = e + t.length;
        this.media_id = this.data.url.substr(i).split("/")[1]
    },
    createMedia: function(t) {
        trace(t);
        var e = this.sizes(this.options.height),
            i = t.sizes.size[t.sizes.size.length - 2].source;
        self = this;
        for (var n = 0; n < t.sizes.size.length; n++) t.sizes.size[n].label == e && (i = t.sizes.size[n].source);
        this._el.content_item.src = i, this.onLoaded()
    },
    _getMeta: function() {
        var t = this,
            e;
        e = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + this.options.api_key_flickr + "&photo_id=" + this.media_id + "&format=json&jsoncallback=?", VCO.getJSON(e, function(e) {
            t.data.credit_alternate = "<a href='" + t.data.url + "' target='_blank'>" + e.photo.owner.realname + "</a>", t.data.caption_alternate = e.photo.title._content + " " + e.photo.description._content, t.updateMeta()
        })
    },
    sizes: function(t) {
        var e = "";
        return e = 75 >= t ? 0 >= t ? "Large" : "Thumbnail" : 180 >= t ? "Small" : 240 >= t ? "Small 320" : 375 >= t ? "Medium" : 480 >= t ? "Medium 640" : "Large"
    }
}), VCO.Media.GoogleDoc = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        if (this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe", this._el.content), this.data.url.match("open?id=")) this.media_id = this.data.url.split("open?id=")[1], this.data.url.match("&authuser=0") && (t = this.media_id.match("&authuser=0")[0]);
        else if (this.data.url.match(/file\/d\/([^/]*)\/?/)) {
            var i = this.data.url.match(/file\/d\/([^/]*)\/?/)[1];
            t = "https://drive.google.com/file/d/" + i + "/preview"
        } else t = this.data.url;
        this._el.content_item.innerHTML = "<iframe class='doc' frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px"
    }
}), VCO.Media.GooglePlus = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-googleplus", this._el.content), this.media_id = this.data.url, t = this.media_id, this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + t + "'></iframe>", this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px"
    }
}), VCO.Media.IFrame = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe", this._el.content), this.media_id = this.data.url, t = this.media_id, this._el.content_item.innerHTML = t, this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px"
    }
}), VCO.Media.Image = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t = this,
            e = "vco-media-item vco-media-image vco-media-shadow";
        this.loadingMessage(), this.data.url.match(/.png(\?.*)?$/) && (e = "vco-media-item vco-media-image"), this.data.link ? (this._el.content_link = VCO.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.link, this._el.content_link.target = "_blank", this._el.content_item = VCO.Dom.create("img", e, this._el.content_link)) : this._el.content_item = VCO.Dom.create("img", e, this._el.content), this._el.content_item.addEventListener("load", function(e) {
            t.onMediaLoaded()
        }), this._el.content_item.src = VCO.Util.transformImageURL(this.data.url), this.onLoaded()
    },
    _updateMediaDisplay: function(t) {
        VCO.Browser.firefox && (this._el.content_item.style.width = "auto")
    }
}), VCO.Media.Instagram = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this.media_id = this.data.url.split("/p/")[1].split("/")[0], this._el.content_link = VCO.Dom.create("a", "", this._el.content), this._el.content_link.href = this.data.url, this._el.content_link.target = "_blank", this._el.content_item = VCO.Dom.create("img", "vco-media-item vco-media-image vco-media-instagram vco-media-shadow", this._el.content_link), this._el.content_item.addEventListener("load", function(t) {
            e.onMediaLoaded()
        }), this._el.content_item.src = "http://instagr.am/p/" + this.media_id + "/media/?size=" + this.sizes(this._el.content.offsetWidth), t = "http://api.instagram.com/oembed?url=http://instagr.am/p/" + this.media_id + "&callback=?", this.onLoaded()
    },
    _getMeta: function() {
        var t = this,
            e;
        e = "http://api.instagram.com/oembed?url=http://instagr.am/p/" + this.media_id + "&callback=?", VCO.getJSON(e, function(e) {
            t.data.credit_alternate = "<a href='" + e.author_url + "' target='_blank'>" + e.author_name + "</a>", t.data.caption_alternate = e.title, t.updateMeta()
        })
    },
    sizes: function(t) {
        var e = "";
        return e = 150 >= t ? "t" : 306 >= t ? "m" : "l"
    }
}), VCO.Media.GoogleMap = VCO.Media.extend({
    includes: [VCO.Events],
    _API_KEY: "AIzaSyB9dW8e_iRrATFa8g24qB6BDBGdkrLDZYI",
    _loadMedia: function() {
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-map vco-media-shadow", this._el.content), this.media_id = this.data.url, this.mapframe = VCO.Dom.create("iframe", "", this._el.content_item), window.stash = this, this.mapframe.width = "100%", this.mapframe.height = "100%", this.mapframe.frameBorder = "0", this.mapframe.src = this.makeGoogleMapsEmbedURL(this.media_id, this.options.api_key_googlemaps), this.onLoaded()
    },
    _updateMediaDisplay: function() {
        if (this._state.loaded) {
            var t = VCO.Util.ratio.square({
                w: this._el.content_item.offsetWidth
            });
            this._el.content_item.style.height = t.h + "px"
        }
    },
    makeGoogleMapsEmbedURL: function(t, e) {
        function i(t) {
            function i(e, i) {
                if ("z" == e.slice(-1)) i.zoom = e;
                else if ("m" == e.slice(-1)) i.zoom = 14, i.maptype = "satellite";
                else if ("t" == e.slice(-1)) {
                    if (n = !0, "place" == mapmode) var s = t.match(c.place)[3] + "," + t.match(c.place)[4];
                    else {
                        var s = i.center;
                        delete i.center
                    }
                    i = {}, i.location = s, streetview_params = e.split(",");
                    for (param in a.streetview) {
                        var o = parseInt(param) + 1;
                        "pitch" == a.streetview[param] && "90t" == streetview_params[o] ? i[a.streetview[param]] = 0 : i[a.streetview[param]] = streetview_params[o].slice(0, -1)
                    }
                }
                return i
            }

            function s(t, s) {
                var o = {}, r = s[1],
                    h = s[s.length - 1];
                for (param in a[t]) {
                    var l = parseInt(param) + 2;
                    "center" == a[t][param] ? o[a[t][param]] = s[l] + "," + s[++l] : o[a[t][param]] = s[l]
                }
                return o = i(h, o), o.key = e, 1 == n && (t = "streetview"), r + "/embed/v1/" + t + VCO.Util.getParamString(o)
            }
            return mapmode = "view", t.match(c.place) ? mapmode = "place" : t.match(c.directions) ? mapmode = "directions" : t.match(c.search) && (mapmode = "search"), s(mapmode, t.match(c[mapmode]))
        }
        var n = !1,
            a = {
                view: ["center"],
                place: ["q", "center"],
                directions: ["origin", "destination", "center"],
                search: ["q", "center"],
                streetview: ["fov", "heading", "pitch"]
            }, s = /(https:\/\/.+google.+?\/maps)/,
            o = /@([-\d.]+),([-\d.]+)/,
            r = /([\w\W]+)/,
            h = /data=[\S]*/,
            l = /,((?:[-\d.]+[zmayht],?)*)/,
            c = {
                view: new RegExp(s.source + "/" + o.source + l.source),
                place: new RegExp(s.source + "/place/" + r.source + "/" + o.source + l.source),
                directions: new RegExp(s.source + "/dir/" + r.source + "/" + r.source + "/" + o.source + l.source),
                search: new RegExp(s.source + "/search/" + r.source + "/" + o.source + l.source)
            };
        return i(t)
    }
}), VCO.Media.Profile = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("img", "vco-media-item vco-media-image vco-media-profile vco-media-shadow", this._el.content), this._el.content_item.src = this.data.url, this.onLoaded()
    },
    _updateMediaDisplay: function(t) {
        VCO.Browser.firefox && (this._el.content_item.style.maxWidth = this.options.width / 2 - 40 + "px")
    }
}), VCO.Media.Slider = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        this._el.content_item = VCO.Dom.create("img", "vco-media-item vco-media-image", this._el.content), this._el.content_item.src = this.data.url, this.onLoaded()
    }
}), VCO.Media.SoundCloud = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-soundcloud vco-media-shadow", this._el.content), this.media_id = this.data.url, t = "http://soundcloud.com/oembed?url=" + this.media_id + "&format=js&callback=?", VCO.getJSON(t, function(t) {
            e.createMedia(t)
        })
    },
    createMedia: function(t) {
        this._el.content_item.innerHTML = t.html, this.onLoaded()
    }
}), VCO.Media.Spotify = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        if (this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-spotify", this._el.content), this.data.url.match("open.spotify.com/track/")) this.media_id = "spotify:track:" + this.data.url.split("open.spotify.com/track/")[1];
        else if (this.data.url.match("spotify:track:")) this.media_id = this.data.url;
        else if (this.data.url.match("/playlist/")) {
            var i = this.data.url.split("open.spotify.com/user/")[1].split("/playlist/")[0];
            this.media_id = "spotify:user:" + i + ":playlist:" + this.data.url.split("/playlist/")[1]
        } else this.data.url.match(":playlist:") && (this.media_id = this.data.url);
        t = "http://embed.spotify.com/?uri=" + this.media_id + "&theme=white&view=coverart", this.player = VCO.Dom.create("iframe", "vco-media-shadow", this._el.content_item), this.player.width = "100%", this.player.height = "100%", this.player.frameBorder = "0", this.player.src = t, this.onLoaded()
    },
    _updateMediaDisplay: function(t) {
        var e = this.options.height,
            i = 0,
            n = 0;
        e = VCO.Browser.mobile ? this.options.height / 2 : this.options.height - this.options.credit_height - this.options.caption_height - 30, this._el.content_item.style.maxHeight = "none", trace(e), trace(this.options.width), e > this.options.width ? (trace("height is greater"), i = this.options.width + 80 + "px", n = this.options.width + "px") : (trace("width is greater"), trace(this.options.width), i = e + "px", n = e - 80 + "px"), this.player.style.width = n, this.player.style.height = i, this._el.credit && (this._el.credit.style.width = n), this._el.caption && (this._el.caption.style.width = n)
    },
    _stopMedia: function() {}
}), VCO.Media.Storify = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-storify", this._el.content), this.media_id = this.data.url, t = "<iframe frameborder='0' width='100%' height='100%' src='" + this.media_id + "/embed'></iframe>", t += "<script src='" + this.media_id + ".js'></script>", this._el.content_item.innerHTML = t, this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = this.options.height + "px"
    }
}), VCO.Media.Text = VCO.Class.extend({
    includes: [VCO.Events],
    _el: {
        container: {},
        content_container: {},
        content: {},
        headline: {},
        date: {}
    },
    data: {
        unique_id: "",
        headline: "headline",
        text: "text"
    },
    options: {
        title: !1
    },
    initialize: function(t, e, i) {
        VCO.Util.setData(this, t), VCO.Util.mergeData(this.options, e), this._el.container = VCO.Dom.create("div", "vco-text"), this._el.container.id = this.data.unique_id, this._initLayout(), i && i.appendChild(this._el.container)
    },
    show: function() {},
    hide: function() {},
    addTo: function(t) {
        t.appendChild(this._el.container)
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container)
    },
    headlineHeight: function() {
        return this._el.headline.offsetHeight + 40
    },
    addDateText: function(t) {
        this._el.date.innerHTML = t
    },
    onLoaded: function() {
        this.fire("loaded", this.data)
    },
    onAdd: function() {
        this.fire("added", this.data)
    },
    onRemove: function() {
        this.fire("removed", this.data)
    },
    _initLayout: function() {
        if (this._el.content_container = VCO.Dom.create("div", "vco-text-content-container", this._el.container), this._el.date = VCO.Dom.create("h3", "vco-headline-date", this._el.content_container), "" != this.data.headline) {
            var t = "vco-headline";
            this.options.title && (t = "vco-headline vco-headline-title"), this._el.headline = VCO.Dom.create("h2", t, this._el.content_container), this._el.headline.innerHTML = this.data.headline
        }
        if ("" != this.data.text) {
            var e = "";
            e += VCO.Util.htmlify(VCO.Util.linkify(this.data.text)), this._el.content = VCO.Dom.create("div", "vco-text-content", this._el.content_container), this._el.content.innerHTML = e
        }
        this.onLoaded()
    }
}), VCO.Media.Twitter = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-twitter", this._el.content), this._el.content_container.className = "vco-media-content-container vco-media-content-container-text", this.data.url.match("status/") ? this.media_id = this.data.url.split("status/")[1] : url.match("statuses/") ? this.media_id = this.data.url.split("statuses/")[1] : this.media_id = "", t = "https://api.twitter.com/1/statuses/oembed.json?id=" + this.media_id + "&omit_script=true&include_entities=true&callback=?", VCO.ajax({
            type: "GET",
            url: t,
            dataType: "json",
            success: function(t) {
                e.createMedia(t)
            },
            error: function(t, i) {
                var n = "";
                n += "Unable to load Tweet. <br/>" + e.media_id + "<br/>" + i, e.loadErrorDisplay(n)
            }
        })
    },
    createMedia: function(t) {
        var e = "",
            i = "",
            n = "",
            a = "",
            s = "",
            o = "";
        i = t.html.split("</p>&mdash;")[0] + "</p></blockquote>", n = t.author_url.split("twitter.com/")[1], a = t.html.split("</p>&mdash;")[1].split('<a href="')[1], s = a.split('">')[0], o = a.split('">')[1].split("</a>")[0], i = i.replace(/<a href/gi, '<a class="vco-makelink" target="_blank" href'), e += i, e += "<div class='vcard'>", e += "<a href='" + s + "' class='twitter-date' target='_blank'>" + o + "</a>", e += "<div class='author'>", e += "<a class='screen-name url' href='" + t.author_url + "' target='_blank'>", e += "<span class='avatar'></span>", e += "<span class='fn'>" + t.author_name + " <span class='vco-icon-twitter'></span></span>", e += "<span class='nickname'>@" + n + "<span class='thumbnail-inline'></span></span>", e += "</a>", e += "</div>", e += "</div>", this._el.content_item.innerHTML = e, this.onLoaded()
    },
    updateMediaDisplay: function() {},
    _updateMediaDisplay: function() {}
}), VCO.Media.Vimeo = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-vimeo vco-media-shadow", this._el.content), this.media_id = this.data.url.split(/video\/|\/\/vimeo\.com\//)[1].split(/[?&]/)[0], t = "https://player.vimeo.com/video/" + this.media_id + "?api=1&title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff", this.player = VCO.Dom.create("iframe", "", this._el.content_item), this.player.addEventListener("load", function(t) {
            e.onMediaLoaded()
        }), this.player.width = "100%", this.player.height = "100%", this.player.frameBorder = "0", this.player.src = t, this.onLoaded()
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = VCO.Util.ratio.r16_9({
            w: this._el.content_item.offsetWidth
        }) + "px"
    },
    _stopMedia: function() {
        try {
            this.player.contentWindow.postMessage(JSON.stringify({
                method: "pause"
            }), "https://player.vimeo.com")
        } catch (t) {
            trace(t)
        }
    }
}), VCO.Media.Vine = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-iframe vco-media-vine vco-media-shadow", this._el.content), this.media_id = this.data.url.split("vine.co/v/")[1], t = "https://vine.co/v/" + this.media_id + "/embed/simple", this._el.content_item.innerHTML = "<iframe frameborder='0' width='100%' height='100%' src='" + t + "'></iframe><script async src='http://platform.vine.co/static/scripts/embed.js' charset='utf-8'></script>", this.onLoaded()
    },
    _updateMediaDisplay: function() {
        var t = VCO.Util.ratio.square({
            w: this._el.content_item.offsetWidth,
            h: this.options.height
        });
        this._el.content_item.style.height = t.h + "px"
    }
}), VCO.Media.Website = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t = this;
        this.loadingMessage(), this.media_id = this.data.url.replace(/.*?:\/\//g, ""), this.options.api_key_embedly ? (api_url = "http://api.embed.ly/1/extract?key=" + this.options.api_key_embedly + "&url=" + this.media_id + "&callback=?", VCO.getJSON(api_url, function(e) {
            t.createMedia(e)
        })) : this.createCardContent()
    },
    createCardContent: function() {
        ! function(t, e) {
            var i = "embedly-platform",
                n = "script";
            if (!e.getElementById(i)) {
                t.embedly = t.embedly || function() {
                    (t.embedly.q = t.embedly.q || []).push(arguments)
                };
                var a = e.createElement(n);
                a.id = i, a.async = 1, a.src = ("https:" === document.location.protocol ? "https" : "http") + "://cdn.embedly.com/widgets/platform.js";
                var s = e.getElementsByTagName(n)[0];
                s.parentNode.insertBefore(a, s)
            }
        }(window, document);
        var t = '<a href="' + this.data.url + '" class="embedly-card">' + this.data.url + "</a>";
        this._setContent(t)
    },
    createMedia: function(t) {
        var e = "";
        e += "<h4><a href='" + this.data.url + "' target='_blank'>" + t.title + "</a></h4>", t.images && t.images[0] && (trace(t.images[0].url), e += "<img src='" + t.images[0].url + "' />"), t.favicon_url && (e += "<img class='vco-media-website-icon' src='" + t.favicon_url + "' />"), e += "<span class='vco-media-website-description'>" + t.provider_name + "</span><br/>", e += "<p>" + t.description + "</p>", this._setContent(e)
    },
    _setContent: function(t) {
        this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-website", this._el.content), this._el.content_container.className = "vco-media-content-container vco-media-content-container-text", this._el.content_item.innerHTML = t, this.onLoaded()
    },
    updateMediaDisplay: function() {},
    _updateMediaDisplay: function() {}
}), VCO.Media.Wikipedia = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t, e, i = this;
        this.loadingMessage(), this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-wikipedia", this._el.content), this._el.content_container.className = "vco-media-content-container vco-media-content-container-text", this.media_id = this.data.url.split("wiki/")[1].split("#")[0].replace("_", " "), this.media_id = this.media_id.replace(" ", "%20"), e = this.data.url.split("//")[1].split(".wikipedia")[0], t = "http://" + e + ".wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&redirects=&titles=" + this.media_id + "&exintro=1&format=json&callback=?", VCO.ajax({
            type: "GET",
            url: t,
            dataType: "json",
            success: function(t) {
                i.createMedia(t)
            },
            error: function(t, e) {
                var n = "";
                n += "Unable to load Wikipedia entry. <br/>" + i.media_id + "<br/>" + e, i.loadErrorDisplay(n)
            }
        })
    },
    createMedia: function(t) {
        var e = "";
        if (t.query) {
            var i = "",
                e = {
                    entry: {},
                    title: "",
                    text: "",
                    extract: "",
                    paragraphs: 1,
                    page_image: "",
                    text_array: []
                };
            e.entry = VCO.Util.getObjectAttributeByIndex(t.query.pages, 0), e.extract = e.entry.extract, e.title = e.entry.title, e.page_image = e.entry.thumbnail, e.extract.match("<p>") ? e.text_array = e.extract.split("<p>") : e.text_array.push(e.extract);
            for (var n = 0; n < e.text_array.length; n++) n + 1 <= e.paragraphs && n + 1 < e.text_array.length && (e.text += "<p>" + e.text_array[n + 1]);
            i += "<span class='vco-icon-wikipedia'></span>", i += "<div class='vco-wikipedia-title'><h4><a href='" + this.data.url + "' target='_blank'>" + e.title + "</a></h4>", i += "<span class='vco-wikipedia-source'>" + this._("wikipedia") + "</span></div>", e.page_image, i += e.text, e.extract.match("REDIRECT") || (this._el.content_item.innerHTML = i, this.onLoaded())
        }
    },
    updateMediaDisplay: function() {},
    _updateMediaDisplay: function() {}
}), VCO.Media.YouTube = VCO.Media.extend({
    includes: [VCO.Events],
    _loadMedia: function() {
        var t = this,
            e;
        this.loadingMessage(), this.youtube_loaded = !1, this._el.content_item = VCO.Dom.create("div", "vco-media-item vco-media-youtube vco-media-shadow", this._el.content), this._el.content_item.id = VCO.Util.unique_ID(7), e = VCO.Util.getUrlVars(this.data.url), this.media_id = {}, this.data.url.match("v=") ? this.media_id.id = e.v : this.data.url.match("/embed/") ? this.media_id.id = this.data.url.split("embed/")[1].split(/[?&]/)[0] : this.data.url.match(/v\/|v=|youtu\.be\//) ? this.media_id.id = this.data.url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] : trace("YOUTUBE IN URL BUT NOT A VALID VIDEO"), this.media_id.start = VCO.Util.parseYouTubeTime(e.t), this.media_id.hd = Boolean("undefined" != typeof e.hd), VCO.Load.js("https://www.youtube.com/player_api", function() {
            t.createMedia()
        })
    },
    _updateMediaDisplay: function() {
        this._el.content_item.style.height = VCO.Util.ratio.r16_9({
            w: this.options.width
        }) + "px", this._el.content_item.style.width = this.options.width + "px"
    },
    _stopMedia: function() {
        if (this.youtube_loaded) try {
            this.player.pauseVideo()
        } catch (t) {
            trace(t)
        }
    },
    createMedia: function() {
        var t = this;
        clearTimeout(this.timer), "undefined" != typeof YT && "undefined" != typeof YT.Player ? this.player = new YT.Player(this._el.content_item.id, {
            playerVars: {
                enablejsapi: 1,
                color: "white",
                autohide: 1,
                showinfo: 0,
                theme: "light",
                start: this.media_id.start,
                fs: 0,
                rel: 0
            },
            videoId: this.media_id.id,
            events: {
                onReady: function() {
                    t.onPlayerReady(), t.onLoaded()
                },
                onStateChange: t.onStateChange
            }
        }) : this.timer = setTimeout(function() {
            t.createMedia()
        }, 1e3)
    },
    onPlayerReady: function(t) {
        this.youtube_loaded = !0, this._el.content_item = document.getElementById(this._el.content_item.id), this.onMediaLoaded()
    },
    onStateChange: function(t) {}
}), VCO.Slide = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins, VCO.I18NMixins],
    _el: {},
    initialize: function(t, e, i) {
        this._el = {
            container: {},
            scroll_container: {},
            background: {},
            content_container: {},
            content: {}
        }, this._media = null, this._mediaclass = {}, this._text = {}, this._state = {
            loaded: !1
        }, this.has = {
            headline: !1,
            text: !1,
            media: !1,
            title: !1,
            background: {
                image: !1,
                color: !1,
                color_value: ""
            }
        }, this.has.title = i, this.data = {
            unique_id: null,
            background: null,
            start_date: null,
            end_date: null,
            location: null,
            text: null,
            media: null
        }, this.options = {
            duration: 1e3,
            slide_padding_lr: 40,
            ease: VCO.Ease.easeInSpline,
            width: 600,
            height: 600,
            skinny_size: 650,
            media_name: ""
        }, this.active = !1, this.animator = {}, VCO.Util.mergeData(this.options, e), VCO.Util.mergeData(this.data, t), this._initLayout(), this._initEvents()
    },
    show: function() {
        this.animator = VCO.Animate(this._el.slider_container, {
            left: -(this._el.container.offsetWidth * n) + "px",
            duration: this.options.duration,
            easing: this.options.ease
        })
    },
    hide: function() {},
    setActive: function(t) {
        this.active = t, this.active ? (this.data.background && this.fire("background_change", this.has.background), this.loadMedia()) : this.stopMedia()
    },
    addTo: function(t) {
        t.appendChild(this._el.container)
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container)
    },
    updateDisplay: function(t, e, i) {
        this._updateDisplay(t, e, i)
    },
    loadMedia: function() {
        this._media && !this._state.loaded && (this._media.loadMedia(), this._state.loaded = !0)
    },
    stopMedia: function() {
        this._media && this._state.loaded && this._media.stopMedia()
    },
    getBackground: function() {
        return this.has.background
    },
    scrollToTop: function() {
        this._el.container.scrollTop = 0
    },
    getFormattedDate: function() {
        if (VCO.Util.trim(this.data.display_date).length > 0) return this.data.display_date;
        var t = "";
        return this.has.title || (this.data.end_date && (t = " &mdash; " + this.data.end_date.getDisplayDate(this.getLanguage())), this.data.start_date && (t = this.data.start_date.getDisplayDate(this.getLanguage()) + t)), t
    },
    _initLayout: function() {
        this._el.container = VCO.Dom.create("div", "vco-slide"), this.has.title && (this._el.container.className = "vco-slide vco-slide-titleslide"), this.data.unique_id && (this._el.container.id = this.data.unique_id), this._el.scroll_container = VCO.Dom.create("div", "vco-slide-scrollable-container", this._el.container), this._el.content_container = VCO.Dom.create("div", "vco-slide-content-container", this._el.scroll_container), this._el.content = VCO.Dom.create("div", "vco-slide-content", this._el.content_container), this._el.background = VCO.Dom.create("div", "vco-slide-background", this._el.container), this.data.background && (this.data.background.url && (this.has.background.image = !0, this._el.container.className += " vco-full-image-background", this.has.background.color_value = "#000", this._el.background.style.backgroundImage = "url('" + this.data.background.url + "')", this._el.background.style.display = "block"), this.data.background.color && (this.has.background.color = !0, this._el.container.className += " vco-full-color-background", this.has.background.color_value = this.data.background.color), this.data.background.text_background && (this._el.container.className += " vco-text-background")), this.data.media && this.data.media.url && "" != this.data.media.url && (this.has.media = !0), this.data.text && this.data.text.text && (this.has.text = !0), this.data.text && this.data.text.headline && (this.has.headline = !0), this.has.media && (this.data.media.mediatype = VCO.MediaType(this.data.media), this.options.media_name = this.data.media.mediatype.name, this.options.media_type = this.data.media.mediatype.type, this._media = new this.data.media.mediatype.cls(this.data.media, this.options)), (this.has.text || this.has.headline) && (this._text = new VCO.Media.Text(this.data.text, {
            title: this.has.title,
            language: this.options.language
        }), this._text.addDateText(this.getFormattedDate())), this.has.text || this.has.headline || !this.has.media ? this.has.headline && this.has.media && !this.has.text ? (this._el.container.className += " vco-slide-media-only", this._text.addTo(this._el.content), this._media.addTo(this._el.content)) : this.has.text && this.has.media ? (this._media.addTo(this._el.content), this._text.addTo(this._el.content)) : (this.has.text || this.has.headline) && (this._el.container.className += " vco-slide-text-only", this._text.addTo(this._el.content)) : (this._el.container.className += " vco-slide-media-only", this._media.addTo(this._el.content)), this.onLoaded()
    },
    _initEvents: function() {},
    _updateDisplay: function(t, e, i) {
        var n, a = this.options.slide_padding_lr,
            s = this.options.slide_padding_lr;
        t ? this.options.width = t : this.options.width = this._el.container.offsetWidth, n = this.options.width - 2 * this.options.slide_padding_lr, VCO.Browser.mobile && this.options.width <= this.options.skinny_size ? (a = 0, s = 0, n = this.options.width) : "landscape" == i || this.options.width <= this.options.skinny_size && (a = 50, s = 50, n = this.options.width - a - s), this._el.content.style.paddingLeft = a + "px", this._el.content.style.paddingRight = s + "px", this._el.content.style.width = n + "px", e ? this.options.height = e : this.options.height = this._el.container.offsetHeight, this._media && (!this.has.text && this.has.headline ? this._media.updateDisplay(n, this.options.height - this._text.headlineHeight(), i) : this.has.text || this.has.headline ? this.options.width <= this.options.skinny_size ? this._media.updateDisplay(n, this.options.height, i) : this._media.updateDisplay(n / 2, this.options.height, i) : this._media.updateDisplay(n, this.options.height, i))
    }
}), VCO.SlideNav = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins],
    _el: {},
    initialize: function(t, e, i) {
        this._el = {
            container: {},
            content_container: {},
            icon: {},
            title: {},
            description: {}
        }, this.mediatype = {}, this.data = {
            title: "Navigation",
            description: "Description",
            date: "Date"
        }, this.options = {
            direction: "previous"
        }, this.animator = null, VCO.Util.mergeData(this.options, e), VCO.Util.mergeData(this.data, t), this._el.container = VCO.Dom.create("div", "vco-slidenav-" + this.options.direction), VCO.Browser.mobile && this._el.container.setAttribute("ontouchstart", " "), this._initLayout(), this._initEvents(), i && i.appendChild(this._el.container)
    },
    update: function(t) {
        var e = {
            title: "",
            description: "",
            date: t.getFormattedDate()
        };
        t.data.text && t.data.text.headline && (e.title = t.data.text.headline), this._update(e)
    },
    setColor: function(t) {
        t ? this._el.content_container.className = "vco-slidenav-content-container vco-slidenav-inverted" : this._el.content_container.className = "vco-slidenav-content-container"
    },
    _onMouseClick: function() {
        this.fire("clicked", this.options)
    },
    _update: function(t) {
        this.data = VCO.Util.mergeData(this.data, t), this._el.title.innerHTML = VCO.Util.unlinkify(this.data.title), this._el.description.innerHTML = VCO.Util.unlinkify(this.data.date)
    },
    _initLayout: function() {
        this._el.content_container = VCO.Dom.create("div", "vco-slidenav-content-container", this._el.container), this._el.icon = VCO.Dom.create("div", "vco-slidenav-icon", this._el.content_container), this._el.title = VCO.Dom.create("div", "vco-slidenav-title", this._el.content_container), this._el.description = VCO.Dom.create("div", "vco-slidenav-description", this._el.content_container), this._el.icon.innerHTML = "&nbsp;", this._update()
    },
    _initEvents: function() {
        VCO.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this)
    }
}), VCO.StorySlider = VCO.Class.extend({
    includes: VCO.Events,
    initialize: function(t, e, i, n) {
        this._el = {
            container: {},
            background: {},
            slider_container_mask: {},
            slider_container: {},
            slider_item_container: {}
        }, this._nav = {}, this._nav.previous = {}, this._nav.next = {}, this.slide_spacing = 0, this._slides = [], this._swipable, this.preloadTimer, this._message, this.current_id = "", this.data = {}, this.options = {
            id: "",
            layout: "portrait",
            width: 600,
            height: 600,
            default_bg_color: {
                r: 255,
                g: 255,
                b: 255
            },
            slide_padding_lr: 40,
            start_at_slide: 1,
            slide_default_fade: "0%",
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint,
            dragging: !0,
            trackResize: !0
        }, "object" == typeof t ? (this._el.container = t, this.options.id = VCO.Util.unique_ID(6, "vco")) : (this.options.id = t, this._el.container = VCO.Dom.get(t)), this._el.container.id || (this._el.container.id = this.options.id), this.animator = null, VCO.Util.mergeData(this.options, i), VCO.Util.mergeData(this.data, e), n && this.init()
    },
    init: function() {
        this._initLayout(), this._initEvents(), this._initData(), this._updateDisplay(), this.goTo(this.options.start_at_slide), this._onLoaded()
    },
    _addSlide: function(t) {
        t.addTo(this._el.slider_item_container), t.on("added", this._onSlideAdded, this), t.on("background_change", this._onBackgroundChange, this)
    },
    _createSlide: function(t, e, i) {
        var n = new VCO.Slide(t, this.options, e);
        this._addSlide(n), 0 > i ? this._slides.push(n) : this._slides.splice(i, 0, n)
    },
    _createSlides: function(t) {
        for (var e = 0; e < t.length; e++) "" == t[e].unique_id && (t[e].unique_id = VCO.Util.unique_ID(6, "vco-slide")), this._createSlide(t[e], !1, -1)
    },
    _removeSlide: function(t) {
        t.removeFrom(this._el.slider_item_container), t.off("added", this._onSlideRemoved, this), t.off("background_change", this._onBackgroundChange)
    },
    _destroySlide: function(t) {
        this._removeSlide(this._slides[t]), this._slides.splice(t, 1)
    },
    _findSlideIndex: function(t) {
        var e = t;
        return ("string" == typeof t || t instanceof String) && (e = VCO.Util.findArrayNumberByUniqueID(t, this._slides, "unique_id")), e
    },
    updateDisplay: function(t, e, i, n) {
        this._updateDisplay(t, e, i, n)
    },
    createSlide: function(t, e) {
        this._createSlide(t, !1, e)
    },
    createSlides: function(t) {
        this._createSlides(t)
    },
    destroySlide: function(t) {
        this._destroySlide(t)
    },
    destroySlideId: function(t) {
        this.destroySlide(this._findSlideIndex(t))
    },
    goTo: function(t, e, i) {
        var n = this;
        this.changeBackground({
            color_value: "",
            image: !1
        }), this.preloadTimer && clearTimeout(this.preloadTimer);
        for (var a = 0; a < this._slides.length; a++) this._slides[a].setActive(!1);
        t < this._slides.length && t >= 0 && (this.current_id = this._slides[t].data.unique_id, this.animator && this.animator.stop(), this._swipable && this._swipable.stopMomentum(), e ? (this._el.slider_container.style.left = -(this.slide_spacing * t) + "px", this._onSlideChange(i)) : this.animator = VCO.Animate(this._el.slider_container, {
            left: -(this.slide_spacing * t) + "px",
            duration: this.options.duration,
            easing: this.options.ease,
            complete: this._onSlideChange(i)
        }), this._slides[t].setActive(!0), this._slides[t + 1] ? (this.showNav(this._nav.next, !0), this._nav.next.update(this._slides[t + 1])) : this.showNav(this._nav.next, !1), this._slides[t - 1] ? (this.showNav(this._nav.previous, !0), this._nav.previous.update(this._slides[t - 1])) : this.showNav(this._nav.previous, !1), this.preloadTimer = setTimeout(function() {
            n.preloadSlides(t)
        }, this.options.duration))
    },
    goToId: function(t, e, i) {
        this.goTo(this._findSlideIndex(t), e, i)
    },
    preloadSlides: function(t) {
        this._slides[t + 1] && (this._slides[t + 1].loadMedia(), this._slides[t + 1].scrollToTop()), this._slides[t + 2] && (this._slides[t + 2].loadMedia(), this._slides[t + 2].scrollToTop()), this._slides[t - 1] && (this._slides[t - 1].loadMedia(), this._slides[t - 1].scrollToTop()), this._slides[t - 2] && (this._slides[t - 2].loadMedia(), this._slides[t - 2].scrollToTop())
    },
    next: function() {
        var t = this._findSlideIndex(this.current_id);
        t + 1 < this._slides.length ? this.goTo(t + 1) : this.goTo(t)
    },
    previous: function() {
        var t = this._findSlideIndex(this.current_id);
        t - 1 >= 0 ? this.goTo(t - 1) : this.goTo(t)
    },
    showNav: function(t, e) {
        this.options.width <= 500 && VCO.Browser.mobile || (e ? t.show() : t.hide())
    },
    changeBackground: function(t) {
        var e = {
            r: 256,
            g: 256,
            b: 256
        }, i;
        t.color_value && "" != t.color_value ? (e = VCO.Util.hexToRgb(t.color_value), e || (trace("Invalid color value " + t.color_value), e = this.options.default_bg_color)) : (e = this.options.default_bg_color, t.color_value = "rgb(" + this.options.default_bg_color.r + " , " + this.options.default_bg_color.g + ", " + this.options.default_bg_color.b + ")"), i = e.r + "," + e.g + "," + e.b, this._el.background.style.backgroundImage = "none", t.color_value ? this._el.background.style.backgroundColor = t.color_value : this._el.background.style.backgroundColor = "transparent", e.r < 255 || e.g < 255 || e.b < 255 || t.image ? (this._nav.next.setColor(!0), this._nav.previous.setColor(!0)) : (this._nav.next.setColor(!1), this._nav.previous.setColor(!1))
    },
    _updateDisplay: function(t, e, i, n) {
        var a, s;
        s = "undefined" == typeof n ? this.options.layout : n, this.options.layout = s, this.slide_spacing = 2 * this.options.width, t ? this.options.width = t : this.options.width = this._el.container.offsetWidth, e ? this.options.height = e : this.options.height = this._el.container.offsetHeight, a = this.options.height / 2, this._nav.next.setPosition({
            top: a
        }), this._nav.previous.setPosition({
            top: a
        });
        for (var o = 0; o < this._slides.length; o++) this._slides[o].updateDisplay(this.options.width, this.options.height, s), this._slides[o].setPosition({
            left: this.slide_spacing * o,
            top: 0
        });
        this.goToId(this.current_id, !0, !0)
    },
    _updateDrawSlides: function() {
        for (var t = this.options.layout, e = 0; e < this._slides.length; e++) this._slides[e].updateDisplay(this.options.width, this.options.height, t), this._slides[e].setPosition({
            left: this.slide_spacing * e,
            top: 0
        });
        this.goToId(this.current_id, !0, !1)
    },
    _initLayout: function() {
        this._el.container.className += " vco-storyslider", this._el.slider_container_mask = VCO.Dom.create("div", "vco-slider-container-mask", this._el.container), this._el.background = VCO.Dom.create("div", "vco-slider-background vco-animate", this._el.container), this._el.slider_container = VCO.Dom.create("div", "vco-slider-container vcoanimate", this._el.slider_container_mask), this._el.slider_item_container = VCO.Dom.create("div", "vco-slider-item-container", this._el.slider_container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._nav.previous = new VCO.SlideNav({
            title: "Previous",
            description: "description"
        }, {
            direction: "previous"
        }), this._nav.next = new VCO.SlideNav({
            title: "Next",
            description: "description"
        }, {
            direction: "next"
        }), this._nav.next.addTo(this._el.container), this._nav.previous.addTo(this._el.container), this._el.slider_container.style.left = "0px", VCO.Browser.touch && (this._swipable = new VCO.Swipable(this._el.slider_container_mask, this._el.slider_container, {
            enable: {
                x: !0,
                y: !1
            },
            snap: !0
        }), this._swipable.enable(), this._message = new VCO.Message({}, {
            message_class: "vco-message-full",
            message_icon_class: "vco-icon-swipe-left"
        }), this._message.updateMessage("Swipe to Navigate<br><span class='vco-button'>OK</span>"), this._message.addTo(this._el.container))
    },
    _initEvents: function() {
        this._nav.next.on("clicked", this._onNavigation, this), this._nav.previous.on("clicked", this._onNavigation, this), this._message && this._message.on("clicked", this._onMessageClick, this), this._swipable && (this._swipable.on("swipe_left", this._onNavigation, this), this._swipable.on("swipe_right", this._onNavigation, this), this._swipable.on("swipe_nodirection", this._onSwipeNoDirection, this))
    },
    _initData: function() {
        this.data.title && this._createSlide(this.data.title, !0, -1), this._createSlides(this.data.events)
    },
    _onBackgroundChange: function(t) {
        var e = this._findSlideIndex(this.current_id),
            i = this._slides[e].getBackground();
        this.changeBackground(t), this.fire("colorchange", i)
    },
    _onMessageClick: function(t) {
        this._message.hide()
    },
    _onSwipeNoDirection: function(t) {
        this.goToId(this.current_id)
    },
    _onNavigation: function(t) {
        "next" == t.direction || "left" == t.direction ? this.next() : ("previous" == t.direction || "right" == t.direction) && this.previous(), this.fire("nav_" + t.direction, this.data)
    },
    _onSlideAdded: function(t) {
        trace("slideadded"), this.fire("slideAdded", this.data)
    },
    _onSlideRemoved: function(t) {
        this.fire("slideRemoved", this.data)
    },
    _onSlideChange: function(t) {
        t || this.fire("change", {
            unique_id: this.current_id
        })
    },
    _onMouseClick: function(t) {},
    _fireMouseEvent: function(t) {
        if (this._loaded) {
            var e = t.type;
            e = "mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, this.hasEventListeners(e) && ("contextmenu" === e && VCO.DomEvent.preventDefault(t), this.fire(e, {
                latlng: "something",
                layerPoint: "something else"
            }))
        }
    },
    _onLoaded: function() {
        this.fire("loaded", this.data)
    }
}), VCO.TimeNav = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins],
    _el: {},
    initialize: function(t, e, i, n) {
        this._el = {
            parent: {},
            container: {},
            slider: {},
            slider_background: {},
            line: {},
            marker_container_mask: {},
            marker_container: {},
            marker_item_container: {},
            timeaxis: {},
            timeaxis_background: {},
            attribution: {}
        }, this.collapsed = !1, "object" == typeof t ? this._el.container = t : this._el.container = VCO.Dom.get(t), this.data = {}, this.options = {
            width: 600,
            height: 600,
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint,
            has_groups: !1,
            optimal_tick_width: 50,
            scale_factor: 2,
            marker_padding: 5,
            timenav_height_min: 150,
            marker_height_min: 30,
            marker_width_min: 100,
            zoom_sequence: [.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
        }, this.animator = null, this._markers = [], this._groups = [], this._calculated_row_height = 100, this.current_id = "", this.timescale = {}, this.timeaxis = {}, this.axishelper = {}, this.max_rows = 6, this.animate_css = !1, this._swipable, VCO.Util.mergeData(this.options, i), VCO.Util.mergeData(this.data, e), n && this.init()
    },
    init: function() {
        this._initLayout(), this._initEvents(), this._initData(), this._updateDisplay(), this._onLoaded()
    },
    positionMarkers: function() {
        this._positionMarkers()
    },
    updateDisplay: function(t, e, i, n) {
        this._updateDisplay(t, e, i, n)
    },
    _getTimeScale: function() {
        var t = 0;
        try {
            t = parseInt(this.options.marker_height_min)
        } catch (e) {
            trace("Invalid value for marker_height_min option."), t = 30
        }
        return 0 == t && (trace("marker_height_min option must not be zero."), t = 30), this.max_rows = Math.round((this.options.height - this._el.timeaxis_background.offsetHeight - this.options.marker_padding) / t), this.max_rows < 1 && (this.max_rows = 1), new VCO.TimeScale(this.data, {
            display_width: this._el.container.offsetWidth,
            screen_multiplier: this.options.scale_factor,
            max_rows: this.max_rows
        })
    },
    _updateTimeScale: function(t) {
        this.options.scale_factor = t, this._updateDrawTimeline()
    },
    zoomIn: function() {
        var t = VCO.Util.findNextGreater(this.options.zoom_sequence, this.options.scale_factor);
        t == this.options.zoom_sequence[this.options.zoom_sequence.length - 1] ? this.fire("zoomtoggle", {
            zoom: "in",
            show: !1
        }) : this.fire("zoomtoggle", {
            zoom: "in",
            show: !0
        }), this.setZoomFactor(t)
    },
    zoomOut: function() {
        var t = VCO.Util.findNextLesser(this.options.zoom_sequence, this.options.scale_factor);
        t == this.options.zoom_sequence[0] ? this.fire("zoomtoggle", {
            zoom: "out",
            show: !1
        }) : this.fire("zoomtoggle", {
            zoom: "out",
            show: !0
        }), this.setZoomFactor(t)
    },
    setZoom: function(t) {
        var e = this.options.zoom_sequence[t];
        "number" == typeof e ? this.setZoomFactor(e) : console.log("Invalid zoom level. Please use a number between 0 and " + (this.options.zoom_sequence.length - 1))
    },
    setZoomFactor: function(t) {
        this.options.scale_factor = t, this.goToId(this.current_id, !this._updateDrawTimeline(!0), !0)
    },
    _createGroups: function() {
        var t = this.timescale.getGroupLabels();
        if (t) {
            this.options.has_groups = !0;
            for (var e = 0; e < t.length; e++) this._createGroup(t[e])
        }
    },
    _createGroup: function(t) {
        var e = new VCO.TimeGroup(t);
        this._addGroup(e), this._groups.push(e)
    },
    _addGroup: function(t) {
        t.addTo(this._el.container)
    },
    _positionGroups: function() {
        if (this.options.has_groups)
            for (var t = this.options.height - this._el.timeaxis_background.offsetHeight, e = Math.floor(t / this.timescale.getNumberOfRows() - this.options.marker_padding), i = this.timescale.getGroupLabels(), n = 0, a = 0; n < this._groups.length; n++) {
                var s = Math.floor(a * (e + this.options.marker_padding));
                this._groups[n].setRowPosition(s, this._calculated_row_height + this.options.marker_padding / 2), this._groups[n].setAlternateRowColor(VCO.Util.isEven(n)), a += this._groups[n].data.rows
            }
    },
    _addMarker: function(t) {
        t.addTo(this._el.marker_item_container), t.on("markerclick", this._onMarkerClick, this), t.on("added", this._onMarkerAdded, this)
    },
    _createMarker: function(t, e) {
        var i = new VCO.TimeMarker(t, this.options);
        this._addMarker(i), 0 > e ? this._markers.push(i) : this._markers.splice(e, 0, i)
    },
    _createMarkers: function(t) {
        for (var e = 0; e < t.length; e++) this._createMarker(t[e], -1)
    },
    _removeMarker: function(t) {
        t.removeFrom(this._el.marker_item_container)
    },
    _destroyMarker: function(t) {
        this._removeMarker(this._markers[t]), this._markers.splice(t, 1)
    },
    _positionMarkers: function(t) {
        for (var e = 0; e < this._markers.length; e++) {
            var i = this.timescale.getPositionInfo(e);
            t ? this._markers[e].setClass("vco-timemarker vco-timemarker-fast") : this._markers[e].setClass("vco-timemarker"), this._markers[e].setPosition({
                left: i.start
            }), this._markers[e].setWidth(i.width)
        }
    },
    _assignRowsToMarkers: function() {
        var t = this.options.height - this._el.timeaxis_background.offsetHeight - this.options.marker_padding,
            e = Math.floor(t / this.timescale.getNumberOfRows() - this.options.marker_padding);
        this._calculated_row_height = Math.floor(t / this.timescale.getNumberOfRows());
        for (var i = 0; i < this._markers.length; i++) {
            this._markers[i].setHeight(e);
            var n = this.timescale.getPositionInfo(i).row,
                a = Math.floor(n * (e + this.options.marker_padding)) + this.options.marker_padding,
                s = t - a + this.options.marker_padding;
            this._markers[i].setRowPosition(a, s)
        }
    },
    _resetMarkersActive: function() {
        for (var t = 0; t < this._markers.length; t++) this._markers[t].setActive(!1)
    },
    _findMarkerIndex: function(t) {
        var e = -1;
        return ("string" == typeof t || t instanceof String) && (e = VCO.Util.findArrayNumberByUniqueID(t, this._markers, "unique_id", e)), e
    },
    createMarker: function(t, e) {
        this._createMarker(t, e)
    },
    createMarkers: function(t) {
        this._createMarkers(t)
    },
    destroyMarker: function(t) {
        this._destroyMarker(t)
    },
    destroyMarkerId: function(t) {
        this.destroyMarker(this._findMarkerIndex(t))
    },
    goTo: function(t, e, i) {
        var n = this,
            a = this.options.ease,
            s = this.options.duration,
            o = 0 > t ? 0 : t;
        this._resetMarkersActive(), t >= 0 && t < this._markers.length && this._markers[t].setActive(!0), this.animator && this.animator.stop(), e ? (this._el.slider.className = "vco-timenav-slider", this._el.slider.style.left = -this._markers[o].getLeft() + this.options.width / 2 + "px") : i ? (this._el.slider.className = "vco-timenav-slider vco-timenav-slider-animate", this.animate_css = !0, this._el.slider.style.left = -this._markers[o].getLeft() + this.options.width / 2 + "px") : (this._el.slider.className = "vco-timenav-slider", this.animator = VCO.Animate(this._el.slider, {
            left: -this._markers[o].getLeft() + this.options.width / 2 + "px",
            duration: s,
            easing: a
        })), t >= 0 && t < this._markers.length ? this.current_id = this._markers[t].data.unique_id : this.current_id = ""
    },
    goToId: function(t, e, i) {
        this.goTo(this._findMarkerIndex(t), e, i)
    },
    _onLoaded: function() {
        this.fire("loaded", this.data)
    },
    _onMarkerAdded: function(t) {
        this.fire("dateAdded", this.data)
    },
    _onMarkerRemoved: function(t) {
        this.fire("dateRemoved", this.data)
    },
    _onMarkerClick: function(t) {
        this.goToId(t.unique_id), this.fire("change", {
            unique_id: t.unique_id
        })
    },
    _onMouseScroll: function(t) {
        var e = 0,
            i = 0,
            n = {
                right: -(this.timescale.getPixelWidth() - this.options.width / 2),
                left: this.options.width / 2
            };
        t || (t = window.event), t.originalEvent && (t = t.originalEvent), "undefined" != typeof t.wheelDeltaX && (e = t.wheelDeltaY / 6, e = Math.abs(t.wheelDeltaX) > Math.abs(t.wheelDeltaY) ? t.wheelDeltaX / 6 : 0), e && (t.preventDefault && t.preventDefault(), t.returnValue = !1), i = parseInt(this._el.slider.style.left.replace("px", "")) + e, i > n.left ? i = n.left : i < n.right && (i = n.right), this.animate_css && (this._el.slider.className = "vco-timenav-slider", this.animate_css = !1), this._el.slider.style.left = i + "px"
    },
    _onDragMove: function(t) {
        this.animate_css && (this._el.slider.className = "vco-timenav-slider", this.animate_css = !1)
    },
    _updateDisplay: function(t, e, i) {
        t && (this.options.width = t), e && e != this.options.height && (this.options.height = e, this.timescale = this._getTimeScale()), this._assignRowsToMarkers(), this._el.slider_background.style.width = this.timescale.getPixelWidth() + this.options.width + "px", this._el.slider_background.style.left = -(this.options.width / 2) + "px", this._el.slider.style.width = this.timescale.getPixelWidth() + this.options.width + "px", this._swipable.updateConstraint({
            top: !1,
            bottom: !1,
            left: this.options.width / 2,
            right: -(this.timescale.getPixelWidth() - this.options.width / 2)
        }), this.goToId(this.current_id, !0)
    },
    _drawTimeline: function(t) {
        this.timescale = this._getTimeScale(), this.timeaxis.drawTicks(this.timescale, this.options.optimal_tick_width), this._positionMarkers(t), this._assignRowsToMarkers(), this._createGroups(), this._positionGroups()
    },
    _updateDrawTimeline: function(t) {
        var e = !1;
        if (t) {
            var i = new VCO.TimeScale(this.data, {
                display_width: this._el.container.offsetWidth,
                screen_multiplier: this.options.scale_factor,
                max_rows: this.max_rows
            });
            this.timescale.getMajorScale() == i.getMajorScale() && this.timescale.getMinorScale() == i.getMinorScale() && (e = !0)
        } else e = !0;
        return e ? (this.timescale = this._getTimeScale(), this.timeaxis.positionTicks(this.timescale, this.options.optimal_tick_width), this._positionMarkers(), this._assignRowsToMarkers(), this._positionGroups(), this._updateDisplay()) : this._drawTimeline(!0), e
    },
    _initLayout: function() {
        this._el.attribution = VCO.Dom.create("div", "vco-attribution", this._el.container), this._el.line = VCO.Dom.create("div", "vco-timenav-line", this._el.container), this._el.slider = VCO.Dom.create("div", "vco-timenav-slider", this._el.container), this._el.slider_background = VCO.Dom.create("div", "vco-timenav-slider-background", this._el.slider), this._el.marker_container_mask = VCO.Dom.create("div", "vco-timenav-container-mask", this._el.slider), this._el.marker_container = VCO.Dom.create("div", "vco-timenav-container", this._el.marker_container_mask), this._el.marker_item_container = VCO.Dom.create("div", "vco-timenav-item-container", this._el.marker_container), this._el.timeaxis = VCO.Dom.create("div", "vco-timeaxis", this._el.slider), this._el.timeaxis_background = VCO.Dom.create("div", "vco-timeaxis-background", this._el.container), this._el.attribution.innerHTML = "<a href='http://timeline.knightlab.com' target='_blank'><span class='vco-knightlab-logo'></span>Timeline JS</a>", this.timeaxis = new VCO.TimeAxis(this._el.timeaxis, this.options), this._swipable = new VCO.Swipable(this._el.slider_background, this._el.slider, {
            enable: {
                x: !0,
                y: !1
            },
            constraint: {
                top: !1,
                bottom: !1,
                left: this.options.width / 2,
                right: !1
            },
            snap: !1
        }), this._swipable.enable()
    },
    _initEvents: function() {
        this._swipable.on("dragmove", this._onDragMove, this), VCO.DomEvent.addListener(this._el.container, "mousewheel", this._onMouseScroll, this), VCO.DomEvent.addListener(this._el.container, "DOMMouseScroll", this._onMouseScroll, this)
    },
    _initData: function() {
        this._createMarkers(this.data.events), this._drawTimeline()
    }
}), VCO.TimeMarker = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins],
    _el: {},
    initialize: function(t, e) {
        this._el = {
            container: {},
            content_container: {},
            media_container: {},
            timespan: {},
            line_left: {},
            line_right: {},
            content: {},
            text: {},
            media: {}
        }, this._text = {}, this._state = {
            loaded: !1
        }, this.data = {
            unique_id: "",
            background: null,
            date: {
                year: 0,
                month: 0,
                day: 0,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                thumbnail: "",
                format: ""
            },
            text: {
                headline: "",
                text: ""
            },
            media: null
        }, this.options = {
            duration: 1e3,
            ease: VCO.Ease.easeInSpline,
            width: 600,
            height: 600,
            marker_width_min: 100
        }, this.active = !1, this.animator = {}, this.has_end_date = !1, VCO.Util.mergeData(this.options, e), VCO.Util.mergeData(this.data, t), this._initLayout(), this._initEvents()
    },
    show: function() {},
    hide: function() {},
    setActive: function(t) {
        this.active = t, this.active && this.has_end_date ? this._el.container.className = "vco-timemarker vco-timemarker-with-end vco-timemarker-active" : this.active ? this._el.container.className = "vco-timemarker vco-timemarker-active" : this.has_end_date ? this._el.container.className = "vco-timemarker vco-timemarker-with-end" : this._el.container.className = "vco-timemarker"
    },
    addTo: function(t) {
        t.appendChild(this._el.container)
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container)
    },
    updateDisplay: function(t, e) {
        this._updateDisplay(t, e)
    },
    loadMedia: function() {
        this._media && !this._state.loaded && (this._media.loadMedia(), this._state.loaded = !0)
    },
    stopMedia: function() {
        this._media && this._state.loaded && this._media.stopMedia()
    },
    getLeft: function() {
        return this._el.container.style.left.slice(0, -2)
    },
    getTime: function() {
        return this.data.start_date.getTime()
    },
    getEndTime: function() {
        return this.data.end_date ? this.data.end_date.getTime() : !1
    },
    setHeight: function(t) {
        var e = 12,
            i = 1;
        this._el.content_container.style.height = t + "px", this._el.timespan_content.style.height = t + "px", 30 >= t ? this._el.content.className = "vco-timemarker-content vco-timemarker-content-small" : this._el.content.className = "vco-timemarker-content", 56 >= t ? VCO.DomUtil.addClass(this._el.content_container, "vco-timemarker-content-container-small") : VCO.DomUtil.removeClass(this._el.content_container, "vco-timemarker-content-container-small"), VCO.Browser.webkit ? (i = Math.floor(t / (e + 2)), 1 > i && (i = 1), this._text.className = "vco-headline", this._text.style.webkitLineClamp = i) : (i = t / e, i > 1 ? this._text.className = "vco-headline vco-headline-fadeout" : this._text.className = "vco-headline", this._text.style.height = i * e + "px")
    },
    setWidth: function(t) {
        this.data.end_date && (this._el.container.style.width = t + "px", t > this.options.marker_width_min ? (this._el.content_container.style.width = t + "px", this._el.content_container.className = "vco-timemarker-content-container vco-timemarker-content-container-long") : (this._el.content_container.style.width = this.options.marker_width_min + "px", this._el.content_container.className = "vco-timemarker-content-container"))
    },
    setClass: function(t) {
        this._el.container.className = t
    },
    setRowPosition: function(t, e) {
        this.setPosition({
            top: t
        }), this._el.timespan.style.height = e + "px"
    },
    _onMarkerClick: function(t) {
        this.fire("markerclick", {
            unique_id: this.data.unique_id
        })
    },
    _initLayout: function() {
        if (this._el.container = VCO.Dom.create("div", "vco-timemarker"), this.data.unique_id && (this._el.container.id = this.data.unique_id + "-marker"), this.data.end_date && (this.has_end_date = !0, this._el.container.className = "vco-timemarker vco-timemarker-with-end"), this._el.timespan = VCO.Dom.create("div", "vco-timemarker-timespan", this._el.container), this._el.timespan_content = VCO.Dom.create("div", "vco-timemarker-timespan-content", this._el.timespan), this._el.content_container = VCO.Dom.create("div", "vco-timemarker-content-container", this._el.container), this._el.content = VCO.Dom.create("div", "vco-timemarker-content", this._el.content_container), this._el.line_left = VCO.Dom.create("div", "vco-timemarker-line-left", this._el.timespan), this._el.line_right = VCO.Dom.create("div", "vco-timemarker-line-right", this._el.timespan), this.data.media)
            if (this._el.media_container = VCO.Dom.create("div", "vco-timemarker-media-container", this._el.content), this.data.media.thumbnail && "" != this.data.media.thumbnail) this._el.media = VCO.Dom.create("img", "vco-timemarker-media", this._el.media_container), this._el.media.src = VCO.Util.transformImageURL(this.data.media.thumbnail);
            else {
                var t = VCO.MediaType(this.data.media).type;
                this._el.media = VCO.Dom.create("span", "vco-icon-" + t, this._el.media_container)
            }
        this._el.text = VCO.Dom.create("div", "vco-timemarker-text", this._el.content), this._text = VCO.Dom.create("h2", "vco-headline", this._el.text), this.data.text.headline && "" != this.data.text.headline ? this._text.innerHTML = VCO.Util.unlinkify(this.data.text.headline) : this.data.text.text && "" != this.data.text.text ? this._text.innerHTML = VCO.Util.unlinkify(this.data.text.text) : this.data.media.caption && "" != this.data.media.caption && (this._text.innerHTML = VCO.Util.unlinkify(this.data.media.caption)), this.onLoaded()
    },
    _initEvents: function() {
        VCO.DomEvent.addListener(this._el.container, "click", this._onMarkerClick, this)
    },
    _updateDisplay: function(t, e, i) {
        t && (this.options.width = t), e && (this.options.height = e)
    }
}), VCO.TimeGroup = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins],
    _el: {},
    initialize: function(t) {
        this._el = {
            parent: {},
            container: {},
            message: {}
        }, this.options = {
            width: 600,
            height: 600
        }, this.data = {
            label: "",
            rows: 1
        }, this._el.container = VCO.Dom.create("div", "vco-timegroup"), VCO.Util.mergeData(this.data, t), this.animator = {}, this._initLayout(), this._initEvents()
    },
    updateDisplay: function(t, e) {},
    setRowPosition: function(t, e) {
        this.options.height = e * this.data.rows, this.setPosition({
            top: t
        }), this._el.container.style.height = this.options.height + "px"
    },
    setAlternateRowColor: function(t) {
        t ? this._el.container.className = "vco-timegroup vco-timegroup-alternate" : this._el.container.className = "vco-timegroup"
    },
    _onMouseClick: function() {
        this.fire("clicked", this.options)
    },
    _initLayout: function() {
        this._el.message = VCO.Dom.create("div", "vco-timegroup-message", this._el.container), this._el.message.innerHTML = this.data.label
    },
    _initEvents: function() {
        VCO.DomEvent.addListener(this._el.container, "click", this._onMouseClick, this)
    },
    _updateDisplay: function(t, e, i) {}
}), VCO.TimeScale = VCO.Class.extend({
    initialize: function(t, e) {
        t = VCO.Util.mergeData({
            scale: "human"
        }, t);
        var i = t.events;
        if (this._scale = t.scale, e = VCO.Util.mergeData({
            display_width: 500,
            screen_multiplier: 3,
            max_rows: null
        }, e), this._display_width = e.display_width, this._screen_multiplier = e.screen_multiplier, this._pixel_width = this._screen_multiplier * this._display_width, this._group_labels = void 0, this._positions = [], this._pixels_per_milli = 0, this._earliest = i[0].start_date.getTime(), this._latest = i[i.length - 1].start_date.getTime(), this._span_in_millis = this._latest - this._earliest, this._span_in_millis < 0) throw new Error("earliest event time is before latest. Events should be sorted.");
        0 == this._span_in_millis && (this._span_in_millis = this._computeDefaultSpan(t)), this._average = this._span_in_millis / i.length, this._pixels_per_milli = this.getPixelWidth() / this._span_in_millis, this._axis_helper = VCO.AxisHelper.getBestHelper(this), this._scaled_padding = 1 / this.getPixelsPerTick() * (this._display_width / 2), this._computePositionInfo(i, e.max_rows)
    },
    _computeDefaultSpan: function(t) {
        if ("human" == t.scale) {
            for (var e = {}, i = 0; i < t.events.length; i++) {
                var n = t.events[i].start_date.findBestFormat();
                e[n] = e[n] ? e[n] + 1 : 1
            }
            for (var i = VCO.Date.SCALES.length - 1; i >= 0; i--)
                if (e.hasOwnProperty(VCO.Date.SCALES[i][0])) {
                    var a = VCO.Date.SCALES[VCO.Date.SCALES.length - 1];
                    return VCO.Date.SCALES[i + 1] && (a = VCO.Date.SCALES[i + 1]), a[1]
                }
            return 31536e6
        }
        return 2e5
    },
    getGroupLabels: function() {
        return this._group_labels || []
    },
    getScale: function() {
        return this._scale
    },
    getNumberOfRows: function() {
        return this._number_of_rows
    },
    getPixelWidth: function() {
        return this._pixel_width
    },
    getPosition: function(t) {
        return (t - this._earliest) * this._pixels_per_milli
    },
    getPositionInfo: function(t) {
        return this._positions[t]
    },
    getPixelsPerTick: function() {
        return this._axis_helper.getPixelsPerTick(this._pixels_per_milli)
    },
    getTicks: function() {
        return {
            major: this._axis_helper.getMajorTicks(this),
            minor: this._axis_helper.getMinorTicks(this)
        }
    },
    getDateFromTime: function(t) {
        if ("human" == this._scale) return new VCO.Date(t);
        if ("cosmological" == this._scale) return new VCO.BigDate(new VCO.BigYear(t));
        throw "Don't know how to get date from time for " + this._scale
    },
    getMajorScale: function() {
        return this._axis_helper.major.name
    },
    getMinorScale: function() {
        return this._axis_helper.minor.name
    },
    _assessGroups: function(t) {
        for (var e = [], i = !1, n = 0; n < t.length; n++) t[n].group && (e.indexOf(t[n].group) < 0 ? e.push(t[n].group) : i = !0);
        return e.length && i && e.push(""), e
    },
    _computeRowInfo: function(t, e) {
        for (var i = [], n = 0, a = 0; a < t.length; a++) {
            var s = t[a],
                o = [];
            delete s.row;
            for (var r = 0; r < i.length; r++)
                if (o.push(i[r].end - s.start), o[r] <= 0) {
                    s.row = r, i[r] = s;
                    break
                }
            if ("undefined" == typeof s.row)
                if (null === e) s.row = i.length, i.push(s);
                else if (e > 0) s.row = i.length, i.push(s), e--;
            else {
                var h = Math.min.apply(null, o),
                    l = o.indexOf(h);
                s.row = l, s.end > i[l].end && (i[l] = s), n++
            }
        }
        return {
            n_rows: i.length,
            n_overlaps: n
        }
    },
    _computePositionInfo: function(t, e, i) {
        i = i || 100;
        for (var n = [], a = !1, s = 0; s < t.length; s++) {
            var o = {
                start: this.getPosition(t[s].start_date.getTime())
            };
            if (this._positions.push(o), "undefined" != typeof t[s].end_date) {
                var r = this.getPosition(t[s].end_date.getTime());
                o.width = r - o.start, o.width > i ? o.end = o.start + o.width : o.end = o.start + i
            } else o.width = i, o.end = o.start + i;
            t[s].group ? n.indexOf(t[s].group) < 0 && n.push(t[s].group) : a = !0
        }
        if (n.length) {
            a && n.push("");
            for (var h = [], s = 0; s < n.length; s++) h[s] = {
                label: n[s],
                idx: s,
                positions: [],
                n_rows: 1,
                n_overlaps: 0
            };
            for (var s = 0; s < this._positions.length; s++) {
                var o = this._positions[s];
                o.group = n.indexOf(t[s].group || ""), o.row = 0;
                for (var l = h[o.group], c = l.positions.length - 1; c >= 0; c--) l.positions[c].end > o.start && l.n_overlaps++;
                l.positions.push(o)
            }
            for (var d = n.length;;) {
                var u = Math.max(0, e - d);
                if (!u) break;
                if (h.sort(function(t, e) {
                    return t.n_overlaps > e.n_overlaps ? -1 : t.n_overlaps < e.n_overlaps ? 1 : t.idx - e.idx
                }), !h[0].n_overlaps) break;
                for (var d = 0, s = 0; s < h.length; s++) {
                    var l = h[s];
                    if (l.n_overlaps && u) {
                        var m = this._computeRowInfo(l.positions, l.n_rows + 1);
                        l.n_rows = m.n_rows, l.n_overlaps = m.n_overlaps, u--
                    }
                    d += l.n_rows
                }
            }
            this._number_of_rows = d, this._group_labels = [], h.sort(function(t, e) {
                return t.idx - e.idx
            });
            for (var s = 0, f = 0; s < h.length; s++) {
                this._group_labels.push({
                    label: h[s].label,
                    rows: h[s].n_rows
                });
                for (var c = 0; c < h[s].positions.length; c++) {
                    var o = h[s].positions[c];
                    o.row += f
                }
                f += h[s].n_rows
            }
        } else {
            var p = this._computeRowInfo(this._positions, e);
            this._number_of_rows = p.n_rows
        }
    }
}), VCO.TimeAxis = VCO.Class.extend({
    includes: [VCO.Events, VCO.DomMixins, VCO.I18NMixins],
    _el: {},
    initialize: function(t, e) {
        this._el = {
            container: {},
            content_container: {},
            major: {},
            minor: {}
        }, this._text = {}, this._state = {
            loaded: !1
        }, this.data = {}, this.options = {
            duration: 1e3,
            ease: VCO.Ease.easeInSpline,
            width: 600,
            height: 600
        }, this.active = !1, this.animator = {}, this.axis_helper = {}, this.minor_ticks = [], this.major_ticks = [], this.dateformat_lookup = {
            millisecond: "time_milliseconds",
            second: "time_short",
            minute: "time_no_seconds_short",
            hour: "time_no_minutes_short",
            day: "full_short",
            month: "month_short",
            year: "year",
            decade: "year",
            century: "year",
            millennium: "year",
            age: "compact",
            epoch: "compact",
            era: "compact",
            eon: "compact",
            eon2: "compact"
        }, "object" == typeof t ? this._el.container = t : this._el.container = VCO.Dom.get(t), VCO.Util.mergeData(this.options, e), this._initLayout(), this._initEvents()
    },
    show: function() {},
    hide: function() {},
    addTo: function(t) {
        t.appendChild(this._el.container)
    },
    removeFrom: function(t) {
        t.removeChild(this._el.container)
    },
    updateDisplay: function(t, e) {
        this._updateDisplay(t, e)
    },
    getLeft: function() {
        return this._el.container.style.left.slice(0, -2)
    },
    drawTicks: function(t, e) {
        var i = t.getTicks(),
            n = {
                minor: {
                    el: this._el.minor,
                    dateformat: this.dateformat_lookup[i.minor.name],
                    ts_ticks: i.minor.ticks,
                    tick_elements: this.minor_ticks
                },
                major: {
                    el: this._el.major,
                    dateformat: this.dateformat_lookup[i.major.name],
                    ts_ticks: i.major.ticks,
                    tick_elements: this.major_ticks
                }
            };
        this._el.major.className = "vco-timeaxis-major", this._el.minor.className = "vco-timeaxis-minor", this._el.major.style.opacity = 0, this._el.minor.style.opacity = 0, this.major_ticks = this._createTickElements(i.major.ticks, this._el.major, this.dateformat_lookup[i.major.name]), this.minor_ticks = this._createTickElements(i.minor.ticks, this._el.minor, this.dateformat_lookup[i.minor.name], i.major.ticks), this.positionTicks(t, e, !0), this._el.major.className = "vco-timeaxis-major vco-animate-opacity vco-timeaxis-animate-opacity", this._el.minor.className = "vco-timeaxis-minor vco-animate-opacity vco-timeaxis-animate-opacity", this._el.major.style.opacity = 1, this._el.minor.style.opacity = 1
    },
    _createTickElements: function(t, e, i, n) {
        e.innerHTML = "";
        var a = {};
        if (n)
            for (idx in n) a[n[idx].getTime()] = !0;
        for (var s = [], o = 0; o < t.length; o++) {
            var r = t[o];
            if (!(r.getTime() in a)) {
                var h = VCO.Dom.create("div", "vco-timeaxis-tick", e),
                    l = VCO.Dom.create("span", "vco-timeaxis-tick-text vco-animate-opacity", h);
                l.innerHTML = r.getDisplayDate(this.getLanguage(), i), s.push({
                    tick: h,
                    tick_text: l,
                    display_date: r.getDisplayDate(this.getLanguage(), i),
                    date: r
                })
            }
        }
        return s
    },
    positionTicks: function(t, e, i) {
        i ? (this._el.major.className = "vco-timeaxis-major", this._el.minor.className = "vco-timeaxis-minor") : (this._el.major.className = "vco-timeaxis-major vco-timeaxis-animate", this._el.minor.className = "vco-timeaxis-minor vco-timeaxis-animate"), this._positionTickArray(this.major_ticks, t, e), this._positionTickArray(this.minor_ticks, t, e)
    },
    _positionTickArray: function(t, e, i) {
        if (t[1] && t[0]) {
            var n = e.getPosition(t[1].date.getMillisecond()) - e.getPosition(t[0].date.getMillisecond()),
                a = 1;
            i > n && (a = Math.round(i / e.getPixelsPerTick()));
            for (var s = 1, o = 0; o < t.length; o++) {
                var r = t[o];
                r.tick.style.left = e.getPosition(r.date.getMillisecond()) + "px", r.tick_text.innerHTML = r.display_date, a > 1 ? s >= a ? (s = 1, r.tick_text.style.opacity = 1, r.tick.className = "vco-timeaxis-tick") : (s++, r.tick_text.style.opacity = 0, r.tick.className = "vco-timeaxis-tick vco-timeaxis-tick-hidden") : (r.tick_text.style.opacity = 1, r.tick.className = "vco-timeaxis-tick")
            }
        }
    },
    _initLayout: function() {
        this._el.content_container = VCO.Dom.create("div", "vco-timeaxis-content-container", this._el.container), this._el.major = VCO.Dom.create("div", "vco-timeaxis-major", this._el.content_container), this._el.minor = VCO.Dom.create("div", "vco-timeaxis-minor", this._el.content_container), this.onLoaded()
    },
    _initEvents: function() {},
    _updateDisplay: function(t, e, i) {
        t && (this.options.width = t), e && (this.options.height = e)
    }
}), VCO.AxisHelper = VCO.Class.extend({
    initialize: function(t) {
        if (!t) throw "Axis helper must be configured with options";
        this.scale = t.scale, this.minor = t.minor, this.major = t.major
    },
    getPixelsPerTick: function(t) {
        return t * this.minor.factor
    },
    getMajorTicks: function(t) {
        return this._getTicks(t, this.major)
    },
    getMinorTicks: function(t) {
        return this._getTicks(t, this.minor)
    },
    _getTicks: function(t, e) {
        for (var i = t._scaled_padding * e.factor, n = t._earliest - i, a = t._latest + i, s = [], o = n; a > o; o += e.factor) s.push(t.getDateFromTime(o).floor(e.name));
        return {
            name: e.name,
            ticks: s
        }
    }
}),
function(t) {
    var e = {}, i = function(i, n) {
            e[i] = [];
            for (var a = 0; a < n.length - 1; a++) {
                var s = n[a],
                    o = n[a + 1];
                e[i].push(new t({
                    scale: s[3],
                    minor: {
                        name: s[0],
                        factor: s[1]
                    },
                    major: {
                        name: o[0],
                        factor: o[1]
                    }
                }))
            }
        };
    i("human", VCO.Date.SCALES), i("cosmological", VCO.BigDate.SCALES), t.HELPERS = e, t.getBestHelper = function(t, i) {
        "number" != typeof i && (i = 100);
        var n = t.getScale(),
            a = e[n];
        if (!a) throw "No AxisHelper available for " + n;
        var s = null;
        for (var o in a) {
            var r = a[o],
                h = r.getPixelsPerTick(t._pixels_per_milli);
            if (h > i) {
                if (null == s) return r;
                var l = Math.abs(i - h),
                    c = Math.abs(i - h);
                return c > l ? r : s
            }
            s = r
        }
        return a[a.length - 1]
    }
}(VCO.AxisHelper), VCO.Timeline = VCO.Class.extend({
    includes: [VCO.Events, VCO.I18NMixins],
    initialize: function(t, e, i) {
        var n = this;
        this.version = "0.0.20", this.ready = !1, this._el = {
            container: {},
            storyslider: {},
            timenav: {},
            menubar: {}
        }, "object" == typeof t ? this._el.container = t : this._el.container = VCO.Dom.get(t),
        this._storyslider = {}, this._style_sheet = new VCO.StyleSheet, this._timenav = {}, this.message = new VCO.Message({}, {
            message_class: "vco-message-full"
        }), this._menubar = {}, this._loaded = {
            storyslider: !1,
            timenav: !1
        }, this.config = null, this.options = {
            script_path: "",
            height: this._el.container.offsetHeight,
            width: this._el.container.offsetWidth,
            is_embed: !1,
            is_full_embed: !1,
            hash_bookmark: !0,
            default_bg_color: {
                r: 255,
                g: 255,
                b: 255
            },
            scale_factor: 2,
            layout: "landscape",
            timenav_position: "bottom",
            optimal_tick_width: 60,
            base_class: "vco-timeline",
            timenav_height: 175,
            timenav_height_percentage: 25,
            timenav_mobile_height_percentage: 40,
            timenav_height_min: 175,
            marker_height_min: 30,
            marker_width_min: 100,
            marker_padding: 5,
            start_at_slide: 0,
            start_at_end: !1,
            menubar_height: 0,
            skinny_size: 650,
            medium_size: 800,
            relative_date: !1,
            use_bc: !1,
            duration: 1e3,
            ease: VCO.Ease.easeInOutQuint,
            dragging: !0,
            trackResize: !0,
            map_type: "stamen:toner-lite",
            slide_padding_lr: 100,
            slide_default_fade: "0%",
            zoom_sequence: [.5, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
            language: "en",
            ga_property_id: null,
            track_events: ["back_to_start", "nav_next", "nav_previous", "zoom_in", "zoom_out"]
        }, this.animator_timenav = null, this.animator_storyslider = null, this.animator_menubar = null, VCO.Util.mergeData(this.options, i), window.addEventListener("resize", function(t) {
            n.updateDisplay()
        }), this._el.container.className += " vco-timeline", this.options.is_embed && (this._el.container.className += " vco-timeline-embed"), this.options.is_full_embed && (this._el.container.className += " vco-timeline-full-embed"), this.message.addTo(this._el.container), this.options.relative_date ? "undefined" != typeof moment ? n._loadLanguage(e) : VCO.Load.js(this.options.script_path + "/library/moment.js", function() {
            n._loadLanguage(e), trace("LOAD MOMENTJS")
        }) : n._loadLanguage(e)
    },
    _loadLanguage: function(t) {
        var e = this;
        this.options.language = new VCO.Language(this.options), this._initData(t)
    },
    goToId: function(t) {
        this.current_id != t && (this.current_id = t, this._timenav.goToId(this.current_id), this._storyslider.goToId(this.current_id, !1, !0), this.fire("change", {
            unique_id: this.current_id
        }, this))
    },
    goTo: function(t) {
        this.config.title ? 0 == t ? this.goToId(this.config.title.unique_id) : this.goToId(this.config.events[t - 1].unique_id) : this.goToId(this.config.events[t].unique_id)
    },
    goToStart: function() {
        this.goTo(0)
    },
    goToEnd: function() {
        var t = this.config.events.length - 1;
        this.goTo(this.config.title ? t + 1 : t)
    },
    goToPrev: function() {
        this.goTo(this._getSlideIndex(this.current_id) - 1)
    },
    goToNext: function() {
        this.goTo(this._getSlideIndex(this.current_id) + 1)
    },
    add: function(t) {
        var e = this.config.addEvent(t),
            i = this._getEventIndex(e),
            n = this.config.events[i];
        this._storyslider.createSlide(n, this.config.title ? i + 1 : i), this._storyslider._updateDrawSlides(), this._timenav.createMarker(n, i), this._timenav._updateDrawTimeline(!1), this.fire("added", {
            unique_id: e
        })
    },
    remove: function(t) {
        if (t >= 0 && t < this.config.events.length) {
            this.config.events[t].unique_id == this.current_id && (t < this.config.events.length - 1 ? this.goTo(t + 1) : this.goTo(t - 1));
            var e = this.config.events.splice(t, 1);
            this._storyslider.destroySlide(this.config.title ? t + 1 : t), this._storyslider._updateDrawSlides(), this._timenav.destroyMarker(t), this._timenav._updateDrawTimeline(!1), this.fire("removed", {
                unique_id: e[0].unique_id
            })
        }
    },
    removeId: function(t) {
        this.remove(this._getEventIndex(t))
    },
    getData: function(t) {
        if (this.config.title) {
            if (0 == t) return this.config.title;
            if (t > 0 && t <= this.config.events.length) return this.config.events[t - 1]
        } else if (t >= 0 && t < this.config.events.length) return this.config.events[t];
        return null
    },
    getDataById: function(t) {
        return this.getData(this._getSlideIndex(t))
    },
    getSlide: function(t) {
        return t >= 0 && t < this._storyslider._slides.length ? this._storyslider._slides[t] : null
    },
    getSlideById: function(t) {
        return this.getSlide(this._getSlideIndex(t))
    },
    getCurrentSlide: function() {
        return this.getSlideById(this.current_id)
    },
    updateDisplay: function() {
        this.ready && this._updateDisplay()
    },
    _calculateTimeNavHeight: function(t, e) {
        var i = 0;
        return t ? i = t : (this.options.timenav_height_percentage || e) && (i = e ? Math.round(this.options.height / 100 * e) : Math.round(this.options.height / 100 * this.options.timenav_height_percentage)), i < this.options.timenav_height_min && (i = this.options.timenav_height_min), i -= 2 * this.options.marker_padding
    },
    _updateDisplay: function(t, e, i) {
        var n = this.options.duration,
            a = this.options.base_class,
            s = 0,
            o = this;
        i && (n = i), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this.options.width <= this.options.skinny_size ? (a += " vco-skinny", this.options.layout = "portrait") : this.options.width <= this.options.medium_size ? (a += " vco-medium", this.options.layout = "landscape") : this.options.layout = "landscape", VCO.Browser.touch && (this.options.layout = VCO.Browser.orientation()), VCO.Browser.mobile ? (a += " vco-mobile", this.options.timenav_height = this._calculateTimeNavHeight(t, this.options.timenav_mobile_height_percentage)) : this.options.timenav_height = this._calculateTimeNavHeight(t), a += "portrait" == this.options.layout ? " vco-layout-portrait" : " vco-layout-landscape", this.options.storyslider_height = this.options.height - this.options.timenav_height, s = "top" == this.options.timenav_position ? Math.ceil(this.options.timenav_height) / 2 - this._el.menubar.offsetHeight / 2 - 19.5 : Math.round(this.options.storyslider_height + 1 + Math.ceil(this.options.timenav_height) / 2 - this._el.menubar.offsetHeight / 2 - 17.5), e ? (this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px", this.animator_storyslider && this.animator_storyslider.stop(), this.animator_storyslider = VCO.Animate(this._el.storyslider, {
            height: this.options.storyslider_height + "px",
            duration: n / 2,
            easing: VCO.Ease.easeOutStrong
        }), this.animator_menubar && this.animator_menubar.stop(), this.animator_menubar = VCO.Animate(this._el.menubar, {
            top: s + "px",
            duration: n / 2,
            easing: VCO.Ease.easeOutStrong
        })) : (this._el.timenav.style.height = Math.ceil(this.options.timenav_height) + "px", this._el.storyslider.style.height = this.options.storyslider_height + "px", this._el.menubar.style.top = s + "px"), this.message && this.message.updateDisplay(this.options.width, this.options.height), this._timenav.updateDisplay(this.options.width, this.options.timenav_height, e), this._storyslider.updateDisplay(this.options.width, this.options.storyslider_height, e, this.options.layout), this._el.container.className = a
    },
    _updateHashBookmark: function(t) {
        var e = "#event-" + t.toString();
        window.history.replaceState(null, "Browsing TimelineJS", e), this.fire("hash_updated", {
            unique_id: this.current_id,
            hashbookmark: "#event-" + t.toString()
        }, this)
    },
    _initData: function(t) {
        var e = this;
        if ("string" == typeof t) {
            var e = this;
            VCO.ConfigFactory.makeConfig(t, function(t) {
                e.setConfig(t)
            })
        } else VCO.TimelineConfig == t.constructor ? this.setConfig(t) : this.setConfig(new VCO.TimelineConfig(t))
    },
    setConfig: function(t) {
        this.config = t, this.config.validate(), this.config.isValid() ? this._onDataLoaded() : this.showMessage("<strong>" + this._("error") + ":</strong> " + this.config.getErrors(";"))
    },
    _initLayout: function() {
        var t = this;
        this._el.container.innerHTML = "", "top" == this.options.timenav_position ? (this._el.timenav = VCO.Dom.create("div", "vco-timenav", this._el.container), this._el.storyslider = VCO.Dom.create("div", "vco-storyslider", this._el.container)) : (this._el.storyslider = VCO.Dom.create("div", "vco-storyslider", this._el.container), this._el.timenav = VCO.Dom.create("div", "vco-timenav", this._el.container)), this._el.menubar = VCO.Dom.create("div", "vco-menubar", this._el.container), this.options.width = this._el.container.offsetWidth, this.options.height = this._el.container.offsetHeight, this._el.storyslider.style.top = "1px", this.options.timenav_height = this._calculateTimeNavHeight(), this._timenav = new VCO.TimeNav(this._el.timenav, this.config, this.options), this._timenav.on("loaded", this._onTimeNavLoaded, this), this._timenav.options.height = this.options.timenav_height, this._timenav.init(), this.options.initial_zoom && this.setZoom(this.options.initial_zoom), this._storyslider = new VCO.StorySlider(this._el.storyslider, this.config, this.options), this._storyslider.on("loaded", this._onStorySliderLoaded, this), this._storyslider.init(), this._menubar = new VCO.MenuBar(this._el.menubar, this._el.container, this.options), "portrait" == this.options.layout ? this.options.storyslider_height = this.options.height - this.options.timenav_height - 1 : this.options.storyslider_height = this.options.height - 1, this._updateDisplay(!1, !0, 2e3)
    },
    _initEvents: function() {
        this._timenav.on("change", this._onTimeNavChange, this), this._timenav.on("zoomtoggle", this._onZoomToggle, this), this._storyslider.on("change", this._onSlideChange, this), this._storyslider.on("colorchange", this._onColorChange, this), this._storyslider.on("nav_next", this._onStorySliderNext, this), this._storyslider.on("nav_previous", this._onStorySliderPrevious, this), this._menubar.on("zoom_in", this._onZoomIn, this), this._menubar.on("zoom_out", this._onZoomOut, this), this._menubar.on("back_to_start", this._onBackToStart, this)
    },
    _initGoogleAnalytics: function() {
        ! function(t, e, i, n, a, s, o) {
            t.GoogleAnalyticsObject = a, t[a] = t[a] || function() {
                (t[a].q = t[a].q || []).push(arguments)
            }, t[a].l = 1 * new Date, s = e.createElement(i), o = e.getElementsByTagName(i)[0], s.async = 1, s.src = n, o.parentNode.insertBefore(s, o)
        }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", this.options.ga_property_id, "auto")
    },
    _initAnalytics: function() {
        if (null !== this.options.ga_property_id) {
            this._initGoogleAnalytics(), ga("send", "pageview");
            var t = this.options.track_events;
            for (i = 0; i < t.length; i++) {
                var e = t[i];
                this.addEventListener(e, function(t) {
                    ga("send", "event", t.type, "clicked")
                })
            }
        }
    },
    _onZoomToggle: function(t) {
        "in" == t.zoom ? this._menubar.toogleZoomIn(t.show) : "out" == t.zoom && this._menubar.toogleZoomOut(t.show)
    },
    _getEventIndex: function(t) {
        for (var e = 0; e < this.config.events.length; e++)
            if (t == this.config.events[e].unique_id) return e;
        return -1
    },
    _getSlideIndex: function(t) {
        if (this.config.title && this.config.title.unique_id == t) return 0;
        for (var e = 0; e < this.config.events.length; e++)
            if (t == this.config.events[e].unique_id) return this.config.title ? e + 1 : e;
        return -1
    },
    _onDataLoaded: function(t) {
        this.fire("dataloaded"), this._initLayout(), this._initEvents(), this._initAnalytics(), this.message && this.message.hide(), this.ready = !0
    },
    showMessage: function(t) {
        this.message ? this.message.updateMessage(t) : (trace("No message display available."), trace(t))
    },
    _onColorChange: function(t) {
        this.fire("color_change", {
            unique_id: this.current_id
        }, this), t.color || t.image
    },
    _onSlideChange: function(t) {
        this.current_id != t.unique_id && (this.current_id = t.unique_id, this._timenav.goToId(this.current_id), this._onChange(t))
    },
    _onTimeNavChange: function(t) {
        this.current_id != t.unique_id && (this.current_id = t.unique_id, this._storyslider.goToId(this.current_id), this._onChange(t))
    },
    _onChange: function(t) {
        this.fire("change", {
            unique_id: this.current_id
        }, this), this.options.hash_bookmark && this.current_id && this._updateHashBookmark(this.current_id)
    },
    _onBackToStart: function(t) {
        this._storyslider.goTo(0), this.fire("back_to_start", {
            unique_id: this.current_id
        }, this)
    },
    zoomIn: function() {
        this._timenav.zoomIn()
    },
    zoomOut: function() {
        this._timenav.zoomOut()
    },
    setZoom: function(t) {
        this._timenav.setZoom(t)
    },
    _onZoomIn: function(t) {
        this._timenav.zoomIn(), this.fire("zoom_in", {
            zoom_level: this._timenav.options.scale_factor
        }, this)
    },
    _onZoomOut: function(t) {
        this._timenav.zoomOut(), this.fire("zoom_out", {
            zoom_level: this._timenav.options.scale_factor
        }, this)
    },
    _onTimeNavLoaded: function() {
        this._loaded.timenav = !0, this._onLoaded()
    },
    _onStorySliderLoaded: function() {
        this._loaded.storyslider = !0, this._onLoaded()
    },
    _onStorySliderNext: function(t) {
        this.fire("nav_next", t)
    },
    _onStorySliderPrevious: function(t) {
        this.fire("nav_previous", t)
    },
    _onLoaded: function() {
        this._loaded.storyslider && this._loaded.timenav && (this.fire("loaded", this.config), this.options.hash_bookmark && "" != window.location.hash ? this.goToId(window.location.hash.replace("#event-", "")) : ("true" == this.options.start_at_end || this.options.start_at_slide > this.config.events.length ? this.goToEnd() : this.goTo(this.options.start_at_slide), this.options.hash_bookmark && this._updateHashBookmark(this.current_id)))
    }
}), VCO.Timeline.source_path = function() {
    var t = document.getElementsByTagName("script"),
        e = t[t.length - 1].src;
    return e.substr(0, e.lastIndexOf("/"))
}();
