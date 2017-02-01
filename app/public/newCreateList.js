var currentUser = '';
var email = '';
$(document).ready(function () {
    //User Sign Out =================
    $('#btnLogOut').on('click', function () {
        firebase.auth().signOut();
    });
    /*------------------------------------------------
    To edit your form heading
    -------------------------------------------------*/
    $("#yourtitle").click(function () {
        //hides the div with Checklist Tile information
        $("#your").hide();
        var createhead = $(document.createElement('div'));
        //creates a div with id ='your1' which holds label and input and button below
        createhead.attr("id", "your1");
        createhead.html('<label id="titleid">' + '<b>Title : </b>' + '</label>' + '<br/>' + '<input id="inputhead" "type=text placeholder="Type Checklist Name!"/>' + '<button id="doneid">Done</button>');
        //appends everything created above to yourhead div
        $("#yourhead").append(createhead);
        //on click of done	
        $("#doneid").click(function () {
            var get = $("#inputhead").val().trim();
            if (get === 0) {
                alert("Cannot Leave Field Blank");
            } else {
                //change tile html to value entered on form
                $("#yourtitle").html('<h1>' + get + '</h1>');
                //adding css to title input from form
                $("#yourtitle").css({
                    "text-align": "center",
                    "font-size": "25px",
                    "color": "white",
                    "cursor": "pointer"
                });
                //apply css and show the div with the now changed html in it And hide input div
                $("#your").css({
                    "background-color": "#F4D4FA",
                    "width": "530px"
                });
                $('#your1').remove();
                $("#justclickid").css({
                    'padding-top': '10px'
                });
                $("#your").show();
            }
        });
    });
    /*----------------------------------------------------------------------------------------------------*/
    var MaxInputs = 100; //Maximum input boxes allowed
    var InputsWrapper = $("#InputsWrapper"); //Input box wrapper ID holds all dynamically created inputs
    var x = InputsWrapper.length; //Initial field count
    var nameFieldCount = 0;
    /*------------------
    to get fields button ID from left panel
    ------------------*/
    var section = $(".section");
    $(InputsWrapper).sortable(); // to make added fields sortable
    /*------------------------------------------------
    To add Name field 
    -------------------------------------------------*/
    $(section).click(function () {
        // Check to see if  field has been clicked max number of times
        if (x <= MaxInputs) {
            var buttonName = $(this).text();
            console.log(buttonName);
            if (buttonName === "Create New Section") {
                return alert('For Premium Users Only!');
            }
            //adds a div inside the input wrapper and adds a unique id from the field count
            $(InputsWrapper).append('<div class="clickSection">' + '<div id="' + buttonName + '">' + '<div>' + '<h1>' + buttonName + '</h1><input type="text" name="mytext[]" id="field_' + nameFieldCount + '" class = "item' + buttonName + ' "placeholder="Enter Item"/>' + '<button class="removeclass0">x</button>' + '<button class="addclass0">+</button>' + '<br>' + '</div>' + '</div>' + '</div>');
            //increments input wrapper length
            x++;
        }
        return false;
    });
    //listens on input wrapper for remove class
    $(InputsWrapper).on("click", ".removeclass0", function () { //to remove name field
        $(this).parent('div').remove();
        x--;
        return false;
    });
    $(InputsWrapper).on("click", ".addclass0", function () { //to add more name fields 
        nameFieldCount++;
        var itemName = $(this).parent().parent().attr('id');
        console.log(itemName);
        $(this).parent().parent().append('<div id="InputsWrapper_0' + nameFieldCount + '"><input type="text" name="mytext[]" id="field_' + nameFieldCount + '" class="item' + itemName + ' "placeholder="Enter Item"/>' + '<button class="removeclass0">x</button>' + '<button class="addclass0">+</button>' + '<br>' + '</div>');
        x++;
        return false;
    });
    $("#reset").on("click", function () { //to reset all elements
        $("#InputsWrapper").empty();
    });
    //==========================================================
    var config = {
        apiKey: "AIzaSyBS6q1-rBjsJ2bjpNHRY_Bpju6lu0s4_yc",
        authDomain: "checkmed-2b213.firebaseapp.com",
        databaseURL: "https://checkmed-2b213.firebaseio.com",
        storageBucket: "checkmed-2b213.appspot.com",
        messagingSenderId: "843994433143"
    };
    firebase.initializeApp(config);
    var dataRef = firebase.database();
    //Get Active User Profile and Add to DB
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            email = user.email;
            console.log("Provider: " + currentUser.provider);
            console.log(currentUser);
            console.log("Email: " + user.email);
            console.log("displayName: " + displayName);
        }
    });
    // UPDATE DOM
    //
    //
    dataRef.ref('users/' + currentUser + '/profile').on("value", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().displayName);
        $("#userData").html("<div class='userInfo card-title'><span id='displayname'> ROCK ON " + displayName + "! </span></br><span id='email'> You're signed in with " + childSnapshot.val().email + "</div>");
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    //
    //
    // FORM SUBMISSION TO DB
    //
    $('#checkSubmit').on('click', function (e) {
        e.preventDefault();
        var count = 1;
        var title = '';
        var sympArray = [];
        var examArray = [];
        var allergyArray = [];
        var nurseArray = [];
        var medsArray = [];
        var dietArray = [];
        var imagArray = [];
        var procArray = [];
        var consultArray = [];
        var educArray = [];
        var diagArray = [];
        var userChecklist = {};
        classCheck();

        function classCheck() {
            $('.itemDiagnostic').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(diagArray, eachItem);
                count++;
            });
            $('.itemAllergies').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(allergyArray, eachItem);
                count++;
            });
            $('.itemDiet').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(dietArray, eachItem);
                count++;
            });
            $('.itemSymptoms').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(sympArray, eachItem);
                count++;
            });
            $('.itemExams').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(examArray, eachItem);
                count++;
            });
            $('.itemAllergies').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(allergyArray, eachItem);
                count++;
            });
            $('.itemProcedures').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(procArray, eachItem);
                count++;
            });
            $('.itemConsultation').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(consultArray, eachItem);
                count++;
            });
            $('.itemEducation').each(function () {
                var eachItem = $(this).val().trim();
                itemArray(educArray, eachItem);
                count++;
            });
            count = count * 10;
            listObject();
        }

        function itemArray(array, item) {
            if (item === '' || item === null || item === undefined) {
                //console.log()
            } else {
                array.push(item);
                console.log(array);
            }
        }

        function listObject() {
            userChecklist = {
                title: title,
                symptoms: sympArray,
                exams: examArray,
                allergies: allergyArray,
                nurse: nurseArray,
                medication: medsArray,
                diet: dietArray,
                imaging: imagArray,
                procedure: procArray,
                consultation: consultArray,
                education: educArray,
                diagnosis: diagArray,
                score: count
            };
            console.log(userChecklist);
        }
        var newPostKey = firebase.database().ref().child('checklists').push().key;
        var updates = {};
        updates['/posts/' + newPostKey] = userChecklist;
        updates['users/' + currentUser + '/user-posts/' + newPostKey] = userChecklist;
        firebase.database().ref().update(updates);
        return false;
    });
});