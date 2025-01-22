import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "type is required"],
    },
    anagramType: String,
    blocks: [
      {
        text: String,
        showInOption: Boolean,
        isAnswer: Boolean,
      },
    ],
    options: [
      {
        text: String,
        isCorrectAnswer: Boolean,
      },
    ],
    title: {
      type: String,
      required: [true, "Each question must have a title"],
    },
    solution:{type:String}
    ,
    siblingId: { type: Schema.Types.ObjectId, ref: "Question" },
  },
  { timestamps: true, versionKey: false }
);

questionSchema.index({ type: 'text', title: 'text' });

export const Question = mongoose.model("Question", questionSchema);
