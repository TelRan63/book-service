import {Router} from "express";
import {findPublishersByAuthor} from "../controllers/publisher.controller.js";

const router = Router();

router.get('/publishers/author/:authorName', findPublishersByAuthor);

export default router;