import { ApiProperty } from '@nestjs/swagger';

export class CreateRevenueCycleDto {
  @ApiProperty()
  patientId: number;

  @ApiProperty()
  payer: string;

  @ApiProperty()
  procedureCode: string;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: ['PRE_AUTH', 'ATTENDANCE', 'BILLING', 'ADJUDICATION', 'PAYMENT'] })
  stage: 'PRE_AUTH' | 'ATTENDANCE' | 'BILLING' | 'ADJUDICATION' | 'PAYMENT';

  @ApiProperty({ enum: ['OPEN', 'DENIED', 'APPROVED', 'PAID', 'CANCELLED'] })
  claimStatus: 'OPEN' | 'DENIED' | 'APPROVED' | 'PAID' | 'CANCELLED';

  @ApiProperty({ type: String, format: 'date-time' })
  dueDate: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false, nullable: true })
  paidDate?: Date;

  @ApiProperty({ type: String, required: false, nullable: true })
  notes?: string;

}
