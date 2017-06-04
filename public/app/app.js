angular.module('userApp', ['appRoutes','userControllers','userServices','ngAnimate',
	'mainController','authServices','myApp'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');
});
