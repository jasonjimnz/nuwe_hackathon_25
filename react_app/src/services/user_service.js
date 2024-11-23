const API_URL = 'http://164.132.56.231:3000/api/user';

export const getUserDetail = async () => {
  try {
    const response = await fetch(API_URL + '/getUserDetail', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message, 'User not found');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message, 'Error occurred during login');
  }
};
