import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:3000/user_activity/get_questions')
    .then(function (response) {
      console.log(response);
      if (response.status === 200) {
        this.setState({ data: response.data })
      //this.props.history.push("/question");
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  onlogout = () => {
  this.props.history.push(`/`);
  };


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#" onClick={this.onlogout}>Logout</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
         <h1>Question And Answer</h1>
        {this.state.data.length && this.state.data.map(question => {
          return (
            <ul>
             <li>{question.title}</li>
            </ul>
          )
        })}
      </div>
    );
  }
}

export default Question;
