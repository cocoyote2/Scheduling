let calendar = document.getElementById("date");
let submitButton = document.getElementById("add");
let chosenDate;

//localStorage.clear();

calendar.addEventListener("change", () => {
    let date = new Date(calendar.value);
    chosenDate = date.toLocaleDateString();

    let content = JSON.parse(localStorage.getItem(chosenDate));

    if (content != null) {
        PrintContent(chosenDate, content);
    }
});

submitButton.addEventListener("click", () => {
    let startHour = document.getElementById("begin").value;
    let finishHour = document.getElementById("end").value;
    let currDate = document.getElementById("currDate");

    let shift = {
        beginHour: startHour,
        endHour: finishHour
    }

    jsonContent = JSON.stringify(shift);

    localStorage.setItem(chosenDate, jsonContent);

    currDate.innerHTML = chosenDate;
});

function PrintContent(date, content) {
    let currDate = document.getElementById("currDate");
    let startHour = document.getElementById("beginHour");
    let finishHour = document.getElementById("endHour");

    //Je dois ajouter les données du content à startHour et finishHour
    currDate.innerHTML = date;
}