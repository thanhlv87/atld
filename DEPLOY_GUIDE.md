# 🚀 Hướng dẫn Deploy lên Firebase Hosting

## Bước 1: Cài đặt Firebase CLI

```bash
npm install -g firebase-tools
```

**Kiểm tra cài đặt:**
```bash
firebase --version
```

## Bước 2: Đăng nhập Firebase

```bash
firebase login
```

Một cửa sổ browser sẽ mở ra, đăng nhập bằng Google account đã tạo Firebase project.

## Bước 3: Deploy Website

### Lần đầu tiên - Full Setup:

```bash
cd "f:\Dropbox\AI\web_atld"

# Deploy tất cả (hosting + firestore rules)
firebase deploy
```

### Các lần sau - Deploy nhanh:

```bash
# Chỉ deploy hosting (khi update code)
firebase deploy --only hosting

# Chỉ deploy firestore rules (khi update security rules)
firebase deploy --only firestore:rules
```

## Bước 4: Tạo Admin User

### Cách 1: Qua Firebase Console (Dễ nhất)

1. Vào [Firebase Console](https://console.firebase.google.com)
2. Chọn project: **atld-connect**
3. Vào **Authentication** → **Users**
4. Click **Add user**
5. Nhập:
   - Email: `admin@atldconnect.vn` (hoặc email của bạn)
   - Password: Mật khẩu mạnh của bạn
6. Click **Add user**

### Cách 2: Qua Firebase CLI

```bash
# Cần tạo script Node.js
node create-admin.js
```

File `create-admin.js`:
```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function createAdmin() {
  try {
    const user = await admin.auth().createUser({
      email: 'admin@atldconnect.vn',
      password: 'your-secure-password',
      emailVerified: true,
      disabled: false
    });
    console.log('✅ Admin user created:', user.uid);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createAdmin();
```

## Bước 5: Test Website Live

Sau khi deploy xong, Firebase sẽ cho bạn URL:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/atld-connect/overview
Hosting URL: https://atld-connect.web.app
```

### Test các trang:

1. **Trang chủ:** https://atld-connect.web.app
2. **Khóa học:** https://atld-connect.web.app/courses.html
3. **Đăng ký DN:** https://atld-connect.web.app/business-register.html
4. **Đăng ký ĐT:** https://atld-connect.web.app/partner-register.html
5. **Admin login:** https://atld-connect.web.app/admin-login.html
6. **Admin dashboard:** https://atld-connect.web.app/admin-dashboard.html

## Bước 6: Setup Custom Domain (Optional)

### Thêm domain riêng (ví dụ: atldconnect.vn)

1. Vào Firebase Console → Hosting
2. Click **Add custom domain**
3. Nhập domain: `atldconnect.vn`
4. Làm theo hướng dẫn để setup DNS records
5. Chờ SSL certificate được tạo (tự động)

**DNS Records cần thêm:**
```
Type: A
Name: @
Value: (Firebase sẽ cung cấp IP)

Type: TXT
Name: @
Value: (Firebase verification code)
```

## Troubleshooting

### Lỗi: "Permission denied"
```bash
firebase login --reauth
```

### Lỗi: "Project not found"
Kiểm tra `.firebaserc` có đúng project ID:
```json
{
  "projects": {
    "default": "atld-connect"
  }
}
```

### Lỗi: "Firestore rules syntax error"
Test rules trước:
```bash
firebase deploy --only firestore:rules --dry-run
```

### Website không load được

1. **Check browser console (F12)** để xem lỗi
2. **Kiểm tra Firebase config** trong `firebase-config.js`
3. **Xóa cache browser** và refresh (Ctrl+Shift+R)

## Update Website

Khi bạn sửa code:

```bash
# 1. Sửa code trong các file HTML/CSS/JS
# 2. Deploy lên Firebase
firebase deploy --only hosting

# Hoặc deploy tất cả nếu có thay đổi rules
firebase deploy
```

## Commands Hữu ích

```bash
# Xem projects
firebase projects:list

# Switch project
firebase use <project-id>

# Test local trước khi deploy
firebase serve

# Rollback về version trước
firebase hosting:clone <source-site-id>:<source-version-id> <destination-site-id>

# Xem logs
firebase functions:log
```

## Chi phí

**Firebase Hosting (Spark Plan - FREE):**
- ✅ 10GB Storage
- ✅ 360MB/day Bandwidth
- ✅ SSL Certificate (miễn phí)
- ✅ CDN global

**Vượt free tier:**
- Storage: $0.026/GB
- Bandwidth: $0.15/GB

→ **Website nhỏ: Hoàn toàn miễn phí!**

## Monitoring

### Xem traffic & performance:

1. Firebase Console → Hosting
2. Xem:
   - Requests per day
   - Bandwidth used
   - Response times

### Setup Google Analytics (Optional):

1. Firebase Console → Analytics
2. Enable Google Analytics
3. Tự động track page views

## Security Checklist

- [x] Firestore rules đã setup (chỉ admin đọc được data)
- [x] Authentication enabled
- [x] SSL/HTTPS tự động
- [ ] Custom domain với SSL
- [ ] Backup data định kỳ
- [ ] Monitor unusual activity

## Next Steps

Sau khi deploy thành công:

1. ✅ Test tất cả các trang
2. ✅ Tạo admin user và test login
3. ✅ Test đăng ký doanh nghiệp/đối tác
4. ✅ Check data trong Firestore Console
5. 📧 Setup email notifications (Phase 3)
6. 📱 Thêm PWA support
7. 🔍 SEO optimization

---

## Quick Commands

```bash
# Deploy everything
firebase deploy

# Deploy hosting only
firebase deploy --only hosting

# Test local
firebase serve

# Open Firebase Console
firebase open

# View logs
firebase functions:log
```

**🎉 Chúc mừng! Website của bạn đã live!**

Share link cho mọi người: **https://atld-connect.web.app**
