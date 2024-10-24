const AuthFormSignupButton = ({ isPending,signIn } : {isPending : boolean,signIn : boolean}) => {
  return (
    <button
      type="submit"
      className="bg-gray-700 p-2 text-white border rounded-lg hover:bg-gray-600 cursor-pointer"
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-3">
          <img width={20} src="/Loader.svg" alt="Loading..." />
          {signIn ? "Sign In" : "Sign Up"}
        </div>
      ) : (
       <>{signIn ? "Sign In" : "Sign Up"}</>
      )}
    </button>
  );
};

export default AuthFormSignupButton;
