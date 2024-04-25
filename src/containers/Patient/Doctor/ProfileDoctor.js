import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {}
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId)
    this.setState({
      dataProfile: data
    })
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {

    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
      return (
        <>
          <div style={{ textTransform: 'capitalize' }}>{time} - {date}</div>
          <div><FormattedMessage id={'patient.profile-doctor.fee-charge-text'} /></div>
        </>
      )
    }
    return <></>
  }
  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescription, dataTime, isShowLinkDetail, isShowPrice, doctorId } = this.props;
    let nameVi = '';
    let nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <React.Fragment>
        <div className='intro-doctor'>
          <div
            className='content-left'
            style={{ backgroundImage: `url(${dataProfile.image})` }}
          ></div>
          <div className='content-right'>
            <div className='up'>
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className='down'>
              {isShowDescription === true ?
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
                : <>
                  {this.renderTimeBooking(dataTime)}
                </>
              }

            </div>

          </div>

        </div>
        {isShowLinkDetail === true && <div className='view-detail-doctor'><Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link></div>}
        {isShowPrice === true &&
          < div className='price'>
            <FormattedMessage id={'patient.profile-doctor.price-text'} />
            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.VI &&
              <NumberFormat value={dataProfile.Doctor_Info.priceTypeData.valueVi} displayType='text' thousandSeparator={true} suffix='VND' className='currentcy' />
            }
            {dataProfile && dataProfile.Doctor_Info && language === LANGUAGES.EN &&
              <NumberFormat value={dataProfile.Doctor_Info.priceTypeData.valueEn} displayType='text' thousandSeparator={true} suffix='USD' className='currentcy' />
            }
          </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
