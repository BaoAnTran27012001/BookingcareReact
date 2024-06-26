import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import handbook from '../../../assets/handbook/handbook.jpg';
class HandBook extends Component {
  render() {
    return (
      <div className='section-share section-handbook'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'>Cẩm nang</span>
            <button className='btn-section'><FormattedMessage id={'homepage.more-info'} /></button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={handbook} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
