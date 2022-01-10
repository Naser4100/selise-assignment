import { Response } from 'express';
import PdfDocument from 'pdfkit';

const pdfDoc = new PdfDocument({ bufferPages: true });

const generatePdfUtils = (
  clientId: string,
  orderDetails: any,
  res: Response
) => {
  // pdfDoc.pipe(fs.createWriteStream(`pdf/${clientId}.pdf`));

  const stream = res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-disposition': `attachment;filename=${clientId}.pdf`,
  });

  pdfDoc.on('data', (chunk) => stream.write(chunk));
  pdfDoc.on('end', () => stream.end());

  pdfDoc.text('Order summary', { align: 'center', underline: true });

  pdfDoc.text('Product and Order Details', { align: 'left' });
  pdfDoc.text('__________________', { align: 'left' });
  orderDetails.map((order: any) => {
    pdfDoc.text(`Product name: ${order.productId.name}`, { align: 'left' });
    pdfDoc.text(`Price: ${order.productId.price}`, { align: 'left' });
    pdfDoc.text(`Details: ${order.productId.details}`, { align: 'left' });
    pdfDoc.text(`sizes: ${order.productId.sizes.map((size: any) => size)}`, {
      align: 'left',
    });
    pdfDoc.text('-------------------------', { align: 'left' });
    pdfDoc.text('Order details', { align: 'left' });
    pdfDoc.text(`Quantity: ${order.quantity}`, { align: 'left' });
    pdfDoc.text(`Total price: ${order.totalPrice}`, { align: 'left' });
    pdfDoc.text(`Size: ${order.size}`, { align: 'left' });
    pdfDoc.text('=========================', { align: 'left' });
  });

  pdfDoc.end();
};

export default generatePdfUtils;
