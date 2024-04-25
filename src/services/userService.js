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
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};
const getExtraDoctorInfoById = (doctorId) => {
  return axios.get(`/api/get-extra-doctor-info-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-info-by-id?doctorId=${doctorId}`);
};
const postPatientBookingAppointment = (data) => {
  return axios.post('/api/patient-book-appointment', data);
};
const postVerifyPatientBookingAppointment = (data) => {
  return axios.post('/api/verify-patient-book-appointment', data);
};
const createNewSpecialty = (data) => {
  return axios.post('/api/create-new-specialty', data);
};
const getAllSpecialtiesService = () => {
  return axios.get(`/api/get-all-specialties`);
};
const getDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}
const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data);
};
const getAllClinics = () => {
  return axios.get(`/api/get-clinics`);
}
const getDetailClinicById = (data) => {
  return axios.get(`/api/get-clinic-by-id?id=${data.id}`);
}
const getAllPatientsForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}
const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data);
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
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraDoctorInfoById,
  getProfileDoctorById,
  postPatientBookingAppointment,
  postVerifyPatientBookingAppointment,
  createNewSpecialty,
  getAllSpecialtiesService,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinics,
  getDetailClinicById,
  getAllPatientsForDoctor,
  postSendRemedy
};
