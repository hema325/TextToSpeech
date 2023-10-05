
const textArea = document.querySelector("#text"),
    voiceSelect = document.querySelector("#voices"),
    convertBtn = document.querySelector("#convert-btn");

const intervalId = setInterval(() => {

    const voices = speechSynthesis.getVoices();
    if (voices.length != 0) {
        voices.forEach(voice => {
            const option = document.createElement("option");
            option.value = voice.name;
            option.textContent = voice.name;
            voiceSelect.append(option);
        });
        clearInterval(intervalId);
    }

}, 1000);

let isPaused = false;

const speak = () => {

    if (textArea.value === "")
        return;

    if (!speechSynthesis.speaking) {
        const utterance = new SpeechSynthesisUtterance(textArea.value);
        utterance.voice = speechSynthesis.getVoices().filter(voice => voice.name === voiceSelect.value)[0];
        speechSynthesis.speak(utterance);

        if (textArea.value.length > 80)
            convertBtn.textContent = "Pause Speech";
        return;
    }

    if (speechSynthesis.speaking && !isPaused) {
        speechSynthesis.pause();
        convertBtn.textContent = "Resume Speech";
        isPaused = true;
        return;
    }

    if (isPaused) {
        speechSynthesis.resume();
        convertBtn.textContent = "Pause Speech"
        isPaused = false;
        return;
    }

}

setInterval(() => {
    if (!speechSynthesis.speaking)
        convertBtn.textContent = "Convert To Speech";
}, 1000);

convertBtn.addEventListener("click", speak);
