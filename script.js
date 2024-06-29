const questions= [
    {
        question: "Which is largest animal in the world?",
        answers:[
            {text: "Shark", correct:false},
            {text: "Blue Whale", correct:true},
            {text: "Elephant", correct:false},
            {text: "Giraffe", correct:false},
        ]
    },
    {
        question: "Which is the smallest city in the world?",
        answers:[
            {text: "Vatican City", correct:true},
            {text: "Bhutan", correct:false},
            {text: "Nepal", correct:false},
            {text: "Shri Lanka", correct:false},
        ]
    },
    {
        questions: "Which is the largest Desert in the world",
        answers:[
            {text: "Kalahari", correct:false},
            {text: "Gobi", correct:false},
            {text: "Sahara", correct:true},
            {text: "Antarctica", correct:false},
        ]
    },
    {
        questions: "Which is the smallest continent in the world?",
        answers:[
            {text: "Asia", correct:false},
            {text: "Australia", correct:true},
            {text: "Arctic", correct:false},
            {text: "Africa", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

 function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
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
   Array.from(answerBtn.children).forEach(button=>{
    if(button.dataset.correct==="true"){
        button.classList.add("correct");
    }
    button.disabled= true;
   });
   nextBtn.style.display= "block";
 }
 function showScore(){
    resetState();
    questionElement.innerHTML= 'You score ${score} out of ${questions.lenght}!';
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
 }

 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.lenght){
        showQuestion();
    }else{
        showScore();
    }
 }

 nextBtn.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.lenght){
        handleNextButton();
    }else{
        startQuiz();
    }
 });

startQuiz();