const API_URL = 'http://164.132.56.231:3000/api/auth';

export const login = async (username, password) => {
  try {
    const response = await fetch(API_URL + '/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message, 'Invalid credentials');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message, 'Error occurred during login');
  }
};

export const signUp = async (userDetails) => {
  try {
    const response = await fetch(API_URL + '/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message, 'Error occurred during sign-up');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message, 'Error occurred during sign-up');
  }
};
