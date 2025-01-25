import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams} from "react-router";
import { setCurrentPage, setFilter, setQuery, setQuestions } from "../store/searchSlice";
import { axiosInstance } from "../utils/axios";
import MCQ from "./MCQ";
import Anagram from "./Anagram";
import ReadOnly from "./ReadOnly";
import Loading from "./Loading";

const QuesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPage, query, questions, totalQuestions, itemsPerPage,filters } = useSelector(
    (state) => state.search
  );
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    const controller=new AbortController();
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        if(query && filters.length==0)return;
        const response = await axiosInstance.get(
          `/api/v1/questions/get-question-on-title?page=${currentPage}&limit=${itemsPerPage}&query=${query}&filter=${filters.join(',')}`
        ,{signal:controller.signal});
        dispatch(setQuestions({ questions: response.data?.data.document, total: response.data?.data.totalQues }));
      } catch (error) {
        setError(error.response?.data?.message);
      }finally{
        setLoading(false);
      }
    };
    fetchQuestions();

    return ()=>controller.abort()

  }, [currentPage,dispatch, itemsPerPage,query,filters]);

  const handleNext = () => {
    const nextPage = parseInt(currentPage) + 1;
    dispatch(setCurrentPage(nextPage));
    navigate(`/questions/page/${nextPage}?query=${query}&filter=${filters.join(',')}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = parseInt(currentPage) - 1;
      dispatch(setCurrentPage(prevPage));
      navigate(`/questions/page/${prevPage}?query=${query}&filter=${filters.join(',')}`);
    }
  };

  const totalPages = Math.ceil(totalQuestions / itemsPerPage);
  if(loading) return <Loading/>
  return (
    <div className="flex flex-col justify-center sm:mx-4 md:mx-8 lg:mx-10 p-4 mt-8 items-center">
      {error && <p>{error}</p>}
      
      {questions.length>0 && <div className="flex flex-col gap-4 ">
        {questions.map((question,idx)=>{
          if(question.type=="MCQ") return <MCQ key={idx}ques={question} idx={idx}/>
          else if(question.type=="ANAGRAM") return <Anagram key={idx} ques={question} idx={idx}/>
          else{
            return <ReadOnly key={idx}ques={question} idx={idx} />
          }
        })}
      </div>}
      
      
      {totalQuestions>itemsPerPage && <div className="flex space-x-2  justify-center my-4 items-center">
        <button onClick={handlePrevious} disabled={currentPage <= 1} className={ `cursor-pointer bg-blue-400 px-2 py-1 rounded-md hover:text-orange-600 ${currentPage==1?"hidden":"inline-block"}`}>
          Previous
        </button>
        <span className="text-pretty">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage >= totalPages} className=" cursor-pointer bg-blue-400 px-2 py-1 rounded-md hover:text-orange-600">
          Next
        </button>
      </div>}
    </div>
  );
};

export default QuesPage;
