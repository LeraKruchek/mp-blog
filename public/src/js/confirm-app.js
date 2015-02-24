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
                    var template = '<div class="modal-body">' + message + '</div>';
                    template += '<div class="modal-footer"><button class=\"btn-result\" ng-click="ok()">OK</button><button class=\"btn-result\" ng-click="cancel()">Cancel</button></div>';

                    var modalInstance = $modal.open({
                        template: template,
                        controller: ModalCtrl
                    });

                    modalInstance.result.then(function() {
                        scope.ngReallyClick();
                    }, function() {
                        //Modal dismissed
                    });
                });

            }
        };
    }