import { Publisher } from '../models/index.js';

export const findPublisherById = async (id) => Publisher.findByPk(id);

export const addPublisher = async (publisherName) => Publisher.create({publisher_name: publisherName});