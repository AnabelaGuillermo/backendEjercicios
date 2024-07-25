import express from 'express';
import Color from '../../models/colorModel.js';

const colorRouter = express.Router();

// Crear una nueva paleta de color
colorRouter.post('/', async (req, res) => {
  try {
    const { code, name, hexCode, rgbCode } = req.body;

    // Validar datos
    if (!code || !name) {
      return res.status(400).send('Se requiere código y nombre.');
    }

    const color = new Color({ code, name, hexCode, rgbCode });
    await color.save();
    res.status(201).send(color);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Listar todas las paletas de colores
colorRouter.get('/', async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Borrar una paleta de color por código único
colorRouter.delete('/:code', async (req, res) => {
  try {
    const color = await Color.findOneAndDelete({ code: req.params.code });
    if (!color) {
      return res.status(404).send();
    }
    res.status(200).send(color);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Editar una paleta de color por código único
colorRouter.patch('/:code', async (req, res) => {
  try {
    const color = await Color.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true, runValidators: true },
    );
    if (!color) {
      return res.status(404).send();
    }
    res.status(200).send(color);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener una paleta de color por código único
colorRouter.get('/search/:code', async (req, res) => {
  try {
    const color = await Color.findOne({ code: req.params.code });
    if (!color) {
      return res.status(404).send();
    }
    res.status(200).send(color);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default colorRouter;
