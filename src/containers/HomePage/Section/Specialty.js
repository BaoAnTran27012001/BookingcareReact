import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import './Specialty.scss';

import specialty from '../../../assets/specialty/co-xuong-khop.jpg';
class Specialty extends Component {
  render() {
    return (
      <div className='section-share section-specialty'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'>Chuyên khoa phổ biến</span>
            <button className='btn-section'>Xem thêm</button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
                <div>Cơ xương khớp 1</div>
              </div>
              <div className='img-custom'>
                <img src={specialty} alt='section' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
