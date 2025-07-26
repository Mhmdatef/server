import { Router, Response, Request, request, response, NextFunction } from "express";
const router = Router();
interface requestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
function reqireAuth(req: Request, res: Response,next:NextFunction){
    if (req.session&&req.session.loggedIn)
{  next()
}
res.status(403)
res.send("not premited")
} 

router.get("/login", (req: Request, res: Response) => {
  res.send(`
        <form method ="POST">
        <div>
        <label>Email</label>
        <input name="email" />
        </div>
             <div>
        <label>Password</label>
        <input name="password" type ="password"/>

                </div>
                <button>Submit</button>

        </form>
        `);
});
router.post("/login", (req: requestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (
    email &&
    password &&
    email === `125moatef@gmail.com` &&
    password === "123"
  ) {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send(`invailed email or password`);
  }
});
router.get('/',(req:Request,res:Response)=>{
    if(req.session&&req.session.loggedIn){
   res.send(`
    <dev>
    <dev>you are loggedIn</dev>
        <a href="/logout">Log out</a>
        </dev>

    `)
    }else{
 res.send(`
    <dev>
    <dev>
        you are not loggedIn
        </dev>u
        <a href="/login">Log in</a>
        </dev>

    `)
    }
})
router.get('/logout',(req:Request,res:Response)=>{
    req.session=undefined
    res.redirect('/')
})
router.get('/protected',reqireAuth,(req:Request,res:Response)=>{
    res.send('welcome to protected route loggedIn user')
})
export { router };
