const medicamentoRepository = require('../repositories/medicamentoRepository');

class MedicamentoService {
    async getAll() {
        return await medicamentoRepository.getAll();
    }

    async getById(id) {
        return await medicamentoRepository.getById(id);
    }

    async create(nombre, fabricante) {
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es requerido');
        }
        if (!fabricante || typeof fabricante !== 'string') {
            throw new Error('El fabricante es requerido');
        }
        return await medicamentoRepository.create(nombre, fabricante);
    }

    async update(id, nombre, fabricante) {
        if (!id || typeof id !== 'number') {
            throw new Error('El ID es requerido');
        }
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es requerido');
        }
        if (!fabricante || typeof fabricante !== 'string') {
            throw new Error('El fabricante es requerido');
        }
        await medicamentoRepository.update(id, nombre, fabricante);
    }

    async delete(id) {
        if (!id || typeof id !== 'number') {
            throw new Error('El ID es requerido');
        }
        await medicamentoRepository.delete(id);
    }

    async getCompuestosByMedicamentoId(medicamentoId) {
        return await medicamentoRepository.getCompuestosByMedicamentoId(medicamentoId);
    }

    async getMedicamentosByCompuestoId(compuestoId) {
        return await medicamentoRepository.getMedicamentosByCompuestoId(compuestoId);
    }

    async addCompuesto(medicamentoId, compuestoId, concentracion, unidad_medida) {
        if (!medicamentoId || typeof medicamentoId !== 'number') {
            throw new Error('El ID del medicamento es requerido');
        }
        if (!compuestoId || typeof compuestoId !== 'number') {
            throw new Error('El ID del compuesto es requerido');
        }
        if (!concentracion || typeof concentracion !== 'number') {
            throw new Error('La concentración es requerida');
        }
        if (!unidad_medida || typeof unidad_medida !== 'string') {
            throw new Error('La unidad de medida es requerida');
        }
        return await medicamentoRepository.addCompuesto(medicamentoId, compuestoId, concentracion, unidad_medida);
    }

    async removeCompuesto(medicamentoId, compuestoId) {
        if (!medicamentoId || typeof medicamentoId !== 'number') {
            throw new Error('El ID del medicamento es requerido');
        }
        if (!compuestoId || typeof compuestoId !== 'number') {
            throw new Error('El ID del compuesto es requerido');
        }
        await medicamentoRepository.removeCompuesto(medicamentoId, compuestoId);
    }
}

module.exports = new MedicamentoService();
