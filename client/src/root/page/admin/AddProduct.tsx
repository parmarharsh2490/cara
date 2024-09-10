import { IInputFieldInterface, IProductAllDetails, ISizeOption } from "../../../types/index.ts";
import {  ChangeEventHandler, useState } from 'react';
import { useCreateProduct } from "../../../query/queries.ts"

const InputField = ({ label, value, name, onChange, placeholder, options, isTextArea }: IInputFieldInterface) => (
  <div className="mb-4 ml-2 w-full">
    <label className="block mb-2 text-sm sm:text-base md:text-lg font-semibold">{label}</label>
    {options ? (
      <select
        value={value}
        onChange={onChange}
        name={name}
        className="w-[90%] sm:w-[80%] md:w-[70%] border border-gray-300 p-2 rounded"
      >
        <option value="">{placeholder}</option>
        {options.map(({ option, idx }) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : isTextArea ? (
      <textarea
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full sm:w-[80%] md:w-[70%] md:h-[20%] p-2 border border-gray-300 rounded resize-none h-32"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        className="w-full sm:w-[80%] md:w-[70%] p-2 border border-gray-300 rounded"
      />
    )}
  </div>
);


interface InputSizeOptionProps {
  index: number;
  sizeOption: SizeOption;
  onSizeOptionChange: (index: number, name: string, value: string) => void;
}



interface InputSizeOptionProps {
  index: number;
  sizeOption: SizeOption;
  onSizeOptionChange: (index: number, name: string, value: string) => void;
}

const InputSizeOption = ({ index, sizeOption, onSizeOptionChange }: InputSizeOptionProps) => {
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];
  const genderOptions = ['Male', 'Female', 'Child', 'Unisex'];
  const colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Pink'];

  return (
    <>
      <button
        className={`${index === 0 && "hidden"} relative w-full flex items-center justify-end top-0 left-0 text-gray-500 hover:text-gray-700 rounded-full p-2`}
        aria-label="Close sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="mb-4 grid grid-cols-2 lg:grid-cols-3 w-full gap-4 bg-gray-100 p-4 rounded-lg">
        <InputField
          label="Size"
          value={sizeOption.size}
          onChange={(e) => onSizeOptionChange(index, 'size', e.target.value)}
          name="size"
          placeholder="Select Size"
          options={sizeOptions.map((option, idx) => ({ option, idx }))}
        />
        <InputField
          label="Stock"
          value={sizeOption.stock}
          onChange={(e) => onSizeOptionChange(index, 'stock', e.target.value)}
          name="stock"
          placeholder="Enter Stock"
        />
        <InputField
          label="Original Price"
          value={sizeOption.price.originalPrice}
          onChange={(e) => onSizeOptionChange(index, 'originalPrice', e.target.value)}
          name="originalPrice"
          placeholder="Enter Original Price"
        />
        <InputField
          label="Discounted Price"
          value={sizeOption.price.discountedPrice}
          onChange={(e) => onSizeOptionChange(index, 'discountedPrice', e.target.value)}
          name="discountedPrice"
          placeholder="Enter Discounted Price"
        />
        <InputField
          label="Gender"
          value={sizeOption.gender}
          onChange={(e) => onSizeOptionChange(index, 'gender', e.target.value)}
          name="gender"
          placeholder="Select Gender"
          options={genderOptions.map((option, idx) => ({ option, idx }))}
        />
        <InputField
          label="Color"
          value={sizeOption.color}
          onChange={(e) => onSizeOptionChange(index, 'color', e.target.value)}
          name="color"
          placeholder="Select Color"
          options={colorOptions.map((option, idx) => ({ option, idx }))}
        />
      </div>
    </>
  );
};


const AddProduct = () => {
  const {mutateAsync : createProduct} = useCreateProduct()
  const [countSelectedImages, setCountSelectedImages] = useState(0);
  const [images, setImages] = useState<string[]>(["/blog1.jpg", "/blog2.jpg", "/blog3.jpg", "/blog4.jpg", "/blog5.jpg"]);
  const [title, setTitle] = useState("1-title");
  const [description, setDescription] = useState("1-description");
  const [category, setCategory] = useState("tshirt");
  const [sizeOptions, setSizeOptions] = useState<ISizeOption[]>([
    {
      size: "XL",
      stock: 10,
      price: {
        originalPrice: 1299,
        discountedPrice: 1099,
      },
      gender: "male",
      color: "blue"
    }
  ]);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files) {
      // Limit the number of files to 5
      const files = Array.from(e.target.files).slice(0, 5);
      
      // Initialize an array to store image data URLs
      const newImages = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (typeof reader.result === 'string') {
                resolve(reader.result);
              } else {
                reject(new Error('File could not be read as a string.'));
              }
            };
            reader.readAsDataURL(file);
          });
        })
      );
      
      // Update the images state with the new image URLs
      setImages((prev) => {
        // Determine how many images will be replaced or added
        const replaceCount = Math.min(newImages.length, 5);
        
        // Replace the first part of the array with new images
        const updatedImages = [
          ...newImages,
          ...prev.slice(replaceCount, 5) // Keep the remaining images if total is less than 5
        ];
        
        return updatedImages;
      });
    }
  };
  
  
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData : IProductAllDetails = {
      title,
      description,
      category,
      images,
      sizeOptions,
    };
    console.log(formData);
    createProduct(formData)
  };

  const handleSizeOptionChange = (index: number, name: string, value: string) => {
    const updatedSizeOptions = [...sizeOptions];
    updatedSizeOptions[index] = { ...updatedSizeOptions[index], [name]: value };
    setSizeOptions(updatedSizeOptions);
  };

  const addSizeOption = () => {
    setSizeOptions([
      ...sizeOptions,
      {
        size: "",
        stock: "",
        originalPrice: "",
        discountedPrice: "",
        gender: "",
        color: "",
      },
    ]);
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 min-h-[100%] overflow-scroll border">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Add Product</h1>
      <form className="w-full flex-col sm:flex-wrap" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="Enter Title"
        />
        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          placeholder="Enter Description"
          isTextArea
        />
        <div className="mb-4 w-full flex flex-col sm:flex-row items-center sm:justify-start sm:gap-10">
          <label htmlFor="category" className="block mb-2 text-base sm:text-lg font-semibold">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-[60%] md:w-[40%] border border-gray-300 p-2 rounded"
            id="category"
          >
            <option value="">Select Category</option>
            <option value="tshirt">T-shirt</option>
            <option value="shirt">Shirt</option>
            <option value="pant">Pant</option>
            <option value="bottom">Bottom</option>
            <option value="jacket">Jacket</option>
            <option value="coorder">Co-order</option>
          </select>
        </div>
        
        {sizeOptions.map((sizeOption, index) => (
          <InputSizeOption
            key={index}
            index={index}
            sizeOption={sizeOption}
            onSizeOptionChange={handleSizeOptionChange}
          />
        ))}
         <button
          type="button"
          onClick={addSizeOption}
          className="bg-blue-500 p-4 rounded-lg"
        >
          Add More Size Options
        </button>
        <div className="mb-4 flex flex-col items-center">
          <label className="block mb-2 text-sm sm:text-base md:text-lg font-semibold">
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
            multiple
          />
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="w-24 h-24 object-cover border rounded"
              />
            ))}
          </div>
        </div>
       {/* <input type="file"  accept='image/*' onChange={(e) => console.log(e)
       }/> */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct