app.controller('dialogController', ['$scope', 'data', 'FavoritesSvc', function ($scope, data, FavoritesSvc){
        
        
        dialogType = data.dialogType;
        $scope.currentItem = {
            name: data.item.name,
            url: data.item.url,
            id: data.item.id || undefined
        };


        $scope.dialogClose = function () {
            data.dialogClose();
        };
 
        $scope.dialogClose = function () {
            data.dialogClose();
        };

        $scope.dialogUpdate = function () {
            console.log('2:  ', $scope.favoriteList);
            FavoritesSvc.updateFav ({
                name: $scope.currentItem.name,
                url: $scope.currentItem.url,
                id: $scope.currentItem.id
            }, function (sucess) {
                $scope.dialogClose();
            })
        };

        $scope.dialogDelete = function () {           
            FavoritesSvc.removeFav($scope.currentItem, function () {
                data.successCallBack();
                $scope.dialogClose();
            })
        };
        $scope.dialogCreate = function () {
            FavoritesSvc.createFav({
                name: $scope.currentItem.name,
                url: $scope.currentItem.url
            }, function () {
                $scope.dialogClose();
            }, function(err){
                console.log('eror',err);
            });
        };
        $scope.dialogCreate2 = function () {
            FavoritesSvc.createFav($scope.currentItem, function () {
                $scope.dialogClose();
            }, function(err){
                console.log('eror',err);
            });
        };


        $scope.isDialogType = function (dType) {
            console.log('dialogType === dType', dialogType === dType);
            return dialogType === dType;
        };
        
    }]
    );