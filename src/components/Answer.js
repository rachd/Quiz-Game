import React, { Component} from "react";

class Answer extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.submit(this.props.answer.correct);
	}

	render() {
		return(<button onClick={this.onClick}>{this.props.answer.text}</button>)
	}
}

export default Answer;