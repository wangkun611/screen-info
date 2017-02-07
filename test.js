import test from 'ava';
import Screen from '.';

const expected = process.platform === 'win32' ?
	{left: 0, top: 0, width: 1024, height: 768, colorDepth: 32} :
	{left: 0, top: 0, width: 1024, height: 768, colorDepth: 24};

const expectedMultiple = process.platform === 'linux' ?
	[{left: 0, top: 0, width: 1024, height: 768, colorDepth: 24}, {left: 0, top: 0, width: 800, height: 600, colorDepth: 8}] :
	(process.platform === 'win32' ?
			[{left: 0, top: 0, width: 1024, height: 768, colorDepth: 32}] :
			[{left: 1024, top: 0, width: 1024, height: 768, colorDepth: 24}]
	);

/*
const expectedMultiple = [{
	width: 1920,
	height: 1080,
	colorDepth: 24
}, {
	width: 1280,
	height: 960,
	colorDepth: 24
}];

const expected = {width: 1920, height: 1080, colorDepth: 24};
*/

test('exports a function', t => {
	t.is(typeof Screen.main, 'function');
});

test('main: return main screen size', t => {
	const size = Screen.main();
	t.is(size.width, expected.width);
	t.is(size.height, expected.height);
	t.is(size.colorDepth, expected.colorDepth);
});

test('all: return all screens size', t => {
	const sizes = Screen.all();
	t.deepEqual(
		sizes.map(s => s.toJSON()),
		expectedMultiple
	);
});

test('Screen has left top width and height', t => {
	const size = new Screen(0, 0, 1, 2, 3);
	t.is(size.left, 0);
	t.is(size.top, 0);
	t.is(size.width, 1);
	t.is(size.height, 2);
	t.is(size.colorDepth, 3);
});

test('Screen has custom toString', t => {
	const size = new Screen(0, 0, 800, 600, 32);
	t.is(size.toString(), '0x0 800x600x32');
});

test('Screen can be stringified to json', t => {
	const size = new Screen(0, 0, 800, 600, 32);
	t.is(JSON.stringify(size), '{"left":0,"top":0,"width":800,"height":600,"colorDepth":32}');
});
