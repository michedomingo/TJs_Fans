import axios from './axios';
import getAuthHeader from './getAuthHeader';

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.post(
      '/auth',
      {},
      { headers: await getAuthHeader() }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (email) => {
  try {
    await axios.post('/login', { email });
    return { success: true };
  } catch (error) {
    switch (error.response.status) {
      case 400:
        return {
          error: 'Bad login data. Did you submit a valid email address?',
        };
      default:
        return {
          error: 'There was an error logging you in. Please, try again. ',
        };
    }
  }
};
