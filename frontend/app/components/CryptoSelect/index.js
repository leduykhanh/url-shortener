/**
*
* CryptoSelect
*
*/

import React from 'react';
// import styled from 'styled-components';


class CryptoSelect extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <div className="form-group row">
          <label for="inputPassword" className="col-sm-2 col-form-label">{this.props.label}</label>
          <div className="input-group col-sm-10">
            <input
            onChange={this.props.onChange}
            type="number" className="form-control" id="validationDefaultUsername" placeholder="1" aria-describedby="inputGroupPrepend2" required />
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">{this.props.currency}</span>
            </div>
          </div>
        </div>
    );
  }
}

CryptoSelect.propTypes = {

};

export default CryptoSelect;
