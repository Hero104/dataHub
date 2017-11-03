(function() {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('appImage', appImage)
        .filter('kameleonImg', kameleonImg)
        .filter('profilePicture', profilePicture);

    /** @ngInject */
    function appImage(layoutPaths) {
        return function(input) {
            return layoutPaths.images.root + input;
        };
    }
    /** @ngInject */
    function kameleonImg(layoutPaths) {
        return function(input) {
            return layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg';
        };
    }
    /** @ngInject */
    function profilePicture(layoutPaths) {
        return function(input, ext) {
            ext = ext || 'png';
            return layoutPaths.images.profile + input + '.' + ext;
        };
    }
})();