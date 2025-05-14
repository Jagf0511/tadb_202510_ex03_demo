const medicamentoService = require('../services/medicamentoService');

const medicamentoController = {
    async getAll(req, res) {
        try {
            const medicamentos = await medicamentoService.getAll();
            res.json(medicamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const medicamento = await medicamentoService.getById(req.params.id);
            if (!medicamento) {
                return res.status(404).json({ error: 'Medicamento no encontrado' });
            }
            res.json(medicamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const id = await medicamentoService.create(req.body.nombre, req.body.fabricante);
            res.status(201).json({ id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            await medicamentoService.update(req.params.id, req.body.nombre, req.body.fabricante);
            res.json({ message: 'Medicamento actualizado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await medicamentoService.delete(req.params.id);
            res.json({ message: 'Medicamento eliminado' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getCompuestosByMedicamentoId(req, res) {
        try {
            const compuestos = await medicamentoService.getCompuestosByMedicamentoId(req.params.id);
            res.json(compuestos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async addCompuesto(req, res) {
        try {
            const id = await medicamentoService.addCompuesto(
                req.params.medicamentoId,
                req.body.compuestoId,
                req.body.concentracion,
                req.body.unidad_medida
            );
            res.status(201).json({ id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async removeCompuesto(req, res) {
        try {
            await medicamentoService.removeCompuesto(req.params.medicamentoId, req.params.compuestoId);
            res.json({ message: 'Compuesto eliminado del medicamento' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = medicamentoController;
