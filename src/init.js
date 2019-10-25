import "@babel/polyfill";
import dotenv from "dotenv";

import "./db";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListen = () =>
  console.log(`✅ starting server on http://localhost:${PORT}`);

app.listen(PORT, handleListen);
