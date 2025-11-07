// V-CLos Website Script (Unified)

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('V-CLos Site Initialized.');
    setupMenuToggle();
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

    // (A) For top pages
    if (document.getElementById('news-list')) {
        fetchTopPageNews();
        fetchTopPageEvents();
        // fetchTopPageEvents(); 
    }

    // (B) For NEWS pages
    if (document.getElementById('news-list-all')) {
        fetchAllNews();
    }

    // (C) For NEWS-detail pages
    if (document.getElementById('article-body')) {
        fetchNewsDetail();
    }

    // (D) For LIVE pages
    if (document.getElementById('event-list-container')) {
        fetchEventsList();
    }

    // (E) For LIVE-detail
    if (document.getElementById('event-detail-wrapper')) {
        fetchEventDetail();
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
    
    const titleEl = document.getElementById('article-title');
    const bodyEl = document.getElementById('article-body');
    
    if (!articleId) {
        if (titleEl) titleEl.innerText = 'エラー';
        if (bodyEl) bodyEl.innerHTML = '<p>記事IDが指定されていません。</p>';
        return;
    }

    const endpoint = `/api/news?id=${articleId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const article = await response.json();
        
        document.title = `${article.title} | V-CLos Official Website`; 
        
        titleEl.innerText = article.title;
        
        document.getElementById('article-date').innerText = formatDate(article.publishedAt);
        
        bodyEl.innerHTML = article.body || '<p>記事の本文がありません。</p>';

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "datePublished": article.publishedAt,
            "description": article.summary || bodyEl.innerText.substring(0, 150) + "...", 
            
            "author": {
                "@type": "Organization",
                "name": "V-CLos"
            },
            
            "publisher": {
                "@type": "Organization",
                "name": "V-CLos",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://v-clos-website.vercel.app/image/VCLosLogo.png"
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
// 3-D. Fetch All Events (For /live.html)
// ----------------------------------------------------
async function fetchEventsList() {
    const listContainer = document.getElementById('event-list-container');
    const endpoint = '/api/events?all=true'; 

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
            
            const baseImageUrl = event.thumbnail 
                                 ? event.thumbnail.url 
                                 : (event.mainImage ? event.mainImage.url : '/image/default-event.jpg');

            const imageUrl = (baseImageUrl.startsWith('https://images.microcms-assets.io'))
                             ? `${baseImageUrl}?fm=webp&w=600`
                             : baseImageUrl; 

            card.innerHTML = `
                <img src="${imageUrl}" alt="${event.title}" class="event-card-image">
                <div class="event-card-content">
                    <div class="event-card-meta">
                        <span class="event-card-date">${formattedDate}</span>
                        ${event.series ? `<span class="event-tag">${event.series}</span>` : ''}
                        ${event.status ? `<span class="event-tag">${event.status}</span>` : ''}
                    </div>
                    <h3 class="event-card-title">${event.title}</h3>
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
// 3-E. Fetch Event Detail (For /live-detail.html)
// ----------------------------------------------------
async function fetchEventDetail() {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id');
    
    const titleEl = document.getElementById('event-title');
    const descEl = document.getElementById('event-description');
    
    if (!eventId) {
        if(titleEl) titleEl.innerText = 'エラー';
        if(descEl) descEl.innerHTML = '<p>イベントIDが指定されていません。</p>';
        return;
    }

    const endpoint = `/api/events?id=${eventId}`; 

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);

        const event = await response.json();
        
        document.title = `${event.title} | V-CLos Official Website`; 
        
        const imgEl = document.getElementById('event-main-image');
        if (event.mainImage) {
            imgEl.src = `${event.mainImage.url}?fm=webp&w=840`; 
            imgEl.alt = event.title;
        } else {
            imgEl.style.display = 'none'; 
        }
        
        document.getElementById('event-date').innerText = formatDate(event.date);
        document.getElementById('event-series').innerText = event.series || '';
        document.getElementById('event-status').innerText = event.status || '';
        
        titleEl.innerText = event.title;
        document.getElementById('event-venue').innerText = event.venue || '';
        
        const eventDescriptionText = event.description || '<p>詳細は後日公開予定です。</p>';
        descEl.innerHTML = eventDescriptionText;

        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.title,
            "startDate": event.date, 
            "location": {
                "@type": "Place",
                "name": event.venue || "V-CLos Event",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "久本2-3-1",
                    "addressLocality": "川崎市高津区",
                    "addressRegion": "神奈川県",
                    "postalCode": "213-8580",
                    "addressCountry": "JP"
                }
            },
            "image": [
                event.mainImage ? event.mainImage.url : ""
            ],
            "description": descEl.innerText.substring(0, 200) + "...", 
            "organizer": {
                "@type": "Organization",
                "name": "V-CLos",
                "url": "https://v-clos-website.vercel.app/" 
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
// 4. Mobile Menu Toggle
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