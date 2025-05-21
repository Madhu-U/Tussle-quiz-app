import mongoose, { models, Schema } from "mongoose";

const questionsData = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    category: "Geography",
  },
  {
    id: 2,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    category: "Math",
  },
  {
    id: 3,
    text: "What color is the sky on a clear day?",
    options: ["Green", "Blue", "Red", "Yellow"],
    answer: "Blue",
    category: "General",
  },
  {
    id: 4,
    text: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    category: "Geography",
  },
  {
    id: 5,
    text: "What is 5 * 3?",
    options: ["12", "15", "18", "20"],
    answer: "15",
    category: "Math",
  },
];

const QuestionSchema = new Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  category: { type: String },
});

const QuestionModel =
  models.Question || mongoose.model("Question", QuestionSchema);

const DB_URI = process.env.MONGO_URI;

if (!DB_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Delete existing questions
    await QuestionModel.deleteMany({});
    console.log("Existing questions deleted");

    await QuestionModel.insertMany(questionsData);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};
seedDatabase();
