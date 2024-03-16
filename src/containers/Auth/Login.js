import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMessage: '',
      isShowed: false,
    };
  }
  handleOnChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async () => {
    this.setState({ errMessage: '' });
    try {
      const data = await handleLoginAPI(this.state.username, this.state.password);
      console.log(data);
      if(data && data.errCode){
        this.setState({
          errMessage:data.message,
        });
      }
      if(data && data.errCode === 0){
        this.props.userLoginSuccess(data.user)
        console.log('login successfully !');
      }
    } catch (error) {
      if(error.response){
        if(error.response.data){
          this.setState({ errMessage: error.response.data.message });
        }
      }
    }
  };
  handleHideShowPassword = () => {
    this.setState({ isShowed: !this.state.isShowed });
  };
  render() {
    return (
      <div className='login-background'>
        <div className='login-container'>
          <div className='login-content row'>
            <div className='col-12 text-center text-login'>Login</div>
            <div className='col-12 form-group login-input'>
              <label>Username:</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your username'
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUserName(event)}
              />
            </div>
            <div className='col-12 form-group login-input'>
              <label>Password:</label>
              <div className='custom-input-password'>
                <input
                  className='form-control'
                  type={this.state.isShowed ? 'text' : 'password'}
                  placeholder='Enter you password'
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                />
                {this.state.isShowed === false ? (
                  <i
                    className='far fa-eye'
                    onClick={this.handleHideShowPassword}
                  ></i>
                ) : (
                  <i
                    className='fas fa-eye-slash'
                    onClick={this.handleHideShowPassword}
                  ></i>
                )}
              </div>
            </div>
            <div className='col-12'>
              <button className='btn-login' onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className='col-12 text-danger'>{this.state.errMessage}</div>
            <div className='col-12'>
              <span className='forgot-passsword'>Forgot your password?</span>
            </div>
            <div className='col-12 text-center'>
              <span className='text-other-login'>Or Login with:</span>
            </div>
            <div className='col-12 social-login'>
              <i className='fab fa-google-plus-g google'></i>
              <i className='fab fa-facebook-f facebook'></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //  userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess:(userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
