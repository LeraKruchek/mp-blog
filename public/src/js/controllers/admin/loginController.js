/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AuthService', '$state'];
    function LoginController(AuthService, $state){
        var self = this;
        self.req = {};
        self.login = function(){
            self.req.name = self.name;
            self.req.password = self.password;
            AuthService.login(self.req).then(function(res){
                self.req = {};
                $state.go('admin.archive');
            });
        };
        self.logout = function(){
            AuthService.logout();
            $state.go('anon.login');
        };
    }
})();