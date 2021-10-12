import { Request, Response } from 'express';
import { QueryOptions } from 'mongoose';

import {
  startOfDay, endOfDay,
  startOfWeek, endOfWeek,
  startOfMonth, endOfMonth,
  startOfYear, endOfYear,
} from 'date-fns';

import TaskModel from '../models/TaskModel';

const current = new Date();

class TaskController {
  async create(req: Request, res: Response) {
    try {
      const task = new TaskModel(req.body);
      const response = await task.save();

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const response = await TaskModel
        .findByIdAndUpdate(
          { '_id': req.params.id }, req.body, { new: true, useFindAndModify: false } as QueryOptions);

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async done(req: Request, res: Response) {
    try {
      const { id, done } = req.params;

      const response = await TaskModel
        .findByIdAndUpdate(
          { '_id': id },
          { 'done': done },
          { new: true } as QueryOptions
        )

      return res.status(200).json(response);
    } catch (error) {
      return res.status(200).json(error);
    }
  }

  async late(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find(
          {
            'when': { '$lt': current },
            'macAddress': { '$in': macAddress }
          }
        ).sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async today(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find(
          {
            'macAddress': { '$in': macAddress },
            'when': { '$gte': startOfDay(current), '$lte': endOfDay(current) }
          }
        ).sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async week(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find(
          {
            'macAddress': { '$in': macAddress },
            'when': { '$gte': startOfWeek(current), '$lte': endOfWeek(current) }
          }
        ).sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async month(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find(
          {
            'macAddress': { '$in': macAddress },
            'when': { '$gte': startOfMonth(current), '$lte': endOfMonth(current) }
          }
        ).sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async year(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find(
          {
            'macAddress': { '$in': macAddress },
            'when': { '$gte': startOfYear(current), '$lte': endOfYear(current) }
          }
        ).sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      console.log(id);


      const response = await TaskModel
        .deleteOne({ '_id': id });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { macAddress } = req.params;

      const response = await TaskModel
        .find({ macAddress: { '$in': macAddress } })
        .sort('when');

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const response = await TaskModel.findById(id);

      if (response) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}

export default new TaskController();