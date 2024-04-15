import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../../store/actions';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',

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
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy
    })

  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
    console.log('handleEditorChange', html, text);
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add New Specialty Successfully');
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',

      });
    } else {
      toast.error('Something wrong,please try again !')
    }
    console.log('baoan check state: ', this.state);
  }
  render() {

    return (
      <React.Fragment>
        <div className='manage-specialty-container'>
          <div className='ms-title'>Quản lý chuyên khoa</div>
          <div className='add-new-specialty row'>
            <div className='col-6 form-group'>
              <label>Tên chuyên khoa</label>
              <input className='form-control' type='text' value={this.state.name} onChange={(event) => this.handleOnChangeInput(event, 'name')} />
            </div>
            <div className='col-6 form-group'>
              <label>Ảnh chuyên khoa</label>
              <input className='form-control-file' type='file' onChange={(event) => this.handleOnChangeImage(event)} />
            </div>
            <div className='col-12'>
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className='col-12'>
              <button className='btn-save-specialty' onClick={() => this.handleSaveNewSpecialty()}>Save</button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
