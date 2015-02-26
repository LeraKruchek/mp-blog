/**
 * Created by Valeryia_Kruchak on 26-Feb-15.
 */
(function(){
   angular.module('admin-app.controllers')
       .controller('EditPostController', EditPostController);

    EditPostController.$inject = ['AdminPostFactory', '$stateParams', '$sanitize'];
    function EditPostController(AdminPostFactory, $stateParams, $sanitize){
        var self = this;
        var visible_id = $stateParams.visible_id;
        AdminPostFactory.getPost(visible_id).then(function(data){
            self.post = data[0];
            self.state = self.post.state === 'visible' ? false : true;
        });
        self.savePost = function(){
            self.post.output = $sanitize(self.post.output);
            if (self.state){
                self.post.state = 'hidden';
            }
            else{
                self.post.state = 'visible';
            }
            AdminPostFactory.savePost(self.post._id, self.post).then(function(data){
                console.log(data);
            });
        };
    }
})();