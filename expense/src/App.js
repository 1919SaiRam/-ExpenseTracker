import React, { useState, useEffect } from 'react';
import './App.css';
import PieChartWithCustomizedLabel from './PieChartWithCustomizedLabel';
import AddExpenseForm from './AddExpenseForm';
import AddIncomeForm from './AddIncomeForm';

const App = () => {
  const [walletBalance, setWalletBalance] = useState(4500);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(500);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const data = [
    { name: 'Entertainment', value: 70 }, // 70%
    { name: 'Food', value: 30 },          // 30%
    { name: 'Travel', value: 10 },        // 10%
  ];

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
            <h2>Wallet Balance: <span style={{ color: '#9DFF5B' }}>₹{walletBalance}</span></h2>
            <button className="add-income-button" onClick={() => setShowIncomeForm(true)}>Add Income</button>
            {showIncomeForm && <AddIncomeForm addIncome={addIncome} setShowAddIncomeForm={setShowIncomeForm} />}
          </div>
          <div className="expense-info">
            <h2>Expenses:<span style={{ color: '#F4BB4A' }}>₹{totalExpenses}</span> </h2>
            <button className="add-expense-button" onClick={() => setShowAddExpenseForm(true)}>Add Expense</button>
            {showAddExpenseForm && <AddExpenseForm addExpense={addExpense} setShowAddExpenseForm={setShowAddExpenseForm} />}
          </div>

          <div className="pie-chart-container">
            <p>PieChartWithCustomizedLabel</p>
            <PieChartWithCustomizedLabel data={data} />
            <div className="chart-labels">
              <div className="label blue">
              <div className="small-boxfood"></div>
                Food</div>
              <div className="label orange">
              <div className="small-boxentertain"></div>
                Entertainment</div>
              <div className="label yellow">
              <div className="small-boxtravel"></div>
                Travel</div>
            </div>
          </div>
        </div>

        <div className="recent-transactions-container">
          <h2>Recent Transactions</h2> 
          <div className="transaction">
            <div className="transaction-left">
            <div class="symbol">⚡</div>
               <p>Samosa</p>
               <p  style={{ color: '#9B9B9B' }} >March 20, 2024</p>
            </div>
            <div className="transaction-right">
               <p>₹150</p>
               <div class="sym">❌</div>
               <div class="symb">✏️</div>
            </div>
          </div>

          <div className="transaction">
             <div className="transaction-left">
             <div class="symbol">🎁</div>
                <p>Movie</p>
                <p style={{ color: '#9B9B9B' }}>March 21, 2024</p>
              </div>
             <div className="transaction-right">
                 <p>₹300</p>
                 <div class="sym">❌</div>
                 <div class="symb">✏️</div>
             </div>
          </div>

          <div className="transaction">
              <div className="transaction-left">
              <div class="symbol">🚗</div>
                 <p>Auto</p>
                 <p  style={{ color: '#9B9B9B' }} >March 22, 2024</p>
              </div>
              <div className="transaction-right">
                <p>₹50</p>
                <div class="sym">❌</div>
                <div class="symb">✏️</div>
              </div>
              </div>

              <div className="button-container">
            <button className="arrow-buttonleft" >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="arrow-button" >
                 1
            </button>
            <button className="arrow-buttonright" >
               <i className="fas fa-chevron-right"></i>
            </button>
          </div>


        </div>

            <div className="top-expenses-container">
                <h2>Top Expenses</h2>
              <div className="bar-chart">
                    {data.map((expense, index) => (
              <div
                   key={index}
                   className={`expense-bar ${expense.name.toLowerCase()}`}
                   style={{ width: `${expense.value}%` }}
               >
             <div className="expense-labels">
                      <p>{expense.name}</p>
              </div>
            </div>
                ))}
             </div>
          </div>

      </section>
    </div>
  );
};

export default App;
