from __future__ import print_function

import json
import boto3
import random
import uuid
print('Loading function')
_default_data = {
   'turn_on':True,
   'last_seven_days': [9, 10.11, 9.10, 8.3, 7.4, 10, 11.25],
   'avg_sleep_days':[9.30, 8.02, 8.30, 7.30, 6.23, 6.45, 7.34],
   'change_in_motion':[0]
   
}

total_sum = 0
def lambda_handler(event, context):
   global _default_data
   event.update(_default_data)
   _default_data = event
   #print("Received event: " + json.dumps(event, indent=2))
   # print("value1 = " + event['key1'])
   # print("value2 = " + event['key2'])
   print("event = ",event)
   # return event['key1']  # Echo back the first key value
   #raise Exception('Something went wrong')
   # key = event['']
   writeToS3( _default_data)
   return {"Success":"Dheeraj!!!!"}

def writeToS3(data):
   key_bucket_for_api = "rasberrypi.api.data"
   key_bucket_all_data = "rasberrypi.data"
   global total_sum
   s3 = boto3.resource('s3')
   if data['turn_on'] == True or True:
       data['change_in_motion'].append(round(random.random(),2))
       if len(data['change_in_motion']) >=30:
           data['change_in_motion'] = data['change_in_motion'][1:]
   jsonData_all = json.dumps(data)
   # total_sum = total_sum + int(data["data"]["number"])
   # data["total_sum"] = total_sum
   jsonData = str(data)#json.dumps(data)
   
   # key = str(random.randint(0,100))+".json"
   s3.Bucket(key_bucket_for_api).put_object(Key="smart_pillow_user.json" ,Body=jsonData)
   s3.Bucket(key_bucket_all_data).put_object(Key=str(uuid.uuid1()) ,Body=jsonData)