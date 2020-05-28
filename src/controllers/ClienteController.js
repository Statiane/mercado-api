const mysql = require('../connection/mysql').pool

module.exports = {

	async login(req, res, next) {
		mysql.getConnection((error, conn) => {
			if (error) return res.status(500).send({ error: error })

			conn.query({
				sql: 'SELECT * FROM view_cliente_login'
			}, (err, result) => {
				conn.release()

				if (err) return res.status(500).send({ error: err.message, response: null })

				if (result.length == 0) return res.status(404).send({ response: null })

				const response = {
					quantidade: result.length,
					cliente: result.map((cliente) => {
						return {
							id: cliente.id,
							nome: cliente.nome,
							usuario: cliente.usuario,
							senha: cliente.senha
						}
					})
				}

				return res.status(200).send(response)
			})
		})
	},
}