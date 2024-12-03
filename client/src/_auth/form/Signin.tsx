import { ILoginUser } from "../../types/index.ts";
import {  useForgetpassword, useLoginUserAccount } from "../../query/user.queries.ts";
import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormSignupButton from "./AuthFormSignupButton.tsx";
import Meta from "@/utils/Meta.tsx";
import InputBox from "@/components/shared/InputBox.tsx";

const SignIn = () => {
  const {mutateAsync : forgetPassword, isPending} = useForgetpassword()
  const [showInputBox,setShowInputBox] = useState(false);
  const { mutateAsync: loginUserAccount,isPending : isLoginAccount } = useLoginUserAccount();
  const [email, setEmail] = useState<string>("parmarharsh6480@gmail.com");
  const [password, setPassword] = useState<string>("harsh");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user : ILoginUser = {  email, password };
    try {
      await loginUserAccount(user);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <Meta
      title="Sign In - Sara-Ecommerce"
      description="Sign in to your Sara-Ecommerce account to access your personalized shopping experience. Manage your orders, track shipments, and enjoy seamless shopping."
      keywords="Sign In, Sara-Ecommerce, Login, Account Access, Order Management"
      />
    <div className="flex sm:min-w-[384px] min-h-[512px] flex-1 items-center justify-center flex-col max-w-sm w-full bg-white">
      <div className="pt-5">
      <h1 className="text-xl md:text-2xl font-semibold">Welcome To Sara-Ecommerce</h1>
      <p className="text-gray-400">Please enter your details</p>
      </div>
      <form action="post" onSubmit={handleSubmit} className="flex flex-col w-full gap-3 p-8 pt-3">
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
      <AuthFormSignupButton isPending={isLoginAccount} signIn={true}></AuthFormSignupButton>
      <div className="flex justify-center items-center gap-1">
        <h4 className="text-gray-400">Don't have an account?</h4>
        <Link to="/auth/sign-up" className="font-semibold text-xs sm:text-md hover:underline">
        Sign up
        </Link>
      </div>
      </form>
    </div>
  {showInputBox &&  <InputBox onSubmit={forgetPassword} isPending={isPending} setShowInputBox={setShowInputBox}/>}
    </>
  );
};

export default SignIn;
