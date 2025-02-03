import express from 'express';
import { authMiddleware } from '../../Infrastructure/helpers/auth.middleware';
import { loginUserController } from '../controllers/auth/users.loginController';
import { registerUserController } from '../controllers/auth/users.registerController';
import { deleteUserByIDController } from '../controllers/users/users.deleteController';
import { getUserController } from '../controllers/users/users.getController';
import { updateUserByIDController } from '../controllers/users/users.updateController';
import { userLoginValidationSchema } from '../../Domain/Schemas/users/users.loginSchema';
import { userUpdateValidationSchema } from '../../Domain/Schemas/users/users.updateSchema';
import { userRegistrationValidationSchema } from '../../Domain/Schemas/users/users.registerSchema';
import { userDeleteValidationSchema } from '../../Domain/Schemas/users/users.deleteSchema';
import { UserRepository } from '../../Infrastructure/repositories/userrepository/user.repo';

const router = express.Router();

router.get('/',authMiddleware,getUserController(UserRepository));
router.post('/register',userRegistrationValidationSchema,registerUserController(UserRepository));
router.post('/login',userLoginValidationSchema,loginUserController(UserRepository))
router.patch('/:id',userUpdateValidationSchema,authMiddleware,updateUserByIDController(UserRepository));
router.delete('/:id',userDeleteValidationSchema,authMiddleware,deleteUserByIDController(UserRepository));

export default router;
