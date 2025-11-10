// ----------------------------------------------------
// 0. Language Helper 
// ----------------------------------------------------
function getLanguagePrefix() {
    const path = window.location.pathname;
    
    if (path.startsWith('/en/')) {
        return '-en'; 
    }
    if (path.startsWith('/zh-Hans/')) { 
        return '-zh-Hans'; // 簡体字
    }
    return ''; 
}
const LANG_PREFIX = getLanguagePrefix();

// ----------------------------------------------------
// 0. DOMContentLoaded 
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('V-CLos Site Initialized.');
    setupMenuToggle();
    setupHeroSlider();
    setupSidebarActiveState();
    setupLanguageSwitcher();
    

    setupScrollEffects();
    setupSectionFadeIn();


    if (document.getElementById('news-list')) {
        fetchTopPageNews();
        fetchTopPageEvents();
    }
    if (document.getElementById('news-list-all')) {
        fetchAllNews();
    }
    if (document.getElementById('article-body')) {
        fetchNewsDetail();
    }
    if (document.getElementById('event-list-container')) {
        fetchEventsList();
    }
    if (document.getElementById('event-detail-wrapper')) {
        fetchEventDetail();
    }
});

// ----------------------------------------------------
// 1. Hero Scroll Effects
// ----------------------------------------------------
function setupScrollEffects() {
    const heroBackground = document.querySelector('.hero-slider-container');
    const heroSection = document.getElementById('hero');
    const mainBackground = document.getElementById('main-background');
    if (!heroSection || !mainBackground) return; 

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight; 
        if (heroBackground) { 
            const fadeStart = 0;
            const fadeEnd = heroHeight * 0.7; 
            let opacity = 1;
            if (scrollY > fadeStart) {
                opacity = 1 - ((scrollY - fadeStart) / (fadeEnd - fadeStart));
            }
            heroBackground.style.opacity = Math.max(0, opacity);
        }
        if (mainBackground) { 
            const fadeInStart = heroHeight * 0.4; 
            const fadeInEnd = heroHeight * 0.9; 
            let mainOpacity = 0;
            if (scrollY > fadeInStart) {
                mainOpacity = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart);
            }
            mainBackground.style.opacity = Math.max(0, Math.min(1, mainOpacity));
        }
    });
}

// ----------------------------------------------------
// 2. Section Fade-in Animation
// ----------------------------------------------------
function setupSectionFadeIn() {
    const sections = document.querySelectorAll('.content-section');
    if (sections.length === 0) return;
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => { observer.observe(section); });
}

// ----------------------------------------------------
// 3-A. Fetch News (For Top Page / index.html)
// ----------------------------------------------------
async function fetchTopPageNews() {
    const newsList = document.getElementById('news-list');
    if (!newsList) return;
    const endpoint = `/api/news${LANG_PREFIX}`;

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
            const isZH = (LANG_PREFIX === '-zh-Hans');
            const title = (isZH && article.title_zh_hans) ? article.title_zh_hans : article.title;
            const summary = (isZH && article.summary_zh_hans) ? article.summary_zh_hans : article.summary;
            
            li.innerHTML = `
                <a href="news-detail.html?id=${article.id}" class="news-link">
                    <span class="news-date">${formattedDate}</span>
                    <span class="news-title">${title}</span>
                    <p class="news-summary">${summary}</p>
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
    if (!newsListAll) return;
    const endpoint = `/api/news${LANG_PREFIX}?all=true`;

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
            const isZH = (LANG_PREFIX === '-zh-Hans'); 
            const title = (isZH && article.title_zh_hans) ? article.title_zh_hans : article.title;
            const summary = (isZH && article.summary_zh_hans) ? article.summary_zh_hans : article.summary;

            li.innerHTML = `
                <a href="news-detail.html?id=${article.id}" class="news-link">
                    <span class="news-date">${formattedDate}</span>
                    <span class="news-title">${title}</span>
                    <p class="news-summary">${summary}</p>
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
    const titleEl = document.getElementById('article-title');
    const bodyEl = document.getElementById('article-body');
    
    if (!articleId) {
        if (titleEl) titleEl.innerText = 'エラー';
        if (bodyEl) bodyEl.innerHTML = '<p>記事IDが指定されていません。</p>';
        return;
    }
    const endpoint = `/api/news${LANG_PREFIX}?id=${articleId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const article = await response.json();

        const isZH = (LANG_PREFIX === '-zh-Hans');
        const title = (isZH && article.title_zh_hans) ? article.title_zh_hans : article.title;
        const summary = (isZH && article.summary_zh_hans) ? article.summary_zh_hans : article.summary;
        const body = (isZH && article.body_zh_hans) 
                     ? article.body_zh_hans 
                     : (article.body || ''); 

        document.title = `${title} | V-CLos Official Website`; 
        titleEl.innerText = title;
        document.getElementById('article-date').innerText = formatDate(article.publishedAt);
        bodyEl.innerHTML = body || '<p>記事の本文がありません。</p>';

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title, 
            "datePublished": article.publishedAt,
            "description": summary || bodyEl.innerText.substring(0, 150) + "...", 
            "author": { "@type": "Organization", "name": "V-CLos" },
            "publisher": {
                "@type": "Organization",
                "name": "V-CLos",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://v-clos.jp/image/VCLosLogo.png" 
                }
            }
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

    } catch (error) {
        console.error('Failed to fetch news detail:', error);
        if (titleEl) titleEl.innerText = 'エラー';
        if (bodyEl) bodyEl.innerHTML = '<p>記事の読み込みに失敗しました。</p>';
    }
}

// ----------------------------------------------------
// 3-D. Fetch Events (For Top Page / index.html)
// ----------------------------------------------------
async function fetchTopPageEvents() {
    const eventListTop = document.getElementById('event-list-top');
    if (!eventListTop) return; 
    const endpoint = `/api/events${LANG_PREFIX}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const data = await response.json();
        const events = data.contents;
        
        eventListTop.innerHTML = ''; 
        if (events.length === 0) {
            eventListTop.innerHTML = '<li>現在、予定されているイベントはありません。</li>';
            return;
        }

        events.forEach(event => {
            const li = document.createElement('li');
            const formattedDate = formatDate(event.date); 
            const isZH = (LANG_PREFIX === '-zh-Hans');
            const title = (isZH && event.title_zh_hans) ? event.title_zh_hans : event.title;
            const series = event.series; 
            const status = (isZH && event.status_zh_hans) ? event.status_zh_hans : event.status;
            
            li.innerHTML = `
                <a href="live-detail.html?id=${event.id}" class="news-link">
                    <span class="news-date">${formattedDate}</span>
                    <div class="event-card-meta" style="margin-bottom: 10px;">
                        ${series ? `<span class="event-tag">${series}</span>` : ''}
                        ${status ? `<span class="event-tag">${status}</span>` : ''}
                    </div>
                    <span class="news-title">${title}</span>
                </a>
            `;
            eventListTop.appendChild(li);
        });

    } catch (error) {
        console.error('Failed to fetch top page events:', error);
        eventListTop.innerHTML = '<li>イベントの読み込みに失敗しました。</li>';
    }
}

