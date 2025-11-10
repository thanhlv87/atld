# 🔍 Kiểm tra Email Status

## Bước 1: Kiểm tra Extension có đang ACTIVE không

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/extensions

2. Tìm extension **"Trigger Email from Firestore"**

3. Kiểm tra:
   - ✅ Status: **ACTIVE** (màu xanh)
   - ❌ Status: **ERRORED** (màu đỏ) → Cần reinstall

---

## Bước 2: Kiểm tra Firestore Collection `mail`

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/firestore/databases/-default-/data/~2Fmail

2. Tìm document email vừa gửi (sort by timestamp)

3. Kiểm tra các field:

### ✅ **Email đã gửi thành công:**
```json
{
  "to": ["email@example.com"],
  "message": { ... },
  "delivery": {
    "state": "SUCCESS",
    "startTime": {...},
    "endTime": {...},
    "info": {...}
  }
}
```

### ⏳ **Email đang chờ gửi:**
```json
{
  "to": ["email@example.com"],
  "message": { ... }
  // KHÔNG có field "delivery"
}
```
→ Extension chưa xử lý, đợi thêm 30 giây

### ❌ **Email gửi thất bại - Lỗi Authentication:**
```json
{
  "to": ["email@example.com"],
  "message": { ... },
  "delivery": {
    "state": "ERROR",
    "error": {
      "message": "Invalid login: 535-5.7.8 Username and Password not accepted"
    }
  }
}
```
→ SMTP username/password SAI

### ❌ **Email gửi thất bại - Lỗi Connection:**
```json
{
  "delivery": {
    "state": "ERROR",
    "error": {
      "message": "Connection timeout"
    }
  }
}
```
→ SMTP connection URI sai hoặc port bị block

---

## Bước 3: Xem Cloud Function Logs

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/functions/logs

2. Hoặc: Extensions > firestore-send-email-idul > View in Cloud Functions

3. Tìm function: **ext-firestore-send-email-idul-processQueue**

4. Xem logs gần nhất:

### ✅ Logs thành công:
```
Function execution started
Starting email processing
Email sent successfully
Function execution completed
```

### ❌ Logs lỗi phổ biến:

**Lỗi 1: Authentication failed**
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```
**Nguyên nhân:** SMTP password sai
**Cách fix:**
- Lấy App Password mới từ Google
- Reconfigure Extension với password đúng
- BỎ HẾT DẤU CÁCH trong password!

**Lỗi 2: Connection refused**
```
Error: connect ECONNREFUSED
```
**Nguyên nhân:** SMTP URI sai format
**Cách fix:**
- Đúng: `smtps://email:password@smtp.gmail.com:465`
- Sai: `smtp://...` (thiếu 's')
- Sai: `:587` (sai port)

**Lỗi 3: Missing required parameter**
```
Error: Missing required parameter: SMTP_CONNECTION_URI
```
**Nguyên nhân:** Extension chưa được cấu hình
**Cách fix:** Reconfigure extension với đầy đủ thông tin

**Lỗi 4: Database not found**
```
Error: Database does not exist in region us-central1
```
**Nguyên nhân:** Extension region khác với Firestore region
**Cách fix:**
- Kiểm tra Firestore region (ví dụ: nam5)
- Reinstall extension và chọn đúng region

---

## Bước 4: Test lại Extension Configuration

### Kiểm tra SMTP Connection URI:

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/extensions/instances/firestore-send-email-idul?tab=config

2. Xem mục **"SMTP connection URI (Optional)"**

### ✅ Format ĐÚNG:
```
smtps://vietthanh228@gmail.com:abcdabcdabcdabcd@smtp.gmail.com:465
```

### ❌ Format SAI:
```
# SAI - Có dấu cách trong password
smtps://email:abcd abcd abcd abcd@smtp.gmail.com:465

# SAI - Thiếu 's' trong smtps
smtp://email:password@smtp.gmail.com:465

# SAI - Sai port (587 cho STARTTLS, không phải SSL)
smtps://email:password@smtp.gmail.com:587

# SAI - Không có password
smtps://email@smtp.gmail.com:465
```

### Cách lấy App Password đúng:

1. Vào: https://myaccount.google.com/apppasswords

2. Tạo App Password mới

3. Google hiển thị: `abcd efgh ijkl mnop` (có dấu cách)

