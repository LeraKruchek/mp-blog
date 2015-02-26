/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
(function() {
angular.module('blog-app', ['ui.router', 'admin-app', 'confirm-app', 'blog-app.directives', 'blog-app.controllers'])
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
                templateUrl: '/public/dist/templates/anon/first-post.html'
            })
            .state('anon.post', {
                url: '/articles/:id',
                controller: 'PostController',
                controllerAs: 'PostCtrl',
                templateUrl: '/public/dist/templates/anon/single-post.html'
            })
            .state('anon.login',{
                url: '/login',
                controller: 'LoginController',
                controllerAs: 'LoginCtrl',
                templateUrl: '/public/dist/templates/anon/login-page.html'
            })
            .state('anon.archive',{
                url: '/archive',
                controller: 'ArchiveController',
                controllerAs: 'ArchiveCtrl',
                templateUrl: '/public/dist/templates/anon/archive-page.html'
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
                url: '/admin/archive',
                templateUrl: '/public/dist/templates/admin/admin-archive.html'

            })

            .state('admin.new', {
                url: '/admin/new',
                controller: 'NewPostController',
                controllerAs:'NewPostCtrl',
                templateUrl: '/public/dist/templates/admin/admin-new.html'
             })
            .state('admin.edit',{
                url: '/admin/edit/:visible_id',
                controller: 'EditPostController',
                controllerAs: 'EditPostCtrl',
                templateUrl: '/public/dist/templates/admin/admin-edit.html'
            });

    }])

    .run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            var user = AuthService.getInfo();
            if (toState.name === 'anon.login'){
                if(user){
                    event.preventDefault();
                    $state.go('admin.archive');
                }
            }
            if(toState.data){
                if (!user){
                    event.preventDefault();
                    $state.go('anon.login');
                }
            }
        });

    }]);

})();