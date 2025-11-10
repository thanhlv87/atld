# 🔍 Checklist kiểm tra đăng nhập Admin

## Bước 1️⃣: Enable Email/Password Authentication

**QUAN TRỌNG NHẤT - Phải làm đầu tiên!**

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/authentication/providers

2. Tìm **"Email/Password"** trong danh sách Sign-in providers

3. Click vào **"Email/Password"**

4. **Enable** cả 2 options:
   - ✅ Email/Password
   - ✅ Email link (passwordless sign-in) - Optional, có thể bỏ qua

5. Click **"Save"**

**❗ Nếu không làm bước này, KHÔNG thể tạo user và đăng nhập được!**

---

## Bước 2️⃣: Tạo Admin User

**Chỉ làm SAU KHI đã enable Email/Password ở Bước 1**

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/authentication/users

2. Click **"Add user"** (nút ở góc trên)

3. Điền thông tin:
   ```
   Email address: admin@atldconnect.vn
   Password: Admin@123456
   ```
   (Password phải ít nhất 6 ký tự)

4. Click **"Add user"**

5. Bạn sẽ thấy user mới trong danh sách:
   ```
   ✅ admin@atldconnect.vn | password | Just now
   ```

---

## Bước 3️⃣: Test đăng nhập

1. Mở trang: https://atld.web.app/admin-login.html

2. Nhập:
   - Email: `admin@atldconnect.vn`
   - Password: `Admin@123456`

3. Click **"Đăng nhập"**

4. **Kết quả mong đợi:**
   - Chuyển sang trang Admin Dashboard
   - Không có lỗi

---

## ❌ Các lỗi thường gặp

### Lỗi 1: "auth/operation-not-allowed"

**Nguyên nhân:** Chưa enable Email/Password authentication

**Cách fix:**
- Làm lại Bước 1 ở trên
- Đảm bảo Email/Password đã được Enable (màu xanh)

### Lỗi 2: "auth/invalid-login-credentials"

**Nguyên nhân:**
- Chưa tạo user HOẶC
- Email/password sai

**Cách fix:**
- Vào Authentication → Users
- Kiểm tra có user `admin@atldconnect.vn` chưa
- Nếu chưa → Tạo user (Bước 2)
- Nếu có rồi → Reset password

### Lỗi 3: "auth/user-not-found"

**Nguyên nhân:** User chưa được tạo

**Cách fix:**
- Làm Bước 2 để tạo user

### Lỗi 4: "auth/wrong-password"

**Nguyên nhân:** Password sai

**Cách fix:**
- Vào Authentication → Users
- Click vào user → Reset password
- Hoặc tạo user mới với password bạn nhớ

---

## 🔍 Debug nâng cao

### Kiểm tra Firebase Console (F12)

Mở trang admin-login.html, bấm F12, xem Console:

**✅ Thành công:**
```
✅ Firebase initialized successfully
(Sau khi đăng nhập) Sign in success: { ... }
```

**❌ Lỗi:**
```
❌ Firebase initialization error: ...
Sign in error: FirebaseError: ...
```

### Kiểm tra Network tab (F12)

1. Mở F12 → Tab Network
2. Đăng nhập
3. Tìm request tới `identitytoolkit.googleapis.com`
4. Click vào → Response

**Nếu 400 Bad Request:**
- Xem response body để biết lỗi cụ thể

---

## 📋 Thứ tự làm ĐÚNG:

```
1. Enable Email/Password Authentication ✅
   ↓
2. Tạo Admin User ✅
   ↓
3. Test đăng nhập ✅
```

**❌ KHÔNG được:**
- Tạo user trước khi enable Email/Password
- Bỏ qua bước enable Authentication

---

## 🆘 Vẫn không được?

Chụp màn hình:
1. Authentication → Sign-in method (để xem Email/Password có enable không)
2. Authentication → Users (để xem có user nào)
3. Console log (F12) khi đăng nhập

Gửi cho tôi, tôi sẽ xem và fix ngay!

---

## ✅ Sau khi đăng nhập thành công:

Bạn sẽ được chuyển tới:
https://atld.web.app/admin-dashboard.html

Và có thể:
- Xem danh sách doanh nghiệp, đối tác
- Upload tài liệu tại: Admin → Tài liệu
- Quản lý toàn bộ hệ thống

**Chúc bạn thành công!** 🎉
