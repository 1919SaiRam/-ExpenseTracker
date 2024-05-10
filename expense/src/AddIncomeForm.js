import React, { useState } from 'react';
import './AddIncomeForm.css'; 

const AddIncomeForm = ({ addIncome , setShowAddIncomeForm  }) => { // Corrected function name in props
  const [formData, setFormData] = useState({
    income: ''
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
      addIncome(formData);
      setFormData({
        income: ''
      });
      setShowAddIncomeForm(false); // Hide form after adding income
    }
  };

  const handleCancel = () => {
    // setFormData({
    //   income: ''
    // });
    setShowAddIncomeForm(false); // Hide form when cancel button is clicked
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.income) {
      errors.income = "Income amount is required"; // Fixed error message
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div id="addIncomeForm">
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit}>
        <div className="detailsofincome-info"> {/* Added className for styling */}
          <div>
            <label htmlFor="income"></label> {/* Added label text */}
            <input type="number" id="income" name="income" value={formData.income} onChange={handleChange} placeholder="Income Amount" required /> {/* Fixed input field */}
            {errors.income && <p id="error">{errors.income}</p>}
          </div>
        </div>
        <div className="button-container"> {/* Added className for styling */}
          <button type="submit">Add Income</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddIncomeForm;