4. **BỎ HẾT DẤU CÁCH:** `abcdefghijklmnop`

5. Dùng password không dấu cách trong URI

---

## Bước 5: Reconfigure Extension (Nếu cần)

1. Vào: https://console.firebase.google.com/project/gen-lang-client-0113063590/extensions/instances/firestore-send-email-idul?tab=config

2. Click **"Reconfigure extension"**

3. Điền thông tin:

```
Mail collection: mail

Default FROM address: vietthanh228@gmail.com

SMTP connection URI:
smtps://vietthanh228@gmail.com:YOUR_APP_PASSWORD_NO_SPACES@smtp.gmail.com:465

SMTP password (Optional): (Để trống nếu đã có trong URI)

Default REPLY-TO: (Để trống)

Testing mode: No
```

4. Click **"Save"**

5. Đợi 1-2 phút để Extension reconfigure

6. Test lại: https://atld.web.app/test-email.html

---

## Bước 6: Test Email Thủ công

### Cách 1: Qua Firestore Console

1. Vào Firestore: https://console.firebase.google.com/project/gen-lang-client-0113063590/firestore/databases/-default-/data

2. Vào collection **`mail`**

3. Click **"Add document"**

4. Document ID: (auto)

5. Fields:
```
to (array):
  - vietthanh228@gmail.com

message (map):
  - subject (string): "Test Email Manual"
  - html (string): "<h1>Test</h1><p>This is a manual test</p>"
```

6. Click **"Save"**

7. Đợi 10-20 giây

8. Refresh document → Sẽ thấy field `delivery` xuất hiện

9. Kiểm tra `delivery.state`:
   - **SUCCESS** → Email đã gửi, check inbox
   - **ERROR** → Xem `delivery.error.message` để biết lỗi

### Cách 2: Qua Test Page

1. Vào: https://atld.web.app/test-email.html

2. Nhập email của bạn

3. Click "Gửi Email Test"

4. Xem thông báo thành công

5. Vào Firestore collection `mail` để xem status

6. Kiểm tra inbox sau 30 giây

---

## Troubleshooting Checklist

- [ ] Extension status = ACTIVE
- [ ] SMTP URI đúng format với 's' trong smtps
- [ ] Port = 465 (không phải 587)
- [ ] App Password KHÔNG có dấu cách
- [ ] Email FROM address đúng (trùng với account Google)
- [ ] Firestore collection name = "mail" (lowercase)
- [ ] Extension region = Firestore region (nam5)
- [ ] Google 2-Step Verification đã bật
- [ ] Cloud Functions billing đã enable (Blaze plan)
- [ ] Firestore rules cho phép create collection mail

---

## Các Lỗi Thường Gặp

### 1. Email không được gửi, không có delivery field

**Nguyên nhân:**
- Extension không chạy
- Cloud Function bị lỗi
- Region không match

**Cách fix:**
- Xem Cloud Function logs
- Check Extension status
- Reinstall extension với đúng region

### 2. delivery.state = ERROR, message: "Invalid login"

**Nguyên nhân:**
- SMTP password sai
- Password có dấu cách
- Email FROM không đúng

**Cách fix:**
- Lấy App Password mới
- Bỏ hết dấu cách
- Reconfigure extension

### 3. delivery.state = ERROR, message: "Connection refused"

**Nguyên nhân:**
- SMTP URI sai
- Port sai
- Thiếu 's' trong smtps

**Cách fix:**
- Dùng `smtps://` (có 's')
- Dùng port 465
- Format: `smtps://user:pass@smtp.gmail.com:465`

### 4. Không thấy document trong collection mail

**Nguyên nhân:**
- Firestore rules block
- Lỗi trong code
- Collection name sai

**Cách fix:**
- Deploy lại firestore rules
- Check console log trong browser
- Đảm bảo collection = "mail" (lowercase)

---

## Next Steps

Sau khi fix xong:

1. ✅ Test email qua test-email.html
2. ✅ Vào admin panel thêm email notification
3. ✅ Đăng training request để test auto email
4. 🎉 Hệ thống hoàn chỉnh!

---

## Contact

Nếu vẫn gặp vấn đề, gửi cho tôi:
1. Screenshot Extension configuration
2. Screenshot Firestore mail document (với delivery field)
3. Screenshot Cloud Function logs
4. Mô tả lỗi chi tiết
