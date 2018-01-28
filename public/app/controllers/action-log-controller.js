app.controller('ActionLogController', ['$scope', 'actionLogSvc',
    function ($scope, actionLogSvc) {
        ctrl = this;
        ctrl.actionLogs;
        var currentData = '';


        ctrl.getfile = function (filename) {
            if (!currentData) {
                console.error('No data');
                return;
            }

            if (!filename) {
                filename = 'download.json';
            }

            if (typeof currentData === 'object') {
                currentData = JSON.stringify(currentData, undefined, 2);
            }
            var blob = new Blob([currentData], {type: 'text/plain'});
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, filename);
            }
            else{
                var e = document.createEvent('MouseEvents'),
                    a = document.createElement('a');
          
                a.download = filename;
                a.href = window.URL.createObjectURL(blob);
                a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
                e.initEvent('click', true, false, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                a.dispatchEvent(e);
            }
            // if (currentData) {
            //     var file = new Blob([currentData], { type: 'text/plain' });

            //     var fileURL = window.URL.createObjectURL(file);
            //     return fileURL;
            // }
        };


        function getActionLog() {
            actionLogSvc.getList(function (data) {
                currentData = data;

                ctrl.actionLogs = _.forEach(angular.copy(data), function (entry) {
                    entry.time = moment(entry.time).format('HH:m:s  DD.MM');
                    console.log(entry.time);
                });
            });
        }
        function init() {
            getActionLog();
        }

        init();

    }]
);