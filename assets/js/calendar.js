(function () {
  const CAL_NAMESPACE = "spotkanie-1h";
  const CAL_ORIGIN = "https://app.cal.com";
  const CAL_SCRIPT_URL = "https://app.cal.com/embed/embed.js";
  const CAL_LINK = "astro-muzzy-xacc4k/spotkanie-1h";
  const CALENDAR_HOST_ID = "calendar-embed";
  const BOOKING_SUCCESS_ID = "booking-success";

  let calRenderId = 0;

  function initCalEmbed(C, A, L) {
    const p = function (a, ar) {
      a.q.push(ar);
    };
    const d = C.document;

    C.Cal = C.Cal || function () {
      const cal = C.Cal;
      const ar = arguments;

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }

      if (ar[0] === L) {
        const api = function () {
          p(api, arguments);
        };
        const namespace = ar[1];
        api.q = api.q || [];

        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ["initNamespace", namespace]);
        } else {
          p(cal, ar);
        }
        return;
      }

      p(cal, ar);
    };
  }

  function mountFreshCalendar() {
    const host = document.getElementById(CALENDAR_HOST_ID);
    if (!host || !window.Cal || !window.Cal.ns || !window.Cal.ns[CAL_NAMESPACE]) {
      return;
    }

    calRenderId += 1;
    const inlineId = "my-cal-inline-" + CAL_NAMESPACE + "-" + calRenderId;

    host.innerHTML = '<div id="' + inlineId + '" style="width:100%; height:640px;"></div>';

    window.Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: "#" + inlineId,
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: true
      },
      calLink: CAL_LINK
    });

    window.Cal.ns[CAL_NAMESPACE]("ui", {
      hideEventTypeDetails: true,
      layout: "month_view"
    });
  }

  function closeBookingSuccess() {
    const success = document.getElementById(BOOKING_SUCCESS_ID);
    if (success) {
      success.classList.add("hidden");
    }
  }

  function initBookingSuccessHandler() {
    if (!window.Cal || !window.Cal.ns || !window.Cal.ns[CAL_NAMESPACE]) {
      return;
    }

    window.Cal.ns[CAL_NAMESPACE]("on", {
      action: "bookingSuccessfulV2",
      callback: function () {
        const success = document.getElementById(BOOKING_SUCCESS_ID);

        if (success) {
          success.classList.remove("hidden");
        }

        setTimeout(function () {
          mountFreshCalendar();
        }, 150);
      }
    });
  }

  function initCalendar() {
    if (!document.getElementById(CALENDAR_HOST_ID)) {
      return;
    }

    initCalEmbed(window, CAL_SCRIPT_URL, "init");
    window.Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });

    mountFreshCalendar();
    initBookingSuccessHandler();

    // potrzebne, bo w HTML onclick="closeBookingSuccess()"
    window.closeBookingSuccess = closeBookingSuccess;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCalendar);
  } else {
    initCalendar();
  }
})();
