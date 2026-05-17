/* Modern vanilla JS for the NovelNest website
   This file contains UI helpers, localStorage handlers, and page-specific rendering logic. */

const state = {
  novels: [],
  currentUser: null,
  favorites: [],
  progress: {},
  comments: {},
  users: [],
  language: 'en',
};

const TRANSLATIONS = {
  en: {
    brand: 'NexNovel',
    search: '⌕',
    theme: '◐',
    login: 'Login',
    logout: 'Logout',
    language: 'العربية',
    featured: 'Featured Novels',
    discover: 'Discover your next favorite novel',
    tagline: 'Read. Track. Enjoy.',
    genres: 'Genres',
    trending: 'Trending now',
    recent: 'Recently added',
    profile: 'Profile',
    addNovel: 'Add Novel',
    bookmark: 'Bookmark',
    bookmarked: 'Bookmarked',
    read: 'Read first chapter',
    chapters: 'Chapters',
    ratings: 'ratings',
    comments: 'User Comments',
    addComment: 'Post comment',
    loginComment: 'Login to leave a comment',
    addChapter: 'Add Chapter',
    newChapter: 'Create New Chapter',
    chapterTitle: 'Chapter Title',
    chapterSummary: 'Chapter Summary',
    chapterContent: 'Content',
    save: 'Save Chapter',
    author: 'Author',
    continue: 'Continue Reading',
    genre: 'Genre',
    myNovels: 'My Novels',
    deleteNovel: 'Delete Novel',
    noChapters: 'No chapters yet',
    home: 'Home',
    joinNow: 'Join now',
    heroDescription: 'Browse trending stories, save favorites, and keep your reading progress synced locally.',
    newRelease: 'New release',
    handpicked: 'Handpicked stories for every mood.',
    browseCategory: 'Browse by category.',
    trendingNow: 'Trending now',
    recentlyAdded: 'Recently added',
    stayInLoop: 'Stay in the loop',
    updatesTips: 'Notifications, updates, and reading tips.',
    tip: 'Tip:',
    tapReview: 'Tap any novel card to open details and leave a review.',
    ratingLabel: 'Rating',
    noContinuing: 'No continuing stories yet. Start reading to save progress!',
    addedFavorites: 'Added to favorites',
    removedFavorites: 'Removed from favorites',
    novelsFound: 'novels found',
    noMatchesFound: 'No matches found',
    view: 'View',
    open: 'Open',
    saveNovel: 'Save Novel',
    createStory: 'Create a new story for the community.',
    createEditManage: 'Create, edit and manage your own novels here.',
    existingNovels: 'Existing Novels',
    editDeleteEntries: 'Edit or delete entries.',
    quickActions: 'Quick actions',
    addOrEditStories: 'Add or edit stories with a quick form.',
    saveNovelButton: 'Save novel',
    newHere: 'New here?',
    createAccount: 'Create an account',
    alreadyHaveAccount: 'Already have an account?',
    createAccountButton: 'Create account',
    fullName: 'Full Name',
    publishedYear: 'Published Year',
    novelTitle: 'Novel Title',
    authorName: 'Author Name',
    genreLabel: 'Genre',
    novelDescription: 'Novel Description',
    chapterContent: 'Chapter 1 Content',
    searchPlaceholder: 'Search novels, genres, authors...',
    searchAria: 'Search novels',
    exploreGenre: 'Explore top {genre} stories.',
    details: 'Details',
    adminDashboard: 'Admin Dashboard',
    adminTitle: 'Admin',
    profileSection: 'Profile',
    favorites: 'Favorites',
    yourBookmarkedNovels: 'Your bookmarked novels.',
    readSection: 'Read',
    adminHint: 'Admin',
    addChapter: 'Add Chapter',
    bookDetails: 'Read first chapter',
    step: 'Step',
    logout_message: 'You have been logged out',
    deletedBook: 'Novel deleted successfully',
  },
  ar: {
    brand: 'قصر الروايات',
    search: '⌕',
    theme: '◐',
    login: 'دخول',
    logout: 'خروج',
    language: 'English',
    featured: 'الروايات المميزة',
    discover: 'اكتشف روايتك المفضلة التالية',
    tagline: 'اقرأ. تتبع. استمتع.',
    genres: 'الأنواع',
    trending: 'الشائعة الآن',
    recent: 'المضافة حديثا',
    profile: 'الملف الشخصي',
    addNovel: 'إضافة رواية',
    bookmark: 'حفظ',
    bookmarked: 'محفوظة',
    read: 'اقرأ الفصل الأول',
    chapters: 'الفصول',
    ratings: 'تقييمات',
    comments: 'تعليقات المستخدمين',
    addComment: 'نشر التعليق',
    loginComment: 'قم بتسجيل الدخول لترك تعليق',
    addChapter: 'إضافة فصل',
    newChapter: 'إنشاء فصل جديد',
    chapterTitle: 'عنوان الفصل',
    chapterSummary: 'ملخص الفصل',
    chapterContent: 'المحتوى',
    save: 'حفظ الفصل',
    author: 'الكاتب',
    continue: 'مواصلة القراءة',
    genre: 'النوع',
    myNovels: 'رواياتي',
    deleteNovel: 'حذف الرواية',
    noChapters: 'لا توجد فصول حتى الآن',
    home: 'الرئيسية',
    joinNow: 'انضم الآن',
    heroDescription: 'تصفح القصص الرائجة، احفظ المفضلة، واحتفظ بتقدم القراءة محليًا.',
    newRelease: 'إصدار جديد',
    handpicked: 'قصص مختارة لكل مزاج.',
    browseCategory: 'تصفح حسب الفئة.',
    trendingNow: 'الشائع الآن',
    recentlyAdded: 'أضيفت حديثًا',
    stayInLoop: 'ابقَ على اطلاع',
    updatesTips: 'الإشعارات، التحديثات، ونصائح القراءة.',
    tip: 'معلومة:',
    tapReview: 'اضغط على أي بطاقة رواية لفتح التفاصيل وترك تعليق.',
    ratingLabel: 'التقييم',
    noContinuing: 'لا توجد روايات قيد المتابعة بعد. ابدأ القراءة لحفظ التقدم!',
    addedFavorites: 'تمت الإضافة إلى المفضلة',
    removedFavorites: 'تمت الإزالة من المفضلة',
    novelsFound: 'روايات',
    noMatchesFound: 'لم يتم العثور على نتائج',
    view: 'عرض',
    open: 'افتح',
    saveNovel: 'حفظ الرواية',
    createStory: 'أنشئ قصة جديدة للمجتمع.',
    createEditManage: 'أنشئ وعدّل وأدر رواياتك هنا.',
    existingNovels: 'الروايات الحالية',
    editDeleteEntries: 'حرر أو احذف المدخلات.',
    quickActions: 'إجراءات سريعة',
    addOrEditStories: 'أضف أو عدّل القصص من خلال نموذج سريع.',
    saveNovelButton: 'حفظ الرواية',
    newHere: 'جديد هنا؟',
    createAccount: 'إنشاء حساب',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    createAccountButton: 'إنشاء حساب',
    fullName: 'الاسم الكامل',
    publishedYear: 'سنة النشر',
    novelTitle: 'عنوان الرواية',
    authorName: 'اسم المؤلف',
    genreLabel: 'النوع',
    novelDescription: 'وصف الرواية',
    chapterContent: 'محتوى الفصل الأول',
    searchPlaceholder: 'ابحث عن روايات، أنواع، مؤلفين...',
    searchAria: 'ابحث عن روايات',
    exploreGenre: 'استكشف أفضل قصص {genre}.',
    details: 'التفاصيل',
    adminDashboard: 'لوحة التحكم',
    adminTitle: 'المشرف',
    profileSection: 'الملف الشخصي',
    favorites: 'المفضلة',
    yourBookmarkedNovels: 'رواياتك المحفوظة.',
    readSection: 'اقرأ',
    adminHint: 'المشرف',
    addChapter: 'إضافة فصل',
    bookDetails: 'اقرأ الفصل الأول',
    step: 'الخطوة',
    logout_message: 'تم تسجيل الخروج بنجاح',
    deletedBook: 'تم حذف الرواية بنجاح',
  },
};

