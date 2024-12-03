import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccount, useForgetpassword } from "../../query/user.queries.ts";
import { INewUser } from "../../types/index.ts";
import AuthFormSignupButton from "./AuthFormSignupButton.tsx";
import Meta from "@/utils/Meta.tsx";
import InputBox from "@/components/shared/InputBox.tsx";

const SignUp = () => {
  const {mutateAsync : forgetPassword, isPending} = useForgetpassword()
  const [showInputBox,setShowInputBox] = useState(false);
  const { mutateAsync: createUserAccount , isPending : isCreatingUserAccount } = useCreateUserAccount();
  const [name, setName] = useState<string>("harsh");
  const [email, setEmail] = useState<string>("parmarharsh6480@gmail.com");
  const [password, setPassword] = useState<string>("harsh");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user : INewUser = { name, email, password };
    try {
      await createUserAccount(user);
      navigate('/')
    } catch (error) {
      console.error("Error creating user account: ", error);
    }
  };


  return (
    <>
    <Meta
    title="Sign Up - Sara-Ecommerce"
    description="Create a new Sara-Ecommerce account to start your personalized shopping experience. Enjoy exclusive offers, manage your orders, and track shipments seamlessly."
    keywords="Sign Up, Sara-Ecommerce, Register, Create Account, Shopping"
    />
    <div className="flex min-w-[384px] min-h-[512px] flex-1 items-center justify-center flex-col max-w-sm bg-white">
      <div className="pt-5">
      <h1 className="text-xl md:text-2xl font-semibold">Welcome To Sara-Ecommerce</h1>
      <p className="text-gray-400">Please enter your details</p>
      </div>
      <form onSubmit={(e) =>handleSubmit(e)} className="flex flex-col w-full gap-3 p-8 pt-3">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        className="h-10 border p-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        className="h-10 border p-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        className="h-10 border p-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex items-center justify-between my-1 gap-2">
        <div className="flex gap-1 items-center">
        <input type="checkbox" name="remember" id="remember" />
        <span className="font-semibold text-xs">Remember for 30 days</span>
        </div>
        <span onClick={() => setShowInputBox(true)} className="text-slate-700 font-semibold text-xs hover:underline">
        Forgot password?
        </span>
      </div>
      <AuthFormSignupButton isPending={isCreatingUserAccount} signIn={false}/>
      <div className="flex justify-center items-center gap-1">
        <h4 className="text-gray-400">Already have an account?</h4>
        <Link to="/auth/sign-in" className="font-semibold text-xs sm:text-md hover:underline">
        Login
        </Link>
      </div>
      </form>
    </div>
    {showInputBox &&  <InputBox onSubmit={forgetPassword} isPending={isPending}  setShowInputBox={setShowInputBox}/>}

    </>
  );
};

export default SignUp;