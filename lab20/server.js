require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const morgan = require('morgan');
const methodOverride = require('method-override');
const createPath = require('./helpers/create-path');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), { title });
});

app.get('/error', (req, res) => {
    const title = 'error';
    res.render(createPath('error'), { title });
});

app.use(postRoutes);
app.use(userRoutes);
app.use(commentRoutes);



app.use(errorHandler);
// app.use((req, res) => {
//     const title = 'Error Page';
//     res
//         .status(404)
//         .render(createPath('error'), { title });
// });