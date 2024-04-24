// Global Constants
const generateWebPageButton = document.createElement("input");
generateWebPageButton.style.display = "none"; // default hidden
generateWebPageButton.type = "button";
generateWebPageButton.classList.add("buttonLook");

const NUM_ROWS = 6;
const NUM_COLS = 8;

const COLUMN_LABELS = ["Weekly Meals", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const ROW_LABELS = ["Weekly Meals", "Breakfast", "Snack AM", "Lunch", "Snack PM", "Dinner"];
const ITEM_TYPES = ["Healthy Protein", "Whole Grain", "Vegetable", "Fruit", "Healthy Oil", "Beverage"];

// Global Variables
let proteins = [" "]; // holds 35 protein items for weekly meal plan. 0th element is blank.
let wholeGrains = [" "]; // holds 35 whole grain items for weekly meal plan
let vegetables = [" "]; // holds 35 vegetable items for weekly meal plan
let fruits = [" "]; // holds 35 fruit items for weekly meal plan
let healthyOils = [" "]; // holds 35 healthy oil items for weekly meal plan
let beverages = [" "]; // holds 35 beverage items for weekly meal plan
let meals = [" "]; // holds 35 meals for weekly meal plan

// Create meal type selection list, e.g. breakfast, snack, etc.
const mealTypeSelect = document.createElement("select");
mealTypeSelect.id = "mealTypeSelect";
mealTypeSelect.addEventListener('change', updateCurrentItems);

// Create day selection list, e.g. Monday, Tuesday, etc.
const daySelect = document.createElement("select");
daySelect.id = "daySelect";
daySelect.addEventListener('change', updateCurrentItems);

generateMainPage();

function generateMainPage() {
    generateBanner(); // creates the banner for the webpage, including logo
    createUserInfoEntry(); // creates the user information entry section for name, email, and goal.
    createStarterMeals(); // loads default weekly meal plan
    createMealEntrySection(); // creates the meal entry section for entering meal items
    const myParagraph = document.getElementById("currentMeal"); // holds string describing current meal
    updateCurrentItems(); // loads Monday Breakfast meal       
}

// =============================================================

// This function generates the banner for the webpage, including the logo
function generateBanner() {
        let bannerDiv = document.getElementById("banner");

        // Create h1 banner element as specified
        const h1Element = document.createElement("h1"); 
        h1Element.textContent = "Build Your Meal Plan";
        bannerDiv.appendChild(h1Element);
    
        // Create h3 banner element as specified
        const h3Element = document.createElement("h3");
        h3Element.textContent = "\u00A9 2024 - John Harrell Rentz - WEB-115 - Section 1";
        bannerDiv.appendChild(h3Element);
}

// This function creates the user information entry section
// for entering username, email, and weekly goal.
function createUserInfoEntry() {

    // Create userInfoForm element
    const userInfoFormElement = document.createElement("userInfoForm");

    // Create username paragraph element    
    const usernameParagraph = document.createElement("p");
    userInfoFormElement.appendChild(usernameParagraph);

    // Create label for username element
    const usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username? ";
    usernameParagraph.appendChild(usernameLabel);

    // Create username input element
    const usernameElement = document.createElement("input");
    usernameElement.type = "text";
    usernameElement.id = "username";
    usernameElement.value = "Ima Client";
    usernameParagraph.appendChild(usernameElement);
    usernameElement.style.width = "30%";
    usernameElement.focus();
    usernameElement.addEventListener('click', selectAllText);

    // Create email paragraph element
    const emailParagraph = document.createElement("p"); 
    userInfoFormElement.appendChild(emailParagraph);    

    // Create label for email element
    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Valid Email? ";
    emailParagraph.appendChild(emailLabel);

    // Create email input element
    const emailElement = document.createElement("input");
    emailElement.type = "email";
    emailElement.id = "email";
    emailElement.value = "IClient@gmail.com";
    emailElement.style.width = "30%";
    emailElement.addEventListener('click', selectAllText);
    emailParagraph.appendChild(emailElement);

    // Create weeklyGoal paragraph element
    const weeklyGoalParagraph = document.createElement("p"); 
    userInfoFormElement.appendChild(weeklyGoalParagraph);   

    // Create label for weeklyGoal element
    const weeklyGoalLabel = document.createElement("label");
    weeklyGoalLabel.setAttribute("for", "email");
    weeklyGoalLabel.textContent = "Goal for this week? " ;
    weeklyGoalParagraph.appendChild(weeklyGoalLabel);

    // Create weekly goal input element
    const weeklyGoalElement = document.createElement("input");
    weeklyGoalElement.type = "textarea";
    weeklyGoalElement.value = "My goal this week is to reduce my consumption of bad fat.";
    weeklyGoalElement.style.width = "70%";
    weeklyGoalElement.id = "weeklyGoal";
    weeklyGoalElement.addEventListener('click', selectAllText);
    weeklyGoalParagraph.appendChild(weeklyGoalElement);

    // Append the userInfoForm element to the USER INFO ENTRY div
    userInfoEntrySection = document.getElementById("userInfoEntry");
    userInfoEntrySection.appendChild(userInfoFormElement);

    // BUTTONS
    // Create button paragraph
    var buttonParagraph = document.createElement("p");
    userInfoFormElement.appendChild(buttonParagraph);

    // [Clear] BUTTON
    var clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.id = "clear";
    clearButton.value = "Clear Data Above";
    clearButton.classList.add("buttonLook");
    buttonParagraph.appendChild(clearButton);
    clearButton.addEventListener('click', clearUserInfo);
    if (emailElement.value === "") {
        window.alert("A valid email address is required. Please enter one.");       
    }
    
    // [Generate Meal Plan] BUTTON
    generateWebPageButton.type = "button";
    generateWebPageButton.id = "generateWebPage";
    generateWebPageButton.value = "Generate Meal Plan";
    buttonParagraph.appendChild(generateWebPageButton);
    generateWebPageButton.addEventListener('click',generateUserInfoAndCurrentMenu);

    // [Clear Meal Plan] BUTTON
    const clearWeeklyMenuButton = document.createElement("input");
    clearWeeklyMenuButton.type = "button";
    clearWeeklyMenuButton.id = "clearWeeklyMenu";
    clearWeeklyMenuButton.value = "Clear Meal Plan";
    clearWeeklyMenuButton.classList.add("buttonLook");
    buttonParagraph.appendChild(clearWeeklyMenuButton);
    clearWeeklyMenuButton.addEventListener('click', clearWeeklyMenu);

    // Button for displaying webpage is only visible when a valid email exists
    generateWebPageButton.style.display = "inline";
    emailElement.addEventListener('change', function() {
        if (!(emailElement.value === "") && validateEmail(emailElement.value)) {
            generateWebPageButton.style.display = "inline";
        } else {
            generateWebPageButton.style.display = "none";
            window.alert("Email address is not valid. Please enter a valid email address.");
        }
    });
}

// This function validates an email address using a regular expression.
function validateEmail(emailStr) {
    // ChatGPT recommended the following regular expression:
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailStr);
}

