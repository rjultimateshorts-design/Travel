const placeNames = {
  amalfi: "Amalfi Coast, Italy",
  kyoto: "Kyoto, Japan",
  marrakech: "Marrakech, Morocco",
  bali: "Bali, Indonesia",
  lisbon: "Lisbon, Portugal",
  dolomites: "The Dolomites, Italy",
};

const placeItineraries = {
  amalfi: [
    ["Find your feet in Positano", "Aperitivo by the water"],
    ["Take the slow boat to Capri", "Swim in a hidden cove"],
    ["Lemon groves in Amalfi", "Long lunch in the piazza"],
    ["Walk the Path of the Gods", "Golden hour in Ravello"],
    ["One last dip, no plans", "A seaside dinner to remember"],
    ["A morning in quiet Atrani", "The best gelato, twice"],
    ["Follow the coast somewhere new", "Stay for the sunset"],
    ["Sleep in, swim out", "A table with a sea view"],
    ["Explore the little lanes", "A final limoncello"],
    ["Coffee with the locals", "Make a promise to return"],
  ],
  kyoto: [
    ["Wander Gion at first light", "Tea in a tucked-away machiya"],
    ["Find your quiet at Fushimi Inari", "Soba for lunch"],
    ["Take the river road to Arashiyama", "Bamboo grove, slowly"],
    ["Browse Nishiki Market", "An evening in Pontocho"],
    ["A temple garden to yourself", "One last bowl of ramen"],
    ["Follow the Philosopher’s Path", "A little sake tasting"],
    ["Calligraphy, then no plans", "Dinner in a neighborhood izakaya"],
    ["Cycle along the river", "A sweet treat in Gion"],
    ["A day trip to Nara", "Meet the deer at dusk"],
    ["One last shrine, one more tea", "Say mata ne to Kyoto"],
  ],
  marrakech: [
    ["Get wonderfully lost in the medina", "Mint tea on a rooftop"],
    ["The souks, with no shopping list", "Dinner in Jemaa el-Fnaa"],
    ["A morning at Jardin Majorelle", "Long lunch in the shade"],
    ["Take the scenic road to the Atlas", "Berber tea with a view"],
    ["Hammam, then absolutely nothing", "A candlelit riad dinner"],
    ["Find the secret courtyards", "Taste your way through the souk"],
    ["A slow morning at the riad", "Sunset above the red city"],
    ["Bread from the neighborhood oven", "A little treasure hunt"],
    ["The Saadian Tombs before noon", "One last rooftop dinner"],
    ["Coffee, spices, and a soft goodbye", "Carry a little magic home"],
  ],
  bali: [
    ["Settle in among the rice fields", "Sunset swim in Uluwatu"],
    ["A temple above the waves", "Fresh coconuts, no rush"],
    ["Follow the Campuhan Ridge Walk", "Lunch in a garden café"],
    ["Waterfalls, then a flower bath", "A Balinese home-cooked dinner"],
    ["Find your own quiet beach", "Catch the last light in Canggu"],
    ["A slow start in Ubud", "Make something with your hands"],
    ["Snorkel in bright-blue water", "Dinner with your feet in the sand"],
    ["A sunrise walk through the green", "An afternoon with no plans"],
    ["Visit a village temple", "Watch the sky turn apricot"],
    ["One last swim before breakfast", "Leave a little lighter"],
  ],
  lisbon: [
    ["Wander Alfama before the trams", "A pastel de nata pit stop"],
    ["Follow the azulejos in Graça", "A long lunch in the sun"],
    ["Take the train to the sea", "Salt air in Cascais"],
    ["Bookshop hopping in Chiado", "Fado after the sun goes down"],
    ["An unhurried morning in Príncipe Real", "A final glass of vinho verde"],
    ["Climb a hill for the view", "Listen for music in the lanes"],
    ["Market lunch at Time Out", "Your favorite miradouro, again"],
    ["Day trip to the fairytale palaces", "Back in time for sunset"],
    ["A last tram ride, standing room", "Share one more petisco"],
    ["Coffee by the river", "Take the long way home"],
  ],
  dolomites: [
    ["Wake up to the mountain air", "A slow walk around the lake"],
    ["Take the trail to a rifugio", "Polenta with a view"],
    ["Ride the cable car into the clouds", "A meadow-side picnic"],
    ["Follow the quiet valley path", "A little spa time"],
    ["Catch first light at Tre Cime", "A well-earned mountain lunch"],
    ["Take the scenic pass by car", "Stop wherever looks beautiful"],
    ["A final trail, at your own pace", "Watch the peaks turn pink"],
    ["Sleep in, breathe deep", "Find a new favorite trail"],
    ["A lakeside coffee in the sun", "One more mountain sunset"],
    ["Pack slowly and look back", "Already planning your return"],
  ],
};

const dayNotes = ["A little exploring", "Eat something lovely"];
const destinationCards = [...document.querySelectorAll(".destination-card")];
const itineraryDays = document.querySelector("#itinerary-days");
const lengthSelect = document.querySelector("#trip-length");
const guestCount = document.querySelector("#guest-count");
const placeName = document.querySelector("#selected-place-name");
const toast = document.querySelector("#toast");
let selectedPlace = "amalfi";
let guests = 2;
let shuffleOffset = 0;
let toastTimeout;

function renderItinerary() {
  const days = Number(lengthSelect.value);
  const activities = placeItineraries[selectedPlace];

  itineraryDays.innerHTML = Array.from({ length: days }, (_, index) => {
    const activity = activities[(index + shuffleOffset) % activities.length];
    return `<div class="itinerary-day"><span>DAY ${String(index + 1).padStart(2, "0")}</span><strong>${activity[0]}</strong><p>${activity[1] || dayNotes[index % dayNotes.length]}</p></div>`;
  }).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

function selectDestination(card) {
  destinationCards.forEach((destinationCard) => {
    const isSelected = destinationCard === card;
    destinationCard.classList.toggle("is-selected", isSelected);
    destinationCard.querySelector(".card-select").setAttribute("aria-pressed", String(isSelected));
  });
  selectedPlace = card.dataset.place;
  placeName.textContent = placeNames[selectedPlace];
  shuffleOffset = 0;
  renderItinerary();
}

destinationCards.forEach((card) => {
  card.querySelector(".card-select").addEventListener("click", () => selectDestination(card));
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    let visibleCount = 0;
    destinationCards.forEach((card) => {
      const isVisible = button.dataset.filter === "all" || card.dataset.category === button.dataset.filter;
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });
    document.querySelector("#places-count").textContent = String(visibleCount).padStart(2, "0");
  });
});

lengthSelect.addEventListener("change", renderItinerary);

document.querySelectorAll(".guest-button").forEach((button) => {
  button.addEventListener("click", () => {
    guests = Math.min(8, Math.max(1, guests + Number(button.dataset.guestChange)));
    guestCount.textContent = `${guests} ${guests === 1 ? "traveler" : "travelers"}`;
  });
});

document.querySelector("#shuffle-itinerary").addEventListener("click", () => {
  shuffleOffset = (shuffleOffset + 2) % placeItineraries[selectedPlace].length;
  renderItinerary();
});

document.querySelector("#build-trip").addEventListener("click", () => {
  const days = Number(lengthSelect.value);
  showToast(`Your ${days}-day ${placeNames[selectedPlace]} escape is ready to explore.`);
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mainNav.classList.remove("is-open");
  });
});

renderItinerary();