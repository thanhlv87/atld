# ATLĐ Connect - Nền tảng Kết nối Đào tạo An toàn Lao động

Website marketplace kết nối doanh nghiệp có nhu cầu đào tạo ATLĐ với các đối tác đào tạo uy tín và chuyên nghiệp.

## Giới thiệu

**ATLĐ Connect** là nền tảng trung gian giúp:
- **Doanh nghiệp**: Dễ dàng tìm kiếm và lựa chọn đối tác đào tạo ATLĐ phù hợp
- **Đối tác đào tạo**: Tiếp cận khách hàng tiềm năng và mở rộng hoạt động kinh doanh
- **Giảng viên/Admin**: Quản lý kết nối và nhận hoa hồng từ các hợp đồng thành công

## Mục tiêu của dự án

Tạo một nền tảng marketplace để:
1. Doanh nghiệp gửi yêu cầu đào tạo ATLĐ
2. Các đối tác đào tạo nhận thông báo và gửi báo giá
3. Doanh nghiệp so sánh và chọn đối tác phù hợp
4. Ký hợp đồng và thực hiện đào tạo
5. Admin/giảng viên nhận hoa hồng từ mỗi hợp đồng thành công

## Cấu trúc dự án

```
web_atld/
│
├── index.html                  # Trang chủ - giới thiệu nền tảng
├── courses.html               # Danh sách các khóa đào tạo ATLĐ
├── business-register.html     # Form đăng ký dành cho doanh nghiệp
├── partner-register.html      # Form đăng ký dành cho đối tác
│
├── admin-login.html           # Trang đăng nhập admin
├── admin-dashboard.html       # Dashboard quản lý tổng quan
├── admin-styles.css           # CSS cho admin pages
├── admin-script.js            # JavaScript cho admin pages
│
├── firebase-config.js         # Cấu hình Firebase
├── styles.css                 # File CSS styling cho toàn bộ website
├── script.js                  # File JavaScript xử lý tương tác
│
├── readme.md                  # File hướng dẫn này
└── FIREBASE_SETUP.md          # Hướng dẫn setup Firebase chi tiết
```

## ⚡ Quick Start

### 1. Setup Firebase (5 phút)
Xem hướng dẫn chi tiết tại: **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)**

Tóm tắt:
1. Tạo Firebase project
2. Copy Firebase config vào `firebase-config.js`
3. Enable Firestore & Authentication
4. Tạo admin user

### 2. Chạy Website
```bash
# Mở trực tiếp
Mở index.html trong browser

# Hoặc dùng Live Server (VS Code)
1. Cài extension "Live Server"
2. Right-click index.html → Open with Live Server

# Hoặc dùng Python
python -m http.server 8000
```

### 3. Truy cập Admin
- URL: `admin-login.html`
- Email: admin user bạn tạo trong Firebase
- Dashboard: Quản lý doanh nghiệp, đối tác, yêu cầu đào tạo

---

## Tính năng hiện tại (Phase 1 + 2 - ✅ HOÀN THÀNH)

### 1. Trang chủ (index.html)
- Hero section với CTA buttons cho cả doanh nghiệp và đối tác
- Thống kê (stats) về nền tảng
- Quy trình hoạt động cho doanh nghiệp và đối tác
- Lợi ích khi sử dụng nền tảng
- Preview các khóa đào tạo phổ biến
- Giới thiệu về ATLĐ Connect

### 2. Trang danh sách khóa học (courses.html)
- Hiển thị 10 khóa đào tạo ATLĐ phổ biến
- Bộ lọc theo:
  - Danh mục (Xây dựng, Sản xuất, Điện, Hóa chất, PCCC, Chung)
  - Thời lượng (1-2 ngày, 3-5 ngày, trên 5 ngày)
  - Tìm kiếm theo từ khóa
- Thông tin chi tiết mỗi khóa học:
  - Tên khóa học
  - Mô tả nội dung
  - Thời lượng
  - Số lượng học viên
  - Địa điểm đào tạo
  - Nút đăng ký đào tạo

### 3. Form đăng ký Doanh nghiệp (business-register.html)
Thu thập thông tin:
- **Thông tin doanh nghiệp**: Tên, MST, ngành nghề, số nhân viên, địa chỉ
- **Thông tin người liên hệ**: Họ tên, chức vụ, SĐT, email
- **Nhu cầu đào tạo**:
  - Loại khóa học
  - Số lượng học viên
  - Địa điểm đào tạo
  - Thời gian dự kiến
  - Ngân sách
  - Ghi chú thêm

### 4. Form đăng ký Đối tác (partner-register.html)
Thu thập thông tin:
- **Thông tin tổ chức**: Tên, MST, giấy phép đào tạo, địa chỉ, năm thành lập
- **Thông tin người đại diện**: Họ tên, chức vụ, SĐT, email
- **Năng lực đào tạo**:
  - Lĩnh vực đào tạo (checkbox nhiều lựa chọn)
  - Số lượng giảng viên
  - Sức chứa tối đa
  - Hình thức đào tạo (tại doanh nghiệp/trung tâm/online)
  - Khu vực hoạt động
