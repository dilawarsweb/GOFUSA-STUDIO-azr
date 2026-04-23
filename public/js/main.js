document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }

  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (mobileMenu) {
            mobileMenu.classList.remove('active');
          }
        }
      }
    });
  });

  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxCategory = document.querySelector('.lightbox-category');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxCounter = document.querySelector('.lightbox-counter');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentImageIndex = 0;
  let portfolioData = [];

  portfolioItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const category = item.querySelector('.portfolio-category');
    const title = item.querySelector('.portfolio-title');

    portfolioData.push({
      src: img.src,
      alt: img.alt,
      category: category ? category.textContent : '',
      title: title ? title.textContent : ''
    });

    item.addEventListener('click', function() {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function updateLightboxContent() {
    const data = portfolioData[currentImageIndex];
    lightboxImage.src = data.src;
    lightboxImage.alt = data.alt;
    lightboxCategory.textContent = data.category;
    lightboxTitle.textContent = data.title;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${portfolioData.length}`;
  }

  function goToPrevious() {
    currentImageIndex = currentImageIndex === 0 ? portfolioData.length - 1 : currentImageIndex - 1;
    updateLightboxContent();
  }

  function goToNext() {
    currentImageIndex = currentImageIndex === portfolioData.length - 1 ? 0 : currentImageIndex + 1;
    updateLightboxContent();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', goToPrevious);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', goToNext);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    }
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const successMessage = document.querySelector('.success-message');
      if (successMessage) {
        successMessage.style.display = 'block';
      }

      setTimeout(function() {
        contactForm.reset();
        if (successMessage) {
          successMessage.style.display = 'none';
        }
      }, 3000);
    });
  }

  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.collapsible-icon');

      const isActive = content.classList.contains('active');

      content.classList.toggle('active');

      if (icon) {
        if (isActive) {
          icon.innerHTML = '<path d="m6 9 6 6 6-6"/>';
        } else {
          icon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
        }
      }
    });
  });

  const tocLinks = document.querySelectorAll('.sidebar-toc-link');
  const sections = document.querySelectorAll('.collapsible-section');

  tocLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sectionId = this.getAttribute('data-section');
      const targetSection = document.getElementById(sectionId);

      if (targetSection) {
        const collapsibleContent = targetSection.querySelector('.collapsible-content');
        const collapsibleHeader = targetSection.querySelector('.collapsible-header');
        const icon = collapsibleHeader?.querySelector('.collapsible-icon');

        if (collapsibleContent && !collapsibleContent.classList.contains('active')) {
          collapsibleContent.classList.add('active');
          if (icon) {
            icon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
          }
        }

        setTimeout(() => {
          const offset = 120;
          const elementPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }, 100);
      }
    });
  });

  function updateActiveTocLink() {
    const scrollPosition = window.scrollY + 200;

    let activeSection = null;
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= scrollPosition) {
        activeSection = section.id;
      }
    });

    tocLinks.forEach(link => {
      if (link.getAttribute('data-section') === activeSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (sections.length > 0) {
    window.addEventListener('scroll', updateActiveTocLink);
    updateActiveTocLink();
  }

  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const legalSidebar = document.querySelector('.legal-sidebar');

  if (mobileNavToggle && legalSidebar) {
    mobileNavToggle.addEventListener('click', function() {
      if (legalSidebar.classList.contains('mobile-hidden')) {
        legalSidebar.classList.remove('mobile-hidden');
        legalSidebar.classList.add('mobile-visible');
        this.textContent = 'Hide Navigation';
      } else {
        legalSidebar.classList.add('mobile-hidden');
        legalSidebar.classList.remove('mobile-visible');
        this.textContent = 'Show Navigation';
      }
    });
  }

  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath ||
        (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
      link.classList.add('active');
    }
  });

  const collapsibleContents = document.querySelectorAll('.collapsible-content');
  collapsibleContents.forEach(content => {
    content.classList.add('active');
  });

  const collapsibleIcons = document.querySelectorAll('.collapsible-icon');
  collapsibleIcons.forEach(icon => {
    icon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
  });
});
