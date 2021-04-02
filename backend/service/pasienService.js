module.exports = exports = (app, pool) => {

    app.get('/api/blood', (req,res) => {
        const query = `select * from m_blood_group`
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

    app.get('/api/getrelation', (req,res) => {
        const query = `select * from m_customer_relation where is_delete = false`
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

    app.post('/api/add1', (req,res) => {
        const {name} = req.body
        const query = `insert into m_biodata (fullname,created_on, is_delete) values ('${name}',now(), false)`
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
                    result : `Data ${name} saved`
                })
            }
        })
    })

    app.post('/api/add2', (req,res) => {
        const {name, blood, bod, gender, rhesus, height, weight} = req.body
        const qBlood = blood ==''? ` 0, ` :  ` (select id from m_blood_group where code='${blood}'), `
        const qHeight = height ==''? ` 0, ` : ` '${height}', `
        const qWeight = weight ==''? ` 0, ` : ` '${weight}', `
        const qRhesus = rhesus ==''? ` '-', ` :  ` '${rhesus}', `

        const query = `insert into m_customer (biodata_id,dob,gender,blood_group_id,rhesus_type,height,weight,created_on,is_delete) 
        values (
            (select id from m_biodata where fullname='${name}'),
            '${bod}', '${gender}', ${qBlood}
            ${qRhesus} ${qHeight} ${qWeight} now(), false
        )`
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
                    result : `Data ${name} saved`
                })
            }
        })
    })

    app.post('/api/add3', (req,res) => {
        const {parent_id, name,relation} = req.body
        const query = `insert into m_customer_member
        (parent_biodata_id, customer_id, customer_relation_id, created_on, is_delete) 
        values
        (${parent_id}, (select id from m_customer where biodata_id = (select id from m_biodata where fullname='${name}') ),
        (select id from m_customer_relation where is_delete = false and name='${relation}'),
        now(), false)
        
        `
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
                    result : `Data ${name} saved`
                })
            }
        })
    })

    app.post('/api/pasien', (req,res) => {
        const {search, page, pagesize,order,order2,parent_id} = req.body
       
        const qFilter = search != '' ? `and bi.fullname ilike '%${search}%'` : ''
        const qPage = search =='' ? (page-1) * pagesize : 0
        const qSort = order != '' ? `ORDER BY ${order}` : `ORDER BY bi.fullname`
        const qSort2 = order2 != '' ? `${order2}` : `ASC`

        const query = `select bi.id as id, bi.fullname,extract(year from age(cu.dob)) as umur,cr.name ,
        (select count(cc.id) from t_customer_chat as cc where cc.customer_id = cu.id) as chat,
        (select count(ap.id) from t_appointment as ap where ap.customer_id = cu.id) as janji
        from m_biodata as bi
        join m_customer as cu on bi.id=cu.biodata_id
        join m_customer_member as cm on cu.id=cm.customer_id
        join m_customer_relation as cr on cm.customer_relation_id = cr.id
        where bi.is_delete=false and cm.parent_biodata_id = ${parent_id} ${qFilter} ${qSort} ${qSort2} LIMIT ${pagesize} OFFSET ${qPage}`

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

    app.post('/api/self', (req,res) => {
        const {parent_id} = req.body
        const query = `select bi.id, bi.fullname,extract(year from age(cu.dob)) as umur
        from m_biodata as bi
        join m_customer as cu on bi.id=cu.biodata_id
        where bi.is_delete=false and bi.id = ${parent_id}
		`

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

    app.post('/api/countpasien', (req,res) => {
        const {search, page, pagesize, parent_id} = req.body
        const qFilter = search != '' ? `and bi.fullname ilike '%${search}%'` : ''
     
        const query = `select count(bi.fullname) from m_biodata as bi
        join m_customer as cu on bi.id=cu.biodata_id
        join m_customer_member as cm on cu.id=cm.customer_id
        join m_customer_relation as cr on cm.customer_relation_id = cr.id
        where cm.is_delete=false and cm.parent_biodata_id = ${parent_id} ${qFilter}`
    
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

    app.put('/api/delete1/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal

        const {fullname} = req.body        // const {nameactive} = req.body
        const query = `update m_biodata set is_delete=true, delete_on=now(), delete_by ='1'
                        WHERE id = ${id} `
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
                    result : `Data ${fullname} has been deleted`
                })
            } 
        })
    })

    app.put('/api/multidelete1/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal

        const {fullname} = req.body        // const {nameactive} = req.body
        const query = `update m_biodata set is_delete=true, delete_on=now(), delete_by ='1'
                        WHERE id = ${id} `
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
                    result : `Data has been deleted`
                })
            } 
        })
    })

    app.put('/api/delete2/:id', (req, res) => {
        //sama aja ini sama yg kurung kurawal
        const {id} = req.params
        const {fullname } = req.body        // const {nameactive} = req.body
        const query = `update m_customer set is_delete=true, delete_on=now(), delete_by='1'
                        WHERE biodata_id = ${id} `
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
                    result : `Data ${fullname} has been deleted`
                })
            } 
        })
    })

    app.put('/api/multidelete2/:id', (req, res) => {
        //sama aja ini sama yg kurung kurawal
        const {id} = req.params
        const {fullname } = req.body        // const {nameactive} = req.body
        const query = `update m_customer set is_delete=true, delete_on=now(), delete_by='1'
                        WHERE biodata_id = ${id} `
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
                    result : `Data has been deleted`
                })
            } 
        })
    })

    app.put('/api/delete3/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {fullname } = req.body        // const {nameactive} = req.body
        const query = `update m_customer_member set is_delete=true, delete_on=now(), delete_by='1'
                        WHERE customer_id = (select cu.id from m_customer as cu
                            where biodata_id= ${id}) `
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
                    result : `Data ${fullname} has been deleted`
                })
            } 
        })
    })

    app.put('/api/multidelete3/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {fullname } = req.body        // const {nameactive} = req.body
        const query = `update m_customer_member set is_delete=true, delete_on=now(), delete_by='1'
                        WHERE customer_id = (select cu.id from m_customer as cu
                            where biodata_id= ${id}) `
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
                    result : `Data has been deleted`
                })
            } 
        })
    })

    app.get('/api/getpasienid/:id', (req,res) => {
        const {id} = req.params
        const query = `select bi.id, bi.fullname as name, to_char(cu.dob, 'yyyy-mm-dd') as bod, cu.gender, 
        (select code from m_blood_group where id=cu.blood_group_id)as blood,
        cu.rhesus_type as rhesus, 
        cu.height, cu.weight, cr.name as relation
        from m_biodata as bi
        join m_customer as cu on bi.id=cu.biodata_id
        join m_customer_member as cm on cu.id=cm.customer_id
        join m_customer_relation as cr on cm.customer_relation_id = cr.id
         WHERE bi.id = ${id}`
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
    

    app.put('/api/update1/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {name } = req.body
        const query = `UPDATE m_biodata
                        SET fullname='${name}',
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

    app.put('/api/update2/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {name,bod, gender,blood,rhesus,height,weight } = req.body

        const query = `UPDATE m_customer
                        SET dob='${bod}', gender='${gender}', 
                        blood_group_id=(select id from m_blood_group where code='${blood}'), rhesus_type='${rhesus}',
                        height='${height}', weight='${weight}',
                        modify_by='1', modify_on=now()
                        WHERE biodata_id = ${id}`
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

    app.put('/api/update3/:id', (req, res) => {
        const id = req.params.id //sama aja ini sama yg kurung kurawal
        const {name,relation } = req.body
        const query = `UPDATE m_customer_member
                        SET customer_relation_id=(select id from m_customer_relation where name='${relation}' and is_delete=false),
                        modify_by='1', modify_on=now()
                        WHERE customer_id = (select id from m_customer where biodata_id= ${id})`
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


}