angular.module('grossery.controllers')
    .controller('browseListController', function ($q, browseListService, $scope, $state, $stateParams, $ionicModal, $ionicPopup) {
        $scope.listDetails = [];
        browseListService.getListTitles(db).then(function (data) {
            console.log(data);
            $scope.listDetails = angular.copy(data);
        });
        $scope.delete = function (listId) {
            browseListService.deleteList(db, listId).then(function (data) {
                $scope.listDetails = [];
                browseListService.getListTitles(db).then(function (data) {
                    console.log(data);
                    $scope.listDetails = angular.copy(data);
                });
            })
        }
    })