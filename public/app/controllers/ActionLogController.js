app.controller('ActionLogController', ['$scope', 'actionLogSvc',
    function ($scope, actionLogSvc) {
        ctrl = this;
        ctrl.actionLogs;
        ctrl.xxx ='yuval';

        function getActionLog() {
            actionLogSvc.getList(function(data) {
                ctrl.actionLogs = data;
            });
        }
        function init(){
        getActionLog();
        }

        init();

    }]
);