import express from 'express';
import mongoose from 'mongoose';
import Path from 'path';
import { fileURLToPath } from 'url';
import { PORT, mongoDBURL } from './config.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body.
app.use(express.json());

// middleware for handling CORS policy
// option 1: allow all origins
// app.use(cors());
// option 2: allow only specific origins
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = Path.dirname(__filename);

// Serve static files from the frontend directory
app.use(express.static(Path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
    console.log(req);
    // return res.status(200).send('Hello, world!');
    return res.sendFile(Path.join(__dirname, '../frontend/index.html'));
});
 
app.use('/books', bookRoute);

mongoose 
    .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        }); 
    })
    .catch((err) => {
        console.log(err);
    });