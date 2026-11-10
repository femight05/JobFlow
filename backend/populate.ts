import "dotenv/config";

import connectDB from "./src/config/connect.ts";
import Application from "./src/models/applicationModel.ts";

import jsonApplication from "./products.json" with { type: "json" };

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost/jobtracker");
    await Application.deleteMany();
    const applications = jsonApplication.map(
      ({ appliedDate, ...application }) => ({
        ...application,
        appliedDate: new Date(appliedDate),
      }),
    );

    await Application.insertMany(applications);

    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
