/**
 * Created by Valeryia_Kruchak on 04-Mar-15.
 */
(function(){
    angular.module('blog-app.controllers')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['InfoFactory'];
    function InfoController(InfoFactory){
        var self = this;
        InfoFactory.getInfo().then(function(data){
            self.info = data[0].output;
        });
    }
})();