angular.module('EventManager', [])

  .controller('mainCtrl', ['$scope', function($scope){
    
  $scope.initModals = function() {
    $('.modal-trigger').leanModal();
  };

  $scope.focusOnEvent = function(event){
    $scope.focus = event;
  };




         VividSeats.eventService.all(
                      function(arr){
                        console.log('arr', arr);
                        $scope.stuff = arr;
                        console.log('scope.events', $scope.stuff);
                        $scope.$apply();
                      }, function(){
                        console.log('failed to retrieve events');
                      });

      $scope.updateEvent = VividSeats.eventService.update( focus,
    function(){
      console.log('update success');
    }, function(){
      console.log('update failed');
    });
  }])

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