import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    const { id, value} = evt.target;
    props.inputChange({id, value})
  }

  const onSubmit = evt => {
    evt.preventDefault();
    console.log(props)
    props.postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer);
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.form.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.form.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.form.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={!props.form.newQuestion.trim() || !props.form.newTrueAnswer.trim() || !props.form.newFalseAnswer.trim()}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)