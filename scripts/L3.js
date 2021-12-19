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
const frequency_alph = [
    0.0801,
    0.0159,
    0.0453,
    0.0170,
    0.0298,
    0.0845,
    0.0004,
    0.0094,
    0.0165,
    0.0735,
    0.0121,
    0.0349,
    0.0440,
    0.0321,
    0.0670,
    0.1097,
    0.0281,
    0.0473,
    0.0547,
    0.0626,
    0.0262,
    0.0026,
    0.0097,
    0.0048,
    0.0144,
    0.0073,
    0.0036,
    0.0004,
    0.0190,
    0.0174,
    0.0032,
    0.0064,
    0.0201
];
let theoretical_key = null;
let save_text = false;
let save_data_text = '';
button_help.addEventListener('click', function () {
    key.value = 'Это поле для ввода ключа. Ключ не должен содержать пробелы или другие символы, отличные от русского алфавита.';
    text.value = 'Это поле для ввода текста.\n' +
        'Кнопка \"Генератор ключа\" создает ключ с полным соответствием русскому алфавиту.\n' +

        'Кнопка \"Сохранить/Отменить\" возвращает исходный текст и активирует генератор ключа. ' +
        'Первое нажатие на кнопку сохраняет исходный текст.\n' +


        'Кнопка \"Расшифровать\" расшифровывает текст и выводит некоторую статистику.\n' +
        'Кнопка \"Очистить\" очищает все доступные поля и удаляет историю сохранения.';
});

button_start_encrypt.addEventListener('click', function () {
    if (!save_text) {
        save_data_text = text.value.toUpperCase().split('').filter((elem) => alph.indexOf(elem) != -1).join('');
        save_text = true;
    }
    else {
        text.value = save_data_text;
    }
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
        let data_text_encryption_analysis = '';
        for (let i = 0; i < data_text_encryption.length; i++) {
            if (i + 1 < data_text_encryption.length && data_text_encryption[i] == data_text_encryption[i + 1]) {
                data_text_encryption_analysis += '~' + data_text_encryption[i] + '' + data_text_encryption[i + 1] + '~';
                i++;
            }
            else
                data_text_encryption_analysis += data_text_encryption[i];
        }
        text.value = data_text_encryption_analysis;

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
            count_iteration_letters.push({ letter: alph[i], count: count_iteration, fraction: count_iteration / data_text.length });
        }
        let data_count_iteration_letters_table = '<tr><th>Буква</th>'
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].letter + '</td>';
        data_count_iteration_letters_table += '</tr><tr><th>Повторения</th>';
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + count_iteration_letters[i].count + '</td>';
        data_count_iteration_letters_table += '</tr><tr><th>Практическая вероятность</th>';
        for (let i = 0; i < count_iteration_letters.length; i++)
            data_count_iteration_letters_table += '<td>' + (Math.round(count_iteration_letters[i].fraction * 10000) / 10000) + '</td>';
        data_count_iteration_letters_table += '</tr><tr><th>Теоретическая вероятность</th>';
        for (let i = 0; i < frequency_alph.length; i++)
            data_count_iteration_letters_table += '<td>' + frequency_alph[i] + '</td>';
        data_count_iteration_letters_table += '</tr>';
        count_iteration_letters_table.innerHTML = data_count_iteration_letters_table;

        let gen_theoretical_key = new Array();
        for (let i = 0; i < alph.length; i++)
            gen_theoretical_key.push({ letter: alph[i], frequency: frequency_alph[i] });
        for (let i = 0; i < gen_theoretical_key.length; i++) {
            for (let j = i + 1; j < gen_theoretical_key.length; j++) {
                if (gen_theoretical_key[i].frequency > gen_theoretical_key[j].frequency) {
                    let buffer_key = gen_theoretical_key[i];
                    gen_theoretical_key[i] = gen_theoretical_key[j];
                    gen_theoretical_key[j] = buffer_key;
                }
            }
        }
        for (let i = 0; i < count_iteration_letters.length; i++) {
            for (let j = i + 1; j < count_iteration_letters.length; j++) {
                if (count_iteration_letters[i].fraction > count_iteration_letters[j].fraction) {
                    let buffer_key = count_iteration_letters[i];
                    count_iteration_letters[i] = count_iteration_letters[j];
                    count_iteration_letters[j] = buffer_key;
                }
            }
        }
        theoretical_key = new Array();
        for (let i = 0; i < gen_theoretical_key.length; i++) {
            theoretical_key.push({ letter: gen_theoretical_key[i].letter, key: count_iteration_letters[i].letter });
        }

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
    if (theoretical_key) {
        let theoretical_key_data = '';
        for (let i = 0; i < alph.length; i++) {
            for (let j = 0; j < theoretical_key.length; j++) {
                if (alph[i] == theoretical_key[j].letter) {
                    theoretical_key_data += theoretical_key[j].key;
                    break;
                }
            }
        }
        key.value = theoretical_key_data;
    }
    else
        key.value = alph.join('');
});

button_clear.addEventListener('click', function () {
    key.value = '';
    text.value = '';
    count_symbols.innerText = '';
    count_letters.innerText = '';
    match_index.innerText = '';
    key_table.innerHTML = '';
    count_iteration_letters_table.innerHTML = '';

    save_text = false;
    save_data_text = '';
    theoretical_key = null;
});
