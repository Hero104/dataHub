(function () {
    'use strict';

    angular.module('BlurAdmin.pages.components.mail').controller('MailTabCtrl', MailTabCtrl);

    function MailTabCtrl(composeModal, mailMessages) {

        var vm = this;
        console.log(this)
        vm.navigationCollapsed = true;
        vm.showCompose = function (subject, to, text) {
            composeModal.open({
                subject: subject,
                to: to,
                text: text
            })
        };

        vm.tabs = mailMessages.getTabs();
    }

})();
