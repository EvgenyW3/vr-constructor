import { Scene, Color } from "three";

class Api {
  public CreateScene(backgroundColor: number): Scene {
    var scene = new Scene();
    var color = new Color(backgroundColor);
    scene.background = color;

    return scene;
  }
}

export default Api;
