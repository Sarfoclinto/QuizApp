import { motion } from "framer-motion";
import { Collapse, Form, Input, Modal, Progress } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import useQuizData from "../Hooks/useQuizData";
import { useState } from "react";
import type { ProgressProps } from "antd";

interface QuestionTypes {
  category: string;
  correctAnswer: string;
  difficulty: string;
  id: string;
  question: string;
  type: string;
  incorrectAnswers: string[];
}

const twoColors: ProgressProps["strokeColor"] = {
  "0%": "#ff0000",
  "100%": "rgb(98, 255, 0)",
};

const Quiz = () => {
  const { quizList, isLoading, error, sessionQuizData } = useQuizData();
  const [modalOpen, setModalOpen] = useState(false);
  //const [len, setLen] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [hintShowing, setHintShowing] = useState(false);
  console.log(quizList);

  if (!sessionQuizData && isLoading) {
    return (
      <div className="w-full h-dvh flex  items-center justify-center gap-x-2 ">
        <span className="loading loading-ring loading-lg"></span>{" "}
        <p className="text-lg font-bold">Loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 pt-24">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error?.message || "An error occurred while fetching games."}</p>
      </div>
    );
  }

  const onFinish = (values) => {
    const answers = values;
    let marks = 0;
    const { length } = quizList;
    for (let i = 0; i < length; i++) {
      const key = quizList[i].id;
      if (
        answers[key].toLowerCase() === quizList[i].correctAnswer.toLowerCase()
      ) {
        marks++;
      }
    }
    setCorrect(marks);
    setModalOpen(true);
  };
  const toggleHint = (e) => {
    e.preventDefault();
    setHintShowing(!hintShowing);
  };

  return (
    <div className=" h-dvh overflow-auto">
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)}>
        <Progress
          className="my-5"
          percent={50}
          status="exception"
          success={{ percent: 50, strokeColor: "red" }}
        />
        <Progress
          className="my-5"
          strokeColor={twoColors}
          // success={{ percent: 50, strokeColor: "green" }}
          percent={Math.ceil((correct / quizList.length) * 100)}
        />
      </Modal>

      <Form
        onFinish={onFinish}
        className="h-[calc(100dvh-50px)] overflow-auto relative"
      >
        {" "}
        <div className="text-white my-2 relative">
          <h1 className="text-center text-xl font-bold">
            Answer the questions below by selecting the best option. <br /> Good
            luck,and have fun!
          </h1>
          <p className="text-center text-base font-medium text-warning">
            <span className="text-red-500 font-bold text-xl">Note:</span> It's
            advisable to check out all questions before answering
          </p>
          <p className="text-center text-base font-medium text-warning">
            In case of error, check out for unanswered questions
          </p>
          <motion.button
            onClick={toggleHint}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute right-2 bottom-0 font-semibold text-base bg-red-400/60 py-2 px-3 rounded-lg cursor-pointer flex items-center justify-center"
          >
            {hintShowing ? "Turn Off Hint" : "Show Hints"}
          </motion.button>
        </div>
        <Collapse accordion defaultActiveKey={quizList[0].id}>
          {quizList.map((question: QuestionTypes) => (
            <CollapsePanel
              header={
                <span className="text-base font-semibold">
                  {question.category}
                </span>
              }
              key={question.id}
              className="bg-stone-400 pr-3"
            >
              <div>
                <p className="text-base font-semibold mb-1">
                  {question.question}
                </p>
              </div>
              <Form.Item
                name={question.id}
                key={question.id}
                rules={[{ required: true, message: "Answer is required" }]}
              >
                <Input
                  type="text"
                  placeholder="Type answer here ..."
                  className="text-stone-500 font-semibold rounded-lg text-base py-1 border-none outline-none w-3/5 pl-4 bg-stone-300"
                />
                {hintShowing && (
                  <div>
                    <p className="font-semibold">
                      <span className="text-warning-content text-warn">
                        Hint:
                      </span>{" "}
                      These are the incorrect answers
                    </p>
                    {question.incorrectAnswers.map((incorrectanswwer) => {
                      if (incorrectanswwer) {
                        return <p>{incorrectanswwer}</p>;
                      } else {
                        return (
                          <p className="text-orange-300 font-semibold">
                            Sorry! No hint for this one
                          </p>
                        );
                      }
                    })}
                  </div>
                )}
              </Form.Item>
            </CollapsePanel>
          ))}
        </Collapse>
        <p className="right-1/2 fixed bottom-0">
          <button className="btn" type="submit">
            Submit
          </button>
        </p>
      </Form>
    </div>
  );
};

export default Quiz;