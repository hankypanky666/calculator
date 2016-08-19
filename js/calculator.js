'use strict';

/*
    Калькулятор принимает число, после нажатия на оператор сохраняем число в массив
    и сразу же производим операцию(в зависимости от оператора подставляем 0 или 1),
    после ввода второго числа производим операцию, заполняем промежуточный массив результатом
    и так по кругу :)
    получилось что-то аля калькулятора на маке
 */

class Calculator {

    constructor (options) {
        this.container = options.container;
        this.result = this.container.querySelector('.result');
        this._tempResult = 0;
        this._tempArr = [];
        this._status = '';

        this.container.addEventListener('click', this._takeTargetClickFromCalc.bind(this));
    }

    _takeTargetClickFromCalc(e) {
        if (e.target.hasAttribute('data-digit')) {
            if (this.result.textContent == this._tempResult) {
                this.result.textContent = '';
            }
            this.result.textContent += e.target.textContent;
        }

        /*
         если предидущий оператор не совпадает с текущим,
         то отправляем на операцию со старым оператором
         */
        if (e.target.hasAttribute('data-operator')) {
            this._tempArr.push(this.result.textContent);
            if (e.target.textContent !== this._status) {
                this._returnResult(this._tempArr[0], (this._tempArr.length === 1 ? 0 : this._tempArr[1]), this._status);
            }
            this._returnResult(this._tempArr[0], (this._tempArr.length === 1 ? 0 : this._tempArr[1]), e.target.textContent);
            this.result.textContent = this._tempResult;
            this._status = e.target.textContent;
        }

        if (e.target.hasAttribute('data-clear')) {
            this._clearCalc();
        }

        if (e.target.hasAttribute('data-result')) {
            this._result();
        }
    }

    _add(a, b) {
        this._tempResult = a + b;
        this._tempArr = [];
        this._tempArr.push(+this._tempResult);
        return a + b;
    }

    _sub(a, b) {
        this._tempResult = a - b;
        this._tempArr = [];
        this._tempArr.push(this._tempResult);
        return a - b;
    }

    _multi(a, b) {
        b = (b === 0) ? 1 : b;
        this._tempResult = a * b;
        this._tempArr = [];
        this._tempArr.push(this._tempResult);
        return a * b;
    }

    _div(a, b) {
        b = (b === 0) ? 1 : b;
        this._tempResult = a / b;
        this._tempArr = [];
        this._tempArr.push(this._tempResult);
        return a / b;
    }

    _returnResult(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case "+": this._add(a, b); break;
            case "-": this._sub(a, b); break;
            case "*": this._multi(a, b); break;
            case "/": this._div(a, b); break;
        }
    }

    _result() {
        this._tempArr.push(this.result.textContent);
        this._returnResult(this._tempArr[0], (this._tempArr.length === 1 ? 0 : this._tempArr[1]), this._status);
        this.result.textContent = this._tempResult;
        this._clearCalc(this.result.textContent);
    }

    _clearCalc() {
        !(arguments.length > 0) ? this.result.textContent = '' : null;
        this._status = '';
        this._tempArr = [];
    }

}