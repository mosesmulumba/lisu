import express , {Request , Response , NextFunction} from 'express';
import { CreateUser, GetUserByID, GetUsers } from '../controllers/AdminController';

const router = express.Router();

router.post('/user' , CreateUser);
router.get('/users', GetUsers);
router.get('/user/:id', GetUserByID);

router.get('/', (req: Request, res: Response , next: NextFunction)=>{
    return res.json({message: "Hello Admin"});
});


export { router as AdminRoute};
