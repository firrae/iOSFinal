angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SingleCtrl', function($scope, $stateParams, $http, $ionicModal, $timeout) {
    $http.get('http://mobile-final-server.herokuapp.com/bridges/' + $stateParams.bridgeID)
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.bridge = data;
        })
        .error();

        $scope.like = function(object) {
            console.log("liked! " + object._id);
            $http.post('http://mobile-final-server.herokuapp.com/likes/' + object._id);
        };

        $scope.doRefresh = function() {
            $http.get('http://mobile-final-server.herokuapp.com/bridges/' + $stateParams.bridgeID)
                .success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.bridges = data;
                })
                .error(function(data, status, headers, config) {
                    //console.log(data);
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

    $scope.correctionDirection = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/correct.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.correctionModal = function(object) {
        $scope.tempBridge = object;
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.correctionDirection);

        $http.post('http://mobile-final-server.herokuapp.com/correct',
            {
                ObjectId : $scope.tempBridge._id,
                minutes : $scope.correctionDirection.time,
                field : $scope.correctionDirection.direction.value
            });

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.directions = [
        {label : "Canada Commercial Flow", value : "correctionsCanCommercialFlow"},
        {label : "Canada Traveller Flow", value : "correctionsCanTravellersFlow"},
        {label : "US Commercial Flow", value : "correctionsUsCommercialFlow"},
        {label : "US Traveller Flow", value : "correctionsUsTravellersFlow"}
    ];

    $scope.correctionDirection.direction = $scope.directions[0];
})

.controller('BrowseCtrl', function($scope, $stateParams, $http, $ionicModal, $timeout) {
    $http.get('http://mobile-final-server.herokuapp.com/bridges')
        .success(function(data, status, headers, config) {
            //console.log(data);
            $scope.bridges = data;
        })
        .error(function(data, status, headers, config) {
            console.log(data);
        });

    $scope.like = function(object) {
        console.log("liked! " + object._id);
        $http.post('http://mobile-final-server.herokuapp.com/likes/' + object._id);
    };

    $scope.numLikes = function(object) {
        return object.likes;
    };

    $scope.doRefresh = function() {
        $http.get('http://mobile-final-server.herokuapp.com/bridges')
            .success(function(data, status, headers, config) {
                //console.log(data);
                $scope.bridges = data;
            })
            .error(function(data, status, headers, config) {
                //console.log(data);
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.correctionDirection = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/correct.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.correctionModal = function(object) {
        $scope.modal.show();
        $scope.tempBridge = object;
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.correctionDirection);

        $http.post('http://mobile-final-server.herokuapp.com/correct',
            {
                ObjectId : $scope.tempBridge._id,
                minutes : $scope.correctionDirection.time,
                field : $scope.correctionDirection.direction.value
            });

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

    $scope.directions = [
        {label : "Canada Commercial Flow", value : "correctionsCanCommercialFlow"},
        {label : "Canada Traveller Flow", value : "correctionsCanTravellersFlow"},
        {label : "US Commercial Flow", value : "correctionsUsCommercialFlow"},
        {label : "US Traveller Flow", value : "correctionsUsTravellersFlow"}
    ];

    $scope.correctionDirection.direction = $scope.directions[0];
});