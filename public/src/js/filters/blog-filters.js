/**
 * Created by Valeryia_Kruchak on 10-Feb-15.
 */
(function(){
    angular.module('blog-app.filters', [])
        .filter('rusDate', rusDate)
        .filter('unsafe', unsafe);

    function rusDate() {
        return function (input) {
            var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
                'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            var d = new Date(input);
            if (d.getFullYear() == '1970'){
                return 'Черновик';
            }
            return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
        };
    }

    unsafe.$inject = ['$sce'];
    function unsafe($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        };
    }
})();