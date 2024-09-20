let button = document.getElementById("Add")
let form = document.getElementById("form")

form.addEventListener("submit", function(e){
    e.preventDefault();
})

button.addEventListener("click", AddDay) 

function AddDay(){
    let begin = document.getElementById("begin").value;
    let end = document.getElementById("end").value;
    let Todaydate = new Date().toLocaleDateString()

    let content = document.getElementById("tab-content");
    let element = document.createElement("tr")
    let date = document.createElement("td")
    let demarrage = document.createElement("td");
    let fin = document.createElement("td");

    date.innerHTML = Todaydate;
    demarrage.innerHTML = begin + "H";
    fin.innerHTML = end + "H";

    element.append(date);
    element.append(demarrage);
    element.append(fin);

    content.append(element);
}

function CheckHour(hour){
}