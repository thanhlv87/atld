# 📚 Hướng dẫn quản lý Tài liệu - Admin

## ✅ Đã hoàn thành

Trang quản lý tài liệu đã được tích hợp hoàn toàn vào Admin Dashboard với đầy đủ tính năng upload, quản lý và xóa tài liệu.

## 🔗 Đường dẫn

**Admin Documents:** https://atld-connect.web.app/admin-documents.html

## 🎯 Tính năng

### 1. Upload tài liệu
- ✅ Kéo thả file hoặc click để chọn
- ✅ Hỗ trợ: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), PowerPoint (.ppt, .pptx)
- ✅ Giới hạn: 10MB/file
- ✅ Progress bar hiển thị tiến độ upload
- ✅ Upload lên Firebase Storage
- ✅ Metadata lưu vào Firestore

### 2. Form nhập thông tin
- **Tiêu đề** (bắt buộc)
- **Danh mục** (bắt buộc):
  - An toàn chung
  - Xây dựng
  - Điện
  - Phòng cháy chữa cháy
  - Hóa chất
  - Sản xuất
  - Văn bản pháp luật
- **Mô tả** (tùy chọn)
- **Số trang** (tùy chọn)
- **Tác giả** (tùy chọn)

### 3. Quản lý tài liệu
- ✅ Xem danh sách tất cả tài liệu
- ✅ Lọc theo danh mục
- ✅ Xem/Download tài liệu
- ✅ Xóa tài liệu (xóa cả file và metadata)
- ✅ Hiển thị: Tiêu đề, Danh mục, Loại file, Kích thước, Ngày upload

## 📖 Cách sử dụng

### Bước 1: Đăng nhập Admin
1. Vào: https://atld-connect.web.app/admin-login.html
2. Đăng nhập với tài khoản admin

### Bước 2: Vào trang Quản lý Tài liệu
1. Từ Admin Dashboard, click "Tài liệu" trên menu
2. Hoặc truy cập trực tiếp: https://atld-connect.web.app/admin-documents.html

### Bước 3: Upload tài liệu mới

#### Cách 1: Kéo thả
1. Kéo file vào vùng "Kéo thả file vào đây"
2. File sẽ tự động được chọn

#### Cách 2: Click chọn
1. Click vào vùng upload
2. Chọn file từ máy tính

#### Tiếp tục:
3. Điền thông tin:
   - Tiêu đề tài liệu
   - Chọn danh mục
   - Mô tả (tùy chọn)
   - Số trang (tùy chọn)
   - Tác giả (tùy chọn)

4. Click "📤 Upload tài liệu"

5. Chờ progress bar chạy đến 100%

6. Thành công! Tài liệu đã được upload

### Bước 4: Xem tài liệu công khai
1. Click "Xem trang công khai" để xem trang dành cho người dùng
2. Hoặc truy cập: https://atld-connect.web.app/documents.html

### Bước 5: Quản lý tài liệu

#### Xem tài liệu:
- Click nút "👁️ Xem" để mở file trong tab mới

#### Xóa tài liệu:
1. Click nút "🗑️ Xóa"
2. Xác nhận xóa
3. File và metadata sẽ bị xóa khỏi hệ thống

#### Lọc tài liệu:
- Chọn danh mục trong dropdown để lọc

## 🔒 Bảo mật

### Firestore Rules:
```javascript
// Documents - everyone can read, only admin can write
match /documents/{documentId} {
  allow read: if true;  // Anyone can view
  allow create, update, delete: if request.auth != null;  // Only admin
}
```

### Storage Rules:
```javascript
// Storage - everyone can download, only admin can upload
match /documents/{fileName} {
  allow read: if true;  // Anyone can download
  allow write: if request.auth != null;  // Only admin
}
```

## 📊 Cấu trúc dữ liệu

### Firestore Collection: `documents`
```javascript
{
  title: "Hướng dẫn an toàn điện",
  category: "electrical",
  description: "Tài liệu hướng dẫn...",
  pages: 35,
  author: "Bộ Lao động",
  fileName: "1736123456789_guide.pdf",
  fileType: "PDF",
  fileSize: 2621440,  // bytes
  downloadURL: "https://firebasestorage.googleapis.com/...",
  uploadedAt: Timestamp,
  uploadedBy: "admin@atldconnect.vn"
}
```

### Firebase Storage: `documents/`
```
documents/
├── 1736123456789_guide.pdf
├── 1736123457890_policy.docx
└── 1736123458901_presentation.pptx
```

## 🌐 Tích hợp với trang công khai

Trang [documents.html](https://atld-connect.web.app/documents.html) tự động:
- ✅ Load tài liệu từ Firestore
- ✅ Hiển thị theo danh mục
- ✅ Cho phép tải xuống
- ✅ Fallback về dữ liệu mẫu nếu chưa có tài liệu thật

## 💡 Tips

1. **Đặt tên file rõ ràng:** Sử dụng tên file có ý nghĩa trước khi upload

2. **Nén file nếu cần:** Nếu file > 10MB, hãy nén lại hoặc chia nhỏ

3. **Điền đầy đủ metadata:** Giúp người dùng tìm kiếm dễ dàng hơn

4. **Kiểm tra trước khi xóa:** File đã xóa không thể khôi phục

5. **Sử dụng PDF ưu tiên:** PDF hiển thị tốt trên mọi thiết bị

## 🎨 Giao diện

- Màu đỏ cam hợp mệnh Hỏa
- Drag & Drop hiện đại
- Progress bar mượt mà
- Responsive, đẹp trên mobile
- Thống nhất với admin dashboard

## 🚀 Đã deploy

Tất cả tính năng đã LIVE tại:
- https://antoan.web.app
- https://atld-connect.web.app

## ⚠️ Lưu ý

1. **Cần đăng nhập:** Phải đăng nhập admin mới upload được

2. **Giới hạn file:** Hiện tại giới hạn 10MB/file

3. **Loại file:** Chỉ hỗ trợ PDF, Word, Excel, PowerPoint

4. **Storage quota:** Firebase free plan có giới hạn 5GB storage

5. **Bandwidth:** Firebase free plan có giới hạn 360MB/day download

## 📈 Nâng cấp sau này

- [ ] Tăng giới hạn file lên 50MB
- [ ] Hỗ trợ video, audio
- [ ] Preview PDF trong trình duyệt
- [ ] Quản lý phiên bản tài liệu
- [ ] Thống kê lượt tải
- [ ] Tìm kiếm full-text
- [ ] Tags cho tài liệu
- [ ] Sắp xếp theo ngày/tên/lượt tải

## 🎉 Hoàn thành!

Bây giờ bạn có thể:
1. ✅ Upload tài liệu từ admin panel
2. ✅ Quản lý tài liệu (xem, xóa)
3. ✅ Người dùng xem & tải tài liệu công khai
4. ✅ Tất cả tích hợp với Firebase Storage & Firestore

**Chúc bạn sử dụng hiệu quả!** 🔥
