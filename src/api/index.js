import axios from "axios";


const client_id =  process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const scope = "user-read-private user-read-email";

const state = generateRandomString(16);

// console.log(client_id,   redirect_uri, state);


export const loginApi = async () => {
  try {
    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + redirect_uri;
    url += "&state=" + encodeURIComponent(state);
    // console.log(url);
    window.location = url;
  } catch (error) {
    console.log(error);
  }
};


export const getArtists = async (token, artist) => {
  try {
    let url = "https://api.spotify.com/v1/search";
    url += "?q=" + artist;
    url += "&type=artist";
    // url += "&market=ES";
    url += "&limit=50";
    url += "&offset=0";

    let response = await axios(url, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
  });
    return response

  } catch (error) {
    console.log(error)
  }
}

export const getArtistAlbums = async (id, token) => {
  try {
    let url = "https://api.spotify.com/v1/artists/";
    url +=  id + "/albums";
    url += "?include_groups=single";
    url += "&market=ES";
    url += "&limit=50";
    url += "&offset=0";

    let response = await axios(url, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
  });
    return response

  } catch (error) {
    console.log(error)
  }

}

export const getArtistDetails = async (id, token) => {
  try {
    let url = "https://api.spotify.com/v1/artists/";
    url +=  id ;

    let response = await axios(url, {
      method: 'GET',
      headers: {
        Authorization: "Bearer " + token
      }
  });
    return response

  } catch (error) {
    console.log(error)
  }

}


function generateRandomString(length) {
          var text = '';
          var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

          for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
};