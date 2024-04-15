import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { changeLanguageApp } from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  async componentDidMount() {

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

    return (
      <React.Fragment>
        <HomeHeader />
        <div>
          hello world from detail specialty
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
  return {
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
