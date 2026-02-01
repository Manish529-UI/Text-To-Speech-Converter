const text = document.getElementById("text");
const voiceSelect = document.getElementById("voice");
const btn = document.getElementById("btn");

let voices = [];

function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  if (!voices.length) return;

  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// ✅ MOST IMPORTANT PART
window.speechSynthesis.onvoiceschanged = populateVoices;

// extra safety (desktop + some mobiles)
window.addEventListener("load", () => {
  populateVoices();
});

btn.addEventListener("click", () => {
  if (!text.value.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text.value);

  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
});


