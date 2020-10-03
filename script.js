var humanity = [
    {
      "Name": "Northern Virginia Restore-Alexandria, HFH",
      "address": "869 South Pickett St Alexandria, VA 22304",
      "phoneNumbers":"7036706700", 
      "email": "info@habitatnova.org",
      "website": "https://www.habitatnova.org/"
    },

    {
        "Name": "Northern Virginia ReStore-Chantilly, HFH",
        "address": "4311 Walney Rd Chantilly, VA 20151",
        "phoneNumbers":"7039533747", 
        "email": "info@habitatnova.org",
        "website": "https://www.habitatnova.org/"
    },

    {
        "Name": "Northern Virginia Restore-Herndon, HFH",
        "address": "Spring Street Herndon, VA 20170",
        "phoneNumbers":"5713060908", 
        "email": "info@habitatnova.org",
        "website": "https://www.habitatnova.org/"
    },
    {
        "Name": "Charlottesville ReStore, HFH",
        "address": "1221 Harris St, Charlottesville, VA 22903",
        "phoneNumbers":"4342936331", 
        "email": "drosensweig@cvillehabitat.org",
        "website": "https://www.habitatnova.org/restore?utm_campaign=HFHI_ReStoreSearch&amp;utm_medium=referral&amp;utm_source=habitat.org"
    },

    {
        "Name": "Richmond Metriopolition ReStore-Chesterfield, HFH",
        "address": "1201 Mail Dr, Richmond, VA 23235",
        "phoneNumbers":"8042994552", 
        "email": "mkhuss@richmondhabitat.org",
        "website": "www.richmondhabitat.org"
    },

    {
        "Name": "Washington DC, HFH",
        "address": "2115 Ward Ct NW Ste 100 Washington, US-DC 20037-1209",
        "phoneNumbers":"2028824600", 
        "email": "info@dchabitat.org",
        "website": "www.dchabitat.org"
    },

    {
        "Name": "Metro Maryland ReStore, HFH",
        "address": "1029 East Gude Drive Rockville, MD 20850",
        "phoneNumbers":"3019473304", 
        "email": " info@habitatmm.org",
        "website": "www.HabitatMM.org"
    },
	
	{
        "Name": "Staunton-Augusta-Waynesboro, HFH",
        "address": "434 Richmond Ave, Staunton, VA 24401",
        "phoneNumbers":"5408861944", 
        "email": " info@habitatmm.org",
        "website": "http://www.sawhfh.org/"
    },
	
	{
        "Name": "Central Valley, HFH",
        "address": "205 Dry River Rd, Bridgewater, VA 22812",
        "phoneNumbers":"5408286288", 
        "email": " info@habitatmm.org",
        "website": "http://centralvalleyhabitat.org/"		
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
        zoom: 8,
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
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      }) 
	  var max_distance = document.getElementById("a1").value;
	  geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {  
          let distance = google.maps.geometry.spherical.computeDistanceBetween(results[0].geometry.location, coords)*0.000621371;
          if (max_distance == "" || parseFloat(max_distance) >= distance) {
            addToListView(humanity[i]);
                const marks = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
              title: humanity[i].Name,
                    icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                });
                marks.addListener("click", () => { 
                  infoWindow.open(map, marks);
                })
		      }
        }
          else {
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
  
function addToListView(humanity){ 
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
 