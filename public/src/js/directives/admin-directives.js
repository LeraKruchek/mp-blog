/**
 * Created by Valeryia_Kruchak on 18-Feb-15.
 */
(function(){
    angular.module('admin-app.directives',[])
        .directive('ngAddTag', ngAddTag);

    ngAddTag.$inject = ['$sce'];
    function ngAddTag($sce){
        return{
            restrict: 'A',
            scope: {
                output: '=',
                ngAddTag: '@'
            },
            link: function(scope, elem, attr){
                elem.bind('click', function(){
                    var tag = '';
                    var el = document.getElementsByClassName("contenteditable");
                    var value = el[0].value;
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
                     scope.output = value.slice(0, pos) + tag + value.slice(pos, value.length);
                     scope.$apply($sce.trustAsHtml(scope.output));
                });
            }

        };
    }

})();