gsap.registerPlugin(ScrollTrigger, SplitText);
function splideSlider() {
  document.querySelectorAll('.splide_slider').forEach(slider => {

    const options = {
      type: slider.dataset.type || "loop",
      perPage: parseInt(slider.dataset.perPage) || 1,
      autoplay: slider.dataset.autoplay === "true",
      interval: parseInt(slider.dataset.interval) || 3000,
      arrows: slider.dataset.arrows !== "false",
      pagination: slider.dataset.pagination !== "false",
      gap: slider.dataset.gap || "0px",
      type:"fade"
    };

    new Splide(slider, options).mount();
  });
}
function splideSliderMobile() {
     if (! window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
  document.querySelectorAll('.splide_mobile').forEach(slider => {
   const options = {
      type: slider.dataset.type || "loop",
      perPage: parseInt(slider.dataset.perPage) || 1,
      autoplay: slider.dataset.autoplay === "true",
      interval: parseInt(slider.dataset.interval) || 3000,
      arrows: slider.dataset.arrows || false,
      pagination: slider.dataset.pagination !== "false",
      gap: slider.dataset.gap || "1rem",
    };

    new Splide(slider, options).mount();
  });
}
function accordion(){
  const faqGroups = document.querySelectorAll('.faq__list');
  faqGroups.forEach(group => {
    let mobileOnly = false;
    if(group.dataset.accordionMobileOnly) {
      mobileOnly = true;
    }
    if(mobileOnly && !isMobile()) {
      return;
    }
    const faqItems = group.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question');
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach(i => {
          i.classList.remove('is-open');
        });
        if (!isOpen) {
          item.classList.add('is-open');
        }
      });
    });
  });
}
function burgerMenu(){
  const burgers = document.querySelectorAll('.burger-menu-btn');
  const nav = document.querySelector('.mobile-menu');
  const body = document.body;
  const menuClose = document.querySelector('.mobile-menu .close-btn');
  burgers.forEach(burger => {
    burger.addEventListener('click', () => {
      nav.classList.toggle('is-show');
      body.classList.toggle('no-scroll');
    });
  });
  menuClose.addEventListener('click', () => {
    nav.classList.remove('is-show');
    body.classList.remove('no-scroll');
  });
}
function locomotiveScroll(){
         window.locomotive_scroll = new LocomotiveScroll({
    lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        lerp: 0.1,
        duration: 0.8,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
});

}
function headerToggle(){
  let lastScrollTop = 0;

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  let delta = scrollTop - lastScrollTop;

  // Ignore small scrolls (<= 5px)
  if (Math.abs(delta) <= 5) return;

  if (delta > 0) {
    // Scrolling DOWN
    document.body.classList.add("scrolling-down");
    document.body.classList.remove("scrolling-up");
  } else {
    // Scrolling UP
    document.body.classList.add("scrolling-up");
    document.body.classList.remove("scrolling-down");
  }

  // Your existing logic
  if (scrollTop > 100) {
    document.body.classList.add("is-scrolled");
  } else {
    document.body.classList.remove("is-scrolled");
  }

  lastScrollTop = scrollTop;
});
}
  function setDelays(){
    const delays = [...document.querySelectorAll("[delay]")];
    delays.forEach(function (e) {
      const delay = e.getAttribute("delay");
      e.style.setProperty("--delay", delay);
    });
     const delaysMobile = [...document.querySelectorAll("[delay-mobile]")];
    delaysMobile.forEach(function (e) {
      const delay = e.getAttribute("delay-mobile");
      e.style.setProperty("--delay-mobile", delay);
    });
    const fadeinGroups = [...document.querySelectorAll("[data-fadein-group]")];
    fadeinGroups.forEach(function (e) {
      Array.from(e.children).forEach((el, index) => {
        el.style.setProperty("--index", index);
      });
    });
    const fadeinGalleries = [...document.querySelectorAll("[data-fadein-gallery]")];
    fadeinGalleries.forEach(function (e) {
      Array.from(e.children).forEach((el, index) => {
        el.style.setProperty("--index", index);
      });
    });
  }
  function splitText(){
    const targets = [...document.querySelectorAll("[data-animation='heading'],[data-animation='slider_heading']")];
    targets.forEach(function (el) {
      const split = new SplitText(el, { type: "lines" ,wordsClass: "word",linesClass: "line"});
      split.lines.forEach((line,index) => {
        line.style.setProperty("--index", index);
        new SplitText(line, { type: "lines",linesClass: "line-i" });
      });
    });
  }
  function heroAnimation(){
    const hero = document.querySelector('.hero-section');
    const img = hero.querySelectorAll('img');
    gsap.to(img, {
      y: 150,
      duration: 1,
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "100%",
        scrub: true,
      }
    });
  }
  function numberAnimation(){
    const numbers = [...document.querySelectorAll(".stat-number")];
    numbers.forEach(function (e) {
      const number = e.textContent;
      let justNumber = number.replace(/[^\d,]/g, '').replace(/,/g, '');
      let unit = number.replace(/[\d,]/g, '');
      let numberinchar = justNumber.split('');
      let numberHtml = "";
      numberinchar.forEach((char,index) => {
        numberHtml += "<span class='numberChars-wrap'>";
        numberHtml += `<span class='numberChars' style='--char:${100 - (10 * char)}%;'>`;
        for(let i = 9; i >= 0; i--){
          numberHtml += `<span class="numberChar" style="--index:${Number(char) - i};">${i}</span>`;
        }
        numberHtml += "</span>";
        numberHtml += "</span>";
      });
      let space = "";
      if(unit.length > 1){
        space = "&nbsp;";
      }
      e.innerHTML = numberHtml + space + unit;
    });
  }
