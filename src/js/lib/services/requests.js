import $ from "../core"; // Импортируем главную функцию $ для возможности изменять её функционал

$.prototype.get = async function(url, dataTypeAnswers = 'json') {
  let res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} Status: ${res.status}`);
  }

  switch(dataTypeAnswers) {
    case 'json' :
      return await res.json();
    case 'text' :
      return await res.text();
    case 'blob' :
      return await res.blob();
  }
};

$.prototype.post = async function(url, data, dataTypeAnswers = 'text') {
  let res = await fetch(url, {
    method: 'POST',
    body: data
  });

  switch(dataTypeAnswers) {
    case 'json' :
      return await res.json();
    case 'text' :
      return await res.text();
    case 'blob' :
      return await res.blob();
  }
};