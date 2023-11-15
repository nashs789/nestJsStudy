import { Module } from '@nestjs/common';
import { DoWithLogger } from './do-with-logger';

@Module({
    providers: [DoWithLogger],
    exports: [DoWithLogger]
})
export class DoWithLoggerModule {}
