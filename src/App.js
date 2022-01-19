import "./App.css";
import react, { createRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";

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
  const refDiv = createRef();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Fun</h1>
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
        <div className="meme-content">
          <div className="meme" ref={refDiv}>
            <img className="meme-image" src={meme.randomImage} width="100" />
            <h2 className="meme-text bottom">{meme.bottomText}</h2>
            <h2 className="meme-text top">{meme.topText}</h2>
          </div>
          <div className="meme-download">
            <button
              className="btn-download"
              onClick={() => exportComponentAsJPEG(refDiv)}
            >
              as JPEG
            </button>

            <button
              className="btn-download"
              onClick={() => exportComponentAsPNG(refDiv)}
            >
              as PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