// This function clears username, email, and weekly goal data entry fields.
function clearUserInfo(){
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("generateWebPage").style.display = "none";
    document.getElementById("weeklyGoal").value = ""; 
}

// =============================================================

// This function generates the user information and the current menu
// for the weekly meal plan in a new window for printing or downloading
// as a PDF.
function generateUserInfoAndCurrentMenu() {
    // get user input
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let weeklyGoal = document.getElementById("weeklyGoal").value;

    // create html for basic user info paragraphs
    let myText = "<html>\n<head>\n<title>Weekly Meal Plan</title>\n</head>\n<body>\n";
    myText += "<input type = 'button' id = 'print' value = 'Print or Download' onclick='window.print()'>\n" +
              "<p>Client Name: " + username + "</p>" +
              "<p>Email: " + email + "</p>" +
              "<p>Your Goal for This Week:<br>" +
              "" + weeklyGoal + "<br></p>";     
    
    myText += ("<table border='1'>");

    for (let i = 0; i < NUM_ROWS; i++) {
        for(let j = 0; j < NUM_COLS; j++) {
            if (i === 0 && j === 0) {
                let idStr = "row" + i;
                myText += ("<tr id='" + idStr + "'><th id=" + "item" + i + j + ">" + COLUMN_LABELS[j] + "</th>");
            } else if (i === 0) {
                let idStr = "item" + i + j;
                myText += ("<th id=" + idStr +">" + COLUMN_LABELS[j] + "</th>");  
            } else {
                if (j === 0) {
                    let idStr = "row" + i;
                    myText += ("<tr id='" + idStr + "'><th id=" + "item" + i + j + ">" + ROW_LABELS[i] + "</th>");
                } else {
                    myText += ("<td id='" + "item" + i + j +"'>" + meals[i][j] + "</td>");
                }
            } 
        }
        myText += "</tr>";
    }
    myText += "</table>";

    myText += "</body>\n</html>";

    // display myText in a new window
    const plannerWindow = window.open('about:blank','menuWindow','width=800,height=800,left=200,top=200');
    plannerWindow.document.write(myText); 
}

