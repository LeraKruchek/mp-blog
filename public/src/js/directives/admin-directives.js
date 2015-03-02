/**
 * Created by Valeryia_Kruchak on 18-Feb-15.
 */
(function(){
    angular.module('admin-app.directives',[])
        .directive('ngAddTag', ngAddTag);

    ngAddTag.$inject = ['$sce'];
    function ngAddTag($sce){

        function getCaret(elem){
            var offset = 0;
            if (elem !== null){
                if (elem.createTextRange){
                    var range = elem.createTextRange();
                    range.moveStart('character', -elem.value.length);
                    offset = range.text.length;
                }
            }
            return offset;
        }

        return{
            restrict: 'A',
            scope: {
                output: '=',
                ngAddTag: '@'
            },
            link: function(scope, elem, attr){
                elem.bind('click', function(){
//                    var tag = (scope.output === '') ? '' : '\n';
                    var tag = '';
                    var el = document.getElementsByClassName("contenteditable");
                    var pos = el[0].selectionStart;
                    switch (scope.ngAddTag){
                        case 'p': tag += '<p></p>';
                            break;
                        case 'img': tag += '<img src="">';
                            break;
                        case 'figcaption': tag += '<figcaption></figcaption>';
                            break;
                        case 'a': tag += '<a href=""></a>';
                            break;
                    }
                    scope.output = scope.output.slice(0, pos) + tag + scope.output.slice(pos, scope.output.length);
                    scope.$apply($sce.trustAsHtml(scope.output));
                });
            }

        };
    }


})();