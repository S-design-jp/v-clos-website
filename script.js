document.addEventListener('DOMContentLoaded', (event) => {
    console.log('V-CLos Site Initialized.');

    // 1. ファーストビューの背景フェードアウト (既存のコード)
    setupHeroFadeOut();

    // 2. セクションのフェードイン (既存のコード)
    setupSectionFadeIn();

    // 3. 【追加】microCMSからニュースを取得・表示
    fetchNews();
});

// ----------------------------------------------------
// 1. ファーストビューの背景画像をスクロールでフェードアウト
// (処理を関数化)
// ----------------------------------------------------
function setupHeroFadeOut() {
    const heroBackground = document.querySelector('.hero-background');
    const heroSection = document.getElementById('hero');

    if (heroBackground && heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            const fadeStart = 0;
            const fadeEnd = heroHeight * 0.7;
            let opacity = 1;
            if (scrollY > fadeStart) {
                opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
            }
            heroBackground.style.opacity = Math.max(0, opacity);
        });
    }
}

// ----------------------------------------------------
// 2. スクロールによるセクションのフェードインアニメーション
// (処理を関数化)
// ----------------------------------------------------
function setupSectionFadeIn() {
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ----------------------------------------------------
// 3. microCMSからニュースを取得する関数 (【ここを修正】)
// ----------------------------------------------------
async function fetchNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;

    // 【変更点】
    // リクエスト先を、microCMSから「中継役」のパスに変更
    const endpoint = '/api/news'; 

    try {
        // 【変更点】
        // APIキーはサーバー側で処理されるため、headers: {} は不要
        const response = await fetch(endpoint); 

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.contents;

        console.log('microCMSから取得したデータ:', articles);

        // "Loading..."を削除
        newsList.innerHTML = ''; 

        if (articles.length === 0) {
            newsList.innerHTML = '<li>現在、新しいニュースはありません。</li>';
            return;
        }

        // (↓ 取得した記事を描画する部分は変更なし)
        articles.forEach(article => {
            const li = document.createElement('li');
            const date = new Date(article.publishedAt);
            const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
            
            li.innerHTML = `
                <span class="news-date">${formattedDate}</span>
                <span class="news-title">${article.title}</span>
                <p class="news-summary">${article.summary}</p>
            `;
            newsList.appendChild(li);
        });

    } catch (error) {
        console.error('Failed to fetch news:', error);
        newsList.innerHTML = '<li>ニュースの読み込みに失敗しました。</li>';
    }
}