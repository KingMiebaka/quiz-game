const quizData = [
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Tiger", "Lion", "Elephant", "Gorilla"],
        answer: "Lion"
    },
    {
        question: "Which animal is known as the 'ship of the desert'?",
        options: ["Elephant", "Kangaroo", "Zebra", "Camel"],
        answer: "Camel"
    },
    {
        question: "Which country is the largest by area?",
        options: ["Russia", "Canada", "China", "United States"],
        answer: "Russia"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount McKinley (Denali)"],
        answer: "Mount Everest"
    },
    {
        question: "Which continent is the largest by land area?",
        options: ["Asia", "Africa", "North America", "South America"],
        answer: "Asia"
    }
];

const questionContainer = document.querySelector('#question');
const optionContainer = document.querySelector('#options');
const nextBtn = document.querySelector('#next-btn');
const resetBtn = document.querySelector('#reset-btn');
const resultContainer = document.querySelector('#result');
const timerElement = document.querySelector('#timer');

let currentQuestionIndex = 0;
let score = 0;
let optionClicked = false;
let timer; // Variable to hold the timer

// Function to display question
function displayQuestion() {
    const question = quizData[currentQuestionIndex].question;
    questionContainer.textContent = `Question ${currentQuestionIndex + 1}: ${question}`;
}

// Function to display options
function displayOptions() {
    const options = quizData[currentQuestionIndex].options;
    optionContainer.innerHTML = '';
    const ol = document.createElement('ol');

    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.classList.add('option');
        li.addEventListener('click', () => handleOptionClick(option));
        ol.appendChild(li);
    });

    optionContainer.appendChild(ol);
}

// Function to handle option click
function handleOptionClick(option) {
    if (!optionClicked) {
        const correctAnswer = quizData[currentQuestionIndex].answer;
        const selectedOption = event.target;
        if (option === correctAnswer) {
            selectedOption.style.backgroundColor = 'green';
            score++;
        } else {
            selectedOption.style.backgroundColor = 'red';
        }
        optionClicked = true;
    }
}

// Function to move to the next question
function moveToNextQuestion() {
    stopTimer(); // Stop the timer
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
        displayOptions();
        updateProgressBar(); // Update progress bar
        startTimer(); // Start timer for the next question
    } else {
        // End of questions
        displayResult();
        timerElement.style.display = 'none';
        document.getElementById('question-header').style.display = 'none';
        document.querySelector('.progressbar-container').style.display = 'none';
        document.getElementById('result').style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressbar');
    const progress = (currentQuestionIndex + 1) * (100 / quizData.length);
    progressBar.style.width = `${progress}%`;
    document.querySelector('.progressbar-container').style.display = 'block';
}

// Function to start the timer
function startTimer() {
    let timeLeft = 10; // Initial time left
    timer = setInterval(() => {
        timerElement.textContent = `Time Left: ${timeLeft}s`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to display result
function displayResult() {
    questionContainer.textContent = `Final Score: ${score} out of ${quizData.length}`;
    optionContainer.innerHTML = '';
    resultContainer.textContent = `Your Score: ${score} out of ${quizData.length}`;
}

// Event listener for the "Next" button
nextBtn.addEventListener('click', () => {
    if (optionClicked) {
        moveToNextQuestion(); // Move to the next question when Next button is clicked
        optionClicked = false; // Reset optionClicked flag
    }
});

// Event listener for the "Reset Quiz" button
resetBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    optionClicked = false;
    displayQuestion();
    displayOptions();
    resultContainer.textContent = '';
    timerElement.style.display = '';
    document.getElementById('question-header').style.display = '';
    document.querySelector('.progressbar-container').style.display = '';
    document.getElementById('result').style.display = '';
    resetTimer(); // Reset the timer when the quiz is reset
    nextBtn.style.display = ''; // Show the "Next Question" button again
});

// Function to reset the timer
function resetTimer() {
    clearInterval(timer); // Clear any existing timer
    timerElement.textContent = ''; // Clear timer display
    startTimer(); // Start the timer again
}

// Display the first question, options, and start the timer
displayQuestion();
displayOptions();
startTimer(); // Start timer for the first question
