/**
 * Created by Valeryia_Kruchak on 18-Feb-15.
 */
(function(){
    angular.module('admin-app.directives',[])
//        .directive('ngConfirmCLick', ngConfirmCLick)
        .directive('ngContenteditable', ngContenteditable);

//    function ngConfirmClick(){
//        return{
//            restrict: 'A',
//            link: function(scope, elem, attrs){
//
//            }
//        };
//    }

    function ngContenteditable(){
        return{
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function () {
                    scope.$evalAsync(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }


        };
    }


})();