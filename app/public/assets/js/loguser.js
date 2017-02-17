//Check JS link
console.log("Connected to App Sign Up Form!");
var selectedChecklist;
var key;
// ====================================
// 
//  LOGIN PAGE INTERACTION
// 
// ======================================
$('.form-signup').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this),
        label = $this.prev('label');
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {
        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }
});
$('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
});
// Initialize Firebase
// ====================================
// 
//  FIREBASE
// 
// ======================================
var config = {
    apiKey: "AIzaSyBS6q1-rBjsJ2bjpNHRY_Bpju6lu0s4_yc",
    authDomain: "checkmed-2b213.firebaseapp.com",
    databaseURL: "https://checkmed-2b213.firebaseio.com",
    storageBucket: "checkmed-2b213.appspot.com",
    messagingSenderId: "843994433143"
};
firebase.initializeApp(config);
// Initial Global Values
var email = '';
var password = '';
var displayName = '';
var user = firebase.auth().currentUser;
var dataRef = firebase.database();
var currentUser = '';
//Set up Signing in Auth Firebase Authentication=============
// ====================================
// 
//  LOGIN BUTTON
// 
// ======================================
// $('#btnLogin').on('click', handleLogin);
// function handleLogin(e) {
//     e.preventDefault();
// }
$('#btnLogin').on('click', function () {
    //Store Input in Variables
    email = $('#emailBack').val().trim();
    password = $('#passwordBack').val().trim();
    //Sign in Active User
    var loginPromise = firebase.auth().signInWithEmailAndPassword(email, password).then(submitPost).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
            // $(".message-alert").html('<p>' + errorMessage + '</p>');
            alert(errorMessage);
        }
        console.log(error);
    });
    console.log(loginPromise);
    return false;
});
//Creating an Account 
// ====================================
// 
//  SIGN UP BUTTON
// 
// ======================================
$('#btnSignUp').on('click', function () {
    //Store Input in Variables
    email = $('#txtEmail').val().trim();
    password = $('#txtPassword').val().trim();
    displayName = $('#displayName').val().trim();
    console.log(displayName);
    firebase.auth().createUserWithEmailAndPassword(email, password).then(submitPost).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            $(".message-alert").html('<p>The password is too weak.</p>');
        } else {
            // $(".message-alert").html('<p>' + errorMessage + '</p>');
            alert(errorMessage);
        }
        console.log(error);
    });
    return false;
});

