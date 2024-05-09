import React, { useState } from 'react';

const AddExpenseForm = ({ addExpense }) => {
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
      addExpense(formData);
      setFormData({
        title: '',
        price: '',
        category: '',
        dob: ''
      });
    }
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
    <div id="addExpensesForm" style={{ 
      position: 'absolute',
      width: '538px',
      height: '335px',
      top: '259px',
      left: '371px',
      gap: '0px',
      borderRadius: '15px',
      opacity: '1',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>
        <div>
          <label htmlFor="dob">DOB (dd/mm/yyyy)</label>
          <input type="text" id="dob" name="dob" pattern="\d{2}/\d{2}/\d{4}" value={formData.dob} onChange={handleChange} required />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>
        <button type="submit">Add Expense</button>
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
