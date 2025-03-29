function loadData(key) {
  try {
    let temp = localStorage.getItem(key);
    if (temp === null) {
      return undefined;
    }
    return JSON.parse(temp);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { saveData, loadData };
