document.addEventListener("DOMContentLoaded", loadHero);

async function loadHero() {
    try {
        const res = await fetch("http://localhost:3000/api/hero");
        const data = await res.json();

        // پر کردن مقادیر در HTML
        document.getElementById("hero-fullname").textContent = data.fullname;
        document.getElementById("hero-job").textContent = data.job_title;
        document.getElementById("hero-university").textContent = data.short_description;

    } catch (err) {
        console.log("Hero Fetch Error:", err);
    }
}

async function loadAbout() {
    try {
        const res = await fetch("http://localhost:3000/api/about");
        const data = await res.json();

        document.getElementById("about-title").textContent = data.title;
        document.getElementById("about-desc").innerHTML = data.description;
    } catch (err) {
        console.log("Error loading About:", err);
    }
}

// اجرا هنگام لود صفحه
document.addEventListener("DOMContentLoaded", loadAbout);

async function loadSkills() {
    try {
        const res = await fetch("http://localhost:3000/api/skills");
        const skills = await res.json();

        const container = document.getElementById("skills-container");
        container.innerHTML = "";

        // نام دسته ها  
        const categories = {
            1: "فرانت اند",
            2: "بک اند",
            3: "دیتابیس"
        };

        // گروه بندی
        const grouped = {};
        skills.forEach(skill => {
            if (!grouped[skill.category_id]) {
                grouped[skill.category_id] = [];
            }
            grouped[skill.category_id].push(skill);
        });

        // ساخت کارت‌ها
        Object.keys(grouped).forEach(catId => {
            const card = document.createElement("div");
            card.className = "skill-card";

            // عنوان دسته
            card.innerHTML = `
                <h3 class="skill-card-title">${categories[catId]}</h3>
            `;

            // آیتم‌های مهارت
            grouped[catId].forEach(skill => {
                card.innerHTML += `
                    <div class="skill-item">
                        <div class="skill-row">
                            <span>${skill.skill_name}</span>
                            <span>${skill.percentage}%</span>
                        </div>

                        <div class="progress">
                            <div class="progress-fill" style="width: ${skill.percentage}%"></div>
                        </div>
                    </div>
                `;
            });

            container.appendChild(card);
        });

    } catch (err) {
        console.log("خطا در دریافت مهارت‌ها:", err);
        document.getElementById("skills-container").textContent = "خطا در دریافت اطلاعات!";
    };
};
document.addEventListener("DOMContentLoaded", loadSkills);


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
});
