#!/usr/bin/env python3
"""
Aero BROWSER - Local Dev Server
Pokreće lokalni web server na portu 8000 za testiranje Aero Browsera.
"""

import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 Aero Browser server pokrenut na: http://localhost:{PORT}")
        print(f"📁 Servira se iz: {DIRECTORY}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nZaustavljanje servera...")

if __name__ == "__main__":
    run()