const applyTranslations = () => {
  // document title per language
  document.title = state.language === 'ar' ? 'قصر الروايات' : 'NexNovel';

  // set elements marked with data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    // placeholders for inputs
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  });

  // buttons outside data-i18n
  const searchBtn = document.querySelector('#searchButton');
  if (searchBtn) searchBtn.textContent = t('search');
  const themeBtn = document.querySelector('#themeToggle');
  if (themeBtn) themeBtn.textContent = t('theme');
  const langBtn = document.querySelector('#langToggle');
  if (langBtn) langBtn.textContent = t('language');
  const auth = document.querySelector('#authButton');
  if (auth) auth.textContent = state.currentUser ? t('logout') : t('login');
};

const DEFAULT_NOVELS = [
  {
    id: 'nova-aurora',
    title: 'Nova Aurora',
    author: 'Elena Moon',
    genre: 'Sci-Fi',
    rating: 4.8,
    reviews: 134,
    description: 'A cosmic voyage across shimmering galaxies where secrets ignite rebellion.',
    cover: '[Star]',
    featured: true,
    trending: true,
    published: '2025',
    chapters: [
      { id: 'chapter-1', title: 'Arrival at Zenith', summary: 'The crew lands on a luminous outpost and discovers a hidden code.', content: 'Chapter 1 content goes here. This is the first chapter of Nova Aurora...' },
      { id: 'chapter-2', title: 'Echoes of the Archive', summary: 'An ancient system awakens and sends a distant signal across the void.', content: 'Chapter 2 content goes here. The ship explores an abandoned archive...' },
    ],
  },
  {
    id: 'rose-of-midnight',
    title: 'Rose of Midnight',
    author: 'Avery Lane',
    genre: 'Romance',
    rating: 4.6,
    reviews: 88,
    description: 'A forbidden ballroom romance that blooms under moonlit chandeliers.',
    cover: '[Rose]',
    featured: true,
    trending: false,
    published: '2024',
    chapters: [
      { id: 'chapter-1', title: 'First Dance', summary: 'A masked ball changes everything when two strangers cross paths.', content: 'Chapter 1 content goes here. Sparkling gowns and hidden faces...' },
    ],
  },
  {
    id: 'shadowforge',
    title: 'Shadowforge',
    author: 'Kai Ember',
    genre: 'Fantasy',
    rating: 4.7,
    reviews: 205,
    description: 'A forge of lost shadows where warriors shape destiny from flame and steel.',
    cover: '[Shield]',
    featured: false,
    trending: true,
    published: '2026',
    chapters: [
      { id: 'chapter-1', title: 'The Hidden Anvil', summary: 'A young blacksmith discovers an enchanted forge beneath the mountain.', content: 'Chapter 1 content goes here. Heat and hammer meet as destiny calls...' },
    ],
  },
];

