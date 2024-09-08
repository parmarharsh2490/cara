import { Link } from 'react-router-dom';

const categories = [
  { image: '/Shirts.avif', link: '/category/shirt', name: 'Shirt' },
  { image: '/Bottoms.avif', link: '/category/bottoms', name: 'Bottoms' },
  { image: '/Jackets.avif', link: '/category/jackets', name: 'Jackets' },
  { image: '/Co-Ords.avif', link: '/category/co-ords', name: 'Co-Ords' },
  { image: '/T-shirts.avif', link: '/category/t-shirts', name: 'T-Shirts' },
  { image: '/On-Sale.avif', link: '/category/on-sale', name: 'On Sale' }
];

const ExploreCategory = () => (
  <div className="relative mt-10 flex flex-col items-center w-full">
    <h1 className="text-2xl mb-2">Explore Products</h1>
    <p className="text-sm text-gray-400 mb-6">Select Category</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full justify-items-center">
      {categories.map(({ image, link, name }, index) => (
        <Link
          key={index}
          to={link}
          className="flex flex-col items-center p-3 max-w-[175px] shadow-md rounded-3xl border-none hover:scale-105 sm:hover:scale-110 hover:shadow-2xl transition-transform duration-700"
        >
          <img
            className="w-full h-40 object-cover rounded-2xl mb-2"
            src={image}
            alt={`${name} category`}
          />
          <p className="text-center font-bold">{name}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default ExploreCategory;
