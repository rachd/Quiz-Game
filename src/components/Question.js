import React, { Component } from "react";
import Answer from "./Answer";

class Question extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allAnswers: this.combineQuestions(this.props.correctAnswer, this.props.incorrectAnswers)
		}
		this.onSubmit = this.onSubmit.bind(this);
		this.combineQuestions = this.combineQuestions.bind(this);
		this.shuffleQuestions = this.shuffleQuestions.bind(this);
	}

	componentWillReceiveProps(newProps) {
		this.setState({
			allAnswers: this.combineQuestions(newProps.correctAnswer, newProps.incorrectAnswers)
		});
	}

	combineQuestions(correct, incorrects) {
		const correctAnswer = {text: correct, correct: true};
		const incorrectAnswers = incorrects.map(answer => ({text: answer, correct: false}));
		return  this.shuffleQuestions([correctAnswer, ...incorrectAnswers]);
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

	onSubmit(correct) {
		this.props.submit(correct);
	}

	render() {
		return(
			<div>
				<div className="question">
					<p>{this.props.category}</p>
					<h3>{this.props.question}</h3>
					{this.state.allAnswers.map((answer, index) => <Answer submit={this.onSubmit} 
							key={index} answer={answer}/>)}
				</div>
			</div>
		);
	}
}

export default Question;