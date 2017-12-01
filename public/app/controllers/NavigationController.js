app.controller('NavCtrl', ['$scope', 'FavoritesSvc',
    function ($scope, FavoritesSvc) {

        var vm = this;
        vm.totalFavNum = 0;
        selectedTab = 1;
        vm.isSelected = function name(currentSelected) {
            return selectedTab === currentSelected;
        };
        vm.setSelected = function name(currentSelected) {
            return selectedTab = currentSelected;
        };

        function init() {
            FavoritesSvc.asignToTotalFavNumChanges(setTotalFavNum);
            // FavoritesSvc.getTotalFavNum(function (num) {
            //     vm.totalFavNum = num;
            // });
        }
        function setTotalFavNum(num) {
            vm.totalFavNum = num;
        }
        init();
    }]
);