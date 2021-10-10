new Swiper(".swiper", {
  //стрелки
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // навигация

  pagination: {
    el: ".swiper-pagination",
    //буллеты
    clickable: true,
    // перетаскивания на пк
    simmulateTouch: true,
    // курсор перетаскивания
    grabCursor: true,
    // dynamicBullets: true
  },
  // управление клавиатурой
  keyboard: {
    enabled: true,
    //
    onlyInViewport: true,
  },
  // количество слайдов для показа
  slidesPerView: 3,
  // отступ между слайдами
  spaceBetween: 42,
  // стартовый слайд
  initialSlide: 0,
  // адаптиввная высота
  autoHeight: true,
  // бесконечный слайдер
  loop: true,
  // количество дублирующихся слайдов
  loopedSlides: 7,
  // скорость
  speed: 800,
  breakpoints: {
    1025: {
      spaceBetween: 42,
      slidesPerView: 3,
    },
    769: {
      spaceBetween: 41,
      slidesPerView: 3,
    },
    421: {
      spaceBetween: 20,
      slidesPerView: 2,
    },
    280: {
      spaceBetween: 20,
      slidesPerView: 2,
    }
  },
  // отключить подгрузку картинок
});
