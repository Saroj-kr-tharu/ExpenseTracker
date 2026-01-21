import { configureStore } from "@reduxjs/toolkit";

import expenseSliceReducer from '../Redux/Slice/ExpenseSlice';


export default configureStore({
    reducer: {
        expense: expenseSliceReducer,

    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});