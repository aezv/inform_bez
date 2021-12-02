let key = document.getElementById('key');
let text = document.getElementById('text');
let button_key_gen = document.getElementById('button_key_gen');
let button_start = document.getElementById('button_start');
let button_clear = document.getElementById('button_clear');
let count_symbols = document.getElementById('count_symbols');
let key_table = document.getElementById('key_table');
button_start.addEventListener('click', function () {
    let data_key = key.value.split(' ');
    let data_text = text.value.toUpperCase().split('');
    if (data_text.length % data_key.length == 0) {
        count_symbols.innerText = 'Общее кол-во символов: ' + data_text.length;
        let data_text_encryption = new Array();
        for (let i = 0; i < data_key.length; i++)
            data_key[i] = Number(data_key[i]);
        for (let i = 0; i < data_text.length; i += data_key.length) {
            for (let j = 0; j < data_key.length; j++)
                data_text_encryption.push(data_text[i + data_key.indexOf(j)]);
        }
        text.value = data_text_encryption.join('');

        let data_key_table = '<tr><th>Индекс</th>';
        for (let i = 0; i < data_key.length; i++)
            data_key_table += '<td>' + i + '</td>';
        data_key_table += '</tr><tr><th>Ключ</th>';
        for (let i = 0; i < data_key.length; i++)
            data_key_table += '<td>' + data_key[i] + '</td>';
        data_key_table += '</tr>';
        key_table.innerHTML = data_key_table;
    }
    else {
        let multiples = new Array();
        for (let i = 3; i <= data_text.length; i++) {
            if (data_text.length % i == 0)
                multiples.push(i);
        }
        key.value = 'Предполагается что ключ должен иметь одну из длин: ' + multiples.join(' ');
    }
});

button_key_gen.addEventListener('click', function () {
    let data_text = text.value.toUpperCase().split('');
    let multiples = 1;
    for (let i = 3; i <= data_text.length; i++) {
        if (data_text.length % i == 0){
            multiples = i;
            break;
        }
    }
    let data_key_gen = new Array();
    for(let i=0; i<multiples; i++)
        data_key_gen.push(i);
    data_key_gen.sort(() => Math.random() - 0.5);
    key.value = data_key_gen.join(' ');
});

button_clear.addEventListener('click', function () {
    key.value = '';
    text.value = '';
    count_symbols.innerText = '';
    key_table.innerHTML = '';
});
