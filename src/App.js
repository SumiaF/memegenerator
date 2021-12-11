import "./App.css";
import react from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const url = "https://api.imgflip.com/get_memes";
  const [memesData, setMemesData] = useState(null);

  const [meme, setmeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  useEffect(() => {
    axios.get(url).then((response) => {
      setMemesData(response.data.data.memes);
    });
  }, [url]);

  function getMemeImage() {
    const memeArray = memesData;

    const randonNumber = Math.floor(Math.random() * memeArray.length);

    const imageUrl = memeArray[randonNumber].url;
    setmeme((preMeme) => ({
      ...preMeme,
      randomImage: imageUrl,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setmeme((preMeme) => ({
      ...preMeme,
      [name]: value,
    }));
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Meme Fun Game</p>
      </header>
      <div className="wrapper-content">
        <div className="inputs">
          <input
            onChange={handleChange}
            type="text"
            name="topText"
            value={meme.topText}
            id=""
            placeholder="Top text"
          />
          <input
            onChange={handleChange}
            type="text"
            name="bottomText"
            value={meme.bottomText}
            id=""
            placeholder="Bottom text"
          />
          <button onClick={getMemeImage} className="get-image-btn">
            Get a new image
          </button>
        </div>
        <div className="meme">
          <h2 className="meme-text top">{meme.topText}</h2>
          <img className="meme-image" src={meme.randomImage} />
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
//onClick={()=>getMemeImage} why does not work here?
