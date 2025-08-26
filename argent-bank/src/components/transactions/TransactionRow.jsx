// src/components/transactions/TransactionRow.jsx
import React from "react";

export default function TransactionRow({ tx }) {
  return (
    <div className="t-row" role="row">
      <div className="t-cell">{tx.date}</div>
      <div className="t-cell">{tx.description}</div>
      <div className="t-cell t-right">
        {tx.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </div>
      <div className="t-cell t-right">
        {tx.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
      </div>
    </div>
  );
}
