import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams} from "react-router";
import { setCurrentPage, setQuery, setQuestions } from "../store/searchSlice";
import { axiosInstance } from "../utils/axios";
import MCQ from "./MCQ";
import Anagram from "./Anagram";
import ReadOnly from "./ReadOnly";

const QuesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, query, questions, totalQuestions, itemsPerPage } = useSelector(
    (state) => state.search
  );
  const [error,setError]=useState("");
  const {pageId} = useParams();
 
  const [searchParams,setSearchParams]=useSearchParams();
  const queryUrl=searchParams.get('query');

  console.log(queryUrl);

  useEffect(() => {
    console.log("hqqq")
    const urlPage = parseInt(pageId, 10) || 1;
    if (urlPage !== currentPage) {
      dispatch(setCurrentPage(urlPage));
    }
    if(queryUrl && queryUrl!==query){
      dispatch(setQuery(queryUrl));
    }
  }, []);

  useEffect(() => {
    const controller=new AbortController();
    const fetchQuestions = async () => {
      try {
        if(query.length==0) return;
        const response = await axiosInstance.get(
          `/questions/get-question-on-title?page=${currentPage}&limit=${itemsPerPage}&query=${query}`
        ,{signal:controller.signal});
        console.log(response);
        dispatch(setQuestions({ questions: response.data?.data.document, total: response.data?.data.totalQues }));
      } catch (error) {
        setError(error.response?.data?.message);
      }
    };
    fetchQuestions();

    return ()=>controller.abort()

  }, [currentPage, dispatch, itemsPerPage,query]);

  const handleNext = () => {
    const nextPage = parseInt(currentPage) + 1;
    dispatch(setCurrentPage(nextPage));
    navigate(`/questions/page/${nextPage}?query=${query}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = parseInt(currentPage) - 1;
      dispatch(setCurrentPage(prevPage));
      navigate(`/questions/page/${prevPage}?query=${query}`);
    }
  };

  const totalPages = Math.ceil(totalQuestions / itemsPerPage);

  return (
    <div className="flex flex-col justify-center sm:mx-4 md:mx-8 lg:mx-10 p-4 mt-8 items-center">
      {error && <p>{error}</p>}
      
      {questions.length>1 && <div className="flex flex-col gap-4 ">
        {questions.map((question,idx)=>{
          if(question.type=="MCQ") return <MCQ key={idx}ques={question} idx={idx}/>
          else if(question.type=="ANAGRAM") return <Anagram key={idx} ques={question} idx={idx}/>
          else{
            return <ReadOnly key={idx}ques={question} idx={idx} />
          }
        })}
      </div>}
      
      
      {totalQuestions>itemsPerPage && <div className="flex space-x-2  justify-center my-4">
        <button onClick={handlePrevious} disabled={currentPage <= 1} className={ `cursor-pointer underline text-blue-400 hover:text-orange-600 ${currentPage==1?"hidden":"inline-block"}`}>
          Previous
        </button>
        <span className="text-pretty">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages} className=" cursor-pointer underline text-blue-400 hover:text-orange-600">
          Next
        </button>
      </div>}
    </div>
  );
};

export default QuesPage;
