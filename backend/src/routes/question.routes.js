import express from "express";
import { filterBaseOnType, searchBaseOnTitle } from "../controllers/question.controller.js";

const Router=express.Router({mergeParams:true});

Router.route("/get-question-on-type").get(filterBaseOnType);
Router.route("/get-question-on-title").get(searchBaseOnTitle);


export default Router;