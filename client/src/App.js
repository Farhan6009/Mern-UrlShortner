import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from 'react'
import axios from "axios";
import List from './Component/List';

function App() {

  const [fullUrl, setfullUrl] = useState({
    full: ""
  });

  const inputUrl = (event) => {
    const { name, value } = event.target;
    setfullUrl({ ...fullUrl, [name]: value });
  }

  const PostUrl = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://localhost:5000/shortUrl', fullUrl);
    console.log(data);
    if (!data) {
      window.alert("Url shortening failed");
    } else {
      alert("Url shortened");
      setfullUrl({ full: "" });
    }
  }

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <header>
            Url Shortner
          </header>
          <form method="POST" className="url_input">
            <input type="text"
              name="full"
              value={fullUrl.full}
              onChange={inputUrl}
              placeholder="Enter the URL"
              className="urlinput" />

            <input type="submit" value="ShortUrl" name="registerUrl" className="urlinput_btn"
              onClick={PostUrl}
            />
          </form>
        </div>
        <div className="list_div">
          <List></List>
        </div>
      </div>
    </>
  );
}

export default App;
