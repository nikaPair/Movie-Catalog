import { NEW_RELEASES, TV_SHOWS, ANIME, MOST_POPULAR } from "./mock/movies.js";

const sliders = document.querySelectorAll(".movie-list");
const movies = NEW_RELEASES;
const tvShows = TV_SHOWS;
const anime = ANIME;
const mostPopular = MOST_POPULAR;
let modalIsOpen = false;
function toggleModal() {
  if (modalIsOpen) {
    document.getElementById("modal").style.display = "none";
    modalIsOpen = false;
  } else {
    document.getElementById("modal").style.display = "flex";
    modalIsOpen = true;
  }
}
function createModal(movieTitle, movie) {
  const modal = document.getElementById("modal");
  modal.innerHTML = "";

  const modalTitle = document.createElement("h1");
  modalTitle.textContent = movieTitle;

  const modalDescription = document.createElement("p");
  modalDescription.textContent = movie.description;

  const modalImage = document.createElement("img");
  modalImage.src = movie.src;
  modalImage.alt = movieTitle;
  modalImage.style.width = "100%";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", toggleModal);

  modal.appendChild(modalTitle);
  modal.appendChild(modalImage);
  modal.appendChild(modalDescription);
  modal.appendChild(closeButton);
}
function initializeSwiper(selector, prevSelector, nextSelector) {
  return new Swiper(selector, {
    slidesPerView: "auto",
    navigation: {
      nextEl: nextSelector,
      prevEl: prevSelector,
    },
  });
}

initializeSwiper(
  ".new-releases-swiper",
  ".new-releases-prev",
  ".new-releases-next"
);
initializeSwiper(
  ".most-popular-swiper",
  ".most-popular-prev",
  ".most-popular-next"
);
initializeSwiper(".tv-shows-swiper", ".tv-shows-prev", ".tv-shows-next");
initializeSwiper(".anime-swiper", ".anime-prev", ".anime-next");
function populateSwiper(moviesList, swiperWrapperSelector, category) {
  const wrapper = document.querySelector(swiperWrapperSelector);
  Object.keys(moviesList).forEach((title) => {
    const movie = moviesList[title];
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    slide.innerHTML = `
      <div class="movie-list-item">
        <img src="${movie.src}" alt="${title}" class="movie-list-item-img" />
        <button class="movie-list-item-button" data-modal="${category}|${title}">Description</button>
      </div>
    `;
    wrapper.appendChild(slide);
  });
}

populateSwiper(NEW_RELEASES, ".new-releases-swiper .swiper-wrapper", "movies");
populateSwiper(
  MOST_POPULAR,
  ".most-popular-swiper .swiper-wrapper",
  "mostPopular"
);
populateSwiper(TV_SHOWS, ".tv-shows-swiper .swiper-wrapper", "tvShows");
populateSwiper(ANIME, ".anime-swiper .swiper-wrapper", "anime");

const buttons = document.querySelectorAll(".movie-list-item-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const [category, movieTitle] = button.getAttribute("data-modal").split("|");
    const allMovies = {
      movies,
      mostPopular,
      tvShows,
      anime,
    };
    const movie = allMovies[category][movieTitle];
    if (movie) {
      createModal(movieTitle, movie);
      toggleModal();
    }
  });
});

const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  }
});
