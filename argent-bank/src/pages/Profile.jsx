import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { updateUserProfile } from "../redux/features/authSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/profile.css";


function Profile() {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state) => state.auth);
  
const [firstName, setFirstName] = useState(user?.firstName || "");
const [lastName, setLastName] = useState(user?.lastName || "");
const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await dispatch(updateUserProfile({ firstName, lastName, token })).unwrap(); // هنا يرسل طلب تحديث البروفايل
      setIsEditing(false); // نجاح 
      alert("تم تحديث البيانات بنجاح!");
    } catch (error) {
      alert(`فشل التحديث: ${error}`);
    }
  };

 const handleCancel = () => { // الغاء التعديل
  setFirstName(user?.firstName || ""); // ⬅️ إعادة firstName
  setLastName(user?.lastName || "");   // ⬅️ إعادة lastName
  setIsEditing(false);
};

const navigate = useNavigate();


return (
    <>
      <Header />
      
      <main className="main bg-dark">
        <div className="header">
          <h1>Edit user info</h1>
          
        <div className="input-group">
  <label>First name:</label>
  <input
    type="text"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    disabled={!isEditing}
  />
</div>

<div className="input-group">
  <label>Last name:</label>
  <input
    type="text"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    disabled={!isEditing}
  />
</div>

          <div className="button-group">
            {isEditing ? (
              <>
                <button 
                  className="save-btn" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "جاري الحفظ..." : "Save"}
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            ) : (
              <button 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit Name
              </button>
            )}
          </div>
        </div>

        <h2 className="sr-only">Accounts</h2>
        
        <section className="accounts">
          {/* ... بطاقات الحسابات ... */}
           <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button 
  className="arrow-btn" 
  onClick={() => navigate("/transactions")}
>
  {">"}
</button>
        </div>

        <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button 
  className="arrow-btn" 
  onClick={() => navigate("/transactions")}
>
  {">"}
</button>
        </div>

        <div className="account-card">
          <div>
            <h3>Argent Bank Checking (x3448)</h3>
            <p className="amount">$48,098.43</p>
            <p className="balance">Available balance</p>
          </div>
          <button 
  className="arrow-btn" 
  onClick={() => navigate("/transactions")}
>
  {">"}
</button>
        </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}

export default Profile;
