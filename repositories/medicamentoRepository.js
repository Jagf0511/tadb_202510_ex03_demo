const pool = require('../config/db');
const Medicamento = require('../models/medicamento');

class MedicamentoRepository {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM Medicamento');
        return rows.map(row => new Medicamento(row.id, row.nombre, row.fabricante));
    }

    async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Medicamento WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return new Medicamento(rows[0].id, rows[0].nombre, rows[0].fabricante);
    }

    async create(nombre, fabricante) {
        const [result] = await pool.query(
            'INSERT INTO Medicamento (nombre, fabricante) VALUES (?, ?)',
            [nombre, fabricante]
        );
        return result.insertId;
    }

    async update(id, nombre, fabricante) {
        await pool.query(
            'UPDATE Medicamento SET nombre = ?, fabricante = ? WHERE id = ?',
            [nombre, fabricante, id]
        );
    }

    async delete(id) {
        await pool.query('DELETE FROM Medicamento WHERE id = ?', [id]);
    }

    async getCompuestosByMedicamentoId(medicamentoId) {
        const [rows] = await pool.query(
            `SELECT c.*, cmp.concentracion, cmp.unidad_medida 
             FROM Compuesto c 
             JOIN CompuestoPorMedicamento cmp ON c.id = cmp.compuesto_id 
             WHERE cmp.medicamento_id = ?`,
            [medicamentoId]
        );
        return rows;
    }

    async getMedicamentosByCompuestoId(compuestoId) {
        const [rows] = await pool.query(
            `SELECT m.*, cmp.concentracion, cmp.unidad_medida 
             FROM Medicamento m 
             JOIN CompuestoPorMedicamento cmp ON m.id = cmp.medicamento_id 
             WHERE cmp.compuesto_id = ?`,
            [compuestoId]
        );
        return rows;
    }

    async addCompuesto(medicamentoId, compuestoId, concentracion, unidad_medida) {
        const [result] = await pool.query(
            'INSERT INTO CompuestoPorMedicamento (compuesto_id, medicamento_id, concentracion, unidad_medida) VALUES (?, ?, ?, ?)',
            [compuestoId, medicamentoId, concentracion, unidad_medida]
        );
        return result.insertId;
    }

    async removeCompuesto(medicamentoId, compuestoId) {
        await pool.query(
            'DELETE FROM CompuestoPorMedicamento WHERE medicamento_id = ? AND compuesto_id = ?',
            [medicamentoId, compuestoId]
        );
    }
}

module.exports = new MedicamentoRepository();
