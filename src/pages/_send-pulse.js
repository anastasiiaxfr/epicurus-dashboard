//GET KEY
function getSPKey(type, SPdata) {
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
    }
    )
    .catch(error => {
      //alert('ERROR get SP Key')
      console.error(error)
    });
}


//let access_token = getCookie("access_token");
const addressBook = process.env.SENDPULSE_ADDRESS_BOOK_ID;

const apiUrl = `https://api.sendpulse.com/addressbooks/${addressBook}/emails`;

//ADD_USER_SENDPULSE
function addUserToSP(emailData, access_token) {
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
function changeVarSP(variableData, access_token){
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


export { getSPKey }
export default function () {
    return <></>
}