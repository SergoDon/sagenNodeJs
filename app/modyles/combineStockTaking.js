let XLSX = require('xlsx');

const combineStockTaking = (stock, stocktaking) => {
    let fileWb = XLSX.read(stock.data);
    let fileRaw = fileWb.Sheets[fileWb.SheetNames[0]];
    let fileSheetJs = XLSX.utils.sheet_to_json(fileRaw);
                
    for( let value of fileSheetJs){
        const fileSheetArr = Object.entries(value)
        let article = fileSheetArr[0][1];
        let count = fileSheetArr.length >1 ? fileSheetArr[fileSheetArr.length - 1][1] : 0;
        stocktaking.hasOwnProperty(article) ? stocktaking[article] += count : stocktaking[article] = count;
    }
}

module.exports = combineStockTaking;