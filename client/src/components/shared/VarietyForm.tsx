import React from "react";
import { IVariety } from "@/types/index";

interface VarietyFormProps {
  index: number;
  variety: IVariety;
  onSizeOptionChange: (
    index: number,
    name: string,
    value: string,
    sizeOptionIndex?: number
  ) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  addSizeOption: (index: number) => void;
}

const VarietyForm: React.FC<VarietyFormProps> = ({
  index,
  variety,
  onSizeOptionChange,
  handleImageChange,
  addSizeOption,
}) => {
  return (
    <div className="border p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">Variety {index + 1}</h3>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <select
          value={variety.color}
          onChange={(e) => onSizeOptionChange(index, "color", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="" disabled>Select color</option>
          {/* Example options, adjust as needed */}
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>
      </div>

      {/* Size Options */}
      {variety.sizeOptions.map((sizeOption, sizeOptionIndex) => (
        <div key={sizeOptionIndex} className="grid grid-cols-3 gap-4 mt-4">
          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <select
              value={sizeOption.size}
              onChange={(e) => onSizeOptionChange(index, "size", e.target.value, sizeOptionIndex)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="" disabled>Select size</option>
              {/* Example options, adjust as needed */}
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              value={sizeOption.stock}
              onChange={(e) => onSizeOptionChange(index, "stock", e.target.value, sizeOptionIndex)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter stock"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={sizeOption.price.originalPrice}
              onChange={(e) =>
                onSizeOptionChange(index, "originalPrice", e.target.value, sizeOptionIndex)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Original Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
            <input
              type="number"
              value={sizeOption.price.discountedPrice}
              onChange={(e) =>
                onSizeOptionChange(index, "discountedPrice", e.target.value, sizeOptionIndex)
              }
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Discounted Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost Price</label>
            <input
              type="number"
              value={sizeOption.price.costPrice}
              onChange={(e) =>
                onSizeOptionChange(index, "costPrice", e.target.value, sizeOptionIndex)
              }
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Cost Price"
            />
          </div>
        </div>
      ))}

      {/* Add More Sizes */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => addSizeOption(index)}
          className="bg-green-500 text-white py-2 px-4 rounded-lg"
        >
          Add More Size Options
        </button>
      </div>

      {/* Image Upload */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleImageChange(e, index)}
          name="images"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {/* Preview images */}
        <div className="mt-2 grid grid-cols-2 md:grid-cols-5 gap-2">
          {variety.images.map((image : any, imgIndex) => (
            <img key={imgIndex} 
            src={typeof image === "string" ? image : image?.imageUrl ? image?.imageUrl : URL.createObjectURL(image)}
            // src={image?.imageUrl ? image?.imageUrl : image || URL.createObjectURL(image)}
            className="w-full h-[75%] bg-cover rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VarietyForm;
