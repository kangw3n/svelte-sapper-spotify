
const fetch = require('node-fetch');
const client_id = 'e11f3f56e75e45089d59eaa9826054a7'; // Your client id
const client_secret = '67001baab9334d50bb774cf0aae9e45c'; // Your secret
async function getToken() {
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  let spotifyToken = await fetch('https://accounts.spotify.com/api/token', { 
    method: 'POST', 
    body: params,
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    }
  }).then(res => res.json());

  return spotifyToken;
}


export async function get(req, res) {
  let token = await getToken();
  
  res.writeHead(200, {
		'Content-Type': 'application/json'
  });
  
	res.end(JSON.stringify(token));
}