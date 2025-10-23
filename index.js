const plants = [
  { name: 'Snake Plant', img: 'indoor-plants/snakeplant.avif', about: 'Low-maintenance upright foliage.', why: 'Great air purifier & survives low light.', badges: ['Low-Light', 'Air-Purifier'], price: 499, rating: 4.5 },
  { name: 'Peace Lily', img: 'indoor-plants/peace lily1jpg.jpg', about: 'Elegant white blooms.', why: 'Removes toxins & brightens spaces.', badges: ['Shade', 'Air-Purifier'], price: 599, rating: 4 },
  { name: 'Aloe Vera', img: 'indoor-plants/aloevera.jpg', about: 'Healing succulent.', why: 'Ideal for sunny spots.', badges: ['Low-Water', 'Pet-Safe'], price: 299, rating: 4.2 },
  { name: 'Fern', img: 'indoor-plants/gaint boston fern.jpg', about: 'Lush tropical foliage.', why: 'Loves humidity.', badges: ['Shade', 'Air-Purifier'], price: 399, rating: 4.1 },
  { name: 'Money Plants', img: 'indoor-plants/moneyplant.jpg', about: 'Trailing easy-care plant.', why: 'Thrives in low light.', badges: ['Low-Light', 'Air-Purifier'], price: 349, rating: 4.3 },
  { name: 'Rubber Plant', img: 'indoor-plants/Rubberplant.webp', about: 'Bold glossy leaves.', why: 'Statement indoor plant.', badges: ['Air-Purifier'], price: 799, rating: 4.6 },
  { name: 'Prayer Plant', img: 'indoor-plants/prayer.webp', about: 'Arching green & pink leaves.', why: 'Pet friendly & easy.', badges: ['Pet-Safe', 'Air-Purifier'], price: 449, rating: 4.4 },
  { name: 'ZZ Plant', img: 'indoor-plants/zz plant.jpg', about: 'Hardy indoor foliage.', why: 'Handles neglect well.', badges: ['Low-Light'], price: 699, rating: 4.7 },
  { name: 'Peperomia', img: 'indoor-plants/peperomia.webp', about: 'glossy, heart-shaped leaves that resemble raindrops.', why: 'Fast-growing and lush.', badges: ['Low-Light'], price: 649, rating: 4.3 },
  { name: 'African-violet flower', img: 'indoor-plants/African-violet flower.jpg', about: 'Mixed easy-care succulents.', why: 'Great beginners gift.', badges: ['Low-Water', 'Pet-Safe'], price: 299, rating: 4.0 },
  { name: 'Lucky bamboo', img: 'indoor-plants/lucky bamboo.jpg', about: 'slender, green stalks, often twisted.', why: 'Interior decor favorite.', badges: ['Air-Purifier'], price: 999, rating: 4.8 },
  { name: 'Aphelandra', img: 'indoor-plants/aphelandra.jpg', about: 'Bright indoor foliage.', why: 'Adds color indoors.', badges: ['Air-Purifier'], price: 549, rating: 4.1 },
];

const products = [
  "Areca Palm", "Peace Lily", "Snake Plant", "Money Plant", "Succulent",
  "Ornamental Plants", "Seeds", "Fertilizer", "Ceramic Pots", "Gardening Tools",
  "Planters", "Self watering Spikes", "Exotic Flower Seeds", "Begonia rex red heart plants"
];

