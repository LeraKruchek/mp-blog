/**
 * Created by Valeryia_Kruchak on 11-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers', ['admin-app.services'])
        .controller('AdminController', AdminController)
        .controller('LoginController', LoginController)
        .controller('NewPostController', NewPostController);

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
    }

    AdminController.$inject = ['AdminPostFactory', '$scope'];
    function AdminController(AdminPostFactory, $scope){
        var self = this;
        self.posts = [];
        AdminPostFactory.getPosts().then(function(posts){
            self.posts = posts;
        });
        self.deletePost = function(id, ind){
            AdminPostFactory.deletePost(id).then(function(res){
                self.posts.splice(ind,1);
            });
        };

    }

    NewPostController.$inject = ['$scope'];
    function NewPostController(){
        var self = this;
        self.newPost = {};
        self.newPost.text = 'hi';
        self.newPost.date = new Date();
    }


})();