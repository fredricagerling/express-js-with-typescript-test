const GAME_STORAGE: Game[] = [];
import path from "path";
import fs, { PathOrFileDescriptor } from "fs";

const p = path.join(path.dirname(require.main.filename), "data", "games.json");

const getGamesFromFile = (callback: Function) => {
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
  slug: String;
  id: String;
  description: String;

  constructor(
    _id: String,
    _title: String,
    _platform: String,
    _releaseYear: Number,
    _slug: String,
    _description: String
  ) {
    this.id = _id;
    this.title = _title;
    this.platform = _platform;
    this.releaseYear = _releaseYear;
    this.slug = _slug;
    this.description = _description;
  }

  save() {
    getGamesFromFile((games: Game[]) => {
      if (this.id) {
        const existingGameIndex = games.findIndex(
          (game) => game.id === this.id
        );
        this.update(games, existingGameIndex);
      } else {
        this.create(games);
      }
    });
  }

  update(games: Game[], existingGameIndex: number) {
    const updatedGames = [...games];
    updatedGames[existingGameIndex] = this;

    fs.writeFile(p, JSON.stringify(updatedGames), (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  static delete(id: String) {
    getGamesFromFile((games: Game[]) => {
      const updatedGames = games.filter((game) => game.id !== id);
      fs.writeFile(p, JSON.stringify(updatedGames), (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    });
  }

  create(games: Game[]) {
    this.id = Math.random().toString();
    games.push(this);
    fs.writeFile(p, JSON.stringify(games), (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  static fetchAll(callback: Function) {
    getGamesFromFile(callback);
  }

  static findById(id: String, callback: Function) {
    getGamesFromFile((games: Game[]) => {
      const game = games.find((p) => p.id === id);
      callback(game);
    });
  }
}
