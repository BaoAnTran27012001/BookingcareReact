import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CRUDActions, LANGUAGES } from '../../../utils';
import * as ReactDOM from 'react-dom';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { getDetailInfoDoctor } from '../../../services/userService';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkDown: '',
      contentHTML: '',
      selectedOption: null,
      description: '',
      listDoctors: [],
      hasOldData: false,
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectedClinic: '',
      selectedSpecialty: '',
      nameClinic: '',
      addressClinic: '',
      note: '',
      clinicId: '',
      specilatyId: ''
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllReqiredDoctorInfo();
  }
  buildDataInputSelect(inputData, type) {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          return result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          return result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          return result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          return result.push(object);
        });
      }
    }
    return result;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY")
      let dataClinic = this.buildDataInputSelect(resClinic, "CLINIC")
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSpecialty,
        listClinic: dataClinic
      })
    }
    if (prevProps.language !== this.props.language) {
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkDown: text,
      contentHTML: html,
    });
    console.log('handleEditorChange', html, text);
  };
  handleSaveContentMarkdown() {
    let { hasOldData } = this.state;

    if (!this.state.selectedOption) {
      toast.error("Please choose a doctor");
      return;
    }
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkDown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUDActions.EDIT : CRUDActions.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : -1,
      specialtyId: this.state.selectedSpecialty.value
    });
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = '';
      let nameClinic = '';
      let note = '';
      let paymentId = '';
      let priceId = '';
      let provinceId = ''
      let specialtyId = '';
      let selectedPayment = '';
      let selectedPrice = '';
      let selectedProvince = '';
      let selectedSpecialty = '';
      let clinicId = '';
      let selectedClinic = ''

      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId
        })
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId
        })
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkDown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkDown: '',
        description: '',
        hasOldData: false,
        addressClinic: '',
        nameClinic: '',
        note: '',
        selectedPayment: '',
        selectedPrice: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: '',
      });
    }
    console.log('check Change SELECT :', res);
  };
  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy
    });
    console.log("baoan check new selectOnchange ", selectedOption, stateName);
  }
  handleOnChangeDescription = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy
    });
  };
  render() {
    let { hasOldData, listSpecialty } = this.state;
    console.log('check state: ', this.state);
    return (
      <div className='manage-doctor-container'>
        <div className='manage-doctor-title'><FormattedMessage id={'admin.manage-doctor.title'} /></div>
        <div className='more-info'>
          <div className='content-left form-group'>
            <label htmlFor=''><FormattedMessage id={'admin.manage-doctor.select-doctor'} /></label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id={'admin.manage-doctor.select-doctor'} />}

            />
          </div>

          <div className='content-right'>
            <label htmlFor=''><FormattedMessage id={'admin.manage-doctor.intro'} /></label>
            <textarea
              className='form-control'
              name=''
              id=''
              cols='30'
              rows='4'
              onChange={(event) => this.handleOnChangeDescription(event, 'description')}
              value={this.state.description}
            >

            </textarea>
          </div>
        </div>
        <div className='more-info-extra row'>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.price'} /></label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id={'admin.manage-doctor.price'} />}
              name="selectedPrice"
            />
          </div>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.payment'} /></label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id={'admin.manage-doctor.payment'} />}
              name="selectedPayment"
            />
          </div>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.province'} /></label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id={'admin.manage-doctor.province'} />}
              name="selectedProvince"
            />
          </div>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.nameClinic'} /></label>
            <input className='form-control' onChange={(event) => this.handleOnChangeDescription(event, 'nameClinic')} value={this.state.nameClinic} />
          </div>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.addressClinic'} /></label>
            <input className='form-control' onChange={(event) => this.handleOnChangeDescription(event, 'addressClinic')} value={this.state.addressClinic} />
          </div>
          <div className='col-4 form-group'>
            <label><FormattedMessage id={'admin.manage-doctor.note'} /></label>
            <input className='form-control' onChange={(event) => this.handleOnChangeDescription(event, 'note')} value={this.state.note} />
          </div>
        </div>
        <div className='manage-doctor-editor'>
          <div className='row'>
            <div className='col-4 form-group'>
              <label><FormattedMessage id={'admin.manage-doctor.specialty'} /></label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                placeholder={<FormattedMessage id={'admin.manage-doctor.specialty'} />}
                name="selectedSpecialty"
              />
            </div>
            <div className='col-4 form-group'>
              <label><FormattedMessage id={'admin.manage-doctor.select-clinic'} /></label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listClinic}
                placeholder={<FormattedMessage id={'admin.manage-doctor.select-clinic'} />}
                name="selectedClinic"
              />
            </div>
          </div>
          <MdEditor
            style={{ height: '300px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkDown}
          />
        </div>

        <button
          className={
            hasOldData === true
              ? 'save-content-doctor'
              : 'create-content-doctor'
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span><FormattedMessage id={'admin.manage-doctor.save'} /></span>
          ) : (
            <span><FormattedMessage id={'admin.manage-doctor.create'} /></span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorAction(data)),
    getAllReqiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
