// Sélection des éléments HTML
const calculateBtn = document.getElementById('calculate-btn');
const recalculateBtn = document.getElementById('recalculate-btn');
const resultsSection = document.getElementById('results');
const lossCarenceSpan = document.getElementById('loss-carence');
const loss90PercentSpan = document.getElementById('loss-90percent');
const totalLossSpan = document.getElementById('total-loss');
const currentLossSpan = document.getElementById('current-loss');
const prolongationLossSpan = document.getElementById('prolongation-loss');

// Variables globales pour les calculs
let dailySalary, totalLoss;

// Fonction de calcul de la perte de salaire
function calculateSalaryLoss() {
    // Récupération des valeurs du formulaire
    const salaryType = document.getElementById('salary-type').value;
    let salaryAmount = parseFloat(document.getElementById('salary-amount').value);
    const illnessDays = parseInt(document.getElementById('illness').value);

    if (isNaN(salaryAmount) || salaryAmount <= 0) {
        alert("Veuillez entrer un montant de salaire valide.");
        return;
    }

    // Si l'utilisateur a sélectionné "Salaire Brut", on le convertit en "Salaire Net"
    if (salaryType === "brut") {
        salaryAmount = salaryAmount * 0.81; // Retrait de 19% du brut
    }

    // Calcul de la perte des jours de carence (3 jours sans salaire)
    dailySalary = salaryAmount / 30; // Salaire quotidien net
    const lossCarence = dailySalary * 3; // Perte pour les 3 jours de carence

    // Calcul de la perte de 90% du salaire pour le reste des jours d'arrêt
    const remainingDays = illnessDays - 3; // Jours restants après les 3 jours de carence
    const loss90Percent = remainingDays * (dailySalary * 0.1); // Perte de 10% du salaire quotidien

    // Calcul de la perte totale sans prolongation
    totalLoss = lossCarence + loss90Percent;

    // Calcul pour le "Jour de carence actuel" : Salaire net divisé par 30 uniquement
    const currentLoss = salaryAmount / 30; // Perte de salaire pour une journée de carence

    // Affichage des résultats pour le projet du gouvernement Barnier
    lossCarenceSpan.textContent = lossCarence.toFixed(2); // Affichage avec deux décimales
    loss90PercentSpan.textContent = loss90Percent.toFixed(2);
    totalLossSpan.textContent = totalLoss.toFixed(2);

    // Affichage des résultats pour le jour de carence actuel
    currentLossSpan.textContent = currentLoss.toFixed(2);

    // Masquer le résultat de la prolongation au départ
    prolongationLossSpan.textContent = "0.00";

    // Afficher la section des résultats
    resultsSection.style.display = 'block';
}

// Fonction pour recalculer la perte avec la prolongation
function recalculateWithProlongation() {
    const prolongationDays = parseInt(document.getElementById('prolongation').value);
    const prolongationLoss = prolongationDays * (dailySalary * 0.1); // Perte de 10% du salaire quotidien pour la prolongation

    // Mettre à jour l'affichage de la perte due à la prolongation
    prolongationLossSpan.textContent = prolongationLoss.toFixed(2);

    // Recalculer le total avec la perte de la prolongation
    const newTotalLoss = totalLoss + prolongationLoss;

    // Mettre à jour l'affichage du total
    totalLossSpan.textContent = newTotalLoss.toFixed(2);
}

// Événements pour les boutons
calculateBtn.addEventListener('click', calculateSalaryLoss);
recalculateBtn.addEventListener('click', recalculateWithProlongation);



