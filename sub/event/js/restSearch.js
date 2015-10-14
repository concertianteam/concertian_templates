// Parse an item and create an title/value hash table with all the properties available
function getFields(results) {
   /* r = {};
    for (var i = 0; i < results.length; i++) {
        if (results[i] != undefined && results[i].idVenue != undefined) {
            r[results[i].idVenue] = results[i].name;
        }
    }*/
    return results;
}

$(document).ready(function () {

    var autocomplete = $("#restSearch").autocomplete({
        minLength: 2,
        source: function (request, response) {
            $.ajax({
                'url': 'http://api.bandcloud.net/agents/venues/name',
                'method': 'POST',
                'data': {'startsWith': request.term},
                'success': function (data) {
                    response($.map(data, function(d) {
                        return {
                            fields: getFields(d)
                        }
                    }));
                },
                'error': function () {
                    alert('Váš podnik neevidujeme. Napravíme to, hneď ako nám zašlete emailovú adresu nižšie. Ďakujeme.');
                }
            });
        },
        // Run this when the item is in focused (not selected)
        //focus: function (event, ui) {
            //$( "#restSearch" ).val(ui.item.value );
            //return false;
        //},
        // Run this when the item is selected
      select: function fillValues( event, ui ) {
        $("#restSearch").val(ui.item.fields.name);
        $("#idVenue").val(ui.item.fields.idVenue);
            console.log($("#restSearch").val()); 
            console.log($("#idVenue").val()); 
            loadInputHistory(ui.item.fields.idVenue);
        },
        appendTo: $('#menu-container')
    }).data("uiAutocomplete")._renderItem = function (ul, item) {
            return $("<li>").append('<a>' + item.fields.name + '</a>')
                .appendTo(ul);
    };
  
    var base_url = 'http://api.bandcloud.net/users/events/venue';

function loadInputHistory(id)
{
    var response = "";
    var form_data = {
        idVenue: $("#idVenue").val(),
        results: 10,
        page: 0,
    };
    $.ajax({
        type: "POST", 
        url: base_url, 
        data: form_data,
        success: function(data){
        var events = data.events;
        for(var event in events) {
                                   
            $("#container").append('<div class="concert_element">'+
                            '<div class="venue_concertimg"><img class="venue_concertlogo" src="'+events[event].urlPhoto+'"></div>'+
                            '<div class="concert_name">'+events[event].eventName+'</div>'+
                            '<div class="concert_date">'+events[event].date+'</div>'+
                            '<div class="concert_time">'+events[event].time+'</div>'+
                    '</div>');
            }
             $("#venue_title").replaceWith('<div class="head"><img class="venue_logo" src="'+events[event].urlPhoto+'"></div>'+
                                      '<div class="venue_name"><h4>'+events[event].venueName+'</h4></div>'+
                                      '<div class="concerts"><h4>Vaše koncerty</h4></div>');
        },
        dataType: "json"//set to JSON    
    })
        $("#restSearch").val(ui.item.fields.name);

}
  
});

