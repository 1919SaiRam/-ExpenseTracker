import React, { useState } from 'react';
import './EditExpensesForm.css';  

const EditExpensesForm = ({ editExpense ,  setShowEditExpenseForm }) => {
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

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//         editExpense(formData);
//       setFormData({
//         title: '',
//         price: '',
//         category: '',
//         dob: ''
//       });
//       setShowEditExpenseForm(false) ; //to hide add expense 
//     }
//   };
const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      editExpense(formData);
      setFormData({
        title: '',
        price: '',
        category: '',
        dob: ''
      });
      setShowEditExpenseForm(false); // to hide add expense
    }
  };
  

  const handleCancel = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      dob: ''
    });
    setShowEditExpenseForm(false) ; //to hide by  click cancel 
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
    <div id="editExpensesForm">
      <h2>Edit Expense</h2>
      <form onSubmit={handleSubmit}>
      <div  class = "detailsofexpenses-info">
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
          {/* <select id="category" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required > */}
            {/* <option value=""></option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Utilities">Utilities</option> */}
          {/* </select> */}
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
          <button type="submit">Add Expense</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditExpensesForm;
