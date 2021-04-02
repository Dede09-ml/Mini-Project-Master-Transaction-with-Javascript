module.exports = exports = (app, pool) => {

    
    app.get('/api/location', (req,res) => {
        const query = `select * from m_location`
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
    }),

    app.get('/api/spesialization', (req,res) => {
        const query = `select * from m_spesialization`
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
    }),

    app.get('/api/treatment', (req,res) => {
        const query = `select * from t_doctor_treatment`
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
    }),


    app.post('/api/search', (req,res) => {
        const {loc_name, treatment, spes, name, page, pagesize} = req.body

        const qFilter1 = loc_name != '' ? ` and lo.name = '${loc_name}' or lo.parent_id = (select id from m_location where name = '${loc_name}') ` : ''
        const qFilter2 = treatment != '' ? ` and doc.id = (select doctor_id from t_doctor_treatment where name= '${treatment}') ` : ''
        const qFilter3 = name != '' ? ` and bi.fullname like '%${name}%' ` :  ''
        const qFilter4 = spes != '' ? ` and dof.specialization = '${spes}' ` : ''
        const qPage = name =='' ? (page-1) * pagesize : 0

        const query = `select bi.fullname, bi.image_path, dof.specialization,  
        DATE_PART('year', AGE(MAX(now()), MIN(dof.created_on))) as pengalaman
        from m_biodata as bi
        join  m_doctor as doc on bi.id = doc.biodata_id
        join  t_doctor_office as dof on doc.id = dof.doctor_id
        join  m_medical_facility as mf on dof.medical_facility_id = mf.id
        join  m_location as lo on mf.location_id = lo.id
        where bi.is_delete = false 
        ${qFilter1}
        ${qFilter3}
        ${qFilter4}
        ${qFilter2} 
        group by bi.fullname, bi.image_path, dof.specialization
        LIMIT ${pagesize} OFFSET ${qPage}
        
        `


        // const query = ` select bi.fullname, bi.image_path, lo.name as location, dt.name as treatment, sp.name as spesialisasi
        // from m_spesialization as sp
        // join t_current_doctor_specialization as ds on sp.id = ds.specialization_id
        // join m_doctor as doc on ds.doctor_id = doc.id
        // join t_doctor_treatment as dt on doc.id = dt.doctor_id
        // join m_doctor as d on dt.doctor_id = d.id
        // join m_biodata as bi on d.biodata_id = bi.id
        // join m_biodata_address as ba on bi.id = ba.biodata_id
        // join m_location as lo on ba.location_id = lo.id 
        // where ${qFilter4} ${qFilter3} ${qFilter2} ${qFilter1} LIMIT ${pagesize} OFFSET ${qPage}`

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
    }),

    app.post('/api/count', (req,res) => {
        const {loc_name, treatment, spes, name} = req.body

        const qFilter1 = loc_name != '' ? ` and lo.name = '${loc_name}' ` : ''
        const qFilter2 = treatment != '' ? ` and doc.id = (select doctor_id from t_doctor_treatment where name= '${treatment}') ` : ''
        const qFilter3 = name != '' ? ` and bi.fullname like '%${name}%' ` :  ''
        const qFilter4 = spes != '' ? ` and dof.specialization = '${spes}' ` : ''

        let query = `select count(bi.fullname)
        from m_biodata as bi
        join  m_doctor as doc on bi.id = doc.biodata_id
        join  t_doctor_office as dof on doc.id = dof.doctor_id
        join  m_medical_facility as mf on dof.medical_facility_id = mf.id
        join  m_location as lo on mf.location_id = lo.id
        where bi.is_delete = false 
        ${qFilter1}
        ${qFilter3}
        ${qFilter4}
        ${qFilter2} `

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

    app.post('/api/getRS', (req,res) => {
        const {name} = req.body

        
        const query = `select mf.name as location, bi.fullname from m_medical_facility as mf
        join t_doctor_office as dof on mf.id = dof.medical_facility_id
        join m_doctor as doc on dof.doctor_id=doc.id
        join m_biodata as bi on doc.biodata_id = bi.id`
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


    app.get('/api/getschedule', (req,res) => {
        // const {name} = req.body

        const query = `select bi.fullname, mfs.day, substr(mfs.time_schedule_start,1,2) as start, 
        substr(mfs.time_schedule_end,1,2) as end,
		case
		when to_char(current_date,'D') = '1' then 'Minggu'
		when to_char(current_date,'D') = '2' then 'Senin'
		when to_char(current_date,'D') = '3' then 'Selasa'
		when to_char(current_date,'D') = '4' then 'Rabu'
		when to_char(current_date,'D') = '5' then 'Kamis'
		when to_char(current_date,'D') = '6' then 'Jumat'
		when to_char(current_date,'D') = '7' then 'Sabtu'
		end as hari_ini,
        date_part('hours',now()) as jam_sekarang
        from m_biodata as bi
        join m_doctor as doc on bi.id = doc.biodata_id
        join t_doctor_office_schedule as dos on doc.id = dos.doctor_id
        join m_medical_facility_schedule as mfs on dos.medical_facility_schedule_id = mfs.id `

        // const query = `select bi.fullname, mfs.day, substr(mfs.time_schedule_start,1,2) as start, 
        // substr(mfs.time_schedule_end,1,2) as end,
        // date_part('day',now()) as hari_sekarang,
        // date_part('hours',now()) as jam_sekarang
        // from m_biodata as bi
        // join m_doctor as doc on bi.id = doc.biodata_id
        // join t_doctor_office_schedule as dos on doc.id = dos.doctor_id
        // join m_medical_facility_schedule as mfs on dos.medical_facility_schedule_id = mfs.id        
        // `
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