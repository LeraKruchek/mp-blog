/**
 * Created by Valeryia_Kruchak on 04-Mar-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('editInfoController', editInfoController);

    function editInfoController(){
        var self = this;
        self.info.output = '';
    }
})();