/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('blog-app.controllers')
        .controller('ArchiveController', ArchiveController);

    ArchiveController.$inject = ['PostFactory'];
    function ArchiveController(PostController){
        var self = this;
        self.posts = [];
        PostController.getPosts().then(function(data){
            self.posts = data;
        });
    }



})();