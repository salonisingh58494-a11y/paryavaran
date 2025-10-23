
  const filterLinks = document.querySelectorAll('#filterMenu a');
  const sortLinks = document.querySelectorAll('#sortMenu a');
  const productCards = document.querySelectorAll('.product-card');
  const productGrid = document.querySelector('.product-grid');

  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  sortLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sortType = link.getAttribute('data-sort');
      const sorted = Array.from(productCards).sort((a, b) => {
        const priceA = parseInt(a.getAttribute('data-price'));
        const priceB = parseInt(b.getAttribute('data-price'));
        const ratingA = parseInt(a.getAttribute('data-rating'));
        const ratingB = parseInt(b.getAttribute('data-rating'));

        switch (sortType) {
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          case 'rating-desc': return ratingB - ratingA;
        }
      });
      productGrid.innerHTML = '';
      sorted.forEach(card => productGrid.appendChild(card));
    });
  });
  document.addEventListener("DOMContentLoaded", () => {
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
    } else {
      profileContainer.innerHTML = `<a href="profile.html" title="profile"></a>`;
    }
  });
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".view-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");

      const productData = {
        name: productCard.querySelector("h3").innerText,
        price: productCard.querySelector(".price").innerText,
        image: productCard.querySelector("img").src,
        rating: productCard.querySelector(".rating").innerText
      };

      localStorage.setItem("selectedSeed", JSON.stringify(productData));
      window.location.href = "product-detail.html";
    });
  });
});
