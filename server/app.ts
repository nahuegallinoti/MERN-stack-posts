import express from "express";
import postsRoutes from "./routes/posts.routes";
import authRoutes from "./routes/auth.routes";
import specialRoutes from "./routes/special.routes";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "./middlewares/passports";
const app = express();
import { join } from "path";

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);

//routes
app.use(specialRoutes);
app.use(authRoutes);
app.use(postsRoutes);

app.use(express.static(join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../client/build/index.html"));
});

export default app;
