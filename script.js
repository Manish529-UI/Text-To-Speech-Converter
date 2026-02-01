const text = document.getElementById("text");
const voiceSelect = document.getElementById("voice");
const btn = document.getElementById("btn");

let voices = [];

// Load available voices
function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (!voices.length) return;

  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
}

// Desktop + Mobile fix
speechSynthesis.onvoiceschanged = loadVoices;
document.addEventListener("click", loadVoices, { once: true });

btn.addEventListener("click", () => {
  if (!text.value.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text.value);
  const selectedVoice = voices[voiceSelect.value];

  if (selectedVoice) {
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang; // 🔥 IMPORTANT for accent
  }

  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
});
