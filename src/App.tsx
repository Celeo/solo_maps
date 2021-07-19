import React from "react";
import "./App.css";
import imageList from "./images.json";

interface ImageInfo {
  fileName: string;
  zoneName: string;
  data: any;
}

export const App = () => {
  const [images, setImages] = React.useState<Array<ImageInfo>>([]);

  React.useEffect(() => {
    const loadImages = async () => {
      const allImages: Array<ImageInfo> = [];
      for (const imageName of imageList) {
        const image = await import(`../assets/${imageName}`);
        allImages.push({
          fileName: imageName,
          zoneName: imageName.slice(0, -4),
          data: image.default,
        });
      }
      setImages(allImages);
    };
    loadImages();
  }, []);

  return (
    <div className="large-container">
      <div>{Object.keys(images).length === 0 && <h1>Loading images</h1>}</div>
      <div className="images-display">
        {images.map((info) => (
          <div key={info.zoneName}>
            <h2>{info.zoneName}</h2>
            <img src={info.data} alt="Map" />
            <div className="vert-spacer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
