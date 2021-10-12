import { Request, Response, NextFunction } from 'express';
import { isPast } from 'date-fns';

import TaskModel from '../models/TaskModel';
import TaskInterface from '../interfaces/TaskInferface';

const TaskValidation = async (req: Request, res: Response, next: NextFunction) => {
  const {
    macAddress,
    type,
    title,
    description,
    when } = req.body as TaskInterface;

  if (!macAddress) {
    return res.status(400).json({ error: 'MacAddress é obrigatório' });
  } else if (!type) {
    return res.status(400).json({ error: 'Tipo é obrigatório' });
  } else if (!title || title === '') {
    return res.status(400).json({ error: 'Título é obrigatório' });
  } else if (!description) {
    return res.status(400).json({ error: 'Descrição é obrigatória' });
  } else if (!when) {
    return res.status(400).json({ error: 'Data e Hora são obrigatórios' });
  } else if (isPast(new Date(when))) {
    return res.status(400).json({ error: 'Escolha uma data e hora futura' });
  } else {
    const { id } = req.params;
    let exists;
    
    if (id) {
      exists = await TaskModel
        .findOne(
          {
            '_id': { '$ne': id },
            'when': { '$eq': new Date(when) },
            'macAddress': { '$in': macAddress }
          }
        )
    } else {
      exists = await TaskModel
        .findOne(
          {
            'when': { '$eq': new Date(when) },
            'macAddress': { '$in': macAddress }
          }
        );
    }

    if (exists) {
      return res.status(400).json({ error: 'Já existe uma tarefa nesse dia e horário' });
    }

    next();
  }
}

export default TaskValidation;