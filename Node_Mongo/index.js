const mongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');
const url='mongo://localhost:27017/';
const dbname='restaurant';
 
mongoClient.connect(url).then((client)=>{
    assert.equal(err,null);
    console.log('Connected Correctly To The Server');

    const db=client.db(dbname);
    dboper.insertDocument(db,{name:"Vada Pao",description:"test"},'dishes')
    .then((result)=>{
        console.log('Insert Document:\n',result.ops);

        return dboper.findDocuments(db,'dishes')
    })
        .then((docs)=>{
            console.log("Found Documents:\n",docs);
            return dboper.updateDocument(db,{name:"Vada Pao"},{description:"test2"},'dishes')
            .then((result)=>{
                console.log("Updated Document:\n",result.result);

                return dboper.findDocuments(db,'dishes')
                
            })
            .then((docs)=>{
                    console.log("Found Documents:\n",docs);
                    return db.dropCollection('dishes')})
                    .then((result)=>{
                        console.log('Dropped Collection: ',result);
                        client.close();
                    });
                });
    }).catch((err)=>console.log(err))
    // const collection=db.collection('dishes');

    // collection.insertOne({"name":"Pizza","description":"test"},(err,result)=>{
    //     assert.equal(err,null);
    //     console.log('After Insert:\n');
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs)=>{
    //         assert.equal(err,null);
    //         console.log('Found:\n');
    //         console.log(docs);
    //         db.dropCollection('dishes',(err,result)=>{
    //             assert.equal(err,null);
    //             client.close();


    //         });
    //     });
    // });
});