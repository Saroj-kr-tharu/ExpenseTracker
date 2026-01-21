import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createData } from '../../Redux/Slice/ExpenseSlice';

const Home = () => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [forms, setForms] = useState([
        {
            title: "",
            type: "expense",
            amount: "",
            remarks: "",
            receivedFrom: "",
            givenTo: "",
            description: "",
            isCollapsed: false
        }
    ]);

    const handleInputChange = (index, field, value) => {
        const updatedForms = [...forms];
        updatedForms[index][field] = value;
        setForms(updatedForms);
    };

    const toggleType = (index) => {
        const updatedForms = [...forms];
        updatedForms[index].type = updatedForms[index].type === "income" ? "expense" : "income";
        setForms(updatedForms);
    };

    const toggleCollapse = (index) => {
        const updatedForms = [...forms];
        updatedForms[index].isCollapsed = !updatedForms[index].isCollapsed;
        setForms(updatedForms);
    };

    const addNewForm = () => {
        setForms([...forms, {
            title: "",
            type: "expense",
            amount: "",
            remarks: "",
            receivedFrom: "",
            givenTo: "",
            description: "",
            isCollapsed: false
        }]);
    };

    const deleteForm = (index) => {
        if (forms.length > 1) {
            const updatedForms = forms.filter((_, i) => i !== index);
            setForms(updatedForms);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if all required fields are filled and amounts are valid
        const isValid = forms.every(form => 
            form.title.trim() !== "" && 
            form.amount.trim() !== "" &&
            parseFloat(form.amount) > 0
        );

        if (!isValid) {
            alert("Please ensure all titles are filled and amounts are greater than 0");
            return;
        }

        // Set loading state
        setIsSubmitting(true);
        
        try {
            // Dispatch the action
            await dispatch(createData(forms));

            // Reset form to initial state with single form
            setForms([{
                title: "",
                type: "expense",
                amount: "",
                remarks: "",
                receivedFrom: "",
                givenTo: "",
                description: "",
                isCollapsed: false
            }]);
        } catch (error) {
            console.error("Error submitting forms:", error);
            alert("An error occurred while submitting the forms");
        } finally {
            // Reset loading state
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="flex flex-col items-center py-8">
                <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-300">
                    Expense Tracker
                </h1>

                <form onSubmit={handleSubmit} className="w-full max-w-3xl px-4">
                    {forms.map((form, index) => (
                        <div
                            key={index}
                            className={`relative backdrop-blur-md bg-opacity-10 rounded-xl shadow-lg mb-8 overflow-hidden ${
                                form.type === "income"
                                    ? "bg-emerald-900/30 border border-emerald-500/30"
                                    : "bg-rose-900/30 border border-rose-500/30"
                            }`}
                        >
                            {/* Collapse Toggle Button */}
                            <button
                                type="button"
                                onClick={() => toggleCollapse(index)}
                                className="absolute top-3 left-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-gray-100 transition-all"
                            >
                                {form.isCollapsed ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                    </svg>
                                )}
                            </button>

                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={() => deleteForm(index)}
                                disabled={forms.length === 1}
                                className={`absolute top-3 left-1/2 -translate-x-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full 
                                ${forms.length === 1 
                                    ? 'bg-slate-800/30 text-gray-500 cursor-not-allowed' 
                                    : 'bg-slate-800/50 hover:bg-red-600/50 text-gray-100 hover:text-white'
                                } transition-all`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Toggle Switch */}
                            <div className="absolute top-4 right-4 z-10">
                                <div
                                    className="w-30 h-8 rounded-full bg-slate-800/50 cursor-pointer backdrop-blur-sm"
                                    onClick={() => toggleType(index)}
                                >
                                    <div
                                        className={`h-full w-1/2 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold ${
                                            form.type === "income"
                                                ? "bg-emerald-500 translate-x-full"
                                                : "bg-rose-500 translate-x-0"
                                        }`}
                                    >
                                        {form.type === "income" ? "Income" : "Expense"}
                                    </div>
                                </div>
                            </div>

                            {form.isCollapsed ? (
                                <div className="px-6 py-4 flex items-center justify-between ml-8">
                                    <span className="text-gray-100 font-medium">Form #{index + 1}</span>
                                </div>
                            ) : (
                                <div className="px-6 pb-2 pt-12">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-gray-100 text-sm font-medium mb-2">
                                                Title <span className="text-rose-400">*</span>
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 text-gray-100 border border-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder-gray-400"
                                                value={form.title}
                                                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                                placeholder="Enter title"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-gray-100 text-sm font-medium mb-2">
                                                Amount <span className="text-rose-400">*</span>
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                onWheel={(e) => e.target.blur()}
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 text-gray-100 border border-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder-gray-400"
                                                value={form.amount}
                                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                                placeholder="Enter amount"
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-gray-100 text-sm font-medium mb-2">
                                                {form.type === "income" ? "Received From" : "Given To"}
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 text-gray-100 border border-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder-gray-400"
                                                value={form.type === "income" ? form.receivedFrom : form.givenTo}
                                                onChange={(e) => handleInputChange(index, form.type === "income" ? "receivedFrom" : "givenTo", e.target.value)}
                                                placeholder={`Enter ${form.type === "income" ? "received from" : "given to"} (optional)`}
                                            />
                                        </div>

                                        <div className="col-span-2 sm:col-span-1">
                                            <label className="block text-gray-100 text-sm font-medium mb-2">
                                                Remarks
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 text-gray-100 border border-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder-gray-400"
                                                value={form.remarks}
                                                onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
                                                placeholder="Add remarks (optional)"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-gray-100 text-sm font-medium mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                className="w-full px-4 py-2 rounded-lg bg-slate-800/50 text-gray-100 border border-gray-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all placeholder-gray-400"
                                                value={form.description}
                                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                                placeholder="Add description (optional)"
                                                rows="3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex gap-4 justify-center mt-6">
                        <button
                            type="button"
                            onClick={addNewForm}
                            className="bg-slate-700/50 hover:bg-slate-600/50 text-gray-100 font-semibold py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
                        >
                            <span>Add New</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600/80 hover:bg-blue-500/80 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <span>Submitting...</span>
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </>
                            ) : (
                                <>
                                    <span>Submit</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;