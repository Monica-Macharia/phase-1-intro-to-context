function createEmployeeRecord (item){
    return {
    firstName: item[0],
    familyName: item[1],
    title: item[2],
    payPerHour: item[3], 
    timeInEvents: [],
    timeOutEvents: []
}
}

let createEmployeeRecords = (employeeRecord) => {
    return employeeRecord.map(function(item){
        return createEmployeeRecord(item);
    })
}

let createTimeInEvent = function InUpdater(record, dateStamp){
    
    let [date, hour] = dateStamp.split(" ")
    
    record.timeInEvents.push({
        type: "TimeIn",hour: parseInt(hour, 10),date,
         })

 return record
}

let createTimeOutEvent = function outUpdater(record, dateStamp){
    
    let [date, hour] = dateStamp.split(" ")
    
    record.timeOutEvents.push({
        type: "TimeOut",hour: parseInt(hour, 10),date,
         })

 return record
}

let hoursWorkedOnDate = function(record, theDate){
    let dateIn = record.timeInEvents.find((target => target.date === theDate))
    let dateOut = record.timeOutEvents.find((target => target.date === theDate))
    return (dateOut.hour - dateIn.hour)/100
}

let wagesEarnedOnDate = function(record, newDate){
    return Number(hoursWorkedOnDate(record, newDate) * record.payPerHour)
} 

let allWagesFor = function(record){
    let daysWorked = record.timeInEvents.map((target)=> target.date);
    
    let allWages = daysWorked.reduce((history, days) => history + wagesEarnedOnDate(record, days),0)
    return allWages
}

let calculatePayroll = function(allRecords){
    return allRecords.reduce((history, namesOfEmployees) => history + allWagesFor(namesOfEmployees),0)
} 
