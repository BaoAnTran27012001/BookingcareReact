import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import medicalFacility from '../../../assets/medical-facility/benh-vien-thu-cuc.jpg';
import './MedicalFacility.scss';
import Slider from 'react-slick';
import { getAllClinics } from '../../../services/userService';
import { withRouter } from 'react-router'
class MedicalFacility extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataClinics: []
    }
  }
  async componentDidMount() {
    let res = await getAllClinics();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : []
      })
    }
  }
  handleViewDetailClinic = (clinic) => {
    if(this.props.history){
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  }
  render() {
    let { dataClinics } = this.state
    return (
      <div className='section-share section-medical-facility'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'>Cơ sở y tế nổi bật</span>
            <button className='btn-section'><FormattedMessage id={'homepage.more-info'} /></button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {dataClinics.length > 0 && dataClinics.map((item, index) => {
                return <div className='img-custom' key={index} onClick={() => this.handleViewDetailClinic(item)}>
                  <img src={item.image} alt='section' />
                  <div className='clinic-name'>{item.name}</div>
                </div>
              })}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