const STORAGE_KEYS = {
  novels: 'novelNest_novels',
  favorites: 'novelNest_favorites',
  progress: 'novelNest_progress',
  comments: 'novelNest_comments',
  users: 'novelNest_users',
  currentUser: 'novelNest_currentUser',
  theme: 'novelNest_theme',
  language: 'novelNest_language',
};

const notify = (message, duration = 3200) => {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.querySelector('#toastContainer')?.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
};

const loadState = () => {
  state.novels = JSON.parse(localStorage.getItem(STORAGE_KEYS.novels)) || DEFAULT_NOVELS;
  state.favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
  state.progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress)) || {};
  state.comments = JSON.parse(localStorage.getItem(STORAGE_KEYS.comments)) || {};
  state.users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
  state.currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser)) || null;
  state.language = localStorage.getItem(STORAGE_KEYS.language) || 'en';
};

const saveState = () => {
  localStorage.setItem(STORAGE_KEYS.novels, JSON.stringify(state.novels));
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(state.favorites));
  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(state.progress));
  localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(state.comments));
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(state.users));
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(state.currentUser));
  localStorage.setItem(STORAGE_KEYS.language, state.language);
};

const getQueryParam = (key) => new URLSearchParams(window.location.search).get(key);

const t = (key) => TRANSLATIONS[state.language][key] || TRANSLATIONS.en[key] || key;

