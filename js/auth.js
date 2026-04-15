document.addEventListener("DOMContentLoaded", function () {

    const authArea = document.getElementById("auth-area");

    // kalau halaman tidak punya auth-area, hentikan
    if (!authArea) return;

    const isLogin = localStorage.getItem("isLogin");
    const username = localStorage.getItem("username");

    // JIKA SUDAH LOGIN
    if (isLogin === "true" && username) {
        authArea.innerHTML = `
            <span>Hi, <strong>${username}</strong></span>
            <span>|</span>
            <a href="#" id="logout-btn">Logout</a>
        `;

        const logoutBtn = document.getElementById("logout-btn");
        logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("isLogin");
            localStorage.removeItem("username");
            window.location.href = "index.html";
        });
    }

});
