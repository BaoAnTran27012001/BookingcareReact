import actionTypes from './actionTypes';
import {
  getAllcodesService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctor,
  getAllSpecialtiesService
} from '../../services/userService';
import { toast } from 'react-toastify';
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllcodesService('GENDER');
      if (res && res.errCode === 0) {
        console.log('baoan check get state: ', getState());
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log('fetch getGenderStart: ', error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log('fetch Position Failed: ', error);
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log('fetch Role Failed: ', error);
    }
  };
};
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log('check create user redux  ', res);
      if (res && res.errCode === 0) {
        toast.success('Created a new user successfully');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
      console.log('saveUserFailed: ', error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: 'CREATE_USER_SUCCESS',
});
export const saveUserFailed = () => ({
  type: 'CREATE_USER_FAILED',
});
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      toast.error('Fetch All User Error !');
      dispatch(fetchAllUsersFailed());
      console.log('fetch All Users Failed: ', error);
    }
  };
};
export const fetchAllUsersSuccess = (data) => ({
  type: 'FETCH_ALL_USERS_SUCCESS',
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: 'FETCH_ALL_USERS_SUCCESS',
});
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      console.log('check create user redux  ', res);
      if (res && res.errCode === 0) {
        toast.success('Deleted user successfully');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Deleted user error');
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error('Deleted user error');
      dispatch(deleteUserFailed());
      console.log('deleteUserFailed: ', error);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log('check create user redux  ', res);
      if (res && res.errCode === 0) {
        toast.success('Updated user successfully');
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error('Updated user error');
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error('Updated user error');
      dispatch(editUserFailed());
      console.log('updateUserFailed: ', error);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
// let res1 = await getTopDoctorHomeService(3);
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService('');
      if (res && res.errorCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      toast.error('Load Top Doctors Failed');
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (error) {
      toast.error('Load All Doctors Failed');
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const saveDetailDoctorAction = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
        });
        toast.success('Save Detail Doctor Successfully !')
      } else {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
        });
        toast.error('Save Detail Doctor Failed !')
      }
    } catch (error) {
      toast.error('Save Detail Doctor Failed !');
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllScheduleHour = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodesService("TIME");
      console.log(res);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOUR_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOUR_FAILED,
        });
      }
    } catch (error) {
      toast.error('Load All Doctors Failed');
      dispatch({
        type: actionTypes.FETCH_ALL_CODE_SCHEDULE_HOUR_FAILED,
      });
    }
  };
};
export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      let resPrice = await getAllcodesService('PRICE');
      let resPayment = await getAllcodesService('PAYMENT');
      let resProvince = await getAllcodesService('PROVINCE');
      let resSpecilaty = await getAllSpecialtiesService();


      if (resPrice && resPrice.errCode === 0 && resPayment && resPayment.errCode === 0 && resProvince && resProvince.errCode === 0 && resSpecilaty && resSpecilaty.errCode === 0) {
        console.log('baoan check get state: ', getState());
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecilaty.data
        }
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInfoFailed());
      console.log('fetch getGenderStart: ', error);
    }
  };
};
export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});