const toggleLanguage = () => {
  state.language = state.language === 'en' ? 'ar' : 'en';
  saveState();
  const html = document.documentElement;
  html.lang = state.language;
  html.dir = state.language === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar-lang', state.language === 'ar');
  window.location.reload();
};

const toHex = (buffer) => Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, '0')).join('');

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return toHex(digest);
};

const findUserByEmail = (email) => state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());

const setCurrentUser = (user) => {
  state.currentUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  saveState();
};

const clearSession = () => {
  state.currentUser = null;
  saveState();
};

const loginPagePath = () => {
  const currentPath = window.location.pathname;
  return currentPath.includes('/pages/') ? 'login.html' : 'pages/login.html';
};

const profilePagePath = () => {
  const currentPath = window.location.pathname;
  return currentPath.includes('/pages/') ? 'profile.html' : 'pages/profile.html';
};

const redirectToLogin = (message) => {
  if (message) notify(message);
  window.location.href = loginPagePath();
};

const protectPage = () => {
  if (!state.currentUser) {
    redirectToLogin('Please login to access this page.');
    return false;
  }
  return true;
};

const renderAuthHeader = () => {
  const authButton = document.querySelector('#authButton');
  if (!authButton) return;
  if (state.currentUser) {
    authButton.textContent = t('logout');
    authButton.href = 'javascript:void(0)';
    authButton.onclick = (event) => {
      event.preventDefault();
      clearSession();
      redirectToLogin('You have been logged out.');
    };
  } else {
    authButton.textContent = t('login');
    authButton.href = loginPagePath();
    authButton.onclick = null;
  }
};

const renderFormMessage = (form, message, type = 'error') => {
  let messageNode = form.querySelector('.form-message');
  if (!messageNode) {
    messageNode = document.createElement('p');
    messageNode.className = 'form-message';
    form.appendChild(messageNode);
  }
  const text = TRANSLATIONS[state.language][message] || TRANSLATIONS.en[message] || message;
  messageNode.textContent = text;
  messageNode.style.color = type === 'error' ? 'var(--accent)' : 'var(--primary)';
};

const toggleTheme = () => {
  const body = document.body;
  const isDark = body.classList.contains('dark-theme');
  if (isDark) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem(STORAGE_KEYS.theme, 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem(STORAGE_KEYS.theme, 'dark');
  }
};

const applySavedTheme = () => {
  const theme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  if (theme === 'light') {
    body.classList.add('light-theme');
  } else {
    body.classList.add('dark-theme');
  }
};

const renderNovelCard = (novel) => {
  const card = document.createElement('article');
  card.className = 'novel-card';
  card.innerHTML = `
    <div class="cover">${novel.cover}</div>
    <div>
      <h3 class="novel-title">${novel.title}</h3>
      <p class="novel-meta">${novel.author} · ${novel.genre}</p>
      <p>${novel.description}</p>
    </div>
    <div class="novel-meta">${t('ratingLabel')}: ${novel.rating.toFixed(1)}</div>
    <div class="novel-actions">
      <a class="button primary" href="pages/novel-details.html?id=${novel.id}">${t('view')}</a>
      <button class="button outline" data-action="bookmark" data-id="${novel.id}">${state.favorites.includes(novel.id) ? t('bookmarked') : t('bookmark')}</button>
    </div>
  `;
  return card;
};

const renderKirby = (selector, list) => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = '';
  list.forEach((novel) => container.appendChild(renderNovelCard(novel)));
};

const renderCategories = () => {
  const genres = [...new Set(state.novels.map((novel) => novel.genre))];
  const container = document.querySelector('#genreGrid');
  if (!container) return;
  container.innerHTML = genres.map((genre) => `
    <article class="genre-card">
      <h4>${genre}</h4>
      <p>${t('exploreGenre').replace('{genre}', genre)}</p>
    </article>
  `).join('');
};