// =============================================================

// Menu item entry fields are created by this function.
function createMealEntrySection () {
    // Create options for meal type
    // First character acts as an index value in meals array
    const mealTypes = ["1 - Breakfast", "2 - Snack AM", "3 - Lunch", "4 - Snack PM", "5 - Dinner"];
    mealTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        mealTypeSelect.appendChild(option);
    });
    // Append the meal type selection list to the mealsDiv
    const mealSelector = document.getElementById("mealSelector");
    mealDaySelectors.appendChild(mealTypeSelect);

    // Create options for days
    // Again, first character acts as an index value in meals array.
    const days = ["1 - Monday", "2 - Tuesday", "3 - Wednesday", "4 - Thursday", "5 - Friday", "6 - Saturday", "7 - Sunday"];
    days.forEach((day) => {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    });

    // Append the day selection list to the daySelector div
    const daySelector = document.getElementById("daySelector");
    mealDaySelectors.appendChild(daySelect);

    // [Clear This Meal] button
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear This Meal";
    clearButton.classList.add("buttonLook");
    clearButton.addEventListener('click', clearCurrentMeal);
    document.getElementById("buttons").appendChild(clearButton);

    // [Add This Meal to Meal Plan] button
    const addMealButton = document.createElement("button");
    addMealButton.textContent = "Add This Meal to Meal Plan";
    addMealButton.classList.add("buttonLook");
    addMealButton.addEventListener('click', addCurrentMeal);
    document.getElementById("buttons").appendChild(addMealButton);

    // [Save This Meal] button
    const saveMealButton = document.createElement("button");
    saveMealButton.textContent = "Save This Meal";
    saveMealButton.classList.add("buttonLook");
    saveMealButton.addEventListener('click', saveCurrentMealItems);
    document.getElementById("buttons").appendChild(saveMealButton);

    // [Paste Saved Meal Below] button
    const pasteMealButton = document.createElement("button");
    pasteMealButton.textContent = "Paste Saved Meal Below";
    pasteMealButton.classList.add("buttonLook");
    pasteMealButton.addEventListener('click', pasteSavedMealItems);
    document.getElementById("buttons").appendChild(pasteMealButton);
    
    ITEM_TYPES.forEach((type) => {

        let element = document.getElementById("itemEntry");

        // Create paragraph element    
        const myParagraph = document.createElement("p");
        element.appendChild(myParagraph);

        // Create label
        const myLabel = document.createElement("label");
        myLabel.setAttribute("for", type);
        myLabel.textContent = type + "s? ";
        myParagraph.appendChild(myLabel);

        // Create input element
        const myElement = document.createElement("input");
        myElement.addEventListener('change', updateCurrentMeal);
        myElement.addEventListener('click', selectAllText);
        myElement.type = "text";
        myElement.id = type;
        myElement.style.color = "white";
        myElement.style.fontWeight = "bold";
        switch (type) {
            case "Healthy Protein":
                myElement.style.backgroundColor = "#ea7f20";
                break;
            case "Whole Grain":
                myElement.style.backgroundColor = "#a88563";
                break;
            case "Vegetable":
                myElement.style.backgroundColor = "#37b54b";
                break;
            case "Fruit":
                myElement.style.backgroundColor = "#b50a38";
                break;
            case "Healthy Oil":
                myElement.style.backgroundColor = "#ffc529";
                myElement.style.color = "black";
                break;
            case "Beverage":
                myElement.style.backgroundColor = "#3f94d1";
                break;
        }
        myElement.value = "Enter " + type + ".";
        myElement.style.width = "50%";
        myParagraph.appendChild(myElement);
    });
}

// when user clicks a text box, all text is selected automatically.
function selectAllText() {
    this.select();
}

// updates current items when the meal type or day is changed.
function updateCurrentItems() {
    clearCurrentMeal();
    let daySelector = document.getElementById("daySelect");
    dayIndex = parseInt(daySelector.value.substring(0,1));
    let mealSelector = document.getElementById("mealTypeSelect");
    mealIndex = parseInt(mealSelector.value.substring(0,1));

    document.getElementById("Healthy Protein").value = proteins[mealIndex][dayIndex];
    document.getElementById("Whole Grain").value = wholeGrains[mealIndex][dayIndex];
    document.getElementById("Vegetable").value = vegetables[mealIndex][dayIndex];
    document.getElementById("Fruit").value = fruits[mealIndex][dayIndex];
    document.getElementById("Healthy Oil").value = healthyOils[mealIndex][dayIndex];
    document.getElementById("Beverage").value = beverages[mealIndex][dayIndex];

    updateCurrentMeal();
}

