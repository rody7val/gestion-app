const User = require('../models/user');

// exports.load = (req, res, next, userId) => {
// 	User.findOne({
// 		_id: userId
// 	}).exec((err, user) => {
// 		if (user) {
// 			req.user = user;
// 			next();
// 		}else{
// 			res.json({success: false});
// 		}
// 	});
// }

exports.new = (req, res) => {
	const user = new User(req.body.user);

	user.save(err => {
		if (err) {
			return res.json({
				success: false,
				user: user,
				errors: err.errors
			})
		}
		res.json({
			success: true,
			errors: []
		})
	});
}

// exports.getOne = (req, res) => {
// 	res.json({user: req.user});
// }

exports.all = (req, res) => {
	User.find({}).exec((err, users) => {
		if (err) {
			return res.json({
				success: false,
				errors: err
			});
		}
		res.json({
			success: true,
			users: users
		});
	});
}

// exports.edit = (req, res) => {
// 	req.user.name = req.body.user.name;
// 	req.user.email = req.body.user.email;
// 	req.user.iva = req.body.user.iva;
// 	req.user.cuit = req.body.user.cuit;
// 	req.user.tel = req.body.user.tel;
// 	req.user.dir = req.body.user.dir;
// 	req.user.img = req.body.user.img;

// 	req.user.save(err => {
// 		if (err) {
// 			return res.json({
// 				success: false,
// 				user: req.user,
// 				errors: err.errors
// 			});
// 		}
// 		res.json({
// 			success: true,
// 			errors: []
// 		});
// 	});
// }

// exports.delete = (req, res) => {
// 	User.findOne({
// 		_id: req.user._id
// 	}).remove().exec(err => {
// 		if (err) {
// 			return res.json({
// 				success: false,
// 				errors: err.errors
// 			});
// 		}
// 		res.json({
// 			success: true,
// 			errors: []
// 		});
// 	})
// }