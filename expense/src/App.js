import React, { useState, useEffect } from 'react';
import './App.css';
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel'; // Import the component


const App = () => {
  const [walletBalance, setWalletBalance] = useState(4500);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(500);

  useEffect(() => {
    // Load expenses from localStorage on component mount
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (savedExpenses.length > 0) {
      setExpenses(savedExpenses);

      // Calculate total expenses
      const total = savedExpenses.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalExpenses(total);
    }
  }, []);

  useEffect(() => {
    // Update localStorage when expenses state changes
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Calculate total expenses
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpenses(total);
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setWalletBalance(walletBalance - expense.amount);
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
      <section className="main-container">
        <div className="info-container">
  <div className="wallet-info">
    <p>Wallet Balance: ₹{walletBalance}</p>
    <button onClick={() => addIncome(1000)}>+ Add Income</button>
  </div>
  <div className="expense-info">
    <p>Expenses: ₹{totalExpenses}</p>
    <button onClick={() => addExpense({ title: 'New Expense', amount: 500, date: new Date() })}>+ Add Expense</button>
  </div>
  <div className="pie-chart-container">
    {/* Placeholder for PieChartWithCustomizedLabel component */}
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
          {/* Placeholder for RecentTransactions component */}
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
        <div className="top-expenses-container">
          {/* Placeholder for TopExpenses component */}
          <p>TopExpenses</p>
          <div className="bar-chart">
            {/* Placeholder for bar chart */}
          </div>
          <div className="expense-labels">
            <p>Entertainment</p>
            <p>Food</p>
            <p>Travel</p>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default App;
