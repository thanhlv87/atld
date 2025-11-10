// Admin Dashboard Script

// Check if user is logged in
window.FirebaseHelper.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'admin-login.html';
    }
});

// Logout handler
document.getElementById('logout-btn').addEventListener('click', async () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        await window.FirebaseHelper.signOutAdmin();
        window.location.href = 'admin-login.html';
    }
});

// Load statistics
async function loadStatistics() {
    const stats = await window.FirebaseHelper.getStatistics();

    document.getElementById('total-businesses').textContent = stats.totalBusinesses;
    document.getElementById('total-partners').textContent = stats.totalPartners;
    document.getElementById('total-requests').textContent = stats.totalRequests;
    document.getElementById('pending-requests').textContent = stats.pendingRequests;
}

// Load recent training requests
async function loadRecentRequests() {
    const loading = document.getElementById('requests-loading');
    const table = document.getElementById('requests-table');
    const noData = document.getElementById('requests-no-data');
    const tbody = document.getElementById('requests-tbody');

    try {
        const requests = await window.FirebaseHelper.getAllBusinesses();

        loading.style.display = 'none';

        if (requests.length === 0) {
            noData.style.display = 'block';
            return;
        }

        table.style.display = 'block';
        tbody.innerHTML = '';

        // Show only first 5
        const recentRequests = requests.slice(0, 5);

        recentRequests.forEach(req => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${req.companyName || 'N/A'}</td>
                <td>${req.trainingType || 'N/A'}</td>
                <td>${req.traineeCount || 'N/A'}</td>
                <td>${window.FirebaseHelper.formatTimestamp(req.createdAt)}</td>
                <td><span class="status-badge ${req.status || 'new'}">${getStatusText(req.status)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn view" onclick="viewBusinessDetail('${req.id}')">Xem</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        loading.textContent = 'Lỗi khi tải dữ liệu';
        console.error('Error loading requests:', error);
    }
}

// Load recent partners
async function loadRecentPartners() {
    const loading = document.getElementById('partners-loading');
    const table = document.getElementById('partners-table');
    const noData = document.getElementById('partners-no-data');
    const tbody = document.getElementById('partners-tbody');

    try {
        const partners = await window.FirebaseHelper.getAllPartners();

        loading.style.display = 'none';

        if (partners.length === 0) {
            noData.style.display = 'block';
            return;
        }

        table.style.display = 'block';
        tbody.innerHTML = '';

        // Show only first 5
        const recentPartners = partners.slice(0, 5);

        recentPartners.forEach(partner => {
            const tr = document.createElement('tr');
            const fields = Array.isArray(partner.trainingFields)
                ? partner.trainingFields.slice(0, 2).join(', ')
                : 'N/A';

            tr.innerHTML = `
                <td>${partner.orgName || 'N/A'}</td>
                <td>${fields}</td>
                <td>${partner.serviceArea || 'N/A'}</td>
                <td>${window.FirebaseHelper.formatTimestamp(partner.createdAt)}</td>
                <td><span class="status-badge ${partner.status || 'pending'}">${getStatusText(partner.status)}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn view" onclick="viewPartnerDetail('${partner.id}')">Xem</button>
                        ${partner.status === 'pending' ? `
                            <button class="action-btn approve" onclick="approvePartner('${partner.id}')">Duyệt</button>
                            <button class="action-btn reject" onclick="rejectPartner('${partner.id}')">Từ chối</button>
                        ` : ''}
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        loading.textContent = 'Lỗi khi tải dữ liệu';
        console.error('Error loading partners:', error);
    }
}

// Helper function to get status text in Vietnamese
function getStatusText(status) {
    const statusMap = {
        'new': 'Mới',
        'pending': 'Chờ duyệt',
        'approved': 'Đã duyệt',
        'rejected': 'Từ chối',
        'quoted': 'Đã báo giá',
        'contracted': 'Đã ký HĐ',
        'completed': 'Hoàn thành'
    };
    return statusMap[status] || status;
}

// View business detail
async function viewBusinessDetail(id) {
    const businesses = await window.FirebaseHelper.getAllBusinesses();
    const business = businesses.find(b => b.id === id);

    if (!business) {
        alert('Không tìm thấy thông tin doanh nghiệp');
        return;
    }

    const modalHTML = `
        <div class="modal" id="detail-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Chi tiết Doanh nghiệp</h3>
                    <button class="close-modal" onclick="closeModal()">&times;</button>
                </div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Tên công ty</div>
                        <div class="detail-value">${business.companyName || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Mã số thuế</div>
                        <div class="detail-value">${business.taxCode || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Ngành nghề</div>
                        <div class="detail-value">${business.industry || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Số nhân viên</div>
                        <div class="detail-value">${business.employeeCount || 'N/A'}</div>
                    </div>
                    <div class="detail-item detail-full">
                        <div class="detail-label">Địa chỉ</div>
                        <div class="detail-value">${business.address || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Người liên hệ</div>
                        <div class="detail-value">${business.contactName || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Chức vụ</div>
                        <div class="detail-value">${business.position || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Điện thoại</div>
                        <div class="detail-value">${business.phone || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${business.email || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Loại khóa học</div>
                        <div class="detail-value">${business.trainingType || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Số học viên</div>
                        <div class="detail-value">${business.traineeCount || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Địa điểm đào tạo</div>
                        <div class="detail-value">${business.trainingLocation || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Ngân sách</div>
                        <div class="detail-value">${business.budget || 'N/A'}</div>
                    </div>
                    ${business.notes ? `
                    <div class="detail-item detail-full">
                        <div class="detail-label">Ghi chú</div>
                        <div class="detail-value">${business.notes}</div>
                    </div>
                    ` : ''}
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary" onclick="closeModal()">Đóng</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('detail-modal').style.display = 'block';
}

// View partner detail
async function viewPartnerDetail(id) {
    const partners = await window.FirebaseHelper.getAllPartners();
    const partner = partners.find(p => p.id === id);

    if (!partner) {
        alert('Không tìm thấy thông tin đối tác');
        return;
    }

    const fieldsText = Array.isArray(partner.trainingFields)
        ? partner.trainingFields.join(', ')
        : 'N/A';

    const modesText = Array.isArray(partner.trainingModes)
        ? partner.trainingModes.join(', ')
        : 'N/A';

    const modalHTML = `
        <div class="modal" id="detail-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Chi tiết Đối tác</h3>
                    <button class="close-modal" onclick="closeModal()">&times;</button>
                </div>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="detail-label">Tên tổ chức</div>
                        <div class="detail-value">${partner.orgName || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Mã số thuế</div>
                        <div class="detail-value">${partner.taxCode || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Giấy phép</div>
                        <div class="detail-value">${partner.licenseNumber || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Người đại diện</div>
                        <div class="detail-value">${partner.repName || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Điện thoại</div>
                        <div class="detail-value">${partner.repPhone || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Email</div>
                        <div class="detail-value">${partner.repEmail || 'N/A'}</div>
                    </div>
                    <div class="detail-item detail-full">
                        <div class="detail-label">Lĩnh vực đào tạo</div>
                        <div class="detail-value">${fieldsText}</div>
                    </div>
                    <div class="detail-item detail-full">
                        <div class="detail-label">Hình thức đào tạo</div>
                        <div class="detail-value">${modesText}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Khu vực hoạt động</div>
                        <div class="detail-value">${partner.serviceArea || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Sức chứa tối đa</div>
                        <div class="detail-value">${partner.maxCapacity || 'N/A'} người</div>
                    </div>
                    <div class="detail-item detail-full">
                        <div class="detail-label">Kinh nghiệm</div>
                        <div class="detail-value">${partner.experience || 'N/A'}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Trạng thái</div>
                        <div class="detail-value"><span class="status-badge ${partner.status}">${getStatusText(partner.status)}</span></div>
                    </div>
                </div>
                <div class="modal-actions">
                    ${partner.status === 'pending' ? `
                        <button class="btn btn-primary" onclick="approvePartner('${partner.id}'); closeModal();">Duyệt</button>
                        <button class="btn btn-danger" onclick="rejectPartner('${partner.id}'); closeModal();">Từ chối</button>
                    ` : ''}
                    <button class="btn btn-secondary" onclick="closeModal()">Đóng</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('detail-modal').style.display = 'block';
}

// Approve partner
async function approvePartner(id) {
    if (confirm('Xác nhận duyệt đối tác này?')) {
        const result = await window.FirebaseHelper.updatePartnerStatus(id, 'approved');
        if (result.success) {
            alert('Đã duyệt đối tác thành công!');
            loadRecentPartners();
            loadStatistics();
        } else {
            alert('Có lỗi xảy ra: ' + result.error);
        }
    }
}

// Reject partner
async function rejectPartner(id) {
    if (confirm('Xác nhận từ chối đối tác này?')) {
        const result = await window.FirebaseHelper.updatePartnerStatus(id, 'rejected');
        if (result.success) {
            alert('Đã từ chối đối tác');
            loadRecentPartners();
            loadStatistics();
        } else {
            alert('Có lỗi xảy ra: ' + result.error);
        }
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.remove();
    }
}

// Initialize dashboard
window.addEventListener('load', () => {
    loadStatistics();
    loadRecentRequests();
    loadRecentPartners();
});
