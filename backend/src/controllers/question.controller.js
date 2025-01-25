import { Question } from "../models/question.models.js";

export const filterBaseOnType = async (req, res) => {
  try {
    let { query, page = "1", limit = "10" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    console.log(req.query);
    const response = await Question.aggregate([
      {
        $match: { type: { $regex: query, $options: "i" } },
      },
      {
        $facet: {
          totalQues: [{ $count: "count" }],
          documents: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                type: 1,
                title: 1,
                options: 1,
                blocks: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalQues: { $first: "$totalQues.count" },
        },
      },
    ]);
    if (response.length > 0)
      return res.status(200).json({
        success: true,
        message: "Data get successfully",
        data: response[0],
      });
    else
      return res.status(404).json({
        success: false,
        message: "Data not found please search to releted quetion",
      });
  } catch (error) {
    console.log("", error.message);
    res.status(500).json({
      success: false,
      message: "Server side error occure while fetching data",
    });
  }
};

export const searchBaseOnTitle = async (req, res) => {
  try {
    let { query, page = "1", limit = "10",filter } = req.query;
    filter=filter?.split(',')||[];
    page = parseInt(page);
    limit = parseInt(limit);
    console.log(req.query);
    const response = await Question.aggregate([
      {
        $match: {
          $and: [
            ...(query ? [{ title: { $regex:query,$options:'i' } }] : []),
            ...(filter.length ? [{ type: { $in: filter } }] : []),
          ],
        },
      },
      {
        $facet: {
          totalQues: [{ $count: "count" }],
          document: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                type: 1,
                title: 1,
                options: 1,
                blocks: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          totalQues: { $first: "$totalQues.count" },
        },
      },
    ]);
    if (response.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data get successfully",
        data: response[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Data not found please search to releted quetion",
      });
    }
  } catch (error) {
    console.log("some error occure while fetching data", error);
    res.status(500).json({
      success: false,
      message: "Server side error occure while fetching data",
    });
  }
};
