angular.module('grossery.controllers')
    .controller('NewListController', function ($scope, $state, $stateParams, $ionicModal, $ionicPopup) {

        $scope.listData = {
            newListTitle: "",


        };
        $scope.newItemData = {
            metric: "weight"
        }

        $scope.itemsList = [{
            name: 'Atta',
            quantity: '10',
            metric: 'Weight',
            unit: 'Kg'
        }, {
            name: 'Salt',
            quantity: '10',
            metric: 'Weight',
            unit: 'Kg'
        }];


        $scope.createItemClick = function () {
            $scope.itemsList.push($scope.newItemData);
        }


        $ionicModal.fromTemplateUrl('templates/newItemModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.newItemModal = modal;
        });
        $scope.openModal = function () {
            $scope.newItemModal.show();
        };
        $scope.closeModal = function () {
            $scope.newItemModal.hide();
        };

    })