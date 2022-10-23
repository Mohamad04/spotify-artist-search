import React, { useEffect, useState } from "react";
import Auth from "../auth";
import { getArtists } from "../api";
import { Link } from "react-router-dom";



 const getHashParams = (hash) => {
   // console.log(hash);
   const stringAfterHashing = hash.substring(1);
   // console.log(stringAfterHashing);

   const paramsInURL = stringAfterHashing.split("&");
   // console.log(paramsInURL);

   const paramsSplitUp = paramsInURL.reduce((accumulater, currentValue) => {
     // console.log(currentValue);
     const [key, value] = currentValue.split("=");
     accumulater[key] = value;
     return accumulater;
   }, {}); // accumulator by default this empty object

  //  console.log(paramsSplitUp);
   return paramsSplitUp;
 };



const SearchArtists = () => {
  // const [userInput, setUserInput] = useState("");
  const [token, setToken] = useState("");
  const [artists, setArtists] = useState({});
    const [searchTerm, setSearch] = useState("");


  
  useEffect(() => {
    // if we have a url with some data in it
    if (window.location.hash) {
      // console.log("get hash parameters");
      const { access_token } = getHashParams(window.location.hash);
    //   console.log(access_token);
      Auth.removeAuthData();
      Auth.storeAuthData(access_token);
      setToken(access_token);
    }

  }, []);

  useEffect(() => {
    if(searchTerm !== "" ) {
        const delayDebounce = setTimeout(() => {
        // console.log(searchTerm);
        handleUserInput(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounce);
    }
  
  }, [searchTerm])



  const handleUserInput = async (artist) => {
    try {
      let response = await getArtists(token, artist);
    //   console.log(response.data.artists.items);
      if (response.status === 200) {
        setArtists(response.data.artists.items);
      } else {
        Auth.removeAuthData();
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };



  let ratingStars = (popularity) => {
    let yellowStar = popularity * 0.05;
    // console.log(popularity, yellowStar);
    return (
      <>
        {[...Array(5)].map((e, i) => {
          if (i < Math.round(yellowStar))
            return (
              <svg
                key={i}
                aria-hidden="true"
                className="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>First star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            );
          else
            return (
              <svg
                key={i}
                aria-hidden="true"
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>First star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            );
        })}
      </>
    );
  };

  return (
    <section className=" body-font md:px-16 p-5">
      <div
        className={
          artists.length
            ? "grid my-20 place-items-center"
            : "grid h-screen place-items-center"
        }
      >
        <div className="w-9/12 sm:w-6/12 md:w-5/12  flex md:justify-between justify-center  md:flex-nowrap flex-wrap items-center border-2 px-2 rounded-md hover:cursor-pointer">
          <input
          autoFocus
            type="search"
            className="w-11/12 h-12 md:text-xl text-sm text-center focus:outline-none"
            placeholder="Search for an artist..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <svg
            className="w-7 h-7 text-gray-300 mr-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 101 101"
          >
            <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z" />
          </svg>
        </div>
      </div>

      <div className="container px-5 mx-auto">
        <div className="grid lg:grid-cols-4 lg:gap-16 sm:grid-cols-2 gap-8">
          {artists.length ? (
            artists.map((artist) => (
              <Link key={artist.id} to={`/artists/${artist.id}/albums`}>
                <div className="h-full flex flex-col border-2 border-gray-500 hover:cursor-pointer">
                  <span className=" relative md:h-52  overflow-hidden border-b-2 border-gray-500">
                    <img
                      alt="artist"
                      className=" object-cover object-center block border-b-2 border-gray-500"
                      src={artist.images.length ? artist.images[0].url : artist.images.url}
                      //   src={""}
                    />
                  </span>
                  <div className="my-2 mx-4">
                    <h2 className="text-gray-700 title-font text-lg font-medium">
                      {artist.name}
                    </h2>
                    <h3 className="text-gray-500 text-sm font-medium mt-1">
                      {artist.followers.total} followers
                    </h3>
                    <div className="mt-12 flex items-center">
                      {ratingStars(artist.popularity)}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchArtists;
