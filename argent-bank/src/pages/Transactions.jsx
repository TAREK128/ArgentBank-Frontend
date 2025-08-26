// src/pages/Transactions.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TransactionList from "../components/transactions/TransactionList";
import "../css/transactions.css";

export default function Transactions() {
  // بيانات مبدئية (Mock) — لاحقًا سنجلبها من API/Redux
  const account = {
    label: "Argent Bank Checking (x3448)",
    balance: 48098.43,
  };

  const transactions = [
    {
      id: "t1",
      date: "27/02/20",
      description: "Golden Sun Bakery",
      amount: 8.0,
      balance: 298.0,
      // تفاصيل سنستخدمها لاحقًا في الأكورديون
      type: "Electronic",
      category: "Food",
      note: "lorem ipsum",
    },
    { id: "t2", date: "27/02/20", description: "Golden Sun Bakery", amount: 8.0, balance: 298.0, type: "Electronic", category: "Food", note: "" },
    { id: "t3", date: "27/02/20", description: "Golden Sun Bakery", amount: 8.0, balance: 298.0, type: "Electronic", category: "Food", note: "" },
  ];

  return (
    <>
      <Header />
      <main className="main bg-dark">
        {/* بطاقة الرصيد العلوية */}
        <section className="account-hero">
          <div className="account-hero__left">
            <h2 className="account-hero__title">{account.label}</h2>
            <p className="account-hero__amount">
              {account.balance.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </p>
            <p className="account-hero__sub">Available balance</p>
          </div>
          <button className="account-hero__close" aria-label="Close summary">×</button>
        </section>

        {/* جدول العمليات */}
        <section aria-labelledby="transactions-title" className="transactions">
          <h2 id="transactions-title" className="sr-only">Transactions</h2>
          <div className="transactions-table">
            <div className="t-head">
              <div className="t-cell">Date</div>
              <div className="t-cell">Description</div>
              <div className="t-cell t-right">Amount</div>
              <div className="t-cell t-right">Balance</div>
            </div>

            <TransactionList items={transactions} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
