// بيانات تجريبية لكورسات الطالب
const enrolledCourses = [
    { name: "UI/UX Design Essentials", progress: 75 },
    { name: "JavaScript Fundamentals", progress: 40 },
    { name: "Advanced CSS Animations", progress: 10 }
];
const myCourses = [
    { name: "UI/UX Design Essentials", progress: 75 },
    { name: "JavaScript Fundamentals", progress: 40 },
    { name: "Advanced CSS Animations", progress: 10 },
    { name: "Web development Basics", progress: 0}
];

function updateCourses() {
    const container = document.getElementById('std-courses-container');
    if(container) {
        const isDark = document.body.classList.contains('dark');
        const cardBg = isDark ? '#2a2a3e' : 'white';
        const textColor = isDark ? '#e0e0e0' : '#333';
        const progressBg = isDark ? '#1e1e2f' : '#eee';
        const buttonBg = isDark ? '#3a2a5a' : '#f3e8ff';
        const buttonColor = '#c364fa';
        const boxShadow = isDark ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.02)';
        
        container.innerHTML = enrolledCourses.map(course => `
            <div style="background:${cardBg}; padding:20px; border-radius:15px; margin-bottom:15px; box-shadow:${boxShadow}">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
                    <h4 style="margin:0; color:${textColor}">${course.name}</h4>
                    <span style="color:#c364fa; font-weight:bold">${course.progress}%</span>
                </div>
                <div style="width:100%; height:8px; background:${progressBg}; border-radius:10px; overflow:hidden">
                    <div style="width:${course.progress}%; height:100%; background:#c364fa; border-radius:10px"></div>
                </div>
                <button style="margin-top:15px; padding:8px 20px; border-radius:8px; border:none; background:${buttonBg}; color:${buttonColor}; cursor:pointer; font-weight:600">Resume Lesson</button>
            </div>
        `).join('');
    }
}

function loadWishlist() {
    const wishlistContainer = document.getElementById('enrolled-list-content');
    const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];

    if (!wishlistContainer) return;

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = `
            <div style="text-align:center; padding:50px; color:#777;">
                <p style="font-size:1.2rem;">Your Wishlist is empty 🌸</p>
                <a href="courses.html" style="color:#c364fa; text-decoration:none; font-weight:bold;">Browse Courses</a>
            </div>`;
        return;
    }

    // عرض البيانات مع مراعاة التصميم الرمادي والحواف الناعمة
    wishlistContainer.innerHTML = wishlist.map((course, index) => `
        <div class="course-item" style="background: #242526; padding:20px; border-radius:18px; margin-bottom:15px; display:flex; justify-content:space-between; align-items:center; border:none; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div>
                <h4 style="color: white; margin:0; font-family: 'Segoe UI', sans-serif;">${course.name}</h4>
                <p style="color: #b0b3b8; font-size:0.85rem; margin-top:5px;">Added to your saved collection</p>
            </div>
            <div style="display:flex; gap:10px;">
                <button onclick="removeFromWishlist(${index})" style="background:rgba(255, 77, 77, 0.1); color:#ff4d4d; border:none; padding:8px 15px; border-radius:10px; cursor:pointer; font-weight:bold; transition: 0.3s;">Remove</button>
                <button style="background:#c364fa; color:white; border:none; padding:8px 15px; border-radius:10px; cursor:pointer; font-weight:bold; transition: 0.3s;">Enroll</button>
            </div>
        </div>
    `).join('');
}

// دالة الحذف لضمان عمل الأزرار
window.removeFromWishlist = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    loadWishlist(); // تحديث العرض فوراً
};

document.addEventListener('DOMContentLoaded', () => {
    updateCourses();
    loadWishlist();
});

// Make it global for the theme toggle
window.updateCourses = updateCourses;

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.STD-dashboard-menu li a');
    const tabs = document.querySelectorAll('.dashboard-tab');

    menuLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. إزالة الحالة النشطة من كل الزراير
            menuLinks.forEach(l => l.parentElement.classList.remove('active'));
            // 2. تفعيل الزرار اللي اضغط عليه
            link.parentElement.classList.add('active');

            // 3. إخفاء كل التابات
            tabs.forEach(tab => tab.style.display = 'none');

            // 4. إظهار التاب المناسبة بناءً على الترتيب
            if (index === 0) document.getElementById('tab-progress').style.display = 'block';
            if (index === 1) document.getElementById('tab-enrolled').style.display = 'block';
            if (index === 2) document.getElementById('tab-certificates').style.display = 'block';
            if (index === 3) document.getElementById('tab-settings').style.display = 'block';
        });
    });
});
