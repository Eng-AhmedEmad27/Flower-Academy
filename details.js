// الحصول على المعرف من الرابط
const urlParams = new URLSearchParams(window.location.search);
const courseId = parseInt(urlParams.get('id'));

// البحث عن الكورس في قائمة إيمان
const currentCourse = courses.find(c => c.id === courseId);

if (currentCourse) {
    // تحديث النصوص
    document.getElementById("courseTitle").innerText = currentCourse.title;
    document.getElementById("coursePrice").innerText = currentCourse.price === 0 ? "Free" : currentCourse.price + " EGP";
    
    // تحديث الفيديو (بناءً على رابط موجود في الـ array أو فيديو افتراضي)
    if (currentCourse.videoUrl) {
        document.getElementById("courseVideo").src = currentCourse.videoUrl;
    }

    // تحديث الوصف التعريفي
    document.getElementById("courseDescription").innerHTML = `
        🌸 Welcome to <strong>${currentCourse.title}</strong>! 
        <br><br>
        In this journey, you'll go from <strong>${currentCourse.level}</strong> to a professional level under the supervision of <strong>${currentCourse.instructor}</strong>. 
        This course is designed to be highly practical with 3 lectures and 2 major assignments to ensure you master every detail.
    `;
} else {
    document.body.innerHTML = "<h2 style='text-align:center; padding-top:100px;'>Course Not Found! 🌸</h2>";
}

// في ملف details.js غيري الـ handleEnroll لتكون كدة:
function handleEnroll() {
    window.location.href = `payment.html?id=${courseId}`;
}
// داخل ملف details.js
function handleEnroll() {
    if (currentCourse.price === 0) {
        // كورس فري: بنسجل إنه "مدفوع" تلقائياً وبندخله فوراً
        localStorage.setItem('hasPaid_course_' + courseId, 'true');
        alert("This course is Free! Enjoy learning 🌸");
        window.location.href = "view-course.html?id=" + courseId;
    } else {
        // كورس بفلوس: يروح لصفحة الدفع
        window.location.href = "payment.html?id=" + courseId;
    }
}