/**
 * SIGNAL LOST — Night 2 copy strings (Notes, Browser, Voicemail).
 */
(function () {
  "use strict";

  var HIDDEN_MESSAGES = [
    {
      time: "Mar 2 \u2014 11:47 PM",
      text: "I should have said something at the entrance. You were right there.",
      status: "Not delivered",
    },
    {
      time: "Mar 2 \u2014 11:52 PM",
      text: "I kept the number. Deleted it three times. Kept it anyway.",
      status: "Not delivered",
    },
    {
      time: "Mar 3 \u2014 12:03 AM",
      text: "I don\u2019t think you\u2019ll check this. I think that\u2019s why I\u2019m sending it.",
      status: "Not delivered",
    },
  ];

  var BROWSER_HIDDEN_MESSAGES = [
    {
      time: "Mar 2, 11:47 PM",
      text: "I should have said something at the entrance. You were right there.",
      status: "Send failed",
    },
    {
      time: "Mar 2, 11:52 PM",
      text: "I kept the number. Deleted it three times. Kept it anyway.",
      status: "Send failed",
    },
    {
      time: "Mar 3, 12:03 AM",
      text: "I don\u2019t think you\u2019ll check this. I think that\u2019s why I\u2019m sending it.",
      status: "Send failed",
    },
  ];

  window.SignalLostNight2Data = {
    notesIntro:
      "<p>To-do (never done):</p>" +
      "<ul><li>return call</li><li>water plants</li><li>say it plainly</li></ul>" +
      "<p>\u201cI don\u2019t want to disappear mid-sentence.\u201d</p>" +
      "<p><a href='memory-draft.html' style='color:#6c63ff'>View full draft \u2192</a></p>",
    browserIntro:
      "<p>Search history, last day:</p>" +
      "<ul>" +
      "<li>how late does the library close</li>" +
      "<li><a href='memory-east-entrance.html' style='color:#6c63ff'>park bench near east entrance</a></li>" +
      "<li><a href='memory-three-weeks.html' style='color:#6c63ff'>what I said in february</a></li>" +
      "<li>can you hear a phone ring through a door</li>" +
      "</ul>",
    voicemailLocked:
      "<p>Voicemail is locked.</p><p style='color:#9898b0'>Trust the line a little more.</p>",
    voicemailUnlockedIntro: "<p>One unheard message.</p>",
    voicemailPlayLabel: "Play message",
    HIDDEN_MESSAGES: HIDDEN_MESSAGES,
    BROWSER_HIDDEN_MESSAGES: BROWSER_HIDDEN_MESSAGES,
  };
})();
