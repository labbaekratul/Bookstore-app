import express from "express";
import cors from "cors";
import connectDatabase from "../src/utils/connectionDB";
import bookRouter from "./routes/bookRouter";
import transactionRouter from "./routes/transactionRouter";
import swaggerDocs from "./utils/swagger";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: true }));

// API END-POINTS
app.use("/api/book", bookRouter);
app.use("/api/tansaction", transactionRouter);

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDatabase();
  swaggerDocs(app, PORT);
});
