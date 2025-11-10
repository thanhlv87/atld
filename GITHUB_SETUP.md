# 🚀 Hướng dẫn Push Code lên GitHub

## Bước 1: Tạo GitHub Repository

1. Truy cập: https://github.com/new

2. Điền thông tin:
   - **Repository name**: `atld-connect` (hoặc tên khác bạn muốn)
   - **Description**: "ATLĐ Connect - Nền tảng kết nối đào tạo An toàn Lao động"
   - **Visibility**:
     - ✅ **Private** (khuyến nghị - bảo mật code)
     - ⚠️ Public (nếu muốn công khai)
   - **Initialize repository**:
     - ❌ KHÔNG chọn "Add a README file"
     - ❌ KHÔNG chọn ".gitignore"
     - ❌ KHÔNG chọn "license"

3. Nhấn **"Create repository"**

4. GitHub sẽ hiển thị URL repository, ví dụ:
   ```
   https://github.com/username/atld-connect.git
   ```
   **LƯU LẠI URL NÀY** - sẽ dùng ở bước 2

---

## Bước 2: Commit Code và Push lên GitHub

Mở terminal trong thư mục `f:\Dropbox\AI\web_atld` và chạy các lệnh sau:

### 2.1. Add tất cả files vào Git

```bash
git add .
```

### 2.2. Tạo commit đầu tiên

```bash
git commit -m "Initial commit: ATLĐ Connect - Email notification feature

- Admin panel for managing partner emails
- Auto email notification when new training request is posted
- Integration with Firebase Extension Trigger Email
- Partner registration and management system
- Training request dashboard
- Document management system

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 2.3. Thêm GitHub remote

**Thay `YOUR_USERNAME` và `YOUR_REPO_NAME` bằng thông tin thực tế của bạn:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Ví dụ:**
```bash
git remote add origin https://github.com/vietthanh228/atld-connect.git
```

### 2.4. Rename branch thành main (nếu cần)

```bash
git branch -M main
```

### 2.5. Push code lên GitHub

```bash
git push -u origin main
```

**Lưu ý:** Lần đầu push, GitHub sẽ yêu cầu authentication:
- **Username**: GitHub username của bạn
- **Password**: Sử dụng **Personal Access Token** (không phải mật khẩu thông thường)

---

## Bước 3: Tạo Personal Access Token (PAT)

Nếu GitHub yêu cầu authentication:

1. Truy cập: https://github.com/settings/tokens

2. Nhấn **"Generate new token"** > **"Generate new token (classic)"**

3. Cấu hình token:
   - **Note**: "ATLĐ Connect Local Development"
   - **Expiration**: 90 days (hoặc tùy chọn)
   - **Select scopes**:
     - ✅ **repo** (full control of private repositories)
     - ✅ **workflow** (nếu có GitHub Actions)

4. Nhấn **"Generate token"**

5. **COPY TOKEN NGAY** - chỉ hiển thị 1 lần!
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

6. Sử dụng token này làm password khi push:
   ```bash
   Username: your_github_username
   Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

---

## Bước 4: Kiểm tra Repository

1. Truy cập repository trên GitHub:
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
   ```

2. Bạn sẽ thấy tất cả files đã được push lên

3. ✅ **HOÀN THÀNH!**

---

## Cấu trúc Project đã Push

```
atld-connect/
├── .claude/                    # Claude Code configuration
├── public/                     # Frontend files
│   ├── index.html
│   ├── admin-partners.html     # NEW: Email management tab
│   ├── post-request.html       # NEW: Auto email sending
│   ├── partner-register.html
│   ├── requests-dashboard.html
│   └── ...
├── extensions/
│   └── firestore-send-email.env
├── firebase.json
├── firestore.rules
├── .gitignore
├── EMAIL_SETUP_GUIDE.md        # NEW: Email setup instructions
└── readme.md
```

---

## Các Lệnh Git Thường Dùng

### Kiểm tra status
```bash
git status
```

### Add files mới
```bash
git add .
git add filename.html
```

### Commit changes
```bash
git commit -m "Update: Feature description"
```

### Push lên GitHub
```bash
git push
```

### Pull từ GitHub (nếu có changes trên remote)
```bash
git pull
```

### Xem history
```bash
git log --oneline
```

### Tạo branch mới
```bash
git checkout -b feature/new-feature
```

### Merge branch
```bash
git checkout main
git merge feature/new-feature
```

---

## Gitignore - Files không push lên GitHub

File `.gitignore` đã được cấu hình để bỏ qua:

```
# Firebase
.firebase/
firebase-debug.log
firebaserc.backup

# Environment variables (QUAN TRỌNG - bảo mật)
.env
.env.local
*.env

# Node modules
node_modules/

# IDE
.vscode/
.idea/

# System files
.DS_Store
Thumbs.db
```

**⚠️ LƯU Ý:** KHÔNG push các file chứa:
- API keys
- Passwords
- SMTP credentials
- Database credentials
- Firebase config với secrets

---

## Bảo mật Repository

### Nếu repository là Private:
- ✅ Code được bảo vệ
- ✅ Chỉ bạn và collaborators truy cập được
- ✅ An toàn để chứa config files

### Nếu repository là Public:
- ⚠️ **KHÔNG** commit file chứa:
  - `firebase-config.js` (nếu có API keys)
  - `.env` files
  - SMTP passwords
  - Admin credentials

- 📋 Sử dụng **Environment Variables** thay vì hardcode
- 📋 Sử dụng **Firebase App Check** để bảo vệ APIs

---

## Collaboration với Team

### Thêm collaborators:
1. Repository > Settings > Collaborators
2. Nhấn "Add people"
3. Nhập GitHub username

### Tạo Pull Request workflow:
1. Developer tạo branch mới
2. Commit changes vào branch
3. Push branch lên GitHub
4. Tạo Pull Request
5. Review và merge vào main

---

## Backup và Deploy từ GitHub

### Tự động deploy từ GitHub:

**Cách 1: Firebase CLI**
```bash
git pull
firebase deploy
```

**Cách 2: GitHub Actions (tự động)**
Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: gen-lang-client-0113063590
```

---

## Next Steps

Sau khi push lên GitHub:

1. ✅ Cài đặt Firebase Extension Trigger Email (xem EMAIL_SETUP_GUIDE.md)
2. ✅ Test email notification feature
3. ✅ Setup GitHub Actions cho auto-deploy (optional)
4. ✅ Invite team members (nếu có)
5. 🎉 Bắt đầu phát triển tiếp!

---

## Troubleshooting

### ❌ Permission denied (publickey)

Nếu gặp lỗi SSH:
```bash
# Chuyển sang HTTPS
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### ❌ Repository not found

Kiểm tra:
1. URL repository có đúng không
2. Bạn có quyền access không
3. Repository có tồn tại không

### ❌ Authentication failed

Sử dụng Personal Access Token thay vì password

---

## Support

Nếu có vấn đề:
- GitHub Docs: https://docs.github.com/
- Git Docs: https://git-scm.com/doc
