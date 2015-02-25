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
        $http.defaults.headers.delete = { "access_token" : userInfo.accessToken };
        $http.defaults.headers.post = { "access_token" : userInfo.accessToken };
        $http.defaults.headers.post["Content-Type"] = "application/json";

        adminPostFactory.getPosts = function(){
            var d1 = $q.defer();
            $http.get('api/admin/posts')
                .success(function(data){
                    d1.resolve(data);
                })
                .error(function(err){
                    d1.reject();
                });
            return d1.promise;
        };

        adminPostFactory.deletePost = function(id){
            var d2 = $q.defer();
            $http.delete('api/admin/delete/' + id)
                .success(function(data){
                    d2.resolve(data);
                })
                .error(function(err){
                    d2.reject();
                });
            return d2.promise;
        };

        adminPostFactory.addPost = function(newPost){
            var d3 = $q.defer();
            $http.post('api/admin/posts', newPost)
                .success(function(data){
                    d3.resolve(data);
                })
                .error(function(){
                    d3.reject();
                });
            return d3.promise;
        };

        return adminPostFactory;
    }
})();