import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './backend/routes/post.routes.js';

const app = express();
dotenv.config();
 
const mongoURI = process.env.MONGO_URI; 
if (!mongoURI) {
    console.error("MONGO_URI is not defined in .env file");
    process.exit(1);
}
app.use(postRoutes)
app.get('/', (req, res) => {
    res.send('Hello World 2 ss!'); 
});


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