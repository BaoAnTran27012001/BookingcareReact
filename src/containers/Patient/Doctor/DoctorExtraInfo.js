import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfo.scss';
import { changeLanguageApp } from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { getExtraDoctorInfoById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraData: {}
    };
  }
  async componentDidMount() {
    let res = await getExtraDoctorInfoById(this.props.detailDoctorId);
    if (res && res.errCode === 0) {
      this.setState({
        extraData: res.data,
      });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
      let res = await getExtraDoctorInfoById(this.props.detailDoctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraData: res.data,
        });
      }

    }
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }
  render() {
    let { language } = this.props;
    let { isShowDetailInfo, extraData } = this.state;
    console.log('check extra data: ', extraData);
    return (
      <React.Fragment>
        <div className='doctor-extra-info-container'>
          <div className='content-up'>
            <div className='text-address'><FormattedMessage id={'patient.extra-info-doctor.text-address'} /></div>
            <div className='name-clinic'>{extraData && extraData.nameClinic ? extraData.nameClinic : ''}</div>
            <div className='detail-address'>{extraData && extraData.addressClinic ? extraData.addressClinic : ''}</div>
          </div>
          <div className='content-down'>

            {isShowDetailInfo === false && <div className='brief-info'>
              <FormattedMessage id={'patient.extra-info-doctor.price'} /> {extraData && extraData.priceTypeData && language === LANGUAGES.VI && <NumberFormat value={extraData.priceTypeData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' className='currentcy' />}
              {extraData && extraData.priceTypeData && language === LANGUAGES.EN && <NumberFormat value={extraData.priceTypeData.valueEn} displayType='text' thousandSeparator={true} suffix='USD' className='currentcy' />}
              <span onClick={() => this.showHideDetailInfo(true)}><FormattedMessage id={'patient.extra-info-doctor.more-info'} /></span>
            </div>}
            {isShowDetailInfo === true && <>
              <div className='title-price'><FormattedMessage id={'patient.extra-info-doctor.price'} /></div>

              <div className='detail-info'>
                <div className='price'>
                  <span className='left'><FormattedMessage id={'patient.extra-info-doctor.price'} /></span>
                  <span className='right'>{extraData && extraData.priceTypeData && language === LANGUAGES.VI && <NumberFormat value={extraData.priceTypeData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' className='currentcy' />}
                    {extraData && extraData.priceTypeData && language === LANGUAGES.EN && <NumberFormat value={extraData.priceTypeData.valueEn} displayType='text' thousandSeparator={true} suffix='USD' className='currentcy' />}</span>
                </div>
                <div className='note'>
                  {extraData && extraData.note ? extraData.note : ''}
                </div>
              </div>
              <div className='payment'><FormattedMessage id={'patient.extra-info-doctor.payment'} />{extraData && extraData.paymentTypeData && language === LANGUAGES.VI ? extraData.paymentTypeData.valueVi : extraData.paymentTypeData.valueEn}</div>
              <div className='hide-price'><span onClick={() => this.showHideDetailInfo(false)}><FormattedMessage id={'patient.extra-info-doctor.hide-price'} /></span></div>
            </>}

          </div>



        </div>
      </React.Fragment>
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
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
