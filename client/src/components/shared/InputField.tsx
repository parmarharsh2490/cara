import { IInputFieldInterface } from "../../types/index.ts";

const InputField = ({ label, value, name, onChange, placeholder, options, isTextArea }: IInputFieldInterface) => (
    <div className="mb-4 ml-2 w-full">
      <label className="block mb-2 text-sm sm:text-base md:text-lg font-semibold">{label}</label>
      {options ? (
        <select
          value={value}
          onChange={onChange}
          name={name}
          className="w-[90%] sm:w-[80%] md:w-[40%] border border-gray-300 p-2 rounded"
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
          className="w-full sm:w-[80%] md:w-[40%] p-2 border border-gray-300 rounded"
        />
      )}
    </div>
  );
  
export default InputField