document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("sendBtn");
    const statusMsg = document.getElementById("formStatus");

    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            statusMsg.style.color = "red";
            statusMsg.textContent = "لطفا تمام فیلدها را پر کنید!";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            statusMsg.style.color = "red";
            statusMsg.textContent = "ایمیل معتبر وارد کنید!";
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullname: name, 
                    email,
                    message
                }),
            });

            const data = await res.json();

            if (data.success) {
                statusMsg.style.color = "green";
                statusMsg.textContent = "پیام ذخیره شد ✔️";
                document.getElementById("contactForm").reset();
            } else {
                statusMsg.style.color = "red";
                statusMsg.textContent = "خطا در ذخیره پیام";
            }

        } catch (err) {
            statusMsg.style.color = "red";
            statusMsg.textContent = "ارتباط با سرور برقرار نشد!";
            console.error(err);
        }
    });
});