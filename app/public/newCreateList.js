var currentUser = '';
var email = '';
$(document).ready(function() {
		  				//User Sign Out =================
$('#btnLogOut').on('click', function () {
    $('.well').remove();
    firebase.auth().signOut();
});
				/*------------------------------------------------
				To edit your form heading
				-------------------------------------------------*/
				
				$("#yourtitle").click(function(){
					//hides the div with Checklist Tile information
					$("#your").hide();            
						var createhead = $(document.createElement('div'));
						//creates a div with id ='your1' which holds label and input and button below
						createhead.attr("id","your1");
						createhead.html('<label id="titleid">'+
						'<b>Title : </b>'+
						'</label>'+
						'<br/>'+
						'<input id="inputhead" "type=text placeholder="Type Checklist Name!"/>'+
						'<button id="doneid">Done</button>');
						//appends everything created above to yourhead div
					    $("#yourhead").append(createhead);

						
					//on click of done	
					$("#doneid").click(function(){  
						var get = $("#inputhead").val().trim(); 
						if(get == 0)
						{
						alert("Cannot Leave Field Blank");
						}
						else
						{
						//change tile html to value entered on form
						$("#yourtitle").html('<h1>'+get+'</h1>');  
						//adding css to title input from form
						$("#yourtitle").css({"text-align":"center","font-size":"25px","color":"white","cursor":"pointer"});
						//apply css and show the div with the now changed html in it And hide input div
						$("#your").css({"background-color":"#F4D4FA","width":"530px"});
						$('#your1').remove();
						$("#justclickid").css({'padding-top':'10px'}); 
						$("#your").show();   

						
						};
				    });
				});
	
                /*----------------------------------------------------------------------------------------------------*/

				
				var MaxInputs = 100; //Maximum input boxes allowed
                
					
                /*----------------------------------
				to keep track of fields and divs added
				-----------------------------------*/
				var nameFieldCount = 0; 
                var emailFieldCount = 0; 
                var addressFieldCount = 0; 
                var checkboxFieldCount = 0; 
                var radiobuttonFieldCount = 0; 
				var checkboxdivCount = 0; 
				var checkbox_sub_para_Count=0;
				var radiobuttondivCount = 0; 
				var radio_sub_para_Count=0;
				
				var section = 'Diagnosis';
				
				
				var InputsWrapper = $("#InputsWrapper"); //Input box wrapper ID holds all dynamically created inputs
				var x = InputsWrapper.length; //Initial field count
                
				
				
				/*------------------
				to get fields button ID from left panel
				------------------*/
				var section = $(".section");
				var namefield = $("#namebutton"); 
                var emailfield = $("#emailbutton"); 
                var addressfield = $("#addressbutton"); 
                var checkbox =  $("#checkboxbutton");
                var radiobutton= $("#radioaddbutton");
               
                
                $(InputsWrapper).sortable();  		// to make added fields sortable
				
				
				
				/*------------------------------------------------
				To add Name field 
				-------------------------------------------------*/
				$(section).click(function()  		
                {
                	// Check to see if  field has been clicked max number of times
                    if (x <= MaxInputs) 		
                    {
                    	var buttonName = $(this).text();
                    	console.log(buttonName);
                    	if (buttonName==="Create New Section") { 
                    		return alert('For Premium Users Only!');
                    	}
                    	//adds a counter to this particular field
                        nameFieldCount++; 			
                        
						//adds a div inside the input wrapper and adds a unique id from the field count
                        $(InputsWrapper).append('<div class="clickSection">'+'<div id="' + buttonName + '">'+
                        '<div>'+
                        '<h1>' + buttonName + '</h1>' +
						'<label>Item :' + nameFieldCount + '</label>'+
						'<input type="text" name="mytext[]" id="field_' + nameFieldCount + '" class = "item'+ buttonName +' "placeholder="Enter Item"/>'+
						'<button class="removeclass0">x</button>'+
						'<button class="addclass0">+</button>'+'<br>'+
						'</div>'+'</div>' + '</div>');
						//increments input wrapper length
                        x++; 
                    }
                    return false;
                });
               
               //listens on input wrapper for remove class
			    $(InputsWrapper).on("click", ".removeclass0", function() {   //to remove name field

                    $(this).parent('div').remove(); 
                    x--; 
                    return false;
                });
                
				$(InputsWrapper).on("click", ".addclass0", function() {      //to add more name fields 
                    nameFieldCount++;
                    var itemName = $(this).parent().parent().attr('id');
                    	console.log(itemName);

                    $(this).parent().parent().append('<div id="InputsWrapper_0' + nameFieldCount + '">'+
						'<label>Item :' + nameFieldCount + '</label>'+
						'<input type="text" name="mytext[]" id="field_' + nameFieldCount + '" class="item'+ itemName +' "placeholder="Enter Item"/>'+
						'<button class="removeclass0">x</button>'+
						'<button class="addclass0">+</button>'+'<br>'+
						'</div>');

                    x++;
                    return false;
                });
       
				
				
				$("#reset").on("click", function() { //to reset all elements

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

$('input').each(function() {
	var name = $(this).attr('class');
	var eachItem = $(this).val().trim();
	switch (name) {
  case 'itemDiagnostic':
    //Statements executed when the result of expression matches value1
    break;
  case 'itemAllergies':
    //Statements executed when the result of expression matches value2

  	break;
  case 'itemDiet':
  	dietArray.push(eachItem);
    //Statements executed when the result of expression matches valueN
    break;
  default:
    console.log('nope');
    break;
}
})

$( '.checkExam' ).each(function() {
    var eachExam = $( this ).val().trim();
    if(eachExam === ''){

    }else{
    examArray.push(eachExam);
    }

  });
//
//
// FORM SUBMISSION TO DB
//
$('#checkSubmit').on('click', function (e) {
    e.preventDefault();

    var symptomsArray = [];
    var examArray = [];
    var labsArray = [];
    var procArray = [];
    var medsArray = [];
    var dietArray = [];
   
   var userChecklist = {
        role: "Doctor Placeholder",
        use: "Nurse Placeholder",
        symptoms: symptomsArray,
        exam: examArray,
        labs: labsArray,
        proc: procArray,
        meds: medsArray
    };

    $( '.checkSym' ).each(function() {
    var eachSym = $( this ).val().trim();
    console.log(eachSym);
    if(eachSym === ''){

    }else{
    symptomsArray.push(eachSym);
    }


  });
       $( '.checkExam' ).each(function() {
    var eachExam = $( this ).val().trim();
    if(eachExam === ''){

    }else{
    examArray.push(eachExam);
    }

  });
      $( '.checkLab' ).each(function() {
    var eachLab = $( this ).val().trim();
    if(eachLab === ''){

    }else{
    labsArray.push(eachLab);
    }


  });

var postData = {
            role: 'role',
            use: 'use',
            title: checkTitle,
            symptoms: symptomsArray,
            exam: examArray,
            labs: labsArray,
            proc: procArray,
            meds: medsArray,
            starCount: 0

        };

    var newPostKey = firebase.database().ref().child('checklists').push().key;

      var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['users/'+ currentUser + '/user-posts/' + newPostKey] = postData;

firebase.database().ref().update(updates);
  
    console.log(userChecklist);
    // dataRef.update('users/'+ currentUser + '/checklists/' + newPostKey).set({
    //         role: 'role',
    //         use: 'use',
    //         title: checkTitle,
    //         symptoms: symptomsArray,
    //         exam: examArray,
    //         labs: labsArray,
    //         proc: procArray,
    //         meds: medsArray,
    //         starCount: 0

    //     });
    return false;
				
});

});
	
	



			