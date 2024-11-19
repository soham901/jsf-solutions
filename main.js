// State management
const state = {
  data: [],
  labs: {},
  sortDirection: "desc", // 'asc' or 'desc'
  currentLab: null,
};

// DOM Elements
const elements = {
  labsContainer: document.getElementById("labs-container"),
  practicalsContainer: document.getElementById("practicals-container"),
  counter: document.getElementById("count"),
  title: document.getElementById("title"),
  backButton: document.getElementById("back-button"),
  sortButton: document.getElementById("sort-button"),
  subtitle: document.querySelector("p"),
};

// Sorting functions
const sortPracticals = (practicals, direction) => {
  return [...practicals].sort((a, b) => {
    const aNum = parseInt(a.practical.slice(1));
    const bNum = parseInt(b.practical.slice(1));
    return direction === "asc" ? aNum - bNum : bNum - aNum;
  });
};

const toggleSort = () => {
  state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  elements.sortButton.innerHTML =
    state.sortDirection === "asc"
      ? '<i class="fa-solid fa-caret-up"></i>'
      : '<i class="fa-solid fa-caret-down"></i>';

  // Re-sort current view
  if (state.currentLab) {
    state.labs[state.currentLab] = sortPracticals(
      state.labs[state.currentLab],
      state.sortDirection
    );
    displayPracticals(state.currentLab);
  } else {
    Object.keys(state.labs).forEach((lab) => {
      state.labs[lab] = sortPracticals(state.labs[lab], state.sortDirection);
    });
    displayLabs();
  }
};

// Display functions
const displayLabs = () => {
  state.currentLab = null;
  elements.labsContainer.innerHTML = "";
  elements.labsContainer.classList.remove("hidden");
  elements.practicalsContainer.classList.add("hidden");
  elements.backButton.classList.add("hidden");
  elements.sortButton.classList.add("hidden");
  elements.title.textContent = "JSF Practicals";
  elements.subtitle.style.display = "";
  elements.counter.textContent = `(${Object.keys(state.labs).length})`;

  Object.keys(state.labs).forEach((lab) => {
    const card = createLabCard(lab);
    elements.labsContainer.appendChild(card);
  });
};

const displayPracticals = (lab) => {
  state.currentLab = lab;
  elements.labsContainer.classList.add("hidden");
  elements.practicalsContainer.classList.remove("hidden");
  elements.backButton.classList.remove("hidden");
  elements.sortButton.classList.remove("hidden");
  elements.title.textContent = `Lab ${lab}`;
  elements.counter.textContent = `(${state.labs[lab].length})`;
  elements.subtitle.style.display = "none";
  elements.practicalsContainer.innerHTML = "";

  state.labs[lab].forEach((practical) => {
    const card = createPracticalCard(practical);
    elements.practicalsContainer.appendChild(card);
  });
};

// Card creation functions
const createLabCard = (lab) => {
  const card = document.createElement("div");
  card.className =
    "bg-white overflow-hidden shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-300";
  card.innerHTML = `
      <div class="p-6 space-y-3">
        <h2 class="text-2xl font-bold text-gray-900">Lab ${lab}</h2>
        <p class="text-sm text-gray-500">Click to view ${state.labs[lab].length} practicals</p>
      </div>
    `;
  card.addEventListener("click", () => {
    updateQueryParam(lab);
    displayPracticals(lab);
  });
  return card;
};

const createPracticalCard = (practical) => {
  const card = document.createElement("div");
  card.className =
    "bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300";
  card.innerHTML = `
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Practical ${practical.practical}</h2>
        <p class="text-sm text-gray-500 mb-4">Lab ${practical.lab}</p>
        <div class="aspect-w-16 aspect-h-9 mb-4">
          <iframe src="${practical.path}" class="w-full h-full object-cover rounded" sandbox="allow-same-origin"></iframe>
        </div>
        <div class="flex justify-between items-center">
          <a href="${practical.path}" 
             target="_blank" 
             class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View Demo
          </a>
          <a href="https://github.com/soham901/jsf-solutions/blob/main/${practical.path}" 
             target="_blank" 
             class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            View Code
          </a>
        </div>
      </div>
    `;
  return card;
};

// URL handling
const updateQueryParam = (lab) => {
  if (lab === null) {
    // set empty url
    const url = new URL(window.location);
    url.searchParams.delete("lab");
    window.history.pushState({ lab }, "", url);
    return;
  }

  const url = new URL(window.location);
  url.searchParams.set("lab", lab);
  window.history.pushState({ lab }, "", url);
};

const checkQueryParam = () => {
  const params = new URLSearchParams(window.location.search);
  const lab = params.get("lab");
  if (lab && state.labs[lab]) {
    displayPracticals(lab);
  } else {
    displayLabs();
  }
};

// Initialize
const init = async () => {
  try {
    const response = await fetch("practicals.json");
    if (!response.ok) throw new Error("Failed to fetch practicals data");

    state.data = await response.json();

    // Group practicals by lab
    state.labs = state.data.reduce((acc, practical) => {
      const lab = practical.lab;
      if (!acc[lab]) acc[lab] = [];
      acc[lab].push(practical);
      return acc;
    }, {});

    // Sort all labs initially
    Object.keys(state.labs).forEach((lab) => {
      state.labs[lab] = sortPracticals(state.labs[lab], state.sortDirection);
    });

    // Event listeners
    elements.backButton.addEventListener("click", () => {
      displayLabs();
      // set query param to empty
      updateQueryParam(null);
    });
    elements.sortButton.addEventListener("click", toggleSort);

    // Initial display
    checkQueryParam();
  } catch (error) {
    console.error("Failed to initialize application:", error);
    elements.title.textContent = "Error loading practicals";
    elements.subtitle.textContent = "Please try refreshing the page";
  }
};

// Start the application
init();
