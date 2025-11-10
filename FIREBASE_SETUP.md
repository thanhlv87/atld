

# 🔥 Hướng dẫn Setup Firebase cho ATLĐ Connect

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** hoặc **"Create a project"**
3. Đặt tên project: `atld-connect` (hoặc tên bạn muốn)
4. Enable Google Analytics (tùy chọn)
5. Click **"Create project"**

## Bước 2: Thêm Web App vào Project

1. Trong Firebase Console, click vào biểu tượng **Web** (`</>`)
2. Đặt tên app: `ATLĐ Connect Web`
3. **KHÔNG** check "Firebase Hosting" (làm sau)
4. Click **"Register app"**
5. **Sao chép** Firebase config code hiển thị

## Bước 3: Cấu hình Firebase Config

1. Mở file `firebase-config.js`
2. Thay thế các giá trị sau bằng config từ Firebase Console:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",                    // Thay bằng API Key của bạn
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

**Ví dụ:**
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "atld-connect.firebaseapp.com",
    projectId: "atld-connect",
    storageBucket: "atld-connect.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};
```

## Bước 4: Enable Firestore Database

1. Trong Firebase Console, vào **"Firestore Database"**
2. Click **"Create database"**
3. Chọn chế độ:
   - **Test mode** (cho development - data public trong 30 ngày)
   - **Production mode** (cho production - cần setup rules)
4. Chọn location: `asia-southeast1` (Singapore) hoặc gần bạn nhất
5. Click **"Enable"**

### Security Rules (Production)

Sau khi test xong, vào **Firestore > Rules** và thay bằng:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Businesses - anyone can create, only admin can read
    match /businesses/{businessId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // Partners - anyone can create, only admin can read
    match /partners/{partnerId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // Training requests - only admin can read/write
    match /training_requests/{requestId} {
      allow read, write: if request.auth != null;
    }

    // Quotes - only admin can read/write
    match /quotes/{quoteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Bước 5: Enable Authentication

1. Trong Firebase Console, vào **"Authentication"**
2. Click **"Get started"**
3. Vào tab **"Sign-in method"**
4. Enable **"Email/Password"**
5. Click **"Save"**

### Tạo Admin User

1. Vào tab **"Users"**
2. Click **"Add user"**
3. Nhập:
   - Email: `admin@atldconnect.vn` (hoặc email của bạn)
   - Password: `your-secure-password`
4. Click **"Add user"**

## Bước 6: Test Website

1. Mở `index.html` trong browser (hoặc dùng Live Server)
2. Thử đăng ký doanh nghiệp tại: `business-register.html`
3. Kiểm tra dữ liệu trong Firestore Console
4. Đăng nhập admin tại: `admin-login.html`
5. Xem dashboard tại: `admin-dashboard.html`

## Bước 7: Deploy lên Firebase Hosting (Optional)

### Cài đặt Firebase CLI

```bash
npm install -g firebase-tools
```

### Login và Initialize

```bash
# Login
firebase login

# Initialize project
firebase init hosting

# Chọn:
# - Use existing project: atld-connect
# - Public directory: . (current directory)
# - Single-page app: No
# - Overwrite index.html: No
```

### Deploy

```bash
firebase deploy --only hosting
```

Website sẽ có URL: `https://atld-connect.web.app`

## Bước 8: Setup Email Notifications (Optional - Phase 3)

### Cài đặt Cloud Functions

```bash
firebase init functions

# Chọn:
# - Language: JavaScript
# - ESLint: Yes
# - Install dependencies: Yes
```

### Tạo Function gửi email

File: `functions/index.js`

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password' // Use App Password, not regular password
    }
});

// Send email when new business registers
exports.onBusinessCreated = functions.firestore
    .document('businesses/{businessId}')
    .onCreate(async (snap, context) => {
        const business = snap.data();

        const mailOptions = {
            from: 'ATLĐ Connect <noreply@atldconnect.vn>',
            to: 'admin@atldconnect.vn', // Your admin email
            subject: `🔔 Yêu cầu đào tạo mới từ ${business.companyName}`,
            html: `
                <h2>Yêu cầu đào tạo mới</h2>
                <p><strong>Công ty:</strong> ${business.companyName}</p>
                <p><strong>Email:</strong> ${business.email}</p>
                <p><strong>Loại khóa:</strong> ${business.trainingType}</p>
                <p><strong>Số học viên:</strong> ${business.traineeCount}</p>
                <p><a href="https://atld-connect.web.app/admin-dashboard.html">Xem chi tiết</a></p>
            `
        };

        await transporter.sendMail(mailOptions);
    });

// Send email when partner registers
exports.onPartnerCreated = functions.firestore
    .document('partners/{partnerId}')
    .onCreate(async (snap, context) => {
        const partner = snap.data();

        const mailOptions = {
            from: 'ATLĐ Connect <noreply@atldconnect.vn>',
            to: 'admin@atldconnect.vn',
            subject: `🤝 Đối tác mới đăng ký: ${partner.orgName}`,
            html: `
                <h2>Đối tác mới đăng ký</h2>
                <p><strong>Tổ chức:</strong> ${partner.orgName}</p>
                <p><strong>Email:</strong> ${partner.repEmail}</p>
                <p><strong>Lĩnh vực:</strong> ${partner.trainingFields.join(', ')}</p>
                <p><a href="https://atld-connect.web.app/admin-dashboard.html">Xem chi tiết</a></p>
            `
        };

        await transporter.sendMail(mailOptions);
    });
```

### Deploy Functions

```bash
cd functions
npm install nodemailer
cd ..
firebase deploy --only functions
```

## Chi phí Firebase

### Spark Plan (FREE)
- ✅ Firestore: 1GB storage, 50K reads/day, 20K writes/day
- ✅ Authentication: Unlimited users
- ✅ Hosting: 10GB storage, 360MB/day bandwidth
- ✅ Functions: 125K invocations/day, 40K GB-seconds/month

**→ Đủ cho 100-200 requests/ngày miễn phí!**

### Blaze Plan (Pay as you go)
- Chỉ trả tiền khi vượt free tier
- Firestore: ~$0.06 per 100K reads
- Functions: ~$0.40 per 1M invocations
- Có thể set budget alerts

## Troubleshooting

### Lỗi: "Firebase not defined"
- Kiểm tra đã load Firebase SDKs trong HTML chưa
- Đảm bảo `firebase-config.js` được load trước `script.js`

### Lỗi: "Permission denied"
- Kiểm tra Firestore Security Rules
- Đảm bảo đã enable Authentication

### Data không lưu vào Firestore
- Mở Console > Network tab để xem lỗi
- Kiểm tra Firebase config có đúng không
- Kiểm tra Firestore Rules

### Không đăng nhập được Admin
- Kiểm tra đã tạo user trong Authentication chưa
- Đảm bảo email/password đúng

## Liên hệ

Nếu gặp khó khăn, liên hệ:
- Email: support@atldconnect.vn
- Hoặc tạo issue trên GitHub

---

**🎉 Chúc bạn setup thành công!**
