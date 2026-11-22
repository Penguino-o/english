import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { Quiz } from "@/data/englishMadeEasy";

type QuizPanelProps = {
  quiz: Quiz;
  number: string;
};

export default function QuizPanel({ quiz, number }: QuizPanelProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answered = Object.keys(answers).length;
  const correct = quiz.questions.reduce((score, question, index) => score + (answers[index] === question.answer ? 1 : 0), 0);

  return (
    <div className="quiz-board glass-panel">
      <div className="quiz-board-top">
        <div className="quiz-progress-copy">
          <span className="micro-label">PRACTICE · {number} / 05</span>
          <span>{answered === quiz.questions.length ? `${correct} / ${quiz.questions.length} correct` : `${answered} of ${quiz.questions.length} answered`}</span>
        </div>
        <div className="quiz-progress-track" aria-hidden="true"><span style={{ width: `${(answered / quiz.questions.length) * 100}%` }} /></div>
        {answered > 0 && <button className="reset-quiz" type="button" onClick={() => setAnswers({})}><RotateCcw size={14} aria-hidden="true" /> Try again</button>}
      </div>

      <div className="question-list">
        {quiz.questions.map((question, questionIndex) => {
          const selected = answers[questionIndex];
          const isAnswered = selected !== undefined;
          const isCorrect = selected === question.answer;
          return (
            <fieldset className={`question-card${isAnswered ? (isCorrect ? " question-card--correct" : " question-card--incorrect") : ""}`} key={`${quiz.id}-${questionIndex}`}>
              <legend><span className="question-number">{String(questionIndex + 1).padStart(2, "0")}</span><span>{question.prompt}</span></legend>
              <div className="answer-options">
                {question.choices.map((choice, choiceIndex) => {
                  const selectedChoice = selected === choiceIndex;
                  const correctChoice = isAnswered && choiceIndex === question.answer;
                  return (
                    <button
                      aria-pressed={selectedChoice}
                      className={`answer-choice${selectedChoice ? " answer-choice--selected" : ""}${correctChoice ? " answer-choice--key" : ""}`}
                      key={choice}
                      onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: choiceIndex }))}
                      type="button"
                    >
                      <span className="choice-letter">{String.fromCharCode(97 + choiceIndex)}</span>
                      <span>{choice}</span>
                      {correctChoice && <Check size={14} aria-hidden="true" />}
                      {selectedChoice && !isCorrect && <X size={14} aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
              {isAnswered && <p className={`answer-feedback${isCorrect ? " answer-feedback--correct" : " answer-feedback--incorrect"}`} role="status">
                {isCorrect ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}
                <span>{isCorrect ? "Exactly." : "Not quite."} {question.explanation}</span>
              </p>}
            </fieldset>
          );
        })}
      </div>
      {answered === quiz.questions.length && <p className="quiz-complete" role="status">{correct === quiz.questions.length ? "A perfect round. The rules are sticking." : `You got ${correct} of ${quiz.questions.length}. Review the notes above, then try again.`}</p>}
    </div>
  );
}
