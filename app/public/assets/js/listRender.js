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
updates['/user-posts/' + currentUser + '/' + newPostKey] = postData;