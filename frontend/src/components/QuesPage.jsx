import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate} from "react-router";
import { setCurrentPage, setQuestions } from "../store/searchSlice";
import { axiosInstance } from "../utils/axios";

const QuesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, query, questions, totalQuestions, itemsPerPage } = useSelector(
    (state) => state.search
  );
  const [error,setError]=useState("");
  const { pageId } = useParams();

  useEffect(() => {
    const urlPage = parseInt(pageId, 10) || 1;
    if (urlPage !== currentPage) {
      dispatch(setCurrentPage(urlPage));
    }
  }, [pageId, dispatch, currentPage]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if(query.length==0) return;
        const response = await axiosInstance.get(
          `/questions/get-question-on-title?page=${currentPage}&limit=${itemsPerPage}&query=${query}`
        );
        console.log(response);
        dispatch(setQuestions({ questions: response.data.data.document, total: response.data.data.totalQues }));
      } catch (error) {
        setError(error.response.data.message);
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [currentPage, dispatch, itemsPerPage,query]);

  const handleNext = () => {
    const nextPage = currentPage + 1;
    dispatch(setCurrentPage(nextPage));
    navigate(`/questions/page/${nextPage}?query=${query}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      dispatch(setCurrentPage(prevPage));
      navigate(`/questions/page/${prevPage}?query=${query}`);
    }
  };

  const totalPages = Math.ceil(totalQuestions / itemsPerPage);

  return (
    <div>
      {questions.length>0 && <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <h3>{question.title}</h3>
            <p>Type: {question.type}</p>
          </li>
        ))}
      </ul>}

      {/* Pagination Controls */}
      
      {totalQuestions>itemsPerPage && <div className="pagination-buttons">
        <button onClick={handlePrevious} disabled={currentPage <= 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages}>
          Next
        </button>
      </div>}
    </div>
  );
};

export default QuesPage;
