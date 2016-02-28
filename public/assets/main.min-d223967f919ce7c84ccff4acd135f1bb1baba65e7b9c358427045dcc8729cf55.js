function FullscreenVideo(t) {
  var e = $.extend({
    playerId: "",
    mp4: "",
    webm: "",
    ogv: "",
    fallback: "/assets/img/home/hero-super-fallback.jpg",
    fullscreenBackground: !0,
    openVideoCallback: null,
    closeVideoCallback: null
  }, t || {});
  e.fullscreenBackground ? this.backgroundVideo = new $.BigVideo({
    useFlashForFirefox: !1
  }) : this.backgroundVideo = null, this.modalVideoOpen = !1, this.pauseBackgroundVideo = function() {
    this.backgroundVideo.getPlayer().pause()
  }, this.initialize = function() {
    var t = this;
    if (e.fullscreenBackground)
      if (t.backgroundVideo.init(), window.location.search.indexOf("autoplay=true") > -1 && t.openVideoModal(), Modernizr.touch) t.backgroundVideo.show(e.fallback);
      else {
        var i = document.getElementById("big-video-wrap");
        TweenLite.set(i, {
          autoAlpha: 0
        }), t.backgroundVideo.show([{
          type: "videso/mp4",
          src: e.mp4
        }, {
          type: "vsideo/webm",
          src: e.webm
        }, {
          type: "vsideo/ogg",
          src: e.ogv
        }], {
          controls: !1,
          ambient: !0,
          doLoop: !0
        }), _V_("big-video-vid_html5_api").ready(function() {
          this.on("loadeddata", function() {
            $(".hero").addClass("video-loaded"), TweenLite.to(i, .5, {
              autoAlpha: 1
            })
          }).on("ended", function() {
            t.backgroundVideo.getPlayer().currentTime(0)
          })
        }), $(window).on("keyup", function(e) {
          t.modalVideoOpen && 27 == e.keyCode && t.closeVideoModal()
        })
      }
  }, this.openVideoModal = function() {
    var t = this;
    t.player = $f($("#" + e.playerId)[0]), e.body.addClass("no-overflow"), t.modalVideoOpen = !0, TweenLite.to(e.modal, .5, {
      force3D: !0,
      autoAlpha: 1,
      zIndex: 100,
      display: "block",
      onComplete: function() {
        e.modal.addClass("is-open"), "function" == typeof e.openVideoCallback && e.openVideoCallback(), Modernizr.touch || t.playModalVideo(), e.fullscreenBackground && t.pauseBackgroundVideo()
      }
    }), t.player.addEvent("ready", function() {
      t.player.addEvent("finish", function() {
        t.closeVideoModal()
      })
    })
  }, this.closeVideoModal = function() {
    var t = this;
    e.body.removeClass("no-overflow"), e.modal.removeClass("is-open"), t.pauseModalVideo(), TweenLite.to(e.modal, .5, {
      force3D: !0,
      autoAlpha: 0,
      zIndex: -1,
      onComplete: function() {
        t.modalVideoOpen = !1, "function" == typeof e.closeVideoCallback && e.closeVideoCallback(), t.resetModalVideo(), e.fullscreenBackground && t.playBackgroundVideo(), TweenLite.set(e.modal, {
          display: "none"
        })
      }
    })
  }
}

function QuoteSlider(t) {
  "use strict";
  var e = $.extend({
    quoteSlider: $(".quotes"),
    quoteVideos: $(".quote-video"),
    avatars: $(".avatars"),
    defaultSlide: $(".quote-1"),
    defaultLink: $(".quote-link-1"),
    play: $(".play"),
    closeTargets: $(".avatars a, .slide .inside, .slide-close"),
    win: $(window)
  }, t || {});
  this.quoteSliderAnimating = !1, this.quoteSliderVideoActive = !1, this.quoteContainerHeight = e.quoteSlider.outerHeight(), this.initialize = function() {
    var t = this;
    TweenLite.set(e.quoteSlider.find(".slide"), {
      css: {
        transform: "translateY(" + t.quoteContainerHeight + "px)",
        zIndex: 2
      }
    }), TweenLite.set(e.quoteVideos, {
      autoAlpha: 0
    }), t.swapQuote(e.defaultSlide, e.defaultLink), e.avatars.on("click", "a", function(e) {
      e.preventDefault();
      var i = $(this);
      t.swapQuote($("." + i.data("rel")), i)
    }), e.play.on("click", function(e) {
      e.preventDefault(), t.playVideo($(this))
    })
  };
  var n = function(t, e) {
      var n = t.split(/[\?&]+/);
      for (i = 0; i < n.length; i++) {
        var r = n[i].split("=");
        if (r[0] == e) return r[1]
      }
    },
    r = function(t) {
      var e = t.getAttribute("data-src");
      null !== e && (t.src = e, t.id = n(e, "player_id"), t.removeAttribute("data-src"))
    },
    o = function(t, i, n) {
      t.animateInAvatars(), i.vimeo("pause"), e.closeTargets.unbind("click touchend"), TweenLite.to(i, .5, {
        force3D: !0,
        autoAlpha: 0,
        zIndex: -1,
        onComplete: function() {
          t.quoteSliderVideoActive = !1, i.vimeo("unload"), n.removeClass("video-active")
        }
      })
    };
  this.playVideo = function(t) {
    var i = this,
      n = t.parents(".slide").first(),
      s = n.find(e.quoteVideos);
    r(s[0]), s.on("play", function() {
      n.removeClass("paused").addClass("playing")
    }).on("pause", function() {
      n.removeClass("playing").addClass("paused")
    }).on("finish", function() {
      o(i, s, n)
    }), i.animateOutAvatars(), n.addClass("video-active"), i.quoteSliderVideoActive = !0, TweenLite.to(s, .5, {
      force3D: !0,
      autoAlpha: 1,
      zIndex: 10,
      overwrite: !0,
      onComplete: function() {
        s.vimeo("play"), e.closeTargets.on("click touchend", function(t) {
          t.preventDefault(), o(i, s, n)
        }), e.win.on("keyup", function(t) {
          27 == t.keyCode && i.quoteSliderVideoActive && o(i, s, n)
        })
      }
    })
  }, this.swapQuote = function(t, i) {
    var n = this;
    i.hasClass("active") || n.quoteSliderAnimating || (n.quoteSliderAnimating = !0, e.avatars.find("a").removeClass("active"), i.addClass("active"), e.quoteSlider.find("> div").addClass("inactive"), t.removeClass("inactive"), TweenLite.to($(".inactive"), .1, {
      force3D: !0,
      zIndex: 3,
      onComplete: function() {
        TweenLite.to(t, 0, {
          zIndex: 5
        }), TweenLite.to(t, .5, {
          force3D: !0,
          ease: Power2.easeOut,
          css: {
            transform: "translateY(0)"
          },
          onComplete: function() {
            TweenLite.to($(".inactive"), .1, {
              force3D: !0,
              css: {
                transform: "translateY(" + n.quoteContainerHeight + "px)",
                zIndex: -1
              },
              onComplete: function() {
                n.quoteSliderAnimating = !1
              }
            })
          }
        })
      }
    }))
  }, this.animateOutAvatars = function() {
    for (var t = 0, i = 60, n = e.avatars.find("li"), r = 0, o = n.length; o > r; r++) TweenLite.to(n[r], .3, {
      force3D: !0,
      overwrite: !0,
      ease: Power2.easeInOut,
      delay: t,
      css: {
        transform: "translate(" + i + "px, 45px) scale(0.75)"
      }
    }), i -= 30, t += .05
  }, this.animateInAvatars = function() {
    for (var t = .25, i = e.avatars.find("li"), n = 0, r = i.length; r > n; n++) TweenLite.to(i[n], .3, {
      force3D: !0,
      overwrite: !0,
      ease: Power2.easeInOut,
      delay: t,
      css: {
        transform: "translate(0, 0) scale(1)"
      }
    }), t -= .05
  }
}

function setupShirtModal() {
  if (shouldShowModal()) {
    window.setTimeout(function() {
      openShirtModal()
    }, modalDelay);
    trackPages()
  }
}

function openShirtModal() {
  return clearTimeout(shirtTimer), Modernizr.touch ? !1 : void(!isShirtModalOpen && shouldShowModal() && ($.fancybox({
    padding: 0,
    autoDimensions: !0,
    href: "#tshirt_modal",
    wrapCSS: "tshirtmodal",
    afterShow: function() {
      $tshirtModal.find("input[type=text]").focus(), $tshirtSticky.fadeOut()
    },
    afterClose: function() {
      $.cookie("dont-show-tshirt-modal", 1, {
        expires: 30,
        path: "/"
      }), isShirtModalOpen = !1, window.clearTimeout(shirtTimer)
    }
  }), isShirtModalOpen = !0))
}

function closeShirtModal() {
  $.fancybox.close()
}

function shouldShowModal() {
  var t = 1 != $.cookie("dont-show-tshirt-modal") && 1 != $.cookie("modal-showing") && !$body.hasClass("tshirt") && !$body.hasClass("enterprise");
  return t
}

function trackPages() {
  var t = $.cookie("pages-viewed") ? parseInt($.cookie("pages-viewed")) + 1 : 1;
  3 === t && openShirtModal(), $.cookie("pages-viewed", t, {
    path: "/"
  })
}

function tshirtFormSubmission() {
  var t = $("#tshirt_email");
  $tshirtModal.find("div.subscribe");
  $(".tshirt_form").validate({
    rules: {
      tshirt_email: {
        required: !0,
        email: !0
      }
    },
    submitHandler: function(e) {
      try {
        ga("send", "event", "Redeemed Offer", "Tshirt Entry", "Popup"), ga("rollupTracker.send", "event", "Redeemed Offer", "Tshirt Entry", "Popup")
      } catch (i) {}
      try {
        analytics.identify({
          email: t.val()
        }), analytics.track("Tshirt", {
          email: t.val(),
          source: "tshirt_modal"
        })
      } catch (i) {}
      $.post("/api/tshirtSubmission", {
        email: t.val(),
        listSource: "biscuit-tshirt",
        hs_context: JSON.stringify({
          hutk: $.cookie("hubspotutk"),
          pageUrl: window.location.href,
          pageName: document.title
        })
      }, function() {
        $.fancybox({
          content: $tshirtTweet,
          padding: 0,
          wrapCSS: "tshirtmodal-post",
          afterShow: function() {
            $(".tshirt_tweet_link, .opt-out a").on("click", function(t) {
              t.preventDefault(), $.fancybox({
                content: $tshirtFollow,
                padding: 0,
                wrapCSS: "tshirtmodal-post",
                afterShow: function() {
                  $(".global-share a, .global-share").on("click touchend", function(t) {
                    t.preventDefault();
                    var e = $(this);
                    closeShirtModal(), popupCenter(e.attr("href"), "Follow about InVision", e.data("width"), e.data("height"))
                  })
                }
              }), $(this).hasClass("tshirt_tweet_link") && popupCenter($(".tshirt_tweet_link").attr("href"), "Tweet about InVision", 800, 400)
            })
          }
        })
      })
    }
  })
}

function popupCenter(t, e, i, n) {
  var r, o, s, a, u, l = void 0 !== window.screenLeft ? window.screenLeft : screen.left,
    c = void 0 !== window.screenTop ? window.screenTop : screen.top;
  a = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width, u = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height, r = a / 2 - i / 2 + l, o = u / 2 - n / 2 + c, s = window.open(t, e, "scrollbars=yes, width=" + i + ", height=" + n + ", top=" + o + ", left=" + r), window.focus && s.focus()
}

function loadTwitterSM() {
  $(".dd-twitter-3223").remove(), window.twttr = function(t, e, i) {
    var n, r, o = t.getElementsByTagName(e)[0];
    if (!t.getElementById(i)) return r = t.createElement(e), r.id = i, r.src = "//platform.twitter.com/widgets.js", o.parentNode.insertBefore(r, o), window.twttr || (n = {
      _e: [],
      ready: function(t) {
        n._e.push(t)
      }
    })
  }(document, "script", "twitter-wjs"), twttr.ready(function(t) {
    t.events.bind("tweet", function(t) {
      ga("send", {
        hitType: "social",
        socialNetwork: "twitter",
        socialAction: "tweet",
        socialTarget: window.location.href,
        page: window.location.href
      })
    })
  })
}

function loadBufferSM() {
  $(".dd-buffer-3223").remove(), $.getScript("https://d389zggrogs7qo.cloudfront.net/js/button.js")
}

function loadRedditSM() {
  $(".dd-reddit-3223").remove(), $(".DD_REDDIT_AJAX_3223").attr("width", "51"), $(".DD_REDDIT_AJAX_3223").attr("height", "69"), $(".DD_REDDIT_AJAX_3223").attr("src", "http://www.reddit.com/static/button/button2.html?width=51&url=" + window.encodedFeatureURL + "&title=" + window.encodedFeatureTitle + "&newwindow=1")
}

function loadFBLikeSM() {
  $(".dd-fblike-3223").remove(), $(".DD_FBLIKE_AJAX_3223").attr("width", "500"), $(".DD_FBLIKE_AJAX_3223").attr("height", "24"), $(".DD_FBLIKE_AJAX_3223").attr("src", "http://www.facebook.com/plugins/like.php?href=" + window.encodedFeatureURL + "&locale=en_US&layout=standard&action=recommend&width=400&height=24&colorscheme=light")
}

function loadLinkedinSM() {
  $(".dd-linkedin-3223").remove(), $.getScript("//platform.linkedin.com/in.js")
}

function loadDeliciousSM() {
  $(".dd-delicious-3223").remove(), $.getJSON("//feeds.delicious.com/v2/json/urlinfo/data?url=" + window.featureURL + "&amp;callback=?", function(t) {
    var e = "",
      i = 0;
    t.length > 0 ? (i = t[0].total_posts, e = 0 === i ? "0" : 1 == i ? "1" : i) : e = "0", $("#DD_DELICIOUS_AJAX_3223").text(e)
  })
}! function(t, e) {
  function i(t) {
    var e = t.length,
      i = ot.type(t);
    return ot.isWindow(t) ? !1 : 1 === t.nodeType && e ? !0 : "array" === i || "function" !== i && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)
  }

  function n(t) {
    var e = ft[t] = {};
    return ot.each(t.match(at) || [], function(t, i) {
      e[i] = !0
    }), e
  }

  function r() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {}
      }
    }), this.expando = ot.expando + Math.random()
  }

  function o(t, i, n) {
    var r;
    if (n === e && 1 === t.nodeType)
      if (r = "data-" + i.replace(yt, "-$1").toLowerCase(), n = t.getAttribute(r), "string" == typeof n) {
        try {
          n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : vt.test(n) ? JSON.parse(n) : n
        } catch (o) {}
        mt.set(t, i, n)
      } else n = e;
    return n
  }

  function s() {
    return !0
  }

  function a() {
    return !1
  }

  function u() {
    try {
      return W.activeElement
    } catch (t) {}
  }

  function l(t, e) {
    for (;
      (t = t[e]) && 1 !== t.nodeType;);
    return t
  }

  function c(t, e, i) {
    if (ot.isFunction(e)) return ot.grep(t, function(t, n) {
      return !!e.call(t, n, t) !== i
    });
    if (e.nodeType) return ot.grep(t, function(t) {
      return t === e !== i
    });
    if ("string" == typeof e) {
      if (Ft.test(e)) return ot.filter(e, t, i);
      e = ot.filter(e, t)
    }
    return ot.grep(t, function(t) {
      return et.call(e, t) >= 0 !== i
    })
  }

  function h(t, e) {
    return ot.nodeName(t, "table") && ot.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
  }

  function d(t) {
    return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
  }

  function p(t) {
    var e = It.exec(t.type);
    return e ? t.type = e[1] : t.removeAttribute("type"), t
  }

  function f(t, e) {
    for (var i = t.length, n = 0; i > n; n++) gt.set(t[n], "globalEval", !e || gt.get(e[n], "globalEval"))
  }

  function m(t, e) {
    var i, n, r, o, s, a, u, l;
    if (1 === e.nodeType) {
      if (gt.hasData(t) && (o = gt.access(t), s = gt.set(e, o), l = o.events)) {
        delete s.handle, s.events = {};
        for (r in l)
          for (i = 0, n = l[r].length; n > i; i++) ot.event.add(e, r, l[r][i])
      }
      mt.hasData(t) && (a = mt.access(t), u = ot.extend({}, a), mt.set(e, u))
    }
  }

  function g(t, i) {
    var n = t.getElementsByTagName ? t.getElementsByTagName(i || "*") : t.querySelectorAll ? t.querySelectorAll(i || "*") : [];
    return i === e || i && ot.nodeName(t, i) ? ot.merge([t], n) : n
  }

  function v(t, e) {
    var i = e.nodeName.toLowerCase();
    "input" === i && Lt.test(t.type) ? e.checked = t.checked : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
  }

  function y(t, e) {
    if (e in t) return e;
    for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, r = Zt.length; r--;)
      if (e = Zt[r] + i, e in t) return e;
    return n
  }

  function b(t, e) {
    return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
  }

  function w(e) {
    return t.getComputedStyle(e, null)
  }

  function x(t, e) {
    for (var i, n, r, o = [], s = 0, a = t.length; a > s; s++) n = t[s], n.style && (o[s] = gt.get(n, "olddisplay"), i = n.style.display, e ? (o[s] || "none" !== i || (n.style.display = ""), "" === n.style.display && b(n) && (o[s] = gt.access(n, "olddisplay", C(n.nodeName)))) : o[s] || (r = b(n), (i && "none" !== i || !r) && gt.set(n, "olddisplay", r ? i : ot.css(n, "display"))));
    for (s = 0; a > s; s++) n = t[s], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? o[s] || "" : "none"));
    return t
  }

  function _(t, e, i) {
    var n = Xt.exec(e);
    return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
  }

  function k(t, e, i, n, r) {
    for (var o = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === i && (s += ot.css(t, i + Kt[o], !0, r)), n ? ("content" === i && (s -= ot.css(t, "padding" + Kt[o], !0, r)), "margin" !== i && (s -= ot.css(t, "border" + Kt[o] + "Width", !0, r))) : (s += ot.css(t, "padding" + Kt[o], !0, r), "padding" !== i && (s += ot.css(t, "border" + Kt[o] + "Width", !0, r)));
    return s
  }

  function T(t, e, i) {
    var n = !0,
      r = "width" === e ? t.offsetWidth : t.offsetHeight,
      o = w(t),
      s = ot.support.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, o);
    if (0 >= r || null == r) {
      if (r = qt(t, e, o), (0 > r || null == r) && (r = t.style[e]), Ut.test(r)) return r;
      n = s && (ot.support.boxSizingReliable || r === t.style[e]), r = parseFloat(r) || 0
    }
    return r + k(t, e, i || (s ? "border" : "content"), n, o) + "px"
  }

  function C(t) {
    var e = W,
      i = Qt[t];
    return i || (i = S(t, e), "none" !== i && i || (Bt = (Bt || ot("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (Bt[0].contentWindow || Bt[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), i = S(t, e), Bt.detach()), Qt[t] = i), i
  }

  function S(t, e) {
    var i = ot(e.createElement(t)).appendTo(e.body),
      n = ot.css(i[0], "display");
    return i.remove(), n
  }

  function j(t, e, i, n) {
    var r;
    if (ot.isArray(e)) ot.each(e, function(e, r) {
      i || ee.test(t) ? n(t, r) : j(t + "[" + ("object" == typeof r ? e : "") + "]", r, i, n)
    });
    else if (i || "object" !== ot.type(e)) n(t, e);
    else
      for (r in e) j(t + "[" + r + "]", e[r], i, n)
  }

  function F(t) {
    return function(e, i) {
      "string" != typeof e && (i = e, e = "*");
      var n, r = 0,
        o = e.toLowerCase().match(at) || [];
      if (ot.isFunction(i))
        for (; n = o[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
    }
  }

  function P(t, e, i, n) {
    function r(a) {
      var u;
      return o[a] = !0, ot.each(t[a] || [], function(t, a) {
        var l = a(e, i, n);
        return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (e.dataTypes.unshift(l), r(l), !1)
      }), u
    }
    var o = {},
      s = t === ye;
    return r(e.dataTypes[0]) || !o["*"] && r("*")
  }

  function $(t, i) {
    var n, r, o = ot.ajaxSettings.flatOptions || {};
    for (n in i) i[n] !== e && ((o[n] ? t : r || (r = {}))[n] = i[n]);
    return r && ot.extend(!0, t, r), t
  }

  function E(t, i, n) {
    for (var r, o, s, a, u = t.contents, l = t.dataTypes;
      "*" === l[0];) l.shift(), r === e && (r = t.mimeType || i.getResponseHeader("Content-Type"));
    if (r)
      for (o in u)
        if (u[o] && u[o].test(r)) {
          l.unshift(o);
          break
        }
    if (l[0] in n) s = l[0];
    else {
      for (o in n) {
        if (!l[0] || t.converters[o + " " + l[0]]) {
          s = o;
          break
        }
        a || (a = o)
      }
      s = s || a
    }
    return s ? (s !== l[0] && l.unshift(s), n[s]) : void 0
  }

  function A(t, e, i, n) {
    var r, o, s, a, u, l = {},
      c = t.dataTypes.slice();
    if (c[1])
      for (s in t.converters) l[s.toLowerCase()] = t.converters[s];
    for (o = c.shift(); o;)
      if (t.responseFields[o] && (i[t.responseFields[o]] = e), !u && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = o, o = c.shift())
        if ("*" === o) o = u;
        else if ("*" !== u && u !== o) {
      if (s = l[u + " " + o] || l["* " + o], !s)
        for (r in l)
          if (a = r.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
            s === !0 ? s = l[r] : l[r] !== !0 && (o = a[0], c.unshift(a[1]));
            break
          }
      if (s !== !0)
        if (s && t["throws"]) e = s(e);
        else try {
          e = s(e)
        } catch (h) {
          return {
            state: "parsererror",
            error: s ? h : "No conversion from " + u + " to " + o
          }
        }
    }
    return {
      state: "success",
      data: e
    }
  }

  function O() {
    return setTimeout(function() {
      je = e
    }), je = ot.now()
  }

  function D(t, e, i) {
    for (var n, r = (Oe[e] || []).concat(Oe["*"]), o = 0, s = r.length; s > o; o++)
      if (n = r[o].call(i, e, t)) return n
  }

  function M(t, e, i) {
    var n, r, o = 0,
      s = Ae.length,
      a = ot.Deferred().always(function() {
        delete u.elem
      }),
      u = function() {
        if (r) return !1;
        for (var e = je || O(), i = Math.max(0, l.startTime + l.duration - e), n = i / l.duration || 0, o = 1 - n, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(o);
        return a.notifyWith(t, [l, o, i]), 1 > o && u ? i : (a.resolveWith(t, [l]), !1)
      },
      l = a.promise({
        elem: t,
        props: ot.extend({}, e),
        opts: ot.extend(!0, {
          specialEasing: {}
        }, i),
        originalProperties: e,
        originalOptions: i,
        startTime: je || O(),
        duration: i.duration,
        tweens: [],
        createTween: function(e, i) {
          var n = ot.Tween(t, l.opts, e, i, l.opts.specialEasing[e] || l.opts.easing);
          return l.tweens.push(n), n
        },
        stop: function(e) {
          var i = 0,
            n = e ? l.tweens.length : 0;
          if (r) return this;
          for (r = !0; n > i; i++) l.tweens[i].run(1);
          return e ? a.resolveWith(t, [l, e]) : a.rejectWith(t, [l, e]), this
        }
      }),
      c = l.props;
    for (L(c, l.opts.specialEasing); s > o; o++)
      if (n = Ae[o].call(l, t, c, l.opts)) return n;
    return ot.map(c, D, l), ot.isFunction(l.opts.start) && l.opts.start.call(t, l), ot.fx.timer(ot.extend(u, {
      elem: t,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
  }

  function L(t, e) {
    var i, n, r, o, s;
    for (i in t)
      if (n = ot.camelCase(i), r = e[n], o = t[i], ot.isArray(o) && (r = o[1], o = t[i] = o[0]), i !== n && (t[n] = o, delete t[i]), s = ot.cssHooks[n], s && "expand" in s) {
        o = s.expand(o), delete t[n];
        for (i in o) i in t || (t[i] = o[i], e[i] = r)
      } else e[n] = r
  }

  function N(t, i, n) {
    var r, o, s, a, u, l, c = this,
      h = {},
      d = t.style,
      p = t.nodeType && b(t),
      f = gt.get(t, "fxshow");
    n.queue || (u = ot._queueHooks(t, "fx"), null == u.unqueued && (u.unqueued = 0, l = u.empty.fire, u.empty.fire = function() {
      u.unqueued || l()
    }), u.unqueued++, c.always(function() {
      c.always(function() {
        u.unqueued--, ot.queue(t, "fx").length || u.empty.fire()
      })
    })), 1 === t.nodeType && ("height" in i || "width" in i) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === ot.css(t, "display") && "none" === ot.css(t, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", c.always(function() {
      d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
    }));
    for (r in i)
      if (o = i[r], Pe.exec(o)) {
        if (delete i[r], s = s || "toggle" === o, o === (p ? "hide" : "show")) {
          if ("show" !== o || !f || f[r] === e) continue;
          p = !0
        }
        h[r] = f && f[r] || ot.style(t, r)
      }
    if (!ot.isEmptyObject(h)) {
      f ? "hidden" in f && (p = f.hidden) : f = gt.access(t, "fxshow", {}), s && (f.hidden = !p), p ? ot(t).show() : c.done(function() {
        ot(t).hide()
      }), c.done(function() {
        var e;
        gt.remove(t, "fxshow");
        for (e in h) ot.style(t, e, h[e])
      });
      for (r in h) a = D(p ? f[r] : 0, r, c), r in f || (f[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
    }
  }

  function R(t, e, i, n, r) {
    return new R.prototype.init(t, e, i, n, r)
  }

  function I(t, e) {
    var i, n = {
        height: t
      },
      r = 0;
    for (e = e ? 1 : 0; 4 > r; r += 2 - e) i = Kt[r], n["margin" + i] = n["padding" + i] = t;
    return e && (n.opacity = n.width = t), n
  }

  function z(t) {
    return ot.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
  }
  var H, q, B = typeof e,
    V = t.location,
    W = t.document,
    X = W.documentElement,
    U = t.jQuery,
    Y = t.$,
    Q = {},
    J = [],
    G = "2.0.3",
    K = J.concat,
    Z = J.push,
    tt = J.slice,
    et = J.indexOf,
    it = Q.toString,
    nt = Q.hasOwnProperty,
    rt = G.trim,
    ot = function(t, e) {
      return new ot.fn.init(t, e, H)
    },
    st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    at = /\S+/g,
    ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    lt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    ct = /^-ms-/,
    ht = /-([\da-z])/gi,
    dt = function(t, e) {
      return e.toUpperCase()
    },
    pt = function() {
      W.removeEventListener("DOMContentLoaded", pt, !1), t.removeEventListener("load", pt, !1), ot.ready()
    };
  ot.fn = ot.prototype = {
      jquery: G,
      constructor: ot,
      init: function(t, i, n) {
        var r, o;
        if (!t) return this;
        if ("string" == typeof t) {
          if (r = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : ut.exec(t), !r || !r[1] && i) return !i || i.jquery ? (i || n).find(t) : this.constructor(i).find(t);
          if (r[1]) {
            if (i = i instanceof ot ? i[0] : i, ot.merge(this, ot.parseHTML(r[1], i && i.nodeType ? i.ownerDocument || i : W, !0)), lt.test(r[1]) && ot.isPlainObject(i))
              for (r in i) ot.isFunction(this[r]) ? this[r](i[r]) : this.attr(r, i[r]);
            return this
          }
          return o = W.getElementById(r[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = W, this.selector = t, this
        }
        return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? n.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
      },
      selector: "",
      length: 0,
      toArray: function() {
        return tt.call(this)
      },
      get: function(t) {
        return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
      },
      pushStack: function(t) {
        var e = ot.merge(this.constructor(), t);
        return e.prevObject = this, e.context = this.context, e
      },
      each: function(t, e) {
        return ot.each(this, t, e)
      },
      ready: function(t) {
        return ot.ready.promise().done(t), this
      },
      slice: function() {
        return this.pushStack(tt.apply(this, arguments))
      },
      first: function() {
        return this.eq(0)
      },
      last: function() {
        return this.eq(-1)
      },
      eq: function(t) {
        var e = this.length,
          i = +t + (0 > t ? e : 0);
        return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
      },
      map: function(t) {
        return this.pushStack(ot.map(this, function(e, i) {
          return t.call(e, i, e)
        }))
      },
      end: function() {
        return this.prevObject || this.constructor(null)
      },
      push: Z,
      sort: [].sort,
      splice: [].splice
    }, ot.fn.init.prototype = ot.fn, ot.extend = ot.fn.extend = function() {
      var t, i, n, r, o, s, a = arguments[0] || {},
        u = 1,
        l = arguments.length,
        c = !1;
      for ("boolean" == typeof a && (c = a, a = arguments[1] || {}, u = 2), "object" == typeof a || ot.isFunction(a) || (a = {}), l === u && (a = this, --u); l > u; u++)
        if (null != (t = arguments[u]))
          for (i in t) n = a[i], r = t[i], a !== r && (c && r && (ot.isPlainObject(r) || (o = ot.isArray(r))) ? (o ? (o = !1, s = n && ot.isArray(n) ? n : []) : s = n && ot.isPlainObject(n) ? n : {}, a[i] = ot.extend(c, s, r)) : r !== e && (a[i] = r));
      return a
    }, ot.extend({
      expando: "jQuery" + (G + Math.random()).replace(/\D/g, ""),
      noConflict: function(e) {
        return t.$ === ot && (t.$ = Y), e && t.jQuery === ot && (t.jQuery = U), ot
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function(t) {
        t ? ot.readyWait++ : ot.ready(!0)
      },
      ready: function(t) {
        (t === !0 ? --ot.readyWait : ot.isReady) || (ot.isReady = !0, t !== !0 && --ot.readyWait > 0 || (q.resolveWith(W, [ot]), ot.fn.trigger && ot(W).trigger("ready").off("ready")))
      },
      isFunction: function(t) {
        return "function" === ot.type(t)
      },
      isArray: Array.isArray,
      isWindow: function(t) {
        return null != t && t === t.window
      },
      isNumeric: function(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
      },
      type: function(t) {
        return null == t ? String(t) : "object" == typeof t || "function" == typeof t ? Q[it.call(t)] || "object" : typeof t
      },
      isPlainObject: function(t) {
        if ("object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
        try {
          if (t.constructor && !nt.call(t.constructor.prototype, "isPrototypeOf")) return !1
        } catch (e) {
          return !1
        }
        return !0
      },
      isEmptyObject: function(t) {
        var e;
        for (e in t) return !1;
        return !0
      },
      error: function(t) {
        throw new Error(t)
      },
      parseHTML: function(t, e, i) {
        if (!t || "string" != typeof t) return null;
        "boolean" == typeof e && (i = e, e = !1), e = e || W;
        var n = lt.exec(t),
          r = !i && [];
        return n ? [e.createElement(n[1])] : (n = ot.buildFragment([t], e, r), r && ot(r).remove(), ot.merge([], n.childNodes))
      },
      parseJSON: JSON.parse,
      parseXML: function(t) {
        var i, n;
        if (!t || "string" != typeof t) return null;
        try {
          n = new DOMParser, i = n.parseFromString(t, "text/xml")
        } catch (r) {
          i = e
        }
        return (!i || i.getElementsByTagName("parsererror").length) && ot.error("Invalid XML: " + t), i
      },
      noop: function() {},
      globalEval: function(t) {
        var e, i = eval;
        t = ot.trim(t), t && (1 === t.indexOf("use strict") ? (e = W.createElement("script"), e.text = t, W.head.appendChild(e).parentNode.removeChild(e)) : i(t))
      },
      camelCase: function(t) {
        return t.replace(ct, "ms-").replace(ht, dt)
      },
      nodeName: function(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
      },
      each: function(t, e, n) {
        var r, o = 0,
          s = t.length,
          a = i(t);
        if (n) {
          if (a)
            for (; s > o && (r = e.apply(t[o], n), r !== !1); o++);
          else
            for (o in t)
              if (r = e.apply(t[o], n), r === !1) break
        } else if (a)
          for (; s > o && (r = e.call(t[o], o, t[o]), r !== !1); o++);
        else
          for (o in t)
            if (r = e.call(t[o], o, t[o]), r === !1) break; return t
      },
      trim: function(t) {
        return null == t ? "" : rt.call(t)
      },
      makeArray: function(t, e) {
        var n = e || [];
        return null != t && (i(Object(t)) ? ot.merge(n, "string" == typeof t ? [t] : t) : Z.call(n, t)), n
      },
      inArray: function(t, e, i) {
        return null == e ? -1 : et.call(e, t, i)
      },
      merge: function(t, i) {
        var n = i.length,
          r = t.length,
          o = 0;
        if ("number" == typeof n)
          for (; n > o; o++) t[r++] = i[o];
        else
          for (; i[o] !== e;) t[r++] = i[o++];
        return t.length = r, t
      },
      grep: function(t, e, i) {
        var n, r = [],
          o = 0,
          s = t.length;
        for (i = !!i; s > o; o++) n = !!e(t[o], o), i !== n && r.push(t[o]);
        return r
      },
      map: function(t, e, n) {
        var r, o = 0,
          s = t.length,
          a = i(t),
          u = [];
        if (a)
          for (; s > o; o++) r = e(t[o], o, n), null != r && (u[u.length] = r);
        else
          for (o in t) r = e(t[o], o, n), null != r && (u[u.length] = r);
        return K.apply([], u)
      },
      guid: 1,
      proxy: function(t, i) {
        var n, r, o;
        return "string" == typeof i && (n = t[i], i = t, t = n), ot.isFunction(t) ? (r = tt.call(arguments, 2), o = function() {
          return t.apply(i || this, r.concat(tt.call(arguments)))
        }, o.guid = t.guid = t.guid || ot.guid++, o) : e
      },
      access: function(t, i, n, r, o, s, a) {
        var u = 0,
          l = t.length,
          c = null == n;
        if ("object" === ot.type(n)) {
          o = !0;
          for (u in n) ot.access(t, i, u, n[u], !0, s, a)
        } else if (r !== e && (o = !0, ot.isFunction(r) || (a = !0), c && (a ? (i.call(t, r), i = null) : (c = i, i = function(t, e, i) {
            return c.call(ot(t), i)
          })), i))
          for (; l > u; u++) i(t[u], n, a ? r : r.call(t[u], u, i(t[u], n)));
        return o ? t : c ? i.call(t) : l ? i(t[0], n) : s
      },
      now: Date.now,
      swap: function(t, e, i, n) {
        var r, o, s = {};
        for (o in e) s[o] = t.style[o], t.style[o] = e[o];
        r = i.apply(t, n || []);
        for (o in e) t.style[o] = s[o];
        return r
      }
    }), ot.ready.promise = function(e) {
      return q || (q = ot.Deferred(), "complete" === W.readyState ? setTimeout(ot.ready) : (W.addEventListener("DOMContentLoaded", pt, !1), t.addEventListener("load", pt, !1))), q.promise(e)
    }, ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
      Q["[object " + e + "]"] = e.toLowerCase()
    }), H = ot(W),
    function(t, e) {
      function i(t, e, i, n) {
        var r, o, s, a, u, l, c, h, f, m;
        if ((e ? e.ownerDocument || e : z) !== A && E(e), e = e || A, i = i || [], !t || "string" != typeof t) return i;
        if (1 !== (a = e.nodeType) && 9 !== a) return [];
        if (D && !n) {
          if (r = bt.exec(t))
            if (s = r[1]) {
              if (9 === a) {
                if (o = e.getElementById(s), !o || !o.parentNode) return i;
                if (o.id === s) return i.push(o), i
              } else if (e.ownerDocument && (o = e.ownerDocument.getElementById(s)) && R(e, o) && o.id === s) return i.push(o), i
            } else {
              if (r[2]) return tt.apply(i, e.getElementsByTagName(t)), i;
              if ((s = r[3]) && k.getElementsByClassName && e.getElementsByClassName) return tt.apply(i, e.getElementsByClassName(s)), i
            }
          if (k.qsa && (!M || !M.test(t))) {
            if (h = c = I, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
              for (l = d(t), (c = e.getAttribute("id")) ? h = c.replace(_t, "\\$&") : e.setAttribute("id", h), h = "[id='" + h + "'] ", u = l.length; u--;) l[u] = h + p(l[u]);
              f = pt.test(t) && e.parentNode || e, m = l.join(",")
            }
            if (m) try {
              return tt.apply(i, f.querySelectorAll(m)), i
            } catch (g) {} finally {
              c || e.removeAttribute("id")
            }
          }
        }
        return x(t.replace(ct, "$1"), e, i, n)
      }

      function n() {
        function t(i, n) {
          return e.push(i += " ") > C.cacheLength && delete t[e.shift()], t[i] = n
        }
        var e = [];
        return t
      }

      function r(t) {
        return t[I] = !0, t
      }

      function o(t) {
        var e = A.createElement("div");
        try {
          return !!t(e)
        } catch (i) {
          return !1
        } finally {
          e.parentNode && e.parentNode.removeChild(e), e = null
        }
      }

      function s(t, e) {
        for (var i = t.split("|"), n = t.length; n--;) C.attrHandle[i[n]] = e
      }

      function a(t, e) {
        var i = e && t,
          n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Q) - (~t.sourceIndex || Q);
        if (n) return n;
        if (i)
          for (; i = i.nextSibling;)
            if (i === e) return -1;
        return t ? 1 : -1
      }

      function u(t) {
        return function(e) {
          var i = e.nodeName.toLowerCase();
          return "input" === i && e.type === t
        }
      }

      function l(t) {
        return function(e) {
          var i = e.nodeName.toLowerCase();
          return ("input" === i || "button" === i) && e.type === t
        }
      }

      function c(t) {
        return r(function(e) {
          return e = +e, r(function(i, n) {
            for (var r, o = t([], i.length, e), s = o.length; s--;) i[r = o[s]] && (i[r] = !(n[r] = i[r]))
          })
        })
      }

      function h() {}

      function d(t, e) {
        var n, r, o, s, a, u, l, c = V[t + " "];
        if (c) return e ? 0 : c.slice(0);
        for (a = t, u = [], l = C.preFilter; a;) {
          (!n || (r = ht.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), n = !1, (r = dt.exec(a)) && (n = r.shift(), o.push({
            value: n,
            type: r[0].replace(ct, " ")
          }), a = a.slice(n.length));
          for (s in C.filter) !(r = vt[s].exec(a)) || l[s] && !(r = l[s](r)) || (n = r.shift(), o.push({
            value: n,
            type: s,
            matches: r
          }), a = a.slice(n.length));
          if (!n) break
        }
        return e ? a.length : a ? i.error(t) : V(t, u).slice(0)
      }

      function p(t) {
        for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
        return n
      }

      function f(t, e, i) {
        var n = e.dir,
          r = i && "parentNode" === n,
          o = q++;
        return e.first ? function(e, i, o) {
          for (; e = e[n];)
            if (1 === e.nodeType || r) return t(e, i, o)
        } : function(e, i, s) {
          var a, u, l, c = H + " " + o;
          if (s) {
            for (; e = e[n];)
              if ((1 === e.nodeType || r) && t(e, i, s)) return !0
          } else
            for (; e = e[n];)
              if (1 === e.nodeType || r)
                if (l = e[I] || (e[I] = {}), (u = l[n]) && u[0] === c) {
                  if ((a = u[1]) === !0 || a === T) return a === !0
                } else if (u = l[n] = [c], u[1] = t(e, i, s) || T, u[1] === !0) return !0
        }
      }

      function m(t) {
        return t.length > 1 ? function(e, i, n) {
          for (var r = t.length; r--;)
            if (!t[r](e, i, n)) return !1;
          return !0
        } : t[0]
      }

      function g(t, e, i, n, r) {
        for (var o, s = [], a = 0, u = t.length, l = null != e; u > a; a++)(o = t[a]) && (!i || i(o, n, r)) && (s.push(o), l && e.push(a));
        return s
      }

      function v(t, e, i, n, o, s) {
        return n && !n[I] && (n = v(n)), o && !o[I] && (o = v(o, s)), r(function(r, s, a, u) {
          var l, c, h, d = [],
            p = [],
            f = s.length,
            m = r || w(e || "*", a.nodeType ? [a] : a, []),
            v = !t || !r && e ? m : g(m, d, t, a, u),
            y = i ? o || (r ? t : f || n) ? [] : s : v;
          if (i && i(v, y, a, u), n)
            for (l = g(y, p), n(l, [], a, u), c = l.length; c--;)(h = l[c]) && (y[p[c]] = !(v[p[c]] = h));
          if (r) {
            if (o || t) {
              if (o) {
                for (l = [], c = y.length; c--;)(h = y[c]) && l.push(v[c] = h);
                o(null, y = [], l, u)
              }
              for (c = y.length; c--;)(h = y[c]) && (l = o ? it.call(r, h) : d[c]) > -1 && (r[l] = !(s[l] = h))
            }
          } else y = g(y === s ? y.splice(f, y.length) : y), o ? o(null, s, y, u) : tt.apply(s, y)
        })
      }

      function y(t) {
        for (var e, i, n, r = t.length, o = C.relative[t[0].type], s = o || C.relative[" "], a = o ? 1 : 0, u = f(function(t) {
            return t === e
          }, s, !0), l = f(function(t) {
            return it.call(e, t) > -1
          }, s, !0), c = [function(t, i, n) {
            return !o && (n || i !== P) || ((e = i).nodeType ? u(t, i, n) : l(t, i, n))
          }]; r > a; a++)
          if (i = C.relative[t[a].type]) c = [f(m(c), i)];
          else {
            if (i = C.filter[t[a].type].apply(null, t[a].matches), i[I]) {
              for (n = ++a; r > n && !C.relative[t[n].type]; n++);
              return v(a > 1 && m(c), a > 1 && p(t.slice(0, a - 1).concat({
                value: " " === t[a - 2].type ? "*" : ""
              })).replace(ct, "$1"), i, n > a && y(t.slice(a, n)), r > n && y(t = t.slice(n)), r > n && p(t))
            }
            c.push(i)
          }
        return m(c)
      }

      function b(t, e) {
        var n = 0,
          o = e.length > 0,
          s = t.length > 0,
          a = function(r, a, u, l, c) {
            var h, d, p, f = [],
              m = 0,
              v = "0",
              y = r && [],
              b = null != c,
              w = P,
              x = r || s && C.find.TAG("*", c && a.parentNode || a),
              _ = H += null == w ? 1 : Math.random() || .1;
            for (b && (P = a !== A && a, T = n); null != (h = x[v]); v++) {
              if (s && h) {
                for (d = 0; p = t[d++];)
                  if (p(h, a, u)) {
                    l.push(h);
                    break
                  }
                b && (H = _, T = ++n)
              }
              o && ((h = !p && h) && m--, r && y.push(h))
            }
            if (m += v, o && v !== m) {
              for (d = 0; p = e[d++];) p(y, f, a, u);
              if (r) {
                if (m > 0)
                  for (; v--;) y[v] || f[v] || (f[v] = K.call(l));
                f = g(f)
              }
              tt.apply(l, f), b && !r && f.length > 0 && m + e.length > 1 && i.uniqueSort(l)
            }
            return b && (H = _, P = w), y
          };
        return o ? r(a) : a
      }

      function w(t, e, n) {
        for (var r = 0, o = e.length; o > r; r++) i(t, e[r], n);
        return n
      }

      function x(t, e, i, n) {
        var r, o, s, a, u, l = d(t);
        if (!n && 1 === l.length) {
          if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && k.getById && 9 === e.nodeType && D && C.relative[o[1].type]) {
            if (e = (C.find.ID(s.matches[0].replace(kt, Tt), e) || [])[0], !e) return i;
            t = t.slice(o.shift().value.length)
          }
          for (r = vt.needsContext.test(t) ? 0 : o.length; r-- && (s = o[r], !C.relative[a = s.type]);)
            if ((u = C.find[a]) && (n = u(s.matches[0].replace(kt, Tt), pt.test(o[0].type) && e.parentNode || e))) {
              if (o.splice(r, 1), t = n.length && p(o), !t) return tt.apply(i, n), i;
              break
            }
        }
        return F(t, l)(n, e, !D, i, pt.test(t)), i
      }
      var _, k, T, C, S, j, F, P, $, E, A, O, D, M, L, N, R, I = "sizzle" + -new Date,
        z = t.document,
        H = 0,
        q = 0,
        B = n(),
        V = n(),
        W = n(),
        X = !1,
        U = function(t, e) {
          return t === e ? (X = !0, 0) : 0
        },
        Y = typeof e,
        Q = 1 << 31,
        J = {}.hasOwnProperty,
        G = [],
        K = G.pop,
        Z = G.push,
        tt = G.push,
        et = G.slice,
        it = G.indexOf || function(t) {
          for (var e = 0, i = this.length; i > e; e++)
            if (this[e] === t) return e;
          return -1
        },
        nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        rt = "[\\x20\\t\\r\\n\\f]",
        st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        at = st.replace("w", "w#"),
        ut = "\\[" + rt + "*(" + st + ")" + rt + "*(?:([*^$|!~]?=)" + rt + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + rt + "*\\]",
        lt = ":(" + st + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ut.replace(3, 8) + ")*)|.*)\\)|)",
        ct = new RegExp("^" + rt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + rt + "+$", "g"),
        ht = new RegExp("^" + rt + "*," + rt + "*"),
        dt = new RegExp("^" + rt + "*([>+~]|" + rt + ")" + rt + "*"),
        pt = new RegExp(rt + "*[+~]"),
        ft = new RegExp("=" + rt + "*([^\\]'\"]*)" + rt + "*\\]", "g"),
        mt = new RegExp(lt),
        gt = new RegExp("^" + at + "$"),
        vt = {
          ID: new RegExp("^#(" + st + ")"),
          CLASS: new RegExp("^\\.(" + st + ")"),
          TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
          ATTR: new RegExp("^" + ut),
          PSEUDO: new RegExp("^" + lt),
          CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + rt + "*(even|odd|(([+-]|)(\\d*)n|)" + rt + "*(?:([+-]|)" + rt + "*(\\d+)|))" + rt + "*\\)|)", "i"),
          bool: new RegExp("^(?:" + nt + ")$", "i"),
          needsContext: new RegExp("^" + rt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + rt + "*((?:-\\d)?\\d*)" + rt + "*\\)|)(?=[^-]|$)", "i")
        },
        yt = /^[^{]+\{\s*\[native \w/,
        bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        wt = /^(?:input|select|textarea|button)$/i,
        xt = /^h\d$/i,
        _t = /'|\\/g,
        kt = new RegExp("\\\\([\\da-f]{1,6}" + rt + "?|(" + rt + ")|.)", "ig"),
        Tt = function(t, e, i) {
          var n = "0x" + e - 65536;
          return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        };
      try {
        tt.apply(G = et.call(z.childNodes), z.childNodes), G[z.childNodes.length].nodeType
      } catch (Ct) {
        tt = {
          apply: G.length ? function(t, e) {
            Z.apply(t, et.call(e))
          } : function(t, e) {
            for (var i = t.length, n = 0; t[i++] = e[n++];);
            t.length = i - 1
          }
        }
      }
      j = i.isXML = function(t) {
        var e = t && (t.ownerDocument || t).documentElement;
        return e ? "HTML" !== e.nodeName : !1
      }, k = i.support = {}, E = i.setDocument = function(t) {
        var e = t ? t.ownerDocument || t : z,
          i = e.defaultView;
        return e !== A && 9 === e.nodeType && e.documentElement ? (A = e, O = e.documentElement, D = !j(e), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
          E()
        }), k.attributes = o(function(t) {
          return t.className = "i", !t.getAttribute("className")
        }), k.getElementsByTagName = o(function(t) {
          return t.appendChild(e.createComment("")), !t.getElementsByTagName("*").length
        }), k.getElementsByClassName = o(function(t) {
          return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
        }), k.getById = o(function(t) {
          return O.appendChild(t).id = I, !e.getElementsByName || !e.getElementsByName(I).length
        }), k.getById ? (C.find.ID = function(t, e) {
          if (typeof e.getElementById !== Y && D) {
            var i = e.getElementById(t);
            return i && i.parentNode ? [i] : []
          }
        }, C.filter.ID = function(t) {
          var e = t.replace(kt, Tt);
          return function(t) {
            return t.getAttribute("id") === e
          }
        }) : (delete C.find.ID, C.filter.ID = function(t) {
          var e = t.replace(kt, Tt);
          return function(t) {
            var i = typeof t.getAttributeNode !== Y && t.getAttributeNode("id");
            return i && i.value === e
          }
        }), C.find.TAG = k.getElementsByTagName ? function(t, e) {
          return typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(t) : void 0
        } : function(t, e) {
          var i, n = [],
            r = 0,
            o = e.getElementsByTagName(t);
          if ("*" === t) {
            for (; i = o[r++];) 1 === i.nodeType && n.push(i);
            return n
          }
          return o
        }, C.find.CLASS = k.getElementsByClassName && function(t, e) {
          return typeof e.getElementsByClassName !== Y && D ? e.getElementsByClassName(t) : void 0
        }, L = [], M = [], (k.qsa = yt.test(e.querySelectorAll)) && (o(function(t) {
          t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || M.push("\\[" + rt + "*(?:value|" + nt + ")"), t.querySelectorAll(":checked").length || M.push(":checked")
        }), o(function(t) {
          var i = e.createElement("input");
          i.setAttribute("type", "hidden"), t.appendChild(i).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && M.push("[*^$]=" + rt + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), M.push(",.*:")
        })), (k.matchesSelector = yt.test(N = O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && o(function(t) {
          k.disconnectedMatch = N.call(t, "div"), N.call(t, "[s!='']:x"), L.push("!=", lt)
        }), M = M.length && new RegExp(M.join("|")), L = L.length && new RegExp(L.join("|")), R = yt.test(O.contains) || O.compareDocumentPosition ? function(t, e) {
          var i = 9 === t.nodeType ? t.documentElement : t,
            n = e && e.parentNode;
          return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
        } : function(t, e) {
          if (e)
            for (; e = e.parentNode;)
              if (e === t) return !0;
          return !1
        }, U = O.compareDocumentPosition ? function(t, i) {
          if (t === i) return X = !0, 0;
          var n = i.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(i);
          return n ? 1 & n || !k.sortDetached && i.compareDocumentPosition(t) === n ? t === e || R(z, t) ? -1 : i === e || R(z, i) ? 1 : $ ? it.call($, t) - it.call($, i) : 0 : 4 & n ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
        } : function(t, i) {
          var n, r = 0,
            o = t.parentNode,
            s = i.parentNode,
            u = [t],
            l = [i];
          if (t === i) return X = !0, 0;
          if (!o || !s) return t === e ? -1 : i === e ? 1 : o ? -1 : s ? 1 : $ ? it.call($, t) - it.call($, i) : 0;
          if (o === s) return a(t, i);
          for (n = t; n = n.parentNode;) u.unshift(n);
          for (n = i; n = n.parentNode;) l.unshift(n);
          for (; u[r] === l[r];) r++;
          return r ? a(u[r], l[r]) : u[r] === z ? -1 : l[r] === z ? 1 : 0
        }, e) : A
      }, i.matches = function(t, e) {
        return i(t, null, null, e)
      }, i.matchesSelector = function(t, e) {
        if ((t.ownerDocument || t) !== A && E(t), e = e.replace(ft, "='$1']"), k.matchesSelector && D && (!L || !L.test(e)) && (!M || !M.test(e))) try {
          var n = N.call(t, e);
          if (n || k.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
        } catch (r) {}
        return i(e, A, null, [t]).length > 0
      }, i.contains = function(t, e) {
        return (t.ownerDocument || t) !== A && E(t), R(t, e)
      }, i.attr = function(t, i) {
        (t.ownerDocument || t) !== A && E(t);
        var n = C.attrHandle[i.toLowerCase()],
          r = n && J.call(C.attrHandle, i.toLowerCase()) ? n(t, i, !D) : e;
        return r === e ? k.attributes || !D ? t.getAttribute(i) : (r = t.getAttributeNode(i)) && r.specified ? r.value : null : r
      }, i.error = function(t) {
        throw new Error("Syntax error, unrecognized expression: " + t)
      }, i.uniqueSort = function(t) {
        var e, i = [],
          n = 0,
          r = 0;
        if (X = !k.detectDuplicates, $ = !k.sortStable && t.slice(0), t.sort(U), X) {
          for (; e = t[r++];) e === t[r] && (n = i.push(r));
          for (; n--;) t.splice(i[n], 1)
        }
        return t
      }, S = i.getText = function(t) {
        var e, i = "",
          n = 0,
          r = t.nodeType;
        if (r) {
          if (1 === r || 9 === r || 11 === r) {
            if ("string" == typeof t.textContent) return t.textContent;
            for (t = t.firstChild; t; t = t.nextSibling) i += S(t)
          } else if (3 === r || 4 === r) return t.nodeValue
        } else
          for (; e = t[n]; n++) i += S(e);
        return i
      }, C = i.selectors = {
        cacheLength: 50,
        createPseudo: r,
        match: vt,
        attrHandle: {},
        find: {},
        relative: {
          ">": {
            dir: "parentNode",
            first: !0
          },
          " ": {
            dir: "parentNode"
          },
          "+": {
            dir: "previousSibling",
            first: !0
          },
          "~": {
            dir: "previousSibling"
          }
        },
        preFilter: {
          ATTR: function(t) {
            return t[1] = t[1].replace(kt, Tt), t[3] = (t[4] || t[5] || "").replace(kt, Tt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
          },
          CHILD: function(t) {
            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || i.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && i.error(t[0]), t
          },
          PSEUDO: function(t) {
            var i, n = !t[5] && t[2];
            return vt.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : n && mt.test(n) && (i = d(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (t[0] = t[0].slice(0, i), t[2] = n.slice(0, i)), t.slice(0, 3))
          }
        },
        filter: {
          TAG: function(t) {
            var e = t.replace(kt, Tt).toLowerCase();
            return "*" === t ? function() {
              return !0
            } : function(t) {
              return t.nodeName && t.nodeName.toLowerCase() === e
            }
          },
          CLASS: function(t) {
            var e = B[t + " "];
            return e || (e = new RegExp("(^|" + rt + ")" + t + "(" + rt + "|$)")) && B(t, function(t) {
              return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== Y && t.getAttribute("class") || "")
            })
          },
          ATTR: function(t, e, n) {
            return function(r) {
              var o = i.attr(r, t);
              return null == o ? "!=" === e : e ? (o += "", "=" === e ? o === n : "!=" === e ? o !== n : "^=" === e ? n && 0 === o.indexOf(n) : "*=" === e ? n && o.indexOf(n) > -1 : "$=" === e ? n && o.slice(-n.length) === n : "~=" === e ? (" " + o + " ").indexOf(n) > -1 : "|=" === e ? o === n || o.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
          },
          CHILD: function(t, e, i, n, r) {
            var o = "nth" !== t.slice(0, 3),
              s = "last" !== t.slice(-4),
              a = "of-type" === e;
            return 1 === n && 0 === r ? function(t) {
              return !!t.parentNode
            } : function(e, i, u) {
              var l, c, h, d, p, f, m = o !== s ? "nextSibling" : "previousSibling",
                g = e.parentNode,
                v = a && e.nodeName.toLowerCase(),
                y = !u && !a;
              if (g) {
                if (o) {
                  for (; m;) {
                    for (h = e; h = h[m];)
                      if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                    f = m = "only" === t && !f && "nextSibling"
                  }
                  return !0
                }
                if (f = [s ? g.firstChild : g.lastChild], s && y) {
                  for (c = g[I] || (g[I] = {}), l = c[t] || [], p = l[0] === H && l[1], d = l[0] === H && l[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (d = p = 0) || f.pop();)
                    if (1 === h.nodeType && ++d && h === e) {
                      c[t] = [H, p, d];
                      break
                    }
                } else if (y && (l = (e[I] || (e[I] = {}))[t]) && l[0] === H) d = l[1];
                else
                  for (;
                    (h = ++p && h && h[m] || (d = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[I] || (h[I] = {}))[t] = [H, d]), h !== e)););
                return d -= r, d === n || d % n === 0 && d / n >= 0
              }
            }
          },
          PSEUDO: function(t, e) {
            var n, o = C.pseudos[t] || C.setFilters[t.toLowerCase()] || i.error("unsupported pseudo: " + t);
            return o[I] ? o(e) : o.length > 1 ? (n = [t, t, "", e], C.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function(t, i) {
              for (var n, r = o(t, e), s = r.length; s--;) n = it.call(t, r[s]), t[n] = !(i[n] = r[s])
            }) : function(t) {
              return o(t, 0, n)
            }) : o
          }
        },
        pseudos: {
          not: r(function(t) {
            var e = [],
              i = [],
              n = F(t.replace(ct, "$1"));
            return n[I] ? r(function(t, e, i, r) {
              for (var o, s = n(t, null, r, []), a = t.length; a--;)(o = s[a]) && (t[a] = !(e[a] = o))
            }) : function(t, r, o) {
              return e[0] = t, n(e, null, o, i), !i.pop()
            }
          }),
          has: r(function(t) {
            return function(e) {
              return i(t, e).length > 0
            }
          }),
          contains: r(function(t) {
            return function(e) {
              return (e.textContent || e.innerText || S(e)).indexOf(t) > -1
            }
          }),
          lang: r(function(t) {
            return gt.test(t || "") || i.error("unsupported lang: " + t), t = t.replace(kt, Tt).toLowerCase(),
              function(e) {
                var i;
                do
                  if (i = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-");
                while ((e = e.parentNode) && 1 === e.nodeType);
                return !1
              }
          }),
          target: function(e) {
            var i = t.location && t.location.hash;
            return i && i.slice(1) === e.id
          },
          root: function(t) {
            return t === O
          },
          focus: function(t) {
            return t === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
          },
          enabled: function(t) {
            return t.disabled === !1
          },
          disabled: function(t) {
            return t.disabled === !0
          },
          checked: function(t) {
            var e = t.nodeName.toLowerCase();
            return "input" === e && !!t.checked || "option" === e && !!t.selected
          },
          selected: function(t) {
            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
          },
          empty: function(t) {
            for (t = t.firstChild; t; t = t.nextSibling)
              if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType) return !1;
            return !0
          },
          parent: function(t) {
            return !C.pseudos.empty(t)
          },
          header: function(t) {
            return xt.test(t.nodeName)
          },
          input: function(t) {
            return wt.test(t.nodeName)
          },
          button: function(t) {
            var e = t.nodeName.toLowerCase();
            return "input" === e && "button" === t.type || "button" === e
          },
          text: function(t) {
            var e;
            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
          },
          first: c(function() {
            return [0]
          }),
          last: c(function(t, e) {
            return [e - 1]
          }),
          eq: c(function(t, e, i) {
            return [0 > i ? i + e : i]
          }),
          even: c(function(t, e) {
            for (var i = 0; e > i; i += 2) t.push(i);
            return t
          }),
          odd: c(function(t, e) {
            for (var i = 1; e > i; i += 2) t.push(i);
            return t
          }),
          lt: c(function(t, e, i) {
            for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
            return t
          }),
          gt: c(function(t, e, i) {
            for (var n = 0 > i ? i + e : i; ++n < e;) t.push(n);
            return t
          })
        }
      }, C.pseudos.nth = C.pseudos.eq;
      for (_ in {
          radio: !0,
          checkbox: !0,
          file: !0,
          password: !0,
          image: !0
        }) C.pseudos[_] = u(_);
      for (_ in {
          submit: !0,
          reset: !0
        }) C.pseudos[_] = l(_);
      h.prototype = C.filters = C.pseudos, C.setFilters = new h, F = i.compile = function(t, e) {
        var i, n = [],
          r = [],
          o = W[t + " "];
        if (!o) {
          for (e || (e = d(t)), i = e.length; i--;) o = y(e[i]), o[I] ? n.push(o) : r.push(o);
          o = W(t, b(r, n))
        }
        return o
      }, k.sortStable = I.split("").sort(U).join("") === I, k.detectDuplicates = X, E(), k.sortDetached = o(function(t) {
        return 1 & t.compareDocumentPosition(A.createElement("div"))
      }), o(function(t) {
        return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
      }) || s("type|href|height|width", function(t, e, i) {
        return i ? void 0 : t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
      }), k.attributes && o(function(t) {
        return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
      }) || s("value", function(t, e, i) {
        return i || "input" !== t.nodeName.toLowerCase() ? void 0 : t.defaultValue
      }), o(function(t) {
        return null == t.getAttribute("disabled")
      }) || s(nt, function(t, e, i) {
        var n;
        return i ? void 0 : (n = t.getAttributeNode(e)) && n.specified ? n.value : t[e] === !0 ? e.toLowerCase() : null
      }), ot.find = i, ot.expr = i.selectors, ot.expr[":"] = ot.expr.pseudos, ot.unique = i.uniqueSort, ot.text = i.getText, ot.isXMLDoc = i.isXML, ot.contains = i.contains
    }(t);
  var ft = {};
  ot.Callbacks = function(t) {
    t = "string" == typeof t ? ft[t] || n(t) : ot.extend({}, t);
    var i, r, o, s, a, u, l = [],
      c = !t.once && [],
      h = function(e) {
        for (i = t.memory && e, r = !0, u = s || 0, s = 0, a = l.length, o = !0; l && a > u; u++)
          if (l[u].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
            i = !1;
            break
          }
        o = !1, l && (c ? c.length && h(c.shift()) : i ? l = [] : d.disable())
      },
      d = {
        add: function() {
          if (l) {
            var e = l.length;
            ! function n(e) {
              ot.each(e, function(e, i) {
                var r = ot.type(i);
                "function" === r ? t.unique && d.has(i) || l.push(i) : i && i.length && "string" !== r && n(i)
              })
            }(arguments), o ? a = l.length : i && (s = e, h(i))
          }
          return this
        },
        remove: function() {
          return l && ot.each(arguments, function(t, e) {
            for (var i;
              (i = ot.inArray(e, l, i)) > -1;) l.splice(i, 1), o && (a >= i && a--, u >= i && u--)
          }), this
        },
        has: function(t) {
          return t ? ot.inArray(t, l) > -1 : !(!l || !l.length)
        },
        empty: function() {
          return l = [], a = 0, this
        },
        disable: function() {
          return l = c = i = e, this
        },
        disabled: function() {
          return !l
        },
        lock: function() {
          return c = e, i || d.disable(), this
        },
        locked: function() {
          return !c
        },
        fireWith: function(t, e) {
          return !l || r && !c || (e = e || [], e = [t, e.slice ? e.slice() : e], o ? c.push(e) : h(e)), this
        },
        fire: function() {
          return d.fireWith(this, arguments), this
        },
        fired: function() {
          return !!r
        }
      };
    return d
  }, ot.extend({
    Deferred: function(t) {
      var e = [
          ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
          ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
          ["notify", "progress", ot.Callbacks("memory")]
        ],
        i = "pending",
        n = {
          state: function() {
            return i
          },
          always: function() {
            return r.done(arguments).fail(arguments), this
          },
          then: function() {
            var t = arguments;
            return ot.Deferred(function(i) {
              ot.each(e, function(e, o) {
                var s = o[0],
                  a = ot.isFunction(t[e]) && t[e];
                r[o[1]](function() {
                  var t = a && a.apply(this, arguments);
                  t && ot.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[s + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                })
              }), t = null
            }).promise()
          },
          promise: function(t) {
            return null != t ? ot.extend(t, n) : n
          }
        },
        r = {};
      return n.pipe = n.then, ot.each(e, function(t, o) {
        var s = o[2],
          a = o[3];
        n[o[1]] = s.add, a && s.add(function() {
          i = a
        }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
          return r[o[0] + "With"](this === r ? n : this, arguments), this
        }, r[o[0] + "With"] = s.fireWith
      }), n.promise(r), t && t.call(r, r), r
    },
    when: function(t) {
      var e, i, n, r = 0,
        o = tt.call(arguments),
        s = o.length,
        a = 1 !== s || t && ot.isFunction(t.promise) ? s : 0,
        u = 1 === a ? t : ot.Deferred(),
        l = function(t, i, n) {
          return function(r) {
            i[t] = this, n[t] = arguments.length > 1 ? tt.call(arguments) : r, n === e ? u.notifyWith(i, n) : --a || u.resolveWith(i, n)
          }
        };
      if (s > 1)
        for (e = new Array(s), i = new Array(s), n = new Array(s); s > r; r++) o[r] && ot.isFunction(o[r].promise) ? o[r].promise().done(l(r, n, o)).fail(u.reject).progress(l(r, i, e)) : --a;
      return a || u.resolveWith(n, o), u.promise()
    }
  }), ot.support = function(e) {
    var i = W.createElement("input"),
      n = W.createDocumentFragment(),
      r = W.createElement("div"),
      o = W.createElement("select"),
      s = o.appendChild(W.createElement("option"));
    return i.type ? (i.type = "checkbox", e.checkOn = "" !== i.value, e.optSelected = s.selected, e.reliableMarginRight = !0, e.boxSizingReliable = !0, e.pixelPosition = !1, i.checked = !0, e.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, e.optDisabled = !s.disabled, i = W.createElement("input"), i.value = "t", i.type = "radio", e.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), n.appendChild(i), e.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked, e.focusinBubbles = "onfocusin" in t, r.style.backgroundClip = "content-box", r.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === r.style.backgroundClip, ot(function() {
      var i, n, o = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
        s = W.getElementsByTagName("body")[0];
      s && (i = W.createElement("div"), i.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(i).appendChild(r), r.innerHTML = "", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", ot.swap(s, null != s.style.zoom ? {
        zoom: 1
      } : {}, function() {
        e.boxSizing = 4 === r.offsetWidth
      }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(r, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(r, null) || {
        width: "4px"
      }).width, n = r.appendChild(W.createElement("div")), n.style.cssText = r.style.cssText = o, n.style.marginRight = n.style.width = "0", r.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(n, null) || {}).marginRight)), s.removeChild(i))
    }), e) : e
  }({});
  var mt, gt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    yt = /([A-Z])/g;
  r.uid = 1, r.accepts = function(t) {
    return t.nodeType ? 1 === t.nodeType || 9 === t.nodeType : !0
  }, r.prototype = {
    key: function(t) {
      if (!r.accepts(t)) return 0;
      var e = {},
        i = t[this.expando];
      if (!i) {
        i = r.uid++;
        try {
          e[this.expando] = {
            value: i
          }, Object.defineProperties(t, e)
        } catch (n) {
          e[this.expando] = i, ot.extend(t, e)
        }
      }
      return this.cache[i] || (this.cache[i] = {}), i
    },
    set: function(t, e, i) {
      var n, r = this.key(t),
        o = this.cache[r];
      if ("string" == typeof e) o[e] = i;
      else if (ot.isEmptyObject(o)) ot.extend(this.cache[r], e);
      else
        for (n in e) o[n] = e[n];
      return o
    },
    get: function(t, i) {
      var n = this.cache[this.key(t)];
      return i === e ? n : n[i]
    },
    access: function(t, i, n) {
      var r;
      return i === e || i && "string" == typeof i && n === e ? (r = this.get(t, i), r !== e ? r : this.get(t, ot.camelCase(i))) : (this.set(t, i, n), n !== e ? n : i)
    },
    remove: function(t, i) {
      var n, r, o, s = this.key(t),
        a = this.cache[s];
      if (i === e) this.cache[s] = {};
      else {
        ot.isArray(i) ? r = i.concat(i.map(ot.camelCase)) : (o = ot.camelCase(i), i in a ? r = [i, o] : (r = o, r = r in a ? [r] : r.match(at) || [])), n = r.length;
        for (; n--;) delete a[r[n]]
      }
    },
    hasData: function(t) {
      return !ot.isEmptyObject(this.cache[t[this.expando]] || {})
    },
    discard: function(t) {
      t[this.expando] && delete this.cache[t[this.expando]]
    }
  }, mt = new r, gt = new r, ot.extend({
    acceptData: r.accepts,
    hasData: function(t) {
      return mt.hasData(t) || gt.hasData(t)
    },
    data: function(t, e, i) {
      return mt.access(t, e, i)
    },
    removeData: function(t, e) {
      mt.remove(t, e)
    },
    _data: function(t, e, i) {
      return gt.access(t, e, i)
    },
    _removeData: function(t, e) {
      gt.remove(t, e)
    }
  }), ot.fn.extend({
    data: function(t, i) {
      var n, r, s = this[0],
        a = 0,
        u = null;
      if (t === e) {
        if (this.length && (u = mt.get(s), 1 === s.nodeType && !gt.get(s, "hasDataAttrs"))) {
          for (n = s.attributes; a < n.length; a++) r = n[a].name, 0 === r.indexOf("data-") && (r = ot.camelCase(r.slice(5)), o(s, r, u[r]));
          gt.set(s, "hasDataAttrs", !0)
        }
        return u
      }
      return "object" == typeof t ? this.each(function() {
        mt.set(this, t)
      }) : ot.access(this, function(i) {
        var n, r = ot.camelCase(t);
        if (s && i === e) {
          if (n = mt.get(s, t), n !== e) return n;
          if (n = mt.get(s, r), n !== e) return n;
          if (n = o(s, r, e), n !== e) return n
        } else this.each(function() {
          var n = mt.get(this, r);
          mt.set(this, r, i), -1 !== t.indexOf("-") && n !== e && mt.set(this, t, i)
        })
      }, null, i, arguments.length > 1, null, !0)
    },
    removeData: function(t) {
      return this.each(function() {
        mt.remove(this, t)
      })
    }
  }), ot.extend({
    queue: function(t, e, i) {
      var n;
      return t ? (e = (e || "fx") + "queue", n = gt.get(t, e), i && (!n || ot.isArray(i) ? n = gt.access(t, e, ot.makeArray(i)) : n.push(i)), n || []) : void 0
    },
    dequeue: function(t, e) {
      e = e || "fx";
      var i = ot.queue(t, e),
        n = i.length,
        r = i.shift(),
        o = ot._queueHooks(t, e),
        s = function() {
          ot.dequeue(t, e)
        };
      "inprogress" === r && (r = i.shift(), n--), r && ("fx" === e && i.unshift("inprogress"), delete o.stop, r.call(t, s, o)), !n && o && o.empty.fire()
    },
    _queueHooks: function(t, e) {
      var i = e + "queueHooks";
      return gt.get(t, i) || gt.access(t, i, {
        empty: ot.Callbacks("once memory").add(function() {
          gt.remove(t, [e + "queue", i])
        })
      })
    }
  }), ot.fn.extend({
    queue: function(t, i) {
      var n = 2;
      return "string" != typeof t && (i = t, t = "fx", n--), arguments.length < n ? ot.queue(this[0], t) : i === e ? this : this.each(function() {
        var e = ot.queue(this, t, i);
        ot._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ot.dequeue(this, t)
      })
    },
    dequeue: function(t) {
      return this.each(function() {
        ot.dequeue(this, t)
      })
    },
    delay: function(t, e) {
      return t = ot.fx ? ot.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
        var n = setTimeout(e, t);
        i.stop = function() {
          clearTimeout(n)
        }
      })
    },
    clearQueue: function(t) {
      return this.queue(t || "fx", [])
    },
    promise: function(t, i) {
      var n, r = 1,
        o = ot.Deferred(),
        s = this,
        a = this.length,
        u = function() {
          --r || o.resolveWith(s, [s])
        };
      for ("string" != typeof t && (i = t, t = e), t = t || "fx"; a--;) n = gt.get(s[a], t + "queueHooks"), n && n.empty && (r++, n.empty.add(u));
      return u(), o.promise(i)
    }
  });
  var bt, wt, xt = /[\t\r\n\f]/g,
    _t = /\r/g,
    kt = /^(?:input|select|textarea|button)$/i;
  ot.fn.extend({
    attr: function(t, e) {
      return ot.access(this, ot.attr, t, e, arguments.length > 1)
    },
    removeAttr: function(t) {
      return this.each(function() {
        ot.removeAttr(this, t)
      })
    },
    prop: function(t, e) {
      return ot.access(this, ot.prop, t, e, arguments.length > 1)
    },
    removeProp: function(t) {
      return this.each(function() {
        delete this[ot.propFix[t] || t]
      })
    },
    addClass: function(t) {
      var e, i, n, r, o, s = 0,
        a = this.length,
        u = "string" == typeof t && t;
      if (ot.isFunction(t)) return this.each(function(e) {
        ot(this).addClass(t.call(this, e, this.className))
      });
      if (u)
        for (e = (t || "").match(at) || []; a > s; s++)
          if (i = this[s], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(xt, " ") : " ")) {
            for (o = 0; r = e[o++];) n.indexOf(" " + r + " ") < 0 && (n += r + " ");
            i.className = ot.trim(n)
          }
      return this
    },
    removeClass: function(t) {
      var e, i, n, r, o, s = 0,
        a = this.length,
        u = 0 === arguments.length || "string" == typeof t && t;
      if (ot.isFunction(t)) return this.each(function(e) {
        ot(this).removeClass(t.call(this, e, this.className))
      });
      if (u)
        for (e = (t || "").match(at) || []; a > s; s++)
          if (i = this[s], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(xt, " ") : "")) {
            for (o = 0; r = e[o++];)
              for (; n.indexOf(" " + r + " ") >= 0;) n = n.replace(" " + r + " ", " ");
            i.className = t ? ot.trim(n) : ""
          }
      return this
    },
    toggleClass: function(t, e) {
      var i = typeof t;
      return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ot.isFunction(t) ? this.each(function(i) {
        ot(this).toggleClass(t.call(this, i, this.className, e), e)
      }) : this.each(function() {
        if ("string" === i)
          for (var e, n = 0, r = ot(this), o = t.match(at) || []; e = o[n++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e);
        else(i === B || "boolean" === i) && (this.className && gt.set(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : gt.get(this, "__className__") || "")
      })
    },
    hasClass: function(t) {
      for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(xt, " ").indexOf(e) >= 0) return !0;
      return !1
    },
    val: function(t) {
      var i, n, r, o = this[0]; {
        if (arguments.length) return r = ot.isFunction(t), this.each(function(n) {
          var o;
          1 === this.nodeType && (o = r ? t.call(this, n, ot(this).val()) : t, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o, function(t) {
            return null == t ? "" : t + ""
          })), i = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], i && "set" in i && i.set(this, o, "value") !== e || (this.value = o))
        });
        if (o) return i = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()], i && "get" in i && (n = i.get(o, "value")) !== e ? n : (n = o.value, "string" == typeof n ? n.replace(_t, "") : null == n ? "" : n)
      }
    }
  }), ot.extend({
    valHooks: {
      option: {
        get: function(t) {
          var e = t.attributes.value;
          return !e || e.specified ? t.value : t.text
        }
      },
      select: {
        get: function(t) {
          for (var e, i, n = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, s = o ? null : [], a = o ? r + 1 : n.length, u = 0 > r ? a : o ? r : 0; a > u; u++)
            if (i = n[u], (i.selected || u === r) && (ot.support.optDisabled ? !i.disabled : null === i.getAttribute("disabled")) && (!i.parentNode.disabled || !ot.nodeName(i.parentNode, "optgroup"))) {
              if (e = ot(i).val(), o) return e;
              s.push(e)
            }
          return s
        },
        set: function(t, e) {
          for (var i, n, r = t.options, o = ot.makeArray(e), s = r.length; s--;) n = r[s], (n.selected = ot.inArray(ot(n).val(), o) >= 0) && (i = !0);
          return i || (t.selectedIndex = -1), o
        }
      }
    },
    attr: function(t, i, n) {
      var r, o, s = t.nodeType;
      if (t && 3 !== s && 8 !== s && 2 !== s) return typeof t.getAttribute === B ? ot.prop(t, i, n) : (1 === s && ot.isXMLDoc(t) || (i = i.toLowerCase(), r = ot.attrHooks[i] || (ot.expr.match.bool.test(i) ? wt : bt)), n === e ? r && "get" in r && null !== (o = r.get(t, i)) ? o : (o = ot.find.attr(t, i), null == o ? e : o) : null !== n ? r && "set" in r && (o = r.set(t, n, i)) !== e ? o : (t.setAttribute(i, n + ""), n) : void ot.removeAttr(t, i))
    },
    removeAttr: function(t, e) {
      var i, n, r = 0,
        o = e && e.match(at);
      if (o && 1 === t.nodeType)
        for (; i = o[r++];) n = ot.propFix[i] || i, ot.expr.match.bool.test(i) && (t[n] = !1), t.removeAttribute(i)
    },
    attrHooks: {
      type: {
        set: function(t, e) {
          if (!ot.support.radioValue && "radio" === e && ot.nodeName(t, "input")) {
            var i = t.value;
            return t.setAttribute("type", e), i && (t.value = i), e
          }
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(t, i, n) {
      var r, o, s, a = t.nodeType;
      if (t && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !ot.isXMLDoc(t), s && (i = ot.propFix[i] || i, o = ot.propHooks[i]), n !== e ? o && "set" in o && (r = o.set(t, n, i)) !== e ? r : t[i] = n : o && "get" in o && null !== (r = o.get(t, i)) ? r : t[i]
    },
    propHooks: {
      tabIndex: {
        get: function(t) {
          return t.hasAttribute("tabindex") || kt.test(t.nodeName) || t.href ? t.tabIndex : -1
        }
      }
    }
  }), wt = {
    set: function(t, e, i) {
      return e === !1 ? ot.removeAttr(t, i) : t.setAttribute(i, i), i
    }
  }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function(t, i) {
    var n = ot.expr.attrHandle[i] || ot.find.attr;
    ot.expr.attrHandle[i] = function(t, i, r) {
      var o = ot.expr.attrHandle[i],
        s = r ? e : (ot.expr.attrHandle[i] = e) != n(t, i, r) ? i.toLowerCase() : null;
      return ot.expr.attrHandle[i] = o, s
    }
  }), ot.support.optSelected || (ot.propHooks.selected = {
    get: function(t) {
      var e = t.parentNode;
      return e && e.parentNode && e.parentNode.selectedIndex, null
    }
  }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    ot.propFix[this.toLowerCase()] = this
  }), ot.each(["radio", "checkbox"], function() {
    ot.valHooks[this] = {
      set: function(t, e) {
        return ot.isArray(e) ? t.checked = ot.inArray(ot(t).val(), e) >= 0 : void 0
      }
    }, ot.support.checkOn || (ot.valHooks[this].get = function(t) {
      return null === t.getAttribute("value") ? "on" : t.value
    })
  });
  var Tt = /^key/,
    Ct = /^(?:mouse|contextmenu)|click/,
    St = /^(?:focusinfocus|focusoutblur)$/,
    jt = /^([^.]*)(?:\.(.+)|)$/;
  ot.event = {
    global: {},
    add: function(t, i, n, r, o) {
      var s, a, u, l, c, h, d, p, f, m, g, v = gt.get(t);
      if (v) {
        for (n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = ot.guid++), (l = v.events) || (l = v.events = {}), (a = v.handle) || (a = v.handle = function(t) {
            return typeof ot === B || t && ot.event.triggered === t.type ? e : ot.event.dispatch.apply(a.elem, arguments)
          }, a.elem = t), i = (i || "").match(at) || [""], c = i.length; c--;) u = jt.exec(i[c]) || [], f = g = u[1], m = (u[2] || "").split(".").sort(), f && (d = ot.event.special[f] || {}, f = (o ? d.delegateType : d.bindType) || f, d = ot.event.special[f] || {}, h = ot.extend({
          type: f,
          origType: g,
          data: r,
          handler: n,
          guid: n.guid,
          selector: o,
          needsContext: o && ot.expr.match.needsContext.test(o),
          namespace: m.join(".")
        }, s), (p = l[f]) || (p = l[f] = [], p.delegateCount = 0, d.setup && d.setup.call(t, r, m, a) !== !1 || t.addEventListener && t.addEventListener(f, a, !1)), d.add && (d.add.call(t, h), h.handler.guid || (h.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, h) : p.push(h), ot.event.global[f] = !0);
        t = null
      }
    },
    remove: function(t, e, i, n, r) {
      var o, s, a, u, l, c, h, d, p, f, m, g = gt.hasData(t) && gt.get(t);
      if (g && (u = g.events)) {
        for (e = (e || "").match(at) || [""], l = e.length; l--;)
          if (a = jt.exec(e[l]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
            for (h = ot.event.special[p] || {}, p = (n ? h.delegateType : h.bindType) || p, d = u[p] || [], a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--;) c = d[o], !r && m !== c.origType || i && i.guid !== c.guid || a && !a.test(c.namespace) || n && n !== c.selector && ("**" !== n || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, h.remove && h.remove.call(t, c));
            s && !d.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || ot.removeEvent(t, p, g.handle), delete u[p])
          } else
            for (p in u) ot.event.remove(t, p + e[l], i, n, !0);
        ot.isEmptyObject(u) && (delete g.handle, gt.remove(t, "events"))
      }
    },
    trigger: function(i, n, r, o) {
      var s, a, u, l, c, h, d, p = [r || W],
        f = nt.call(i, "type") ? i.type : i,
        m = nt.call(i, "namespace") ? i.namespace.split(".") : [];
      if (a = u = r = r || W, 3 !== r.nodeType && 8 !== r.nodeType && !St.test(f + ot.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), c = f.indexOf(":") < 0 && "on" + f, i = i[ot.expando] ? i : new ot.Event(f, "object" == typeof i && i), i.isTrigger = o ? 2 : 3, i.namespace = m.join("."), i.namespace_re = i.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = e, i.target || (i.target = r), n = null == n ? [i] : ot.makeArray(n, [i]), d = ot.event.special[f] || {}, o || !d.trigger || d.trigger.apply(r, n) !== !1)) {
        if (!o && !d.noBubble && !ot.isWindow(r)) {
          for (l = d.delegateType || f, St.test(l + f) || (a = a.parentNode); a; a = a.parentNode) p.push(a), u = a;
          u === (r.ownerDocument || W) && p.push(u.defaultView || u.parentWindow || t)
        }
        for (s = 0;
          (a = p[s++]) && !i.isPropagationStopped();) i.type = s > 1 ? l : d.bindType || f, h = (gt.get(a, "events") || {})[i.type] && gt.get(a, "handle"), h && h.apply(a, n), h = c && a[c], h && ot.acceptData(a) && h.apply && h.apply(a, n) === !1 && i.preventDefault();
        return i.type = f, o || i.isDefaultPrevented() || d._default && d._default.apply(p.pop(), n) !== !1 || !ot.acceptData(r) || c && ot.isFunction(r[f]) && !ot.isWindow(r) && (u = r[c], u && (r[c] = null), ot.event.triggered = f, r[f](), ot.event.triggered = e, u && (r[c] = u)), i.result
      }
    },
    dispatch: function(t) {
      t = ot.event.fix(t);
      var i, n, r, o, s, a = [],
        u = tt.call(arguments),
        l = (gt.get(this, "events") || {})[t.type] || [],
        c = ot.event.special[t.type] || {};
      if (u[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
        for (a = ot.event.handlers.call(this, t, l), i = 0;
          (o = a[i++]) && !t.isPropagationStopped();)
          for (t.currentTarget = o.elem, n = 0;
            (s = o.handlers[n++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(s.namespace)) && (t.handleObj = s, t.data = s.data, r = ((ot.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, u), r !== e && (t.result = r) === !1 && (t.preventDefault(), t.stopPropagation()));
        return c.postDispatch && c.postDispatch.call(this, t), t.result
      }
    },
    handlers: function(t, i) {
      var n, r, o, s, a = [],
        u = i.delegateCount,
        l = t.target;
      if (u && l.nodeType && (!t.button || "click" !== t.type))
        for (; l !== this; l = l.parentNode || this)
          if (l.disabled !== !0 || "click" !== t.type) {
            for (r = [], n = 0; u > n; n++) s = i[n], o = s.selector + " ", r[o] === e && (r[o] = s.needsContext ? ot(o, this).index(l) >= 0 : ot.find(o, this, null, [l]).length), r[o] && r.push(s);
            r.length && a.push({
              elem: l,
              handlers: r
            })
          }
      return u < i.length && a.push({
        elem: this,
        handlers: i.slice(u)
      }), a
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(t, e) {
        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(t, i) {
        var n, r, o, s = i.button;
        return null == t.pageX && null != i.clientX && (n = t.target.ownerDocument || W, r = n.documentElement, o = n.body, t.pageX = i.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), t.pageY = i.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)), t.which || s === e || (t.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), t
      }
    },
    fix: function(t) {
      if (t[ot.expando]) return t;
      var e, i, n, r = t.type,
        o = t,
        s = this.fixHooks[r];
      for (s || (this.fixHooks[r] = s = Ct.test(r) ? this.mouseHooks : Tt.test(r) ? this.keyHooks : {}), n = s.props ? this.props.concat(s.props) : this.props, t = new ot.Event(o), e = n.length; e--;) i = n[e], t[i] = o[i];
      return t.target || (t.target = W), 3 === t.target.nodeType && (t.target = t.target.parentNode), s.filter ? s.filter(t, o) : t
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== u() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === u() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return "checkbox" === this.type && this.click && ot.nodeName(this, "input") ? (this.click(), !1) : void 0
        },
        _default: function(t) {
          return ot.nodeName(t.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(t) {
          t.result !== e && (t.originalEvent.returnValue = t.result)
        }
      }
    },
    simulate: function(t, e, i, n) {
      var r = ot.extend(new ot.Event, i, {
        type: t,
        isSimulated: !0,
        originalEvent: {}
      });
      n ? ot.event.trigger(r, null, e) : ot.event.dispatch.call(e, r), r.isDefaultPrevented() && i.preventDefault()
    }
  }, ot.removeEvent = function(t, e, i) {
    t.removeEventListener && t.removeEventListener(e, i, !1)
  }, ot.Event = function(t, e) {
    return this instanceof ot.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.getPreventDefault && t.getPreventDefault() ? s : a) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(t, e)
  }, ot.Event.prototype = {
    isDefaultPrevented: a,
    isPropagationStopped: a,
    isImmediatePropagationStopped: a,
    preventDefault: function() {
      var t = this.originalEvent;
      this.isDefaultPrevented = s, t && t.preventDefault && t.preventDefault()
    },
    stopPropagation: function() {
      var t = this.originalEvent;
      this.isPropagationStopped = s, t && t.stopPropagation && t.stopPropagation()
    },
    stopImmediatePropagation: function() {
      this.isImmediatePropagationStopped = s, this.stopPropagation()
    }
  }, ot.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }, function(t, e) {
    ot.event.special[t] = {
      delegateType: e,
      bindType: e,
      handle: function(t) {
        var i, n = this,
          r = t.relatedTarget,
          o = t.handleObj;
        return (!r || r !== n && !ot.contains(n, r)) && (t.type = o.origType, i = o.handler.apply(this, arguments), t.type = e), i
      }
    }
  }), ot.support.focusinBubbles || ot.each({
    focus: "focusin",
    blur: "focusout"
  }, function(t, e) {
    var i = 0,
      n = function(t) {
        ot.event.simulate(e, t.target, ot.event.fix(t), !0)
      };
    ot.event.special[e] = {
      setup: function() {
        0 === i++ && W.addEventListener(t, n, !0)
      },
      teardown: function() {
        0 === --i && W.removeEventListener(t, n, !0)
      }
    }
  }), ot.fn.extend({
    on: function(t, i, n, r, o) {
      var s, u;
      if ("object" == typeof t) {
        "string" != typeof i && (n = n || i, i = e);
        for (u in t) this.on(u, i, n, t[u], o);
        return this
      }
      if (null == n && null == r ? (r = i, n = i = e) : null == r && ("string" == typeof i ? (r = n, n = e) : (r = n, n = i, i = e)), r === !1) r = a;
      else if (!r) return this;
      return 1 === o && (s = r, r = function(t) {
          return ot().off(t), s.apply(this, arguments)
        }, r.guid = s.guid || (s.guid = ot.guid++)),
        this.each(function() {
          ot.event.add(this, t, r, n, i)
        })
    },
    one: function(t, e, i, n) {
      return this.on(t, e, i, n, 1)
    },
    off: function(t, i, n) {
      var r, o;
      if (t && t.preventDefault && t.handleObj) return r = t.handleObj, ot(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
      if ("object" == typeof t) {
        for (o in t) this.off(o, i, t[o]);
        return this
      }
      return (i === !1 || "function" == typeof i) && (n = i, i = e), n === !1 && (n = a), this.each(function() {
        ot.event.remove(this, t, n, i)
      })
    },
    trigger: function(t, e) {
      return this.each(function() {
        ot.event.trigger(t, e, this)
      })
    },
    triggerHandler: function(t, e) {
      var i = this[0];
      return i ? ot.event.trigger(t, e, i, !0) : void 0
    }
  });
  var Ft = /^.[^:#\[\.,]*$/,
    Pt = /^(?:parents|prev(?:Until|All))/,
    $t = ot.expr.match.needsContext,
    Et = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  ot.fn.extend({
    find: function(t) {
      var e, i = [],
        n = this,
        r = n.length;
      if ("string" != typeof t) return this.pushStack(ot(t).filter(function() {
        for (e = 0; r > e; e++)
          if (ot.contains(n[e], this)) return !0
      }));
      for (e = 0; r > e; e++) ot.find(t, n[e], i);
      return i = this.pushStack(r > 1 ? ot.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
    },
    has: function(t) {
      var e = ot(t, this),
        i = e.length;
      return this.filter(function() {
        for (var t = 0; i > t; t++)
          if (ot.contains(this, e[t])) return !0
      })
    },
    not: function(t) {
      return this.pushStack(c(this, t || [], !0))
    },
    filter: function(t) {
      return this.pushStack(c(this, t || [], !1))
    },
    is: function(t) {
      return !!c(this, "string" == typeof t && $t.test(t) ? ot(t) : t || [], !1).length
    },
    closest: function(t, e) {
      for (var i, n = 0, r = this.length, o = [], s = $t.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; r > n; n++)
        for (i = this[n]; i && i !== e; i = i.parentNode)
          if (i.nodeType < 11 && (s ? s.index(i) > -1 : 1 === i.nodeType && ot.find.matchesSelector(i, t))) {
            i = o.push(i);
            break
          }
      return this.pushStack(o.length > 1 ? ot.unique(o) : o)
    },
    index: function(t) {
      return t ? "string" == typeof t ? et.call(ot(t), this[0]) : et.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(t, e) {
      var i = "string" == typeof t ? ot(t, e) : ot.makeArray(t && t.nodeType ? [t] : t),
        n = ot.merge(this.get(), i);
      return this.pushStack(ot.unique(n))
    },
    addBack: function(t) {
      return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }
  }), ot.each({
    parent: function(t) {
      var e = t.parentNode;
      return e && 11 !== e.nodeType ? e : null
    },
    parents: function(t) {
      return ot.dir(t, "parentNode")
    },
    parentsUntil: function(t, e, i) {
      return ot.dir(t, "parentNode", i)
    },
    next: function(t) {
      return l(t, "nextSibling")
    },
    prev: function(t) {
      return l(t, "previousSibling")
    },
    nextAll: function(t) {
      return ot.dir(t, "nextSibling")
    },
    prevAll: function(t) {
      return ot.dir(t, "previousSibling")
    },
    nextUntil: function(t, e, i) {
      return ot.dir(t, "nextSibling", i)
    },
    prevUntil: function(t, e, i) {
      return ot.dir(t, "previousSibling", i)
    },
    siblings: function(t) {
      return ot.sibling((t.parentNode || {}).firstChild, t)
    },
    children: function(t) {
      return ot.sibling(t.firstChild)
    },
    contents: function(t) {
      return t.contentDocument || ot.merge([], t.childNodes)
    }
  }, function(t, e) {
    ot.fn[t] = function(i, n) {
      var r = ot.map(this, e, i);
      return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (r = ot.filter(n, r)), this.length > 1 && (Et[t] || ot.unique(r), Pt.test(t) && r.reverse()), this.pushStack(r)
    }
  }), ot.extend({
    filter: function(t, e, i) {
      var n = e[0];
      return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ot.find.matchesSelector(n, t) ? [n] : [] : ot.find.matches(t, ot.grep(e, function(t) {
        return 1 === t.nodeType
      }))
    },
    dir: function(t, i, n) {
      for (var r = [], o = n !== e;
        (t = t[i]) && 9 !== t.nodeType;)
        if (1 === t.nodeType) {
          if (o && ot(t).is(n)) break;
          r.push(t)
        }
      return r
    },
    sibling: function(t, e) {
      for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
      return i
    }
  });
  var At = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Ot = /<([\w:]+)/,
    Dt = /<|&#?\w+;/,
    Mt = /<(?:script|style|link)/i,
    Lt = /^(?:checkbox|radio)$/i,
    Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Rt = /^$|\/(?:java|ecma)script/i,
    It = /^true\/(.*)/,
    zt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Ht = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      thead: [1, "<table>", "</table>"],
      col: [2, "<table><colgroup>", "</colgroup></table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: [0, "", ""]
    };
  Ht.optgroup = Ht.option, Ht.tbody = Ht.tfoot = Ht.colgroup = Ht.caption = Ht.thead, Ht.th = Ht.td, ot.fn.extend({
    text: function(t) {
      return ot.access(this, function(t) {
        return t === e ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || W).createTextNode(t))
      }, null, t, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(t) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var e = h(this, t);
          e.appendChild(t)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(t) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var e = h(this, t);
          e.insertBefore(t, e.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(t) {
        this.parentNode && this.parentNode.insertBefore(t, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(t) {
        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
      })
    },
    remove: function(t, e) {
      for (var i, n = t ? ot.filter(t, this) : this, r = 0; null != (i = n[r]); r++) e || 1 !== i.nodeType || ot.cleanData(g(i)), i.parentNode && (e && ot.contains(i.ownerDocument, i) && f(g(i, "script")), i.parentNode.removeChild(i));
      return this
    },
    empty: function() {
      for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (ot.cleanData(g(t, !1)), t.textContent = "");
      return this
    },
    clone: function(t, e) {
      return t = null == t ? !1 : t, e = null == e ? t : e, this.map(function() {
        return ot.clone(this, t, e)
      })
    },
    html: function(t) {
      return ot.access(this, function(t) {
        var i = this[0] || {},
          n = 0,
          r = this.length;
        if (t === e && 1 === i.nodeType) return i.innerHTML;
        if ("string" == typeof t && !Mt.test(t) && !Ht[(Ot.exec(t) || ["", ""])[1].toLowerCase()]) {
          t = t.replace(At, "<$1></$2>");
          try {
            for (; r > n; n++) i = this[n] || {}, 1 === i.nodeType && (ot.cleanData(g(i, !1)), i.innerHTML = t);
            i = 0
          } catch (o) {}
        }
        i && this.empty().append(t)
      }, null, t, arguments.length)
    },
    replaceWith: function() {
      var t = ot.map(this, function(t) {
          return [t.nextSibling, t.parentNode]
        }),
        e = 0;
      return this.domManip(arguments, function(i) {
        var n = t[e++],
          r = t[e++];
        r && (n && n.parentNode !== r && (n = this.nextSibling), ot(this).remove(), r.insertBefore(i, n))
      }, !0), e ? this : this.remove()
    },
    detach: function(t) {
      return this.remove(t, !0)
    },
    domManip: function(t, e, i) {
      t = K.apply([], t);
      var n, r, o, s, a, u, l = 0,
        c = this.length,
        h = this,
        f = c - 1,
        m = t[0],
        v = ot.isFunction(m);
      if (v || !(1 >= c || "string" != typeof m || ot.support.checkClone) && Nt.test(m)) return this.each(function(n) {
        var r = h.eq(n);
        v && (t[0] = m.call(this, n, r.html())), r.domManip(t, e, i)
      });
      if (c && (n = ot.buildFragment(t, this[0].ownerDocument, !1, !i && this), r = n.firstChild, 1 === n.childNodes.length && (n = r), r)) {
        for (o = ot.map(g(n, "script"), d), s = o.length; c > l; l++) a = n, l !== f && (a = ot.clone(a, !0, !0), s && ot.merge(o, g(a, "script"))), e.call(this[l], a, l);
        if (s)
          for (u = o[o.length - 1].ownerDocument, ot.map(o, p), l = 0; s > l; l++) a = o[l], Rt.test(a.type || "") && !gt.access(a, "globalEval") && ot.contains(u, a) && (a.src ? ot._evalUrl(a.src) : ot.globalEval(a.textContent.replace(zt, "")))
      }
      return this
    }
  }), ot.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(t, e) {
    ot.fn[t] = function(t) {
      for (var i, n = [], r = ot(t), o = r.length - 1, s = 0; o >= s; s++) i = s === o ? this : this.clone(!0), ot(r[s])[e](i), Z.apply(n, i.get());
      return this.pushStack(n)
    }
  }), ot.extend({
    clone: function(t, e, i) {
      var n, r, o, s, a = t.cloneNode(!0),
        u = ot.contains(t.ownerDocument, t);
      if (!(ot.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t)))
        for (s = g(a), o = g(t), n = 0, r = o.length; r > n; n++) v(o[n], s[n]);
      if (e)
        if (i)
          for (o = o || g(t), s = s || g(a), n = 0, r = o.length; r > n; n++) m(o[n], s[n]);
        else m(t, a);
      return s = g(a, "script"), s.length > 0 && f(s, !u && g(t, "script")), a
    },
    buildFragment: function(t, e, i, n) {
      for (var r, o, s, a, u, l, c = 0, h = t.length, d = e.createDocumentFragment(), p = []; h > c; c++)
        if (r = t[c], r || 0 === r)
          if ("object" === ot.type(r)) ot.merge(p, r.nodeType ? [r] : r);
          else if (Dt.test(r)) {
        for (o = o || d.appendChild(e.createElement("div")), s = (Ot.exec(r) || ["", ""])[1].toLowerCase(), a = Ht[s] || Ht._default, o.innerHTML = a[1] + r.replace(At, "<$1></$2>") + a[2], l = a[0]; l--;) o = o.lastChild;
        ot.merge(p, o.childNodes), o = d.firstChild, o.textContent = ""
      } else p.push(e.createTextNode(r));
      for (d.textContent = "", c = 0; r = p[c++];)
        if ((!n || -1 === ot.inArray(r, n)) && (u = ot.contains(r.ownerDocument, r), o = g(d.appendChild(r), "script"), u && f(o), i))
          for (l = 0; r = o[l++];) Rt.test(r.type || "") && i.push(r);
      return d
    },
    cleanData: function(t) {
      for (var i, n, o, s, a, u, l = ot.event.special, c = 0;
        (n = t[c]) !== e; c++) {
        if (r.accepts(n) && (a = n[gt.expando], a && (i = gt.cache[a]))) {
          if (o = Object.keys(i.events || {}), o.length)
            for (u = 0;
              (s = o[u]) !== e; u++) l[s] ? ot.event.remove(n, s) : ot.removeEvent(n, s, i.handle);
          gt.cache[a] && delete gt.cache[a]
        }
        delete mt.cache[n[mt.expando]]
      }
    },
    _evalUrl: function(t) {
      return ot.ajax({
        url: t,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        "throws": !0
      })
    }
  }), ot.fn.extend({
    wrapAll: function(t) {
      var e;
      return ot.isFunction(t) ? this.each(function(e) {
        ot(this).wrapAll(t.call(this, e))
      }) : (this[0] && (e = ot(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
        for (var t = this; t.firstElementChild;) t = t.firstElementChild;
        return t
      }).append(this)), this)
    },
    wrapInner: function(t) {
      return ot.isFunction(t) ? this.each(function(e) {
        ot(this).wrapInner(t.call(this, e))
      }) : this.each(function() {
        var e = ot(this),
          i = e.contents();
        i.length ? i.wrapAll(t) : e.append(t)
      })
    },
    wrap: function(t) {
      var e = ot.isFunction(t);
      return this.each(function(i) {
        ot(this).wrapAll(e ? t.call(this, i) : t)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
      }).end()
    }
  });
  var qt, Bt, Vt = /^(none|table(?!-c[ea]).+)/,
    Wt = /^margin/,
    Xt = new RegExp("^(" + st + ")(.*)$", "i"),
    Ut = new RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"),
    Yt = new RegExp("^([+-])=(" + st + ")", "i"),
    Qt = {
      BODY: "block"
    },
    Jt = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Gt = {
      letterSpacing: 0,
      fontWeight: 400
    },
    Kt = ["Top", "Right", "Bottom", "Left"],
    Zt = ["Webkit", "O", "Moz", "ms"];
  ot.fn.extend({
    css: function(t, i) {
      return ot.access(this, function(t, i, n) {
        var r, o, s = {},
          a = 0;
        if (ot.isArray(i)) {
          for (r = w(t), o = i.length; o > a; a++) s[i[a]] = ot.css(t, i[a], !1, r);
          return s
        }
        return n !== e ? ot.style(t, i, n) : ot.css(t, i)
      }, t, i, arguments.length > 1)
    },
    show: function() {
      return x(this, !0)
    },
    hide: function() {
      return x(this)
    },
    toggle: function(t) {
      return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
        b(this) ? ot(this).show() : ot(this).hide()
      })
    }
  }), ot.extend({
    cssHooks: {
      opacity: {
        get: function(t, e) {
          if (e) {
            var i = qt(t, "opacity");
            return "" === i ? "1" : i
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": "cssFloat"
    },
    style: function(t, i, n, r) {
      if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
        var o, s, a, u = ot.camelCase(i),
          l = t.style;
        return i = ot.cssProps[u] || (ot.cssProps[u] = y(l, u)), a = ot.cssHooks[i] || ot.cssHooks[u], n === e ? a && "get" in a && (o = a.get(t, !1, r)) !== e ? o : l[i] : (s = typeof n, "string" === s && (o = Yt.exec(n)) && (n = (o[1] + 1) * o[2] + parseFloat(ot.css(t, i)), s = "number"), null == n || "number" === s && isNaN(n) || ("number" !== s || ot.cssNumber[u] || (n += "px"), ot.support.clearCloneStyle || "" !== n || 0 !== i.indexOf("background") || (l[i] = "inherit"), a && "set" in a && (n = a.set(t, n, r)) === e || (l[i] = n)), void 0)
      }
    },
    css: function(t, i, n, r) {
      var o, s, a, u = ot.camelCase(i);
      return i = ot.cssProps[u] || (ot.cssProps[u] = y(t.style, u)), a = ot.cssHooks[i] || ot.cssHooks[u], a && "get" in a && (o = a.get(t, !0, n)), o === e && (o = qt(t, i, r)), "normal" === o && i in Gt && (o = Gt[i]), "" === n || n ? (s = parseFloat(o), n === !0 || ot.isNumeric(s) ? s || 0 : o) : o
    }
  }), qt = function(t, i, n) {
    var r, o, s, a = n || w(t),
      u = a ? a.getPropertyValue(i) || a[i] : e,
      l = t.style;
    return a && ("" !== u || ot.contains(t.ownerDocument, t) || (u = ot.style(t, i)), Ut.test(u) && Wt.test(i) && (r = l.width, o = l.minWidth, s = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = a.width, l.width = r, l.minWidth = o, l.maxWidth = s)), u
  }, ot.each(["height", "width"], function(t, e) {
    ot.cssHooks[e] = {
      get: function(t, i, n) {
        return i ? 0 === t.offsetWidth && Vt.test(ot.css(t, "display")) ? ot.swap(t, Jt, function() {
          return T(t, e, n)
        }) : T(t, e, n) : void 0
      },
      set: function(t, i, n) {
        var r = n && w(t);
        return _(t, i, n ? k(t, e, n, ot.support.boxSizing && "border-box" === ot.css(t, "boxSizing", !1, r), r) : 0)
      }
    }
  }), ot(function() {
    ot.support.reliableMarginRight || (ot.cssHooks.marginRight = {
      get: function(t, e) {
        return e ? ot.swap(t, {
          display: "inline-block"
        }, qt, [t, "marginRight"]) : void 0
      }
    }), !ot.support.pixelPosition && ot.fn.position && ot.each(["top", "left"], function(t, e) {
      ot.cssHooks[e] = {
        get: function(t, i) {
          return i ? (i = qt(t, e), Ut.test(i) ? ot(t).position()[e] + "px" : i) : void 0
        }
      }
    })
  }), ot.expr && ot.expr.filters && (ot.expr.filters.hidden = function(t) {
    return t.offsetWidth <= 0 && t.offsetHeight <= 0
  }, ot.expr.filters.visible = function(t) {
    return !ot.expr.filters.hidden(t)
  }), ot.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(t, e) {
    ot.cssHooks[t + e] = {
      expand: function(i) {
        for (var n = 0, r = {}, o = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) r[t + Kt[n] + e] = o[n] || o[n - 2] || o[0];
        return r
      }
    }, Wt.test(t) || (ot.cssHooks[t + e].set = _)
  });
  var te = /%20/g,
    ee = /\[\]$/,
    ie = /\r?\n/g,
    ne = /^(?:submit|button|image|reset|file)$/i,
    re = /^(?:input|select|textarea|keygen)/i;
  ot.fn.extend({
    serialize: function() {
      return ot.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var t = ot.prop(this, "elements");
        return t ? ot.makeArray(t) : this
      }).filter(function() {
        var t = this.type;
        return this.name && !ot(this).is(":disabled") && re.test(this.nodeName) && !ne.test(t) && (this.checked || !Lt.test(t))
      }).map(function(t, e) {
        var i = ot(this).val();
        return null == i ? null : ot.isArray(i) ? ot.map(i, function(t) {
          return {
            name: e.name,
            value: t.replace(ie, "\r\n")
          }
        }) : {
          name: e.name,
          value: i.replace(ie, "\r\n")
        }
      }).get()
    }
  }), ot.param = function(t, i) {
    var n, r = [],
      o = function(t, e) {
        e = ot.isFunction(e) ? e() : null == e ? "" : e, r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
      };
    if (i === e && (i = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function() {
      o(this.name, this.value)
    });
    else
      for (n in t) j(n, t[n], i, o);
    return r.join("&").replace(te, "+")
  }, ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
    ot.fn[e] = function(t, i) {
      return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
    }
  }), ot.fn.extend({
    hover: function(t, e) {
      return this.mouseenter(t).mouseleave(e || t)
    },
    bind: function(t, e, i) {
      return this.on(t, null, e, i)
    },
    unbind: function(t, e) {
      return this.off(t, null, e)
    },
    delegate: function(t, e, i, n) {
      return this.on(e, t, i, n)
    },
    undelegate: function(t, e, i) {
      return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
    }
  });
  var oe, se, ae = ot.now(),
    ue = /\?/,
    le = /#.*$/,
    ce = /([?&])_=[^&]*/,
    he = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    de = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    pe = /^(?:GET|HEAD)$/,
    fe = /^\/\//,
    me = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    ge = ot.fn.load,
    ve = {},
    ye = {},
    be = "*/".concat("*");
  try {
    se = V.href
  } catch (we) {
    se = W.createElement("a"), se.href = "", se = se.href
  }
  oe = me.exec(se.toLowerCase()) || [], ot.fn.load = function(t, i, n) {
    if ("string" != typeof t && ge) return ge.apply(this, arguments);
    var r, o, s, a = this,
      u = t.indexOf(" ");
    return u >= 0 && (r = t.slice(u), t = t.slice(0, u)), ot.isFunction(i) ? (n = i, i = e) : i && "object" == typeof i && (o = "POST"), a.length > 0 && ot.ajax({
      url: t,
      type: o,
      dataType: "html",
      data: i
    }).done(function(t) {
      s = arguments, a.html(r ? ot("<div>").append(ot.parseHTML(t)).find(r) : t)
    }).complete(n && function(t, e) {
      a.each(n, s || [t.responseText, e, t])
    }), this
  }, ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
    ot.fn[e] = function(t) {
      return this.on(e, t)
    }
  }), ot.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: se,
      type: "GET",
      isLocal: de.test(oe[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": be,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": ot.parseJSON,
        "text xml": ot.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(t, e) {
      return e ? $($(t, ot.ajaxSettings), e) : $(ot.ajaxSettings, t)
    },
    ajaxPrefilter: F(ve),
    ajaxTransport: F(ye),
    ajax: function(t, i) {
      function n(t, i, n, a) {
        var l, h, y, b, x, k = i;
        2 !== w && (w = 2, u && clearTimeout(u), r = e, s = a || "", _.readyState = t > 0 ? 4 : 0, l = t >= 200 && 300 > t || 304 === t, n && (b = E(d, _, n)), b = A(d, b, _, l), l ? (d.ifModified && (x = _.getResponseHeader("Last-Modified"), x && (ot.lastModified[o] = x), x = _.getResponseHeader("etag"), x && (ot.etag[o] = x)), 204 === t || "HEAD" === d.type ? k = "nocontent" : 304 === t ? k = "notmodified" : (k = b.state, h = b.data, y = b.error, l = !y)) : (y = k, (t || !k) && (k = "error", 0 > t && (t = 0))), _.status = t, _.statusText = (i || k) + "", l ? m.resolveWith(p, [h, k, _]) : m.rejectWith(p, [_, k, y]), _.statusCode(v), v = e, c && f.trigger(l ? "ajaxSuccess" : "ajaxError", [_, d, l ? h : y]), g.fireWith(p, [_, k]), c && (f.trigger("ajaxComplete", [_, d]), --ot.active || ot.event.trigger("ajaxStop")))
      }
      "object" == typeof t && (i = t, t = e), i = i || {};
      var r, o, s, a, u, l, c, h, d = ot.ajaxSetup({}, i),
        p = d.context || d,
        f = d.context && (p.nodeType || p.jquery) ? ot(p) : ot.event,
        m = ot.Deferred(),
        g = ot.Callbacks("once memory"),
        v = d.statusCode || {},
        y = {},
        b = {},
        w = 0,
        x = "canceled",
        _ = {
          readyState: 0,
          getResponseHeader: function(t) {
            var e;
            if (2 === w) {
              if (!a)
                for (a = {}; e = he.exec(s);) a[e[1].toLowerCase()] = e[2];
              e = a[t.toLowerCase()]
            }
            return null == e ? null : e
          },
          getAllResponseHeaders: function() {
            return 2 === w ? s : null
          },
          setRequestHeader: function(t, e) {
            var i = t.toLowerCase();
            return w || (t = b[i] = b[i] || t, y[t] = e), this
          },
          overrideMimeType: function(t) {
            return w || (d.mimeType = t), this
          },
          statusCode: function(t) {
            var e;
            if (t)
              if (2 > w)
                for (e in t) v[e] = [v[e], t[e]];
              else _.always(t[_.status]);
            return this
          },
          abort: function(t) {
            var e = t || x;
            return r && r.abort(e), n(0, e), this
          }
        };
      if (m.promise(_).complete = g.add, _.success = _.done, _.error = _.fail, d.url = ((t || d.url || se) + "").replace(le, "").replace(fe, oe[1] + "//"), d.type = i.method || i.type || d.method || d.type, d.dataTypes = ot.trim(d.dataType || "*").toLowerCase().match(at) || [""], null == d.crossDomain && (l = me.exec(d.url.toLowerCase()), d.crossDomain = !(!l || l[1] === oe[1] && l[2] === oe[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (oe[3] || ("http:" === oe[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ot.param(d.data, d.traditional)), P(ve, d, i, _), 2 === w) return _;
      c = d.global, c && 0 === ot.active++ && ot.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !pe.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (ue.test(o) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = ce.test(o) ? o.replace(ce, "$1_=" + ae++) : o + (ue.test(o) ? "&" : "?") + "_=" + ae++)), d.ifModified && (ot.lastModified[o] && _.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && _.setRequestHeader("If-None-Match", ot.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || i.contentType) && _.setRequestHeader("Content-Type", d.contentType), _.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + be + "; q=0.01" : "") : d.accepts["*"]);
      for (h in d.headers) _.setRequestHeader(h, d.headers[h]);
      if (d.beforeSend && (d.beforeSend.call(p, _, d) === !1 || 2 === w)) return _.abort();
      x = "abort";
      for (h in {
          success: 1,
          error: 1,
          complete: 1
        }) _[h](d[h]);
      if (r = P(ye, d, i, _)) {
        _.readyState = 1, c && f.trigger("ajaxSend", [_, d]), d.async && d.timeout > 0 && (u = setTimeout(function() {
          _.abort("timeout")
        }, d.timeout));
        try {
          w = 1, r.send(y, n)
        } catch (k) {
          if (!(2 > w)) throw k;
          n(-1, k)
        }
      } else n(-1, "No Transport");
      return _
    },
    getJSON: function(t, e, i) {
      return ot.get(t, e, i, "json")
    },
    getScript: function(t, i) {
      return ot.get(t, e, i, "script")
    }
  }), ot.each(["get", "post"], function(t, i) {
    ot[i] = function(t, n, r, o) {
      return ot.isFunction(n) && (o = o || r, r = n, n = e), ot.ajax({
        url: t,
        type: i,
        dataType: o,
        data: n,
        success: r
      })
    }
  }), ot.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(t) {
        return ot.globalEval(t), t
      }
    }
  }), ot.ajaxPrefilter("script", function(t) {
    t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET")
  }), ot.ajaxTransport("script", function(t) {
    if (t.crossDomain) {
      var e, i;
      return {
        send: function(n, r) {
          e = ot("<script>").prop({
            async: !0,
            charset: t.scriptCharset,
            src: t.url
          }).on("load error", i = function(t) {
            e.remove(), i = null, t && r("error" === t.type ? 404 : 200, t.type)
          }), W.head.appendChild(e[0])
        },
        abort: function() {
          i && i()
        }
      }
    }
  });
  var xe = [],
    _e = /(=)\?(?=&|$)|\?\?/;
  ot.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var t = xe.pop() || ot.expando + "_" + ae++;
      return this[t] = !0, t
    }
  }), ot.ajaxPrefilter("json jsonp", function(i, n, r) {
    var o, s, a, u = i.jsonp !== !1 && (_e.test(i.url) ? "url" : "string" == typeof i.data && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && _e.test(i.data) && "data");
    return u || "jsonp" === i.dataTypes[0] ? (o = i.jsonpCallback = ot.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, u ? i[u] = i[u].replace(_e, "$1" + o) : i.jsonp !== !1 && (i.url += (ue.test(i.url) ? "&" : "?") + i.jsonp + "=" + o), i.converters["script json"] = function() {
      return a || ot.error(o + " was not called"), a[0]
    }, i.dataTypes[0] = "json", s = t[o], t[o] = function() {
      a = arguments
    }, r.always(function() {
      t[o] = s, i[o] && (i.jsonpCallback = n.jsonpCallback, xe.push(o)), a && ot.isFunction(s) && s(a[0]), a = s = e
    }), "script") : void 0
  }), ot.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest
    } catch (t) {}
  };
  var ke = ot.ajaxSettings.xhr(),
    Te = {
      0: 200,
      1223: 204
    },
    Ce = 0,
    Se = {};
  t.ActiveXObject && ot(t).on("unload", function() {
    for (var t in Se) Se[t]();
    Se = e
  }), ot.support.cors = !!ke && "withCredentials" in ke, ot.support.ajax = ke = !!ke, ot.ajaxTransport(function(t) {
    var i;
    return ot.support.cors || ke && !t.crossDomain ? {
      send: function(n, r) {
        var o, s, a = t.xhr();
        if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
          for (o in t.xhrFields) a[o] = t.xhrFields[o];
        t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
        for (o in n) a.setRequestHeader(o, n[o]);
        i = function(t) {
          return function() {
            i && (delete Se[s], i = a.onload = a.onerror = null, "abort" === t ? a.abort() : "error" === t ? r(a.status || 404, a.statusText) : r(Te[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
              text: a.responseText
            } : e, a.getAllResponseHeaders()))
          }
        }, a.onload = i(), a.onerror = i("error"), i = Se[s = Ce++] = i("abort"), a.send(t.hasContent && t.data || null)
      },
      abort: function() {
        i && i()
      }
    } : void 0
  });
  var je, Fe, Pe = /^(?:toggle|show|hide)$/,
    $e = new RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"),
    Ee = /queueHooks$/,
    Ae = [N],
    Oe = {
      "*": [function(t, e) {
        var i = this.createTween(t, e),
          n = i.cur(),
          r = $e.exec(e),
          o = r && r[3] || (ot.cssNumber[t] ? "" : "px"),
          s = (ot.cssNumber[t] || "px" !== o && +n) && $e.exec(ot.css(i.elem, t)),
          a = 1,
          u = 20;
        if (s && s[3] !== o) {
          o = o || s[3], r = r || [], s = +n || 1;
          do a = a || ".5", s /= a, ot.style(i.elem, t, s + o); while (a !== (a = i.cur() / n) && 1 !== a && --u)
        }
        return r && (s = i.start = +s || +n || 0, i.unit = o, i.end = r[1] ? s + (r[1] + 1) * r[2] : +r[2]), i
      }]
    };
  ot.Animation = ot.extend(M, {
    tweener: function(t, e) {
      ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
      for (var i, n = 0, r = t.length; r > n; n++) i = t[n], Oe[i] = Oe[i] || [], Oe[i].unshift(e)
    },
    prefilter: function(t, e) {
      e ? Ae.unshift(t) : Ae.push(t)
    }
  }), ot.Tween = R, R.prototype = {
    constructor: R,
    init: function(t, e, i, n, r, o) {
      this.elem = t, this.prop = i, this.easing = r || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = o || (ot.cssNumber[i] ? "" : "px")
    },
    cur: function() {
      var t = R.propHooks[this.prop];
      return t && t.get ? t.get(this) : R.propHooks._default.get(this)
    },
    run: function(t) {
      var e, i = R.propHooks[this.prop];
      return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : R.propHooks._default.set(this), this
    }
  }, R.prototype.init.prototype = R.prototype, R.propHooks = {
    _default: {
      get: function(t) {
        var e;
        return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
      },
      set: function(t) {
        ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ot.cssProps[t.prop]] || ot.cssHooks[t.prop]) ? ot.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
      }
    }
  }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
    set: function(t) {
      t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
    }
  }, ot.each(["toggle", "show", "hide"], function(t, e) {
    var i = ot.fn[e];
    ot.fn[e] = function(t, n, r) {
      return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(I(e, !0), t, n, r)
    }
  }), ot.fn.extend({
    fadeTo: function(t, e, i, n) {
      return this.filter(b).css("opacity", 0).show().end().animate({
        opacity: e
      }, t, i, n)
    },
    animate: function(t, e, i, n) {
      var r = ot.isEmptyObject(t),
        o = ot.speed(e, i, n),
        s = function() {
          var e = M(this, ot.extend({}, t), o);
          (r || gt.get(this, "finish")) && e.stop(!0)
        };
      return s.finish = s, r || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
    },
    stop: function(t, i, n) {
      var r = function(t) {
        var e = t.stop;
        delete t.stop, e(n)
      };
      return "string" != typeof t && (n = i, i = t, t = e), i && t !== !1 && this.queue(t || "fx", []), this.each(function() {
        var e = !0,
          i = null != t && t + "queueHooks",
          o = ot.timers,
          s = gt.get(this);
        if (i) s[i] && s[i].stop && r(s[i]);
        else
          for (i in s) s[i] && s[i].stop && Ee.test(i) && r(s[i]);
        for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = !1, o.splice(i, 1));
        (e || !n) && ot.dequeue(this, t)
      })
    },
    finish: function(t) {
      return t !== !1 && (t = t || "fx"), this.each(function() {
        var e, i = gt.get(this),
          n = i[t + "queue"],
          r = i[t + "queueHooks"],
          o = ot.timers,
          s = n ? n.length : 0;
        for (i.finish = !0, ot.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
        for (e = 0; s > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
        delete i.finish
      })
    }
  }), ot.each({
    slideDown: I("show"),
    slideUp: I("hide"),
    slideToggle: I("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function(t, e) {
    ot.fn[t] = function(t, i, n) {
      return this.animate(e, t, i, n)
    }
  }), ot.speed = function(t, e, i) {
    var n = t && "object" == typeof t ? ot.extend({}, t) : {
      complete: i || !i && e || ot.isFunction(t) && t,
      duration: t,
      easing: i && e || e && !ot.isFunction(e) && e
    };
    return n.duration = ot.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ot.fx.speeds ? ot.fx.speeds[n.duration] : ot.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
      ot.isFunction(n.old) && n.old.call(this), n.queue && ot.dequeue(this, n.queue)
    }, n
  }, ot.easing = {
    linear: function(t) {
      return t
    },
    swing: function(t) {
      return .5 - Math.cos(t * Math.PI) / 2
    }
  }, ot.timers = [], ot.fx = R.prototype.init, ot.fx.tick = function() {
    var t, i = ot.timers,
      n = 0;
    for (je = ot.now(); n < i.length; n++) t = i[n], t() || i[n] !== t || i.splice(n--, 1);
    i.length || ot.fx.stop(), je = e
  }, ot.fx.timer = function(t) {
    t() && ot.timers.push(t) && ot.fx.start()
  }, ot.fx.interval = 13, ot.fx.start = function() {
    Fe || (Fe = setInterval(ot.fx.tick, ot.fx.interval))
  }, ot.fx.stop = function() {
    clearInterval(Fe), Fe = null
  }, ot.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, ot.fx.step = {}, ot.expr && ot.expr.filters && (ot.expr.filters.animated = function(t) {
    return ot.grep(ot.timers, function(e) {
      return t === e.elem
    }).length
  }), ot.fn.offset = function(t) {
    if (arguments.length) return t === e ? this : this.each(function(e) {
      ot.offset.setOffset(this, t, e)
    });
    var i, n, r = this[0],
      o = {
        top: 0,
        left: 0
      },
      s = r && r.ownerDocument;
    if (s) return i = s.documentElement, ot.contains(i, r) ? (typeof r.getBoundingClientRect !== B && (o = r.getBoundingClientRect()), n = z(s), {
      top: o.top + n.pageYOffset - i.clientTop,
      left: o.left + n.pageXOffset - i.clientLeft
    }) : o
  }, ot.offset = {
    setOffset: function(t, e, i) {
      var n, r, o, s, a, u, l, c = ot.css(t, "position"),
        h = ot(t),
        d = {};
      "static" === c && (t.style.position = "relative"), a = h.offset(), o = ot.css(t, "top"), u = ot.css(t, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, l ? (n = h.position(), s = n.top, r = n.left) : (s = parseFloat(o) || 0, r = parseFloat(u) || 0), ot.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (d.top = e.top - a.top + s), null != e.left && (d.left = e.left - a.left + r), "using" in e ? e.using.call(t, d) : h.css(d)
    }
  }, ot.fn.extend({
    position: function() {
      if (this[0]) {
        var t, e, i = this[0],
          n = {
            top: 0,
            left: 0
          };
        return "fixed" === ot.css(i, "position") ? e = i.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (n = t.offset()), n.top += ot.css(t[0], "borderTopWidth", !0), n.left += ot.css(t[0], "borderLeftWidth", !0)), {
          top: e.top - n.top - ot.css(i, "marginTop", !0),
          left: e.left - n.left - ot.css(i, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        for (var t = this.offsetParent || X; t && !ot.nodeName(t, "html") && "static" === ot.css(t, "position");) t = t.offsetParent;
        return t || X
      })
    }
  }), ot.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(i, n) {
    var r = "pageYOffset" === n;
    ot.fn[i] = function(o) {
      return ot.access(this, function(i, o, s) {
        var a = z(i);
        return s === e ? a ? a[n] : i[o] : void(a ? a.scrollTo(r ? t.pageXOffset : s, r ? s : t.pageYOffset) : i[o] = s)
      }, i, o, arguments.length, null)
    }
  }), ot.each({
    Height: "height",
    Width: "width"
  }, function(t, i) {
    ot.each({
      padding: "inner" + t,
      content: i,
      "": "outer" + t
    }, function(n, r) {
      ot.fn[r] = function(r, o) {
        var s = arguments.length && (n || "boolean" != typeof r),
          a = n || (r === !0 || o === !0 ? "margin" : "border");
        return ot.access(this, function(i, n, r) {
          var o;
          return ot.isWindow(i) ? i.document.documentElement["client" + t] : 9 === i.nodeType ? (o = i.documentElement, Math.max(i.body["scroll" + t], o["scroll" + t], i.body["offset" + t], o["offset" + t], o["client" + t])) : r === e ? ot.css(i, n, a) : ot.style(i, n, r, a)
        }, i, s ? r : e, s, null)
      }
    })
  }), ot.fn.size = function() {
    return this.length
  }, ot.fn.andSelf = ot.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ot : "function" == typeof define && define.amd && define("jquery", [], function() {
    return ot
  }), "object" == typeof t && "object" == typeof t.document && (t.jQuery = t.$ = ot)
}(window),
function() {
  function m() {
    return function() {}
  }

  function q(t) {
    return function() {
      return this[t]
    }
  }

  function r(t) {
    return function() {
      return t
    }
  }

  function u(t, e, i) {
    if ("string" == typeof t) {
      if (0 === t.indexOf("#") && (t = t.slice(1)), u.Aa[t]) return u.Aa[t];
      t = u.w(t)
    }
    if (!t || !t.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
    return t.player || new u.Player(t, e, i)
  }

  function D() {}

  function F(t, e) {
    var i = Array.prototype.slice.call(e);
    t ? i.unshift(t.toUpperCase() + ":") : t = "log", u.log.history.push(i), i.unshift("VIDEOJS:"), E[t].apply ? E[t].apply(E, i) : E[t](i.join(" "))
  }

  function G(t) {
    t.r("vjs-lock-showing")
  }

  function H(t, e, i, n) {
    return i !== b ? (t.b.style[e] = -1 !== ("" + i).indexOf("%") || -1 !== ("" + i).indexOf("px") ? i : "auto" === i ? "" : i + "px", n || t.k("resize"), t) : t.b ? (i = t.b.style[e], n = i.indexOf("px"), -1 !== n ? parseInt(i.slice(0, n), 10) : parseInt(t.b["offset" + u.$(e)], 10)) : 0
  }

  function I(t) {
    var e, i, n, r, o, s, a, u;
    e = 0, i = j, t.d("touchstart", function(t) {
      1 === t.touches.length && (i = t.touches[0], e = (new Date).getTime(), r = f)
    }), t.d("touchmove", function(t) {
      1 < t.touches.length ? r = l : i && (s = t.touches[0].pageX - i.pageX, a = t.touches[0].pageY - i.pageY, u = Math.sqrt(s * s + a * a), u > 22 && (r = l))
    }), o = function() {
      r = l
    }, t.d("touchleave", o), t.d("touchcancel", o), t.d("touchend", function(t) {
      i = j, r === f && (n = (new Date).getTime() - e, 250 > n && (t.preventDefault(), this.k("tap")))
    })
  }

  function J(t, e) {
    var i, n, r, o;
    return i = t.b, n = u.od(i), o = r = i.offsetWidth, i = t.handle, t.j.Vd ? (o = n.top, n = e.changedTouches ? e.changedTouches[0].pageY : e.pageY, i && (i = i.w().offsetHeight, o += i / 2, r -= i), Math.max(0, Math.min(1, (o - n + r) / r))) : (r = n.left, n = e.changedTouches ? e.changedTouches[0].pageX : e.pageX, i && (i = i.w().offsetWidth, r += i / 2, o -= i), Math.max(0, Math.min(1, (n - r) / o)))
  }

  function ca(t, e) {
    t.V(e), e.d("click", u.bind(t, function() {
      G(this)
    }))
  }

  function L(t) {
    t.ra = f, t.za.o("vjs-lock-showing"), t.b.setAttribute("aria-pressed", f), t.O && 0 < t.O.length && t.O[0].w().focus()
  }

  function K(t) {
    t.ra = l, G(t.za), t.b.setAttribute("aria-pressed", l)
  }

  function da(t) {
    var e = {
      sources: [],
      tracks: []
    };
    if (u.l.B(e, u.Bb(t)), t.hasChildNodes()) {
      var i, n, r, o;
      for (t = t.childNodes, r = 0, o = t.length; o > r; r++) i = t[r], n = i.nodeName.toLowerCase(), "source" === n ? e.sources.push(u.Bb(i)) : "track" === n && e.tracks.push(u.Bb(i))
    }
    return e
  }

  function R(t, e, i) {
    t.g && (t.ca = l, t.g.dispose(), t.Hb && (t.Hb = l, clearInterval(t.Ya)), t.Ib && S(t), t.g = l), "Html5" !== e && t.P && (u.f.mc(t.P), t.P = j), t.Ca = e, t.ca = l;
    var n = u.l.B({
      source: i,
      parentEl: t.b
    }, t.j[e.toLowerCase()]);
    i && (i.src == t.z.src && 0 < t.z.currentTime && (n.startTime = t.z.currentTime), t.z.src = i.src), t.g = new window.videojs[e](t, n), t.g.J(function() {
      if (this.c.Ea(), !this.n.progressEvents) {
        var t = this.c;
        t.Hb = f, t.Ya = setInterval(u.bind(t, function() {
          this.z.sb < this.buffered().end(0) ? this.k("progress") : 1 == this.bufferedPercent() && (clearInterval(this.Ya), this.k("progress"))
        }), 500), t.g && t.g.W("progress", function() {
          this.n.progressEvents = f;
          var t = this.c;
          t.Hb = l, clearInterval(t.Ya)
        })
      }
      this.n.timeupdateEvents || (t = this.c, t.Ib = f, t.d("play", t.Kc), t.d("pause", t.Ba), t.g && t.g.W("timeupdate", function() {
        this.n.timeupdateEvents = f, S(this.c)
      }))
    })
  }

  function S(t) {
    t.Ib = l, t.Ba(), t.p("play", t.Kc), t.p("pause", t.Ba)
  }

  function T(t, e) {
    e !== b && t.tc !== e && ((t.tc = e) ? (t.o("vjs-has-started"), t.k("firstplay")) : t.r("vjs-has-started"))
  }

  function V(t, e, i) {
    if (t.g && !t.g.ca) t.g.J(function() {
      this[e](i)
    });
    else try {
      t.g[e](i)
    } catch (n) {
      throw u.log(n), n
    }
  }

  function U(t, e) {
    if (t.g && t.g.ca) try {
      return t.g[e]()
    } catch (i) {
      throw t.g[e] === b ? u.log("Video.js: " + e + " method not defined for " + t.Ca + " playback technology.", i) : "TypeError" == i.name ? (u.log("Video.js: " + e + " unavailable on " + t.Ca + " playback technology element.", i), t.g.ca = l) : u.log(i), i
    }
  }

  function ea(t) {
    t.sd = l, u.p(document, "keydown", t.pc), document.documentElement.style.overflow = t.kd, u.r(document.body, "vjs-full-window"), t.k("exitFullWindow")
  }

  function fa(t) {
    return t.m().g && t.m().g.n.playbackRate && t.m().options().playbackRates && 0 < t.m().options().playbackRates.length
  }

  function la() {
    var t = X[Y],
      e = t.charAt(0).toUpperCase() + t.slice(1);
    ja["set" + e] = function(e) {
      return this.b.vjs_setProperty(t, e)
    }
  }

  function ma(t) {
    ja[t] = function() {
      return this.b.vjs_getProperty(t)
    }
  }

  function na(t, e, i, n, r) {
    var o = t.Da = t.Da || [];
    r = r || {}, r.kind = e, r.label = i, r.language = n, e = u.$(e || "subtitles");
    var s = new window.videojs[e + "Track"](t, r);
    o.push(s), s.Qa() && t.J(function() {
      setTimeout(function() {
        s.show()
      }, 0)
    })
  }

  function oa(t, e, i) {
    for (var n, r, o = t.Da, s = 0, a = o.length; a > s; s++) n = o[s], n.id() === e ? (n.show(), r = n) : i && n.K() == i && 0 < n.mode() && n.disable();
    (e = r ? r.K() : i ? i : l) && t.k(e + "trackchange")
  }

  function pa(t) {
    0 === t.la && t.load(), 0 === t.ka && (t.c.d("timeupdate", u.bind(t, t.update, t.T)), t.c.d("ended", u.bind(t, t.reset, t.T)), ("captions" === t.H || "subtitles" === t.H) && t.c.ja("textTrackDisplay").V(t))
  }

  function qa(t) {
    var e = t.split(":");
    t = 0;
    var i, n, r;
    return 3 == e.length ? (i = e[0], n = e[1], e = e[2]) : (i = 0, n = e[0], e = e[1]), e = e.split(/\s+/), e = e.splice(0, 1)[0], e = e.split(/\.|,/), r = parseFloat(e[1]), e = e[0], t += 3600 * parseFloat(i), t += 60 * parseFloat(n), t += parseFloat(e), r && (t += r / 1e3), t
  }

  function $(t, e) {
    var i = t.split("."),
      n = ra;
    !(i[0] in n) && n.execScript && n.execScript("var " + i[0]);
    for (var r; i.length && (r = i.shift());) i.length || e === b ? n = n[r] ? n[r] : n[r] = {} : n[r] = e
  }
  var b = void 0,
    f = !0,
    j = null,
    l = !1,
    t;
  document.createElement("video"), document.createElement("audio"), document.createElement("track");
  var videojs = u;
  window.je = window.ke = u, u.Ub = "4.6", u.Pc = "https:" == document.location.protocol ? "https://" : "http://", u.options = {
    techOrder: ["html5", "flash"],
    html5: {},
    flash: {},
    width: 300,
    height: 150,
    defaultVolume: 0,
    playbackRates: [],
    children: {
      mediaLoader: {},
      posterImage: {},
      textTrackDisplay: {},
      loadingSpinner: {},
      bigPlayButton: {},
      controlBar: {},
      errorDisplay: {}
    },
    notSupportedMessage: "No compatible source was found for this video."
  }, "GENERATED_CDN_VSN" !== u.Ub && (videojs.options.flash.swf = u.Pc + "vjs.zencdn.net/" + u.Ub + "/video-js.swf"), u.Aa = {}, "function" == typeof define && define.amd ? define([], function() {
    return videojs
  }) : "object" == typeof exports && "object" == typeof module && (module.exports = videojs), u.pa = u.CoreObject = m(), u.pa.extend = function(t) {
    var e, i;
    t = t || {}, e = t.init || t.h || this.prototype.init || this.prototype.h || m(), i = function() {
      e.apply(this, arguments)
    }, i.prototype = u.l.create(this.prototype), i.prototype.constructor = i, i.extend = u.pa.extend, i.create = u.pa.create;
    for (var n in t) t.hasOwnProperty(n) && (i.prototype[n] = t[n]);
    return i
  }, u.pa.create = function() {
    var t = u.l.create(this.prototype);
    return this.apply(t, arguments), t
  }, u.d = function(t, e, i) {
    var n = u.getData(t);
    n.D || (n.D = {}), n.D[e] || (n.D[e] = []), i.v || (i.v = u.v++), n.D[e].push(i), n.X || (n.disabled = l, n.X = function(e) {
      if (!n.disabled) {
        e = u.oc(e);
        var i = n.D[e.type];
        if (i)
          for (var i = i.slice(0), r = 0, o = i.length; o > r && !e.wc(); r++) i[r].call(t, e)
      }
    }), 1 == n.D[e].length && (document.addEventListener ? t.addEventListener(e, n.X, l) : document.attachEvent && t.attachEvent("on" + e, n.X))
  }, u.p = function(t, e, i) {
    if (u.sc(t)) {
      var n = u.getData(t);
      if (n.D)
        if (e) {
          var r = n.D[e];
          if (r) {
            if (i) {
              if (i.v)
                for (n = 0; n < r.length; n++) r[n].v === i.v && r.splice(n--, 1)
            } else n.D[e] = [];
            u.jc(t, e)
          }
        } else
          for (r in n.D) e = r, n.D[e] = [], u.jc(t, e)
    }
  }, u.jc = function(t, e) {
    var i = u.getData(t);
    0 === i.D[e].length && (delete i.D[e], document.removeEventListener ? t.removeEventListener(e, i.X, l) : document.detachEvent && t.detachEvent("on" + e, i.X)), u.Eb(i.D) && (delete i.D, delete i.X, delete i.disabled), u.Eb(i) && u.Dc(t)
  }, u.oc = function(t) {
    function e() {
      return f
    }

    function i() {
      return l
    }
    if (!t || !t.Fb) {
      var n = t || window.event;
      t = {};
      for (var r in n) "layerX" !== r && "layerY" !== r && "keyboardEvent.keyLocation" !== r && ("returnValue" == r && n.preventDefault || (t[r] = n[r]));
      if (t.target || (t.target = t.srcElement || document), t.relatedTarget = t.fromElement === t.target ? t.toElement : t.fromElement, t.preventDefault = function() {
          n.preventDefault && n.preventDefault(), t.returnValue = l, t.rd = e, t.defaultPrevented = f
        }, t.rd = i, t.defaultPrevented = l, t.stopPropagation = function() {
          n.stopPropagation && n.stopPropagation(), t.cancelBubble = f, t.Fb = e
        }, t.Fb = i, t.stopImmediatePropagation = function() {
          n.stopImmediatePropagation && n.stopImmediatePropagation(), t.wc = e, t.stopPropagation()
        }, t.wc = i, t.clientX != j) {
        r = document.documentElement;
        var o = document.body;
        t.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), t.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)
      }
      t.which = t.charCode || t.keyCode, t.button != j && (t.button = 1 & t.button ? 0 : 4 & t.button ? 1 : 2 & t.button ? 2 : 0)
    }
    return t
  }, u.k = function(t, e) {
    var i = u.sc(t) ? u.getData(t) : {},
      n = t.parentNode || t.ownerDocument;
    return "string" == typeof e && (e = {
      type: e,
      target: t
    }), e = u.oc(e), i.X && i.X.call(t, e), n && !e.Fb() && e.bubbles !== l ? u.k(n, e) : n || e.defaultPrevented || (i = u.getData(e.target), !e.target[e.type]) || (i.disabled = f, "function" == typeof e.target[e.type] && e.target[e.type](), i.disabled = l), !e.defaultPrevented
  }, u.W = function(t, e, i) {
    function n() {
      u.p(t, e, n), i.apply(this, arguments)
    }
    n.v = i.v = i.v || u.v++, u.d(t, e, n)
  };
  var v = Object.prototype.hasOwnProperty;
  u.e = function(t, e) {
    var i, n;
    i = document.createElement(t || "div");
    for (n in e) v.call(e, n) && (-1 !== n.indexOf("aria-") || "role" == n ? i.setAttribute(n, e[n]) : i[n] = e[n]);
    return i
  }, u.$ = function(t) {
    return t.charAt(0).toUpperCase() + t.slice(1)
  }, u.l = {}, u.l.create = Object.create || function(t) {
    function e() {}
    return e.prototype = t, new e
  }, u.l.wa = function(t, e, i) {
    for (var n in t) v.call(t, n) && e.call(i || this, n, t[n])
  }, u.l.B = function(t, e) {
    if (!e) return t;
    for (var i in e) v.call(e, i) && (t[i] = e[i]);
    return t
  }, u.l.fd = function(t, e) {
    var i, n, r;
    t = u.l.copy(t);
    for (i in e) v.call(e, i) && (n = t[i], r = e[i], t[i] = u.l.Sa(n) && u.l.Sa(r) ? u.l.fd(n, r) : e[i]);
    return t
  }, u.l.copy = function(t) {
    return u.l.B({}, t)
  }, u.l.Sa = function(t) {
    return !!t && "object" == typeof t && "[object Object]" === t.toString() && t.constructor === Object
  }, u.bind = function(t, e, i) {
    function n() {
      return e.apply(t, arguments)
    }
    return e.v || (e.v = u.v++), n.v = i ? i + "_" + e.v : e.v, n
  }, u.ta = {}, u.v = 1, u.expando = "vdata" + (new Date).getTime(), u.getData = function(t) {
    var e = t[u.expando];
    return e || (e = t[u.expando] = u.v++, u.ta[e] = {}), u.ta[e]
  }, u.sc = function(t) {
    return t = t[u.expando], !(!t || u.Eb(u.ta[t]))
  }, u.Dc = function(t) {
    var e = t[u.expando];
    if (e) {
      delete u.ta[e];
      try {
        delete t[u.expando]
      } catch (i) {
        t.removeAttribute ? t.removeAttribute(u.expando) : t[u.expando] = j
      }
    }
  }, u.Eb = function(t) {
    for (var e in t)
      if (t[e] !== j) return l;
    return f
  }, u.o = function(t, e) {
    -1 == (" " + t.className + " ").indexOf(" " + e + " ") && (t.className = "" === t.className ? e : t.className + " " + e)
  }, u.r = function(t, e) {
    var i, n;
    if (-1 != t.className.indexOf(e)) {
      for (i = t.className.split(" "), n = i.length - 1; n >= 0; n--) i[n] === e && i.splice(n, 1);
      t.className = i.join(" ")
    }
  }, u.A = u.e("video"), u.M = navigator.userAgent, u.Uc = /iPhone/i.test(u.M), u.Tc = /iPad/i.test(u.M), u.Vc = /iPod/i.test(u.M), u.Sc = u.Uc || u.Tc || u.Vc;
  var aa = u,
    w, x = u.M.match(/OS (\d+)_/i);
  w = x && x[1] ? x[1] : b, aa.Zd = w, u.Rc = /Android/i.test(u.M);
  var ba = u,
    y, z = u.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
    A, B;
  z ? (A = z[1] && parseFloat(z[1]), B = z[2] && parseFloat(z[2]), y = A && B ? parseFloat(z[1] + "." + z[2]) : A ? A : j) : y = j, ba.Tb = y, u.Wc = u.Rc && /webkit/i.test(u.M) && 2.3 > u.Tb, u.Xb = /Firefox/i.test(u.M), u.$d = /Chrome/i.test(u.M), u.ec = !!("ontouchstart" in window || window.Qc && document instanceof window.Qc), u.Bb = function(t) {
    var e, i, n, r;
    if (e = {}, t && t.attributes && 0 < t.attributes.length) {
      i = t.attributes;
      for (var o = i.length - 1; o >= 0; o--) n = i[o].name, r = i[o].value, ("boolean" == typeof t[n] || -1 !== ",autoplay,controls,loop,muted,default,".indexOf("," + n + ",")) && (r = r !== j ? f : l), e[n] = r
    }
    return e
  }, u.ce = function(t, e) {
    var i = "";
    return document.defaultView && document.defaultView.getComputedStyle ? i = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (i = t["client" + e.substr(0, 1).toUpperCase() + e.substr(1)] + "px"), i
  }, u.Db = function(t, e) {
    e.firstChild ? e.insertBefore(t, e.firstChild) : e.appendChild(t)
  }, u.Na = {}, u.w = function(t) {
    return 0 === t.indexOf("#") && (t = t.slice(1)), document.getElementById(t)
  }, u.ya = function(t, e) {
    e = e || t;
    var i = Math.floor(t % 60),
      n = Math.floor(t / 60 % 60),
      r = Math.floor(t / 3600),
      o = Math.floor(e / 60 % 60),
      s = Math.floor(e / 3600);
    return (isNaN(t) || 1 / 0 === t) && (r = n = i = "-"), r = r > 0 || s > 0 ? r + ":" : "", r + (((r || o >= 10) && 10 > n ? "0" + n : n) + ":") + (10 > i ? "0" + i : i)
  }, u.bd = function() {
    document.body.focus(), document.onselectstart = r(l)
  }, u.Td = function() {
    document.onselectstart = r(f)
  }, u.trim = function(t) {
    return (t + "").replace(/^\s+|\s+$/g, "")
  }, u.round = function(t, e) {
    return e || (e = 0), Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
  }, u.yb = function(t, e) {
    return {
      length: 1,
      start: function() {
        return t
      },
      end: function() {
        return e
      }
    }
  }, u.get = function(t, e, i, n) {
    var r, o, s, a;
    i = i || m(), "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
      try {
        return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
      } catch (t) {}
      try {
        return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
      } catch (e) {}
      try {
        return new window.ActiveXObject("Msxml2.XMLHTTP")
      } catch (i) {}
      throw Error("This browser does not support XMLHttpRequest.")
    }), o = new XMLHttpRequest, s = u.Fd(t), a = window.location, s.protocol + s.host === a.protocol + a.host || !window.XDomainRequest || "withCredentials" in o ? (r = "file:" == s.protocol || "file:" == a.protocol, o.onreadystatechange = function() {
      4 === o.readyState && (200 === o.status || r && 0 === o.status ? e(o.responseText) : i(o.responseText))
    }) : (o = new window.XDomainRequest, o.onload = function() {
      e(o.responseText)
    }, o.onerror = i, o.onprogress = m(), o.ontimeout = i);
    try {
      o.open("GET", t, f), n && (o.withCredentials = f)
    } catch (l) {
      return void i(l)
    }
    try {
      o.send()
    } catch (c) {
      i(c)
    }
  }, u.Kd = function(t) {
    try {
      var e = window.localStorage || l;
      e && (e.volume = t)
    } catch (i) {
      22 == i.code || 1014 == i.code ? u.log("LocalStorage Full (VideoJS)", i) : 18 == i.code ? u.log("LocalStorage not allowed (VideoJS)", i) : u.log("LocalStorage Error (VideoJS)", i)
    }
  }, u.qc = function(t) {
    return t.match(/^https?:\/\//) || (t = u.e("div", {
      innerHTML: '<a href="' + t + '">x</a>'
    }).firstChild.href), t
  }, u.Fd = function(t) {
    var e, i, n, r;
    r = "protocol hostname port pathname search hash host".split(" "), i = u.e("a", {
      href: t
    }), (n = "" === i.host && "file:" !== i.protocol) && (e = u.e("div"), e.innerHTML = '<a href="' + t + '"></a>', i = e.firstChild, e.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(e)), t = {};
    for (var o = 0; o < r.length; o++) t[r[o]] = i[r[o]];
    return n && document.body.removeChild(e), t
  };
  var E = window.console || {
    log: D,
    warn: D,
    error: D
  };
  u.log = function() {
    F(j, arguments)
  }, u.log.history = [], u.log.error = function() {
    F("error", arguments)
  }, u.log.warn = function() {
    F("warn", arguments)
  }, u.od = function(t) {
    var e, i;
    return t.getBoundingClientRect && t.parentNode && (e = t.getBoundingClientRect()), e ? (t = document.documentElement, i = document.body, {
      left: u.round(e.left + (window.pageXOffset || i.scrollLeft) - (t.clientLeft || i.clientLeft || 0)),
      top: u.round(e.top + (window.pageYOffset || i.scrollTop) - (t.clientTop || i.clientTop || 0))
    }) : {
      left: 0,
      top: 0
    }
  }, u.oa = {}, u.oa.Jb = function(t, e) {
    var i, n, r;
    t = u.l.copy(t);
    for (i in e) e.hasOwnProperty(i) && (n = t[i], r = e[i], t[i] = u.l.Sa(n) && u.l.Sa(r) ? u.oa.Jb(n, r) : e[i]);
    return t
  }, u.a = u.pa.extend({
    h: function(t, e, i) {
      if (this.c = t, this.j = u.l.copy(this.j), e = this.options(e), this.T = e.id || (e.el && e.el.id ? e.el.id : t.id() + "_component_" + u.v++), this.wd = e.name || j, this.b = e.el || this.e(), this.N = [], this.Oa = {}, this.Pa = {}, this.uc(), this.J(i), e.Ec !== l) {
        var n, r;
        n = u.bind(this.m(), this.m().reportUserActivity), this.d("touchstart", function() {
          n(), clearInterval(r), r = setInterval(n, 250)
        }), t = function() {
          n(), clearInterval(r)
        }, this.d("touchmove", n), this.d("touchend", t), this.d("touchcancel", t)
      }
    }
  }), t = u.a.prototype, t.dispose = function() {
    if (this.k({
        type: "dispose",
        bubbles: l
      }), this.N)
      for (var t = this.N.length - 1; t >= 0; t--) this.N[t].dispose && this.N[t].dispose();
    this.Pa = this.Oa = this.N = j, this.p(), this.b.parentNode && this.b.parentNode.removeChild(this.b), u.Dc(this.b), this.b = j
  }, t.c = f, t.m = q("c"), t.options = function(t) {
    return t === b ? this.j : this.j = u.oa.Jb(this.j, t)
  }, t.e = function(t, e) {
    return u.e(t, e)
  }, t.w = q("b"), t.ia = function() {
    return this.u || this.b
  }, t.id = q("T"), t.name = q("wd"), t.children = q("N"), t.qd = function(t) {
    return this.Oa[t]
  }, t.ja = function(t) {
    return this.Pa[t]
  }, t.V = function(t, e) {
    var i, n;
    return "string" == typeof t ? (n = t, e = e || {}, i = e.componentClass || u.$(n), e.name = n, i = new window.videojs[i](this.c || this, e)) : i = t, this.N.push(i), "function" == typeof i.id && (this.Oa[i.id()] = i), (n = n || i.name && i.name()) && (this.Pa[n] = i), "function" == typeof i.el && i.el() && this.ia().appendChild(i.el()), i
  }, t.removeChild = function(t) {
    if ("string" == typeof t && (t = this.ja(t)), t && this.N) {
      for (var e = l, i = this.N.length - 1; i >= 0; i--)
        if (this.N[i] === t) {
          e = f, this.N.splice(i, 1);
          break
        }
      e && (this.Oa[t.id] = j, this.Pa[t.name] = j, (e = t.w()) && e.parentNode === this.ia() && this.ia().removeChild(t.w()))
    }
  }, t.uc = function() {
    var t, e, i, n;
    if (t = this, e = this.options().children)
      if (e instanceof Array)
        for (var r = 0; r < e.length; r++) i = e[r], "string" == typeof i ? (n = i, i = {}) : n = i.name, t[n] = t.V(n, i);
      else u.l.wa(e, function(e, i) {
        i !== l && (t[e] = t.V(e, i))
      })
  }, t.S = r(""), t.d = function(t, e) {
    return u.d(this.b, t, u.bind(this, e)), this
  }, t.p = function(t, e) {
    return u.p(this.b, t, e), this
  }, t.W = function(t, e) {
    return u.W(this.b, t, u.bind(this, e)), this
  }, t.k = function(t, e) {
    return u.k(this.b, t, e), this
  }, t.J = function(t) {
    return t && (this.ca ? t.call(this) : (this.Za === b && (this.Za = []), this.Za.push(t))), this
  }, t.Ea = function() {
    this.ca = f;
    var t = this.Za;
    if (t && 0 < t.length) {
      for (var e = 0, i = t.length; i > e; e++) t[e].call(this);
      this.Za = [], this.k("ready")
    }
  }, t.o = function(t) {
    return u.o(this.b, t), this
  }, t.r = function(t) {
    return u.r(this.b, t), this
  }, t.show = function() {
    return this.b.style.display = "block", this
  }, t.G = function() {
    return this.b.style.display = "none", this
  }, t.disable = function() {
    this.G(), this.show = m()
  }, t.width = function(t, e) {
    return H(this, "width", t, e)
  }, t.height = function(t, e) {
    return H(this, "height", t, e)
  }, t.jd = function(t, e) {
    return this.width(t, f).height(e)
  }, u.s = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), I(this), this.d("tap", this.q), this.d("click", this.q), this.d("focus", this.Va), this.d("blur", this.Ua)
    }
  }), t = u.s.prototype, t.e = function(t, e) {
    var i;
    return e = u.l.B({
      className: this.S(),
      role: "button",
      "aria-live": "polite",
      tabIndex: 0
    }, e), i = u.a.prototype.e.call(this, t, e), e.innerHTML || (this.u = u.e("div", {
      className: "vjs-control-content"
    }), this.wb = u.e("span", {
      className: "vjs-control-text",
      innerHTML: this.sa || "Need Text"
    }), this.u.appendChild(this.wb), i.appendChild(this.u)), i
  }, t.S = function() {
    return "vjs-control " + u.a.prototype.S.call(this)
  }, t.q = m(), t.Va = function() {
    u.d(document, "keyup", u.bind(this, this.da))
  }, t.da = function(t) {
    (32 == t.which || 13 == t.which) && (t.preventDefault(), this.q())
  }, t.Ua = function() {
    u.p(document, "keyup", u.bind(this, this.da))
  }, u.Q = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), this.ad = this.ja(this.j.barName), this.handle = this.ja(this.j.handleName), this.d("mousedown", this.Wa), this.d("touchstart", this.Wa), this.d("focus", this.Va), this.d("blur", this.Ua), this.d("click", this.q), this.c.d("controlsvisible", u.bind(this, this.update)), t.d(this.Ac, u.bind(this, this.update)), this.R = {}
    }
  }), t = u.Q.prototype, t.e = function(t, e) {
    return e = e || {}, e.className += " vjs-slider", e = u.l.B({
      role: "slider",
      "aria-valuenow": 0,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      tabIndex: 0
    }, e), u.a.prototype.e.call(this, t, e)
  }, t.Wa = function(t) {
    t.preventDefault(), u.bd(), this.R.move = u.bind(this, this.Kb), this.R.end = u.bind(this, this.Lb), u.d(document, "mousemove", this.R.move), u.d(document, "mouseup", this.R.end), u.d(document, "touchmove", this.R.move), u.d(document, "touchend", this.R.end), this.Kb(t)
  }, t.Lb = function() {
    u.Td(), u.p(document, "mousemove", this.R.move, l), u.p(document, "mouseup", this.R.end, l), u.p(document, "touchmove", this.R.move, l), u.p(document, "touchend", this.R.end, l), this.update()
  }, t.update = function() {
    if (this.b) {
      var t, e = this.Cb(),
        i = this.handle,
        n = this.ad;
      if (isNaN(e) && (e = 0), t = e, i) {
        t = this.b.offsetWidth;
        var r = i.w().offsetWidth;
        t = r ? r / t : 0, e *= 1 - t, t = e + t / 2, i.w().style.left = u.round(100 * e, 2) + "%"
      }
      n.w().style.width = u.round(100 * t, 2) + "%"
    }
  }, t.Va = function() {
    u.d(document, "keyup", u.bind(this, this.da))
  }, t.da = function(t) {
    37 == t.which ? (t.preventDefault(), this.Gc()) : 39 == t.which && (t.preventDefault(), this.Hc())
  }, t.Ua = function() {
    u.p(document, "keyup", u.bind(this, this.da))
  }, t.q = function(t) {
    t.stopImmediatePropagation(), t.preventDefault()
  }, u.Y = u.a.extend(), u.Y.prototype.defaultValue = 0, u.Y.prototype.e = function(t, e) {
    return e = e || {}, e.className += " vjs-slider-handle", e = u.l.B({
      innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
    }, e), u.a.prototype.e.call(this, "div", e)
  }, u.ga = u.a.extend(), u.ga.prototype.e = function() {
    var t = this.options().kc || "ul";
    return this.u = u.e(t, {
      className: "vjs-menu-content"
    }), t = u.a.prototype.e.call(this, "div", {
      append: this.u,
      className: "vjs-menu"
    }), t.appendChild(this.u), u.d(t, "click", function(t) {
      t.preventDefault(), t.stopImmediatePropagation()
    }), t
  }, u.I = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e), this.selected(e.selected)
    }
  }), u.I.prototype.e = function(t, e) {
    return u.s.prototype.e.call(this, "li", u.l.B({
      className: "vjs-menu-item",
      innerHTML: this.j.label
    }, e))
  }, u.I.prototype.q = function() {
    this.selected(f)
  }, u.I.prototype.selected = function(t) {
    t ? (this.o("vjs-selected"), this.b.setAttribute("aria-selected", f)) : (this.r("vjs-selected"), this.b.setAttribute("aria-selected", l))
  }, u.L = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e), this.za = this.va(), this.V(this.za), this.O && 0 === this.O.length && this.G(), this.d("keyup", this.da), this.b.setAttribute("aria-haspopup", f), this.b.setAttribute("role", "button")
    }
  }), t = u.L.prototype, t.ra = l, t.va = function() {
    var t = new u.ga(this.c);
    if (this.options().title && t.ia().appendChild(u.e("li", {
        className: "vjs-menu-title",
        innerHTML: u.$(this.options().title),
        Rd: -1
      })), this.O = this.createItems())
      for (var e = 0; e < this.O.length; e++) ca(t, this.O[e]);
    return t
  }, t.ua = m(), t.S = function() {
    return this.className + " vjs-menu-button " + u.s.prototype.S.call(this)
  }, t.Va = m(), t.Ua = m(), t.q = function() {
    this.W("mouseout", u.bind(this, function() {
      G(this.za), this.b.blur()
    })), this.ra ? K(this) : L(this)
  }, t.da = function(t) {
    t.preventDefault(), 32 == t.which || 13 == t.which ? this.ra ? K(this) : L(this) : 27 == t.which && this.ra && K(this)
  }, u.F = function(t) {
    "number" == typeof t ? this.code = t : "string" == typeof t ? this.message = t : "object" == typeof t && u.l.B(this, t), this.message || (this.message = u.F.gd[this.code] || "")
  }, u.F.prototype.code = 0, u.F.prototype.message = "", u.F.prototype.status = j, u.F.Ra = "MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" "), u.F.gd = {
    1: "You aborted the video playback",
    2: "A network error caused the video download to fail part-way.",
    3: "The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",
    4: "The video could not be loaded, either because the server or network failed or because the format is not supported.",
    5: "The video is encrypted and we do not have the keys to decrypt it."
  };
  for (var M = 0; M < u.F.Ra.length; M++) u.F[u.F.Ra[M]] = M, u.F.prototype[u.F.Ra[M]] = M;
  var N, O, P, Q;
  for (N = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], O = N[0], Q = 0; Q < N.length; Q++)
    if (N[Q][1] in document) {
      P = N[Q];
      break
    }
  if (P)
    for (u.Na.Ab = {}, Q = 0; Q < P.length; Q++) u.Na.Ab[O[Q]] = P[Q];
  u.Player = u.a.extend({
    h: function(t, e, i) {
      this.P = t, t.id = t.id || "vjs_video_" + u.v++, e = u.l.B(da(t), e), this.z = {}, this.Bc = e.poster, this.xb = e.controls, t.controls = l, e.Ec = l, u.a.call(this, this, e, i), this.controls() ? this.o("vjs-controls-enabled") : this.o("vjs-controls-disabled"), u.Aa[this.T] = this, e.plugins && u.l.wa(e.plugins, function(t, e) {
        this[t](e)
      }, this);
      var n, r, o, s, a, c;
      n = u.bind(this, this.reportUserActivity), this.d("mousedown", function() {
        n(), clearInterval(r), r = setInterval(n, 250)
      }), this.d("mousemove", function(t) {
        (t.screenX != a || t.screenY != c) && (a = t.screenX, c = t.screenY, n())
      }), this.d("mouseup", function() {
        n(), clearInterval(r)
      }), this.d("keydown", n), this.d("keyup", n), o = setInterval(u.bind(this, function() {
        this.na && (this.na = l, this.userActive(f), clearTimeout(s), s = setTimeout(u.bind(this, function() {
          this.na || this.userActive(l)
        }), 2e3))
      }), 250), this.d("dispose", function() {
        clearInterval(o), clearTimeout(s)
      })
    }
  }), t = u.Player.prototype, t.j = u.options, t.dispose = function() {
    this.k("dispose"), this.p("dispose"), u.Aa[this.T] = j, this.P && this.P.player && (this.P.player = j), this.b && this.b.player && (this.b.player = j), clearInterval(this.Ya), this.Ba(), this.g && this.g.dispose(), u.a.prototype.dispose.call(this)
  }, t.e = function() {
    var t = this.b = u.a.prototype.e.call(this, "div"),
      e = this.P;
    if (e.removeAttribute("width"), e.removeAttribute("height"), e.hasChildNodes()) {
      var i, n, r, o, s;
      for (i = e.childNodes, n = i.length, s = []; n--;) r = i[n], o = r.nodeName.toLowerCase(), "track" === o && s.push(r);
      for (i = 0; i < s.length; i++) e.removeChild(s[i])
    }
    return t.id = e.id, t.className = e.className, e.id += "_html5_api", e.className = "vjs-tech", e.player = t.player = this, this.o("vjs-paused"), this.width(this.j.width, f), this.height(this.j.height, f), e.parentNode && e.parentNode.insertBefore(t, e), u.Db(e, t), this.b = t, this.d("loadstart", this.Bd), this.d("ended", this.xd), this.d("play", this.Nb), this.d("firstplay", this.zd), this.d("pause", this.Mb), this.d("progress", this.Cd), this.d("durationchange", this.yc), this.d("fullscreenchange", this.Ad), t
  }, t.Kc = function() {
    this.lc && this.Ba(), this.lc = setInterval(u.bind(this, function() {
      this.k("timeupdate")
    }), 250)
  }, t.Ba = function() {
    clearInterval(this.lc), this.k("timeupdate")
  }, t.Bd = function() {
    this.error(j), this.paused() ? (T(this, l), this.W("play", function() {
      T(this, f)
    })) : this.k("firstplay")
  }, t.tc = l, t.Nb = function() {
    u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing")
  }, t.zd = function() {
    this.j.starttime && this.currentTime(this.j.starttime), this.o("vjs-has-started")
  }, t.Mb = function() {
    u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused")
  }, t.Cd = function() {
    1 == this.bufferedPercent() && this.k("loadedalldata")
  }, t.xd = function() {
    this.j.loop && (this.currentTime(0), this.play())
  }, t.yc = function() {
    var t = U(this, "duration");
    t && (0 > t && (t = 1 / 0), this.duration(t), 1 / 0 === t ? this.o("vjs-live") : this.r("vjs-live"))
  }, t.Ad = function() {
    this.isFullscreen() ? this.o("vjs-fullscreen") : this.r("vjs-fullscreen")
  }, t.play = function() {
    return V(this, "play"), this
  }, t.pause = function() {
    return V(this, "pause"), this
  }, t.paused = function() {
    return U(this, "paused") === l ? l : f
  }, t.currentTime = function(t) {
    return t !== b ? (V(this, "setCurrentTime", t), this.Ib && this.k("timeupdate"), this) : this.z.currentTime = U(this, "currentTime") || 0
  }, t.duration = function(t) {
    return t !== b ? (this.z.duration = parseFloat(t), this) : (this.z.duration === b && this.yc(), this.z.duration || 0)
  }, t.buffered = function() {
    var t = U(this, "buffered"),
      e = t.length - 1,
      i = this.z.sb = this.z.sb || 0;
    return t && e >= 0 && t.end(e) !== i && (i = t.end(e), this.z.sb = i), u.yb(0, i)
  }, t.bufferedPercent = function() {
    return this.duration() ? this.buffered().end(0) / this.duration() : 0
  }, t.volume = function(t) {
    return t !== b ? (t = Math.max(0, Math.min(1, parseFloat(t))), this.z.volume = t, V(this, "setVolume", t), u.Kd(t), this) : (t = parseFloat(U(this, "volume")), isNaN(t) ? 1 : t)
  }, t.muted = function(t) {
    return t !== b ? (V(this, "setMuted", t), this) : U(this, "muted") || l
  }, t.ab = function() {
    return U(this, "supportsFullScreen") || l
  }, t.vc = l, t.isFullscreen = function(t) {
    return t !== b ? (this.vc = !!t, this) : this.vc
  }, t.isFullScreen = function(t) {
    return u.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")'), this.isFullscreen(t)
  }, t.requestFullscreen = function() {
    var t = u.Na.Ab;
    return this.isFullscreen(f), t ? (u.d(document, t.fullscreenchange, u.bind(this, function(e) {
      this.isFullscreen(document[t.fullscreenElement]), this.isFullscreen() === l && u.p(document, t.fullscreenchange, arguments.callee), this.k("fullscreenchange")
    })), this.b[t.requestFullscreen]()) : this.g.ab() ? V(this, "enterFullScreen") : (this.sd = f, this.kd = document.documentElement.style.overflow, u.d(document, "keydown", u.bind(this, this.pc)), document.documentElement.style.overflow = "hidden", u.o(document.body, "vjs-full-window"), this.k("enterFullWindow"), this.k("fullscreenchange")), this
  }, t.exitFullscreen = function() {
    var t = u.Na.Ab;
    return this.isFullscreen(l), t ? document[t.exitFullscreen]() : this.g.ab() ? V(this, "exitFullScreen") : (ea(this), this.k("fullscreenchange")), this
  }, t.pc = function(t) {
    27 === t.keyCode && (this.isFullscreen() === f ? this.exitFullscreen() : ea(this))
  }, t.src = function(t) {
    if (t === b) return U(this, "src");
    if (t instanceof Array) {
      var e;
      t: {
        e = t;
        for (var i = 0, n = this.j.techOrder; i < n.length; i++) {
          var r = u.$(n[i]),
            o = window.videojs[r];
          if (o) {
            if (o.isSupported())
              for (var s = 0, a = e; s < a.length; s++) {
                var c = a[s];
                if (o.canPlaySource(c)) {
                  e = {
                    source: c,
                    g: r
                  };
                  break t
                }
              }
          } else u.log.error('The "' + r + '" tech is undefined. Skipped browser support check for that tech.')
        }
        e = l
      }
      e ? (t = e.source, e = e.g, e == this.Ca ? this.src(t) : R(this, e, t)) : (this.error({
        code: 4,
        message: this.options().notSupportedMessage
      }), this.Ea())
    } else t instanceof Object ? window.videojs[this.Ca].canPlaySource(t) ? this.src(t.src) : this.src([t]) : (this.z.src = t, this.ca ? (V(this, "src", t), "auto" == this.j.preload && this.load(), this.j.autoplay && this.play()) : this.J(function() {
      this.src(t)
    }));
    return this
  }, t.load = function() {
    return V(this, "load"), this
  }, t.currentSrc = function() {
    return U(this, "currentSrc") || this.z.src || ""
  }, t.Xa = function(t) {
    return t !== b ? (V(this, "setPreload", t), this.j.preload = t, this) : U(this, "preload")
  }, t.autoplay = function(t) {
    return t !== b ? (V(this, "setAutoplay", t), this.j.autoplay = t, this) : U(this, "autoplay")
  }, t.loop = function(t) {
    return t !== b ? (V(this, "setLoop", t), this.j.loop = t, this) : U(this, "loop")
  }, t.poster = function(t) {
    return t === b ? this.Bc : (this.Bc = t, V(this, "setPoster", t), void this.k("posterchange"))
  }, t.controls = function(t) {
    return t !== b ? (t = !!t, this.xb !== t && ((this.xb = t) ? (this.r("vjs-controls-disabled"), this.o("vjs-controls-enabled"), this.k("controlsenabled")) : (this.r("vjs-controls-enabled"), this.o("vjs-controls-disabled"), this.k("controlsdisabled"))), this) : this.xb
  }, u.Player.prototype.Sb, t = u.Player.prototype, t.usingNativeControls = function(t) {
    return t !== b ? (t = !!t, this.Sb !== t && ((this.Sb = t) ? (this.o("vjs-using-native-controls"), this.k("usingnativecontrols")) : (this.r("vjs-using-native-controls"), this.k("usingcustomcontrols"))), this) : this.Sb
  }, t.ba = j, t.error = function(t) {
    return t === b ? this.ba : t === j ? (this.ba = t, this.r("vjs-error"), this) : (this.ba = t instanceof u.F ? t : new u.F(t), this.k("error"), this.o("vjs-error"), u.log.error("(CODE:" + this.ba.code + " " + u.F.Ra[this.ba.code] + ")", this.ba.message, this.ba), this)
  }, t.ended = function() {
    return U(this, "ended")
  }, t.seeking = function() {
    return U(this, "seeking")
  }, t.na = f, t.reportUserActivity = function() {
    this.na = f
  }, t.Rb = f, t.userActive = function(t) {
    return t !== b ? (t = !!t, t !== this.Rb && ((this.Rb = t) ? (this.na = f, this.r("vjs-user-inactive"), this.o("vjs-user-active"), this.k("useractive")) : (this.na = l, this.g && this.g.W("mousemove", function(t) {
      t.stopPropagation(), t.preventDefault()
    }), this.r("vjs-user-active"), this.o("vjs-user-inactive"), this.k("userinactive"))), this) : this.Rb
  }, t.playbackRate = function(t) {
    return t !== b ? (V(this, "setPlaybackRate", t), this) : this.g && this.g.n && this.g.n.playbackRate ? U(this, "playbackRate") : 1
  }, u.Ha = u.a.extend(), u.Ha.prototype.j = {
    ee: "play",
    children: {
      playToggle: {},
      currentTimeDisplay: {},
      timeDivider: {},
      durationDisplay: {},
      remainingTimeDisplay: {},
      liveDisplay: {},
      progressControl: {},
      fullscreenToggle: {},
      volumeControl: {},
      muteToggle: {},
      playbackRateMenuButton: {}
    }
  }, u.Ha.prototype.e = function() {
    return u.e("div", {
      className: "vjs-control-bar"
    })
  }, u.Yb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e)
    }
  }), u.Yb.prototype.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-live-controls vjs-control"
    });
    return this.u = u.e("div", {
      className: "vjs-live-display",
      innerHTML: '<span class="vjs-control-text">Stream Type </span>LIVE',
      "aria-live": "off"
    }), t.appendChild(this.u), t
  }, u.ac = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e), t.d("play", u.bind(this, this.Nb)), t.d("pause", u.bind(this, this.Mb))
    }
  }), t = u.ac.prototype, t.sa = "Play", t.S = function() {
    return "vjs-play-control " + u.s.prototype.S.call(this)
  }, t.q = function() {
    this.c.paused() ? this.c.play() : this.c.pause()
  }, t.Nb = function() {
    u.r(this.b, "vjs-paused"), u.o(this.b, "vjs-playing"), this.b.children[0].children[0].innerHTML = "Pause"
  }, t.Mb = function() {
    u.r(this.b, "vjs-playing"), u.o(this.b, "vjs-paused"), this.b.children[0].children[0].innerHTML = "Play"
  }, u.eb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
    }
  }), u.eb.prototype.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-current-time vjs-time-controls vjs-control"
    });
    return this.u = u.e("div", {
      className: "vjs-current-time-display",
      innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
      "aria-live": "off"
    }), t.appendChild(this.u), t
  }, u.eb.prototype.fa = function() {
    var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
    this.u.innerHTML = '<span class="vjs-control-text">Current Time </span>' + u.ya(t, this.c.duration())
  }, u.fb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
    }
  }), u.fb.prototype.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-duration vjs-time-controls vjs-control"
    });
    return this.u = u.e("div", {
      className: "vjs-duration-display",
      innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
      "aria-live": "off"
    }), t.appendChild(this.u), t
  }, u.fb.prototype.fa = function() {
    var t = this.c.duration();
    t && (this.u.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + u.ya(t))
  }, u.gc = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e)
    }
  }), u.gc.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-time-divider",
      innerHTML: "<div><span>/</span></div>"
    })
  }, u.mb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
    }
  }), u.mb.prototype.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-remaining-time vjs-time-controls vjs-control"
    });
    return this.u = u.e("div", {
      className: "vjs-remaining-time-display",
      innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
      "aria-live": "off"
    }), t.appendChild(this.u), t
  }, u.mb.prototype.fa = function() {
    this.c.duration() && (this.u.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + u.ya(this.c.duration() - this.c.currentTime()))
  }, u.Ia = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e)
    }
  }), u.Ia.prototype.sa = "Fullscreen", u.Ia.prototype.S = function() {
    return "vjs-fullscreen-control " + u.s.prototype.S.call(this)
  }, u.Ia.prototype.q = function() {
    this.c.isFullscreen() ? (this.c.exitFullscreen(), this.wb.innerHTML = "Fullscreen") : (this.c.requestFullscreen(), this.wb.innerHTML = "Non-Fullscreen")
  }, u.lb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e)
    }
  }), u.lb.prototype.j = {
    children: {
      seekBar: {}
    }
  }, u.lb.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-progress-control vjs-control"
    })
  }, u.cc = u.Q.extend({
    h: function(t, e) {
      u.Q.call(this, t, e), t.d("timeupdate", u.bind(this, this.ma)), t.J(u.bind(this, this.ma))
    }
  }), t = u.cc.prototype, t.j = {
    children: {
      loadProgressBar: {},
      playProgressBar: {},
      seekHandle: {}
    },
    barName: "playProgressBar",
    handleName: "seekHandle"
  }, t.Ac = "timeupdate", t.e = function() {
    return u.Q.prototype.e.call(this, "div", {
      className: "vjs-progress-holder",
      "aria-label": "video progress bar"
    })
  }, t.ma = function() {
    var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
    this.b.setAttribute("aria-valuenow", u.round(100 * this.Cb(), 2)), this.b.setAttribute("aria-valuetext", u.ya(t, this.c.duration()))
  }, t.Cb = function() {
    return this.c.currentTime() / this.c.duration()
  }, t.Wa = function(t) {
    u.Q.prototype.Wa.call(this, t), this.c.$a = f, this.Wd = !this.c.paused(), this.c.pause();
  }, t.Kb = function(t) {
    t = J(this, t) * this.c.duration(), t == this.c.duration() && (t -= .1), this.c.currentTime(t)
  }, t.Lb = function(t) {
    u.Q.prototype.Lb.call(this, t), this.c.$a = l, this.Wd && this.c.play()
  }, t.Hc = function() {
    this.c.currentTime(this.c.currentTime() + 5)
  }, t.Gc = function() {
    this.c.currentTime(this.c.currentTime() - 5)
  }, u.ib = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.d("progress", u.bind(this, this.update))
    }
  }), u.ib.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-load-progress",
      innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
    })
  }, u.ib.prototype.update = function() {
    this.b.style && (this.b.style.width = u.round(100 * this.c.bufferedPercent(), 2) + "%")
  }, u.$b = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e)
    }
  }), u.$b.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-play-progress",
      innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
    })
  }, u.Ka = u.Y.extend({
    h: function(t, e) {
      u.Y.call(this, t, e), t.d("timeupdate", u.bind(this, this.fa))
    }
  }), u.Ka.prototype.defaultValue = "00:00", u.Ka.prototype.e = function() {
    return u.Y.prototype.e.call(this, "div", {
      className: "vjs-seek-handle",
      "aria-live": "off"
    })
  }, u.Ka.prototype.fa = function() {
    var t = this.c.$a ? this.c.z.currentTime : this.c.currentTime();
    this.b.innerHTML = '<span class="vjs-control-text">' + u.ya(t, this.c.duration()) + "</span>"
  }, u.ob = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.g && t.g.n && t.g.n.volumeControl === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
        t.g.n && t.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
      }))
    }
  }), u.ob.prototype.j = {
    children: {
      volumeBar: {}
    }
  }, u.ob.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-volume-control vjs-control"
    })
  }, u.nb = u.Q.extend({
    h: function(t, e) {
      u.Q.call(this, t, e), t.d("volumechange", u.bind(this, this.ma)), t.J(u.bind(this, this.ma))
    }
  }), t = u.nb.prototype, t.ma = function() {
    this.b.setAttribute("aria-valuenow", u.round(100 * this.c.volume(), 2)), this.b.setAttribute("aria-valuetext", u.round(100 * this.c.volume(), 2) + "%")
  }, t.j = {
    children: {
      volumeLevel: {},
      volumeHandle: {}
    },
    barName: "volumeLevel",
    handleName: "volumeHandle"
  }, t.Ac = "volumechange", t.e = function() {
    return u.Q.prototype.e.call(this, "div", {
      className: "vjs-volume-bar",
      "aria-label": "volume level"
    })
  }, t.Kb = function(t) {
    this.c.muted() && this.c.muted(l), this.c.volume(J(this, t))
  }, t.Cb = function() {
    return this.c.muted() ? 0 : this.c.volume()
  }, t.Hc = function() {
    this.c.volume(this.c.volume() + .1)
  }, t.Gc = function() {
    this.c.volume(this.c.volume() - .1)
  }, u.hc = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e)
    }
  }), u.hc.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-volume-level",
      innerHTML: '<span class="vjs-control-text"></span>'
    })
  }, u.pb = u.Y.extend(), u.pb.prototype.defaultValue = "00:00", u.pb.prototype.e = function() {
    return u.Y.prototype.e.call(this, "div", {
      className: "vjs-volume-handle"
    })
  }, u.ha = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.g && t.g.n && t.g.n.volumeControl === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
        t.g.n && t.g.n.volumeControl === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
      }))
    }
  }), u.ha.prototype.e = function() {
    return u.s.prototype.e.call(this, "div", {
      className: "vjs-mute-control vjs-control",
      innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
    })
  }, u.ha.prototype.q = function() {
    this.c.muted(this.c.muted() ? l : f)
  }, u.ha.prototype.update = function() {
    var t = this.c.volume(),
      e = 3;
    for (0 === t || this.c.muted() ? e = 0 : .33 > t ? e = 1 : .67 > t && (e = 2), this.c.muted() ? "Unmute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.b.children[0].children[0].innerHTML && (this.b.children[0].children[0].innerHTML = "Mute"), t = 0; 4 > t; t++) u.r(this.b, "vjs-vol-" + t);
    u.o(this.b, "vjs-vol-" + e)
  }, u.qa = u.L.extend({
    h: function(t, e) {
      u.L.call(this, t, e), t.d("volumechange", u.bind(this, this.update)), t.g && t.g.n && t.g.n.Nc === l && this.o("vjs-hidden"), t.d("loadstart", u.bind(this, function() {
        t.g.n && t.g.n.Nc === l ? this.o("vjs-hidden") : this.r("vjs-hidden")
      })), this.o("vjs-menu-button")
    }
  }), u.qa.prototype.va = function() {
    var t = new u.ga(this.c, {
        kc: "div"
      }),
      e = new u.nb(this.c, u.l.B({
        Vd: f
      }, this.j.le));
    return t.V(e), t
  }, u.qa.prototype.q = function() {
    u.ha.prototype.q.call(this), u.L.prototype.q.call(this)
  }, u.qa.prototype.e = function() {
    return u.s.prototype.e.call(this, "div", {
      className: "vjs-volume-menu-button vjs-menu-button vjs-control",
      innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
    })
  }, u.qa.prototype.update = u.ha.prototype.update, u.bc = u.L.extend({
    h: function(t, e) {
      u.L.call(this, t, e), this.Mc(), this.Lc(), t.d("loadstart", u.bind(this, this.Mc)), t.d("ratechange", u.bind(this, this.Lc))
    }
  }), t = u.bc.prototype, t.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-playback-rate vjs-menu-button vjs-control",
      innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'
    });
    return this.xc = u.e("div", {
      className: "vjs-playback-rate-value",
      innerHTML: 1
    }), t.appendChild(this.xc), t
  }, t.va = function() {
    var t = new u.ga(this.m()),
      e = this.m().options().playbackRates;
    if (e)
      for (var i = e.length - 1; i >= 0; i--) t.V(new u.kb(this.m(), {
        rate: e[i] + "x"
      }));
    return t
  }, t.ma = function() {
    this.w().setAttribute("aria-valuenow", this.m().playbackRate())
  }, t.q = function() {
    for (var t = this.m().playbackRate(), e = this.m().options().playbackRates, i = e[0], n = 0; n < e.length; n++)
      if (e[n] > t) {
        i = e[n];
        break
      }
    this.m().playbackRate(i)
  }, t.Mc = function() {
    fa(this) ? this.r("vjs-hidden") : this.o("vjs-hidden")
  }, t.Lc = function() {
    fa(this) && (this.xc.innerHTML = this.m().playbackRate() + "x")
  }, u.kb = u.I.extend({
    kc: "button",
    h: function(t, e) {
      var i = this.label = e.rate,
        n = this.Cc = parseFloat(i, 10);
      e.label = i, e.selected = 1 === n, u.I.call(this, t, e), this.m().d("ratechange", u.bind(this, this.update))
    }
  }), u.kb.prototype.q = function() {
    u.I.prototype.q.call(this), this.m().playbackRate(this.Cc)
  }, u.kb.prototype.update = function() {
    this.selected(this.m().playbackRate() == this.Cc)
  }, u.Ja = u.s.extend({
    h: function(t, e) {
      u.s.call(this, t, e), t.poster() && this.src(t.poster()), (!t.poster() || !t.controls()) && this.G(), t.d("posterchange", u.bind(this, function() {
        this.src(t.poster())
      })), t.d("play", u.bind(this, this.G))
    }
  });
  var ga = "backgroundSize" in u.A.style;
  u.Ja.prototype.e = function() {
    var t = u.e("div", {
      className: "vjs-poster",
      tabIndex: -1
    });
    return ga || t.appendChild(u.e("img")), t
  }, u.Ja.prototype.src = function(t) {
    var e = this.w();
    t !== b && (ga ? e.style.backgroundImage = 'url("' + t + '")' : e.firstChild.src = t)
  }, u.Ja.prototype.q = function() {
    this.m().controls() && this.c.play()
  }, u.Zb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), t.d("canplay", u.bind(this, this.G)), t.d("canplaythrough", u.bind(this, this.G)), t.d("playing", u.bind(this, this.G)), t.d("seeking", u.bind(this, this.show)), t.d("seeked", u.bind(this, this.G)), t.d("ended", u.bind(this, this.G)), t.d("waiting", u.bind(this, this.show))
    }
  }), u.Zb.prototype.e = function() {
    return u.a.prototype.e.call(this, "div", {
      className: "vjs-loading-spinner"
    })
  }, u.bb = u.s.extend(), u.bb.prototype.e = function() {
    return u.s.prototype.e.call(this, "div", {
      className: "vjs-big-play-button",
      innerHTML: '<span aria-hidden="true"></span>',
      "aria-label": "play video"
    })
  }, u.bb.prototype.q = function() {
    this.c.play()
  }, u.gb = u.a.extend({
    h: function(t, e) {
      u.a.call(this, t, e), this.update(), t.d("error", u.bind(this, this.update))
    }
  }), u.gb.prototype.e = function() {
    var t = u.a.prototype.e.call(this, "div", {
      className: "vjs-error-display"
    });
    return this.u = u.e("div"), t.appendChild(this.u), t
  }, u.gb.prototype.update = function() {
    this.m().error() && (this.u.innerHTML = this.m().error().message)
  }, u.t = u.a.extend({
    h: function(t, e, i) {
      e = e || {}, e.Ec = l, u.a.call(this, t, e, i);
      var n, r;
      r = this, n = this.m(), t = function() {
        if (n.controls() && !n.usingNativeControls()) {
          var t;
          r.d("mousedown", r.q), r.d("touchstart", function(e) {
            e.preventDefault(), t = this.c.userActive()
          }), r.d("touchmove", function() {
            t && this.m().reportUserActivity()
          }), I(r), r.d("tap", r.Dd)
        }
      }, e = u.bind(r, r.Hd), this.J(t), n.d("controlsenabled", t), n.d("controlsdisabled", e), this.J(function() {
        this.networkState && 0 < this.networkState() && this.m().k("loadstart")
      })
    }
  }), t = u.t.prototype, t.Hd = function() {
    this.p("tap"), this.p("touchstart"), this.p("touchmove"), this.p("touchleave"), this.p("touchcancel"), this.p("touchend"), this.p("click"), this.p("mousedown")
  }, t.q = function(t) {
    0 === t.button && this.m().controls() && (this.m().paused() ? this.m().play() : this.m().pause())
  }, t.Dd = function() {
    this.m().userActive(!this.m().userActive())
  }, t.Pb = m(), t.n = {
    volumeControl: f,
    fullscreenResize: l,
    playbackRate: l,
    progressEvents: l,
    timeupdateEvents: l
  }, u.media = {}, u.f = u.t.extend({
    h: function(t, e, i) {
      for (this.n.volumeControl = u.f.dd(), this.n.playbackRate = u.f.cd(), this.n.movingMediaElementInDOM = !u.Sc, this.n.fullscreenResize = f, u.t.call(this, t, e, i), i = u.f.hb.length - 1; i >= 0; i--) u.d(this.b, u.f.hb[i], u.bind(this, this.md));
      if ((e = e.source) && this.b.currentSrc !== e.src && (this.b.src = e.src), u.ec && t.options().nativeControlsForTouch !== l) {
        var n, r, o, s;
        n = this, r = this.m(), e = r.controls(), n.b.controls = !!e, o = function() {
          n.b.controls = f
        }, s = function() {
          n.b.controls = l
        }, r.d("controlsenabled", o), r.d("controlsdisabled", s), e = function() {
          r.p("controlsenabled", o), r.p("controlsdisabled", s)
        }, n.d("dispose", e), r.d("usingcustomcontrols", e), r.usingNativeControls(f)
      }
      t.J(function() {
        this.P && this.j.autoplay && this.paused() && (delete this.P.poster, this.play())
      }), this.Ea()
    }
  }), t = u.f.prototype, t.dispose = function() {
    u.t.prototype.dispose.call(this)
  }, t.e = function() {
    var t, e = this.c,
      i = e.P;
    i && this.n.movingMediaElementInDOM !== l || (i ? (t = i.cloneNode(l), u.f.mc(i), i = t, e.P = j) : i = u.e("video", {
      id: e.id() + "_html5_api",
      className: "vjs-tech"
    }), i.player = e, u.Db(i, e.w())), t = ["autoplay", "preload", "loop", "muted"];
    for (var n = t.length - 1; n >= 0; n--) {
      var r = t[n];
      e.j[r] !== j && (i[r] = e.j[r])
    }
    return i
  }, t.md = function(t) {
    "error" == t.type ? this.m().error(this.error().code) : (t.bubbles = l, this.m().k(t))
  }, t.play = function() {
    this.b.play()
  }, t.pause = function() {
    this.b.pause()
  }, t.paused = function() {
    return this.b.paused
  }, t.currentTime = function() {
    return this.b.currentTime
  }, t.Jd = function(t) {
    try {
      this.b.currentTime = t
    } catch (e) {
      u.log(e, "Video is not ready. (Video.js)")
    }
  }, t.duration = function() {
    return this.b.duration || 0
  }, t.buffered = function() {
    return this.b.buffered
  }, t.volume = function() {
    return this.b.volume
  }, t.Pd = function(t) {
    this.b.volume = t
  }, t.muted = function() {
    return this.b.muted
  }, t.Md = function(t) {
    this.b.muted = t
  }, t.width = function() {
    return this.b.offsetWidth
  }, t.height = function() {
    return this.b.offsetHeight
  }, t.ab = function() {
    return "function" != typeof this.b.webkitEnterFullScreen || !/Android/.test(u.M) && /Chrome|Mac OS X 10.5/.test(u.M) ? l : f
  }, t.nc = function() {
    var t = this.b;
    t.paused && t.networkState <= t.Yd ? (this.b.play(), setTimeout(function() {
      t.pause(), t.webkitEnterFullScreen()
    }, 0)) : t.webkitEnterFullScreen()
  }, t.nd = function() {
    this.b.webkitExitFullScreen()
  }, t.src = function(t) {
    this.b.src = t
  }, t.load = function() {
    this.b.load()
  }, t.currentSrc = function() {
    return this.b.currentSrc
  }, t.poster = function() {
    return this.b.poster
  }, t.Pb = function(t) {
    this.b.poster = t
  }, t.Xa = function() {
    return this.b.Xa
  }, t.Od = function(t) {
    this.b.Xa = t
  }, t.autoplay = function() {
    return this.b.autoplay
  }, t.Id = function(t) {
    this.b.autoplay = t
  }, t.controls = function() {
    return this.b.controls
  }, t.loop = function() {
    return this.b.loop
  }, t.Ld = function(t) {
    this.b.loop = t
  }, t.error = function() {
    return this.b.error
  }, t.seeking = function() {
    return this.b.seeking
  }, t.ended = function() {
    return this.b.ended
  }, t.playbackRate = function() {
    return this.b.playbackRate
  }, t.Nd = function(t) {
    this.b.playbackRate = t
  }, t.networkState = function() {
    return this.b.networkState
  }, u.f.isSupported = function() {
    try {
      u.A.volume = .5
    } catch (t) {
      return l
    }
    return !!u.A.canPlayType
  }, u.f.tb = function(t) {
    try {
      return !!u.A.canPlayType(t.type)
    } catch (e) {
      return ""
    }
  }, u.f.dd = function() {
    var t = u.A.volume;
    return u.A.volume = t / 2 + .1, t !== u.A.volume
  }, u.f.cd = function() {
    var t = u.A.playbackRate;
    return u.A.playbackRate = t / 2 + .1, t !== u.A.playbackRate
  };
  var W, ha = /^application\/(?:x-|vnd\.apple\.)mpegurl/i,
    ia = /^video\/mp4/i;
  u.f.zc = function() {
    4 <= u.Tb && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(t) {
      return t && ha.test(t) ? "maybe" : W.call(this, t)
    }), u.Wc && (W || (W = u.A.constructor.prototype.canPlayType), u.A.constructor.prototype.canPlayType = function(t) {
      return t && ia.test(t) ? "maybe" : W.call(this, t)
    })
  }, u.f.Ud = function() {
    var t = u.A.constructor.prototype.canPlayType;
    return u.A.constructor.prototype.canPlayType = W, W = j, t
  }, u.f.zc(), u.f.hb = "loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" "), u.f.mc = function(t) {
    if (t) {
      for (t.player = j, t.parentNode && t.parentNode.removeChild(t); t.hasChildNodes();) t.removeChild(t.firstChild);
      if (t.removeAttribute("src"), "function" == typeof t.load) try {
        t.load()
      } catch (e) {}
    }
  }, u.i = u.t.extend({
    h: function(t, e, i) {
      u.t.call(this, t, e, i);
      var n = e.source;
      i = e.parentEl;
      var r = this.b = u.e("div", {
          id: t.id() + "_temp_flash"
        }),
        o = t.id() + "_flash_api";
      t = t.j;
      var s, a = u.l.B({
          readyFunction: "videojs.Flash.onReady",
          eventProxyFunction: "videojs.Flash.onEvent",
          errorEventProxyFunction: "videojs.Flash.onError",
          autoplay: t.autoplay,
          preload: t.Xa,
          loop: t.loop,
          muted: t.muted
        }, e.flashVars),
        c = u.l.B({
          wmode: "opaque",
          bgcolor: "#000000"
        }, e.params),
        h = u.l.B({
          id: o,
          name: o,
          "class": "vjs-tech"
        }, e.attributes);
      if (n && (n.type && u.i.ud(n.type) ? (t = u.i.Ic(n.src), a.rtmpConnection = encodeURIComponent(t.vb), a.rtmpStream = encodeURIComponent(t.Qb)) : a.src = encodeURIComponent(u.qc(n.src))), this.setCurrentTime = function(t) {
          s = t, this.b.vjs_setProperty("currentTime", t)
        }, this.currentTime = function() {
          return this.seeking() ? s : this.b.vjs_getProperty("currentTime")
        }, u.Db(r, i), e.startTime && this.J(function() {
          this.load(), this.play(), this.currentTime(e.startTime)
        }), u.Xb && this.J(function() {
          u.d(this.w(), "mousemove", u.bind(this, function() {
            this.m().k({
              type: "mousemove",
              bubbles: l
            })
          }))
        }), e.iFrameMode !== f || u.Xb) u.i.ld(e.swf, r, a, c, h);
      else {
        var d = u.e("iframe", {
          id: o + "_iframe",
          name: o + "_iframe",
          className: "vjs-tech",
          scrolling: "no",
          marginWidth: 0,
          marginHeight: 0,
          frameBorder: 0
        });
        a.readyFunction = "ready", a.eventProxyFunction = "events", a.errorEventProxyFunction = "errors", u.d(d, "load", u.bind(this, function() {
          var t, i = d.contentWindow;
          t = d.contentDocument ? d.contentDocument : d.contentWindow.document, t.write(u.i.rc(e.swf, a, c, h)), i.player = this.c, i.ready = u.bind(this.c, function(e) {
            var i = this.g;
            i.b = t.getElementById(e), u.i.ub(i)
          }), i.events = u.bind(this.c, function(t, e) {
            this && "flash" === this.Ca && this.k(e)
          }), i.errors = u.bind(this.c, function(t, e) {
            u.log("Flash Error", e)
          })
        })), r.parentNode.replaceChild(d, r)
      }
    }
  }), t = u.i.prototype, t.dispose = function() {
    u.t.prototype.dispose.call(this)
  }, t.play = function() {
    this.b.vjs_play()
  }, t.pause = function() {
    this.b.vjs_pause()
  }, t.src = function(t) {
    if (t === b) return this.currentSrc();
    if (u.i.td(t) ? (t = u.i.Ic(t), this.ge(t.vb), this.he(t.Qb)) : (t = u.qc(t), this.b.vjs_src(t)), this.c.autoplay()) {
      var e = this;
      setTimeout(function() {
        e.play()
      }, 0)
    }
  }, t.currentSrc = function() {
    var t = this.b.vjs_getProperty("currentSrc");
    if (t == j) {
      var e = this.rtmpConnection(),
        i = this.rtmpStream();
      e && i && (t = u.i.Qd(e, i))
    }
    return t
  }, t.load = function() {
    this.b.vjs_load()
  }, t.poster = function() {
    this.b.vjs_getProperty("poster")
  }, t.Pb = m(), t.buffered = function() {
    return u.yb(0, this.b.vjs_getProperty("buffered"))
  }, t.ab = r(l), t.nc = r(l);
  var ja = u.i.prototype,
    X = "rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),
    ka = "error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" "),
    Y;
  for (Y = 0; Y < X.length; Y++) ma(X[Y]), la();
  for (Y = 0; Y < ka.length; Y++) ma(ka[Y]);
  if (u.i.isSupported = function() {
      return 10 <= u.i.version()[0]
    }, u.i.tb = function(t) {
      return t.type ? (t = t.type.replace(/;.*/, "").toLowerCase(), t in u.i.pd || t in u.i.Jc ? "maybe" : void 0) : ""
    }, u.i.pd = {
      "video/flv": "FLV",
      "video/x-flv": "FLV",
      "video/mp4": "MP4",
      "video/m4v": "MP4"
    }, u.i.Jc = {
      "rtmp/mp4": "MP4",
      "rtmp/flv": "FLV"
    }, u.i.onReady = function(t) {
      t = u.w(t);
      var e = t.player || t.parentNode.player,
        i = e.g;
      t.player = e, i.b = t, u.i.ub(i)
    }, u.i.ub = function(t) {
      t.w().vjs_getProperty ? t.Ea() : setTimeout(function() {
        u.i.ub(t)
      }, 50)
    }, u.i.onEvent = function(t, e) {
      u.w(t).player.k(e)
    }, u.i.onError = function(t, e) {
      var i = u.w(t).player,
        n = "FLASH: " + e;
      "srcnotfound" == e ? i.error({
        code: 4,
        message: n
      }) : i.error(n)
    }, u.i.version = function() {
      var t = "0,0,0";
      try {
        t = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
      } catch (e) {
        try {
          navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (t = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1])
        } catch (i) {}
      }
      return t.split(",")
    }, u.i.ld = function(t, e, i, n, r) {
      t = u.i.rc(t, i, n, r), t = u.e("div", {
        innerHTML: t
      }).childNodes[0], i = e.parentNode, e.parentNode.replaceChild(t, e);
      var o = i.childNodes[0];
      setTimeout(function() {
        o.style.display = "block"
      }, 1e3)
    }, u.i.rc = function(t, e, i, n) {
      var r = "",
        o = "",
        s = "";
      return e && u.l.wa(e, function(t, e) {
        r += t + "=" + e + "&amp;"
      }), i = u.l.B({
        movie: t,
        flashvars: r,
        allowScriptAccess: "always",
        allowNetworking: "all"
      }, i), u.l.wa(i, function(t, e) {
        o += '<param name="' + t + '" value="' + e + '" />'
      }), n = u.l.B({
        data: t,
        width: "100%",
        height: "100%"
      }, n), u.l.wa(n, function(t, e) {
        s += t + '="' + e + '" '
      }), '<object type="application/x-shockwave-flash"' + s + ">" + o + "</object>"
    }, u.i.Qd = function(t, e) {
      return t + "&" + e
    }, u.i.Ic = function(t) {
      var e = {
        vb: "",
        Qb: ""
      };
      if (!t) return e;
      var i, n = t.indexOf("&");
      return -1 !== n ? i = n + 1 : (n = i = t.lastIndexOf("/") + 1, 0 === n && (n = i = t.length)), e.vb = t.substring(0, n), e.Qb = t.substring(i, t.length), e
    }, u.i.ud = function(t) {
      return t in u.i.Jc
    }, u.i.Yc = /^rtmp[set]?:\/\//i, u.i.td = function(t) {
      return u.i.Yc.test(t)
    }, u.Xc = u.a.extend({
      h: function(t, e, i) {
        if (u.a.call(this, t, e, i), t.j.sources && 0 !== t.j.sources.length) t.src(t.j.sources);
        else
          for (e = 0, i = t.j.techOrder; e < i.length; e++) {
            var n = u.$(i[e]),
              r = window.videojs[n];
            if (r && r.isSupported()) {
              R(t, n);
              break
            }
          }
      }
    }), u.Player.prototype.textTracks = function() {
      return this.Da = this.Da || []
    }, u.C = u.a.extend({
      h: function(t, e) {
        u.a.call(this, t, e), this.T = e.id || "vjs_" + e.kind + "_" + e.language + "_" + u.v++, this.Fc = e.src, this.hd = e["default"] || e.dflt, this.Sd = e.title, this.de = e.srclang, this.vd = e.label, this.aa = [], this.qb = [], this.ka = this.la = 0, this.c.d("fullscreenchange", u.bind(this, this.$c))
      }
    }), t = u.C.prototype, t.K = q("H"), t.src = q("Fc"), t.Qa = q("hd"), t.title = q("Sd"), t.label = q("vd"), t.ed = q("aa"), t.Zc = q("qb"), t.readyState = q("la"), t.mode = q("ka"), t.$c = function() {
      this.b.style.fontSize = this.c.isFullScreen() ? 140 * (screen.width / this.c.width()) + "%" : ""
    }, t.e = function() {
      return u.a.prototype.e.call(this, "div", {
        className: "vjs-" + this.H + " vjs-text-track"
      })
    }, t.show = function() {
      pa(this), this.ka = 2, u.a.prototype.show.call(this)
    }, t.G = function() {
      pa(this), this.ka = 1, u.a.prototype.G.call(this)
    }, t.disable = function() {
      2 == this.ka && this.G(), this.c.p("timeupdate", u.bind(this, this.update, this.T)), this.c.p("ended", u.bind(this, this.reset, this.T)), this.reset(), this.c.ja("textTrackDisplay").removeChild(this), this.ka = 0
    }, t.load = function() {
      0 === this.la && (this.la = 1, u.get(this.Fc, u.bind(this, this.Ed), u.bind(this, this.yd)))
    }, t.yd = function(t) {
      this.error = t, this.la = 3, this.k("error")
    }, t.Ed = function(t) {
      var e, i;
      t = t.split("\n");
      for (var n = "", r = 1, o = t.length; o > r; r++)
        if (n = u.trim(t[r])) {
          for (-1 == n.indexOf("-->") ? (e = n, n = u.trim(t[++r])) : e = this.aa.length, e = {
              id: e,
              index: this.aa.length
            }, i = n.split(" --> "), e.startTime = qa(i[0]), e.xa = qa(i[1]), i = []; t[++r] && (n = u.trim(t[r]));) i.push(n);
          e.text = i.join("<br/>"), this.aa.push(e)
        }
      this.la = 2, this.k("loaded")
    }, t.update = function() {
      if (0 < this.aa.length) {
        var t = this.c.options().trackTimeOffset || 0,
          t = this.c.currentTime() + t;
        if (this.Ob === b || t < this.Ob || this.Ta <= t) {
          var e, i, n, r, o = this.aa,
            s = this.c.duration(),
            a = 0,
            u = l,
            c = [];
          for (t >= this.Ta || this.Ta === b ? r = this.zb !== b ? this.zb : 0 : (u = f, r = this.Gb !== b ? this.Gb : o.length - 1);;) {
            if (n = o[r], n.xa <= t) a = Math.max(a, n.xa), n.Ma && (n.Ma = l);
            else if (t < n.startTime) {
              if (s = Math.min(s, n.startTime), n.Ma && (n.Ma = l), !u) break
            } else u ? (c.splice(0, 0, n), i === b && (i = r), e = r) : (c.push(n), e === b && (e = r), i = r), s = Math.min(s, n.xa), a = Math.max(a, n.startTime), n.Ma = f;
            if (u) {
              if (0 === r) break;
              r--
            } else {
              if (r === o.length - 1) break;
              r++
            }
          }
          for (this.qb = c, this.Ta = s, this.Ob = a, this.zb = e, this.Gb = i, e = this.qb, i = "", t = 0, o = e.length; o > t; t++) i += '<span class="vjs-tt-cue">' + e[t].text + "</span>";
          this.b.innerHTML = i, this.k("cuechange")
        }
      }
    }, t.reset = function() {
      this.Ta = 0, this.Ob = this.c.duration(), this.Gb = this.zb = 0
    }, u.Vb = u.C.extend(), u.Vb.prototype.H = "captions", u.dc = u.C.extend(), u.dc.prototype.H = "subtitles", u.Wb = u.C.extend(), u.Wb.prototype.H = "chapters", u.fc = u.a.extend({
      h: function(t, e, i) {
        if (u.a.call(this, t, e, i), t.j.tracks && 0 < t.j.tracks.length) {
          e = this.c, t = t.j.tracks;
          for (var n = 0; n < t.length; n++) i = t[n], na(e, i.kind, i.label, i.language, i)
        }
      }
    }), u.fc.prototype.e = function() {
      return u.a.prototype.e.call(this, "div", {
        className: "vjs-text-track-display"
      })
    }, u.Z = u.I.extend({
      h: function(t, e) {
        var i = this.ea = e.track;
        e.label = i.label(), e.selected = i.Qa(), u.I.call(this, t, e), this.c.d(i.K() + "trackchange", u.bind(this, this.update))
      }
    }), u.Z.prototype.q = function() {
      u.I.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
    }, u.Z.prototype.update = function() {
      this.selected(2 == this.ea.mode())
    }, u.jb = u.Z.extend({
      h: function(t, e) {
        e.track = {
          K: function() {
            return e.kind
          },
          m: t,
          label: function() {
            return e.kind + " off"
          },
          Qa: r(l),
          mode: r(l)
        }, u.Z.call(this, t, e), this.selected(f)
      }
    }), u.jb.prototype.q = function() {
      u.Z.prototype.q.call(this), oa(this.c, this.ea.T, this.ea.K())
    }, u.jb.prototype.update = function() {
      for (var t, e = this.c.textTracks(), i = 0, n = e.length, r = f; n > i; i++) t = e[i], t.K() == this.ea.K() && 2 == t.mode() && (r = l);
      this.selected(r)
    }, u.U = u.L.extend({
      h: function(t, e) {
        u.L.call(this, t, e), 1 >= this.O.length && this.G()
      }
    }), u.U.prototype.ua = function() {
      var t, e = [];
      e.push(new u.jb(this.c, {
        kind: this.H
      }));
      for (var i = 0; i < this.c.textTracks().length; i++) t = this.c.textTracks()[i], t.K() === this.H && e.push(new u.Z(this.c, {
        track: t
      }));
      return e
    }, u.Fa = u.U.extend({
      h: function(t, e, i) {
        u.U.call(this, t, e, i), this.b.setAttribute("aria-label", "Captions Menu")
      }
    }), u.Fa.prototype.H = "captions", u.Fa.prototype.sa = "Captions", u.Fa.prototype.className = "vjs-captions-button", u.La = u.U.extend({
      h: function(t, e, i) {
        u.U.call(this, t, e, i), this.b.setAttribute("aria-label", "Subtitles Menu")
      }
    }), u.La.prototype.H = "subtitles", u.La.prototype.sa = "Subtitles", u.La.prototype.className = "vjs-subtitles-button", u.Ga = u.U.extend({
      h: function(t, e, i) {
        u.U.call(this, t, e, i), this.b.setAttribute("aria-label", "Chapters Menu")
      }
    }), t = u.Ga.prototype, t.H = "chapters", t.sa = "Chapters", t.className = "vjs-chapters-button", t.ua = function() {
      for (var t, e = [], i = 0; i < this.c.textTracks().length; i++) t = this.c.textTracks()[i], t.K() === this.H && e.push(new u.Z(this.c, {
        track: t
      }));
      return e
    }, t.va = function() {
      for (var t, e, i = this.c.textTracks(), n = 0, r = i.length, o = this.O = []; r > n; n++)
        if (t = i[n], t.K() == this.H && t.Qa()) {
          if (2 > t.readyState()) return this.ae = t, void t.d("loaded", u.bind(this, this.va));
          e = t;
          break
        }
      if (i = this.za = new u.ga(this.c), i.ia().appendChild(u.e("li", {
          className: "vjs-menu-title",
          innerHTML: u.$(this.H),
          Rd: -1
        })), e) {
        t = e.aa;
        for (var s, n = 0, r = t.length; r > n; n++) s = t[n], s = new u.cb(this.c, {
          track: e,
          cue: s
        }), o.push(s), i.V(s)
      }
      return 0 < this.O.length && this.show(), i
    }, u.cb = u.I.extend({
      h: function(t, e) {
        var i = this.ea = e.track,
          n = this.cue = e.cue,
          r = t.currentTime();
        e.label = n.text, e.selected = n.startTime <= r && r < n.xa, u.I.call(this, t, e), i.d("cuechange", u.bind(this, this.update))
      }
    }), u.cb.prototype.q = function() {
      u.I.prototype.q.call(this), this.c.currentTime(this.cue.startTime), this.update(this.cue.startTime)
    }, u.cb.prototype.update = function() {
      var t = this.cue,
        e = this.c.currentTime();
      this.selected(t.startTime <= e && e < t.xa)
    }, u.l.B(u.Ha.prototype.j.children, {
      subtitlesButton: {},
      captionsButton: {},
      chaptersButton: {}
    }), "undefined" != typeof window.JSON && "function" === window.JSON.parse) u.JSON = window.JSON;
  else {
    u.JSON = {};
    var Z = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    u.JSON.parse = function(a, c) {
      function d(t, e) {
        var i, n, r = t[e];
        if (r && "object" == typeof r)
          for (i in r) Object.prototype.hasOwnProperty.call(r, i) && (n = d(r, i), n !== b ? r[i] = n : delete r[i]);
        return c.call(t, e, r)
      }
      var e;
      if (a = String(a), Z.lastIndex = 0, Z.test(a) && (a = a.replace(Z, function(t) {
          return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return e = eval("(" + a + ")"), "function" == typeof c ? d({
        "": e
      }, "") : e;
      throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
    }
  }
  u.ic = function() {
    var t, e, i = document.getElementsByTagName("video");
    if (i && 0 < i.length)
      for (var n = 0, r = i.length; r > n; n++) {
        if (!(e = i[n]) || !e.getAttribute) {
          u.rb();
          break
        }
        e.player === b && (t = e.getAttribute("data-setup"), t !== j && (t = u.JSON.parse(t || "{}"), videojs(e, t)))
      } else u.Oc || u.rb()
  }, u.rb = function() {
    setTimeout(u.ic, 1)
  }, "complete" === document.readyState ? u.Oc = f : u.W(window, "load", function() {
    u.Oc = f
  }), u.rb(), u.Gd = function(t, e) {
    u.Player.prototype[t] = e
  };
  var ra = this;
  ra.Xd = f, $("videojs", u), $("_V_", u), $("videojs.options", u.options), $("videojs.players", u.Aa), $("videojs.TOUCH_ENABLED", u.ec), $("videojs.cache", u.ta), $("videojs.Component", u.a), u.a.prototype.player = u.a.prototype.m, u.a.prototype.options = u.a.prototype.options, u.a.prototype.init = u.a.prototype.h, u.a.prototype.dispose = u.a.prototype.dispose, u.a.prototype.createEl = u.a.prototype.e, u.a.prototype.contentEl = u.a.prototype.ia, u.a.prototype.el = u.a.prototype.w, u.a.prototype.addChild = u.a.prototype.V, u.a.prototype.getChild = u.a.prototype.ja, u.a.prototype.getChildById = u.a.prototype.qd, u.a.prototype.children = u.a.prototype.children, u.a.prototype.initChildren = u.a.prototype.uc, u.a.prototype.removeChild = u.a.prototype.removeChild, u.a.prototype.on = u.a.prototype.d, u.a.prototype.off = u.a.prototype.p, u.a.prototype.one = u.a.prototype.W, u.a.prototype.trigger = u.a.prototype.k, u.a.prototype.triggerReady = u.a.prototype.Ea, u.a.prototype.show = u.a.prototype.show, u.a.prototype.hide = u.a.prototype.G, u.a.prototype.width = u.a.prototype.width, u.a.prototype.height = u.a.prototype.height, u.a.prototype.dimensions = u.a.prototype.jd, u.a.prototype.ready = u.a.prototype.J, u.a.prototype.addClass = u.a.prototype.o, u.a.prototype.removeClass = u.a.prototype.r, u.a.prototype.buildCSSClass = u.a.prototype.S, u.Player.prototype.ended = u.Player.prototype.ended, $("videojs.MediaLoader", u.Xc), $("videojs.TextTrackDisplay", u.fc), $("videojs.ControlBar", u.Ha), $("videojs.Button", u.s), $("videojs.PlayToggle", u.ac), $("videojs.FullscreenToggle", u.Ia), $("videojs.BigPlayButton", u.bb), $("videojs.LoadingSpinner", u.Zb), $("videojs.CurrentTimeDisplay", u.eb), $("videojs.DurationDisplay", u.fb), $("videojs.TimeDivider", u.gc), $("videojs.RemainingTimeDisplay", u.mb), $("videojs.LiveDisplay", u.Yb), $("videojs.ErrorDisplay", u.gb), $("videojs.Slider", u.Q), $("videojs.ProgressControl", u.lb), $("videojs.SeekBar", u.cc), $("videojs.LoadProgressBar", u.ib), $("videojs.PlayProgressBar", u.$b), $("videojs.SeekHandle", u.Ka), $("videojs.VolumeControl", u.ob), $("videojs.VolumeBar", u.nb), $("videojs.VolumeLevel", u.hc), $("videojs.VolumeMenuButton", u.qa), $("videojs.VolumeHandle", u.pb), $("videojs.MuteToggle", u.ha), $("videojs.PosterImage", u.Ja), $("videojs.Menu", u.ga), $("videojs.MenuItem", u.I), $("videojs.MenuButton", u.L), $("videojs.PlaybackRateMenuButton", u.bc), u.L.prototype.createItems = u.L.prototype.ua, u.U.prototype.createItems = u.U.prototype.ua, u.Ga.prototype.createItems = u.Ga.prototype.ua, $("videojs.SubtitlesButton", u.La), $("videojs.CaptionsButton", u.Fa), $("videojs.ChaptersButton", u.Ga), $("videojs.MediaTechController", u.t), u.t.prototype.features = u.t.prototype.n, u.t.prototype.n.volumeControl = u.t.prototype.n.Nc, u.t.prototype.n.fullscreenResize = u.t.prototype.n.be, u.t.prototype.n.progressEvents = u.t.prototype.n.fe, u.t.prototype.n.timeupdateEvents = u.t.prototype.n.ie, u.t.prototype.setPoster = u.t.prototype.Pb, $("videojs.Html5", u.f), u.f.Events = u.f.hb, u.f.isSupported = u.f.isSupported, u.f.canPlaySource = u.f.tb, u.f.patchCanPlayType = u.f.zc, u.f.unpatchCanPlayType = u.f.Ud, u.f.prototype.setCurrentTime = u.f.prototype.Jd, u.f.prototype.setVolume = u.f.prototype.Pd, u.f.prototype.setMuted = u.f.prototype.Md, u.f.prototype.setPreload = u.f.prototype.Od, u.f.prototype.setAutoplay = u.f.prototype.Id, u.f.prototype.setLoop = u.f.prototype.Ld, u.f.prototype.enterFullScreen = u.f.prototype.nc, u.f.prototype.exitFullScreen = u.f.prototype.nd, u.f.prototype.playbackRate = u.f.prototype.playbackRate, u.f.prototype.setPlaybackRate = u.f.prototype.Nd, $("videojs.Flash", u.i), u.i.isSupported = u.i.isSupported, u.i.canPlaySource = u.i.tb, u.i.onReady = u.i.onReady, $("videojs.TextTrack", u.C), u.C.prototype.label = u.C.prototype.label, u.C.prototype.kind = u.C.prototype.K, u.C.prototype.mode = u.C.prototype.mode, u.C.prototype.cues = u.C.prototype.ed, u.C.prototype.activeCues = u.C.prototype.Zc, $("videojs.CaptionsTrack", u.Vb), $("videojs.SubtitlesTrack", u.dc), $("videojs.ChaptersTrack", u.Wb), $("videojs.autoSetup", u.ic), $("videojs.plugin", u.Gd), $("videojs.createTimeRange", u.yb), $("videojs.util", u.oa), u.oa.mergeOptions = u.oa.Jb
}(),
function() {
  "use strict";

  function t() {}

  function e(t, e) {
    for (var i = t.length; i--;)
      if (t[i].listener === e) return i;
    return -1
  }

  function i(t) {
    return function() {
      return this[t].apply(this, arguments)
    }
  }
  var n = t.prototype;
  n.getListeners = function(t) {
    var e, i, n = this._getEvents();
    if ("object" == typeof t) {
      e = {};
      for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
    } else e = n[t] || (n[t] = []);
    return e
  }, n.flattenListeners = function(t) {
    var e, i = [];
    for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
    return i
  }, n.getListenersAsObject = function(t) {
    var e, i = this.getListeners(t);
    return i instanceof Array && (e = {}, e[t] = i), e || i
  }, n.addListener = function(t, i) {
    var n, r = this.getListenersAsObject(t),
      o = "object" == typeof i;
    for (n in r) r.hasOwnProperty(n) && -1 === e(r[n], i) && r[n].push(o ? i : {
      listener: i,
      once: !1
    });
    return this
  }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
    return this.addListener(t, {
      listener: e,
      once: !0
    })
  }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
    return this.getListeners(t), this
  }, n.defineEvents = function(t) {
    for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
    return this
  }, n.removeListener = function(t, i) {
    var n, r, o = this.getListenersAsObject(t);
    for (r in o) o.hasOwnProperty(r) && (n = e(o[r], i), -1 !== n && o[r].splice(n, 1));
    return this
  }, n.off = i("removeListener"), n.addListeners = function(t, e) {
    return this.manipulateListeners(!1, t, e)
  }, n.removeListeners = function(t, e) {
    return this.manipulateListeners(!0, t, e)
  }, n.manipulateListeners = function(t, e, i) {
    var n, r, o = t ? this.removeListener : this.addListener,
      s = t ? this.removeListeners : this.addListeners;
    if ("object" != typeof e || e instanceof RegExp)
      for (n = i.length; n--;) o.call(this, e, i[n]);
    else
      for (n in e) e.hasOwnProperty(n) && (r = e[n]) && ("function" == typeof r ? o.call(this, n, r) : s.call(this, n, r));
    return this
  }, n.removeEvent = function(t) {
    var e, i = typeof t,
      n = this._getEvents();
    if ("string" === i) delete n[t];
    else if ("object" === i)
      for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
    else delete this._events;
    return this
  }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
    var i, n, r, o, s = this.getListenersAsObject(t);
    for (r in s)
      if (s.hasOwnProperty(r))
        for (n = s[r].length; n--;) i = s[r][n], i.once === !0 && this.removeListener(t, i.listener), o = i.listener.apply(this, e || []), o === this._getOnceReturnValue() && this.removeListener(t, i.listener);
    return this
  }, n.trigger = i("emitEvent"), n.emit = function(t) {
    var e = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(t, e)
  }, n.setOnceReturnValue = function(t) {
    return this._onceReturnValue = t, this
  }, n._getOnceReturnValue = function() {
    return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
  }, n._getEvents = function() {
    return this._events || (this._events = {})
  }, "function" == typeof define && define.amd ? define(function() {
    return t
  }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}.call(this),
  function(t) {
    "use strict";

    function e(t, e) {
      for (var i in e) t[i] = e[i];
      return t
    }

    function i(t) {
      return "[object Array]" === u.call(t)
    }

    function n(t) {
      var e = [];
      if (i(t)) e = t;
      else if ("number" == typeof t.length)
        for (var n = 0, r = t.length; r > n; n++) e.push(t[n]);
      else e.push(t);
      return e
    }

    function r(t, i) {
      function r(t, i, s) {
        if (!(this instanceof r)) return new r(t, i);
        "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = e({}, this.options), "function" == typeof i ? s = i : e(this.options, i), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred);
        var a = this;
        setTimeout(function() {
          a.check()
        })
      }

      function u(t) {
        this.img = t
      }
      r.prototype = new t, r.prototype.options = {}, r.prototype.getImages = function() {
        this.images = [];
        for (var t = 0, e = this.elements.length; e > t; t++) {
          var i = this.elements[t];
          "IMG" === i.nodeName && this.addImage(i);
          for (var n = i.querySelectorAll("img"), r = 0, o = n.length; o > r; r++) {
            var s = n[r];
            this.addImage(s)
          }
        }
      }, r.prototype.addImage = function(t) {
        var e = new u(t);
        this.images.push(e)
      }, r.prototype.check = function() {
        function t(t, r) {
          return e.options.debug && a && s.log("confirm", t, r), e.progress(t), i++, i === n && e.complete(), !0
        }
        var e = this,
          i = 0,
          n = this.images.length;
        if (this.hasAnyBroken = !1, !n) return void this.complete();
        for (var r = 0; n > r; r++) {
          var o = this.images[r];
          o.on("confirm", t), o.check()
        }
      }, r.prototype.progress = function(t) {
        this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded;
        var e = this;
        setTimeout(function() {
          e.emit("progress", e, t), e.jqDeferred && e.jqDeferred.notify(e, t)
        })
      }, r.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var e = this;
        setTimeout(function() {
          if (e.emit(t, e), e.emit("always", e), e.jqDeferred) {
            var i = e.hasAnyBroken ? "reject" : "resolve";
            e.jqDeferred[i](e)
          }
        })
      }, o && (o.fn.imagesLoaded = function(t, e) {
        var i = new r(this, t, e);
        return i.jqDeferred.promise(o(this))
      });
      var l = {};
      return u.prototype = new t, u.prototype.check = function() {
        var t = l[this.img.src];
        if (t) return void this.useCached(t);
        if (l[this.img.src] = this, this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var e = this.proxyImage = new Image;
        i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.img.src
      }, u.prototype.useCached = function(t) {
        if (t.isConfirmed) this.confirm(t.isLoaded, "cached was confirmed");
        else {
          var e = this;
          t.on("confirm", function(t) {
            return e.confirm(t.isLoaded, "cache emitted confirmed"), !0
          })
        }
      }, u.prototype.confirm = function(t, e) {
        this.isConfirmed = !0, this.isLoaded = t, this.emit("confirm", this, e)
      }, u.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
      }, u.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindProxyEvents()
      }, u.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindProxyEvents()
      }, u.prototype.unbindProxyEvents = function() {
        i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this)
      }, r
    }
    var o = t.jQuery,
      s = t.console,
      a = "undefined" != typeof s,
      u = Object.prototype.toString;
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], r) : t.imagesLoaded = r(t.EventEmitter, t.eventie)
  }(window),
  function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery", "videojs", "imagesloaded", "jquery-ui"], t) : t(jQuery, videojs)
  }(function(t, e) {
    t.BigVideo = function(i) {
      function n() {
        var e = S.container.outerWidth() < t(window).width() ? S.container.outerWidth() : t(window).width(),
          i = S.container.outerHeight() < t(window).height() ? S.container.outerHeight() : t(window).height(),
          n = e / i;
        S.container.is(t("body")) && t("html,body").css("height", t(window).height() > t("body").css("height", "auto").height() ? "100%" : "auto"), v > n ? "video" == d ? (c.width(i * v).height(i), S.shrinkable ? t(m).css("top", -(e / v - i) / 2).css("left", 0).css("height", e / v) : t(m).css("top", 0).css("left", -(i * v - e) / 2).css("height", i), t(m + "_html5_api").css("width", i * v).css("height", i), t(m + "_flash_api").css("width", i * v).css("height", i)) : t("#big-video-image").css({
          width: "auto",
          height: i,
          top: 0,
          left: -(i * v - e) / 2
        }) : "video" == d ? (c.width(e).height(e / v), t(m).css("top", -(e / v - i) / 2).css("left", 0).css("height", e / v), t(m + "_html5_api").css("width", t(m + "_html5_api").parent().width() + "px").css("height", "auto"), t(m + "_flash_api").css("width", e).css("height", e / v)) : t("#big-video-image").css({
          width: e,
          height: "auto",
          top: -(e / v - i) / 2,
          left: 0
        })
      }

      function r() {
        var e = '<div id="big-video-control-container"><div id="big-video-control"><a href="#" id="big-video-control-play"></a><div id="big-video-control-middle"><div id="big-video-control-bar"><div id="big-video-control-bound-left"></div><div id="big-video-control-progress"></div><div id="big-video-control-track"></div><div id="big-video-control-bound-right"></div></div></div>	<div id="big-video-control-timer"></div></div></div>';
        S.container.append(e), t("#big-video-control-container").css("display", "none"), t("#big-video-control-timer").css("display", "none"), t("#big-video-control-track").slider({
          animate: !0,
          step: .01,
          slide: function(e, i) {
            x = !0, t("#big-video-control-progress").css("width", i.value - .16 + "%"), c.currentTime(i.value / 100 * c.duration())
          },
          stop: function(t, e) {
            x = !1, c.currentTime(e.value / 100 * c.duration())
          }
        }), t("#big-video-control-bar").click(function(e) {
          c.currentTime(e.offsetX / t(this).width() * c.duration())
        }), t("#big-video-control-play").click(function(t) {
          t.preventDefault(), o("toggle")
        }), c.on("timeupdate", function() {
          if (!x && c.currentTime() / c.duration()) {
            var e = c.currentTime(),
              i = Math.floor(e / 60),
              n = Math.floor(e) - 60 * i;
            10 > n && (n = "0" + n);
            var r = c.currentTime() / c.duration() * 100;
            t("#big-video-control-track").slider("value", r), t("#big-video-control-progress").css("width", r - .16 + "%"), t("#big-video-control-timer").text(i + ":" + n + "/" + y)
          }
        })
      }

      function o(e) {
        var i = e || "toggle";
        "toggle" == i && (i = _ ? "pause" : "play"), "pause" == i ? (c.pause(), t("#big-video-control-play").css("background-position", "-16px"), _ = !1) : "play" == i ? (c.play(), t("#big-video-control-play").css("background-position", "0"), _ = !0) : "skip" == i && a()
      }

      function s() {
        c.play(), S.container.off("click", s)
      }

      function a() {
        h++, h === C.length && (h = 0), u(C[h])
      }

      function u(e) {
        t(m).css("display", "block"), d = "video", c.src(e), _ = !0, T ? (t("#big-video-control-container").css("display", "none"), c.ready(function() {
          c.volume(0)
        }), doLoop = !0) : (t("#big-video-control-container").css("display", "block"), c.ready(function() {
          c.volume(b)
        }), doLoop = !1), t("#big-video-image").css("display", "none"), t(m).css("display", "block")
      }

      function l(e) {
        t("#big-video-image").remove(), c.pause(), t(m).css("display", "none"), t("#big-video-control-container").css("display", "none"), d = "image";
        var i = t('<img id="big-video-image" src=' + e + " />");
        g.append(i), t("#big-video-image").imagesLoaded(function() {
          v = t("#big-video-image").width() / t("#big-video-image").height(), n()
        })
      }
      var c, h, d, p = {
          useFlashForFirefox: !0,
          forceAutoplay: !1,
          controls: !1,
          doLoop: !1,
          container: t("body"),
          shrinkable: !1
        },
        f = {},
        m = "#big-video-vid",
        g = t('<div id="big-video-wrap"></div>'),
        v = (t(""), 16 / 9),
        y = 0,
        b = .8,
        w = !1,
        x = !1,
        _ = !1,
        k = !1,
        T = !1,
        C = [],
        S = t.extend({}, p, i);
      return f.init = function() {
        if (!w) {
          S.container.prepend(g);
          var i = S.forceAutoplay ? "autoplay" : "";
          c = t('<video id="' + m.substr(1) + '" class="video-js vjs-default-skin" height="1" width="1" preload="auto" data-setup="{}" ' + i + " webkit-playsinline></video>"), c.css("position", "absolute"), g.append(c);
          var o = ["html5", "flash"],
            u = navigator.userAgent.toLowerCase(),
            l = -1 != u.indexOf("firefox");
          S.useFlashForFirefox && l && (o = ["flash", "html5"]), c = e(m.substr(1), {
            controls: !1,
            autoplay: !0,
            preload: "auto",
            techOrder: o
          }), S.controls && r(), n(), w = !0, _ = !1, S.forceAutoplay && t("body").on("click", s), t("#big-video-vid_flash_api").attr("scale", "noborder").attr("width", "100%").attr("height", "100%"), t(window).on("resize.bigvideo", function() {
            n()
          }), c.on("loadedmetadata", function(e) {
            v = document.getElementById("big-video-vid_flash_api") ? document.getElementById("big-video-vid_flash_api").vjs_getProperty("videoWidth") / document.getElementById("big-video-vid_flash_api").vjs_getProperty("videoHeight") : t("#big-video-vid_html5_api").prop("videoWidth") / t("#big-video-vid_html5_api").prop("videoHeight"), n();
            var i = Math.round(c.duration()),
              r = Math.floor(i / 60),
              o = i - 60 * r;
            10 > o && (o = "0" + o), y = r + ":" + o
          }), c.on("ended", function() {
            S.doLoop && (c.currentTime(0), c.play()), k && a()
          })
        }
      }, f.show = function(e, i) {
        if (void 0 === i && (i = {}), T = i.ambient === !0, (T || i.doLoop) && (S.doLoop = !0), "string" == typeof e) {
          var n = e.lastIndexOf("?") > 0 ? e.substring(e.lastIndexOf(".") + 1, e.lastIndexOf("?")) : e.substring(e.lastIndexOf(".") + 1);
          "jpg" == n || "gif" == n || "png" == n ? l(e) : ("mp4" == n || "ogg" == n || "ogv" == n || "webm" == n) && (u(e), i.onShown && i.onShown(), k = !1)
        } else if (t.isArray(e)) u(e);
        else {
          if ("object" != typeof e || !e.src || !e.type) throw "BigVideo.show received invalid input for parameter source";
          u([e])
        }
      }, f.showPlaylist = function(e, i) {
        if (!t.isArray(e)) throw "BigVideo.showPlaylist parameter files accepts only arrays";
        void 0 === i && (i = {}), T = i.ambient === !0, (T || i.doLoop) && (S.doLoop = !0), C = e, h = 0, this.show(C[h]), i.onShown && i.onShown(), k = !0
      }, f.getPlayer = function() {
        return c
      }, f.remove = f.dispose = function() {
        w = !1, g.remove(), t(window).off("resize.bigvideo"), c && (c.off("loadedmetadata"), c.off("ended"), c.dispose())
      }, f.triggerPlayer = function(t) {
        o(t)
      }, f
    }
  });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
      var i, n, r, o, s = function() {
          t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
        },
        a = _gsScope._gsDefine.globals,
        u = {},
        l = s.prototype = new t("css");
      l.constructor = s, s.version = "1.15.1", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", l = "px", s.suffixMap = {
        top: l,
        right: l,
        bottom: l,
        left: l,
        width: l,
        height: l,
        fontSize: l,
        padding: l,
        margin: l,
        perspective: l,
        lineHeight: ""
      };
      var c, h, d, p, f, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
        v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        w = /(?:\d|\-|\+|=|#|\.)*/g,
        x = /opacity *= *([^)]*)/i,
        _ = /opacity:([^;]*)/i,
        k = /alpha\(opacity *=.+?\)/i,
        T = /^(rgb|hsl)/,
        C = /([A-Z])/g,
        S = /-([a-z])/gi,
        j = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        F = function(t, e) {
          return e.toUpperCase()
        },
        P = /(?:Left|Right|Width)/i,
        $ = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        E = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        A = /,(?=[^\)]*(?:\(|$))/gi,
        O = Math.PI / 180,
        D = 180 / Math.PI,
        M = {},
        L = document,
        N = function(t) {
          return L.createElementNS ? L.createElementNS("http://www.w3.org/1999/xhtml", t) : L.createElement(t)
        },
        R = N("div"),
        I = N("img"),
        z = s._internals = {
          _specialProps: u
        },
        H = navigator.userAgent,
        q = function() {
          var t = H.indexOf("Android"),
            e = N("a");
          return d = -1 !== H.indexOf("Safari") && -1 === H.indexOf("Chrome") && (-1 === t || Number(H.substr(t + 8, 1)) > 3), f = d && 6 > Number(H.substr(H.indexOf("Version/") + 8, 1)), p = -1 !== H.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(H) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(H)) && (m = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
        }(),
        B = function(t) {
          return x.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        },
        V = function(t) {
          window.console && console.log(t)
        },
        W = "",
        X = "",
        U = function(t, e) {
          e = e || R;
          var i, n, r = e.style;
          if (void 0 !== r[t]) return t;
          for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
          return n >= 0 ? (X = 3 === n ? "ms" : i[n], W = "-" + X.toLowerCase() + "-", X + t) : null
        },
        Y = L.defaultView ? L.defaultView.getComputedStyle : function() {},
        Q = s.getStyle = function(t, e, i, n, r) {
          var o;
          return q || "opacity" !== e ? (!n && t.style[e] ? o = t.style[e] : (i = i || Y(t)) ? o = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(C, "-$1").toLowerCase()) : t.currentStyle && (o = t.currentStyle[e]), null == r || o && "none" !== o && "auto" !== o && "auto auto" !== o ? o : r) : B(t)
        },
        J = z.convertToPixels = function(t, i, n, r, o) {
          if ("px" === r || !r) return n;
          if ("auto" === r || !n) return 0;
          var a, u, l, c = P.test(i),
            h = t,
            d = R.style,
            p = 0 > n;
          if (p && (n = -n), "%" === r && -1 !== i.indexOf("border")) a = n / 100 * (c ? t.clientWidth : t.clientHeight);
          else {
            if (d.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;", "%" !== r && h.appendChild) d[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
            else {
              if (h = t.parentNode || L.body, u = h._gsCache, l = e.ticker.frame, u && c && u.time === l) return u.width * n / 100;
              d[c ? "width" : "height"] = n + r
            }
            h.appendChild(R), a = parseFloat(R[c ? "offsetWidth" : "offsetHeight"]), h.removeChild(R), c && "%" === r && s.cacheWidths !== !1 && (u = h._gsCache = h._gsCache || {}, u.time = l, u.width = 100 * (a / n)), 0 !== a || o || (a = J(t, i, n, r, !0))
          }
          return p ? -a : a
        },
        G = z.calculateOffset = function(t, e, i) {
          if ("absolute" !== Q(t, "position", i)) return 0;
          var n = "left" === e ? "Left" : "Top",
            r = Q(t, "margin" + n, i);
          return t["offset" + n] - (J(t, e, parseFloat(r), r.replace(w, "")) || 0)
        },
        K = function(t, e) {
          var i, n, r = {};
          if (e = e || Y(t, null))
            for (i in e)(-1 === i.indexOf("Transform") || _t === i) && (r[i] = e[i]);
          else if (e = t.currentStyle || t.style)
            for (i in e) "string" == typeof i && void 0 === r[i] && (r[i.replace(S, F)] = e[i]);
          return q || (r.opacity = B(t)), n = At(t, e, !1), r.rotation = n.rotation, r.skewX = n.skewX, r.scaleX = n.scaleX, r.scaleY = n.scaleY, r.x = n.x, r.y = n.y, Ct && (r.z = n.z, r.rotationX = n.rotationX, r.rotationY = n.rotationY, r.scaleZ = n.scaleZ), r.filters && delete r.filters, r
        },
        Z = function(t, e, i, n, r) {
          var o, s, a, u = {},
            l = t.style;
          for (s in i) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (o = i[s]) || r && r[s]) && -1 === s.indexOf("Origin") && ("number" == typeof o || "string" == typeof o) && (u[s] = "auto" !== o || "left" !== s && "top" !== s ? "" !== o && "auto" !== o && "none" !== o || "string" != typeof e[s] || "" === e[s].replace(b, "") ? o : 0 : G(t, s), void 0 !== l[s] && (a = new pt(l, s, l[s], a)));
          if (n)
            for (s in n) "className" !== s && (u[s] = n[s]);
          return {
            difs: u,
            firstMPT: a
          }
        },
        tt = {
          width: ["Left", "Right"],
          height: ["Top", "Bottom"]
        },
        et = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        it = function(t, e, i) {
          var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
            r = tt[e],
            o = r.length;
          for (i = i || Y(t, null); --o > -1;) n -= parseFloat(Q(t, "padding" + r[o], i, !0)) || 0, n -= parseFloat(Q(t, "border" + r[o] + "Width", i, !0)) || 0;
          return n
        },
        nt = function(t, e) {
          (null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
          var i = t.split(" "),
            n = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
            r = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
          return null == r ? r = "center" === n ? "50%" : "0" : "center" === r && (r = "50%"), ("center" === n || isNaN(parseFloat(n)) && -1 === (n + "").indexOf("=")) && (n = "50%"), e && (e.oxp = -1 !== n.indexOf("%"), e.oyp = -1 !== r.indexOf("%"), e.oxr = "=" === n.charAt(1), e.oyr = "=" === r.charAt(1), e.ox = parseFloat(n.replace(b, "")), e.oy = parseFloat(r.replace(b, ""))), n + " " + r + (i.length > 2 ? " " + i[2] : "")
        },
        rt = function(t, e) {
          return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
        },
        ot = function(t, e) {
          return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
        },
        st = function(t, e, i, n) {
          var r, o, s, a, u, l = 1e-6;
          return null == t ? a = e : "number" == typeof t ? a = t : (r = 360, o = t.split("_"), u = "=" === t.charAt(1), s = (u ? parseInt(t.charAt(0) + "1", 10) * parseFloat(o[0].substr(2)) : parseFloat(o[0])) * (-1 === t.indexOf("rad") ? 1 : D) - (u ? 0 : e), o.length && (n && (n[i] = e + s), -1 !== t.indexOf("short") && (s %= r, s !== s % (r / 2) && (s = 0 > s ? s + r : s - r)), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * r) % r - (0 | s / r) * r : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * r) % r - (0 | s / r) * r)), a = e + s), l > a && a > -l && (a = 0), a
        },
        at = {
          aqua: [0, 255, 255],
          lime: [0, 255, 0],
          silver: [192, 192, 192],
          black: [0, 0, 0],
          maroon: [128, 0, 0],
          teal: [0, 128, 128],
          blue: [0, 0, 255],
          navy: [0, 0, 128],
          white: [255, 255, 255],
          fuchsia: [255, 0, 255],
          olive: [128, 128, 0],
          yellow: [255, 255, 0],
          orange: [255, 165, 0],
          gray: [128, 128, 128],
          purple: [128, 0, 128],
          green: [0, 128, 0],
          red: [255, 0, 0],
          pink: [255, 192, 203],
          cyan: [0, 255, 255],
          transparent: [255, 255, 255, 0]
        },
        ut = function(t, e, i) {
          return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
        },
        lt = s.parseColor = function(t) {
          var e, i, n, r, o, s;
          return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t] ? at[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), n = t.charAt(3), t = "#" + e + e + i + i + n + n), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(g), r = Number(t[0]) % 360 / 360, o = Number(t[1]) / 100, s = Number(t[2]) / 100, i = .5 >= s ? s * (o + 1) : s + o - s * o, e = 2 * s - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = ut(r + 1 / 3, e, i), t[1] = ut(r, e, i), t[2] = ut(r - 1 / 3, e, i), t) : (t = t.match(g) || at.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : at.black
        },
        ct = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
      for (l in at) ct += "|" + l + "\\b";
      ct = RegExp(ct + ")", "gi");
      var ht = function(t, e, i, n) {
          if (null == t) return function(t) {
            return t
          };
          var r, o = e ? (t.match(ct) || [""])[0] : "",
            s = t.split(o).join("").match(y) || [],
            a = t.substr(0, t.indexOf(s[0])),
            u = ")" === t.charAt(t.length - 1) ? ")" : "",
            l = -1 !== t.indexOf(" ") ? " " : ",",
            c = s.length,
            h = c > 0 ? s[0].replace(g, "") : "";
          return c ? r = e ? function(t) {
            var e, d, p, f;
            if ("number" == typeof t) t += h;
            else if (n && A.test(t)) {
              for (f = t.replace(A, "|").split("|"), p = 0; f.length > p; p++) f[p] = r(f[p]);
              return f.join(",")
            }
            if (e = (t.match(ct) || [o])[0], d = t.split(e).join("").match(y) || [], p = d.length, c > p--)
              for (; c > ++p;) d[p] = i ? d[0 | (p - 1) / 2] : s[p];
            return a + d.join(l) + l + e + u + (-1 !== t.indexOf("inset") ? " inset" : "")
          } : function(t) {
            var e, o, d;
            if ("number" == typeof t) t += h;
            else if (n && A.test(t)) {
              for (o = t.replace(A, "|").split("|"), d = 0; o.length > d; d++) o[d] = r(o[d]);
              return o.join(",")
            }
            if (e = t.match(y) || [], d = e.length, c > d--)
              for (; c > ++d;) e[d] = i ? e[0 | (d - 1) / 2] : s[d];
            return a + e.join(l) + u
          } : function(t) {
            return t
          }
        },
        dt = function(t) {
          return t = t.split(","),
            function(e, i, n, r, o, s, a) {
              var u, l = (i + "").split(" ");
              for (a = {}, u = 0; 4 > u; u++) a[t[u]] = l[u] = l[u] || l[(u - 1) / 2 >> 0];
              return r.parse(e, a, o, s)
            }
        },
        pt = (z._setPluginRatio = function(t) {
          this.plugin.setRatio(t);
          for (var e, i, n, r, o = this.data, s = o.proxy, a = o.firstMPT, u = 1e-6; a;) e = s[a.v], a.r ? e = Math.round(e) : u > e && e > -u && (e = 0), a.t[a.p] = e, a = a._next;
          if (o.autoRotate && (o.autoRotate.rotation = s.rotation), 1 === t)
            for (a = o.firstMPT; a;) {
              if (i = a.t, i.type) {
                if (1 === i.type) {
                  for (r = i.xs0 + i.s + i.xs1, n = 1; i.l > n; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                  i.e = r
                }
              } else i.e = i.s + i.xs0;
              a = a._next
            }
        }, function(t, e, i, n, r) {
          this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
        }),
        ft = (z._parseToProxy = function(t, e, i, n, r, o) {
          var s, a, u, l, c, h = n,
            d = {},
            p = {},
            f = i._transform,
            m = M;
          for (i._transform = null, M = e, n = c = i.parse(t, e, n, r), M = m, o && (i._transform = f, h && (h._prev = null, h._prev && (h._prev._next = null))); n && n !== h;) {
            if (1 >= n.type && (a = n.p, p[a] = n.s + n.c, d[a] = n.s, o || (l = new pt(n, "s", a, l, n.r), n.c = 0), 1 === n.type))
              for (s = n.l; --s > 0;) u = "xn" + s, a = n.p + "_" + u, p[a] = n.data[u], d[a] = n[u], o || (l = new pt(n, u, a, l, n.rxp[u]));
            n = n._next
          }
          return {
            proxy: d,
            end: p,
            firstMPT: l,
            pt: c
          }
        }, z.CSSPropTween = function(t, e, n, r, s, a, u, l, c, h, d) {
          this.t = t, this.p = e, this.s = n, this.c = r, this.n = u || e, t instanceof ft || o.push(this.n), this.r = l, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === h ? n : h, this.e = void 0 === d ? n + r : d, s && (this._next = s, s._prev = this)
        }),
        mt = s.parseComplex = function(t, e, i, n, r, o, s, a, u, l) {
          i = i || o || "", s = new ft(t, e, 0, 0, s, l ? 2 : 1, null, !1, a, i, n), n += "";
          var h, d, p, f, m, y, b, w, x, _, k, C, S = i.split(", ").join(",").split(" "),
            j = n.split(", ").join(",").split(" "),
            F = S.length,
            P = c !== !1;
          for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (S = S.join(" ").replace(A, ", ").split(" "), j = j.join(" ").replace(A, ", ").split(" "), F = S.length), F !== j.length && (S = (o || "").split(" "), F = S.length), s.plugin = u, s.setRatio = l, h = 0; F > h; h++)
            if (f = S[h], m = j[h], w = parseFloat(f), w || 0 === w) s.appendXtra("", w, rt(m, w), m.replace(v, ""), P && -1 !== m.indexOf("px"), !0);
            else if (r && ("#" === f.charAt(0) || at[f] || T.test(f))) C = "," === m.charAt(m.length - 1) ? ")," : ")", f = lt(f), m = lt(m), x = f.length + m.length > 6, x && !q && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(j[h]).join("transparent")) : (q || (x = !1), s.appendXtra(x ? "rgba(" : "rgb(", f[0], m[0] - f[0], ",", !0, !0).appendXtra("", f[1], m[1] - f[1], ",", !0).appendXtra("", f[2], m[2] - f[2], x ? "," : C, !0), x && (f = 4 > f.length ? 1 : f[3], s.appendXtra("", f, (4 > m.length ? 1 : m[3]) - f, C, !1)));
          else if (y = f.match(g)) {
            if (b = m.match(v), !b || b.length !== y.length) return s;
            for (p = 0, d = 0; y.length > d; d++) k = y[d], _ = f.indexOf(k, p), s.appendXtra(f.substr(p, _ - p), Number(k), rt(b[d], k), "", P && "px" === f.substr(_ + k.length, 2), 0 === d), p = _ + k.length;
            s["xs" + s.l] += f.substr(p)
          } else s["xs" + s.l] += s.l ? " " + f : f;
          if (-1 !== n.indexOf("=") && s.data) {
            for (C = s.xs0 + s.data.s, h = 1; s.l > h; h++) C += s["xs" + h] + s.data["xn" + h];
            s.e = C + s["xs" + h]
          }
          return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
        },
        gt = 9;
      for (l = ft.prototype, l.l = l.pr = 0; --gt > 0;) l["xn" + gt] = 0, l["xs" + gt] = "";
      l.xs0 = "", l._next = l._prev = l.xfirst = l.data = l.plugin = l.setRatio = l.rxp = null, l.appendXtra = function(t, e, i, n, r, o) {
        var s = this,
          a = s.l;
        return s["xs" + a] += o && a ? " " + t : t || "", i || 0 === a || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = n || "", a > 0 ? (s.data["xn" + a] = e + i, s.rxp["xn" + a] = r, s["xn" + a] = e, s.plugin || (s.xfirst = new ft(s, "xn" + a, e, i, s.xfirst || s, 0, s.n, r, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {
          s: e + i
        }, s.rxp = {}, s.s = e, s.c = i, s.r = r, s)) : (s["xs" + a] += e + (n || ""), s)
      };
      var vt = function(t, e) {
          e = e || {}, this.p = e.prefix ? U(t) || t : t, u[t] = u[this.p] = this, this.format = e.formatter || ht(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        },
        yt = z._registerComplexSpecialProp = function(t, e, i) {
          "object" != typeof e && (e = {
            parser: i
          });
          var n, r, o = t.split(","),
            s = e.defaultValue;
          for (i = i || [s], n = 0; o.length > n; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, r = new vt(o[n], e)
        },
        bt = function(t) {
          if (!u[t]) {
            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
            yt(t, {
              parser: function(t, i, n, r, o, s, l) {
                var c = a.com.greensock.plugins[e];
                return c ? (c._cssRegister(), u[n].parse(t, i, n, r, o, s, l)) : (V("Error: " + e + " js file not loaded."), o)
              }
            })
          }
        };
      l = vt.prototype, l.parseComplex = function(t, e, i, n, r, o) {
        var s, a, u, l, c, h, d = this.keyword;
        if (this.multi && (A.test(i) || A.test(e) ? (a = e.replace(A, "|").split("|"), u = i.replace(A, "|").split("|")) : d && (a = [e], u = [i])), u) {
          for (l = u.length > a.length ? u.length : a.length, s = 0; l > s; s++) e = a[s] = a[s] || this.dflt, i = u[s] = u[s] || this.dflt, d && (c = e.indexOf(d), h = i.indexOf(d), c !== h && (i = -1 === h ? u : a, i[s] += " " + d));
          e = a.join(", "), i = u.join(", ")
        }
        return mt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, o)
      }, l.parse = function(t, e, i, n, o, s) {
        return this.parseComplex(t.style, this.format(Q(t, this.p, r, !1, this.dflt)), this.format(e), o, s)
      }, s.registerSpecialProp = function(t, e, i) {
        yt(t, {
          parser: function(t, n, r, o, s, a) {
            var u = new ft(t, r, 0, 0, s, 2, r, !1, i);
            return u.plugin = a, u.setRatio = e(t, n, o._tween, r), u
          },
          priority: i
        })
      };
      var wt, xt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        _t = U("transform"),
        kt = W + "transform",
        Tt = U("transformOrigin"),
        Ct = null !== U("perspective"),
        St = z.Transform = function() {
          this.perspective = parseFloat(s.defaultTransformPerspective) || 0, this.force3D = s.defaultForce3D !== !1 && Ct ? s.defaultForce3D || "auto" : !1
        },
        jt = window.SVGElement,
        Ft = function(t, e, i) {
          var n, r = L.createElementNS("http://www.w3.org/2000/svg", t),
            o = /([a-z])([A-Z])/g;
          for (n in i) r.setAttributeNS(null, n.replace(o, "$1-$2").toLowerCase(), i[n]);
          return e.appendChild(r), r
        },
        Pt = document.documentElement,
        $t = function() {
          var t, e, i, n = m || /Android/i.test(H) && !window.chrome;
          return L.createElementNS && !n && (t = Ft("svg", Pt), e = Ft("rect", t, {
            width: 100,
            height: 50,
            x: 100
          }), i = e.getBoundingClientRect().width, e.style[Tt] = "50% 50%", e.style[_t] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(p && Ct), Pt.removeChild(t)), n
        }(),
        Et = function(t, e, i) {
          var n = t.getBBox();
          e = nt(e).split(" "), i.xOrigin = (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * n.width : parseFloat(e[0])) + n.x, i.yOrigin = (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * n.height : parseFloat(e[1])) + n.y
        },
        At = z.getTransform = function(t, e, i, n) {
          if (t._gsTransform && i && !n) return t._gsTransform;
          var o, a, u, l, c, h, d, p, f, m, g = i ? t._gsTransform || new St : new St,
            v = 0 > g.scaleX,
            y = 2e-5,
            b = 1e5,
            w = Ct ? parseFloat(Q(t, Tt, e, !1, "0 0 0").split(" ")[2]) || g.zOrigin || 0 : 0,
            x = parseFloat(s.defaultTransformPerspective) || 0;
          if (_t ? a = Q(t, kt, e, !0) : t.currentStyle && (a = t.currentStyle.filter.match($), a = a && 4 === a.length ? [a[0].substr(4), Number(a[2].substr(4)), Number(a[1].substr(4)), a[3].substr(4), g.x || 0, g.y || 0].join(",") : ""), o = !a || "none" === a || "matrix(1, 0, 0, 1, 0, 0)" === a, g.svg = !!(jt && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM)), g.svg && (Et(t, Q(t, Tt, r, !1, "50% 50%") + "", g), wt = s.useSVGTransformAttr || $t, u = t.getAttribute("transform"), o && u && -1 !== u.indexOf("matrix") && (a = u, o = 0)), !o) {
            for (u = (a || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], l = u.length; --l > -1;) c = Number(u[l]), u[l] = (h = c - (c |= 0)) ? (0 | h * b + (0 > h ? -.5 : .5)) / b + c : c;
            if (16 === u.length) {
              var _, k, T, C, S, j = u[0],
                F = u[1],
                P = u[2],
                E = u[3],
                A = u[4],
                O = u[5],
                M = u[6],
                L = u[7],
                N = u[8],
                R = u[9],
                I = u[10],
                z = u[12],
                H = u[13],
                q = u[14],
                B = u[11],
                V = Math.atan2(M, I);
              g.zOrigin && (q = -g.zOrigin, z = N * q - u[12], H = R * q - u[13], q = I * q + g.zOrigin - u[14]), g.rotationX = V * D, V && (C = Math.cos(-V), S = Math.sin(-V), _ = A * C + N * S, k = O * C + R * S, T = M * C + I * S, N = A * -S + N * C, R = O * -S + R * C, I = M * -S + I * C, B = L * -S + B * C, A = _, O = k, M = T), V = Math.atan2(N, I), g.rotationY = V * D, V && (C = Math.cos(-V), S = Math.sin(-V), _ = j * C - N * S, k = F * C - R * S, T = P * C - I * S, R = F * S + R * C, I = P * S + I * C, B = E * S + B * C, j = _, F = k, P = T), V = Math.atan2(F, j), g.rotation = V * D, V && (C = Math.cos(-V), S = Math.sin(-V), j = j * C + A * S, k = F * C + O * S, O = F * -S + O * C, M = P * -S + M * C, F = k), g.rotationX && Math.abs(g.rotationX) + Math.abs(g.rotation) > 359.9 && (g.rotationX = g.rotation = 0, g.rotationY += 180), g.scaleX = (0 | Math.sqrt(j * j + F * F) * b + .5) / b, g.scaleY = (0 | Math.sqrt(O * O + R * R) * b + .5) / b, g.scaleZ = (0 | Math.sqrt(M * M + I * I) * b + .5) / b, g.skewX = 0, g.perspective = B ? 1 / (0 > B ? -B : B) : 0, g.x = z, g.y = H, g.z = q
            } else if (!(Ct && !n && u.length && g.x === u[4] && g.y === u[5] && (g.rotationX || g.rotationY) || void 0 !== g.x && "none" === Q(t, "display", e))) {
              var W = u.length >= 6,
                X = W ? u[0] : 1,
                U = u[1] || 0,
                Y = u[2] || 0,
                J = W ? u[3] : 1;
              g.x = u[4] || 0, g.y = u[5] || 0, d = Math.sqrt(X * X + U * U), p = Math.sqrt(J * J + Y * Y), f = X || U ? Math.atan2(U, X) * D : g.rotation || 0, m = Y || J ? Math.atan2(Y, J) * D + f : g.skewX || 0, Math.abs(m) > 90 && 270 > Math.abs(m) && (v ? (d *= -1, m += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (p *= -1, m += 0 >= m ? 180 : -180)), g.scaleX = d, g.scaleY = p, g.rotation = f, g.skewX = m, Ct && (g.rotationX = g.rotationY = g.z = 0, g.perspective = x, g.scaleZ = 1)
            }
            g.zOrigin = w;
            for (l in g) y > g[l] && g[l] > -y && (g[l] = 0)
          }
          return i && (t._gsTransform = g), g
        },
        Ot = function(t) {
          var e, i, n = this.data,
            r = -n.rotation * O,
            o = r + n.skewX * O,
            s = 1e5,
            a = (0 | Math.cos(r) * n.scaleX * s) / s,
            u = (0 | Math.sin(r) * n.scaleX * s) / s,
            l = (0 | Math.sin(o) * -n.scaleY * s) / s,
            c = (0 | Math.cos(o) * n.scaleY * s) / s,
            h = this.t.style,
            d = this.t.currentStyle;
          if (d) {
            i = u, u = -l, l = -i, e = d.filter, h.filter = "";
            var p, f, g = this.t.offsetWidth,
              v = this.t.offsetHeight,
              y = "absolute" !== d.position,
              b = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + u + ", M21=" + l + ", M22=" + c,
              _ = n.x + g * n.xPercent / 100,
              k = n.y + v * n.yPercent / 100;
            if (null != n.ox && (p = (n.oxp ? .01 * g * n.ox : n.ox) - g / 2, f = (n.oyp ? .01 * v * n.oy : n.oy) - v / 2, _ += p - (p * a + f * u), k += f - (p * l + f * c)), y ? (p = g / 2, f = v / 2, b += ", Dx=" + (p - (p * a + f * u) + _) + ", Dy=" + (f - (p * l + f * c) + k) + ")") : b += ", sizingMethod='auto expand')", h.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(E, b) : b + " " + e, (0 === t || 1 === t) && 1 === a && 0 === u && 0 === l && 1 === c && (y && -1 === b.indexOf("Dx=0, Dy=0") || x.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && h.removeAttribute("filter")), !y) {
              var T, C, S, j = 8 > m ? 1 : -1;
              for (p = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > u ? -u : u) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((0 > c ? -c : c) * v + (0 > l ? -l : l) * g)) / 2 + k), gt = 0; 4 > gt; gt++) C = et[gt], T = d[C], i = -1 !== T.indexOf("px") ? parseFloat(T) : J(this.t, C, parseFloat(T), T.replace(w, "")) || 0, S = i !== n[C] ? 2 > gt ? -n.ieOffsetX : -n.ieOffsetY : 2 > gt ? p - n.ieOffsetX : f - n.ieOffsetY, h[C] = (n[C] = Math.round(i - S * (0 === gt || 2 === gt ? 1 : j))) + "px"
            }
          }
        },
        Dt = z.set3DTransformRatio = function(t) {
          var e, i, n, r, o, s, a, u, l, c, h, d, f, m, g, v, y, b, w, x, _, k = this.data,
            T = this.t.style,
            C = k.rotation * O,
            S = k.scaleX,
            j = k.scaleY,
            F = k.scaleZ,
            P = k.x,
            $ = k.y,
            E = k.z,
            A = k.perspective;
          if (!(1 !== t && 0 !== t && k.force3D || k.force3D === !0 || k.rotationY || k.rotationX || 1 !== F || A || E)) return void Mt.call(this, t);
          if (p && (m = 1e-4, m > S && S > -m && (S = F = 2e-5), m > j && j > -m && (j = F = 2e-5), !A || k.z || k.rotationX || k.rotationY || (A = 0)), C || k.skewX) g = e = Math.cos(C), v = r = Math.sin(C), k.skewX && (C -= k.skewX * O, g = Math.cos(C), v = Math.sin(C), "simple" === k.skewType && (y = Math.tan(k.skewX * O), y = Math.sqrt(1 + y * y), g *= y, v *= y)), i = -v, o = g;
          else {
            if (!(k.rotationY || k.rotationX || 1 !== F || A || k.svg)) return void(T[_t] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + P + "px," + $ + "px," + E + "px)" + (1 !== S || 1 !== j ? " scale(" + S + "," + j + ")" : ""));
            e = o = 1, i = r = 0
          }
          l = 1, n = s = a = u = c = h = 0, d = A ? -1 / A : 0, f = k.zOrigin, m = 1e-6, x = ",", _ = "0", C = k.rotationY * O, C && (g = Math.cos(C), v = Math.sin(C), a = -v, c = d * -v, n = e * v, s = r * v, l = g, d *= g, e *= g, r *= g), C = k.rotationX * O, C && (g = Math.cos(C), v = Math.sin(C), y = i * g + n * v, b = o * g + s * v, u = l * v, h = d * v, n = i * -v + n * g, s = o * -v + s * g, l *= g, d *= g, i = y, o = b), 1 !== F && (n *= F, s *= F, l *= F, d *= F), 1 !== j && (i *= j, o *= j, u *= j, h *= j), 1 !== S && (e *= S, r *= S, a *= S, c *= S), (f || k.svg) && (f && (P += n * -f, $ += s * -f, E += l * -f + f), k.svg && (P += k.xOrigin - (k.xOrigin * e + k.yOrigin * i), $ += k.yOrigin - (k.xOrigin * r + k.yOrigin * o)), m > P && P > -m && (P = _), m > $ && $ > -m && ($ = _), m > E && E > -m && (E = 0)), w = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", w += (m > e && e > -m ? _ : e) + x + (m > r && r > -m ? _ : r) + x + (m > a && a > -m ? _ : a), w += x + (m > c && c > -m ? _ : c) + x + (m > i && i > -m ? _ : i) + x + (m > o && o > -m ? _ : o), k.rotationX || k.rotationY ? (w += x + (m > u && u > -m ? _ : u) + x + (m > h && h > -m ? _ : h) + x + (m > n && n > -m ? _ : n), w += x + (m > s && s > -m ? _ : s) + x + (m > l && l > -m ? _ : l) + x + (m > d && d > -m ? _ : d) + x) : w += ",0,0,0,0,1,0,", w += P + x + $ + x + E + x + (A ? 1 + -E / A : 1) + ")", T[_t] = w
        },
        Mt = z.set2DTransformRatio = function(t) {
          var e, i, n, r, o, s, a, u, l, c, h, d = this.data,
            p = this.t,
            f = p.style,
            m = d.x,
            g = d.y;
          return !(d.rotationX || d.rotationY || d.z || d.force3D === !0 || "auto" === d.force3D && 1 !== t && 0 !== t) || d.svg && wt || !Ct ? (r = d.scaleX, o = d.scaleY, void(d.rotation || d.skewX || d.svg ? (e = d.rotation * O, i = e - d.skewX * O, n = 1e5, s = Math.cos(e) * r, a = Math.sin(e) * r, u = Math.sin(i) * -o, l = Math.cos(i) * o, d.svg && (m += d.xOrigin - (d.xOrigin * s + d.yOrigin * u), g += d.yOrigin - (d.xOrigin * a + d.yOrigin * l), h = 1e-6, h > m && m > -h && (m = 0), h > g && g > -h && (g = 0)), c = (0 | s * n) / n + "," + (0 | a * n) / n + "," + (0 | u * n) / n + "," + (0 | l * n) / n + "," + m + "," + g + ")", d.svg && wt ? p.setAttribute("transform", "matrix(" + c) : f[_t] = (d.xPercent || d.yPercent ? "translate(" + d.xPercent + "%," + d.yPercent + "%) matrix(" : "matrix(") + c) : f[_t] = (d.xPercent || d.yPercent ? "translate(" + d.xPercent + "%," + d.yPercent + "%) matrix(" : "matrix(") + r + ",0,0," + o + "," + m + "," + g + ")")) : (this.setRatio = Dt, void Dt.call(this, t))
        };
      l = St.prototype, l.x = l.y = l.z = l.skewX = l.skewY = l.rotation = l.rotationX = l.rotationY = l.zOrigin = l.xPercent = l.yPercent = 0, l.scaleX = l.scaleY = l.scaleZ = 1, yt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
        parser: function(t, e, i, n, o, a, u) {
          if (n._lastParsedTransform === u) return o;
          n._lastParsedTransform = u;
          var l, c, h, d, p, f, m, g = n._transform = At(t, r, !0, u.parseTransform),
            v = t.style,
            y = 1e-6,
            b = xt.length,
            w = u,
            x = {};
          if ("string" == typeof w.transform && _t) h = R.style, h[_t] = w.transform, h.display = "block", h.position = "absolute", L.body.appendChild(R), l = At(R, null, !1), L.body.removeChild(R);
          else if ("object" == typeof w) {
            if (l = {
                scaleX: ot(null != w.scaleX ? w.scaleX : w.scale, g.scaleX),
                scaleY: ot(null != w.scaleY ? w.scaleY : w.scale, g.scaleY),
                scaleZ: ot(w.scaleZ, g.scaleZ),
                x: ot(w.x, g.x),
                y: ot(w.y, g.y),
                z: ot(w.z, g.z),
                xPercent: ot(w.xPercent, g.xPercent),
                yPercent: ot(w.yPercent, g.yPercent),
                perspective: ot(w.transformPerspective, g.perspective)
              }, m = w.directionalRotation, null != m)
              if ("object" == typeof m)
                for (h in m) w[h] = m[h];
              else w.rotation = m;
              "string" == typeof w.x && -1 !== w.x.indexOf("%") && (l.x = 0, l.xPercent = ot(w.x, g.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (l.y = 0, l.yPercent = ot(w.y, g.yPercent)), l.rotation = st("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : g.rotation, g.rotation, "rotation", x), Ct && (l.rotationX = st("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", x), l.rotationY = st("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", x)), l.skewX = null == w.skewX ? g.skewX : st(w.skewX, g.skewX), l.skewY = null == w.skewY ? g.skewY : st(w.skewY, g.skewY), (c = l.skewY - g.skewY) && (l.skewX += c, l.rotation += c)
          }
          for (Ct && null != w.force3D && (g.force3D = w.force3D, f = !0), g.skewType = w.skewType || g.skewType || s.defaultSkewType, p = g.force3D || g.z || g.rotationX || g.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, p || null == w.scale || (l.scaleZ = 1); --b > -1;) i = xt[b], d = l[i] - g[i], (d > y || -y > d || null != w[i] || null != M[i]) && (f = !0, o = new ft(g, i, g[i], d, o), i in x && (o.e = x[i]), o.xs0 = 0, o.plugin = a, n._overwriteProps.push(o.n));
          return d = w.transformOrigin, d && g.svg && (Et(t, nt(d), l), o = new ft(g, "xOrigin", g.xOrigin, l.xOrigin - g.xOrigin, o, -1, "transformOrigin"), o.b = g.xOrigin, o.e = o.xs0 = l.xOrigin, o = new ft(g, "yOrigin", g.yOrigin, l.yOrigin - g.yOrigin, o, -1, "transformOrigin"), o.b = g.yOrigin, o.e = o.xs0 = l.yOrigin, d = "0px 0px"), (d || Ct && p && g.zOrigin) && (_t ? (f = !0, i = Tt, d = (d || Q(t, i, r, !1, "50% 50%")) + "", o = new ft(v, i, 0, 0, o, -1, "transformOrigin"), o.b = v[i], o.plugin = a, Ct ? (h = g.zOrigin, d = d.split(" "), g.zOrigin = (d.length > 2 && (0 === h || "0px" !== d[2]) ? parseFloat(d[2]) : h) || 0, o.xs0 = o.e = d[0] + " " + (d[1] || "50%") + " 0px", o = new ft(g, "zOrigin", 0, 0, o, -1, o.n),
            o.b = h, o.xs0 = o.e = g.zOrigin) : o.xs0 = o.e = d) : nt(d + "", g)), f && (n._transformType = g.svg && wt || !p && 3 !== this._transformType ? 2 : 3), o
        },
        prefix: !0
      }), yt("boxShadow", {
        defaultValue: "0px 0px 0px 0px #999",
        prefix: !0,
        color: !0,
        multi: !0,
        keyword: "inset"
      }), yt("borderRadius", {
        defaultValue: "0px",
        parser: function(t, e, i, o, s) {
          e = this.format(e);
          var a, u, l, c, h, d, p, f, m, g, v, y, b, w, x, _, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            T = t.style;
          for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), u = 0; k.length > u; u++) this.p.indexOf("border") && (k[u] = U(k[u])), h = c = Q(t, k[u], r, !1, "0px"), -1 !== h.indexOf(" ") && (c = h.split(" "), h = c[0], c = c[1]), d = l = a[u], p = parseFloat(h), y = h.substr((p + "").length), b = "=" === d.charAt(1), b ? (f = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), f *= parseFloat(d), v = d.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(d), v = d.substr((f + "").length)), "" === v && (v = n[i] || y), v !== y && (w = J(t, "borderLeft", p, y), x = J(t, "borderTop", p, y), "%" === v ? (h = 100 * (w / m) + "%", c = 100 * (x / g) + "%") : "em" === v ? (_ = J(t, "borderLeft", 1, "em"), h = w / _ + "em", c = x / _ + "em") : (h = w + "px", c = x + "px"), b && (d = parseFloat(h) + f + v, l = parseFloat(c) + f + v)), s = mt(T, k[u], h + " " + c, d + " " + l, !1, "0px", s);
          return s
        },
        prefix: !0,
        formatter: ht("0px 0px 0px 0px", !1, !0)
      }), yt("backgroundPosition", {
        defaultValue: "0 0",
        parser: function(t, e, i, n, o, s) {
          var a, u, l, c, h, d, p = "background-position",
            f = r || Y(t, null),
            g = this.format((f ? m ? f.getPropertyValue(p + "-x") + " " + f.getPropertyValue(p + "-y") : f.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
            v = this.format(e);
          if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (d = Q(t, "backgroundImage").replace(j, ""), d && "none" !== d)) {
            for (a = g.split(" "), u = v.split(" "), I.setAttribute("src", d), l = 2; --l > -1;) g = a[l], c = -1 !== g.indexOf("%"), c !== (-1 !== u[l].indexOf("%")) && (h = 0 === l ? t.offsetWidth - I.width : t.offsetHeight - I.height, a[l] = c ? parseFloat(g) / 100 * h + "px" : 100 * (parseFloat(g) / h) + "%");
            g = a.join(" ")
          }
          return this.parseComplex(t.style, g, v, o, s)
        },
        formatter: nt
      }), yt("backgroundSize", {
        defaultValue: "0 0",
        formatter: nt
      }), yt("perspective", {
        defaultValue: "0px",
        prefix: !0
      }), yt("perspectiveOrigin", {
        defaultValue: "50% 50%",
        prefix: !0
      }), yt("transformStyle", {
        prefix: !0
      }), yt("backfaceVisibility", {
        prefix: !0
      }), yt("userSelect", {
        prefix: !0
      }), yt("margin", {
        parser: dt("marginTop,marginRight,marginBottom,marginLeft")
      }), yt("padding", {
        parser: dt("paddingTop,paddingRight,paddingBottom,paddingLeft")
      }), yt("clip", {
        defaultValue: "rect(0px,0px,0px,0px)",
        parser: function(t, e, i, n, o, s) {
          var a, u, l;
          return 9 > m ? (u = t.currentStyle, l = 8 > m ? " " : ",", a = "rect(" + u.clipTop + l + u.clipRight + l + u.clipBottom + l + u.clipLeft + ")", e = this.format(e).split(",").join(l)) : (a = this.format(Q(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, o, s)
        }
      }), yt("textShadow", {
        defaultValue: "0px 0px 0px #999",
        color: !0,
        multi: !0
      }), yt("autoRound,strictUnits", {
        parser: function(t, e, i, n, r) {
          return r
        }
      }), yt("border", {
        defaultValue: "0px solid #000",
        parser: function(t, e, i, n, o, s) {
          return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", r, !1, "0px") + " " + Q(t, "borderTopStyle", r, !1, "solid") + " " + Q(t, "borderTopColor", r, !1, "#000")), this.format(e), o, s)
        },
        color: !0,
        formatter: function(t) {
          var e = t.split(" ");
          return e[0] + " " + (e[1] || "solid") + " " + (t.match(ct) || ["#000"])[0]
        }
      }), yt("borderWidth", {
        parser: dt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
      }), yt("float,cssFloat,styleFloat", {
        parser: function(t, e, i, n, r) {
          var o = t.style,
            s = "cssFloat" in o ? "cssFloat" : "styleFloat";
          return new ft(o, s, 0, 0, r, -1, i, !1, 0, o[s], e)
        }
      });
      var Lt = function(t) {
        var e, i = this.t,
          n = i.filter || Q(this.data, "filter") || "",
          r = 0 | this.s + this.c * t;
        100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Q(this.data, "filter")) : (i.filter = n.replace(k, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(x, "opacity=" + r))
      };
      yt("opacity,alpha,autoAlpha", {
        defaultValue: "1",
        parser: function(t, e, i, n, o, s) {
          var a = parseFloat(Q(t, "opacity", r, !1, "1")),
            u = t.style,
            l = "autoAlpha" === i;
          return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), l && 1 === a && "hidden" === Q(t, "visibility", r) && 0 !== e && (a = 0), q ? o = new ft(u, "opacity", a, e - a, o) : (o = new ft(u, "opacity", 100 * a, 100 * (e - a), o), o.xn1 = l ? 1 : 0, u.zoom = 1, o.type = 2, o.b = "alpha(opacity=" + o.s + ")", o.e = "alpha(opacity=" + (o.s + o.c) + ")", o.data = t, o.plugin = s, o.setRatio = Lt), l && (o = new ft(u, "visibility", 0, 0, o, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), o.xs0 = "inherit", n._overwriteProps.push(o.n), n._overwriteProps.push(i)), o
        }
      });
      var Nt = function(t, e) {
          e && (t.removeProperty ? ("ms" === e.substr(0, 2) && (e = "M" + e.substr(1)), t.removeProperty(e.replace(C, "-$1").toLowerCase())) : t.removeAttribute(e))
        },
        Rt = function(t) {
          if (this.t._gsClassPT = this, 1 === t || 0 === t) {
            this.t.setAttribute("class", 0 === t ? this.b : this.e);
            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Nt(i, e.p), e = e._next;
            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
          } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
      yt("className", {
        parser: function(t, e, n, o, s, a, u) {
          var l, c, h, d, p, f = t.getAttribute("class") || "",
            m = t.style.cssText;
          if (s = o._classNamePT = new ft(t, n, 0, 0, s, 2), s.setRatio = Rt, s.pr = -11, i = !0, s.b = f, c = K(t, r), h = t._gsClassPT) {
            for (d = {}, p = h.data; p;) d[p.p] = 1, p = p._next;
            h.setRatio(1)
          }
          return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), o._tween._duration && (t.setAttribute("class", s.e), l = Z(t, c, K(t), u, d), t.setAttribute("class", f), s.data = l.firstMPT, t.style.cssText = m, s = s.xfirst = o.parse(t, l.difs, s, a)), s
        }
      });
      var It = function(t) {
        if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
          var e, i, n, r, o = this.t.style,
            s = u.transform.parse;
          if ("all" === this.e) o.cssText = "", r = !0;
          else
            for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], u[i] && (u[i].parse === s ? r = !0 : i = "transformOrigin" === i ? Tt : u[i].p), Nt(o, i);
          r && (Nt(o, _t), this.t._gsTransform && delete this.t._gsTransform)
        }
      };
      for (yt("clearProps", {
          parser: function(t, e, n, r, o) {
            return o = new ft(t, n, 0, 0, o, 2), o.setRatio = It, o.e = e, o.pr = -10, o.data = r._tween, i = !0, o
          }
        }), l = "bezier,throwProps,physicsProps,physics2D".split(","), gt = l.length; gt--;) bt(l[gt]);
      l = s.prototype, l._firstPT = l._lastParsedTransform = l._transform = null, l._onInitTween = function(t, e, a) {
        if (!t.nodeType) return !1;
        this._target = t, this._tween = a, this._vars = e, c = e.autoRound, i = !1, n = e.suffixMap || s.suffixMap, r = Y(t, ""), o = this._overwriteProps;
        var u, l, p, m, g, v, y, b, w, x = t.style;
        if (h && "" === x.zIndex && (u = Q(t, "zIndex", r), ("auto" === u || "" === u) && this._addLazySet(x, "zIndex", 0)), "string" == typeof e && (m = x.cssText, u = K(t, r), x.cssText = m + ";" + e, u = Z(t, u, K(t)).difs, !q && _.test(e) && (u.opacity = parseFloat(RegExp.$1)), e = u, x.cssText = m), this._firstPT = l = this.parse(t, e, null), this._transformType) {
          for (w = 3 === this._transformType, _t ? d && (h = !0, "" === x.zIndex && (y = Q(t, "zIndex", r), ("auto" === y || "" === y) && this._addLazySet(x, "zIndex", 0)), f && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : x.zoom = 1, p = l; p && p._next;) p = p._next;
          b = new ft(t, "transform", 0, 0, null, 2), this._linkCSSP(b, null, p), b.setRatio = w && Ct ? Dt : _t ? Mt : Ot, b.data = this._transform || At(t, r, !0), o.pop()
        }
        if (i) {
          for (; l;) {
            for (v = l._next, p = m; p && p.pr > l.pr;) p = p._next;
            (l._prev = p ? p._prev : g) ? l._prev._next = l: m = l, (l._next = p) ? p._prev = l : g = l, l = v
          }
          this._firstPT = m
        }
        return !0
      }, l.parse = function(t, e, i, o) {
        var s, a, l, h, d, p, f, m, g, v, y = t.style;
        for (s in e) p = e[s], a = u[s], a ? i = a.parse(t, p, s, this, i, o, e) : (d = Q(t, s, r) + "", g = "string" == typeof p, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && T.test(p) ? (g || (p = lt(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = mt(y, s, d, p, !0, "transparent", i, 0, o)) : !g || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(d), f = l || 0 === l ? d.substr((l + "").length) : "", ("" === d || "auto" === d) && ("width" === s || "height" === s ? (l = it(t, s, r), f = "px") : "left" === s || "top" === s ? (l = G(t, s, r), f = "px") : (l = "opacity" !== s ? 0 : 1, f = "")), v = g && "=" === p.charAt(1), v ? (h = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), h *= parseFloat(p), m = p.replace(w, "")) : (h = parseFloat(p), m = g ? p.replace(w, "") : ""), "" === m && (m = s in n ? n[s] : f), p = h || 0 === h ? (v ? h + l : h) + m : e[s], f !== m && "" !== m && (h || 0 === h) && l && (l = J(t, s, l, f), "%" === m ? (l /= J(t, s, 100, "%") / 100, e.strictUnits !== !0 && (d = l + "%")) : "em" === m ? l /= J(t, s, 1, "em") : "px" !== m && (h = J(t, s, h, m), m = "px"), v && (h || 0 === h) && (p = h + l + m)), v && (h += l), !l && 0 !== l || !h && 0 !== h ? void 0 !== y[s] && (p || "NaN" != p + "" && null != p) ? (i = new ft(y, s, h || l || 0, 0, i, -1, s, !1, 0, d, p), i.xs0 = "none" !== p || "display" !== s && -1 === s.indexOf("Style") ? p : d) : V("invalid " + s + " tween value: " + e[s]) : (i = new ft(y, s, l, h - l, i, 0, s, c !== !1 && ("px" === m || "zIndex" === s), 0, d, p), i.xs0 = m)) : i = mt(y, s, d, p, !0, null, i, 0, o)), o && i && !i.plugin && (i.plugin = o);
        return i
      }, l.setRatio = function(t) {
        var e, i, n, r = this._firstPT,
          o = 1e-6;
        if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
          if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
            for (; r;) {
              if (e = r.c * t + r.s, r.r ? e = Math.round(e) : o > e && e > -o && (e = 0), r.type)
                if (1 === r.type)
                  if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                  else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
              else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
              else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
              else {
                for (i = r.xs0 + e + r.xs1, n = 1; r.l > n; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                r.t[r.p] = i
              } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
              else r.t[r.p] = e + r.xs0;
              r = r._next
            } else
              for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
          else
            for (; r;) 2 !== r.type ? r.t[r.p] = r.e : r.setRatio(t), r = r._next
      }, l._enableTransforms = function(t) {
        this._transform = this._transform || At(this._target, r, !0), this._transformType = this._transform.svg && wt || !t && 3 !== this._transformType ? 2 : 3
      };
      var zt = function() {
        this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
      };
      l._addLazySet = function(t, e, i) {
        var n = this._firstPT = new ft(t, e, 0, 0, this._firstPT, 2);
        n.e = i, n.setRatio = zt, n.data = this
      }, l._linkCSSP = function(t, e, i, n) {
        return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
      }, l._kill = function(e) {
        var i, n, r, o = e;
        if (e.autoAlpha || e.alpha) {
          o = {};
          for (n in e) o[n] = e[n];
          o.opacity = 1, o.autoAlpha && (o.visibility = 1)
        }
        return e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), t.prototype._kill.call(this, o)
      };
      var Ht = function(t, e, i) {
        var n, r, o, s;
        if (t.slice)
          for (r = t.length; --r > -1;) Ht(t[r], e, i);
        else
          for (n = t.childNodes, r = n.length; --r > -1;) o = n[r], s = o.type, o.style && (e.push(K(o)), i && i.push(o)), 1 !== s && 9 !== s && 11 !== s || !o.childNodes.length || Ht(o, e, i)
      };
      return s.cascadeTo = function(t, i, n) {
        var r, o, s, a = e.to(t, i, n),
          u = [a],
          l = [],
          c = [],
          h = [],
          d = e._internals.reservedProps;
        for (t = a._targets || a.target, Ht(t, l, h), a.render(i, !0), Ht(t, c), a.render(0, !0), a._enabled(!0), r = h.length; --r > -1;)
          if (o = Z(h[r], l[r], c[r]), o.firstMPT) {
            o = o.difs;
            for (s in n) d[s] && (o[s] = n[s]);
            u.push(e.to(h[r], i, o))
          }
        return u
      }, t.activate([s]), s
    }, !0)
  }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  function(t) {
    "use strict";
    var e = function() {
      return (_gsScope.GreenSockGlobals || _gsScope)[t]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
  }("CSSPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  "use strict";
  var t = document.documentElement,
    e = window,
    i = function(i, n) {
      var r = "x" === n ? "Width" : "Height",
        o = "scroll" + r,
        s = "client" + r,
        a = document.body;
      return i === e || i === t || i === a ? Math.max(t[o], a[o]) - (e["inner" + r] || Math.max(t[s], a[s])) : i[o] - i["offset" + r]
    },
    n = _gsScope._gsDefine.plugin({
      propName: "scrollTo",
      API: 2,
      version: "1.7.4",
      init: function(t, n, r) {
        return this._wdw = t === e, this._target = t, this._tween = r, "object" != typeof n && (n = {
          y: n
        }), this.vars = n, this._autoKill = n.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != n.x ? (this._addTween(this, "x", this.x, "max" === n.x ? i(t, "x") : n.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != n.y ? (this._addTween(this, "y", this.y, "max" === n.y ? i(t, "y") : n.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
      },
      set: function(t) {
        this._super.setRatio.call(this, t);
        var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          o = r - this.yPrev,
          s = n - this.xPrev;
        this._autoKill && (!this.skipX && (s > 7 || -7 > s) && i(this._target, "x") > n && (this.skipX = !0), !this.skipY && (o > 7 || -7 > o) && i(this._target, "y") > r && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? e.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
      }
    }),
    r = n.prototype;
  n.max = i, r.getX = function() {
    return this._wdw ? null != e.pageXOffset ? e.pageXOffset : null != t.scrollLeft ? t.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
  }, r.getY = function() {
    return this._wdw ? null != e.pageYOffset ? e.pageYOffset : null != t.scrollTop ? t.scrollTop : document.body.scrollTop : this._target.scrollTop
  }, r._kill = function(t) {
    return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
  }
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
var Froogaloop = function() {
  function t(e) {
    return new t.fn.init(e)
  }

  function e(t, e, i) {
    if (!i.contentWindow.postMessage) return !1;
    var n = i.getAttribute("src").split("?")[0],
      t = JSON.stringify({
        method: t,
        value: e
      });
    "//" === n.substr(0, 2) && (n = window.location.protocol + n), i.contentWindow.postMessage(t, n)
  }

  function i(t) {
    var e, i;
    try {
      e = JSON.parse(t.data), i = e.event || e.method
    } catch (n) {}
    if ("ready" == i && !o && (o = !0), t.origin != s) return !1;
    var t = e.value,
      a = e.data,
      u = "" === u ? null : e.player_id;
    return e = u ? r[u][i] : r[i], i = [], e ? (void 0 !== t && i.push(t), a && i.push(a), u && i.push(u), 0 < i.length ? e.apply(null, i) : e.call()) : !1
  }

  function n(t, e, i) {
    i ? (r[i] || (r[i] = {}), r[i][t] = e) : r[t] = e
  }
  var r = {},
    o = !1,
    s = "";
  return t.fn = t.prototype = {
    element: null,
    init: function(t) {
      "string" == typeof t && (t = document.getElementById(t)), this.element = t, t = this.element.getAttribute("src"), "//" === t.substr(0, 2) && (t = window.location.protocol + t);
      for (var t = t.split("/"), e = "", i = 0, n = t.length; n > i && 3 > i; i++) e += t[i], 2 > i && (e += "/");
      return s = e, this
    },
    api: function(t, i) {
      if (!this.element || !t) return !1;
      var r = this.element,
        o = "" !== r.id ? r.id : null,
        s = i && i.constructor && i.call && i.apply ? null : i,
        a = i && i.constructor && i.call && i.apply ? i : null;
      return a && n(t, a, o), e(t, s, r), this
    },
    addEvent: function(t, i) {
      if (!this.element) return !1;
      var r = this.element,
        s = "" !== r.id ? r.id : null;
      return n(t, i, s), "ready" != t ? e("addEventListener", t, r) : "ready" == t && o && i.call(null, s), this
    },
    removeEvent: function(t) {
      if (!this.element) return !1;
      var i, n = this.element;
      t: {
        if ((i = "" !== n.id ? n.id : null) && r[i]) {
          if (!r[i][t]) {
            i = !1;
            break t
          }
          r[i][t] = null
        } else {
          if (!r[t]) {
            i = !1;
            break t
          }
          r[t] = null
        }
        i = !0
      }
      "ready" != t && i && e("removeEventListener", t, n)
    }
  }, t.fn.init.prototype = t.fn, window.addEventListener ? window.addEventListener("message", i, !1) : window.attachEvent("onmessage", i), window.Froogaloop = window.$f = t
}();
! function(t, e, i) {
  t.fn.backstretch = function(n, r) {
    return (n === i || 0 === n.length) && t.error("No images were supplied for Backstretch"), 0 === t(e).scrollTop() && e.scrollTo(0, 0), this.each(function() {
      var e = t(this),
        i = e.data("backstretch");
      if (i) {
        if ("string" == typeof n && "function" == typeof i[n]) return void i[n](r);
        r = t.extend(i.options, r), i.destroy(!0)
      }
      i = new o(this, n, r), e.data("backstretch", i)
    })
  }, t.backstretch = function(e, i) {
    return t("body").backstretch(e, i).data("backstretch")
  }, t.expr[":"].backstretch = function(e) {
    return t(e).data("backstretch") !== i
  }, t.fn.backstretch.defaults = {
    centeredX: !0,
    centeredY: !0,
    duration: 5e3,
    fade: 0
  };
  var n = {
      left: 0,
      top: 0,
      overflow: "hidden",
      margin: 0,
      padding: 0,
      height: "100%",
      width: "100%",
      zIndex: -999999
    },
    r = {
      position: "absolute",
      display: "none",
      margin: 0,
      padding: 0,
      border: "none",
      width: "auto",
      height: "auto",
      maxHeight: "none",
      maxWidth: "none",
      zIndex: -999999
    },
    o = function(i, r, o) {
      this.options = t.extend({}, t.fn.backstretch.defaults, o || {}), this.images = t.isArray(r) ? r : [r], t.each(this.images, function() {
        t("<img />")[0].src = this
      }), this.isBody = i === document.body, this.$container = t(i), this.$root = this.isBody ? t(s ? e : document) : this.$container, i = this.$container.children(".backstretch").first(), this.$wrap = i.length ? i : t('<div class="backstretch"></div>').css(n).appendTo(this.$container), this.isBody || (i = this.$container.css("position"), r = this.$container.css("zIndex"), this.$container.css({
        position: "static" === i ? "relative" : i,
        zIndex: "auto" === r ? 0 : r,
        background: "none"
      }), this.$wrap.css({
        zIndex: -999998
      })), this.$wrap.css({
        position: this.isBody && s ? "fixed" : "absolute"
      }), this.index = 0, this.show(this.index), t(e).on("resize.backstretch", t.proxy(this.resize, this)).on("orientationchange.backstretch", t.proxy(function() {
        this.isBody && 0 === e.pageYOffset && (e.scrollTo(0, 1), this.resize())
      }, this))
    };
  o.prototype = {
    resize: function() {
      try {
        var t, i = {
            left: 0,
            top: 0
          },
          n = this.isBody ? this.$root.width() : this.$root.innerWidth(),
          r = n,
          o = this.isBody ? e.innerHeight ? e.innerHeight : this.$root.height() : this.$root.innerHeight(),
          s = r / this.$img.data("ratio");
        s >= o ? (t = (s - o) / 2, this.options.centeredY && (i.top = "-" + t + "px")) : (s = o, r = s * this.$img.data("ratio"), t = (r - n) / 2, this.options.centeredX && (i.left = "-" + t + "px")), this.$wrap.css({
          width: n,
          height: o
        }).find("img:not(.deleteable)").css({
          width: r,
          height: s
        }).css(i)
      } catch (a) {}
      return this
    },
    show: function(e) {
      if (!(Math.abs(e) > this.images.length - 1)) {
        var i = this,
          n = i.$wrap.find("img").addClass("deleteable"),
          o = {
            relatedTarget: i.$container[0]
          };
        return i.$container.trigger(t.Event("backstretch.before", o), [i, e]), this.index = e, clearInterval(i.interval), i.$img = t("<img />").css(r).bind("load", function(r) {
          var s = this.width || t(r.target).width();
          r = this.height || t(r.target).height(), t(this).data("ratio", s / r), t(this).fadeIn(i.options.speed || i.options.fade, function() {
            n.remove(), i.paused || i.cycle(), t(["after", "show"]).each(function() {
              i.$container.trigger(t.Event("backstretch." + this, o), [i, e])
            })
          }), i.resize()
        }).appendTo(i.$wrap), i.$img.attr("src", i.images[e]), i
      }
    },
    next: function() {
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
    },
    prev: function() {
      return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
    },
    pause: function() {
      return this.paused = !0, this
    },
    resume: function() {
      return this.paused = !1, this.next(), this
    },
    cycle: function() {
      return 1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(t.proxy(function() {
        this.paused || this.next()
      }, this), this.options.duration)), this
    },
    destroy: function(i) {
      t(e).off("resize.backstretch orientationchange.backstretch"), clearInterval(this.interval), i || this.$wrap.remove(), this.$container.removeData("backstretch")
    }
  };
  var s, a = navigator.userAgent,
    u = navigator.platform,
    l = a.match(/AppleWebKit\/([0-9]+)/),
    l = !!l && l[1],
    c = a.match(/Fennec\/([0-9]+)/),
    c = !!c && c[1],
    h = a.match(/Opera Mobi\/([0-9]+)/),
    d = !!h && h[1],
    p = a.match(/MSIE ([0-9]+)/),
    p = !!p && p[1];
  s = !((-1 < u.indexOf("iPhone") || -1 < u.indexOf("iPad") || -1 < u.indexOf("iPod")) && l && 534 > l || e.operamini && "[object OperaMini]" === {}.toString.call(e.operamini) || h && 7458 > d || -1 < a.indexOf("Android") && l && 533 > l || c && 6 > c || "palmGetResource" in e && l && 534 > l || -1 < a.indexOf("MeeGo") && -1 < a.indexOf("NokiaBrowser/8.5.0") || p && 6 >= p)
}(jQuery, window),
function(t) {
  if ("function" == typeof define && define.amd) define(t);
  else if ("object" == typeof exports) module.exports = t();
  else {
    var e = window.Cookies,
      i = window.Cookies = t(window.jQuery);
    i.noConflict = function() {
      return window.Cookies = e, i
    }
  }
}(function() {
  function t() {
    for (var t = 0, e = {}; t < arguments.length; t++) {
      var i = arguments[t];
      for (var n in i) e[n] = i[n]
    }
    return e
  }

  function e(i) {
    function n(e, r, o) {
      var s;
      if (arguments.length > 1) {
        if (o = t(n.defaults, o), "number" == typeof o.expires) {
          var a = new Date;
          a.setMilliseconds(a.getMilliseconds() + 864e5 * o.expires), o.expires = a
        }
        try {
          s = JSON.stringify(r), /^[\{\[]/.test(s) && (r = s)
        } catch (u) {}
        return r = encodeURIComponent(String(r)), r = r.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = encodeURIComponent(String(e)), e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), e = e.replace(/[\(\)]/g, escape), document.cookie = [e, "=", r, o.expires && "; expires=" + o.expires.toUTCString(), o.path && "; path=" + o.path, o.domain && "; domain=" + o.domain, o.secure && "; secure"].join("")
      }
      e || (s = {});
      for (var l = document.cookie ? document.cookie.split("; ") : [], c = /(%[0-9A-Z]{2})+/g, h = 0; h < l.length; h++) {
        var d = l[h].split("="),
          p = d[0].replace(c, decodeURIComponent),
          f = d.slice(1).join("=");
        if ('"' === f.charAt(0) && (f = f.slice(1, -1)), f = i && i(f, p) || f.replace(c, decodeURIComponent), this.json) try {
          f = JSON.parse(f)
        } catch (u) {}
        if (e === p) {
          s = f;
          break
        }
        e || (s[p] = f)
      }
      return s
    }
    return n.get = n.set = n, n.getJSON = function() {
      return n.apply({
        json: !0
      }, [].slice.call(arguments))
    }, n.defaults = {}, n.remove = function(e, i) {
      n(e, "", t(i, {
        expires: -1
      }))
    }, n.withConverter = e, n
  }
  return e()
}),
function(t) {
  t.customSelect = function(e) {
    var i, n, r = t(e);
    return r.wrap('<div class="input-select-wrapper ' + r.get(0).className + '" style="width:' + r.width() + 'px;"></div>'), r.after('<span class="input-select-wrappertext">' + r.find("option:selected").text() + "</span>"), i = r.parent(), n = i.find(".input-select-wrappertext"), "none" === !r.css("display") && i.hide(), r.is(":disabled") && i.addClass(".input-select-disabled"), r.on("change keyup didChange", function(t) {
      return n.text(r.find("option:selected").text())
    }).on("focus", function() {
      i.addClass("focused")
    }).on("blur", function() {
      i.removeClass("focused")
    })
  }, t.fn.customSelect = function() {
    return this.each(function() {
      if (void 0 == t(this).data("customSelect") && t(this).is("select")) {
        var e = new t.customSelect(this);
        t(this).data("customSelect", e)
      }
    })
  }
}(jQuery);
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
      var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
        o = r.com.greensock,
        s = 2 * Math.PI,
        a = Math.PI / 2,
        u = o._class,
        l = function(e, i) {
          var n = u("easing." + e, function() {}, !0),
            r = n.prototype = new t;
          return r.constructor = n, r.getRatio = i, n
        },
        c = t.register || function() {},
        h = function(t, e, i, n, r) {
          var o = u("easing." + t, {
            easeOut: new e,
            easeIn: new i,
            easeInOut: new n
          }, !0);
          return c(o, t), o
        },
        d = function(t, e, i) {
          this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
        },
        p = function(e, i) {
          var n = u("easing." + e, function(t) {
              this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
            }, !0),
            r = n.prototype = new t;
          return r.constructor = n, r.getRatio = i, r.config = function(t) {
            return new n(t)
          }, n
        },
        f = h("Back", p("BackOut", function(t) {
          return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
        }), p("BackIn", function(t) {
          return t * t * ((this._p1 + 1) * t - this._p1)
        }), p("BackInOut", function(t) {
          return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
        })),
        m = u("easing.SlowMo", function(t, e, i) {
          e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
        }, !0),
        g = m.prototype = new t;
      return g.constructor = m, g.getRatio = function(t) {
        var e = t + (.5 - t) * this._p;
        return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
      }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
        return new m(t, e, i)
      }, e = u("easing.SteppedEase", function(t) {
        t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
      }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function(t) {
        return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
      }, g.config = e.config = function(t) {
        return new e(t)
      }, i = u("easing.RoughEase", function(e) {
        e = e || {};
        for (var i, n, r, o, s, a, u = e.taper || "none", l = [], c = 0, h = 0 | (e.points || 20), p = h, f = e.randomize !== !1, m = e.clamp === !0, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = f ? Math.random() : 1 / h * p, n = g ? g.getRatio(i) : i, "none" === u ? r = v : "out" === u ? (o = 1 - i, r = o * o * v) : "in" === u ? r = i * i * v : .5 > i ? (o = 2 * i, r = o * o * .5 * v) : (o = 2 * (1 - i), r = o * o * .5 * v), f ? n += Math.random() * r - .5 * r : p % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), l[c++] = {
          x: i,
          y: n
        };
        for (l.sort(function(t, e) {
            return t.x - e.x
          }), a = new d(1, 1, null), p = h; --p > -1;) s = l[p], a = new d(s.x, s.y, a);
        this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
      }, !0), g = i.prototype = new t, g.constructor = i, g.getRatio = function(t) {
        var e = this._prev;
        if (t > e.t) {
          for (; e.next && t >= e.t;) e = e.next;
          e = e.prev
        } else
          for (; e.prev && t <= e.t;) e = e.prev;
        return this._prev = e, e.v + (t - e.t) / e.gap * e.c
      }, g.config = function(t) {
        return new i(t)
      }, i.ease = new i, h("Bounce", l("BounceOut", function(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
      }), l("BounceIn", function(t) {
        return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
      }), l("BounceInOut", function(t) {
        var e = .5 > t;
        return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
      })), h("Circ", l("CircOut", function(t) {
        return Math.sqrt(1 - (t -= 1) * t)
      }), l("CircIn", function(t) {
        return -(Math.sqrt(1 - t * t) - 1)
      }), l("CircInOut", function(t) {
        return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
      })), n = function(e, i, n) {
        var r = u("easing." + e, function(t, e) {
            this._p1 = t || 1, this._p2 = e || n, this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0)
          }, !0),
          o = r.prototype = new t;
        return o.constructor = r, o.getRatio = i, o.config = function(t, e) {
          return new r(t, e)
        }, r
      }, h("Elastic", n("ElasticOut", function(t) {
        return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * s / this._p2) + 1
      }, .3), n("ElasticIn", function(t) {
        return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2))
      }, .3), n("ElasticInOut", function(t) {
        return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * s / this._p2) * .5 + 1
      }, .45)), h("Expo", l("ExpoOut", function(t) {
        return 1 - Math.pow(2, -10 * t)
      }), l("ExpoIn", function(t) {
        return Math.pow(2, 10 * (t - 1)) - .001
      }), l("ExpoInOut", function(t) {
        return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
      })), h("Sine", l("SineOut", function(t) {
        return Math.sin(t * a)
      }), l("SineIn", function(t) {
        return -Math.cos(t * a) + 1
      }), l("SineInOut", function(t) {
        return -.5 * (Math.cos(Math.PI * t) - 1)
      })), u("easing.EaseLookup", {
        find: function(e) {
          return t.map[e]
        }
      }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), f
    }, !0)
  }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
  }(function(t) {
    function e(t) {
      return a.raw ? t : encodeURIComponent(t)
    }

    function i(t) {
      return a.raw ? t : decodeURIComponent(t)
    }

    function n(t) {
      return e(a.json ? JSON.stringify(t) : String(t))
    }

    function r(t) {
      0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
      try {
        return t = decodeURIComponent(t.replace(s, " ")), a.json ? JSON.parse(t) : t
      } catch (e) {}
    }

    function o(e, i) {
      var n = a.raw ? e : r(e);
      return t.isFunction(i) ? i(n) : n
    }
    var s = /\+/g,
      a = t.cookie = function(r, s, u) {
        if (void 0 !== s && !t.isFunction(s)) {
          if (u = t.extend({}, a.defaults, u), "number" == typeof u.expires) {
            var l = u.expires,
              c = u.expires = new Date;
            c.setTime(+c + 864e5 * l)
          }
          return document.cookie = [e(r), "=", n(s), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
        }
        for (var h = r ? void 0 : {}, d = document.cookie ? document.cookie.split("; ") : [], p = 0, f = d.length; f > p; p++) {
          var m = d[p].split("="),
            g = i(m.shift()),
            v = m.join("=");
          if (r && r === g) {
            h = o(v, s);
            break
          }
          r || void 0 === (v = o(v)) || (h[g] = v)
        }
        return h
      };
    a.defaults = {}, t.removeCookie = function(e, i) {
      return void 0 === t.cookie(e) ? !1 : (t.cookie(e, "", t.extend({}, i, {
        expires: -1
      })), !t.cookie(e))
    }
  }),
  function(t, e, i, n) {
    "use strict";

    function r(e, i) {
      this.element = e, this.settings = t.extend({}, a, i), this._defaults = a, this.cookie = o(this.settings.cookieName), this.init()
    }

    function o(t) {
      var e = new RegExp("(?:^" + t + "|;s*" + t + ")=(.*?)(?:;|$)", "g"),
        n = e.exec(i.cookie);
      return null === n ? null : n[1]
    }
    var s = "csrfValidator",
      a = {
        token: t('input[name="xsrfFormToken"]').val(),
        cookieName: "FORM_TOKEN",
        tokenName: "csrfToken"
      };
    t.extend(r.prototype, {
      init: function() {
        "string" == typeof this.settings.token && this.populateAjaxRequest(this.settings.token)
      },
      populateAjaxRequest: function(e) {
        var i = this.settings;
        t.ajaxPrefilter(function(t) {
          t.data && (t.data += "&"), t.data += i.tokenName + "=" + e
        })
      },
      validate: function(t) {
        return this.cookie === t
      }
    }), t.fn[s] = function(e) {
      return this.each(function() {
        t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new r(this, e))
      })
    }
  }(jQuery, window, document),
  function(t, e, i, n) {
    "use strict";
    var r = i("html"),
      o = i(t),
      s = i(e),
      a = i.fancybox = function() {
        a.open.apply(this, arguments)
      },
      u = navigator.userAgent.match(/msie/i),
      l = null,
      c = e.createTouch !== n,
      h = function(t) {
        return t && t.hasOwnProperty && t instanceof i
      },
      d = function(t) {
        return t && "string" === i.type(t)
      },
      p = function(t) {
        return d(t) && t.indexOf("%") > 0
      },
      f = function(t) {
        return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
      },
      m = function(t, e) {
        var i = parseInt(t, 10) || 0;
        return e && p(t) && (i = a.getViewport()[e] / 100 * i), Math.ceil(i)
      },
      g = function(t, e) {
        return m(t, e) + "px"
      };
    i.extend(a, {
      version: "2.1.5",
      defaults: {
        padding: 15,
        margin: 20,
        width: 800,
        height: 600,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 9999,
        maxHeight: 9999,
        pixelRatio: 1,
        autoSize: !0,
        autoHeight: !1,
        autoWidth: !1,
        autoResize: !0,
        autoCenter: !c,
        fitToView: !0,
        aspectRatio: !1,
        topRatio: .5,
        leftRatio: .5,
        scrolling: "auto",
        wrapCSS: "",
        arrows: !0,
        closeBtn: !0,
        closeClick: !1,
        nextClick: !1,
        mouseWheel: !0,
        autoPlay: !1,
        playSpeed: 3e3,
        preload: 3,
        modal: !1,
        loop: !0,
        ajax: {
          dataType: "html",
          headers: {
            "X-fancyBox": !0
          }
        },
        iframe: {
          scrolling: "auto",
          preload: !0
        },
        swf: {
          wmode: "transparent",
          allowfullscreen: "true",
          allowscriptaccess: "always"
        },
        keys: {
          next: {
            13: "left",
            34: "up",
            39: "left",
            40: "up"
          },
          prev: {
            8: "right",
            33: "down",
            37: "right",
            38: "down"
          },
          close: [27],
          play: [32],
          toggle: [70]
        },
        direction: {
          next: "left",
          prev: "right"
        },
        scrollOutside: !0,
        index: 0,
        type: null,
        href: null,
        content: null,
        title: null,
        openEffect: "fade",
        openSpeed: 250,
        openEasing: "swing",
        openOpacity: !0,
        openMethod: "zoomIn",
        closeEffect: "fade",
        closeSpeed: 250,
        closeEasing: "swing",
        closeOpacity: !0,
        closeMethod: "zoomOut",
        nextEffect: "elastic",
        nextSpeed: 250,
        nextEasing: "swing",
        nextMethod: "changeIn",
        prevEffect: "elastic",
        prevSpeed: 250,
        prevEasing: "swing",
        prevMethod: "changeOut",
        helpers: {
          overlay: !0,
          title: !0
        },
        onCancel: i.noop,
        beforeLoad: i.noop,
        afterLoad: i.noop,
        beforeShow: i.noop,
        afterShow: i.noop,
        beforeChange: i.noop,
        beforeClose: i.noop,
        afterClose: i.noop
      },
      group: {},
      opts: {},
      previous: null,
      coming: null,
      current: null,
      isActive: !1,
      isOpen: !1,
      isOpened: !1,
      wrap: null,
      skin: null,
      outer: null,
      inner: null,
      player: {
        timer: null,
        isActive: !1
      },
      ajaxLoad: null,
      imgPreload: null,
      transitions: {},
      helpers: {},
      open: function(t, e) {
        return t && (i.isPlainObject(e) || (e = {}), !1 !== a.close(!0)) ? (i.isArray(t) || (t = h(t) ? i(t).get() : [t]), i.each(t, function(r, o) {
          var s, u, l, c, p, f, m, g = {};
          "object" === i.type(o) && (o.nodeType && (o = i(o)), h(o) ? (g = {
            href: o.data("fancybox-href") || o.attr("href"),
            title: i("<div/>").text(o.data("fancybox-title") || o.attr("title")).html(),
            isDom: !0,
            element: o
          }, i.metadata && i.extend(!0, g, o.metadata())) : g = o), s = e.href || g.href || (d(o) ? o : null), u = e.title !== n ? e.title : g.title || "", l = e.content || g.content, c = l ? "html" : e.type || g.type, !c && g.isDom && (c = o.data("fancybox-type"), c || (p = o.prop("class").match(/fancybox\.(\w+)/), c = p ? p[1] : null)), d(s) && (c || (a.isImage(s) ? c = "image" : a.isSWF(s) ? c = "swf" : "#" === s.charAt(0) ? c = "inline" : d(o) && (c = "html", l = o)), "ajax" === c && (f = s.split(/\s+/, 2), s = f.shift(), m = f.shift())), l || ("inline" === c ? s ? l = i(d(s) ? s.replace(/.*(?=#[^\s]+$)/, "") : s) : g.isDom && (l = o) : "html" === c ? l = s : c || s || !g.isDom || (c = "inline", l = o)), i.extend(g, {
            href: s,
            type: c,
            content: l,
            title: u,
            selector: m
          }), t[r] = g
        }), a.opts = i.extend(!0, {}, a.defaults, e), e.keys !== n && (a.opts.keys = e.keys ? i.extend({}, a.defaults.keys, e.keys) : !1), a.group = t, a._start(a.opts.index)) : void 0
      },
      cancel: function() {
        var t = a.coming;
        t && !1 === a.trigger("onCancel") || (a.hideLoading(), t && (a.ajaxLoad && a.ajaxLoad.abort(), a.ajaxLoad = null, a.imgPreload && (a.imgPreload.onload = a.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), a.coming = null, a.current || a._afterZoomOut(t)))
      },
      close: function(t) {
        a.cancel(), !1 !== a.trigger("beforeClose") && (a.unbindEvents(), a.isActive && (a.isOpen && t !== !0 ? (a.isOpen = a.isOpened = !1, a.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), a.wrap.stop(!0, !0).removeClass("fancybox-opened"), a.transitions[a.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), a._afterZoomOut())))
      },
      play: function(t) {
        var e = function() {
            clearTimeout(a.player.timer)
          },
          i = function() {
            e(), a.current && a.player.isActive && (a.player.timer = setTimeout(a.next, a.current.playSpeed))
          },
          n = function() {
            e(), s.unbind(".player"), a.player.isActive = !1, a.trigger("onPlayEnd")
          },
          r = function() {
            a.current && (a.current.loop || a.current.index < a.group.length - 1) && (a.player.isActive = !0, s.bind({
              "onCancel.player beforeClose.player": n,
              "onUpdate.player": i,
              "beforeLoad.player": e
            }), i(), a.trigger("onPlayStart"))
          };
        t === !0 || !a.player.isActive && t !== !1 ? r() : n()
      },
      next: function(t) {
        var e = a.current;
        e && (d(t) || (t = e.direction.next), a.jumpto(e.index + 1, t, "next"))
      },
      prev: function(t) {
        var e = a.current;
        e && (d(t) || (t = e.direction.prev), a.jumpto(e.index - 1, t, "prev"))
      },
      jumpto: function(t, e, i) {
        var r = a.current;
        r && (t = m(t), a.direction = e || r.direction[t >= r.index ? "next" : "prev"], a.router = i || "jumpto", r.loop && (0 > t && (t = r.group.length + t % r.group.length), t %= r.group.length), r.group[t] !== n && (a.cancel(), a._start(t)))
      },
      reposition: function(t, e) {
        var n, r = a.current,
          o = r ? r.wrap : null;
        o && (n = a._getPosition(e), t && "scroll" === t.type ? (delete n.position, o.stop(!0, !0).animate(n, 200)) : (o.css(n), r.pos = i.extend({}, r.dim, n)))
      },
      update: function(t) {
        var e = t && t.originalEvent && t.originalEvent.type,
          i = !e || "orientationchange" === e;
        i && (clearTimeout(l), l = null), a.isOpen && !l && (l = setTimeout(function() {
          var n = a.current;
          n && !a.isClosing && (a.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && n.autoResize) && a._setDimension(), "scroll" === e && n.canShrink || a.reposition(t), a.trigger("onUpdate"), l = null)
        }, i && !c ? 0 : 300))
      },
      toggle: function(t) {
        a.isOpen && (a.current.fitToView = "boolean" === i.type(t) ? t : !a.current.fitToView, c && (a.wrap.removeAttr("style").addClass("fancybox-tmp"), a.trigger("onUpdate")), a.update())
      },
      hideLoading: function() {
        s.unbind(".loading"), i("#fancybox-loading").remove()
      },
      showLoading: function() {
        var t, e;
        a.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body"), s.bind("keydown.loading", function(t) {
          27 === (t.which || t.keyCode) && (t.preventDefault(), a.cancel())
        }), a.defaults.fixed || (e = a.getViewport(), t.css({
          position: "absolute",
          top: .5 * e.h + e.y,
          left: .5 * e.w + e.x
        })), a.trigger("onLoading")
      },
      getViewport: function() {
        var e = a.current && a.current.locked || !1,
          i = {
            x: o.scrollLeft(),
            y: o.scrollTop()
          };
        return e && e.length ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = c && t.innerWidth ? t.innerWidth : o.width(), i.h = c && t.innerHeight ? t.innerHeight : o.height()), i
      },
      unbindEvents: function() {
        a.wrap && h(a.wrap) && a.wrap.unbind(".fb"), s.unbind(".fb"), o.unbind(".fb")
      },
      bindEvents: function() {
        var t, e = a.current;
        e && (o.bind("orientationchange.fb" + (c ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), a.update), t = e.keys, t && s.bind("keydown.fb", function(r) {
          var o = r.which || r.keyCode,
            s = r.target || r.srcElement;
          return 27 === o && a.coming ? !1 : void(r.ctrlKey || r.altKey || r.shiftKey || r.metaKey || s && (s.type || i(s).is("[contenteditable]")) || i.each(t, function(t, s) {
            return e.group.length > 1 && s[o] !== n ? (a[t](s[o]), r.preventDefault(), !1) : i.inArray(o, s) > -1 ? (a[t](), r.preventDefault(), !1) : void 0
          }))
        }), i.fn.mousewheel && e.mouseWheel && a.wrap.bind("mousewheel.fb", function(t, n, r, o) {
          for (var s = t.target || null, u = i(s), l = !1; u.length && !(l || u.is(".fancybox-skin") || u.is(".fancybox-wrap"));) l = f(u[0]), u = i(u).parent();
          0 === n || l || a.group.length > 1 && !e.canShrink && (o > 0 || r > 0 ? a.prev(o > 0 ? "down" : "left") : (0 > o || 0 > r) && a.next(0 > o ? "up" : "right"), t.preventDefault())
        }))
      },
      trigger: function(t, e) {
        var n, r = e || a.coming || a.current;
        if (r) {
          if (i.isFunction(r[t]) && (n = r[t].apply(r, Array.prototype.slice.call(arguments, 1))), n === !1) return !1;
          r.helpers && i.each(r.helpers, function(e, n) {
            n && a.helpers[e] && i.isFunction(a.helpers[e][t]) && a.helpers[e][t](i.extend(!0, {}, a.helpers[e].defaults, n), r)
          })
        }
        s.trigger(t)
      },
      isImage: function(t) {
        return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
      },
      isSWF: function(t) {
        return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
      },
      _start: function(t) {
        var e, n, r, o, s, u = {};
        if (t = m(t), e = a.group[t] || null, !e) return !1;
        if (u = i.extend(!0, {}, a.opts, e), o = u.margin, s = u.padding, "number" === i.type(o) && (u.margin = [o, o, o, o]), "number" === i.type(s) && (u.padding = [s, s, s, s]), u.modal && i.extend(!0, u, {
            closeBtn: !1,
            closeClick: !1,
            nextClick: !1,
            arrows: !1,
            mouseWheel: !1,
            keys: null,
            helpers: {
              overlay: {
                closeClick: !1
              }
            }
          }), u.autoSize && (u.autoWidth = u.autoHeight = !0), "auto" === u.width && (u.autoWidth = !0), "auto" === u.height && (u.autoHeight = !0), u.group = a.group, u.index = t, a.coming = u, !1 === a.trigger("beforeLoad")) return void(a.coming = null);
        if (r = u.type, n = u.href, !r) return a.coming = null, a.current && a.router && "jumpto" !== a.router ? (a.current.index = t, a[a.router](a.direction)) : !1;
        if (a.isActive = !0, ("image" === r || "swf" === r) && (u.autoHeight = u.autoWidth = !1, u.scrolling = "visible"), "image" === r && (u.aspectRatio = !0), "iframe" === r && c && (u.scrolling = "scroll"), u.wrap = i(u.tpl.wrap).addClass("fancybox-" + (c ? "mobile" : "desktop") + " fancybox-type-" + r + " fancybox-tmp " + u.wrapCSS).appendTo(u.parent || "body"), i.extend(u, {
            skin: i(".fancybox-skin", u.wrap),
            outer: i(".fancybox-outer", u.wrap),
            inner: i(".fancybox-inner", u.wrap)
          }), i.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
            u.skin.css("padding" + e, g(u.padding[t]))
          }), a.trigger("onReady"), "inline" === r || "html" === r) {
          if (!u.content || !u.content.length) return a._error("content")
        } else if (!n) return a._error("href");
        "image" === r ? a._loadImage() : "ajax" === r ? a._loadAjax() : "iframe" === r ? a._loadIframe() : a._afterLoad()
      },
      _error: function(t) {
        i.extend(a.coming, {
          type: "html",
          autoWidth: !0,
          autoHeight: !0,
          minWidth: 0,
          minHeight: 0,
          scrolling: "no",
          hasError: t,
          content: a.coming.tpl.error
        }), a._afterLoad()
      },
      _loadImage: function() {
        var t = a.imgPreload = new Image;
        t.onload = function() {
          this.onload = this.onerror = null, a.coming.width = this.width / a.opts.pixelRatio, a.coming.height = this.height / a.opts.pixelRatio, a._afterLoad()
        }, t.onerror = function() {
          this.onload = this.onerror = null, a._error("image")
        }, t.src = a.coming.href, t.complete !== !0 && a.showLoading()
      },
      _loadAjax: function() {
        var t = a.coming;
        a.showLoading(), a.ajaxLoad = i.ajax(i.extend({}, t.ajax, {
          url: t.href,
          error: function(t, e) {
            a.coming && "abort" !== e ? a._error("ajax", t) : a.hideLoading()
          },
          success: function(e, i) {
            "success" === i && (t.content = e, a._afterLoad())
          }
        }))
      },
      _loadIframe: function() {
        var t = a.coming,
          e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", c ? "auto" : t.iframe.scrolling).attr("src", t.href);
        i(t.wrap).bind("onReset", function() {
          try {
            i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
          } catch (t) {}
        }), t.iframe.preload && (a.showLoading(), e.one("load", function() {
          i(this).data("ready", 1), c || i(this).bind("load.fb", a.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), a._afterLoad()
        })), t.content = e.appendTo(t.inner), t.iframe.preload || a._afterLoad()
      },
      _preloadImages: function() {
        var t, e, i = a.group,
          n = a.current,
          r = i.length,
          o = n.preload ? Math.min(n.preload, r - 1) : 0;
        for (e = 1; o >= e; e += 1) t = i[(n.index + e) % r], "image" === t.type && t.href && ((new Image).src = t.href)
      },
      _afterLoad: function() {
        var t, e, n, r, o, s, u = a.coming,
          l = a.current,
          c = "fancybox-placeholder";
        if (a.hideLoading(), u && a.isActive !== !1) {
          if (!1 === a.trigger("afterLoad", u, l)) return u.wrap.stop(!0).trigger("onReset").remove(), void(a.coming = null);
          switch (l && (a.trigger("beforeChange", l), l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), a.unbindEvents(), t = u, e = u.content, n = u.type, r = u.scrolling, i.extend(a, {
            wrap: t.wrap,
            skin: t.skin,
            outer: t.outer,
            inner: t.inner,
            current: t,
            previous: l
          }), o = t.href, n) {
            case "inline":
            case "ajax":
            case "html":
              t.selector ? e = i("<div>").html(e).find(t.selector) : h(e) && (e.data(c) || e.data(c, i('<div class="' + c + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                i(this).find(e).length && e.hide().replaceAll(e.data(c)).data(c, !1)
              }));
              break;
            case "image":
              e = t.tpl.image.replace(/\{href\}/g, o);
              break;
            case "swf":
              e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', s = "", i.each(t.swf, function(t, i) {
                e += '<param name="' + t + '" value="' + i + '"></param>', s += " " + t + '="' + i + '"'
              }), e += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + s + "></embed></object>"
          }
          h(e) && e.parent().is(t.inner) || t.inner.append(e), a.trigger("beforeShow"), t.inner.css("overflow", "yes" === r ? "scroll" : "no" === r ? "hidden" : r), a._setDimension(), a.reposition(), a.isOpen = !1, a.coming = null, a.bindEvents(), a.isOpened ? l.prevMethod && a.transitions[l.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), a.transitions[a.isOpened ? t.nextMethod : t.openMethod](), a._preloadImages()
        }
      },
      _setDimension: function() {
        var t, e, n, r, o, s, u, l, c, h, d, f, v, y, b, w = a.getViewport(),
          x = 0,
          _ = !1,
          k = !1,
          T = a.wrap,
          C = a.skin,
          S = a.inner,
          j = a.current,
          F = j.width,
          P = j.height,
          $ = j.minWidth,
          E = j.minHeight,
          A = j.maxWidth,
          O = j.maxHeight,
          D = j.scrolling,
          M = j.scrollOutside ? j.scrollbarWidth : 0,
          L = j.margin,
          N = m(L[1] + L[3]),
          R = m(L[0] + L[2]);
        if (T.add(C).add(S).width("auto").height("auto").removeClass("fancybox-tmp"), t = m(C.outerWidth(!0) - C.width()), e = m(C.outerHeight(!0) - C.height()), n = N + t, r = R + e, o = p(F) ? (w.w - n) * m(F) / 100 : F, s = p(P) ? (w.h - r) * m(P) / 100 : P, "iframe" === j.type) {
          if (y = j.content, j.autoHeight && 1 === y.data("ready")) try {
            y[0].contentWindow.document.location && (S.width(o).height(9999), b = y.contents().find("body"), M && b.css("overflow-x", "hidden"), s = b.outerHeight(!0))
          } catch (I) {}
        } else(j.autoWidth || j.autoHeight) && (S.addClass("fancybox-tmp"), j.autoWidth || S.width(o), j.autoHeight || S.height(s), j.autoWidth && (o = S.width()), j.autoHeight && (s = S.height()), S.removeClass("fancybox-tmp"));
        if (F = m(o), P = m(s), c = o / s, $ = m(p($) ? m($, "w") - n : $), A = m(p(A) ? m(A, "w") - n : A), E = m(p(E) ? m(E, "h") - r : E), O = m(p(O) ? m(O, "h") - r : O), u = A, l = O, j.fitToView && (A = Math.min(w.w - n, A), O = Math.min(w.h - r, O)), f = w.w - N, v = w.h - R, j.aspectRatio ? (F > A && (F = A, P = m(F / c)), P > O && (P = O, F = m(P * c)), $ > F && (F = $, P = m(F / c)), E > P && (P = E, F = m(P * c))) : (F = Math.max($, Math.min(F, A)), j.autoHeight && "iframe" !== j.type && (S.width(F), P = S.height()), P = Math.max(E, Math.min(P, O))), j.fitToView)
          if (S.width(F).height(P), T.width(F + t), h = T.width(), d = T.height(), j.aspectRatio)
            for (;
              (h > f || d > v) && F > $ && P > E && !(x++ > 19);) P = Math.max(E, Math.min(O, P - 10)), F = m(P * c), $ > F && (F = $, P = m(F / c)), F > A && (F = A, P = m(F / c)), S.width(F).height(P), T.width(F + t), h = T.width(), d = T.height();
          else F = Math.max($, Math.min(F, F - (h - f))), P = Math.max(E, Math.min(P, P - (d - v)));
        M && "auto" === D && s > P && f > F + t + M && (F += M), S.width(F).height(P), T.width(F + t), h = T.width(), d = T.height(), _ = (h > f || d > v) && F > $ && P > E, k = j.aspectRatio ? u > F && l > P && o > F && s > P : (u > F || l > P) && (o > F || s > P), i.extend(j, {
          dim: {
            width: g(h),
            height: g(d)
          },
          origWidth: o,
          origHeight: s,
          canShrink: _,
          canExpand: k,
          wPadding: t,
          hPadding: e,
          wrapSpace: d - C.outerHeight(!0),
          skinSpace: C.height() - P
        }), !y && j.autoHeight && P > E && O > P && !k && S.height("auto")
      },
      _getPosition: function(t) {
        var e = a.current,
          i = a.getViewport(),
          n = e.margin,
          r = a.wrap.width() + n[1] + n[3],
          o = a.wrap.height() + n[0] + n[2],
          s = {
            position: "absolute",
            top: n[0],
            left: n[3]
          };
        return e.autoCenter && e.fixed && !t && o <= i.h && r <= i.w ? s.position = "fixed" : e.locked || (s.top += i.y, s.left += i.x), s.top = g(Math.max(s.top, s.top + (i.h - o) * e.topRatio)), s.left = g(Math.max(s.left, s.left + (i.w - r) * e.leftRatio)), s
      },
      _afterZoomIn: function() {
        var t = a.current;
        t && (a.isOpen = a.isOpened = !0, a.wrap.css("overflow", "visible").addClass("fancybox-opened"), a.update(), (t.closeClick || t.nextClick && a.group.length > 1) && a.inner.css("cursor", "pointer").bind("click.fb", function(e) {
          i(e.target).is("a") || i(e.target).parent().is("a") || (e.preventDefault(), a[t.closeClick ? "close" : "next"]())
        }), t.closeBtn && i(t.tpl.closeBtn).appendTo(a.skin).bind("click.fb", function(t) {
          t.preventDefault(), a.close()
        }), t.arrows && a.group.length > 1 && ((t.loop || t.index > 0) && i(t.tpl.prev).appendTo(a.outer).bind("click.fb", a.prev), (t.loop || t.index < a.group.length - 1) && i(t.tpl.next).appendTo(a.outer).bind("click.fb", a.next)), a.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? a.opts.autoPlay && !a.player.isActive && (a.opts.autoPlay = !1, a.play(!0)) : a.play(!1))
      },
      _afterZoomOut: function(t) {
        t = t || a.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(a, {
          group: {},
          opts: {},
          router: !1,
          current: null,
          isActive: !1,
          isOpened: !1,
          isOpen: !1,
          isClosing: !1,
          wrap: null,
          skin: null,
          outer: null,
          inner: null
        }), a.trigger("afterClose", t)
      }
    }), a.transitions = {
      getOrigPosition: function() {
        var t = a.current,
          e = t.element,
          i = t.orig,
          n = {},
          r = 50,
          o = 50,
          s = t.hPadding,
          u = t.wPadding,
          l = a.getViewport();
        return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), h(i) ? (n = i.offset(), i.is("img") && (r = i.outerWidth(), o = i.outerHeight())) : (n.top = l.y + (l.h - o) * t.topRatio, n.left = l.x + (l.w - r) * t.leftRatio), ("fixed" === a.wrap.css("position") || t.locked) && (n.top -= l.y, n.left -= l.x), n = {
          top: g(n.top - s * t.topRatio),
          left: g(n.left - u * t.leftRatio),
          width: g(r + u),
          height: g(o + s)
        }
      },
      step: function(t, e) {
        var i, n, r, o = e.prop,
          s = a.current,
          u = s.wrapSpace,
          l = s.skinSpace;
        ("width" === o || "height" === o) && (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), a.isClosing && (i = 1 - i), n = "width" === o ? s.wPadding : s.hPadding, r = t - n, a.skin[o](m("width" === o ? r : r - u * i)), a.inner[o](m("width" === o ? r : r - u * i - l * i)))
      },
      zoomIn: function() {
        var t = a.current,
          e = t.pos,
          n = t.openEffect,
          r = "elastic" === n,
          o = i.extend({
            opacity: 1
          }, e);
        delete o.position, r ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === n && (e.opacity = .1), a.wrap.css(e).animate(o, {
          duration: "none" === n ? 0 : t.openSpeed,
          easing: t.openEasing,
          step: r ? this.step : null,
          complete: a._afterZoomIn
        })
      },
      zoomOut: function() {
        var t = a.current,
          e = t.closeEffect,
          i = "elastic" === e,
          n = {
            opacity: .1
          };
        i && (n = this.getOrigPosition(), t.closeOpacity && (n.opacity = .1)), a.wrap.animate(n, {
          duration: "none" === e ? 0 : t.closeSpeed,
          easing: t.closeEasing,
          step: i ? this.step : null,
          complete: a._afterZoomOut
        })
      },
      changeIn: function() {
        var t, e = a.current,
          i = e.nextEffect,
          n = e.pos,
          r = {
            opacity: 1
          },
          o = a.direction,
          s = 200;
        n.opacity = .1, "elastic" === i && (t = "down" === o || "up" === o ? "top" : "left", "down" === o || "right" === o ? (n[t] = g(m(n[t]) - s), r[t] = "+=" + s + "px") : (n[t] = g(m(n[t]) + s), r[t] = "-=" + s + "px")), "none" === i ? a._afterZoomIn() : a.wrap.css(n).animate(r, {
          duration: e.nextSpeed,
          easing: e.nextEasing,
          complete: a._afterZoomIn
        })
      },
      changeOut: function() {
        var t = a.previous,
          e = t.prevEffect,
          n = {
            opacity: .1
          },
          r = a.direction,
          o = 200;
        "elastic" === e && (n["down" === r || "up" === r ? "top" : "left"] = ("up" === r || "left" === r ? "-" : "+") + "=" + o + "px"), t.wrap.animate(n, {
          duration: "none" === e ? 0 : t.prevSpeed,
          easing: t.prevEasing,
          complete: function() {
            i(this).trigger("onReset").remove()
          }
        })
      }
    }, a.helpers.overlay = {
      defaults: {
        closeClick: !0,
        speedOut: 200,
        showEarly: !0,
        css: {},
        locked: !c,
        fixed: !0
      },
      overlay: null,
      fixed: !1,
      el: i("html"),
      create: function(t) {
        var e;
        t = i.extend({}, this.defaults, t), this.overlay && this.close(), e = a.coming ? a.coming.parent : t.parent, this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(e && e.lenth ? e : "body"), this.fixed = !1, t.fixed && a.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
      },
      open: function(t) {
        var e = this;
        t = i.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (o.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
          return i(t.target).hasClass("fancybox-overlay") ? (a.isActive ? a.close() : e.close(), !1) : void 0
        }), this.overlay.css(t.css).show()
      },
      close: function() {
        o.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), o.scrollTop(this.scrollV).scrollLeft(this.scrollH)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
          overlay: null,
          fixed: !1
        })
      },
      update: function() {
        var t, i = "100%";
        this.overlay.width(i).height("100%"), u ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), s.width() > t && (i = s.width())) : s.width() > o.width() && (i = s.width()), this.overlay.width(i).height(s.height())
      },
      onReady: function(t, e) {
        var n = this.overlay;
        i(".fancybox-overlay").stop(!0, !0), n || this.create(t), t.locked && this.fixed && e.fixed && (e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments)
      },
      beforeShow: function(t, e) {
        e.locked && !this.el.hasClass("fancybox-lock") && (this.fixPosition !== !1 && i("*").filter(function() {
          return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
        }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = o.scrollTop(), this.scrollH = o.scrollLeft(), this.el.addClass("fancybox-lock"), o.scrollTop(this.scrollV).scrollLeft(this.scrollH)), this.open(t)
      },
      onUpdate: function() {
        this.fixed || this.update()
      },
      afterClose: function(t) {
        this.overlay && !a.coming && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
      }
    }, a.helpers.title = {
      defaults: {
        type: "float",
        position: "bottom"
      },
      beforeShow: function(t) {
        var e, n, r = a.current,
          o = r.title,
          s = t.type;
        if (i.isFunction(o) && (o = o.call(r.element, r)), d(o) && "" !== i.trim(o)) {
          switch (e = i('<div class="fancybox-title fancybox-title-' + s + '-wrap">' + o + "</div>"), s) {
            case "inside":
              n = a.skin;
              break;
            case "outside":
              n = a.wrap;
              break;
            case "over":
              n = a.inner;
              break;
            default:
              n = a.skin, e.appendTo("body"), u && e.width(e.width()), e.wrapInner('<span class="child"></span>'), a.current.margin[2] += Math.abs(m(e.css("margin-bottom")))
          }
          e["top" === t.position ? "prependTo" : "appendTo"](n)
        }
      }
    }, i.fn.fancybox = function(t) {
      var e, n = i(this),
        r = this.selector || "",
        o = function(o) {
          var s, u, l = i(this).blur(),
            c = e;
          o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || l.is(".fancybox-wrap") || (s = t.groupAttr || "data-fancybox-group", u = l.attr(s), u || (s = "rel", u = l.get(0)[s]), u && "" !== u && "nofollow" !== u && (l = r.length ? i(r) : n, l = l.filter("[" + s + '="' + u + '"]'), c = l.index(this)), t.index = c, a.open(l, t) !== !1 && o.preventDefault())
        };
      return t = t || {}, e = t.index || 0, r && t.live !== !1 ? s.undelegate(r, "click.fb-start").delegate(r + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", o) : n.unbind("click.fb-start").bind("click.fb-start", o), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, s.ready(function() {
      i.scrollbarWidth === n && (i.scrollbarWidth = function() {
        var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
          e = t.children(),
          n = e.innerWidth() - e.height(99).innerWidth();
        return t.remove(), n
      }), i.support.fixedPosition === n && (i.support.fixedPosition = function() {
        var t = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
          e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
        return t.remove(), e
      }()), i.extend(a.defaults, {
        scrollbarWidth: i.scrollbarWidth(),
        fixed: i.support.fixedPosition,
        parent: i("body")
      })
    }), s.load(function() {
      var e, n;
      e = i(t).width(), r.addClass("fancybox-lock-test"), n = i(t).width(), r.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (n - e) + "px !important;}</style>").appendTo("head")
    })
  }(window, document, jQuery),
  function(t) {
    "use strict";
    var e = t.fancybox,
      i = function(e, i, n) {
        return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function(t, i) {
          e = e.replace("$" + t, i || "")
        }), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
      };
    e.helpers.media = {
      defaults: {
        youtube: {
          matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: "opaque",
            enablejsapi: 1
          },
          type: "iframe",
          url: "//www.youtube.com/embed/$3"
        },
        vimeo: {
          matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1
          },
          type: "iframe",
          url: "//player.vimeo.com/video/$1"
        },
        metacafe: {
          matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
          params: {
            autoPlay: "yes"
          },
          type: "swf",
          url: function(e, i, n) {
            return n.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
          }
        },
        dailymotion: {
          matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
          params: {
            additionalInfos: 0,
            autoStart: 1
          },
          type: "swf",
          url: "//www.dailymotion.com/swf/video/$1"
        },
        twitvid: {
          matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
          params: {
            autoplay: 0
          },
          type: "iframe",
          url: "//www.twitvid.com/embed.php?guid=$1"
        },
        twitpic: {
          matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
          type: "image",
          url: "//twitpic.com/show/full/$1/"
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: "image",
          url: "//$1/p/$2/media/?size=l"
        },
        google_maps: {
          matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
          type: "iframe",
          url: function(t) {
            return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
          }
        }
      },
      beforeLoad: function(e, n) {
        var r, o, s, a, u = n.href || "",
          l = !1;
        for (r in e)
          if (e.hasOwnProperty(r) && (o = e[r], s = u.match(o.matcher))) {
            l = o.type, a = t.extend(!0, {}, o.params, n[r] || (t.isPlainObject(e[r]) ? e[r].params : null)), u = "function" === t.type(o.url) ? o.url.call(this, s, a, n) : i(o.url, s, a);
            break
          }
        l && (n.href = u, n.type = l, n.autoHeight = !1)
      }
    }
  }(jQuery),
  function(t) {
    t.InFieldLabels = function(e, i, n) {
      var r = this;
      r.$label = t(e), r.label = e, r.$field = t(i), r.field = i, r.$label.data("InFieldLabels", r), r.showing = !0, r.init = function() {
        var e;
        r.options = t.extend({}, t.InFieldLabels.defaultOptions, n), r.options.className && r.$label.addClass(r.options.className), setTimeout(function() {
          "" !== r.$field.val() ? (r.$label.hide(), r.showing = !1) : (r.$label.show(), r.showing = !0)
        }, 200), r.$field.focus(function() {
          r.fadeOnFocus()
        }).blur(function() {
          r.checkForEmpty(!0)
        }).bind("keydown.infieldlabel", function(t) {
          r.hideOnChange(t)
        }).bind("paste", function() {
          r.setOpacity(0)
        }).change(function() {
          r.checkForEmpty()
        }).bind("onPropertyChange", function() {
          r.checkForEmpty()
        }).bind("keyup.infieldlabel", function() {
          r.checkForEmpty()
        }), r.options.pollDuration > 0 && (e = setInterval(function() {
          "" !== r.$field.val() && (r.$label.hide(), r.showing = !1, clearInterval(e))
        }, r.options.pollDuration))
      }, r.fadeOnFocus = function() {
        r.showing && r.setOpacity(r.options.fadeOpacity)
      }, r.setOpacity = function(t) {
        r.$label.stop().animate({
          opacity: t
        }, r.options.fadeDuration, function() {
          0 == t && r.$label.hide()
        }), r.showing = t > 0
      }, r.checkForEmpty = function(t) {
        "" === r.$field.val() ? (r.prepForShow(), r.setOpacity(t ? 1 : r.options.fadeOpacity)) : r.setOpacity(0)
      }, r.prepForShow = function() {
        r.showing || (r.$label.css({
          opacity: 0
        }).show(), r.$field.bind("keydown.infieldlabel", function(t) {
          r.hideOnChange(t)
        }))
      }, r.hideOnChange = function(t) {
        16 !== t.keyCode && 9 !== t.keyCode && (r.showing && (r.$label.hide(), r.showing = !1), r.$field.unbind("keydown.infieldlabel"))
      }, r.init()
    }, t.InFieldLabels.defaultOptions = {
      fadeOpacity: .5,
      fadeDuration: 300,
      pollDuration: 0,
      enabledInputTypes: ["text", "search", "tel", "url", "email", "password", "number", "textarea"],
      className: !1
    }, t.fn.inFieldLabels = function(e) {
      var i = e && e.enabledInputTypes || t.InFieldLabels.defaultOptions.enabledInputTypes;
      return this.each(function() {
        var n, r, o = t(this).attr("for");
        o && (n = document.getElementById(o), n && (r = t.inArray(n.type, i), (-1 !== r || "TEXTAREA" === n.nodeName) && new t.InFieldLabels(this, n, e)))
      })
    }
  }(jQuery),
  function(t) {
    t.fn.responsiveHero = function(e) {
      function i(t, e) {
        return void 0 == e && (e = 16), t / e + "em"
      }

      function n() {
        var e = 0;
        return u.container.children().each(function() {
          e += t(this).outerHeight(!0)
        }), e
      }

      function r(e) {
        return "object" == typeof e ? t(e).outerHeight(!0) : e
      }

      function o() {
        var e = r(u.navigationHeight),
          o = r(u.logoContainerHeight),
          s = t(window),
          a = s.outerHeight();
        if (s.innerWidth() > u.desktopWidth || u.calculateOnMobile === !0) {
          var l = Math.round((a - o - e - n()) / 2);
          l < u.remainingSpaceMin ? l = u.remainingSpaceMin : l > u.remainingSpaceMax && (l = u.remainingSpaceMax), u.container.css({
            paddingTop: i(l + u.containerOffsetTop),
            paddingBottom: i(l - u.containerOffsetTop)
          })
        } else u.container.attr("style", null);
        "" !== u.backstretchImageUrl && u.hero.backstretch("resize")
      }
      var s, a = {
          hero: t(this),
          container: t(".hero-container"),
          navigationHeight: 0,
          logoContainerHeight: 0,
          backstretchImageUrl: "",
          remainingSpaceMin: 200,
          remainingSpaceMax: 350,
          desktopWidth: 1024,
          containerOffsetTop: 0,
          calculateOnMobile: !1,
          windowDebounce: 200
        },
        u = t.extend({}, a, e);
      window.onresize = function() {
        clearTimeout(s), s = setTimeout(o, u.windowDebounce)
      }, o(), "" !== u.backstretchImageUrl && u.hero.backstretch(u.backstretchImageUrl)
    }
  }(jQuery),
  function(t) {
    t.extend(t.fn, {
      validate: function(e) {
        if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
        var i = t.data(this[0], "validator");
        return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
          i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
        }), this.submit(function(e) {
          function n() {
            var n;
            return i.settings.submitHandler ? (i.submitButton && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && n.remove(), !1) : !0
          }
          return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
        })), i)
      },
      valid: function() {
        if (t(this[0]).is("form")) return this.validate().form();
        var e = !0,
          i = t(this[0].form).validate();
        return this.each(function() {
          e = e && i.element(this)
        }), e
      },
      removeAttrs: function(e) {
        var i = {},
          n = this;
        return t.each(e.split(/\s/), function(t, e) {
          i[e] = n.attr(e), n.removeAttr(e)
        }), i
      },
      rules: function(e, i) {
        var n = this[0];
        if (e) {
          var r = t.data(n.form, "validator").settings,
            o = r.rules,
            s = t.validator.staticRules(n);
          switch (e) {
            case "add":
              t.extend(s, t.validator.normalizeRule(i)), delete s.messages, o[n.name] = s, i.messages && (r.messages[n.name] = t.extend(r.messages[n.name], i.messages));
              break;
            case "remove":
              if (!i) return delete o[n.name], s;
              var a = {};
              return t.each(i.split(/\s/), function(t, e) {
                a[e] = s[e], delete s[e]
              }), a
          }
        }
        var u = t.validator.normalizeRules(t.extend({}, t.validator.classRules(n), t.validator.attributeRules(n), t.validator.dataRules(n), t.validator.staticRules(n)), n);
        if (u.required) {
          var l = u.required;
          delete u.required, u = t.extend({
            required: l
          }, u)
        }
        return u
      }
    }), t.extend(t.expr[":"], {
      blank: function(e) {
        return !t.trim("" + t(e).val())
      },
      filled: function(e) {
        return !!t.trim("" + t(e).val())
      },
      unchecked: function(e) {
        return !t(e).prop("checked")
      }
    }), t.validator = function(e, i) {
      this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function(e, i) {
      return 1 === arguments.length ? function() {
        var i = t.makeArray(arguments);
        return i.unshift(e), t.validator.format.apply(this, i)
      } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
        e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
          return i
        })
      }), e)
    }, t.extend(t.validator, {
      defaults: {
        messages: {},
        groups: {},
        rules: {},
        errorClass: "error",
        validClass: "valid",
        errorElement: "label",
        focusInvalid: !0,
        errorContainer: t([]),
        errorLabelContainer: t([]),
        onsubmit: !0,
        ignore: ":hidden",
        ignoreTitle: !1,
        onfocusin: function(t, e) {
          this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
        },
        onfocusout: function(t, e) {
          this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
        },
        onkeyup: function(t, e) {
          (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
        },
        onclick: function(t, e) {
          t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
        },
        highlight: function(e, i, n) {
          "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
        },
        unhighlight: function(e, i, n) {
          "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
        }
      },
      setDefaults: function(e) {
        t.extend(t.validator.defaults, e)
      },
      messages: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: t.validator.format("Please enter no more than {0} characters."),
        minlength: t.validator.format("Please enter at least {0} characters."),
        rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
        range: t.validator.format("Please enter a value between {0} and {1}."),
        max: t.validator.format("Please enter a value less than or equal to {0}."),
        min: t.validator.format("Please enter a value greater than or equal to {0}.")
      },
      autoCreateRanges: !1,
      prototype: {
        init: function() {
          function e(e) {
            var i = t.data(this[0].form, "validator"),
              n = "on" + e.type.replace(/^validate/, "");
            i.settings[n] && i.settings[n].call(i, this[0], e)
          }
          this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
          var i = this.groups = {};
          t.each(this.settings.groups, function(e, n) {
            "string" == typeof n && (n = n.split(/\s/)), t.each(n, function(t, n) {
              i[n] = e
            })
          });
          var n = this.settings.rules;
          t.each(n, function(e, i) {
            n[e] = t.validator.normalizeRule(i)
          }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
        },
        form: function() {
          return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
        },
        checkForm: function() {
          this.prepareForm();
          for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
          return this.valid()
        },
        element: function(e) {
          e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e), this.currentElements = t(e);
          var i = this.check(e) !== !1;
          return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
        },
        showErrors: function(e) {
          if (e) {
            t.extend(this.errorMap, e), this.errorList = [];
            for (var i in e) this.errorList.push({
              message: e[i],
              element: this.findByName(i)[0]
            });
            this.successList = t.grep(this.successList, function(t) {
              return !(t.name in e)
            })
          }
          this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
        },
        resetForm: function() {
          t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
        },
        numberOfInvalids: function() {
          return this.objectLength(this.invalid)
        },
        objectLength: function(t) {
          var e = 0;
          for (var i in t) e++;
          return e
        },
        hideErrors: function() {
          this.addWrapper(this.toHide).hide()
        },
        valid: function() {
          return 0 === this.size()
        },
        size: function() {
          return this.errorList.length
        },
        focusInvalid: function() {
          if (this.settings.focusInvalid) try {
            t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
          } catch (e) {}
        },
        findLastActive: function() {
          var e = this.lastActive;
          return e && 1 === t.grep(this.errorList, function(t) {
            return t.element.name === e.name
          }).length && e
        },
        elements: function() {
          var e = this,
            i = {};
          return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
            return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
          })
        },
        clean: function(e) {
          return t(e)[0]
        },
        errors: function() {
          var e = this.settings.errorClass.replace(" ", ".");
          return t(this.settings.errorElement + "." + e, this.errorContext)
        },
        reset: function() {
          this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
        },
        prepareForm: function() {
          this.reset(), this.toHide = this.errors().add(this.containers)
        },
        prepareElement: function(t) {
          this.reset(), this.toHide = this.errorsFor(t)
        },
        elementValue: function(e) {
          var i = t(e).attr("type"),
            n = t(e).val();
          return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof n ? n.replace(/\r/g, "") : n
        },
        check: function(e) {
          e = this.validationTargetFor(this.clean(e));
          var i, n = t(e).rules(),
            r = !1,
            o = this.elementValue(e);
          for (var s in n) {
            var a = {
              method: s,
              parameters: n[s]
            };
            try {
              if (i = t.validator.methods[s].call(this, o, e, a.parameters), "dependency-mismatch" === i) {
                r = !0;
                continue
              }
              if (r = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
              if (!i) return this.formatAndAdd(e, a), !1
            } catch (u) {
              throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + a.method + "' method.", u), u
            }
          }
          return r ? void 0 : (this.objectLength(n) && this.successList.push(e), !0)
        },
        customDataMessage: function(e, i) {
          return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase())
        },
        customMessage: function(t, e) {
          var i = this.settings.messages[t];
          return i && (i.constructor === String ? i : i[e])
        },
        findDefined: function() {
          for (var t = 0; t < arguments.length; t++)
            if (void 0 !== arguments[t]) return arguments[t]
        },
        defaultMessage: function(e, i) {
          return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
        },
        formatAndAdd: function(e, i) {
          var n = this.defaultMessage(e, i.method),
            r = /\$?\{(\d+)\}/g;
          "function" == typeof n ? n = n.call(this, i.parameters, e) : r.test(n) && (n = t.validator.format(n.replace(r, "{$1}"), i.parameters)), this.errorList.push({
            message: n,
            element: e
          }), this.errorMap[e.name] = n, this.submitted[e.name] = n
        },
        addWrapper: function(t) {
          return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
        },
        defaultShowErrors: function() {
          var t, e;
          for (t = 0; this.errorList[t]; t++) {
            var i = this.errorList[t];
            this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message)
          }
          if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
            for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
          if (this.settings.unhighlight)
            for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
          this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
        },
        validElements: function() {
          return this.currentElements.not(this.invalidElements())
        },
        invalidElements: function() {
          return t(this.errorList).map(function() {
            return this.element
          })
        },
        showLabel: function(e, i) {
          var n = this.errorsFor(e);
          n.length ? (n.removeClass(this.settings.validClass).addClass(this.settings.errorClass), n.html(i)) : (n = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (n = n.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(n).length || (this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e))), !i && this.settings.success && (n.text(""), "string" == typeof this.settings.success ? n.addClass(this.settings.success) : this.settings.success(n, e)), this.toShow = this.toShow.add(n)
        },
        errorsFor: function(e) {
          var i = this.idOrName(e);
          return this.errors().filter(function() {
            return t(this).attr("for") === i
          })
        },
        idOrName: function(t) {
          return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
        },
        validationTargetFor: function(t) {
          return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
        },
        checkable: function(t) {
          return /radio|checkbox/i.test(t.type)
        },
        findByName: function(e) {
          return t(this.currentForm).find("[name='" + e + "']")
        },
        getLength: function(e, i) {
          switch (i.nodeName.toLowerCase()) {
            case "select":
              return t("option:selected", i).length;
            case "input":
              if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
          }
          return e.length
        },
        depend: function(t, e) {
          return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
        },
        dependTypes: {
          "boolean": function(t, e) {
            return t
          },
          string: function(e, i) {
            return !!t(e, i.form).length
          },
          "function": function(t, e) {
            return t(e)
          }
        },
        optional: function(e) {
          var i = this.elementValue(e);
          return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
        },
        startRequest: function(t) {
          this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
        },
        stopRequest: function(e, i) {
          this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
        },
        previousValue: function(e) {
          return t.data(e, "previousValue") || t.data(e, "previousValue", {
            old: null,
            valid: !0,
            message: this.defaultMessage(e, "remote")
          })
        }
      },
      classRuleSettings: {
        required: {
          required: !0
        },
        email: {
          email: !0
        },
        url: {
          url: !0
        },
        date: {
          date: !0
        },
        dateISO: {
          dateISO: !0
        },
        number: {
          number: !0
        },
        digits: {
          digits: !0
        },
        creditcard: {
          creditcard: !0
        }
      },
      addClassRules: function(e, i) {
        e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
      },
      classRules: function(e) {
        var i = {},
          n = t(e).attr("class");
        return n && t.each(n.split(" "), function() {
          this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
        }), i
      },
      attributeRules: function(e) {
        var i = {},
          n = t(e),
          r = n[0].getAttribute("type");
        for (var o in t.validator.methods) {
          var s;
          "required" === o ? (s = n.get(0).getAttribute(o), "" === s && (s = !0), s = !!s) : s = n.attr(o), /min|max/.test(o) && (null === r || /number|range|text/.test(r)) && (s = Number(s)), s ? i[o] = s : r === o && "range" !== r && (i[o] = !0)
        }
        return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
      },
      dataRules: function(e) {
        var i, n, r = {},
          o = t(e);
        for (i in t.validator.methods) n = o.data("rule-" + i.toLowerCase()), void 0 !== n && (r[i] = n);
        return r
      },
      staticRules: function(e) {
        var i = {},
          n = t.data(e.form, "validator");
        return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
      },
      normalizeRules: function(e, i) {
        return t.each(e, function(n, r) {
          if (r === !1) return void delete e[n];
          if (r.param || r.depends) {
            var o = !0;
            switch (typeof r.depends) {
              case "string":
                o = !!t(r.depends, i.form).length;
                break;
              case "function":
                o = r.depends.call(i, i)
            }
            o ? e[n] = void 0 !== r.param ? r.param : !0 : delete e[n]
          }
        }), t.each(e, function(n, r) {
          e[n] = t.isFunction(r) ? r(i) : r
        }), t.each(["minlength", "maxlength"], function() {
          e[this] && (e[this] = Number(e[this]))
        }), t.each(["rangelength", "range"], function() {
          var i;
          e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
        }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
      },
      normalizeRule: function(e) {
        if ("string" == typeof e) {
          var i = {};
          t.each(e.split(/\s/), function() {
            i[this] = !0
          }), e = i
        }
        return e
      },
      addMethod: function(e, i, n) {
        t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
      },
      methods: {
        required: function(e, i, n) {
          if (!this.depend(n, i)) return "dependency-mismatch";
          if ("select" === i.nodeName.toLowerCase()) {
            var r = t(i).val();
            return r && r.length > 0
          }
          return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
        },
        email: function(t, e) {
          return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t)
        },
        url: function(t, e) {
          return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
        },
        date: function(t, e) {
          return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
        },
        dateISO: function(t, e) {
          return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
        },
        number: function(t, e) {
          return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
        },
        digits: function(t, e) {
          return this.optional(e) || /^\d+$/.test(t)
        },
        creditcard: function(t, e) {
          if (this.optional(e)) return "dependency-mismatch";
          if (/[^0-9 \-]+/.test(t)) return !1;
          var i = 0,
            n = 0,
            r = !1;
          t = t.replace(/\D/g, "");
          for (var o = t.length - 1; o >= 0; o--) {
            var s = t.charAt(o);
            n = parseInt(s, 10), r && (n *= 2) > 9 && (n -= 9), i += n, r = !r
          }
          return i % 10 === 0
        },
        minlength: function(e, i, n) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || r >= n
        },
        maxlength: function(e, i, n) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || n >= r
        },
        rangelength: function(e, i, n) {
          var r = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
          return this.optional(i) || r >= n[0] && r <= n[1]
        },
        min: function(t, e, i) {
          return this.optional(e) || t >= i
        },
        max: function(t, e, i) {
          return this.optional(e) || i >= t
        },
        range: function(t, e, i) {
          return this.optional(e) || t >= i[0] && t <= i[1]
        },
        equalTo: function(e, i, n) {
          var r = t(n);
          return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
            t(i).valid()
          }), e === r.val()
        },
        remote: function(e, i, n) {
          if (this.optional(i)) return "dependency-mismatch";
          var r = this.previousValue(i);
          if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), r.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = r.message, n = "string" == typeof n && {
              url: n
            } || n, r.old === e) return r.valid;
          r.old = e;
          var o = this;
          this.startRequest(i);
          var s = {};
          return s[i.name] = e, t.ajax(t.extend(!0, {
            url: n,
            mode: "abort",
            port: "validate" + i.name,
            dataType: "json",
            data: s,
            success: function(n) {
              o.settings.messages[i.name].remote = r.originalMessage;
              var s = n === !0 || "true" === n;
              if (s) {
                var a = o.formSubmitted;
                o.prepareElement(i), o.formSubmitted = a, o.successList.push(i), delete o.invalid[i.name], o.showErrors()
              } else {
                var u = {},
                  l = n || o.defaultMessage(i, "remote");
                u[i.name] = r.message = t.isFunction(l) ? l(e) : l, o.invalid[i.name] = !0, o.showErrors(u)
              }
              r.valid = s, o.stopRequest(i, s)
            }
          }, n)), "pending"
        }
      }
    }), t.format = t.validator.format
  }(jQuery),
  function(t) {
    var e = {};
    if (t.ajaxPrefilter) t.ajaxPrefilter(function(t, i, n) {
      var r = t.port;
      "abort" === t.mode && (e[r] && e[r].abort(), e[r] = n)
    });
    else {
      var i = t.ajax;
      t.ajax = function(n) {
        var r = ("mode" in n ? n : t.ajaxSettings).mode,
          o = ("port" in n ? n : t.ajaxSettings).port;
        return "abort" === r ? (e[o] && e[o].abort(), e[o] = i.apply(this, arguments), e[o]) : i.apply(this, arguments)
      }
    }
  }(jQuery),
  function(t) {
    t.extend(t.fn, {
      validateDelegate: function(e, i, n) {
        return this.bind(i, function(i) {
          var r = t(i.target);
          return r.is(e) ? n.apply(r, arguments) : void 0
        })
      }
    })
  }(jQuery),
  function(t, e) {
    var i = {
      catchMethods: {
        methodreturn: [],
        count: 0
      },
      init: function(e) {
        var i, n, r;
        e.originalEvent.origin.match(/vimeo/g) && "data" in e.originalEvent && (r = "string" === t.type(e.originalEvent.data) ? t.parseJSON(e.originalEvent.data) : e.originalEvent.data, r && (i = this.setPlayerID(r), n = this.setVimeoAPIurl(i), r.hasOwnProperty("event") && this.handleEvent(r, i, n), r.hasOwnProperty("method") && this.handleMethod(r, i, n)))
      },
      setPlayerID: function(e) {
        return e.hasOwnProperty("player_id") ? t(t("#" + e.player_id).length ? "#" + e.player_id : "iframe[src*=" + e.player_id + "]") : t("iframe[src*='vimeo']").eq(0)
      },
      setVimeoAPIurl: function(t) {
        return "http" !== t.attr("src").substr(0, 4) ? "https:" !== e.location.protocol ? "http:" + t.attr("src").split("?")[0] : "https:" + t.attr("src").split("?")[0] : t.attr("src").split("?")[0]
      },
      handleMethod: function(t, e, i) {
        this.catchMethods.methodreturn.push(t.value)
      },
      handleEvent: function(e, i, n) {
        switch (e.event.toLowerCase()) {
          case "ready":
            for (var r in t._data(i[0], "events")) r.match(/loadProgress|playProgress|play|pause|finish|seek|cuechange/) && i[0].contentWindow.postMessage(JSON.stringify({
              method: "addEventListener",
              value: r
            }), n);
            if (i.data("vimeoAPICall")) {
              for (var o = i.data("vimeoAPICall"), s = 0; s < o.length; s++) i[0].contentWindow.postMessage(JSON.stringify(o[s].message), o[s].api);
              i.removeData("vimeoAPICall")
            }
            i.data("vimeoReady", !0), i.triggerHandler("ready");
            break;
          case "seek":
            i.triggerHandler("seek", [e.data]);
            break;
          case "loadprogress":
            i.triggerHandler("loadProgress", [e.data]);
            break;
          case "playprogress":
            i.triggerHandler("playProgress", [e.data]);
            break;
          case "pause":
            i.triggerHandler("pause");
            break;
          case "finish":
            i.triggerHandler("finish");
            break;
          case "play":
            i.triggerHandler("play");
            break;
          case "cuechange":
            i.triggerHandler("cuechange")
        }
      }
    };
    t(e).on("message", function(t) {
      i.init(t)
    }), t.vimeo = function(t, n, r) {
      var o = {},
        s = i.catchMethods.methodreturn.length;
      if ("string" == typeof n && (o.method = n), void 0 !== typeof r && "function" != typeof r && (o.value = r), "iframe" === t.prop("tagName").toLowerCase() && o.hasOwnProperty("method"))
        if (t.data("vimeoReady")) t[0].contentWindow.postMessage(JSON.stringify(o), i.setVimeoAPIurl(t));
        else {
          var a = t.data("vimeoAPICall") ? t.data("vimeoAPICall") : [];
          a.push({
            message: o,
            api: i.setVimeoAPIurl(t)
          }), t.data("vimeoAPICall", a)
        }
      return "get" !== n.toString().substr(0, 3) && "paused" !== n.toString() || "function" != typeof r || (! function(t, n, r) {
        var o = e.setInterval(function() {
          i.catchMethods.methodreturn.length != t && (e.clearInterval(o), n(i.catchMethods.methodreturn[r]))
        }, 10)
      }(s, r, i.catchMethods.count), i.catchMethods.count++), t
    }, t.fn.vimeo = function(e, i) {
      return t.vimeo(this, e, i)
    }
  }(jQuery, window),
  function() {
    function t() {}

    function e(t, e) {
      this.path = t, "undefined" != typeof e && null !== e ? (this.at_2x_path = e, this.perform_check = !1) : (this.at_2x_path = t.replace(/\.\w+$/, function(t) {
        return "@2x" + t
      }), this.perform_check = !0)
    }

    function i(t) {
      this.el = t, this.path = new e(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
      var i = this;
      this.path.check_2x_variant(function(t) {
        t && i.swap()
      })
    }
    var n = "undefined" == typeof exports ? window : exports,
      r = {
        check_mime_type: !0
      };
    n.Retina = t, t.configure = function(t) {
      null == t && (t = {});
      for (var e in t) r[e] = t[e]
    }, t.init = function(t) {
      null == t && (t = n);
      var e = t.onload || new Function;
      t.onload = function() {
        var t, n, r = document.querySelectorAll("img:not(.no-retina)"),
          o = [];
        for (t = 0; t < r.length; t++) n = r[t], o.push(new i(n));
        e()
      }
    }, t.isRetina = function() {
      var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
      return n.devicePixelRatio > 1 ? !0 : n.matchMedia && n.matchMedia(t).matches ? !0 : !1
    }, n.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.is_external = function() {
      return !(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, e.prototype.check_2x_variant = function(t) {
      var i, n = this;
      return this.is_external() ? t(!1) : this.perform_check || "undefined" == typeof this.at_2x_path || null === this.at_2x_path ? this.at_2x_path in e.confirmed_paths ? t(!0) : (i = new XMLHttpRequest, i.open("HEAD", this.at_2x_path), i.onreadystatechange = function() {
        if (4 != i.readyState) return t(!1);
        if (i.status >= 200 && i.status <= 399) {
          if (r.check_mime_type) {
            var o = i.getResponseHeader("Content-Type");
            if (null == o || !o.match(/^image/i)) return t(!1)
          }
          return e.confirmed_paths.push(n.at_2x_path), t(!0)
        }
        return t(!1)
      }, i.send(), void 0) : t(!0)
    }, n.RetinaImage = i, i.prototype.swap = function(t) {
      function e() {
        i.el.complete ? (i.el.setAttribute("width", i.el.offsetWidth), i.el.setAttribute("height", i.el.offsetHeight), i.el.setAttribute("src", t)) : setTimeout(e, 5)
      }
      "undefined" == typeof t && (t = this.path.at_2x_path);
      var i = this;
      e()
    }, t.isRetina() && t.init(n)
  }(),
  function(t, e) {
    "use strict";
    var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!i.TweenLite) {
      var n, r, o, s, a, u = function(t) {
          var e, n = t.split("."),
            r = i;
          for (e = 0; n.length > e; e++) r[n[e]] = r = r[n[e]] || {};
          return r
        },
        l = u("com.greensock"),
        c = 1e-10,
        h = function(t) {
          var e, i = [],
            n = t.length;
          for (e = 0; e !== n; i.push(t[e++]));
          return i
        },
        d = function() {},
        p = function() {
          var t = Object.prototype.toString,
            e = t.call([]);
          return function(i) {
            return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
          }
        }(),
        f = {},
        m = function(n, r, o, s) {
          this.sc = f[n] ? f[n].sc : [], f[n] = this, this.gsClass = null, this.func = o;
          var a = [];
          this.check = function(l) {
            for (var c, h, d, p, g = r.length, v = g; --g > -1;)(c = f[r[g]] || new m(r[g], [])).gsClass ? (a[g] = c.gsClass, v--) : l && c.sc.push(this);
            if (0 === v && o)
              for (h = ("com.greensock." + n).split("."), d = h.pop(), p = u(h.join("."))[d] = this.gsClass = o.apply(o, a), s && (i[d] = p, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                  return p
                }) : n === e && "undefined" != typeof module && module.exports && (module.exports = p)), g = 0; this.sc.length > g; g++) this.sc[g].check()
          }, this.check(!0)
        },
        g = t._gsDefine = function(t, e, i, n) {
          return new m(t, e, i, n)
        },
        v = l._class = function(t, e, i) {
          return e = e || function() {}, g(t, [], function() {
            return e
          }, i), e
        };
      g.globals = i;
      var y = [0, 0, 1, 1],
        b = [],
        w = v("easing.Ease", function(t, e, i, n) {
          this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? y.concat(e) : y
        }, !0),
        x = w.map = {},
        _ = w.register = function(t, e, i, n) {
          for (var r, o, s, a, u = e.split(","), c = u.length, h = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
            for (o = u[c], r = n ? v("easing." + o, null, !0) : l.easing[o] || {}, s = h.length; --s > -1;) a = h[s], x[o + "." + a] = x[a + o] = r[a] = t.getRatio ? t : t[a] || new t
        };
      for (o = w.prototype, o._calcEnd = !1, o.getRatio = function(t) {
          if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
          var e = this._type,
            i = this._power,
            n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
          return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
        }, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;) o = n[r] + ",Power" + r, _(new w(null, null, 1, r), o, "easeOut", !0), _(new w(null, null, 2, r), o, "easeIn" + (0 === r ? ",easeNone" : "")), _(new w(null, null, 3, r), o, "easeInOut");
      x.linear = l.easing.Linear.easeIn, x.swing = l.easing.Quad.easeInOut;
      var k = v("events.EventDispatcher", function(t) {
        this._listeners = {}, this._eventTarget = t || this
      });
      o = k.prototype, o.addEventListener = function(t, e, i, n, r) {
        r = r || 0;
        var o, u, l = this._listeners[t],
          c = 0;
        for (null == l && (this._listeners[t] = l = []), u = l.length; --u > -1;) o = l[u], o.c === e && o.s === i ? l.splice(u, 1) : 0 === c && r > o.pr && (c = u + 1);
        l.splice(c, 0, {
          c: e,
          s: i,
          up: n,
          pr: r
        }), this !== s || a || s.wake()
      }, o.removeEventListener = function(t, e) {
        var i, n = this._listeners[t];
        if (n)
          for (i = n.length; --i > -1;)
            if (n[i].c === e) return void n.splice(i, 1)
      }, o.dispatchEvent = function(t) {
        var e, i, n, r = this._listeners[t];
        if (r)
          for (e = r.length, i = this._eventTarget; --e > -1;) n = r[e], n && (n.up ? n.c.call(n.s || i, {
            type: t,
            target: i
          }) : n.c.call(n.s || i))
      };
      var T = t.requestAnimationFrame,
        C = t.cancelAnimationFrame,
        S = Date.now || function() {
          return (new Date).getTime()
        },
        j = S();
      for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !T;) T = t[n[r] + "RequestAnimationFrame"], C = t[n[r] + "CancelAnimationFrame"] || t[n[r] + "CancelRequestAnimationFrame"];
      v("Ticker", function(t, e) {
        var i, n, r, o, u, l = this,
          h = S(),
          p = e !== !1 && T,
          f = 500,
          m = 33,
          g = "tick",
          v = function(t) {
            var e, s, a = S() - j;
            a > f && (h += a - m), j += a, l.time = (j - h) / 1e3, e = l.time - u, (!i || e > 0 || t === !0) && (l.frame++, u += e + (e >= o ? .004 : o - e), s = !0), t !== !0 && (r = n(v)), s && l.dispatchEvent(g)
          };
        k.call(l), l.time = l.frame = 0, l.tick = function() {
          v(!0)
        }, l.lagSmoothing = function(t, e) {
          f = t || 1 / c, m = Math.min(e, f, 0)
        }, l.sleep = function() {
          null != r && (p && C ? C(r) : clearTimeout(r), n = d, r = null, l === s && (a = !1))
        }, l.wake = function() {
          null !== r ? l.sleep() : l.frame > 10 && (j = S() - f + 5), n = 0 === i ? d : p && T ? T : function(t) {
            return setTimeout(t, 0 | 1e3 * (u - l.time) + 1)
          }, l === s && (a = !0), v(2)
        }, l.fps = function(t) {
          return arguments.length ? (i = t, o = 1 / (i || 60), u = this.time + o, void l.wake()) : i
        }, l.useRAF = function(t) {
          return arguments.length ? (l.sleep(), p = t, void l.fps(i)) : p
        }, l.fps(t), setTimeout(function() {
          p && (!r || 5 > l.frame) && l.useRAF(!1)
        }, 1500)
      }), o = l.Ticker.prototype = new l.events.EventDispatcher, o.constructor = l.Ticker;
      var F = v("core.Animation", function(t, e) {
        if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
          a || s.wake();
          var i = this.vars.useFrames ? q : B;
          i.add(this, i._time), this.vars.paused && this.paused(!0)
        }
      });
      s = F.ticker = new l.Ticker, o = F.prototype, o._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
      var P = function() {
        a && S() - j > 2e3 && s.wake(), setTimeout(P, 2e3)
      };
      P(), o.play = function(t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
      }, o.pause = function(t, e) {
        return null != t && this.seek(t, e), this.paused(!0)
      }, o.resume = function(t, e) {
        return null != t && this.seek(t, e), this.paused(!1)
      }, o.seek = function(t, e) {
        return this.totalTime(Number(t), e !== !1)
      }, o.restart = function(t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
      }, o.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
      }, o.render = function() {}, o.invalidate = function() {
        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
      }, o.isActive = function() {
        var t, e = this._timeline,
          i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
      }, o._enabled = function(t, e) {
        return a || s.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
      }, o._kill = function() {
        return this._enabled(!1, !1)
      }, o.kill = function(t, e) {
        return this._kill(t, e), this
      }, o._uncache = function(t) {
        for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
        return this
      }, o._swapSelfInParams = function(t) {
        for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
        return i
      }, o.eventCallback = function(t, e, i, n) {
        if ("on" === (t || "").substr(0, 2)) {
          var r = this.vars;
          if (1 === arguments.length) return r[t];
          null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = p(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
        }
        return this
      }, o.delay = function(t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
      }, o.duration = function(t) {
        return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
      }, o.totalDuration = function(t) {
        return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
      }, o.time = function(t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
      }, o.totalTime = function(t, e, i) {
        if (a || s.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
          if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
            this._dirty && this.totalDuration();
            var n = this._totalDuration,
              r = this._timeline;
            if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
              for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
          }
          this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), D.length && V())
        }
        return this
      }, o.progress = o.totalProgress = function(t, e) {
        return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
      }, o.startTime = function(t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
      }, o.endTime = function(t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
      }, o.timeScale = function(t) {
        if (!arguments.length) return this._timeScale;
        if (t = t || c, this._timeline && this._timeline.smoothChildTiming) {
          var e = this._pauseTime,
            i = e || 0 === e ? e : this._timeline.totalTime();
          this._startTime = i - (i - this._startTime) * this._timeScale / t
        }
        return this._timeScale = t, this._uncache(!1)
      }, o.reversed = function(t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
      }, o.paused = function(t) {
        if (!arguments.length) return this._paused;
        if (t != this._paused && this._timeline) {
          a || t || s.wake();
          var e = this._timeline,
            i = e.rawTime(),
            n = i - this._pauseTime;
          !t && e.smoothChildTiming && (this._startTime += n, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== n && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
        }
        return this._gc && !t && this._enabled(!0, !1), this
      };
      var $ = v("core.SimpleTimeline", function(t) {
        F.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
      });
      o = $.prototype = new F, o.constructor = $, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function(t, e) {
        var i, n;
        if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
          for (n = t._startTime; i && i._startTime > n;) i = i._prev;
        return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
      }, o._remove = function(t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
      }, o.render = function(t, e, i) {
        var n, r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
      }, o.rawTime = function() {
        return a || s.wake(), this._totalTime
      };
      var E = v("TweenLite", function(e, i, n) {
          if (F.call(this, i, n), this.render = E.prototype.render, null == e) throw "Cannot tween a null target.";
          this.target = e = "string" != typeof e ? e : E.selector(e) || e;
          var r, o, s, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
            u = this.vars.overwrite;
          if (this._overwrite = u = null == u ? H[E.defaultOverwrite] : "number" == typeof u ? u >> 0 : H[u], (a || e instanceof Array || e.push && p(e)) && "number" != typeof e[0])
            for (this._targets = s = h(e), this._propLookup = [], this._siblings = [], r = 0; s.length > r; r++) o = s[r], o ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (s.splice(r--, 1), this._targets = s = s.concat(h(o))) : (this._siblings[r] = W(o, this, !1), 1 === u && this._siblings[r].length > 1 && U(o, this, null, 1, this._siblings[r])) : (o = s[r--] = E.selector(o), "string" == typeof o && s.splice(r + 1, 1)) : s.splice(r--, 1);
          else this._propLookup = {}, this._siblings = W(e, this, !1), 1 === u && this._siblings.length > 1 && U(e, this, null, 1, this._siblings);
          (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -c, this.render(-this._delay))
        }, !0),
        A = function(e) {
          return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        },
        O = function(t, e) {
          var i, n = {};
          for (i in t) z[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!N[i] || N[i] && N[i]._autoCSS) || (n[i] = t[i], delete t[i]);
          t.css = n
        };
      o = E.prototype = new F, o.constructor = E, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, E.version = "1.15.1", E.defaultEase = o._ease = new w(null, null, 1, 1), E.defaultOverwrite = "auto", E.ticker = s, E.autoSleep = !0, E.lagSmoothing = function(t, e) {
        s.lagSmoothing(t, e)
      }, E.selector = t.$ || t.jQuery || function(e) {
        var i = t.$ || t.jQuery;
        return i ? (E.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
      };
      var D = [],
        M = {},
        L = E._internals = {
          isArray: p,
          isSelector: A,
          lazyTweens: D
        },
        N = E._plugins = {},
        R = L.tweenLookup = {},
        I = 0,
        z = L.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1
        },
        H = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          "true": 1,
          "false": 0
        },
        q = F._rootFramesTimeline = new $,
        B = F._rootTimeline = new $,
        V = L.lazyRender = function() {
          var t, e = D.length;
          for (M = {}; --e > -1;) t = D[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
          D.length = 0
        };
      B._startTime = s.time, q._startTime = s.frame, B._active = q._active = !0, setTimeout(V, 1), F._updateRoot = E.render = function() {
        var t, e, i;
        if (D.length && V(), B.render((s.time - B._startTime) * B._timeScale, !1, !1), q.render((s.frame - q._startTime) * q._timeScale, !1, !1), D.length && V(), !(s.frame % 120)) {
          for (i in R) {
            for (e = R[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
            0 === e.length && delete R[i]
          }
          if (i = B._first, (!i || i._paused) && E.autoSleep && !q._first && 1 === s._listeners.tick.length) {
            for (; i && i._paused;) i = i._next;
            i || s.sleep()
          }
        }
      }, s.addEventListener("tick", F._updateRoot);
      var W = function(t, e, i) {
          var n, r, o = t._gsTweenID;
          if (R[o || (t._gsTweenID = o = "t" + I++)] || (R[o] = {
              target: t,
              tweens: []
            }), e && (n = R[o].tweens, n[r = n.length] = e, i))
            for (; --r > -1;) n[r] === e && n.splice(r, 1);
          return R[o].tweens
        },
        X = function(t, e, i, n) {
          var r, o, s = t.vars.onOverwrite;
          return s && (r = s(t, e, i, n)), s = E.onOverwrite, s && (o = s(t, e, i, n)), r !== !1 && o !== !1
        },
        U = function(t, e, i, n, r) {
          var o, s, a, u;
          if (1 === n || n >= 4) {
            for (u = r.length, o = 0; u > o; o++)
              if ((a = r[o]) !== e) a._gc || X(a, e) && a._enabled(!1, !1) && (s = !0);
              else if (5 === n) break;
            return s
          }
          var l, h = e._startTime + c,
            d = [],
            p = 0,
            f = 0 === e._duration;
          for (o = r.length; --o > -1;)(a = r[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (l = l || Y(e, 0, f), 0 === Y(a, l, f) && (d[p++] = a)) : h >= a._startTime && a._startTime + a.totalDuration() / a._timeScale > h && ((f || !a._initted) && 2e-10 >= h - a._startTime || (d[p++] = a)));
          for (o = p; --o > -1;)
            if (a = d[o], 2 === n && a._kill(i, t, e) && (s = !0), 2 !== n || !a._firstPT && a._initted) {
              if (2 !== n && !X(a, e)) continue;
              a._enabled(!1, !1) && (s = !0)
            }
          return s
        },
        Y = function(t, e, i) {
          for (var n = t._timeline, r = n._timeScale, o = t._startTime; n._timeline;) {
            if (o += n._startTime, r *= n._timeScale, n._paused) return -100;
            n = n._timeline
          }
          return o /= r, o > e ? o - e : i && o === e || !t._initted && 2 * c > o - e ? c : (o += t.totalDuration() / t._timeScale / r) > e + c ? 0 : o - e - c
        };
      o._init = function() {
        var t, e, i, n, r, o = this.vars,
          s = this._overwrittenProps,
          a = this._duration,
          u = !!o.immediateRender,
          l = o.ease;
        if (o.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
          for (n in o.startAt) r[n] = o.startAt[n];
          if (r.overwrite = !1, r.immediateRender = !0, r.lazy = u && o.lazy !== !1, r.startAt = r.delay = null, this._startAt = E.to(this.target, 0, r), u)
            if (this._time > 0) this._startAt = null;
            else if (0 !== a) return
        } else if (o.runBackwards && 0 !== a)
          if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
          else {
            0 !== this._time && (u = !1), i = {};
            for (n in o) z[n] && "autoCSS" !== n || (i[n] = o[n]);
            if (i.overwrite = 0, i.data = "isFromStart", i.lazy = u && o.lazy !== !1, i.immediateRender = u, this._startAt = E.to(this.target, 0, i), u) {
              if (0 === this._time) return
            } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
          }
        if (this._ease = l = l ? l instanceof w ? l : "function" == typeof l ? new w(l, o.easeParams) : x[l] || E.defaultEase : E.defaultEase, o.easeParams instanceof Array && l.config && (this._ease = l.config.apply(l, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
          for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], s ? s[t] : null) && (e = !0);
        else e = this._initProps(this.target, this._propLookup, this._siblings, s);
        if (e && E._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
          for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
        this._onUpdate = o.onUpdate, this._initted = !0
      }, o._initProps = function(e, i, n, r) {
        var o, s, a, u, l, c;
        if (null == e) return !1;
        M[e._gsTweenID] && V(), this.vars.css || e.style && e !== t && e.nodeType && N.css && this.vars.autoCSS !== !1 && O(this.vars, e);
        for (o in this.vars) {
          if (c = this.vars[o], z[o]) c && (c instanceof Array || c.push && p(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this));
          else if (N[o] && (u = new N[o])._onInitTween(e, this.vars[o], this)) {
            for (this._firstPT = l = {
                _next: this._firstPT,
                t: u,
                p: "setRatio",
                s: 0,
                c: 1,
                f: !0,
                n: o,
                pg: !0,
                pr: u._priority
              }, s = u._overwriteProps.length; --s > -1;) i[u._overwriteProps[s]] = this._firstPT;
            (u._priority || u._onInitAllProps) && (a = !0), (u._onDisable || u._onEnable) && (this._notifyPluginsOfEnabled = !0)
          } else this._firstPT = i[o] = l = {
            _next: this._firstPT,
            t: e,
            p: o,
            f: "function" == typeof e[o],
            n: o,
            pg: !1,
            pr: 0
          }, l.s = l.f ? e[o.indexOf("set") || "function" != typeof e["get" + o.substr(3)] ? o : "get" + o.substr(3)]() : parseFloat(e[o]), l.c = "string" == typeof c && "=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * Number(c.substr(2)) : Number(c) - l.s || 0;
          l && l._next && (l._next._prev = l)
        }
        return r && this._kill(r, e) ? this._initProps(e, i, n, r) : this._overwrite > 1 && this._firstPT && n.length > 1 && U(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (M[e._gsTweenID] = !0), a)
      }, o.render = function(t, e, i) {
        var n, r, o, s, a = this._time,
          u = this._duration,
          l = this._rawPrevTime;
        if (t >= u) this._totalTime = this._time = u, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete"), 0 === u && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > l || l === c && "isPause" !== this.data) && l !== t && (i = !0, l > c && (r = "onReverseComplete")), this._rawPrevTime = s = !e || t || l === t ? t : c);
        else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === u && l > 0 && l !== c) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === u && (this._initted || !this.vars.lazy || i) && (l >= 0 && (l !== c || "isPause" !== this.data) && (i = !0), this._rawPrevTime = s = !e || t || l === t ? t : c)), this._initted || (i = !0);
        else if (this._totalTime = this._time = t, this._easeType) {
          var h = t / u,
            d = this._easeType,
            p = this._easePower;
          (1 === d || 3 === d && h >= .5) && (h = 1 - h), 3 === d && (h *= 2), 1 === p ? h *= h : 2 === p ? h *= h * h : 3 === p ? h *= h * h * h : 4 === p && (h *= h * h * h * h), this.ratio = 1 === d ? 1 - h : 2 === d ? h : .5 > t / u ? h / 2 : 1 - h / 2
        } else this.ratio = this._ease.getRatio(t / u);
        if (this._time !== a || i) {
          if (!this._initted) {
            if (this._init(), !this._initted || this._gc) return;
            if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = l, D.push(this), void(this._lazy = [t, e]);
            this._time && !n ? this.ratio = this._ease.getRatio(this._time / u) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
          }
          for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === u) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || b))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
          this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== a || n) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || b)), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this.vars[r].apply(this.vars[r + "Scope"] || this, this.vars[r + "Params"] || b), 0 === u && this._rawPrevTime === c && s !== c && (this._rawPrevTime = 0))
        }
      }, o._kill = function(t, e, i) {
        if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : E.selector(e) || e;
        var n, r, o, s, a, u, l, c, h;
        if ((p(e) || A(e)) && "number" != typeof e[0])
          for (n = e.length; --n > -1;) this._kill(t, e[n]) && (u = !0);
        else {
          if (this._targets) {
            for (n = this._targets.length; --n > -1;)
              if (e === this._targets[n]) {
                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                break
              }
          } else {
            if (e !== this.target) return !1;
            a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
          }
          if (a) {
            if (l = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (E.onOverwrite || this.vars.onOverwrite)) {
              for (o in l) a[o] && (h || (h = []), h.push(o));
              if (!X(this, i, e, h)) return !1
            }
            for (o in l)(s = a[o]) && (s.pg && s.t._kill(l) && (u = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete a[o]), c && (r[o] = 1);
            !this._firstPT && this._initted && this._enabled(!1, !1)
          }
        }
        return u
      }, o.invalidate = function() {
        return this._notifyPluginsOfEnabled && E._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], F.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -c, this.render(-this._delay)), this
      }, o._enabled = function(t, e) {
        if (a || s.wake(), t && this._gc) {
          var i, n = this._targets;
          if (n)
            for (i = n.length; --i > -1;) this._siblings[i] = W(n[i], this, !0);
          else this._siblings = W(this.target, this, !0)
        }
        return F.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? E._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
      }, E.to = function(t, e, i) {
        return new E(t, e, i)
      }, E.from = function(t, e, i) {
        return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new E(t, e, i)
      }, E.fromTo = function(t, e, i, n) {
        return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new E(t, e, n)
      }, E.delayedCall = function(t, e, i, n, r) {
        return new E(e, 0, {
          delay: t,
          onComplete: e,
          onCompleteParams: i,
          onCompleteScope: n,
          onReverseComplete: e,
          onReverseCompleteParams: i,
          onReverseCompleteScope: n,
          immediateRender: !1,
          lazy: !1,
          useFrames: r,
          overwrite: 0
        })
      }, E.set = function(t, e) {
        return new E(t, 0, e)
      }, E.getTweensOf = function(t, e) {
        if (null == t) return [];
        t = "string" != typeof t ? t : E.selector(t) || t;
        var i, n, r, o;
        if ((p(t) || A(t)) && "number" != typeof t[0]) {
          for (i = t.length, n = []; --i > -1;) n = n.concat(E.getTweensOf(t[i], e));
          for (i = n.length; --i > -1;)
            for (o = n[i], r = i; --r > -1;) o === n[r] && n.splice(i, 1)
        } else
          for (n = W(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
        return n
      }, E.killTweensOf = E.killDelayedCallsTo = function(t, e, i) {
        "object" == typeof e && (i = e, e = !1);
        for (var n = E.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
      };
      var Q = v("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = Q.prototype
      }, !0);
      if (o = Q.prototype, Q.version = "1.10.1", Q.API = 2, o._firstPT = null, o._addTween = function(t, e, i, n, r, o) {
          var s, a;
          return null != n && (s = "number" == typeof n || "=" !== n.charAt(1) ? Number(n) - i : parseInt(n.charAt(0) + "1", 10) * Number(n.substr(2))) ? (this._firstPT = a = {
            _next: this._firstPT,
            t: t,
            p: e,
            s: i,
            c: s,
            f: "function" == typeof t[e],
            n: r || e,
            r: o
          }, a._next && (a._next._prev = a), a) : void 0
        }, o.setRatio = function(t) {
          for (var e, i = this._firstPT, n = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : n > e && e > -n && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
        }, o._kill = function(t) {
          var e, i = this._overwriteProps,
            n = this._firstPT;
          if (null != t[this._propName]) this._overwriteProps = [];
          else
            for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
          for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
          return !1
        }, o._roundProps = function(t, e) {
          for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
        }, E._onPluginEvent = function(t, e) {
          var i, n, r, o, s, a = e._firstPT;
          if ("_onInitAllProps" === t) {
            for (; a;) {
              for (s = a._next, n = r; n && n.pr > a.pr;) n = n._next;
              (a._prev = n ? n._prev : o) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : o = a, a = s
            }
            a = e._firstPT = r
          }
          for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
          return i
        }, Q.activate = function(t) {
          for (var e = t.length; --e > -1;) t[e].API === Q.API && (N[(new t[e])._propName] = t[e]);
          return !0
        }, g.plugin = function(t) {
          if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
          var e, i = t.propName,
            n = t.priority || 0,
            r = t.overwriteProps,
            o = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps"
            },
            s = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
              Q.call(this, i, n), this._overwriteProps = r || []
            }, t.global === !0),
            a = s.prototype = new Q(i);
          a.constructor = s, s.API = t.API;
          for (e in o) "function" == typeof t[e] && (a[o[e]] = t[e]);
          return s.version = t.version, Q.activate([s]), s
        }, n = t._gsQueue) {
        for (r = 0; n.length > r; r++) n[r]();
        for (o in f) f[o].func || t.console.log("GSAP encountered missing dependency: com.greensock." + o)
      }
      a = !1
    }
  }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite"),
  function() {
    var t = [].indexOf || function(t) {
        for (var e = 0, i = this.length; i > e; e++)
          if (e in this && this[e] === t) return e;
        return -1
      },
      e = [].slice;
    ! function(t, e) {
      return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(i) {
        return e(i, t)
      }) : e(t.jQuery, t)
    }(this, function(i, n) {
      var r, o, s, a, u, l, c, h, d, p, f, m, g, v, y, b;
      return r = i(n), h = t.call(n, "ontouchstart") >= 0, a = {
        horizontal: {},
        vertical: {}
      }, u = 1, c = {}, l = "waypoints-context-id", f = "resize.waypoints", m = "scroll.waypoints", g = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", o = function() {
        function t(t) {
          var e = this;
          this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + u++, this.oldScroll = {
            x: t.scrollLeft(),
            y: t.scrollTop()
          }, this.waypoints = {
            horizontal: {},
            vertical: {}
          }, this.element[l] = this.id, c[this.id] = this, t.bind(m, function() {
            var t;
            return e.didScroll || h ? void 0 : (e.didScroll = !0, t = function() {
              return e.doScroll(), e.didScroll = !1
            }, n.setTimeout(t, i[b].settings.scrollThrottle))
          }), t.bind(f, function() {
            var t;
            return e.didResize ? void 0 : (e.didResize = !0, t = function() {
              return i[b]("refresh"), e.didResize = !1
            }, n.setTimeout(t, i[b].settings.resizeThrottle))
          })
        }
        return t.prototype.doScroll = function() {
          var t, e = this;
          return t = {
            horizontal: {
              newScroll: this.$element.scrollLeft(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left"
            },
            vertical: {
              newScroll: this.$element.scrollTop(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up"
            }
          }, !h || t.vertical.oldScroll && t.vertical.newScroll || i[b]("refresh"), i.each(t, function(t, n) {
            var r, o, s;
            return s = [], o = n.newScroll > n.oldScroll, r = o ? n.forward : n.backward, i.each(e.waypoints[t], function(t, e) {
              var i, r;
              return n.oldScroll < (i = e.offset) && i <= n.newScroll ? s.push(e) : n.newScroll < (r = e.offset) && r <= n.oldScroll ? s.push(e) : void 0
            }), s.sort(function(t, e) {
              return t.offset - e.offset
            }), o || s.reverse(), i.each(s, function(t, e) {
              return e.options.continuous || t === s.length - 1 ? e.trigger([r]) : void 0
            })
          }), this.oldScroll = {
            x: t.horizontal.newScroll,
            y: t.vertical.newScroll
          }
        }, t.prototype.refresh = function() {
          var t, e, n, r = this;
          return n = i.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
            horizontal: {
              contextOffset: n ? 0 : e.left,
              contextScroll: n ? 0 : this.oldScroll.x,
              contextDimension: this.$element.width(),
              oldScroll: this.oldScroll.x,
              forward: "right",
              backward: "left",
              offsetProp: "left"
            },
            vertical: {
              contextOffset: n ? 0 : e.top,
              contextScroll: n ? 0 : this.oldScroll.y,
              contextDimension: n ? i[b]("viewportHeight") : this.$element.height(),
              oldScroll: this.oldScroll.y,
              forward: "down",
              backward: "up",
              offsetProp: "top"
            }
          }, i.each(t, function(t, e) {
            return i.each(r.waypoints[t], function(t, n) {
              var r, o, s, a, u;
              return r = n.options.offset, s = n.offset, o = i.isWindow(n.element) ? 0 : n.$element.offset()[e.offsetProp], i.isFunction(r) ? r = r.apply(n.element) : "string" == typeof r && (r = parseFloat(r), n.options.offset.indexOf("%") > -1 && (r = Math.ceil(e.contextDimension * r / 100))), n.offset = o - e.contextOffset + e.contextScroll - r, n.options.onlyOnScroll && null != s || !n.enabled ? void 0 : null !== s && s < (a = e.oldScroll) && a <= n.offset ? n.trigger([e.backward]) : null !== s && s > (u = e.oldScroll) && u >= n.offset ? n.trigger([e.forward]) : null === s && e.oldScroll >= n.offset ? n.trigger([e.forward]) : void 0
            })
          })
        }, t.prototype.checkEmpty = function() {
          return i.isEmptyObject(this.waypoints.horizontal) && i.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([f, m].join(" ")), delete c[this.id]) : void 0
        }, t
      }(), s = function() {
        function t(t, e, n) {
          var r, o;
          n = i.extend({}, i.fn[y].defaults, n), "bottom-in-view" === n.offset && (n.offset = function() {
            var t;
            return t = i[b]("viewportHeight"), i.isWindow(e.element) || (t = e.$element.height()), t - i(this).outerHeight()
          }), this.$element = t, this.element = t[0], this.axis = n.horizontal ? "horizontal" : "vertical", this.callback = n.handler, this.context = e, this.enabled = n.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = n, e.waypoints[this.axis][this.id] = this, a[this.axis][this.id] = this, r = null != (o = this.element[v]) ? o : [], r.push(this.id), this.element[v] = r
        }
        return t.prototype.trigger = function(t) {
          return this.enabled ? (null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0) : void 0
        }, t.prototype.disable = function() {
          return this.enabled = !1
        }, t.prototype.enable = function() {
          return this.context.refresh(), this.enabled = !0
        }, t.prototype.destroy = function() {
          return delete a[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
        }, t.getWaypointsByElement = function(t) {
          var e, n;
          return (n = t[v]) ? (e = i.extend({}, a.horizontal, a.vertical), i.map(n, function(t) {
            return e[t]
          })) : []
        }, t
      }(), p = {
        init: function(t, e) {
          var n;
          return null == e && (e = {}), null == (n = e.handler) && (e.handler = t), this.each(function() {
            var t, n, r, a;
            return t = i(this), r = null != (a = e.context) ? a : i.fn[y].defaults.context, i.isWindow(r) || (r = t.closest(r)), r = i(r), n = c[r[0][l]], n || (n = new o(r)), new s(t, n, e)
          }), i[b]("refresh"), this
        },
        disable: function() {
          return p._invoke.call(this, "disable")
        },
        enable: function() {
          return p._invoke.call(this, "enable")
        },
        destroy: function() {
          return p._invoke.call(this, "destroy")
        },
        prev: function(t, e) {
          return p._traverse.call(this, t, e, function(t, e, i) {
            return e > 0 ? t.push(i[e - 1]) : void 0
          })
        },
        next: function(t, e) {
          return p._traverse.call(this, t, e, function(t, e, i) {
            return e < i.length - 1 ? t.push(i[e + 1]) : void 0
          })
        },
        _traverse: function(t, e, r) {
          var o, s;
          return null == t && (t = "vertical"), null == e && (e = n), s = d.aggregate(e), o = [], this.each(function() {
            var e;
            return e = i.inArray(this, s[t]), r(o, e, s[t])
          }), this.pushStack(o)
        },
        _invoke: function(t) {
          return this.each(function() {
            var e;
            return e = s.getWaypointsByElement(this), i.each(e, function(e, i) {
              return i[t](), !0
            })
          }), this
        }
      }, i.fn[y] = function() {
        var t, n;
        return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], p[n] ? p[n].apply(this, t) : i.isFunction(n) ? p.init.apply(this, arguments) : i.isPlainObject(n) ? p.init.apply(this, [null, n]) : n ? i.error("The " + n + " method does not exist in jQuery Waypoints.") : i.error("jQuery Waypoints needs a callback function or handler option.")
      }, i.fn[y].defaults = {
        context: n,
        continuous: !0,
        enabled: !0,
        horizontal: !1,
        offset: 0,
        triggerOnce: !1
      }, d = {
        refresh: function() {
          return i.each(c, function(t, e) {
            return e.refresh()
          })
        },
        viewportHeight: function() {
          var t;
          return null != (t = n.innerHeight) ? t : r.height()
        },
        aggregate: function(t) {
          var e, n, r;
          return e = a, t && (e = null != (r = c[i(t)[0][l]]) ? r.waypoints : void 0), e ? (n = {
            horizontal: [],
            vertical: []
          }, i.each(n, function(t, r) {
            return i.each(e[t], function(t, e) {
              return r.push(e)
            }), r.sort(function(t, e) {
              return t.offset - e.offset
            }), n[t] = i.map(r, function(t) {
              return t.element
            }), n[t] = i.unique(n[t])
          }), n) : []
        },
        above: function(t) {
          return null == t && (t = n), d._filter(t, "vertical", function(t, e) {
            return e.offset <= t.oldScroll.y
          })
        },
        below: function(t) {
          return null == t && (t = n), d._filter(t, "vertical", function(t, e) {
            return e.offset > t.oldScroll.y
          })
        },
        left: function(t) {
          return null == t && (t = n), d._filter(t, "horizontal", function(t, e) {
            return e.offset <= t.oldScroll.x
          })
        },
        right: function(t) {
          return null == t && (t = n), d._filter(t, "horizontal", function(t, e) {
            return e.offset > t.oldScroll.x
          })
        },
        enable: function() {
          return d._invoke("enable")
        },
        disable: function() {
          return d._invoke("disable")
        },
        destroy: function() {
          return d._invoke("destroy")
        },
        extendFn: function(t, e) {
          return p[t] = e
        },
        _invoke: function(t) {
          var e;
          return e = i.extend({}, a.vertical, a.horizontal), i.each(e, function(e, i) {
            return i[t](), !0
          })
        },
        _filter: function(t, e, n) {
          var r, o;
          return (r = c[i(t)[0][l]]) ? (o = [], i.each(r.waypoints[e], function(t, e) {
            return n(r, e) ? o.push(e) : void 0
          }), o.sort(function(t, e) {
            return t.offset - e.offset
          }), i.map(o, function(t) {
            return t.element
          })) : []
        }
      }, i[b] = function() {
        var t, i;
        return i = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], d[i] ? d[i].apply(null, t) : d.aggregate.call(null, i)
      }, i[b].settings = {
        resizeThrottle: 100,
        scrollThrottle: 30
      }, r.load(function() {
        return i[b]("refresh")
      })
    })
  }.call(this),
  function() {
    ! function(t, e) {
      return "function" == typeof define && define.amd ? define(["jquery", "waypoints"], e) : e(t.jQuery)
    }(this, function(t) {
      var e, i;
      return e = {
        wrapper: '<div class="sticky-wrapper" />',
        stuckClass: "stuck"
      }, i = function(t, e) {
        return t.wrap(e.wrapper), t.parent()
      }, t.waypoints("extendFn", "sticky", function(n) {
        var r, o, s;
        return o = t.extend({}, t.fn.waypoint.defaults, e, n), r = i(this, o), s = o.handler, o.handler = function(e) {
          var i, n;
          return i = t(this).children(":first"), n = "down" === e || "right" === e, i.toggleClass(o.stuckClass, n), r.height(n ? i.outerHeight() : ""), null != s ? s.call(this, e) : void 0
        }, r.waypoint(o), this.data("stuckClass", o.stuckClass)
      }), t.waypoints("extendFn", "unsticky", function() {
        return this.parent().waypoint("destroy"), this.unwrap(), this.removeClass(this.data("stuckClass"))
      })
    })
  }.call(this), $(function() {
    function t(t, e, i) {
      var n = {};
      return $.each(t, function(t, r) {
        r[e] == i && (n = r)
      }), n
    }
    if (Modernizr.touch || $("html").hasClass("lt-ie9")) return !1;
    var e = ($("body"), $("#psd_download_modal")),
      i = location.search.replace("?", "").split("&").map(function(t) {
        return t.split("=")
      }),
      n = i[0][1];
    if (isNaN(n)) return !1;
    var r = [{
        downloadID: 1,
        imageURL: "/images/dribble_1.png",
        downloadURL: "https://www.dropbox.com/s/1jh475srlf5izi8/invision-skins.psd",
        emailIntro: "Hey, here's your free PSD download!",
        emailDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque placerat porttitor libero.",
        emailTwitterLink: "",
        emailFBLink: "",
        emailPinLink: ""
      }, {
        downloadID: 2,
        imageURL: "/images/sketch_2.png",
        downloadURL: "https://s3.amazonaws.com/www-assets.invisionapp.com/source.sketch",
        emailIntro: "Hey, here's your free Sketch UI kit!",
        emailDescription: "Your design buddies are going to love this.",
        emailTwitterLink: "",
        emailFBLink: "",
        emailPinLink: ""
      }],
      o = t(r, "downloadID", n);
    if (void 0 === o.imageURL) return !1;
    var s = (o.shotID, o.downloadURL, o.imageURL);
    e.find(".shot").append('<img width="400px" src="' + s + '"/>');
    var a, u = ($(this), $("#psd_download_email"));
    $.fancybox({
      padding: 0,
      autoDimensions: !0,
      href: "#psd_download_modal",
      afterShow: function() {
        e.find("input[type=text]").focus()
      }
    }), $(".psd_download_form").validate({
      rules: {
        psd_download_email: {
          required: !0,
          email: !0
        }
      },
      submitHandler: function(t) {
        $.post("/api/psdDownload", {
          email: u.val(),
          downloadID: n,
          hs_context: JSON.stringify({
            hutk: $.cookie("hubspotutk"),
            pageUrl: window.location.href,
            pageName: document.title
          })
        }, function() {
          $.fancybox({
            content: $("#psd_download_modal_confirmation"),
            padding: 0,
            afterShow: function() {
              a = setTimeout(function() {
                $.fancybox.close()
              }, 5e3)
            },
            afterClose: function() {
              clearTimeout(a)
            }
          })
        })
      }
    })
  });
var $body = $("body"),
  $tshirtModal = $("#tshirt_modal"),
  $tshirtTweet = $("#tshirt_tweet").clone(),
  $tshirtFollow = $("#tshirt_follow").clone(),
  isShirtModalOpen = !1,
  shirtTimer, modalDelay = 3e5,
  $tshirtSticky = $("#tshirt_sticky");
setupShirtModal(), tshirtFormSubmission(), $(function() {
  "use strict";

  function t() {
    i.fadeIn(500), a.length > 0 && (a.css({
      bottom: "200px",
      right: "25px"
    }), $(".zopim").css({
      bottom: "280px"
    })), i.find(".close").on("click", function(t) {
      t.preventDefault(), e()
    }), n.find(".button a").on("click", function(t) {
      t.preventDefault(), n.fadeOut(250, function() {
        r.fadeIn(250), r.find("input[name=email]").focus()
      })
    })
  }

  function e() {
    $.cookie("dont-show-tshirt-sticky-modal", 1, {
      path: "/",
      expires: 7300
    }), i.fadeOut(250), a.length > 0 && (a.css({
      bottom: "10px",
      right: "10px"
    }), $(".zopim").css({
      bottom: "90px"
    }))
  }
  if (Modernizr.touch || $.cookie("dont-show-tshirt-sticky-modal") || !$("body").hasClass("home")) return !1;
  var i = $("#tshirt_sticky"),
    n = i.find(".one"),
    r = i.find(".two"),
    o = i.find(".three"),
    s = i.find(".four"),
    a = $(".zopim-widget-in"),
    u = $(this),
    l = u.find("input[name=email]");
  i.find("form").validate({
    rules: {
      email: {
        required: !0,
        email: !0
      }
    },
    submitHandler: function(t) {
      try {
        ga("send", "event", "Redeemed Offer", "Tshirt Entry", "Popup"), ga("rollupTracker.send", "event", "Redeemed Offer", "Tshirt Entry", "Popup")
      } catch (i) {}
      try {
        analytics.identify({
          email: l.val()
        }), analytics.track("Tshirt", {
          email: l.val(),
          source: "tshirt_sticky"
        })
      } catch (i) {}
      $.post("/api/tshirtSubmission", {
        email: l.val(),
        listSource: "biscuit-tshirt-sticky",
        hs_context: JSON.stringify({
          hutk: $.cookie("hubspotutk"),
          pageUrl: window.location.href,
          pageName: document.title
        })
      }, function() {
        r.fadeOut(250, function() {
          o.fadeIn(250), o.find(".button a, .opt-out a").on("click", function() {
            s.fadeIn(250, function() {
              $(".global-share a").on("click", function() {
                e()
              })
            })
          })
        })
      })
    }
  }), t()
}), $(function() {
  if ($("body").hasClass("company")) {
    var t = $("#contact_form"),
      e = $("#contact_email"),
      i = $("#contact_name"),
      n = $("#contact_purpose"),
      r = $("#contact_question"),
      o = $("#contact-form-wrapper"),
      s = $("#contact-thankyou-wrapper"),
      a = $("button", s),
      u = $("#core_values"),
      l = $("ul a", u),
      c = 300,
      h = 0;
    l.on("mouseenter", function() {
      var t = $(this);
      h = setTimeout(function() {
        d(t)
      }, 200)
    }).on("mouseleave", function() {
      clearTimeout(h)
    }).on("click", function(t) {
      t.preventDefault()
    });
    var d = function(t) {
      l.removeClass("active"), t.addClass("active"), u.find(".tab.active").finish().fadeOut(c, function() {
        $(this).removeClass("active"), $(".tab" + t.attr("href")).addClass("active").fadeIn(c)
      })
    };
    t.validate({
      rules: {
        name: {
          required: !0
        },
        email: {
          required: !0,
          email: !0
        },
        question: {
          required: !0,
          minlength: 10
        }
      },
      submitHandler: function(a) {
        return t.data("isSubmissionInProgress") ? !1 : (t.data("isSubmissionInProgress", !0), void $.post("/api/contact", {
          name: i.val(),
          email: e.val(),
          question: r.val(),
          purpose: n.val()
        }, function(t) {
          o.fadeOut(300, function() {
            s.fadeIn(300, function() {
              i.val(""), e.val(""), r.val(""), n.val(""), $("label").each(function() {
                $(this).data("InFieldLabels").checkForEmpty()
              })
            })
          })
        }).always(function() {
          t.data("isSubmissionInProgress", !1)
        }))
      }
    }), a.on("click", function(t) {
      t.preventDefault(), s.fadeOut(300, function() {
        o.fadeIn(300, function() {
          i.focus()
        })
      })
    })
  }
}), $(function() {
  if ($("body").hasClass("customers")) {
    var t = $(".featured-customer"),
      e = function() {
        t.each(function() {
          var t, e = $(this),
            i = e.find(".wrap"),
            n = e.find(".slide-container.left"),
            r = e.find(".slide-container.right"),
            o = e.find(".see-why"),
            s = $.makeArray(i.find(".slide").clone()),
            a = $.makeArray(i.find(".slide").clone()),
            u = a.shift(),
            l = s.pop(),
            c = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
            h = {
              controls: !1,
              pager: !1
            };
          s.unshift(l), a.push(u), o.on("click", function(e) {
            e.preventDefault(), t.goToNextSlide()
          }), n.append($("<div/>", {
            "class": "wrap"
          }).append($(s))), r.append($("<div/>", {
            "class": "wrap"
          }).append($(a)));
          var d = n.find(".wrap").bxSlider(h),
            p = r.find(".wrap").bxSlider(h);
          t = e.find(".slide-container.center .wrap").bxSlider({
            useCSS: !c,
            preloadImages: "all",
            onSlideNext: function() {
              d.goToNextSlide(), p.goToNextSlide()
            },
            onSlidePrev: function() {
              d.goToPrevSlide(), p.goToPrevSlide()
            }
          })
        })
      };
    $.getScript("/assets/js/non-build/jquery.bxslider.js").then(e), $(".video-play").on("click", function(t) {
      t.preventDefault();
      var e = $(this),
        n = e.parent(".video-wrapper"),
        r = n.find(".video-play, .video-content, .video-image");
      player = $f($("#" + e.data("id"))[0]), i(r, 0, 0), n.removeClass("has-hover"), player.addEvent("ready", function() {
        player.addEvent("finish", function() {
          i(r, 1, .3, n)
        })
      }), player.api("play")
    });
    var i = function(t, e, i, n) {
      i = i || .3, TweenLite.to(t, i, {
        autoAlpha: e,
        force3D: !0,
        ease: Power2.easeOut,
        onCompleteParams: ["{self}"],
        onComplete: function(t) {
          1 == e && (void 0 !== typeof n && n.addClass("has-hover"), $(t.target.selector).attr("style", !1))
        }
      })
    }
  }
}), $(function() {
  "use strict";
  if ($("body").hasClass("enterprise")) {
    $(".hero").responsiveHero({
      calculateOnMobile: !0,
      logoContainerHeight: $(".customers"),
      navigationHeight: 0,
      remainingSpaceMin: 100,
      containerOffsetTop: 25
    });
    var t = $(document.body),
      e = function() {
        var e = $(window).height();
        e > 1e3 ? t.addClass("large-viewport").removeClass("narrow-viewport") : 800 > e ? t.removeClass("large-viewport").addClass("narrow-viewport") : t.removeClass("large-viewport narrow-viewport")
      };
    e();
    var i;
    $(window).on("resize", function() {
      clearTimeout(i), i = setTimeout(e, 200)
    });
    var n = new QuoteSlider({
      quoteSlider: $(".quotes.tour")
    });
    n.initialize(), $("a[href*=#]:not([href=#])").click(function() {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var t = $(this.hash),
          e = $(this),
          i = e.data("offset") || 0,
          n = e.data("duration") || .8;
        if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"), t.length) return TweenLite.to(window, n, {
          scrollTo: {
            y: t.offset().top - i
          },
          ease: Power2.easeOut
        }), !1
      }
    });
    var r = $("#signup form"),
      o = $("#ent_name"),
      s = $("#ent_email"),
      a = $("#ent_phone"),
      u = $("#ent_company"),
      l = $("#ent_companySize");
    $("#enterprise-confirmation-modal").clone();
    l.on("change", function() {
      var t = $(this),
        e = t.parent();
      return "" !== t.val() ? e.addClass("valid") : e.removeClass("valid")
    });
    var c = r.find('input[type="text"], input[type="email"]');
    $.each(c, function() {
      var t = $(this);
      t.parent(".row").append('<span class="helper-label">' + t.prev("label").text() + "</span>")
    }), c.on("keyup focusin keydown", function() {
      var t = $(this);
      t.val().length && t.parent(".row").addClass("label-visible")
    }), c.on("focusout", function() {
      $(this).parent(".row").removeClass("label-visible")
    }), r.validate({
      rules: {
        name: {
          required: !0
        },
        email: {
          required: !0,
          email: !0
        },
        phone: {
          required: !0
        },
        company: {
          required: !0
        },
        companySize: {
          required: !0
        }
      },
      messages: {
        name: {
          required: "*Required"
        },
        email: {
          required: "*Required",
          email: "*Invalid"
        },
        phone: {
          required: "*Required"
        },
        company: {
          required: "*Required"
        },
        companySize: {
          required: ""
        }
      },
      errorPlacement: function(t, e) {
        t.insertAfter(e), e.parent(".row").addClass("error")
      },
      highlight: function(t, e, i) {
        var n = $(t);
        n.is("select") ? n.parent().addClass(e).removeClass(i) : n.addClass(e).removeClass(i), n.parent(".row").addClass("error")
      },
      unhighlight: function(t, e, i) {
        var n = $(t);
        n.is("select") ? n.parent().addClass(i).removeClass(e) : n.addClass(i).removeClass(e), n.parent(".row").removeClass("error")
      },
      submitHandler: function(t) {
        return r.data("isSubmissionInProgress") ? !1 : (r.data("isSubmissionInProgress", !0), void $.post("/api/guided-tour", {
          name: o.val(),
          email: s.val(),
          phone: a.val(),
          companyName: u.val(),
          companySize: l.val(),
          formurl: "https://forms.hubspot.com/uploads/form/v2/425470/11e387b4-fff3-4915-884e-e714e13ead32",
          hs_context: JSON.stringify({
            hutk: Cookies.get("hubspotutk"),
            pageUrl: "http://invisionapp.com/enterprise",
            pageName: "Enterprise"
          })
        }, function(t) {
          "undefined" != typeof analytics && analytics && (analytics.identify({
            name: o.val(),
            email: s.val(),
            company: u.val()
          }), analytics.track("Requested Enterprise Demo")), h(), p(), o.val(""), s.val(""), a.val(""), u.val(""), l.val("").trigger("change"), window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "enterpriseSignup"])
        }).always(function() {
          r.data("isSubmissionInProgress", !1)
        }))
      }
    }), TweenLite.set($(".hero-modal"), {
      autoAlpha: 0,
      zIndex: -1
    });
    var h = function() {
        for (var t = document.querySelectorAll(".footer-form .row"), e = 0, i = 0, n = t.length; n > i; i++) TweenLite.to(t[i], .3, {
          force3D: !0,
          ease: Power2.easeInOut,
          delay: e,
          css: {
            autoAlpha: 0,
            transform: "translate(0, -20px)"
          },
          onComplete: function() {
            $(t[i]).hide()
          }
        }), e += .1
      },
      d = $(".confirmation");
    TweenLite.set(d, {
      css: {
        autoAlpha: 0,
        transform: "translate(0, -20px)",
        zIndex: -1
      }
    });
    var p = function() {
        for (var t = .5, e = 0, i = d.length; i > e; e++) TweenLite.to(d[e], .3, {
          force3D: !0,
          ease: Power2.easeInOut,
          delay: t,
          overwrite: 0,
          css: {
            autoAlpha: 1,
            transform: "translate(0, 0)",
            zIndex: 15
          }
        }), t += .1
      },
      f = new FullscreenVideo({
        playerId: "ad",
        modal: $("#ad").closest(".hero-modal"),
        fallback: "/assets/img/enterprise/video-fallback.jpg",
        mp4: "https://s3.amazonaws.com/www-assets.invisionapp.com/Enterprise/enterprise-loop.mdp4",
        webm: "https://s3.amazonaws.com/www-assets.invisionapp.com/Enterprise/enterprise-loop.webm",
        ogv: "https://s3.amazonaws.com/www-assets.invisionapp.com/Enterprise/enterprise-loop.ogv"
      });
    f.initialize(), $(".hero-play.ad").on("click touchend", function() {
      return f.openVideoModal(), !1
    }), $(".hero-modal-close").on("click touchend", function() {
      return f.closeVideoModal(), !1
    }), $(window).on("keyup", function(t) {
      27 == t.keyCode && f.modalVideoOpen && f.closeVideoModal()
    });
    var m = [{
      id: "twitter"
    }, {
      id: "evernote"
    }, {
      id: "hubspot"
    }];
    $.each(m, function(t, e) {
      var i = e.id,
        n = $("#" + e.id),
        r = new FullscreenVideo({
          playerId: i,
          modal: $(n).closest(".hero-modal"),
          fallback: "/assets/img/enterprise/video-fallback.jg",
          mp4: "https://s3.",
          webm: "https://s3.amazonaws.com/www-assets.invisionapp.com/Enterprise/enterprise-loop.w",
          ogv: "https://s3.amazonaws.com/www-assets.invisionapp.com/Enterprise/enterprise-loop.ogv",
          fullscreenBackground: !1
        });
      r.initialize(), $(".hero-play." + e.id).on("click touchend", function(t) {
        return t.preventDefault(), r.openVideoModal(), !1
      }), $(".hero-modal-close." + e.id).on("click touchend", function() {
        return r.closeVideoModal(), !1
      }), $(window).on("keyup", function(t) {
        27 == t.keyCode && r.modalVideoOpen && r.closeVideoModal()
      })
    }), navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && $("html").addClass("firefox");
    var g = $(".tour-2");
    "undefined" != typeof SnapEngage && ("undefined" !== $.cookie("SnapEngageChatWindow") ? SnapEngage.allowProactiveChat(!1) : SnapEngage.allowProactiveChat(!0), SnapEngage.setCallback("OpenProactive", function(t, e) {
      $.cookie("SnapEngageChatWindow", !0)
    }));
    g.waypoint(function() {
      "undefined" != typeof SnapEngage && ($.cookie("SnapEngageChatWindow") || SnapEngage.openProactiveChat(!0), g.waypoint("destroy"), SnapEngage.setCallback("Close", function(t, e) {
        $.cookie("SnapEngageChatWindow", !0)
      }))
    }, {
      offset: function() {
        return $(window).outerHeight() - 200
      }
    })
  }
});
var throttle = function() {
  return function(t, e) {
    var i = +new Date;
    return function() {
      var n = +new Date;
      n - i > e && (t.apply(this, arguments), i = n)
    }
  }
}();
$(function() {
  function t(t) {
    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var e = new RegExp("[\\?&]" + t + "=([^&#]*)"),
      i = e.exec(location.search);
    return null === i ? "" : decodeURIComponent(i[1].replace(/\+/g, " "))
  }
  if ($("body").hasClass("home") || $("body").hasClass("home2") || $("body").hasClass("home3")) {
    window.location.hash && $(window.location.hash).length && (setTimeout(function() {
      location.hash && window.scrollTo(0, 0)
    }, 1), setTimeout(function() {
      TweenLite.to(window, 1, {
        scrollTo: {
          y: $(window.location.hash).offset().top
        },
        ease: Power2.easeOut
      })
    }, 500)), $("#home-cta").on("click", function(t) {
      t.preventDefault(), TweenLite.to(window, 1, {
        scrollTo: {
          y: $(".footer-signup").offset().top
        },
        ease: Power2.easeOut,
        onComplete: function() {
          $("#signup_name").focus()
        }
      })
    }), $("a[href*=#]:not([href=#])").click(function() {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
        var t = $(this.hash),
          e = $(this),
          i = e.data("offset") || 0,
          n = e.data("duration") || .8;
        if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"), t.length) return TweenLite.to(window, n, {
          scrollTo: {
            y: t.offset().top - i
          },
          ease: Power2.easeOut
        }), !1
      }
    });
    var e = $(document.body),
      i = function() {
        var t = $(window).height();
        t > 1e3 ? e.addClass("large-viewport").removeClass("narrow-viewport") : 800 > t ? e.removeClass("large-viewport").addClass("narrow-viewport") : e.removeClass("large-viewport narrow-viewport")
      };
    i();
    var n;
    $(window).on("resize", function() {
      clearTimeout(n), n = setTimeout(i, 200)
    }), $(".hero").responsiveHero({
      calculateOnMobile: !0,
      logoContainerHeight: $(".trusted-by"),
      navigationHeight: 0,
      remainingSpaceMin: 100,
      containerOffsetTop: 45
    }), $("a.video").fancybox({
      openEffect: "none",
      closeEffect: "none",
      height: 540,
      width: 960,
      helpers: {
        media: {}
      },
      padding: 0,
      beforeShow: function() {
        $.cookie("modal-showing", 1)
      },
      beforeClose: function() {
        $.removeCookie("modal-showing")
      }
    });
    var r = $(".tour-item"),
      o = [{
        base: "mobile",
        dur: 6e3,
        width: 1049,
        height: 706
      }, {
        base: "realtime",
        dur: 4e3,
        width: 932,
        height: 663
      }, {
        base: "feedback",
        dur: 4e3,
        width: 1142,
        height: 748
      }, {
        base: "manage",
        dur: 3e3,
        width: 926,
        height: 665
      }, {
        base: "sourcecontrol",
        dur: 6e3,
        width: 934,
        height: 662
      }];
    e.hasClass("alt") && (o = [{
      base: "prototyping",
      id: "1",
      width: "1273",
      height: "807"
    }, {
      base: "commenting",
      id: "2",
      width: "1235",
      height: "766"
    }, {
      base: "workflow",
      id: "3",
      width: "1138",
      height: "669"
    }, {
      base: "boards",
      id: "4",
      width: "948",
      height: "749"
    }, {
      base: "liveshare",
      id: "5",
      width: "1235",
      height: "766"
    }, {
      base: "sync",
      id: "6",
      width: "854",
      height: "853"
    }, {
      base: "user testing",
      id: "7",
      width: "862",
      height: "962"
    }, {
      base: "insight",
      id: "8",
      width: "1235",
      height: "747"
    }, {
      base: "connect",
      id: "9",
      width: "740",
      height: "745"
    }]), r.each(function() {
      var t = $(this),
        i = o[t.data("i")];
      e.hasClass("alt") ? $(".ani-wrapper", t).html('<img class="no-retina" alt="prototyping and mockup and ' + i.base + '" src="img/mockup-' + i.id + '.png" width="' + i.width + '" height="' + i.height + '" />').show() : (t.data("playing", !1).data("dur", i.dur), $(".ani-wrapper", t).html('<img class="no-retina" alt="prototyping and mockup and ' + i.base + '" src="/assets/img/home/animations/prototyping-mockup-' + i.base + '.gif" width="' + i.width + '" height="' + i.height + '" />').hide(), setTimeout(function() {
        t.data("playing", !1)
      }, i.dur))
    });
    var s = function(t) {
      if (t.data("playing") === !1) {
        var e = o[t.data("i")],
          i = "/assets/img/home/animations/prototyping-mockup-" + e.base + ".gif?r=" + (new Date).getTime();
        $(".ani-wrapper img", t).attr("src", i), $(".ani-wrapper", t).show(), t.data("playing", !0), setTimeout(function() {
          t.data("playing", !1)
        }, e.dur)
      }
    };
    r.waypoint({
      handler: function(t) {
        "down" == t && s($(this))
      },
      offset: "75%"
    }).waypoint({
      handler: function(t) {
        "up" == t && s($(this))
      },
      offset: "-80%"
    }), Modernizr.touch && $(".userstory").on("touchstart", function() {
      $(this).trigger("mouseenter")
    }).on("touchend", function() {
      $(this).trigger("mouseleave")
    });
    var a = new FullscreenVideo({
      playerId: "ad",
      mp4: "https://s3.amazonaws.com/www-assets.invisionapp.com/Homepage/enterprise-loop.mp4",
      webm: "https://s3.amazonaws.com/www-assets.invisionapp.com/Homepage/enterprise-loop.webm",
      ogv: "https://s3.amazonaws.com/www-assets.invisionapp.com/Homepage/enterprise-loop.ogv"
    });
    a.initialize();
    var u = window.location.hash;
    u = u.match(/#[^?&\/]*/g);
    var l = t("video");
    "y" == l && a.openVideoModal(), $(".hero-play").on("click touchend", function() {
      return a.openVideoModal(), !1
    }), $(".hero-modal-close").on("click touchend", function() {
      return a.closeVideoModal(), !1
    }), $(window).on("keyup", function(t) {
      27 == t.keyCode && a.modalVideoOpen && a.closeVideoModal()
    });
    var c = new QuoteSlider;
    c.initialize()
  }
}), $(function() {
  var t = $(document.body);
  t.hasClass("new_feature_single") && ($("#feature-share").waypoint("sticky", {
    offset: 165
  }), function() {
    var e = $(".featured-article").children(),
      i = /IMG|DIV|IFRAME|A/;
    if (!i.test(e[0].tagName) || $(e[0]).hasClass("pro-tip")) {
      var n = e.first().children()[0];
      if ("undefined" != typeof n && !i.test(n.tagName) && !$(e[0]).hasClass("pro-tip")) return;
      t.addClass("no-featured-image")
    }
  }()), $(".featured-article a img").parent().each(function() {
    var t = $(this),
      e = t.attr("href");
    /\.(jpg|jpeg|png|gif)$/.test(e) && t.on("click", function(t) {
      t.preventDefault(), $.fancybox({
        href: e,
        autoSize: !0,
        closeClick: !1,
        openEffect: "fade",
        closeEffect: "fade",
        padding: 0
      })
    })
  }), $("#feature-share a:not(.icon-twitter)").on("click", function(t) {
    t.preventDefault(), popupCenter($(this).attr("href"), "Share InVision News", 800, 400)
  }), window.featureURL && "" !== window.featureURL && (window.encodedFeatureURL = encodeURIComponent(window.featureURL), window.encodedFeatureTitle = encodeURIComponent(window.featureText), window.setTimeout(loadTwitterSM, 1e3), window.setTimeout(loadRedditSM, 1e3), window.setTimeout(loadFBLikeSM, 1e3), window.setTimeout(loadLinkedinSM, 1e3), window.setTimeout(loadDeliciousSM, 1e3))
}), $(function() {
  if ($("body").hasClass("new_features")) {
    var t = ["#1abc9c", "#9b59b6", "#3498db", "#ff6d3a", "#2ecc71", "#32cdc7", "#009a9a", "#fe80c0", "#b24a7d", "#76bcff", "#8d708e", "#807fff", "#e74c3c", "#16a085", "#f1c40f", "#27ae60"],
      e = t.length,
      i = Math.floor(Math.random() * e),
      n = function() {
        return i++, i = i >= e ? 0 : i, t[i]
      };
    $(".featured-grid .grid li a").each(function() {
      var t = n();
      $(this).data("hex", t).css("border-top-color", t)
    }).hover(function() {
      var t = $(this);
      t.css({
        background: t.data("hex"),
        "border-color": t.data("hex")
      })
    }, function() {
      var t = $(this);
      t.css({
        background: "none",
        "border-color": "#e1e3e5",
        "border-top-color": t.data("hex")
      })
    })
  }
}), $(function() {
  if ($("body").hasClass("tshirt")) {
    var t = function() {
      skrollr.init({
        forceHeight: !1
      })
    };
    Modernizr.touch || $.getScript("/assets/js/non-build/skrollr.min.js").then(t), $("#collage li").not(".non-hover").each(function() {
      $(this).data("z", $(this).css("z-index"))
    }).hover(function() {
      $(this).css("z-index", 8)
    }, function() {
      var t = $(this);
      t.css("z-index", t.data("z"))
    });
    var e = function(t) {
      var i = 6,
        n = 4e3,
        r = i > t ? t + 1 : 1;
      $("#invision .quote-container:not(quote-" + t + ")").css("opacity", 0), $("#invision .quote-container.quote-" + t).css("opacity", 1), setTimeout(function() {
        e(r)
      }, n)
    };
    e(1), $("a.video").fancybox({
      openEffect: "none",
      closeEffect: "none",
      height: 540,
      width: 960,
      helpers: {
        media: {}
      },
      padding: 0,
      beforeShow: function() {
        $.cookie("modal-showing", 1)
      },
      beforeClose: function() {
        $.removeCookie("modal-showing")
      }
    }), $(document).on("videoCTA.signup", function() {
      $.fancybox.close(), $("html,body").animate({
        scrollTop: $(".signup-form-wrapper").offset().top - 200
      }, 1e3, function() {
        $("#signup_name").focus()
      })
    });
    var i = "%23invisiontee",
      n = 180;
    $.getJSON("/api/getTshirtTweetPhotos?q=" + i + "&count=" + n + "&since_id=", function(t) {
      var e = "",
        i = "";
      $.each(t, function(t, n) {
        20 >= t && (e += '<li title="' + n.USER.screen_name + '"><img width="50" height="50" class="avatar" src="' + n.USER.profile_image_url + '"></li>'), i += '<li title="' + n.USER.screen_name + '"><img width="112" height="112" class="avatar" src="' + n.USER.profile_image_url + '"></li></li>'
      }), $("#entrants").html(e), $("#entrants-bg").html(i), $("#entrants img, #entrants-bg img").one("load", function() {
        $(this).parent().animate({
          opacity: 1
        }, 300), this.complete && $(this).load()
      })
    });
    var r = $("#tshirt_tweet").clone();
    $("#tshirt_form").validate({
      rules: {
        email: {
          required: !0,
          email: !0
        }
      },
      submitHandler: function(t) {
        var e = $(t),
          i = e.find("#tshirt_email");
        $.post("/api/tshirtSubmission", {
          email: i.val()
        }, function() {
          $("#signup_email").val(i.val()), $("label").each(function() {
            $(this).data("InFieldLabels").checkForEmpty()
          }), ga("send", "event", "Redeemed Offer", "Tshirt Entry", "Tshirt page"), ga("rollupTracker.send", "event", "Redeemed Offer", "Tshirt Entry", "Tshirt page"), analytics.identify({
            email: i.val()
          }), analytics.track("Tshirt", {
            email: i.val(),
            source: "tshirt_landing_page"
          }), $.fancybox({
            content: r,
            padding: 0,
            afterShow: function() {
              $(".tshirt_tweet_link").on("click", function(t) {
                t.preventDefault(), $.fancybox.close(), popupCenter($(".tshirt_tweet_link").attr("href"), "Tweet about InVision", 800, 400)
              })
            },
            afterClose: function() {
              setTimeout(function() {
                $("html,body").animate({
                  scrollTop: $("#invision").offset().top - 30
                }, 750, function() {
                  $("#signup_name").focus()
                })
              }, 1e3)
            }
          })
        })
      }
    })
  }
}), $(function() {
  function t() {
    u.removeClass("noTransition")
  }

  function e() {
    a.css({
      position: "",
      display: "block"
    })
  }
  var i = $("body"),
    n = ($(window), $(document));
  $("[data-bg]").each(function() {
    var t = $(this);
    t.backstretch("/assets/img/wallpapers/" + t.data("bg") + ".jpg", {
      centeredX: !0,
      centeredY: !1
    })
  }), $("label").inFieldLabels(), $("select").customSelect(), $('a:not(".no-redirect")[target="_blank"]').each(function() {
    var t = $(this),
      e = t.attr("href");
    t.removeAttr("target"), t.click(function(t) {
      t.preventDefault(), window.open("/redirect?redirect_url=" + e)
    })
  });
  var r = /#feature-([0-9]+)$/;
  if ("/new-features/" == window.location.pathname && r.test(window.location.hash)) {
    var o = window.location.hash.match(/\d+/g);
    i.empty(), $.getJSON("/getFeatureURL/" + o, function(t) {
      t.URL && (window.location = t.URL)
    })
  }
  if (!i.hasClass("fixed-nav")) {
    var s = $("#nav-anchor"),
      a = $("#main-nav-wrapper"),
      u = $("a", a),
      l = 0,
      c = 0;
    s.waypoint({
      handler: function(n) {
        clearTimeout(l), clearTimeout(c), u.addClass("noTransition"), "down" == n ? (i.addClass("fixed-nav"), a.finish().css({
          "margin-top": -90
        }).animate({
          "margin-top": 0
        }, 250, function() {
          l = setTimeout(t, 500)
        })) : a.finish().animate({
          "margin-top": -90
        }, 100, function() {
          i.removeClass("fixed-nav"), a.css({
            "margin-top": 0,
            display: "none",
            position: "fixed"
          }), l = setTimeout(t, 500), c = setTimeout(e, 10)
        })
      },
      offset: -250
    })
  }
  var h = $(".scroll-nav"),
    d = i.hasClass("customers") ? 120 : 60;
  h.length && $(".scroll-nav a").on("click", function(t) {
    t.preventDefault();
    var e = $(this);
    $("html, body").animate({
      scrollTop: $(e.attr("href")).offset().top - d
    })
  });
  var p = $(".video-container");
  if (p.length && p.find("#tour_video").length) {
    var f = "Tour Video",
      m = $f("tour_video");
    m.addEvent("ready", function() {
      p.find(".play-overlay a").on("click", function(t) {
        t.preventDefault(), $(this).parent().fadeOut(250, function() {
          m.api("play")
        })
      }), m.addEvent("play", function() {
        _kmq.push(["record", "Played Video - " + f]), analytics.track("Played Video", {
          video: f
        })
      }), m.addEvent("pause", function(t) {
        _kmq.push(["record", "Paused Video - " + f]), analytics.track("Paused Video", {
          video: f
        })
      }), m.addEvent("finish", function() {
        _kmq.push(["record", "Finished Video - " + f]), analytics.track("Finished Video", {
          video: f
        }), p.find(".play-overlay").fadeIn(250)
      })
    })
  }
  n.on("videoCTA.signup", function() {
    $.fancybox.close(), $("html,body").animate({
      scrollTop: $(".footer-signup").offset().top
    }, 1e3, function() {
      $("#signup_name").focus()
    })
  }), $(".fancy").fancybox({
    fitToView: !1,
    autoSize: !0,
    closeClick: !1,
    openEffect: "none",
    closeEffect: "none",
    padding: 0,
    beforeShow: function() {
      $.cookie("modal-showing", 1)
    },
    beforeClose: function() {
      $.removeCookie("modal-showing")
    }
  }), $("#signup_form").each(function() {
    $(this).validate({
      rules: {
        name: {
          required: !0
        },
        email: {
          required: !0,
          email: !0
        },
        password: {
          required: !0,
          minlength: 3
        }
      },
      submitHandler: function(t) {
        $("body").hasClass("home") && (window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", "homeSignup"])), t.submit()
      }
    })
  }), $(".subscribe-form form").validate({
    rules: {
      email: {
        required: !0,
        email: !0
      }
    },
    submitHandler: function(t) {
      var e = $("#subscribe_email");
      $.post("/api/tshirtSubmission", {
        email: e.val(),
        listSource: "website-new-features",
        hs_context: JSON.stringify({
          hutk: $.cookie("hubspotutk"),
          pageUrl: window.location.href,
          pageName: document.title
        })
      }, function() {
        window.location.href = invisionURLs.subscriptionConfirmation
      })
    }
  }), $("#invision_logo").on("contextmenu", function() {
    return $.fancybox({
      padding: 0,
      autoSize: !1,
      autoDimensions: !1,
      width: 660,
      height: "auto",
      href: "#download_modal",
      tpl: {
        wrap: '<div class="fancybox-wrap brand-assets-modal" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
      },
      helpers: {
        overlay: {
          css: {
            background: "rgba(29, 32, 41, 0.90)"
          }
        }
      }
    }), !1
  }), $(".play,.hero-play").on("click", function() {
    bucky.count("video.play.www" + BUCKY_PAGE_SCHEME, 1)
  }), $("#tshirt_sticky .button").on("click", function(t) {
    var e = t.target,
      i = null,
      n = $(e).closest(".step");
    n.hasClass("one") ? i = "one" : n.hasClass("two") ? i = "two" : n.hasClass("three") && (i = "three"), bucky.count("tshirt_contest.click.step_" + i + ".www")
  }), $(".global-share a, a.global-share").on("click touchend", function(t) {
    t.preventDefault();
    var e = $(this);
    window.open(e.attr("href"), e.data("name"), "width=" + e.data("width") + ",height=" + e.data("height"))
  }), $(".zopim-widget-in").length > 0 && (window.$zopim || function(t, e) {
    var i = $zopim = function(t) {
        i._.push(t)
      },
      n = i.s = t.createElement(e),
      r = t.getElementsByTagName(e)[0];
    i.set = function(t) {
      i.set._.push(t)
    }, i._ = [], i.set._ = [], n.async = !0, n.setAttribute("charset", "utf-8"), n.src = "//v2.zopim.com/?2dlFtrBeQiB5Epxk1gjONRlsKsTW7HvB", i.t = +new Date, n.type = "text/javascript", r.parentNode.insertBefore(n, r)
  }(document, "script"), $zopim(function() {
    $zopim.livechat.window.setOffsetVertical(90)
  }), $zopim(function() {
    function t(t) {
      "online" == t ? $("div.zopim-widget-in").show() : $("div.zopim-widget-in").hide()
    }
    $zopim.livechat.setOnStatus(t)
  }), $("div.zopim-widget-in").on("click", function() {
    $zopim.livechat.window.toggle(), $(this).toggleClass("active")
  })), $("form").length && i.csrfValidator()
});
