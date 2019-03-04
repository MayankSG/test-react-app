import React from "react";
import axios from "axios";
const baseUrl = "http://localhost:5000";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      next: 0,
      answer: '',
      error: ''
    }
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios.get(baseUrl+'/user_activity/questions')
    .then(function (response) {
      if (response.status === 200) {
        this.setState({ data: response.data })
      }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  onlogout = () => {
  window.localStorage.removeItem('token');
  this.props.history.push(`/`);
  };

  nextQuestion(questionId) {
    const nextVal = this.state.next;
    const token = window.localStorage.getItem('token');
    const answer = this.state.answer;
    if (this.state.answer) {
      axios.post(baseUrl+'/user_activity/save_user_answers', {
      "user_answer": {
        question_id: questionId,
        answer: answer
      },
      token: token,
      })
      .then(function (response) {
        this.setState({
          error: ''
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      if(nextVal < 4) {
        this.setState({
          answer: '',
          next: this.state.next+1
        });
      }else{
        this.props.history.push(`/thankyou`);
      }
    }else{
      this.setState({
        error: 'please select any option.'
      });
    }
  }

  handleChange(e) {
    const optionValue = e.target.value;
    this.setState({
      answer: optionValue,
      error: optionValue ? '' : 'please select any option.'
    });
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="float-right text-right btn btn-danger" href="#" onClick={this.onlogout}>Logout</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
                  

        { this.state.data.length && this.state.data.map((question,index) => {
          if(index === this.state.next) {
            return (
              <form key={index}>
                <div className="container que">
                  {this.state.error ? <div className="alert alert-danger" role="alert">
                        <strong>{this.state.error}</strong>
                      </div> : '' }
                  <div className="form-group card shadow p-4 mt-5">
                    <label >{question.title}</label><br/>
                    { question.options.map((op,index) =>  
                      <div key={index} className="form-check d-inline-block pr-2">
                        <input className="form-check-input" type="radio" name="answer" value={op} onChange={(e) => this.handleChange(e)} />
                        <label className="form-check-label" >
                          {op}
                        </label>
                      </div>
                    )}
                  </div>
                  <button type="button" className="btn btn-success" onClick={(questionId) => this.nextQuestion(question.id)}>Next</button>
                </div>
              </form>
            )
          }
         }
        )}
      </div>
    );
  }
}

export default Question;
