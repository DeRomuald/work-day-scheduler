// var  changing time schedule
var startWork = 9;
var endWork = 17;

// the current day displayed with calendar    
var getCurrentDate = function () {
    var currentDate = moment().format('dddd, MMMM Do YYYY');
    $("#currentDay").text(currentDate);
};

var checkAmPm = function (time) {
    if (time > 12) {
        return time - 12 + ":00 pm";
    } else if (time === 12) {
        return time + ":00 pm"
    } else {
        return time + ":00 am"
    }
};
// time blocks for standard busniess hours

var createSchedule = function (startTime, endTime) {
    for (var i = startTime; i <= endTime; i++) {
        // text area
        var textArea = $('<textarea>')
            .addClass('col-6 col-md-10 task')
    
        //save button
        var saveBtn = $('<button>')
            .addClass('btn saveBtn col-3 col-md-1')
            

            .append($("<span>").addClass("far fa-save"));
        
        var hourDiv = $("<div>")
            .addClass("col-3 col-md-1 hour text-left pl-0")
            
            .text(checkAmPm(i))
         // container with time blocks
        var hourContainer = $('<div>')
            
            .attr("id", "hour-" + i)
            .addClass("row time-block");
      
        $(".container").append(hourContainer.append([
            hourDiv,
            textArea,
            saveBtn
        ]));
    }
};

var saveLocal = function () {
    $('.time-block').on('click', '.saveBtn', function () {
     
        var idHour = $(this)
            .parent()
            .attr('id');
       
        var text = $(this)
            .siblings('.task')
            .val()
            .trim();
    
        // saves text to localStorage
        localStorage.setItem(idHour, text);
    });
};
var loadTasks = function () {

    for (var hour = startWork; hour <= endWork; hour++) {
       
        $('#hour-' + hour + " .task").val(localStorage.getItem('hour-' + hour));
    }
};
// time function for past present and future
var pastPresentFutureCheck = function () {

    var currentHour = moment().hour();

    $('.time-block').each(function () {
       
        var blockHour = parseInt($(this).attr("id").split("hour-")[1]);
    
        if (blockHour < currentHour) {
            $(this).children(".task").addClass("past");
            
        } else if (blockHour === currentHour) {
            $(this).children(".task").addClass("present");
            
        } else {
            $(this).children(".task").addClass("future");
        }
    });
};
// displays current date in header
getCurrentDate();
createSchedule(startWork, endWork);
pastPresentFutureCheck();
loadTasks();
// saves data to localStorage
saveLocal();