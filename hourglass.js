// animated hourglass (c) 2019 utilmind

(function(window) {
  "use strict";

  var Hourglass = {
    X: 0,
    Y: 0,

    init: function() {
      var me = this;

      var on = (function() {
        if (document.addEventListener) {
          return function(el, event, fn, useCapture) {
            el.addEventListener(event, fn, useCapture === true);
          }
        }else if (document.attachEvent) {
          return function(el, event, fn) {
            el.attachEvent("on" + event, fn);
          }
        }
      }())

      on(document, "mousemove", function(e) {
        if (!e) e = window.event
        if (e.pageX || e.pageY) {
          me.X = e.pageX;
          me.Y = e.pageY;
        }else if (e.clientX || e.clientY) {
          me.X = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
          me.Y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
        }
        if (me.X < 0) me.X = 0;
        if (me.Y < 0) me.Y = 0;
      })
    },

    show: function(show) {
      var e = document.getElementById("hglass");
      if (!e) { // create new <img> object and append to <body>.
        var e = document.createElement("img");
        e.style.display  = "none";
        e.style.position = "absolute";
        e.style.zIndex   = 999;
        e.width  = 17;
        e.height = 17;
        // embedded "hourglass.gif"
        e.src = "data:image/gif;base64,R0lGODlhEQARAPIFAP///wAAAMDAwEBAQICAgAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAFACwAAAAAEQARAAADOFi63D0wwuBWuJhWRYAXgrYRARCEYtWVZ1qx4da0ckPENfe5TvfhIw8AxGP4hsCKZCLLOHPQ6CIBACH5BAUKAAIALAcABAABAAcAAAIDhH5RACH5BAUKAAAALAcABAADAAkAAAIHBGSpyxAiCgAh+QQFCgACACwFAAQAAQAJAAACBAQiaVEAIfkEBQoAAgAsBgAFAAQACAAAAgaEjqnLFwUAIfkEBQoAAAAsBgAFAAMABwAAAgYEZKkLYQUAIfkECTIAAgAsAwABAAkADgAAAgyUj6nLjeCilGHaUwAAIfkECQoABQAsAAAAABAAEAAAAzhYuhv8cDhIh6SPADuxBtvlgYDAjaUgBCxDvKnaLR/ItgtHBium87iKZNXDFDhF41GkVDCbhdkjAQAh+QQJCgAFACwBAAMADgAJAAADKji13BsjkNkmiRHosIgGWPAB0hiSpCCYUBAIr6uqIQw/c+hyzL47wEIgAQAh+QQFCgAFACwAAAAAEAAQAAADNli6sf5qNAiHpM8GMbEWYJdJABBSGhCoHKYQqhrMokNvYOvCZjhTPJMGExzuAEZXIam8KBmQBAA7";
        e.id  = "hglass";
        document.getElementsByTagName('body')[0].appendChild(e);
      }
      e.style.left = (this.X-8) + "px";
      e.style.top = (this.Y-8) + "px";
      e.style.display = show ? "" : "none";
    }
  }

  Hourglass.init();
  window.hourglass = Hourglass;

}( typeof window !== "undefined" ? window : this ));