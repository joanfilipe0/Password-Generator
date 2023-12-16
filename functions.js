function generatePassword() {
    const length = document.getElementById('password-length').value;
    const includeSpecial = document.getElementById('include-special').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeUppercase = document.getElementById('include-uppercase').checked;
    const includeLowercase = document.getElementById('include-lowercase').checked;

    const password = generateRandomString(length, includeSpecial, includeNumbers, includeUppercase, includeLowercase);

    document.getElementById('password').value = password;
    document.getElementById('password-label').textContent = 'Senha Gerada';
    document.getElementById('copyButton').textContent = 'Copiar Senha';
    document.getElementById('copyButton').disabled = false;
    document.getElementById('copyButton').style.backgroundColor = '#4caf50';
    document.getElementById('viewPassword').disabled = false;
}

function copyToClipboard() {
    const password = document.getElementById('password').value;
    const textArea = document.createElement('textarea');
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    document.getElementById('copyButton').textContent = 'Senha Copiada';
    document.getElementById('copyButton').disabled = true;
    document.getElementById('copyButton').style.backgroundColor = '#4a4d4b';
}


function generateRandomString(length, includeSpecial, includeNumbers, includeUppercase, includeLowercase) {
    let allCharacters = '';
    let result = '';

    if (includeSpecial) {
        allCharacters += '!@#$%^&*()_-+=<>?/[]{},.';
    }
    if (includeNumbers) {
        allCharacters += '0123456789';
    }
    if (includeUppercase) {
        allCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (includeLowercase) {
        allCharacters += 'abcdefghijklmnopqrstuvwxyz';
    }

    if (allCharacters === '') {
        return 'Nenhum Caractere Selecionado';
    }

    // Adiciona opção de caracteres para cada categoria
    if (includeSpecial) {
        result += '!@#$%^&*()_-+=<>?/[]{},.'[Math.floor(Math.random() * '!@#$%^&*()_-+=<>?/[]{},.'.length)];
    }
    if (includeNumbers) {
        result += '0123456789'[Math.floor(Math.random() * '0123456789'.length)];
    }
    if (includeUppercase) {
        result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.length)];
    }
    if (includeLowercase) {
        result += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 'abcdefghijklmnopqrstuvwxyz'.length)];
    }

    for (let i = result.length; i < length; i++) {
        result += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    result = result.split('');
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result.join('');
}

function viewPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById('viewPassword').textContent = 'Esconder Senha';
    } else {
        x.type = "password";
        document.getElementById('viewPassword').textContent = 'Ver Senha';
    }
}
