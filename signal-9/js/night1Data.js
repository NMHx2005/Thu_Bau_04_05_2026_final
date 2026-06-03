/**
 * SIGNAL LOST — Night 1 narrative data (lore, hotspot beats, chat script builder).
 */
(function () {
  "use strict";

  var LORE = {
    laptop: {
      title: "The Unsent Draft",
      text:
        "A message half-written, cursor still blinking at the end of an unfinished sentence. You have been trying to say something for long enough that the screen dimmed once and you had to move the mouse to bring it back.",
      img: "assets/images/night1/obj_laptop.png",
    },
    window: {
      title: "No Reflection",
      text:
        "Rain on the glass. Your shape should be there — a smudge of warmth against the dark outside. It is not. You stand closer. Still nothing. The glass is honest in a way the room is not.",
      img: "assets/images/night1/obj_window.png",
    },
    note: {
      title: "The Number",
      text: "A handwritten phone number, slightly smudged. 0427 318 247. ▣",
      img: "assets/images/night1/obj_note.png",
    },
    photo: {
      title: "The Photograph",
      text:
        "Someone you almost recognise. The blur is not a flaw — you think you did this deliberately, kept the image just soft enough that you could not be certain. Certainty would have required a decision.",
      img: "assets/images/night1/obj_photo.png",
    },
    coat: {
      title: "Still Warm",
      text:
        "Still warm by the door. You know this coat. The particular weight of it, the way it sat on someone's shoulders on a night you have not stopped returning to. It should not still be warm.",
      img: "assets/images/night1/obj_coat.png",
    },
  };

  var HOTSPOT_BEATS = {
    note: "You read the number before you dialled. Smudged ink still counts.",
    window: "No reflection. You noticed. The room is refusing to lie.",
    laptop:
      "The sentence on your laptop. You have been trying to finish it longer than you have been here.",
    photo: "You looked at the photograph first. Blur is mercy until you're ready.",
    coat: "You already touched the coat. I'm not guessing your room. I'm reading what you carried out of it.",
  };

  function buildNight1ChatScript(visited) {
    var v = visited || {};
    var script = [
      { type: "unknown", text: "I've been waiting for you to call." },
      {
        type: "unknown",
        text: "You left something behind. Not an object, a sentence you never finished.",
      },
      {
        type: "choices",
        options: [
          { label: "I'm listening.", trust: 1 },
          { label: "Stop talking in riddles.", trust: -1 },
          { label: "…", trust: 0 },
        ],
      },
      {
        type: "unknown",
        text: "Good. The coat by the door is still warm. You remember the weight, even if you won't name it yet.",
      },
      {
        type: "choices",
        options: [
          { label: "How do you know that?", trust: -1 },
          { label: "I remember the weight.", trust: 1 },
          { label: "Say something useful.", trust: 0 },
        ],
      },
    ];

    ["note", "window", "laptop", "photo", "coat"].forEach(function (id) {
      if (v[id] && HOTSPOT_BEATS[id]) {
        script.push({ type: "unknown", text: HOTSPOT_BEATS[id] });
      }
    });

    script.push(
      {
        type: "choices",
        options: [
          { label: "Why does the clock say 2:47?", trust: 0 },
          { label: "The window shows no reflection.", trust: 0 },
          { label: "Send what you have.", trust: 0 },
        ],
      },
      {
        type: "unknown",
        text: "2:47 holds because you're still in the breath before you admitted what the moment is. It won't tick while you keep rehearsing instead of speaking.",
      },
      {
        type: "unknown",
        text: "Glass without a reflection is honesty with nowhere to bounce, only the room behind you, softer than it should be.",
      },
      {
        type: "unknown",
        text: "I'm sending you a picture. Not what it is, what it felt like when you were last somewhere else.",
      }
    );

    return script;
  }

  window.SignalLostNight1Data = {
    LORE: LORE,
    HOTSPOT_BEATS: HOTSPOT_BEATS,
    buildNight1ChatScript: buildNight1ChatScript,
  };
})();
