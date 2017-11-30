var app = angular.module('myApp',[
    'ui.router','ngDialog']).
    config(['$stateProvider', function($stateProvider, $urlRouterProvider, ngDialog){
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
   
 