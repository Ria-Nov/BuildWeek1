// /* PROGETTO
// - timer: deve partire a 60 secondi (60000  ms), resettarsi ad ogni cambio domanda automaticamente, fa partire domanda successiva allo scadere, si resetta ad ogni cambio domanda (click bottone), deve comunicare con il grafico (libreria esterna?), comunicare con il counter
// - domande: creare div con domande, radio button (appendChild, numero risposte contenute nell'array), cambio domande al click del bottone o allo scadere del tempo, cambio colori per risposta selezionata, comunicare con il localstorage? -> prossima pagina/stessa pagina, database
//  array stessi indici, risposte random
//     questions()= prende le domande, le mette nell'h2, cicla for con answers(), display domande, mette risposte nei radio button
//     // answers() = cicla le risposte, prende quella giusta, scarta le sbagliate
//     save()= salva nella variabile per counter e percentuali, local storage?
//     contatore()= progredire il numero di domande
//     bottone() = attivare bottone, ripulire pagina per domanda successiva, al decimo reset cambiare pagina in risultati
// - counter: comunicare con bottone e timer
// - bottone: resettare pagina, comunicare con il counter, ultimo reset -> risultati (for con indice)
// */


// localstorage
if (!localStorage.getItem('quizResponses')) {
  localStorage.setItem('quizResponses', '');
}

function gestisciRisposta(domanda, rispostaData, corretta) {
  var quizResponses = localStorage.getItem('quizResponses') || '';
  var nuovaRisposta = domanda + '|' + rispostaData + '|' + corretta + ';';
  quizResponses += nuovaRisposta;
  localStorage.setItem('quizResponses', quizResponses);
}

// libreria

const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ];

  // end libreria

// TIMER
let fill;

function startTimer() {
  let counter = document.getElementById('counter').getContext('2d');
  let no = 60;
  let pointToFill = 4.72;
  let cw = counter.canvas.width;
  let ch = counter.canvas.height;
  let diff;

  //QUI BISOGNA MODIFICARE L'AMPIEZZA DEL CERCHIO INTORNO AL TIMER?
  function fillCounter() {
    diff = ((no / 60) * Math.PI * 2 * 60);
    counter.clearRect(0, 0, cw, ch);
    counter.lineWidth = 15;
    counter.fillStyle = '#FFF';
    counter.strokeStyle = '#00FFFF';
    counter.textAlign = 'center';
    counter.font = "25px monospace";
    counter.color = '#FFF';
    counter.fillText(no, 100, 110);
    counter.beginPath();
    counter.arc(100, 100, 60, pointToFill, diff / 60 + pointToFill);
    counter.stroke();

    if (no <= 0) {
      clearInterval(fill);
      counter.fillStyle = 'transparent';
      counter.fillRect(0, 0, cw, ch);

      currentQuestionIndex++;
    }
    no--;
  }

  fill = setInterval(fillCounter, 1000);
}

//QUESTO SERVE PER FAR AZZERARE IL TIMER: CREDO ABBIA UN RITARDO DI UN SECONDO
function resetTimer() {
  clearInterval(fill);
  startTimer();
}

// VARIABILI PER IL RISULTATO DELLE RISPOSTE
let corrette = 0;
let sbagliate = 0;

// VARIABILE INDICE DOMANDA CORRENTE
let currentQuestionIndex = 0;

// DIV DOMANDE
let container = document.getElementById('container');
let domande = document.querySelector('.domande h2');
let risposte = document.querySelector('#risposte');
let next = document.getElementById('next');
let contatore = document.getElementById('contatore');
let risultati = document.getElementById('paginaRisultati');
let quiz = document.getElementById('paginaQuiz');
let timer = document.getElementById('timer');

// VARIABILE PER IL TIMER
let no = 60;

// AVVIARE IL TIMER ALL'INIZIO DEL TEST
window.onload = function () {
  risultati.style.display = 'none';
  showCurrentQuestion();
  startTimer(); 
};

// DOMANDA CORRENTE:
function showCurrentQuestion() {
  const quizContainer = document.getElementById('quizContainer');
  const currentQuestion = questions[currentQuestionIndex];
  contatore.innerText = `Domanda ${currentQuestionIndex + 1}/${questions.length}`;
  quizContainer.innerHTML = `
        <h2 class="centrato">${currentQuestion.question}</h2>
        <div class="centrato">${generateAnswerOptions(currentQuestion)}</div>`;
}

//GENERARE LE RISPOSTE PER LA DOMANDA 
function generateAnswerOptions(question) {
  return question.incorrect_answers.concat(question.correct_answer)
    .sort(() => Math.random() - 0.5) // RICORDIAMO MATH.RANDOM FA UNO SHUFFLE 
    .map(answer => `<div  class="inline">
            <input type="radio" name="answer" value="${answer}" id="${answer.replace(/ /g, '')} class="radiobtn">
            <label for="${answer.replace(/ /g, '')}">${answer}</label></div>`
    ).join('');
}

// GESTIONE DELLA RISPOSTA DELL'UTENTE
function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedAnswer.value === currentQuestion.correct_answer) {
      // AGGIUNGE UN PUNTO SE RISPOSTA CORRETTA
      corrette = corrette + 1;
      
    } else if (no <= 0) {
      if (selectedAnswer.value === currentQuestion.correct_answer) {
        // 
        corrette = corrette + 1;
       

      }
    } else {
      // AGGIUNGE UN PUNTO SE RISPOSTA SBAGLIATA
      sbagliate = sbagliate +1;
     
    }

    currentQuestionIndex++;


    // RESET TIMER A INIZIO NUOVA DOMANDA
    if (currentQuestionIndex < questions.length) {
      showCurrentQuestion();
      resetTimer(); 
    }else{
      quiz.style.display = 'none';
      timer.style.display = 'none';
      risultati.style.display = 'inline';
  } 
      
  }
 
 return sbagliate
}

console.log(submitAnswer())


// corrette = submitAnswer()
// sbagliate = 10- submitAnswer()

// Dati del grafico
const dati = {
  datasets: [{
    data: [], // I tuoi dati qui
    backgroundColor: ['#00ffff', '#c2128d']
  }]
};

dati.datasets[0].data.push((10 - sbagliate))
dati.datasets[0].data.push(sbagliate)

// Opzioni del grafico
var opzioni = {
  responsive: true,
  maintainAspectRatio: false,
  display: true
};


// Ottieni il riferimento al canvas
var ctx = document.getElementById('doughnutChart').getContext('2d');

// Crea il grafico a forma di anello
var doughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: dati,
  options: opzioni
});

doughnutChart.update()