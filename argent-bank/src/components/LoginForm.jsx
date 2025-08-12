// src/components/LoginForm.jsx

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch() // سنستخدمه لإرسال loginUser للـ Redux
  const navigate = useNavigate() //  لنقل المستخدم إلى /profile بعد نجاح الدخول
  const { loading, error } = useSelector((state) => state.auth) // فحص حالة تسجي الدخول اذا فيها خطاء او لا

  const [username, setUsername] = useState('') // تخزين اسم المستخدم
  const [password, setPassword] = useState('') // تخزين الباسورد

  const handleSubmit = (e) => {
    e.preventDefault() // تمنع اعادة تحمي الصفحة عند اضغط على تسجيل الدخول
    dispatch(loginUser({ email: username, password })) //  إرسال البيانات (username و password) إلى الـ Redux لتنفيذ تسجيل الدخول عبر API.
      .unwrap() // التعامل مع النتيجة
      .then(() => {
        navigate('/profile')
      })
      .catch((err) => {
        console.error('Login failed:', err)
      })
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>} 

          <button className="sign-in-button" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginForm
