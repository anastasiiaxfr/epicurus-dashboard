function GetBotData() {
    const url = process.env.DB;
    const payload = {
        uid: '5se3GErlkQedzxBXJKCuaxuMvxH3',
        add_bot_name: 'sdf'
    };

    const queryParams = new URLSearchParams(payload).toString();
    const newUrl = `${url}?${queryParams}`;

    fetch(newUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            console.log('data', data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
     });
}

export default GetBotData