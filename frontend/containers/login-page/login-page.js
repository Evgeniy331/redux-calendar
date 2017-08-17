import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/app-actions";
import "./login-page.css";
import sweetalert from "sweetalert";
import "../../common/styles/sweetalert.css";

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.authorization = this.authorization.bind(this)
    }

    componentDidUpdate() {
        
        const {wrongPasswordEntered} = this.props.stateFromReducer;

        if (wrongPasswordEntered) {

            sweetalert({
                 title: "Error!",
                 title: "You have entered an incorrect password",
                 type: "error"
            });

            this.props.wrongPasswordMessageWasDispalyed();
        }

    }

    render() {

        return (   
            <div id="login-page"> 
              <form id="sign-in-form">
                <header>
                  Login
                </header>
                <label htmlFor="sign-in-username">Username</label>
                <input pattern=".{5,}" title="5 characters minimum" type="text" id="sign-in-username" name="sign-in-username" required />
                <label htmlFor="sign-in-password">Password</label>
                <input pattern=".{8,}" title="8 characters minimum" type="password" id="sign-in-password" name="sign-in-password" required />
                <button className="green" onClick={this.authorization}>Login</button>
              </form>
            </div>
        );
    }

    authorization(event) {

      let form = document.querySelector("#sign-in-form");
      
      if (!form.checkValidity())
        return;
      
      event.preventDefault();

      let username = document.querySelector("#sign-in-username").value;
      let password = document.querySelector("#sign-in-password").value;

      let isFound = false;

      const {users} = this.props.stateFromReducer;

      for (let i = 0; i < users.length; i++)
          if (users[i].username === username)
              isFound = true;

      if (!isFound) {
          sweetalert({
               title: "Error!",
               title: "The user " + username + " is not registered",
               type: "error"
          });
          return;
      }

      this.props.login({username: username, password: password});

      if (!this.props.stateFromReducer.logged) {
          return;
      }
      
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
    return {
        stateFromReducer: state
    };
}
const LoginPageConected = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginPageConected