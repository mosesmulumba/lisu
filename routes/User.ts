import express , {Request , Response , NextFunction} from 'express';
import { GetUserProfile, UpdateUserProfile, UserLogin, UserSignup } from '../controllers';
import { Authenicate } from '../middlewares';

const router = express.Router();

router.post('/sign-up' , UserSignup);
router.post('/userLogin', UserLogin);

router.use(Authenicate);
router.get('/profile' , GetUserProfile);
router.patch('/profile' , UpdateUserProfile);


export { router as UserRoute};