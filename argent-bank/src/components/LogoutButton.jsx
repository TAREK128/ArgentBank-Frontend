import { useDispatch } from "react-redux"
import { logout } from "../redux/features/authSlice"
import { useNavigate } from "react-router-dom"

function LogoutButton() {
  const dispatch = useDispatch() // مسح بيانات Redux توكن ويوير
  const navigate = useNavigate()

  const handleLogout = () => {
    // 1️⃣ مسح بيانات المستخدم من الـ Store
    dispatch(logout())

    // 2️⃣ مسح البيانات من localStorage
    localStorage.removeItem("token") // حتى لو عمل Refresh ما يلقى بيانات قديمة
    localStorage.removeItem("user")

    // 3️⃣ إعادة توجيه المستخدم للصفحة الرئيسية أو صفحة تسجيل الدخول
    navigate("/login")
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton
