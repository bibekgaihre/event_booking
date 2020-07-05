const GeneralModel = require("./general.model");
const fs = require("fs");

class Controller {
  async updateImage(payload) {
    let imaged = await GeneralModel.findOne({}, { image: 1 });
    if (imaged !== null && imaged.image !== undefined) {
      fs.unlinkSync(imaged.image);
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
      console.log(d);
      return {
        image: d.image,
        text: d.overlay_text,
        appstore_link: d.app_store_link,
        playstore_link: d.play_store_link,
      };
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
  async updateLink(payload) {
    let data = await GeneralModel.findOneAndUpdate(
      {},
      {
        app_store_link: payload.appstore_link,
        play_store_link: payload.playstore_link,
      },
      {
        upsert: true,
      }
    );
    return data;
  }
}

module.exports = new Controller();