// ----------------------------------------------------
// 3-E. Fetch All Events (For /live.html)
// ----------------------------------------------------
async function fetchEventsList() {
    const listContainer = document.getElementById('event-list-container');
    if (!listContainer) return; 
    const endpoint = `/api/events${LANG_PREFIX}?all=true`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const data = await response.json();
        const events = data.contents;
        console.log('microCMSから取得したEventsデータ:', events);
        const loadingEl = listContainer.querySelector('.event-loading');
        if (loadingEl) loadingEl.remove();
        if (events.length === 0) {
            listContainer.innerHTML = '<p>現在、予定されているイベントはありません。</p>';
            return;
        }

        events.forEach(event => {
            const card = document.createElement('a');
            card.href = `live-detail.html?id=${event.id}`;
            card.className = 'event-card';
            const formattedDate = formatDate(event.date); 
            const baseImageUrl = event.thumbnail ? event.thumbnail.url : (event.mainImage ? event.mainImage.url : '/image/default-event.jpg');
            const imageUrl = (baseImageUrl.startsWith('https://images.microcms-assets.io')) ? `${baseImageUrl}?fm=webp&w=600` : baseImageUrl; 

            const isZH = (LANG_PREFIX === '-zh-Hans');
            const title = (isZH && event.title_zh_hans) ? event.title_zh_hans : event.title;
            const series = event.series; 
            const status = (isZH && event.status_zh_hans) ? event.status_zh_hans : event.status;
            
            card.innerHTML = `
                <img src="${imageUrl}" alt="${title}" class="event-card-image">
                <div class="event-card-content">
                    <div class="event-card-meta">
                        <span class="event-card-date">${formattedDate}</span>
                        ${series ? `<span class="event-tag">${series}</span>` : ''}
                        ${status ? `<span class="event-tag">${status}</span>` : ''}
                    </div>
                    <h3 class="event-card-title">${title}</h3>
                </div>
            `;
            listContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Failed to fetch events list:', error);
        listContainer.innerHTML = '<p>イベントの読み込みに失敗しました。</p>';
    }
}

// ----------------------------------------------------
// 3-F. Fetch Event Detail (For /live-detail.html)
// ----------------------------------------------------
async function fetchEventDetail() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');
    const titleEl = document.getElementById('event-title');
    const descEl = document.getElementById('event-description');
    const imgEl = document.getElementById('event-main-image');
    const dateEl = document.getElementById('event-date');
    const seriesEl = document.getElementById('event-series');
    const statusEl = document.getElementById('event-status');
    const venueEl = document.getElementById('event-venue');

    if (!eventId) {
        if(titleEl) titleEl.innerText = 'エラー';
        if(descEl) descEl.innerHTML = '<p>イベントIDが指定されていません。</p>';
        return;
    }
    const endpoint = `/api/events${LANG_PREFIX}?id=${eventId}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        const event = await response.json();
        
        const isZH = (LANG_PREFIX === '-zh-Hans');
        const title = (isZH && event.title_zh_hans) ? event.title_zh_hans : event.title;
        const series = event.series; // (seriesは共通)
        const status = (isZH && event.status_zh_hans) ? event.status_zh_hans : event.status;
        const venue = (isZH && event.venue_zh_hans) ? event.venue_zh_hans : event.venue;
        const description = (isZH && event.description_zh_hans)
                            ? event.description_zh_hans // 簡体字ページ
                            : (event.description || ''); // 日本語ページ
        
        document.title = `${title} | V-CLos Official Website`; 
        
        if (event.mainImage) {
            imgEl.src = `${event.mainImage.url}?fm=webp&w=840`; 
            imgEl.alt = title; 
        } else {
            imgEl.style.display = 'none'; 
        }
        
        dateEl.innerText = formatDate(event.date);
        seriesEl.innerText = series || '';
        statusEl.innerText = status || '';
        titleEl.innerText = title;
        venueEl.innerText = venue || '';
        descEl.innerHTML = description || '<p>詳細は後日公開予定です。</p>';

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": title,
            "startDate": event.date, 
            "location": {
                "@type": "Place",
                "name": venue || "洗足学園音楽大学", 
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "久本2-3-1",
                    "addressLocality": "川崎市高津区",
                    "addressRegion": "神奈川県",
                    "postalCode": "213-8S80",
                    "addressCountry": "JP"
                }
            },
            "image": [ event.mainImage ? `${event.mainImage.url}?fm=webp&w=840` : "" ],
            "description": descEl.innerText.substring(0, 200) + "...", 
            "organizer": {
                "@type": "Organization",
                "name": "V-CLos",
                "url": "https://v-clos.jp/" 
            }
        };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);
        
    } catch (error) {
        console.error('Failed to fetch event detail:', error);
        if(titleEl) titleEl.innerText = 'エラー';
        if(descEl) descEl.innerHTML = '<p>イベントの読み込みに失敗しました。</p>';
    }
}

// ----------------------------------------------------
// 4. Hero Background Slider 
// ----------------------------------------------------
function setupHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return; 
    let currentSlide = 0;
    const slideInterval = 5000; 
    slides[currentSlide].classList.add('is-active');
    setInterval(() => {
        slides[currentSlide].classList.remove('is-active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('is-active');
    }, slideInterval);
}

// ----------------------------------------------------
// 5. Mobile Menu Toggle
// ----------------------------------------------------
function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay'); 
    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-open');
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-open'); 
        });
        overlay.addEventListener('click', () => {
            menuToggle.classList.remove('is-open'); 
            sidebar.classList.remove('is-open'); 
            overlay.classList.remove('is-open'); 
        });
    }
}

// ----------------------------------------------------
// 6. Sidebar Active State & Glitch Effect Prep
// ----------------------------------------------------
function setupSidebarActiveState() {
    const pageId = document.body.id;
    let activeHref = "";
    if (pageId === 'page-index') {
    } else if (pageId === 'page-news' || pageId === 'page-news-detail') {
        activeHref = "news.html";
    } else if (pageId === 'page-live' || pageId === 'page-live-detail') {
        activeHref = "live.html";
    } else if (pageId === 'page-about') {
        activeHref = "about.html";
    } else if (pageId === 'page-media') {
        activeHref = "media.html";
    } else if (pageId === 'page-contact') {
        activeHref = "contact.html";
    }
    const sidebarLinks = document.querySelectorAll('#sidebar .sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.dataset.text = link.innerText;
        if (activeHref && link.getAttribute('href').endsWith(activeHref)) {
            link.classList.add('is-active');
        }
    });
}

// ----------------------------------------------------
// 7. Language Switcher
// ----------------------------------------------------
function setupLanguageSwitcher() {
    const langJP = document.getElementById('lang-jp');
    const langEN = document.getElementById('lang-en');
    const langZH = document.getElementById('lang-zh');

    if (!langJP || !langEN || !langZH) return;
    const currentPath = window.location.pathname; 
    const searchParams = window.location.search;   

    let baseFile = currentPath;

    if (LANG_PREFIX === '-en') {
        baseFile = currentPath.replace('/en', ''); 
        langEN.classList.add('is-active-lang');
    } else if (LANG_PREFIX === '-zh-Hans') {
        baseFile = currentPath.replace('/zh-Hans', ''); 
        langZH.classList.add('is-active-lang');
    } else {
        langJP.classList.add('is-active-lang');
    }
    
    if (baseFile === '/' || baseFile === '/en/' || baseFile === '/zh-Hans/') {
        baseFile = '/index.html';
    }
    langJP.href = `${baseFile}${searchParams}`;
    langEN.href = `/en${baseFile}${searchParams}`;
    langZH.href = `/zh-Hans${baseFile}${searchParams}`;
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