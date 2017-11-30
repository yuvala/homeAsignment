app.service('FavoritesSvc', ['LocalStorageSvc', function (LocalStorageSvc) {
    var favoriteLinks;
    var totalIndex = 0;
    var lastId = 0;
    var asignedFunction;
    var mock = [
        {
            name: 'sql server',
            url: 'http://csharp-video-tutorials.blogspot.co.il/2016/04/angularjs-ui-router-tutorial.html',
            id: 1

        },
        {
            name: 'angularjs',
            url: 'https://www.webcodegeeks.com/javascript/angular-js/angularjs-ui-router-example/',
            id: 2

        }, {
            name: 'CSS flex-grow Property',
            url: 'https://www.w3schools.com/cssref/css3_pr_flex-grow.asp',
            id: 3

        }, {
            name: 'Flex grid',
            url: 'http://styleboxproject.com/#/components/flex%20grid',
            id: 4

        }, {
            name: 'Flexbox Tutorial - Building a simple layout with Flexbox',
            url: 'https://www.youtube.com/watch?v=JqJNhM8i-nc&t=343s',
            id: 5

        }

    ];

    this.getList = function (succsessCallBack) {
        if (!favoriteLinks) {
            initMock();
        }
        succsessCallBack(favoriteLinks);
        asignedFunction(favoriteLinks.length);
    };

    this.removeFav = function (item, success) {
        favoriteLinks = _.without(favoriteLinks, _.findWhere(favoriteLinks, { id: item.id }));
        LocalStorageSvc.set('myFav', favoriteLinks);
        success(favoriteLinks);
        asignedFunction(favoriteLinks.length);
    }

    this.updateFav = function (item, success, failure) {
        var index = _.findIndex(favoriteLinks, {
            id: item.id
        });
        if (index !== -1) {
            favoriteLinks[index] = item;
            LocalStorageSvc.set('myFav', favoriteLinks);
            success(favoriteLinks);
        } else {
            failure('Entry already exists');
        }
    };

    this.createFav = function (item, success) {
        item.id = setId();
        favoriteLinks.push(item);
        LocalStorageSvc.set('myFav', favoriteLinks);
        success(item);
        asignedFunction(favoriteLinks.length);
    };

    this.asignToTotalFavNumChanges = function name(fn) {
        asignedFunction = fn;
    }

    function keepLastId(fav) {
        var index = 0;
        _.forEach(fav, function (value, key) {
            if (value.id > index) {
                index = value.id;
            }
        });
        localStorage.setItem('LastId', JSON.stringify(index));
    }

    function setId() {
        var newId = JSON.parse(localStorage.getItem('LastId')) + 1;
        LocalStorageSvc.set('LastId', newId);
        return newId;
    }

    function initMock() {
        if (!localStorage.getItem('myFav')) {
            LocalStorageSvc.set('myFav', mock);
        }
        favoriteLinks = LocalStorageSvc.get('myFav');
        keepLastId(favoriteLinks);
    }

}]
);