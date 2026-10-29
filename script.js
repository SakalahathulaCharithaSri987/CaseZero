
    const startButton = document.getElementById("start-button");
    const gameMessage = document.getElementById("game-message");
    const landingPage = document.querySelector(".landing-page");
    const caseScreen = document.getElementById("case-screen");

    startButton.addEventListener("click", function () {
        gameMessage.hidden = true;
        landingPage.querySelector(".hero").hidden = true;
        caseScreen.hidden = false;

        caseScreen.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });


    const examineButton = document.getElementById("examine-button");
    const evidenceArea = document.getElementById("evidence-area");
    const progressPercentage = document.getElementById("progress-percentage");
const progressFill = document.getElementById("progress-fill");
const progressTrack = document.getElementById("progress-track");
const progressMessage = document.getElementById("progress-message");

function updateProgress(percentage, message) {
    progressPercentage.textContent = percentage + "%";
    progressFill.style.width = percentage + "%";
    progressTrack.setAttribute("aria-valuenow", percentage);
    progressMessage.textContent = message;
}

    examineButton.addEventListener("click", function () {
        evidenceArea.hidden = false;
        examineButton.textContent = "CRIME SCENE EXAMINED";
        examineButton.disabled = true;
        updateProgress(25, "CRIME SCENE EXAMINED — INVESTIGATION UNDERWAY");

        evidenceArea.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });


    const adrianButton = document.querySelector('[data-suspect="adrian"]');
    const adrianInterview = document.getElementById("adrian-interview");

    adrianButton.addEventListener("click", function () {
        adrianInterview.hidden = false;
        updateProgress(50, "FIRST SUSPECT INTERROGATED");

        adrianInterview.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        adrianButton.querySelector(".suspect-action").textContent =
            "STATEMENT RECORDED ✓";
            adrianButton.disabled = true;
    });


    const miraButton = document.querySelector('[data-suspect="mira"]');
    const miraInterview = document.getElementById("mira-interview");

    miraButton.addEventListener("click", function () {
        miraInterview.hidden = false;
        updateProgress(65, "SECOND SUSPECT INTERROGATED");

        miraInterview.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        miraButton.querySelector(".suspect-action").textContent =
            "STATEMENT RECORDED ✓";
            miraButton.disabled = true;
    });


    const danielButton = document.querySelector('[data-suspect="daniel"]');
    const danielInterview = document.getElementById("daniel-interview");

    danielButton.addEventListener("click", function () {
        danielInterview.hidden = false;
        updateProgress(80, "ALL THREE SUSPECTS INTERROGATED");

        danielInterview.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        danielButton.querySelector(".suspect-action").textContent =
            "STATEMENT RECORDED ✓";
            danielButton.disabled = true;
    });

    
const detectiveNotes = document.getElementById("detective-notes");
const notesStatus = document.getElementById("notes-status");

const savedNotes = localStorage.getItem("casezero-detective-notes");

if (savedNotes !== null) {
    detectiveNotes.value = savedNotes;
}

detectiveNotes.addEventListener("input", function () {
    localStorage.setItem("casezero-detective-notes", detectiveNotes.value);
    notesStatus.textContent = "NOTES SAVED AUTOMATICALLY ✓";
});

const solveCaseButton = document.getElementById("solve-case-button");
const caseSolution = document.getElementById("case-solution");

solveCaseButton.addEventListener("click", function () {
    caseSolution.hidden = false;

    caseSolution.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

const suspectChoices = document.querySelectorAll(".suspect-choice");
const deductionMessage = document.getElementById("deduction-message");
let selectedCulprit = "";

suspectChoices.forEach(function (choice) {
    choice.addEventListener("click", function () {
        const selectedSuspect = choice.textContent.trim();
        selectedCulprit = choice.dataset.culprit;
        suspectChoices.forEach(function (suspect) {
    suspect.classList.remove("selected");
});

choice.classList.add("selected");
deductionMessage.textContent = "";
confirmAccusationButton.disabled = false;
caseOutcome.hidden = true;

        deductionMessage.hidden = false;
        deductionMessage.textContent =
            "You selected " + selectedSuspect + ". Review the evidence before making your final accusation.";
            document.getElementById("confirm-accusation-button").disabled = false;
    });
});

const confirmAccusationButton = document.getElementById("confirm-accusation-button");

confirmAccusationButton.addEventListener("click", function () {
    if (selectedCulprit === "") {
        return;
    }

    updateProgress(100, "FINAL ACCUSATION SUBMITTED");
    deductionMessage.hidden = false;
    deductionMessage.textContent =
        "Your final accusation is " +
        selectedCulprit.toUpperCase() +
        ". The case outcome will be revealed soon.";

    confirmAccusationButton.textContent = "ACCUSATION SUBMITTED ✓";
    confirmAccusationButton.disabled = selectedCulprit === "adrian";
    const caseOutcome = document.getElementById("case-outcome");
const outcomeTitle = document.getElementById("outcome-title");
const outcomeDescription = document.getElementById("outcome-description");

caseOutcome.hidden = false;
const caseSummary = document.getElementById("case-summary");
const interrogatedCount = [
    adrianInterview,
    miraInterview,
    danielInterview
].filter(function (interview) {
    return !interview.hidden;
}).length;

caseSummary.hidden = false;
caseSummary.textContent =
    "INVESTIGATION SUMMARY: You accused " +
    document.querySelector(
        '[data-culprit="' + selectedCulprit + '"]'
    ).textContent.trim() +
    ". Suspects interrogated: " + interrogatedCount +
    " out of 3. Review the timeline, suspect statements, and physical evidence before drawing your final conclusions.";
const accusedSuspectName = document.querySelector(
    '[data-culprit="' + selectedCulprit + '"]'
).textContent.trim();

outcomeTitle.textContent =
    (selectedCulprit === "adrian" ? "CASE SOLVED" : "CASE UNRESOLVED")
    + " — " + accusedSuspectName;
if (selectedCulprit === "adrian") {
    outcomeTitle.textContent = "CASE SOLVED";
    outcomeDescription.textContent =
    "Adrian had a financial dispute with the journalist's company. Mira's report of an argument at 11:20 PM conflicts with Adrian's claim that he left at 10:30 PM. Daniel also revealed that the journalist planned to publish a sensitive document. These details give Adrian a possible motive and make his timeline suspicious, but the footprint and broken watch still leave unanswered questions.";
} else {
    outcomeTitle.textContent = "CASE UNRESOLVED";
    outcomeDescription.textContent =
       "Your accusation does not match the intended solution. Adrian's claimed departure at 10:30 PM conflicts with Mira's report of an argument at 11:20 PM. Daniel also mentioned a sensitive document the journalist planned to publish. Review these clues and consider who had a possible motive before making another accusation.";
}
caseOutcome.scrollIntoView({
    behavior: "smooth",
    block: "center"
});
});

const playAgainButton = document.getElementById("play-again-button");

playAgainButton.addEventListener("click", function () {
    window.location.reload();
});