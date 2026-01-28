import { useState } from "react";

function Student4() {
  const [visible, setVisible] = useState(true);

  const studentList = [
    { rollNumber: 1, name: "Dev" },
    { rollNumber: 2, name: "Amit" },
    { rollNumber: 3, name: "Sara" }
  ];

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {visible ? "Hide Student" : "Show Student"}
      </button>

      {visible && (
        <>
          {studentList.map((s) => (
            <div key={s.rollNumber}>
              Roll No: {s.rollNumber} <br />
              Name: {s.name}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Student4;
