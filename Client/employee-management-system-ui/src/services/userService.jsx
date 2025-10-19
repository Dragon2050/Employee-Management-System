import Cookies from 'js-cookie';
import api from '../axios/Axios';
import { userAPI } from '../utils/apiEndpoints';
import { token } from "../utils/enums";

const setHeader = () => {
  const accessToken = Cookies.get(token.ACCESS);
  const refreshToken = Cookies.get(token.REFRESH);
  if (accessToken && refreshToken) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
  }
};

const getUsers = async () => {
  try {
    setHeader();
    const {data} = await api.get(userAPI.ALL);
    const {users} = data;
    if (!users) {
      return {
        isError: true,
        errorTitle: 'User fetching error!!!', 
        errorMessage: 'No user can be fetched from the server',
      }
    } else {
      return users;
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const editUser = async (id, changes) => {
  try {
    setHeader();
    const editedUser = await api.put(userAPI.USER + id, changes);
    if (!editedUser) {
      return {
        isError: true,
        errorTitle: 'Update error!!', 
        errorMessage: 'User cannot be updated',
      }
    } else {
      return { message: 'User updated' , user: editUser };
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const deleteUser = async (id) => {
  try {
    setHeader();
    const user = await api.delete(userAPI.USER + id);
    if (!user) {
      return {
        isError: true,
        errorTitle: 'Delete employee Failed', 
        errorMessage: 'This employee could not be deleted',
      }
    } else {
      return { message: 'User deleted' , user: editUser };
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const getDashboardData = async () => {
  try {
    setHeader();
    const { data } = await api.get(userAPI.DETAIL);
    if (!data) {
      return {
        isError: true,
        errorTitle: 'Dashboard data error!!', 
        errorMessage: 'Daashboard data cannot be get.',
      }
    } else {
      const { result } = data;
      return result;
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
};

const getLatestEmployee = async () => {
  try {
    setHeader();
    const {data} = await api.get(userAPI.ALL);
    if (!data) {
      return {
        isError: true,
        errorTitle: 'Dashboard data error!!', 
        errorMessage: 'Daashboard data cannot be get.',
      }
    } else {
      const { users } = data;
      return users;
    }
  } catch (err) {
    const message = err?.response?.data?.message ?? 'Something went wrong. Please try again after some time.';
    return {
      isError: true,
      errorTitle: 'Error!!', 
      errorMessage: message,
    }
  }
}

export {
  deleteUser,
  editUser,
  getDashboardData, getLatestEmployee, getUsers
};

