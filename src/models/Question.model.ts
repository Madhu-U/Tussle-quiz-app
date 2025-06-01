import mongoose, { Document, models, Schema, Types } from "mongoose";

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  text: string;
  options: string[];
  answer: string;
  category?: string;
}

const QuestionSchema: Schema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  category: { type: String },
});

const QuestionModel =
  models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);

export default QuestionModel;