// updates the current meal description as user enters meal items.
function updateCurrentMeal() {
    const myParagraph = document.getElementById("currentMeal");
    let myMeal = "";
    ITEM_TYPES.forEach((type) => {
        myValue = document.getElementById(type).value;
        if (myValue.substring(0, 5) === "Enter") {
            myValue = "";
        } else {
            myValue = myValue + ", ";
        }
        myMeal += myValue;
    });
    myParagraph.textContent = "This Meal: " + myMeal.substring(0, myMeal.length - 2);
}

// clears the current meal entry fields.
function clearCurrentMeal() {
    ITEM_TYPES.forEach((type) => {
        document.getElementById(type).value = "Enter " + type + ".";
    });
    updateCurrentMeal();
}

// adds the current meal to the weekly meal plan.
function addCurrentMeal() {
    const myParagraph = document.getElementById("currentMeal")
    // Get the index of the meal type and day
    meal = parseInt(mealTypeSelect.value.substring(0,1));
    day = parseInt(daySelect.value.substring(0,1));
    // Remove "This Meal: " from the beginning of the text
    meals[meal][day] = myParagraph.textContent.substring(11);
}

// resets the weekly meal plan to empty.
function clearWeeklyMenu() {

    for(let i = 1; i < NUM_ROWS; i++) {
        proteins[i] = [" "];
        wholeGrains[i] = [" "];
        vegetables[i] = [" "];
        fruits[i] = [" "];
        healthyOils[i] = [" "];
        beverages[i] = [" "];
        meals[i] = [" "];
        for(let j = 1; j < NUM_COLS; j++) {
            meals[i][j] = " ";
        }
    }   
}

// Global variables for saving and pasting meal items
let proteinItems = "";
let wholeGrainItems = "";
let vegetableItems = "";
let fruitItems = "";
let healthyOilItems = "";
let beverageItems = "";

// saves the items in the current meal
function saveCurrentMealItems() {
    proteinItems = document.getElementById("Healthy Protein").value;
    wholeGrainItems = document.getElementById("Whole Grain").value;
    vegetableItems = document.getElementById("Vegetable").value;
    fruitItems = document.getElementById("Fruit").value;
    healthyOilItems = document.getElementById("Healthy Oil").value;
    beverageItems = document.getElementById("Beverage").value;
    window.alert("Meal saved!\n" +
                 "You may paste to different day or meal\n" + 
                 "using selectors.\n\n" +
                 "Protein: " + proteinItems + 
                 "\nWhole Grain: " + wholeGrainItems + 
                 "\nVegetable: " + vegetableItems + 
                 "\nFruit: " + fruitItems + 
                 "\nHealthy Oil: " + healthyOilItems + 
                 "\nBeverage: " + beverageItems);
}

// pastes the saved meal items into current day and meal
function pasteSavedMealItems() {

    // Get the index of the meal type and day
    meal = parseInt(mealTypeSelect.value.substring(0,1));
    day = parseInt(daySelect.value.substring(0,1));

    proteins[meal][day] = proteinItems;
    wholeGrains[meal][day] = wholeGrainItems;
    vegetables[meal][day] = vegetableItems;
    fruits[meal][day] = fruitItems;
    healthyOils[meal][day] = healthyOilItems;
    beverages[meal][day] = beverageItems;

    updateCurrentItems();
    window.alert("Don't forget! \n\n" +
                 "[Add This Meal to Meal Plan]\n" +
                 "must be clicked to add to weekly Meal Plan.");
}

// ============================================================

