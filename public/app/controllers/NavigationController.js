app.controller('NavCtrl', ['$scope', '$state', 'FavoritesSvc',
    function ($scope, $state, FavoritesSvc) {

        var vm = this;
        vm.totalFavNum = 0;
        
        selectedTab = 'favorites';
        vm.isSelected = function (currentSelected) {
            return selectedTab === currentSelected;
        };
         
        setSelected = function (currentSelected) {
             return selectedTab = currentSelected;
        };
 
        vm.navTo = function (sref) {
            $state.go(sref);
            setSelected(sref);
        };

        function init() {
            FavoritesSvc.asignToTotalFavNumChanges(setTotalFavNum);
        }

        function setTotalFavNum(num) {
            vm.totalFavNum = num;
        }
        
        init();
    }]
);