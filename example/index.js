/*global angular,alert,w5cValidator*/
(function () {
    "use strict";
    var app = angular.module("app", ["w5c.validator", "ui.bootstrap", "hljs"]);
    window.app = app;

    app.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

        // 全局配置
        w5cValidatorProvider.config({
            blurTrig   : false,
            showError  : true,
            removeError: true

        });
        w5cValidatorProvider.setRules({
            email   : {
                required: "输入的邮箱地址不能为空",
                email   : "输入邮箱地址格式不正确"
            },
            username: {
                required: "输入的用户名不能为空",
                pattern : "用户名必须输入字母、数字、下划线,以字母开头"
            },
            password: {
                required : "密码不能为空",
                minlength: "密码长度不能小于{minlength}",
                maxlength: "密码长度不能大于{maxlength}"
            },
            number  : {
                required: "数字不能为空"
            }
        });
    }]);
    app.controller("validateCtrl", ["$scope", "$http", function ($scope, $http) {

        var vm = $scope.vm = {
            htmlSource   : "",
            showErrorType: 1
        };

        vm.saveEntity = function (form) {
            //do somethings for bz
            alert("Save Successfully!!!");
        };

        //每个表单的配置，如果不设置，默认和全局配置相同
        vm.validateOptions = {
            blurTrig: true
        };

        vm.changeShowType = function () {
            if (vm.showErrorType == 2) {
                vm.validateOptions.showError = false;
                vm.validateOptions.removeError = false;
            }else{
                vm.validateOptions.showError = true;
                vm.validateOptions.removeError = true;
            }
        };

        $http.get("index.js").success(function (result) {
            vm.jsSource = result;
        });
        $http.get("validate.form.html").success(function (result) {
            vm.htmlSource = result;
        });
        $http.get("validate.form.html").success(function (result) {
            vm.htmlSource = result;
        });

        $http.get("css/style.less").success(function (result) {
            vm.lessSource = result;
        });

    }]);
    app.directive('showHtml', [function ($compile) {
        return {
            scope: true,
            link : function (scope, element, attrs) {
                var el;

                scope.$watch(attrs.showHtml, function (tpl) {

                    if (angular.isDefined(tpl)) {
                        // compile the provided template against the current scope
                        el = $compile(tpl)(scope);
                        // stupid way of emptying the element
                        element.html("");

                        // add the template content
                        element.append(el);
                    } else {
                        element.html("<span>ddd</span>111");
                    }
                });
            }
        };
    }]);


})();