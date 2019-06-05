// YOU WILL NEED TO ADD YOUR OWN API KEY IN QUOTES ON LINE 5, EVEN FOR THE PREVIEW TO WORK.
// 
// GET YOUR API HERE https://console.developers.google.com/apis/api


// https://developers.google.com/youtube/v3/docs/playlistItems/list

// https://console.developers.google.com/apis/api/youtube.googleapis.com/overview?project=webtut-195115&duration=PT1H

// <iframe width="560" height="315" src="https://www.youtube.com/embed/qxWrnhZEuRU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

// https://i.ytimg.com/vi/qxWrnhZEuRU/mqdefault.jpg


$(document).ready(function () {
    $('#sec-video').hide();
    $('#sec-chat').show();
    var key = 'AIzaSyDkH-zFq6_tczPDlrNENywuO6ppYo7fN78';
    var URL = 'https://www.googleapis.com/youtube/v3/search';

    var options = {
        q: encodeURIComponent($("#search-vid").val()).replace(/%20/g, "+") , //
        part: 'snippet',
        key: key,
        maxResults: 7, 
        type: 'video'       
    }

    $('#search').click(function(){     
        loadVids();        
    })     

    function loadVids() {     
        options.q= $("#search-vid").val(); 
        $.getJSON(URL, options, function (data) {
            console.log(options);
            var id = data.items[0].id.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
			<iframe width="100%" height="500" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {
        $('main').html(``); 
        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title.substring(0, 20);
            var desc = item.snippet.description.substring(0, 20);
            var vid = item.id.videoId;

           
            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h6>${title}</h6>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });

    $('#btn-youtube').on('click', function(){
        $('#sec-video').show();
        $('#sec-chat').hide();
    })
    $('#btn-chat-room').on('click', function(){
        $('#sec-video').hide();
        $('#sec-chat').show();
    })


});