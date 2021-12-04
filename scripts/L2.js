let button_help = document.getElementById('button_help');
let key = document.getElementById('key');
let text = document.getElementById('text');
let button_key_gen = document.getElementById('button_key_gen');
let button_start_encrypt = document.getElementById('button_start_encrypt');
let button_start_decrypt = document.getElementById('button_start_decrypt');
let button_clear = document.getElementById('button_clear');
let count_symbols = document.getElementById('count_symbols');
let count_letters = document.getElementById('count_letters');
let match_index = document.getElementById('match_index');
let key_table = document.getElementById('key_table');
let count_iteration_letters_table = document.getElementById('count_iteration_letters_table');
const alph = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');
button_help.addEventListener('click', function () {
    key.value = 'Это поле для ввода ключа. Ключ не должен содержать пробелы или другие символы, отличные от русского алфавита.';
    text.value = 'Это поле для ввода текста.\n' +
        'Кнопка \"Генератор ключа\" создает ключ, получаемый случайным перемешиванием букв русского алфавита.\n' +
        'Кнопка \"Зашифровать\" шифрует текст и выводит некоторую статистику.\n' +
        'Кнопка \"Расшифровать\" расшифровывает текст и выводит некоторую статистику.\n' +
        'Кнопка \"Очистить\" очищает все доступные поля.';
});
button_start_encrypt.addEventListener('click', function () {
    let data_key = key.value.toUpperCase().split('');
    if (data_key.length == alph.length) {
        let data_text = text.value.toUpperCase().split('');
        count_symbols.innerText = 'Общее кол-во символов: ' + data_text.length + ' | ';
        data_text = data_text.filter((elem) => alph.indexOf(elem) != -1);
        count_letters.innerText = 'Общее кол-во букв: ' + data_text.length + ' | ';
        let data_text_encryption = new Array();
        for (let i = 0; i < data_text.length; i++)
            data_text_encryption.push(data_key[alph.indexOf(data_text[i])]);
        text.value = data_text_encryption.join('');

        let data_key_table = '<tr><th>Буква</th>';
        for (let i = 0; i < alph.length; i++)
            data_key_table += '<td>' + alph[i] + '</td>';
        data_key_table += '</tr><tr><th>Ключ</th>';
        for (let i = 0; i < data_key.length; i++)
            data_key_table += '<td>' + data_key[i] + '</td>';
        data_key_table += '</tr>';
        key_table.innerHTML = data_key_table;

        let count_iteration_letters = new Array();
        for (let i = 0; i < alph.length; i++) {
            count_iteration = 0;
            for (let j = 0; j < data_text.length; j++) {
                if (alph[i] == data_text[j])
                    count_iteration++;
            }
            count_iteration_letters.push({ letter: alph[i], count: count_iteration });
        }
        let data_count_iteration_letters_table = '<tr><th>Буква</th>'
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].letter + '</td>';
        data_count_iteration_letters_table += '</tr><tr><th>Повторения</th>';
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].count + '</td>';
        data_count_iteration_letters_table += '</tr>';
        count_iteration_letters_table.innerHTML = data_count_iteration_letters_table;

        let data_match_index = 0;
        for (let i = 0; i < count_iteration_letters.length; i++) {
            let f_count = count_iteration_letters[i].count;
            let n_count = data_text.length;
            data_match_index += (f_count * (f_count - 1)) / (n_count * (n_count - 1));
        }
        match_index.innerText = 'Индекс совпадения: ' + data_match_index;
    }
    else
        key.value = 'Ключ должен состоять из ' + alph.length + ' символов!';
});

button_start_decrypt.addEventListener('click', function () {
    let data_key = key.value.toUpperCase().split('');
    if (data_key.length == alph.length) {
        let data_text = text.value.toUpperCase().split('');
        count_symbols.innerText = 'Общее кол-во символов: ' + data_text.length + ' | ';
        data_text = data_text.filter((elem) => alph.indexOf(elem) != -1);
        count_letters.innerText = 'Общее кол-во букв: ' + data_text.length + ' | ';
        let data_text_encryption = new Array();
        for (let i = 0; i < data_text.length; i++)
            data_text_encryption.push(alph[data_key.indexOf(data_text[i])]);
        text.value = data_text_encryption.join('');

        let data_key_table = '<tr><th>Буква</th>';
        for (let i = 0; i < alph.length; i++)
            data_key_table += '<td>' + alph[i] + '</td>';
        data_key_table += '</tr><tr><th>Ключ</th>';
        for (let i = 0; i < data_key.length; i++)
            data_key_table += '<td>' + data_key[i] + '</td>';
        data_key_table += '</tr>';
        key_table.innerHTML = data_key_table;

        let count_iteration_letters = new Array();
        for (let i = 0; i < alph.length; i++) {
            count_iteration = 0;
            for (let j = 0; j < data_text.length; j++) {
                if (alph[i] == data_text[j])
                    count_iteration++;
            }
            count_iteration_letters.push({ letter: alph[i], count: count_iteration });
        }
        let data_count_iteration_letters_table = '<tr><th>Буква</th>'
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].letter + '</td>';
        data_count_iteration_letters_table += '</tr><tr><th>Повторения</th>';
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].count + '</td>';
        data_count_iteration_letters_table += '</tr>';
        count_iteration_letters_table.innerHTML = data_count_iteration_letters_table;

        let data_match_index = 0;
        for (let i = 0; i < count_iteration_letters.length; i++) {
            let f_count = count_iteration_letters[i].count;
            let n_count = data_text.length;
            data_match_index += (f_count * (f_count - 1)) / (n_count * (n_count - 1));
        }
        match_index.innerText = 'Индекс совпадения: ' + data_match_index;
    }
    else
        key.value = 'Ключ должен состоять из ' + alph.length + ' символов!';
});

button_key_gen.addEventListener('click', function () {
    let data_key_gen = alph.slice();
    data_key_gen.sort(() => Math.random() - 0.5);

    let temp_copy_input = document.createElement('input');
    document.body.appendChild(temp_copy_input);
    temp_copy_input.value = data_key_gen.join('');
    temp_copy_input.select();
    document.execCommand('copy');
    document.body.removeChild(temp_copy_input);

    button_key_gen.innerText = 'Скопировано';
    setTimeout(function () {
        button_key_gen.innerText = 'Генератор ключа';
    }, 1000);
});

button_clear.addEventListener('click', function () {
    key.value = '';
    text.value = '';
    count_symbols.innerText = '';
    count_letters.innerText = '';
    match_index.innerText = '';
    key_table.innerHTML = '';
    count_iteration_letters_table.innerHTML = '';
});