- **Kinh nghiệm**: Số khóa đã tổ chức, số học viên, chứng nhận

### 5. Tính năng JavaScript
- Menu responsive cho mobile
- Smooth scrolling
- Scroll animations (fade in up effect)
- Bộ lọc và tìm kiếm khóa học real-time
- Validation form:
  - Email format
  - Số điện thoại (10-11 số)
  - Required fields
  - Checkbox agreements
- **✅ Form submission lưu vào Firebase Firestore**
- Ripple effect trên buttons
- Auto-format số điện thoại

### 6. Firebase Backend (✅ HOÀN THÀNH)
- **Firestore Database**:
  - Collection `businesses`: Lưu yêu cầu từ doanh nghiệp
  - Collection `partners`: Lưu đăng ký đối tác
  - Collection `training_requests`: Lưu yêu cầu đào tạo
- **Firebase Authentication**:
  - Email/Password authentication cho admin
  - Protected admin routes
- **Helper Functions**:
  - Save/Get businesses
  - Save/Get partners
  - Update partner status (approve/reject)
  - Get statistics

### 7. Admin Dashboard (✅ HOÀN THÀNH)
- **Admin Login** (`admin-login.html`):
  - Đăng nhập bằng email/password
  - Session management
  - Auto redirect nếu đã login
- **Dashboard** (`admin-dashboard.html`):
  - Thống kê tổng quan: số doanh nghiệp, đối tác, yêu cầu
  - Danh sách yêu cầu đào tạo mới nhất
  - Danh sách đối tác đăng ký gần đây
  - Xem chi tiết doanh nghiệp/đối tác
  - Duyệt/Từ chối đối tác
- **Responsive Design**: Hoạt động tốt trên mobile/tablet

## Cách sử dụng

### 1. Mở trực tiếp
Chỉ cần mở file **index.html** trong trình duyệt web.

### 2. Sử dụng Live Server (Khuyến nghị)
Nếu dùng VS Code:
1. Cài extension "Live Server"
2. Click chuột phải vào `index.html`
3. Chọn "Open with Live Server"

### 3. Sử dụng Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Truy cập: http://localhost:8000
```

## Quy trình hoạt động

### Dành cho Doanh nghiệp:
1. Doanh nghiệp điền form yêu cầu đào tạo tại `business-register.html`
2. Hệ thống gửi thông báo cho các đối tác phù hợp (tính năng tương lai)
3. Đối tác gửi báo giá và chương trình đào tạo
4. Doanh nghiệp so sánh và chọn đối tác
5. Ký hợp đồng và triển khai đào tạo

### Dành cho Đối tác:
1. Đối tác đăng ký qua form `partner-register.html`
2. Admin xét duyệt hồ sơ (3-5 ngày)
3. Nhận thông báo khi có yêu cầu đào tạo phù hợp
4. Gửi báo giá cho doanh nghiệp
5. Nếu được chọn, thực hiện đào tạo và nhận thanh toán

## Roadmap - Tính năng tương lai

### Phase 2: Backend Integration ✅ HOÀN THÀNH
- [x] Tích hợp Firebase Backend
- [x] Firestore Database để lưu trữ:
  - [x] Thông tin doanh nghiệp
  - [x] Thông tin đối tác
  - [ ] Danh sách khóa học (static HTML)
  - [ ] Yêu cầu đào tạo (có thể mở rộng)
  - [ ] Báo giá
  - [ ] Hợp đồng
- [x] Helper functions thay API endpoints

### Phase 3: Hệ thống Thông báo (🚧 Tiếp theo)
- [ ] Email notification khi:
  - Doanh nghiệp gửi yêu cầu
  - Đối tác gửi báo giá
  - Hợp đồng được ký kết
- [ ] SMS notification (tùy chọn)
- [ ] In-app notifications

### Phase 4: Dashboard
- [ ] Dashboard cho Admin:
  - Quản lý doanh nghiệp
  - Quản lý đối tác
  - Theo dõi yêu cầu và báo giá
  - Tính toán hoa hồng
  - Báo cáo thống kê
- [ ] Dashboard cho Doanh nghiệp:
  - Xem danh sách báo giá
  - So sánh đối tác
  - Lịch sử đào tạo
- [ ] Dashboard cho Đối tác:
  - Xem yêu cầu mới
  - Quản lý báo giá
  - Lịch đào tạo
  - Doanh thu

### Phase 5: Tính năng nâng cao
- [ ] Hệ thống đánh giá và review
- [ ] Chat real-time giữa doanh nghiệp và đối tác
- [ ] Ký hợp đồng điện tử
- [ ] Payment gateway (thanh toán trực tuyến)
- [ ] Tự động tính hoa hồng
- [ ] Export báo cáo PDF/Excel
- [ ] Multi-language support (English)
- [ ] Mobile app (React Native/Flutter)

### Phase 6: Marketing & SEO
- [ ] SEO optimization
- [ ] Blog về ATLĐ
- [ ] Tích hợp Google Analytics
- [ ] Social media integration
- [ ] Email marketing campaigns

## Các khóa đào tạo hiện có

1. **An toàn trong Xây dựng** - 3-5 ngày, 15-30 người
2. **An toàn Điện** - 2-4 ngày, 10-20 người
3. **Phòng cháy chữa cháy (PCCC)** - 1-2 ngày, 20-50 người
4. **An toàn trong Sản xuất** - 2-3 ngày, 20-40 người
5. **An toàn Hóa chất** - 3-4 ngày, 15-25 người
6. **Làm việc trên cao** - 2-3 ngày, 10-20 người
7. **An toàn Lao động Chung** - 1-2 ngày, 30-50 người
8. **Vận hành máy móc công nghiệp** - 3-5 ngày, 15-25 người
9. **Sơ cứu tại nơi làm việc** - 1-2 ngày, 20-30 người
10. **Giám sát An toàn công trình** - 5-7 ngày, 10-15 người

## Công nghệ sử dụng

### Frontend (Phase 1 - Hiện tại)
- **HTML5**: Semantic markup
- **CSS3**:
  - Flexbox & Grid Layout
  - CSS Variables
  - Animations & Transitions
  - Responsive Design
- **JavaScript (Vanilla ES6+)**:
  - DOM Manipulation
  - Event Handling
  - Form Validation
  - Local filtering/search

### Backend (Phase 2 - Tương lai)
Có thể lựa chọn:
- **Node.js** + Express + MongoDB
- **PHP** + Laravel + MySQL
- **Python** + Django/Flask + PostgreSQL

## Thiết kế Responsive

Website được thiết kế responsive cho:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## Trình duyệt hỗ trợ

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Tùy chỉnh

### Thay đổi màu sắc
Mở `styles.css` và chỉnh sửa CSS variables:

```css
:root {
    --primary-color: #2563eb;     /* Màu chính (xanh dương) */
    --secondary-color: #7c3aed;   /* Màu phụ (tím) */
    --success-color: #10b981;     /* Màu thành công (xanh lá) */
    --warning-color: #f59e0b;     /* Màu cảnh báo (vàng) */
    --danger-color: #ef4444;      /* Màu nguy hiểm (đỏ) */
}
```

### Thêm khóa học mới
Mở `courses.html` và thêm block HTML:

```html
<div class="course-item" data-category="construction">
    <div class="course-item-icon">🏗️</div>
    <div class="course-item-content">
        <h3>Tên khóa học</h3>
        <p class="course-description">Mô tả...</p>
        <div class="course-details">
            <span class="course-badge construction">Danh mục</span>
            <div class="course-meta-inline">
                <span>⏱️ Thời lượng</span>
                <span>👥 Số người</span>
                <span>📍 Địa điểm</span>
            </div>
        </div>
        <a href="business-register.html" class="btn btn-small btn-primary">Đăng ký đào tạo</a>
    </div>
