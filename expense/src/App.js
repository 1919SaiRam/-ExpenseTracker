import React, { useState, useEffect } from 'react';
import './App.css';
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm'; // Import AddIncomeForm

const App = () => {
  const [walletBalance, setWalletBalance] = useState(4500);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(500);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false); // Corrected variable name

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (savedExpenses.length > 0) {
      setExpenses(savedExpenses);
      const total = savedExpenses.reduce((acc, expense) => {
        if (expense && typeof expense.amount === 'number') {
          return acc + expense.amount;
        } else {
          return acc;
        }
      }, 0);
      setTotalExpenses(total);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    const total = expenses.reduce((acc, expense) => {
      if (expense && typeof expense.amount === 'number') {
        return acc + expense.amount;
      } else {
        return acc;
      }
    }, 0);
    setTotalExpenses(total);
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
    setShowAddExpenseForm(false);
  };

  const addIncome = (income) => {
    setWalletBalance(walletBalance + income);
  };

  return (
    <div className="App">
      <div className="header-container">
        <div className="dots">
          <div className="dot red"></div>
          <div className="dot orange"></div>
          <div className="dot green"></div>
        </div>
        <header>
          <h1>Expense Tracker</h1>
        </header>
      </div>
      <section className="main-container">
        <div className="info-container">
          <div className="wallet-info">
            <p>Wallet Balance: ₹{walletBalance}</p>
            <button onClick={() => setShowIncomeForm(true)}>+ Add Income</button>
            {/* {showIncomeForm && <AddIncomeForm addIncome={addIncome} />} */}
            {showIncomeForm && <AddIncomeForm addIncome={addIncome} setShowAddIncomeForm={setShowIncomeForm} />} {/* Render income form conditionally */}
          </div>
          <div className="expense-info">
            <p>Expenses: ₹{totalExpenses}</p>
            <button onClick={() => setShowAddExpenseForm(true)}>+ Add Expense</button>
            {/* {showAddExpenseForm && <AddExpenseForm addExpense={addExpense} />} */}
            {showAddExpenseForm && <AddExpenseForm addExpense={addExpense} setShowAddExpenseForm={setShowAddExpenseForm} />} {/* Render expense form conditionally */}
          </div>
          <div className="pie-chart-container">
            <p>PieChartWithCustomizedLabel</p>
            <PieChartWithCustomizedLabel />
            <div className="chart-labels">
              <div className="label blue"></div>
              <div className="label orange"></div>
              <div className="label yellow"></div>
            </div>
          </div>
        </div>

        <div className="recent-transactions-container">
          <p>RecentTransactions</p>
          <div className="transaction">
            <p>Samosa</p>
            <p>₹150</p>
            <p>March 20, 2024</p>
          </div>
          <div className="transaction">
            <p>Movie</p>
            <p>₹300</p>
            <p>March 21, 2024</p>
          </div>
          <div className="transaction">
            <p>Auto</p>
            <p>₹50</p>
            <p>March 22, 2024</p>
          </div>
        </div>
        {/* <div className="top-expenses-container">
          <p>TopExpenses</p>
          <div className="bar-chart"></div>
          <div className="expense-labels">
            <p>Entertainment</p>
            <p>Food</p>
            <p>Travel</p>
          </div>
        </div> */}
        <div className="top-expenses-container">
          <p>Top Expenses</p>
              <div className="bar-chart">
                 <div className="expense-bar food" style={{ width: `${(totalExpenses / walletBalance) * 100}%` }}></div>
                 <div className="expense-bar entertainment" style={{ width: `${(totalExpenses / walletBalance) * 100}%` }}></div>
                 <div className="expense-bar travel" style={{ width: `${(totalExpenses / walletBalance) * 100}%` }}></div>
              </div>
        <div className="expense-labels">
         <p>Food</p>
         <p>Entertainment</p>
         <p>Travel</p>
           </div>
         </div>
      </section>
    </div>
  );
};

export default App;
