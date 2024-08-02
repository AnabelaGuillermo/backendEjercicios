import express from 'express';
import cors from 'cors';
import taskRouter from './routes/routers/taskRouter.js';
import colorRouter from './routes/routers/colorRouter.js';

import "./database/database.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/tasks', taskRouter);
app.use('/colors', colorRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
