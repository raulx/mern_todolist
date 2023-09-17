import express from "express";
import path from "path";
// import cors from "cors";
import userRoute from "./routes/userRoute.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;

connectDB();
app.use(cookieParser());
// const corsOptions = {
//   origin: "http://localhost:7163",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoute);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "api connected successfully." });
// });

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(
    express.static(path.join(__dirname, "/frontend/todolist_frontend/dist"))
  );

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "frontend/todolist_frontend",
        "dist",
        "index.html"
      )
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use((err, req, res, next) => {
  res.json({ status: res.statusCode, message: err.message });
});
app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
