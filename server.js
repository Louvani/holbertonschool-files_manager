import express from 'express';

const router = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

//  encode and decode to json url
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', router());

app.listen(port, () => {
  console.log(`is runing in port ${port}`);
});

export default app;
