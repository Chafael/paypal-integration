import express from 'express';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log('Incoming request:', req.url);
  next();
});
export default app;
