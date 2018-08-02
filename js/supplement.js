$(document).ready(function() {
    var apiKey = "a5e95177da353f58113fd60296e1d250";
    var nasaId = "24662369@N07";
    var flickrStr = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + apiKey + "&user_id=" + nasaId + "&format=json&nojsoncallback=1";
    var photos = [];
    var tagsList = [];

    // Get photos
    $.get(flickrStr, function(data){
        fetchPhotos(data);
        console.log(photos.length);
        displayPhotos();
        umm();
        setTimeout(addTagsToPhotos, 10000);

    });

    console.log(photos.length);

    // Take items from returned Flickr array and put them into local photos array
    function fetchPhotos(data) {
        var numPhotos = data.photos.photo.length;
        for (let i = 0; i < numPhotos; i++) {
            let photoObj = {
                id: data.photos.photo[i].id,
                owner: data.photos.photo[i].owner,
                secret: data.photos.photo[i].secret,
                server: data.photos.photo[i].server,
                farm: data.photos.photo[i].farm,
                title: data.photos.photo[i].title
            };
            getMetadata(photoObj);
            photos.push(photoObj);
        }
        console.log(tagsList[0]);
    }

    // How to display the photos
    function displayPhotos() {
        for (let i = 0; i < photos.length; i++) {
            let photoId = photos[i].id;
            let title = photos[i].title;
            let photoTags = photos[i].tags;
            console.log(photoTags);
            let imgURL = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';
            $('#photoDiv').append('<span class="photoUnit" id="' + photoId + '"><img src = "' + imgURL + '" alt = "' + title + '" title = "' + title + '"><span>' + title +'</span></span>');
        }
    }

    // Get metadata for a photo
    function getMetadata(photoObj) {
        let infoStr = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=a5e95177da353f58113fd60296e1d250&photo_id=" + photoObj.id + "&format=json&nojsoncallback=1";
        $.get(infoStr, function(data) {
            // Get most of metadata
            photoObj["description"] = data.photo.description;
            photoObj["takenDate"] = data.photo.dates.taken;
            //console.log("taken date " + typeof(photoObj["takenDate"]));
            photoObj["views"] = data.photo.views;
            //console.log("views " + typeof(photoObj["views"]));

            // Get tags
            var photoTags = [];
            //console.log(data.photo.tags);
            var tagObj = data.photo.tags.tag;
            tagObj.forEach(function(item) {
                photoTags.push(item.raw);
            });

            // Put tags into into photoObj
            photoObj["tags"] = photoTags;

            // If tags are not already in tagsList, add them
            photoTags.forEach(function(tag) {
                if ($.inArray(tag, tagsList) == -1) {
                    tagsList.push(tag);
                }
            });
        });
        setTimeout(function(){console.log(tagsList[4])}, 10000);
    }

    function addTagsToPhotos() {
        var photoUnits = document.getElementsByClassName('photoUnit');
        console.log(photoUnits.length);
        for (let i = 0; i < photoUnits.length; i++) {
            console.log(photoUnits[i].id);
            for (let j = 0; j < photos.length; j++) {
                if (photos.id == photoUnits[i].id) {
                    $(photoUnits[i]).addClass("bluh");
                    console.log("bbb");
                }
            }

            //console.log(photos.photoUnits[i].id);
            //console.log(photoUnits[i]);
        }
    }
    setTimeout(function(){addTagsToPhotos()}, 10000);
    console.log(typeof(tagsList[0]));
    console.log(tagsList[0]);
    var umm = setTimeout(function(){console.log(tagsList[4]);
        console.log(typeof(tagsList[4]));
        console.log(tagsList[4]);
        tagsList.sort();
        for (var i = 0; i < tagsList.length; i++) {
            tagsDiv.innerHTML = tagsDiv.innerHTML + '<button type="button" class="btn btn-mdb-color btn-sm tagButton" value="' + tagsList[i]
            + '">' + tagsList[i] + '</button>';
        }}
    , 10000);
    var tagsArray = Object.keys(tagsList).map(i=> tagsList[i]);
    console.log(tagsArray);
    console.log(tagsArray[2]);
    console.log(photos.length);
    console.log($.isArray(photos));
    console.log(tagsList[1]);
    console.log($.isArray(tagsList));
    tagsList.sort();  // Sort tagsList alphabetically

    // Put tagsList items in the tagsDiv
    var tagsDiv = document.getElementById('tagsDiv');

    console.log(tagsList[1]);
    for (var i = 0; i < tagsList.length; i++) {
        tagsDiv.innerHTML = tagsDiv.innerHTML + tagsList[i];
    }
    console.log(tagsList);

    // When user clicks on one of choices in the miscellaneous dropdown, sort by the choice
    $('#miscSort').change(function() {
        var selection = this.value;  // get selected value
        console.log(photos.length);
        switch (selection) {
            default:
                // Sort by date (most recent first)
                photos.sort(function(a, b) {
                    x = new Date(a.takenDate);
                    y = new Date(b.takenDate);
                    if (x > y) {return -1;}
                    if (x < y) {return 1;}
                    return 0;
                });
                break;
            case "takenDateOld":
                photos.sort(function(a, b) {
                    x = new Date(a.takenDate);
                    y = new Date(b.takenDate);
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
                break;
            case "popularity":
                // Sort by views, in descending order
                photos.sort(function(a,b) {return b.views - a.views});
                break;
            case "title":
                // Sort by title string a-z
                console.log(photos);
                photos.sort(function(a, b) {
                    var x = a.title.toLowerCase();
                    var y = b.title.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                });
        }

        // Empty photoDiv to prepare for sorted photos
        document.getElementById('photoDiv').innerHTML = "";

        // Show sorted photos
        displayPhotos();
    });

    // Tag filtering
    $('.tagButton').click(function(){
        for (var i=0; i<photos.length; i++) {
            if ($.inArray(this.value, photos[i].tags) == -1) {
                console.log(this.value);
            }
         }
    });
    console.log(photos);
});