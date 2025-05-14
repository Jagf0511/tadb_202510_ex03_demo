const compuestoService = require('../services/compuestoService');

const compuestoController = {
    async getAll(req, res) {
        try {
            const compuestos = await compuestoService.getAll();
            res.json(compuestos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const compuesto = await compuestoService.getById(req.params.id);
            if (!compuesto) {
                return res.status(404).json({ error: 'Compuesto no encontrado' });
            }
            res.json(compuesto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const id = await compuestoService.create(req.body.nombre);
            res.status(201).json({ id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            await compuestoService.update(req.params.id, req.body.nombre);
            res.json({ message: 'Compuesto actualizado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await compuestoService.delete(req.params.id);
            res.json({ message: 'Compuesto eliminado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getMedicamentosByCompuestoId(req, res) {
        try {
            const medicamentos = await compuestoService.getMedicamentosByCompuestoId(req.params.id);
            res.json(medicamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = compuestoController;
