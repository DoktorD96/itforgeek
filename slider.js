// Blogger Feed Rotator Plugin by Taufik Nurrohman
// URL: http://www.dte.web.id :: http://www.arlinadzgn.com/
(function(a) {
    a.fn.customRotator = function(c) {
        c = a.extend({
            interval: 6000,
            speed: 1000,
            hoverPause: true,
            autoHeight: false,
            crossFade: false,
            autoSlide: true,
            hide: function(d) {},
            show: function(d) {}
        }, c);
        var b = true;
        return this.each(function() {
            var k = a(this),
                e = k.children().hide(),
                d = k.next(),
                g = null,
                j = 0,
                f = 0;

            function h() {
                c.hide(f);
                d.find(".current").removeClass("current");
                b = false;
                if (e.eq(f).next().length) {
                    if (!c.crossFade) {
                        e.eq(f).fadeOut(c.speed, function() {
                            a(this).next().fadeIn(c.speed, function() {
                                c.show(f);
                                b = true
                            });
                            if (c.autoHeight) {
                                k.stop().animate({
                                    height: e.eq(f + 1).height()
                                }, c.speed / 2)
                            }
                            f++
                        })
                    } else {
                        e.eq(f).fadeOut(c.speed);
                        e.eq(f).next().fadeIn(c.speed, function() {
                            c.show(f);
                            b = true;
                            f++
                        });
                        if (c.autoHeight) {
                            k.stop().animate({
                                height: e.eq(f + 1).height()
                            }, c.speed / 2)
                        }
                    }
                    d.find(".rotator-num a").eq(f + 1).addClass("current")
                } else {
                    if (!c.crossFade) {
                        e.eq(f).fadeOut(c.speed, function() {
                            f = 0;
                            e.first().fadeIn(c.speed, function() {
                                c.show(f);
                                b = true
                            });
                            if (c.autoHeight) {
                                k.stop().animate({
                                    height: e.eq(f).height()
                                }, c.speed / 2)
                            }
                        })
                    } else {
                        e.eq(f).fadeOut(c.speed);
                        e.first().fadeIn(c.speed, function() {
                            c.show(0);
                            b = true;
                            f = 0
                        });
                        if (c.autoHeight) {
                            k.stop().animate({
                                height: e.eq(0).height()
                            }, c.speed / 2)
                        }
                    }
                    d.find(".rotator-num a").first().addClass("current")
                }
                if (j == 0 && c.autoSlide) {
                    g = setTimeout(h, c.interval)
                }
            }
            if (e.length > 1) {
                c.hide(f);
                e.first().fadeIn(c.speed, function() {
                    c.show(f);
                    b = true
                });
                if (c.autoHeight) {
                    k.stop().animate({
                        height: e.eq(0).height()
                    }, c.speed / 2)
                }
                if (c.hoverPause && c.autoSlide) {
                    k.mouseenter(function() {
                        clearTimeout(g);
                        j = 1
                    }).mouseleave(function() {
                        g = setTimeout(h, c.interval);
                        j = 0
                    }).trigger("mouseleave")
                } else {
                    g = (c.autoSlide) ? setTimeout(h, c.interval) : null
                }
                d.find(".rotator-num a").click(function() {
                    if (b) {
                        b = false;
                        if (c.autoSlide) {
                            clearTimeout(g);
                            g = setTimeout(h, c.interval)
                        }
                        f = a(this).index();
                        a(this).parent().find(".current").removeClass("current");
                        a(this).addClass("current");
                        c.hide(f);
                        e.fadeOut(c.speed).eq(f).fadeIn(c.speed, function() {
                            c.show(f);
                            b = true
                        });
                        if (c.autoHeight) {
                            k.stop().animate({
                                height: e.eq(f).height()
                            }, c.speed / 2)
                        }
                    }
                    return false
                });
                d.find(".rotator-advancer a").click(function() {
                    if (b) {
                        b = false;
                        var l = this.hash.replace("#", ""),
                            i = e.length;
                        if (c.autoSlide) {
                            clearTimeout(g);
                            g = setTimeout(h, c.interval)
                        }
                        if (l == "next") {
                            f = (f < i - 1) ? f + 1 : 0
                        } else {
                            f = (f > 0) ? f - 1 : i - 1
                        }
                        d.find(".current").removeClass("current");
                        d.find(".rotator-num a").eq(f).addClass("current");
                        c.hide(f);
                        e.fadeOut(c.speed).eq(f).fadeIn(c.speed, function() {
                            c.show(f);
                            b = true
                        });
                        if (c.autoHeight) {
                            k.stop().animate({
                                height: e.eq(f).height()
                            }, c.speed / 2)
                        }
                    }
                    return false
                })
            }
        })
    }
})(jQuery);

