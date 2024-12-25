export default {
  content: (data: {
    name: string;
    email: string;
    number: string;
    subject: string;
    message: string;
  }): string => `<table
   width="100%"
   border="0"
   cellspacing="0"
   cellpadding="0"
  >
     <tr>
       <td
         style="
            padding: 0 0 0 0;
            font-size: 16px;
            line-height: 25px;
            color: #232323;"
            class="padding message-content"
       >
         <div class="form-container">
           <h3 class="form-heading" align="left">Name</h3>
           <p class="form-answer" align="left">${data.name}</p>

           <h3 class="form-heading" align="left">Email</h3>
           <p class="form-answer" align="left">${data.email}</p>

           <h3 class="form-heading" align="left">Contact Number</h3>
           <p class="form-answer" align="left">${data.number}</p>

           <h3 class="form-heading" align="left">Subject</h3>
           <p class="form-answer" align="left">${data.subject}</p>

           <h3 class="form-heading" align="left">Message</h3>
           <p class="form-answer" align="left">${data.message}</p>
         </div>
       </td>
     </tr>
  </table>`,

  subject: (subject: string): string => `${subject}`,
};
