

const outputList = document.querySelector('.output-list');

const renderLine = data => {
    const newEl = document.createElement('li');
    newEl.textContent = data.message;
    outputList.appendChild(newEl);
}


const button = document.querySelector('.click-the-button');

const handleClick = async () => {
    const response = await fetch('/api/get-text');
    const json = await response.json();
    await console.log();

    renderLine(json);
}

button.addEventListener('click', handleClick);