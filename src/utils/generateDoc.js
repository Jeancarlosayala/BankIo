import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const doc = new jsPDF()

export const createDocument = () => {
  autoTable(doc, {
    head: [['Name', 'Email', 'Country']],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
    ],
  })

  doc.save('table.pdf')
}