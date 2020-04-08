/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
(function(w, d){
    var $inputDisplay = d.querySelector('[data-js="display"]');
    var $buttonNumber = d.querySelectorAll('[data-js="buttonNumber"]');    
    var $buttonCE = d.querySelector('[data-js="buttonCE"]');
    var $buttonOperations = d.querySelectorAll('[data-js="buttonOperation"]');
    var $buttonEqual = d.querySelector('[data-js="buttonEqual"]');

    // Test
    // console.log($buttonEqual);

    Array.prototype.forEach.call($buttonNumber, function(btn){
        btn.addEventListener('click', handleClickNumber, false);
    });
    Array.prototype.forEach.call($buttonOperations, function(btn){
        btn.addEventListener('click', handleClickOperation, false);
    });
    
    $buttonCE.addEventListener('click', handleClickCE, false);
    $buttonEqual.addEventListener('click', handleClickEqual, false);
    
    function handleClickNumber(){
        if ($inputDisplay.value === '0')
            $inputDisplay.value = this.value
        else
            $inputDisplay.value += this.value;
    }

    function handleClickCE(){
        $inputDisplay.value = 0;
    }

    function handleClickOperation(){
        $inputDisplay.value = removeLastOperator($inputDisplay.value);
        $inputDisplay.value += this.value;
    }

    function removeLastOperator(content){
        if (hasOperatrOnEnd(content)) 
            return content.slice(0, -1);
        return content;
    }

    function hasOperatrOnEnd(content){
        var operations = ['+', '-', 'x', '÷'];
        var lastItem = content.split('').pop();
        return operations.indexOf(lastItem) > -1;
    }

    function handleClickEqual(){
        $inputDisplay.value = removeLastOperator($inputDisplay.value);
        var allValues = $inputDisplay.value.match(/\d+[+x÷-]?/g);
        var result = allValues.reduce(function(acc, item){
            var first = acc.slice(0, -1);
            var operator = acc.split('').pop();
            var other = removeLastOperator(item);
            var lastOp = hasOperatrOnEnd(item) ? item.split('').pop() : '';
            console.log(first, operator, other);
            switch (operator) {
                case '+': return (Number(first) + Number(other)) + lastOp;
                case '-': return (Number(first) - Number(other)) + lastOp;
                case 'x': return (Number(first) * Number(other)) + lastOp;
                case '÷': return (Number(first) / Number(other)) + lastOp;
            }
        });
        $inputDisplay.value = result;
    }
})(window, document);
