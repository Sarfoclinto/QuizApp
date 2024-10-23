import { useQuery } from "@tanstack/react-query";
import { getquestions } from "../api/ApiService";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const sessionKey = "quiz-data";
const useQuizData = () => {
  const sessionQuizData = sessionStorage.getItem(sessionKey);
  const [searchParams] = useSearchParams();
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const { data, isLoading, error } = useQuery({
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
