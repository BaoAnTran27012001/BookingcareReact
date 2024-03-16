import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isModalOpen: false,
      isEditModalOpen: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    const response = await getAllUsers('ALL');
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({
      isModalOpen: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.toggleUserModal();
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }
    } catch (error) {
      console.log(error);
    }
    console.log('check data ', data);
  };
  handleDeleteUser = async (user) => {
    try {
      const res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (user) => {
    console.log('check edit user ', user);
    this.setState({
      isEditModalOpen: true,
      userEdit: user,
    });
  };
  doEditUser = async (user) => {
    const res = await editUserService(user);
    try {
      if (res && res.errCode === 0) {
        this.toggleUserEditModal();
        await this.getAllUsersFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('handle edit user ', res);
  };
  render() {
    console.log('check render:', this.state);
    const allUsers = this.state.arrUsers;
    return (
      <div className='users-container'>
        <ModalUser
          open={this.state.isModalOpen}
          onHandleToggle={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isEditModalOpen && (
          <ModalEditUser
            open={this.state.isEditModalOpen}
            onHandleToggle={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
            // createNewUser={this.createNewUser}
          />
        )}

        <div className='title'>Manage users with React</div>
        <div className='mx-1'>
          <button
            className='btn btn-primary px-3'
            onClick={() => this.handleAddNewUser()}
          >
            <i className='fas fa-plus'></i>
            Add new users
          </button>
        </div>
        <div className='users-table mt-3 mx-1'>
          <table id='customers'>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            <tbody>
              {allUsers &&
                allUsers.map((user, index) => {
                  return (
                    <tr>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td className='d-flex'>
                        <button
                          className='btn-edit'
                          onClick={() => this.handleEditUser(user)}
                        >
                          <i className='fas fa-pencil-alt'></i>
                        </button>
                        <button
                          className='btn-delete'
                          onClick={() => this.handleDeleteUser(user)}
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
