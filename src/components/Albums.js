import React, { useEffect, useState } from 'react'
import Auth from '../auth';
import { getArtistAlbums, getArtistDetails } from "../api";
import { useParams } from 'react-router-dom';

const Albums = () => {
  let { id } = useParams();

  const [albums, setAlbums] = useState({});
  const [artistName, setArtistName] = useState("");
  
  useEffect(() => {
    async function fetchAlbums() {
    try {
      const access_token = Auth.getAuthData();
      if (access_token) {
        let response1 = await getArtistAlbums(id, access_token);
        // console.log(response1.data);
        if (response1.status === 200) {
          setAlbums(response1.data.items);
        } else console.log("you are not authorized");


        let response2 = await getArtistDetails(id, access_token);
        // console.log(response2.data);
        setArtistName(response2.data.name)
      }

    } catch (error) {
      console.log(error);
    }
    }
    fetchAlbums();
  
  }, [])

  return (
    <section className=" body-font md:px-16 px-5">
      <div className="container px-1 py-20 mx-auto  items-center">
        <div className="flex flex-col mb-16 w-full md:w-auto md:text-left text-center">
          <h1 className="md:text-3xl text-2xl  title-font text-gray-600">
            {artistName}
          </h1>
          <h3 className=" md:text-lg font-normal  title-font text-gray-500">
            Albums
          </h3>
        </div>

        <div className="grid lg:grid-cols-4 lg:gap-16 sm:grid-cols-2 gap-8">
          {albums.length ? (
            albums.map((album) => (
              <div
                key={album.id}
                className="h-full flex flex-col border-2 border-gray-500"
              >
                <span className=" relative h-52 overflow-hidden border-b-2 border-gray-500">
                  <img
                    alt="album"
                    className=" object-cover object-center block border-b-2 border-gray-500"
                    src={album.images[0].url}
                    // src=""
                  />
                </span>
                <div className=" mx-4 h-32 flex flex-col justify-around">
                  <span>
                    <h2 className="text-gray-700 title-font text-lg font-medium">
                      {album.name}
                    </h2>
                    <h3 className=" text-gray-500 text-xs  mt-1">
                      {album.artists.map((artist) => artist.name + " ")}
                    </h3>
                  </span>
                  <div className=" text-gray-500 text-xs font-medium">
                    <p>{album.release_date}</p>
                    <p>
                      {album.total_tracks === 1
                        ? album.total_tracks + " track"
                        : album.total_tracks + " tracks"}
                    </p>
                  </div>
                </div>
                <div className="border-t-2 border-gray-500 flex justify-center py-2 bg-gray-100 hover:cursor-pointer">
                  
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 text-xs font-medium"
                  >
                    Preview on Spotify
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col mb-16 w-full md:w-auto text-center">
              <h1 className=" md:text-2xl   title-font text-gray-600">
                No albums found
              </h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Albums