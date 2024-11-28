const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest bird in the world?",
        answers: [
            { text: "Emu", correct: false },
            { text: "Chicken", correct: false },
            { text: "Ostrich", correct: true },
            { text: "Parrot", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    }
];


let currentQuestionIndex = 0;
let score = 0;


const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-btn");


document.getElementById("start-btn").addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    
    if (name && email) {
        startQuiz();
    } else {
        alert("Please enter both name and email.");
    }
});


function startQuiz() {
    startSection.style.display = "none"; 
    quizSection.style.display = "block"; 
    resultSection.style.display = "none"; 
    showQuestion(); 
}


function showQuestion() {
    resetState(); 

   
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer); 
    });
}


function resetState() {
    nextButton.style.display = "none"; 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); 
    }
}


function selectAnswer(e) {
    const selectedButton = e.target; 
    const correct = questions[currentQuestionIndex].answers.find(a => a.text === selectedButton.innerText).correct;

   
    if (correct) {
        selectedButton.classList.add("correct");
        score++; 
    } else {
        selectedButton.classList.add("incorrect");
    }

    
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (questions[currentQuestionIndex].answers.find(a => a.text === button.innerText).correct) {
            button.classList.add("correct");
        }
    });

    
    nextButton.style.display = "block";
}


nextButton.addEventListener("click", function () {
    currentQuestionIndex++; 

    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult(); 
    }
});


function showResult() {
    quizSection.style.display = "none"; 
    resultSection.style.display = "block"; 
    resultText.innerHTML = `You scored ${score} out of ${questions.length}!`; 
}


restartButton.addEventListener("click", function () {

    currentQuestionIndex = 0;
    score = 0;
    resultSection.style.display = "none"; 
    startSection.style.display = "block"; 
    document.getElementById("name").value = ""; 
    document.getElementById("email").value = ""; 
});
