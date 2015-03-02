/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
    angular.module('admin-app.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['AdminPostFactory', '$state', '$sanitize', '$scope'];
    function NewPostController(AdminPostFactory, $state, $sanitize, $scope){
        var self = this;
        self.newPost = {};
        self.newPost.date = '';
        self.newPost.output = '';

        $scope.$on('modal.closed', function(){
            $state.go('admin.archive');
        });

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
            });
        };
    }


})();