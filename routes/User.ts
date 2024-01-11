import express , {Request , Response , NextFunction} from 'express';
import { UserLogin } from '../controllers/UserController';

const router = express.Router();

router.get('/', (req: Request, res: Response , next: NextFunction)=>{
    return res.json({message: "Hello User"});
});

router.post('/userLogin', UserLogin);
router.get('/profile');
router.patch('/profile');

export { router as UserRoute};