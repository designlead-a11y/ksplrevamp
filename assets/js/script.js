const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile Header Menu Toggle Logic
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
      const isHidden = mobileMenu.classList.contains('hidden');
      
      if (mobileMenuIcon) {
        mobileMenuIcon.textContent = isHidden ? 'menu' : 'close';
      }
      
      if (!isHidden && window.innerWidth < 1024) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        document.body.style.overflow = '';
      }
    });

    // Reset on resize to desktop width
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) {
        mobileMenu.classList.add('hidden');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        document.body.style.overflow = '';
      }
    });
  }
});

$(document).ready(function(){
  // banner-slider
  if ($('#banner-slider').length) {
    $('#banner-slider').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 6000,
      smartSpeed: 6000,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      items: 1,
      responsive: {
        0: {items: 1},
        1000: {items: 1}
      }
    });
  }

  // casestudiesslider
  if ($('#casestudiesslider').length) {
    $('#casestudiesslider').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: true,
      autoplayTimeout: 6000,
      autoplay: true,
      items: 1,
      responsive: {
        0: {items: 1},
        1000: {items: 1}
      }
    });
  }

  // partnerslider
  $('#partnerslider').owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 4000,
    slideTransition: 'linear',
    responsive: {
      0: {items: 3},
      600: {items: 4},
      768: {items: 5},
      1000: {items: 5},
      1200: {items: 6},
      1500: {items: 8}
    }
  }) 

  // Desktop & Tablet (iPad) Main Menu Dropdown Toggle Logic
  const navDropdowns = document.querySelectorAll('.header nav .nav-dropdown');

  if (navDropdowns.length > 0) {
    const closeAllNavDropdowns = () => {
      navDropdowns.forEach(item => {
        item.classList.remove('is-open', 'active');
      });
    };

    navDropdowns.forEach(dropdown => {
      const toggleBtn = dropdown.querySelector('.dropdown-toggle') || dropdown.querySelector(':scope > a');
      const panel = dropdown.querySelector('.megamenu-panel');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();

          const isCurrentlyOpen = dropdown.classList.contains('is-open');

          // Close all other dropdowns
          navDropdowns.forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('is-open', 'active');
            }
          });

          // Toggle current
          if (isCurrentlyOpen) {
            dropdown.classList.remove('is-open', 'active');
          } else {
            dropdown.classList.add('is-open', 'active');
          }
        });

        // Hover support for mouse devices
        dropdown.addEventListener('mouseenter', function () {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            navDropdowns.forEach(other => {
              if (other !== dropdown) other.classList.remove('is-open', 'active');
            });
            dropdown.classList.add('is-open', 'active');
          }
        });

        dropdown.addEventListener('mouseleave', function () {
          if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            dropdown.classList.remove('is-open', 'active');
          }
        });
      }

      if (panel) {
        // Prevent clicking inside megamenu content from closing the dropdown
        panel.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      }
    });

    // Close dropdowns on outside click or tap
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header nav .nav-dropdown')) {
        closeAllNavDropdowns();
      }
    });

    document.addEventListener('touchstart', function (e) {
      if (!e.target.closest('.header nav .nav-dropdown')) {
        closeAllNavDropdowns();
      }
    }, { passive: true });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllNavDropdowns();
      }
    });

    // Close on window resize if crossing below tablet/desktop breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth < 1024) {
        closeAllNavDropdowns();
      }
    });

    // Also close dropdowns when opening popup modals
    const modalTriggers = document.querySelectorAll('.quote-modal-trigger, .job-modal-trigger');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', closeAllNavDropdowns);
    });
  }

  // Megamenu Tab Switcher
  const tabButtons = document.querySelectorAll('.megamenu-tab-btn');
  const tabPanes = document.querySelectorAll('.megamenu-tab-pane');

  if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
      const activateTab = function() {
        const targetTab = button.getAttribute('data-tab');

        // Reset all tab buttons
        tabButtons.forEach(btn => {
          btn.classList.remove('bg-[#ECF3FF]', 'text-[#124195]', 'font-semibold');
          btn.classList.add('text-[#121212]', 'font-medium', 'hover:bg-slate-50');
        });

        // Activate clicked/hovered button
        button.classList.add('bg-[#ECF3FF]', 'text-[#124195]', 'font-semibold');
        button.classList.remove('text-[#121212]', 'font-medium', 'hover:bg-slate-50');

        // Hide all panes
        tabPanes.forEach(pane => {
          pane.classList.add('hidden');
        });

        // Show target pane
        const activePane = document.getElementById(targetTab);
        if (activePane) {
          activePane.classList.remove('hidden');
        }
      };

      button.addEventListener('click', function(e) {
        e.preventDefault();
        activateTab();
      });

      button.addEventListener('mouseenter', function() {
        activateTab();
      });
    });
  }

  // Technology Ecosystem Unified Switcher (Tabs on Desktop >= 1024px, Accordion on Mobile < 1024px)
  // Scoped per wrapper so multiple tab sets (e.g. within parent tabs) work independently
  const techEcoWrappers = document.querySelectorAll('.tech-eco-wrapper');
  if (techEcoWrappers.length > 0) {
    techEcoWrappers.forEach(wrapper => {
      const techEcoBtns = wrapper.querySelectorAll('.tech-eco-btn');
      const techEcoContents = wrapper.querySelectorAll('.tech-eco-content');

      techEcoBtns.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = button.getAttribute('data-target');
          const targetContent = wrapper.querySelector('#' + targetId) || document.getElementById(targetId);
          const icon = button.querySelector('.tech-acc-icon');
          const isDesktop = window.innerWidth >= 1024;
          const isAlreadyActive = targetContent && !targetContent.classList.contains('hidden');

          if (isDesktop) {
            // Desktop Tab Behavior: Switch tabs within this wrapper
            techEcoBtns.forEach(btn => {
              btn.classList.remove('bg-[#ECF3FF]', 'font-semibold', 'shadow-md', 'active');
              btn.classList.add('text-[#002561]', 'font-medium', 'hover:bg-[#ECF3FF]', 'hover:text-[#002561]');
              const btnIcon = btn.querySelector('.tech-btn-icon');
              if (btnIcon) btnIcon.classList.add('opacity-80');
            });

            techEcoContents.forEach(content => {
              content.classList.add('hidden');
            });

            button.classList.add('bg-[#ECF3FF]', 'text-[#002561]', 'font-semibold', 'active');
            button.classList.remove('font-medium', 'text-slate-300', 'hover:bg-[#07215B]/60', 'hover:bg-[#002561]', 'hover:text-white', 'shadow-md');
            const activeIcon = button.querySelector('.tech-btn-icon');
            if (activeIcon) activeIcon.classList.remove('opacity-80');

            if (targetContent) {
              targetContent.classList.remove('hidden');
            }
          } else {
            // Mobile Accordion Behavior: Toggle accordion item within this wrapper
            if (isAlreadyActive) {
              targetContent.classList.add('hidden');
              button.classList.remove('bg-[#ECF3FF]', 'font-semibold', 'active');
              button.classList.add('text-[#002561]', 'font-medium', 'hover:bg-[#ECF3FF]', 'hover:text-[#002561]');
              const btnIcon = button.querySelector('.tech-btn-icon');
              if (btnIcon) btnIcon.classList.add('opacity-80');
              if (icon) icon.classList.remove('rotate-180');
            } else {
              techEcoBtns.forEach(btn => {
                btn.classList.remove('bg-[#124195]', 'bg-[#ECF3FF]', 'font-semibold', 'shadow-md', 'active');
                btn.classList.add('text-[#002561]', 'font-medium', 'hover:bg-[#ECF3FF]', 'hover:text-[#002561]');
                const btnIcon = btn.querySelector('.tech-btn-icon');
                if (btnIcon) btnIcon.classList.add('opacity-80');
                const otherIcon = btn.querySelector('.tech-acc-icon');
                if (otherIcon) otherIcon.classList.remove('rotate-180');
              });

              techEcoContents.forEach(content => {
                content.classList.add('hidden');
              });

              if (targetContent) {
                targetContent.classList.remove('hidden');
              }
              button.classList.add('bg-[#ECF3FF]', 'text-[#002561]', 'font-semibold', 'active');
              button.classList.remove('font-medium', 'text-slate-300', 'text-white');
              const activeIcon = button.querySelector('.tech-btn-icon');
              if (activeIcon) activeIcon.classList.remove('opacity-80');
              if (icon) icon.classList.add('rotate-180');
            }
          }
        });
      });
    });

    // Auto-ensure active tab on desktop resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024) {
        techEcoWrappers.forEach(wrapper => {
          if (!wrapper.closest('.hidden')) {
            const visibleContent = wrapper.querySelector('.tech-eco-content:not(.hidden)');
            const firstBtn = wrapper.querySelector('.tech-eco-btn');
            if (!visibleContent && firstBtn) {
              firstBtn.click();
            }
          }
        });
      }
    });
  }

  // Technology Ecosystem Lite Version Switcher (Tabs on Desktop >= 1024px, Accordion on Mobile < 1024px)
  const techEcoLiteWrappers = document.querySelectorAll('.tech-eco-lite-wrapper');
  if (techEcoLiteWrappers.length > 0) {
    techEcoLiteWrappers.forEach(wrapper => {
      const techEcoLiteBtns = wrapper.querySelectorAll('.tech-eco-lite-btn');
      const techEcoLiteContents = wrapper.querySelectorAll('.tech-eco-lite-content');

      techEcoLiteBtns.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = button.getAttribute('data-target');
          const targetContent = wrapper.querySelector('#' + targetId) || document.getElementById(targetId);
          const icon = button.querySelector('.tech-acc-icon');
          const isDesktop = window.innerWidth >= 1024;
          const isAlreadyActive = targetContent && !targetContent.classList.contains('hidden');

          if (isDesktop) {
            // Desktop Tab Behavior
            techEcoLiteBtns.forEach(btn => {
              btn.classList.remove('bg-[#124195]', 'text-white', 'font-semibold', 'shadow-xs');
              btn.classList.add('text-slate-700', 'font-medium', 'hover:bg-slate-100', 'hover:text-slate-900');
              const btnIcon = btn.querySelector('.tech-btn-icon');
              if (btnIcon) btnIcon.classList.remove('brightness-0', 'invert');
            });

            techEcoLiteContents.forEach(content => {
              content.classList.add('hidden');
            });

            button.classList.add('bg-[#124195]', 'text-white', 'font-semibold', 'shadow-xs');
            button.classList.remove('text-slate-700', 'font-medium', 'hover:bg-slate-100', 'hover:text-slate-900');
            const activeIcon = button.querySelector('.tech-btn-icon');
            if (activeIcon) activeIcon.classList.add('brightness-0', 'invert');

            if (targetContent) {
              targetContent.classList.remove('hidden');
            }
          } else {
            // Mobile Accordion Behavior
            if (isAlreadyActive) {
              targetContent.classList.add('hidden');
              button.classList.remove('bg-[#124195]', 'text-white', 'font-semibold', 'rounded-b-none');
              button.classList.add('text-slate-700', 'font-medium', 'rounded-2xl');
              const btnIcon = button.querySelector('.tech-btn-icon');
              if (btnIcon) btnIcon.classList.remove('brightness-0', 'invert');
              if (icon) icon.classList.remove('rotate-180');
            } else {
              techEcoLiteBtns.forEach(btn => {
                btn.classList.remove('bg-[#124195]', 'text-white', 'font-semibold', 'rounded-b-none');
                btn.classList.add('text-slate-700', 'font-medium', 'rounded-2xl');
                const btnIcon = btn.querySelector('.tech-btn-icon');
                if (btnIcon) btnIcon.classList.remove('brightness-0', 'invert');
                const otherIcon = btn.querySelector('.tech-acc-icon');
                if (otherIcon) otherIcon.classList.remove('rotate-180');
              });

              techEcoLiteContents.forEach(content => {
                content.classList.add('hidden');
              });

              if (targetContent) {
                targetContent.classList.remove('hidden');
              }
              button.classList.add('bg-[#124195]', 'text-white', 'font-semibold', 'rounded-b-none');
              button.classList.remove('text-slate-700', 'font-medium', 'rounded-2xl');
              const activeIcon = button.querySelector('.tech-btn-icon');
              if (activeIcon) activeIcon.classList.add('brightness-0', 'invert');
              if (icon) icon.classList.add('rotate-180');
            }
          }
        });
      });
    });

    // Auto-ensure active tab on desktop resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024) {
        techEcoLiteWrappers.forEach(wrapper => {
          if (!wrapper.closest('.hidden')) {
            const visibleContent = wrapper.querySelector('.tech-eco-lite-content:not(.hidden)');
            const firstBtn = wrapper.querySelector('.tech-eco-lite-btn');
            if (!visibleContent && firstBtn) {
              firstBtn.click();
            }
          }
        });
      }
    });
  }

  // Technology Ecosystem Parent Tab Switcher ("7 Capability Areas" vs "28 Technologies")
  const techParentTabBtns = document.querySelectorAll('.tech-parent-tab-btn');
  if (techParentTabBtns.length > 0) {
    techParentTabBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);

        // Reset all parent buttons
        techParentTabBtns.forEach(b => {
          b.classList.remove('bg-[#DD0031]', 'text-white', 'shadow-md', 'active');
          b.classList.add('text-white/80', 'hover:text-white');
        });

        // Hide all parent panes
        const parentPanes = document.querySelectorAll('.tech-parent-pane');
        parentPanes.forEach(pane => pane.classList.add('hidden'));

        // Activate clicked button
        btn.classList.add('bg-[#DD0031]', 'text-white', 'shadow-md', 'active');
        btn.classList.remove('text-white/80', 'hover:text-white');

        // Show target pane
        if (targetPane) {
          targetPane.classList.remove('hidden');

          // Ensure desktop tab has an active visible pane in this parent
          if (window.innerWidth >= 1024) {
            const visibleContent = targetPane.querySelector('.tech-eco-content:not(.hidden)');
            const firstBtn = targetPane.querySelector('.tech-eco-btn');
            if (!visibleContent && firstBtn) {
              firstBtn.click();
            }
          }
        }
      });
    });
  }

  // Technology Partner, Delivery Approach, Industry Solution & Custom Software Solutions Section Interactive Carousel (Modular, HTML-driven, supports multiple instances & custom IDs)
  function initTechPartnerSection(section) {
    if (!section) return;

    // Resolve elements within the section, supporting solutions-*, custom-solution-*, industry-*, delivery-*, partner-*, or generic class/ID patterns
    const partnerTitle = section.querySelector('.solutions-active-title, .custom-solution-active-title, .industry-active-title, .delivery-active-title, .partner-active-title, [id$="-active-title"], [id*="active-title"]');
    const partnerDesc = section.querySelector('.solutions-active-desc, .custom-solution-active-desc, .industry-active-desc, .delivery-active-desc, .partner-active-desc, [id$="-active-desc"], [id*="active-desc"]');
    const partnerMainBg = section.querySelector('.solutions-main-bg, .custom-solution-main-bg, .industry-main-bg, .delivery-main-bg, .partner-main-bg, [id$="-main-bg"], [id*="main-bg"]');
    const partnerCountPill = section.querySelector('.solutions-count-pill, .custom-solution-count-pill, .industry-count-pill, .delivery-count-pill, .partner-count-pill, [id$="-count-pill"], [id*="count-pill"]');
    const partnerProgressBar = section.querySelector('.solutions-progress-bar, .custom-solution-progress-bar, .industry-progress-bar, .delivery-progress-bar, .partner-progress-bar, [id$="-progress-bar"], [id*="progress-bar"]');
    const partnerThumbnails = section.querySelector('.solutions-thumbnails, .custom-solution-thumbnails, .industry-thumbnails, .delivery-thumbnails, .partner-thumbnails, [id$="-thumbnails"], [id*="thumbnails"]');
    const partnerPrevBtn = section.querySelector('.solutions-prev-btn, .custom-solution-prev-btn, .industry-prev-btn, .delivery-prev-btn, .partner-prev-btn, [id$="-prev-btn"], [id*="prev-btn"]');
    const partnerNextBtn = section.querySelector('.solutions-next-btn, .custom-solution-next-btn, .industry-next-btn, .delivery-next-btn, .partner-next-btn, [id$="-next-btn"], [id*="next-btn"]');

    if (!partnerThumbnails) return;

    let partnerItems = [];
    let currentPartnerIdx = 0;
    let isPartnerAnimating = false;

    // Check if thumbnail items already exist in HTML
    const existingThumbs = partnerThumbnails.querySelectorAll('.solutions-thumb-item, .custom-solution-thumb-item, .industry-thumb-item, .delivery-thumb-item, .partner-thumb-item, [class*="-thumb-item"]');

    if (existingThumbs.length > 0) {
      // Content is passed directly through HTML
      existingThumbs.forEach((thumb, idx) => {
        const titleEl = thumb.querySelector('.solutions-thumb-title, .custom-solution-thumb-title, .industry-thumb-title, .delivery-thumb-title, .partner-thumb-title, h4');
        const descEl = thumb.querySelector('.solutions-thumb-desc, .custom-solution-thumb-desc, .industry-thumb-desc, .delivery-thumb-desc, .partner-thumb-desc');
        const imgEl = thumb.querySelector('img');

        const title = thumb.dataset.title || (titleEl ? titleEl.textContent.trim() : '');
        const desc = thumb.dataset.desc || (descEl ? descEl.textContent.trim() : '');
        const image = thumb.dataset.image || (imgEl ? imgEl.getAttribute('src') : '');

        partnerItems.push({
          element: thumb,
          title: title,
          desc: desc,
          image: image
        });

        thumb.setAttribute('data-index', idx);
      });
    } else {
      // Fallback default partner items if no HTML thumbnails provided
      const defaultData = [
        {
          title: "Education & EdTech",
          desc: "Technology platforms that transform learning, student engagement, and education management.",
          image: "assets/images/education-and-edtech-thumb.webp"
        },
        {
          title: "Healthcare",
          desc: "Digital solutions accelerating patient care, clinical workflows, and medical compliance.",
          image: "assets/images/healthcare-thumb.webp"
        },
        {
          title: "Retail & E-commerce",
          desc: "Scalable digital commerce architectures driving omnichannel sales and customer loyalty.",
          image: "assets/images/retail-ecommerce-thumb.webp"
        },
        {
          title: "Enterprise & Modern Tech",
          desc: "Cloud, AI and modern software engineering powering high-performance business transformations.",
          image: "assets/images/the-challenge.webp"
        }
      ];

      let html = '';
      defaultData.forEach((item, idx) => {
        const itemNum = String(idx + 1).padStart(2, '0');
        const isActive = idx === 0;
        const borderClasses = isActive 
          ? 'border-2 border-white bg-black/70 shadow-xl scale-[1.02]' 
          : 'border border-white/20 hover:border-white/60 bg-black/40 opacity-75 hover:opacity-100';

        html += `
          <div class="partner-thumb-item group cursor-pointer relative rounded-2xl overflow-hidden shrink-0 ${borderClasses} backdrop-blur-xs transition-all duration-300 h-28 sm:h-32 p-3.5 flex flex-col justify-end w-[calc((100%-24px)/3)] sm:w-[calc((100%-32px)/3)]" data-index="${idx}" data-title="${item.title}" data-desc="${item.desc}" data-image="${item.image}">
            <img src="${item.image}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover ${isActive ? 'opacity-85' : 'opacity-55 group-hover:opacity-85'} transition duration-300">
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>
            <span class="relative z-10 text-xs font-bold text-white/90 mb-1">${itemNum}</span>
            <h4 class="relative z-10 text-xs sm:text-sm font-medium text-white leading-snug">${item.title}</h4>
          </div>
        `;
      });
      partnerThumbnails.innerHTML = html;

      partnerThumbnails.querySelectorAll('.delivery-thumb-item, .partner-thumb-item').forEach((thumb, idx) => {
        partnerItems.push({
          element: thumb,
          title: defaultData[idx].title,
          desc: defaultData[idx].desc,
          image: defaultData[idx].image
        });
      });
    }

    const total = partnerItems.length;
    if (total === 0) return;

    // Attach click event to thumbnails
    partnerItems.forEach((item, idx) => {
      item.element.addEventListener('click', function() {
        if (isPartnerAnimating) return;
        if (idx !== currentPartnerIdx) {
          switchPartnerCard(idx);
        }
      });
    });

    function updateThumbnailsUI(activeIdx) {
      partnerItems.forEach((item, idx) => {
        const thumb = item.element;
        const img = thumb.querySelector('img');
        if (idx === activeIdx) {
          thumb.classList.remove('border', 'border-white/20', 'hover:border-white/60', 'bg-black/40', 'opacity-75', 'hover:opacity-100');
          thumb.classList.add('border-2', 'border-white', 'bg-black/70', 'shadow-xl', 'scale-[1.02]');
          if (img) {
            img.classList.remove('opacity-55', 'group-hover:opacity-85');
            img.classList.add('opacity-85');
          }
        } else {
          thumb.classList.remove('border-2', 'border-white', 'bg-black/70', 'shadow-xl', 'scale-[1.02]');
          thumb.classList.add('border', 'border-white/20', 'hover:border-white/60', 'bg-black/40', 'opacity-75', 'hover:opacity-100');
          if (img) {
            img.classList.remove('opacity-85');
            img.classList.add('opacity-55', 'group-hover:opacity-85');
          }
        }
      });
    }

    function updatePosition() {
      if (!partnerThumbnails) return;
      const gapPx = window.innerWidth >= 640 ? 16 : 12;
      partnerThumbnails.style.transform = `translateX(calc(-${currentPartnerIdx} * ((100% + ${gapPx}px) / 3)))`;
    }

    function switchPartnerCard(targetIdx) {
      currentPartnerIdx = (targetIdx + total) % total;
      const currentItem = partnerItems[currentPartnerIdx];
      isPartnerAnimating = true;

      // Smooth Fade Out of Main Showcase Elements
      if (partnerTitle) partnerTitle.style.opacity = '0';
      if (partnerDesc) partnerDesc.style.opacity = '0';
      if (partnerMainBg) partnerMainBg.style.opacity = '0';

      // Slide thumbnails track & update highlights
      updatePosition();
      updateThumbnailsUI(currentPartnerIdx);

      // Update count pill & progress bar
      const displayNum = String(currentPartnerIdx + 1).padStart(2, '0');
      const totalNum = String(total).padStart(2, '0');
      if (partnerCountPill) {
        partnerCountPill.textContent = `${displayNum} of ${totalNum}`;
      }
      if (partnerProgressBar) {
        const progressPercent = ((currentPartnerIdx + 1) / total) * 100;
        partnerProgressBar.style.width = `${progressPercent}%`;
      }

      // Update text & image content after fade-out transition, then fade back in
      setTimeout(() => {
        if (partnerTitle) {
          partnerTitle.textContent = currentItem.title;
          partnerTitle.style.opacity = '1';
        }
        if (partnerDesc) {
          partnerDesc.textContent = currentItem.desc;
          partnerDesc.style.opacity = '1';
        }
        if (partnerMainBg) {
          partnerMainBg.src = currentItem.image;
          partnerMainBg.style.opacity = '1';
        }
        isPartnerAnimating = false;
      }, 200);
    }

    // Initialize initial state
    if (partnerCountPill) {
      partnerCountPill.textContent = `01 of ${String(total).padStart(2, '0')}`;
    }
    if (partnerProgressBar) {
      partnerProgressBar.style.width = `${(1 / total) * 100}%`;
    }
    updateThumbnailsUI(0);

    if (partnerPrevBtn) {
      partnerPrevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (isPartnerAnimating) return;
        switchPartnerCard(currentPartnerIdx - 1);
      });
    }

    if (partnerNextBtn) {
      partnerNextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (isPartnerAnimating) return;
        switchPartnerCard(currentPartnerIdx + 1);
      });
    }

    window.addEventListener('resize', updatePosition);
  }

  // Initialize all tech_partner, delivery_approach, industry_solution & custom_software_solutions sections on the page
  const techPartnerSections = document.querySelectorAll('.tech_partner, .delivery_approach, .industry_solution, .custom_software_solutions, [data-tech-partner], [data-carousel-slider]');
  techPartnerSections.forEach(section => initTechPartnerSection(section));

  // Also expose globally so any custom section or ID can be initialized directly: window.initTechPartnerSection(elemOrSelector)
  window.initTechPartnerSection = function(target) {
    const elem = typeof target === 'string' ? document.querySelector(target) : target;
    if (elem) initTechPartnerSection(elem);
  };
  window.initDeliveryApproachSection = window.initTechPartnerSection;
  window.initIndustrySolutionSection = window.initTechPartnerSection;
  window.initCustomSoftwareSolutionsSection = window.initTechPartnerSection;

  // Client Stories Hover, Mobile Drag Slider & Clickable Dots Handler
  const clientCards = document.querySelectorAll('.client-story-card');
  const clientDots = document.querySelectorAll('.client-dot');
  const clientSection = document.querySelector('.client_stories');
  const clientTrack = document.getElementById('client-stories-track');

  function activateClientCard(activeCard, shouldScroll = false) {
    if (!activeCard) return;

    clientCards.forEach(card => {
      const video = card.querySelector('video');
      const videoBox = card.querySelector('.relative.w-full');
      const logoImg = card.querySelector('.pt-4 img');
      card.classList.remove('active');
      if (videoBox) {
        videoBox.classList.remove('border-white/20', 'shadow-2xl');
        videoBox.classList.add('border-white/10', 'shadow-lg');
      }
      if (logoImg) {
        logoImg.classList.remove('opacity-100');
        logoImg.classList.add('opacity-75');
      }
      if (video) {
        video.pause();
      }
    });

    activeCard.classList.add('active');
    const activeVideoBox = activeCard.querySelector('.relative.w-full');
    const activeLogoImg = activeCard.querySelector('.pt-4 img');
    if (activeVideoBox) {
      activeVideoBox.classList.remove('border-white/10', 'shadow-lg');
      activeVideoBox.classList.add('border-white/20', 'shadow-2xl');
    }
    if (activeLogoImg) {
      activeLogoImg.classList.remove('opacity-75');
      activeLogoImg.classList.add('opacity-100');
    }

    const activeVideo = activeCard.querySelector('video');
    if (activeVideo) {
      const playPromise = activeVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay handle fallback
        });
      }
    }

    // Update bottom dots indicator
    const cardNum = activeCard.getAttribute('data-card');
    clientDots.forEach(dot => {
      if (dot.getAttribute('data-dot') === cardNum) {
        dot.classList.add('bg-white', 'w-7', 'active');
        dot.classList.remove('bg-white/40', 'w-2');
      } else {
        dot.classList.remove('bg-white', 'w-7', 'active');
        dot.classList.add('bg-white/40', 'w-2');
      }
    });

    // Optionally scroll card into view on mobile
    if (shouldScroll && activeCard) {
      activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  if (clientCards.length > 0) {
    // Hover & Click event listeners on cards
    clientCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        if (window.innerWidth >= 1024) {
          activateClientCard(this, false);
        }
      });

      card.addEventListener('click', function() {
        activateClientCard(this, true);
      });
    });

    // Click event listeners on bottom dots indicator
    clientDots.forEach(dot => {
      dot.addEventListener('click', function(e) {
        e.preventDefault();
        const cardNum = this.getAttribute('data-dot');
        const targetCard = document.querySelector(`.client-story-card[data-card="${cardNum}"]`);
        if (targetCard) {
          activateClientCard(targetCard, true);
        }
      });
    });

    // Drag / Horizontal Scroll Detection on Mobile (< 1024px)
    let isClientTrackScrolling = false;
    if (clientTrack) {
      clientTrack.addEventListener('scroll', function() {
        if (window.innerWidth >= 1024) return;
        if (!isClientTrackScrolling) {
          window.requestAnimationFrame(() => {
            const trackCenter = clientTrack.scrollLeft + (clientTrack.clientWidth / 2);
            let closestCard = null;
            let minDistance = Infinity;

            clientCards.forEach(card => {
              const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
              const distance = Math.abs(trackCenter - cardCenter);
              if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
              }
            });

            if (closestCard && !closestCard.classList.contains('active')) {
              activateClientCard(closestCard, false);
            }
            isClientTrackScrolling = false;
          });
          isClientTrackScrolling = true;
        }
      });
    }

    // Viewport IntersectionObserver for auto-playing first card (#1) when section enters view
    if (clientSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentActive = document.querySelector('.client-story-card.active') || clientCards[0];
            activateClientCard(currentActive, false);
          } else {
            clientCards.forEach(card => {
              const video = card.querySelector('video');
              if (video) video.pause();
            });
          }
        });
      }, { threshold: 0.3 });

      observer.observe(clientSection);
    }
  }

  // Section Counter Animation (for .real_result, .company_highlights, .banner_bottom, etc.)
  const counterSections = document.querySelectorAll('.real_result, .company_highlights, .banner_bottom');

  if (counterSections.length > 0) {
    function animateSectionCounters(section) {
      const counters = section.querySelectorAll('.real-result-counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds counting duration
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Easing function for smooth deceleration at the end
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = Math.floor(easeProgress * target);

          counter.textContent = currentCount.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counterAnimated) {
            entry.target.dataset.counterAnimated = 'true';
            animateSectionCounters(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counterSections.forEach(sec => counterObserver.observe(sec));
    } else {
      counterSections.forEach(sec => animateSectionCounters(sec));
    }
  }

  // Scroll Slide-in Animation Observer (data-animate or fade-in-* classes)
  const fadeElements = document.querySelectorAll('[data-animate], .fade-in-left, .fade-in-right, .fade-in-top, .fade-in-bottom');
  if (fadeElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -180px 0px'
      });

      fadeElements.forEach(el => fadeObserver.observe(el));
    } else {
      fadeElements.forEach(el => el.classList.add('appear'));
    }
  }

  // Consultation Popup Modal
  const consultationModal = document.getElementById('consultation-modal');
  const closeConsultationModalBtn = document.getElementById('close-consultation-modal');
  const quoteModalTriggers = document.querySelectorAll('.quote-modal-trigger');

  if (consultationModal) {
    const openModal = (e) => {
      if (e) e.preventDefault();
      consultationModal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    };

    const closeModal = () => {
      consultationModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    quoteModalTriggers.forEach(trigger => {
      trigger.addEventListener('click', openModal);
    });

    if (closeConsultationModalBtn) {
      closeConsultationModalBtn.addEventListener('click', closeModal);
    }

    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Job Apply Popup Modal
  const jobApplyModal = document.getElementById('job-apply-modal');
  const closeJobApplyModalBtn = document.getElementById('close-job-apply-modal');
  const jobModalTriggers = document.querySelectorAll('.job-modal-trigger');

  if (jobApplyModal) {
    const openJobModal = (e) => {
      if (e) e.preventDefault();
      jobApplyModal.classList.add('active');
      document.body.classList.add('overflow-hidden');
    };

    const closeJobModal = () => {
      jobApplyModal.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    };

    jobModalTriggers.forEach(trigger => {
      trigger.addEventListener('click', openJobModal);
    });

    if (closeJobApplyModalBtn) {
      closeJobApplyModalBtn.addEventListener('click', closeJobModal);
    }

    jobApplyModal.addEventListener('click', (e) => {
      if (e.target === jobApplyModal) {
        closeJobModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && jobApplyModal.classList.contains('active')) {
        closeJobModal();
      }
    });
  }

  // Our End-to-End E-commerce Development Process Accordion Logic
  const processSection = document.querySelector('.ecommerce_process');
  if (processSection) {
    const accordionItems = processSection.querySelectorAll('.process-accordion-item');

    function setActiveStep(index) {
      if (index < 0 || index >= accordionItems.length) return;

      accordionItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
          item.setAttribute('aria-expanded', 'true');
        } else {
          item.classList.remove('active');
          item.setAttribute('aria-expanded', 'false');
        }
      });
    }

    accordionItems.forEach((item, index) => {
      item.addEventListener('click', function () {
        setActiveStep(index);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setActiveStep(index);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % accordionItems.length;
          accordionItems[nextIndex].focus();
          setActiveStep(nextIndex);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + accordionItems.length) % accordionItems.length;
          accordionItems[prevIndex].focus();
          setActiveStep(prevIndex);
        }
      });
    });
  }

  // Career Page Job Search & Filter Logic
  const jobPositionsSection = document.querySelector('.job_positions');
  if (jobPositionsSection) {
    const jobCards = jobPositionsSection.querySelectorAll('.job-card-item');
    const jobCountEl = document.getElementById('job-count');
    const noJobsEl = document.getElementById('no-jobs-found');
    const clearBtn = document.getElementById('clear-job-filters');
    const resetBtn = document.getElementById('reset-filter-btn');
    const typeSelect = document.getElementById('filter-job-type');
    const deptSelect = document.getElementById('filter-department');
    const locSelect = document.getElementById('filter-location');
    const expSelect = document.getElementById('filter-experience');
    const bannerSearchInput = document.getElementById('banner-search-input');
    const bannerFindBtn = document.getElementById('banner-find-job-btn');

    function filterJobs() {
      const selectedType = typeSelect ? typeSelect.value : '';
      const selectedDept = deptSelect ? deptSelect.value : '';
      const selectedLoc = locSelect ? locSelect.value : '';
      const selectedExp = expSelect ? expSelect.value : '';
      const keyword = bannerSearchInput ? bannerSearchInput.value.toLowerCase().trim() : '';

      let visibleCount = 0;

      jobCards.forEach(card => {
        const type = card.getAttribute('data-type') || '';
        const dept = card.getAttribute('data-department') || '';
        const loc = card.getAttribute('data-location') || '';
        const exp = card.getAttribute('data-experience') || '';
        const title = (card.querySelector('.job-title')?.textContent || '').toLowerCase();

        const matchesType = !selectedType || type === selectedType;
        const matchesDept = !selectedDept || dept === selectedDept;
        const matchesLoc = !selectedLoc || loc === selectedLoc;
        const matchesExp = !selectedExp || exp === selectedExp;
        const matchesKeyword = !keyword || title.includes(keyword) || dept.toLowerCase().includes(keyword);

        if (matchesType && matchesDept && matchesLoc && matchesExp && matchesKeyword) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (jobCountEl) jobCountEl.textContent = visibleCount;
      if (noJobsEl) noJobsEl.classList.toggle('hidden', visibleCount > 0);
    }

    function clearFilters() {
      if (typeSelect) typeSelect.value = '';
      if (deptSelect) deptSelect.value = '';
      if (locSelect) locSelect.value = '';
      if (expSelect) expSelect.value = '';
      if (bannerSearchInput) bannerSearchInput.value = '';
      filterJobs();
    }

    [typeSelect, deptSelect, locSelect, expSelect].forEach(select => {
      if (select) {
        select.addEventListener('change', filterJobs);
      }
    });

    if (clearBtn) clearBtn.addEventListener('click', clearFilters);
    if (resetBtn) resetBtn.addEventListener('click', clearFilters);

    if (bannerFindBtn) {
      bannerFindBtn.addEventListener('click', function () {
        filterJobs();
      });
    }

    if (bannerSearchInput) {
      bannerSearchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          filterJobs();
          const targetSec = document.getElementById('job-positions-sec');
          if (targetSec) {
            targetSec.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }
});
