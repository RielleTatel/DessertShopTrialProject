// Modal and cart functionality
document.addEventListener("DOMContentLoaded", () => {
  const goodsContainers = document.querySelectorAll(".goodsContainer");
  const modal = document.getElementById("modal");
  const modalDetails = document.getElementById("modal-details");
  const closeButton = document.querySelector(".close-button");
  const cartContainer = document.querySelector(".cart-container");

  // Keep track of cart items
  const cart = {};

  // Function to add an item to the cart
  function addItemToCart(title, price, quantity = 1) {
    if (cart[title]) {
      cart[title].quantity += quantity;
    } else {
      cart[title] = { title, price, quantity };
    }
    renderCart();
    updateCartSummary();
  }

  // Function to render the carttttt items in the sidebar//////////
  function renderCart() {
    const itemsHTML = Object.values(cart)
      .map(item => {
        return `
          <div class="cart-item">
            <span>${item.title}</span>
            <div class="cart-item-details">
              <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-title="${item.title}" data-price="${item.price}"> 
              <span class="item-price"> P${(item.price * item.quantity).toFixed(2)}</span>
              <button class="delete-item" data-title="${item.title}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("");

    cartContainer.innerHTML = itemsHTML;

    // Attach click listeners to delete buttons
    const deleteButtons = cartContainer.querySelectorAll(".delete-item");
    deleteButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const title = e.target.dataset.title;
        delete cart[title]; // Remove item from cart
        renderCart();
        updateCartSummary();
      });
    });
  }

  // Add click event to each goods container to open modal
  goodsContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const imgSrc = container.querySelector("img").src;
      const title = container.querySelector("h1").textContent;
      const price = parseFloat(container.querySelector("h2").textContent.replace("$", ""));
      const description = container.querySelector("p")?.textContent || "No description available.";

      // Populate modal content
      modalDetails.innerHTML = `
        <img src="${imgSrc}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 15px;" />
        <h2>${title}</h2>
        <p>${description}</p>
        <h3>$${price.toFixed(2)}</h3>
        <button class="add-to-cart">Add to Cart</button>
      `;

      // Add event listener to modal button
      const addToCartButton = modalDetails.querySelector(".add-to-cart");
      addToCartButton.addEventListener("click", () => {
        addItemToCart(title, price);
        modal.style.display = "none";
      });

      // Show modal
      modal.style.display = "block";
    });
  });

  // Close modal functionality
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // "Buy Now" button functionality in goodsContainers

});

/***************************************************************************/

// Sidebar toggle functionality
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('close');
  cartContainer.classList.toggle('close');
}

// Image animation on page load
window.addEventListener('load', () => {
  const image = document.getElementById('content-imageContainer');
  if (image) {
    image.style.animation = "fallingAnimation 1s ease-out";
  } else {
    console.warn('Element with ID "falling-image" not found.');
  }
});

// Function to update the total quantity and price in the sidebar
