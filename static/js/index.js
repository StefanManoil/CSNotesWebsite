window.notesRequest="";
$(document).ready(function () {
    var x = getCookie("x");
    if (x === "true"){
      $("#signIn_Icon").addClass('fas fa-user-check');
    }
    if ((x === "") || (x === "false")){
      $("#signIn_Icon").addClass('fas fa-user-tag');
    }
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    //console.log("cookie "+ x);

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.navbar.sticky-top').toggleClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        $(this).toggleClass('active');
    });


    $("#ics2o").on('click', function() {
      window.notesRequest = "/ics2o";
      var x = getCookie("x");
      if (x === "true"){
         loadN(window.notesRequest);
      }
      if ((x === "") || (x === "false")){
        $("#myModal").modal(); //prompt to login
      }
    });

    $("#ics3u").on('click', function() {
      //console.log("ics3u")
      window.notesRequest = "/ics3u";
      var x = getCookie("x");
      if (x === "true"){
         loadN(window.notesRequest);
      }
      if ((x === "") || (x === "false")){
        $("#myModal").modal(); //prompt to login
      }
    });

    $("#ics3c").on('click', function() {
      window.notesRequest = "/ics3c";
      var x = getCookie("x");
      if (x === "true"){
         loadN(window.notesRequest);
      }
      if ((x === "") || (x === "false")){
        $("#myModal").modal(); //prompt to login
      }
    });

    $("#ics4u").on('click', function() {
      window.notesRequest = "/ics4u";
      var x = getCookie("x");
      if (x === "true"){
         loadN(window.notesRequest);
      }
      if ((x === "") || (x === "false")){
        $("#myModal").modal(); //prompt to login
      }
    });

    $("#userSignIn").on('click', function() {
      //var x = getCookie("x");
      //if ((x === "") || (x === "false")){
        $("#myModal").modal(); //prompt to login
      //}
    });

    $("#login_form").submit((e)=>{
      e.preventDefault();
      /*var x = $("form").serializeArray();
      $.each(x, function(i, field){
          $("#results").append(field.name + ":" + field.value + " ");
      });*/
      $.ajax({
         url: "/",
         type: "POST",
         contentType: "application/json",
         data: JSON.stringify($("form").serializeArray()),
         success: (response)=>{
             if (response.success==true){
               $("#feedback").html("You can access the notes");
               $("#signIn_Icon").removeClass('fas fa-user-tag');
               $("#signIn_Icon").addClass('fas fa-user-check');
               document.cookie = "x=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
               document.cookie = "x=true";
               window.setTimeout(function(){
                    $('#myModal').modal('hide');
                    window.setTimeout(function(){
                      if (window.notesRequest!=""){
                        loadN(window.notesRequest);
                      }
                    }, 500);
               }, 1500); //2000 milliseconds i.e 2 seconds, you can change it to the value as you need
             }
             else{
               $("#feedback").html ("Incorrect user/password!");
             }
         }
     });
   });

   $('#myModal').on('hidden.bs.modal', function () {
       $(this).find('form').trigger('reset');
       $("#feedback").html ("");
   });

   function getCookie(cname) {
     var name = cname + "=";
     var decodedCookie = decodeURIComponent(document.cookie);
     //console.log("cookie "+decodedCookie);
     var ca = decodedCookie.split(';');
     for(var i = 0; i <ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0) == ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
       }
     }
     return "";
   }

   function loadN(notes){
     var client = new HttpClient();
         client.get(notes, function(response) {
           //console.log(response);
           $( "body" ).html( response );//this works but messed up the small screen toggle
           //document.open();
           //document.write(response);
           //document.close();
         });

     /*the code below is Ajax based - it also works
     const reader = new FileReader;
     $.ajax({
        url: notes,
        type: "GET",
        contentType: "text/plain",
        data: ""+x,
        success: (response)=>{
            //$( "html" ).html( response );//this works but messed up the small screen toggle
            //document.open();
            //document.write(response);
            //document.close();

            //this only works if I don't block in node accesing a file directly from the browser
            //console.log(response.url);
            //document.location.href = "http://localhost:8080/public"+notes+".html";
        }
    });*/
   }

   var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}
});

$(function() {
        $( 'ul.components li' ).on( 'click', function() {
              $( this ).parent().find( 'li.active' ).removeClass( 'active' );
              $( this ).addClass( 'active' );
        });
});
