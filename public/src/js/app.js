/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
(function() {
angular.module('blog-app', ['ngRoute', 'blog-app.directives', 'blog-app.services', 'blog-app.controllers', 'blog-app.filters'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                controller: 'FirstPostController',
                controllerAs: 'FirstPostController',
                templateUrl: '/public/dist/templates/first-post.html'
            })
            .when('/articles/:id', {
                controller: 'PostController',
                controllerAs: 'PostCtrl',
                templateUrl: '/public/dist/templates/single-post.html'
            })
             .otherwise({ redirectTo: '/'});
    }]);

})();