import { useQuery } from "@tanstack/react-query";
import { getquestions } from "../api/ApiService";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosError } from "axios";

const sessionKey = "quiz-data";

interface ObjTypes {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  question: string;
  type: string;
  incorrectAnswers: string[];
}
const useQuizData = () => {
  const sessionQuizData = sessionStorage.getItem(sessionKey);
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const { data, isLoading, error } = useQuery<ObjTypes, AxiosError>({
    enabled: !sessionQuizData,
    queryKey: ["questions"],
    queryFn: () => getquestions(limit),
  });

  const quizList = sessionQuizData ? JSON.parse(sessionQuizData) : data;

  useEffect(() => {
    if (!sessionQuizData && data) {
      sessionStorage.setItem(sessionKey, JSON.stringify(data));
    }
  }, [sessionQuizData, data]);

  return { quizList, isLoading, error, sessionQuizData };
};

export default useQuizData;
