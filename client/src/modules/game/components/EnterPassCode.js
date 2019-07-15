import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { codeImages } from '/lib/assets/images';
import { useFetchDataIds } from '/lib/hooks';
import { message } from 'antd';
import SelectGender from './SelectGender';
import SelectStudentName from './SelectStudentName';

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
const maxCharacters = 3;


export default function EnterPassCode(props) {
  const [selectedClassId, setSelectedClassId] = useState('');

  const [selectedPassCode, setSelectedPassCode] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tempCode, setTempCode] = useState('');

  function hanlePressChar(char) {
    const newTempCode = `${tempCode}${char}`.substr(-maxCharacters);
    setTempCode(newTempCode)
  }

  const inCompleteCode = !tempCode || tempCode.length < maxCharacters;

  async function handleFindClass () {
    if (inCompleteCode) {
      return message.error("Pass code must be provided.");
    }

    try {
      setIsSubmitting(true);
      const { total, data } = await props.getClasses({ code: tempCode, $sort: { _id: -1 }, $limit: 1 });
      if (!total || !data.length) {
        message.error('Invalid Pass Code');
        return;
      }

      setSelectedClassId(data[0]._id);
    } catch(error) {
      message.error(error.message);
    } finally {
      setIsSubmitting(false)
    }
  }

  if (selectedClassId && !selectedGender) {
    return (
      <SelectGender
        setSelectedGender={setSelectedGender}
      />
    )
  }

  if (selectedClassId && selectedGender) {
    return (
      <SelectStudentName
        selectedClassId={selectedClassId}
        selectStudentId={props.selectStudentId}
        selectedGender={selectedGender}
        getUsers={props.getUsers}
        users={props.users}
        createExam={props.createExam}
      />
    )
  }
  const placeHoldersCount = maxCharacters - tempCode.length;
  let placeHolders = [];

  if (placeHoldersCount > 0) {
    for (let i = 0; i < placeHoldersCount; i += 1) {
      placeHolders.push(i);
    }
  }

  return (
    <main className="wrap passcode-form">
      <div>
      <h1 className="title">Enter class code below.</h1>
      <div className="container passcode-input-field rounded">
          {
            tempCode.split('').map((char, index) => (
              <div key={`${char}_${index}`} className="rounded drop-shadow">
              <span style={{ background: `url(${codeImages[char]}) no-repeat center` , backgroundSize: "cover" , width: "100%", height: "100%"}}>
                {/* <span>{char}</span> */}
                {/* <img src={codeImages[char]} className = {tempCode.includes(char) ? "Checked" : ""}/> */}
              </span>
              </div>
            ))
          }
          {
            placeHolders.map((_id, index) => (
              <div  key={`placeholder_${_id}_${index}`} className="rounded drop-shadow">
              <span></span>
              </div>
            ))
          }
        </div>
      </div>

      <div className="passcode-input-choices">
        {
          characters.map((char, index) => (
            <div key={index} onClick={() => { hanlePressChar(char); }} className={`rounded drop-shadow ${tempCode.includes(char) ? 'Checked' : ''}`} style={{ background: `url(${codeImages[char]}) no-repeat center` , backgroundSize: "cover" , width: "100%"}}>
            <span>
              {/* <img src={codeImages[char]} /> */}
            </span>
            </div>
          ))
        }
      </div>
      <div className="action">
        <button className="nextButton" disabled={inCompleteCode || isSubmitting} onClick={handleFindClass}>Continue</button>
        {/* <button disabled={isSubmitting} onClick={() => { setTempCode(''); }}>
          Clear
        </button> */}
      </div>
    </main>
  );
}