// This function creates a default weekly meal plan.
function createStarterMeals() {
    // Meals below are arranged in row order, left to right, top to bottom,
    // starting with Monday Breakfast and ending with Sunday Dinner.
    // One row holds one meal or snack, stored as separate types of items.
    // Types include proteins, whole grains, vegetables, fruits, healthy oils, and beverages.
    const STARTER_MEAL_PLAN = [
        "Enter proteins.", "whole wheat toast", "Enter vegetables.", "banana", "Enter healthy oils.", "orange juice, milk,tea",
        "turkey bacon", "oatmeal", "Enter vegetables.", "apple", "Enter healthy oils.", "coffee",
        "Enter proteins.", "Cheerios", "Enter vegetables.", "banana", "Enter healthy oils.", "milk, orange juice, coffee",
        "scrambled eggs, turkey bacon", "whole-wheat toast", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "milk, tea",
        "Canadian bacon, scrambled eggs", "English muffin", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "milk, coffee",
        "yogurt", "granola", "Enter vegetables.", "fruit salad", "Enter healthy oils.", "milk, tea",
        "turkey sausage", "pancakes", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "orange juice, coffee",
        "cheese", "crackers", "apple", "Enter fruits.", "Enter healthy oils.", "water",
        "Enter proteins.", "popcorn", "Enter vegetables.", "apple", "Enter healthy oils.", "water",
        "mixed nuts, cheese", "Enter whole grains.", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water",
        "Enter proteins.", "Enter whole grains.", "pear", "Enter fruits.", "Enter healthy oils.", "water",
        "Enter proteins.", "Enter whole grains.", "Enter vegetables.", "banana", "Enter healthy oils.", "water",
        "Enter proteins.", "whole-wheat bread", "Enter vegetables.", "Enter fruits.", "olive oil", "Enter beverages.",
        "Enter proteins.", "Enter whole grains.", "Enter vegetables.", "kiwi fruit", "Enter healthy oils.", "water",
        "roast beef", "whole wheat bread", "lettuce, tomato, potato chips", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "chicken salad", "whole wheat roll", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "tuna salad", "whole wheat roll", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "hamburger", "Enter whole grains.", "lettuce, tomato, potato salad", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "hot dog", "Enter whole grains.", "coleslaw, French fries", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "barbecue chicken", "Enter whole grains.", "corn on the cob", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "fish sticks", "whole wheat bread", "lettuce, tomato, potato chips", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "Enter proteins.", "Enter whole grains.", "Enter vegetables.", "pear", "Enter healthy oils.", "water",
        "Enter proteins.", "Enter whole grains.", "Enter vegetables.", "banana", "Enter healthy oils.", "water",
        "Enter proteins.", "popcorn", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water",
        "mixed nuts, cheese", "Enter whole grains.", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water",
        "cheese", "crackers", "Enter vegetables.", "Enter fruits.", "Enter healthy oils.", "water",
        "Enter proteins.", "Enter whole grains.", "Enter vegetables.", "banana", "Enter healthy oils.", "water",
        "cheese", "Enter whole grains.", "Enter vegetables.", "apple", "Enter healthy oils.", "water",
        "boiled shrimp, turkey sausage", "Enter whole grains.", "corn on the cob, green beans", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "Enter proteins.", "garlic bread", "vegetable lasagna, tossed salad", "Enter fruits.", "olive oil", "water, iced tea",
        "moussaka", "Enter whole grains.", "Greek salad, stuffed grape leaves", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "meat loaf", "Enter whole grains.", "mashed potatoes, green beans", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "roasted chicken", "stuffing", "green beans", "cranberry sauce", "Enter healthy oils.", "water, iced tea",
        "stir-fry beef", "brown rice", "broccoli", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
        "baked salmon", "Enter whole grains.", "mashed potatoes, tossed salad", "Enter fruits.", "Enter healthy oils.", "water, iced tea",
    ]
    let itemIndex = 0;
    // the following nested loop creates arrays for each type of food 
    // that acts like a 2D array of meal items
    for(let i = 1; i < NUM_ROWS; i++) {
        proteins[i] = [" "];
        wholeGrains[i] = [" "];
        vegetables[i] = [" "];
        fruits[i] = [" "];
        healthyOils[i] = [" "];
        beverages[i] = [" "];
        meals[i] = [" "];
        for(let j = 1; j < NUM_COLS; j++) {
            proteins[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;
            wholeGrains[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;
            vegetables[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;
            fruits[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;
            healthyOils[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;   
            beverages[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;

            // "Enter ..." indicates a missing type of food in that meal.
            // When the meal description is created, the missing type is omitted.
            meals[i][j] = "";
            if(proteins[i][j] !== "Enter proteins.") {
                meals[i][j] += proteins[i][j] + ", ";
            }
            if(wholeGrains[i][j] !== "Enter whole grains.") {
                meals[i][j] += wholeGrains[i][j] + ", ";
            }
            if(vegetables[i][j] !== "Enter vegetables.") {
                meals[i][j] += vegetables[i][j] + ", ";
            }
            if(fruits[i][j] !== "Enter fruits.") {
                meals[i][j] += fruits[i][j] + ", ";
            }   
            if(healthyOils[i][j] !== "Enter healthy oils.") {
                meals[i][j] += healthyOils[i][j] + ", ";
            }
            if(beverages[i][j] !== "Enter beverages.") {
                meals[i][j] += beverages[i][j];
            } 
            // Remove a trailing comma and space from the end of the meal description
            // as necessary.
            if(meals[i][j].substring(meals[i][j].length - 2) === ", ") {
                meals[i][j] = meals[i][j].substring(0, meals[i][j].length - 2);
            }
        } 
    }
}