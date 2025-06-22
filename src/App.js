import React, { useState, useEffect } from 'react';
import { productsByCategory } from './data/Products';
import ProductCard from './components/ProductCard';
import ComparisonView from './components/ComparisonView';
import './App.css';
import { categoryImages } from './data/categoryImages';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

   const [darkMode, setDarkMode] = useState(false);

   const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {

    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const filteredProducts = selectedCategory
    ? productsByCategory[selectedCategory].filter((p) =>
        (p.name + p.brand).toLowerCase().includes(searchTerm)
      )
    : [];

  const handleToggleCompare = (id) => {
    setCompareList((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  return (

      <div className={darkMode ? 'app dark' : 'app'}>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <h1>Products Compare Application</h1>



        {!selectedCategory ? (
          <div className="category-wrapper">
              <div className="category-grid">
                {Object.keys(productsByCategory).map((category) => (
                  <div
                    key={category}
                    className="category-card"
                    onClick={() => {
                      setSelectedCategory(category);
                      setCompareList([]);
                      setSearchTerm('');
                    }}
                  >
                    <img src={categoryImages[category]} alt={category} />
                    <h3>{category}</h3>
                  </div>
                ))}
              </div>
          </div>
        ) : (
          <>
            <button className="back-button" onClick={() => setSelectedCategory('')}>
              ← Back to Categories
            </button>

            <div className="search-bar">
              <input
                type="text"
                placeholder={`Search ${selectedCategory}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={compareList.includes(product.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
            <ComparisonView
              products={filteredProducts.filter(p => compareList.includes(p.id))}
              onRemove={(id) => setCompareList(compareList.filter(i => i !== id))}
            />

          </>
        )}
      </div>
  );
};

export default App;
