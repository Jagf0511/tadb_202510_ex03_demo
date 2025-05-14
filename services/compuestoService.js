const compuestoRepository = require('../repositories/compuestoRepository');

class CompuestoService {
    async getAll() {
        return await compuestoRepository.getAll();
    }

    async getById(id) {
        return await compuestoRepository.getById(id);
    }

    async create(nombre) {
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es requerido');
        }
        return await compuestoRepository.create(nombre);
    }

    async update(id, nombre) {
        if (!id || typeof id !== 'number') {
            throw new Error('El ID es requerido');
        }
        if (!nombre || typeof nombre !== 'string') {
            throw new Error('El nombre es requerido');
        }
        await compuestoRepository.update(id, nombre);
    }

    async delete(id) {
        if (!id || typeof id !== 'number') {
            throw new Error('El ID es requerido');
        }
        await compuestoRepository.delete(id);
    }

    async getMedicamentosByCompuestoId(compuestoId) {
        return await compuestoRepository.getMedicamentosByCompuestoId(compuestoId);
    }
}

module.exports = new CompuestoService();
