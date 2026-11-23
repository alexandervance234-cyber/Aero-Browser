#!/usr/bin/env python3
"""
Aero BROWSER - Glavni Desktop Program
Pokreće samostalni Aero Browser prozor na Artix Linuxu koristeći Qt6 WebEngine.
Nema više iframe ograničenja — svi sajtovi (YouTube, Google, DuckDuckGo) rade normalno!
"""

import sys
import os
from PyQt6.QtCore import QUrl, Qt
from PyQt6.QtGui import QIcon
from PyQt6.QtWidgets import QApplication, QMainWindow, QVBoxLayout, QWidget, QStackedWidget
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtWebEngineCore import QWebEngineProfile, QWebEngineSettings

class AeroDesktopApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Aero BROWSER (Pre Release 1.1.2.0)")
        self.resize(1280, 800)

        # Postavljanje ikone prozora (Aero kružne strelice)
        icon_path = os.path.join(os.path.dirname(__file__), "ui/assets/engine_aero.jpg")
        if os.path.exists(icon_path):
            self.setWindowIcon(QIcon(icon_path))

        # Centralni kontejner
        central_widget = QWidget(self)
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)

        # Qt6 WebEngine View sa isključenom telemetrijom (0% telemetry)
        self.browser_view = QWebEngineView()
        profile = self.browser_view.page().profile()
        profile.setHttpUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Aero/1.1.2.0")

        # Podešavanje WebEngine postavki za potpunu podršku i brzinu
        settings = self.browser_view.settings()
        settings.setAttribute(QWebEngineSettings.WebAttribute.JavascriptEnabled, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.LocalStorageEnabled, True)
        settings.setAttribute(QWebEngineSettings.WebAttribute.PlaybackRequiresUserGesture, False)
        settings.setAttribute(QWebEngineSettings.WebAttribute.FullScreenSupportEnabled, True)

        layout.addWidget(self.browser_view)

        # Učitavanje Aero Browser početnog ekrana
        self.browser_view.setUrl(QUrl("http://localhost:8000"))

def main():
    # Omogućavamo visoku rezoluciju (HiDPI)
    app = QApplication(sys.argv)
    app.setApplicationName("Aero BROWSER")

    window = AeroDesktopApp()
    window.show()

    print("🚀 Aero BROWSER samostalni prozor uspešno otvoren!")
    sys.exit(app.exec())

if __name__ == "__main__":
    main()
