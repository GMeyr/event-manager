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
    
    $scope.initModals = function() {
      $('.modal-trigger').leanModal();
    };

    $scope.focusOnEvent = function(event){
      $scope.focus = event;
    };

    $scope.backupCloseModal = function(){
      $timeout(function(){
        angular.element('#editor').closeModal();
        angular.element('.lean-overlay').remove();
      }, 100);

    }

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
          VividSeats.eventService.all(
            function(arr){
              $scope.eventArr = arr;
              $scope.$apply();
              $scope.backupCloseModal();
            }, function(){
              console.log('failed to retrieve events');
            });
        }, function(){
          console.log('update failed');
        });
    };


  var deepCopy = function (obj) {
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
    };
  }])


  // $scope.updateEvent = VividSeats.eventService.update( focus,
  //   function(){
  //     console.log('update success');
  //   }, function(){
  //     console.log('update failed');
  //   });
  // }])

  // this custom directive is not my code, it's a tip from StackOverflow
  .directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval(attrs.repeatDone);
        }
    }
});

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