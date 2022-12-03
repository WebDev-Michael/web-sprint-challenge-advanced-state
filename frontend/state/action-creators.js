import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return({type: MOVE_CLOCKWISE});
 }

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE});
 }

export function selectAnswer(answer) {
  return({type: SET_SELECTED_ANSWER, payload: answer})
 }

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
 }

export function setQuiz(quiz) {
  return({type: SET_QUIZ_INTO_STATE, payload: quiz})
 }

export function inputChange({id, value}) {
  const payload = {id, value}
  return({type: INPUT_CHANGE, payload})
 }

export function resetForm() {
  return({type: RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next')
    .then((res) => {
      dispatch(setQuiz(res.data));
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
export function postAnswer(quiz_id, answer_id) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id, answer_id })
    .then(res => {
      console.log(res.data.message)
      dispatch(setMessage(res.data.message))
      dispatch(fetchQuiz())
    })
    .catch(err => {
      dispatch(setMessage(err.message))
    })
  }
}
export function postQuiz(newQuestion, newTrueAnswer, newFalseAnswer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', { 
      question_text: newQuestion, 
      true_answer_text: newTrueAnswer, 
      false_answer_text: newFalseAnswer})
    .then(res => {
      console.log(res)
      dispatch(setMessage(`Congrats: "${res.data.question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      dispatch(setMessage(err.message))
    })
  }
}