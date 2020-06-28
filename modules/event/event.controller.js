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

  save(payload) {
    console.log(payload);
    return;
    let { sponsor_logo } = payload;
    return EventModel.create(payload);
  }
  async getlatestevent() {
    //only list event which are coming near , o past events maximum 6 events
    let data = await EventModel.find({ date: { $gte: new Date() } })
      .limit(6)
      .sort({ date: +1 });

    data.forEach((d, i) => {
      if (d.booking.length === d.max_booking) {
        d.result = 1;
      } else if (d.booking.length < d.max_booking) {
        d.result = 0;
      }
    });
    return data;
  }
  //edit event but cannot be edited on event date (eventData !== Date.now())
  async updateById(id, payload) {
    if (payload.date === Date.now()) return null;
    let data = await EventModel.findOneAndUpdate({ _id: id }, payload);
    return data;
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

      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = new Controller();
