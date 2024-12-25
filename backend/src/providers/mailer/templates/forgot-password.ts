export default {
  content: (data: { resetPasswordUrl: string }): string => `<td class="wrapper">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tr>
    <td>
    <p>Hello there,</p>
    <p>You have requested to reset your password, to do so just click this button and set your new password for your HulaHop account:</p><br/>
    <table class="btn btn-primary" role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td align="left">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td><a href="${data.resetPasswordUrl}" target="_blank">Change Password</a></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table><br/>
    <p>If you didn't request this password reset, you can safely ignore this email.</p><br/><br/>
    <p>Thanks.</p>
    <p>The HulaHop team</p>
    </td>
    </tr>
    </table>
    </td>`,
  subject: (): string => 'Reset your password',
};
