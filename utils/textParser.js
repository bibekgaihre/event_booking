const JsonToCSV = (data, fields) => {
  if (!Array.isArray(data)) return;
  var csvStr = JsonFields.join(",") + "\n";

  data.forEach((element) => {
    Booking_Date = element.date;
    Location = element.location;
    Max_Booking = element.max_booking;
    Sponsor_Adderss = element.sponsor_address;

    csvStr +=
      Booking_Date +
      "," +
      Location +
      "," +
      Max_Booking +
      "," +
      Sponsor_Adderss +
      "\n";
  });
  return csvStr;
};

const downloadCSV = (csvStr) => {
  var hiddenElement = document.createElement("a");
  hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
  hiddenElement.target = "_blank";
  hiddenElement.download = "output.csv";
  hiddenElement.click();
};

module.exports = { JsonToCSV };
