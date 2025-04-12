import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Use 'localhost' for consistency

export const reportBettingApp = async (name, description) => {
  const response = await axios.post(`${API_BASE_URL}/report`, {
    name,
    description,
  });
  return response.data;
};

export const getAllReports = async () => {
  const response = await axios.get(`${API_BASE_URL}/reports`);
  return response.data;
};

export const getCompanionAIResponse = async (userMessage) => {
  const response = await axios.post(`${API_BASE_URL}/companion-ai`, {
    user_message: userMessage,
  });
  return response.data;
};