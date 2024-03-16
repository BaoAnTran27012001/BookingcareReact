import React, { Component } from 'react';
import { connect } from 'react-redux';
import outStandingDoctor from '../../../assets/outstanding-doctor/anh-dai-dien-bs.jpg';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor(doctor) {
    console.log('check view detail DOCtor: ', doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  }
  render() {
    let allTopDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className='section-share section-outstanding-doctor'>
        <div className='section-content'>
          <div className='section-header'>
            <span className='title-section'>
              <FormattedMessage id={'homepage.outstanding-doctor'} />
            </span>
            <button className='btn-section'>
              <FormattedMessage id={'homepage.more-info'} />
            </button>
          </div>
          <div className='section-body'>
            <Slider {...this.props.settings}>
              {allTopDoctors &&
                allTopDoctors.length > 0 &&
                allTopDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString(
                      'binary'
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className='img-custom img-outstanding'
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <img src={imageBase64} alt='section' />
                      <div className='position text-center'>
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>Cơ xương khớp</div>
                      </div>
                    </div>
                  );
                })}
              {/* <div className='img-custom img-outstanding'>
                <img src={outStandingDoctor} alt='section' />
                <div className='position text-center'>
                  <div>Giáo sư, Tiến sĩ Trần Minh Bạch</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className='img-custom img-outstanding'>
                <img src={outStandingDoctor} alt='section' />
                <div className='position text-center'>
                  <div>Giáo sư, Tiến sĩ Trần Minh Bạch</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className='img-custom img-outstanding'>
                <img src={outStandingDoctor} alt='section' />
                <div className='position text-center'>
                  <div>Giáo sư, Tiến sĩ Trần Minh Bạch</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className='img-custom img-outstanding'>
                <img src={outStandingDoctor} alt='section' />
                <div className='position text-center'>
                  <div>Giáo sư, Tiến sĩ Trần Minh Bạch</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div>
              <div className='img-custom img-outstanding'>
                <img src={outStandingDoctor} alt='section' />
                <div className='position text-center'>
                  <div>Giáo sư, Tiến sĩ Trần Minh Bạch</div>
                  <div>Cơ xương khớp</div>
                </div>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
