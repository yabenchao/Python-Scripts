document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. 打字機效果 (Typing Effect)
    // ----------------------------------------------------
    const tagline = document.querySelector('.tagline');
    const text = "< Gamer / Violinist / Developer >";
    if (tagline) {
        tagline.textContent = "";
        let index = 0;

        function typeWriter() {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        typeWriter();
    }

    // ----------------------------------------------------
    // 2. 超穩定按讚功能 (本地儲存 + 雲端同步預備)
    // ----------------------------------------------------
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');

    // 先讀取上次存放在電腦裡的數字
    let count = parseInt(localStorage.getItem('user_like_count')) || 0;
    
    if (likeCount) {
        likeCount.textContent = count;
    }

    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            // 1. 點擊瞬間馬上 +1（確保 UI 一定會變動）
            count++;
            if (likeCount) {
                likeCount.textContent = count;
            }

            // 2. 存入本地儲存區，確保重新整理也不會變回 0
            localStorage.setItem('user_like_count', count);

            // 3. 產生愛心飄浮動畫
            const heart = document.createElement('span');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤️';
            
            const rect = likeBtn.getBoundingClientRect();
            heart.style.left = `${e.clientX - rect.left}px`;
            heart.style.top = `${e.clientY - rect.top}px`;

            likeBtn.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 1000);
        });
    }

    // ----------------------------------------------------
    // 3. 3D 卡片傾斜特效 (3D Tilt Effect)
    // ----------------------------------------------------
    const card = document.querySelector('.card');

    if (card) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
});