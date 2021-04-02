module.exports = exports = (app, pool) => {

    //menampilkan semua nama di table
    app.post('/api/relation', (req,res) => {
        const {search} = req.body
        const qFilter = search != '' ? `and name ilike '%${search}%'` : ''
        const query = `select * from m_customer_relation 
        where is_delete = false ${qFilter} order by id`
        pool.query(query,(error, result) => {
            if(error){
                res.send(400, {
                    succes: false,
                    result : error
                
                })
            }
            else {
                res.send(200, {
                    success : true,
                    result : result.rows
                })
            }
        })
    })

    //menambahkan
    app.post('/api/addrelation', (req,res) => {
        const {name} = req.body
        // name = name.trim()
        const query = `insert into m_customer_relation
        (name, created_by, created_on, is_delete) values ('${name}','1', now(), false )`
        pool.query(query,(error, result) => {
            if(error){
                if(`${name}`.length > 30){
                    res.send({
                        succes: false,
                        result : "Tidak boleh lebih dari 30 karakter"
                    
                    })
                } else {
                    res.send(400, {
                        succes: false,
                        result : error
                    })
                }
            }
            else {
                res.send(200, {
                    success : true,
                    result : `Data ${name} has been add`
                })
            }
        })
    })

    app.get('/api/getrelationid/:id', (req,res) => {
        const {id} = req.params
        const query = `SELECT * FROM m_customer_relation WHERE id = ${id}`
        pool.query(query,(error, result) => {
            if(error){
                res.send(400, {
                    succes: false,
                    result : error
                
                })
            }
            else {
                res.send(200, {
                    success : true,
                    result : result.rows[0]
                })
            }
        })
    })

    app.put('/api/updaterelation/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {name } = req.body
        const query = `UPDATE m_customer_relation
                        SET name='${name}',
                        modify_by='1', modify_on=now()
                        WHERE id = ${id}`
        pool.query(query, (error, result) => {
            if(error){
                if(`${name}`.length > 30){
                    res.send({
                        succes: false,
                        result : "Tidak boleh lebih dari 30 karakter"
                    
                    })
                } else {
                    res.send(400, {
                        succes: false,
                        result : error
                    })
                }
            }
            else {
                res.send(200, {
                    success : true,
                    result : `Data ${name} has been updated`
                })
            } 
        })
    })

    app.put('/api/deleterelation/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {name } = req.body        // const {nameactive} = req.body
        const query = `UPDATE m_customer_relation
                        SET is_delete = true, delete_by = '1', delete_on = now()
                        WHERE id = ${id}`
        pool.query(query, (error, result) => {
            if(error){
                res.send(400 , {
                    success : false,
                    result : error
                })
            }
            else {
                res.send(200, {
                    success : true,
                    result : `Data ${name} has been deleted`
                })
            } 
        })
    })

    app.get('/api/getname', (req,res) => {
        // const {id} = req.params
        const {name,id} = req.body
        const query = `SELECT id,name FROM m_customer_relation where is_delete=false`
        pool.query(query,(error, result) => {
            if(error){
                res.send(400, {
                    succes: false,
                    result : error
                
                })
            }
            else {
                res.send(200, {
                    success : true,
                    result : result.rows
                })
            }
        })
    })



}