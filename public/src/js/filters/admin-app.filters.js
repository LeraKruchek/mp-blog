/**
 * Created by Valeryia_Kruchak on 05-Mar-15.
 */
(function(){
    angular.module('admin-app.filters', [])
        .filter('deleteCR', deleteCR);

    function deleteCR(){
        return function(input){
            if (!input || !input.length) { return; }
            return input.replace(/\n/g, '');
        };
    }
})();