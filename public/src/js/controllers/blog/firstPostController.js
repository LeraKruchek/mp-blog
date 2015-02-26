/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('blog-app.controllers')
        .controller('FirstPostController', FirstPostController);

    FirstPostController.$inject = ['$scope', 'PostFactory'];
    function FirstPostController($scope, PostFactory){
        var self = this;
        self.posts = [];
        PostFactory.getPosts().then(function(data){
            self.posts = data;
        });
    }

})();