function footerAnimation(){
  const footer = document.querySelector('.footer__main');
  gsap.set(footer.querySelectorAll('.foter-main-inner'), { opacity: 0 });

  gsap.to(footer.querySelectorAll('.foter-main-inner'), {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: footer,
      start: "top bottom",
      end: "+=70%",
      scrub: true,
    }
  });
}
    function initHighlightText(){

  let splitHeadingTargets = document.querySelectorAll("[data-hightlight]")
  
  splitHeadingTargets.forEach((section) => {
    let heading = section.querySelector("[data-animation='highlight']");
    if (!heading) return;
    const fadedValue = heading.getAttribute("data-highlight-fade") || 0.2
    const staggerValue =  heading.getAttribute("data-highlight-stagger") || 0.1
    
    let lines = new SplitText(heading, {
      type: "words, chars",
      autoSplit: true,
      charsClass: "char"
    });    
    lines.chars.forEach((char) => {
      char.style.opacity = fadedValue;
    });
       setTimeout(() => {
        let tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: section, 
              start: "top bottom",
              end: "bottom top+=80%",
            }
          })
          tl.to(lines.chars,{
            opacity: 1,
            stagger: 0.1,
            ease: "linear"
          })
       }, 200);
  });
  
}
function videoPopup(){
  const videoPopup = document.querySelector('.video-popup');
  if(!videoPopup) return;
  const videoPopupClose = document.querySelector('.close-video-popup');
  const videoPopupOverlay = document.querySelector('.video-popup .popup-overlay');
  videoPopupOverlay.addEventListener('click', () => {
    videoPopup.querySelector('iframe').src = "";
    videoPopup.classList.remove('is-show');
    
    window.locomotive_scroll.start();
  });
  videoPopupClose.addEventListener('click', () => {
    videoPopup.querySelector('iframe').src = "";
    videoPopup.classList.remove('is-show');
    
    window.locomotive_scroll.start();
  });
  document.querySelectorAll('[data-video]').forEach((el) => {
    let youtubeUrl = el.dataset.video;
    el.addEventListener('click', () => {
      videoPopup.querySelector('iframe').src = youtubeUrl;
        videoPopup.classList.add('is-show');
      
      window.locomotive_scroll.stop();
    });
  });
}
function cardsAnimation(){
  const cards = document.querySelectorAll('[data-wf--why-card--variant="option_2"]');
  cards.forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top top+=40%", // when card top hits viewport top
      end: "bottom top+=40%", // until it leaves top
      toggleClass: { targets: card, className: "is-active" },
      markers: false // set true for debugging
    });
  });
}
function loaderAnimation() {
  const loader = document.querySelector('.loader-main');
  const loaderLogo = loader.querySelector('.loader--logo');
  const loaderLogoName = loader.querySelector('.loader--logo-name svg');
  const loaderLogoYear = loader.querySelector('.logo-year svg');

  const tl = gsap.timeline();

  tl.to(loaderLogo, {
    scale: 1,
    duration: 0.5,
    opacity: 1,
    ease: "power3.inOut"
  })
  .to((loaderLogoName), {
    y: 0,
    duration: 0.4,
     delay: 0.1,
    ease: "power3.out"
  })
  .to(loaderLogoYear, {
    y: 0,
    duration: 0.4,
    ease: "power3.out"
  },"-=0.25");
}
function closeLoader() {
  const loader = document.querySelector('.loader-main');
  const loaderLogo = loader.querySelector('.loader--logo');
  const loaderLogoName = loader.querySelector('.loader--logo-name svg');
  const loaderLogoYear = loader.querySelector('.logo-year svg');

  const tl = gsap.timeline();

  tl.to(loaderLogo, {
    scale: 1.1,
    opacity: 0,
    duration: 0.5,
    ease: "power3.in"
  })
  .to([loaderLogoName, loaderLogoYear], {
    y: -100,
    duration: 0.5,
    ease: "power3.in"
  }, "-=0.1")
  .to(loader, {
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
    onComplete: () => {
      document.body.classList.add("is-loaded");
    }
  }, "-=0.2");
}
function commonFunctions(){
    document.querySelectorAll("[href='#submit']").forEach((btn)=>{
  btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let nextButton = btn.nextElementSibling;
    if(nextButton){
      nextButton.removeAttribute("disabled");
      nextButton.click();
    }
  })
 })
}

