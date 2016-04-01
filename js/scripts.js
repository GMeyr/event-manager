/* API Usage examples

var exampleEvent = {
          "id" : 132,
          "name" : "Die Fledermaus",
          "date" : "2014-01-16T14:00:00",
          "venue" : {
            "id" : 3244,
            "name" : "Civic Opera House",
            "city" : "Chicago",
            "state" : "IL"
          }
        };

VividSeats.eventService.all(
  function(arr){
    arr.forEach(
      function(e){
        console.log(e.name);
      }
    );
  }, function(){
    console.log(' "all" method failed');
  });

VividSeats.eventService.update( exampleEvent, function(){
  console.log('update success')
}, function(){
  console.log('update failed')
})

VividSeats.eventService.remove( exampleEvent, function(){
  console.log('update success')
}, function(){
  console.log('update failed')
})

VividSeats.eventService.add( exampleEvent, function(){
  console.log('add success')
}, function(){
  console.log('add failed')
})

*/