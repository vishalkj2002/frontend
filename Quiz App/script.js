const questions = [
    {
        question: "Which car brand manufactures the Mustang?",
        answers: [
            { text: "Chevrolet", correct: false },
            { text: "Ford", correct: true },
            { text: "Dodge", correct: false },
            { text: "BMW", correct: false }
        ]
    },
    {
        question: "The Dodge Challenger is best known as a type of what kind of car?",
        answers: [
            { text: "Sports car", correct: false },
            { text: "Muscle car", correct: true },
            { text: "SUV", correct: false },
            { text: "Sedan", correct: false }
        ]
    },
    {
        question: "Which car brand is associated with the 911 model?",
        answers: [
            { text: "Lamborghini", correct: false },
            { text: "Porsche", correct: true },
            { text: "Ferrari", correct: false },
            { text: "Audi", correct: false }
        ]
    },
    {
        question: "In what decade was the Ford Mustang first introduced?",
        answers: [
            { text: "1950s", correct: false },
            { text: "1960s", correct: true },
            { text: "1970s", correct: false },
            { text: "1980s", correct: false }
        ]
    },
    {
        question: "The Dodge Challenger is often compared with which other iconic muscle car?",
        answers: [
            { text: "Chevrolet Camaro", correct: false },
            { text: "Ford Mustang", correct: false },
            { text: "Pontiac Firebird", correct: false },
            { text: "All of the above", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
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
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();