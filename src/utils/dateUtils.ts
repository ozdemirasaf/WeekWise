export const getTodayDayKey = (): string => {
    const days = [
        "sundayTasks",
        "mondayTasks",
        "tuesdayTasks",
        "wednesdayTasks",
        "thursdayTasks",
        "fridayTasks",
        "saturdayTasks",
    ];
    return days[new Date().getDay()];
};
