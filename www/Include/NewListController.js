angular.module('grossery.controllers')
  .controller('NewListController', function ($scope, $state, $stateParams, $ionicHistory, $ionicModal, $ionicPopup, newListService) {
    var id = 0;
    $scope.editMode = {
      state: false,
      index: -1
    };

    $scope.listData = {
      newListTitle: "",
    };
    $scope.newItemData = {
      metric: "weight"
    }

    $scope.itemsList = [{
      id: 123,
      name: 'Atta',
      amount: '200',
      quantity: '10',
      metric: 'Weight',
      unit: 'Kg'
    }, {
      id: 321,
      name: 'Salt',
      quantity: '10',
      amount: '350',
      metric: 'Weight',
      unit: 'Kg'
    }];


    $scope.createItemClick = function () {
      if (!$scope.editMode.state) {
        $scope.newItemData.id = id;
        id = id + 1;
        $scope.itemsList.push($scope.newItemData)
      } else {
        $scope.itemsList[$scope.editMode.index] = angular.copy($scope.newItemData);
        $scope.editMode = {
          state: false,
          index: -1
        };

      }

    }
    $ionicModal.fromTemplateUrl('templates/newItemModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.newItemModal = modal;
    });
    $scope.openModal = function () {
      if (!$scope.editMode.state)
        $scope.newItemData = {};
      $scope.newItemModal.show();
    };
    $scope.closeModal = function () {
      $scope.editMode.state = false;
      $scope.newItemModal.hide();
    };
    $scope.editItem = function (index) {
      $scope.editMode.state = true;
      $scope.editMode.index = index;
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

    $scope.saveList = function () {
      $scope.listData["items"] = angular.copy($scope.itemsList);
      newListService.insertNewList(db, $scope.listData).then(function (x) {
        console.log(x); window.plugins.toast.showShortBottom('List Saved Successfully',
          function (a) { $state.go('app.home'); },
          function (b) {
            console.log(b);
          });
        $state.go('app.home');

      }, function (err) {
        console.log(err);
      });
      try {
        window.plugins.toast.showShortBottom('List Saved Successfully',
          function (a) { $state.go('app.home'); },
          function (b) {
            console.log(b);
          });
      } catch (err) { }
       $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.home');
    }
    $scope.cancelList = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.home');
    }
  })
