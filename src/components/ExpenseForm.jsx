import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

const ExpenseForm = ({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
}) => {
  //..................field validation
  const [errors, setErrors] = useState({});
  const validateConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 1, message: "Title should be at least 5 charactor" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      {
        pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
        message: "Please enter a valid number",
      },
    ],
  };
  const validate = (formdata) => {
    const errorMessage = {};
    // console.log(Object.entries(formdata));
    Object.entries(formdata).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorMessage[key] = rule.message;
          return true;
        }
        if (rule.minLength && value.length < 1) {
          errorMessage[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorMessage[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorMessage);
    return errorMessage;
  };

  //.....................

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateResult = validate(expense);
    if (Object.keys(validateResult).length) return;
    if (editingRowId) {
      setExpenses((prevState0) =>
        prevState0.map((singleExpense) => {
          if (singleExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return singleExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }
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
    // if (name === "amount") {
    //   if (/^[0-9]+(\.[0-9]+)?$/.test(value)) {
    //     setExpense((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }));
    //   }
    //   return;
    // }
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

      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;
