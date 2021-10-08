const GAME_STORAGE: Game[] = [];

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
    GAME_STORAGE.push(this);
  }

  static fetchAll() {
    return GAME_STORAGE;
  }
}
