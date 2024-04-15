import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyPatientBookingAppointment } from '../../services/userService';
import './VerifyEmail.scss';
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      console.log('>>> andy channel props: ', this.props);
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get('token');
      const doctorId = urlParams.get('doctorId');
      let res = await postVerifyPatientBookingAppointment({
        token: token,
        doctorId: doctorId
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode
        })
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1
        })
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
    let { statusVerify, errCode } = this.state
    return (
      <React.Fragment>
        <HomeHeader />
        {statusVerify === false ? <div className='mt-5'>Loading Data</div> : <div className='mt-5'>
          {errCode === 0 ? <div className='booking-info'>Xác nhận lịch hẹn thành công</div> : <div className='booking-info'>Lịch hẹn không tồn tại hoặc đã được xác nhận</div>}
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
