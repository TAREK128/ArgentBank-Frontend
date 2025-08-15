import React, { useState } from "react";
import "../css/profile.css";

export default function Profile() {
  const [userName, setUserName] = useState("Ben_hg");
  const [firstName] = useState("Ben");
  const [lastName] = useState("Hong");

  const handleSave = () => {
    alert(`Username updated to: ${userName}`);
    // هنا تضيف كود استدعاء API لتعديل الاسم
  };

  const handleCancel = () => {
    setUserName("Ben_hg");
  };

  return (
    <div className="profile-page">
      <div className="header">
        <h2>Edit user info</h2>
        <div className="input-group">
          <label>User name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>First name:</label>
          <input type="text" value={firstName} disabled />
        </div>
        <div className="input-group">
          <label>Last name:</label>
          <input type="text" value={lastName} disabled />
        </div>
        <div className="btn-group">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>

      <section className="accounts">
        <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button className="arrow-btn">{">"}</button>
        </div>

        <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button className="arrow-btn">{">"}</button>
        </div>

        <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button className="arrow-btn">{">"}</button>
        </div>
      </section>
    </div>
  );
}
