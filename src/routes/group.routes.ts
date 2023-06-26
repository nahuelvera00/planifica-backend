import { Router } from "express";
import GroupController from "../controllers/GroupController";
import checkAuth from "../middleware/checkAuth";
import { CustomReq } from "../types/types";

const router = Router()

router.post("/", checkAuth, (req, res) => GroupController.create(req as CustomReq, res))

export default router