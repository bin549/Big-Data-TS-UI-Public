import FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { nextTick } from "vue";

export interface IExportXlsx {
    eleById: string,
    title: string
}

const exportToExcel = async (element: string | Array<IExportXlsx>, name?: string): Promise<Object> => {
    await nextTick()
    const xlsxParam = { raw: true }
    let wb: XLSX.WorkBook
    if (typeof element === 'string') {
        wb = XLSX.utils.table_to_book(document.getElementById(element), xlsxParam)
    } else {
        wb = XLSX.utils.book_new();
        element.forEach((item: IExportXlsx) => XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(document.getElementById(item.eleById), xlsxParam), item.title))
    }
    const fileName: string = `${name || new Date().getTime()}.xlsx`
    const wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
    })
    try {
        FileSaver.saveAs(new Blob([wbout], {
            type: 'application/octet-stream'
        }), fileName)
    } catch (e) {
        console.log(e, wbout)
    }
    return wbout
}
export default exportToExcel