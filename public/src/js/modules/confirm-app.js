/**
 * Created by Valeryia_Kruchak on 24-Feb-15.
 */
angular.module('confirm-app', ['ui.bootstrap'])
    .directive('ngReallyClick', ngReallyClick);


    ngReallyClick.$inject = ['$modal'];
    function ngReallyClick($modal){

        var ModalCtrl = function($scope, $modalInstance){
            $scope.ok = function(){
                $modalInstance.close();
            };
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            };
        };

        return{
            restrict: 'A',
            scope: {
                ngReallyClick: '&'

            },
            link: function(scope, element, attrs){
                element.bind('click', function(){
                    var message = attrs.message;
                    var title = attrs.title || '';
                    var template = '<div class="modal-body">' + message + '</br>' + '<p>' + title + '</p>' + '</div>';
                    template += '<div class="modal-footer"><button class=\"btn-result btn-ok\" ng-click="ok()">OK</button><button class=\"btn-result btn-cnl\" ng-click="cancel()">Cancel</button></div>';

                    var modalInstance = $modal.open({
                        template: template,
                        controller: ModalCtrl
                    });

                    modalInstance.result.then(function() {
                        scope.ngReallyClick();
                        scope.$emit('modal.closed');
                    }, function() {

                    });
                });

            }
        };
    }