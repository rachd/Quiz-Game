import React, { Component } from "react";
import axios from 'axios';
import Question from "../components/Question";
import {parse} from "../utilities/helpers";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionList: [],
			question: 0
		};
	}

	componentDidMount() {
		axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then(res => {
			this.setState({questionList: res.data.results});
		});
	}

	render() {
		if (this.state.questionList.length === 0) {
			return (<div>Questions Are Loading</div>);
		}
		const currentQuestion = this.state.questionList[this.state.question];
		return (
			<div className="game">
				<Question category={currentQuestion.category}
					question={parse(currentQuestion.question)} 
					correctAnswer={parse(currentQuestion.correct_answer)}
					incorrectAnswers={currentQuestion.incorrect_answers.map(answer => parse(answer))}/>
			</div>
		);
	}
}

export default Game;