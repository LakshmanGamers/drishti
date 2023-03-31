let recognizer;
function speak (message) {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[4]
  
  window.speechSynthesis.speak(msg)
}
$(document ).ready(function(){
  //space bar -> mic off -> pc
  //speak("welcome to drishti ,say one for business ,say two for engineering ,say three for accounting, say four for stenography say five for cosmetic and hairstyle ,  say go for playing the audio, say stop for pausing the video, say left for moving to previous page ,say right for moving to next page ,say eight to repeat the menu instructions");
  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
         stopListening();
      }
  }
});
function clickCounter() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
  }
}
$(document ).ready(function(){
  //any key -> mic on -> pc
  //speak("welcome to drishti ,say one for business ,say two for engineering ,say three for accounting, say four for stenography say five for cosmetic and hairstyle ,  say go for playing the audio, say stop for pausing the video, say left for moving to previous page ,say right for moving to next page ,say eight to repeat the menu instructions");
  document.addEventListener("keypress",predictWord);
});
$(document ).ready(function(){
  //double tap on screen -> mic on -> mobile
  //speak("welcome to drishti ,say one for business ,say two for engineering ,say three for accounting, say four for stenography say five for cosmetic and hairstyle ,  say go for playing the audio, say stop for pausing the video, say left for moving to previous page ,say right for moving to next page ,say eight to repeat the menu instructions");
  document.addEventListener("dblclick",predictWord);
});


async function demo() {

      await sleep(3000);
  console.log('Done');
}

function predictWord() {
  
 
 // Array of words that the recognizer is trained to recognize.
 const words = recognizer.wordLabels();
 recognizer.listen(({scores}) => {
   // Turn scores into a list of (score,word) pairs.
   scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
   // Find the most probable word.
   scores.sort((s1, s2) => s2.score - s1.score);

    // console.log(recognizer);
    document.getElementById("pop").innerHTML=scores[0].word;
   
   switch(scores[0].word){

    case "one" : 
    window.speechSynthesis.cancel();
    speak("you are wrong , correct answer is option two Jawaharlal Nehru, moving to next question,Which Governor General introduce the Permanent land revenue system in India option one Lord Cornwallis , option two Lord Bentinck ,option three Lord Lytton, option four Lord Ripon, say the correct option ");
                window.location.href = "quiznew22.html";
                  break;
    case "two" : 
    window.speechSynthesis.cancel();
    speak("you are right ,moving to next question, Which Governor General introduce the Permanent land revenue system in India option one Lord Cornwallis , option two Lord Bentinck ,option three Lord Lytton, option four Lord Ripon,  say the correct option ");
  
    window.location.href = "quiznew22.html";
    clickCounter();
                   break;
    case "three" : 
    window.speechSynthesis.cancel();
    speak("you are wrong , correct answer is option two Jawaharlal Nehru,moving to next question, Which Governor General introduce the Permanent land revenue system in India option one Lord Cornwallis , option two Lord Bentinck ,option three Lord Lytton, option four Lord Ripon,  say the correct option ");

    window.location.href = "quiznew22.html";
                   break;
    case "four" : 
    window.speechSynthesis.cancel();
    speak("you are wrong , correct answer is option two Jawaharlal Nehru,moving to next question, Which Governor General introduce the Permanent land revenue system in India option one Lord Cornwallis , option two Lord Bentinck ,option three Lord Lytton, option four Lord Ripon,  say the correct option ");
    window.location.href = "quiznew22.html";
                   break;
   //case "left" : 
   
 //  window.history.back();
     //              break;
   //case "right" : window.history.forward();
       //            break;
   case "nine" : window.close();
   
                   break;
   case "yes": stopListening();
   break;
default : speak("can you say again?");
      break;
   }
  // document.querySelector('#console').textContent = scores[0].word;
  
 }, {probabilityThreshold: 0.80});
}

async function registerSW() {
  
  console.log(navigator)
  if ('serviceWorker' in navigator) {
    
    console.log("Service worker present");
    try {
      await navigator.serviceWorker.register('/sw.js');

    } catch (e) {
      console.log(`SW registration failed`);
    }
  }else{
    console.log("No service worker??");
  }
}
async function sp(){
  window.speechSynthesis.speak(new SpeechSynthesisUtterance('Hello World'));
}
async function app() {
  
  recognizer = speechCommands.create('BROWSER_FFT');
  await recognizer.ensureModelLoaded();
  
  predictWord();
 
  registerSW();
  
}

app();
function stopListening(){
  recognizer.stopListening();
}
