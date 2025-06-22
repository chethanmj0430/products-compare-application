import React from 'react';
import './ComparisonView.css';

const ComparisonView = ({ products, onRemove }) => {
  if (products.length < 2) return null;

  const featureKeys = ['brand', 'price', 'features'];

  const getFeatureValue = (product, key) => {
    if (key === 'features') return product.features.join(', ');
    return product[key];
  };

  const isDifferent = (key) => {
    const values = products.map((p) => getFeatureValue(p, key));
    return new Set(values).size > 1;
  };

  return (
    <div className="compare-table">
      <h2>Compare Products</h2>
      <div className="compare-row header">
        <div className="compare-attr">Attribute</div>
        {products.map((p) => (
          <div key={p.id} className="compare-cell">
            <img src={p.image} alt={p.name} />
            <p><strong>{p.name}</strong></p>
            <button onClick={() => onRemove(p.id)}>Remove</button>
          </div>
        ))}
      </div>

      {featureKeys.map((key) => (
        <div className="compare-row" key={key}>
          <div className="compare-attr">{key.toUpperCase()}</div>
          {products.map((p) => (
            <div key={p.id} className={`compare-cell ${isDifferent(key) ? 'highlight' : ''}`}>
              {getFeatureValue(p, key)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComparisonView;
