document.addEventListener('DOMContentLoaded', (event) => {
    console.log('V-CLos Site Initialized.');

    setupScrollEffects();

    setupSectionFadeIn();

    fetchNews();
});

function setupScrollEffects() {
    // 【変更なし】ヒーロー背景（1枚目）の要素
    const heroBackground = document.querySelector('.hero-background');
    const heroSection = document.getElementById('hero');
    
    // 【追加】メイン背景（2枚目）の要素
    const mainBackground = document.getElementById('main-background');

    if (!heroSection || !mainBackground) return; // 要素がない場合は何もしない

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight; // heroセクションの高さ

        // ---------------------------------
        // (A) ヒーロー背景（1枚目）のフェードアウト (既存の処理)
        // ---------------------------------
        if (heroBackground) {
            const fadeStart = 0;
            const fadeEnd = heroHeight * 0.7; // 70%スクロールで消える
            let opacity = 1;
            if (scrollY > fadeStart) {
                opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
            }
            heroBackground.style.opacity = Math.max(0, opacity);
        }

        // ---------------------------------
        // (B) メイン背景（2枚目）のフェードイン (【追加】の処理)
        // ---------------------------------
        
        // ヒーローの40%地点からフェードイン開始
        const fadeInStart = heroHeight * 0.4; 
        // ヒーローの90%地点でフェードイン完了
        const fadeInEnd = heroHeight * 0.9; 

        let mainOpacity = 0;
        if (scrollY > fadeInStart) {
            mainOpacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        }
        
        // 0未満、1超過にならないよう制限
        mainBackground.style.opacity = Math.max(0, Math.min(1, mainOpacity));
    });
}
// ----------------------------------------------------
//Fade in animation (temp)
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
// Teke news form micoCMS
// ----------------------------------------------------
async function fetchNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;

    const endpoint = '/api/news'; 

    try {
        const response = await fetch(endpoint); 

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const articles = data.contents;

        console.log('microCMSから取得したデータ:', articles);

        newsList.innerHTML = ''; 

        if (articles.length === 0) {
            newsList.innerHTML = '<li>現在、新しいニュースはありません。</li>';
            return;
        }

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