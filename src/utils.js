async function postData(url = '', data = {}, token="") {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
   
      },
      body: JSON.stringify(data),
    });
    return await response.json(); 
  }

export default postData