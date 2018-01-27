app.controller('ActionLogController', ['$scope', 'actionLogSvc',
    function ($scope, actionLogSvc) {
        ctrl = this;
        ctrl.actionLogs;
       
        function getActionLog() {
            actionLogSvc.getList(function(data) {
                console.log(':::::::',data);
                ctrl.actionLogs = _.forEach(angular.copy(data), function(entry) {
                    entry.time = moment(entry.time).format('HH:m:s  DD.MM');
                    console.log(entry.time);
                }); 
            });
        }
        function init(){
            getActionLog();
        }

        init();

    }]
);