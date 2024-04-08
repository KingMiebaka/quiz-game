// Variable Declarations
const quizData = [
    {
        question: "Which animal is known as the 'King of the Jungle'?", // Question 1
        options: ["Tiger", "Lion", "Elephant", "Gorilla"], // Options for Question 1
        answer: "Lion" // Correct answer for Question 1
    },
    {
        question: "Which animal is known as the 'ship of the desert'?", // Question 2
        options: ["Elephant", "Kangaroo", "Zebra", "Camel"], // Options for Question 2
        answer: "Camel" // Correct answer for Question 2
    },
    {
        question: "Which country is the largest by area?", // Question 3
        options: ["Russia", "Canada", "China", "United States"], // Options for Question 3
        answer: "Russia" // Correct answer for Question 3
    },
    {
        question: "What is the tallest mountain in the world?", // Question 4
        options: ["Mount Kilimanjaro", "Mount Everest", "Mount Fuji", "Mount McKinley (Denali)"], // Options for Question 4
        answer: "Mount Everest" // Correct answer for Question 4
    },
    {
        question: "Which continent is the largest by land area?", // Question 5
        options: ["Asia", "Africa", "North America", "South America"], // Options for Question 5
        answer: "Asia" // Correct answer for Question 5
    }
];

// DOM Elements
const questionContainer = document.querySelector('#question'); // Question container
const optionContainer = document.querySelector('#options'); // Options container
const nextBtn = document.querySelector('#next-btn'); // Next button
const resetBtn = document.querySelector('#reset-btn'); // Reset button
const resultContainer = document.querySelector('#result'); // Result container
const timerElement = document.querySelector('#timer'); // Timer element

// Variables
let currentQuestionIndex = 0; // Index of the current question
let score = 0; // User's score
let optionClicked = false; // Flag to track if an option has been clicked
let timer; // Variable to hold the timer

// Functions

// Function to display the current question
function displayQuestion() {
    const question = quizData[currentQuestionIndex].question;
    questionContainer.textContent = `Question ${currentQuestionIndex + 1}: ${question}`;
}

// Function to display options for the current question
function displayOptions() {
    const options = quizData[currentQuestionIndex].options;
    optionContainer.innerHTML = '';
    const ol = document.createElement('ol');

    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.classList.add('option');
        li.addEventListener('click', handleOptionClick);
        ol.appendChild(li);
    });

    optionContainer.appendChild(ol);
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
    timerElement.textContent = `Time Left: ${timeLeft}s`; // Display initial time
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft >= 0) {
            timerElement.textContent = `Time Left: ${timeLeft}s`;
        } else {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
}

// Function to display the final result
function displayResult() {
    questionContainer.textContent = `Final Score: ${score} out of ${quizData.length}`;
    optionContainer.innerHTML = '';
    resultContainer.textContent = `Your Score: ${score} out of ${quizData.length}`;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start the timer again
}

// Function to handle option click
function handleOptionClick(event) {
    if (!optionClicked) {
        const correctAnswer = quizData[currentQuestionIndex].answer;
        const selectedOption = event.target;
        if (selectedOption.textContent === correctAnswer) {
            selectedOption.style.backgroundColor = 'green';
            score++;
        } else {
            selectedOption.style.backgroundColor = 'red';
        }
        optionClicked = true;

        // Remove background color after a brief delay
        setTimeout(() => {
            // selectedOption.style.backgroundColor = '';
        }, 1000);
    }
}

// Function to move to the next question
function moveToNextQuestion() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.style.backgroundColor = '';
    });

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
        displayOptions();
        updateProgressBar(); // Update progress bar
        resetTimer(); // Reset the timer for the next question
        optionClicked = false; // Reset optionClicked flag
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

// Event Listeners

// Event listener for reset button
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

// Event listener for next button
nextBtn.addEventListener('click', () => {
    if (optionClicked) {
        moveToNextQuestion(); // Move to the next question when Next button is clicked
    }
});

// Initial Setup

displayQuestion();
displayOptions();
startTimer(); // Start timer for the first question