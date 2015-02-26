/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('blog-app.controllers')
        .controller('PostController', PostController);

    PostController.$inject = ['$scope', 'PostFactory', '$stateParams', '$location'];
    function PostController($scope, PostFactory, $stateParams, $location){
        var self = this;
        var id = $stateParams.id;
        console.log($location.path());
        console.log($location.search());
        self.posts = [];
        PostFactory.getPosts().then(function(data){
            self.posts = data;
            self.currentPost = self.posts.filter(function(val){
                return val.visible_id === id;
            });
            self.currentPost = self.currentPost[0];
            self.nextPost = self.posts[self.posts.indexOf(self.currentPost) + 1];
            self.previousPost = self.posts[self.posts.indexOf(self.currentPost) - 1];
        });
    }

})();