import React from "react";

function HistoryBox({ transactionHistory }) {
  return (
    <div className="my-4">
      {transactionHistory && transactionHistory.length > 0 ? (
        transactionHistory.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between my-1 box-border border-2 shadow-sm w-80"
          >
            <div className="w-3/4 px-2 py-1">{transaction.transaction}</div>
            <div className="w-1/4 flex justify-end">
              ${transaction.inpnum}
              <div
                className={`w-1/12 rounded-l-sm ${
                  transaction.inpnum >= 0 ? "bg-green-600" : "bg-red-600"
                } `}
              ></div>
            </div>
          </div>
        ))
      ) : (
        <div className="hidden">No Transactions Available</div>
      )}
    </div>
  );
}

export default HistoryBox;
