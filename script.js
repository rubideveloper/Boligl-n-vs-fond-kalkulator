// Hent HTML-elementene ved hjelp av ID
const kjopesumInput = document.getElementById("kjopesum");
const egenkapitalInput = document.getElementById("egenkapital");
const laneBelopInput = document.getElementById("laneBelop");
const nominellRenteInput = document.getElementById("nominellRente");
const effektivRenteInput = document.getElementById("effektivRente");
const nedbetalingsTidInput = document.getElementById("nedbetalingsTid");
const betalteArInput = document.getElementById("betalteAr");
const betalteManederInput = document.getElementById("betalteManeder");
const beregnKnapp = document.getElementById("beregn");
//
//
//
//SPAN
const egenkapitalAndelSpan = document.getElementById("egenkapitalAndel");
const manedligBelopSpan = document.getElementById("manedligBelop");
const manedligBelopEtterFradragSpan = document.getElementById(
  "manedligBelopEtterFradrag"
);
const manedligAvdragBetalingSpan = document.getElementById(
  "manedligAvdragBetaling"
);
const manedligRenteBetalingSpan = document.getElementById(
  "manedligRenteBetaling"
);
const totalPrisSpan = document.getElementById("totalPris");
const totalPrisEtterFradragSpan = document.getElementById(
  "totalPrisEtterFradrag"
);
const totalRentekostnadSpan = document.getElementById("totalRenteKostnad");
const gjenverendeLanebelopSpan = document.getElementById(
  "gjenverendeLanebelop"
);
const terminerIgjenSpan = document.getElementById("terminerIgjen");
const tidIgjenSpan = document.getElementById("tidIgjen");
//
//
//
// SLIDERSPAN VERDIER
function updateSliderNedbetalingsTid(value) {
  const sliderValue = document.getElementById("sliderValueNedbetalingsTid");
  sliderValue.textContent = value;
}

function updateSliderValueBetalteAr(value) {
  const sliderValue = document.getElementById("sliderValueBetalteAr");
  sliderValue.textContent = value;
}

function updateSliderValueBetalteManeder(value) {
  const sliderValue = document.getElementById("sliderValueBetalteManeder");
  sliderValue.textContent = value;
}

beregnKnapp.addEventListener("click", () => {
  const kjopesum = kjopesumInput.value;
  const egenkapital = egenkapitalInput.value;
  const laneBelop = laneBelopInput.value;
  const effektivRente = effektivRenteInput.value;
  const nedbetalingsTid = nedbetalingsTidInput.value;
  const betalteAr = betalteArInput.value;
  const betalteManeder = betalteManederInput.value;

  const totalLanebelop = laneBelop - egenkapital;
  const antallManeder = nedbetalingsTid * 12;

  // MÅNEDLIG RENTEBETALING
  const manedRente = effektivRente / 12 / 100;
  const manedligRenteBetaling = totalLanebelop * manedRente;

  // MÅNEDLIG TOTALBELØP
  const manedligBelop =
    (totalLanebelop * manedRente * Math.pow(1 + manedRente, antallManeder)) /
    (Math.pow(1 + manedRente, antallManeder) - 1);

  // MÅNEDLIG BEKLØP ETTER FRADRAG
  const manedligBelopEtterFradrag =
    manedligBelop - (manedligRenteBetaling / 100) * 22;

  // EGENKAPITALANDEL
  const egenkapitalAndel = (egenkapital / (kjopesum + laneBelop)) * 100;

  // TOTAL RENTEKOSTNAD
  const totalRenteKostnad = manedligBelop * antallManeder - totalLanebelop;

  // MÅNEDLIG AVDRAG
  const manedligAvdrag = manedligBelop - manedligRenteBetaling;

  // TOTALPRIS
  const totalPris = manedligBelop * antallManeder;

  //TOTALPRIS ETTER FRADRAG
  const totalPrisEtterFradrag = totalPris - (totalRenteKostnad / 100) * 22;

  // GJENVERENDE LÅNEBELØP
  const gjenverendeLanebelop =
    totalPris - (betalteAr * 12 + betalteManeder) * manedligBelop;

  // ANTALL TERMINER IGJEN
  const terminerIgjen = antallManeder - betalteAr * 12 - betalteManeder;

  // TID IGJEN PÅ LÅNET
  const arIgjen = Math.floor(terminerIgjen / 12); // Antall år igjen
  const manederIgjen = terminerIgjen % 12; // Antall måneder igjen

  // Oppdater resultatene på nettsiden
  egenkapitalAndelSpan.textContent = egenkapitalAndel.toFixed(2) + "%";
  manedligBelopSpan.textContent = manedligBelop.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
  });

  manedligBelopEtterFradragSpan.textContent =
    "Månedlig beløp etter rentefradrag (22%): " +
    manedligBelopEtterFradrag.toLocaleString("nb-NO", {
      style: "currency",
      currency: "NOK",
    });

  manedligAvdragBetalingSpan.textContent = manedligAvdrag.toLocaleString(
    "nb-NO",
    {
      style: "currency",
      currency: "NOK",
    }
  );

  manedligRenteBetalingSpan.textContent = manedligRenteBetaling.toLocaleString(
    "nb-NO",
    {
      style: "currency",
      currency: "NOK",
    }
  );

  totalPrisSpan.textContent = totalPris.toLocaleString("nb-NO", {
    style: "currency",
    currency: "NOK",
  });

  totalPrisEtterFradragSpan.textContent =
    "Total lånekostnad etter rentefradrag (22%): " +
    totalPrisEtterFradrag.toLocaleString("nb-NO", {
      style: "currency",
      currency: "NOK",
    });

  totalRentekostnadSpan.textContent = totalRenteKostnad.toLocaleString(
    "nb-NO",
    {
      style: "currency",
      currency: "NOK",
    }
  );

  gjenverendeLanebelopSpan.textContent = gjenverendeLanebelop.toLocaleString(
    "nb-NO",
    {
      style: "currency",
      currency: "NOK",
    }
  );

  terminerIgjenSpan.textContent = terminerIgjen;

  tidIgjenSpan.textContent = arIgjen + " år " + manederIgjen + " måneder";
});
