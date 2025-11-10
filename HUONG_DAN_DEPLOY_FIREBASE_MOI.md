# 🔄 Hướng dẫn Deploy lên Firebase Account Mới

## Bước 1: Tạo Firebase Project mới

1. Truy cập: https://console.firebase.google.com
2. **Đăng nhập** bằng tài khoản Google mới của bạn
3. Click **"Add project"** (hoặc "Thêm dự án")
4. Nhập tên project (VD: `atld-training` hoặc tên bạn muốn)
5. Disable Google Analytics (không cần thiết) hoặc bật tùy thích
6. Click **"Create project"**

## Bước 2: Enable các dịch vụ cần thiết

### 2.1. Firebase Authentication
1. Vào **Authentication** → **Get Started**
2. Chọn **Email/Password** → Enable
3. Click **Save**

### 2.2. Cloud Firestore
1. Vào **Firestore Database** → **Create database**
2. Chọn **Production mode**
3. Chọn location: `asia-southeast1` (Singapore - gần VN nhất)
4. Click **Enable**

### 2.3. Cloud Storage
1. Vào **Storage** → **Get Started**
2. Chọn **Production mode**
3. Click **Next** → **Done**

### 2.4. Firebase Hosting
1. Vào **Hosting** → **Get Started**
2. Click qua các bước (không cần chạy lệnh)

## Bước 3: Tạo Admin User

1. Vào **Authentication** → **Users**
2. Click **"Add user"**
3. Nhập:
   - Email: `admin@atldconnect.vn` (hoặc email bạn muốn)
   - Password: Tạo password mạnh
4. Click **"Add user"**

## Bước 4: Cập nhật Firebase Config

### 4.1. Lấy Firebase Config mới

1. Vào **Project Settings** (biểu tượng ⚙️)
2. Scroll xuống phần **"Your apps"**
3. Click **"</>Web"** để tạo web app
4. Nhập tên app (VD: `ATLD Connect`)
5. **Bật** "Also set up Firebase Hosting" → Chọn site name
6. Click **"Register app"**
7. Copy đoạn config:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:..."
};
```

### 4.2. Cập nhật file `firebase-config.js`

Mở file `public/firebase-config.js`, thay thế config cũ:

```javascript
const firebaseConfig = {
    apiKey: "THAY_VÀO_ĐÂY",
    authDomain: "THAY_VÀO_ĐÂY",
    projectId: "THAY_VÀO_ĐÂY",
    storageBucket: "THAY_VÀO_ĐÂY",
    messagingSenderId: "THAY_VÀO_ĐÂY",
    appId: "THAY_VÀO_ĐÂY"
};
```

### 4.3. Cập nhật file `.firebaserc`

Mở file `.firebaserc`, thay đổi project ID:

```json
{
  "projects": {
    "default": "TÊN-PROJECT-MỚI-CỦA-BẠN"
  }
}
```

### 4.4. (Tùy chọn) Cập nhật `firebase.json` nếu muốn đổi tên site

Mở `firebase.json`, có thể đổi tên 2 sites:

```json
{
  "hosting": [
    {
      "site": "tên-site-1",
      "public": "public",
      ...
    },
    {
      "site": "tên-site-2",
      "public": "public",
      ...
    }
  ],
  ...
}
```

## Bước 5: Login Firebase CLI với account mới

### 5.1. Logout account cũ
```bash
firebase logout
```

### 5.2. Login account mới
```bash
firebase login
```

Browser sẽ mở, **đăng nhập bằng Gmail account mới** của bạn.

### 5.3. Kiểm tra đã login đúng account
```bash
firebase projects:list
```

Bạn phải thấy project mới trong danh sách.

### 5.4. Chọn project
```bash
firebase use TÊN-PROJECT-MỚI
```

Hoặc:
```bash
firebase use default
```

## Bước 6: Deploy lên Firebase mới

### 6.1. Deploy tất cả
```bash
firebase deploy
```

### 6.2. Hoặc dùng script Windows
Double-click file: `deploy.bat`

## Bước 7: Kiểm tra website

Sau khi deploy xong, truy cập:

- https://TÊN-SITE-1.web.app
- https://TÊN-SITE-2.web.app

Hoặc xem URL trong kết quả deploy.

## Bước 8: Test đăng nhập Admin

1. Vào: https://TÊN-SITE.web.app/admin-login.html
2. Đăng nhập với email/password đã tạo ở Bước 3
3. Upload thử 1 tài liệu

## ⚠️ Lưu ý quan trọng

### Storage Rules cần deploy riêng

**Quan trọng:** Firebase Storage rules nằm riêng, không deploy cùng Firestore rules!

Bạn cần cập nhật Storage rules thủ công:

1. Vào Firebase Console → **Storage** → **Rules**
2. Paste đoạn này:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{fileName} {
      allow read: if true;  // Anyone can download
      allow write: if request.auth != null;  // Only admin can upload
    }
  }
}
```

3. Click **"Publish"**

### Firestore Indexes

Nếu gặp lỗi về index khi load documents:

1. Vào Firebase Console → **Firestore** → **Indexes**
2. Tạo composite index cho collection `documents`:
   - Field: `uploadedAt` → Descending
   - Query scope: Collection

Hoặc click vào link error trong Console log, Firebase sẽ tự tạo index.

## 🎉 Hoàn tất!

Website của bạn đã được deploy lên Firebase account mới!

**Checklist:**
- ✅ Tạo Firebase project mới
- ✅ Enable Authentication, Firestore, Storage, Hosting
- ✅ Tạo admin user
- ✅ Cập nhật firebase-config.js
- ✅ Cập nhật .firebaserc
- ✅ Firebase logout → login account mới
- ✅ Deploy
- ✅ Cập nhật Storage rules thủ công
- ✅ Test admin login & upload

## 📞 Hỗ trợ

Nếu gặp lỗi, check:
1. **Firebase Console** → Project Settings → đảm bảo config đúng
2. **Browser Console (F12)** → xem error message
3. **Firebase CLI** → chạy `firebase use` xem đang dùng project nào

---

**Chúc bạn deploy thành công!** 🚀