const renderContinueReading = () => {
  const container = document.querySelector('#continueList');
  if (!container) return;
  const progressEntries = Object.entries(state.progress).slice(0, 4);
  if (!progressEntries.length) {
    container.innerHTML = `<p>${t('noContinuing')}</p>`;
    return;
  }

  const items = progressEntries.map(([novelId, progress]) => {
    const novel = state.novels.find((item) => item.id === novelId);
    if (!novel) return '';
    const chapter = novel.chapters.find((chapter) => chapter.id === progress.chapterId) || novel.chapters[0];
    return `
      <div class="continue-card">
        <strong>${novel.title}</strong>
        <p>${chapter.title}</p>
        <small>${Math.round(progress.percentage)}% read</small>
        <a class="text-link" href="pages/chapter.html?novel=${novel.id}&chapter=${chapter.id}">Continue</a>
      </div>
    `;
  }).join('');

  container.innerHTML = items;
};

const handleBookmarkClick = (event) => {
  const button = event.target.closest('[data-action="bookmark"]');
  if (!button) return;
  if (!state.currentUser) {
    redirectToLogin('Please login to bookmark novels.');
    return;
  }
  const novelId = button.dataset.id;
  if (state.favorites.includes(novelId)) {
    state.favorites = state.favorites.filter((id) => id !== novelId);
    notify(t('removedFavorites'));
  } else {
    state.favorites.push(novelId);
    notify(t('addedFavorites'));
  }
  saveState();
  button.textContent = state.favorites.includes(novelId) ? 'Bookmarked' : 'Bookmark';
};

const setupSearch = () => {
  const searchInput = document.querySelector('#searchInput');
  const searchButton = document.querySelector('#searchButton');
  if (!searchInput || !searchButton) return;
  
  searchButton.textContent = t('search');

  const searchHandler = () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = state.novels.filter((novel) => [novel.title, novel.author, novel.genre, novel.description]
      .some((field) => field.toLowerCase().includes(query)));
    renderKirby('#featuredGrid', filtered.length ? filtered : state.novels);
    notify(filtered.length ? `${filtered.length} ${t('novelsFound')}` : t('noMatchesFound'));
  };

  searchButton.addEventListener('click', searchHandler);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchHandler();
  });
};

const createSkeletons = (selector, count = 4) => {
  const container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = Array.from({ length: count }).map(() => '<div class="skeleton-card skeleton"></div>').join('');
};

const renderHome = () => {
  renderKirby('#featuredGrid', state.novels.filter((novel) => novel.featured));
  renderKirby('#trendingGrid', state.novels.filter((novel) => novel.trending));
  renderKirby('#recentGrid', [...state.novels].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 4));
  renderCategories();
  renderContinueReading();
};

