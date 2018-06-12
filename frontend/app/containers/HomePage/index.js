/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { loadData, genrateUrl } from './actions';

import { createStructuredSelector } from 'reselect';
import makeSelectLogin from 'containers/Login/selectors';
import makeSelectData from './selectors';
import Dropdowns from 'components/Dropdowns';


 export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    url: "http://google.com",
    shortened: null,
  }
  componentWillMount(){

    if (cookie.load("token") === undefined) {
      this.props.history.push("login");
    }
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.props.dispatch(loadData({
            shortened: `http://localhost:3000/${id}`,
            token:cookie.load("token") }
      , this.redirect));
    }
  }

  redirect(data){
    window.location.assign(data.url);
  }

  genrateUrl(){
    let urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!urlR.test(this.state.url)) {
      return alert("Please enter correct url");
    }
    this.props.dispatch(genrateUrl(this.state, this.handleData.bind(this)));
  }

  handleData(data){
    this.setState({shortened: data.shortened});
  }

  render() {
    return (
      <div>
          <h1>URL shortener</h1>
          <div className="row">
            <div className="border padding-10 col-sm-6 offset-sm-3">
            <div className="form-group">
              <label>Key in Url</label>
              <input onChange={(e) => this.setState({url:e.target.value})}
                type="text" className="form-control" placeholder="http://google.com" />
            </div>
            <div>
            {
              this.state.shortened ?
              <div> Result : <a href={`${this.state.shortened}`}>{this.state.shortened}</a> </div> : ""

            }
            </div>
              <div className="text-right">
                <button type="button" className="btn btn-info" onClick={this.genrateUrl.bind(this)}>
                  Generate
                </button>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
  data: makeSelectData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect, ) (withRouter(HomePage));

// export default HomePage;
