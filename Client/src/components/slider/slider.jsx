import "./slider.scss";
import { useState } from "react";

function Slider({ images }) {
  const [imgIndex, setImgIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      setImgIndex(imgIndex === 0 ? images.length - 1 : imgIndex - 1);
    } else {
      setImgIndex(imgIndex === images.length - 1 ? 0 : imgIndex + 1);
    }
  };

  return (
    <div className="slider">
      {imgIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img
              src="/arrow.png"
              alt=""
              className="left"
              onClick={() => changeSlide("left")}
            />
          </div>
          <div className="imgContainer">
            <img src={images[imgIndex]} alt="" />
          </div>
          <div className="arrow">
            <img
              src="/arrow.png"
              alt=""
              className="right"
              onClick={() => changeSlide("right")}
            />
          </div>
          <div className="close" onClick={() => setImgIndex(null)}>
            X
          </div>
        </div>
      )}

      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImgIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img src={image} key={index} onClick={() => setImgIndex(index + 1)} />
        ))}
      </div>
    </div>
  );
}

export default Slider;
