import React from "react";
import "./App.css";
import imageList from "./images.json";

interface ImageInfo {
  zoneName: string;
  data: any;
}

interface AppState {
  images: Array<ImageInfo>;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { images: [] };
  }

  async componentDidMount() {
    for (const imageName of imageList) {
      const image = await import(`../assets/${imageName}`);
      const info = {
        zoneName: imageName.slice(0, -4),
        data: image.default,
      };
      this.setState(({ images }) => ({
        images: [...images, info],
      }));
    }
  }

  render() {
    return (
      <div className="large-container">
        <div>
          {Object.keys(this.state.images).length === 0 && (
            <h1>Loading images</h1>
          )}
        </div>
        <div className="images-display">
          {this.state.images.map((info) => (
            <div key={info.zoneName}>
              <h2>{info.zoneName}</h2>
              <img src={info.data} alt="Map" />
              <div className="vert-spacer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
