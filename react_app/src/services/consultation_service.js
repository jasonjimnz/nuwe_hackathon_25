const API_BASE_URL = 'http://164.132.56.231:3000/api/consultations';
const API_BASE_MS_URL = 'http://164.132.56.231:3000/api/messages';
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const ConsultationService = {
  createConsultation: async (data) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create consultation');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateConsultation: async (id, data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update consultation');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConsultationById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch consultation');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  deleteConsultation: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete consultation');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConsultationsByPatient: async (patientId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/patient/${patientId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to fetch patient consultations'
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConsultationsByDoctor: async (doctorId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/doctor/${doctorId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Failed to fetch doctor consultations'
        );
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getConsultationsMessagesById: async (consultationId) => {
    try {
      const response = await fetch(
        `${API_BASE_MS_URL}/consultation/${consultationId}`,
        {
          method: 'GET',
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch consultations');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },

  sendMessage: async (data) => {
    try {
      const response = await fetch(API_BASE_MS_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create consultation');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
