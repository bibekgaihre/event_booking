const EventModel = require("./event.model");
const { JsonToCSV } = require("../../utils/textParser");

class Controller {
  constructor() {}
  //list event
  list() {
    return EventModel.find({});
  }

  // add event
  save(payload) {
    return EventModel.findOneAndUpdate(
      { date: payload.date, location: payload.location },
      payload,
      { new: true, upsert: true }
    );
  }

  //edit event but cannot be edited on event date (eventData !== Date.now())
  async updateById(id, payload) {
    if (payload.date === Date.now()) return null;
    let data = await EventModel.findOneAndUpdate({ _id: id }, payload);
  }

  //delete event
  async removeById(id) {
    return EventModel.findOneAndRemove({ _id: id });
  }
  //download the list of meal bookings  for a specificc event on CSV(stream/net nodecore)
  async getById(id) {
    let data = await EventModel.findOne({ _id: id });
    return data;
  }

  async download(id) {
    try {
      const fields = ["Date", "Location", "Comment", "Max Booking"];

      let { date, location, comment, max_booking } = await EventModel.findOne({
        _id: id,
      });

      let data = { date, location, comment, max_booking };
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new Controller();
