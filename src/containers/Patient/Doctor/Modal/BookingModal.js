import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { changeLanguageApp } from '../../../../store/actions';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import { postPatientBookingAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reasons: '',
      birthday: '',
      selectedGender: '',
      doctorId: '',
      genders: '',
      timeType: '',
    };
  }
  async componentDidMount() {
    this.props.getGenders()
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      })
    }
    return result
  }
  async componentDidUpdate(prevProps, prevState, snapShot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      })
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      })
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType
        })
      }
    }
  }
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status
    })
  }
  handleOnChaneInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({ ...stateCopy })
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0]
    })
  }
  handleChangeSelect = (selectedOptions) => {
    this.setState({
      selectedGender: selectedOptions
    })
  }
  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let res = await postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reasons: this.state.reasons,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName
    });
    if (res && res.errCode === 0) {
      toast.success('Booking a new appointment successfully !');
      this.props.closeBookingModal();
    } else {
      toast.error('Booking a new appointment failed !')
    }

  }
  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
      let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
      return `${time} - ${date}`;

    }
    return ''
  }
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
      return name;

    }
    return ''
  }
  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    return (
      <React.Fragment>
        <div>
          <Modal isOpen={isOpenModal} toggle={''} className={'booking-modal-container'} size='lg' centered>
            <div className='booking-modal-content'>
              <div className='booking-modal-header'>
                <span className='left'><FormattedMessage id={'patient.booking-modal.title'} /></span>
                <span onClick={() => closeBookingModal()} className='right'><i className='fas fa-times'></i></span>
              </div>
              <div className='booking-modal-body'>
                {/* {JSON.stringify(dataTime)} */}
                <div className='doctor-info'>
                  <ProfileDoctor doctorId={doctorId} isShowDescription={false} dataTime={dataTime} isShowLinkDetail={false} isShowPrice={true} />
                </div>

                <div className='row'>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.fullName'} /></label>
                    <input className='form-control' value={this.state.fullName} onChange={(event) => this.handleOnChaneInput(event, 'fullName')} />
                  </div>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.phoneNumber'} /></label>
                    <input className='form-control' value={this.state.phoneNumber} onChange={(event) => this.handleOnChaneInput(event, 'phoneNumber')} />
                  </div>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.email'} /></label>
                    <input className='form-control' value={this.state.email} onChange={(event) => this.handleOnChaneInput(event, 'email')} />
                  </div>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.address'} /></label>
                    <input className='form-control' value={this.state.address} onChange={(event) => this.handleOnChaneInput(event, 'address')} />
                  </div>
                  <div className='col-12 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.reasons'} /></label>
                    <input className='form-control' value={this.state.reasons} onChange={(event) => this.handleOnChaneInput(event, 'reasons')} />
                  </div>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.birthday'} /></label>
                    <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control' value={this.state.birthday} />
                  </div>
                  <div className='col-6 form-group'>
                    <label><FormattedMessage id={'patient.booking-modal.gender'} /></label>
                    <Select value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders} />
                  </div>
                </div>
              </div>
              <div className='booking-modal-footer'>
                <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}><FormattedMessage id={'patient.booking-modal.confirm'} /></button>
                <button className='btn-booking-cancel' onClick={closeBookingModal}><FormattedMessage id={'patient.booking-modal.cancel'} /></button>
              </div>
            </div>

          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
