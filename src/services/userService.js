import axios from '../axios';
const handleLoginAPI = (email, password) => {
  return axios.post('api/login', { email, password });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log('check data from service', data);
  return axios.post('/api/create-new-user', data);
};
const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
};
const getAllcodesService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctor = (data) => {
  return axios.post('/api/save-info-doctors', data);
};
const getDetailInfoDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllcodesService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctor,
  getDetailInfoDoctor,
};