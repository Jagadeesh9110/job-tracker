const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "interview", "rejected", "offer", "accepted"], // Job application status
      default: "applied", // Default status is "applied"
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
      min: [0, "Salary must be a positive number"], // Ensures salary is positive
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      default: "full-time",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applicationDeadline: {
      type: Date,
      validate: {
        validator: (value) => value >= Date.now(),
        message: "Application deadline cannot be in the past",
      },
    },
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Job", jobSchema);
