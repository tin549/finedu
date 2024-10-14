// wed.js

document.addEventListener('DOMContentLoaded', () => {
    const menuBar = document.querySelector(".fa-bars");
    const closeBtn = document.querySelector(".fa-xmark");

    if (menuBar) {
        menuBar.addEventListener("click", function() {
            document.querySelector(".header-top ul").style.transform = "translateX(0%)"; 
            document.querySelector(".header-top ul").style.opacity = "1";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", function() {
            document.querySelector(".header-top ul").style.transform = "translateX(100%)";
            document.querySelector(".header-top ul").style.opacity = "0";
        });
    }

    // ----------------Trang Chủ - Hiển thị người dùng----------------
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    const userNameElement = document.getElementById('user-name');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Kiểm tra nếu người dùng đã đăng nhập
    if (user) {
        // Hiển thị tên người dùng và ẩn các nút đăng ký/đăng nhập
        userNameElement.textContent = `Xin chào, ${user.fullname}`;
        userNameElement.style.display = 'inline-block';  // Hiển thị tên người dùng
        registerBtn.style.display = 'none';  // Ẩn nút đăng ký
        loginBtn.style.display = 'none';  // Ẩn nút đăng nhập
        logoutBtn.style.display = 'inline-block';  // Hiển thị nút đăng xuất
    }

    // Xử lý sự kiện khi nhấn nút Đăng Xuất
    logoutBtn.addEventListener('click', function() {
        // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem('user');

        // Tải lại trang để trở về trạng thái chưa đăng nhập
        window.location.reload();
    });
});

// ----------------dangKi--------------------------
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form'); // Lấy form đăng ký

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn form tự động gửi đi

        // Lấy dữ liệu từ các trường trong form
        const fullname = document.querySelector('input[name="fullname"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const confirmPassword = document.querySelector('input[name="confirm-password"]').value;

        // Kiểm tra xem tất cả các trường có được nhập đầy đủ hay không
        if (!fullname || !email || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Kiểm tra mật khẩu có khớp không
        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp.');
            return;
        }

        // Tạo đối tượng user
        const user = {
            fullname: fullname,
            email: email,
            password: password, // Thực tế, bạn nên băm mật khẩu trước khi lưu
        };

        // Lưu đối tượng user vào localStorage
        localStorage.setItem('user', JSON.stringify(user));

        alert('Đăng ký thành công. Bạn sẽ được chuyển hướng đến trang đăng nhập.');
        window.location.href = './dangNhap.html'; // Chuyển hướng tới trang đăng nhập
    });
});

// ----------------dangNhap-------------------------
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form'); // Lấy form đăng nhập

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Ngăn form tự động gửi đi

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        // Lấy thông tin user từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Kiểm tra thông tin đăng nhập
        if (user && email === user.email && password === user.password) {
            alert('Đăng nhập thành công! Đang chuyển hướng...');
            window.location.href = './index.html'; // Chuyển hướng đến trang chính
        } else {
            alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    });
});

// ----------khóa học---------------------
let listVideos = document.querySelectorAll('.video-list .vid'); // Sửa ở đây để lấy tất cả các phần tử .vid
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');

listVideos.forEach(video => {
    video.onclick = () => {
        // Xóa lớp active từ tất cả video
        listVideos.forEach(vid => vid.classList.remove('active'));
        
        // Thêm lớp active cho video được nhấp
        video.classList.add('active');

        // Nếu video được nhấp có lớp active, cập nhật video chính
        if (video.classList.contains('active')) {
            let src = video.children[0].getAttribute('src');
            mainVideo.src = src;

            let text = video.children[1].innerHTML;
            title.innerHTML = text;

            // Tự động phát video chính khi chọn
            mainVideo.play();
        }
    };
});
