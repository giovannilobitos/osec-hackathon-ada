import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react';
import {
  message,
} from 'antd';

const choiceValues = ['a', 'b', 'c', 'd'];

export default function Game(props) {
  const { question } = props;
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refContainer = useRef(null);

  useEffect(() => {
    if(refContainer.current) {
      refContainer.current.style.animation = "slidetran";
      refContainer.current.style.animationDuration = ".5s";
    }
  },[question]);

  if (!question) {
    return (
      <div>
        Something went wrong.
      </div>
    );
  }

  const isFinal = selectedChoice && !question.nextQuestion[selectedChoice.value];

  async function submitAnswer() {
    try {
      if (!selectedChoice) {
        return message.error("You have not selected an answer.");
      }

      const data = {
        value: selectedChoice.value,
        weight: selectedChoice.weight,
        question_id: question._id,
        student_id: props.selectedStudentId,
        exam_id: props.selectedExamId,

      };

      setIsSubmitting(true);
      await props.submitAnswer(data, question.nextQuestion[selectedChoice.value]);
    } catch(error) {
      message.error(error.message);
    } finally {
      if (!isFinal) {
        setIsSubmitting(false);
        setSelectedChoice(null);
      }
    }
  }

  const imageSrc = `${process.env.BACKEND_URL}/images/${question._id}.jpg`;

  return (
    <div>
      {/* {
        isFinal && (
          <marquee>
            IT'S THE FINAL COUNTDOWN!
          </marquee>
        )
      } */}
    <div className="questionWrapper" ref={refContainer}>
    <div className="questionBanner">
      <div className="questinImg">
        <img src={imageSrc} alt="question image"></img>
      </div>
      <div className="questionText">
        <p>{question.text}</p>
      </div>
    </div>
    <div className="choicesWrap">
    <div className = "choicesWrapper">
      {
        question.choices.map(({ text, weight }, index) => {
          const value = choiceValues[index];
          const isChecked = value === (selectedChoice || {}).value;
          return (
            <div key={index} className={`Choice ${isChecked ? 'Checked': ''}`}>
              <label className="choiceLabel">
                <input type="checkbox" checked={isChecked} onChange={() => setSelectedChoice({ weight, value })} />
                <p className="choiceText">
                  {text}
                </p>
              </label>
            </div>
          )
        })
      }
      </div>
      </div>

      <button className="nextButton" onClick={submitAnswer} disabled={!selectedChoice || isSubmitting}>Next</button>
    </div>
    </div>
  )
}
