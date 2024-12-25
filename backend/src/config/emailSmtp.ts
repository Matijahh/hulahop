export const emailSmtpConfig = () => {
  if (!process.env.SMTP) {
    console.error('SMTP is required');
  }

  return {
    transport: JSON.parse(process.env.SMTP),
    defaults: {
      from: '"No Reply" <noreply@hulahop.com>',
    },
  };
};
