angular.module('EventManager', [])

  .controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){

  VividSeats.eventService.all(
    function(arr){
      console.log('arr', arr);
      $scope.eventArr = arr;
      $scope.$apply();
    }, function(){
      console.log('failed to retrieve events');
    });
    

    $scope.focusOnEvent = function(event){
      angular.element('#nameInput').val(event.name);
      angular.element('#dateInput').val(event.date);
      angular.element('#venueInput').val(event.venue.name);
      angular.element('#cityInput').val(event.venue.city);
      angular.element('#stateInput').val(event.venue.state);
      $scope.showEditor = true;
    };
    $scope.cancelEditor = function(event){
      $scope.showEditor = false;
    };

    $scope.updateEvent = function(){
      
      var newEvent = deepCopy($scope.focus);
        
      newEvent.name = angular.element('#nameInput').val();
      newEvent.date = angular.element('#dateInput').val();
      newEvent.venue.name = angular.element('#venueInput').val();
      newEvent.venue.city = angular.element('#cityInput').val();
      newEvent.venue.state = angular.element('#stateInput').val();
      console.log('trying to update', newEvent.id);
      

      VividSeats.eventService.update( newEvent,
        function(){
          console.log('update success');
          //refresh DOM
          $scope.showEditor = false;
          VividSeats.eventService.all(
            function(arr){
              $scope.eventArr = arr;
              $scope.$apply();
              $scope.focus = {};
              $scope.showEditor = false;
            }, function(){
              console.log('failed to retrieve events');
              Materialize.toast('Network error! Try saving again.', 2000);
            });
        }, function(){
          console.log('update failed');
          Materialize.toast('Network error! Try saving again.', 2000);
        });
    };

  $scope.removeEvent = function(id){
    VividSeats.eventService.remove( {id: id}, function(){
      console.log('remove successful')
      VividSeats.eventService.all(
            function(arr){
              $scope.eventArr = arr;
              $scope.$apply();
              $scope.showEditor = false;
            }, function(){
              console.log('failed to retrieve events');
              Materialize.toast('Network error! Try removing again.', 2000);
            });
    }, function(){
      console.log('remove failed');
      Materialize.toast('Network error! Try removing again.', 2000);
    })
  }

  function deepCopy (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
    }
  }]);

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