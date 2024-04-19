// Both generateMainPage and clearForm functions use
// this element.
const generateWebPageButton = document.createElement("input");
generateWebPageButton.style.display = "none";

generateMainPage();

function generateMainPage() {

    // Create h1 banner element
    const h1Element = document.createElement("h1");
    h1Element.id = "banner";
    h1Element.textContent = "Perfectly Portioned Fitness";
    document.body.appendChild(h1Element);

    // Create h2 banner element
    const h2Element = document.createElement("h2"); 
    h2Element.textContent = "Build Your Meal Plan";
    document.body.appendChild(h2Element);

    // Create h3 banner element
    const h3Element = document.createElement("h3");
    h3Element.textContent = "\u00A9 2024 by John Harrell Rentz - WEB-115 - Section 1";
    document.body.appendChild(h3Element);
    
    // Create form element
    const formElement = document.createElement("form");
    formElement.id = "myForm";

    // Create username paragraph element    
    const usernameParagraph = document.createElement("p");
    formElement.appendChild(usernameParagraph);

    // Create label for username element
    const usernameLabel = document.createElement("label");
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Please enter your username: ";
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
    formElement.appendChild(emailParagraph);    

    // Create label for email element
    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.textContent = "Please enter a valid email: ";
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
    formElement.appendChild(weeklyGoalParagraph);   

    // Create label for weeklyGoal element
    const weeklyGoalLabel = document.createElement("label");
    weeklyGoalLabel.setAttribute("for", "email");
    weeklyGoalLabel.textContent = "Please enter your goal for this week: " ;
    weeklyGoalParagraph.appendChild(weeklyGoalLabel);

    // Create weekly goal input element
    const weeklyGoalElement = document.createElement("input");
    weeklyGoalElement.type = "textarea";
    weeklyGoalElement.value = "My goal this week is to reduce my consumption of bad fat.";
    weeklyGoalElement.style.width = "400px";
    weeklyGoalElement.id = "weeklyGoal";
    weeklyGoalParagraph.appendChild(weeklyGoalElement);

    // Append the form element to the document body
    document.body.appendChild(formElement);

    // Create button paragraph
    var buttonParagraph = document.createElement("p");
    formElement.appendChild(buttonParagraph);

    // Create clear button
    var clearButton = document.createElement("input");
    clearButton.type = "button";
    clearButton.id = "clear";
    clearButton.value = "Clear";
    buttonParagraph.appendChild(clearButton);
    clearButton.addEventListener('click', clearForm);
    if (emailElement.value === "") {
        window.alert("A valid email address is required. Please enter one.");       
    }
    
    // Create generateWebPage button
    // const generateWebPageButton = document.createElement("input");
    generateWebPageButton.type = "button";
    generateWebPageButton.id = "generateWebPage";
    generateWebPageButton.value = "Generate Web Page";
    buttonParagraph.appendChild(generateWebPageButton);
    generateWebPageButton.addEventListener('click',generatePage);

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

function generatePage() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let weeklyGoal = document.getElementById("weeklyGoal").value;

    let myText = "<html>\n<head>\n<title>Weekly Meal Plan</title>\n</head>\n<body>\n";
    myText += "<input type = 'button' id = 'print' value = 'Print or Download' onclick='window.print()'>\n" +
              "<p>Client Name: " + username + "</p>" +
              "<p>Email: " + email + "</p>" +
              "<p>Your Goal for This Week:<br>" +
              "" + weeklyGoal + "<br></p>";     
    myText += "</body>\n</html>";

    const plannerWindow = window.open('about:blank','menuWindow','width=800,height=800,left=200,top=200');
    plannerWindow.document.write(myText); 
}  

function clearForm(){
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("generateWebPage").style.display = "none";
        document.getElementById("weeklyGoal").value = ""; 
}

function validateEmail(emailStr) {
    // ChatGPT recommended the following regular expression:
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(emailStr);
}