// AgroScan site behaviour: intro sequence, nav, scroll reveal
document.addEventListener('DOMContentLoaded', function () {

  // ---- Preloader (single orchestrated intro; skipped for reduced motion or repeat visits within session) ----
  var pre = document.getElementById('preloader');
  if (pre) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var seenIntro = sessionStorage.getItem('agroscan-intro-seen');
    if (reduce || seenIntro) {
      pre.classList.add('done');
    } else {
      window.setTimeout(function () {
        pre.classList.add('done');
        sessionStorage.setItem('agroscan-intro-seen', '1');
      }, 1000);
    }
  }

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Dropdown toggles inside mobile nav
    document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 1020) {
          var parent = link.parentElement;
          var isOpenAlready = parent.classList.contains('open');
          if (!isOpenAlready) {
            e.preventDefault();
            document.querySelectorAll('.has-dropdown.open').forEach(function (li) { li.classList.remove('open'); });
            parent.classList.add('open');
          }
        }
      });
    });
  }

  // ---- Scroll reveal (restrained: fade+rise once per element) ----
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Active nav link highlight ----
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) { a.setAttribute('aria-current', 'page'); }
  });

  // ---- Contact form handling removed to allow standard Netlify forms submission ----

  // ---- Lightbox for Gallery ----
  var lightbox = document.getElementById('gallery-lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
      });
    });

    var closeLightbox = function() {
      lightbox.classList.remove('active');
      setTimeout(function() { lightboxImg.src = ''; }, 300);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) { closeLightbox(); }
    });
  }

  // ---- Multi-Popup System ----
  // Define which popup to show automatically. 
  // Options: 'popup-article', 'popup-2', 'popup-3'
  var activePopupId = 'popup-article'; 
  
  var popupToShow = document.getElementById(activePopupId);
  if (popupToShow) {
    var hasSeenPopup = sessionStorage.getItem('agroscan-popup-' + activePopupId);
    if (!hasSeenPopup) {
      setTimeout(function() {
        popupToShow.classList.add('active');
      }, 1500);
    }
  }

  // Handle closing for all popups
  document.querySelectorAll('.popup-close').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var overlay = this.closest('.popup-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        sessionStorage.setItem('agroscan-popup-' + overlay.id, '1');
      }
    });
  });
  
  // Close popup if background overlay is clicked
  document.querySelectorAll('.popup-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      // Ignore clicks on the content box itself (only close if clicking the blurry backdrop)
      if (e.target === overlay) {
        overlay.classList.remove('active');
        sessionStorage.setItem('agroscan-popup-' + overlay.id, '1');
      }
    });
  });
});
