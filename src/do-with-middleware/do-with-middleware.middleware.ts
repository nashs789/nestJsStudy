import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DoWithMiddlewareMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const logHeader    = `=============== [${req.method}] ${req.url} ===============`;
        const logDate      = `date     : ${new Date()}`;
        const logAgent     = `agent    : ${req.headers['user-agent']}`;
        const logClientIp  = `client Ip: ${req.ip}`;
        const logProxyIps  = `proxy Ips: ${req.ips}`;
        const {password, ...paramsWithoutPassword} = req.body;

        const keys = Object.keys(paramsWithoutPassword);
        var params = "";

        if(keys.length !== 0){
            params = "=============== [ Parameters ] ===============\n";

            keys.forEach((key) => {
                const value = paramsWithoutPassword[key];
                params += `${key} = ${value}\n`;
            });
        }

        console.log(`
${logHeader}
${logDate}
${logAgent}
${logClientIp}
${logProxyIps}
${params}
        `);
    
        next();
    }
}
