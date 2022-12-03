import React, { useEffect } from 'react';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';
import { connect } from 'react-redux';

let loading = false;

function Quiz(props) {

  useEffect(() => {
    loading = true;
    props.fetchQuiz();
    loading = false;
  }, [])

  const onAnswer = (evt) => {
    props.selectAnswer(evt.target.id);
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    loading = true;
    props.postAnswer(props.quiz.quiz_id, props.selectedAnswer);
    loading = false;
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        loading === false ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.quiz.answers && props.quiz.answers[0].answer_id === props.selectedAnswer ? 'answer selected' : 'answer'}>
                {props.quiz.answers && props.quiz.answers[0].text}
                <button id={props.quiz.answers && props.quiz.answers[0].answer_id} onClick={onAnswer}>
                  {props.quiz.answers && props.quiz.answers[0].answer_id === props.selectedAnswer ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={props.quiz.answers && props.quiz.answers[1].answer_id === props.selectedAnswer ? 'answer selected' : 'answer'}>
                {props.quiz.answers && props.quiz.answers[1].text}
                <button id={props.quiz.answers && props.quiz.answers[1].answer_id} onClick={onAnswer}>
                {props.quiz.answers && props.quiz.answers[1].answer_id === props.selectedAnswer ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button onClick={onSubmit} id="submitAnswerBtn" disabled={!props.selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log('state', state)
  return{
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
    
  }
}

export default connect(mapStateToProps, {fetchQuiz, selectAnswer, postAnswer})(Quiz);
