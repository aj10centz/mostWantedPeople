"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByMultipleCriteria// TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
        displayPerson(person);
        return mainMenu(person,people); // TODO: get person's info
    case "family":
        searchForFamily(person,people);
        return mainMenu(person,People); // TODO: get person's family
    case "descendants":
        return mainMenu(person,people);// TODO: get person's descendants
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
        alert('Invalid input. Please try your selection again')
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name? (Be sure to capitalize!)", chars);
  let lastName = promptFor("What is the person's last name? (Be sure to capitalize!)", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  if(foundPerson.length == 1){
      var wantedPerson = foundPerson[0];
      return wantedPerson;
}
else{
    alert('could not fint that person. please search again, or try searching somethiong besides their name')
} 
  return app(people);
}

function searchByMultipleCriteria(people){
    let displayoption = prompt("Please select your search criteria. The search options are as follows. 'gender', 'dob','height','weight','eyecolor',and 'occupation'. Type the option you would like to select, or 'results' to see a list of people match the current criteria. otherwise type 'restart' or 'quit' ").toLowerCase();

    switch(displayOption){
        case "gender":
            let genderInput = promptFor("What is the person's gender?", chars).toLowerCase();
            var filteredPeople = searchByCriteria(people,"gender", genderInput)
            return assessSearchResults(people, filteredPeople)
        case "dob":
            let dobInput = promptFor("whats the persons Date of Birth? (format MM/DD/YYYY - Do not include 0's)",chars);
            var filteredPeople = searchByCriteria(people, "dob",dobInput)
            return assessSearchResults(people, filteredPeople)
        case "height":
            let heightInput = parseInt(promptFor("What is the person's height?(round to nearest whole number)",chars));
            var filteredPeople = searchByCriteria(people,"height",heightInput)
            return assessSearchResults(people, filteredPeople)
        case "weight":
            let weightInput = parseInt(promptFor("what is the person's weight?(round to nearestwhole number)",chars));
            var filteredPeople = searchByCriteria(people, "weight",weightInput)
            return assessSearchResults(people, filteredPeople)
        case "eyecolor":
            let eyeColorInput = promptFor("What's the person's Eyecolor?(Brown, Blue, Hazel, Green, Black)",chars).toLowerCase();
            var filteredPeople = searchByCriteria(people, "eyeColor",eyeColorInput)
            return assessSearchResults(people, filteredPeople)
        case "occupation":
            let jobInput = promptFor("What does this person do for a living?",chars);
            var filteredPeople = searchByCriteria(people,"occupation",jobInput)
            return assessSearchResults(people, filteredPeople)
        case "results":
            displayPeople(people);
            return app(people); // restart
        default:
            return mainMenu(person,people);
     }
}

function searchByCriteria(people, criteria, userInput){
    let filteredPeople = people.filter(function(person){
        if(person[criteria] === userInput){
            return true;
        }
        else{
            return false;
        }
    })
    return filteredPeople;
}
function confirmSearchResults(people, searchResults){
    if(searchResults.length == 0){
        alert("There are no matching results, Please try again.")
        return app(people)
        // no one matches
    }
    else if(searchResults.length == 1){
        var wantedPerson = searchResults[0];
        return wantedPerson;
        // book em dano, foud our person
    }
    else{
        searchByMultipleCriteria(searchResults)
    }
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
