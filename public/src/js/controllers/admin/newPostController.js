/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['AdminPostFactory', '$state', '$sanitize'];
    function NewPostController(AdminPostFactory, $state, $sanitize){
        var self = this;
        self.newPost = {};
        self.newPost.date = '';
        self.newPost.output = '';
        self.addPost = function(){
            self.newPost.output = $sanitize(self.newPost.output);
            if (self.newPost.state){
                self.newPost.state = 'draft';
            }
            else{
                self.newPost.state = 'visible';
                self.newPost.date = new Date();
            }
            AdminPostFactory.addPost(self.newPost).then(function(data){
                self.newPost = {};
                console.log(data);
                $state.go('admin.archive');
            });
        };
    }


})();