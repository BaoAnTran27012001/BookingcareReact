import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import { LANGUAGES, dateFormat } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: '',
      rangeTime: [],
    }
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleHour();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map(item => ({ ...item, isSelected: false }))
      }
      this.setState({
        rangeTime: data
      })

    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }
  buildDataInputSelect(inputData) {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        return result.push(object);
      });
    }
    return result;
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedDoctor: selectedOption });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0]
    })
  }
  handleClickBtnTime = (time) => {

    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map(item => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime
      })
    }
    console.log('Check range Time ', rangeTime);
  }
  handleSaveSchedule = async () => {
    let result = [];
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    if (!currentDate) {
      toast.error("Invalid Date");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error('Invalid Selected Doctor');
      return;
    }
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
    // let formattedDate = moment(currentDate).unix()
    let formattedDate = new Date(currentDate).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter(item => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          result.push(object)
        })
      } else {
        toast.error('Invalid selected time !');
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate
    });
    if (res && res.errCode === 0){
      toast.success("Save schedule successfully");
    }else{
      toast.error("Save Schedule Error.");
      console.log("Error from server: ",res);
    }
      console.log('check save Bulk res: ', res);
  }
  render() {
    const { rangeTime } = this.state;
    const { language } = this.props;
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    console.log(yesterday);
    return (
      <div className='manage-schedule-container'>
        <div className='m-s-title'>
          <FormattedMessage id={'manage-schedule.title'} />
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-6 form-group'>
              <label><FormattedMessage id={'manage-schedule.choose-doctor'} /></label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              />
            </div>
            <div className='col-6 form-group'>
              <label><FormattedMessage id={'manage-schedule.choose-date'} /></label>
              <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control' minDate={yesterday} value={this.state.currentDate} />
            </div>
            <div className='col-12 pick-hour-container'>
              {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                return <button key={index} className={item.isSelected ? 'btn btn-schedule active' : 'btn btn-schedule'} onClick={() => this.handleClickBtnTime(item)}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</button>
              })}
            </div>
            <div className='col-12'>
              <button onClick={() => this.handleSaveSchedule()} className='btn btn-primary'><FormattedMessage id={'manage-schedule.save-info'} /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleHour: () => dispatch(actions.fetchAllScheduleHour()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
