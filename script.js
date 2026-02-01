let voices = [];
let voiceSelect = document.querySelector("select");

// voices load hone par
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  voiceSelect.innerHTML = "";

  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name + " (" + voice.lang + ")", i);
  });
};

// voice change
voiceSelect.addEventListener("change", () => {
  // nothing needed here now
});

document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value;
  if (!text.trim()) return;

  // 🔥 create utterance on click (mobile-safe)
  const speech = new SpeechSynthesisUtterance(text);

  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    speech.voice = selectedVoice;
    speech.lang = selectedVoice.lang;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
});
