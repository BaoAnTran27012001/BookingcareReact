import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientsForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false
    };
  }
  async componentDidMount() {
    this.getDataPatient()
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getAllPatientsForDoctor({
      doctorId: user.id,
      date: formattedDate
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data
      })
    }
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0]
    }, async () => {

      await this.getDataPatient()
    })
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
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName
    }
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data
    })
    console.log('andy check data: ', data);
  }

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {}
    })
  }
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true
    })
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName
    })
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success('Send Remedy Successfully');
      this.closeRemedyModal()
      await this.getDataPatient()
    } else {
      this.setState({
        isShowLoading: false
      })
      toast.error("Something Wrong....")
    }
  }
  render() {
    console.log('check andyADASD: ', this.state);
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props
    return (
      <React.Fragment>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text='Loading...'
        >
          <div className='manage-patient-container'>
            <div className='m-p-title'>
              Quản lí bệnh nhân khám bệnh
            </div>
            <div className='manage-patient-body row'>
              <div className='col-6 form-group'>
                <label>Chọn ngày khám</label>
                <DatePicker onChange={this.handleOnChangeDatePicker} className='form-control' value={this.state.currentDate} />
              </div>
              <div className='col-12 table-manage-patient'>
                {dataPatient && dataPatient.length > 0 ? <table style={{ width: '100%', border: '1px solid #000' }} className=''>
                  <tbody>


                    <tr>
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và Tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th>Actions</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 && dataPatient.map((item, index) => {
                      let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                      let gender = language === LANGUAGES.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn;
                      return (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{time}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{gender}</td>
                        <td style={{ display: 'flex', gap: '16px' }}>
                          <button className="btn btn-warning" type="button" onClick={() => this.handleBtnConfirm(item)}>Xác nhận</button>

                        </td>
                      </tr>)
                    })}

                  </tbody>
                </table> : <h2>Bác sĩ không có lịch hẹn</h2>}

              </div>
            </div>
          </div>
          <RemedyModal isOpenModal={isOpenRemedyModal} dataModal={dataModal} closeRemedyModal={() => this.closeRemedyModal()} sendRemedy={this.sendRemedy} />


        </LoadingOverlay>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
