let button_help = document.getElementById('button_help');
let key = document.getElementById('key');
let text = document.getElementById('text');
let button_key_gen = document.getElementById('button_key_gen');
let button_start_encrypt = document.getElementById('button_start_encrypt');
let button_start_decrypt = document.getElementById('button_start_decrypt');
let button_clear = document.getElementById('button_clear');
let count_symbols = document.getElementById('count_symbols');
let edit_count_symbols = document.getElementById('edit_count_symbols');
let key_table = document.getElementById('key_table');
button_help.addEventListener('click', function () {
    key.value = 'Это поле для ввода ключа. Элементы ключа должны быть разделены пробелом.';
    text.value = 'Это поле для ввода текста.\n' +
        'Кнопка \"Генератор ключа\" создает ключ, получаемый случайным перемешиванием элементов последовательности 0, ..., n.\n' +
        'Кнопка \"Зашифровать\" шифрует текст и выводит некоторую статистику.\n' +
        'Кнопка \"Расшифровать\" расшифровывает текст и выводит некоторую статистику.\n' +
        'Кнопка \"Очистить\" очищает все доступные поля.';
});
button_start_encrypt.addEventListener('click', function () {
    let data_key = key.value.split(' ');
    let data_text = text.value.toUpperCase().split('');
    let data_count_symbols = data_text.length;
    data_text = data_text.filter((elem) => elem != ' ' && elem != '\n');
    let data_edit_count_symbols = data_text.length;
    if (data_text.length % data_key.length == 0 && 2 <= data_key.length) {
        count_symbols.innerText = 'Общее кол-во символов: ' + data_count_symbols + ' | ';
        edit_count_symbols.innerText = 'Общее кол-во символов после преобразования: ' + data_edit_count_symbols;
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
        for (let i = 2; i <= data_text.length; i++) {
            if (data_text.length % i == 0)
                multiples.push(i);
        }
        key.value = 'Предполагается что ключ должен иметь одну из длин: ' + multiples.join(' ');
    }
});

button_start_decrypt.addEventListener('click', function () {
    let data_key = key.value.split(' ');
    let data_text = text.value.toUpperCase().split('');
    let data_count_symbols = data_text.length;
    data_text = data_text.filter((elem) => elem != ' ' && elem != '\n');
    let data_edit_count_symbols = data_text.length;
    if (data_text.length % data_key.length == 0 && 2 <= data_key.length) {
        count_symbols.innerText = 'Общее кол-во символов: ' + data_count_symbols + ' | ';
        edit_count_symbols.innerText = 'Общее кол-во символов после преобразования: ' + data_edit_count_symbols;
        let data_text_encryption = new Array();
        for (let i = 0; i < data_key.length; i++)
            data_key[i] = Number(data_key[i]);
        for (let i = 0; i < data_text.length; i += data_key.length) {
            for (let j = 0; j < data_key.length; j++)
                data_text_encryption.push(data_text[i + data_key[j]]);
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
        for (let i = 2; i <= data_text.length; i++) {
            if (data_text.length % i == 0)
                multiples.push(i);
        }
        key.value = 'Предполагается что ключ должен иметь одну из длин: ' + multiples.join(' ');
    }
});

button_key_gen.addEventListener('click', function () {
    let data_text = text.value.toUpperCase().split('').filter((elem) => elem != ' ' && elem != '\n');
    let multiples_array = new Array();
    for (let i = 2; i <= data_text.length; i++) {
        if (data_text.length % i == 0) {
            multiples_array.push(i);
        }
        if (50 <= i)
            break;
    }
    let multiples = multiples_array[Math.floor(Math.random() * multiples_array.length)];
    let data_key_gen = new Array();
    for (let i = 0; i < multiples; i++)
        data_key_gen.push(i);
    data_key_gen.sort(() => Math.random() - 0.5);
    key.value = data_key_gen.join(' ');
});

button_clear.addEventListener('click', function () {
    key.value = '';
    text.value = '';
    count_symbols.innerText = '';
    edit_count_symbols.innerText = '';
    key_table.innerHTML = '';
});
