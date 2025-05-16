const express = require("express");
const router = express.Router();

const expenseController = require('../../Controllers/expenseController');

router.get('/info', async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Welcome home',
            success: true,
            data: {},
            err: {}
        });
    } catch (error) {
        console.log("Something went wrong in v1/index.js routing ");
        // throw error;
        return res.status(500).json({
            message: 'Welcome home',
            success: true,
            data: {},
            err: {}
        });

    }
})



router.post('/create',  expenseController.create);
router.get('/get',  expenseController.get);
router.get('/getAll', expenseController.getALL);
router.delete('/del',  expenseController.delete);
router.patch('/update',  expenseController.update);

// router.get


module.exports = router;