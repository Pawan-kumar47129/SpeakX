import React from "react";
import { useSelector } from "react-redux";

function ReadOnly({ ques, idx }) {
  const { currentPage } = useSelector((state) => state.search);
  let quesNo = idx + 1 + (currentPage - 1) * 10;
  return (
    <div className="flex flex-col gap-y-2">
      <p>{ques.type}</p>
      <h3 className="font-medium">
        Ques{quesNo}
        {": " + ques.title}
      </h3>
    </div>
  );
}

export default ReadOnly;
