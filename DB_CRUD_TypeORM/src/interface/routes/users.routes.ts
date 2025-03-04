import express from 'express';
import { authMiddleware } from '../../infrastructure/helpers/middlewares/auth_middleware';
import { loginUserController } from '../controllers/auth/users_login.controller';
import { registerUserController } from '../controllers/auth/users_register.controller';
import { userLoginValidationSchema } from '../../domain/Schemas/users/users_login.schema';
import { userUpdateValidationSchema } from '../../domain/Schemas/users/users_update.schema';
import { userRegistrationValidationSchema } from '../../domain/Schemas/users/users_register.schema';
import { userDeleteValidationSchema } from '../../domain/Schemas/users/users_delete.schema';
import { validateSchema } from '../../infrastructure/helpers/middlewares/users_validation';
import { UserRepository } from '../../infrastructure/repositories/user_repository/user_repo';
import { getUserController } from '../controllers/users/users_get.controller';
import { deleteUserByIDController } from '../controllers/users/users_delete.controller';
import { updateUserByIDController } from '../controllers/users/users_update.controller';

const router = express.Router();

router.get('/',authMiddleware,getUserController(UserRepository));
router.post('/register',validateSchema(userRegistrationValidationSchema),registerUserController(UserRepository));
router.post('/login',validateSchema(userLoginValidationSchema),loginUserController(UserRepository))
router.patch('/',authMiddleware,validateSchema(userUpdateValidationSchema),updateUserByIDController(UserRepository));
router.delete('/',authMiddleware, validateSchema(userDeleteValidationSchema),deleteUserByIDController(UserRepository));

export default router;
