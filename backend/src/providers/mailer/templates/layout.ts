const layout = (content: string): string => `
   <!DOCTYPE html>
   <head>
      <meta name='viewport' content='width=device-width' >
      <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
      <title>HulaHop</title>
      <style>
         body {
           background-color: #f6f6f6;
           font-family: sans-serif;
           -webkit-font-smoothing: antialiased;
           font-size: 14px;
           line-height: 1.4;
           margin: 0;
           padding: 0;
           -ms-text-size-adjust: 100%;
           -webkit-text-size-adjust: 100%;
         }

         table {
            border-collapse: collapse !important;
        }

      @media screen and (max-width: 525px) {
        .wrapper {
          width: 100% !important;
          max-width: 100% !important;
        }
        .responsive-table {
          width: 100% !important;
        }
        .padding {
          padding: 10px 5% 15px 5% !important;
        }
        .section-padding {
          padding: 0 15px 50px 15px !important;
        }
      }

      .form-container {
        margin-bottom: 24px;
        padding: 20px;
        border: 1px dashed #ccc;
      }

      .form-heading {
        color: #2a2a2a;
        font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        text-align: left;
        line-height: 20px;
        font-size: 18px;
        margin: 0 0 8px;
        padding: 0;
      }

      .form-answer {
        color: #2a2a2a;
        font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        font-weight: 300;
        text-align: left;
        line-height: 20px;
        font-size: 16px;
        margin: 0 0 24px;
        padding: 0;
      }

       div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      </style>
   </head>
   <body style="margin: 0 !important; padding: 0 !important; background: #fff" >
   <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    ></div>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
         <tr>
           <td>
            ${content}
           </td>
         </tr>
      </table>
   </body>
  
`;

export default layout;
