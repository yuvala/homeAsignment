app.controller('FavoritesController', ['$scope','$controller', 'FavoritesSvc', 'ngDialog','actionLogSvc',
    function ($scope, $controller, FavoritesSvc, ngDialog, actionLogSvc) {
        var dialog = ngDialog;
        $scope.isTileView = false;      
        function dialogClose () {
            dialog.close();
        };

       $scope.delete = function (item) {
           var action = 'delete';
           openDialog(action, item, function(){
               actionLogSvc.addAction(action, item);
               refresh();
           });     
        };

        $scope.edit = function (item) {
           var action = 'edit'; 
            openDialog(action, item, function(){
                console.log('edit', $scope.favoriteList);
                actionLogSvc.addAction(action, item);
                refresh();
           });    
        };

        $scope.create = function (item) {
            var action = 'create'; 
            openDialog(action, item, function(newItem){
                console.log('create', $scope.favoriteList);
                actionLogSvc.addAction(action, newItem);
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

