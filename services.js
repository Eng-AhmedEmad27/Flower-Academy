function openService(evt, serviceName) {
    // 1. إخفاء كل المحتويات (Panels)
    const tabPanels = document.getElementsByClassName("tab-panel");
    for (let i = 0; i < tabPanels.length; i++) {
        tabPanels[i].classList.remove("active");
    }

    // 2. إزالة كلاس active من جميع أزرار القائمة
    const menuItems = document.querySelectorAll(".service-menu li");
    menuItems.forEach(item => {
        item.classList.remove("active");
    });

    // 3. إظهار المحتوى المختار
    document.getElementById(serviceName).classList.add("active");

    // 4. إضافة كلاس active للزر الذي تم الضغط عليه
    evt.currentTarget.classList.add("active");
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatContainer');
    const messageText = input.value.trim();

    if (messageText === "") return;

    // 1. إنشاء عنصر الرسالة (كأن الطالب هو اللي بعتها)
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'sent');
    messageDiv.innerHTML = `<span>${messageText}</span>`;

    // 2. إضافة الرسالة للحاوية
    container.appendChild(messageDiv);

    // 3. مسح الإدخال
    input.value = "";

    // 4. عمل Scroll تلقائي لآخر رسالة تحت
    container.scrollTop = container.scrollHeight;

    // 5. محاكاة رد وهمي (اختياري - للتحسين)
    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.classList.add('message', 'received');
        replyDiv.innerHTML = `<span>Great point! FlowerAcademy students are the best 🌸</span>`;
        container.appendChild(replyDiv);
        container.scrollTop = container.scrollHeight;
    }, 1000);
}

// تشغيل الإرسال عند الضغط على Enter في الكيبورد
document.getElementById('chatInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// دالة وهمية لإدارة المستخدمين
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const userName = e.target.closest('tr').cells[0].innerText;
        alert(`Opening Management Settings for: ${userName} 🛠️`);
    }
});

// ممكن تعمل Function تخلي الأرقام تزيد كأنها Live Data
function updateAdminStats() {
    // كود مستقبلي لتحديث الأرقام من سيرفر
    console.log("Admin stats synchronized! 🌸");
}