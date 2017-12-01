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
  

        $scope.dialogUpdate = function () {
            console.log('2:  ', $scope.favoriteList);
            FavoritesSvc.updateFav ({
                name: $scope.currentItem.name,
                url: $scope.currentItem.url,
                id: $scope.currentItem.id
            }, function (sucess) {
                data.successCallBack();
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
            }, function (newItem) {
                console.log('dialog crete');
                data.successCallBack(newItem);
                $scope.dialogClose();
            }, function(err){
                console.log('eror',err);
            });
        };
       
        $scope.isDialogType = function (dType) {
            return dialogType === dType;
        };
        
    }]
    );