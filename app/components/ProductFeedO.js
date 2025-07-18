import Product from "./Product";

function ProductFeed({ products }) {
  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return null;
  }

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto lg:-mt-24">
      {products
        .slice(0, 4)
        .map(({ _id, title, price, description, category, image }) => (
          <Product
            key={_id}
            id={_id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
      <img
        className="md:col-span-full"
        src="https://utfs.io/f/7b9cb1c9-b4ea-4df8-84b6-4ecee3798354-b7hckq.jpg"
        alt=""
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ _id, title, price, description, category, image }) => (
            <Product
              key={_id}
              id={_id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          ))}
      </div>

      {products
        .slice(5, products.length)
        .map(({ _id, title, price, description, category, image }) => (
          <Product
            key={_id}
            id={_id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductFeed;
