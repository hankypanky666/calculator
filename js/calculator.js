'use strict';

class Calculator {

    constructor (options) {
        this.flag = false;
        this.container = options.container;
        this.result = this.container.querySelector('.result');

        this.container.addEventListener('click', this._getEventTarget.bind(this));
    }

    _getEventTarget(e) {

        if (e.target.hasAttribute('data-digit')) {
            if (this.flag) {
                this.flag = false;
                this.result.textContent = '';
            }
            this._addText(e.target.textContent);
        }

        if (e.target.hasAttribute('data-clear')) {
            this._clearResult();
        }

        if (e.target.hasAttribute('data-operand')) {
            var arr = this.result.textContent.split('');
            if (isNaN(arr[arr.length - 1])){
                return;
            }
            this._addText(e.target.textContent);
        }

        if (e.target.hasAttribute('data-dot')) {
            this._addText(e.target.textContent);
        }

        if (e.target.hasAttribute('data-percent')) {
            this.result.textContent /= 100;
        }

        if (e.target.hasAttribute('data-result')) {
            this._returnResult();
        }

    }

    _returnResult() {
        this.flag = true;
        this.result.textContent = parseFloat(eval(this.result.textContent));
    }

    _clearResult() {
        this.result.textContent = '';
    }

    _addText(text) {
        this.result.textContent += text;
    }

}