import nextEnv from "@next/env";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { readFileSync } from "node:fs";

const { loadEnvConfig } = nextEnv;

const testAccounts = JSON.parse(
    readFileSync(new URL("../data/test-accounts.json", import.meta.url), "utf8")
);

loadEnvConfig(process.cwd());

const { connectDB } = await import("../src/config/db.js");
const User = (await import("../src/models/User.js")).default;
const Company = (await import("../src/models/Company.js")).default;

const PASSWORD_ROUNDS = 12;

async function upsertUser({ name, email, password, role, profile, recruiterProfile }) {
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail }).select("role");

    if (existingUser && existingUser.role !== role) {
        throw new Error(
            `Cannot seed ${normalizedEmail}: existing role is "${existingUser.role}", expected "${role}".`
        );
    }

    const passwordHash = await bcrypt.hash(password, PASSWORD_ROUNDS);

    const user = await User.findOneAndUpdate(
        { email: normalizedEmail },
        {
            $set: {
                name,
                email: normalizedEmail,
                passwordHash,
                role,
                status: "active",
                ...(profile ? { profile } : {}),
                ...(recruiterProfile ? { recruiterProfile } : {}),
            },
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );

    return user;
}

async function seed() {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing. Add it to .env.local in the project root.");
    }

    if (!Array.isArray(testAccounts.recruiters) || !Array.isArray(testAccounts.students)) {
        throw new Error("Invalid data/test-accounts.json format.");
    }

    console.log("Connecting to MongoDB...");
    await connectDB();

    let recruiterCount = 0;
    let studentCount = 0;

    console.log("Seeding recruiter accounts...");

    for (const recruiter of testAccounts.recruiters) {
        const user = await upsertUser({
            name: recruiter.name,
            email: recruiter.email,
            password: recruiter.password,
            role: "recruiter",
            recruiterProfile: {
                jobTitle: recruiter.jobTitle,
            },
        });

        const normalizedName = recruiter.companyName
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

        await Company.findOneAndUpdate(
            { normalizedName },
            {
                $set: {
                    name: recruiter.companyName,
                    normalizedName,
                    website: `https://${recruiter.domain}`,
                    domain: recruiter.domain.toLowerCase(),
                    description: `${recruiter.companyName} is a fictional organization created for InternCheck development and testing.`,
                    industry: "Technology",
                    headquarters: {
                        city: recruiter.city,
                        state: "",
                        country: "India",
                    },
                    contactEmail: recruiter.email.toLowerCase(),
                    createdBy: user._id,
                },
                $setOnInsert: {
                    identityStatus: "unverified",
                },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true,
            }
        );

        recruiterCount += 1;
    }

    console.log("Seeding student accounts...");

    for (const student of testAccounts.students) {
        await upsertUser({
            name: student.name,
            email: student.email,
            password: student.password,
            role: "student",
            profile: {
                college: student.college,
                degree: student.degree,
                graduationYear: student.graduationYear,
                skills: [student.specialization],
                bio: `Fictional InternCheck test student based in ${student.city}.`,
            },
        });

        studentCount += 1;
    }

    console.log("\nSeed completed successfully.");
    console.log(`Recruiter accounts: ${recruiterCount}`);
    console.log(`Company profiles:   ${recruiterCount}`);
    console.log(`Student accounts:   ${studentCount}`);
    console.log(`Total users:        ${recruiterCount + studentCount}`);
    console.log("\nPasswords are hashed with bcrypt before being stored.");
    console.log("The source passwords are in data/test-accounts.json. Keep this file out of public repos.");
}

try {
    await seed();
} catch (error) {
    console.error("\nSeed failed:", error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect().catch(() => {});
}
