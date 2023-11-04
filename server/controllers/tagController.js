import Tag from "../database/models/Tag.js";
import { catchAsync } from "../utils/catchAsync.js";

export const addTag = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const tag = await Tag.findOne({ where: { name } });
  if (!tag) {
    const newTag = await Tag.create({
      name,
      description,
    });
    res.status(201).json({ message: "new tag added", id : newTag.id });
  }
  res.status(201).json({ message: "tag already added", id: tag.id });
});
