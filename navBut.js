!(function () {
  "use strict";
  var e,
    t = {
      noop: function () {},
      texturize: function (e) {
        return (e = (e = (e = (e += "")
          .replace(/'/g, "&#8217;")
          .replace(/&#039;/g, "&#8217;"))
          .replace(/"/g, "&#8221;")
          .replace(/&#034;/g, "&#8221;")
          .replace(/&quot;/g, "&#8221;")
          .replace(/[\u201D]/g, "&#8221;")).replace(
          /([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g,
          '$1="$2"'
        )).trim();
      },
      applyReplacements: function (e, t) {
        if (e)
          return t
            ? e.replace(/{(\d+)}/g, function (e, r) {
                return void 0 !== t[r] ? t[r] : e;
              })
            : e;
      },
      getBackgroundImage: function (e) {
        var t = document.createElement("canvas"),
          r = t.getContext && t.getContext("2d");
        if (e) {
          (r.filter = "blur(20px) "), r.drawImage(e, 0, 0);
          var o = t.toDataURL("image/png");
          return (t = null), o;
        }
      },
    },
    r = (function () {
      function e(e, t) {
        return Element.prototype.matches
          ? e.matches(t)
          : Element.prototype.msMatchesSelector
          ? e.msMatchesSelector(t)
          : void 0;
      }
      function r(e, t, r, o) {
        if (!e) return o();
        e.style.removeProperty("display"),
          (e.style.opacity = t),
          (e.style.pointerEvents = "none");
        var a = function (i, n) {
          var l = (performance.now() - i) / n;
          l < 1
            ? ((e.style.opacity = t + (r - t) * l),
              requestAnimationFrame(() => a(i, n)))
            : ((e.style.opacity = r),
              e.style.removeProperty("pointer-events"),
              o());
        };
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            a(performance.now(), 200);
          });
        });
      }
      return {
        closest: function (t, r) {
          if (t.closest) return t.closest(r);
          var o = t;
          do {
            if (e(o, r)) return o;
            o = o.parentElement || o.parentNode;
          } while (null !== o && 1 === o.nodeType);
          return null;
        },
        matches: e,
        hide: function (e) {
          e && (e.style.display = "none");
        },
        show: function (e) {
          e && (e.style.display = "block");
        },
        fadeIn: function (e, o) {
          r(e, 0, 1, (o = o || t.noop));
        },
        fadeOut: function (e, o) {
          (o = o || t.noop),
            r(e, 1, 0, function () {
              e && (e.style.display = "none"), o();
            });
        },
        scrollToElement: function (e, t, r) {
          if (!e || !t) return r ? r() : void 0;
          var o = t.querySelector(".jp-carousel-info-extra");
          o && (o.style.minHeight = window.innerHeight - 64 + "px");
          var a = !0,
            i = Date.now(),
            n = t.scrollTop,
            l =
              Math.max(
                0,
                e.offsetTop -
                  Math.max(
                    0,
                    window.innerHeight -
                      (function (e) {
                        var t = e.querySelector(".jp-carousel-info-footer"),
                          r = e.querySelector(".jp-carousel-info-extra"),
                          o = e.querySelector(
                            ".jp-carousel-info-content-wrapper"
                          );
                        if (t && r && o) {
                          var a = window.getComputedStyle(r),
                            i =
                              parseInt(a.paddingTop, 10) +
                              parseInt(a.paddingBottom, 10);
                          return (
                            (i = isNaN(i) ? 0 : i),
                            o.offsetHeight + t.offsetHeight + i
                          );
                        }
                        return 0;
                      })(t)
                  )
              ) - t.scrollTop;
          function s() {
            a = !1;
          }
          (l = Math.min(l, t.scrollHeight - window.innerHeight)),
            t.addEventListener("wheel", s),
            (function e() {
              var c,
                u = Date.now(),
                d =
                  (c = (u - i) / 300) < 0.5
                    ? 2 * c * c
                    : 1 - Math.pow(-2 * c + 2, 2) / 2,
                p = (d = d > 1 ? 1 : d) * l;
              if (((t.scrollTop = n + p), u <= i + 300 && a))
                return requestAnimationFrame(e);
              r && r(),
                o && (o.style.minHeight = ""),
                (a = !1),
                t.removeEventListener("wheel", s);
            })();
        },
        getJSONAttribute: function (e, t) {
          if (e && e.hasAttribute(t))
            try {
              return JSON.parse(e.getAttribute(t));
            } catch (e) {
              return;
            }
        },
        convertToPlainText: function (e) {
          var t = document.createElement("div");
          return (t.textContent = e), t.innerHTML;
        },
        stripHTML: function (e) {
          return e.replace(/<[^>]*>?/gm, "");
        },
        emitEvent: function (e, t, r) {
          var o;
          try {
            o = new CustomEvent(t, {
              bubbles: !0,
              cancelable: !0,
              detail: r || null,
            });
          } catch (e) {
            (o = document.createEvent("CustomEvent")).initCustomEvent(
              t,
              !0,
              !0,
              r || null
            );
          }
          e.dispatchEvent(o);
        },
        isTouch: function () {
          return (
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof DocumentTouch)
          );
        },
      };
    })();
  function o() {
    var o,
      a,
      i,
      n,
      l = "",
      s = !1,
      c =
        "div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, figure.wp-block-gallery.has-nested-images, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery",
      u =
        ".gallery-item, .tiled-gallery-item, .blocks-gallery-item,  .tiled-gallery__item",
      d = u + ", .wp-block-image",
      p = {},
      m =
        "undefined" != typeof wpcom && wpcom.carousel && wpcom.carousel.stat
          ? wpcom.carousel.stat
          : t.noop,
      g =
        "undefined" != typeof wpcom && wpcom.carousel && wpcom.carousel.pageview
          ? wpcom.carousel.pageview
          : t.noop;
    function h(t) {
      if (!s)
        switch (t.which) {
          case 38:
            t.preventDefault(), (p.overlay.scrollTop -= 100);
            break;
          case 40:
            t.preventDefault(), (p.overlay.scrollTop += 100);
            break;
          case 39:
            t.preventDefault(), e.slideNext();
            break;
          case 37:
          case 8:
            t.preventDefault(), e.slidePrev();
            break;
          case 27:
            t.preventDefault(), L();
        }
    }
    function f() {
      s = !0;
    }
    function v() {
      s = !1;
    }
    function y(e) {
      (e.role = "button"),
        (e.tabIndex = 0),
        (e.ariaLabel = jetpackCarouselStrings.image_label);
    }
    function w() {
      p.overlay ||
        ((p.overlay = document.querySelector(".jp-carousel-overlay")),
        (p.container = p.overlay.querySelector(".jp-carousel-wrap")),
        (p.gallery = p.container.querySelector(".jp-carousel")),
        (p.info = p.overlay.querySelector(".jp-carousel-info")),
        (p.caption = p.info.querySelector(".jp-carousel-caption")),
        (p.commentField = p.overlay.querySelector(
          "#jp-carousel-comment-form-comment-field"
        )),
        (p.emailField = p.overlay.querySelector(
          "#jp-carousel-comment-form-email-field"
        )),
        (p.authorField = p.overlay.querySelector(
          "#jp-carousel-comment-form-author-field"
        )),
        (p.urlField = p.overlay.querySelector(
          "#jp-carousel-comment-form-url-field"
        )),
        window.innerWidth <= 760 &&
          Math.round((window.innerWidth / 760) * 110) < 40 &&
          r.isTouch(),
        [p.commentField, p.emailField, p.authorField, p.urlField].forEach(
          function (e) {
            e &&
              (e.addEventListener("focus", f), e.addEventListener("blur", v));
          }
        ),
        p.overlay.addEventListener("click", function (e) {
          var t,
            o,
            a = e.target,
            i = !!r.closest(a, ".jp-carousel-close-hint"),
            n = !!window.matchMedia("(max-device-width: 760px)").matches;
          if (a === p.overlay) {
            if (n) return;
            L();
          } else if (i) L();
          else if (a.classList.contains("jp-carousel-image-download"))
            m("download_original_click");
          else if (a.classList.contains("jp-carousel-comment-login"))
            (t = p.currentSlide),
              (o = t ? t.attrs.attachmentId : "0"),
              (window.location.href =
                jetpackCarouselStrings.login_url + "%23jp-carousel-" + o);
          else if (r.closest(a, "#jp-carousel-comment-form-container"))
            !(function (e) {
              var t = e.target,
                o =
                  r.getJSONAttribute(p.container, "data-carousel-extra") || {},
                a = p.currentSlide.attrs.attachmentId,
                i = document.querySelector(
                  "#jp-carousel-comment-form-submit-and-info-wrapper"
                ),
                n = document.querySelector("#jp-carousel-comment-form-spinner"),
                l = document.querySelector(
                  "#jp-carousel-comment-form-button-submit"
                ),
                s = document.querySelector("#jp-carousel-comment-form");
              if (
                p.commentField &&
                p.commentField.getAttribute("id") === t.getAttribute("id")
              )
                f(), r.show(i);
              else if (r.matches(t, 'input[type="submit"]')) {
                e.preventDefault(),
                  e.stopPropagation(),
                  r.show(n),
                  s.classList.add("jp-carousel-is-disabled");
                var c = {
                  action: "post_attachment_comment",
                  nonce: jetpackCarouselStrings.nonce,
                  blog_id: o.blog_id,
                  id: a,
                  comment: p.commentField.value,
                };
                if (!c.comment.length)
                  return void j(jetpackCarouselStrings.no_comment_text, !1);
                if (
                  1 !== Number(jetpackCarouselStrings.is_logged_in) &&
                  ((c.email = p.emailField.value),
                  (c.author = p.authorField.value),
                  (c.url = p.urlField.value),
                  1 === Number(jetpackCarouselStrings.require_name_email))
                ) {
                  if (!c.email.length || !c.email.match("@"))
                    return void j(jetpackCarouselStrings.no_comment_email, !1);
                  if (!c.author.length)
                    return void j(jetpackCarouselStrings.no_comment_author, !1);
                }
                var u = new XMLHttpRequest();
                u.open("POST", jetpackCarouselStrings.ajaxurl, !0),
                  u.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                  u.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded; charset=UTF-8"
                  ),
                  (u.onreadystatechange = function () {
                    if (
                      this.readyState === XMLHttpRequest.DONE &&
                      this.status >= 200 &&
                      this.status < 300
                    ) {
                      var e;
                      try {
                        e = JSON.parse(this.response);
                      } catch (e) {
                        return void j(
                          jetpackCarouselStrings.comment_post_error,
                          !1
                        );
                      }
                      "approved" === e.comment_status
                        ? j(jetpackCarouselStrings.comment_approved, !0)
                        : "unapproved" === e.comment_status
                        ? j(jetpackCarouselStrings.comment_unapproved, !0)
                        : j(jetpackCarouselStrings.comment_post_error, !1),
                        H(),
                        A(a),
                        (l.value = jetpackCarouselStrings.post_comment),
                        r.hide(n),
                        s.classList.remove("jp-carousel-is-disabled");
                    } else j(jetpackCarouselStrings.comment_post_error, !1);
                  });
                var d = [];
                for (var m in c)
                  if (m) {
                    var g =
                      encodeURIComponent(m) + "=" + encodeURIComponent(c[m]);
                    d.push(g.replace(/%20/g, "+"));
                  }
                var h = d.join("&");
                u.send(h);
              }
            })(e);
          else if (
            r.closest(a, ".jp-carousel-photo-icons-container") ||
            a.classList.contains("jp-carousel-photo-title")
          )
            !(function (e) {
              e.preventDefault();
              var t = e.target,
                o = p.info.querySelector(".jp-carousel-info-extra"),
                a = p.info.querySelector(".jp-carousel-image-meta"),
                i = p.info.querySelector(".jp-carousel-comments-wrapper"),
                n = p.info.querySelector(".jp-carousel-icon-info"),
                l = p.info.querySelector(".jp-carousel-icon-comments");
              function s() {
                l && l.classList.remove("jp-carousel-selected"),
                  n.classList.toggle("jp-carousel-selected"),
                  i && i.classList.remove("jp-carousel-show"),
                  a &&
                    (a.classList.toggle("jp-carousel-show"),
                    a.classList.contains("jp-carousel-show")
                      ? o.classList.add("jp-carousel-show")
                      : o.classList.remove("jp-carousel-show"));
              }
              function c() {
                n && n.classList.remove("jp-carousel-selected"),
                  l.classList.toggle("jp-carousel-selected"),
                  a && a.classList.remove("jp-carousel-show"),
                  i &&
                    (i.classList.toggle("jp-carousel-show"),
                    i.classList.contains("jp-carousel-show")
                      ? o.classList.add("jp-carousel-show")
                      : o.classList.remove("jp-carousel-show"));
              }
              (r.closest(t, ".jp-carousel-icon-info") ||
                t.classList.contains("jp-carousel-photo-title")) &&
                (a && a.classList.contains("jp-carousel-show")
                  ? r.scrollToElement(p.overlay, p.overlay, s)
                  : (s(), r.scrollToElement(p.info, p.overlay))),
                r.closest(t, ".jp-carousel-icon-comments") &&
                  (i && i.classList.contains("jp-carousel-show")
                    ? r.scrollToElement(p.overlay, p.overlay, c)
                    : (c(), r.scrollToElement(p.info, p.overlay)));
            })(e);
          else if (!r.closest(a, ".jp-carousel-info")) return;
        }),
        window.addEventListener("keydown", h),
        p.overlay.addEventListener("jp_carousel.afterOpen", function () {
          v(),
            p.slides.length <= 1 ||
              (p.slides.length <= 5
                ? r.show(p.info.querySelector(".jp-swiper-pagination"))
                : r.show(p.info.querySelector(".jp-carousel-pagination")));
        }),
        p.overlay.addEventListener("jp_carousel.beforeClose", function () {
          f(),
            document.documentElement.style.removeProperty("height"),
            e && e.enable(),
            r.hide(p.info.querySelector(".jp-swiper-pagination")),
            r.hide(p.info.querySelector(".jp-carousel-pagination"));
        }),
        p.overlay.addEventListener("jp_carousel.afterClose", function () {
          window.history.pushState
            ? history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
              )
            : (window.location.href = ""),
            (l = ""),
            (p.isOpen = !1);
        }),
        p.overlay.addEventListener("touchstart", function (e) {
          e.touches.length > 1 && e.preventDefault();
        }));
    }
    function j(e, t) {
      var o = p.overlay.querySelector("#jp-carousel-comment-post-results"),
        a = "jp-carousel-comment-post-" + (t ? "success" : "error");
      (o.innerHTML = '<span class="' + a + '">' + e + "</span>"),
        r.hide(p.overlay.querySelector("#jp-carousel-comment-form-spinner")),
        p.overlay
          .querySelector("#jp-carousel-comment-form")
          .classList.remove("jp-carousel-is-disabled"),
        r.show(o);
    }
    function b() {
      var e = document.querySelectorAll("a img[data-attachment-id]");
      Array.prototype.forEach.call(e, function (e) {
        var t = e.parentElement,
          o = t.parentElement;
        if (
          !o.classList.contains("gallery-icon") &&
          !r.closest(o, u) &&
          t.hasAttribute("href")
        ) {
          var a = !1;
          t.getAttribute("href").split("?")[0] ===
            e.getAttribute("data-orig-file").split("?")[0] &&
            1 ===
              Number(jetpackCarouselStrings.single_image_gallery_media_file) &&
            (a = !0),
            t.getAttribute("href") === e.getAttribute("data-permalink") &&
              (a = !0),
            a &&
              (y(e),
              t.classList.add("single-image-gallery"),
              t.setAttribute(
                "data-carousel-extra",
                JSON.stringify({
                  blog_id: Number(jetpackCarouselStrings.blog_id),
                })
              ));
        }
      });
    }
    function S(o) {
      (!o || o < 0 || o > p.slides.length) && (o = 0),
        (p.currentSlide = p.slides[o]);
      var a,
        i,
        n = p.currentSlide,
        s = n.attrs.attachmentId;
      !(function (e) {
        var t = e.el,
          r = e.attrs,
          o = t.querySelector("img");
        if (!o.hasAttribute("data-loaded")) {
          var a = !!r.previewImage,
            i = r.thumbSize;
          !a || (i && t.offsetWidth > i.width)
            ? (o.src = r.src)
            : (o.src = r.previewImage),
            o.setAttribute("itemprop", "image"),
            o.setAttribute("data-loaded", 1);
        }
      })(p.slides[o]),
        1 !== Number(jetpackCarouselStrings.display_background_image) ||
          p.slides[o].backgroundImage ||
          (function (t) {
            var r = t.el;
            e && e.slides && (r = e.slides[e.activeIndex]);
            var o = t.attrs.originalElement;
            o.complete && 0 !== o.naturalHeight
              ? E(t, r, o)
              : (o.onload = function () {
                  E(t, r, o);
                });
          })(p.slides[o]),
        r.hide(p.caption),
        (function (e) {
          var t,
            o,
            a,
            i,
            n = "",
            l = "",
            s = "";
          if (
            ((t = p.overlay.querySelector(".jp-carousel-photo-caption")),
            (o = p.overlay.querySelector(".jp-carousel-caption")),
            (a = p.overlay.querySelector(".jp-carousel-photo-title")),
            (i = p.overlay.querySelector(".jp-carousel-photo-description")),
            r.hide(t),
            r.hide(o),
            r.hide(a),
            r.hide(i),
            (n = q(e.caption) || ""),
            (l = q(e.title) || ""),
            (s = q(e.desc) || ""),
            (n || l || s) &&
              (n &&
                ((t.innerHTML = n), (o.innerHTML = n), r.show(t), r.show(o)),
              r.stripHTML(n) === r.stripHTML(l) && (l = ""),
              r.stripHTML(n) === r.stripHTML(s) && (s = ""),
              r.stripHTML(l) === r.stripHTML(s) && (s = ""),
              s &&
                ((i.innerHTML = s),
                r.show(i),
                l || n || ((t.innerHTML = r.stripHTML(s)), r.show(t))),
              l))
          ) {
            var c = r.stripHTML(l);
            (a.innerHTML = c),
              n || ((t.innerHTML = c), (o.innerHTML = c), r.show(t)),
              r.show(a);
          }
        })({
          caption: n.attrs.caption,
          title: n.attrs.title,
          desc: n.attrs.desc,
        }),
        (function (e) {
          if (!e || 1 !== Number(jetpackCarouselStrings.display_exif))
            return !1;
          var t = p.info.querySelector(
              ".jp-carousel-image-meta ul.jp-carousel-image-exif"
            ),
            r = "";
          for (var o in e) {
            var a = e[o],
              i = jetpackCarouselStrings.meta_data || [];
            if (0 !== parseFloat(a) && a.length && -1 !== i.indexOf(o)) {
              switch (o) {
                case "focal_length":
                  a += "mm";
                  break;
                case "shutter_speed":
                  a = k(a);
                  break;
                case "aperture":
                  a = "f/" + a;
              }
              r +=
                "<li><h5>" + jetpackCarouselStrings[o] + "</h5>" + a + "</li>";
            }
          }
          (t.innerHTML = r), t.style.removeProperty("display");
        })(p.slides[o].attrs.imageMeta),
        (function (e) {
          if (!e) return !1;
          var r,
            o = [e.attrs.origWidth, e.attrs.origHeight],
            a = document.createElement("a");
          (a.href = e.attrs.src.replace(/\?.+$/, "")),
            (r =
              null !== a.hostname.match(/^i[\d]{1}\.wp\.com$/i)
                ? a.href
                : e.attrs.origFile.replace(/\?.+$/, ""));
          var i = p.info.querySelector(".jp-carousel-download-text"),
            n = p.info.querySelector(".jp-carousel-image-download");
          (i.innerHTML = t.applyReplacements(
            jetpackCarouselStrings.download_original,
            o
          )),
            n.setAttribute("href", r),
            n.style.removeProperty("display");
        })(n),
        1 === Number(jetpackCarouselStrings.display_comments) &&
          ((a = p.slides[o].attrs.commentsOpened),
          (i = p.container.querySelector(
            ".jp-carousel-comment-form-container"
          )),
          1 === parseInt(a, 10) ? r.fadeIn(i) : r.fadeOut(i),
          A(s),
          r.hide(p.info.querySelector("#jp-carousel-comment-post-results")));
      var c = p.info.querySelector(".jp-carousel-pagination");
      if (c && p.slides.length > 5) {
        var u = o + 1;
        c.innerHTML = "<span>" + u + " / " + p.slides.length + "</span>";
      }
      jetpackCarouselStrings.stats &&
        (new Image().src =
          document.location.protocol +
          "//pixel.wp.com/g.gif?" +
          jetpackCarouselStrings.stats +
          "&post=" +
          encodeURIComponent(s) +
          "&rand=" +
          Math.random()),
        g(s),
        (window.location.hash = l = "#jp-carousel-" + s);
    }
    function L() {
      (document.body.style.overflow = a),
        (document.documentElement.style.overflow = i),
        H(),
        f(),
        r.emitEvent(p.overlay, "jp_carousel.beforeClose"),
        window.scrollTo(window.scrollX || window.pageXOffset || 0, n || 0),
        e.destroy(),
        (p.isOpen = !1),
        (p.slides = []),
        (p.currentSlide = void 0),
        (p.gallery.innerHTML = ""),
        r.fadeOut(p.overlay, function () {
          r.emitEvent(p.overlay, "jp_carousel.afterClose");
        });
    }
    function x(e, t, r) {
      var o = r
          ? e.replace(/.*=([\d]+%2C[\d]+).*$/, "$1")
          : e.replace(/.*-([\d]+x[\d]+)\..+$/, "$1"),
        a = o !== e ? (r ? o.split("%2C") : o.split("x")) : [t, 0];
      return (
        "9999" === a[0] && (a[0] = "0"), "9999" === a[1] && (a[1] = "0"), a
      );
    }
    function k(e) {
      return e >= 1
        ? Math.round(10 * e) / 10 + "s"
        : "1/" + Math.round(1 / e) + "s";
    }
    function q(e) {
      return !e.match(" ") && e.match("_") ? "" : e;
    }
    function A(e, t) {
      var a = void 0 === t,
        i = p.info.querySelector(
          ".jp-carousel-icon-comments .jp-carousel-has-comments-indicator"
        );
      if ((i.classList.remove("jp-carousel-show"), clearInterval(o), e)) {
        (!t || t < 1) && (t = 0);
        var n = p.info.querySelector(".jp-carousel-comments"),
          l = p.info.querySelector("#jp-carousel-comments-loading");
        r.show(l), a && (r.hide(n), (n.innerHTML = ""));
        var s = new XMLHttpRequest(),
          c =
            jetpackCarouselStrings.ajaxurl +
            "?action=get_attachment_comments&nonce=" +
            jetpackCarouselStrings.nonce +
            "&id=" +
            e +
            "&offset=" +
            t;
        s.open("GET", c),
          s.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        var u = function () {
          r.fadeIn(n), r.fadeOut(l);
        };
        (s.onload = function () {
          if (p.currentSlide && p.currentSlide.attrs.attachmentId === e) {
            var c,
              d = s.status >= 200 && s.status < 300;
            try {
              c = JSON.parse(s.responseText);
            } catch (e) {}
            if (!d || !c || !Array.isArray(c)) return u();
            a && (n.innerHTML = "");
            for (var m = 0; m < c.length; m++) {
              var g = c[m],
                h = document.createElement("div");
              h.classList.add("jp-carousel-comment"),
                h.setAttribute("id", "jp-carousel-comment-" + g.id),
                (h.innerHTML =
                  '<div class="comment-gravatar">' +
                  g.gravatar_markup +
                  '</div><div class="comment-content"><div class="comment-author">' +
                  g.author_markup +
                  '</div><div class="comment-date">' +
                  g.date_gmt +
                  "</div>" +
                  g.content +
                  "</div>"),
                n.appendChild(h),
                clearInterval(o),
                (o = setInterval(function () {
                  p.container.scrollTop + 150 > window.innerHeight &&
                    (A(e, t + 10), clearInterval(o));
                }, 300));
            }
            c.length > 0 &&
              (r.show(n),
              (i.innerText = c.length),
              i.classList.add("jp-carousel-show")),
              r.hide(l);
          }
        }),
          (s.onerror = u),
          s.send();
      }
    }
    function E(e, r, o) {
      var a = t.getBackgroundImage(o);
      (e.backgroundImage = a),
        (r.style.backgroundImage = "url(" + a + ")"),
        (r.style.backgroundSize = "cover");
    }
    function H() {
      p.commentField && (p.commentField.value = "");
    }
    function T(e, o) {
      p.slides = [];
      var a = { width: window.innerWidth, height: window.innerHeight - 64 };
      0 !== o && (new Image().src = e[o].getAttribute("data-gallery-src"));
      var i = !!r.closest(e[0], ".tiled-gallery.type-rectangular");
      Array.prototype.forEach.call(e, function (e, o) {
        var n = r.closest(e, "a"),
          l = e.getAttribute("data-orig-file") || e.getAttribute("src-orig"),
          s =
            e.getAttribute("data-attachment-id") ||
            e.getAttribute("data-id") ||
            "0",
          c = document.querySelector(
            'img[data-attachment-id="' + s + '"] + figcaption'
          );
        c = c ? c.innerHTML : e.getAttribute("data-image-caption");
        var u = {
            originalElement: e,
            attachmentId: s,
            commentsOpened: e.getAttribute("data-comments-opened") || "0",
            imageMeta: r.getJSONAttribute(e, "data-image-meta") || {},
            title: e.getAttribute("data-image-title") || "",
            desc: e.getAttribute("data-image-description") || "",
            mediumFile: e.getAttribute("data-medium-file") || "",
            largeFile: e.getAttribute("data-large-file") || "",
            origFile: l || "",
            thumbSize: { width: e.naturalWidth, height: e.naturalHeight },
            caption: c || "",
            permalink: n && n.getAttribute("href"),
            src: l || e.getAttribute("src") || "",
          },
          d = r.closest(e, ".tiled-gallery-item"),
          m = d && d.querySelector(".tiled-gallery-caption"),
          g = m && m.innerHTML;
        g && (u.caption = g);
        var h = (function (e) {
          var t = e.getAttribute("data-orig-size") || "";
          if (t) {
            var r = t.split(",");
            return { width: parseInt(r[0], 10), height: parseInt(r[1], 10) };
          }
          return {
            width:
              e.getAttribute("data-original-width") ||
              e.getAttribute("width") ||
              void 0,
            height:
              e.getAttribute("data-original-height") ||
              e.getAttribute("height") ||
              void 0,
          };
        })(e);
        if (
          ((u.origWidth = h.width || u.thumbSize.width),
          (u.origHeight = h.height || u.thumbSize.height),
          "undefined" != typeof wpcom &&
          wpcom.carousel &&
          wpcom.carousel.generateImgSrc
            ? (u.src = wpcom.carousel.generateImgSrc(e, a))
            : (u.src = (function (e) {
                if (("object" != typeof e && (e = {}), void 0 === e.origFile))
                  return "";
                if (void 0 === e.origWidth || void 0 === e.maxWidth)
                  return e.origFile;
                if (void 0 === e.mediumFile || void 0 === e.largeFile)
                  return e.origFile;
                var t = document.createElement("a");
                t.href = e.largeFile;
                var r = /^i[0-2]\.wp\.com$/i.test(t.hostname),
                  o = x(e.mediumFile, e.origWidth, r),
                  a = x(e.largeFile, e.origWidth, r),
                  i = parseInt(a[0], 10),
                  n = parseInt(a[1], 10),
                  l = parseInt(o[0], 10),
                  s = parseInt(o[1], 10);
                if (
                  ((e.origMaxWidth = e.maxWidth),
                  (e.origMaxHeight = e.maxHeight),
                  void 0 !== window.devicePixelRatio &&
                    window.devicePixelRatio > 1 &&
                    ((e.maxWidth = e.maxWidth * window.devicePixelRatio),
                    (e.maxHeight = e.maxHeight * window.devicePixelRatio)),
                  i >= e.maxWidth || n >= e.maxHeight)
                )
                  return e.largeFile;
                if (l >= e.maxWidth || s >= e.maxHeight) return e.mediumFile;
                if (r) {
                  var c = e.largeFile.lastIndexOf("?"),
                    u = e.largeFile;
                  return (
                    -1 !== c &&
                      ((u = e.largeFile.substring(0, c)),
                      (e.origWidth > e.maxWidth ||
                        e.origHeight > e.maxHeight) &&
                        ((e.origMaxWidth = 2 * e.maxWidth),
                        (e.origMaxHeight = 2 * e.maxHeight),
                        (u +=
                          "?fit=" + e.origMaxWidth + "%2C" + e.origMaxHeight))),
                    u
                  );
                }
                return e.origFile;
              })({
                origFile: u.src,
                origWidth: u.origWidth,
                origHeight: u.origHeight,
                maxWidth: a.width,
                maxHeight: a.height,
                mediumFile: u.mediumFile,
                largeFile: u.largeFile,
              })),
          e.setAttribute("data-gallery-src", u.src),
          "0" !== u.attachmentId)
        ) {
          (u.title = t.texturize(u.title)),
            (u.desc = t.texturize(u.desc)),
            (u.caption = t.texturize(u.caption));
          var f = new Image();
          f.src = u.src;
          var v = document.createElement("div");
          v.classList.add("swiper-slide"),
            v.setAttribute("itemprop", "associatedMedia"),
            v.setAttribute("itemscope", ""),
            v.setAttribute("itemtype", "https://schema.org/ImageObject");
          var y = document.createElement("div");
          y.classList.add("swiper-zoom-container"),
            p.gallery.appendChild(v),
            v.appendChild(y),
            y.appendChild(f),
            v.setAttribute("data-attachment-id", u.attachmentId),
            v.setAttribute("data-permalink", u.permalink),
            v.setAttribute("data-orig-file", u.origFile),
            i && (u.previewImage = u.src);
          var w = { el: v, attrs: u, index: o };
          p.slides.push(w);
        }
      });
    }
    function _(e, t) {
      if (!window.Swiper670) {
        var o = document.querySelector("#jp-carousel-loading-overlay");
        r.show(o);
        var a = document.createElement("script");
        return (
          (a.id = "jetpack-carousel-swiper-js"),
          (a.src = window.jetpackSwiperLibraryPath.url),
          (a.async = !0),
          (a.onload = function () {
            r.hide(o), C(e, t);
          }),
          (a.onerror = function () {
            r.hide(o);
          }),
          void document.head.appendChild(a)
        );
      }
      C(e, t);
    }
    function C(t, o) {
      var l,
        s = {
          imgSelector:
            ".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id], img[data-id]",
          startIndex: 0,
        },
        c = r.getJSONAttribute(t, "data-carousel-extra");
      if (!c) return;
      const u = t.querySelectorAll(s.imgSelector);
      if (u.length && (w(), !p.isOpen)) {
        for (var d in ((p.isOpen = !0),
        (a = getComputedStyle(document.body).overflow),
        (document.body.style.overflow = "hidden"),
        (i = getComputedStyle(document.documentElement).overflow),
        (document.documentElement.style.overflow = "hidden"),
        (n = window.scrollY || window.pageYOffset || 0),
        p.container.setAttribute("data-carousel-extra", JSON.stringify(c)),
        m(["open", "view_image"]),
        o || {}))
          s[d] = o[d];
        -1 === s.startIndex && (s.startIndex = 0),
          r.emitEvent(p.overlay, "jp_carousel.beforeOpen"),
          (p.gallery.innerHTML = ""),
          (p.overlay.style.opacity = 1),
          (p.overlay.style.display = "block"),
          T(u, s.startIndex),
          (e = new window.Swiper670(".jp-carousel-swiper-container", {
            centeredSlides: !0,
            zoom: !0,
            loop: p.slides.length > 1,
            enabled: p.slides.length > 1,
            pagination: { el: ".jp-swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".jp-swiper-button-next",
              prevEl: ".jp-swiper-button-prev",
            },
            initialSlide: s.startIndex,
            on: {
              init: function () {
                S(s.startIndex);
              },
            },
            preventClicks: !1,
            preventClicksPropagation: !1,
            preventInteractionOnTransition: !r.isTouch(),
            threshold: 5,
          })).on("slideChange", function (e) {
            S(
              0 === e.activeIndex
                ? p.slides.length - 1
                : e.activeIndex === p.slides.length + 1
                ? 0
                : e.activeIndex - 1
            ),
              p.overlay.classList.remove("jp-carousel-hide-controls");
          }),
          e.on("zoomChange", function (e, t) {
            t > 1 && p.overlay.classList.add("jp-carousel-hide-controls"),
              1 === t &&
                p.overlay.classList.remove("jp-carousel-hide-controls");
          }),
          e.on("doubleTap", function (e) {
            if ((clearTimeout(l), 1 === e.zoom.scale))
              var t = setTimeout(function () {
                p.overlay.classList.remove("jp-carousel-hide-controls"),
                  clearTimeout(t);
              }, 150);
          }),
          e.on("tap", function () {
            e.zoom.scale > 1 &&
              (l = setTimeout(function () {
                p.overlay.classList.toggle("jp-carousel-hide-controls");
              }, 150));
          }),
          r.fadeIn(p.overlay, function () {
            r.emitEvent(p.overlay, "jp_carousel.afterOpen");
          });
      }
    }
    function I(e) {
      if ("click" !== e.type) {
        if ("keydown" === e.type) {
          const t = document.activeElement.parentElement,
            r = t && t.classList.contains("tiled-gallery__item");
          if ((" " === e.key || "Enter" === e.key) && r) return void F(e);
        }
      } else F(e);
    }
    function M(e) {
      var t = e.parentElement,
        o = t.parentElement,
        a = null;
      return (
        o && o.classList.contains("wp-block-image")
          ? (a = t.getAttribute("href"))
          : t &&
            t.classList.contains("wp-block-image") &&
            t.querySelector(":scope > a") &&
            (a = t.querySelector(":scope > a").getAttribute("href")),
        !(
          (a &&
            a.split("?")[0] !==
              e.getAttribute("data-orig-file").split("?")[0] &&
            a !== e.getAttribute("data-permalink")) ||
          t.classList.contains("gallery-caption") ||
          r.matches(t, "figcaption")
        )
      );
    }
    function F(e) {
      if (
        window.CSS &&
        window.CSS.supports &&
        window.CSS.supports("display", "grid")
      ) {
        var t,
          o = e.target,
          a = r.closest(o, c);
        if (a) {
          if (!(t = a) || !t.getAttribute("data-carousel-extra")) return;
          if (!M(o)) return;
          (document.documentElement.style.height = "auto"),
            e.preventDefault(),
            e.stopPropagation();
          var i = r.closest(o, d),
            n = Array.prototype.indexOf.call(a.querySelectorAll(d), i);
          _(a, { startIndex: n });
        }
      }
    }
    document.body.addEventListener("click", I),
      document.body.addEventListener("keydown", I),
      document.querySelectorAll(u + "img").forEach(function (e) {
        M(e) && y(e);
      }),
      1 === Number(jetpackCarouselStrings.single_image_gallery) &&
        (b(),
        document.body.addEventListener("is.post-load", function () {
          b();
        })),
      window.addEventListener("hashchange", function () {
        var t = /jp-carousel-(\d+)/;
        if (window.location.hash && t.test(window.location.hash)) {
          if (window.location.hash !== l || !p.isOpen)
            if (window.location.hash && p.gallery && !p.isOpen && history.back)
              history.back();
            else {
              l = window.location.hash;
              for (
                var r,
                  o,
                  a = window.location.hash.match(t),
                  i = parseInt(a[1], 10),
                  n = document.querySelectorAll(c),
                  s = 0;
                s < n.length;
                s++
              ) {
                for (
                  var u, d = n[s], m = d.querySelectorAll("img"), g = 0;
                  g < m.length;
                  g++
                )
                  if (
                    parseInt(m[g].getAttribute("data-attachment-id"), 10) ===
                      i ||
                    parseInt(m[g].getAttribute("data-id"), 10) === i
                  ) {
                    u = g;
                    break;
                  }
                if (void 0 !== u) {
                  (r = d),
                    (o = u),
                    p.isOpen
                      ? (S(o), e.slideTo(o + 1))
                      : _(r, { startIndex: o });
                  break;
                }
              }
            }
        } else p.isOpen && L();
      }),
      window.location.hash && r.emitEvent(window, "hashchange");
  }
  "loading" !== document.readyState
    ? o()
    : document.addEventListener("DOMContentLoaded", o);
})();
!(function () {
  function e() {
    (this.galleries = []), this.findAndSetupNewGalleries();
  }
  function t(e) {
    (this.gallery = e),
      this.addCaptionEvents(),
      this.resize(),
      this.gallery.classList.remove("tiled-gallery-unresized");
  }
  (e.prototype.findAndSetupNewGalleries = function () {
    var e = this,
      r = document.querySelectorAll(".tiled-gallery.tiled-gallery-unresized");
    Array.prototype.forEach.call(r, function (r) {
      e.galleries.push(new t(r));
    });
  }),
    (e.prototype.resizeAll = function () {
      Array.prototype.forEach.call(this.galleries, function (e) {
        e.resize();
      });
    }),
    (t.prototype.resizeableElementsSelector =
      ".gallery-row, .gallery-group, .tiled-gallery-item img"),
    (t.prototype.addCaptionEvents = function () {
      var e = this.gallery.querySelectorAll(".tiled-gallery-caption");
      Array.prototype.forEach.call(e, function (e) {
        e.style.display = "none";
      });
      var t = function (e) {
        var t = e.target.closest(".tiled-gallery-item"),
          r = "mouseover" === e.type ? "block" : "none";
        if (t) {
          var i = t.querySelector(".tiled-gallery-caption");
          i && (i.style.display = r);
        }
      };
      this.gallery.addEventListener("mouseover", t),
        this.gallery.addEventListener("mouseout", t);
    }),
    (t.prototype.getExtraDimension = function (e, t, r) {
      if ("horizontal" === r) {
        var i = "border" === t ? "borderLeftWidth" : t + "Left",
          n = "border" === t ? "borderRightWidth" : t + "Right";
        return (
          (parseInt(e.style[i], 10) || 0) + (parseInt(e.style[n], 10) || 0)
        );
      }
      if ("vertical" === r) {
        var o = "border" === t ? "borderTopWidth" : t + "Top",
          a = "border" === t ? "borderBottomWidth" : t + "Bottom";
        return (
          (parseInt(e.style[o], 10) || 0) + (parseInt(e.style[a], 10) || 0)
        );
      }
      return 0;
    }),
    (t.prototype.resize = function () {
      var e = parseInt(this.gallery.dataset.originalWidth, 10),
        t = parseFloat(
          getComputedStyle(this.gallery.parentNode, null).width.replace(
            "px",
            ""
          )
        ),
        r = Math.min(1, t / e),
        i = this,
        n = this.gallery.querySelectorAll(this.resizeableElementsSelector);
      Array.prototype.forEach.call(n, function (e) {
        var t = i.getExtraDimension(e, "margin", "horizontal"),
          n = i.getExtraDimension(e, "margin", "vertical"),
          o = i.getExtraDimension(e, "padding", "horizontal"),
          a = i.getExtraDimension(e, "padding", "vertical"),
          l = i.getExtraDimension(e, "border", "horizontal"),
          s = i.getExtraDimension(e, "border", "vertical"),
          d = parseInt(e.dataset.originalWidth, 10) + o + l + t,
          c = parseInt(e.dataset.originalHeight, 10) + a + s + n;
        (e.style.width = Math.floor(r * d) - t + "px"),
          (e.style.height = Math.floor(r * c) - n + "px");
      });
    });
  var r,
    i =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
  (r = function () {
    var t = new e();
    document.body.addEventListener("is.post-load", function () {
      t.findAndSetupNewGalleries();
    }),
      window.chrome && i
        ? (function (e) {
            var t = !1,
              r = null;
            function n() {
              e.resizeAll(), t && i(n);
            }
            window.addEventListener("resize", function () {
              clearTimeout(r),
                t || i(n),
                (t = !0),
                (r = setTimeout(function () {
                  t = !1;
                }, 15));
            });
          })(t)
        : (function (e) {
            window.addEventListener("resize", function () {
              e.resizeAll();
            });
          })(t),
      "undefined" != typeof wp &&
        wp.customize &&
        wp.customize.selectiveRefresh &&
        wp.customize.selectiveRefresh.bind(
          "partial-content-rendered",
          function (e) {
            wp.isJetpackWidgetPlaced(e, "gallery") &&
              t.findAndSetupNewGalleries();
          }
        );
  }),
    "loading" !== document.readyState
      ? r()
      : document.addEventListener("DOMContentLoaded", r);
})();