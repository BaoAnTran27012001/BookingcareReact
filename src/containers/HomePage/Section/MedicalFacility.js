import React, { Component } from 'react';
import { connect } from 'react-redux';
import medicalFacility from '../../../assets/medical-facility/benh-vien-thu-cuc.jpg';
import './MedicalFacility.scss';
import Slider from 'react-slick';
class MedicalFacility extends Component {
  render() {
    return (
      <div className='section-share section-medical-facility'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'>Cơ sở y tế nổi bật</span>
            <button className='btn-section'>Xem thêm</button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 1</div>
              </div>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 2</div>
              </div>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 3</div>
              </div>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 4</div>
              </div>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 5</div>
              </div>
              <div className='img-custom'>
                <img src={medicalFacility} alt='section' />
                <div>Hệ thống Y tế Thu Cúc 6</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);