app.controller('FavoritesController', ['$scope','$controller', 'FavoritesSvc', 'ngDialog', 
    function ($scope, $controller, FavoritesSvc, ngDialog) {
        var dialog = ngDialog;
        $scope.isTileView = false;      
        function dialogClose () {
            dialog.close();
        };

       $scope.delete = function (item) {
           var action = 'delete';
           openDialog(action, item, function(){
               refresh();
           });     
        };

        $scope.edit = function (item) {
           var action = 'edit'; 
            openDialog(action, item, function(){
                refresh();
           });    
        };

        $scope.create = function (item) {
            var action = 'create'; 
            openDialog(action, item, function(newItem){
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
                        successCallBack: successCallBack
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

