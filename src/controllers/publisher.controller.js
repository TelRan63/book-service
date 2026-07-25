import * as publisherService from "../services/publisher.service.js";

export const findPublishersByAuthor = async (req, res, next) => {
    try {
        const publishers = await publisherService.findPublishersByAuthor(req.params.authorName);
        return res.json(publishers);
    } catch (err) {
        return next(err);
    }
}