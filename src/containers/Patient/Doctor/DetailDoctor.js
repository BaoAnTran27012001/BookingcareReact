import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInfoDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailInfoDoctor(id);
      console.log('check res doctor detail info: ', res);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapShot) { }
  render() {
    const { detailDoctor } = this.state;
    let language = this.props.language;
    let nameVi = '';
    let nameEn = '';
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <React.Fragment>
        <HomeHeader isShownBanner={false} />
        <div className='doctor-detail-container'>
          <div className='intro-doctor'>
            <div
              className='content-left'
              style={{ backgroundImage: `url(${detailDoctor.image})` }}
            ></div>
            <div className='content-right'>
              <div className='up'>
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className='down'>
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className='schedule-doctor'>
            <div className='content-left'>
              <DoctorSchedule detailDoctorId={detailDoctor ? detailDoctor.id : -1} />
            </div>
            <div className='content-right'>
              <DoctorExtraInfo detailDoctorId={detailDoctor ? detailDoctor.id : -1}/>
            </div>
          </div>
          <div className='detail-info-doctor'>
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className='comment-doctor'></div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
