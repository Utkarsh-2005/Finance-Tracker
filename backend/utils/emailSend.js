const { jsPDF }= require('jspdf');
const nodemailer = require('nodemailer');
const dataParserForItems = require('./dataParser');
const { default: fromUnixTime } = require('date-fns/fromUnixTime');
require('jspdf-autotable');



////////////////////////////////////////////////////////////////////////////////////////////////
// generating PDF Data 
function generatePDF(data) {
    const doc = new jsPDF({
      orientation : "vertical"
    });
    doc.setFontSize(32)

    doc.text("Your Expenses In Last One Month !!" , 100 , 20,'center')
    doc.setLineWidth(2)
    doc.line(20, 25, 170, 25);

    doc.setFontSize(22)
    doc.autoTable({
      body : data.body , 
      theme : 'grid',
      startY : 40,
      head : [['S.No','Date','Amount','Category']],
      foot : [['','Total',data.total,'']],
      styles: { 
          // fillColor:  [0,0,0] ,
          textColor : [0,0,0],
          fontSize : 14
      },
      headStyles: {
        fillColor: [0, 176, 80],  
        textColor: [255, 255, 255],
        fontSize: 14
    },
    footStyles: {
        fillColor: [0, 176, 80], 
        textColor: [255, 255, 255], 
        fontStyle: 'bold'
    }
    })


    return doc.output("dataurlstring").split(',')[1];
}


// Function to send the email with the generated PDF as an attachment
async function sendEmailWithAttachment( recipient,items) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
    const sortedExpenses = items.sort((a, b) => new Date(a.date) - new Date(b.date));
    const formattedExpenses = sortedExpenses.map((expense, index) => ({
      id: index + 1,
      date: expense.date,
      amount: expense.amount,
      category: expense.category,
  }));
    // console.log(formattedExpenses)
    let body = dataParserForItems(formattedExpenses);
      const pdfContent = generatePDF(body)

      const mailOptions = {
        from:process.env.EMAIL , 
        to: recipient,
        subject: 'Expense Report for This Month',
        text: 'Please find your expense report attached.',
        attachments: [
          {
            filename: 'expense_report.pdf',
            content: pdfContent,
            encoding : 'base64'
          },
        ],
      };

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
      } catch (error) {
        console.error('Error sending email:', error);
      }
}

module.exports = sendEmailWithAttachment ;
