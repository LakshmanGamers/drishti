let recognizer;
function speak (message) {
  var msg = new SpeechSynthesisUtterance(message);
  var voices = window.speechSynthesis.getVoices()
  msg.voice = voices[4]
  
  window.speechSynthesis.speak(msg)
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
$(document ).ready(function(){
  //speak("welcome to drishti ,say one for business ,say two for engineering ,say three for accounting, say four for stenography say five for cosmetic and hairstyle ,  say go for playing the audio, say stop for pausing the video, say left for moving to previous page ,say right for moving to next page ,say eight to repeat the menu instructions");
  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        speak("mic off hello");
         stopListening();
      }
  }
});
$(document ).ready(function(){
 speak("mic on");
  //speak("welcome to drishti ,say one for business ,say two for engineering ,say three for accounting, say four for stenography say five for cosmetic and hairstyle ,  say go for playing the audio, say stop for pausing the video, say left for moving to previous page ,say right for moving to next page ,say eight to repeat the menu instructions");
  document.addEventListener("keypress",predictWord);
  //speak("mic on");
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
document.getElementById("texter").innerHTML = scores[0].word;
   
   switch(scores[0].word){
    
    case "go": var x = document.getElementById("myAudio");
                   x.play();
                   console.log(scores[0].word);
                   break;
     case "stop" : 
             var x = document.getElementById("myAudio");
                   x.pause();
                   console,log(scores[0].word);
                   break; 
   // case "left" : window.history.back();
    //console.log(scores[0].word);
     //              break;
   //case "right" : window.history.forward();
   //console.log(scores[0].word);
     //              break;
    case "nine":  speak("closing drishti ");
    console.log(scores[0].word);
                   window.close();
        
    
                  
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
