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
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
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
// VARIABILI PER IL RISULTATO DELLE RISPOSTE
let corrette = 0;
let sbagliate = 0;
let currentQuestionIndex = 0;
let no = 60;
let fill;

// ELEMENTI DOM
let contatore = document.getElementById("contatore");
let risultati = document.getElementById("paginaRisultati");
let quiz = document.getElementById("paginaQuiz");
let timer = document.getElementById("timer");

// TIMER
function startTimer() {
  let counter = document.getElementById("counter").getContext("2d");
  let pointToFill = 4.72;
  let cw = counter.canvas.width;
  let ch = counter.canvas.height;
  let diff;

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
      counter.fillStyle = "transparent";
      counter.fillRect(0, 0, cw, ch);
  
      // Verifica se l'utente ha risposto, altrimenti considera la risposta errata
      if (document.querySelector('input[name="answer"]:checked')) {
        submitAnswer();
      } else {
        sbagliate++;
        currentQuestionIndex++;
        showNextQuestionOrResult();
      }
    }
    no--;
  }

  fill = setInterval(fillCounter, 1000);
}

function resetTimer() {
  clearInterval(fill);
  no = 60; // Reimposta il timer a 60 secondi
  startTimer();
}

function showNextQuestionOrResult() {
  if (currentQuestionIndex < questions.length) {
    showCurrentQuestion();
    resetTimer();
  } else {
    updateChart();
    showResultsPercentage();
    quiz.style.display = "none";
    timer.style.display = "none";
    risultati.style.display = "inline";
  }
}

function showCurrentQuestion() {
  const quizContainer = document.getElementById("quizContainer");
  const currentQuestion = questions[currentQuestionIndex];
  contatore.innerText = `Domanda ${currentQuestionIndex + 1}/${questions.length}`;
  quizContainer.innerHTML = `
    <h2 class="centrato">${currentQuestion.question}</h2>
    <div class="centrato">${generateAnswerOptions(currentQuestion)}</div>`;

  // Rimuovi l'evento di ascolto precedentemente assegnato al pulsante "Next"
  document.getElementById("next").removeEventListener("click", submitAnswer);

  // Assegna l'evento di ascolto al pulsante "Next" dopo aver generato la domanda
  document.getElementById("next").addEventListener("click", submitAnswer);
}

function generateAnswerOptions(question) {
  return question.incorrect_answers
    .concat(question.correct_answer)
    .sort(() => Math.random() - 0.5)
    .map(
      (answer) => `<div class="inline">
      <input type="radio" name="answer" value="${answer}" id="${answer.replace(
        / /g,
        ""
      )}" class="radiobtn">
      <label for="${answer.replace(/ /g, "")}">${answer}</label></div>`
    )
    .join("");
}

function submitAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  // Verifica se il timer è scaduto e l'utente non ha risposto
  if (no <= 0 && !selectedAnswer) {
    sbagliate++;
  } else if (!selectedAnswer) {
    // L'utente non ha risposto entro il tempo
    sbagliate++;
  } else if (selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
    // Risposta corretta
    corrette++;
  } else {
    // Risposta selezionata ma sbagliata
    sbagliate++;
  }

  currentQuestionIndex++;

  // Sposta la chiamata qui per evitare problemi con il timer
  showNextQuestionOrResult();

  console.log("Corrette:", corrette);
  console.log("Sbagliate:", sbagliate);
  console.log("Current Question Index:", currentQuestionIndex);
}
// Avvia il timer e mostra la prima domanda
startTimer();
showCurrentQuestion();

// Dati del grafico
let dati = {
  datasets: [
    {
      data: [], // I tuoi dati qui
      backgroundColor: ["#00ffff", "#c2128d"],
    },
  ],
};

// Opzioni del grafico
let opzioni = {
  responsive: true,
  maintainAspectRatio: false,
  display: true,
};

// Ottieni il riferimento al canvas
let ctx = document.getElementById("doughnutChart").getContext("2d");

// Crea il grafico a forma di anello
let doughnutChart = new Chart(ctx, {
  type: "doughnut",
  data: dati,
  options: opzioni,
});

function updateChart() {
  dati.datasets[0].data.push(corrette);
  dati.datasets[0].data.push(sbagliate);

  // Calcola la percentuale di risposte corrette
  const totalQuestions = questions.length;
  const percentageCorrect = (corrette / totalQuestions) * 100;

  // Aggiorna il testo da mostrare in base alla percentuale
  const textToShow = percentageCorrect > 59
    ? "Congratulations! You passed the exam. We'll send you the certificate in few minutes. Check your email (including promotion/spam folder)"
    : "Failed: Don't give up!";

  // Aggiorna il testo nella legenda
  const chartLegend = document.getElementById("chartLegend");
  chartLegend.innerText = textToShow;

  // Aggiorna il grafico
  doughnutChart.update();
}


// Nuova funzione per mostrare le percentuali di risposte corrette e sbagliate
function showResultsPercentage() {
  const totalQuestions = questions.length;
  const percentageCorrect = (corrette / totalQuestions) * 100;
  const percentageWrong = (sbagliate / totalQuestions) * 100;

  document.getElementById("giuste").textContent = `Correct: ${corrette} (${percentageCorrect.toFixed(2)}%)`;
  document.getElementById("errate").textContent = `Wrong: ${sbagliate} (${percentageWrong.toFixed(2)}%)`;
}