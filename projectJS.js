// Global Constants
const generateWebPageButton = document.createElement("input");
generateWebPageButton.style.display = "none";

const columnLabels = ["Weekly Meals", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const rowLabels = ["Weekly Meals", "Breakfast", "Snack AM", "Lunch", "Snack PM", "Dinner"];
    
generateMainPage();

function generateMainPage() {

    // BANNER
    // Create h1 banner element
    const h1Element = document.createElement("h1");
    h1Element.id = "banner";
    h1Element.textContent = "Perfectly Portioned Fitness";
    let bannerDiv = document.getElementById("banner");
    bannerDiv.appendChild(h1Element);

    // Create h2 banner element
    const h2Element = document.createElement("h2"); 
    h2Element.textContent = "Build Your Meal Plan";
    bannerDiv.appendChild(h2Element);

    // Create h3 banner element
    const h3Element = document.createElement("h3");
    h3Element.textContent = "John Harrell Rentz - WEB-115 - Section 1";
    bannerDiv.appendChild(h3Element);
    
    // USER INFO ENTRY
    // Create userInfoForm element
    const userInfoFormElement = document.createElement("userInfouserInfouserInfoForm");

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
    userInfoEntryDiv = document.getElementById("userInfoEntry");
    userInfoEntryDiv.appendChild(userInfoFormElement);

    // Create button paragraph
    var buttonParagraph = document.createElement("p");
    userInfoFormElement.appendChild(buttonParagraph);

    // Create clear button
    var clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.id = "clear";
    clearButton.value = "Clear";
    buttonParagraph.appendChild(clearButton);
    clearButton.addEventListener('click', clearuserInfouserInfoForm);
    if (emailElement.value === "") {
        window.alert("A valid email address is required. Please enter one.");       
    }
    
    // Create generateWebPage button
    generateWebPageButton.type = "button";
    generateWebPageButton.id = "generateWebPage";
    generateWebPageButton.value = "Generate Current Meal Plan";
    buttonParagraph.appendChild(generateWebPageButton);
    generateWebPageButton.addEventListener('click',generateUserInfoAndDefaultMenu);

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

    createMeal();
}

<!-- ============================= -->

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
    
    // create html for table entry of meals
    let meals = createStarterMeals();
    
    myText += ("<table border='1'>");
    const NUM_ROWS = 6;
    const NUM_COLS = 8;
    for (let i = 0; i < NUM_ROWS; i++) {
        for(let j = 0; j < NUM_COLS; j++) {
            if (i === 0 && j === 0) {
                let idStr = "row" + i;
                myText += ("<tr id='" + idStr + "'><th id=" + "item" + i + j + ">" + columnLabels[j] + "</th>");
            } else if (i === 0) {
                let idStr = "item" + i + j;
                myText += ("<th id=" + idStr +">" + columnLabels[j] + "</th>");  
            } else {
                if (j === 0) {
                    let idStr = "row" + i;
                    console.log(rowLabels[i]);
                    myText += ("<tr id='" + idStr + "'><th id=" + "item" + i + j + ">" + rowLabels[i] + "</th>");
                } else {
                    myText += ("<td id='" + "item" + i + j +"'>" + (meals[i])[j] + "</td>");
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

// This function clears username, email, and weekly goal data entry fields.
function clearuserInfouserInfoForm(){
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("generateWebPage").style.display = "none";
        document.getElementById("weeklyGoal").value = ""; 
}

// This function validates an email address using a regular expression.
function validateEmail(emailStr) {
    // ChatGPT recommended the following regular expression:
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailStr);
}

// This function creates a default weekly meal plan.
function createStarterMeals() {
    // Meals below are arranged in row order, left to right, top to bottom,
    // starting with Monday Breakfast and ending with Sunday Dinner.
    const STARTER_MEAL_PLAN = [
        "whole-wheat toast and honey, banana, orange juice, milk, tea",
        "apple, oatmeal and maple syrup, turkey bacon, coffee",
        "Cheerios, milk, banana, orange juice, coffee",
        "scrambled eggs, turkey bacon, whole-wheat toast, milk, tea",
        "English muffin, Canadian bacon, scrambled eggs, milk, coffee", 
        "fruit salad, yogurt, granola, milk, tea",
        "pancakes, maple syrup, turkey sausage, orange juice, coffee",
        "apple, cheese, crackers, water",
        "popcorn, apple, water",
        "mixed nuts, cheese, water",
        "pear, water",
        "banana, water",
        "whole-wheat bread and olive oil",
        "kiwi fruit, water",
        "roast beef sandwich, lettuce, tomato potato chips, water, iced tea",
        "chicken salad, whole-wheat roll, water, iced tea",
        "tuna salad, whole-wheat roll, water, iced tea",
        "hamburger, lettuce, tomato, potato salad, water, iced tea",
        "hot dog, coleslaw, French fries, water, iced tea",
        "barbecue chicken, corn on the cob, water, iced tea",
        "fish sandwich, lettuce, tomato, potato chips, water, iced tea",
        "pear, water",
        "banana, water",
        "popcorn, water",
        "mixed nuts, cheese, water",
        "cheese, crackers, water",
        "banana, water",
        "apple, cheese, water",
        "boiled shrimp, turkey sausage, corn on the cob, green beans, water, iced tea",
        "vegetable lasagna, garlic bread, olive oil, tossed salad, water, iced tea",
        "moussaka, Greek salad, stuffed dolmades, water, iced tea",
        "meat loaf, mashed potatoes, green beans, water, iced tea",
        "roasted chicken, stuffing, cranberry sauce, green beans, water, iced tea",
        "stir-fry beef, rice, broccoli, water, iced tea",
        "baked salmon, mashed potatoes, tossed salad, water, iced tea"
    ]
    let itemIndex = 0;
    // the following nested loop creates "meals array" 
    // that acts like a 2D array of meals
    const meals = [];
    for(let i = 1; i < 6; i++) {
        meals[i] = [];
        for(let j = 1; j < 8; j++) {
            meals[i][j] = STARTER_MEAL_PLAN[itemIndex];
            itemIndex++;
        }
    }   
    return meals;
}

    // MENU ITEMS ENTRY

function createMeal () {
        // Create meal type selection list
        const mealTypeSelect = document.createElement("select");
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
        mealSelector.appendChild(mealTypeSelect);

        // Create day selection list
        const daySelect = document.createElement("select");
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
        daySelector.appendChild(daySelect);

        const itemTypes = ["Healthy Protein", "Whole Grain", "Vegetable", "Fruit", "Healthy Oil", "Beverage"];
        
        itemTypes.forEach((type) => {

            let element = document.getElementById("itemEntry");

            // Create paragraph element    
            const myParagraph = document.createElement("p");
            element.appendChild(myParagraph);

            // Create label
            const myLabel = document.createElement("label");
            myLabel.setAttribute("for", type);
            myLabel.textContent = type + "(s)? ";
            myParagraph.appendChild(myLabel);

            // Create input element
            const myElement = document.createElement("input");
            myElement.addEventListener('change', updateMenu);
            myElement.type = "text";
            myElement.id = type;
            myElement.value = "Enter " + type + "(s) here.";
            myElement.style.width = "300px";
            myParagraph.appendChild(myElement);
        });
        console.log(daySelect.value);
        console.log(mealTypeSelect.value);

        // Create current meal output
        const currentMealElement = document.getElementById("currentMeal");   
        const myParagraph = document.createElement("p");
        currentMealElement.appendChild(myParagraph); 
}

function updateMenu() {
    const myParagraph = document.getElementById("currentMeal");
    myMeal = "Current Meal: ";
    itemTypes.forEach((type) => {
        myMeal += document.getElementById(type).value + ", ";
    });
    myParagraph.textContent = "Current Meal: " + myMeal;
}