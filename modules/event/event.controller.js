const EventModel = require("./event.model");
const { convertJSONToCSV } = require("../../utils/json2csv");

class Controller {
  constructor() {}
  //list event
  async list({ limit, start, page }) {
    let total = await EventModel.countDocuments();
    let data = await EventModel.find()
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    return {
      total,
      limit,
      start,
      page,
      data,
    };
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

  async generateCSV(id) {
    try {
      let data = await EventModel.findOne({
        _id: id,
      }).populate("booking");
      let { booking, date, location, comment } = data;
      data = await convertJSONToCSV(
        JSON.stringify(booking),
        date,
        location,
        comment
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new Controller();
