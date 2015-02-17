/**
 * Created by Valeryia_Kruchak on 11-Feb-15.
 */
(function(){
    angular.module('admin-app.services', [])
        .factory('AuthService', AuthService)
        .factory('AdminPostFactory', AdminPostFactory);

    AuthService.$inject = ['$http', '$q', '$window'];
    function AuthService($http, $q, $window){
        var authService = {};

        authService.login = function(req){
            var d1 = $q.defer();
            $http.post('/api/login', req)
                .success(function(res){
                    authService.userInfo = {
                        accessToken: res.access_token,
                        userName: res.userName
                    };
                    $window.sessionStorage.userInfo = JSON.stringify(authService.userInfo);
                    d1.resolve(res);
                })
                .error(function(res){
                   d1.reject(res);
                   console.log(res);
                });
            return d1.promise;
        };

        authService.logout = function(){
            authService.userInfo = null;
            $window.sessionStorage.userInfo = null;
        };

        authService.getInfo = function(){
            return authService.userInfo;
        };

        function init() {
            if ($window.sessionStorage.userInfo) {
                authService.userInfo = JSON.parse($window.sessionStorage.userInfo);
            }
        }
        init();

          return authService;
    }

    AdminPostFactory.$inject = ['$http', '$q', 'AuthService'];
    function AdminPostFactory($http, $q, AuthService){
        var adminPostFactory = {};
        var userInfo = AuthService.getInfo();
        $http.defaults.headers.get = { "access_token" : userInfo.accessToken };
        adminPostFactory.getPosts = function(){
            var d1 = $q.defer();
            $http({
                method: 'GET',
                url: 'api/admin/posts'
//                headers: { "access_token": userInfo.accessToken}
            })

                .success(function(data){
                    d1.resolve(data);
                })
                .error(function(err){
                    d1.reject();
                });
            return d1.promise;
        };


        return adminPostFactory;
    }
})();