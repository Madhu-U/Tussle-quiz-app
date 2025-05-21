import QuestionModel from "@/lib/models/Question.model";
import questionsData from "@/lib/questions.json";
import mongoose from "mongoose";

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
    await mongoose.disconnect();
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seedDatabase();
