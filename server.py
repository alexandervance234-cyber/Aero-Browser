#!/usr/bin/env python3
"""
Aero BROWSER - Local Dev Server
Pokreće lokalni web server na portu 8000 sa isključenim keširanjem (no-cache).
"""

import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Isključujemo keširanje u pregledaču da bi izmene odmah bile vidljive
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), NoCacheHandler) as httpd:
        print(f"🚀 Aero Browser server pokrenut na: http://localhost:{PORT}")
        print(f"📁 Servira se iz: {DIRECTORY}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nZaustavljanje servera...")

if __name__ == "__main__":
    run()
