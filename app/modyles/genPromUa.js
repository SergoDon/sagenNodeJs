let XLSX = require('xlsx');
const path = require("path");

const genPromUa = (promUa, stocktaking, res) => {
    let promUaWb = XLSX.read(promUa.data);

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
    
    const PromResltWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(PromResltWorkbook, promUaRawOne, "Export Products Sheet");
    XLSX.utils.book_append_sheet(PromResltWorkbook, promUaRawTwo, "Export Groups Sheet");
    XLSX.writeFile( PromResltWorkbook, "resalt.xlsx");  
    res.status(200).download(path.join(__dirname + '../../../resalt.xlsx'));
}

module.exports = genPromUa;