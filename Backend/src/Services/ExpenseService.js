const expenseTrackerRepo = require('../Repository/expenseTrackerRepo')
const Service  = require('./CURD-Service')

class ExpenseService extends Service { 

    constructor(){
        super(expenseTrackerRepo);
    }

}; 

const expenseService = new ExpenseService();
module.exports = expenseService