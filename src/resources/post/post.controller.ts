import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import validateMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post_service";
import HttpException from "@/utils/exceptions/http.exception";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initialRoutes();
  }

  private initialRoutes(): void {
    this.router.post(
      `${this.path}`,
      validateMiddleware(validate.create),
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.PostService.create(title, body);
      res.status(201).send(post);
    } catch (error) {
      next(new HttpException(400, "Cannot create post "));
    }
  };
}

export default PostController;
