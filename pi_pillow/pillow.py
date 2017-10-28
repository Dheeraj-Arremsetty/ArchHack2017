#!/usr/bin/python
import sys
import RPi.GPIO as GPIO
import time
import Adafruit_DHT

IF_ALARMED = False
IS_PILLOW_ACTIVE = False

