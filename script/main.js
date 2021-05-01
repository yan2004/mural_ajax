var arrayImg = [];
var randomArrayImg = [];

$(document).ready(function(){

    
    /**
     * 
     * @param {object} position 
     */
    function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        mymap(latitude, longitude); 
      }
    
    function error() {
        alert('Unable to retrieve your location');
        const latitude = '45.5168';
        const longitude = '-73.6492';
        mymap(latitude,longitude);
    }

    /**
     * Generate Mapbox Leaflet mpa
     * @param latitude
     * @param longitude
     */
    function mymap(latitude,longitude){
        const ZOOM_LEVELS = {min:8,max:20,initial:13};
        /* Initialize the map */
        var mymap = L.map('right').setView([latitude,longitude],ZOOM_LEVELS.initial);
        /* Use tiles from Mapbox */
        var mapboxToken = 'pk.eyJ1IjoieWFuajIwMDQiLCJhIjoiY2tuZmZ5ZGxtMWs5YjJwbGx6MHR3MmF4bCJ9._q3LM-UuY99qLh64jycVXQ';
        var mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
        
        L.tileLayer(mapboxUrl,{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: ZOOM_LEVELS.min,
            maxZoom: ZOOM_LEVELS.max,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: mapboxToken
        }).addTo(mymap);

        /* Add a marker with popups */
        L.marker([latitude,longitude]).addTo(mymap)
            .bindPopup('Your location')
            .openPopup();

        
        $.ajax({
            url: './data/dataGeo.php',
            async: true,
            method: 'GET',
            dataType: 'json',
            success (res) {
                var listMap = res;
               
                /**
                 * https://leafletjs.com/examples/geojson/
                 * We can also use geoJSON Feature to creat CircleMarker .
                 * 
                 * @param {sting} latLng :[latitude,longitude]
                 * @param {sting} txt : content inside the circle
                 * @param {int} radius 
                 * @param {int} borderWidth 
                 * @param {string} circleClass 
                 */
                function circleWithText(latLng, txt, radius, borderWidth, circleClass) {
                    var size = radius * 2;
                    var style = 'style="width: ' + size + 'px; height: ' + size + 'px; border-width: ' + borderWidth + 'px;"';
                    var iconSize = size + (borderWidth * 2);
                    var icon = L.divIcon({
                      html: '<span class="' + 'circle ' + circleClass + '" ' + style + '>' + txt + '</span>',
                      className: '',
                      iconSize: [iconSize, iconSize]
                    });
                    var marker = L.marker(latLng, {
                      icon: icon
                    });
                    return(marker);
                } 
                
                 listMap.forEach(element => {
                    var popup = '<div class="card gallery-map"><img class="card-img-top flex-gallery" src="' + element['image_url'] + 
                    '" alt=" "><div class="card-body"><p class="card-text">Artist: ' + element['artiste'] + '</p><p class="card-text">Address: '+ element['adresse']+'</p><p class="card-text">Organization: '+element['organisme'] + '</p></div></div>';
                    arrayImg.push(element);
                    circleWithText([element['latitude'],element['longitude']], element['idGeo'], 10, 1.5, 'circle1')
                    .addTo(mymap)
                    .bindPopup(popup);
                    
                 });

                /**
                 * Call back every 2minute, refresh left gallery
                 */
                getRandomEles();
                setInterval(getRandomEles, 120000);

                 function getRandomEles(){
                    
                    if($('#left').children().length > 0){
                       
                        $('#left').children().remove();
                         while(randomArrayImg.length > 0) {
                             randomArrayImg.pop();
                         }
                        
                     }

                     for(var i = 0; i<4; i++) {
                        var idx = Math.floor((Math.random() * arrayImg.length));
                        randomArrayImg.push(arrayImg[idx]);
                    }

                    var leftHtml = '';
                    for(var i = 0; i<4; i++) {
                        leftHtml += '<div class="card gallery-map"><img class="card-img-top flex-gallery" src="' + randomArrayImg[i]['image_url'] + 
                                '" alt=" "><div class="card-body"><p class="card-text">' + randomArrayImg[i]['artiste'] + ' | ' + randomArrayImg[i]['idGeo'] +'</p></div></div>';
                    }
                    
                    $('#left').append(leftHtml);
                
                 }
                
            },
            error (xhr, err) {
                console.log('Error')
                console.log(xhr)
                console.log(err)
            },
            timeout: 1000 * 10
        });
    }
    

    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        const latitude = '45.5168';
        const longitude = '-73.6492';
        mymap(latitude,longitude);
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
    }

    /**
     * Search Bar Autocomplete Function
     */
    $('#inputSearch').keyup(function(){
        var query = $(this).val().trim();
        if(query != ''){
            $.ajax({
                url : './data/search.php',
                method: 'POST',
                data: {query:query},
                success: function(data){
                    $('#resultSearch').fadeIn();
                    $('#resultSearch').html(data);
                }
            });
        }
    });

    $(document).on('click','li', function(){
        $('#inputSearch').val($(this).text());
        $('#resultSearch').fadeOut();
    });

    var modal = $('#dialog');

    $('#search').click(function(e){
        e.preventDefault();
        this.blur();
        var valInput = $('#inputSearch').val();
        var idVal = extract(valInput);
        if(idVal != undefined){
            $.post("./data/dataById.php", {
                idVal: idVal
            }, function(data,status){
                $('#dialog').html(data);

                $('.close').click(function(){
                    modal.hide();
                    console.log('haha');
                });
            });
        }
        modal.show();

       
    });

    function extract(text) {
        return /^(?:[^|]*\|){2}\s*([^|]*?)\s*$/[Symbol.match](text)?.[1];
    }


    
});


