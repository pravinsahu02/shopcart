import ProductCard from './ProductCard';
import { motion } from 'framer-motion';

const ProductGrid = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;