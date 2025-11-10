# ✅ Checklist: Tại sao không đăng nhập Admin được?

## Bước 1: Kiểm tra đã tạo Admin User chưa?

### Vào Firebase Console:
https://console.firebase.google.com/project/atld-connect/authentication/users

**Phải có ít nhất 1 user!**

Nếu chưa có → Click **"Add user"**:
- Email: `admin@atldconnect.vn`
- Password: `password123` (hoặc password mạnh hơn)

---

## Bước 2: Kiểm tra Website đã deploy chưa?

Truy cập các URL sau:

### Site 1: antoan
- https://antoan.web.app/admin-login.html

### Site 2: atld-connect
- https://atld-connect.web.app/admin-login.html

**Nếu trang không load được** → Cần deploy lại:
```bash
firebase deploy
```

---

## Bước 3: Kiểm tra Firebase Config

Mở browser Console (F12) tại trang admin-login.html

**Phải thấy:**
```
✅ Firebase initialized successfully
```

**Nếu thấy lỗi:**
```
❌ Firebase initialization error
```

→ Kiểm tra file `firebase-config.js` có đúng config không

---

## Bước 4: Test đăng nhập

1. Vào: https://atld-connect.web.app/admin-login.html
2. Nhập:
   - Email: `admin@atldconnect.vn`
   - Password: password bạn đã tạo
3. Click "Đăng nhập"

**Nếu thành công:** Sẽ redirect tới `admin-dashboard.html`

**Nếu thất bại:** Xem lỗi trong Console (F12)

---

## Các lỗi thường gặp:

### Lỗi 1: "Firebase not defined"
**Nguyên nhân:** File firebase-config.js không load được

**Fix:**
1. Check file có trong folder `public/` không
2. Check HTML có `<script src="firebase-config.js"></script>` không

### Lỗi 2: "User not found" hoặc "Wrong password"
**Nguyên nhân:** Chưa tạo user hoặc sai password

**Fix:**
1. Vào Firebase Console → Authentication → Users
2. Kiểm tra email có đúng không
3. Reset password nếu cần

### Lỗi 3: "Permission denied"
**Nguyên nhân:** Firestore rules chưa deploy

**Fix:**
```bash
firebase deploy --only firestore:rules
```

### Lỗi 4: Redirect về login sau khi đăng nhập
**Nguyên nhân:** Firebase Auth chưa được init đúng

**Fix:**
1. Mở Console (F12)
2. Xem error message
3. Kiểm tra firebase-config.js

---

## Debug Script

Chạy script này trong Console (F12) tại trang admin-login:

```javascript
// Check Firebase
console.log('Firebase:', typeof firebase !== 'undefined' ? '✅ OK' : '❌ NOT LOADED');

// Check FirebaseHelper
console.log('FirebaseHelper:', typeof window.FirebaseHelper !== 'undefined' ? '✅ OK' : '❌ NOT LOADED');

// Check Auth
if (typeof firebase !== 'undefined') {
    firebase.auth().currentUser ? console.log('User:', firebase.auth().currentUser.email) : console.log('No user logged in');
}

// Test login (change email/password)
async function testLogin() {
    const result = await window.FirebaseHelper.signInAdmin('admin@atldconnect.vn', 'password123');
    console.log('Login result:', result);
}
// Run: testLogin()
```

---

## Quick Fix

Nếu vẫn không được, thử:

1. **Clear cache browser:**
   - Ctrl + Shift + Delete
   - Xóa cache & cookies
   - Reload (Ctrl + F5)

2. **Deploy lại:**
   ```bash
   firebase deploy --only hosting
   ```

3. **Thử browser khác:**
   - Chrome Incognito
   - Firefox
   - Edge

---

## Contact

Nếu vẫn lỗi, cung cấp:
1. Screenshot Console (F12)
2. Error message
3. URL bạn đang truy cập
