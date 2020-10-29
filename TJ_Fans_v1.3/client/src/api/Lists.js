import axios from './axios';
import getAuthHeader from './getAuthHeader';
import List from '../models/List';

export const saveList = async (body) => {
  try {
    const { data } = await axios.post('/v1/lists', body, {
      headers: await getAuthHeader(),
    });
    if (data && data._id) {
      return {
        success: true,
        data: new List(data),
      };
    } else {
      return {
        success: false,
        error: 'An unknown error occurred. Please, retry again later.',
      };
    }
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return {
          success: false,
          error: 'Oops! Looks like your list did not save, please try again.',
        };
      case 401:
        return {
          success: false,
          error:
            'Saving a list failed because your session expired. Please refresh the page and try again.',
        };
      default:
        return {
          success: false,
          error: 'An unknown error occurred. Please, retry again later.',
        };
    }
  }
};
