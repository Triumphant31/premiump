// store.js - Simple cart and navigation logic for digital store

window.PRODUCTS = {
  chatgpt: {
    name: 'Premium ChatGPT',
    price: 5000,
    desc: 'Unlock advanced AI chat features for productivity and creativity.',
  },
  capcut: {
    name: 'Premium CapCut',
    price: 5000,
    desc: 'Access premium video editing tools for stunning content creation.',
  },
  canva: {
    name: 'Premium Canva',
    price: 5000,
    desc: 'Design like a pro with premium templates and features.',
  },
  combo: {
    name: 'Combo Deal',
    price: 20000,
    desc: 'Get all three premium products at a discounted price.',
  },
};

window.cart = {};

function updateCart(productKey) {
  cart[productKey] = (cart[productKey] || 0) + 1;
  showCartAdded(productKey);
}

function showCartAdded(productKey) {
  const btn = document.querySelector(`.add-cart-btn[data-product="${productKey}"]`);
  if (!btn) return;
  btn.textContent = 'Added!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Add to Cart';
    btn.disabled = false;
  }, 1200);
}

window.renderCartSummary = function renderCartSummary() {
  const summary = document.getElementById('cart-summary');
  if (!summary) return;
  if (Object.keys(cart).length === 0) {
    summary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let total = 0;
  let html = '<ul style="list-style:none;padding:0;">';
  for (const key in cart) {
    const item = PRODUCTS[key];
    const qty = cart[key];
    html += `<li style="margin-bottom:1rem;">${item.name} <span style="color:#2563eb;">x${qty}</span> <span style="float:right;">₦${item.price * qty}</span></li>`;
    total += item.price * qty;
  }
  html += `</ul><hr><div style="text-align:right;font-weight:700;font-size:1.2rem;">Total: ₦${total}</div>`;
  summary.innerHTML = html;
}

function showSection(sectionId) {
  document.querySelector('.products-section').style.display = sectionId === 'products' ? '' : 'none';
  document.querySelector('.landing').style.display = sectionId === 'home' ? '' : 'none';
  document.querySelector('.checkout-section').style.display = sectionId === 'checkout' ? '' : 'none';
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const section = href.replace('#', '');
        showSection(section);
        if (section !== 'checkout') scrollToSection(section);
        if (section === 'checkout') renderCartSummary();
      }
    });
  });

  // Add to Cart buttons
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.getAttribute('data-product');
      updateCart(product);
    });
  });

  // Checkout button
  document.getElementById('checkout-btn').addEventListener('click', () => {
    showSection('checkout');
    renderCartSummary();
    scrollToSection('checkout');
  });

  // Finalize Purchase: now handled by Paystack in HTML, so do nothing here
  // document.getElementById('finalize-btn').addEventListener('click', ... ) is handled in HTML

  // Back to Shop
  document.getElementById('back-btn').addEventListener('click', () => {
    showSection('products');
    scrollToSection('products');
  });

  // Default: show landing and products
  showSection('home');
});
