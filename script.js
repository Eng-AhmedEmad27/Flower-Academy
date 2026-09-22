function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("themeBtn");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    btn.textContent = "☀️";
  } else {
    btn.textContent = "🌙";
  }

  // Update course cards for dark mode
  if (window.updateCourses) {
    window.updateCourses();
  }
}

function showNotif() {
  alert("🔔 No new notifications yet!");
}

function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");

  if (!menu) return;

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

/* قفل المنيو لما تدوسي برا */
document.addEventListener("click", function (event) {
  const menu = document.getElementById("dropdownMenu");
  const icon = document.querySelector(".profile-icon");

  if (!menu || !icon) return;

  if (!menu.contains(event.target) && !icon.contains(event.target)) {
    menu.style.display = "none";
  }
});
// LOADING
window.onload = function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 1500); // 1.5 ثانية
}

// SCROLL TO TOP
function scrollTopBtn() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
function toggleAnswer() {
  const answer = document.getElementById("faq-answer");
  const motiv = document.getElementById("motiv");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    motiv.style.display = "none";
  } else {
    answer.style.display = "block";

    // تظهر بعد الإجابة بشوية
    setTimeout(() => {
      motiv.style.display = "block";
    }, 800);
  }
}

function logoutUser() {
    // 1. إظهار رسالة تأكيد لليوزر
    const confirmLogout = confirm("Are you sure you want to logout from FlowerAcademy? 🌸");
    
    if (confirmLogout) {
        // 2. مسح بيانات الجلسة (اختياري: لو عاوز تمسح الـ Wishlist أو بيانات معينة عند الخروج)
        // localStorage.removeItem('userToken'); // مثال لو عندك توكن
        
        // 3. تحويل اليوزر لصفحة تسجيل الدخول (مثلاً login.html)
        alert("Logging out... See you soon! 💜");
        window.location.href = "login.html"; // تأكد إن عندك صفحة بهذا الاسم
    }
}