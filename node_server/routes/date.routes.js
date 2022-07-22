const Router = require('express');
const DateController = require('../controller/date.controller');
const router = new Router();

router.post('/date', DateController.createData);
router.get('/date', DateController.getData);
router.get('/date/sort', DateController.getDataSorted);
router.put('/date', DateController.updateData);
router.delete('/date/:id', DateController.deleteData);

module.exports = router;
