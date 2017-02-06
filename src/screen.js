class Screen {
	constructor(left, top, width, height, colorDepth) {
		this._left = left;
		this._top = top;
		this._width = width;
		this._height = height;
		this._colorDepth = colorDepth;
	}

	get left() {
		return this._left;
	}
	get top() {
		return this._top;
	}
	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get colorDepth() {
		return this._colorDepth;
	}

	fromJS(output) {
		output(this._width, this._height, this._colorDepth);
	}

	toJSON() {
		const {left, top, width, height, colorDepth} = this;
		return {left, top, width, height, colorDepth};
	}

	toString(output = this) {
		return `${output.left}x${output.top} ${output.width}x${output.height}x${output.colorDepth}`;
	}
}

module.exports = Screen;
