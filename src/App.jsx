
import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    price: 69999,
    oldPrice: 79999,
    rating: 4.8,
    storage: "128GB",
    color: "Black",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    brand: "Samsung",
    price: 74999,
    oldPrice: 84999,
    rating: 4.7,
    storage: "256GB",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    id: 3,
    name: "OnePlus 13",
    brand: "OnePlus",
    price: 62999,
    oldPrice: 69999,
    rating: 4.6,
    storage: "256GB",
    color: "Black",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
  },
  {
    id: 4,
    name: "Vivo V50",
    brand: "Vivo",
    price: 34999,
    oldPrice: 39999,
    rating: 4.5,
    storage: "128GB",
    color: "Purple",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    id: 5,
    name: "Oppo Reno 13",
    brand: "Oppo",
    price: 37999,
    oldPrice: 42999,
    rating: 4.4,
    storage: "256GB",
    color: "White",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
  },
  {
    id: 6,
    name: "Realme GT 7",
    brand: "Realme",
    price: 39999,
    oldPrice: 44999,
    rating: 4.5,
    storage: "256GB",
    color: "Silver",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
  },
  {
    id: 7,
    name: "Redmi Note 14",
    brand: "Xiaomi",
    price: 18999,
    oldPrice: 21999,
    rating: 4.3,
    storage: "128GB",
    color: "Black",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
  },
  {
    id: 8,
    name: "iPhone 15",
    brand: "Apple",
    price: 54999,
    oldPrice: 64999,
    rating: 4.7,
    storage: "128GB",
    color: "Blue",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
  }
];

function App() {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const brands = [
    "All", "Apple", "Samsung", "OnePlus",
    "Vivo", "Oppo", "Realme", "Xiaomi"
  ];

  const money = (value) =>
    "₹" + value.toLocaleString("en-IN");

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (brand === "All" || p.brand === brand)
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product) => {
    setCart((oldCart) => {
      const existing = oldCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (id, amount) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <div className="app">

      {/* NAVIGATION */}
      <header className="navbar">
        <div className="logo"
          onClick={() => {
            setShowCart(false);
            setShowCheckout(false);
          }}>
          📱 MobileHub
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search mobile phones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>🔍</span>
        </div>

        <div className="nav-actions">
          <button onClick={() => {
            setShowCart(false);
            setShowCheckout(false);
          }}>
            Home
          </button>

          <button onClick={() => {
            setShowCart(true);
            setShowCheckout(false);
          }}>
            🛒 Cart ({
              cart.reduce((s, i) => s + i.quantity, 0)
            })
          </button>

          <span>❤️ {wishlist.length}</span>
        </div>
      </header>

      {/* HOME PAGE */}
      {!showCart && !showCheckout && (
        <>
          <section className="hero">
            <div>
              <p className="hero-tag">
                WELCOME TO MOBILEHUB
              </p>

              <h1>
                Find Your Perfect<br />
                <span>Smartphone.</span>
              </h1>

              <p>
                Explore the latest smartphones at amazing
                prices. Find your favourite brand and upgrade today!
              </p>

              <button onClick={() =>
                document.getElementById("products")
                  .scrollIntoView({ behavior: "smooth" })
              }>
                Explore Mobiles →
              </button>
            </div>

            <div className="hero-icon">📱</div>
          </section>

          <section className="features">
            <div>🚚 Free Delivery</div>
            <div>💳 Secure Demo Checkout</div>
            <div>⭐ Top Brands</div>
            <div>🎧 Customer Support</div>
          </section>

          {/* PRODUCTS */}
          <main id="products">
            <div className="section-heading">
              <div>
                <p className="small-heading">
                  OUR COLLECTION
                </p>
                <h2>Latest Smartphones</h2>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* BRAND FILTER */}
            <div className="brands">
              {brands.map((b) => (
                <button
                  key={b}
                  className={brand === b ? "active" : ""}
                  onClick={() => setBrand(b)}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* PRODUCT CARDS */}
            <div className="product-grid">
              {filteredProducts.map((p) => (
                <div className="product-card" key={p.id}>

                  <button
                    className="heart"
                    onClick={() => toggleWishlist(p.id)}
                  >
                    {wishlist.includes(p.id) ? "❤️" : "♡"}
                  </button>

                  <img src={p.image} alt={p.name} />

                  <div className="product-info">
                    <p className="brand-name">{p.brand}</p>
                    <h3>{p.name}</h3>

                    <p className="rating">
                      ⭐ {p.rating} / 5
                    </p>

                    <p className="storage">
                      Storage: {p.storage} |
                      Color: {p.color}
                    </p>

                    <div className="price">
                      <strong>{money(p.price)}</strong>
                      <del>{money(p.oldPrice)}</del>
                    </div>

                    <div className="product-buttons">
                      <button
                        className="details-btn"
                        onClick={() => setSelectedProduct(p)}
                      >
                        Details
                      </button>

                      <button
                        className="cart-btn"
                        onClick={() => addToCart(p)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="empty">
                No mobiles found. Try another search!
              </p>
            )}
          </main>
        </>
      )}

      {/* PRODUCT DETAILS */}
      {selectedProduct && (
        <div className="modal-bg">
          <div className="modal">
            <button
              className="close"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.brand}</p>
            <p>Storage: {selectedProduct.storage}</p>
            <p>Colour: {selectedProduct.color}</p>
            <p>Rating: ⭐ {selectedProduct.rating}/5</p>

            <h2>{money(selectedProduct.price)}</h2>

            <button
              className="cart-btn"
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* SHOPPING CART */}
      {showCart && (
        <main className="cart-page">
          <h2>🛒 Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="empty">
              <h3>Your cart is empty!</h3>

              <button
                className="cart-btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h3>{item.name}</h3>
                    <p>{money(item.price)}</p>

                    <div className="quantity">
                      <button onClick={() =>
                        changeQuantity(item.id, -1)
                      }>
                        −
                      </button>

                      {item.quantity}

                      <button onClick={() =>
                        changeQuantity(item.id, 1)
                      }>
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      changeQuantity(item.id, -item.quantity)
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <h2>Total: {money(total)}</h2>

                <button
                  className="cart-btn"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </main>
      )}

      {/* CHECKOUT */}
      {showCheckout && (
        <main className="checkout">
          {orderPlaced ? (
            <div className="success">
              <h1>✅</h1>
              <h2>Demo Order Confirmed!</h2>
              <p>
                Your sample order has been placed successfully.
              </p>

              <button
                className="cart-btn"
                onClick={() => {
                  setOrderPlaced(false);
                  setShowCheckout(false);
                  setShowCart(false);
                }}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <h2>Checkout</h2>
              <h3>Order Total: {money(total)}</h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  placeOrder();
                }}
              >
                <input
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                />

                <input
                  placeholder="Phone Number"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a 10-digit number"
                />

                <textarea
                  placeholder="Delivery Address"
                  required
                />

                <button className="cart-btn" type="submit">
                  Confirm Demo Order
                </button>
              </form>
            </>
          )}
        </main>
      )}

      {/* FOOTER */}
      <footer>
        <h2>📱 MobileHub</h2>
        <p>Your favourite destination for smartphones.</p>
        <p>© 2026 MobileHub. Student Project – Frontend Demo.</p>
        <p>
          Product prices are sample prices and are not live market prices.
        </p>
      </footer>

    </div>
  );
}

export default App;
