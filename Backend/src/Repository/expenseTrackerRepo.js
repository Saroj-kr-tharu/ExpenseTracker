const { ExpenseTracker } = require("../models/index");
const CurdRepo = require('./curd_repo');

class ExpenseTrackerRepo extends CurdRepo {
  constructor() {
    super(ExpenseTracker);
  }

  async create(data) {
    try {
      const res = await ExpenseTracker.bulkCreate(data);
      return res;
    } catch (error) {
      console.log("Something went wrong in Repo level (create) ");
      throw error;
    }
  }


}


const expenseTrackerRepo = new ExpenseTrackerRepo();

module.exports = expenseTrackerRepo;