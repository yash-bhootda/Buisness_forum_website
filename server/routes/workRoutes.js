const express = require('express');

const router = express.Router();
const workController = require('../controllers/workController')

/**
 * App routes
 */

router.get('/',workController.hompage);
router.get('/categories', workController.exploreCategories);
router.get('/work/:id', workController.exploreWork );
router.get('/categories/:id', workController.exploreCategoriesById);
router.get('/explore-latest', workController.exploreLatest);
router.get('/explore-random', workController.exploreRandom);
router.get('/submit-work', workController.submitWork);
router.post('/submit-work', workController.submitWorkOnPost);





module.exports=router;