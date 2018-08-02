$(document).ready(function() {
    var apiKey = "a5e95177da353f58113fd60296e1d250";
    var nasaId = "24662369@N07";
    var flickrStr = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=" + apiKey + "&user_id=" + nasaId + "&format=json&nojsoncallback=1";
    var photos = [];
    var tagsList = [];

    // Get photos
    $.get(flickrStr, function(data){
        fetchPhotos(data);
        //console.log(photos.length);
        displayPhotos();
    });

    //console.log(photos.length);

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
    }

    // How to display the photos
    function displayPhotos() {
        for (let i = 0; i < photos.length; i++) {
            let photoId = photos[i].id;
            let title = photos[i].title;
            let photoTags = photos[i].tags;
            //console.log(photoTags);
            let imgURL = 'https://farm' + photos[i].farm + '.staticflickr.com/' + photos[i].server + '/' + photos[i].id + '_' + photos[i].secret + '.jpg';
            $('#photoDiv').append('<span class="photoUnit show" id="' + photoId + '"><img class="galleryImg" src = "' + imgURL + '" alt = "' + title + '" title = "' + title + '"><span>' + title +'</span></span>');
        }
        //console.log("hello");

        setTimeout(function(){addTagsToPhotos();}, 2000);
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
            var tagObj = data.photo.tags.tag;

            // change each tag to consistent (lower) case; otherwise lowercase a comes after uppercase U
            tagObj.forEach(function(item) {
                var tagItem = item.raw;
                tagItem = tagItem.toLowerCase();

                // push tag into photoTags array
                photoTags.push(tagItem);
            });

            // Put tags into into photoObj
            photoObj["tags"] = photoTags;

            // If tags are not already in tagsList, add them
            photoTags.forEach(function(tag) {
                if ($.inArray(tag, tagsList) === -1) {
                    tagsList.push(tag);
                }
            });
        });
    }

    // Add tags as photoUnit classes
    function addTagsToPhotos() {
        //console.log("hello 2");
        var photoUnits = document.getElementsByClassName('photoUnit');
        //console.log(photoUnits.length);
        for (let i = 0; i < photoUnits.length; i++) {
            //console.log(photoUnits[i].id);
            for (let j = 0; j < photos.length; j++) {
                if (photos[j].id === photoUnits[i].id) {
                    //console.log(photos[j].id + " " + photoUnits[i].id);
                    if (photos[j].tags.length > 0) {
                        photos[j].tags.forEach(function(tag){
                            var className = makeCSSClass(tag);
                            $(photoUnits[i]).addClass(className);
                        });
                    }
                }
            }
        }
        //console.log("hello 3");
    }

    // Format tags so they can be used as CSS classes
    function makeCSSClass(tag) {
        var cssClassRegEx = new RegExp('^[a-zA-Z][a-zA-Z0-9-]*$', 'g'); // RegEx for the whole tag  name
        if (cssClassRegEx.test(tag) === false) {  // if anything in the tag doesn't match the css regex
            tag = tag.replace(/[^a-zA-Z0-9-]/g, "");  // Replace all special characters (anything not number, letter, or hyphen)
        }

        var cssFirstCharRegEx = new RegExp('[a-zA-Z]'); // First character must be a letter
        if (cssFirstCharRegEx.test(tag.charAt(0)) === false) {  //If first character not a letter...
            tag = tag.replace(tag.charAt(0), "a");  // make first letter an 'a' to ensure it matches css convention
        }
        return tag;
    }

    setTimeout(function(){
        tagsList.sort();  // sort alphabetically
        for (let i = 0; i < tagsList.length; i++) {
            // Remove spaces and special characters from tag values, as those do not translate well to CSS classes
            var tagValue = makeCSSClass(tagsList[i]);

            // add html for each tag in tagsList.
            tagsDiv.innerHTML = tagsDiv.innerHTML + '<button type="button" class="btn btn-mdb-color btn-sm tagButton" value="' + tagValue
                + '">' + tagsList[i] + '</button>';
        }}
    , 2000);

    // Put tagsList items in the tagsDiv
    var tagsDiv = document.getElementById('tagsDiv');

    for (var i = 0; i < tagsList.length; i++) {
        tagsDiv.innerHTML = tagsDiv.innerHTML + tagsList[i];
    }
    //console.log(tagsList);

    // FILTERING
    // Define filter functions
    function filterSelection(filter) {
        var allPhotosList = document.getElementsByClassName("photoUnit");  // photoUnit class is on all photo units and thus acts as an "all" filter
        if (filter === "all") {
            filter = "";  // Makes indexOf return 0 for everything
        }
        for (let i = 0; i < allPhotosList.length; i++) {
            $(allPhotosList[i]).removeClass("show");
            if ((allPhotosList[i].className.indexOf(filter)) > -1) {
                // If the string of class names contains the specified filter, add the "show" class
                checkThenAddClass(allPhotosList[i], "show");
                //console.log(allPhotosList[i].className);
                document.querySelector('#photoSectionHeader').scrollIntoView({  // smooth scroll to top
                    // from https://css-tricks.com/snippets/jquery/smooth-scrolling/
                    behavior: 'smooth'
                });
            }
        }
    }

    function checkThenAddClass(element, newClass) {
        var currentClassList = element.className.split("");
        if ((jQuery.inArray(newClass, currentClassList)) == -1) {
            // if newClass NOT in currentClassList array, add newClass
            element.className = element.className + " " + newClass;
        }
    }

    // Initial load of photo units
    setTimeout(function(){filterSelection("all")});
    setTimeout(function(){addFilterToButton()}, 2000);

// Attach filter actions to tag buttons (use callback in function () to avoid executing filter immediately)
    function addFilterToButton() {
        var tagButtonsList = document.querySelectorAll('#tagsDiv button');
        for (let i = 0; i < tagButtonsList.length; i++) {
            //console.log(tagButtonsList[i].value);
            //console.log(tagButtonsList.length);
            tagButtonsList[i].addEventListener('click', function(){
                // on click, filter selection by button value
                filterSelection(tagButtonsList[i].value);
                // and also update the filter indicator with the name of the filter
                var filterIndicator = document.getElementById('filterIndicator');
                filterIndicator.innerHTML = this.innerHTML;
            });
        }
    }


    // SORTING
    // When user clicks on one of choices in the miscellaneous dropdown, sort by the choice
    $('#miscSort').change(function() {
        var selection = this.value;  // get selected value
        //console.log(photos.length);
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
                //console.log(photos);
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
                //console.log(this.value);
            }
         }
    });
    //console.log(photos);
});