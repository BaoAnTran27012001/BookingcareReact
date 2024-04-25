import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllcodesService, getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},

    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({ id: id });
      console.log('check res CLINIC detail info: ', res);

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = []
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinicList;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,

        });
      }

    }
  }

  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {

    }
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }

  render() {
    const { arrDoctorId, dataDetailClinic, } = this.state;
    console.log('check state detail specialty: ', this.state);
    let language = this.props.language;
    return (
      <div className='detail-specialty-container'>
        <HomeHeader />
        <div>
          <div className='description-specialty'>
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
              <>
              <div>{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
                </>}
          </div>
          <div className='detail-specialty-body'>

            {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
              return (
                <div className='each-doctor' key={index}>
                  <div className='dt-content-left'>
                    <div className='profile-doctor'>
                      <ProfileDoctor doctorId={item} isShowDescription={false} isShowLinkDetail={true} isShowPrice={false} />
                    </div>
                  </div>
                  <div className='dt-content-right'>
                    <div className='doctor-schedule'>
                      <DoctorSchedule detailDoctorId={item} />
                    </div>
                    <div className='doctor-extra-info'>
                      <DoctorExtraInfo detailDoctorId={item} />
                    </div>
                  </div>
                </div>

              )
            })}
          </div>

        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