function makeSlider(a) {
    var c = {
        url: "http://www.dte.web.id",
        numPost: 5,
        newTabLink: false,
        labelName: null,
        showDetail: true,
        summaryLength: 60,
        titleLength: "auto",
        showThumb: true,
        thumbWidth: 250,
        squareThumb: true,
        noThumb: "http://3.bp.blogspot.com/-vpCFysMEZys/UOEhSGjkfnI/AAAAAAAAFwY/h1wuA5kfEhg/s72-c/grey.png",
        showNav: true,
        navText: {
            prev: "&lt;",
            next: "&gt;"
        },
        containerId: "slider-rotator",
        interval: 6000,
        speed: 1000,
        hoverPause: true,
        crossFade: false,
        autoHeight: false,
        autoSlide: true,
        onInit: function() {},
        onHide: function(d) {},
        onShow: function(d) {}
    };
    for (var b in c) {
        c[b] = (typeof(a[b]) !== "undefined") ? a[b] : c[b]
    }
    $.get(c.url + "/feeds/posts/summary/" + (c.labelName === null ? "" : "-/" + c.labelName.replace(/\,(\s+)?/g, "/")) + "?alt=json-in-script&max-results=" + c.numPost, {}, function(s) {
        if (s.feed.entry !== undefined) {
            var r = s.feed.entry,
                q, p, e, o, h = "",
                d = "";
            for (var m = 0, n = r.length; m < n; m++) {
                if (m == r.length) {
                    break
                }
                q = r[m].title.$t;
                e = ("media$thumbnail" in r[m]) ? '<img alt="' + q + '" src="' + r[m].media$thumbnail.url.replace(/\/s72\-c/, "/s" + c.thumbWidth + (c.squareThumb ? "-c" : "")) + '" style="width:' + c.thumbWidth + "px;height:" + (c.squareThumb ? c.thumbWidth + "px" : "auto") + '">' : '<img src="' + c.noThumb + '" style="width:' + c.thumbWidth + "px;height:" + (c.squareThumb ? c.thumbWidth + "px" : "auto") + '">';
                o = ("summary" in r[m] && c.summaryLength > 0) ? r[m].summary.$t.replace(/<br ?\/?>/ig, " ").replace(/<(.*?)>/g, "").replace(/[<>]/g, "") : "";
                o = (c.summaryLength < o.length) ? o.substring(0, c.summaryLength) + "&hellip;" : o;
                for (var l = 0, f = r[m].link.length; l < f; l++) {
                    p = (r[m].link[l].rel == "alternate") ? r[m].link[l].href : "#"
                }
                h += '<div class="slider-item">';
                h += (c.showThumb && c.showDetail) ? '<div class="image-wrapper">' + e + "</div>" : (c.showThumb && !c.showDetail) ? '<div class="image-wrapper"><a href="' + p + '" title="' + q + '"' + (c.newTabLink ? ' target="_blank"' : "") + ">" + e + "</a></div>" : "";
                h += (c.showDetail) ? '<div class="detail-wrapper"><h4><a title="' + q + '" href="' + p + '"' + (c.newTabLink ? ' target="_blank"' : "") + ">" + ((c.titleLength == "auto") ? q : q.substring(0, c.titleLength) + (q.length > c.titleLength ? "&hellip;" : "")) + "</a></h4><p>" + o + "</p></div>" : "";
                h += "</div>";
                $("#" + c.containerId).css({
                    width: (c.showThumb) ? c.thumbWidth + "px" : $("#" + c.containerId).css("width"),
                    height: (!c.showDetail && c.squareThumb) ? c.thumbWidth + "px" : $("#" + c.containerId).css("height")
                })
            }
            d = '<div class="slider-rotator-nav"' + (c.showNav === false ? ' style="display:none;"' : "") + ">";
            d += (c.showNav === true || c.showNav == "next/prev") ? '<span class="rotator-advancer"><a href="#prev">' + c.navText.prev + "</a></span>" : "";
            if (c.showNav === true || c.showNav == "number") {
                d += '<span class="rotator-num">';
                for (var g = 0; g < c.numPost; g++) {
                    d += '<a href="#slide-' + g + '" class="' + (g === 0 ? "current" : "") + '">' + (g + 1) + "</a>"
                }
                d += "</span>"
            }
            d += (c.showNav === true || c.showNav == "next/prev") ? '<span class="rotator-advancer"><a href="#next">' + c.navText.next + "</a></span>" : "";
            d += "</div>";
            $("#" + c.containerId).html(h).after(d);
            c.onInit();
            $("#" + c.containerId).removeClass("loading").customRotator({
                interval: c.interval,
                speed: c.speed,
                autoHeight: c.autoHeight,
                hoverPause: c.hoverPause,
                crossFade: c.crossFade,
                autoSlide: c.autoSlide,
                hide: function(i) {
                    c.onHide(i)
                },
                show: function(i) {
                    c.onShow(i)
                }
            })
        } else {
            $("#" + c.containerId).removeClass("loading").css({
                width: "auto",
                height: "auto"
            }).html("Error or not found!")
        }
    }, "jsonp")
};
