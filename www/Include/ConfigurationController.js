angular.module('grossery.controllers')
    .controller('configController', function ($q, browseListService, $scope, $state, $stateParams, $ionicModal, $ionicPopup) {
        var id = 0;
        $scope.editMode = {
            state: false,
            index: -1
        };

        $scope.listData = {
            newListTitle: "",
        };
        $scope.newRateData = {
            'name': '',
            'amount': '',
            'quantity': '',
            'metric': 'Weight',
            'unit': 'Kg'
        }

        $scope.rateList = [{
            id: 123,
            name: 'Atta',
            amount: '2',
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
                $scope.newRateData.id = id;
                id = id + 1;
                $scope.rateList.push($scope.newRateData)
            } else {
                $scope.rateList[$scope.editMode.index] = angular.copy($scope.newRateData);
                $scope.editMode = {
                    state: false,
                    index: -1
                };

            }

        }
        $ionicModal.fromTemplateUrl('templates/newRateModal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.newRateModal = modal;
        });
        $scope.openModal = function () {
            if (!$scope.editMode.state)
                $scope.newRateData = {
                    'name': '',
                    'amount': '',
                    'quantity': '',
                    'metric': 'Weight',
                    'unit': 'Kg'
                }
            $scope.newRateModal.show();
        };
        $scope.closeModal = function () {
            $scope.editMode.state = false;
            $scope.newRateModal.hide();
        };
        $scope.editItem = function (index) {
            $scope.editMode.state = true;
            $scope.editMode.index = index;
            console.log($scope.rateList[index]);
            $scope.newRateData = angular.copy($scope.rateList[index]);
            /*  $scope.newRateData.name = $scope.rateList[index].name;
              $scope.newRateData.metric = $scope.rateList[index].metric;
              $scope.newRateData.quantity = $scope.rateList[index].quantity;      
              $scope.newRateData.unit = $scope.rateList[index].unit;*/
            $scope.openModal();
        }
        $scope.deleteItem = function (index) {
            if (index > -1) {
                $scope.rateList.splice(index, 1);
            }
        }

        $scope.saveList = function () {
            $scope.listData["items"] = angular.copy($scope.rateList);
            newListService.insertNewList(db, $scope.listData).then(function (x) {
                console.log(x)
            }, function (err) {
                console.log(err);
            })
        }
        $scope.cancelList = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.home');
        }
    })