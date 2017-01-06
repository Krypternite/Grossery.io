angular.module('grossery.controllers')
  .controller('NewListController', function ($scope, $state, $stateParams, $ionicModal, $ionicPopup) {

    $scope.editMode = false;
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
        if(!$scope.editMode)
      $scope.itemsList.push($scope.newItemData);
      else
      $scope.itemsList
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
    $scope.editItem = function (index) {
      $scope.editMode = true;
      console.log($scope.itemsList[index]);
      $scope.newItemData = angular.copy($scope.itemsList[index]);
      /*  $scope.newItemData.name = $scope.itemsList[index].name;
        $scope.newItemData.metric = $scope.itemsList[index].metric;
        $scope.newItemData.quantity = $scope.itemsList[index].quantity;      
        $scope.newItemData.unit = $scope.itemsList[index].unit;*/
      $scope.openModal();
    }
    $scope.deleteItem = function (index) {
      if (index > -1) {
        $scope.itemsList.splice(index, 1);
      }
    }

  })
