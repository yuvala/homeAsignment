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
    };

    this.removeFav = function (item, success) {
        FavoriteEntity.delete(
            {id : item.id}, function(result){
            favoriteLinks = _.without(favoriteLinks, _.findWhere(favoriteLinks, { id: item.id }));
            success(item);
        });
    }

    this.updateFav = function (item, success, failure) {
        FavoriteEntity.update(item, function(result){
            favoriteLinks = result;
            success(item);
        });
    };

    this.createFav = function (item, success) {
 
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
    }
    
    init();
}]
);