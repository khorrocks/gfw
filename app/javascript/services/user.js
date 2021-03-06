import { apiRequest, apiAuthRequest } from 'utils/request';

export const setUserToken = token => {
  localStorage.setItem('userToken', token);
  apiAuthRequest.defaults.headers.Authorization = `Bearer ${localStorage.getItem(
    'userToken'
  )}`;
};

export const login = formData =>
  apiRequest({
    method: 'POST',
    url: '/auth/login',
    data: formData
  }).then(response => {
    if (response.status < 400 && response.data) {
      const { data: userData } = response.data;
      setUserToken(userData.token);
    }

    return response;
  });

export const register = formData =>
  apiRequest.post('/auth/sign-up', { ...formData, apps: ['gfw'] });

export const resetPassword = formData =>
  apiRequest.post('/auth/reset-password', formData);

export const updateProfile = (id, data) =>
  apiAuthRequest({
    method: 'PATCH',
    data,
    url: `/user/${id}`
  });

export const checkLoggedIn = () => apiAuthRequest.get('/auth/check-logged');

export const getProfile = id => apiAuthRequest.get(`/user/${id}`);

export const logout = () =>
  apiAuthRequest.get('/auth/logout').then(response => {
    if (response.status < 400) {
      localStorage.removeItem('userToken');
      window.location.reload();
    } else {
      console.warn('Failed to logout');
    }
  });
