/* PROGETTO
- timer: deve partire a 60 secondi (60000  ms), resettarsi ad ogni cambio domanda automaticamente, fa partire domanda successiva allo scadere, si resetta ad ogni cambio domanda (click bottone), deve comunicare con il grafico (libreria esterna?), comunicare con il counter
- domande: creare div con domande, radio button (appendChild, numero risposte contenute nell'array), cambio domande al click del bottone o allo scadere del tempo, cambio colori per risposta selezionata, comunicare con il localstorage? -> prossima pagina/stessa pagina, database
 array stessi indici, risposte random
    questions()= prende le domande, le mette nell'h2, cicla for con answers(), display domande, mette risposte nei radio button
    // answers() = cicla le risposte, prende quella giusta, scarta le sbagliate
    save()= salva nella variabile per counter e percentuali, local storage?
    contatore()= progredire il numero di domande
    bottone() = attivare bottone, ripulire pagina per domanda successiva, al decimo reset cambiare pagina in risultati
- counter: comunicare con bottone e timer
- bottone: resettare pagina, comunicare con il counter, ultimo reset -> risultati (for con indice)
*/


// timer

let counter = document.getElementById('counter').getContext('2d');
let no = 10;
let pointToFill = 4.72;
let cw = counter.canvas.width;
let ch = counter.canvas.height;
let diff;

function fillCounter() {
    diff = ((no / 10) * Math.PI * 2 * 10);
    counter.clearRect(0, 0, cw, ch);
    counter.lineWidth = 15;
    counter.fillStyle = '#FFF';
    counter.strokeStyle = '#00FFFF';
    counter.textAlign = 'center';
    counter.font = "25px monospace";
    counter.color= '#FFF';
    counter.fillText(no, 100, 110);
    counter.beginPath();
    counter.arc(100, 100, 60, pointToFill, diff / 60 + pointToFill);
    counter.stroke();

    if (no == 0) {
        clearInterval(fill);
        counter.fillStyle = 'transparent';
        counter.fillRect(0, 0, cw, ch);
        if (currentQuestionIndex < questions.length) {
            currentQuestionIndex++;
            showCurrentQuestion();
            clearInterval()
                       
        }else{
            //...pagina risultati
        };

    }
    no--;
}

let fill = setInterval(fillCounter, 1000);

// end timer

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

  // div domande

  let container = document.getElementById('container');
  let domande = document.querySelector('.domande h2');
  let risposte = document.querySelector('#risposte');
  let next = document.getElementById('next');
  let contatore = document.getElementById('contatore');

//   function eventHandler(){
//         question(questions.incorrect_answers);
//         // save();
//         // contatore();
//         // bottone();
//   }

//   eventHandler()



let currentQuestionIndex = 0;

        window.onload = function () {
            showCurrentQuestion();
        };

        function showCurrentQuestion() {
            const quizContainer = document.getElementById('quizContainer');
            const currentQuestion = questions[currentQuestionIndex];
            contatore.innerText = `Domanda ${currentQuestionIndex + 1}/${questions.length}`
            quizContainer.innerHTML = `
                <h2 class="centrato">${currentQuestion.question}</h2>
                <div class="centrato">${generateAnswerOptions(currentQuestion)}</div>`
            ;
        }

        function generateAnswerOptions(question) {
            return question.incorrect_answers.concat(question.correct_answer)
                .sort(() => Math.random() - 0.5) // Mischia le risposte
                .map(answer => `<div  class="inline">
                    <input type="radio" name="answer" value="${answer}" id="${answer.replace(/ /g, '')} class="radiobtn">
                    <label for="${answer.replace(/ /g, '')}">${answer}</label></div>`
                ).join('');
        };

        function submitAnswer() {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            let corrette = 0
            let sbagliate = 0
            if (selectedAnswer) {
                const currentQuestion = questions[currentQuestionIndex];
                if (selectedAnswer.value === currentQuestion.correct_answer) {
                    corrette += 1
                   
                    showCurrentQuestion()
                } else if(no == 0){
                    if(selectedAnswer.value === currentQuestion.correct_answer){
                        corrette += 1;
                    }

                   showCurrentQuestion()
                }else{
                    sbagliate += 1
                    showCurrentQuestion()
                }

                currentQuestionIndex++;

                if (currentQuestionIndex < questions.length) {
                    showCurrentQuestion();
                } else {
                    alert("Quiz completato!");
                    resetQuiz();
                }
            } else {
                alert("Seleziona una risposta prima di procedere.");
            }
        }

        function resetQuiz() {
            currentQuestionIndex = 0;
            showCurrentQuestion();
        }