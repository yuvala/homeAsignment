app
    .factory('FavoriteEntity', ['$resource', function ($resource) {
        return $resource('/api/favorites/',{id:'@id'},
            {
                'get': { method: 'GET', isArray: true },
                'create': { method: 'POST', isArray: true },
                'update': { method: 'PUT', isArray: true , url:'/api/favorites/:id' },
                'delete': { method: 'delete', isArray: true , url:'/api/favorites/:id' }
            });
    }]);  