import express from 'express';
import cors from 'cors';

import TaskRoutes from './routes/TaskRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/task', TaskRoutes);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
