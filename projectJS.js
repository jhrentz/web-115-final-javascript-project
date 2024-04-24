// Global Constants
const generateWebPageButton = document.createElement("input");
generateWebPageButton.style.display = "none"; // default hidden

const NUM_ROWS = 6;
const NUM_COLS = 8;

const COLUMN_LABELS = ["Weekly Meals", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const ROW_LABELS = ["Weekly Meals", "Breakfast", "Snack AM", "Lunch", "Snack PM", "Dinner"];
const ITEM_TYPES = ["Healthy Protein", "Whole Grain", "Vegetable", "Fruit", "Healthy Oil", "Beverage"];

let proteins = [" "]; // holds 35 protein items for weekly meal plan. 0th element is blank.
let wholeGrains = [" "]; // holds 35 whole grain items for weekly meal plan
let vegetables = [" "]; // holds 35 vegetable items for weekly meal plan
let fruits = [" "]; // holds 35 fruit items for weekly meal plan
let healthyOils = [" "]; // holds 35 healthy oil items for weekly meal plan
let beverages = [" "]; // holds 35 beverage items for weekly meal plan
let meals = [" "]; // holds 35 meals for weekly meal plan

// Create meal type selection list
const mealTypeSelect = document.createElement("select");

// Create day selection list
const daySelect = document.createElement("select");

generateMainPage();

function generateMainPage() {

    generateBanner();
    createUserInfoEntry();
    createStarterMeals();
    createMealEntrySection();
    const myParagraph = document.getElementById("currentMeal");
    myParagraph.textContent = "Current Meal:"; 
    getCurrentItemTypes();   
       
}

/** ============================================================= */

function generateBanner() {

        let bannerDiv = document.getElementById("banner");

        // Create h1 banner element
        const h1Element = document.createElement("h1"); 
        h1Element.textContent = "Build Your Meal Plan";
        bannerDiv.appendChild(h1Element);
    
        // Create h3 banner element
        const h3Element = document.createElement("h3");
        h3Element.textContent = "\u00A9 2024 - John Harrell Rentz - WEB-115 - Section 1";
        bannerDiv.appendChild(h3Element);
}

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
    usernameElement.focus();

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
    emailElement.style.width = "250px";
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
    weeklyGoalElement.style.width = "400px";
    weeklyGoalElement.id = "weeklyGoal";
    weeklyGoalParagraph.appendChild(weeklyGoalElement);

    // Append the userInfoForm element to the USER INFO ENTRY div
    userInfoEntrySection = document.getElementById("userInfoEntry");
    userInfoEntrySection.appendChild(userInfoFormElement);

     // Create button paragraph
     var buttonParagraph = document.createElement("p");
     userInfoFormElement.appendChild(buttonParagraph);
 
     // Create clear button
     var clearButton = document.createElement("input");
     clearButton.type = "button";
     clearButton.id = "clear";
     clearButton.value = "Clear Data Above";
     buttonParagraph.appendChild(clearButton);
     clearButton.addEventListener('click', clearUserInfo);
     if (emailElement.value === "") {
         window.alert("A valid email address is required. Please enter one.");       
     }
     
     // Create generateWebPage button
     generateWebPageButton.type = "button";
     generateWebPageButton.id = "generateWebPage";
     generateWebPageButton.value = "Generate Current Meal Plan";
     buttonParagraph.appendChild(generateWebPageButton);
     generateWebPageButton.addEventListener('click',generateUserInfoAndDefaultMenu);
 
     // Clear weekly menu button
    const clearWeeklyMenuButton = document.createElement("input");
    clearWeeklyMenuButton.type = "button";
    clearWeeklyMenuButton.id = "clearWeeklyMenu";
    clearWeeklyMenuButton.value = "Clear Weekly Menu";
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

function generateUserInfoAndDefaultMenu() {
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

// This function creates a default weekly meal plan.
function createStarterMeals() {
    // Meals below are arranged in row order, left to right, top to bottom,
    // starting with Monday Breakfast and ending with Sunday Dinner.
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
    // the following nested loop creates "meal items array" 
    // that acts like a 2D array of meals
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
            if(meals[i][j].substring(meals[i][j].length - 1) === ", ") {
                meals[i][j] = meals[i][j].substring(0, meals[i][j].length - 1);
            }
        } 
    }
}

// MENU ITEMS ENTRY
function createMealEntrySection () {
        // Create options for meal type
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

        // add [Clear Current Meal] button
        const clearButton = document.createElement("button");
        clearButton.textContent = "Clear Current Meal";
        clearButton.addEventListener('click', clearCurrentMeal);
        document.getElementById("buttons").appendChild(clearButton);

        // add [Add Current Meal to Weekly Menu] button
        const addMealButton = document.createElement("button");
        addMealButton.textContent = "Add Current Meal to Weekly Menu";
        addMealButton.addEventListener('click', addCurrentMeal);
        document.getElementById("buttons").appendChild(addMealButton);
        
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
            myElement.type = "text";
            myElement.id = type;
            switch (type) {
                case "Healthy Protein":
                    myElement.style.backgroundColor = "orange";
                    break;
                case "Whole Grain":
                    myElement.style.backgroundColor = "#a98d8d";
                    break;
                case "Vegetable":
                    myElement.style.backgroundColor = "rgba(128, 197, 24, 0.838)";
                    break;
                case "Fruit":
                    myElement.style.backgroundColor = "red";
                    break;
                case "Healthy Oil":
                    myElement.style.backgroundColor = "yellow";
                    break;
                case "Beverage":
                    myElement.style.backgroundColor = "cornflowerblue";
                    break;
            }
            myElement.value = "Enter " + type + ".";
            myElement.style.width = "300px";
            myParagraph.appendChild(myElement);
        });

        mealTypeIndex = parseInt(mealTypeSelect.value.substring(0, 1));
        dayIndex = parseInt(daySelect.value.substring(0, 1));

        // Create current meal output
        const currentMealElement = document.getElementById("currentMeal");   
        const myParagraph = document.createElement("p");
        currentMealElement.appendChild(myParagraph); 
}

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
    myParagraph.textContent = "Current Meal: " + myMeal.substring(0, myMeal.length - 2);
}

function clearCurrentMeal() {
    ITEM_TYPES.forEach((type) => {
        document.getElementById(type).value = "Enter " + type + ".";
    });
    updateCurrentMeal();
}

function addCurrentMeal() {
    const myParagraph = document.getElementById("currentMeal")
    meal = parseInt(mealTypeSelect.value.substring(0,1));
    day = parseInt(daySelect.value.substring(0,1));
    meals[meal][day] = myParagraph.textContent.substring(13);
}

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

function getCurrentItemTypes() {
    let myData = [];
    myData.push(mealTypeSelect.textContent);
    myData.push(daySelect.textContent);
    ITEM_TYPES.forEach((type) => {
        myData.push(document.getElementById(type).value);
    });
    myData.push(document.getElementById("currentMeal").textContent);
}