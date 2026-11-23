#!/usr/bin/env python3
"""
Aero BROWSER - Local Dev Server sa podrškom za Proxy i bez keširanja
Uklanja X-Frame-Options i CSP restrikcije tako da sajtovi mogu da se prikazuju unutar pregledača!
"""

import http.server
import socketserver
import os
import sys
import urllib.request
import urllib.parse

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class AeroServerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_HEAD(self):
        return self.do_GET()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/proxy':
            query = urllib.parse.parse_qs(parsed.query)
            target_url = query.get('url', [None])[0]
            if target_url:
                try:
                    req = urllib.request.Request(
                        target_url,
                        headers={
                            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Aero/1.1.2.0'
                        }
                    )
                    with urllib.request.urlopen(req, timeout=10) as response:
                        content = response.read()
                        self.send_response(200)
                        ct = response.headers.get('Content-Type', 'text/html; charset=utf-8')
                        self.send_header('Content-Type', ct)
                        self.send_header('Access-Control-Allow-Origin', '*')
                        # Namerno NE šaljemo X-Frame-Options i Content-Security-Policy!
                        self.end_headers()
                        self.wfile.write(content)
                        return
                except Exception as e:
                    self.send_response(502)
                    self.send_header('Content-Type', 'text/html; charset=utf-8')
                    self.end_headers()
                    error_html = f"""
                    <div style="font-family: sans-serif; background: #0d1117; color: #f0f6fc; padding: 40px; text-align: center;">
                        <h2 style="color: #ff7b72;">Aero nije mogao da učita stranicu u iframe-u</h2>
                        <p style="color: #8b949e;">{e}</p>
                        <a href="{target_url}" target="_blank" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #1f6feb; color: white; text-decoration: none; border-radius: 8px;">Otvori direktno u novom prozoru ➔</a>
                    </div>
                    """
                    self.wfile.write(error_html.encode('utf-8'))
                    return
        return super().do_GET()

def run():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), AeroServerHandler) as httpd:
        print(f"🚀 Aero Browser server pokrenut na: http://localhost:{PORT}")
        print(f"📁 Servira se iz: {DIRECTORY}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nZaustavljanje servera...")

if __name__ == "__main__":
    run()
