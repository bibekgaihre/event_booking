const GeneralModel = require("./general.model");
const fs = require("fs");

class Controller {
  async updateImage(payload) {
    let imaged = await GeneralModel.findOne({}, { image: 1 });
    if (imaged !== null && imaged.image!==undefined) {
      fs.unlinkSync("public"+ imaged.image);
    }
    let data = await GeneralModel.findOneAndUpdate(
      {},
      { image: payload },
      { new: true, upsert: true }
    );
    return data;
  }
  async getData() {
    let data = await GeneralModel.find();
    // console.log(data);
    let mapped = data.map((d) => {
      return { image: d.image, text: d.overlay_text };
    });
    mapped = mapped[0];
    // console.log(mapped);

    return mapped;
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
