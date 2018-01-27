app.service('actionLogSvc', ['actionLogEntity', function (actionLogEntity) {
    
    this.getList = function (succsessCallBack) {
        actionLogEntity.get(function(data){
            succsessCallBack(data);
        });
        
    };

 
  
    function init() {
       
    }
    init();
}]);