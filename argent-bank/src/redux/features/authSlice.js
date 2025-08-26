import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' // استيراد البيانات 
import axios from 'axios'

const API_URL = 'http://localhost:3001/api/v1/user' // تحديد الرابط

// حفظ بيانات المستخدم
const storedToken = localStorage.getItem('token')
const storedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

// لتسجيل الدخول
export const loginUser = createAsyncThunk( // يقوم بإرسال بيانات المستخدم (email, password) إلى رابط تسجيل الدخول
  'auth/loginUser',
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userCredentials) // ارسال الطلب الى api
      return response.data.body // اعد النتيجة اذا نجح الطلب
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
// جلب بيانات البروفايل
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (token, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/profile`,
        {},
        {
          headers: { //  يخبر الـ API أن الطلب من مستخدم مسجّل الدخول
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data.body
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)

// تعديل البروفايل
export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ firstName, lastName, token }, thunkAPI) => { // 
    try {
      const response = await axios.put(
        `${API_URL}/profile`,
        { firstName, lastName }, // 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body; // إذا نجح → نُعيد البيانات بعد التعديل
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// الحالة الاولى
const authSlice = createSlice({ //  هذا يُنشئ "شريحة" جديدة 
  name: 'auth', // اسم الشريحه
  initialState: { //  نُحدد "الحالة الأولية" (initial state) للمصادقة

    token: null, // رمز الدخول
    user: null, // بيانات المستخدم
    loading: false, // حالة التحميل
    error: null, // اي خطاء يظهر
  },

  // 🔹 هذه دوال لتحديث الحالة يدويًا، وليس عبر API
  reducers: {
    logout: (state) => { // تمسح بيانات المستخدم المسجل للدخول
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
        state.user = action.payload.user
      })

      // إذا فشل تسجيل الدخول 
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false // توقف التحميل
        state.error = action.payload // نحفظ رسالة الخطأ لعرضها على المستخدم
      })
 
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload // 🔹 هنا نخزن بيانات المستخدم
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // تغير الاسم
.addCase(updateUserProfile.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload; // تحديث بيانات المستخدم
})
.addCase(updateUserProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
