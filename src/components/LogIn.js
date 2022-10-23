import { loginApi } from "../api";


const LogIn = () => {



  const handleUser = async () => {
    try {
      console.log("clicked");
       await loginApi();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="grid h-screen place-items-center">
        <div
          className="w-10/12 sm:w-6/12 md:w-4/12  flex items-center border-2 px-2 rounded-md hover:cursor-pointer"
          onClick={() => handleUser()}
        >
          <span className="grow text-center text-xl font-normal">Login</span>
          <img
            className="flex-none  object-cover object-center h-16 inline-block"
            src="https://cdn.pixabay.com/photo/2018/05/08/21/29/spotify-3384019__480.png"
            alt="spotify icon"
          />
        </div>
      </div>
    </section>
  );
};

export default LogIn;