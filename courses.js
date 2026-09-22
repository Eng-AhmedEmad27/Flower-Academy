// My Task 3: Course Catalog, Search, Filters, Wishlist and Pagination

const courses = [
  {
    id: 1,
    title: "Web Development Basics",
    instructor: "Ahmed Hassan",
    category: "Programming",
    level: "Beginner",
    price: 0,
    rating: 4.7,
    image: "images/web-development.jpg"
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Sara Ali",
    category: "Design",
    level: "Beginner",
    price: 500,
    rating: 4.8,
    image: "images/ui-ux-design.jpg"
  },
  {
    id: 3,
    title: "Data Analysis with Python",
    instructor: "Omar Khaled",
    category: "Data",
    level: "Intermediate",
    price: 700,
    rating: 4.6,
    image: "images/data-analysis.jpg"
  },
  {
    id: 4,
    title: "Advanced JavaScript",
    instructor: "Mona Samir",
    category: "Programming",
    level: "Advanced",
    price: 900,
    rating: 4.9,
    image: "images/javascript.jpg"
  },
  {
    id: 5,
    title: "Graphic Design Essentials",
    instructor: "Nour Mostafa",
    category: "Design",
    level: "Beginner",
    price: 0,
    rating: 4.5,
    image: "images/graphic-design.jpg"
  },
  {
    id: 6,
    title: "Digital Marketing Masterclass",
    instructor: "Youssef Adel",
    category: "Marketing",
    level: "Intermediate",
    price: 650,
    rating: 4.4,
    image: "images/digital-marketing.jpg"
  }
];

let currentPage = 1;
let currentView = "grid";
const coursesPerPage = 3;
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const levelFilter = document.getElementById("levelFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");
const coursesContainer = document.getElementById("coursesContainer");
const resultCount = document.getElementById("resultCount");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function getFilteredCourses() {
  let result = [...courses];
  const searchValue = searchInput.value.toLowerCase();

  if (searchValue !== "") {
    result = result.filter(course =>
      course.title.toLowerCase().includes(searchValue) ||
      course.instructor.toLowerCase().includes(searchValue)
    );
  }

  if (categoryFilter.value !== "all") {
    result = result.filter(course => course.category === categoryFilter.value);
  }

  if (levelFilter.value !== "all") {
    result = result.filter(course => course.level === levelFilter.value);
  }

  if (priceFilter.value === "free") {
    result = result.filter(course => course.price === 0);
  } else if (priceFilter.value === "paid") {
    result = result.filter(course => course.price > 0);
  }

  if (sortFilter.value === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortFilter.value === "priceLow") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortFilter.value === "priceHigh") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

function displayCourses() {
  const filteredCourses = getFilteredCourses();
  const start = (currentPage - 1) * coursesPerPage;
  const end = start + coursesPerPage;
  const pageCourses = filteredCourses.slice(start, end);

  coursesContainer.className = currentView === "grid" ? "courses-grid" : "courses-list";
  coursesContainer.innerHTML = "";
  resultCount.textContent = `${filteredCourses.length} courses found`;

  if (pageCourses.length === 0) {
    coursesContainer.innerHTML = `<p class="empty-message">No courses found.</p>`;
    return;
  }

  pageCourses.forEach(course => {
    let myWishlist = JSON.parse(localStorage.getItem("myWishlist")) || [];
    const isSaved = myWishlist.some(item => item.name === course.title);
    const card = document.createElement("div");
    card.className = "catalog-card";

    card.innerHTML = `
      <img src="${course.image}" alt="${course.title}">
      <div class="catalog-info">
        <h3>${course.title}</h3>
        <p><strong>Instructor:</strong> ${course.instructor}</p>
        <p><strong>Category:</strong> ${course.category}</p>
        <p><strong>Level:</strong> ${course.level}</p>
        <p><strong>Rating:</strong> ⭐ ${course.rating}</p>
        <p><strong>Price:</strong> ${course.price === 0 ? "Free" : course.price + " EGP"}</p>

        <div class="catalog-actions">
          <a href="course-details.html?id=${course.id}" class="btn">View Details</a>
          <button class="wishlist-btn" onclick="addToWishlist('${course.title}'); location.reload();">
            ${isSaved ? "❤️ Saved" : "🤍 Wishlist"}
          </button>
        </div>
      </div>
    `;

    coursesContainer.appendChild(card);
  });

  pageNumber.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= filteredCourses.length;
}

function addToWishlist(courseName) {
    // 1. جلب القائمة الحالية من المتصفح
    let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];

    // 2. التحقق لو الكورس موجود قبل كده
    const isExist = wishlist.some(course => course.name === courseName);

    if (isExist) {
        // إزالة الكورس من القائمة
        wishlist = wishlist.filter(course => course.name !== courseName);
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        alert("the course removed from your wishlist. 💔");
    } else {
        // 3. إضافة الكورس الجديد
        wishlist.push({ name: courseName, progress: "0%" });
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
        alert("the course added to your wishlist. 💜");
    }
}

function changeView(view) {
  currentView = view;
  displayCourses();
}

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  levelFilter.value = "all";
  priceFilter.value = "all";
  sortFilter.value = "default";
  currentPage = 1;
  displayCourses();
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  displayCourses();
});

categoryFilter.addEventListener("change", resetPage);
levelFilter.addEventListener("change", resetPage);
priceFilter.addEventListener("change", resetPage);
sortFilter.addEventListener("change", resetPage);

function resetPage() {
  currentPage = 1;
  displayCourses();
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayCourses();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  displayCourses();
});

displayCourses();
