app.service('LocalStorageSvc', [function () {

    this.get = function (key) {
        console.log('getting from: ', key);
        return JSON.parse(localStorage.getItem(key));
    };

    this.set = function (key, data) {
        console.log('inserting to: ', key);
        localStorage.setItem(key, JSON.stringify(data));
    }

}]);