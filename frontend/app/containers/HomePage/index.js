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
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { loadData, addData } from './actions';

import { createStructuredSelector } from 'reselect';
import makeSelectLogin from 'containers/Login/selectors';
import makeSelectData from './selectors';
import CryptoSelect from 'components/CryptoSelect';
import Dropdowns from 'components/Dropdowns';

 export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    bid: 1,
    unit: 1,
  }
  componentWillMount(){
    this.props.dispatch(loadData());
  }

  addData(){
    this.props.dispatch(addData(this.state));
  }

  render() {
    return (
      <div>
        { /*<h2>{this.props.login.username}</h2> */}
          <h1>Test</h1>
          <div className="row">
            <div className="border padding-10 col-sm-6 offset-sm-3">
              <CryptoSelect onChange={(e) => this.setState({unit:parseFloat(e.target.value)})} label="Units" currency="BTC" />
              <CryptoSelect onChange={(e) => this.setState({bid:parseFloat(e.target.value)})} label="Bid" currency="SGD" />
              <div className="form-group row">
                <label for="inputPassword" className="col-sm-2 col-form-label">Total</label>
                <div className="input-group col-sm-10">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroupPrepend2"><i className="fa fa-bitcoin"></i></span>
                </div>
                  <input
                  type="text" disabled className="form-control" value={this.state.bid * this.state.unit}/>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupPrepend2">SGD</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button type="button" className="btn btn-info" onClick={this.addData.bind(this)}>
                  + Buy Bitcoin
                </button>
              </div>
            </div>
          </div>
          <h2>Order Book</h2>
        <div className="row m-t-30">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">SUM</th>
                <th scope="col">TOTAL</th>
                <th scope="col">SIZE</th>
                <th scope="col">BID</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
            {this.props.data.data && this.props.data.data.map(item => {
              return (
                <tr>
                  <th scope="row">{item.sum}</th>
                  <td>{item.total}</td>
                  <td>{item.size}</td>
                  <td>{item.bid}</td>
                  <td><Dropdowns /></td>
                </tr>
              )
            })}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = createStructuredSelector({
  // login: makeSelectLogin(),
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
  withConnect, ) (HomePage);

// export default HomePage;
