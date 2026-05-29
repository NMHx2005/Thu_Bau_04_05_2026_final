/**
 * SIGNAL LOST — Night 1: explore, dial, chat, signal decode.
 */
(function () {
  "use strict";

  var IMG_LAST_LOCATION = "assets/images/LastLocation.png";
  var IMG_LAST_LOCATION_FALLBACK = "assets/images/Bedroom.png";
  var DIAL_MAX_DIGITS = 10;
  var STORAGE_DIAL_DECOY = "signalLost_dialDecoyPassed";

  var visited = {};
  var dialBuf = "";
  var rainCtl = null;
  var decodeCtl = null;
  var decoyDigits = "";
  var lightboxEscHandler = null;

  var data = window.SignalLostNight1Data;
  var LORE = data && data.LORE ? data.LORE : {};

  function $(id) {
    return document.getElementById(id);
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function showBootError(msg) {
    var el = document.createElement("div");
    el.className = "boot-error";
    el.setAttribute("role", "alert");
    el.textContent = msg;
    document.body.appendChild(el);
  }

  function showLore(text) {
    var host = $("loreHost");
    host.innerHTML = "";
    var wrap = document.createElement("div");
    wrap.className = "lore-overlay";
    var box = document.createElement("div");
    box.className = "lore-overlay__box";
    box.textContent = text;
    wrap.appendChild(box);
    wrap.addEventListener("click", function () {
      host.innerHTML = "";
    });
    host.appendChild(wrap);
  }

  function bindLightboxEsc() {
    if (lightboxEscHandler) return;
    lightboxEscHandler = function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
        var lb = $("objLightbox");
        if (lb && !lb.classList.contains("night-hidden")) {
          closeLightbox();
        }
      }
    };
    document.addEventListener("keydown", lightboxEscHandler);
  }

  function showLightbox(id, hotspotEl) {
    var lore = LORE[id];
    if (!lore) return;

    var lb = $("objLightbox");
    var inner = $("objLightbox__inner");
    var imgEl = $("objLightbox__img");
    var titleEl = $("objLightbox__title");
    var textEl = $("objLightbox__text");
    var closeBtn = $("objLightbox__close");

    imgEl.src = lore.img;
    imgEl.dataset.object = id;
    titleEl.textContent = lore.title;
    textEl.textContent = lore.text;

    var rect = hotspotEl.getBoundingClientRect();
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var originX = rect.left + rect.width / 2 - vw / 2;
    var originY = rect.top + rect.height / 2 - vh / 2;
    var scaleStart = Math.min(rect.width / 320, rect.height / 220, 0.35);

    inner.style.transition = "none";
    inner.style.transform =
      "translate(" + originX + "px," + originY + "px) scale(" + scaleStart + ")";
    inner.style.opacity = "0";

    lb.classList.remove("night-hidden");
    lb.offsetWidth;
    inner.style.transition =
      "transform 0.38s cubic-bezier(0.22,0.61,0.36,1), opacity 0.32s ease";
    inner.style.transform = "translate(0,0) scale(1)";
    inner.style.opacity = "1";
    lb.classList.add("lb-open");

    bindLightboxEsc();
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    var lb = $("objLightbox");
    var inner = $("objLightbox__inner");

    inner.style.transition = "transform 0.25s ease, opacity 0.22s ease";
    inner.style.transform = "scale(0.88)";
    inner.style.opacity = "0";
    lb.classList.remove("lb-open");

    setTimeout(function () {
      lb.classList.add("night-hidden");
    }, 260);
  }

  function showHotspotDotsImmediate() {
    var order = ["window", "photo", "laptop", "coat", "note"];
    order.forEach(function (id, i) {
      var btn = document.querySelector(".hotspot--" + id);
      if (!btn) return;
      var dot = btn.querySelector(".hotspot-dot");
      if (dot) {
        dot.style.animationDelay = i * 0.15 + "s";
        dot.classList.add("visible");
      }
    });
  }

  function runWakeupSequence() {
    if (prefersReducedMotion()) {
      var top = $("eyeLidTop");
      var bot = $("eyeLidBottom");
      if (top && bot) {
        top.style.animation = "none";
        bot.style.animation = "none";
        top.style.transform = "translateY(-100%)";
        bot.style.transform = "translateY(100%)";
      }
      showHotspotDotsImmediate();
      return;
    }

    var STAGGER_MS = 400;
    var order = ["window", "photo", "laptop", "coat", "note"];

    setTimeout(function () {
      order.forEach(function (id, i) {
        setTimeout(function () {
          var btn = document.querySelector(".hotspot--" + id);
          if (!btn) return;
          var dot = btn.querySelector(".hotspot-dot");
          if (dot) {
            dot.style.animationDelay = i * 0.15 + "s";
            dot.classList.add("visible");
          }
        }, i * STAGGER_MS);
      });
    }, 2800);
  }

  function updateExploreCta() {
    var n = Object.keys(visited).length;
    $("btnToDial").disabled = n < 5;
  }

  function initExplore() {
    document.querySelectorAll(".hotspot").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-id");
        visited[id] = true;
        btn.classList.add("is-visited");
        showLightbox(id, btn);
        if (window.SignalLostAudio) window.SignalLostAudio.playTypingTick();
        updateExploreCta();
      });
    });

    var lb = $("objLightbox");
    lb.addEventListener("click", function (e) {
      if (e.target === lb) closeLightbox();
    });
    $("objLightbox__close").addEventListener("click", function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    $("btnToDial").addEventListener("click", function () {
      $("phase-explore").classList.add("night-hidden");
      $("phase-dial").classList.remove("night-hidden");
    });
  }

  function normalizeDial(s) {
    return (s || "").replace(/\D/g, "");
  }

  function formatPhoneDigits(digits) {
    return digits.length === 10
      ? digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
      : digits;
  }

  function buildDecoyDigits(correct) {
    if (!correct || correct.length < 1) return correct;
    var last = correct.length - 1;
    var n = (parseInt(correct.charAt(last), 10) + 1) % 10;
    return correct.slice(0, last) + String(n);
  }

  function dialDecoyPassed() {
    return sessionStorage.getItem(STORAGE_DIAL_DECOY) === "1";
  }

  function setDialDecoyPassed() {
    sessionStorage.setItem(STORAGE_DIAL_DECOY, "1");
  }

  function setNoteHintDigits(digits) {
    $("noteHint").textContent = formatPhoneDigits(digits);
  }

  function shakeDialPad() {
    if (prefersReducedMotion()) return;
    var pad = document.querySelector("#phase-dial .dial-pad");
    if (!pad) return;
    pad.classList.remove("dial-shake");
    pad.offsetWidth;
    pad.classList.add("dial-shake");
    pad.addEventListener(
      "animationend",
      function cleanup() {
        pad.classList.remove("dial-shake");
        pad.removeEventListener("animationend", cleanup);
      },
      { once: true }
    );
    if (navigator.vibrate) {
      navigator.vibrate([40, 30, 40, 30, 55]);
    }
    if (window.SignalLostAudio) {
      window.SignalLostAudio.playTone(110, 0.09, 0.14);
      setTimeout(function () {
        window.SignalLostAudio.playTone(85, 0.11, 0.1);
      }, 90);
    }
  }

  function onDecoyDialComplete() {
    var correct =
      window.SignalLostState && window.SignalLostState.NOTE_PHONE_DIGITS
        ? window.SignalLostState.NOTE_PHONE_DIGITS
        : "0427318247";
    setDialDecoyPassed();
    setNoteHintDigits(correct);
    dialBuf = "";
    renderDial();
    shakeDialPad();
    showLore("Wrong line. The handset trembles. Read the note again, then dial.");
  }

  function renderDial() {
    $("dialDisplay").textContent = dialBuf || " ";
  }

  function dialDigit(d) {
    if (normalizeDial(dialBuf).length >= DIAL_MAX_DIGITS) return;
    dialBuf += d;
    renderDial();
    if (window.SignalLostAudio) window.SignalLostAudio.playTypingTick();
  }

  function wrongNumberResponse() {
    var r = Math.floor(Math.random() * 3);
    if (r === 0) {
      showLore("Busy tone. Three short pulses in your ear, then nothing.");
      if (window.SignalLostAudio) {
        for (var i = 0; i < 3; i++) {
          setTimeout(function () {
            window.SignalLostAudio.playTone(480, 0.12, 0.12);
          }, i * 200);
        }
      }
    } else if (r === 1) {
      showLore("Silence. Not empty, full, like someone left the line open and walked away.");
    } else {
      showLore("Voicemail clicks on: a voice you almost recognise says only, \"Later.\" Then beep.");
      if (window.SignalLostAudio) window.SignalLostAudio.playTone(300, 0.2, 0.08);
    }
  }

  function initDial() {
    var keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
    var grid = $("dialGrid");
    keys.forEach(function (k) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "dial-btn";
      b.textContent = k;
      b.addEventListener("click", function () {
        dialDigit(k);
      });
      grid.appendChild(b);
    });
    $("dialBack").addEventListener("click", function () {
      dialBuf = dialBuf.slice(0, -1);
      renderDial();
    });
    $("dialCall").addEventListener("click", function () {
      var entered = normalizeDial(dialBuf);
      if (window.SignalLostState && window.SignalLostState.isCorrectNoteNumber(entered)) {
        $("phase-dial").classList.add("night-hidden");
        $("phase-phone").classList.remove("night-hidden");
        startNight1Chat();
      } else if (!dialDecoyPassed() && entered === decoyDigits) {
        onDecoyDialComplete();
      } else {
        wrongNumberResponse();
      }
    });
    renderDial();
  }

  function startNight1Chat() {
    if (!window.SignalLostChat) {
      showBootError("Chat module failed to load. Refresh the page.");
      return;
    }
    var log = $("chatLog");
    var choices = $("chatChoices");
    var script =
      data && data.buildNight1ChatScript
        ? data.buildNight1ChatScript(visited)
        : [];

    if (window.SignalLostAudio) window.SignalLostAudio.setNight(1);
    window.SignalLostChat.runScript(script, {
      logEl: log,
      choicesEl: choices,
      getDelayMul: function () {
        return 1.14;
      },
      onComplete: function () {
        $("signalPanel").classList.remove("night-hidden");
        startSignalDecode();
      },
    });
  }

  function appendTransitionText(parent) {
    var el = document.createElement("div");
    el.id = "transitionText";
    var p1 = document.createElement("p");
    p1.textContent = "Night One ends.";
    var p2 = document.createElement("p");
    p2.textContent = "The signal holds.";
    el.appendChild(p1);
    el.appendChild(p2);
    parent.appendChild(el);
  }

  function startSignalDecode() {
    if (!window.SignalLostSignalPuzzle) {
      showBootError("Signal puzzle module failed to load. Refresh the page.");
      return;
    }
    var canvas = $("signalCanvas");
    var slider = $("signalSlider");
    var pct = $("signalPct");
    decodeCtl = window.SignalLostSignalPuzzle.initDecode({
      canvas: canvas,
      slider: slider,
      labelEl: pct,
      imageUrl: IMG_LAST_LOCATION,
      fallbackSrc: IMG_LAST_LOCATION_FALLBACK,
      onComplete: function () {
        if (window.SignalLostState) {
          window.SignalLostState.tryAwardClue("signal1");
        }
        $("btnNight2").style.display = "block";
      },
    });
    decodeCtl.redraw();
    $("btnNight2").addEventListener("click", function () {
      var top = document.getElementById("eyeLidTop");
      var bot = document.getElementById("eyeLidBottom");

      top.style.animation = "none";
      bot.style.animation = "none";
      top.style.transform = "translateY(-100%)";
      bot.style.transform = "translateY(100%)";

      top.offsetWidth;
      top.style.transition = "transform 0.55s cubic-bezier(0.4,0,1,1)";
      bot.style.transition = "transform 0.55s cubic-bezier(0.4,0,1,1)";
      top.style.transform = "translateY(0)";
      bot.style.transform = "translateY(0)";

      setTimeout(function () {
        var host = document.querySelector(".game-viewport__inner") || document.body;
        appendTransitionText(host);

        setTimeout(function () {
          if (rainCtl && typeof rainCtl.fadeOut === "function") {
            rainCtl.fadeOut(400);
          } else if (window.SignalLostAudio) {
            window.SignalLostAudio.fadeRainOut(400);
          }
          setTimeout(function () {
            window.location.href = "night2.html";
          }, 400);
        }, 1500);
      }, 560);
    });
  }

  function boot() {
    if (!data) {
      showBootError("Night 1 data failed to load. Refresh the page.");
      return;
    }
    if (window.SignalLostAudio) {
      window.SignalLostAudio.setNight(1);
      rainCtl = window.SignalLostAudio.startRainLoop();
    }
    var digits = window.SignalLostState ? window.SignalLostState.NOTE_PHONE_DIGITS : "0427318247";
    decoyDigits = buildDecoyDigits(digits);
    if (dialDecoyPassed()) {
      setNoteHintDigits(digits);
    } else {
      setNoteHintDigits(decoyDigits);
    }
    initExplore();
    initDial();
    runWakeupSequence();
  }

  boot();
})();
