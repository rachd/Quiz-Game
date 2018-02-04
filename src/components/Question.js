import React, { Component } from "react";
import Answer from "./Answer";

class Question extends Component {
	constructor(props) {
		super(props);
		const correctAnswer = {text: this.props.correctAnswer, correct: true};
		const incorrectAnswers = this.props.incorrectAnswers.map(answer => ({text: answer, correct: false}));
		this.state = {
			allAnswers: this.shuffleQuestions([correctAnswer, ...incorrectAnswers])
		}
	}

	shuffleQuestions(array) {
	  let randomIndex, temporaryValue;
	  let currentIndex = array.length;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	render() {
		return(
			<div className="question">
				<p>{this.props.category}</p>
				<h3>{this.props.question}</h3>
				{this.state.allAnswers.map((answer, index) => <Answer key={index} answer={answer}/>)}
			</div>
		);
	}
}

export default Question;