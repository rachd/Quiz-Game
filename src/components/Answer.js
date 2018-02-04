import React, { Component} from "react";

class Answer extends Component {
	render() {
		return(<button>{this.props.answer.text}</button>)
	}
}

export default Answer;