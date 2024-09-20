let calendar = document.getElementById("date");
let chosenDate;

calendar.addEventListener("change", () => {
    let date = new Date(calendar.value);
    chosenDate = date.toLocaleDateString();
    PrintDate(chosenDate);
});

function PrintDate(date){
    let content = document.getElementById("currDate");
    content.innerHTML = date;
}