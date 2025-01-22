import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseForm = ({ setExpenses }) => {
  //..................field validation
  const [errors, setErrors] = useState({});
  const validateConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 5, message: "Title should be at least 5 charactor" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [{ required: true, message: "Please enter an amount" }],
  };
  const validate = (formdata) => {
    const errorMessage = {};
    console.log(Object.entries(formdata));
    Object.entries(formdata).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorMessage[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 5) {
          errorMessage[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorMessage);
    return errorMessage;
  };

  //.....................
  const [expense, setExpense] = useState({
    title: "",
    category: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;
    setExpenses((prev) => [...prev, { ...expense, id: crypto.randomUUID() }]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });

    // const formdata = { ...getFormData(e.target), id: crypto.randomUUID() };
    // setExpenses((prevState) => [...prevState, formdata]);
  };
  const handlChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const getFormData = (form) => {
  //   const formData = new FormData(form);
  //   const data = {};
  //   for (const [key, value] of formData.entries()) {
  //     data[key] = value;
  //   }
  //   return data;
  // };
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handlChange}
        error={errors.title}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handlChange}
        error={errors.category}
        options={["Grocery", "Clothes", "Bills", "Medicine", "Education"]}
        defOption="Select Category"
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handlChange}
        error={errors.amount}
      />

      <button className="add-btn">Add</button>
    </form>
  );
};

export default ExpenseForm;