const renderNovelDetails = () => {
  const novelId = getQueryParam('id');
  if (!novelId) return;
  const novel = state.novels.find((item) => item.id === novelId);
  const container = document.querySelector('#novelDetail');
  if (!container || !novel) return;

  const isFavorite = state.favorites.includes(novel.id);
  const novelComments = state.comments[novel.id] || [];
  const page = Number(getQueryParam('page')) || 1;
  const pageSize = 3;
  const totalPages = Math.ceil(novel.chapters.length / pageSize);
  const visibleChapters = novel.chapters.slice((page - 1) * pageSize, page * pageSize);

  container.innerHTML = `
    <div class="detail-hero">
      <div class="cover-large">${novel.cover}</div>
      <div>
        <h1>${novel.title}</h1>
        <p class="novel-meta">${novel.author} · ${novel.genre} · ${novel.published}</p>
        <p>${novel.description}</p>
        <div class="detail-actions">
          <button id="bookmarkToggle" class="button primary">${isFavorite ? 'Bookmarked' : 'Bookmark'}</button>
          <a class="button outline" href="chapter.html?novel=${novel.id}&chapter=${novel.chapters[0].id}">Read first chapter</a>
        </div>
        <div class="rating-display">
          <span>${t('ratingLabel')}: ${novel.rating.toFixed(1)}</span>
          <div id="ratingStars" class="rating-stars">
            ${[1, 2, 3, 4, 5].map((value) => `
              <button type="button" class="star-btn" data-value="${value}">${value}</button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
    <div class="chapter-list">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3>Chapters</h3>
        ${state.currentUser && novel.createdBy === state.currentUser.id ? `<button id="addChapterBtn" class="button primary" style="padding: 8px 14px; font-size: 0.9rem;">[+] Add Chapter</button>` : ''}
      </div>
      <div class="card-grid">
        ${visibleChapters.map((chapter) => `
          <article class="novel-card">
            <div>
              <h4>${chapter.title}</h4>
              <p>${chapter.summary}</p>
            </div>
            <a class="button primary" href="chapter.html?novel=${novel.id}&chapter=${chapter.id}">${t('open')}</a>
          </article>
        `).join('')}
      </div>
      ${totalPages > 1 ? `
        <div class="pagination-bar">
          ${Array.from({ length: totalPages }, (_, index) => `
            <a class="pagination-link ${page === index + 1 ? 'active' : ''}" href="novel-details.html?id=${novel.id}&page=${index + 1}">${index + 1}</a>
          `).join('')}
        </div>
      ` : ''}
    </div>
    <div class="detail-comments">
      <div class="section-header"><h3>User Comments</h3></div>
      ${state.currentUser ? `
      <form id="commentForm" class="comment-form">
        <textarea id="commentInput" rows="3" placeholder="Share your thoughts..."></textarea>
        <button class="button primary" type="submit">Post comment</button>
      </form>
      ` : `<p class="muted">Login to leave a comment.</p>`}
      <div id="commentList" class="comment-list">
        ${novelComments.length ? novelComments.map((comment) => `
          <div class="comment-card"><strong>${comment.user}</strong><p>${comment.text}</p></div>
        `).join('') : '<p class="muted">No comments yet. Be the first to share your review.</p>'}
      </div>
    </div>
  `;

  document.querySelector('#bookmarkToggle')?.addEventListener('click', () => {
    if (isFavorite) {
      state.favorites = state.favorites.filter((id) => id !== novel.id);
      notify('Removed from favorites');
    } else {
      state.favorites.push(novel.id);
      notify('Added to favorites');
    }
    saveState();
    window.location.reload();
  });

  document.querySelector('#commentForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentInput = document.querySelector('#commentInput');
    const text = commentInput.value.trim();
    if (!text) return;
    const user = state.currentUser?.name || 'Guest';
    state.comments[novel.id] = state.comments[novel.id] || [];
    state.comments[novel.id].unshift({ user, text, date: Date.now() });
    saveState();
    notify('Comment added');
    commentInput.value = '';
    renderNovelDetails();
  });

  document.querySelectorAll('.star-btn').forEach((button) => {
    button.addEventListener('click', () => {
      if (!state.currentUser) {
        redirectToLogin('Please login to rate stories.');
        return;
      }
      const value = Number(button.dataset.value);
      novel.rating = value;
      state.novels = state.novels.map((item) => item.id === novel.id ? novel : item);
      saveState();
      notify(`Rated [★] ${value}`);
      renderNovelDetails();
    });
  });

  document.querySelector('#addChapterBtn')?.addEventListener('click', () => {
    const title = prompt('Chapter Title:');
    if (!title) return;
    const summary = prompt('Chapter Summary:');
    if (!summary) return;
    const content = prompt('Chapter Content:');
    if (!content) return;
    const newChapter = {
      id: `chapter-${Date.now()}`,
      title,
      summary,
      content,
    };
    novel.chapters.push(newChapter);
    state.novels = state.novels.map((item) => item.id === novel.id ? novel : item);
    saveState();
    notify('Chapter added successfully');
    renderNovelDetails();
  });
};

const renderChapterPage = () => {
  const novelId = getQueryParam('novel');
  const chapterId = getQueryParam('chapter');
  const novel = state.novels.find((item) => item.id === novelId);
  if (!novel) return;
  const chapter = novel.chapters.find((item) => item.id === chapterId) || novel.chapters[0];
  const currentIndex = novel.chapters.findIndex((item) => item.id === chapter.id);
  const progressKey = novel.id;
  const savedProgress = state.progress[progressKey] || { chapterId: chapter.id, percentage: 0 };

  const container = document.querySelector('#chapterContent');
  if (!container) return;
  const nextChapter = novel.chapters[currentIndex + 1];
  const prevChapter = novel.chapters[currentIndex - 1];

  container.innerHTML = `
    <div class="section-header"><h1>${chapter.title}</h1></div>
    <div class="chapter-meta">${novel.title} · ${novel.author}</div>
    <div class="reading-progress">
      <label for="progressRange">Reading progress: ${Math.round(savedProgress.percentage)}%</label>
      <input id="progressRange" type="range" min="0" max="100" value="${savedProgress.percentage}" />
    </div>
    <article class="chapter-text">${chapter.content}</article>
    <div class="detail-actions">
      ${prevChapter ? `<a class="button outline" href="chapter.html?novel=${novel.id}&chapter=${prevChapter.id}">Previous</a>` : '<span></span>'}
      ${nextChapter ? `<a class="button primary" href="chapter.html?novel=${novel.id}&chapter=${nextChapter.id}">Next chapter</a>` : '<span></span>'}
    </div>
  `;

  document.querySelector('#progressRange')?.addEventListener('input', (event) => {
    const value = Number(event.target.value);
    state.progress[progressKey] = { chapterId: chapter.id, percentage: value };
    saveState();
  });
};

const renderProfilePage = () => {
  const userName = state.currentUser?.name || 'Guest Reader';
  const profileCard = document.querySelector('#profileCard');
  const favContainer = document.querySelector('#favoritesList');
  if (!profileCard || !favContainer) return;
  profileCard.innerHTML = `
    <h2>${userName}</h2>
    <p>${state.currentUser ? 'Welcome back! Your library is ready.' : 'Log in to sync favorites and progress across sessions.'}</p>
  `;
  const favoriteNovels = state.novels.filter((novel) => state.favorites.includes(novel.id));
  favContainer.innerHTML = favoriteNovels.length ? favoriteNovels.map((novel) => `
    <article class="novel-card">
      <div class="cover">${novel.cover}</div>
      <div>
        <h4>${novel.title}</h4>
        <p>${novel.author}</p>
        <a class="button outline" href="novel-details.html?id=${novel.id}">Details</a>
      </div>
    </article>
  `).join('') : '<p class="muted">No favorites yet. Bookmark novels from the home page.</p>';
};

const renderAddNovelPage = () => {
  if (!protectPage()) return;
  const listContainer = document.querySelector('#userNovelsList');
  const form = document.querySelector('#novelForm');
  if (!listContainer || !form) return;

  const renderUserNovels = () => {
    const userNovels = state.novels.filter((novel) => novel.createdBy === state.currentUser.id);
    listContainer.innerHTML = userNovels.length ? userNovels.map((novel) => `
      <article class="novel-card admin-card">
        <div>
          <h4>${novel.title}</h4>
          <p>${novel.author} · ${novel.genre}</p>
          <small>${novel.chapters.length} chapter(s)</small>
        </div>
        <div class="novel-actions">
          <button data-action="edit" data-id="${novel.id}" class="button outline">Edit</button>
          <button data-action="delete" data-id="${novel.id}" class="button primary">Delete</button>
        </div>
      </article>
    `).join('') : '<p class="muted">You have not created any novels yet. Create one to get started!</p>';
  };

  renderUserNovels();

  listContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    const id = btn.dataset.id;
    const novel = state.novels.find((item) => item.id === id);
    
    if (!novel || novel.createdBy !== state.currentUser.id) {
      notify('You can only manage your own novels');
      return;
    }
    
    if (btn.dataset.action === 'delete') {
      if (confirm('Are you sure you want to delete this novel?')) {
        state.novels = state.novels.filter((item) => item.id !== id);
        saveState();
        renderUserNovels();
        notify('Novel deleted');
      }
    }
    if (btn.dataset.action === 'edit') {
      form.querySelector('[name="novelId"]').value = novel.id;
      form.querySelector('[name="title"]').value = novel.title;
      form.querySelector('[name="author"]').value = novel.author;
      form.querySelector('[name="genre"]').value = novel.genre;
      form.querySelector('[name="description"]').value = novel.description;
      form.querySelector('[name="published"]').value = novel.published;
      form.querySelector('[name="content"]').value = novel.chapters[0]?.content || '';
      notify('Editing mode enabled');
      form.querySelector('[name="title"]').focus();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = form.novelId.value || `novel-${Date.now()}`;
    const novelData = {
      id,
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      description: form.description.value,
      published: form.published.value,
      cover: '[Book]',
      rating: 4.5,
      reviews: 0,
      featured: false,
      trending: false,
      createdBy: state.currentUser.id,
      chapters: [{ id: `chapter-${Date.now()}`, title: 'Chapter 1', summary: 'First chapter', content: form.content.value }],
    };
    const existingIndex = state.novels.findIndex((item) => item.id === id);
    if (existingIndex >= 0) {
      if (state.novels[existingIndex].createdBy !== state.currentUser.id) {
        notify('You can only edit your own novels');
        return;
      }
      state.novels[existingIndex] = novelData;
      notify('Novel updated');
    } else {
      state.novels.unshift(novelData);
      notify('Novel added successfully');
    }
    saveState();
    renderUserNovels();
    form.reset();
  });
};

const setupAuthForms = async () => {
  const loginForm = document.querySelector('#loginForm');
  const signupForm = document.querySelector('#signupForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
      const user = findUserByEmail(email);
      if (!user) {
        renderFormMessage(loginForm, 'userNotFound');
        return;
      }
      const hashedPassword = await hashPassword(password);
      if (user.password !== hashedPassword) {
        renderFormMessage(loginForm, 'wrongPassword');
        return;
      }
      setCurrentUser(user);
      renderAuthHeader();
      renderFormMessage(loginForm, 'loginSuccess', 'success');
      setTimeout(() => {
        window.location.href = profilePagePath();
      }, 600);
    });
  }
  if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();
      if (!name || !email || !password) {
        renderFormMessage(signupForm, 'completeForm');
        return;
      }
      if (findUserByEmail(email)) {
        renderFormMessage(signupForm, 'emailExists');
        return;
      }
      const hashedPassword = await hashPassword(password);
      const user = { id: `user-${Date.now()}`, name, email, password: hashedPassword };
      state.users.push(user);
      setCurrentUser(user);
      saveState();
      renderAuthHeader();
      renderFormMessage(signupForm, 'loginSuccess', 'success');
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 600);
    });
  }
};

const init = async () => {
  loadState();
  const html = document.documentElement;
  html.lang = state.language;
  html.dir = state.language === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('ar-lang', state.language === 'ar');
  applySavedTheme();
  const themeToggle = document.querySelector('#themeToggle');
  themeToggle?.addEventListener('click', () => {
    toggleTheme();
    themeToggle.textContent = t('theme');
  });
  themeToggle.textContent = t('theme');
  const langToggle = document.querySelector('#langToggle');
  langToggle?.addEventListener('click', toggleLanguage);
  langToggle.textContent = t('language');
  renderAuthHeader();
  // apply translations to page elements
  applyTranslations();
  document.addEventListener('click', handleBookmarkClick);
  setupSearch();
  await setupAuthForms();

  if (document.body.id === 'profile-page' || document.body.id === 'add-novel-page') {
    if (!protectPage()) return;
  }
  if (document.body.id === 'login-page' || document.body.id === 'signup-page') {
    if (state.currentUser) {
      window.location.href = 'profile.html';
      return;
    }
  }

  if (document.body.id === 'home-page') {
    createSkeletons('#featuredGrid');
    createSkeletons('#trendingGrid');
    createSkeletons('#recentGrid');
    setTimeout(renderHome, 180);
  }
  if (document.body.id === 'details-page') renderNovelDetails();
  if (document.body.id === 'chapter-page') renderChapterPage();
  if (document.body.id === 'profile-page') renderProfilePage();
  if (document.body.id === 'add-novel-page') renderAddNovelPage();
};

window.addEventListener('DOMContentLoaded', init);
