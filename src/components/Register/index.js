import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  async handleSubmit(e) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const passwordConfirmation = this.refs.password_confirmation.value;
    axios.post('http://localhost:3000/users', {
    "user": {
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    }
    })
    .then(function (response) {
      
      if (response.status === 200 && response.data.id) {
        window.localStorage.setItem('userId', response.data.id);
      this.props.history.push("/question");
    }else{
      this.setState({
        error: response.data
      });
    }
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12"></div>
            <div className="col-md-6 col-lg-6 col-sm-6 col-xs-12 login_registration_box">
              <h1 className="text-center">Sign Up</h1>
              {this.state.error ? <div className="alert alert-danger" role="alert">
                  <strong>{this.state.error}</strong>
                </div> : '' }
              <label>
                <b>Email</b>
              </label>
              <input
                type="text"
                ref="email"
                placeholder="Enter Email"
                name="email"
                required
              />

              <label>
                <b>Password</b>
              </label>
              <input
                type="password"
                ref="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <label>
                <b>Confirm Password</b>
              </label>
              <input
                type="password"
                ref="password_confirmation"
                placeholder="Confirm your password"
                name="password_confirmation"
                required
              />
              <button
                type="submit"
                onClick={this.handleSubmit}
                className="registerbtn mt-4"
              >
                Submit
              </button>
              <h4>
                Already have an account?{" "}
                <Link className="text-info" to="/">
                  Sign in
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
