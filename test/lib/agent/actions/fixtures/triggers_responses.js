var exact_triggers = [
  {
    "id":104,
    "name":"trigger 104",
    "automation_events":[
      {
        "type": "exact_time",
        "info": {
          "date": "20190501120000"     // In the past
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action":{
          "command": "start",
          "target": "lock",
          "options": {
            "unlock_pass": "yeahitrocks"
          }
        }
      }
    ]
  },
  {
    "id":105,
    "name":"trigger 105",
    "automation_events":[
      {
        "type": "exact_time",
        "info": {
          "date": "" + (new Date().getFullYear() +1) + "0725150006"     // "20200725150406" Always next year
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action":{
          "command": "start",
          "target": "alert",
          "options": {
            "alert_message": "hi"
          }
        }
      },
      {
        "delay": 5000,
        "action":{
          "command": "start",
          "target": "alarm",
          "options": {
            "sound": "modem"
          }
        }
      }
    ]
  },
   
  {
    "id":106,
    "name":"trigger 106",
    "automation_events":[
      {
        "type": "exact_time",
        "info": {
          "date": "" + (new Date().getFullYear() +1) + "0725150007"
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 1000,
        "action":{
          "command": "start",
          "target": "lock",
          "options": {
            "unlock_pass": "preyrocks"
          }
        }
      }
    ]

  }
]

var repeat_triggers = [
  {
    "id": 107,
    "name": "trigger 107",
    "automation_events":[
      {
        "type" : "repeat_time",
        "info" : {
          "days_of_week" : '[1, 4]',  // Mondays and Thursdays
          "hour" : '20',
          "minute" : '25',
          "second" : '10',
          "until" : "20190626"
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "alert",
          "options": {
            "alert_message": "holi"
          }
        }
      },
    ]
  },
  {
    "id": 116,
    "name": "trigger 116",
    "automation_events":[
      {
        "type" : "repeat_time",
        "info" : {
          "days_of_week" : '[8, 4]',  // Mondays and Thursdays
          "hour" : '25',
          "minute" : '25',
          "second" : '10'
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "alarm",
          "options": {
            "sound": "alarm"
          }
        }
      },
    ]
  }
]

var event_triggers = [
  {
    "id": 108,
    "name": "trigger 108",
    "automation_events":[
      {
        "type" : "new_location"
      }
    ],
    "automation_actions":[
      {
        "delay": 100,
        "action":{
          "command": "start",
          "target": "alert",
          "options":{
            "alert_message": "holi"
          }
        }
      },
    ]
  },
  {
    "id": 109,
    "name": "trigger 109",
    "automation_events":[
      {
        "type" : "disconnected"
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action":{
          "command": "start",
          "target": "lock",
          "options":{
            "unlock_pass":"preyrocks"
          }
        }
      },
    ]
  },
  {
    "id": 110,
    "name": "trigger 110",
    "automation_events":[
      {
        "type" : "new_location"
      },
      { 
        "type":"repeat_range_time", 
        "info": {
          "days_of_week": '[6, 0]',    // Saturday and Sunday
          "hour_from": "090000",
          "hour_until": "090159",
          "until":null
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 500,
        "action": {
          "command": "start",
          "target": "alarm",
          "options":{
            "sound":"modem"
          }
        }
      },
    ]
  },
  {
    "id": 111,
    "name": "trigger 111",
    "automation_events":[
      {
        "type" : "geofencing_in",
        "info" : {
          "id": 666
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "alarm",
          "options": {
            "sound":"modem"
          }
        }
      },
    ]
  },
  {
    "id": 112,
    "name": "trigger 112",
    "automation_events":[
      {
        "type" : "geofencing_in",
        "info" : {
          "id": 667
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "lock",
          "options": {
            "unlock_pass":"dapassword"
          }
        }
      },
    ]
  },
  {
    "id": 113,
    "name": "trigger 113",
    "automation_events":[
      {
        "type" : "power_changed",
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "lock",
          "options": {
            "unlock_pass":"dapassword2"
          }
        }
      },
    ]
  },
  {
    "id": 114,
    "name": "trigger 114",
    "automation_events":[
      {
        "type" : "stopped_charging",
      },
      {
        "type" : "range_time",
        "info" : {
          "from" :  '2019063000000',
          "until" : '20190701150000'
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "alert",
          "options": {
            "alert_message":"alo"
          }
        }
      },
    ]
  },
  {
    "id": 115,
    "name": "trigger 115",
    "automation_events":[
      {
        "type" : "mac_address_changed",
      },
      {
        "type" : "range_time",
        "info" : {
          "from" : '20190130120000',
          "until" : '20190801150000'
        }
      },
      {
        "type":"repeat_range_time",
        "info": {
          "days_of_week": '[1, 2]',    // Saturday and Sunday
          "hour_from": "080000",
          "hour_until": "133000",
          "until":null
        }
      }
    ],
    "automation_actions":[
      {
        "delay": 0,
        "action": {
          "command": "start",
          "target": "lock",
          "options": {
            "unlock_pass":"oeoe"
          }
        }
      }
    ]
  },

]

module.exports = {exact_triggers, repeat_triggers, event_triggers};