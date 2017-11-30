app.service('LocalStorageSvc', [function () {
    
    this.get = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };

    this.set = function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    
}]);