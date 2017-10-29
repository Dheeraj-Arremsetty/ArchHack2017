#!/usr/bin/python
import sys
import RPi.GPIO as GPIO
import time
import random
import math
import Adafruit_DHT
import datetime
IF_ALARMED = False
IS_PILLOW_ACTIVE = False

BLUE_COLOR = 16
GREEN_COLOR = 20
RED_COLOR = 21

RELAY_MOTOR = 18
TOUCH_LEFT = 23
TOUCH_RIGHT = 24
TEMPERATURE = 4

# Global Values
PI_TEMP = -1
PI_HUMIDITY = -1
PI_IS_PILLOW_ACTIVE = False
PI_SLEEP_EVENT = -1
PI_IS_ALARMED = False
PI_CURRENT_TIME = -1
data = 0

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
        GPIO.setup(TOUCH_LEFT, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(TOUCH_RIGHT, GPIO.IN, pull_up_down=GPIO.PUD_UP)
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



def is_pillow_active():
    try:
        if(GPIO.input(TOUCH_LEFT) or GPIO.input(TOUCH_RIGHT)):
            
            on_pillow = 1
        else:
            on_pillow = 0
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
    global PI_ALARM_SET
    if PI_ALARM_SET == False:
        PI_CURRENT_TIME = round(time.time())
        PI_NEXT_ALARM_TIME = PI_CURRENT_TIME + min2sec(random.randint(2, 6))
        PI_ALARM_SET =True
        PI_IS_ALARMED = False

def check_alarm():
    if PI_ALARM_SET and (not PI_IS_ALARMED) and (time.time() > PI_NEXT_ALARM_TIME):
        vibrate(True)
        time.sleep(10)
        vibrate(False)
        PI_ALARM_SET = False
        PI_IS_ALARMED = True

def get_intensive():
    global data
    if(is_pillow_active()):
        send = data
        data = 0
        return send
    else:
        data += 1
        return -1          
        

   
def get_result():
    timestamp = datetime.datetime.now().strftime("%m-%d-%Y %H:%M:%S")
    if(is_pillow_active()):
    
        result = {
            'turn_on' : is_pillow_active(),
            'temperature' : get_temperature(),
            'timestamp': timestamp,
            'intensive' : get_intensive()
        
            }
    else:
        result = {
            'turn_on' : is_pillow_active(),
            'temperature' : 0,
            'timestamp': timestamp,
            'intensive' : get_intensive()
            
        }
    return result;

if __name__ == "__main__":
    initialize()
    print("Smart PILLOW Initialized. Waiting for activation...")
    set_alarm()
    print("Smart PILLOW is Active")
    while  True:
        print get_result()
        time.sleep(0.2)
        
    
    
   

    
    
   
