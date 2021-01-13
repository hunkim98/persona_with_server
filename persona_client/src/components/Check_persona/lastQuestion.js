import React from 'react';
import { useHistory } from 'react-router-dom';
import './lastQuestion.css';

function LastQuestion({
  types_adjectives,
  questionNumber,
  setQuestionNumber,
  possibleTypes,
  setPersonality,
}) {
  const history = useHistory();

  const decided_personality = (type) => {
    if (type === 'AX') {
      setPersonality('the Enthusiast');
    } else if (type === 'AY') {
      setPersonality('the Challenger');
    } else if (type === 'AZ') {
      setPersonality('the Achiever');
    } else if (type === 'BX') {
      setPersonality('the Peacekeeper');
    } else if (type === 'BY') {
      setPersonality('the Individualist');
    } else if (type === 'BZ') {
      setPersonality('the Observer');
    } else if (type === 'CX') {
      setPersonality('the Helper');
    } else if (type === 'CY') {
      setPersonality('the Loyalist');
    } else if (type === 'CZ') {
      setPersonality('the Reformist');
    }
    history.push('result');
  };

  const show_possible_options = () => {
    let final = [];
    for (let i = 0; i < possibleTypes.length; i++) {
      for (let j = 0; j < types_adjectives.length; j++) {
        if (possibleTypes[i] === types_adjectives[j].id) {
          final.push(
            <div
              type={possibleTypes[i]}
              onClick={() => decided_personality(possibleTypes[i])}
              key={possibleTypes[i]}
              className="last_options"
            >
              {types_adjectives[j].adjective}
            </div>,
          );
        }
      }
    }
    return final;
  };

  return (
    <>
      <div className="last_options_container">{show_possible_options()}</div>
    </>
  );
}

export default LastQuestion;
