const questions = [
    {
        question: "What does HTML stand for?",
        answer: [
            {text: "Hyper Tag Markup Language", correct: false},
            {text: "Hyper Text Markup Language", correct: true},
            {text: "Hyperlinks Text Mark Language", correct: false},
            {text: "Hyperlinking Text Marking Language", correct: false},
        ]
    },
    {
        question: "Where should a CSS file be referenced in a HTML file?",
        answer: [
            {text: "Before any HTML code", correct: false},
            {text: "After all HTML code", correct: false},
            {text: "Inside the head section", correct: true},
            {text: "Inside the body section", correct: false},
        ]
    },
    {
        question: "Which of these is a genuine tag keyword?",
        answer: [
            {text: "Header", correct: false},
            {text: "Bold", correct: false},
            {text: "Body", correct: true},
            {text: "Image", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answer: [
            {text: "Computing Style Sheet", correct: false},
            {text: "Creative Style System", correct: false},
            {text: "Cascading Style Sheet", correct: true},
            {text: "Creative Styling Sheet", correct: false},
        ]
    },
    {
        question: "A CSS file can be applied to only one HTML file.",
        answer: [
            {text: "True", correct: false},
            {text: "False", correct: true},
        ]
    },
    {
        question: "What is the correct format for a div?",
        answer: [
            {text: "Div-id=example", correct: false},
            {text: "Div id=example", correct: true},
            {text: "Div=example", correct: false},
            {text: "Div.example", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answer");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(ansBtn.firstChild){
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML =  'Your scored ${score} our of ${questions.length}!'; 
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handelNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handelNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
