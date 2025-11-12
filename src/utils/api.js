// utils/api.js
export const submitForm = async (formData) => {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: 'YOUR_ACCESS_KEY',
      ...formData
    })
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
