<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Lauren Li - IBM Front End Exercise</title>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap core CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet">
    <!-- Material Design Bootstrap -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.4/css/mdb.min.css" rel="stylesheet">
    <!-- Custom Styles -->
    <link href="css/style.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">

</head>
<body>
<header>
    <a href="index.php">
        <div id="banner">
            <h1>SPACE</h1>
            <h2>The Final Frontier</h2>
        </div>
    </a>
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link active" href="index.php">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="process.php">Process</a>
        </li>
    </ul>
</header>
<div class="container-fluid">
    <div class="row">
        <section class="col-sm-12 col-md-9 col-lg-10">
            <main>
                <h3>My process for creating this site:</h3>
                <p>Updated 08/03/2018</p>
                <p>Additional details about site initialization:</p>
                <ol>
                    <li>Wireframe: On paper, I drew a simple, basic wireframe of the overall site design.</li>
                    <li>Basic web page setup: I decided to go with a .php extension rather than .html because I like to
                        reuse headers and footers (and code in general) where possible.
                        <ul>
                            <li>In this case, I did not end up reusing the header/footer because there were only two pages (index.php and process.php), but for a larger project, I would want to create separate header.php and footer.php files and include those into each page across the website. This way, if anything needs to change in the header or footer, I only have to change it in one place, rather than multiple places.</li>
                        </ul>
                    </li>
                    <li>Included <a href="https://mdbootstrap.com/material-design-for-bootstrap/" target="_blank">Material Design Bootstrap (MDB) framework</a>, as it is a very comprehensive and well-documented front-end framework.
                        <ul>
                            <li>MDB is cross-browser compatible, and has a built in responsive layout system upon which media queries can be added. (I used the version with jQuery as I was most familiar with it, but MDB also has versions compatible with Angular, React, and Vue.)
                            </li>
                        </ul>
                    </li>
                    <li>Set the background, header, and layout of the page. A responsive layout was added using MDB’s built-in grid system.
                        <ul>
                            <li>Background image by qimono from Pixabay (<a href="https://pixabay.com/en/sunrise-space-outer-space-globe-1756274/" target="_blank">link</a>), compressed with <a href="https://kraken.io/web-interface" target="_blank">kraken.io</a> to reduce image size.</li>
                        </ul>
                    </li>
                </ol>
                <p>The remainder of the steps were discussed in detail during the 08/02/2018 meeting, so a higher-level overview is provided:</p>
                <ol start="5">
                    <li>Initialized variables with information needed to access Flickr’s API, and initialized arrays for storing returned photo data (“photos”) and tag data (“tagsList”).</li>
                    <li>Used Flickr API to pull images and metadata from NASA’s Flickr account. (Used flickr.people.getPublicPhotos and flickr.photos.getInfo.)</li>
                    <li>Added functions to pull relevant photo data out of the API response, and store it in the pre-initialized photos array. Also added function to control the display of the photos once the photos are loaded.</li>
                    <li>Added sorting functions to sort the photos by “Most Recent First” or “Oldest First” (according to date taken), “Popularity” (according to number of views), and “Title” (from A-Z). The div containing the photos empties, and then displays the sorted photos based on what the user selected from the dropdown box.</li>
                </ol>
                <p>The following items are specific to the updated version of the website (as shown on 08/02/2018):</p>
                <ol start="9">
                    <li>Added/updated functions to pull tags out of the Flickr API response and process them, format tags so they can be sorted alphabetically and used as CSS classes, and then push them into the initialized tags array (“tagsList”).</li>
                    <li>Added functionality to sort the items in the tags array alphabetically, and then display them in that order in the dedicated tags div.</li>
                    <li>Added a function to add tags as CSS classes to their relevant photo elements (i.e. if a photo has a tag associated with it, then add that tag as a class for that photo element).</li>
                    <li>Added filtering functions: For each tag button in the tags div, if a tag button is clicked on, remove the “show” class from all photo elements, then add the “show” class back only for photo elements that have tag classes matching the value of the tag button that was clicked on. (For the “show all photos” button, all photo elements have a common “photoUnit” class that acts as an “all” filter.)</li>
                    <li>Fixed a bug related to the interaction of the sort and filter functions by nesting the function call to add tags as classes to photo elements inside the function to display photos.</li>
                    <li>Added an indicator to the left of the tags div for users to see which tag they are filtering by.</li>
                    <li>Made minor updates to the formatting of photo elements and the page header.</li>
                </ol>
                <p>TODO: </p>
                <ul>
                    <li>Improve image formatting, lazy image loading.</li>
                    <li>Replace setTimeout functions with JavaScript callbacks or promises.</li>
                    <li>Code clean up and refactoring.</li>
                </ul>
            </main>
        </section>
    </div> <!-- /Row div -->
    <footer>
        <div id="footerDiv">Lauren Li 2018</div>
    </footer>
</div>  <!-- /container-fluid div -->
<!-- Scripts -->
<!-- JQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.13.0/umd/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.4/js/mdb.min.js"></script>
<!-- JS for Flickr -->
<script src="js/supplement.js"></script>
</body>
</html>