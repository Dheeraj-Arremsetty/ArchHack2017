#!/usr/bin/python
import sys
import RPi.GPIO as GPIO
import time
import random
import math
import Adafruit_DHT

IF_ALARMED = False
IS_PILLOW_ACTIVE = False

BLUE_COLOR = 16
GREEN_COLOR = 20
RED_COLOR = 21

RELAY_MOTOR = 18
TOUCH = 23
TEMPERATURE = 4

# Global Values
PI_TEMP = -1
PI_HUMIDITY = -1
PI_IS_PILLOW_ACTIVE = False
PI_SLEEP_EVENT = -1
PI_IS_ALARMED = False
PI_CURRENT_TIME = -1

# ALARM CONFIGS
PI_ALARM_SET = False
PI_NEXT_ALARM_TIME = -1

# CONSTANTS
PI_HIGH = 1
PI_LOW = 0

def min2sec(minute):
    return minute*60

def initialize():
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(TOUCH, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(RED_COLOR, GPIO.OUT)
        GPIO.setup(BLUE_COLOR, GPIO.OUT)
        GPIO.setup(GREEN_COLOR, GPIO.OUT)
        GPIO.setup(RELAY_MOTOR, GPIO.OUT)
    except:
        print('Error initializing env')

def cleanGPIO():
    try:
        GPIO.cleanup()
    except:
        print("Error cleaning GPIO")

def is_pillow_activated():
    try:
        on_pillow = GPIO.input(TOUCH)
    except:
        on_pillow = -1
    return on_pillow

def get_temperature():
    humidity, temperature = Adafruit_DHT.read_retry(11, TEMPERATURE)
    return (humidity, temperature)

def vibrate(to_vibrate):
    if to_vibrate:
        GPIO.output(RELAY_MOTOR, PI_HIGH)
    else:
        GPIO.output(RELAY_MOTOR, PI_LOW)

def set_alarm():
    if PI_ALARM_SET == False:
        PI_CURRENT_TIME = round(time.time())
        PI_NEXT_ALARM_TIME = PI_CURRENT_TIME + min2sec(random.randint(2, 6))
        PI_ALARM_SET =True
        PI_IS_ALARMED = False

def check_alarm():
    if PI_ALARM_SET and !PI_IS_ALARMED and (time.time() > PI_NEXT_ALARM_TIME):
        vibrate(True)
        time.sleep(10)
        vibrate(False)
        PI_ALARM_SET = False
        PI_IS_ALARMED = True

if __name__ == "__main__":
    initialize()
    set_alarm()
    while !PI_IS_PILLOW_ACTIVE:
        PI_IS_PILLOW_ACTIVE = is_pillow_active()
        pass()
    print("Smart PILLOW is Active")
    for x in range(0, 10):
        print(get_temperature())
        time.sleep(0.2)
    cleanGPIO()
