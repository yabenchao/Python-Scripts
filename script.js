document.addEventListener('DOMContentLoaded', () => {
    const firebaseConfig = {
        apiKey: 'AIzaSyDug8slvE1sJIpAOtOe188bvGOMgBm09kY',
        authDomain: 'project-5900549989236517000.firebaseapp.com',
        databaseURL: 'https://project-5900549989236517000-default-rtdb.firebaseio.com',
        projectId: 'project-5900549989236517000',
        storageBucket: 'project-5900549989236517000.firebasestorage.app',
        messagingSenderId: '402957485429',
        appId: '1:402957485429:web:28764864203d57cfb6ff3c',
        measurementId: 'G-GKPQEFXY1T'
    };

    let firebaseDatabase = null;
    if (window.firebase) {
        const firebaseApp = window.firebase.initializeApp(firebaseConfig);
        firebaseDatabase = window.firebase.database(firebaseApp);
    }

    const translations = {
        zh: {
            navLabel: '網站導覽',
            profileNav: '個人介紹',
            skillsNav: '技能／專長',
            gamesNav: '遊戲紀錄',
            onlineStatus: 'ONLINE / EXPLORING',
            aboutKicker: '關於我',
            skillsKicker: '技能與專長',
            gamesKicker: '遊戲紀錄',
            profileTitle: '嗨，我是周以秉',
            profileDescription: '目前就讀池上國中，平常喜歡打電動和吃生魚片。個性是正常人，正在慢慢探索自己喜歡的事物。',
            schoolLabel: 'SCHOOL',
            talentLabel: 'TALENT',
            interestsLabel: 'INTERESTS',
            likeButton: '❤️ 給我一個讚',
            skillsTitle: '我會做的事',
            editingSkill: '剪輯',
            editingDescription: '影片與內容創作',
            violinSkill: '小提琴',
            violinDescription: '音樂與演奏',
            sportsSkill: '運動',
            sportsDescription: '保持活力與挑戰',
            debateSkill: '辯論',
            debateDescription: '表達觀點與交流',
            gamesTitle: '遊戲紀錄',
            valorantRank: '段位：金牌 2',
            valorantName: '名稱：愛停在那場雨 我困在那個你#000',
            brawlRank: '段位：鑽石 1',
            brawlId: 'ID：Imissherbecause',
            footerText: 'Designed by 周以秉 • HTML, CSS & JS'
        },
        en: {
            navLabel: 'Site navigation',
            profileNav: 'About Me',
            skillsNav: 'Skills',
            gamesNav: 'Game Log',
            onlineStatus: 'ONLINE / EXPLORING',
            aboutKicker: 'ABOUT ME',
            skillsKicker: 'SKILLS & TALENTS',
            gamesKicker: 'GAME LOG',
            profileTitle: 'Hi, I am Zhou Yibing',
            profileDescription: 'I study at Chishang Junior High School. I enjoy gaming and eating sashimi, and I am exploring the things I love.',
            schoolLabel: 'SCHOOL',
            talentLabel: 'TALENT',
            interestsLabel: 'INTERESTS',
            likeButton: '❤️ Like this page',
            skillsTitle: 'Things I Do',
            editingSkill: 'Video Editing',
            editingDescription: 'Video and content creation',
            violinSkill: 'Violin',
            violinDescription: 'Music and performance',
            sportsSkill: 'Sports',
            sportsDescription: 'Energy and challenges',
            debateSkill: 'Debate',
            debateDescription: 'Ideas and communication',
            gamesTitle: 'Game Log',
            valorantRank: 'Rank: Gold 2',
            valorantName: 'Name: 愛停在那場雨 我困在那個你#000',
            brawlRank: 'Rank: Diamond 1',
            brawlId: 'ID: Imissherbecause',
            footerText: 'Designed by Zhou Yibing • HTML, CSS & JS'
        }
    };

    const languageToggle = document.getElementById('language-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    let currentLanguage = localStorage.getItem('site_language') || 'zh';

    function updateLanguage(language) {
        currentLanguage = language;
        const dictionary = translations[language];

        document.documentElement.lang = language === 'zh' ? 'zh-TW' : 'en';
        document.title = language === 'zh' ? '周以秉 | 個人主頁' : 'Zhou Yibing | Personal Page';
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            element.textContent = dictionary[element.dataset.i18n];
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
            element.setAttribute('aria-label', dictionary[element.dataset.i18nAriaLabel]);
        });

        if (languageToggle) {
            languageToggle.querySelector('span').textContent = language === 'zh' ? 'EN' : '中';
            languageToggle.setAttribute('aria-label', language === 'zh' ? '切換英文' : 'Switch to Chinese');
            languageToggle.setAttribute('aria-pressed', String(language === 'en'));
        }
        if (themeToggle) {
            updateTheme(document.body.classList.contains('light-theme'));
        }
        localStorage.setItem('site_language', language);
    }

    function updateTheme(isLight) {
        document.body.classList.toggle('light-theme', isLight);
        if (themeToggle) {
            themeToggle.querySelector('i').className = `fa-solid fa-${isLight ? 'moon' : 'sun'}`;
            themeToggle.querySelector('span').textContent = isLight ? (currentLanguage === 'zh' ? '深色' : 'Dark') : (currentLanguage === 'zh' ? '淺色' : 'Light');
            themeToggle.setAttribute('aria-label', isLight ? (currentLanguage === 'zh' ? '切換深色主題' : 'Switch to dark theme') : (currentLanguage === 'zh' ? '切換淺色主題' : 'Switch to light theme'));
            themeToggle.setAttribute('aria-pressed', String(isLight));
        }
        localStorage.setItem('site_theme', isLight ? 'light' : 'dark');
    }

    updateLanguage(currentLanguage);
    updateTheme(localStorage.getItem('site_theme') === 'light');

    languageToggle?.addEventListener('click', () => updateLanguage(currentLanguage === 'zh' ? 'en' : 'zh'));
    themeToggle?.addEventListener('click', () => updateTheme(!document.body.classList.contains('light-theme')));

    // ----------------------------------------------------
    // 0. Sidebar 導覽
    // ----------------------------------------------------
    const sidebar = document.getElementById('site-sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const pagePanels = document.querySelectorAll('.page-panel');

    function toggleSidebar(forceOpen) {
        const isOpen = forceOpen ?? !sidebar.classList.contains('is-open');
        sidebar.classList.toggle('is-open', isOpen);
        sidebarOverlay.classList.toggle('is-visible', isOpen);
        sidebarToggle.setAttribute('aria-expanded', String(isOpen));
        sidebarToggle.setAttribute('aria-label', isOpen ? '關閉網站選單' : '開啟網站選單');
        sidebarToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
    }

    if (sidebar && sidebarToggle && sidebarOverlay) {
        sidebarToggle.addEventListener('click', () => toggleSidebar());
        sidebarOverlay.addEventListener('click', () => toggleSidebar(false));

        sidebarLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const pageName = link.dataset.page;

                sidebarLinks.forEach((item) => {
                    const isActive = item === link;
                    item.classList.toggle('active', isActive);
                    item.setAttribute('aria-selected', String(isActive));
                });

                pagePanels.forEach((panel) => {
                    panel.hidden = panel.id !== `page-${pageName}`;
                });

                if (window.innerWidth <= 900) toggleSidebar(false);
            });
        });
    }

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
    // 2. 按讚功能（Firebase 雲端同步，無法連線時使用本機儲存）
    // ----------------------------------------------------
    const likeBtn = document.getElementById('like-btn');
    const likeCount = document.getElementById('like-count');

    let count = parseInt(localStorage.getItem('user_like_count')) || 0;
    const likesRef = firebaseDatabase ? firebaseDatabase.ref('site/likes') : null;

    if (likeCount) {
        likeCount.textContent = count;
    }

    if (likesRef) {
        likesRef.once('value').then((snapshot) => {
            if (snapshot.exists()) {
                count = snapshot.val();
                likeCount.textContent = count;
                localStorage.setItem('user_like_count', count);
            }
        }).catch(() => {});
    }

    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => {
            // 1. 點擊瞬間馬上 +1（確保 UI 一定會變動）
            count++;
            if (likeCount) {
                likeCount.textContent = count;
            }

            // 保留本機數字，讓鎖定規則或離線狀態不影響按鈕操作
            localStorage.setItem('user_like_count', count);

            if (likesRef) {
                likesRef.set(count).catch(() => {});
            }

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