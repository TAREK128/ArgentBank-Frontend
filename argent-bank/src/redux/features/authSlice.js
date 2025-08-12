import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // استيراد البيانات 
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user' // تحديد الرابط

// لتسجيل الدخول
export const loginUser = createAsyncThunk( // يقوم بإرسال بيانات المستخدم (email, password) إلى رابط تسجيل الدخول
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userCredentials)
      return response.data.body
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
// الحالة الاولى
const authSlice = createSlice({ //  هذا يُنشئ "شريحة" جديدة 
  name: 'auth', // اسم الشريحه
  initialState: { //  نُحدد "الحالة الأولية" (initial state) للمصادقة

    token: null, // رمز المص ادقة للمستخدم
    user: null,
    loading: false,
    error: null,
  },

  // 🔹 هذه دوال لتحديث الحالة يدويًا، وليس عبر API
  reducers: {
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },

  // لتعامل مع الطلبات غير المتزامنة مثل الاتصال بـ API
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { //  عندما يبدأ طلب تسجيل الدخول (قبل أن نحصل على الرد من الـ API):
        state.loading = true // نعرض رسالة "جاري التحميل"
        state.error = null // نُفرغ الخطأ القديم (إن وُجد)
      })

      // اذا نجح تسجيل الدخول
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false // توقف التحميل
        state.token = action.payload.token // نحفظ التوكن الذي رجع من الـ API
      })

      // إذا فشل تسجيل الدخول 
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false // توقف التحميل
        state.error = action.payload // نحفظ رسالة الخطأ لعرضها على المستخدم
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
