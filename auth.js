document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupTabBtn = document.getElementById("signup-tab");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;

        // קריאה ל־API שלכם
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // שרת החזיר הודעת שגיאה
                showErrorPopup(data.message);
                return;
            }

            // התחברות הצליחה – אפשר להפנות לדף הבית
            window.location.href = "/home.html";

        } catch (error) {
            console.error("Error:", error);
            showErrorPopup("שגיאת תקשורת. נסי שוב בעוד רגע.");
        }
    });

    // פונקציה ליצירת פופ אפ Bootstrap
    function showErrorPopup(message) {
        const modalHTML = `
            <div class="modal fade" id="errorModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content text-center p-3">

                        <h5 class="mb-3" style="color:#d9534f;">שגיאה</h5>
                        <p>${message}</p>

                        <button id="goToSignup" class="btn btn-primary mt-3" data-bs-dismiss="modal">
                            לעבור להרשמה
                        </button>
                    </div>
                </div>
            </div>
        `;

        // מוסיפים לדף
        document.body.insertAdjacentHTML("beforeend", modalHTML);

        // מפעילים את המודל
        const modal = new bootstrap.Modal(document.getElementById("errorModal"));
        modal.show();

        // כפתור להעברת המשתמש לטאב הרשמה
        document.getElementById("goToSignup").addEventListener("click", () => {
            const signupTab = new bootstrap.Tab(signupTabBtn);
            signupTab.show();
        });
    }
});
