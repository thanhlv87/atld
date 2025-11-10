// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.feature-card, .process-step, .course-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Courses Filter and Search (for courses.html page)
const categoryFilter = document.getElementById('category-filter');
const durationFilter = document.getElementById('duration-filter');
const searchInput = document.getElementById('search-input');
const coursesList = document.querySelector('.courses-list');
const noResults = document.querySelector('.no-results');

if (categoryFilter && coursesList) {
    function filterCourses() {
        const category = categoryFilter.value;
        const duration = durationFilter.value;
        const searchTerm = searchInput.value.toLowerCase();

        const courseItems = coursesList.querySelectorAll('.course-item');
        let visibleCount = 0;

        courseItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemText = item.textContent.toLowerCase();

            let matchesCategory = category === 'all' || itemCategory === category;
            let matchesSearch = itemText.includes(searchTerm);

            // Duration filter logic (simplified - would need data attributes for accurate filtering)
            let matchesDuration = duration === 'all';
            if (!matchesDuration && duration) {
                const metaText = item.querySelector('.course-meta-inline').textContent;
                if (duration === 'short' && (metaText.includes('1-2'))) {
                    matchesDuration = true;
                } else if (duration === 'medium' && (metaText.includes('2-3') || metaText.includes('3-4') || metaText.includes('3-5'))) {
                    matchesDuration = true;
                } else if (duration === 'long' && (metaText.includes('5-7') || metaText.includes('Trên'))) {
                    matchesDuration = true;
                }
            }

            if (matchesCategory && matchesSearch && matchesDuration) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }

    categoryFilter.addEventListener('change', filterCourses);
    durationFilter.addEventListener('change', filterCourses);
    searchInput.addEventListener('input', filterCourses);
}

// Business Registration Form Handler
const businessForm = document.getElementById('business-form');

if (businessForm) {
    businessForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const submitBtn = businessForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';

        // Collect form data
        const formData = {
            companyName: document.getElementById('company-name').value,
            taxCode: document.getElementById('tax-code').value,
            industry: document.getElementById('industry').value,
            employeeCount: document.getElementById('employee-count').value,
            address: document.getElementById('address').value,
            contactName: document.getElementById('contact-name').value,
            position: document.getElementById('position').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            trainingType: document.getElementById('training-type').value,
            traineeCount: document.getElementById('trainee-count').value,
            trainingLocation: document.getElementById('training-location').value,
            expectedTime: document.getElementById('expected-time').value,
            budget: document.getElementById('budget').value,
            notes: document.getElementById('notes').value,
            agreeTerms: document.getElementById('agree-terms').checked
        };

        // Validation
        if (!formData.agreeTerms) {
            alert('Vui lòng đồng ý với điều khoản sử dụng!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }

        // Check if Firebase is available
        if (typeof window.FirebaseHelper !== 'undefined') {
            // Save to Firebase
            const result = await window.FirebaseHelper.saveBusinessRegistration(formData);

            if (result.success) {
                alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.\n\nMã đăng ký của bạn: ' + result.id);
                businessForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('Có lỗi xảy ra: ' + result.error + '\n\nVui lòng thử lại hoặc liên hệ hotline: 0900 XXX XXX');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        } else {
            // Fallback if Firebase not configured
            console.log('Business Registration Data:', formData);
            alert('⚠️ Chế độ demo: Dữ liệu chưa được lưu.\n\nVui lòng cấu hình Firebase để lưu thực tế.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Partner Registration Form Handler
const partnerForm = document.getElementById('partner-form');

if (partnerForm) {
    partnerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const submitBtn = partnerForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';

        // Collect training fields
        const trainingFields = [];
        document.querySelectorAll('input[name="training-field"]:checked').forEach(cb => {
            trainingFields.push(cb.value);
        });

        // Collect training modes
        const trainingModes = [];
        document.querySelectorAll('input[name="training-mode"]:checked').forEach(cb => {
            trainingModes.push(cb.value);
        });

        // Validation for checkboxes
        if (trainingFields.length === 0) {
            alert('Vui lòng chọn ít nhất một lĩnh vực đào tạo!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }

        if (trainingModes.length === 0) {
            alert('Vui lòng chọn ít nhất một hình thức đào tạo!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }

        // Collect all form data
        const formData = {
            orgName: document.getElementById('org-name').value,
            taxCode: document.getElementById('org-tax-code').value,
            licenseNumber: document.getElementById('license-number').value,
            licenseDate: document.getElementById('license-date').value,
            address: document.getElementById('org-address').value,
            establishedYear: document.getElementById('established-year').value,
            website: document.getElementById('website').value,
            repName: document.getElementById('rep-name').value,
            repPosition: document.getElementById('rep-position').value,
            repPhone: document.getElementById('rep-phone').value,
            repEmail: document.getElementById('rep-email').value,
            trainingFields: trainingFields,
            trainerCount: document.getElementById('trainer-count').value,
            maxCapacity: document.getElementById('max-capacity').value,
            trainingModes: trainingModes,
            serviceArea: document.getElementById('service-area').value,
            experience: document.getElementById('experience').value,
            totalCourses: document.getElementById('total-courses').value,
            totalStudents: document.getElementById('total-students').value,
            certifications: document.getElementById('certifications').value,
            additionalInfo: document.getElementById('additional-info').value,
            agreeTerms: document.getElementById('agree-partner-terms').checked
        };

        // Validation
        if (!formData.agreeTerms) {
            alert('Vui lòng đồng ý với điều khoản đối tác!');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            return;
        }

        // Check if Firebase is available
        if (typeof window.FirebaseHelper !== 'undefined') {
            // Save to Firebase
            const result = await window.FirebaseHelper.savePartnerRegistration(formData);

            if (result.success) {
                alert('Đăng ký đối tác thành công! Chúng tôi sẽ xem xét và phản hồi trong vòng 3-5 ngày làm việc.\n\nMã đăng ký: ' + result.id);
                partnerForm.reset();
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                alert('Có lỗi xảy ra: ' + result.error + '\n\nVui lòng thử lại hoặc liên hệ: partner@atldconnect.vn');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        } else {
            // Fallback if Firebase not configured
            console.log('Partner Registration Data:', formData);
            alert('⚠️ Chế độ demo: Dữ liệu chưa được lưu.\n\nVui lòng cấu hình Firebase.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Button Click Effects
document.querySelectorAll('.btn').forEach(button => {
    if (button.tagName !== 'BUTTON' && button.tagName !== 'A') return;

    button.addEventListener('click', function(e) {
        // Only add ripple for actual buttons, not links
        if (this.tagName === 'BUTTON' || (this.tagName === 'A' && this.getAttribute('href') === '#')) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c🛡️ ATLĐ Connect - Nền tảng kết nối Đào tạo An toàn Lao động', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 14px;');

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone.replace(/[\s-]/g, ''));
}

// Add real-time validation for email and phone fields
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            this.setCustomValidity('Email không hợp lệ');
        } else {
            this.style.borderColor = '';
            this.setCustomValidity('');
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ef4444';
            this.setCustomValidity('Số điện thoại không hợp lệ (10-11 số)');
        } else {
            this.style.borderColor = '';
            this.setCustomValidity('');
        }
    });
});

// Auto-format phone number
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        e.target.value = value;
    });
});

// Prevent form submission on Enter key (except in textarea)
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});
