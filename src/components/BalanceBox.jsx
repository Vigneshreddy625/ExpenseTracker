import React, { useEffect } from "react";
import { useState } from "react";
import HistoryBox from "./History";

function BalanceBox() {
  const [inpnum, setInpnum] = useState(0);
  const [transaction, setTransaction] = useState("");
  const [balance, setBalance] = useState(0);
  const [Income, setIncome] = useState(0);
  const [Expense, setExpense] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(()=>{
    const storedTransactions = JSON.parse(localStorage.getItem("transactionHistory"));
    if (storedTransactions) {
      setTransactionHistory(storedTransactions);
      let initialBalance = 0;
      let initialIncome = 0;
      let initialExpense = 0;
      storedTransactions.forEach(transaction => {
        initialBalance += transaction.inpnum;
        if(transaction.inpnum >=0){
          initialIncome += transaction.inpnum;
        } else {
          initialExpense += transaction.inpnum;
        } 
      });
      setBalance(initialBalance);
      setIncome(initialIncome);
      setExpense(initialExpense);
    }
  },[])

  const add = (e) => {
    e.preventDefault();
    if (inpnum !== 0) {
      if (inpnum >= 0) {
        setBalance((prevBalance) => prevBalance + inpnum);
        setIncome((prevIncome) => prevIncome + inpnum);
      } else if (inpnum < 0) {
        setBalance((prevBalance) => prevBalance - Math.abs(inpnum));
        setExpense((prevExpense) => prevExpense - inpnum);
      }
      const newTransaction = { transaction, inpnum };
      const updatedTransactionHistory = [...transactionHistory, newTransaction];
      setTransactionHistory(updatedTransactionHistory);
      localStorage.setItem("transactionHistory", JSON.stringify(updatedTransactionHistory));
      setInpnum("");
      setTransaction("");
    }
  };

  const clear = () => {
    localStorage.clear();
    setTransactionHistory([]);
    setBalance(0);
    setIncome(0);
    setExpense(0);
    alert("All transactions are deleted")
  }

  return (
    <div className=" flex flex-col justify-center items-center my-10 ">
      <div className="text-2xl text-black font-bold">
        <h1>Simple Expense Tracker</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-80 ">
        <br />
        <div className="text-black">
          <h1>Your Balance</h1>
          <p className=" text-3xl">${balance}</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-24 w-80 shadow-md shadow-black my-10">
        <div className="h-1/2 w-1/2 text-gray-600 text-center">
          <h2 className="font-bold">INCOME</h2>
          <p className="text-green-500">${Income}</p>
        </div>
        <div className=" text-2xl text-gray-500">|</div>
        <div className="h-1/2 w-1/2 text-gray-600 text-center">
          <h2 className="font-bold">EXPENSE</h2>
          <p className="text-red-500">${Expense}</p>
        </div>
      </div>
      <div className="w-80">
        <h1 className="text-2xl my-1">History</h1>
        <div className=" border-b-2"></div>
      </div>
      <HistoryBox transactionHistory={transactionHistory} />
      <form onSubmit={add} className="flex flex-col w-80">
        <div className="text-black text-2xl">Add New Transaction</div>
        <div className=" border-b-2"></div>
        <form></form>
        <div className="text-gray-500 my-2">
          <p>Text</p>
        </div>
        <div className="">
          <input
            type="text"
            name="income"
            id="inctxt"
            value={transaction}
            onChange={(e) => setTransaction(e.target.value)}
            className="w-full active:border-none shadow-sm shadow-black"
          />
        </div>
        <div className="text-gray-500 my-2">
          <p>Amount</p>
          <p>(negative-expense, positive-income)</p>
        </div>
        <div className="">
          <input
            type="number"
            name="incometext"
            id="inc"
            value={inpnum}
            onChange={(e) => setInpnum(parseInt(e.target.value))}
            className="w-full  shadow-sm shadow-black"
          />
        </div>
        <button
          type="submit"
          className=" px-3 py-1 bg-blue-600 text-white shrink-0 my-4 w-80"
        >
          Add Transactions
        </button>
        <button
        type="button"
          onClick={clear}
          className=" px-3 py-1 bg-red-600 text-white shrink-0 w-80"
        >
          clear Transactions
        </button>
      </form>
    </div>
  );
}

export default BalanceBox;
