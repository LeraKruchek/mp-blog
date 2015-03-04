/**
 * Created by Valeryia_Kruchak on 04-Mar-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('EditInfoController', EditInfoController);

    EditInfoController.$inject = ['AdminInfoFactory'];
    function EditInfoController(AdminInfoFactory){
        var self = this;
        self.info = {};
        self.info.output = '';
        AdminInfoFactory.getInfo().then(function(data){
            self.info = data[0];
        });
        self.saveInfo = function(){
            AdminInfoFactory.saveInfo(self.info).then(function(data){
                console.log(data);
            });
        };
    }
})();