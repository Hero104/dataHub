(function () {
    'use strict';

    angular.module('BlurAdmin.theme').config(config);

    /** @ngInject */
    function config(baConfigProvider, colorHelper, $provide) {
        $provide.decorator('$uiViewScroll', uiViewScrollDecorator);

        // // 改变主题风格
        // baConfigProvider.changeTheme({blur: true});
        //
        // baConfigProvider.changeColors({
        //  default: 'rgba(#000000, 0.2)',
        //  defaultText: '#ffffff',
        //  dashboard: {
        //    white: '#ffffff',
        //  },
        // });
    }

    /** @ngInject */
    function uiViewScrollDecorator($delegate, $anchorScroll, baUtil) {
        return function (uiViewElement) {
            if (baUtil.hasAttr(uiViewElement, "autoscroll-body-top")) {
                $anchorScroll();
            } else {
                $delegate(uiViewElement);
            }
        };
    }
})();
