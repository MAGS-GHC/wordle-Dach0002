let ak = 6; 
let ar = 5; 

let kolonne = 0;
let raekke = 0;

let ordliste = [];
let ord = "";

let gameOver = false;
getText("/Assets/wordle.txt");
async function getText(file) {
  let myObject = await fetch(file);
  let myText = await myObject.text();
  ordliste = myText.split(" ");
  ord = ordliste[Math.floor(Math.random() * ordliste.length)].toUpperCase();

  console.log(ord)
}
plade();

function plade() {
  document.addEventListener("keyup", (e) => {
    if (gameOver) return; 
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      
      if (raekke < 5) {
        let felt = document.getElementById(
          kolonne.toString() + "-" + raekke.toString()
        );
        if (felt.innerText == "") {
          felt.innerText = e.code[3]; 
          raekke += 1;
        }
      }
    } else if (e.code == "Backspace") {
    
      if (0 < raekke && raekke <= 5) {
        raekke -= 1;
      }
      let felt = document.getElementById(
        kolonne.toString() + "-" + raekke.toString()
      );
      felt.innerText = "";
    } else if (e.code == "Enter") {
     
      update(); 
      kolonne += 1;
      raekke = 0;
    }
    if (!gameOver && kolonne == ak) {
      
      gameOver = true;
      document.getElementById("svaret").innerText = ord;
      showGameOverAlert(ord); 
  
    }
  });
}
function showAlert(message) {
    alert(message);
}

function showCongratulationsalert(secretWord) {
  alert('Congratulations! You guessed the word correctly!');
}

function showGameOverAlert(secretWord) {
   alert(`Game over! Better luck next time. The word was "${secretWord}".`);
}    


function update() {
  let korrekt = 0;
  let antalBogstav = {}; 
  for (let i = 0; i < ord.length; i++) {
    bogstav = ord[i];
    if (antalBogstav[bogstav]) {
      antalBogstav[bogstav] += 1;
    } else {
      antalBogstav[bogstav] = 1;
    }
  } 
  for (let k = 0; k < 5; k++) {
    let felt = document.getElementById(kolonne.toString() + "-" + k.toString());
    let bogstav = felt.innerText;
    
    if (ord[k] == bogstav) {
      felt.classList.add("korrekt");
      korrekt += 1;
      antalBogstav[bogstav] -= 1;
    }
    if (korrekt == ar) {
      gameOver = true;
      window.alert("Congratulations! You guessed the word correctly!")
      return;
    }
   
  }
  
  for (let k = 0; k < 5; k++) {
    let felt = document.getElementById(kolonne.toString() + "-" + k.toString());
    let bogstav = felt.innerText;
    if (!felt.classList.contains("korrekt")) {
      if (ord.includes(bogstav) && antalBogstav[bogstav] >= 1) {
        felt.classList.add("forkertPlacering");
        antalBogstav[bogstav] -= 1;
      } else {
        felt.classList.add("ingenKorrekte");
      }
    }
  }
}         


