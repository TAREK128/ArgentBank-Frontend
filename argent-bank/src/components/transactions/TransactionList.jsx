// src/components/transactions/TransactionList.jsx
import React from "react";
import TransactionRow from "./TransactionRow";

export default function TransactionList({ items }) {
  return (
    <div className="t-body">
      {items.map(tx => (
        <TransactionRow key={tx.id} tx={tx} />
      ))}
    </div>
  );
}
