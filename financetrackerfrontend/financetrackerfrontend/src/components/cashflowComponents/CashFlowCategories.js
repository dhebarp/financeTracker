export function ShowInputLists(monthsList, categoryList) {

const months = [
    "Janurary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const categories = [
    "Food",
    "Entertainment", 
    "Travel",
    "Utilities",
    "Repayments",
    "Medical",
    "Misc",
    "Shopping",
    "Housing",
    "Pets",
    "Holidays"
];

const renderMonthsList = months.values();
const renderCategoryList = categories.values();

return(renderMonthsList, renderCategoryList);
}

