var arrayImg = [];
var randomArrayImg = [];

$(document).ready(function(){

    
    /**
     * 
     * @param {object} position 
     */
    function success(position) {
        //   var latitude  = position.coords.latitude;
        //   var longitude = position.coords.longitude;

        const latitude = '45.53591845';
        const longitude = '-73.61507102638478';
        
        const ZOOM_LEVELS = {min:10,max:20,initial:13};
        var mymap = L.map('right').setView([latitude,longitude],ZOOM_LEVELS.initial);
        
        var mapboxToken = 'pk.eyJ1IjoieWFuajIwMDQiLCJhIjoiY2tuZmZ5ZGxtMWs5YjJwbGx6MHR3MmF4bCJ9._q3LM-UuY99qLh64jycVXQ';
        var mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
        
        L.tileLayer(mapboxUrl,{
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            minZoom: ZOOM_LEVELS.min,
            maxZoom: ZOOM_LEVELS.max,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoieWFuajIwMDQiLCJhIjoiY2tuZmZ5ZGxtMWs5YjJwbGx6MHR3MmF4bCJ9._q3LM-UuY99qLh64jycVXQ'

        }).addTo(mymap);

        L.marker([latitude,longitude]).addTo(mymap)
            .bindPopup("Your're here")
            .openPopup();

        /**
         * Ajax get info from open source
         */
        
        $.ajax({
            url: './data/dataGeo.php',
            async: true,
            method: 'GET',
            dataType: 'json',
            success (res) {
                var listMap = res;
               
                //pointToLayer
                var geojsonMarkerOptions = {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                };

                /**
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
                    '" alt=" "><div class="card-body"><p class="card-text">' + element['artiste'] + '</p><p class="card-text">'+ element['adresse']+'</p></div></div>';
                    arrayImg.push(element);
                    circleWithText([element['latitude'],element['longitude']], element['idGeo'], 10, 1.5, 'circle1')
                    .addTo(mymap)
                    .bindPopup(popup);
                    
                 });

                /**
                 * Call back every 1minute, refresh left gallery
                 */
                getRandomEles();
                setInterval(getRandomEles, 60000);

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
                                '" alt=" "><div class="card-body"><p class="card-text">' + randomArrayImg[i]['artiste'] + '</p></div></div>';
                    }
                    
                    var leftDom = $('#left').append(leftHtml);
                
                }
                
            },
            error (xhr, info, err) {
                console.log('Error')
                console.log(xhr)
                console.log(err)
            },
            timeout: 1000 * 10
        });

        
      }
    
    function error() {
        alert('Unable to retrieve your location');
    }
    

    if(!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
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


