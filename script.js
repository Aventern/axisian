// script.js

// スムーズスクロール
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// フォームバリデーション
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let valid = true;

    if (!name) {
        alert('名前を入力してください。');
        valid = false;
    }

    if (!email) {
        alert('メールアドレスを入力してください。');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        alert('有効なメールアドレスを入力してください。');
        valid = false;
    }

    if (!message) {
        alert('メッセージを入力してください。');
        valid = false;
    }

    if (valid) {
        alert('お問い合わせありがとうございます！');
        // フォームをリセットする
        document.getElementById('contactForm').reset();
    }
});


// 音楽の自動再生を試みるコード
window.addEventListener('load', () => {
    const audio = document.getElementById('backgroundMusic');
    audio.play().catch((error) => {
        console.log('自動再生がブロックされました。ユーザーの操作が必要です。');
    });
});
