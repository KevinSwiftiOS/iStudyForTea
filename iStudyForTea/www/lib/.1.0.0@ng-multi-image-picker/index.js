;(function(){
    'use strict';

    angular.module('com.lihau.mipicker', [])
    .factory('MultiImagePicker', MultiImagePicker);

    MultiImagePicker.$inject = ['$q'];
    function MultiImagePicker($q){
        return {
            pickImage: pickImage,
        };

        ///////////////////////

        function pickImage(opts){
            if(angular.isUndefined(window.MultiImagePicker)){
                console.error('\'window.MultiImagePicker\' is not available. See: https://github.com/tanhauhau/cordova-plugin-imagepicker');
                return $q.reject();
            }
            var defer = $q.defer();
            var options = angular.isDefined(opts) ? opts : {};
            window.MultiImagePicker.getPictures(defer.resolve, defer.reject, options);
            return defer.promise;
        }
    }}
);
