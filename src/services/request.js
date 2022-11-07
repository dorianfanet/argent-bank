export async function request(method, url, headers, body) {
  return await fetch(url, {
    method: method,
    headers: headers,
    body: body
  })
  .then(response => response.json())
  .then(response => {
    return response
  })
  .catch(err => {
    return err
  })
}