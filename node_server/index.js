const express = require('express');
const userRouter = require('./routes/date.routes');
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json);

app.use('./data', userRouter);

app.listen(PORT, () => console.log(`working on port ${PORT}`));
