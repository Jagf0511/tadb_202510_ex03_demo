const express = require('express');
const router = express.Router();
const compuestoController = require('../controllers/compuestoController');

// Documentación Swagger
/**
 * @swagger
 * tags:
 *   name: Compuestos
 *   description: Operaciones relacionadas con compuestos
 */

/**
 * @swagger
 * /api/compuestos:
 *   get:
 *     summary: Obtener todos los compuestos
 *     tags: [Compuestos]
 *     responses:
 *       200:
 *         description: Lista de compuestos
 */
router.get('/', compuestoController.getAll);

/**
 * @swagger
 * /api/compuestos/{id}:
 *   get:
 *     summary: Obtener compuesto por ID
 *     tags: [Compuestos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del compuesto
 *       404:
 *         description: Compuesto no encontrado
 */
router.get('/:id', compuestoController.getById);

/**
 * @swagger
 * /api/compuestos:
 *   post:
 *     summary: Crear nuevo compuesto
 *     tags: [Compuestos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compuesto creado
 */
router.post('/', compuestoController.create);

/**
 * @swagger
 * /api/compuestos/{id}:
 *   put:
 *     summary: Actualizar compuesto
 *     tags: [Compuestos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Compuesto actualizado
 */
router.put('/:id', compuestoController.update);

/**
 * @swagger
 * /api/compuestos/{id}:
 *   delete:
 *     summary: Eliminar compuesto
 *     tags: [Compuestos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compuesto eliminado
 */
router.delete('/:id', compuestoController.delete);

/**
 * @swagger
 * /api/compuestos/{id}/medicamentos:
 *   get:
 *     summary: Obtener medicamentos que contienen el compuesto
 *     tags: [Compuestos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 */
router.get('/:id/medicamentos', compuestoController.getMedicamentosByCompuestoId);

module.exports = router;
