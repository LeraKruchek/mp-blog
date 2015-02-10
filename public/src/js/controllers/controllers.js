/**
 * Created by Valeryia_Kruchak on 09-Feb-15.
 */
(function(){
    angular.module('blog-app.controllers', ['blog-app.services', 'blog-app.filters'])
        .controller('FirstPostController', FirstPostController)
        .controller('PostController', PostController);

    FirstPostController.$inject = ['$scope', 'PostFactory'];
    function FirstPostController($scope, PostFactory){
        var self = this;
        self.posts = [];
        PostFactory.getPosts().then(function(data){
            self.posts = data.sort(function(a,b){
                return b.date - a.date;
            });
        });
    }

    PostController.$inject = ['$scope', 'PostFactory', '$route', '$location'];
    function PostController($scope, PostFactory, $route, $location){
        var self = this;
        var id = $route.current.params.id
        self.posts = [];
        PostFactory.getPosts().then(function(data){
            self.posts = data.sort(function(a,b){
                return b.date - a.date;
            });
            self.currentPost = self.posts.filter(function(val){
                return val.visible_id === id;
            });
            self.currentPost = self.currentPost[0];
            self.nextPost = self.posts[self.posts.indexOf(self.currentPost) + 1];
            self.previousPost = self.posts[self.posts.indexOf(self.currentPost) - 1];
        });

    }
})();