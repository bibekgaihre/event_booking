const GeneralModel = require("./general.model");

class Controller {
  async updateImage(payload) {
    console.log(payload);
    let data = await GeneralModel.findOneAndUpdate(
      {},
      { image: payload },
      { new: true, upsert: true }
    );
    console.log(data);
    return data;
  }

  async updateText(text) {
    let data = await GeneralModel.replaceOne(
      {},
      { overlay_text: text },
      { upsert: true }
    );
  }
}

module.exports = new Controller();
