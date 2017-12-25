var app = angular.module('myApp',[
    'ui.router','ngDialog','ngResource']).
    config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider, ngDialog, ngResource){
        $urlRouterProvider.otherwise('favorites');
        
        $stateProvider
        .state('favorites', {
            url:'/favorites',
            templateUrl:'templates/favorite-websites.view.html', 
            controller:'FavoritesController'
        }) 
        .state('actionsLog', {
            url:'/actionsLog',
            templateUrl:'templates/actions-log.view.html',
            controller:'ActionLogController',
            controllerAs:'nv'
        });
         
        
      

    }]);  
   
 