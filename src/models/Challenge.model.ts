import mongoose, { Model, models, Schema, Types } from "mongoose";

export interface IChallenge extends mongoose.Document {
  _id: Types.ObjectId;
  originalScore: number;
  questionIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ChallengeSchema: Schema<IChallenge> = new Schema(
  {
    originalScore: {
      type: Number,
      required: true,
    },
    questionIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const ChallengeModel =
  (models.Challenge as Model<IChallenge>) ||
  mongoose.model<IChallenge>("Challenge", ChallengeSchema);
export default ChallengeModel;
