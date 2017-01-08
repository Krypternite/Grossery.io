angular.module('grossery.controllers')
    .controller('browseChildController', function ($q, browseListService, $scope, $state, $stateParams, $ionicModal, $ionicPopup) {
        console.log($stateParams.listId);
        $scope.listObj = {};
        browseListService.getListDetails(db, $stateParams.listId).then(function (data) {
            $scope.listObj = angular.copy(data);
            console.log($scope.listObj);
        })
    })