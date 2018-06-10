/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import {loginAction} from './actions';
import './scss/style.scss';


export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    username: "leejangkoo.com",
    password: "4621bbdd28bde311",
  };
  login(){
    this.props.dispatch(loginAction(this.state.username, this.state.password));
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-6 offset-sm-6">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input onChange={(text) => this.setState({username:text})} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <button onClick={this.login.bind(this)} type="submit" className="btn btn-primary">Login</button>
        </div>
    </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withRouter(Login));
