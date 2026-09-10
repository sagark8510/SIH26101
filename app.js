// ==========================================
// SIH26101 - SkillIntelligence
// Central Application Logic
// ==========================================


// ==========================================
// 1. DEFAULT DATA
// ==========================================

const defaultUser = {
    name: "Demo Official",
    designation: "Statistical Officer",
    department: "Official Statistics",
    experience: 3,
    education: "Graduation",
    role: "Data & Statistical Analysis"
};


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


const defaultSkillGaps = [
    {
        skill: "SQL",
        current: 35,
        required: 75,
        gap: 40,
        priority: "High"
    },
    {
        skill: "Python",
        current: 65,
        required: 85,
        gap: 20,
        priority: "Medium"
    },
    {
        skill: "Data Visualization",
        current: 60,
        required: 80,
        gap: 20,
        priority: "Medium"
    }
];


const defaultRecommendations = [
    {
        title: "SQL for Data Analysis",
        type: "Course",
        priority: "High",
        skill: "SQL"
    },
    {
        title: "Advanced Python for Statistics",
        type: "Course",
        priority: "Medium",
        skill: "Python"
    },
    {
        title: "Data Visualization Fundamentals",
        type: "Learning Module",
        priority: "Medium",
        skill: "Data Visualization"
    }
];


const defaultProgress = {
    coursesCompleted: 2,
    coursesInProgress: 3,
    quizzesCompleted: 5,
    overallProgress: 58,
    averageScore: 76,
    lastQuizScore: 80
};


// ==========================================
// 2. LOCAL STORAGE FUNCTIONS
// ==========================================

function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


function getData(key, defaultValue) {

    const storedData =
        localStorage.getItem(key);

    if (storedData) {

        try {

            return JSON.parse(storedData);

        } catch (error) {

            console.log(
                "Invalid stored data:",
                key
            );

        }

    }

    saveData(key, defaultValue);

    return defaultValue;

}


// ==========================================
// 3. GETTERS
// ==========================================

function getUser() {

    return getData(
        "si_user",
        defaultUser
    );

}


function getCompetencies() {

    return getData(
        "si_competencies",
        defaultCompetencies
    );

}


function getSkillGaps() {

    return getData(
        "si_skill_gaps",
        defaultSkillGaps
    );

}


function getRecommendations() {

    return getData(
        "si_recommendations",
        defaultRecommendations
    );

}


function getProgress() {

    return getData(
        "si_progress",
        defaultProgress
    );

}


function getAssessment() {

    return getData(
        "si_assessment",
        null
    );

}


// ==========================================
// 4. INITIALIZE APPLICATION
// ==========================================

function initializeAppData() {

    getUser();

    getCompetencies();

    getSkillGaps();

    getRecommendations();

    getProgress();

    console.log(
        "SkillIntelligence initialized."
    );

}


// ==========================================
// 5. PAGE NAVIGATION
// ==========================================

function goToPage(page) {

    window.location.href = page;

}


// ==========================================
// 6. ASSESSMENT LEVEL → SCORE
// ==========================================

function levelToScore(level) {

    if (level === "beginner") {

        return 35;

    }

    if (level === "intermediate") {

        return 65;

    }

    if (level === "advanced") {

        return 85;

    }

    return 0;

}


// ==========================================
// 7. REQUIRED COMPETENCY LEVELS
// ==========================================

const requiredCompetencies = {

    "Statistics": 80,

    "Python": 85,

    "SQL": 75,

    "Data Visualization": 80

};


// ==========================================
// 8. GENERATE COMPETENCIES
// ==========================================

function generateCompetencies(assessment) {

    if (!assessment) {

        return defaultCompetencies;

    }


    const competencies = [

        {
            skill: "Statistics",
            currentLevel: assessment.statistics,
            score: levelToScore(
                assessment.statistics
            )
        },

        {
            skill: "Python",
            currentLevel: assessment.technical,
            score: levelToScore(
                assessment.technical
            )
        },

        {
            skill: "SQL",
            currentLevel: assessment.technical,
            score: levelToScore(
                assessment.technical
            )
        },

        {
            skill: "Data Visualization",
            currentLevel: assessment.governance,
            score: levelToScore(
                assessment.governance
            )
        }

    ];


    return competencies;

}


