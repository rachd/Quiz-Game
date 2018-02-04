import React, { Component } from "react";
import axios from 'axios';
import Question from "../components/Question";
import {Score} from "../components/Score";
import {parse} from "../utilities/helpers";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionList: [],
			question: 0,
			numCorrect: 0,
			finished: false
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		axios.get("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then(res => {
			this.setState({questionList: res.data.results});
		});
	}

	onSubmit(correct) {
		if(correct) {
			this.setState(prevState => {
				return {numCorrect: prevState.numCorrect + 1}
			});
		}
		if(this.state.question < 9) {
			this.setState(prevState => {
				return {question: prevState.question + 1}
			});
		} else {
			this.setState({
				finished: true
			});
		}
	}

	render() {
		if (this.state.questionList.length === 0) {
			return (<div>Questions Are Loading</div>);
		}
		if(this.state.finished) {
			return(
				<div>
					<h2>Game Over!</h2>
					<Score score={this.state.numCorrect}/>
				</div>
			);
		}
		const currentQuestion = this.state.questionList[this.state.question];
		return (
			<div className="game">
				<Score score={this.state.numCorrect}/>
				<Question category={currentQuestion.category}
					question={parse(currentQuestion.question)} 
					correctAnswer={parse(currentQuestion.correct_answer)}
					incorrectAnswers={currentQuestion.incorrect_answers.map(answer => parse(answer))}
					submit={this.onSubmit}/>
			</div>
		);
	}
}

export default Game;