import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
  }
  listenToEmitter() {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      });
    });
  }
  componentDidMount() {
    // console.log('check props from parent ', this.props.currentUser);
    const user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id:user.id,
        email: user.email,
        password: 'hardcode',
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log('mounting');
  }

  toggle = () => {
    this.props.onHandleToggle();
  };
  handleOnChangeInput = (event, id) => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  };
  checkValidateInput() {
    let isValid = true;
    const arrayInput = [
      'email',
      'password',
      'firstName',
      'lastName',
      'address',
    ];
    for (let i = 0; i < arrayInput.length; i++) {
      if (!this.state[arrayInput[i]]) {
        isValid = false;
        alert('Missing parameter: ' + arrayInput[i]);
        break;
      }
    }
    return isValid;
  }
  handleSaveUser = () => {
    const isValid = this.checkValidateInput();
    if (isValid) {
      this.props.editUser(this.state);
      console.log('check data: ', this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.open}
        toggle={() => this.toggle()}
        size='lg'
        centered
        className='modal-user-container'
      >
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className='modal-user-body'>
            <div className='input-container'>
              <label>Email:</label>
              <input
                type='text'
                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                value={this.state.email}
                disabled
              />
            </div>
            <div className='input-container'>
              <label>Password:</label>
              <input
                type='password'
                onChange={(event) =>
                  this.handleOnChangeInput(event, 'password')
                }
                value={this.state.password}
                disabled
              />
            </div>
            <div className='input-container'>
              <label>First Name:</label>
              <input
                type='text'
                onChange={(event) =>
                  this.handleOnChangeInput(event, 'firstName')
                }
                value={this.state.firstName}
              />
            </div>
            <div className='input-container'>
              <label>Last Name:</label>
              <input
                type='text'
                onChange={(event) =>
                  this.handleOnChangeInput(event, 'lastName')
                }
                value={this.state.lastName}
              />
            </div>
            <div className='input-container max-width-input'>
              <label>Address:</label>
              <input
                type='text'
                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='primary'
            className='px-3'
            onClick={() => this.handleSaveUser()}
          >
            Save Changes
          </Button>{' '}
          <Button
            color='secondary'
            className='px-3'
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
