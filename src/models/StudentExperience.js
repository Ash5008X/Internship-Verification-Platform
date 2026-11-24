import mongoose from "mongoose";

const studentExperienceSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        internshipId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Internship",
            default: null,
        },
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
            index: true,
        },
        employmentStatus: {
            type: String,
            enum: [
                "applied",
                "interviewed",
                "offered",
                "interned",
                "completed",
                "rejected",
                "withdrawn",
            ],
            required: true,
        },
        experience: {
            type: String,
            required: true,
            trim: true,
            maxlength: 5000,
        },
        improvements: {
            type: String,
            trim: true,
            maxlength: 2000,
            default: "",
        },
        recruiterReply: {
            type: String,
            trim: true,
            maxlength: 3000,
            default: "",
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            default: null,
        },
        moderationStatus: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "approved",
            index: true,
        },
    },
    { timestamps: true }
);

studentExperienceSchema.index({
    companyId: 1,
    moderationStatus: 1,
    createdAt: -1,
});

const StudentExperience =
    mongoose.models.StudentExperience ||
    mongoose.model("StudentExperience", studentExperienceSchema);

export default StudentExperience;