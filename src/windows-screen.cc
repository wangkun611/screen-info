#include "nbind/nbind.h"
#include <windows.h>
#include "screen.h"

using namespace ScreenInfo;

Screen Screen::main() {
	RECT desktop;
	// Get a handle to the desktop window
	const HWND hDesktop = GetDesktopWindow();

	// Get the size of screen to the variable desktop
	GetWindowRect(hDesktop, &desktop);

	HDC dc = GetDC(hDesktop);
	int bitsPerPixel = GetDeviceCaps(dc, BITSPIXEL);
	ReleaseDC(NULL, dc);


	// The top left corner will have coordinates (0,0)
	// and the bottom right corner will have coordinates
	// (horizontal, vertical)
	return Screen(
		(size_t) desktop.left, (size_t) desktop.top,
		(size_t) (desktop.right - desktop.left),
		(size_t) (desktop.bottom - desktop.top),
		bitsPerPixel
	);
};



BOOL CALLBACK MonitorEnumProc(HMONITOR hMonitor, HDC hdcMonitor, LPRECT lprcMonitor, LPARAM dwData) {
	std::vector<Screen> *result =  (std::vector<Screen> *)dwData;
	int bitsPerPixel = GetDeviceCaps(hdcMonitor, BITSPIXEL);
	result->push_back(Screen(
		(size_t) lprcMonitor->left,
		(size_t) lprcMonitor->top,
		(size_t) (lprcMonitor->right - lprcMonitor->left),
		(size_t) (lprcMonitor->bottom - lprcMonitor->top),
		bitsPerPixel
	));

	return TRUE;
}

std::vector<Screen> ScreenInfo::Screen::all() {
	std::vector<Screen> result;
	const HWND hDesktop = GetDesktopWindow();
	HDC dc = GetDC(hDesktop);

	EnumDisplayMonitors(dc, NULL, MonitorEnumProc, (LPARAM)&result);
	ReleaseDC(NULL, dc);

	return result;
}
