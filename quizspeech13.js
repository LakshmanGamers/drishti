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
function func(){
  return localStorage.clickCount;
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
    const text1 = "you are wrong , correct answer is option four planning , congratulations on completion of course , the score for the assessment is ,"
    let text2 = func();
    const text3 = 'you are right ,congratulations on completion of course, the score for the assessment is';
   switch(scores[0].word){

    case "one" : 
    window.speechSynthesis.cancel();
    const join1 = `${text1}${localStorage.clickCount}`;
    speak(join1)
                window.location.href = "score1.html";
                  break;
    case "two" : 
    window.speechSynthesis.cancel();
    const join2 = `${text1}${localStorage.clickCount}`;
    speak(join2)
    window.location.href = "score1.html";
                   break;
    case "three" : 
    window.speechSynthesis.cancel();
    const join3 = `${text1}${localStorage.clickCount}`;
    speak(join3)

    window.location.href = "score1.html";
                   break;
    case "four" : 
    window.speechSynthesis.cancel();
    const join4 = `${text3}${localStorage.clickCount}`;
    speak(join4)
    window.location.href = "score1.html";
    clickCounter();
                   break;
   //case "left" : 
   
  // window.history.back();
    //               break;
   //case "right" : window.history.forward();
     //              break;
   case "nine" : window.close();
   
                   break;
  case "yes" : stopListening();
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
