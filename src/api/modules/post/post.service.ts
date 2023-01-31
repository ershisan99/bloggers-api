// export async function createPostHandler(
//   req: Request<{}, Post>,
//   res: Response<Post>,
//   next: NextFunction,
// ) {
//   try {
//     const newBlog = await createBlog(req.body)
//     res.status(201).json(newBlog)
//   } catch (error) {
//     next(error)
//   }
// }
