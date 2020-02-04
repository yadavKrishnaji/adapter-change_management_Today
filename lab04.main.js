// Update this constant with your ServiceNow credentials
const options = {
  url: 'https://dev85258.service-now.com/',
  username: 'admin',
  password: 'Servicenow@1992',
  serviceNowTable: 'change_request'
};


/// Import built-in Node.js package path.
const path = require('path');


/**
 * Import the ServiceNowConnector class from local Node.js module connector.js.
 *   and assign it to constant ServiceNowConnector.
 * When importing local modules, IAP requires an absolute file reference.
 * Built-in module path's join method constructs the absolute filename.
 */
const ServiceNowConnector = require(path.join(__dirname, './connector.js'));

/**
 * @function mainOnObject
 * @description Instantiates an object from the imported ServiceNowConnector class
 *   and tests the object's get and post methods.
 */
function mainOnObject() {
  // Instantiate an object from class ServiceNowConnector.
  const connector = new ServiceNowConnector(options);
  // Test the object's get and post methods.
  // You must write the arguments for get and post.
  connector.get((data, error) => {
    if (error) {
      console.error(`\nError returned from GET request:\n${JSON.stringify(error)}`);
    }
    //console.log(`\nResponse returned from GET request:\n${JSON.stringify(data)}`)

    var jsonstring = JSON.parse(JSON.stringify(data));
    var body=jsonstring.body;
    var results=JSON.parse(body);
    var result={
        "change_ticket_number":results['result'][0].number,
            "active": results['result'][0].active,
            "priority": results['result'][0].priority,
        "description": results['result'][0].description,
        "work_start": results['result'][0].work_start,
        "work_end": results['result'][0].work_end,
        "change_ticket_key": results['result'][0].sys_id

    }
    console.log(result);

})
  
  connector.post( (data, error) => {
    if (error) {
      console.error(`\nError returned from POST request:\n${JSON.stringify(error)}`);
    }
    //console.log(`\nResponse returned from POST request:\n${JSON.stringify(data)}`)
     var jsonstring = JSON.parse(JSON.stringify(data));
    var body=jsonstring.body;
    var results=JSON.parse(body);
    console.log(results);
    /*var result={
        "change_ticket_number":results['result'][0].number,
            "active": results['result'][0].active,
            "priority": results['result'][0].priority,
        "description": results['result'][0].description,
        "work_start": results['result'][0].work_start,
        "work_end": results['result'][0].work_end,
        "change_ticket_key": results['result'][0].sys_id

    }
    console.log(result);*/

  });

}

// Call mainOnObject to run it.
mainOnObject();