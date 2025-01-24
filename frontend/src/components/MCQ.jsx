import React from "react";
import { useSelector } from "react-redux";

function MCQ({ ques, idx }) {
  const { currentPage } = useSelector((state) => state.search);
  let quesNo = idx + 1 + (currentPage - 1) * 10;
  return (
    <div className="flex flex-col gap-y-2 shadow-orange-500">
      <h3 className="font-bold">
        Ques{quesNo}
        {": " + ques.title}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {ques.options &&
          ques.options.map((option, idx) => (
            <p key={idx}>
              <span className=" font-medium">
                {String.fromCharCode(idx + 65) + ". "}
              </span>
              {option.text}
            </p>
          ))}
      </div>
    </div>
  );
}

export default MCQ;
