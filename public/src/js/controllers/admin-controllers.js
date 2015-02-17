/**
 * Created by Valeryia_Kruchak on 11-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers', ['admin-app.services'])
        .controller('AdminController', AdminController)
        .controller('LoginController', LoginController);

    AdminController.$inject = ['AdminPostFactory'];
    function AdminController(AdminPostFactory){
        var self = this;
        AdminPostFactory.getPosts().then(function(posts){
            self.posts = posts;
        });

    }

    LoginController.$inject = ['AuthService', '$state'];
    function LoginController(AuthService, $state){
        var self = this;
        self.req = {};
        self.login = function(){
            self.req.name = self.name;
            self.req.password = self.password;
            AuthService.login(self.req).then(function(res){
                self.req = {};
                $state.go('admin.home');
            });

        };
    }


})();