angular.module('myApp',[])
.controller('empController', function($scope,$http,$route,$routeParams){
	
	this.regPubli = function (regData){
		//console.log('submitted');
		//console.log(this.regData);	
		$http.post('/api/publicaciones', this.regData);	
		//window.location.href = '/';
		$route.reload();
	};

	$scope.getPublicaciones = function(){
		$http.get('/api/publicaciones').then(function(response){
			$scope.publicaciones = response.data;	
		});
	};
		
	$scope.showPublicacion = function(){
		var id = $routeParams.id;
		//console.log(id);
		$http.get('/api/publicaciones/' + id).then(function(response){
			$scope.publicacion = response.data;	
		});
	};

	$scope.updatePublicacion = function(){
		var id = $routeParams.id;
		//console.log(id);
		$http.put('/api/publicaciones/' + id, $scope.publicacion ).then(function(response){
		window.location.href = '/main';
		});
	};

	$scope.updateFavorito = function(publicacion){
		var id = publicacion.id;
		//console.log(id);
		$http.put('/api/publicacionesfav/' + id, publicacion ).then(function(response){
		window.location.href = '/main';
		});
	};

	$scope.deletePublicacion = function(id){
		var id = id;
		//console.log(id);
		$http.delete('/api/publicaciones/' + id).then(function(response){
			$route.reload();
		});
	};

	$scope.getUsers = function(){
		$http.get('/api/finduser').then(function(response){
			$scope.users = response.data;	
		});
	};

	this.regSeguidor = function (regData){
		//console.log('submitted');
		//console.log(this.regData);	
		$http.post('/api/finduser', this.regData);	
		//window.location.href = '/';
		$route.reload();
	};

	var app = this;
	this.getSeguidos = function (regData){
		//console.log('submitted');
		//console.log(this.regData);	
		$http.post('/api/seguidos', this.regData).then(function(data){
			//console.log(data);
			app.seguidos = data.data;
			//console.log(seguidos);
		});
		//window.location.href = '/';
		//$route.reload();
	};

	this.getSeguidores = function (regData){
		//console.log('submitted');
		//console.log(this.regData);	
		$http.post('/api/seguidores', this.regData).then(function(data){
			//console.log(data);
			app.seguidores = data.data;
			//console.log(seguidos);
		});
		//window.location.href = '/';
		//$route.reload();
	};

});

