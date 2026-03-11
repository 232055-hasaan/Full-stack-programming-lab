// ───────────────────────────────────────────
// Lab Task 5 – Product Catalog using Map
// ───────────────────────────────────────────

// ─── Product Map: Key = Product ID, Value = Product Object ───
const productMap = new Map([
  ["P001", { name: "Wireless Headphones",  category: "Electronics",    price: 12500, stock: 45, emoji: "🎧" }],
  ["P002", { name: "Running Sneakers",     category: "Sports",         price: 8999,  stock: 30, emoji: "👟" }],
  ["P003", { name: "JavaScript Mastery",   category: "Books",          price: 1500,  stock: 120, emoji: "📘" }],
  ["P004", { name: "Organic Green Tea",    category: "Food & Grocery", price: 850,   stock: 200, emoji: "🍃" }],
  ["P005", { name: "Minimalist Desk Lamp", category: "Home & Living",  price: 3200,  stock: 60,  emoji: "💡" }],
]);

// Card background colors (cycles through products)
const THUMB_COLORS = ["#f0ebe3", "#e3edf0", "#e3f0eb", "#f0ece3", "#ede3f0", "#f0e3e8"];
const EMOJI_MAP = {
  "Electronics":    "💻",
  "Clothing":       "👕",
  "Books":          "📚",
  "Food & Grocery": "🥗",
  "Sports":         "⚽",
  "Home & Living":  "🏠",
  "Beauty":         "💄",
};

// ─── DOM Refs ───
const productsGrid   = document.getElementById("productsGrid");
const totalLabel     = document.getElementById("totalLabel");

const pIdInput    = document.getElementById("pId");
const pNameInput  = document.getElementById("pName");
const pCatInput   = document.getElementById("pCat");
const pStockInput = document.getElementById("pStock");
const pPriceInput = document.getElementById("pPrice");
const addBtn      = document.getElementById("addBtn");
const addMsg      = document.getElementById("addMsg");

const searchIdInput  = document.getElementById("searchId");
const searchBtn      = document.getElementById("searchBtn");
const searchResult   = document.getElementById("searchResult");

const deleteIdInput  = document.getElementById("deleteId");
const deleteBtn      = document.getElementById("deleteBtn");
const deleteMsg      = document.getElementById("deleteMsg");

// ─── Show Message Helper ───
function showMsg(el, text, type, duration = 3000) {
  el.textContent = text;
  el.className = `msg ${type} show`;
  setTimeout(() => el.classList.remove("show"), duration);
}

// ─── Add Product ───
function addProduct() {
  const id       = pIdInput.value.trim().toUpperCase();
  const name     = pNameInput.value.trim();
  const category = pCatInput.value;
  const price    = parseFloat(pPriceInput.value);
  const stock    = parseInt(pStockInput.value);

  if (!id || !name || isNaN(price) || isNaN(stock)) {
    showMsg(addMsg, "⚠  Please fill in all fields correctly.", "err");
    return;
  }
  if (productMap.has(id)) {
    showMsg(addMsg, `✗  ID "${id}" already exists in Map. Use a unique ID.`, "err");
    return;
  }

  const emoji = EMOJI_MAP[category] || "📦";
  productMap.set(id, { name, category, price, stock, emoji });   // Map.set()
  showMsg(addMsg, `✓  "${name}" added with key "${id}".`, "ok");

  // Clear form
  pIdInput.value = pNameInput.value = pPriceInput.value = pStockInput.value = "";
  render();
}

// ─── Search by ID ───
function searchProduct() {
  const id = searchIdInput.value.trim().toUpperCase();
  if (!id) return;

  // Remove previous highlight
  document.querySelectorAll(".product-card").forEach(c => c.classList.remove("highlight"));

  if (productMap.has(id)) {                        // Map.has() + Map.get()
    const p = productMap.get(id);
    searchResult.className = "search-result show";
    searchResult.innerHTML = `
      <div class="result-card">
        <strong>Found:</strong> ${p.emoji} ${p.name}<br/>
        Category: ${p.category} &nbsp;|&nbsp;
        Price: PKR ${p.price.toLocaleString()} &nbsp;|&nbsp;
        Stock: ${p.stock} units
      </div>
    `;
    // Highlight the matching card
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.classList.add("highlight");
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    searchResult.className = "search-result show";
    searchResult.innerHTML = `<div class="msg err show">✗  No product found with ID "${id}".</div>`;
  }
}

// ─── Delete Product ───
function deleteProduct(idArg) {
  const id = (idArg || deleteIdInput.value.trim().toUpperCase());
  if (!id) return;

  if (productMap.has(id)) {
    const name = productMap.get(id).name;
    productMap.delete(id);                          // Map.delete()
    showMsg(deleteMsg, `✓  "${name}" removed from Map.`, "ok");
    if (!idArg) deleteIdInput.value = "";
    render();
  } else {
    showMsg(deleteMsg, `✗  No product with ID "${id}" in Map.`, "err");
  }
}

// ─── Render Products ───
function render() {
  totalLabel.textContent = `${productMap.size} Product${productMap.size !== 1 ? "s" : ""} in Map`;  // .size
  productsGrid.innerHTML = "";

  if (productMap.size === 0) {
    productsGrid.innerHTML = `<div class="empty-grid">No products in catalog. Add some above!</div>`;
    return;
  }

  let colorIdx = 0;
  // Loop through Map entries
  productMap.forEach((product, id) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = id;
    card.style.animationDelay = `${colorIdx * 0.06}s`;
    card.innerHTML = `
      <div class="card-thumb" style="background:${THUMB_COLORS[colorIdx % THUMB_COLORS.length]}">${product.emoji}</div>
      <div class="card-body">
        <div class="card-id">ID: ${id}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-cat">${product.category}</div>
        <div class="card-price">PKR ${product.price.toLocaleString()}</div>
        <div class="card-stock">✓ ${product.stock} in stock</div>
      </div>
      <div class="card-footer">
        <button class="card-del-btn" data-id="${id}">🗑 Remove from Map</button>
      </div>
    `;
    productsGrid.appendChild(card);
    colorIdx++;
  });

  // Bind delete buttons on cards
  productsGrid.querySelectorAll(".card-del-btn").forEach(btn => {
    btn.addEventListener("click", () => deleteProduct(btn.dataset.id));
  });
}

// ─── Event Listeners ───
addBtn.addEventListener("click", addProduct);
searchBtn.addEventListener("click", searchProduct);
deleteBtn.addEventListener("click", () => deleteProduct());

searchIdInput.addEventListener("keydown", e => { if (e.key === "Enter") searchProduct(); });
deleteIdInput.addEventListener("keydown", e => { if (e.key === "Enter") deleteProduct(); });
pPriceInput.addEventListener("keydown",   e => { if (e.key === "Enter") addProduct(); });

// ─── Initial Render ───
render();