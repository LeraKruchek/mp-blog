/**
 * Created by Valeryia_Kruchak on 18-Feb-15.
 */
(function(){
    angular.module('admin-app.directives',[])
        .directive('ngAddP', ngAddP);

    ngAddP.$inject = ['$sce'];
    function ngAddP($sce){
        return{
            restrict: 'A',
            scope: {
                ngAddP: '@'
            },
            link: function(scope, elem, attr){
                elem.bind('click', function(){
                    var cont = scope.ngAddP;
                    var tag =  "<p>1</p>";
                    scope.$apply($sce.trustAsHtml(scope.$parent.NewPostCtrl.newPost.output += tag));
                });
            }

        };
    }


})();