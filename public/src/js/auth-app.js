/**
 * Created by Valeryia_Kruchak on 13-Feb-15.
 */
(function(){
    angular.module('auth-app', [])
        .factory('Auth', Auth);

    Auth.$inject = ['$http', '$q', '$window'];
    function Auth(){
        var auth = {};
        auth.login = function(creds){
            var def = $q.defer();

            $http.post('')
        }
    }
})();