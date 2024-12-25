export const EMAIL_TEMPLATES = {
  CREATE_ORDER: {
    type: 'CONSUMER_PAYMENT_SUCCESSFUL',
    src: 'src/providers/mailer/templates/create-order.html',
    sender: '', // Add sender email here
    subject: 'Order created',
    name: 'create-order.html',
  },
};