function releaseGoldSteps(){
  const section = document.querySelector('.process-release-gold');
  if(!section) return;
  const stepHeaders = section.querySelectorAll('.release-gold-step');
  const stepSections = section.querySelectorAll('.release-gold-step-wrap');
  let tl = gsap.timeline({
            scrollTrigger: {
              scrub: true,
              trigger: ".release-gold-steps", 
              start: "top-=10% top",
              end: "bottom bottom"
            }
      })
stepSections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top+=10% center",
    end: "bottom center",

    onEnter: () => {
      stepHeaders[i].classList.add("is-active");
      sec.classList.add("is-active");
    },

    onLeaveBack: () => {
      stepHeaders[i].classList.remove("is-active");
      sec.classList.remove("is-active");
    }
  });
});
  window.addEventListener("scroll", () => {
    section.style.setProperty("--scroll", tl.scrollTrigger.progress);
  });

}

document.fonts.ready.then(() => {
  setTimeout(() => {
    splitText();
    initHighlightText();
  }, 200);
});
  function onLoad(){
    setDelays();
    splideSlider();
    splideSliderMobile();
    accordion();
    burgerMenu();
    
    locomotiveScroll();
    numberAnimation();
    // heroAnimation();
    footerAnimation();
    cardsAnimation();
    
    videoPopup();
    loaderAnimation();
    commonFunctions();
    releaseGoldSteps();
    setTimeout(() => {
      closeLoader();
      headerToggle();
    }, 2000);
    ScrollTrigger.normalizeScroll();
  }
document.addEventListener('DOMContentLoaded', onLoad);

const swup = new Swup({
  containers: ["main"],
  ignoreVisit: (url, { el } = {}) => el?.closest('[href="#"], [href="#reset_form"],[href="#submit"],[data-no-swup]'),
  linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup]),a[data-ms-code-lang-select]',
  animateHistoryBrowsing: true,
  cache: true,
  plugins: [new SwupPreloadPlugin(),new SwupScrollPlugin({
      doScrollingRightAway: true,
      animateScroll: false,
      scrollFriction: 0,
      scrollAcceleration: 0,
    })]
});

function updateActiveLink() {
    const currentPath = window.location.pathname; 
    const navLinks = document.querySelectorAll('a');

    navLinks.forEach(link => {
        link.classList.remove('w--current');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('w--current');
        }
    });
}

  swup.hooks.on("page:view", (x) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(x.to.html, 'text/html');
    const newPage = doc.querySelector('[data-wf-page]');
    if (newPage) {
        document.documentElement.setAttribute(
            'data-wf-page',
            newPage.getAttribute('data-wf-page')
        );
    }
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.refresh();
     setDelays();
    splideSlider();
    splitText();
    initHighlightText();
    splideSliderMobile();
    accordion();
    
    locomotiveScroll();
    numberAnimation();
    cardsAnimation();
    videoPopup();
    // updateActiveLink();
    commonFunctions();
    footerAnimation();
    Webflow.ready();

    // Rebind forms
    const forms = window.Webflow.require && window.Webflow.require('forms');
    if (forms) {
        forms.ready();
    }
    
  });
  function beforePageChange(){
    document.body.classList.remove("is-loaded");
    if (window.locomotive_scroll) {
            window.locomotive_scroll.destroy();
        }
  const nav = document.querySelector('.mobile-menu');
  const body = document.body;
    nav.classList.remove('is-show');
    body.classList.remove('no-scroll');
        
    
  }
  swup.hooks.replace('animation:out:await', async () => {
    beforePageChange();
    await new Promise(resolve => setTimeout(resolve, 200));
    return true;

  });

  swup.hooks.replace('animation:in:await', async () => {
    window.scrollTo(0, 0);
    locomotiveScroll()
    await new Promise(resolve => setTimeout(resolve, 200));
    document.body.classList.add("is-loaded");
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.load();
      video.play();
    });
    return true;
  });

  swup.hooks.on('content:replace', (x) => {
    Webflow.destroy();
    Webflow.ready();
});