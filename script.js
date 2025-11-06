// V-CLos Website Script (Unified)

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('V-CLos Site Initialized.');

    // ---------------------------------
    // 1. Scrolleffects (!!For all pages!!)
    // ---------------------------------
    // (index.html以外のページでは heroSection が null になるが、setupScrollEffects側でnullチェックしてるので安全)
    setupScrollEffects();

    // ---------------------------------
    // 2. Section fadein (!!For all pages!!)
    // ---------------------------------
    setupSectionFadeIn();

    // ---------------------------------
    // 3. Page-specific data retrieval (!!Important!!)
    // ---------------------------------

    if (document.getElementById('news-list')) {
        fetchTopPageNews();
    }

    if (document.getElementById('news-list-all')) {
        fetchAllNews();
    }

    if (document.getElementById('article-body')) {
        fetchNewsDetail();
    }
});


// ----------------------------------------------------
// 1. Hero Scroll Effects
// ----------------------------------------------------
function setupScrollEffects() {
    const heroBackground = document.querySelector('.hero-background');
    const heroSection = document.getElementById('hero');
    const mainBackground = document.getElementById('main-background');

    if (!heroSection || !mainBackground) return; 

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight; 

        // (A) Hero Background Fade Out
        if (heroBackground) {
            const fadeStart = 0;
            const fadeEnd = heroHeight * 0.7; 
            let opacity = 1;
            if (scrollY > fadeStart) {
                opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
            }
            heroBackground.style.opacity = Math.max(0, opacity);
        }

        // (B) Main Background Fade In
        const fadeInStart = heroHeight * 0.4; 
        const fadeInEnd = heroHeight * 0.9; 
        let mainOpacity = 0;
        if (scrollY > fadeInStart) {
            mainOpacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
        }
        mainBackground.style.opacity = Math.max(0, Math.min(1, mainOpacity));
    });
}

// ----------------------------------------------------
// 2. Section Fade-in Animation
// ----------------------------------------------------
function setupSectionFadeIn() {
    const sections = document.querySelectorAll('.content-section');
    if (sections.length === 0) return; // セクションがなければ何もしない

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
// 3-A. Fetch News (For Top Page / index.html)
// ----------------------------------------------------
async function fetchTopPageNews() {
    const newsList = document.getElementById('news-list');
    const endpoint = '/api/news'; 

    try {
        const response = await fetch(endpoint); 
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        
        const data = await response.json();
        const articles = data.contents;
        
        newsList.innerHTML = ''; 
        if (articles.length === 0) {
            newsList.innerHTML = '<li>現在、新しいニュースはありません。</li>';
            return;
        }

        articles.forEach(article => {
            const li = document.createElement('li');
            const formattedDate = formatDate(article.publishedAt);
            li.innerHTML = `
                <a href="news-detail.html?id=${article.id}" class="news-link">
                    <span class="news-date">${formattedDate}</span>
                    <span class="news-title">${article.title}</span>
                    <p class="news-summary">${article.summary}</p>
                </a>
            `;
            newsList.appendChild(li);
        });

    } catch (error) {
        console.error('Failed to fetch top page news:', error);
        newsList.innerHTML = '<li>ニュースの読み込みに失敗しました。</li>';
    }
}


// ----------------------------------------------------
// 3-B. Fetch All News (For /news.html)
// ----------------------------------------------------
async function fetchAllNews() {
    const newsListAll = document.getElementById('news-list-all');
    const endpoint = '/api/news?all=true'; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const data = await response.json();
        const articles = data.contents;

        newsListAll.innerHTML = ''; 
        if (articles.length === 0) {
            newsListAll.innerHTML = '<li>現在、新しいニュースはありません。</li>';
            return;
        }

        articles.forEach(article => {
            const li = document.createElement('li');
            const formattedDate = formatDate(article.publishedAt);
            li.innerHTML = `
                <a href="news-detail.html?id=${article.id}" class="news-link">
                    <span class="news-date">${formattedDate}</span>
                    <span class="news-title">${article.title}</span>
                    <p class="news-summary">${article.summary}</p>
                </a>
            `;
            newsListAll.appendChild(li);
        });

    } catch (error) {
        console.error('Failed to fetch all news:', error);
        newsListAll.innerHTML = '<li>ニュースの読み込みに失敗しました。</li>';
    }
}


// ----------------------------------------------------
// 3-C. Fetch News Detail (For /news-detail.html)
// ----------------------------------------------------
async function fetchNewsDetail() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    
    if (!articleId) {
        document.getElementById('article-body').innerHTML = '<p>記事IDが指定されていません。</p>';
        document.getElementById('article-title').innerText = 'エラー';
        return;
    }

    const endpoint = `/api/news?id=${articleId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const article = await response.json();

        document.title = `${article.title} | V-CLos Official Website`; 
        
        document.getElementById('article-title').innerText = article.title;
        
        document.getElementById('article-date').innerText = formatDate(article.publishedAt);
        
        document.getElementById('article-body').innerHTML = article.body;

    } catch (error) {
        console.error('Failed to fetch news detail:', error);
        document.getElementById('article-title').innerText = 'エラー';
        document.getElementById('article-body').innerHTML = '<p>記事の読み込みに失敗しました。</p>';
    }
}


// ----------------------------------------------------
// Utility: Date format function
// ----------------------------------------------------
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
}