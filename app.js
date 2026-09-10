// ==========================================
// SIH26101 - SkillIntelligence
// Common Application Logic
// ==========================================


// ------------------------------------------
// 1. DEMO USER DATA
// ------------------------------------------

const defaultUser = {
    name: "Demo Official",
    designation: "Statistical Officer",
    department: "Official Statistics",
    experience: 3,
    education: "B.Tech / Graduation"
};


// ------------------------------------------
// 2. DEMO COMPETENCY DATA
// ------------------------------------------

const defaultCompetencies = [
    {
        skill: "Statistics",
        currentLevel: "Advanced",
        score: 85
    },
    {
        skill: "Python",
        currentLevel: "Intermediate",
        score: 65
    },
    {
        skill: "SQL",
        currentLevel: "Beginner",
        score: 35
    },
    {
        skill: "Data Visualization",
        currentLevel: "Intermediate",
        score: 60
    }
];


// ------------------------------------------
// 3. DEMO SKILL-GAP DATA
// ------------------------------------------

const defaultSkillGaps = [
    {
        skill: "SQL",
        current: 35,
        required: 75,
        gap: 40
    },
    {
        skill: "Python",
        current: 65,
        required: 85,
        gap: 20
    },
    {
        skill: "Data Visualization",
        current: 60,
        required: 80,
        gap: 20
    }
];


// ------------------------------------------
// 4. DEMO LEARNING RECOMMENDATIONS
// ------------------------------------------

const defaultRecommendations = [
    {
        title: "SQL for Data Analysis",
        type: "Course",
        priority: "High"
    },
    {
        title: "Advanced Python for Statistics",
        type: "Course",
        priority: "Medium"
    },
    {
        title: "Data Visualization Fundamentals",
        type: "Learning Module",
        priority: "Medium"
    }
];


// ------------------------------------------
// 5. DEMO PROGRESS DATA
// ------------------------------------------

const defaultProgress = {
    coursesCompleted: 2,
    coursesInProgress: 3,
    quizzesCompleted: 5,
    overallProgress: 58
};


// ------------------------------------------
// 6. LOCAL STORAGE HELPERS
// ------------------------------------------

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function getData(key, defaultValue) {

    const storedData = localStorage.getItem(key);

    if (storedData) {
        return JSON.parse(storedData);
    }

    saveData(key, defaultValue);

    return defaultValue;
}


// ------------------------------------------
// 7. INITIALIZE APPLICATION DATA
// ------------------------------------------

function initializeAppData() {

    getData("si_user", defaultUser);

    getData("si_competencies", defaultCompetencies);

    getData("si_skill_gaps", defaultSkillGaps);

    getData("si_recommendations", defaultRecommendations);

    getData("si_progress", defaultProgress);
}


// ------------------------------------------
// 8. GET APPLICATION DATA
// ------------------------------------------

function getUser() {
    return getData("si_user", defaultUser);
}


function getCompetencies() {
    return getData("si_competencies", defaultCompetencies);
}


function getSkillGaps() {
    return getData("si_skill_gaps", defaultSkillGaps);
}


function getRecommendations() {
    return getData("si_recommendations", defaultRecommendations);
}


function getProgress() {
    return getData("si_progress", defaultProgress);
}


// ------------------------------------------
// 9. NAVIGATION HELPER
// ------------------------------------------

function goToPage(page) {
    window.location.href = page;
}


// ------------------------------------------
// 10. COMMON PAGE INITIALIZATION
// ------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    initializeAppData();

    console.log("SkillIntelligence application initialized.");

});