// ==========================================
// 9. GENERATE SKILL GAPS
// ==========================================

function generateSkillGaps(competencies) {

    const gaps = [];


    competencies.forEach(function (item) {

        const required =
            requiredCompetencies[item.skill]
            || 80;


        const current =
            Number(item.score);


        const gap =
            Math.max(
                0,
                required - current
            );


        let priority = "Low";


        if (gap >= 30) {

            priority = "High";

        } else if (gap >= 15) {

            priority = "Medium";

        }


        gaps.push({

            skill: item.skill,

            current: current,

            required: required,

            gap: gap,

            priority: priority

        });

    });


    return gaps;

}


// ==========================================
// 10. GENERATE RECOMMENDATIONS
// ==========================================

function generateRecommendations(gaps) {

    const recommendations = [];


    gaps
        .filter(function (item) {

            return item.gap > 0;

        })
        .sort(function (a, b) {

            return b.gap - a.gap;

        })
        .forEach(function (item) {

            let title =
                item.skill +
                " Learning Module";


            let type =
                "Learning Module";


            if (item.skill === "SQL") {

                title =
                    "SQL for Data Analysis";

                type = "Course";

            }


            if (item.skill === "Python") {

                title =
                    "Advanced Python for Statistics";

                type = "Course";

            }


            if (
                item.skill ===
                "Data Visualization"
            ) {

                title =
                    "Data Visualization Fundamentals";

            }


            if (
                item.skill ===
                "Statistics"
            ) {

                title =
                    "Statistics and Data Analysis";

                type = "Course";

            }


            recommendations.push({

                title: title,

                type: type,

                priority: item.priority,

                skill: item.skill

            });

        });


    return recommendations;

}


// ==========================================
// 11. PROCESS ASSESSMENT
// ==========================================

function processAssessment(assessment) {

    const competencies =
        generateCompetencies(
            assessment
        );


    const gaps =
        generateSkillGaps(
            competencies
        );


    const recommendations =
        generateRecommendations(
            gaps
        );


    saveData(
        "si_competencies",
        competencies
    );


    saveData(
        "si_skill_gaps",
        gaps
    );


    saveData(
        "si_recommendations",
        recommendations
    );


    return {

        competencies:
            competencies,

        gaps:
            gaps,

        recommendations:
            recommendations

    };

}


// ==========================================
// 12. UPDATE PROGRESS AFTER QUIZ
// ==========================================

function updateQuizProgress(
    score,
    total
) {

    const progress =
        getProgress();


    const percentage =
        total > 0
            ? Math.round(
                (score / total) * 100
            )
            : 0;


    progress.quizzesCompleted =
        Number(
            progress.quizzesCompleted || 0
        ) + 1;


    progress.lastQuizScore =
        percentage;


    progress.averageScore =
        Math.round(
            (
                Number(
                    progress.averageScore || 0
                )
                + percentage
            ) / 2
        );


    progress.overallProgress =
        Math.min(
            100,
            Number(
                progress.overallProgress || 0
            ) + 5
        );


    saveData(
        "si_progress",
        progress
    );


    return progress;

}


// ==========================================
// 13. UPDATE DASHBOARD DATA
// ==========================================

function getDashboardData() {

    return {

        user:
            getUser(),

        competencies:
            getCompetencies(),

        skillGaps:
            getSkillGaps(),

        recommendations:
            getRecommendations(),

        progress:
            getProgress()

    };

}


// ==========================================
// 14. PROFILE SAVE
// ==========================================

function saveProfileData(profile) {

    const user = {

        name:
            profile.name ||
            defaultUser.name,

        designation:
            profile.designation ||
            defaultUser.designation,

        department:
            profile.department ||
            defaultUser.department,

        experience:
            Number(
                profile.experience || 0
            ),

        education:
            profile.education ||
            defaultUser.education,

        role:
            profile.role ||
            defaultUser.role

    };


    saveData(
        "si_user",
        user
    );


    return user;

}


// ==========================================
// 15. APPLICATION START
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAppData();

        console.log(
            "SIH26101 application ready."
        );

    }
);