function submitPost() {
    window.location.href = '/user';
    console.log('Success!');
}
//User Sign Out =================
$('#btnLogOut').on('click', function () {
    $('.well').remove();
    firebase.auth().signOut();
});
//Get Active User Profile and Add to DB
firebase.auth().onAuthStateChanged(function (user) {
    // We ignore token refresh events.
    // if (user && currentUser === user.uid) {
    //     return;
    // }
    if (user) {
        // User is signed in.
        currentUser = user.uid;
        email = user.email;
        console.log("Logged In");
        console.log("Provider: " + currentUser.provider);
        console.log(currentUser);
        console.log("Email: " + user.email);
        //Could Turn All DOM Updates to Function
        $('#btnLogOut').removeClass('hide');
        //Adds User Auth Data to Firebase Database
        // dataRef.ref('users/' + user.uid + '/profile').set({
        //     displayName: user.displayName
        // });
    } else {
        // No user is signed in.
        console.log('not logged in');
        // Set currentUID to null.
        currentUser = null;
        $('#btnLogOut').addClass('hide');
    }
    // LOG USER INPUTS
    $('#mainsearch').on('click', function () {
        searchTerm = $('.searchinput').val().trim();
        searchCriteria = $("#myDropdown option:selected").text();
        dataRef.ref('users/' + user.uid + '/searches').set({
            search: searchTerm,
            searchtype: searchCriteria
        });
        return false;
    });
});
// Bind Provider Sign in buttons.
$('#sign-in-button').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
});
// ====================================
// 
// FROM PROFILE.HTML
// 
// ======================================
$(".btn-pref .btn").click(function () {
    $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
    // $(".tab").addClass("active"); // instead of this do the below 
    $(this).removeClass("btn-default").addClass("btn-primary");
});
//User Sign Out =================
$('#btnLogOut').on('click', function () {
    firebase.auth().signOut();
});
//Button Links
$('#createLink').on('click', function (e) {
    window.location.href = '/create';
});
dataRef.ref('posts/').on("value", function (snapshot) {
    var list = snapshot.val();
    var title = snapshot.val().title;
    var score = snapshot.val().score;
    var snapKeys = Object.keys(list);
    console.log(snapKeys);
    $.each(list, function (i, val) {
        $('#tab1').append('<div class="itemholder col-sm-4 likeButton"><a ><h1 data-key="' + i + '" class="itemtitle fbValue">' + val.title + '</a><h2 class="itemscore"> Score: ' + val.score + '<h2></button></div>');
        console.log(i);
        // console.log(snapKeys[i]);
        console.log(val.title);
        console.log('=======');
        console.log(val.score);
    });
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
$("#tab1").on("click", "h1.fbValue", function (e) {
    console.log('clicked button to search for checklist!');
    $("#tab1").hide("slow");
    $("#tab2").removeClass("hidden");
    $("#tab2").show("slow");
    // href="/new_list"
    key = $(this).data('key');
    console.log(key);
    fbListCall(key);
});

function fbListCall(key) {
    console.log("call");
    dataRef.ref('posts/' + key).on("value", function (snapshot) {
        selectedChecklist = snapshot.val();
        renderList(selectedChecklist);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function renderList(listObject) {
    console.log(listObject);
    // var data = JSON.stringify(listObject);
    // $.post("/new_list", data).done(function () {
    //     console.log('success post');
    // });
    $('#listTitle').html("<div>" + listObject.title + "</div>");
    $('#points').html("<div>" + listObject.score + "</div>");
    $.each(listObject, function (keyname, val) {
        if (keyname === "title" || keyname === "score") {} else {
            var arrayCheck = val;
            // for (i=0; i< arrayCheck.length; i++)
            $(".keySection").append("<div class='titlesection'><h1>" + keyname + "</h1><ul class='eachCheck'></ul></div>");
            for (i = 0; i < arrayCheck.length; i++) {
                $(".eachCheck").append("<li class='eachListCheck'><input type='checkbox'>" + arrayCheck[i] + "</input></li>");
            }
        }
    });
}
$("#user").on("click", function (e) {
    e.preventDefault();
    $("#tab2").hide("slow");
    $(".titlesection").remove();
    $(".eachListCheck").remove();
    $("#tab1").removeClass("hidden");
    $("#tab1").show("slow");
    return false;
});
// ====================================
// 
// FROM NEWCREATELIST.JS
// 
// ======================================
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
    //Get Active User Profile and Add to DB
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currentUser = user.uid;
            email = user.email;
            console.log("Provider: " + currentUser.provider);
            console.log(currentUser);
            console.log("Email: " + user.email);
        }
    });
    // UPDATE DOM
    //
    //
    dataRef.ref('users/' + currentUser + '/profile').on("value", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
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
        var newPostKey = firebase.database().ref().child('checklists').push().key;

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
                score: count,
                id: newPostKey
            };
            console.log(userChecklist);
        }
        var updates = {};
        updates['/posts/' + newPostKey] = userChecklist;
        updates['users/' + currentUser + '/user-posts/' + newPostKey] = userChecklist;
        firebase.database().ref().update(updates);
        return false;
    });
});
// ====================================
// 
// FROM CHECKLIST.JS
// 
// ======================================
// For Dynamic Form Fields Add and Remove
$(document).ready(function () {
    var next = 1;
    $(".add-more").click(function (e) {
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="field' + next + '" type="text">';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source', $(addto).attr('data-source'));
        $("#count").val(next);
        $('.remove-me').click(function (e) {
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length - 1);
            var fieldID = "#field" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
        });
    });
});
//Check List Group JS
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);
        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');
            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");
            // Set the button's icon
            $widget.find('.state-icon').removeClass().addClass('state-icon ' + settings[$widget.data('state')].icon);
            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }
        // Initialization
        function init() {
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            updateDisplay();
            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
    $('#get-checked-data').on('click', function (event) {
        event.preventDefault();
        var checkedItems = {},
            counter = 0;
        $("#check-list-box li.active").each(function (idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
    });
});
// ====================================
// 
// FROM LISTRENDER.HTML
// 
// ======================================
dataRef.ref('users/' + currentUser + '/user-posts/' + newPostKey).on("value", function (snapshot) {
    // If Firebase has a highPrice and highBidder stored (first case)
    // Set the initial variables for highBidder equal to the stored values.
    var role = snapshot.val().role;
    var exam = snapshot.val().exam;
    var labs = snapshot.val().labs;
    var title = snapshot.val().title;
    var use = snapshot.val().use;
    $.each(exam, function (i, val) {
        $('#physical').append('<li><label><input type="checkbox" value="">' + val + '</label></li>');
    });
    $.each(labs, function (i, val) {
        $('#labs').append('<li><label><input type="checkbox" value="">' + val + '</label></li>');
    });
    $.each(use, function (i, val) {
        $('#listFor').append('<li>' + val + '</li>');
    });
    $('#role').append(role);
    $('#listTitle').append(title);
    // Print the initial data to the console.
    console.log(snapshot.val());
    console.log(snapshot.val().exam);
    console.log(snapshot.val().role);
    console.log(snapshot.val().use);
    console.log(snapshot.val().labs[0]);
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});