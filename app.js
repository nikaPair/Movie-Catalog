let movies = {
  Her: {
    src: "img/1.jpeg",
    title: "Her",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
  },
  Inception: {
    src: "img/2.jpeg",
    title: "Inception",
    description:
      "A thief who enters the dreams of others to steal secrets from their subconscious is offered a chance to have his criminal history erased",
  },
  "The Shawshank Redemption": {
    src: "img/3.jpg",
    title: "The Shawshank",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  Godfather: {
    src: "img/4.jpg",
    title: "Godfather",
    description: "Description of Godfather.",
  },
  "Iron Man": {
    src: "img/5.jpg",
    title: "Avangers",
    description: "Description of Iron Man.",
  },
  Cars: {
    src: "img/6.jpg",
    title: "Cars",
    description: "Description of Cars.",
  },
  "Spider Man": {
    src: "img/7.jpg",
    title: "Spider Man",
    description: "Description of Spider Man.",
  },
  DC: {
    src: "img/8.jpg",
    title: "Batman",
    description: "Description of Batman.",
  },
};

let sliders = document.querySelectorAll(".movie-list");

sliders.forEach((slider) => {
  const movieTitles = Object.keys(movies);

  for (let i = 0; i < movieTitles.length; i++) {
    let slide = document.createElement("div");

    const movieTitle = movieTitles[i];
    const movie = movies[movieTitle];

    slide.classList.add("movie-list-item");
    slide.innerHTML = `
      <img src="${movie.src}" alt="" class="movie-list-item-img" />
      <span class="movie-list-item-title">${movie.title}</span>
      <p class="movie-list-item-desc">${movie.description}</p>
      <button class="movie-list-item-button">Watch</button>
    `;
    slider.appendChild(slide);
  }
});

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const movieList = movieLists[i];
  const sliderWidth = movieList.offsetWidth;
  const itemWidth = movieList.querySelector(".movie-list-item").offsetWidth;
  const visibleItems = Math.floor(sliderWidth / itemWidth);
  let clickCounter = 0;

  arrow.addEventListener("click", () => {
    const totalItems = movieList.querySelectorAll(".movie-list-item").length;
    const totalTranslateX = (totalItems - visibleItems) * itemWidth;

    clickCounter++;
    if (clickCounter * itemWidth <= totalTranslateX) {
      movieList.style.transform = `translateX(${-clickCounter * itemWidth}px)`;
    } else {
      movieList.style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });
});

let ball = document.querySelector(".toggle-ball");
let items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.arrow"
);
ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
  document.body.classList.toggle("light-mode");
});
