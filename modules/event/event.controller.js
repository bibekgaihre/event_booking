const EventModel = require("./event.model");
const { convertJSONToCSV } = require("../../utils/json2csv");
const moment = require("moment");

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
  async save(payload, files) {
    payload.meal_option = [];
    if (payload.meal_name_1)
      payload.meal_option.push({
        text: payload.meal_name_1,
        image: payload.meal_1,
      });
    if (payload.meal_name_2)
      payload.meal_option.push({
        text: payload.meal_name_2,
        image: payload.meal_2,
      });
    if (payload.meal_name_3)
      payload.meal_option.push({
        text: payload.meal_name_3,
        image: payload.meal_3,
      });

    if (files) {
      files.forEach((file) => {
        if (file.fieldname === "sponsor_logo") {
          payload.sponsor_logo = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_1") {
          payload.meal_option[0].image = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_2") {
          payload.meal_option[1].image = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_3") {
          payload.meal_option[2].image = file.destination + "/" + file.filename;
        }
      });
    }

    return EventModel.findOneAndUpdate(
      { date: payload.date, location: payload.location },
      payload,
      { new: true, upsert: true }
    );
  }
  async getlatestevent() {
    let data = await EventModel.find({});
    let displaydate = [];

    data.forEach((d) => {
      if (moment(new Date(d.date)).format("") > moment(new Date()).format("")) {
        displaydate.push(d);
      }
    });

    displaydate.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    let displaydata = [];
    displaydate.forEach((d, i) => {
      if (i < 6) {
        displaydata.push(d);
      }
    });
    displaydata.sort(function (a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
    console.log(displaydata);

    displaydata.forEach((d, i) => {
      if (d.booking.length === d.max_booking) {
        d.result = 1;
      } else if (d.booking.length < d.max_booking) {
        d.result = 0;
      }
    });
    return displaydata;
  }
  //edit event but cannot be edited on event date (eventData !== Date.now())

  async updateById(id, payload, files) {
    payload.meal_option = [];
    if (payload.meal_name_1)
      payload.meal_option.push({
        text: payload.meal_name_1,
        image: payload.meal_1,
      });
    if (payload.meal_name_2)
      payload.meal_option.push({
        text: payload.meal_name_2,
        image: payload.meal_2,
      });
    if (payload.meal_name_3)
      payload.meal_option.push({
        text: payload.meal_name_3,
        image: payload.meal_3,
      });

    // payload.meal_option = [
    //   { text: payload.meal_name_1 || "N/A", image: payload.meal_1 },
    //   { text: payload.meal_name_2 || "N/A", image: payload.meal_2 },
    //   { text: payload.meal_name_3 || "N/A", image: payload.meal_3 },
    // ];

    if (files) {
      files.forEach((file) => {
        if (file.fieldname === "sponsor_logo") {
          payload.sponsor_logo = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_1") {
          payload.meal_option[0].image = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_2") {
          payload.meal_option[1].image = file.destination + "/" + file.filename;
        }
        if (file.fieldname === "meal_image_3") {
          payload.meal_option[2].image = file.destination + "/" + file.filename;
        }
      });
    }
    let event = await this.getById(id);
    return new Date(event.date).setHours(0, 0, 0, 0) !==
      new Date().setHours(0, 0, 0, 0)
      ? await EventModel.updateOne({ _id: id }, payload)
      : null;
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
      booking = booking.map((elem) => {
        return {
          work_email: elem.work_email,
          full_name: elem.full_name,
          phone: elem.phone,
          selected_meal: elem.selected_meal,
        };
      });
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
