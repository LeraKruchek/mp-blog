/**
 * Created by Valeryia_Kruchak on 10-Feb-15.
 */
(function(){
    angular.module('blog-app.filters', [])
        .filter('rusDate', rusDate)
        .filter('sanitize', sanitize);

    function rusDate() {
        return function (input) {
            var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля',
                'августа', 'сентября', 'октября', 'ноября', 'декабря'];
            var d = new Date(input);
            return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
        }
    }

    sanitize.$inject = ['$sce']
    function sanitize($sce){
        return function(input){
            return $sce.trustAsHtml(input);
        }
    }
})();