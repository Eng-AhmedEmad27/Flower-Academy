document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // جلب القيمة المختارة من الورود
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const feedbackText = document.getElementById('userFeedback').value;

    if (!selectedRating) {
        alert("Please pick a flower to rate us! 🌸");
        return;
    }

    if (feedbackText.trim() === "") {
        alert("Please write a few words about your experience. ✨");
        return;
    }

    // عرض رسالة شكر (وهمية حالياً)
    alert(`Thank you for your ${selectedRating.value}-flower rating! \nYour feedback has been sent to the FlowerAcademy team. 💜`);
    
    // إعادة تعيين الفورم
    this.reset();
});