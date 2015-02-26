/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('AdminController', AdminController);

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
        self.hi = function(item){
            console.log(item);
        };

    }

})();