

import apm from 'elastic-apm-node'

apm.start({
    serviceName: 'my-service-name',
    secretToken: 'goK4GKt0elb6zgFLwm',
    serverUrl: 'https://e7674d701ae1479b8050020d43c87a69.apm.us-central1.gcp.cloud.es.io:443',
    environment: 'my-environment'

})


export default apm;