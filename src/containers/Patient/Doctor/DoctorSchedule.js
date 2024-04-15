import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { changeLanguageApp } from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {}
    };
  }
  async componentDidMount() {
    let arrDates = this.getArrDays();
    if (arrDates && arrDates.length > 0) {
      this.setState({
        allDays: arrDates,
      });

    }

  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      let arrDates = this.getArrDays();
      this.setState({
        allDays: arrDates,
      })
    }
    if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
      let arrDates = this.getArrDays();
      let res = await getScheduleDoctorByDate(this.props.detailDoctorId, arrDates[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      })
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
      let doctorId = this.props.detailDoctorId;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      console.log('check on Change schedule: ', res);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        })
      }
    }
  }
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal:time
    });
    
    console.log('baoan check time: ', time);
  }
  handleCloseBookingModal = () => {
    this.setState({
      isOpenModalBooking: false
    })
  }
  getArrDays = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format('DD/MM');
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
      arrDate.push(object);
    }
    return arrDate;
  }
  render() {
    let { allDays, allAvailableTime, isOpenModalBooking,dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <React.Fragment>
        <div className='doctor-schedule-container'>
          <div className='all-schedule'>
            <select className='date-select' style={{ textTransform: 'capitalize' }} onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays && allDays.length > 0 && allDays.map((item, index) => {
                return <option style={{ textTransform: 'capitalize' }} key={index} value={item.value}>{item.label}</option>
              })}

            </select>
          </div>
          <div className='all-available-time'>
            <div className='text-calendar'>
              <span><i className='fas fa-calendar-alt'></i><FormattedMessage id={'patient.detail-doctor.schedule'} /></span>
            </div>
            <div className='time-content'>
              {allAvailableTime && allAvailableTime.length === 0 && <h5><FormattedMessage id={'patient.detail-doctor.no-schedule'} /></h5>}
              {allAvailableTime && allAvailableTime.length > 0 && allAvailableTime.map((item, index) => {
                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                return <button onClick={() => this.handleClickScheduleTime(item)} key={index}>{timeDisplay}</button>
              })}
              {allAvailableTime && allAvailableTime.length !== 0 && <div className='book-free'>CHỌN <i className='far fa-hand-point-up'></i> VÀ ĐẶT MIỄN PHÍ</div>}
            </div>
          </div>
        </div>
        <BookingModal isOpenModal={isOpenModalBooking} closeBookingModal={this.handleCloseBookingModal} dataTime={dataScheduleTimeModal}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
