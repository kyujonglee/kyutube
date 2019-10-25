import "@babel/polyfill";
import dotenv from 'dotenv';
dotenv.config();

import './db';

import app from './app';

const PORT = process.env.PORT || 4000;

const handleListen = () => console.log(`✅ starting server on http://localhost:${PORT}`)

app.listen(PORT, handleListen)