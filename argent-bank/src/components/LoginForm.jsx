// src/components/LoginForm.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUserProfile } from "../redux/features/authSlice"; // من الـ authSlice للتعامل مع API.
import '../css/LoginForm.css'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token, loading, error, user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault() // يُمنع إعادة تحميل الصفحة
    dispatch(loginUser({ email, password }))
  }
// حالة المستخدم مسجل دخول او لا
  useEffect(() => {
    if (token && !user) { // عنا توكن بدون يوزير 
      dispatch(getUserProfile(token)) // نطلب من السرفر بيانات البروفايل
    }
    if (token && user) { // عنا توكن ويوزير
      navigate('/profile') // وجه المستخدم لصفحة البروقايل
    }
  }, [token, user, dispatch, navigate])


 return (
  <main className="main bg-dark">
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-wrapper">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  </main>
)

}

export default LoginForm
