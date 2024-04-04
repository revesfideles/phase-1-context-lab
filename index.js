function createEmployeeRecord(employeeArray) {
  const [firstName, familyName, title, payPerHour] = employeeArray;

  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

const employee = createEmployeeRecord(['Gray', 'Worm', 'Security', 1]);
console.log(employee.firstName); // Output: Gray

function createEmployeeRecords(employeeArrays) {
  return employeeArrays.map(function (employeeArray) {
    const [firstName, familyName, title, payPerHour] = employeeArray;
    return createEmployeeRecord(employeeArray);
  });
}

const employeeArrays = createEmployeeRecords([[['moe']], [['bartholomew']]]);
console.log(employeeArrays);

function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');

  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  };

  this.timeInEvents.push(timeInEvent);

  return this;
}

function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(' ');

  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  };

  this.timeOutEvents.push(timeOutEvent);

  return this;

}

function hoursWorkedOnDate(date) {
  const timeInEvent = this.timeInEvents.find(event => event.date === date);
  const timeOutEvent = this.timeOutEvents.find(event => event.date === date);

  if (!timeInEvent || !timeOutEvent) {
    throw new Error("Missing timeIn or timeOut event for the specified date");
  }

  const timeInHour = parseInt(timeInEvent.hour);
  const timeOutHour = parseInt(timeOutEvent.hour);

  const hoursWorked = (timeOutHour - timeInHour) / 100; // Convert to decimal

  return hoursWorked;
}

function wagesEarnedOnDate(date) {
  const hoursWorked = hoursWorkedOnDate.call(this, date);
  const amountOwed = hoursWorked * this.payPerHour;

  return amountOwed;
}

function allWagesFor() {
  const eligibleDates = this.timeInEvents.map(event => event.date);

  const totalWages = eligibleDates.reduce(function (total, date) {
    return total + wagesEarnedOnDate.call(this, date);
  }.bind(this), 0);

  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function (employee) {
    return employee.firstName === firstName;
  });
}

function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce(function (total, employee) {
    return total + allWagesFor.call(employee);
  }, 0);

  return totalPayroll;
}