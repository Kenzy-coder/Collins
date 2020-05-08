 var db;
 // step1 open a data base
 var dbobject = window.indexedDB ||  window.webkitIndexedDB ||
                window.mozIndexedDB ||  window.msIndexedDB;
  // open database
 var request = dbobject.open("Hospital-Wbdatab",1);
 
  request.onsuccess  = function (event) {
		      db = event.target.result;
		      console.log("database access granted successfully");
              getAllNames();
		 }

   request.onerror  = function (event) {

		      console.log( "database access  denied" );
		 }
     


      request.onupgradeneeded = function (event) {
      	alert("imidiate upgrade");

   	  db = event.target.result;
   	  console.log("Database created successfully");

       
        db.createObjectStore("patientRecord",{keyPath:"PatientID",autoIncrement:true});
        
   }

   // add funtion
  
   function addUserInfo() {
			
			// get your form inputs
		   var patientName = document.getElementById('name').value;
 		   var patientBirthDate = document.getElementById('bthdate').value;	 
		   

		   // start a transaction to read and write
           var transaction = db.transaction(["patientRecord"],"readwrite");
           var objectStore = transaction.objectStore("patientRecord");

           // added extra

           var patientHpName = document.getElementById('Hosname').value;
		   var patientAdmDate = document.getElementById('Admdate').value;	
		   var patientCardNo = document.getElementById('cardNo').value;
		   var patientFee = document.getElementById('fee').value;

            // create an object

            var object1 = {
            	name : patientName,
                birthDate: patientBirthDate,

                // added extra

                 hospitalname: patientHpName,
                AddDate : patientAdmDate,
                cardno : patientCardNo,
                fee : patientFee
    
            }

           var request = objectStore.add(object1);
            request.onsuccess = function (event) {
              alert("successfully added");
            	getAllNames();
            	
            	
            }

         
		} 



		function getAllNames() {

			 
           var transaction = db.transaction(["patientRecord"],"readwrite");
           var objectStore = transaction.objectStore("patientRecord");
           var request = objectStore.openCursor();
           $("#table").empty();
           request.onsuccess = function (event) {
           	   var cursor = event.target.result;
           	   if (cursor) {
           	   	 console.log(cursor.value);
           	   	 $("#table").append( "<tr><td>"+ cursor.value.PatientID + 
           	   	 	"</td> <td><input type='' id = \"nm"+ cursor.value.PatientID +"\" value=\"" + cursor.value.name +  
           	   	 	" \"></td><td><input type='' id = \"dt"+ cursor.value.PatientID + "\" value=\""
           	   	 	 + cursor.value.birthDate + 
           	   	 	"\"></td><td><input type='' id = \"hp"+ cursor.value.PatientID + "\" value=\"" + cursor.value.hospitalname +
           	   	 	 "\"></td><td><input type='' id = \"add"+ cursor.value.PatientID + "\" value=\"" +
           	   	 	 cursor.value.AddDate + 
           	   	 	  "\"></td><td><input type='' id = \"cd"+ cursor.value.PatientID + "\" value=\"" + cursor.value.cardno + 
           	   	 	  "\"></td><td><input type='' id = \"fee"+ cursor.value.PatientID +"\" value=\"" + 
           	   	 	 cursor.value.fee + "\"></td>"  + 
                     "<td>" + "<button onclick= \"editInfo(" + cursor.value.PatientID + " )\">Edit</button>" + "</td>" +
                     "<td>" + "<button onclick= \"DeleteInfo(" + cursor.value.PatientID + " )\">Delete</button>" + "</td>"

           	   	 	 + "</tr>" )
              
               
             

           	   	 	
           	   	 cursor.continue();
           	   };
           };
		}


		function editInfo(id) {
	       var transaction = db.transaction(["patientRecord"],"readwrite");
           var objectStore = transaction.objectStore("patientRecord");
           var name = $("#nm" + id).val();
           var dbth = $("#dt" + id).val();
           var hospi = $("#hp" + id).val();
           var amdate = $("#add" + id).val();
           var crdNo = $("#cd" + id).val();
           var fee = $("#fee" + id).val();

            var objectEdited = {
            	name : name,
                birthDate: dbth,

                // added extra

                 hospitalname: hospi,
                AddDate : amdate,
                cardno : crdNo,
                fee : fee,
                PatientID:id
    
            }

           var request = objectStore.put(objectEdited);
           request.onsuccess  = function(event) {
              var result = event.target.result;
              console.log(result);
           }
		}


		function  DeleteInfo(id) {
		       var transaction = db.transaction(["patientRecord"],"readwrite");
           var objectStore = transaction.objectStore("patientRecord");
           var request = objectStore.delete(id);
           request.onsuccess = function (event) {
           	      var result  = event.target.result;
           	      console.log(result);
           	      getAllNames();

           }
		}





 




























