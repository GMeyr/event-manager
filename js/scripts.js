angular.module('EventManager', [])

  .controller('mainCtrl', ['$scope', '$timeout', function($scope, $timeout){

  var eventIdCount = 132;
  var venueIdCount = 3244;

  VividSeats.eventService.all(
    function(arr){
      console.log('arr', arr);
      $scope.eventArr = arr;
      separateIntoCities(arr);
      $scope.$apply();
    }, function(){
      console.log('failed to retrieve events');
    });
    

    $scope.openEditor = function(event){
      $scope.editedEvent = event;
      $scope.showCreator = false;
      angular.element('#nameInput').val(event.name);
      angular.element('#dateInput').val(event.date);
      angular.element('#venueInput').val(event.venue.name);
      angular.element('#cityInput').val(event.venue.city);
      angular.element('#stateInput').val(event.venue.state);
      $scope.showEditor = true;
    };

    $scope.cancel = function(Form){
      $scope['show' + Form] = false;
    };

    $scope.openCreator = function(){
      angular.element('#newNameInput').val("");
      angular.element('#newDateInput').val("");
      angular.element('#newVenueInput').val("");
      angular.element('#newCityInput').val("");
      angular.element('#newStateInput').val("");
      $scope.showEditor = false;
      $scope.showCreator = true;
    }

    $scope.createEvent = function() {
      var newEvent = {
        id : eventIdCount++,
        name : angular.element('#newNameInput').val(),
        date : angular.element('#newDateInput').val(),
        venue : {
          id: venueIdCount++,
          name : angular.element('#newVenueInput').val(),
          city : angular.element('#newCityInput').val(),
          state : angular.element('#newStateInput').val()
        }
      };

      VividSeats.eventService.add( newEvent, function(){
          console.log('add success');
          $scope.showCreator = false;
          VividSeats.eventService.all(
            function(arr){
              $scope.eventArr = arr;
              $scope.$apply();
              $scope.showEditor = false;
              $scope.showCreator = false;
              separateIntoCities(arr);
            }, function(){
              console.log('failed to add event');
              Materialize.toast('Network error! Try adding again.', 2000);
            });
        }, function(){
          console.log('add failed');
        });
      };

    $scope.updateEvent = function(event){
      
      var updatedEvent = {
        id: $scope.editedEvent.id,
        name : angular.element('#nameInput').val(),
        date : angular.element('#dateInput').val(),
        venue : {
          id: (function(){
            if( $scope.editedEvent.venue.name === angular.element('#venueInput').val() ){
              return $scope.editedEvent.venue.id;
            } else {
              return venueIdCount++;
            }
          })(),
          name : angular.element('#venueInput').val(),
          city : angular.element('#cityInput').val(),
          state : angular.element('#stateInput').val()
        }
      };
      console.log('trying to update', updatedEvent.id);
      

      VividSeats.eventService.update( updatedEvent,
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
              separateIntoCities(arr);
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
              separateIntoCities(arr);
            }, function(){
              console.log('failed to retrieve events');
              Materialize.toast('Network error! Try removing again.', 2000);
            });
    }, function(){
      console.log('remove failed');
      Materialize.toast('Network error! Try removing again.', 2000);
    })
  }

  $scope.onlyCity = function(city){
      VividSeats.eventService.all(
        function(arr){
          if( city === 'All' ){
            $scope.eventArr = arr;
            
          } else {
            $scope.eventArr = arr.filter(function(event){
              return event.venue.city === city;
            });
          }
          $scope.$apply();
        }, function(){
          console.log('failed to retrieve events');
          Materialize.toast('Network error! Try clicking again.', 2000);
    });
    
  };

  function separateIntoCities (arr) {
    var citiesObj = {};
    var citiesArr = [['All', arr.length]];

    arr.forEach(function(event){
      if( !citiesObj[event.venue.city] ){
        citiesObj[event.venue.city] = 1;
      } else {
        citiesObj[event.venue.city]++;
      }
    });

    for( var key in citiesObj){
      citiesArr.push([key, citiesObj[key]]);
    }

    $scope.cities = citiesArr;
    $scope.$apply();
  }
}]);

