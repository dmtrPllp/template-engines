require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const morgan = require('morgan');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts')
const phonebookRoutes = require('./routes/phonebook.routes');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.locals.refuse = () => {
    return '/';
}

app.use(expressLayouts)
app.set('layout', './layout/page')
app.set('view engine', 'ejs'); // so you can render('index')


app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${process.env.PORT}`));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.use(phonebookRoutes);

app.use(errorHandler);