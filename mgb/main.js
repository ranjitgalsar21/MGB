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
  const burger = document.querySelector('.burger-menu-btn');
  const nav = document.querySelector('.mobile-menu');
  const body = document.body;
  const menuClose = document.querySelector('.mobile-menu .close-btn');
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-show');
    nav.classList.toggle('is-show');
    body.classList.toggle('no-scroll');
  });
  menuClose.addEventListener('click', () => {
    burger.classList.remove('is-show');
    nav.classList.remove('is-show');
    body.classList.remove('no-scroll');
  });
}
  function onLoad(){
    splideSlider();
    splideSliderMobile();
    accordion();
    burgerMenu();
  }
document.addEventListener('DOMContentLoaded', onLoad);