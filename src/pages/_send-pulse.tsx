//GET KEY
function getSPKey(type: any, SPdata: any) {
  const accessData = {
    "grant_type": "client_credentials",
    "client_id": process.env.SENDPULSE_ID,
    "client_secret": process.env.SENDPULSE_SECRET
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accessData)
  };

  fetch('https://api.sendpulse.com/oauth/access_token', requestOptions)
    .then(response => response.json())
    .then(data => {
      //setCookie("access_token", data.access_token, 1 / 4)
      //alert(data.access_token)
      //console.log('SP_key', data.access_token)
      if (type === 'new-user') {
        addUserToSP(SPdata, data.access_token)
      }
      if (type === 'new-bot') {
        changeVarSP(SPdata, data.access_token)
      }

      if(type === 'withdrawal') {
        sendEmail(SPdata, data.access_token)
      }
    }
    )
    .catch(error => {
      //alert('ERROR get SP Key')
      console.error(error)
    });
}
//getSPKey()

//let access_token = getCookie("access_token");
const addressBook = process.env.SENDPULSE_ADDRESS_BOOK_ID;

const apiUrl = `https://api.sendpulse.com/addressbooks/${addressBook}/emails`;

//ADD_USER_SENDPULSE
function addUserToSP(emailData: any, access_token: any) {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => response.json())
    .then((data) => {
      //alert(data);

    })
    .catch((error) => {
      //alert('ERROR send user to SP')
      console.error(error)
    });
}

//CHANGE_VARIABLE_BY_EMAIL_SENDPULSE
function changeVarSP(variableData: any, access_token: any){
  fetch(`https://api.sendpulse.com/addressbooks/${addressBook}/emails/variable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify(variableData)
  })
  .then((response) => response.json())
  .then((data) => {
    //alert(data);
  })
  .catch((error) => {
    //alert('ERROR send user to SP')
    console.error(error)
  });
}

//SEND SMTP EMAIL
const recipientEmail = 'joht.galt.777@gmail.com';
const senderEmail = 'office@itg-investments.com';

const subject = 'New Bot Withdrawal';

const smtpUrl = 'https://api.sendpulse.com/smtp/emails';

function sendEmail(SPdata: any, token: any) {
  const message = `User want Withdrawal:
  user_id: ${SPdata.user_id}
  user_email: ${SPdata.user_email}
  bot_id: ${SPdata.bot_id}
  bot_balance: ${SPdata.bot_balance}
  bot_withdrawal: ${SPdata.bot_withdrawal}
  user_wallet: ${SPdata.user_wallet}
  `;

  const emailData = {
    subject: subject,
    from: {
      name: 'Epicurus Dashboard',
      email: senderEmail
    },
    to: [
      {
        email: recipientEmail
      }
    ],
    html: message
  };

  fetch(smtpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(emailData)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Email sent successfully:', data);
  })
  .catch(error => {
    console.error('Error sending email:', error);
  });
}



export { getSPKey }
export default function () {
    return <></>
}