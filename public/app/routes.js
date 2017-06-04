var app = angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	$routeProvider

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register',
		authenticated: false
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html',
		authenticated: false
	})

	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html',
		authenticated: true
	})

	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html',
		controller: 'empController',
		controllerAs: 'seg',
		authenticated: true
	})

	.when('/main', {
		templateUrl: 'app/views/pages/publicaciones/main.html',
		controller: 'empController',
		controllerAs: 'publi',
		authenticated: true
	})

	.when('/publicaciones', {
		templateUrl: 'app/views/pages/publicaciones/list.html',
		controller: 'empController',
		controllerAs: 'publi',
		authenticated: true
	})

	.when('/publicaciones/create', {
		templateUrl: 'app/views/pages/publicaciones/add.html',
		controller: 'empController',
		controllerAs: 'publi',
		authenticated: true
	})

	.when('/publicaciones/:id/show', {
		templateUrl: 'app/views/pages/publicaciones/show.html',
		controller: 'empController',
		authenticated: true
	})

	.when('/publicaciones/:id/edit', {
		templateUrl: 'app/views/pages/publicaciones/edit.html',
		controller: 'empController',
		authenticated: true
	})	

	.when('/finduser', {
		templateUrl: 'app/views/pages/publicaciones/showus.html',
		controller: 'empController',
		controllerAs: 'find',
		authenticated: true
	})

	.otherwise({redirectTo: '/login'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

app.run(['$rootScope', 'Auth', '$location',  function($rootScope, Auth, $location){

	$rootScope.$on('$routeChangeStart', function(event, next, current){

		if(next.$$route.authenticated == true ){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/login');
			}

		} else if (next.$$route.authenticated == false ){
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/profile');
			}
		} 
	});	
}]);