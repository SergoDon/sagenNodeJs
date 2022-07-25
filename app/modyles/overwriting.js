const combineStockTaking = require('./combineStockTaking');
const genPromUa = require('./genPromUa');

const overwriting = (files, res) => {
    const {stockFiles, promUa} = files;
   
    try{
        
        const stocktaking = {}; 
        
        if( Array.isArray (stockFiles)) {
            for( let file of stockFiles ){
                combineStockTaking(file, stocktaking);
            }
        } else{
            combineStockTaking(stockFiles, stocktaking);
        }
        
        genPromUa(promUa, stocktaking, res);

    } catch (error){
        res.status(307).redirect('/');
    }
    
}

module.exports = overwriting;