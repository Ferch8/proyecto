var User = require('../models/user');
var Publicacion = require('../models/publicacion');
var Seguidor = require('../models/seguidor');
var jwt = require('jsonwebtoken');
var secret = 'harrypoter';

module.exports = function(router) {

		//USER REGISTRATION ROUTE
		router.post('/users',function(req,res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null || req.body.username == '' ||
		 req.body.password == null || req.body.password == '' || 
		 req.body.email == null || req.body.email =='' ) {
			res.json({ success: false, message: 'Algun campo no se ha llenado' });
		} else {
				user.save(function(err){
				if(err){
					res.json({ success: false, message: 'Usuario o Email ya existen' });
				} else{
					res.json({ success: true, message: 'Usuario creado' }); 
				}
			});
		}	
	});

	//USER LOGIN ROUTE
	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username })
		.select('email username password')
        .exec(function(err, user) {
          if (err) throw err;

          if (!user) {
              res.json({ success: false, message: 'Could not authenticate' });
          } else if (user) {
              if (req.body.password) {
                  var validPassword = user.comparePassword(req.body.password);
                  if (!validPassword) {
                      res.json({ success: false, message: 'Could not validate Password' });
                  } else {
                  	  var token = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });
                      res.json({ success: true, message: 'User Authenticate', token: token });
                  }
              } else {
                  res.json({ success: false, message: 'No password provided' });
              }
          }
      });
  });

	router.get('/publicaciones', function(req, res){
		Publicacion.find()
		.sort('-_id')
		.exec(obtenerPublicaciones);
		function obtenerPublicaciones(err,Publicaciones){
			if(err)
				res.send(err);
			res.json(Publicaciones);
		};
	/*	Publicacion.find(function(err, publicaciones){
			if(err)
				res.send(err);
			res.json(publicaciones);
		}); */
	});

	router.post('/publicaciones', function(req, res){
		Publicacion.create(req.body, function(err, publicacion){
			if(err)
				res.send(err);
			res.json(publicacion);
		});
	});

	router.get('/publicaciones/:id', function(req, res){
		Publicacion.findOne({_id:req.params.id}, function(err, publicaciones){
			if(err)
				res.send(err);
			res.json(publicaciones);
		});
	});

	router.delete('/publicaciones/:id', function(req, res){
		Publicacion.findOneAndRemove({_id:req.params.id}, function(err, publicaciones){
			if(err)
				res.send(err);
			res.json(publicaciones);
		});
	});

	router.put('/publicaciones/:id', function(req, res){
		var query = {_id:req.params.id};
		update = {
			username: req.body.username,
			descripcion: req.body.descripcion,
			fecha: req.body.fecha
		}; 
		Publicacion.findOneAndUpdate( query, update, function(err, publicaciones){
			if(err)
				res.send(err);
			res.json(publicaciones);	
		});
	});

	router.put('/publicacionesfav/:id', function(req, res){
		var newfav = req.fav + 1;
		var query = {_id:req.params.id};
		update = {
			username: req.username,
			descripcion: req.descripcion,
			fecha: req.fecha,
			fav: newfav
		}; 
		Publicacion.findOneAndUpdate( query, update, function(err, publicaciones){
			if(err)
				res.send(err);
			res.json(publicaciones);	
		});
	});

	router.get('/finduser', function(req, res){
		User.find(function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});

	router.post('/finduser', function(req, res){
		Seguidor.create(req.body, function(err, seguidor){
			if(err)
				res.send(err);
			res.json(seguidor);
		});
	});

	router.post('/seguidos', function(req, res){
		Seguidor.find()
		.where('username').equals(req.body.username)
		.count()
		.exec(obtenerSeguidos);
		function obtenerSeguidos(err,Seguidos){
			if(err){
				res.json({message: err});
			} else {
				res.json(Seguidos);
			}

		};
	});

	router.post('/seguidores', function(req, res){
		Seguidor.find()
		.where('seguidor').equals(req.body.username)
		.count()
		.exec(obtenerSeguidores);
		function obtenerSeguidores(err,Seguidos){
			if(err){
				res.json({message: err});
			} else {
				res.json(Seguidos);
			}

		};
	});

	router.use(function(req, res, next){
		var token =	req.body.token || req.body.query || req.headers['x-access-token'];

		if(token){
			jwt.verify(token, secret, function(err,decoded){
				if(err){
					res.json({ success: false, message: 'Token invalid'});
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'No token provided'});
		}
	});

	router.post('/me', function(req, res){
		res.send(req.decoded);
	});

	return router;
}
