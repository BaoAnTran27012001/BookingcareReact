import React, { Component } from 'react';

import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import './Specialty.scss';
import {withRouter} from 'react-router'
import { getAllSpecialtiesService } from '../../../services/userService';
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialties: []
    }
  }
  async componentDidMount() {
    let res = await getAllSpecialtiesService();
    console.log('check specialties ', res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialties: res.data ? res.data : []
      })
    }
  }
  handleViewDetailSpecialty = (item)=>{
    if(this.props.history){
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  }
  render() {
    let { dataSpecialties } = this.state;
    return (
      <div className='section-share section-specialty'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'><FormattedMessage id={'homepage.specialty-popular'} /></span>
            <button className='btn-section'><FormattedMessage id={'homepage.more-info'} /></button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {dataSpecialties && dataSpecialties.length > 0 && dataSpecialties.map((item) => {
                return (<div className='img-custom'  onClick={() => this.handleViewDetailSpecialty(item)}>
                  <img src={item.image} alt='section' />
                  <div className='specialty-name'>{item.name}</div>
                </div>);
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
