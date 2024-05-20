import React, { useState } from 'react';
import './AddExpenseForm.css';

const AddExpenseForm = ({ addExpense, setShowAddExpenseForm, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    dob: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addExpense({ ...formData, amount: parseFloat(formData.price) });
      setFormData({
        title: '',
        price: '',
        category: '',
        dob: ''
      });
      setShowAddExpenseForm(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      dob: ''
    });
    setShowAddExpenseForm(false);
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (!formData.price) {
      errors.price = "Price is required";
      isValid = false;
    } else if (isNaN(formData.price) || formData.price <= 0) {
      errors.price = "Price should be a positive number";
      isValid = false;
    }

    if (!formData.category) {
      errors.category = "Category is required";
      isValid = false;
    }

    if (!formData.dob.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      errors.dob = "Date of Birth should be in dd/mm/yyyy format";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div id="addExpensesForm">
      <h2>{isEdit ? 'Edit Expenses' : 'Add Expenses'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="detailsofexpense-info">
          <div>
            <label htmlFor="title"></label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            {errors.title && <p id="error">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="price"></label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            {errors.price && <p id="error">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="category"></label>
            <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
            {errors.category && <p id="error">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="dob"></label>
            <input type="text" id="dob" name="dob" pattern="\d{2}/\d{2}/\d{4}" value={formData.dob} onChange={handleChange} placeholder="dd/mm/yyyy" required />
            {errors.dob && <p id="error">{errors.dob}</p>}
          </div>
        </div>
        <div className="button-container">
          <button type="submit">{isEdit ? 'Add Expense' : 'Add Expense'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
