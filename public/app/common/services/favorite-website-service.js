app.service('FavoritesSvc', ['LocalStorageSvc','FavoriteEntity', function (LocalStorageSvc, FavoriteEntity) {
    const keyName = 'myFav';
    var favoriteLinks;
    var totalIndex = 0;
    var lastId = 0;
    var asignedFunction;
 
    this.getList = function (succsessCallBack) {
        FavoriteEntity.get({},function(result){
            favoriteLinks = result;
            succsessCallBack(favoriteLinks);
            
        });
        // if (!favoriteLinks) {
        //     init();
        // }
        // succsessCallBack(favoriteLinks);
        // asignedFunction(favoriteLinks.length);
    };

    this.removeFav = function (item, success) {
        // favoriteLinks = _.without(favoriteLinks, _.findWhere(favoriteLinks, { id: item.id }));
        // LocalStorageSvc.set(keyName, favoriteLinks);
        // success(favoriteLinks);
        // asignedFunction(favoriteLinks.length);
    }

    this.updateFav = function (item, success, failure) {
        FavoriteEntity.update(item, function(result){
            favoriteLinks = result;
            success(item);
        });
        // var index = _.findIndex(favoriteLinks, {
        //     id: item.id
        // });
        // if (index !== -1) {
        //     favoriteLinks[index] = item;
        //     LocalStorageSvc.set(keyName, favoriteLinks);
        //     success(favoriteLinks);
        // } else {
        //     failure('Entry already exists');
        // }
    };

    this.createFav = function (item, success) {
        // item.id = setId();
        // favoriteLinks.push(item);
        // LocalStorageSvc.set(keyName, favoriteLinks);
        // success(item);
        // asignedFunction(favoriteLinks.length);

        FavoriteEntity.create(item, function(result){
            favoriteLinks = result;
            success(item);
        });
        
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

    function init() {
        FavoriteEntity.get({},function(result){
            favoriteLinks = result;
            
        });



        // if (!localStorage.getItem(keyName)) {
        //     LocalStorageSvc.set(keyName, mock);
        // }
      //  favoriteLinks = LocalStorageSvc.get(keyName);
        // keepLastId(favoriteLinks);
        // asignedFunction && asignedFunction(favoriteLinks.length);
    }
    
    init();
}]
);