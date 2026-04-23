import productsData from '../../data/products.json';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';
import ProductCard from '../../components/products/ProductCard';
import './Products.css';

const Products = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="products-page">
      <header className="page-header">
        <h1>Product Catalog</h1>
        <p>Explore our latest collection of premium gadgets.</p>
      </header>

      <div className="products-grid">
        {productsData.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAdd={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
