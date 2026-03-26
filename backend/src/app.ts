import "dotenv/config";
import express from "express";
import { setupSwagger } from "./config/swagger";
import mainRoute from "./modules/index.route";

const app = express();

// app.use(cors());

// Parse JSON bodies (from POST/PUT requests)
app.use(express.json());

// Parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// importing swagger
setupSwagger(app);

//  import porting the main entry point
app.use("/api/v1/", mainRoute);

export default app;
