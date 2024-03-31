const router = require('express').Router();
const { createComment, updateComment, deleteComment } = require('../controllers/commentControllers');
const { authGuard, authAdmin } = require('../middlewares/authMiddleware');

router.route('/')
    .post(authGuard, createComment)
    
router
.route("/:commentId")
.put(authGuard, updateComment)
.delete(authGuard, deleteComment)

module.exports = router;