const searchInput = document.getElementById("plant-search");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = "";

  if (query) {
    const filtered = products.filter(item => item.toLowerCase().includes(query));
    if (filtered.length > 0) {
      suggestionsBox.style.display = "block";
      filtered.forEach(item => {
        const div = document.createElement("div");
        div.textContent = item;

        div.onclick = () => {
          searchInput.value = item;
          suggestionsBox.style.display = "none";

          // Navigation / Filter behavior
          switch (item.toLowerCase()) {
            case "seeds":
            case "exotic flower seeds":
              window.location.href = "seed.html";
              break;
            case "fertilizer":
              window.location.href = "ferti.html";
              break;
            case "ornamental plants":
              window.location.href = "shop.html";
              break;
            case "ceramic pots":
            case "planters":
              document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
              break;
            default:
              // Try to match with plants array
              const found = plants.find(p => p.name.toLowerCase() === item.toLowerCase());
              if (found) {
                renderPlants([found]); // show only that plant
                document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
              } else {
                document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
              }
          }
        };

        suggestionsBox.appendChild(div);
      });
    } else {
      suggestionsBox.style.display = "none";
    }
  } else {
    suggestionsBox.style.display = "none";
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-bar")) {
    suggestionsBox.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById('plant-grid');
  const search = document.getElementById('plant-search');
  const modal = document.getElementById('plant-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalAbout = document.getElementById('modal-about');
  const modalWhy = document.getElementById('modal-why');
  const closeBtn = document.querySelector('.close-btn');
  const addCartBtn = document.querySelector('.add-cart-btn');
  // CART LOGIC
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function addToCart(product) {
  const item = {
    name: product.name,
    price: product.price,
    img: product.img
  };
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}
const menu = document.getElementById('menu');
    const btn = menu.querySelector('.menu-btn');

    // Toggle dropdown
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent closing immediately
      menu.classList.toggle('show');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) {
        menu.classList.remove('show');
      }
    });

  // RENDER PLANTS
  function renderPlants(list) {
    grid.innerHTML = '';
    list.forEach(p => {
      const filled = '★'.repeat(Math.floor(p.rating));
      const half = p.rating % 1 ? '½' : '';
      const empty = '☆'.repeat(5 - Math.ceil(p.rating));
      const card = document.createElement('div');
      card.className = 'plant-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.about}</p>
          <div class="badges">
            ${p.badges.map(b => {
              let ico = '';
              if (b.includes('Low')) ico = '🌙';
              if (b.includes('Air')) ico = '💨';
              if (b.includes('Pet')) ico = '🐾';
              return `<span class="badge">${ico} ${b}</span>`;
            }).join('')}
          </div>
          <div class="rating">${filled}${half}${empty}</div>
          <div class="price">₹${p.price}</div>
          <button class="add-cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
        </div>`;
      card.querySelector('.add-cart').onclick = e => {
  e.stopPropagation();
  addToCart(p);
  alert(`${p.name} added to cart!`);
};

      card.onclick = () => {
        modalImg.src = p.img;
        modalName.textContent = p.name;
        modalAbout.textContent = p.about;
        modalWhy.textContent = 'Why we love it: ' + p.why;
        modal.classList.add('visible');
      };
      grid.appendChild(card);
    });
  }

  // Live search inside plant grid
  search.addEventListener('input', () => {
    const term = search.value.toLowerCase();
    renderPlants(plants.filter(p => p.name.toLowerCase().includes(term)));
  });

  closeBtn.onclick = () => modal.classList.remove('visible');
  window.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('visible'); });

  renderPlants(plants);

  // PROFILE INITIALS
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const profileContainer = document.querySelector(".user-bar .profile");

  if (user) {
    const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    profileContainer.innerHTML = `<a href="profile.html" title="Profile" 
      style="display:inline-flex; align-items:center; justify-content:center; 
             width:42px; height:42px; border:2px solid #fff; border-radius:50%; 
             background-color:#a5d6a7; color:#1b5e20; font-weight:bold; 
             text-decoration:none; font-size:1rem;">
      ${initials}
    </a>`;
  }

  // RAIN EFFECT
  const rain = document.getElementById('rain');
  const numDrops = 120;
  for (let i = 0; i < numDrops; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
    drop.style.animationDelay = `${Math.random() * 5}s`;
    rain.appendChild(drop);
  }

  // SLIDER
  const sliderImages = [
    "indoor-plants/pic1 (1).jpg",
    "indoor-plants/ornamental.jpg",
    "indoor-plants/planters.jpg",
    "indoor-plants/ceramic pot.webp"
  ];
  let currentIndex = 0;
  const slider = document.getElementById('slider-img');
  const dotsContainer = document.getElementById('slider-dots');

  function updateSlider() {
    slider.style.opacity = 0;
    setTimeout(() => {
      slider.src = sliderImages[currentIndex];
      slider.style.opacity = 1;
      updateDots();
    }, 300);
  }

  function updateDots() {
    dotsContainer.innerHTML = '';
    sliderImages.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add(i === currentIndex ? 'active' : '');
      dot.onclick = () => {
        currentIndex = i;
        updateSlider();
      };
      dotsContainer.appendChild(dot);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % sliderImages.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
    updateSlider();
  }

  let sliderInterval = setInterval(nextSlide, 3500);

  document.getElementById('slider-wrapper')?.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
  });

  document.getElementById('slider-wrapper')?.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 3500);
  });

  updateDots();

  // Quantity Control
  window.changeQty = function (change) {
    const qtyEl = document.getElementById("qty");
    let current = parseInt(qtyEl.innerText);
    if (current + change >= 1) {
      qtyEl.innerText = current + change;
    }
  };

  // Image Hover Rotation
  const images = [
    "indoor-plants/areca palm.jpg",
    "indoor-plants/Arecapalm2.jpg",
    "indoor-plants/Arecapalm3.webp"
  ];
  const mainImage = document.getElementById("mainImage");
  const imageBox = mainImage?.parentElement;

  let cycleImages;
  imageBox?.addEventListener("mouseenter", () => {
    cycleImages = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = 1;
      }, 300);
    }, 1500);
  });

  imageBox?.addEventListener("mouseleave", () => {
    clearInterval(cycleImages);
    mainImage.src = images[0];
  });
});

// CHATBOT
document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".chatbot .close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");

  let userMessage;

  const responses = {
    "hello": "Hi there! How can I assist you with our plants today?",
    "hi": "Hello! Welcome to Paryavaran. What can I help you find?",
    "how are you?":"Thanks for asking, I'm good what about you?",
    "give me some information about plants?":"Sure! What do you want to know?",
    "what plants do you have": "We have a wide variety of indoor and ornamental plants. We also sell high-quality seeds and fertilizers.",
    "indoor plants": "Our indoor plants are perfect for greening up your living space. They are excellent air-purifiers. You can browse them in our shop section.",
    "sale": "Yes! We're having a big sale with up to 40% off on all plants. We also have a 'Deal Of The Week' on the Areca Palm Plant.",
    "deal of the week": "This week's deal is the Areca Palm Plant XL for ₹2,749, which is ₹250 off the original price!",
    "contact": "You can reach us at +91 98765 43210 or email us at info@paryavaran.com. We are located at 123 Green Leaf Lane, Surat, Gujarat.",
    "hours": "We are open from Monday to Friday, 9 AM to 6 PM.",
    "bye": "Goodbye! Happy planting!",
    "default": "I'm sorry, I didn't quite understand that. Could you please rephrase?"
  };

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
  }

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }

  const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");
    const lowerCaseMessage = userMessage.toLowerCase();
    let responseText = responses.default;

    for (let key in responses) {
      if (lowerCaseMessage.includes(key)) {
        responseText = responses[key];
        break;
      }
    }
    
    messageElement.textContent = responseText;
    speak(responseText);
  }

  const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  }

  chatInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});
document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    cartCount.textContent = cart.length;
  }

  function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Update your renderPlants function's Add to Cart button:
  function renderPlants(list) {
    grid.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('div');
      card.className = 'plant-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div class="info">
          <h3>${p.name}</h3>
          <p>${p.about}</p>
          <div class="price">₹${p.price}</div>
          <button class="add-cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
        </div>`;
      
      // ✅ Cart functionality
      card.querySelector('.add-cart').onclick = e => {
        e.stopPropagation();
        addToCart(p);
        alert(`${p.name} added to cart!`);
      };

      grid.appendChild(card);
    });
  }

  // On page load
  updateCartCount();
});
function openAdminPanel(section) {
  const panel = document.getElementById("admin-panel");
  const content = document.getElementById("admin-content");
  panel.style.display = "flex";

  let html = "";
  if (section === "orders") {
    html = "<h3>Manage Orders</h3><p>Here you can view, update, or cancel orders.</p>";
  } else if (section === "products") {
    html = "<h3>Manage Products</h3><p>Add, update, or delete products here.</p>";
  } else if (section === "users") {
    html = "<h3>Manage Users</h3><p>Manage registered users, their roles, and access.</p>";
  }
  content.innerHTML = html;
}

function toggleLogin() {
  const content = document.getElementById("admin-content");
  content.innerHTML = "<h3>Login / Logout</h3><p>Admin authentication goes here.</p>";
}
