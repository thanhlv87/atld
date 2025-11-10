# 📧 Hướng dẫn Cài đặt Email Notification

## Bước 1: Lấy Google App Password

1. Truy cập: https://myaccount.google.com/apppasswords
2. Đăng nhập bằng email: **vietthanh228@gmail.com**
3. Chọn "App": **Mail**
4. Chọn "Device": **Other** (nhập: "ATLĐ Connect")
5. Nhấn **Generate**
6. Copy mật khẩu 16 ký tự (dạng: `xxxx xxxx xxxx xxxx`)
7. **LƯU LẠI MẬT KHẨU NÀY** - sẽ dùng ở bước 2

---

## Bước 2: Cài đặt Firebase Extension (RECOMMENDED - Dễ nhất)

### Cách 1: Qua Firebase Console (Khuyến nghị)

1. Truy cập: https://console.firebase.google.com/project/gen-lang-client-0113063590/extensions

2. Nhấn **"Browse Extensions"** hoặc **"Install Extension"**

3. Tìm extension: **"Trigger Email from Firestore"**
   - Publisher: **Firebase**
   - Extension ID: `firestore-send-email`

4. Nhấn **"Install"** và điền thông tin:

   ```
   📋 EMAIL DOCUMENTS COLLECTION:
   mail

   📧 DEFAULT FROM EMAIL ADDRESS:
   vietthanh228@gmail.com

   🔐 SMTP CONNECTION URI:
   smtps://vietthanh228@gmail.com:YOUR_APP_PASSWORD@smtp.gmail.com:465

   (Thay YOUR_APP_PASSWORD bằng mật khẩu từ Bước 1)
   ```

5. Các trường optional có thể để trống:
   - Templates Collection: (để trống)
   - Users Collection: (để trống)
   - Default Reply-To: (để trống)
   - Testing Mode: **No**

6. Nhấn **"Install extension"**

7. Chờ 2-3 phút để Firebase cài đặt

8. ✅ **XONG!** Extension đã sẵn sàng

---

### Cách 2: Qua Firebase CLI (Nâng cao)

```bash
# 1. Cài đặt extension
firebase ext:install firebase/firestore-send-email --project=gen-lang-client-0113063590

# 2. Làm theo hướng dẫn interactive và nhập:
#    - MAIL_COLLECTION: mail
#    - SMTP_CONNECTION_URI: smtps://vietthanh228@gmail.com:YOUR_APP_PASSWORD@smtp.gmail.com:465
#    - DEFAULT_FROM: vietthanh228@gmail.com

# 3. Deploy
firebase deploy --only extensions
```

---

## Bước 3: Test Email

### Cách test thủ công qua Firebase Console:

1. Vào Firestore: https://console.firebase.google.com/project/gen-lang-client-0113063590/firestore

2. Tạo collection mới tên **"mail"** (nếu chưa có)

3. Thêm document mới với nội dung:

```json
{
  "to": "vietthanh228@gmail.com",
  "message": {
    "subject": "Test Email - ATLĐ Connect",
    "html": "<h1>Hello!</h1><p>This is a test email from ATLĐ Connect.</p>"
  }
}
```

4. Sau 10-20 giây, kiểm tra email của bạn

5. Document trong Firestore sẽ được update với field:
   - `delivery.state`: "SUCCESS" (nếu gửi thành công)
   - `delivery.error`: (nếu có lỗi)

---

## Bước 4: Test với Website

1. Vào trang admin: https://atld.web.app/admin-partners.html

2. Đăng nhập

3. Chọn tab **"📧 Email Thông báo"**

4. Thêm email test của bạn

5. Vào trang: https://atld.web.app/post-request.html

6. Điền form đăng yêu cầu đào tạo

7. Kiểm tra email - bạn sẽ nhận được thông báo!

---

## Cấu trúc Email Document

Hệ thống sẽ tự động tạo document trong collection `mail` với format:

```javascript
{
  to: ["email1@example.com", "email2@example.com"],  // Array of recipients
  message: {
    subject: "🔔 Yêu cầu đào tạo mới - An toàn điện",
    html: "<html>...</html>"  // HTML email content
  },
  createdAt: Timestamp,
  requestCode: "DN20251109ABCD",
  status: "pending"
}
```

Extension sẽ:
1. Phát hiện document mới được tạo
2. Gửi email đến tất cả địa chỉ trong `to`
3. Cập nhật document với `delivery` status

---

## Troubleshooting

### ❌ Email không được gửi

1. **Kiểm tra App Password đã đúng chưa**
   - Xem trong Firebase Console > Extensions > firestore-send-email > Configuration
   - SMTP URI phải có format: `smtps://email:password@smtp.gmail.com:465`

2. **Kiểm tra Gmail Security**
   - Đảm bảo 2-Step Verification đã bật
   - App Password phải được tạo từ tài khoản có 2FA

3. **Xem logs**
   - Firebase Console > Extensions > firestore-send-email > View in Cloud Functions
   - Xem logs để debug lỗi

### ❌ Extension không chạy

1. Kiểm tra APIs đã được enable:
   - Secret Manager API
   - Cloud Functions API
   - Firestore API

2. Kiểm tra billing:
   - Project phải có Blaze Plan (pay-as-you-go)
   - Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/usage

3. **Lỗi về region không tồn tại (Database does not exist in region)**:
   - Đây là lỗi phổ biến khi Firestore được tạo ở region khác với nơi Cloud Function chạy
   - **Cách xử lý**:
     a. Kiểm tra region của Firestore:
        - Vào Firebase Console > Firestore Database > Cài đặt (Settings)
        - Xem mục "Location" để biết region hiện tại (ví dụ: nam5, us-central1, asia-southeast1)
     b. Cài đặt lại extension với đúng region:
        - Nếu dùng Firebase CLI, thêm tham số `--params` để chỉ định region
        - Nếu cài qua Console, cần gỡ extension hiện tại và cài lại với đúng region
     c. Câu lệnh CLI ví dụ:
        ```bash
        firebase ext:install firebase/firestore-send-email --project=gen-lang-client-0113063590 --params=LOCATION=nam5
        ```

---

## Chi phí dự kiến

Extension này sử dụng:
- ✅ **Cloud Functions (2nd gen)**: ~$0.0000004/request
- ✅ **Secret Manager**: $0.06/10,000 access
- ✅ **Firestore**: Đã tính trong quota

**Dự kiến chi phí**: < $1/tháng cho 1000 emails

---

## Các Collection được sử dụng

1. **`mail`** - Queue email
   - Được tạo tự động khi có yêu cầu mới
   - Extension xử lý và update status

2. **`notificationEmails`** - Email thủ công
   - Admin thêm/xóa qua admin panel
   - Cấu trúc:
     ```javascript
     {
       email: "partner@example.com",
       createdAt: Timestamp,
       addedBy: "admin@email.com"
     }
     ```

3. **`partners`** - Email từ đối tác
   - Tự động lấy email của partners có:
     - `status == 'approved'`
     - `subscriptionStatus == 'active'`

---

## Next Steps

Sau khi cài đặt extension xong:

1. ✅ Thêm email test vào admin panel
2. ✅ Đăng 1 request test trên website
3. ✅ Kiểm tra email inbox
4. ✅ Xem Firestore `mail` collection để verify
5. 🎉 Hệ thống đã sẵn sàng!

---

## Support

Nếu có vấn đề, liên hệ:
- Email: vietthanh228@gmail.com
- Firebase Project: gen-lang-client-0113063590
