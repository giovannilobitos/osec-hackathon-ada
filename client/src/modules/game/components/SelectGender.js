import React, { useState } from 'react';
import { codeImages } from '/lib/assets/images';

const labels = {
  male: 'Male',
  female: 'Female',
};

const genders = ['male', 'female'];

export default function SelectGender(props) {
  const [tempGender, setTempGender] = useState(null);

  function handleSelectGender() {
    if (!tempGender) {
      message.error("You must select a geneder.");
      return;
    }

    props.setSelectedGender(tempGender);
  }

  return (
    <main className="wrap select-gender">
      <h1 className="title">Select your gender.</h1>
      <div className="container select-gender-choices rounded">
        {
          genders.map((gender) => {
            const isSelected = tempGender === gender;
            return (
              <div key={gender} onClick={() => { setTempGender(gender) }} className={`rounded drop-shadow ${isSelected ? 'Checked genderSelected' : ''}`} style={{ background: `url(${codeImages[gender]}) no-repeat center` ,filter: "grayscale(100%)", backgroundSize: "cover" , width: "100%"}}>
              </div>
            )
          })
        }
      </div>
        
      <div className="action">
        <button onClick={handleSelectGender} disabled={!tempGender} className="nextButton">Continue</button>
      </div>
    </main>
  );
}
