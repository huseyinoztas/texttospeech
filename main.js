//init speechSynth API
const synth = window.speechSynthesis;
//DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Inıt voices array

let voices=[];

const getVoices = () => {
    voices = synth.getVoices();
    
    // Loop Through voices and create an option for each one
    voices.forEach(voice => {
        //Create option element
        const option = document.createElement('option');
        //Fill option with voice and language
        option.textContent = voice.name + '( '+ voice.lang + ')';

        //Set needed option attributes
        option.setAttribute('data-lang', voices.lang);
        option.setAttribute('data-name', voices.name);
        voiceSelect.appendChild(option);
    })
}

getVoices();

if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//Speak 

const speak = () => {
    
    // Check if speaking
    if (synth.speaking) {
        console.error('Allready speaking...');
        return;
    }
    if(textInput.value !=='') {
        // add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat= 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e => {
            console.log('Done speaking..');
            body.style.background = ' #141414';
        }

        // Speak error
        speakText.onerror = e => {
            console.error('Something went rong');
        }

        // Selected voice 
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice=> {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //Speak
        synth.speak(speakText);

    }
};

// EVent Listeners

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change 
rate.addEventListener('change', e => rateValue.textContent= rate.value);


//Pitch value change 
pitch.addEventListener('change', e => pitchValue.textContent= pitch.value);

// voice select change 
voiceSelect.addEventListener('change', e => speak() );