const GAME_STORAGE: Game[] = [];
import path from "path";
import fs from "fs";

const getFilePath = () => {
  return path.join(path.dirname(require.main.filename), "data", "games.json");
};

const getGamesFromFile = (callback: Function) => {
  const p = getFilePath();

  fs.readFile(p, (err, data) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(data.toString()));
  });
};

export default class Game {
  title: String;
  platform: String;
  releaseYear: Number;

  constructor(_title: String, _platform: String, _releaseYear: Number) {
    this.title = _title;
    this.platform = _platform;
    this.releaseYear = _releaseYear;
  }

  save() {
    getGamesFromFile((games: Game[]) => {
      const p = getFilePath();
      games.push(this);
      fs.writeFile(p, JSON.stringify(games), (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  }

  static fetchAll(callback: Function) {
    getGamesFromFile(callback);
  }
}
