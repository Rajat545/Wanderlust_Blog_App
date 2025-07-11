import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
const app = express();
const port = process.env.PORT || 5000;


// ✅ Configure CORS with specific origin from env
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://3.109.32.205:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(compression());

// Connect to database
connectDB();

// API route
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Yay!! Backend of wanderlust app is now accessible ');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
