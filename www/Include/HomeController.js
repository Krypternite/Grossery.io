angular.module('grossery.controllers')
    .controller('homeController', function ($q, homeService, $ionicHistory, $scope, $state, $stateParams, $ionicModal, $ionicPopup) {
        $scope.empty = false;
        var db = window.openDatabase("my.db", "1.0", "Cordova Demo", 200000);
        $scope.createNewList = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.newList');
        }
        $scope.listDetails = [];
        $scope.noListMessage = "Sorry, it seems like you have not made any lists yet. Start by creating a new list";
        if ($scope.listDetails.length > 0) {
            $scope.empty = false;

        } else {
            $scope.empty = true;
            console.log("empty")
        }
        homeService.getRecentListDetails(db).then(function (data) {
            $scope.listDetails = angular.copy(data);

        })

    })