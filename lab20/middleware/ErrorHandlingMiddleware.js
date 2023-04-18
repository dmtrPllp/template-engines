const ApiError=require('../error/ApiError');
const chalk = require('chalk');
const createPath = require('../helpers/create-path');

const errorMsg = chalk.bgKeyword('white').redBright;

module.exports=function(err,req,res,next){
    if(err instanceof ApiError){
        console.log(errorMsg(err));
        const title = 'Error Page';
        res.status(err.status).json({message: err.message});
    }
    console.log(err);
    return res.status(500).json({message:"Unforseen error!"});
}

