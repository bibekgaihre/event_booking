const convertJSONToCSV = (objArray, eventDate, eventLocation, eventComment) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let firstStr = "Event Date, Event Location, Event Comment" + "\n";
  let secondStr = `${eventDate},${eventLocation},${eventComment}` + "\n";
  let thirdStr = "Work Email, Full Name, Phone, Selected Meal" + "\n";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";
      line += array[i][index];
    }
    firstStr += secondStr += thirdStr += line + "\r\n";
  }
  return firstStr;
};

module.exports = { convertJSONToCSV };
