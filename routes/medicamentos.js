const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamentoController');

// Documentación Swagger
/**
 * @swagger
 * tags:
 *   name: Medicamentos
 *   description: Operaciones relacionadas con medicamentos
 */

/**
 * @swagger
 * /api/medicamentos:
 *   get:
 *     summary: Obtener todos los medicamentos
 *     tags: [Medicamentos]
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 */
router.get('/', medicamentoController.getAll);

/**
 * @swagger
 * /api/medicamentos/{id}:
 *   get:
 *     summary: Obtener medicamento por ID
 *     tags: [Medicamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del medicamento
 *       404:
 *         description: Medicamento no encontrado
 */
router.get('/:id', medicamentoController.getById);

/**
 * @swagger
 * /api/medicamentos:
 *   post:
 *     summary: Crear nuevo medicamento
 *     tags: [Medicamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               fabricante:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medicamento creado
 */
router.post('/', medicamentoController.create);

/**
 * @swagger
 * /api/medicamentos/{id}:
 *   put:
 *     summary: Actualizar medicamento
 *     tags: [Medicamentos]
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
 *               fabricante:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medicamento actualizado
 */
router.put('/:id', medicamentoController.update);

/**
 * @swagger
 * /api/medicamentos/{id}:
 *   delete:
 *     summary: Eliminar medicamento
 *     tags: [Medicamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medicamento eliminado
 */
router.delete('/:id', medicamentoController.delete);

/**
 * @swagger
 * /api/medicamentos/{id}/compuestos:
 *   get:
 *     summary: Obtener compuestos del medicamento
 *     tags: [Medicamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de compuestos
 */
router.get('/:id/compuestos', medicamentoController.getCompuestosByMedicamentoId);

/**
 * @swagger
 * /api/medicamentos/{medicamentoId}/compuestos:
 *   post:
 *     summary: Agregar compuesto al medicamento
 *     tags: [Medicamentos]
 *     parameters:
 *       - in: path
 *         name: medicamentoId
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
 *               compuestoId:
 *                 type: integer
 *               concentracion:
 *                 type: number
 *               unidad_medida:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compuesto agregado
 */
router.post('/:medicamentoId/compuestos', medicamentoController.addCompuesto);

/**
 * @swagger
 * /api/medicamentos/{medicamentoId}/compuestos/{compuestoId}:
 *   delete:
 *     summary: Eliminar compuesto del medicamento
 *     tags: [Medicamentos]
 *     parameters:
 *       - in: path
 *         name: medicamentoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: compuestoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Compuesto eliminado
 */
router.delete('/:medicamentoId/compuestos/:compuestoId', medicamentoController.removeCompuesto);

module.exports = router;
