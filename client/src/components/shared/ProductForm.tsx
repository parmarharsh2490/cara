import { useState, useEffect } from "react";
import VarietyForm from "./VarietyForm.tsx";
import { IVariety } from "../../types/index.ts";
import { useCreateProduct, useUpdateProduct } from "../../query/queries.ts";

interface ProductFormProps {
  existingProduct?: {
    title: string;
    description: string;
    category: string;
    gender: string;
    variety: IVariety[];
  };
  isUpdate?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProduct, isUpdate = false }) => {
  const [title, setTitle] = useState<string>(existingProduct?.title || "title 1");
  const [description, setDescription] = useState<string>(existingProduct?.description || "description 1");
  const [category, setCategory] = useState<string>(existingProduct?.category || "tshirt");
  const [gender, setGender] = useState<string>(existingProduct?.gender || "male");
  const [variety, setVariety] = useState<IVariety[]>(existingProduct?.variety || [
    {
      images: [
        "/blog1.jpg",
        "/blog2.jpg",
        "/blog3.jpg",
        "/blog4.jpg",
        "/blog5.jpg",
      ],
      color: "blue",
      sizeOptions: [
        {
          size: "M",
          stock: 10,
          price: {
            originalPrice: 100,
            discountedPrice: 90,
          }
        },
      ],
    },
  ]);

  const { mutateAsync: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutateAsync: updateProduct, isPending: isUpdating } = useUpdateProduct();

  useEffect(() => {
    if (existingProduct) {
      setTitle(existingProduct.title);
      setDescription(existingProduct.description);
      setCategory(existingProduct.category);
      setGender(existingProduct.gender);
      setVariety(existingProduct.variety);
    }
  }, [existingProduct]);

  const handleSizeOptionChange = (index: number, name: string, value: string, sizeOptionIndex?: number) => {
    const updatedVarieties = [...variety];
    if (name === "color") {
      updatedVarieties[index].color = value;
    } else if ((name === "size" || name === "stock") && typeof sizeOptionIndex === "number") {
        if (name === "size") {
          updatedVarieties[index].sizeOptions[sizeOptionIndex].size = value;
        } else if (name === "stock") {
          updatedVarieties[index].sizeOptions[sizeOptionIndex].stock = Number(value);
        }
    } else if (name === "originalPrice" || name === "discountedPrice") {
      if (typeof sizeOptionIndex === "number") {
        updatedVarieties[index].sizeOptions[sizeOptionIndex].price[name] = Number(value);
      }
    }
    setVariety(updatedVarieties);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;
    if (files) {
      const newVarieties = [...variety];
      const fileArray = Array.from(files); // Convert FileList to Array
      newVarieties[index].images = fileArray; // Store File objects
      setVariety(newVarieties);
      console.log(variety[0]);
    }
  };

  const addSizeOption = (index: number) => {
    const updatedVarieties = [...variety];
    updatedVarieties[index].sizeOptions.push({
      size: "",
      stock: 0,
      price: {
        originalPrice: 0,
        discountedPrice: 0,
      },
    });
    setVariety(updatedVarieties);
  };

  const addColorOption = () => {
    setVariety([
      ...variety,
      {
        images: [
          "/blog1.jpg",
          "/blog2.jpg",
          "/blog3.jpg",
          "/blog4.jpg",
          "/blog5.jpg",
        ],
        color: "blue",
        sizeOptions: [
          {
            size: "M",
            stock: 10,
            price: {
              originalPrice: 100,
              discountedPrice: 90,
            },
          },
        ],
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("gender", gender);
      variety.forEach((varietyItem, varietyIndex) => {
        varietyItem.images.forEach((image, imageIndex) => {
          if (image instanceof File) {
            formData.append(`variety[${varietyIndex}].images[${imageIndex}]`, image);
          }
        });
      });
      if(!updateProduct){
        variety[0].images.length = 0;
      }
    console.log("here");
    console.log(variety);
    
    formData.append("variety", JSON.stringify(variety));
    console.log(formData);

    if (isUpdate) {
      console.log("update");
      console.log(variety);
      
      await updateProduct(formData);
    } else {
      await createProduct(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">{isUpdate ? "Update Product" : "Add Product"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="Enter product description"
          />
        </div>

        {/* Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tshirt">T-shirt</option>
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="bottom">Bottom</option>
              <option value="jacket">Jacket</option>
              <option value="coorder">Co-order</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Varieties */}
        {variety.map((varietyItem, idx) => (
          <VarietyForm
            key={idx}
            index={idx}
            variety={varietyItem}
            onSizeOptionChange={handleSizeOptionChange}
            handleImageChange={handleImageChange}
            addSizeOption={addSizeOption} 
          />
        ))}
        <button type="button" className="bg-blue-600 p-4 rounded-2xl" onClick={addColorOption}>
          Add More Color
        </button>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full min-w-24 max-w-24 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow focus:ring-4 focus:ring-blue-300"
          >
            {isCreating || isUpdating ? (
              <img src="/spinner.svg" height={24} width={24} className="mx-auto"/>
            ) : isUpdate ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
