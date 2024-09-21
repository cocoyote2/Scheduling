let calendar = document.getElementById("date");
let submitButton = document.getElementById("add");
let chosenDate;

//localStorage.clear();

calendar.addEventListener("change", () => {
    let beginHour = document.getElementById("begin");
    let endHour = document.getElementById("end");
    beginHour.value = "00:00";
    endHour.value = "00:00";

    let date = new Date(calendar.value);
    chosenDate = date.toLocaleDateString();

    let content = JSON.parse(localStorage.getItem(chosenDate));

    if (content != null) {
        PrintContent(content);
    }
});

submitButton.addEventListener("click", () => {
    let startHour = document.getElementById("begin").value;
    let finishHour = document.getElementById("end").value;

    let shift = {
        beginHour: startHour,
        endHour: finishHour,
        nbHours: TimeDifference(startHour, finishHour)
    }

    jsonContent = JSON.stringify(shift);

    localStorage.setItem(chosenDate, jsonContent);

    let content = JSON.parse(localStorage.getItem(chosenDate));

    PrintContent(content);
});

function PrintContent(content) {
    let startHour = document.getElementById("begin");
    let finishHour = document.getElementById("end");
    let nbHoursOfMonth = document.getElementById("nbHoursOfMonth");
    const regex = createDateRegex(chosenDate);
    let sumHours = CalculateSumHours(FindLocalItems(regex)).sumHours
    let sumMinutes = CalculateSumHours(FindLocalItems(regex)).sumMinutes
    let str = sumHours + " Heures et " + sumMinutes + " minute(s) pour le mois" 

    if(content != null){
        startHour.value = content.beginHour;
        finishHour.value = content.endHour;
    }

    nbHoursOfMonth.innerHTML = str;
}

function FindLocalItems (query) {
    var i, results = [];
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
            value = JSON.parse(localStorage.getItem(i));
            results.push({key:i,val:value});
        }
        }
    }
    return results;
}

function TimeDifference(startTime, endTime) {
    // Convertir les heures en objets Date
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    // Calculer la différence en millisecondes
    let diff = end - start;

    // Si l'heure de fin est avant l'heure de début, on considère que l'heure de fin est le jour suivant
    if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // Ajouter 24 heures en millisecondes
    }

    // Convertir la différence en minutes
    const diffInMinutes = Math.floor(diff / (1000 * 60));

    // Extraire les heures et minutes
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return { hours, minutes };
}

function CalculateSumHours(dates){
    let sumHours = 0;
    let sumMinutes = 0;
    let tmp;

    for(let i = 0;i < dates.length;i++){
        sumHours += dates[i].val.nbHours.hours;
        sumMinutes += dates[i].val.nbHours.minutes;
    }
    
    //on calcule le nombre de minute qui restent
    tmp = sumMinutes%60;

    //On convertit les minutes en heures
    sumHours += Math.floor(sumMinutes/60);

    //On donne le reste des minutes à sumMinutes
    sumMinutes = tmp;

    return {sumHours, sumMinutes};
}

function createDateRegex(chosenDate) {
    // Extraire le mois et l'année de la variable chosenDate (supposée être un objet Date)
    const [dayStr, monthStr, yearStr] = chosenDate.split("/");
    const date = new Date(yearStr, monthStr - 1, dayStr);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() donne les mois de 0 (janvier) à 11 (décembre)
    const year = date.getFullYear();

    // Construire dynamiquement la regex en utilisant les variables du mois et de l'année
    const regex = new RegExp(`^(0[1-9]|[12][0-9]|30)\\/${month}\\/${year}$`);

    return regex;
}

//TODO : ajouter les fonctionnalités de pause (déjeuner et dîner) et enlever les minutes correspondantes à la somme (clc yoma)