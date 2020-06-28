const GeneralModel = require("./general.model");
const fs = require("fs");

class Controller {
  async updateImage(payload) {
    let imaged = await GeneralModel.findOne({}, { image: 1 });
    if (imaged !== null) {
      fs.unlinkSync(__dirname + "/../../" + imaged.image);
    }
    let data = await GeneralModel.findOneAndUpdate(
      {},
      { image: payload },
      { new: true, upsert: true }
    );
    return data;
  }

  async updateText(text) {
    let data = await GeneralModel.findOneAndUpdate(
      {},
      { overlay_text: text },
      { upsert: true }
    );
    return data;
  }
}

module.exports = new Controller();
