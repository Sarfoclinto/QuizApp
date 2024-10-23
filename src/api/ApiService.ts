import axios from "axios";

const BASE_URL = "https://the-trivia-api.com/api";
const api = axios.create({
  baseURL: BASE_URL,
});

//the-trivia-api.com/api/questions?limit=20&category=general_knowledge
export const getquestions = async (limit = 10) => {
  try {
    const response = await api.get("/questions", {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching questions: ", error);
    throw error;
  }
};
