let XLSX = require('xlsx');
const path = require("path");

const overwriting = (files, res) => {
    const {stockFiles, promUa} = files;
    let promUaWb = XLSX.read(promUa.data);
    
    const stocktaking = {}; 

    for( let file of stockFiles ){
        let fileWb = XLSX.read(file.data);
        let fileRaw = fileWb.Sheets[fileWb.SheetNames[0]];
        let fileSheetJs = XLSX.utils.sheet_to_json(fileRaw);
        
        for( let value of fileSheetJs){
            
            const fileSheetArr = Object.entries(value)
            let article = fileSheetArr[0][1];
            let count = fileSheetArr.length >1 ? fileSheetArr[fileSheetArr.length - 1][1] : 0;
            stocktaking.hasOwnProperty(article) ? stocktaking[article] += count : stocktaking[article] = count;
        }
    }
    
    const promUaRawOne = promUaWb.Sheets[promUaWb.SheetNames[0]];
    const promUaRawTwo = promUaWb.Sheets[promUaWb.SheetNames[1]];
     
    const promUalength = Object.keys(promUaRawOne).length;
    const storArr = Object.entries(stocktaking);
    const noEdit = new RegExp(/[9]{5}/);
    
    for ( let i = 2; i < promUalength; i++){
        if(promUaRawOne[`A${i}`] && promUaRawOne[`Q${i}`] && !noEdit.test(promUaRawOne[`A${i}`].v)){
            for( let j = 0; j < storArr.length; j++){
                if(promUaRawOne[`A${i}`].v === storArr[j][0]){
                    promUaRawOne[`Q${i}`].v = storArr[j][1];
                    promUaRawOne[`P${i}`].v = "+";
                } 
            } 
            if(!stocktaking.hasOwnProperty(promUaRawOne[`A${i}`].v) && !noEdit.test(promUaRawOne[`A${i}`].v)){
                promUaRawOne[`Q${i}`].v = 0;
                promUaRawOne[`P${i}`].v = "+";
            }
        }
        
    }

    const PromResltWorkbook = XLSX.utils.book_new();// инициализируем новую книгу
    XLSX.utils.book_append_sheet(PromResltWorkbook, promUaRawOne, "Export Products Sheet");// добавляем лист "Export Products Sheet" с данными "promUaRawOne"
    XLSX.utils.book_append_sheet(PromResltWorkbook, promUaRawTwo, "Export Groups Sheet");// добавляем лист "Export Groups Sheet" с данными "promUaRawTwo"
    XLSX.writeFile(PromResltWorkbook, "resalt.xlsx");
    res.download(path.join(__dirname + '../../../resalt.xlsx'));

    //XLSX.writeFileAsync('resalt.xlsx', PromResltWorkbook, (Buffer) => res.download(Buffer))

}

module.exports = overwriting;