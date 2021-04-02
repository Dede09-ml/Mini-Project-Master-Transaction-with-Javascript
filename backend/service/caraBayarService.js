module.exports = exports = (app, pool) => {

   //menampilkan semua nama di table
   app.post('/api/payment', (req,res) => {
    const {search, page, pagesize} = req.body
    const qFilter = search != '' ? `and name ilike '%${search}%'` : ''
    const qPage = search =='' ? (page-1) * pagesize : 0


    const query = `select * from m_payment_method
    where is_delete = false ${qFilter} order by id LIMIT ${pagesize} OFFSET ${qPage}`
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
app.post('/api/addpayment', (req,res) => {
    const {name} = req.body
    const query = `insert into m_payment_method
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

app.get('/api/getpaymentid/:id', (req,res) => {
    const {id} = req.params
    const query = `SELECT * FROM m_payment_method WHERE id = ${id}`
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

app.put('/api/updatepayment/:id', (req, res) => {
    const id = req.params.id //sama aja ini sama yg kurung kurawal
    const {name } = req.body
    const query = `UPDATE m_payment_method
                    SET name='${name}',
                    modified_by='1', modified_on=now()
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

app.put('/api/deletepayment/:id', (req, res) => {
    const id = req.params.id //sama aja ini sama yg kurung kurawal
    const {name } = req.body        // const {nameactive} = req.body
    const query = `UPDATE m_payment_method
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

app.get('/api/getpaymentname', (req,res) => {
    // const {id} = req.params
    const query = `SELECT id,name FROM m_payment_method where is_delete = false`
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

app.post('/api/countpay', (req,res) => {
    const {search, page, pagesize} = req.body
    const qFilter = search != '' ? `and name ilike '%${search}%'` : ''
 
    const query = `select count(name) from m_payment_method
    where is_delete = false ${qFilter}`

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