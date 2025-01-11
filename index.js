import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './backend/routes/post.routes.js';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

const mongoURI = process.env.MONGO_URI; 
if (!mongoURI) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}
app.use(cors());
app.use("/api/posts", postRoutes)
app.get('/api', (req, res) => {
    res.send('Hello World 2 ss!'); 
});

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});