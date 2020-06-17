const GeneralModel = require("./general.model");

class Controller {
  async updateImage(file) {}

  async updateText(text) {
    let data = await GeneralModel.replaceOne(
      {},
      { overlay_text: text },
      { upsert: true }
    );
  }
}

module.exports = new Controller();
