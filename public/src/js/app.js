/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
(function() {
angular.module('blog-app', ['ui.router', 'admin-app','blog-app.directives', 'blog-app.controllers'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('anon',{
                abstract: true,
                template: "<ui-view/>"
            })
            .state('anon.firstPost', {
                url: '/',
                controller: 'FirstPostController',
                controllerAs: 'FirstPostController',
                templateUrl: '/public/dist/templates/first-post.html'
            })
            .state('anon.post', {
                url: '/articles/:id',
                controller: 'PostController',
                controllerAs: 'PostCtrl',
                templateUrl: '/public/dist/templates/single-post.html'
            })
            .state('anon.login',{
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'LoginCtrl',
                templateUrl: '/public/dist/templates/login-page.html'
            });

            $stateProvider
            .state('admin',{
                abstract: true,
                controller: '',
                template: "<ui-view/>",
                data:{
                    auth: true
                }
            })
            .state('admin.archive', {
                controller: 'AdminController',
                controllerAs: 'AdminCtrl',
                url: '/admin',
                templateUrl: '/public/dist/templates/admin/admin-home.html'

            })

            .state('admin.new', {
                url: '/admin/new',
                controller: '',
                template: '<p>new</p>'
             })
            .state('admin.edit',{
                url: '/admin/edit/:id',
                controller: 'AdminController',
                template: "<p>edit</p>"
            });




    }])

    .run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if(toState.data){
                var user = AuthService.getInfo();
                if (!user){
                    event.preventDefault();
                    $state.go('anon.login');
                }
            }
        });

    }]);

})();