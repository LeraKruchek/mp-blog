/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
(function(){
    angular.module('blog-app.services', [])
        .factory('PostFactory', PostFactory)
        .factory('InfoFactory', InfoFactory);

    PostFactory.$inject = ['$http', '$q'];
    function PostFactory($http, $q){
        var postFactory = {};

       postFactory.getPosts = function(){
           var d1 = $q.defer();
           $http.get('/api/anon/posts')
               .success(function(data){
                   d1.resolve(data);
               })
               .error(function(){
                   console.log('error');
               });
           return d1.promise;
       };
       return postFactory;
    }


    InfoFactory.$inject = ['$q', '$http'];
    function InfoFactory($q, $http){
        var infoFactory = {};

        infoFactory.getInfo = function(){
            var d2 = $q.defer();
            $http.get('/api/anon/info')
                .success(function(data){
                    d2.resolve(data);
                })
                .error(function(err){
                    d2.reject();
                });
            return d2.promise;
        };
        return infoFactory;
    }
})();