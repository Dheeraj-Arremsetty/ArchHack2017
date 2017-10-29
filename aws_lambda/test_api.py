from __future__ import print_function
import json
import boto3
print('Loading function')


# def lambda_handler(event, context):
#     #print("Received event: " + json.dumps(event, indent=2))
#     # print("value1 = " + event['key1'])
#     # print("value2 = " + event['key2'])
#     # print("value3 = " + event['key3'])
#     # return event['key1']  # Echo back the first key value
#     return {"Hello":"*"*100}
#     #raise Exception('Something went wrong')

def send_update_thing():
    client = boto3.client('iot-data', region_name='us-east-1')

    # Change topic, qos and payload
    # response = client.publish(
    #         topic='$aws/things/rasberry_pi_test/shadow/update',
    #         qos=1,
    #         payload=json.dumps({"foo":"bar"}))
    # return response
    response = client.update_thing_shadow(
        thingName='$aws/things/rasberry_pi_test/shadow/update',
        payload=json.dumps({"foo": "bar"}))


def lambda_handler(event, context):
    s3 = boto3.resource('s3')
    bucket = "rasberrypi.api.data"
    key = "smart_pillow_user.json"
    obj = s3.Object(bucket, key)
    result = obj.get()['Body'].read()  # .decode('utf-8')

    # result = result.decode('string_escape')
    # result = json.loads(result)
    # result = result.replace("\\","")
    # send_update_thing()
    # temp = json.dumps({"result": result})
    result = eval(result)
    temp = json.dumps({"result": result})
    # temp = temp.replace("\\"," ")
    return result
