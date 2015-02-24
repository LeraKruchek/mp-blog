/**
 * Created by Valeryia_Kruchak on 18-Feb-15.
 */
(function(){
    angular.module('admin-app.directives',[])
        .directive('ngResultAction', ngResultAction);

    function ngResultAction(){
        return{
            restrict: 'EA',
            templateUrl: '/public/dist/templates/partials/result-action.html',
            replace: true
//            link: function(scope, element, attrs, ngModel) {
//
//            }


        };
    }


})();