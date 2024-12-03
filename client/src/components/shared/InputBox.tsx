import React, { useState } from 'react';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { Button } from "../ui/button";
import Loader from '@/utils/Loader';

interface InputBoxProps {
    isPending : boolean,
  setShowInputBox: (value: boolean) => void;
  onSubmit?: (email: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ 
    isPending,
  setShowInputBox, 
  onSubmit 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onSubmit?.(email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={() => setShowInputBox(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Forgot Password?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your email and we'll send you a reset link
          </p>

          {/* Email Input */}
          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="Enter your email"
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                error 
                  ? 'border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              } focus:outline-none focus:ring-2 transition-all`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1 pl-1">{error}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
        {isPending ? <Loader/> :  "Send Reset Link"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InputBox;