
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBFreVmF0JLr1m_7gSa0ECZYaVPYUSdf6Y",
    authDomain: "marcycs-id.firebaseapp.com",
    databaseURL: "https://marcycs-id.firebaseio.com",
    projectId: "marcycs-id",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//window.onload = initFirebase();

function loadSelectItemsWithCondition(startPoint, endPoint, conditionToMatch, conditionValue, loadTo) {
    var optNum = 0;
    var sel = document.getElementById(loadTo);
    clearSelect(loadTo);
    firebase.database().ref(startPoint).once("value", object => {
        object.forEach(value => {
            if (value.val()[conditionToMatch] === conditionValue) {
                var newOption = document.createElement("option");
                newOption.text = value.val()[endPoint];
                newOption.dataset.id = Object.keys(object.val())[optNum];
                sel.add(newOption, null);
            }
            optNum += 1;
        });
    });
}

function clearSelect(select) {
    var sel = document.getElementById(select);
    var i;
    for (i = sel.options.length - 1; i >= 1; i--) {
        sel.remove(i);
    }
}

function clearList(list) {
    var lis = document.querySelectorAll('#' + list + ' li');
    for(var i=0; li=lis[i]; i++) {
       li.parentNode.removeChild(li);
    }
}
