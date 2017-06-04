
angular.module('authServices',[])

.factory('Auth',function($http,AuthToken){
	var authFactory = {};

	authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data){
        	AuthToken.setToken(data.data.token);
        	return data;
        });
    };

    authFactory.isLoggedIn = function() {
        // CHeck if token is in local storage
        if (AuthToken.getToken()) {
            return true; // Return true if in storage
        } else {
            return false; // Return false if not in storage
        }
    };

    authFactory.getUser = function(){
        if (AuthToken.getToken()) {
            return $http.post('/api/me');
        } else {
            $q.reject({ message: 'User has no token' });
        }
    };

    authFactory.logout = function() {
        AuthToken.setToken(); // Removes token from local storage
    };

	return authFactory;
})

.factory('AuthToken', function($window) {
    var authTokenFactory = {}; // Create factory object

    authTokenFactory.setToken = function(token) {
        // Check if token was provided in function parameters
        if (token) {
            $window.localStorage.setItem('token', token); // If so, set the token in local storage
        } else {
            $window.localStorage.removeItem('token'); // Otherwise, remove any token found in local storage (logout)
        }
    };

    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    }; 

    return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {}; // Create factory object

    // Function to check for token in local storage and attach to header if so
    authInterceptorsFactory.request = function(config) {
        var token = AuthToken.getToken(); // Check if a token is in local storage
        if (token) config.headers['x-access-token'] = token; //If exists, attach to headers

        return config; // Return config object for use in app.js (config file)
    };

    return authInterceptorsFactory; // Return factory object

});

