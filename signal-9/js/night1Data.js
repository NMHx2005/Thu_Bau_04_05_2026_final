/**
 * SIGNAL LOST — Night 1 narrative data (lore, hotspot beats, chat script builder).
 */
(function () {
  "use strict";

  var LORE = {
    laptop: {
      title: "The Unsent Draft",
      text: "A half-written unsent message. Cursor still blinking. The player has been trying to say something and could not finish it.",
      img: "assets/images/night1/obj_laptop.png",
    },
    window: {
      title: "No Reflection",
      text: "Rain on the glass, but no reflection. A planted clue. Most players read it as an art style choice on first playthrough and only catch it on replay.",
      img: "assets/images/night1/obj_window.png",
    },
    note: {
      title: "The Number",
      text: "A handwritten phone number, slightly smudged. 0427 318 247. A small symbol in the corner: ▣.",
      img: "assets/images/night1/obj_note.png",
    },
    photo: {
      title: "The Photograph",
      text: "A blurred image of a person. Warm frame. The face is almost recognisable, but not quite.",
      img: "assets/images/night1/obj_photo.png",
    },
    coat: {
      title: "Still Warm",
      text: "Still warm by the door. If you read this before you call, Unknown will remember.",
      img: "assets/images/night1/obj_coat.png",
    },
  };

  var HOTSPOT_BEATS = {
    note: "You read the number before you dialled. Smudged ink still counts.",
    window: "No reflection. You noticed. The room is refusing to lie.",
    laptop: "The draft on your laptop. Same sentence, different screen.",
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
