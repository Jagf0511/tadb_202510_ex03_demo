const pool = require('../config/db');
const Compuesto = require('../models/compuesto');

class CompuestoRepository {
    async getAll() {
        const [rows] = await pool.query('SELECT * FROM Compuesto');
        return rows.map(row => new Compuesto(row.id, row.nombre));
    }

    async getById(id) {
        const [rows] = await pool.query('SELECT * FROM Compuesto WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return new Compuesto(rows[0].id, rows[0].nombre);
    }

    async create(nombre) {
        const [result] = await pool.query('INSERT INTO Compuesto (nombre) VALUES (?)', [nombre]);
        return result.insertId;
    }

    async update(id, nombre) {
        await pool.query('UPDATE Compuesto SET nombre = ? WHERE id = ?', [nombre, id]);
    }

    async delete(id) {
        await pool.query('DELETE FROM Compuesto WHERE id = ?', [id]);
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
}

module.exports = new CompuestoRepository();
