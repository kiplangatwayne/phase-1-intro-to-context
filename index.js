// Your code here
function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0);
  }
  