import mongoose from "mongoose";

// Interface for environment variables
interface ProcessEnv {
    Mongo_URL: string;
}

// Extending NodeJS.ProcessEnv to include our custom environment variable
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            Mongo_URL: string;
        }
    }
}

// Function to connect to the MongoDB database
export function connectDB(): void {
    const mongoURL = process.env.Mongo_URL;
    if (!mongoURL) {
        throw new Error("Mongo_URL environment variable is not defined");
    }

    mongoose.connect(mongoURL)
        .catch((error) => console.error("Error connecting to MongoDB:", error));

    const db = mongoose.connection;

    db.on("error", () => console.error("Connection error:"));
    db.once("open", () => console.log("DB connected successfully...!"));
}



