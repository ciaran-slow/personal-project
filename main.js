// script.js
import { questions } from './questions.js'

const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
const scoreContainer = document.getElementById('score-container')
const scoreElement = document.getElementById('score')
const restartButton = document.getElementById('restart-btn')
const scoreDisplay = document.getElementById('score-display')

let currentQuestionIndex = 0
let score = 0

// Show a question
function showQuestion() {
  // Clear previous buttons
  answerButtons.innerHTML = ''

  const currentQuestion = questions[currentQuestionIndex]
  questionElement.textContent = currentQuestion.question

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button')
    button.textContent = answer.text
    button.classList.add('btn')
    button.dataset.correct = answer.correct
    button.addEventListener('click', selectAnswer)
    answerButtons.appendChild(button)
  })
}

// Handle answer click
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct === 'true'

  if (correct) {
    selectedButton.classList.add('correct')
    score++
  } else {
    selectedButton.classList.add('wrong')
  }

  // Update persistent score
  scoreDisplay.textContent = `Score: ${score}`

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true
    if (button.dataset.correct === 'true') {
      button.classList.add('correct')
    }
  })

  nextButton.classList.remove('hide')
}

// Next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  if (currentQuestionIndex < questions.length) {
    showQuestion()
    nextButton.classList.add('hide')
  } else {
    showScore()
  }
})

// Show final score
function showScore() {
  questionContainer.classList.add('hide')
  nextButton.classList.add('hide')
  scoreContainer.classList.remove('hide')
  scoreElement.textContent = score
}

// Restart quiz
restartButton.addEventListener('click', () => {
  currentQuestionIndex = 0
  score = 0
  scoreDisplay.textContent = `Score: ${score}`
  scoreContainer.classList.add('hide')
  questionContainer.classList.remove('hide')
  showQuestion()
  nextButton.classList.add('hide')
})

// Start quiz
showQuestion()
