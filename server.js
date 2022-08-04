import express from 'express';
import cors from 'cors';
import furniture from './api/furniture.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/furniture", furniture);
app.use('*', (req, res) => {
    res.status(404).json({error: "not found"});
})

export default app;
