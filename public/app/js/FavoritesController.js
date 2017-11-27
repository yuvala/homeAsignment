app.controller('FavoritesController', ['$scope','$controller', 'FavoritesSvc', 'ngDialog',
    function ($scope, $controller, FavoritesSvc, ngDialog) {
        var dialog = ngDialog;
        $scope.isTileView = false;
       
        function dialogClose () {
            dialog.close();
        };

       $scope.delete = function (item) {
           openDialog('delete', item, function(){
               refresh();
           });     
        };

        $scope.edit = function (item) {
            openDialog('edit', item);     
        };

        $scope.create = function (item) {  
            openDialog('create', item, function(){
                console.log('refresh', $scope.favoriteList);
                refresh();
           });                  
        };


        function openDialog(type, item, successCallBack) {
            dialog.open({
                template: 'templates/ng-dialog-content.view.html',
                scope: $scope,
                className: 'ngdialog-theme-default',
                controller: $controller('dialogController', {
                    $scope: $scope,
                    data: {
                        dialogType: type,
                        item: item || {name:'',url:''},
                        dialogClose: dialogClose,
                        successCallBack:successCallBack
                    }
                })
            });
        }

        

        $scope.toggleView = function () {
            $scope.isTileView = !$scope.isTileView;
        };
        
        function refresh(){
            FavoritesSvc.getList(function(data){
                console.log('refresh', data);
                 $scope.favoriteList = data;
            });
        }
        function init(){
            refresh();
            
        }
        init();
        
    }]
);

