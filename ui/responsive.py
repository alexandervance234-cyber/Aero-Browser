"""
Aero BROWSER - Responsivity System
JEDINI IZVOR ISTINE ZA ODZIVNOST (RESPONSIVITY)

Definiše dva standardna režima prilagođavanja za sve uređaje:
1. COMPACT_PORTRAIT: Mobilni telefoni (Android, iPhone) i Tableti u vertikalnom položaju.
2. DESKTOP_LANDSCAPE: Tableti u horizontalnom položaju, Laptopovi, Desktop računari i Apple Mac.
"""

from enum import Enum
from dataclasses import dataclass


class DeviceClass(Enum):
    # 1. Telefoni (Android, Apple iPhone) + Tablet vertikalno
    COMPACT_PORTRAIT = "compact_portrait"

    # 2. Tablet horizontalno + Laptop + Desktop (Linux, PC, Apple Mac)
    DESKTOP_LANDSCAPE = "desktop_landscape"


@dataclass(frozen=True)
class ResponsiveBreakpoints:
    """Granične vrednosti širine ekrana u pikselima."""
    COMPACT_MAX_WIDTH: int = 768  # Sve ispod i jednako 768px je COMPACT_PORTRAIT
    MIN_RECOMMENDED_WIDTH: int = 320
    MIN_RECOMMENDED_HEIGHT: int = 480


@dataclass(frozen=True)
class LayoutRules:
    """Pravila ponašanja elemenata u zavisnosti od režima ekrana."""
    device_class: DeviceClass
    show_left_sidebar: bool       # Da li je levi dock fiksiran sa strane
    sidebar_position: str         # "left" ili "bottom"
    shortcuts_columns: int        # Broj kolona za prečice (npr. 6 u nizu ili 3x2)
    show_right_widgets: bool      # Da li je vidžet zona vidljiva pored ili ispod
    search_bar_width_percent: int # Širina search bara u procentima (npr. 80% ili 50%)


class AeroResponsivity:
    """
    JEDINI IZVOR ISTINE za proračunavanje i primenu odzivnosti.
    Bilo koji prozor ili komponenta pita ovaj servis za pravila.
    """

    BREAKPOINTS = ResponsiveBreakpoints()

    # Predefinisana pravila za oba režima
    RULES = {
        DeviceClass.COMPACT_PORTRAIT: LayoutRules(
            device_class=DeviceClass.COMPACT_PORTRAIT,
            show_left_sidebar=False,          # Na telefonu dock prelazi dole ili u meni
            sidebar_position="bottom",
            shortcuts_columns=3,              # 2 reda po 3 ikonice za uže ekrane
            show_right_widgets=False,         # Vidžeti idu ispod sadržaja
            search_bar_width_percent=92,      # Search bar zauzima skoro celu širinu
        ),
        DeviceClass.DESKTOP_LANDSCAPE: LayoutRules(
            device_class=DeviceClass.DESKTOP_LANDSCAPE,
            show_left_sidebar=True,           # Fiksni levi dock prema tvojoj skici
            sidebar_position="left",
            shortcuts_columns=6,              # Svih 6 prečica u jednom nizu
            show_right_widgets=True,          # "Vidžeti po ukusu" stoje desno
            search_bar_width_percent=60,      # Search bar centriran
        ),
    }

    @classmethod
    def get_device_class(cls, width: int, height: int) -> DeviceClass:
        """
        Automatski prepoznaje režim:
        - Ako je širina manja od granice ili ako je tablet okrenut vertikalno (height > width i width <= 1024) -> COMPACT_PORTRAIT
        - U suprotnom -> DESKTOP_LANDSCAPE
        """
        if width <= cls.BREAKPOINTS.COMPACT_MAX_WIDTH:
            return DeviceClass.COMPACT_PORTRAIT
        
        # Detekcija vertikalnog tableta (visina veća od širine na tablet dimenzijama)
        if height > width and width <= 1024:
            return DeviceClass.COMPACT_PORTRAIT

        return DeviceClass.DESKTOP_LANDSCAPE

    @classmethod
    def get_rules(cls, width: int, height: int) -> LayoutRules:
        """Vraća tačna pravila rasporeda za trenutne dimenzije ekrana."""
        dev_class = cls.get_device_class(width, height)
        return cls.RULES[dev_class]
