// بيانات المسار
const courseSteps = [
    { id: 1, type: 'video', title: 'Lesson 1: Introduction', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', locked: false },
    { id: 2, type: 'assignment', title: 'Assignment #1: First Project', locked: true },
    { id: 3, type: 'video', title: 'Lesson 2: Advanced Tools', url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', locked: true },
    { id: 4, type: 'assignment', title: 'Assignment #2: Final Project', locked: true },
    { id: 5, type: 'video', title: 'Lesson 3: Graduation Guide', url: 'https://www.youtube.com/embed/l482T0yNkeo', locked: true },
    { id: 6, type: 'quiz', title: 'Final Comprehensive Quiz', locked: true }
];

// أسئلة الكويز (تقدري تغيريها)
const quizQuestions = [
    { q: "What is the primary color of Flower Academy?", options: ["Purple", "Green", "Red"], correct: 0 },
    { q: "How many assignments are in this course?", options: ["1", "2", "3"], correct: 1 },
    { q: "Do you get a certificate after this quiz?", options: ["Yes", "No"], correct: 0 }
];

let currentStepIndex = 0;
let quizScore = 0;

function renderSidebar() {
    const list = document.getElementById('stepsList');
    list.innerHTML = '';
    courseSteps.forEach((step, index) => {
        const item = document.createElement('div');
        item.className = `step-item ${step.locked ? 'locked' : ''} ${index === currentStepIndex ? 'active' : ''}`;
        item.innerHTML = `<span>${step.title}</span> <span>${step.locked ? '🔒' : (index < currentStepIndex ? '✅' : '▶️')}</span>`;
        if (!step.locked) item.onclick = () => loadStep(index);
        list.appendChild(item);
    });
}

function loadStep(index) {
    currentStepIndex = index;
    const step = courseSteps[index];
    const playerWrapper = document.querySelector('.video-wrapper'); // الحاوية السوداء
    const assignArea = document.getElementById('assignmentArea');

    // تصفية المكان أولاً
    playerWrapper.innerHTML = ''; 
    assignArea.style.display = "none";

    if (step.type === 'video') {
        playerWrapper.innerHTML = `<iframe src="${step.url}" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>`;
        setTimeout(() => unlockNextStep(), 2000); // محاكاة لفتح اللي بعده
    } 
    else if (step.type === 'assignment') {
        playerWrapper.style.display = "none";
        assignArea.style.display = "block";
    } 
    else if (step.type === 'quiz') {
        playerWrapper.style.display = "block";
        playerWrapper.style.background = "white"; // نغير الخلفية للأبيض عشان الكويز يبان
        startQuiz(playerWrapper);
    }
    renderSidebar();
}

function startQuiz(container) {
    container.innerHTML = `
        <div style="padding: 40px; text-align: center; color: #333;">
            <h2 style="color: #a074fa;">Final Exam 📝</h2>
            <div id="quizContent">
                <p id="qText" style="font-size: 20px; margin-bottom: 20px;">${quizQuestions[0].q}</p>
                <div id="optionsBtn" style="display: flex; flex-direction: column; gap: 10px;">
                    ${quizQuestions[0].options.map((opt, i) => `<button onclick="checkQuizAns(${i})" style="padding:15px; border:1px solid #ddd; border-radius:10px; cursor:pointer; background:white;">${opt}</button>`).join('')}
                </div>
            </div>
        </div>
    `;
}

let qIdx = 0;
window.checkQuizAns = (ans) => {
    if(ans === quizQuestions[qIdx].correct) quizScore++;
    qIdx++;
    
    if(qIdx < quizQuestions.length) {
        document.getElementById('qText').innerText = quizQuestions[qIdx].q;
        const btns = quizQuestions[qIdx].options.map((opt, i) => `<button onclick="checkQuizAns(${i})" style="padding:15px; border:1px solid #ddd; border-radius:10px; cursor:pointer; background:white;">${opt}</button>`).join('');
        document.getElementById('optionsBtn').innerHTML = btns;
    } else {
        document.getElementById('quizContent').innerHTML = `
            <h3>Quiz Finished! 🎉</h3>
            <p style="font-size: 30px; font-weight: bold; color: #ea74ff;">Score: ${quizScore}/${quizQuestions.length}</p>
            <button onclick="window.location.href='certificate.html'" style="background:#a074fa; color:white; border:none; padding:15px 30px; border-radius:10px; cursor:pointer; margin-top:20px;">Get My Certificate 🎓</button>
        `;
    }
};

function unlockNextStep() {
    if (currentStepIndex < courseSteps.length - 1) {
        courseSteps[currentStepIndex + 1].locked = false;
        renderSidebar();
    }
}

function submitAssignment() {
    alert("Assignment submitted! Next lesson unlocked.");
    document.querySelector('.video-wrapper').style.display = "block"; // نرجع مساحة الفيديو
    unlockNextStep();
    loadStep(currentStepIndex + 1);
}

renderSidebar();
loadStep(0);