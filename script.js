//TODO : Do all the verifications (hours etc...)
//IDEA : Ajouter une date de fin à la sélection : au choix de la date, yaura un input avec la date de fin qui sera = à la date de départ et qui pourra être changé. (remplacer date par heure)

const calendar = document.getElementById("date");
const submitButton = document.getElementById("add");
const beginHour = document.getElementById("begin");
const endHour = document.getElementById("end");
const startHour = document.getElementById("begin");
const finishHour = document.getElementById("end");
const nbHoursOfMonth = document.getElementById("nbHoursOfMonth");
const filterYear = document.getElementById("filterYear");
const filterMonth = document.getElementById("filterMonth");
const searchButton = document.getElementById("searchButton");
const CURRENT_DATE = new Date();
let chosenDate;
let data;

//localStorage.clear();

calendar.addEventListener("change", () => {
  beginHour.value = "00:00";
  endHour.value = "00:00";

  let date = new Date(calendar.value);
  chosenDate = date.toLocaleDateString();

  data =
    JSON.parse(localStorage.getItem("data")) != null
      ? JSON.parse(localStorage.getItem("data"))
      : [];

  PrintContent(FindSpecificItem(data, chosenDate));
});

submitButton.addEventListener("click", () => {
  let startHour = document.getElementById("begin").value;
  let finishHour = document.getElementById("end").value;
  let lunch = document.getElementById("lunch").checked;
  let dinner = document.getElementById("dinner").checked;
  data =
    JSON.parse(localStorage.getItem("data")) != null
      ? JSON.parse(localStorage.getItem("data"))
      : [];

  let shift = {
    date: chosenDate,
    beginHour: startHour,
    endHour: finishHour,
    nbHours: TimeDifference(startHour, finishHour, lunch, dinner),
  };

  data.push(shift);

  jsonContent = JSON.stringify(data);

  localStorage.setItem("data", jsonContent);

  PrintContent(shift);
});

searchButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  let month = filterMonth.value;
  let year = filterYear.value;
  let searchedDate = new Date(year, month, 1);

  data =
    JSON.parse(localStorage.getItem("data")) != null
      ? JSON.parse(localStorage.getItem("data"))
      : [];
  //On doit faire la somme de toutes les heures qui correspondent à la date
  let res = CalculateSumHours(FindLocalItems(searchedDate));

  nbHoursOfMonth.innerText = `${res.sumHours} Heure(s) et ${res.sumMinutes} Minute(s)`;
});

//PrintContent takes an object that corresponds to a date
function PrintContent(shift) {
  if (shift != null) {
    startHour.value = shift.beginHour;
    finishHour.value = shift.endHour;
  } else {
    startHour.value = "00:00";
    endHour.value = "00:00";
  }
}

function FindLocalItems(date) {
  let i;
  let res = [];

  //On parcourt le tableau à la recherche des bon objets pour les jours
  for (i = 0; i < data.length; i++) {
    const currDateString = data[i].date;
    const [currDay, currMonth, currYear] = currDateString.split("/");

    if (currMonth == date.getMonth() + 1 && currYear == date.getFullYear()) {
      res.push(data[i]);
    }
  }

  return res;
}

function FindSpecificItem(data, date) {
  const res = data.find((obj) => obj.date == date);

  return res;
}

function TimeDifference(startTime, endTime, lunch, dinner) {
  // Convertir les heures en objets Date
  const start = new Date(`1970-01-01T${startTime}:00`);
  const end = new Date(`1970-01-01T${endTime}:00`);
  let pauseDuration = 0;

  //Déterminer la durée de pause
  if (lunch && dinner) {
    pauseDuration = 45;
  } else if (lunch) {
    pauseDuration = 15;
  } else if (dinner) {
    pauseDuration = 30;
  }

  // Calculer la différence en millisecondes
  let diff = end - start;

  // Si l'heure de fin est avant l'heure de début, on considère que l'heure de fin est le jour suivant
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000; // Ajouter 24 heures en millisecondes
  }

  // Convertir la différence en minutes
  const diffInMinutes = Math.floor(diff / (1000 * 60)) - pauseDuration;

  // Extraire les heures et minutes
  const hours = Math.floor(diffInMinutes / 60);
  const minutes = diffInMinutes % 60;

  return { hours, minutes };
}

function CalculateSumHours(tab) {
  let sumHours = 0;
  let sumMinutes = 0;
  let tmp;

  for (let i = 0; i < tab.length; i++) {
    sumHours += tab[i].nbHours.hours;
    sumMinutes += tab[i].nbHours.minutes;
  }
  //on calcule le nombre de minute qui restent
  tmp = sumMinutes % 60;

  //On convertit les minutes en heures
  sumHours += Math.floor(sumMinutes / 60);

  //On donne le reste des minutes à sumMinutes
  sumMinutes = tmp;

  return { sumHours, sumMinutes };
}

(function GenerateYearsForFiltering() {
  for (let i = 0; i < 10; i++) {
    const currOption = document.createElement("option");
    const optDate = CURRENT_DATE.getFullYear() - i;
    currOption.value = optDate;
    currOption.textContent = optDate;
    filterYear.appendChild(currOption);
  }
})();

function FirstLetterToUpperCase(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function CreateEl(element) {
  return document.createElement(element);
}

(function GenerateMonthsForFiltering() {
  const currDate = CURRENT_DATE;

  for (let i = 0; i < 12; i++) {
    const option = CreateEl("option");

    let stringMonth = FirstLetterToUpperCase(
      new Intl.DateTimeFormat("fr-FR", {
        month: "long",
      }).format(currDate.setMonth(i))
    );

    option.value = i;
    option.textContent = stringMonth;

    filterMonth.appendChild(option);
  }
})();
