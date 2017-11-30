app.service('eventDispatcherSvc', [function () {
    eventList= [];
    this.on = function (eventName, callBack) {
        console.log(eventName + callBack);
        eventList[eventName] = {
            dispach: callBack
        };
    }

    this.dispatch = function (eventName) {
        console.log(eventName + ' whas dispached.');
        eventList[eventName] && eventList[eventName].dispach();
    }
}]);