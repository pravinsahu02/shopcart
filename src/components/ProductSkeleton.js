const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="product-image-container skeleton skeleton-image"></div>
      <div className="product-info">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="product-actions">
          <div className="skeleton skeleton-text" style={{ width: '100%', height: '36px' }}></div>
          <div className="skeleton skeleton-text" style={{ width: '100%', height: '36px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;