import { PartialType } from '@nestjs/swagger';
import { CreateRevenueCycleDto } from './create-revenueCycle.dto';

export class UpdateRevenueCycleDto extends PartialType(CreateRevenueCycleDto) {}
