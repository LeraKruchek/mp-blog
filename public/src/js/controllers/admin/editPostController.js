/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
   angular.module('admin-app.controllers')
       .controller('EditPostController', EditPostController);

    EditPostController.$inject = ['AdminPostFactory', '$stateParams', '$state', '$sanitize', '$scope'];
    function EditPostController(AdminPostFactory, $stateParams, $state, $sanitize, $scope){
        var self = this;
        var visible_id = $stateParams.visible_id;

        $scope.$on('modal.closed', function(){
            $state.go('admin.archive');
        });

        AdminPostFactory.getPost(visible_id).then(function(data){
            self.post = data[0];
            self.post.output = self.decodeEntities(self.post.output);
            self.state = self.post.state === 'visible' ? false : true;
        });

        self.decodeEntities = function(value) {
            return value.
                replace(/&amp;/g, '&').
                replace(/&#\d+;/g, function(value) {
                    var m = value.match(/\d+/g);
                    return String.fromCharCode(m[0]);
                });
        };

        self.savePost = function(){
            self.post.output = $sanitize(self.post.output);
            if (self.state){
                self.post.state = 'hidden';
            }
            else{
                self.post.state = 'visible';
            }
            AdminPostFactory.savePost(self.post._id, self.post).then(function(data){
            });
        };


    }
})();