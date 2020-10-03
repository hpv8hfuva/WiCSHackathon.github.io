var humanity = [
  {
      "Name": "Northern Virginia Restore-Alexandria, HFH",
      "address": "869 South Pickett St Alexandria, VA 22304",
      "phoneNumbers":"7036706700", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore/?utm_campaign=HFHI_ReStoreSearch&utm_medium=referral&utm_source=habitat.org"
  },

  {
      "Name": "Northern Virginia ReStore-Chantilly, HFH",
      "address": "4311 Walney Rd Chantilly, VA 20151",
      "phoneNumbers":"7039533747", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore?utm_campaign=HFHI_ReStoreSearch&amp;utm_medium=referral&amp;utm_source=habitat.org"
  },

  {
      "Name": "Northern Virginia Restore-Herndon, HFH",
      "address": "Spring Street Herndon, VA 20170",
      "phoneNumbers":"5713060908", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/restore?utm_campaign=HFHI_ReStoreSearch&amp;utm_medium=referral&amp;utm_source=habitat.org"
  }
];


function initMap() {
  // The location of Uluru 
  document.getElementById("list-group").innerHTML = "";
  x = navigator.geolocation;
  x.getCurrentPosition(success, failure);
  function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
        zoom: 5,
        center: coords,
    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // your location
	
    var marker = new google.maps.Marker({map:map, 
		position:coords, 
		icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}, 
		title: "Me"});                           
	
    // community listing locations
    geocoder = new google.maps.Geocoder();
    for(let i = 0; i < humanity.length; i++){
      var address = humanity[i].address;
      const contentString = `
       <div class="card text-center">
          <div class="card-header">
            ${humanity[i].Name}
          </div>
          <div class="card-body">
            <h5 class="card-title">${humanity[i].email}</h5>
            <p class="card-text">${humanity[i].phoneNumbers}</p>\
            <p class="card-text">${humanity[i].address}</p>
            <a href="${humanity[i].website}" class="btn btn-primary">Click Me!</a>
          </div> 
        </div>
      `;
      console.log(contentString);
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      })
	  var max_distance = document.getElementById("a1").value;
	  geocoder.geocode( { 'address': address}, function(results, status) {
	  let distance = google.maps.geometry.spherical.computeDistanceBetween(results[0].geometry.location, coords)*0.000621371;
        if (status == 'OK') {  
		  if (max_distance == "" || max_distance >= distance) {
			  f(humanity[i]);
	          const marks = new google.maps.Marker({
	              map: map,
	              position: results[0].geometry.location,
				  title: humanity[i].Name,
	              icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
	          });
	          marks.addListener("click", () => {
	            console.log("HIT");
	            infoWindow.open(map, marks);
	          })
		  }
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

  }
}

function failure() {
	window.alert("Unable to find your location.");
	var coords = new google.maps.LatLng(0, 0);

    var mapOptions = {
        zoom: 5,
        center: coords,
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({map:map, position:coords})
} 
  
function f(humanity){ 
    let contentString = ``;
    var address = humanity.address;
    var name = humanity.Name;
    var phone= humanity.phoneNumbers;
    var mail=humanity.email;
    var site =humanity.website; 
    contentString += `
    <a href="${site}" class="list-group-item list-group-item-action">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1" href="${site}">${name}</h5>
      </div>
      <p class="mb-1">${phone}</p>
      <p class="mb-1">${mail}</p> 
    `; 
	
    
    document.getElementById("list-group").innerHTML += contentString;
}
 