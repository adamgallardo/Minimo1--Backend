import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Valoration from '../models/Valoration';

const createValoration = (req: Request, res: Response, next: NextFunction) => {
    const { name, mark, user, participation } = req.body;

    const valoration = new Valoration({
        _id: new mongoose.Types.ObjectId(),
        name,
        mark,
        user,
        participation
    });

    return valoration
        .save()
        .then((valoration) => res.status(201).json(valoration))
        .catch((error) => res.status(500).json(error));
};

const readValoration = (req: Request, res: Response, next: NextFunction) => {
    const valorationId = req.params.valorationId;

    return Valoration.findById(valorationId)
        .populate('user')
        .then((valoration) => (valoration ? res.status(200).json(valoration) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const dameTodo = (req: Request, res: Response, next: NextFunction) => {
    return Valoration.find()
        .populate('user')
        .then((valoration) => res.status(200).json(valoration))
        .catch((error) => res.status(500).json(error));
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    console.log({ page, limit });
    // Comprueba si page y limit son números válidos
    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).send({ error: 'Invalid page or limit' });
    }

    console.log({ page, limit });
    const response = await paginate(Number(page), Number(limit));
    res.send(response);
};

const updateValoration = (req: Request, res: Response, next: NextFunction) => {
    const valorationId = req.params.valorationId;
    const { name, mark, user, participation } = req.body;
    const valoration = new Valoration({
        name,
        mark,
        user,
        participation
    });
    console.log(valoration);
    return Valoration.findByIdAndUpdate(valorationId, { name: valoration.name, mark: valoration.mark, user: valoration.user, participation: valoration.participation })
        .then((valorationOut) => (valorationOut ? res.status(200).json(user) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

const deleteValoration = (req: Request, res: Response, next: NextFunction) => {
    const valorationId = req.params.valorationId;

    return Valoration.findByIdAndDelete(valorationId)
        .then((valoration) => (valoration ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json(error));
};

async function paginate(page: number, limit: number): Promise<any> {
    try {
        const users = await Valoration.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalPages = await Valoration.countDocuments();
        const pageCount = Math.ceil(totalPages / limit);
        console.log({ totalPages, limit });
        console.log({ users, pageCount });
        return { users, pageCount };
    } catch (err) {
        console.log(err);
        return err;
    }
}

export default { createValoration, readValoration, updateValoration, deleteValoration, dameTodo, readAll };