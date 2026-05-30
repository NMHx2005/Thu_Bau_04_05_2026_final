/**
 * SIGNAL LOST — status-bar signal meter (trust + clue fragments).
 * Injects into every .phone-status and syncs from SignalLostState.
 */
(function () {
  "use strict";

  var BAR_COUNT = 5;
  var CLUE_COUNT = 4;
  var TRUST_MAX = 10;
  var prevTrust = null;
  var prevClues = null;

  function barFill(trust, index) {
    var start = index * 2;
    if (trust <= start) return 0;
    if (trust >= start + 2) return 100;
    return ((trust - start) / 2) * 100;
  }

  function buildMeterEl() {
    var meter = document.createElement("div");
    meter.className = "phone-status__meter";
    meter.setAttribute("role", "status");
    meter.setAttribute("aria-live", "polite");

    var label = document.createElement("span");
    label.className = "phone-status__meter-label";
    label.textContent = "Signal";
    label.setAttribute("aria-hidden", "true");

    var bars = document.createElement("div");
    bars.className = "phone-status__bars";
    bars.setAttribute("aria-hidden", "true");
    for (var i = 0; i < BAR_COUNT; i++) {
      var bar = document.createElement("span");
      bar.className = "phone-status__bar";
      var fill = document.createElement("span");
      fill.className = "phone-status__bar-fill";
      fill.style.height = "0%";
      bar.appendChild(fill);
      bars.appendChild(bar);
    }

    var clues = document.createElement("div");
    clues.className = "phone-status__clues";
    clues.setAttribute("aria-hidden", "true");
    for (var j = 0; j < CLUE_COUNT; j++) {
      var pip = document.createElement("span");
      pip.className = "phone-status__clue";
      clues.appendChild(pip);
    }

    meter.appendChild(label);
    meter.appendChild(bars);
    meter.appendChild(clues);
    return meter;
  }

  function injectMeters() {
    var headers = document.querySelectorAll(".phone-status");
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header.querySelector(".phone-status__meter")) continue;
      var battery = header.querySelector(".phone-status__battery");
      var meter = buildMeterEl();
      if (battery) {
        header.insertBefore(meter, battery);
      } else {
        header.appendChild(meter);
      }
    }
  }

  function pulseClass(meter, className) {
    if (!meter || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    meter.classList.remove("phone-status__meter--trust-up", "phone-status__meter--clue-up");
    void meter.offsetWidth;
    meter.classList.add(className);
    window.setTimeout(function () {
      meter.classList.remove(className);
    }, 700);
  }

  function refresh(detail) {
    injectMeters();

    var S = window.SignalLostState;
    if (!S) return;

    var trust = S.getTrust ? S.getTrust() : 0;
    var clues = S.getClues ? S.getClues() : 0;
    var trustUp = detail && typeof detail.prevTrust === "number" ? trust > detail.prevTrust : prevTrust !== null && trust > prevTrust;
    var clueUp = detail && typeof detail.prevClues === "number" ? clues > detail.prevClues : prevClues !== null && clues > prevClues;

    var meters = document.querySelectorAll(".phone-status__meter");
    for (var m = 0; m < meters.length; m++) {
      var meter = meters[m];
      var bars = meter.querySelectorAll(".phone-status__bar-fill");
      for (var b = 0; b < bars.length; b++) {
        bars[b].style.height = barFill(trust, b) + "%";
      }

      var pips = meter.querySelectorAll(".phone-status__clue");
      for (var c = 0; c < pips.length; c++) {
        pips[c].classList.toggle("phone-status__clue--found", c < clues);
      }

      meter.setAttribute(
        "aria-label",
        "Signal strength " + trust + " of " + TRUST_MAX + ", fragments " + clues + " of " + CLUE_COUNT
      );
      meter.title = "Connection " + trust + "/" + TRUST_MAX + " · Fragments " + clues + "/" + CLUE_COUNT;

      if (trustUp) pulseClass(meter, "phone-status__meter--trust-up");
      if (clueUp) pulseClass(meter, "phone-status__meter--clue-up");
    }

    prevTrust = trust;
    prevClues = clues;
  }

  function init() {
    injectMeters();
    refresh();
  }

  window.addEventListener("signallost:statechange", function (ev) {
    refresh(ev && ev.detail ? ev.detail : null);
  });

  window.SignalLostSignalMeter = {
    init: init,
    refresh: refresh,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
