import express from "express";
import BodyParser from "body-parser";

import { employeesRouter } from './routes';

const app = express()
const port = 3000;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: true,
}));
app.use('/employees', employeesRouter);

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
})

