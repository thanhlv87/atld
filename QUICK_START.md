# 🚀 QUICK START - Deploy trong 5 phút!

## Bước 1: Đăng nhập Firebase

**Mở Command Prompt tại folder này**, chạy:

```bash
firebase login
```

→ Browser sẽ mở, **đăng nhập bằng tài khoản Google đã tạo Firebase project**

## Bước 2: Deploy Website

### Cách 1: Chạy script tự động (Windows)

Double-click file: **`deploy.bat`**

### Cách 2: Chạy manual

```bash
cd "f:\Dropbox\AI\web_atld"

# Deploy tất cả
firebase deploy

# Hoặc chỉ deploy hosting
firebase deploy --only hosting
```

## Bước 3: Tạo Admin User

Sau khi deploy xong:

1. Vào: https://console.firebase.google.com/project/atld-connect/authentication/users
2. Click **"Add user"**
3. Nhập:
   - Email: `admin@atldconnect.vn`
   - Password: `your-password`
4. Click **"Add user"**

## Bước 4: Test Website

Truy cập các URL sau để test:

- 🏠 **Trang chủ:** https://atld-connect.web.app
- 📚 **Khóa học:** https://atld-connect.web.app/courses.html
- 🏢 **Đăng ký DN:** https://atld-connect.web.app/business-register.html
- 🤝 **Đăng ký ĐT:** https://atld-connect.web.app/partner-register.html
- 🔐 **Admin Login:** https://atld-connect.web.app/admin-login.html

## Troubleshooting

### Lỗi: "Error: Failed to authenticate"

```bash
firebase logout
firebase login --reauth
```

### Lỗi: "HTTP Error: 403, Permission denied"

Kiểm tra:
1. Bạn đã đăng nhập đúng tài khoản Google?
2. Tài khoản có quyền Owner/Editor của project?

### Lỗi: "Project not found"

Kiểm tra file `.firebaserc`:
```json
{
  "projects": {
    "default": "atld-connect"
  }
}
```

Project ID phải trùng với Firebase Console.

## Update Website

Khi sửa code, chỉ cần:

```bash
firebase deploy --only hosting
```

Hoặc chạy lại `deploy.bat`

---

**🎉 Xong! Website của bạn đã live tại: https://atld-connect.web.app**
