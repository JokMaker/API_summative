# Currency Converter Application Deployment

## Infrastructure Setup

### Server Configuration
- **Servers**: 2 Ubuntu 22.04 LTS instances
  - Server 1: 10.0.0.1 #not real servers
  - Server 2: 10.0.0.2 #not real servers

### Deployment Steps

1. **Application Preparation**
   ```bash
   # Clone repository
   git clone https://github.com/yourorg/currency-converter.git
   cd currency-converter

   # Install dependencies
   npm install express axios
   ```

2. **Nginx Load Balancer Configuration** (`/etc/nginx/nginx.conf`)
   ```nginx
   http {
     upstream currency_servers {
       least_conn;
       server 10.0.0.1:3000;
       server 10.0.0.2:3000;
     }

     server {
       listen 80;
       location / {
         proxy_pass http://currency_servers;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
       }
     }
   }
   ```

3. **PM2 Process Management**
   ```bash
   # Install PM2 globally
   npm install pm2 -g

   # Start application
   pm2 start app.js --name currency-converter
   pm2 startup
   pm2 save
   ```

## Load Balancer Testing

### Verification Steps
1. Health Check Script:
   ```bash
   #!/bin/bash
   for i in {1..100}; do
     curl http://loadbalancer-ip/
     sleep 0.1
   done
   ```

2. Expected Outcomes:
   - Requests distributed evenly between servers
   - No single server consistently receives more traffic
   - Sub-100ms response times

### Monitoring
- Use Prometheus for server metrics
- Configure Grafana dashboards for real-time monitoring

## Security Considerations
- UFW firewall enabled
- SSL with Let's Encrypt
- Rate limiting implemented in Nginx

- Link to the video from loom > https://www.loom.com/share/8906810334e24f22bc1d13d82b836c3c?sid=5f3089d8-9d46-4d39-b731-aaee9d9cd277
