window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("intro-overlay").classList.add("intro-finish");
    document.getElementById("main-content").style.opacity = 1;
  }, 2500);
});

const recipes = [
  {
    id: 1,
    name: "Scrambled Eggs",
    ingredients: ["egg", "butter"],
    description: "Whisk eggs and cook gently with butter.",
    isHealthy: true,
    isBudget: true,
    isQuick: true,
  },
];

let userIngredients = [];
let activeFilters = { isHealthy: false, isBudget: false, isQuick: false };

const input = document.getElementById("ingredientInput");
const tags = document.getElementById("ingredientTags");
const grid = document.getElementById("recipeGrid");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    userIngredients.push(input.value.toLowerCase());
    input.value = "";
    render();
  }
});

function render() {
  tags.innerHTML = userIngredients.map((i) => `<span>${i}</span>`).join("");
  grid.innerHTML = recipes
    .map(
      (r) => `
        <div onclick="openModal(${r.id})" class="p-6 bg-slate-800 rounded-2xl cursor-pointer">
            <h3>${r.name}</h3>
        </div>
    `
    )
    .join("");
}

function toggleFilter(key) {
  activeFilters[key] = !activeFilters[key];
  render();
}

function clearAll() {
  userIngredients = [];
  render();
}

function openModal(id) {
  const recipe = recipes.find((r) => r.id === id);
  document.getElementById("modalTitle").innerText = recipe.name;
  document.getElementById("modalDescription").innerText = recipe.description;
  document.getElementById("recipeModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("recipeModal").classList.add("hidden");
}
