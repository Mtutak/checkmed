// Initialize Firebase
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
//Login
// Sign Out =================
$('#btnLogOut').on('click', function () {
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
        console.log(currentUser);
        console.log(user.email);
        console.log("displayName: " + displayName);
        //Could Turn All DOM Updates to Function
        //Adds User Auth Data to Firebase Database
        dataRef.ref('users/' + user.uid + '/profile').set({
            displayName: user.displayName
        });
        userProfileToDom();
    } else {
        // No user is signed in.
        console.log('not logged in');
        // Set currentUID to null.
        currentUser = null;
    }
});