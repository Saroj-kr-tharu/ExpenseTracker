const { ServerErrosCodes, SucessCode } = require('../Utlis/ServerCodes');
const expenseService = require('../Services/ExpenseService');

class ExpenseController {

    async create(req, res) {
        try {


            const data = req.body;
            
            const result = await expenseService.createService(data);

            return res.status(SucessCode.CREATED).json({
                message: "Successfully to Create a expenseConrtoller ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.NOT_IMPLEMENTED).json({
                message: "Failed to Create a Movie",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }


    async update(req, res) {
        try {

            const id = req?.query?.id;
            const data = req.body;

            const result = await expenseService.updateService(id, data);
            return res.status(SucessCode.OK).json({
                message: "Successfully to Update a Payment ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async delete(req, res) {
        try {

            const id = req?.query?.id;

            const result = await expenseService.deleteService(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to delete a paymentMethod ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (create)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async get(req, res) {
        try {

            const id = req?.query?.id;
            const result = await expenseService.getByidService(id);

            return res.status(SucessCode.OK).json({
                message: "Successfully to get a paymentMethod ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get a paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }

    async getALL(req, res) {
        try {

            const result = await expenseService.getAllService();

            return res.status(SucessCode.OK).json({
                message: "Successfully to get all Payment ",
                success: true,
                data: result,
                err: {},
            });

        } catch (error) {
            console.log('Something went wrong in controller (get)');
            return res.status(ServerErrosCodes.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get all paymentMethod",
                success: false,
                data: {},
                err: error.message || error,
            });
        }
    }




}


const expenseController = new ExpenseController();

module.exports = expenseController;