</div>
```

## Bảo mật

### Hiện tại:
- Client-side validation
- Required fields
- Format validation (email, phone)

### Tương lai (Backend):
- Server-side validation
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Authentication & Authorization
- HTTPS/SSL
- Data encryption

## Liên hệ & Hỗ trợ

- **Email**: info@atldconnect.vn
- **Hotline**: 0900 XXX XXX
- **Địa chỉ**: TP. Hồ Chí Minh

## License

Dự án này được phát triển cho mục đích thương mại. All rights reserved © 2025 ATLĐ Connect.

---

## Notes cho Developer

### Form Data Handling
Hiện tại, khi form được submit:
1. Data được log ra browser console
2. Hiển thị alert thông báo thành công
3. Redirect về trang chủ sau 2 giây

Để tích hợp backend:
- Thay thế `console.log()` bằng AJAX/Fetch API call
- Gửi data đến server endpoint
- Xử lý response từ server
- Hiển thị thông báo lỗi nếu có

### Suggested Backend Endpoints

```
POST /api/business/register      - Đăng ký doanh nghiệp
POST /api/partner/register       - Đăng ký đối tác
GET  /api/courses               - Lấy danh sách khóa học
GET  /api/courses/:id           - Lấy chi tiết khóa học
POST /api/quotes                - Đối tác gửi báo giá
GET  /api/quotes/:businessId    - Doanh nghiệp xem báo giá
POST /api/contracts             - Tạo hợp đồng
GET  /api/admin/stats           - Thống kê cho admin
```

### Database Schema Suggestion

**businesses**
- id, company_name, tax_code, industry, employee_count, address
- contact_name, position, phone, email
- created_at, updated_at

**partners**
- id, org_name, tax_code, license_number, license_date
- rep_name, rep_position, rep_phone, rep_email
- training_fields, service_area, max_capacity
- status (pending, approved, rejected)
- created_at, updated_at

**training_requests**
- id, business_id, training_type, trainee_count
- location, expected_time, budget, notes
- status (new, quoted, contracted, completed)
- created_at, updated_at

**quotes**
- id, request_id, partner_id
- price, duration, description, documents
- status (sent, accepted, rejected)
- created_at, updated_at

**contracts**
- id, request_id, quote_id, business_id, partner_id
- commission_rate, commission_amount, status
- signed_at, completed_at

---

**Developed with ❤️ for safety at work**
