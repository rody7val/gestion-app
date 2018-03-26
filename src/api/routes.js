const userController = require('./controllers/user_controller');
// const imgController = require('./controllers/img_controller');

module.exports = function (express) {

	const router = express.Router();

    // router.param('userId', userController.load);

    router.get('/users', userController.all);
    router.post('/users/new', userController.new);
    // router.get('/user/:userId', userController.getOne);
    // router.post('/user/:userId/edit', userController.edit);
    // router.post('/user/:userId/delete', userController.delete);

    // router.post('/img/upload', imgController.uploadImg);

    return router;
};