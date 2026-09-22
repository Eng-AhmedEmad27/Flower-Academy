// 1. البيانات الوهمية (Data)
const instructorData = {
    courses: [
        { id: 1, title: "Web development Basics", students: 200, price: "$29", status: "Published" },
        { id: 2, title: "Mastering JavaScript 2026", students: 450, price: "$49", status: "Published" },
        { id: 3, title: "UI/UX Advanced Techniques", students: 320, price: "$35", status: "Published" },
        { id: 4, title: "React & Next.js Bootcamp", students: 350, price: "$55", status: "Draft" }
    ],
    students: [
        { name: "Ahmed Salama", course: "JavaScript", date: "2026-05-01" },
        { name: "Sara Ali", course: "UI/UX Design", date: "2026-04-28" },
        { name: "Mona Hassan", course: "JavaScript", date: "2026-04-25" },
        { name: "Mohamed Nasser", course: "Web development", date: "2026-05-10"}
    ],
    earnings: [
        { id: "#TR990", amount: "+$49.00", date: "May 5, 2026", method: "PayPal" },
        { id: "#TR985", amount: "+$35.00", date: "May 3, 2026", method: "Bank Transfer" }
    ]
};

// 2. دالة التنقل بين القوائم
function showTab(tabId, title) {
    // إخفاء كل التابات
    document.querySelectorAll('.ins-tab-content').forEach(tab => tab.style.display = 'none');
    // إزالة active من المنيو
    document.querySelectorAll('.INS-menu li').forEach(li => li.classList.remove('active'));
    
    // إظهار التاب المطلوبة
    document.getElementById(`tab-${tabId}`).style.display = 'block';
    document.getElementById('tab-title').innerText = title;

    // تحديث البيانات بناءً على التاب
    if (tabId === 'my-courses') loadCourses();
    if (tabId === 'students') loadStudents();
    if (tabId === 'earnings') loadEarnings();
}

// 3. دوال تحميل البيانات
function loadCourses() {
    const container = document.getElementById('ins-courses-container');
    container.innerHTML = instructorData.courses.map(c => `
        <div class="course-row" style="display:flex; justify-content:space-between; padding:15px; border-bottom:1px solid #eee;">
            <span><strong>${c.title}</strong> (${c.students} Students)</span>
            <span style="color:#a074fa; font-weight:bold">${c.price}</span>
        </div>
    `).join('');
}

function loadStudents() {
    const container = document.getElementById('students-list-container');
    container.innerHTML = instructorData.students.map(s => `
        <div style="padding:10px; border-bottom:1px solid #eee;">
            <p style="margin:0"><strong>${s.name}</strong> - Enrolled in ${s.course}</p>
            <small style="color:#777">Date: ${s.date}</small>
        </div>
    `).join('');
}

function loadEarnings() {
    const container = document.getElementById('earnings-history-container');
    container.innerHTML = instructorData.earnings.map(e => `
        <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
            <span>ID: ${e.id} | ${e.date}</span>
            <span style="color:green; font-weight:bold">${e.amount}</span>
        </div>
    `).join('');
}

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    // ربط روابط المنيو بالوظائف
    const menuItems = document.querySelectorAll('.INS-menu li a');
    menuItems[0].onclick = () => showTab('dashboard', 'Instructor Dashboard 🚀');
    menuItems[1].onclick = () => showTab('my-courses', 'Manage My Courses 📚');
    menuItems[2].onclick = () => showTab('students', 'Student Community 👥');
    menuItems[3].onclick = () => showTab('earnings', 'Financial Reports 💰');
});