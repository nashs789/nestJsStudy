import { ConsoleLogger } from "@nestjs/common";

export class DoWithLogger extends ConsoleLogger {
    // error 뿐 아니라 다른 것도 가능
    // custom 로거를 사용은 하지만 상위 로거 호출만 하도록 하고
    // 작업이 필요할 경우 사용하는게 나을지도? 혹은 상용 프레임워크가 나을지도
    error(message: any, stack?: string, context?: string): void{
        super.error.apply(this, arguments);
        this.doSomething();
    }

    debug(message: any, context?: string): void{
        super.debug.apply(this, arguments);
        console.log(`debug method is called in Custom Logger`);
    }

    private doSomething(){
        console.log(`Do Something like DB I/O`);
    }
}