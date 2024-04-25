import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllcodesService } from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: []

    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({ id: id, location: "ALL" });
      console.log('check res SPECIALTY detail info: ', res);
      let resProvince = await getAllcodesService('PROVINCE');
      if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
        let data = res.data;
        let arrDoctorId = []
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialtyList;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }
        let dataProvince = resProvince.data;
        let result = [];
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc"
          })
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : []
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
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getDetailSpecialtyById({ id: id, location: location });
      console.log('check res',res);
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = []
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialtyList;
          console.log(arr);
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId)
            })
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  render() {
    const { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    console.log('check state detail specialty: ', this.state);
    let language = this.props.language;
    return (
      <div className='detail-specialty-container'>
        <HomeHeader />
        <div>
          <div className='description-specialty'>
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>}
          </div>
          <div className='detail-specialty-body'>
            <div className='search-specialty-doctor'>
              <select onChange={(event) => this.handleOnChangeSelect(event)}>
                {listProvince && listProvince.length > 0 && listProvince.map((item, index) => {
                  return <option key={index} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </option>
                })}
              </select>
            </div>
            {arrDoctorId && arrDoctorId.length > 0 && arrDoctorId.map((item, index) => {
              return (
                <div className='each-doctor' key={index}>
                  <div className='dt-content-left'>
                    <div className='profile-doctor'>
                      <ProfileDoctor doctorId={item} isShowDescription={false} isShowLinkDetail = {true} isShowPrice={false} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
