import jsPDF from 'jspdf';

interface OrderItem {
  product: {
    name: string;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  createdAt: Date;
  total: number;
  shippingAddress: string;
  items: OrderItem[];
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
}

export function generateVoucherPDF(order: Order): jsPDF {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(20);
  doc.text('Vale de Pago - Konfort Total', 20, 30);

  // Datos del cliente
  doc.setFontSize(12);
  doc.text('Datos del Cliente:', 20, 50);
  doc.text(`Nombre: ${order.user.name}`, 20, 60);
  doc.text(`Email: ${order.user.email}`, 20, 70);
  if (order.user.phone) doc.text(`Teléfono: ${order.user.phone}`, 20, 80);
  if (order.user.address) doc.text(`Dirección: ${order.user.address}`, 20, 90);

  // Detalles de la orden
  let y = 110;
  doc.text('Detalles de la Orden:', 20, y);
  y += 10;
  doc.text(`Número de Orden: ${order.id}`, 20, y);
  y += 10;
  doc.text(`Fecha: ${order.createdAt.toLocaleDateString('es-ES')}`, 20, y);
  y += 10;
  doc.text(`Dirección de Envío: ${order.shippingAddress}`, 20, y);
  y += 20;

  // Productos
  doc.text('Productos:', 20, y);
  y += 10;
  order.items.forEach(item => {
    doc.text(`${item.product.name} - Cantidad: ${item.quantity} - Precio: ${item.price} CUP`, 20, y);
    y += 10;
  });

  // Total
  y += 10;
  doc.setFontSize(14);
  doc.text(`Total a Pagar: ${order.total} CUP`, 20, y);

  // Instrucciones de pago
  y += 30;
  doc.setFontSize(12);
  doc.text('Instrucciones de Pago:', 20, y);
  y += 10;
  doc.text('Este vale es válido para pago en efectivo en nuestras tiendas físicas.', 20, y);
  y += 10;
  doc.text('Presente este documento al momento de recoger su pedido.', 20, y);
  y += 10;
  doc.text('Para pagos en efectivo, diríjase a cualquiera de nuestras sucursales en Cuba.', 20, y);
  y += 10;
  doc.text('Moneda: Pesos Cubanos (CUP)', 20, y);

  return doc;
}

export function downloadVoucher(order: Order) {
  const doc = generateVoucherPDF(order);
  doc.save(`vale-pago-${order.id}.pdf`);
}